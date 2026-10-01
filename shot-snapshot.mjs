// Transient: screenshots of #snapshot (screen @1440 + print emulation @A4).
import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "/usr/bin/google-chrome-stable",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});
const page = await browser.newPage();

async function settle() {
  await page.evaluate(async () => {
    document.querySelectorAll("img").forEach((i) => (i.loading = "eager"));
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 15));
    }
    window.scrollTo(0, 0);
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    await Promise.all(
      [...document.images].map((img) =>
        img.complete ? null : new Promise((r) => (img.onload = img.onerror = r))
      )
    );
    await document.fonts.ready;
  });
  // let reveal transitions finish so the shot isn't caught mid-fade
  await new Promise((r) => setTimeout(r, 1200));
}

// screen
await page.setViewport({ width: 1440, height: 1000 });
await page.goto("file://" + process.cwd() + "/next360-company-profile.html", { waitUntil: "networkidle0" });
await settle();
const sec = await page.$("#snapshot");
await sec.screenshot({ path: "/tmp/snap-screen.png" });

// print emulation at A4 px
await page.emulateMediaType("print");
await page.setViewport({ width: 794, height: 1123 });
await new Promise((r) => setTimeout(r, 300));
const sec2 = await page.$("#snapshot");
await sec2.screenshot({ path: "/tmp/snap-print.png" });

await browser.close();
console.log("ok");
