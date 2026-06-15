import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
const p = await ctx.newPage();
await p.goto("http://localhost:3000/", { waitUntil: "load", timeout: 30000 });
await p.waitForTimeout(2000);
await p.evaluate(() => { const s=[...document.querySelectorAll('h2')].find(x=>/Selected/.test(x.textContent)); s&&s.scrollIntoView(); });
await p.waitForTimeout(1800);
await p.screenshot({ path: "/tmp/shots/ad-selected.png" });
// scroll to all work grid
await p.evaluate(() => { const s=[...document.querySelectorAll('h2')].find(x=>/All/.test(x.textContent)); s&&s.scrollIntoView(); });
await p.waitForTimeout(1200);
await p.screenshot({ path: "/tmp/shots/ad-allwork.png" });
console.log("DONE");
await b.close();
