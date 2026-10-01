// Pixel-accurate WCAG check for the two zones that sit on photography and
// translucency: the fixed navbar (bg-white/90 + backdrop-blur) and the hero
// (photo + bg-black/60 scrim + gradient fade).
//
// Method: measure every text node's real composited background by making the
// text transparent, screenshotting, and sampling the pixels under each
// element's box. Contrast is taken against the worst pixel in that box, so a
// light patch anywhere under light text is caught.
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const PORT = 9336;
const BASE = `http://localhost:${PORT}`;
const ORIGIN = "http://localhost:3000";

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
];

/* Collects the text nodes and their resolved colours, in page coordinates. */
const COLLECT = `(() => {
  const zones = [
    { zone: "navbar", root: document.querySelector("nav.fixed") },
    { zone: "hero", root: document.querySelector("section#home") },
  ];
  const out = [];
  for (const { zone, root } of zones) {
    if (!root) continue;
    root.querySelectorAll("*").forEach((el) => {
      const hasText = [...el.childNodes].some(
        (n) => n.nodeType === 3 && n.textContent.trim().length > 1
      );
      if (!hasText) return;
      const st = getComputedStyle(el);
      if (st.visibility === "hidden" || st.display === "none" || +st.opacity === 0) return;
      if (el.closest("[aria-hidden='true']")) return;
      /* Gradient-clipped text has no single colour; skipped here. */
      if (st.backgroundImage && st.backgroundImage.includes("gradient")) return;
      if (st.backgroundClip === "text" || st.webkitBackgroundClip === "text") return;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      if (r.bottom < 0 || r.top > window.innerHeight) return;

      const size = parseFloat(st.fontSize);
      const bold = +st.fontWeight >= 700;
      const large = size >= 24 || (bold && size >= 18.66);
      out.push({
        zone,
        text: el.textContent.trim().slice(0, 60),
        cls: (el.className || "").toString().slice(0, 90),
        color: st.color,
        size: Math.round(size),
        bold,
        large,
        need: large ? 3 : 4.5,
        rect: {
          x: Math.round(r.left),
          y: Math.round(r.top),
          w: Math.round(r.width),
          h: Math.round(r.height),
        },
      });
    });
  }
  return JSON.stringify(out);
})()`;

const lin = (c) => {
  c /= 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const ratio = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

/* Reads CSS colours authoritatively through Chrome's own conversion. */
const NORMALIZE = `(css) => {
  const c = document.createElement("canvas");
  c.width = c.height = 1;
  const x = c.getContext("2d");
  x.fillStyle = "#010203";
  x.fillStyle = css;
  const out = x.fillStyle;
  if (out === "#010203" && css.toLowerCase() !== "#010203") return null;
  const m = out.match(/^#([0-9a-f]{6})$/i);
  if (m) return [parseInt(m[1].slice(0,2),16), parseInt(m[1].slice(2,4),16), parseInt(m[1].slice(4,6),16)];
  const g = out.match(/^rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/);
  return g ? [+g[1], +g[2], +g[3]] : null;
}`;

const chrome = spawn(
  "/usr/bin/google-chrome-stable",
  [
    "--headless=new",
    "--no-sandbox",
    "--disable-gpu",
    `--remote-debugging-port=${PORT}`,
    "--remote-allow-origins=*",
    "about:blank",
  ],
  { stdio: "ignore" }
);

let up = false;
for (let i = 0; i < 40 && !up; i++) {
  try {
    await fetch(`${BASE}/json/version`);
    up = true;
  } catch {
    await sleep(250);
  }
}
if (!up) {
  chrome.kill();
  throw new Error("Chrome CDP did not come up");
}

async function openTarget(url) {
  const r = await fetch(`${BASE}/json/new?${encodeURIComponent(url)}`, { method: "PUT" });
  return r.json();
}

function connect(wsUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl);
    const pending = new Map();
    let id = 0;
    ws.addEventListener("open", () =>
      resolve({
        send(method, params = {}) {
          const msgId = ++id;
          ws.send(JSON.stringify({ id: msgId, method, params }));
          return new Promise((res, rej) => {
            pending.set(msgId, { res, rej });
            setTimeout(() => {
              if (pending.delete(msgId)) rej(new Error(`timeout ${method}`));
            }, 30000);
          });
        },
      })
    );
    ws.addEventListener("error", reject);
    ws.addEventListener("message", (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && pending.has(msg.id)) {
        const { res, rej } = pending.get(msg.id);
        pending.delete(msg.id);
        msg.error ? rej(new Error(msg.error.message)) : res(msg.result);
      }
    });
  });
}

const all = [];

