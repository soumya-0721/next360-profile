import puppeteer from "puppeteer-core";

const FILE = "file://" + process.cwd() + "/next360-company-profile.html";
const OFFLINE = process.argv.includes("--offline");

const b = await puppeteer.launch({
  executablePath: "/usr/bin/google-chrome-stable",
  headless: "new",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

let fails = 0;
const check = (name, ok, extra = "") => {
  if (!ok) fails++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${extra ? "  " + extra : ""}`);
};

async function run(width, height, label) {
  const page = await b.newPage();
  await page.setViewport({ width, height });
  const errors = [];
  const blocked = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  if (OFFLINE) {
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      if (req.url().startsWith("file://")) req.continue();
      else { blocked.push(req.url()); req.abort(); }
    });
  }
  await page.goto(FILE, { waitUntil: "networkidle0" });

  // kill smooth scrolling, force eager images, walk the page
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = "auto";
    document.querySelectorAll("img").forEach((i) => (i.loading = "eager"));
    const h = document.body.scrollHeight;
    for (let y = 0; y <= h; y += 400) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });

  // wait for images with deadline
  await page
    .waitForFunction(
      () => [...document.images].every((i) => i.complete),
      { timeout: 15000 },
    )
    .catch(() => {});

  const d = await page.evaluate(() => {
    const overflow =
      document.documentElement.scrollWidth - document.documentElement.clientWidth;
    const imgs = [...document.images];
    const badImgs = imgs
      .filter((i) => !i.complete || i.naturalWidth === 0)
      .map((i) => i.getAttribute("src"));
    const anchors = [...document.querySelectorAll(".doc-nav a")].filter(
      (a) => !document.querySelector(a.getAttribute("href")),
    ).length;
    const hiddenEls = [...document.querySelectorAll(".reveal")].filter(
      (el) => getComputedStyle(el).opacity === "0",
    );
    const hidden = hiddenEls.length;
    const hiddenNames = hiddenEls
      .map((el) => (el.className || el.tagName) + "@" + Math.round(el.getBoundingClientRect().top + window.scrollY))
      .slice(0, 6);
    const wide = [...document.querySelectorAll("body *")]
      .filter((el) => el.getBoundingClientRect().width > window.innerWidth + 2)
      .map((el) => el.className || el.tagName)
      .slice(0, 5);
    return {
      overflow,
      imgCount: imgs.length,
      badImgs,
      anchors,
      hidden,
      hiddenNames,
      wide,
      pages: document.querySelectorAll("section.page").length,
      chapterHeads: document.querySelectorAll(".chapter-head").length,
      hasEmDash: /—/.test(document.body.innerText),
      serifApplied: getComputedStyle(
        document.querySelector(".chapter-head .h2"),
      ).fontFamily.includes("Serif"),
      coverH1: getComputedStyle(document.querySelector(".cover h1")).fontSize,
      scrim: getComputedStyle(document.querySelector(".cover-bg"), "::after")
        .backgroundColor,
    };
  });

  check(`[${label}] no console/page errors`, errors.length === 0, errors.join(" | "));
  check(`[${label}] no horizontal overflow`, d.overflow <= 0, `overflow=${d.overflow}`);
  check(`[${label}] no element wider than viewport`, d.wide.length === 0, d.wide.join(", "));
  check(`[${label}] all images loaded from disk`, d.badImgs.length === 0, d.badImgs.join(", "));
  check(`[${label}] 11 pages`, d.pages === 11, `got ${d.pages}`);
  check(`[${label}] 9 chapter openers`, d.chapterHeads === 9, `got ${d.chapterHeads}`);
  check(`[${label}] all nav anchors resolve`, d.anchors === 0, `${d.anchors} dead`);
  check(`[${label}] all reveals visible`, d.hidden === 0, `${d.hidden} hidden: ${d.hiddenNames.join(", ")}`);
  check(`[${label}] no em dash in text`, !d.hasEmDash);
  check(`[${label}] serif display font on h2`, d.serifApplied);
  check(`[${label}] cover h1 >= 3.4rem`, parseFloat(d.coverH1) >= 54.4, d.coverH1);

  // print button
  await page.evaluate(() => { window.print = () => { window.__printed = true; }; });
  await page.click("#printBtn").catch(() => {});
  const printed = await page.evaluate(() => !!window.__printed);
  check(`[${label}] print button fires window.print`, printed);

  if (OFFLINE) {
    const remoteImgs = blocked.filter((u) => /\.(jpe?g|png|webp|avif|gif)/i.test(u));
    check(`[${label}] 0 remote image requests offline`, remoteImgs.length === 0, remoteImgs.join(", "));
  }

  await page.close();
}

await run(1440, 960, OFFLINE ? "1440 offline" : "1440");
await run(900, 900, OFFLINE ? "900 offline" : "900");
await run(390, 844, OFFLINE ? "390 offline" : "390");

await b.close();
console.log(fails === 0 ? "\nALL PASS" : `\n${fails} FAILURES`);
process.exit(fails ? 1 : 0);
