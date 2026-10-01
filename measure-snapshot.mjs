// Transient: deep measure of #snapshot under screen + print media.
import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "/usr/bin/google-chrome-stable",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000 });
await page.goto("file://" + process.cwd() + "/next360-company-profile.html", { waitUntil: "networkidle0" });
await page.evaluate(async () => {
  document.querySelectorAll("img").forEach((i) => (i.loading = "eager"));
  await Promise.all([...document.images].map((img) => (img.complete ? null : new Promise((r) => (img.onload = img.onerror = r)))));
  await document.fonts.ready;
});

const probe = () =>
  page.evaluate(() => {
    const out = [];
    const add = (s) => out.push(s);
    const box = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return `${sel}: MISSING`;
      const r = el.getBoundingClientRect();
      return `${sel}: x=${Math.round(r.x)} y=${Math.round(r.y + scrollY)} ${Math.round(r.width)}x${Math.round(r.height)}`;
    };
    const cs = (sel, ...props) => {
      const el = document.querySelector(sel);
      if (!el) return `${sel}: MISSING`;
      const c = getComputedStyle(el);
      return `${sel}: ` + props.map((p) => `${p}=${c[p]}`).join(" ");
    };
    add(`page-px=${getComputedStyle(document.documentElement).getPropertyValue("--page-px")}`);
    add(box("#snapshot"));
    add(box("#snapshot .chapter-head"));
    add(box("#snapshot .snapshot"));
    add(box("#snapshot .snapshot-stat"));
    add(box("#snapshot .stat-big"));
    add(box("#snapshot .stat-label"));
    add(box("#snapshot .snapshot-copy"));
    const textX = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return `${sel} text: MISSING`;
      const r = document.createRange();
      r.selectNodeContents(el);
      const t = r.getBoundingClientRect();
      return `${sel} TEXT x=${Math.round(t.x)} w=${Math.round(t.width)}`;
    };
    add(textX("#snapshot .stat-label"));
    add(textX("#snapshot .snapshot-copy .h3"));
    add(textX("#snapshot .snapshot-copy p"));
    add(textX("#snapshot .chapter-head .h2"));
    add(box("#snapshot figure.photo"));
    add(box("#snapshot figure.photo img"));
    add(box("#snapshot figure.photo figcaption"));
    add(cs("#snapshot figure.photo figcaption", "display", "color", "position", "opacity", "visibility", "fontSize"));
    add(box("#snapshot .folio"));
    add(`docHeight=${document.documentElement.scrollHeight}`);
    // vertical slack: snapshot section vs folio bottom
    const sec = document.querySelector("#snapshot").getBoundingClientRect();
    const folio = document.querySelector("#snapshot .folio").getBoundingClientRect();
    add(`section bottom=${Math.round(sec.bottom + scrollY)} folio bottom=${Math.round(folio.bottom + scrollY)}`);
    return out;
  });

console.log("=== SCREEN 1440 ===");
console.log((await probe()).join("\n"));

await page.emulateMediaType("print");
await page.setViewport({ width: 794, height: 1123 });
await new Promise((r) => setTimeout(r, 300));
console.log("\n=== PRINT 794x1123 ===");
console.log((await probe()).join("\n"));

await browser.close();