for (const vp of VIEWPORTS) {
  const target = await openTarget(ORIGIN + "/");
  const cdp = await connect(target.webSocketDebuggerUrl);
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: vp.width,
    height: vp.height,
    deviceScaleFactor: 1,
    mobile: vp.width < 500,
  });
  await cdp.send("Page.navigate", { url: ORIGIN + "/" });
  await sleep(3000);

  /* Reveal animated content so nothing in the hero is measured as absent. */
  await cdp.send("Runtime.evaluate", {
    expression: `document.querySelectorAll(".animate-on-scroll-hidden")
      .forEach((el) => el.classList.add("animate-on-scroll-visible")); "ok"`,
  });
  await sleep(700);

  const { result } = await cdp.send("Runtime.evaluate", {
    expression: COLLECT,
    returnByValue: true,
  });
  const items = JSON.parse(result.value);

  /* Resolve each text colour through Chrome's own colour space. */
  const normalized = [];
  for (const it of items) {
    const { result: r } = await cdp.send("Runtime.evaluate", {
      expression: `(${NORMALIZE})(${JSON.stringify(it.color)})`,
      returnByValue: true,
    });
    normalized.push({ ...it, rgb: r.value });
  }

  /*
    Make the text invisible but keep every background, scrim, pill and blur
    exactly as rendered, then screenshot what is really behind the glyphs.
  */
  await cdp.send("Runtime.evaluate", {
    expression: `(function () {
      const s = document.createElement("style");
      s.id = "__ghost__";
      s.textContent = "nav.fixed *, section#home * { color: transparent !important; text-shadow: none !important; -webkit-text-fill-color: transparent !important; }";
      document.head.appendChild(s);
      return "ghosted";
    })()`,
  });
  await sleep(600);

  const shot = await cdp.send("Page.captureScreenshot", { format: "png" });

  await cdp.send("Runtime.evaluate", {
    expression: `document.getElementById("__ghost__")?.remove(); "restored"`,
  });
  await sleep(200);

  /* Sample the screenshot in a scratch page with a canvas. */
  const scratch = await openTarget("about:blank");
  const scdp = await connect(scratch.webSocketDebuggerUrl);
  await scdp.send("Runtime.enable");

  const runSample = `(() => {
    const lum = (c) => {
      const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
      return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]);
    };
    const boxes = __BOXES__;
    const b64 = "__B64__";
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const c = document.createElement("canvas");
        c.width = img.naturalWidth;
        c.height = img.naturalHeight;
        const x = c.getContext("2d", { willReadFrequently: true });
        x.drawImage(img, 0, 0);
        const out = boxes.map((b) => {
          const rx = Math.max(0, b.rect.x), ry = Math.max(0, b.rect.y);
          const rw = Math.min(b.rect.w, c.width - rx), rh = Math.min(b.rect.h, c.height - ry);
          if (rw <= 0 || rh <= 0) return { text: b.text, minL: null, maxL: null };
          const d = x.getImageData(rx, ry, rw, rh).data;
          let minL = Infinity, maxL = -Infinity;
          const step = Math.max(1, Math.floor(Math.sqrt((rw * rh) / 5000)));
          for (let yy = 0; yy < rh; yy += step) {
            for (let xx = 0; xx < rw; xx += step) {
              const i = (yy * rw + xx) * 4;
              const l = lum([d[i], d[i+1], d[i+2]]);
              if (l < minL) minL = l;
              if (l > maxL) maxL = l;
            }
          }
          return { text: b.text, minL, maxL };
        });
        resolve(JSON.stringify(out));
      };
      img.onerror = () => resolve(JSON.stringify([]));
      img.src = "data:image/png;base64," + b64;
    });
  })()`;

  const expression = runSample
    .replace("__BOXES__", JSON.stringify(normalized))
    .replace("__B64__", shot.data);

  const { result: sampleRes, exceptionDetails } = await scdp.send(
    "Runtime.evaluate",
    { expression, awaitPromise: true, returnByValue: true }
  );
  if (exceptionDetails) {
    console.log("sampling failed:", exceptionDetails.exception?.description);
  } else {
    const sampled = JSON.parse(sampleResult(sampleRes));
    sampled.forEach((s, i) => all.push({ vp: vp.name, ...normalized[i], ...s }));
  }

  await fetch(`${BASE}/json/close/${scratch.id}`, { method: "PUT" }).catch(() => {});
  await fetch(`${BASE}/json/close/${target.id}`, { method: "PUT" }).catch(() => {});
}

function sampleResult(r) {
  return r.value;
}

chrome.kill();
await sleep(300);

const fails = [];
for (const r of all) {
  if (!r.rgb || r.minL === null || r.maxL === null) continue;
  const lFg = lum(r.rgb);
  const ratioTo = (l) => {
    const [a, b] = [lFg, l].sort((x, y) => y - x);
    return (a + 0.05) / (b + 0.05);
  };
  /* worst pixel in the box: whichever end is closer to the text colour */
  const got = Math.min(ratioTo(r.minL), ratioTo(r.maxL));
  const pass = got >= r.need;
  r.got = +got.toFixed(2);
  r.pass = pass;
  if (!pass) fails.push(r);
}

const byZone = (z) => all.filter((r) => r.zone === z && r.rgb && r.minL !== null);

for (const z of ["navbar", "hero"]) {
  const rows = byZone(z);
  console.log(`\n${z.toUpperCase()} (${rows.length} text nodes measured, per viewport)`);
  const seen = new Set();
  for (const r of rows) {
    const key = `${r.vp}|${r.text}`;
    if (seen.has(key)) continue;
    seen.add(key);
    console.log(
      `  ${r.pass ? "PASS" : "FAIL"} ${r.vp.padEnd(7)} ${String(r.got).padStart(5)}:1 (need ${r.need}) ${r.size}px  "${r.text}"`
    );
  }
}

console.log(`\nTOTAL measured: ${all.filter((r) => r.rgb && r.minL !== null).length}`);
console.log(`FAILURES: ${fails.length}`);
for (const f of fails) {
  console.log(
    `  ${f.vp} [${f.zone}] ${f.got}:1 (need ${f.need}) ${f.size}px ${f.color} :: "${f.text}"\n    ${f.cls}`
  );
}
