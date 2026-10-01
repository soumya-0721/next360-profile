// Transient: full-page screenshots of the restored reference look.
import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "/usr/bin/google-chrome-stable",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000 });

async function shot(path, out) {
  await page.goto("http://localhost:3000" + path, { waitUntil: "networkidle0" });
  await page.evaluate(async () => {
    document.querySelectorAll("[data-animation-on-scroll], .reveal").forEach((el) =>
      el.classList.add("animate-on-scroll-visible", "is-visible")
    );
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 30));
    }
    window.scrollTo(0, 0);
    await document.fonts.ready;
    await new Promise((r) => setTimeout(r, 900));
  });
  await page.screenshot({ path: out, fullPage: true });
}

await shot("/", "/tmp/site-home.png");
await shot("/about", "/tmp/site-about.png");
await browser.close();
console.log("ok");
