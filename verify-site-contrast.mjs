// Transient QA: WCAG contrast audit over every route of the production build.
// Approximates effective background by walking ancestors and blending alpha
// layers; skips bg-clip gradient text (measured separately in the audit doc).
import puppeteer from "puppeteer-core";

const ROUTES = [
  "/", "/about", "/agritech", "/capabilities", "/contact", "/it-services",
  "/organic", "/projects", "/slick", "/privacy", "/terms", "/cookies", "/legal",
];

const browser = await puppeteer.launch({
  executablePath: "/usr/bin/google-chrome-stable",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000 });

const failures = [];
for (const route of ROUTES) {
  await page.goto("http://localhost:3000" + route, { waitUntil: "networkidle0" });
  await page.evaluate(async () => {
    // reveal everything so hidden-but-real text is measured
    document.querySelectorAll(".animate-on-scroll-hidden").forEach((el) =>
      el.classList.add("animate-on-scroll-visible")
    );
    await document.fonts.ready;
  });
  const bad = await page.evaluate(() => {
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
      const m = s.match(/^rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)$/);
      return m ? [+m[1], +m[2], +m[3], m[4] === undefined ? 1 : +m[4]] : null;
    };
    /* Chrome serializes computed colors as rgb()/hex for plain CSS but as
       oklab()/lab()/lch() for Tailwind's color-mix palette colors. */
    const lin2srgb = (c) => {
      const x = Math.max(0, Math.min(1, c));
      return Math.round(
        255 *
          (x <= 0.0031308
            ? 12.92 * x
            : 1.055 * Math.pow(x, 1 / 2.4) - 0.055)
      );
    };
    const oklabToRgb = (L, a, b) => {
      const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
      const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
      const s_ = L - 0.0894841775 * a - 1.291485548 * b;
      const l = l_ * l_ * l_,
        m = m_ * m_ * m_,
        s = s_ * s_ * s_;
      return [
        lin2srgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
        lin2srgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
        lin2srgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
      ];
    };
    const labToRgb = (L, a, b) => {
      const e = 216 / 24389,
        k = 24389 / 27;
      const fy = (L + 16) / 116,
        fx = fy + a / 500,
        fz = fy - b / 200;
      const fi = (t) => (t * t * t > e ? t * t * t : (116 * t - 16) / k);
      const X = fi(fx) * 0.96422,
        Y = (L > k * e ? Math.pow(fy, 3) : L / k) * 1.0,
        Z = fi(fz) * 0.82521;
      const Xd = 0.9554734 * X - 0.0230985 * Y + 0.0632593 * Z;
      const Yd = -0.0283697 * X + 1.0099954 * Y + 0.0210413 * Z;
      const Zd = 0.0123141 * X - 0.0205076 * Y + 1.3303659 * Z;
      return [
        lin2srgb(3.2404542 * Xd - 1.5371385 * Yd - 0.4985314 * Zd),
        lin2srgb(-0.969266 * Xd + 1.8760108 * Yd + 0.041556 * Zd),
        lin2srgb(0.0556434 * Xd - 0.2040259 * Yd + 1.0572252 * Zd),
      ];
    };
    const parseSpace = (s) => {
      const m = String(s).trim().match(/^(oklab|oklch|lab|lch)\(([\s\S]*)\)$/i);
      if (!m) return null;
      const kind = m[1].toLowerCase();
      const inner = m[2];
      const slash = inner.indexOf("/");
      let alpha = 1,
        numsPart = inner;
      if (slash >= 0) {
        numsPart = inner.slice(0, slash);
        const aRaw = inner.slice(slash + 1).trim();
        alpha = aRaw.endsWith("%") ? parseFloat(aRaw) / 100 : parseFloat(aRaw);
        if (Number.isNaN(alpha)) alpha = 1;
      }
      const nums = (numsPart.match(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi) || []).map(Number);
      if (nums.length < 3) return null;
      let rgb;
      if (kind === "oklab") rgb = oklabToRgb(nums[0], nums[1], nums[2]);
      else if (kind === "lab") rgb = labToRgb(nums[0], nums[1], nums[2]);
      else {
        // oklch(L C H) / lch(L C H): H in degrees
        const hRad = (nums[2] * Math.PI) / 180;
        const a = nums[1] * Math.cos(hRad);
        const b = nums[1] * Math.sin(hRad);
        rgb = kind === "oklch" ? oklabToRgb(nums[0], a, b) : labToRgb(nums[0], a, b);
      }
      return [rgb[0], rgb[1], rgb[2], alpha];
    };
    /* Tailwind v4 emits color-mix(in oklab, C P%, transparent) for alpha utils */
    const parse = (c) => {
      const direct = parseRGB(c);
      if (direct) return direct;
      const sp = parseSpace(c);
      if (sp) return sp;
      const m = String(c)
        .trim()
        .match(/^color-mix\(in [\w-]+,\s*(.+?)\s+([\d.]+)%,\s*(.+?)\)$/);
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
    /* first color stop of a computed linear-gradient(…), skipping direction args */
    const gradientLead = (img) => {
      const open = img.indexOf("(");
      if (open < 0) return null;
      let depth = 0,
        start = open + 1;
      const args = [];
      for (let i = open + 1; i < img.length; i++) {
        const ch = img[i];
        if (ch === "(") depth++;
        else if (ch === ")") {
          if (depth === 0) {
            args.push(img.slice(start, i));
            break;
          }
          depth--;
        } else if (ch === "," && depth === 0) {
          args.push(img.slice(start, i));
          start = i + 1;
        }
      }
      for (const a of args) {
        // gradient stops carry a trailing position: "oklab(0 0 0 / .4) 0%"
        const c =
          parse(a.trim()) || parse(a.trim().replace(/\s+[\d.]+%$/, ""));
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
    /* colors painted by a covering overlay: itself, then transparent full-cover
       children (hero: wrapper > bg-black/60 scrim) */
    const paintOf = (o, er) => {
      const paints = [];
      const consider = (node, depth) => {
        if (node.contains(er_el)) return; // containers of the text are behind it
        const cs = getComputedStyle(node);
        const cr = node.getBoundingClientRect();
        if (!cr.width || !cr.height) return;
        if (
          !(
            cr.top <= er.top + 2 &&
            cr.left <= er.left + 2 &&
            cr.bottom >= er.bottom - 2 &&
            cr.right >= er.right - 2
          )
        )
          return;
        let c =
          cs.backgroundImage && cs.backgroundImage.includes("gradient")
            ? gradientLead(cs.backgroundImage)
            : null;
        if (!c) c = parse(cs.backgroundColor);
        if (c && c[3] > 0) paints.push(c);
        else if (depth < 2 && cs.position !== "static") {
          for (const ch of node.children) consider(ch, depth + 1);
        }
      };
      consider(o, 0);
      return paints;
    };
    let er_el = null;
    // effective bg: ancestor chain, then covering scrim/overlay siblings
    const bgOf = (el) => {
      const stack = [];
      let n = el;
      while (n && n !== document.documentElement) {
        const c = parse(getComputedStyle(n).backgroundColor);
        if (c && c[3] > 0) stack.push(c);
        if (c && c[3] === 1) break; // opaque: stop
        n = n.parentElement;
      }
      let out = [255, 255, 255];
      for (let i = stack.length - 1; i >= 0; i--) {
        const [r, g, b, a] = stack[i];
        out = [r * a + out[0] * (1 - a), g * a + out[1] * (1 - a), b * a + out[2] * (1 - a)];
      }
      const er = el.getBoundingClientRect();
      er_el = el;
      const overlays = [];
      let a2 = el.parentElement;
      while (a2 && a2 !== document.documentElement) {
        for (const ch of a2.children) {
          if (ch === el || el.contains(ch) || ch.contains(el)) continue;
          const cs = getComputedStyle(ch);
          if (cs.position !== "absolute" && cs.position !== "fixed") continue;
          const cr = ch.getBoundingClientRect();
          if (
            cr.width &&
            cr.top <= er.top + 2 &&
            cr.left <= er.left + 2 &&
            cr.bottom >= er.bottom - 2 &&
            cr.right >= er.right - 2
          )
            overlays.push(ch);
        }
        a2 = a2.parentElement;
      }
      for (const o of overlays)
        for (const c of paintOf(o, er))
          out = [
            c[0] * c[3] + out[0] * (1 - c[3]),
            c[1] * c[3] + out[1] * (1 - c[3]),
            c[2] * c[3] + out[2] * (1 - c[3]),
          ];
      return out;
    };

    const out = [];
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
      if (st.backgroundImage && st.backgroundImage.includes("gradient")) return; // bg-clip text
      const fg = parse(st.color);
      if (!fg) return;
      const bg = bgOf(el);
      const size = parseFloat(st.fontSize);
      const bold = +st.fontWeight >= 700;
      const large = size >= 24 || (bold && size >= 18.66);
      const need = large ? 3 : 4.5;
      const got = ratio(fg.slice(0, 3), bg);
      if (got < need) {
        out.push({
          text: el.textContent.trim().slice(0, 48),
          cls: el.className.toString().slice(0, 70),
          color: st.color,
          bg: `rgb(${bg.map((v) => Math.round(v)).join(",")})`,
          size: Math.round(size),
          need,
          got: +got.toFixed(2),
        });
      }
    });
    return out;
  });
  for (const b of bad) failures.push({ route, ...b });
}

if (!failures.length) console.log("CONTRAST: all routes pass AA");
for (const f of failures)
  console.log(
    `${f.route}  ${f.got}:1 (need ${f.need})  ${f.size}px  ${f.color} on ${f.bg}\n    "${f.text}"\n    ${f.cls}`
  );
console.log(`total failures: ${failures.length}`);

await browser.close();
