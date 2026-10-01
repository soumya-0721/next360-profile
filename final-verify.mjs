import puppeteer from "puppeteer-core";
import { execSync } from "child_process";
import fs from "fs";

const FILE = "file://" + process.cwd() + "/next360-a4-profile.html";
let fails = 0;
const check = (name, ok, extra = "") => { if (!ok) fails++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${extra ? "  " + extra : ""}`); };

const b = await puppeteer.launch({ executablePath: "/usr/bin/google-chrome-stable", headless: "new",
  args: ["--no-sandbox", "--disable-dev-shm-usage"] });

async function render(pdf, { scroll }) {
  const page = await b.newPage();
  await page.setViewport({ width: 1440, height: 1000 });
  const errors = [];
  page.on("console", m => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", e => errors.push(String(e)));
  await page.goto(FILE, { waitUntil: "networkidle0" });
  if (scroll) {
    await page.evaluate(async () => {
      const h = document.body.scrollHeight;
      for (let y = 0; y <= h; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 25)); }
      window.scrollTo(0, 0);
    });
    await page.waitForFunction(() => [...document.images].every(i => i.complete), { timeout: 15000 }).catch(() => {});
  } else {
    // cold: simulate a user printing straight away; give the load-handler only a moment
    await new Promise(r => setTimeout(r, scroll === false ? 500 : 0));
  }
  const geo = await page.evaluate(() => {
    const sheets = [...document.querySelectorAll(".sheet")];
    const clipped = sheets.filter(s => s.scrollHeight - s.clientHeight > 0).map(s => s.id);
    return { n: sheets.length, clipped, em: /—|–/.test(document.body.innerText) };
  });
  check(`[${pdf}] 14 sheets`, geo.n === 14, `got ${geo.n}`);
  check(`[${pdf}] no clipped sheet`, geo.clipped.length === 0, geo.clipped.join(","));
  check(`[${pdf}] no em dash in rendered text`, !geo.em);
  check(`[${pdf}] no console/page errors`, errors.length === 0, errors.join(" | "));
  await page.pdf({ path: pdf, printBackground: true, preferCSSPageSize: true });
  const info = execSync(`pdfinfo ${pdf}`).toString();
  const pages = +info.match(/Pages:\s+(\d+)/)[1];
  const size = info.match(/Page size:.*\(([^)]+)\)/)[1];
  check(`[${pdf}] 14 A4 pages`, pages === 14 && size === "A4", `${pages} pages, ${size}`);
  await page.close();
  return pdf;
}

const sample = (pdf, page, x, y) => {
  execSync(`pdftoppm -r 72 -f ${page} -l ${page} -singlefile ${pdf} /tmp/v`);
  const buf = fs.readFileSync("/tmp/v.ppm");
  let i = 0; const f = [];
  while (f.length < 4) { while ([32,10,9].includes(buf[i])) i++;
    if (buf[i] === 35) { while (buf[i] !== 10) i++; continue; }
    let s = ""; while (![32,10,9].includes(buf[i])) s += String.fromCharCode(buf[i++]); f.push(s); }
  i++; const w = +f[1], off = (y * w + x) * 3;
  return [buf[i+off], buf[i+off+1], buf[i+off+2]];
};
const near = (p, r, g, bl) => Math.abs(p[0]-r) + Math.abs(p[1]-g) + Math.abs(p[2]-bl) < 24;

// COLD render: lazy images must now print via the load-time upgrade
await render("verify-cold.pdf", { scroll: false });
const backStrip = sample("verify-cold.pdf", 14, 300, 60);
check("cold PDF: p14 photo strip printed (not sheet green)", !near(backStrip, 23, 56, 42), `rgb(${backStrip})`);
const snapPhoto = sample("verify-cold.pdf", 11, 520, 400);
check("cold PDF: p11 photo printed (not empty sage+tint)", !near(snapPhoto, 173, 186, 176), `rgb(${snapPhoto})`);
const sheetBg = sample("verify-cold.pdf", 2, 45, 420);
check("cold PDF: ivory sheet bg printed", near(sheetBg, 252, 251, 247), `rgb(${sheetBg})`);
const vNote = sample("verify-cold.pdf", 5, 300, 700);
check("cold PDF: sage v-note printed", near(vNote, 238, 243, 234), `rgb(${vNote})`);

// print button: exactly one window.print, after images ready
const page = await b.newPage();
await page.setViewport({ width: 1440, height: 1000 });
await page.goto(FILE, { waitUntil: "networkidle0" });
const fired = await page.evaluate(async () => {
  let calls = 0;
  window.print = () => calls++;
  document.getElementById("printBtn").click();
  await new Promise(r => setTimeout(r, 6000));
  const allEager = [...document.images].every(i => i.loading === "eager");
  return { calls, allEager, total: document.images.length };
});
check("print button fires window.print exactly once", fired.calls === 1, `calls=${fired.calls}`);
check("all images upgraded to eager after load", fired.allEager, `${fired.total} imgs`);
await page.close();

// print with backgrounds OFF must now be identical (the checkbox no longer matters)
const p2 = await b.newPage();
await p2.goto(FILE, { waitUntil: "networkidle0" });
await p2.evaluate(() => [...document.images].forEach(i => { i.loading = "eager"; }));
await new Promise(r => setTimeout(r, 3000));
await p2.pdf({ path: "verify-nobg.pdf", printBackground: false, preferCSSPageSize: true });
await p2.close();
const nbIvory = sample("verify-nobg.pdf", 2, 45, 420);
check("background-graphics-OFF: ivory sheet still printed", near(nbIvory, 252, 251, 247), `rgb(${nbIvory})`);
const nbNote = sample("verify-nobg.pdf", 5, 300, 700);
check("background-graphics-OFF: sage v-note still printed", near(nbNote, 238, 243, 234), `rgb(${nbNote})`);
const nbFocus = sample("verify-nobg.pdf", 12, 300, 300);
check("background-graphics-OFF: sheet bg or sage row, not white", !near(nbFocus, 255, 255, 255), `rgb(${nbFocus})`);

await b.close();
console.log(fails === 0 ? "\nALL PASS" : `\n${fails} FAILURES`);
process.exit(fails ? 1 : 0);
