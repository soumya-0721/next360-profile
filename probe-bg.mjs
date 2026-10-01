// Transient: what does Chrome actually report for Tailwind alpha backgrounds?
import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "/usr/bin/google-chrome-stable",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000 });
await page.goto("http://localhost:3000/organic", { waitUntil: "networkidle0" });
const out = await page.evaluate(() => {
  const fc = document.querySelector("figure figcaption, figcaption");
  if (!fc) return ["no figcaption"];
  const fig = fc.closest("figure");
  const scrim = [...fig.children].find((c) =>
    getComputedStyle(c).backgroundImage.includes("gradient")
  );
  return [
    "figcaption bg: " + getComputedStyle(fc).backgroundColor,
    "figcaption bg-image: " + getComputedStyle(fc).backgroundImage.slice(0, 80),
    "figure bg: " + getComputedStyle(fig).backgroundColor,
    "scrim bg-image: " +
      (scrim ? getComputedStyle(scrim).backgroundImage.slice(0, 160) : "none"),
    "scrim pos: " + (scrim ? getComputedStyle(scrim).position : "-"),
  ];
});
console.log(out.join("\n"));
await browser.close();
