import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 1200 }, deviceScaleFactor: 1.5 });
const p = await ctx.newPage();
await p.goto("https://vimeo.com/edumenezes", { waitUntil: "load", timeout: 45000 });
await p.waitForTimeout(4000);
// scroll a bit to load cards
await p.evaluate(() => window.scrollTo(0, 700));
await p.waitForTimeout(2500);
await p.screenshot({ path: "/tmp/shots/vimeo-cards.png" });
// try hovering a video card to capture hover state
const card = p.locator('a[href*="/108"], a[href*="/97"], a[href*="/33"]').first();
try {
  const box = await card.boundingBox();
  if (box) { await p.mouse.move(box.x + box.width/2, box.y + box.height/2); await p.waitForTimeout(2500); await p.screenshot({ path: "/tmp/shots/vimeo-hover.png" }); }
} catch(e){ console.log("hover skip", e.message); }
console.log("DONE");
await b.close();
