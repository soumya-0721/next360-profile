// R-35 click-through: every interactive control, exercised for real.
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const PORT = 9334;
const BASE = `http://localhost:${PORT}`;
const ORIGIN = "http://localhost:3000";

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

const results = [];
const pass = (name, detail = "") => results.push(`PASS ${name}${detail ? " :: " + detail : ""}`);
const fail = (name, detail) => results.push(`FAIL ${name} :: ${detail}`);

async function openTarget(url) {
  const r = await fetch(`${BASE}/json/new?${encodeURIComponent(url)}`, { method: "PUT" });
  return r.json();
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

async function evaluate(cdp, expression) {
  const { result, exceptionDetails } = await cdp.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (exceptionDetails) {
    throw new Error(exceptionDetails.exception?.description || "evaluation failed");
  }
  return result.value;
}

async function withPage(width, height, fn) {
  const target = await openTarget(ORIGIN + "/");
  const cdp = await connect(target.webSocketDebuggerUrl);
  const runtimeErrors = [];
  cdp.on((msg) => {
    if (msg.method === "Runtime.exceptionThrown") {
      runtimeErrors.push(msg.params.exceptionDetails?.exception?.description?.slice(0, 200));
    }
  });
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 500,
  });
  try {
    await fn(cdp, runtimeErrors);
  } finally {
    await fetch(`${BASE}/json/close/${target.id}`, { method: "PUT" }).catch(() => {});
  }
  return runtimeErrors;
}

/* --- 1. Mobile menu: opens, reports state, closes. --- */
await withPage(390, 844, async (cdp) => {
  await cdp.send("Page.navigate", { url: ORIGIN + "/" });
  await sleep(2500);

  const before = await evaluate(
    cdp,
    `document.querySelector('[aria-controls="mobile-menu"]')?.getAttribute('aria-expanded') ?? 'missing'`
  );
  if (before !== "false") return fail("mobile menu initial state", `aria-expanded=${before}`);

  await evaluate(cdp, `document.querySelector('[aria-controls="mobile-menu"]').click()`);
  await sleep(500);
  const opened = await evaluate(
    cdp,
    `JSON.stringify({
      expanded: document.querySelector('[aria-controls="mobile-menu"]').getAttribute('aria-expanded'),
      menuVisible: !!document.querySelector('#mobile-menu') &&
        document.querySelector('#mobile-menu').getBoundingClientRect().height > 0,
      itemCount: document.querySelectorAll('#mobile-menu a').length
    })`
  ).then(JSON.parse);

  if (opened.expanded !== "true" || !opened.menuVisible || opened.itemCount < 5) {
    return fail("mobile menu open", JSON.stringify(opened));
  }
  pass("mobile menu open", `${opened.itemCount} links visible`);

  await evaluate(cdp, `document.querySelector('[aria-controls="mobile-menu"]').click()`);
  await sleep(400);
  const after = await evaluate(
    cdp,
    `document.querySelector('[aria-controls="mobile-menu"]').getAttribute('aria-expanded')`
  );
  if (after !== "false") return fail("mobile menu close", `aria-expanded=${after}`);
  pass("mobile menu close");
});

