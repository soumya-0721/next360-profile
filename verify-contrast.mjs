// WCAG contrast audit over every route, driven through raw CDP so no browser
// library has to be installed. Ported from verify-site-contrast.mjs, which
// still imports puppeteer-core. Handles the two hard cases on this site:
//   - hero text sitting on an absolute bg-black/60 scrim plus a gradient fade
//   - the fixed navbar, whose own bg-white/90 sits behind every nav link
// Also reports the navbar and hero separately so they are never skipped.
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const PORT = 9335;
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
  "/privacy",
  "/terms",
  "/cookies",
  "/legal",
];

/* Runs inside the page. Same maths as verify-site-contrast.mjs. */
const AUDIT = `(() => {
  const NAMED = { black: [0, 0, 0], white: [255, 255, 255] };
  const parseRGB = (s) => {
    s = String(s).trim();
    if (NAMED[s]) return [...NAMED[s], 1];
    if (s === "transparent") return [0, 0, 0, 0];
    const h = s.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (h) {
      const v =
        h[1].length === 3
          ? h[1].split("").map((x) => parseInt(x + x, 16))
          : [0, 2, 4].map((i) => parseInt(h[1].slice(i, i + 2), 16));
      return [v[0], v[1], v[2], 1];
    }
    const m = s.match(/^rgba?\\(([\\d.]+),\\s*([\\d.]+),\\s*([\\d.]+)(?:,\\s*([\\d.]+))?\\)$/);
    return m ? [+m[1], +m[2], +m[3], m[4] === undefined ? 1 : +m[4]] : null;
  };

  const lin2srgb = (c) => {
    const x = Math.max(0, Math.min(1, c));
    return Math.round(
      255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055)
    );
  };
  const oklabToRgb = (L, a, b) => {
    const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = L - 0.0894841775 * a - 1.291485548 * b;
    const l = l_ * l_ * l_, m = m_ * m_ * m_, s = s_ * s_ * s_;
    return [
      lin2srgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
      lin2srgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
      lin2srgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
    ];
  };
  /*
    CIE Lab (D50) -> sRGB. Lab's white point is D50 = (0.96422, 1, 0.82521);
    the D65 value 1.08883 must not appear here. XYZ D50 -> XYZ D65 uses the
    Bradford adaptation matrix; XYZ D65 -> linear sRGB is the standard matrix.
    Verified: lab(96.1596 -0.0823438 -1.13575) -> rgb(243,244,246) = #f3f4f6.
  */
  const labToRgb = (L, a, b) => {
    const e = 216 / 24389, k = 24389 / 27;
    const fy = (L + 16) / 116, fx = fy + a / 500, fz = fy - b / 200;
    const fi = (t) => (t * t * t > e ? t * t * t : (116 * t - 16) / k);
    const X = fi(fx) * 0.96422, Y = (L > k * e ? Math.pow(fy, 3) : L / k), Z = fi(fz) * 0.82521;
    const Xd = 0.9554734 * X - 0.0230985 * Y + 0.0632593 * Z;
    const Yd = -0.0283697 * X + 1.0099954 * Y + 0.0210414 * Z;
    const Zd = 0.012314 * X - 0.0205077 * Y + 1.3303659 * Z;
    return [
      lin2srgb(3.2404542 * Xd - 1.5371385 * Yd - 0.4985314 * Zd),
      lin2srgb(-0.969266 * Xd + 1.8760108 * Yd + 0.041892 * Zd),
      lin2srgb(0.0556434 * Xd - 0.204044 * Yd + 1.0572252 * Zd),
    ];
  };
  const parseSpace = (s) => {
    const m = String(s).trim().match(/^(oklab|oklch|lab|lch)\\(([\\s\\S]*)\\)$/i);
    if (!m) return null;
    const kind = m[1].toLowerCase();
    const inner = m[2];
    const slash = inner.indexOf("/");
    let alpha = 1, numsPart = inner;
    if (slash >= 0) {
      numsPart = inner.slice(0, slash);
      const aRaw = inner.slice(slash + 1).trim();
      alpha = aRaw.endsWith("%") ? parseFloat(aRaw) / 100 : parseFloat(aRaw);
      if (Number.isNaN(alpha)) alpha = 1;
    }
    const nums = (numsPart.match(/-?\\d*\\.?\\d+(?:e[-+]?\\d+)?/gi) || []).map(Number);
    if (nums.length < 3) return null;
    let rgb;
    if (kind === "oklab") rgb = oklabToRgb(nums[0], nums[1], nums[2]);
    else if (kind === "lab") rgb = labToRgb(nums[0], nums[1], nums[2]);
    else {
      const hRad = (nums[2] * Math.PI) / 180;
      rgb = kind === "oklch"
        ? oklabToRgb(nums[0], nums[1] * Math.cos(hRad), nums[1] * Math.sin(hRad))
        : labToRgb(nums[0], nums[1] * Math.cos(hRad), nums[1] * Math.sin(hRad));
    }
    return [rgb[0], rgb[1], rgb[2], alpha];
  };
  const parse = (c) => {
    const direct = parseRGB(c);
    if (direct) return direct;
    const sp = parseSpace(c);
    if (sp) return sp;
    const m = String(c)
      .trim()
      .match(/^color-mix\\(in [\\w-]+,\\s*(.+?)\\s+([\\d.]+)%,\\s*(.+?)\\)$/);
    if (!m) return null;
    const base = parseRGB(m[1]);
    const pct = +m[2] / 100;
    const other = parseRGB(m[3]);
    if (!base) return null;
    if (!other || other[3] === 0) return [base[0], base[1], base[2], pct];
    return [
      base[0] * pct + other[0] * (1 - pct),
      base[1] * pct + other[1] * (1 - pct),
      base[2] * pct + other[2] * (1 - pct),
      pct + other[3] * (1 - pct),
    ];
  };
  const gradientLead = (img) => {
    const open = img.indexOf("(");
    if (open < 0) return null;
    let depth = 0, start = open + 1;
    const args = [];
    for (let i = open + 1; i < img.length; i++) {
      const ch = img[i];
      if (ch === "(") depth++;
      else if (ch === ")") {
        if (depth === 0) { args.push(img.slice(start, i)); break; }
        depth--;
      } else if (ch === "," && depth === 0) {
        args.push(img.slice(start, i));
        start = i + 1;
      }
    }
    for (const a of args) {
      const c = parse(a.trim()) || parse(a.trim().replace(/\\s+[\\d.]+%$/, ""));
      if (c) return c;
    }
    return null;
  };
  const lum = ([r, g, b]) => {
    const f = (v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const ratio = (a, b) => {
    const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
    return (l1 + 0.05) / (l2 + 0.05);
  };

  /* Paint contributed by a covering overlay (the hero scrim, the gradient fade). */
  let currentTextEl = null;
  const paintOf = (o) => {
    const paints = [];
    const consider = (node, depth) => {
      if (node.contains(currentTextEl)) return;
      const cs = getComputedStyle(node);
      const cr = node.getBoundingClientRect();
      if (!cr.width || !cr.height) return;
      const er = currentTextEl.getBoundingClientRect();
      if (!(cr.top <= er.top + 2 && cr.left <= er.left + 2 &&
            cr.bottom >= er.bottom - 2 && cr.right >= er.right - 2)) return;
      let c = cs.backgroundImage && cs.backgroundImage.includes("gradient")
        ? gradientLead(cs.backgroundImage) : null;
      if (!c) c = parse(cs.backgroundColor);
      if (c && c[3] > 0) paints.push(c);
      else if (depth < 3 && cs.position !== "static") {
        for (const ch of node.children) consider(ch, depth + 1);
      }
    };
    consider(o, 0);
    return paints;
  };

  const bgOf = (el) => {
    /*
      Paint order matters: the element's OWN background paints last, after any
      covering layer (the hero scrim is z-0 behind the z-10 content). The old
      code stacked own bg first and then multiplied the scrim over it, which
      turned the lime #ccff00 badge into rgb(82,102,0).
    */
    const own = parse(getComputedStyle(el).backgroundColor);
    const stack = [];
    let n = el.parentElement;
    while (n && n !== document.documentElement) {
      const c = parse(getComputedStyle(n).backgroundColor);
      if (c && c[3] > 0) stack.push(c);
      if (c && c[3] === 1) break;
      n = n.parentElement;
    }
    let out = [255, 255, 255];
    for (let i = stack.length - 1; i >= 0; i--) {
      const [r, g, b, a] = stack[i];
      out = [r * a + out[0] * (1 - a), g * a + out[1] * (1 - a), b * a + out[2] * (1 - a)];
    }

    const er = el.getBoundingClientRect();
    currentTextEl = el;

    /*
      Covering siblings: absolute/fixed layers that paint on top of the text.
      This is what carries the hero's bg-black/60 scrim and its bottom fade.
    */
    const overlays = [];
    let a2 = el.parentElement;
    while (a2 && a2 !== document.documentElement) {
      for (const ch of a2.children) {
        if (ch === el || el.contains(ch) || ch.contains(el)) continue;
        const cs = getComputedStyle(ch);
        if (cs.position !== "absolute" && cs.position !== "fixed") continue;
        const cr = ch.getBoundingClientRect();
        if (cr.width && cr.top <= er.top + 2 && cr.left <= er.left + 2 &&
            cr.bottom >= er.bottom - 2 && cr.right >= er.right - 2) {
          overlays.push(ch);
        }
      }
      a2 = a2.parentElement;
    }
    for (const o of overlays) {
      for (const c of paintOf(o)) {
        out = [
          c[0] * c[3] + out[0] * (1 - c[3]),
          c[1] * c[3] + out[1] * (1 - c[3]),
          c[2] * c[3] + out[2] * (1 - c[3]),
        ];
      }
    }
    /* The element's own background paints after every covering layer. */
    if (own && own[3] > 0) {
      out = [
        own[0] * own[3] + out[0] * (1 - own[3]),
        own[1] * own[3] + out[1] * (1 - own[3]),
        own[2] * own[3] + out[2] * (1 - own[3]),
      ];
    }
    return out;
  };

  const failures = [];
  const navFailures = [];
  const heroFailures = [];

  document.querySelectorAll("body *").forEach((el) => {
    if (!el.childNodes.length) return;
    const hasText = [...el.childNodes].some(
      (n) => n.nodeType === 3 && n.textContent.trim().length > 1
    );
    if (!hasText) return;
    const st = getComputedStyle(el);
    if (st.visibility === "hidden" || st.display === "none" || +st.opacity === 0) return;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    if (el.closest("[aria-hidden='true']")) return;
    /* bg-clip gradient text is measured separately, it has no single colour. */
    if (st.backgroundImage && st.backgroundImage.includes("gradient")) return;

    const fg = parse(st.color);
    if (!fg) return;
    const bg = bgOf(el);
    const size = parseFloat(st.fontSize);
    const bold = +st.fontWeight >= 700;
    const large = size >= 24 || (bold && size >= 18.66);
    const need = large ? 3 : 4.5;
    const got = ratio(fg.slice(0, 3), bg);
    if (got >= need) return;

    const inNav = !!el.closest("nav.fixed");
    const inHero = !!el.closest("section#home");
    const row = {
      text: el.textContent.trim().slice(0, 60),
      cls: (el.className || "").toString().slice(0, 80),
      color: st.color,
      bg: "rgb(" + bg.map((v) => Math.round(v)).join(",") + ")",
      size: Math.round(size),
      need,
      got: +got.toFixed(2),
      zone: inNav ? "navbar" : inHero ? "hero" : "page",
    };
    failures.push(row);
    if (inNav) navFailures.push(row);
    if (inHero) heroFailures.push(row);
  });

  /* Report what the navbar and hero actually contain, pass or fail. */
  const summarize = (sel) => {
    const out = [];
    document.querySelectorAll(sel).forEach((el) => {
      const hasText = [...el.childNodes].some(
        (n) => n.nodeType === 3 && n.textContent.trim().length > 1
      );
      if (!hasText) return;
      const st = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const fg = parse(st.color);
      if (!fg) return;
      const bg = bgOf(el);
      const size = parseFloat(st.fontSize);
      const bold = +st.fontWeight >= 700;
      const large = size >= 24 || (bold && size >= 18.66);
      const need = large ? 3 : 4.5;
      const got = ratio(fg.slice(0, 3), bg);
      out.push({
        text: el.textContent.trim().slice(0, 40),
        got: +got.toFixed(2),
        need,
        pass: got >= need,
        size: Math.round(size),
        zone: el.closest("nav.fixed") ? "navbar"
          : el.closest("section#home") ? "hero" : "page",
      });
    });
    return out;
  };

  return JSON.stringify({
    failures,
    navFailures,
    heroFailures,
    navbarAll: summarize("nav.fixed a, nav.fixed button"),
    heroAll: summarize("section#home h1, section#home p, section#home span"),
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
            }, 20000);
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

const allFailures = [];
const zoneTotals = { navbar: 0, hero: 0, page: 0 };
let navbarAudited = 0;
let heroAudited = 0;

const target = await openTarget(ORIGIN + "/");
const cdp = await connect(target.webSocketDebuggerUrl);
await cdp.send("Page.enable");
await cdp.send("Runtime.enable");
await cdp.send("Emulation.setDeviceMetricsOverride", {
  width: 1440,
  height: 1000,
  deviceScaleFactor: 1,
  mobile: false,
});

for (const route of ROUTES) {
  await cdp.send("Page.navigate", { url: ORIGIN + route });
  await sleep(2400);

  /* Reveal scroll-animated content so hidden-but-real text gets measured. */
  await cdp.send("Runtime.evaluate", {
    expression: `(() => {
      document.querySelectorAll(".animate-on-scroll-hidden").forEach((el) =>
        el.classList.add("animate-on-scroll-visible")
      );
      return document.fonts && document.fonts.ready ? "fonts" : "ok";
    })()`,
  });
  await sleep(400);

  const { result } = await cdp.send("Runtime.evaluate", {
    expression: AUDIT,
    returnByValue: true,
  });
  const data = JSON.parse(result.value);

  for (const f of data.failures) {
    allFailures.push({ route, ...f });
    zoneTotals[f.zone] = (zoneTotals[f.zone] || 0) + 1;
  }
  if (route === "/") {
    navbarAudited = data.navbarAll.length;
    heroAudited = data.heroAll.length;
    console.log("NAVBAR (fixed pill header) on /:");
    data.navbarAll.forEach((n) =>
      console.log(
        `  ${n.pass ? "PASS" : "FAIL"} ${n.got}:1 (need ${n.need}) ${n.size}px "${n.text}"`
      )
    );
    console.log("HERO on /:");
    data.heroAll.forEach((n) =>
      console.log(
        `  ${n.pass ? "PASS" : "FAIL"} ${n.got}:1 (need ${n.need}) ${n.size}px "${n.text}"`
      )
    );
    console.log("");
  }
}

await fetch(`${BASE}/json/close/${target.id}`, { method: "PUT" }).catch(() => {});
chrome.kill();
await sleep(300);

console.log(`\n${ROUTES.length} routes audited at 1440px`);
console.log(
  `navbar nodes checked on /: ${navbarAudited}, hero nodes checked on /: ${heroAudited}`
);
if (allFailures.length === 0) {
  console.log("CONTRAST: all routes pass AA, navbar and hero included");
} else {
  console.log(`\nFAILURES (${allFailures.length}) by zone:`);
  console.log(
    `  navbar: ${zoneTotals.navbar || 0}  hero: ${zoneTotals.hero || 0}  page: ${zoneTotals.page || 0}`
  );
  console.log("");
  allFailures.forEach((f) =>
    console.log(
      `${f.route} [${f.zone}]  ${f.got}:1 (need ${f.need})  ${f.size}px  ${f.color} on ${f.bg}\n    "${f.text}"\n    ${f.cls}`
    )
  );
}
