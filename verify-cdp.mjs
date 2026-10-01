// Verification pass for the 2026-10-01 FRD content update (antislop R-35).
// Talks to Chrome over raw CDP so no browser library has to be installed.
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const PORT = 9333;
const BASE = `http://localhost:${PORT}`;
const ORIGIN = "http://localhost:3000";

const ROUTES = [
  "/",
  "/about",
  "/agritech",
  "/it-services",
  "/organic",
  "/projects",
  "/slick",
  "/capabilities",
  "/contact",
];

const WIDTHS = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
];

const METRICS = `(() => {
  const de = document.documentElement;
  const overflowX = de.scrollWidth - de.clientWidth;
  const wide = [];
  if (overflowX > 1) {
    document.querySelectorAll('body *').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width > de.clientWidth + 1 && r.height > 0) {
        const cls = typeof el.className === 'string' && el.className
          ? '.' + el.className.trim().split(/\\s+/).slice(0, 3).join('.')
          : '';
        const id = el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + cls;
        if (!wide.includes(id)) wide.push(id);
      }
    });
  }
  const em = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = walker.nextNode())) {
    const t = n.textContent || '';
    if (t.includes('\\u2014')) em.push(t.trim().slice(0, 90));
  }
  const links = [...document.querySelectorAll('a[href]')]
    .map((a) => a.getAttribute('href'))
    .filter((h) => h && h.startsWith('/') && !h.startsWith('//'));
  return JSON.stringify({
    overflowX,
    wide: wide.slice(0, 5),
    em: em.slice(0, 5),
    links: [...new Set(links)],
    text: (document.body.innerText || '').slice(0, 400000),
  });
})()`;

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

const findings = [];
let checked = 0;
const linkCache = new Map();

async function openTarget(url) {
  const r = await fetch(`${BASE}/json/new?${encodeURIComponent(url)}`, {
    method: "PUT",
  });
  return r.json();
}

async function closeTarget(id) {
  await fetch(`${BASE}/json/close/${id}`, { method: "PUT" }).catch(() => {});
}

function connect(wsUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl);
    const pending = new Map();
    const listeners = [];
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
            }, 20000);
          });
        },
        on(fn) {
          listeners.push(fn);
        },
        close() {
          ws.close();
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
      } else if (msg.method) {
        listeners.forEach((fn) => fn(msg));
      }
    });
  });
}

for (const vp of WIDTHS) {
  for (const route of ROUTES) {
    const target = await openTarget(ORIGIN + route);
    const cdp = await connect(target.webSocketDebuggerUrl);
    const runtimeErrors = [];

    cdp.on((msg) => {
      if (msg.method === "Runtime.exceptionThrown") {
        runtimeErrors.push(
          msg.params.exceptionDetails?.exception?.description?.slice(0, 160) ||
            "exception"
        );
      }
      if (msg.method === "Log.entryAdded" && msg.params.entry?.level === "error") {
        runtimeErrors.push(msg.params.entry.text.slice(0, 160));
      }
    });

    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");
    await cdp.send("Log.enable");
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      mobile: vp.width < 500,
    });
    await cdp.send("Page.navigate", { url: ORIGIN + route });
    await sleep(2600);

    const { result } = await cdp.send("Runtime.evaluate", {
      expression: METRICS,
      returnByValue: true,
    });
    const m = JSON.parse(result.value);
    checked++;

    if (m.overflowX > 1) {
      findings.push(
        `${vp.name} ${route}: horizontal overflow ${m.overflowX}px :: ${m.wide.join(" | ")}`
      );
    }
    if (m.em.length) {
      findings.push(`${vp.name} ${route}: em dash R-02 :: ${m.em.join(" || ")}`);
    }
    for (const href of m.links) {
      const path = href.split("#")[0];
      if (!path) continue;
      if (!linkCache.has(path)) {
        const r = await fetch(ORIGIN + path).catch(() => null);
        linkCache.set(path, r ? r.status : 0);
      }
      if (linkCache.get(path) !== 200) {
        findings.push(`${route}: dead link ${href} -> ${linkCache.get(path)}`);
      }
    }

    // Stale content that the new FRD replaced must not survive anywhere.
    for (const stale of [
      "five-project portfolio",
      "Four products, one ecosystem",
      "Two Verticals",
      "Agritech + IT Services",
      "12 members",
      "Vertical 01",
      "Vertical 02",
    ]) {
      if (m.text.includes(stale)) {
        findings.push(`${vp.name} ${route}: stale copy "${stale}"`);
      }
    }

    if (runtimeErrors.length) {
      findings.push(
        `${vp.name} ${route}: runtime errors :: ${[...new Set(runtimeErrors)].slice(0, 3).join(" || ")}`
      );
    }

    cdp.close();
    await closeTarget(target.id);
  }
}

chrome.kill();
await sleep(300);

console.log(`checked ${checked} route/viewport combinations`);
const unique = [...new Set(findings)];
if (unique.length === 0) {
  console.log(
    "PASS: no overflow, no em dashes, no dead links, no runtime errors, no stale copy"
  );
} else {
  console.log(`FINDINGS (${unique.length}):`);
  unique.forEach((f) => console.log(" - " + f));
}
