// Transient: screen geometry audit for v-flag card + chapter 04 + chapter 05.
import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "/usr/bin/google-chrome-stable",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000 });
await page.goto("file://" + process.cwd() + "/next360-company-profile.html", {
  waitUntil: "networkidle0",
});
await page.evaluate(async () => {
  document.querySelectorAll("img").forEach((i) => (i.loading = "eager"));
  for (let y = 0; y < document.body.scrollHeight; y += 400) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 20));
  }
  window.scrollTo(0, 0);
  document
    .querySelectorAll(".reveal")
    .forEach((el) => el.classList.add("is-visible"));
  await Promise.all(
    [...document.images].map((img) =>
      img.complete ? null : new Promise((r) => (img.onload = img.onerror = r))
    )
  );
  await document.fonts.ready;
});

const data = await page.evaluate(() => {
  const box = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return `${sel}: MISSING`;
    const r = el.getBoundingClientRect();
    return `${sel}: ${Math.round(r.width)}x${Math.round(r.height)} @ y=${Math.round(r.top + scrollY)}`;
  };
  const lines = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return `${sel}: MISSING`;
    const cs = getComputedStyle(el);
    const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2;
    return `${sel}: ${Math.round(el.getBoundingClientRect().height / lh)} lines (w=${Math.round(el.getBoundingClientRect().width)}px, fs=${cs.fontSize}, ff=${cs.fontFamily.split(",")[0]})`;
  };
  const out = [];
  const add = (s) => out.push(s);

  add("--- FLAGSHIP CARD ---");
  add(box(".v-flag"));
  add(lines(".v-flag h3"));
  add(lines(".v-flag p"));
  add(box(".v-flag .photo"));
  add(box(".v-flag > div"));

  add("--- CH04 FLAGSHIP PAGE ---");
  add(box("#flagship"));
  add(box("#flagship .chapter-head"));
  add(box("#flagship .photo-band"));
  add(box("#flagship .flag-flow"));
  const ff = document.querySelector("#flagship .flag-flow");
  if (ff) add(`flag-flow display=${getComputedStyle(ff).display} cols=${getComputedStyle(ff).gridTemplateColumns}`);
  const wrap = ff && ff.firstElementChild;
  if (wrap) {
    const r = wrap.getBoundingClientRect();
    add(`flag-flow child1: ${Math.round(r.width)}x${Math.round(r.height)} display=${getComputedStyle(wrap).display}`);
  }
  add(box("#flagship .flow"));
  add(box("#flagship .flow-steps"));
  add(box("#flagship .flag-visual"));
  add(box("#flagship .flag-visual svg"));
  add(box("#flagship .flag-caps"));
  const caps = document.querySelectorAll("#flagship .flag-cap");
  if (caps[0]) {
    const r = caps[0].getBoundingClientRect();
    add(`flag-cap cell: ${Math.round(r.width)}x${Math.round(r.height)} (n=${caps.length})`);
  }
  add(box("#flagship .folio"));

  add("--- CH07 SNAPSHOT ---");
  add(box("#snapshot"));
  add(box("#snapshot .snapshot"));
  add(box("#snapshot .snapshot-stat"));
  add(box("#snapshot .stat-big"));
  add(box("#snapshot .snapshot-copy"));
  const snap = document.querySelector("#snapshot .snapshot");
  if (snap) add(`snapshot cols=${getComputedStyle(snap).gridTemplateColumns} align=${getComputedStyle(snap).alignItems}`);
  add(box("#snapshot figure.photo"));
  add(box("#snapshot figure.photo img"));
  add(box("#snapshot .folio"));

  add("--- CH05 SLICK ---");
  add(box("#slick"));
  add(box("#slick .chapter-head"));
  add(box("#slick .eco-hero"));
  add(box("#slick .eco-diagram"));
  add(box("#slick .eco-diagram svg"));
  add(box("#slick .slick-bottom"));
  const sb = document.querySelector("#slick .slick-bottom");
  if (sb) add(`slick-bottom cols=${getComputedStyle(sb).gridTemplateColumns}`);
  add(box("#slick .slick-strip"));
  add(box("#slick .eco-list"));
  add(box("#slick .folio"));
  add(`A4 sheet = 1123px; scrollWidth=${document.documentElement.scrollWidth}`);
  return out;
});

console.log(data.join("\n"));
await browser.close();
