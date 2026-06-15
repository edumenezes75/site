import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const p = await ctx.newPage();
await p.goto("http://localhost:3000/projects/one-second-ads", { waitUntil: "load", timeout: 30000 });
const h = await p.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < h; y += 600) { await p.evaluate(yy => window.scrollTo(0, yy), y); await p.waitForTimeout(200); }
await p.evaluate(() => window.scrollTo(0, 900));
await p.waitForTimeout(1000);
await p.screenshot({ path: "/tmp/shots/brief-viewport.png" });
console.log("DONE");
await b.close();