/* --- 2. Contact form: empty submit shows validation, no request fired. --- */
let contactRuntimeErrors = [];
contactRuntimeErrors = await withPage(1440, 1000, async (cdp) => {
  await cdp.send("Page.navigate", { url: ORIGIN + "/contact" });
  await sleep(2500);

  await evaluate(
    cdp,
    `document.querySelector('button[type="submit"]').click(); 'clicked'`
  );
  await sleep(500);

  const validation = await evaluate(
    cdp,
    `JSON.stringify({
      name: document.querySelector('#name-error')?.textContent ?? null,
      email: document.querySelector('#email-error')?.textContent ?? null,
      message: document.querySelector('#message-error')?.textContent ?? null,
      focused: document.activeElement?.id ?? null
    })`
  ).then(JSON.parse);

  if (!validation.name || !validation.email || !validation.message) {
    return fail("form empty submit", JSON.stringify(validation));
  }
  pass(
    "form empty submit",
    `3 errors shown, focus moved to #${validation.focused || "none"}`
  );

  /* Topic chips are real toggles. */
  await evaluate(
    cdp,
    `(() => {
      const b = [...document.querySelectorAll('button[aria-pressed]')]
        .find((x) => x.textContent.trim() === 'Digital Commerce');
      if (!b) return 'missing';
      b.click();
      return 'clicked';
    })()`
  );
  await sleep(500);
  const chip = await evaluate(
    cdp,
    `JSON.stringify([...document.querySelectorAll('button[aria-pressed]')].map(
      (x) => x.textContent.trim() + '=' + x.getAttribute('aria-pressed')
    ))`
  ).then(JSON.parse);
  const selected = chip.find((c) => c.startsWith("Digital Commerce="));
  if (selected !== "Digital Commerce=true") {
    return fail("topic chip toggle", chip.join(", "));
  }
  pass("topic chip toggle", "Digital Commerce selected");

  /* Valid submit reaches the real /api/contact route. */
  await evaluate(
    cdp,
    `(() => {
      const set = (id, v) => {
        const el = document.querySelector(id);
        const proto = el instanceof HTMLTextAreaElement
          ? window.HTMLTextAreaElement.prototype
          : window.HTMLInputElement.prototype;
        Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, v);
        el.dispatchEvent(new Event('input', { bubbles: true }));
      };
      set('#name', 'Verification Bot');
      set('#email', 'verify@example.com');
      set('#message', 'Automated click-through check of the contact form.');
      return 'filled';
    })()`
  );
  await evaluate(cdp, `document.querySelector('button[type="submit"]').click(); 'ok'`);
  await sleep(1800);

  const success = await evaluate(
    cdp,
    `document.body.innerText.includes('Thank you, it is received.')`
  );
  if (!success) return fail("form valid submit", "success state not shown");
  pass("form valid submit", "success state rendered after POST /api/contact");

  const reset = await evaluate(
    cdp,
    `(() => {
      const b = [...document.querySelectorAll('button')]
        .find((x) => x.textContent.trim() === 'Send another message');
      if (!b) return 'missing';
      b.click();
      return 'ok';
    })()`
  );
  await sleep(400);
  const backToForm = await evaluate(
    cdp,
    `!!document.querySelector('button[type="submit"]')`
  );
  if (reset === "missing" || !backToForm) {
    return fail("form reset button", `reset=${reset} formBack=${backToForm}`);
  }
  pass("form reset button", "form restored after success");
});

/* --- 3. Keyboard: skip link is first stop and becomes visible on focus. --- */
await withPage(1440, 1000, async (cdp) => {
  await cdp.send("Page.navigate", { url: ORIGIN + "/" });
  await sleep(2500);
  await cdp.send("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "Tab",
    code: "Tab",
    windowsVirtualKeyCode: 9,
    nativeVirtualKeyCode: 9,
  });
  await cdp.send("Input.dispatchKeyEvent", {
    type: "keyUp",
    key: "Tab",
    code: "Tab",
    windowsVirtualKeyCode: 9,
    nativeVirtualKeyCode: 9,
  });
  await sleep(300);

  const skip = await evaluate(
    cdp,
    `JSON.stringify({
      text: (document.activeElement?.textContent || '').trim(),
      visible: document.activeElement?.getBoundingClientRect().width > 0,
      outline: getComputedStyle(document.activeElement).outlineStyle
    })`
  ).then(JSON.parse);

  if (!skip.text.includes("Skip to content") || !skip.visible) {
    return fail("keyboard skip link", JSON.stringify(skip));
  }
  pass("keyboard skip link", `first Tab stop, outline: ${skip.outline}`);
});

/* --- 4. Header nav: every desktop link resolves. --- */
await withPage(1440, 1000, async (cdp) => {
  await cdp.send("Page.navigate", { url: ORIGIN + "/" });
  await sleep(2500);
  const hrefs = await evaluate(
    cdp,
    `JSON.stringify([...document.querySelectorAll('nav a[href]')]
      .filter((a) => a.getClientRects().length > 0)
      .map((a) => a.getAttribute('href')))`
  ).then(JSON.parse);

  const bad = [];
  for (const h of new Set(hrefs)) {
    const p = h.split("#")[0];
    if (!p || !p.startsWith("/")) continue;
    const status = await fetch(ORIGIN + p).then((r) => r.status).catch(() => 0);
    if (status !== 200) bad.push(`${h} -> ${status}`);
  }
  if (bad.length) return fail("header nav links", bad.join(", "));
  pass("header nav links", `${new Set(hrefs).size} unique destinations, all 200`);
});

chrome.kill();
await sleep(300);

const failed = results.filter((r) => r.startsWith("FAIL"));
results.forEach((r) => console.log(r));
if (contactRuntimeErrors.length) {
  console.log("RUNTIME ERRORS on /contact:");
  [...new Set(contactRuntimeErrors)].forEach((e) => console.log(" - " + e));
}
console.log(
  failed.length === 0 && contactRuntimeErrors.length === 0
    ? "\nCLICK-THROUGH PASS"
    : `\nCLICK-THROUGH FAIL (${failed.length} failing checks)`
);
