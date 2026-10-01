import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";

const PORT = 9337;
const BASE = `http://localhost:${PORT}`;

const chrome = spawn(
  "/usr/bin/google-chrome-stable",
  ["--headless=new", "--no-sandbox", "--disable-gpu",
   `--remote-debugging-port=${PORT}`, "--remote-allow-origins=*", "about:blank"],
  { stdio: "ignore" }
);

let up = false;
for (let i = 0; i < 40 && !up; i++) {
  try { await fetch(`${BASE}/json/version`); up = true; } catch { await sleep(250); }
}
if (!up) { chrome.kill(); throw new Error("no cdp"); }

const t = await (await fetch(`${BASE}/json/new?${encodeURIComponent("http://localhost:3000/")}`, { method: "PUT" })).json();

const ws = new WebSocket(t.webSocketDebuggerUrl);
const pending = new Map();
let id = 0;
const send = (method, params = {}) => {
  const msgId = ++id;
  ws.send(JSON.stringify({ id: msgId, method, params }));
  return new Promise((res, rej) => {
    pending.set(msgId, { res, rej });
    setTimeout(() => { if (pending.delete(msgId)) rej(new Error("timeout " + method)); }, 30000);
  });
};
ws.addEventListener("message", (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) {
    const { res, rej } = pending.get(m.id);
    pending.delete(m.id);
    m.error ? rej(new Error(m.error.message)) : res(m.result);
  }
});
await new Promise((r) => ws.addEventListener("open", r));

await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false,
});
await send("Page.navigate", { url: "http://localhost:3000/" });
await sleep(3000);

await send("Runtime.evaluate", {
  expression: `document.querySelectorAll(".animate-on-scroll-hidden")
    .forEach((el) => el.classList.add("animate-on-scroll-visible")); "ok"`,
});
await sleep(700);

/* Where does Chrome say the h1 is? */
const { result: geo } = await send("Runtime.evaluate", {
  expression: `(() => {
    const h1 = document.querySelector("section#home h1");
    const r = h1.getBoundingClientRect();
    const cs = getComputedStyle(h1);
    return JSON.stringify({
      rect: { x: r.x, y: r.y, w: r.width, h: r.height },
      color: cs.color, fill: cs.webkitTextFillColor,
      dpr: window.devicePixelRatio,
      inner: [window.innerWidth, window.innerHeight],
      scroll: [window.scrollX, window.scrollY],
      dvh: window.outerWidth + "x" + window.outerHeight,
    });
  })()`,
  returnByValue: true,
});
console.log("h1 geometry:", geo.value);

await send("Runtime.evaluate", {
  expression: `(function () {
    const s = document.createElement("style");
    s.id = "__ghost__";
    s.textContent = "nav.fixed *, section#home * { color: transparent !important; text-shadow: none !important; -webkit-text-fill-color: transparent !important; }";
    document.head.appendChild(s);
    return "ghosted";
  })()`,
});
await sleep(800);

const { result: after } = await send("Runtime.evaluate", {
  expression: `(() => {
    const h1 = document.querySelector("section#home h1");
    const cs = getComputedStyle(h1);
    const span = h1.querySelector("span");
    return JSON.stringify({
      h1color: cs.color, h1fill: cs.webkitTextFillColor,
      spanFill: span ? getComputedStyle(span).webkitTextFillColor : null,
      styleApplied: !!document.getElementById("__ghost__"),
    });
  })()`,
  returnByValue: true,
});
console.log("after ghost:", after.value);

const shot = await send("Page.captureScreenshot", { format: "png" });
const buf = Buffer.from(shot.data, "base64");
writeFileSync("/tmp/hero-ghost.png", buf);
console.log("png bytes:", buf.length);

/* Decode PNG IHDR for real pixel dimensions. */
const w = buf.readUInt32BE(16);
const h = buf.readUInt32BE(20);
console.log("png dims:", w + "x" + h);

const { result: css } = await send("Runtime.evaluate", {
  expression: `[window.innerWidth, window.innerHeight, window.devicePixelRatio].join("x")`,
  returnByValue: true,
});
console.log("css viewport:", css.value);

/* Sample the saved PNG over known boxes, using a scratch page. */
const boxes = [
  { name: "h1", rect: { x: 100, y: 298, w: 768, h: 172 } },
  { name: "getInTouch", rect: { x: 1300, y: 20, w: 110, h: 40 } },
];
const scratch = await (await fetch(`${BASE}/json/new?about:blank`, { method: "PUT" })).json();
const ws2 = new WebSocket(scratch.webSocketDebuggerUrl);
const pend2 = new Map();
let id2 = 0;
const send2 = (method, params = {}) => {
  const msgId = ++id2;
  ws2.send(JSON.stringify({ id: msgId, method, params }));
  return new Promise((res, rej) => {
    pend2.set(msgId, { res, rej });
    setTimeout(() => { if (pend2.delete(msgId)) rej(new Error("tmo " + method)); }, 30000);
  });
};
ws2.addEventListener("message", (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pend2.has(m.id)) {
    const { res, rej } = pend2.get(m.id);
    pend2.delete(m.id);
    m.error ? rej(new Error(m.error.message)) : res(m.result);
  }
});
await new Promise((r) => ws2.addEventListener("open", r));
await send2("Runtime.enable");

const { result: sampled } = await send2("Runtime.evaluate", {
  expression: `(() => {
    const lum = (c) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126*f(c[0]) + 0.7152*f(c[1]) + 0.0722*f(c[2]); };
    const b64 = __B64__;
    const boxes = ${JSON.stringify(boxes)};
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const c = document.createElement("canvas");
        c.width = img.naturalWidth; c.height = img.naturalHeight;
        const x = c.getContext("2d", { willReadFrequently: true });
        x.drawImage(img, 0, 0);
        const out = boxes.map((b) => {
          const d = x.getImageData(b.rect.x, b.rect.y, b.rect.w, b.rect.h).data;
          let minL = Infinity, maxL = -Infinity, bright = 0, total = 0;
          for (let i = 0; i < d.length; i += 4) {
            const l = lum([d[i], d[i+1], d[i+2]]);
            if (l < minL) minL = l;
            if (l > maxL) maxL = l;
            if (l > 0.6) bright++;
            total++;
          }
          return { name: b.name, minL: +minL.toFixed(3), maxL: +maxL.toFixed(3), brightPct: +(100*bright/total).toFixed(1) };
        });
        resolve(JSON.stringify(out));
      };
      img.onerror = () => resolve("[{\"err\":1}]");
      img.src = "data:image/png;base64," + b64;
    });
  })()`
    .replace("__B64__", JSON.stringify(shot.data)),
  awaitPromise: true,
  returnByValue: true,
});
console.log("sampled:", sampled.value);

await fetch(`${BASE}/json/close/${scratch.id}`, { method: "PUT" }).catch(() => {});

await fetch(`${BASE}/json/close/${t.id}`, { method: "PUT" }).catch(() => {});
chrome.kill();
