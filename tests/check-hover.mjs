import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } });
const p = await ctx.newPage();
await p.goto("http://localhost:3000/", { waitUntil: "load", timeout: 30000 });
await p.waitForTimeout(1500);
await p.evaluate(() => { const s=[...document.querySelectorAll('h2')].find(x=>/All/.test(x.textContent)); s&&s.scrollIntoView(); });
await p.waitForTimeout(1000);
// pick an All Work card (after lead+featured) and check its OWN img
const card = p.locator('#index a[href^="/projects/"]').nth(8);
const box = await card.boundingBox();
const before = await card.locator('img').first().evaluate(el => getComputedStyle(el).filter);
await p.mouse.move(box.x + box.width/2, box.y + box.height*0.25);
await p.waitForTimeout(900);
const after = await card.locator('img').first().evaluate(el => getComputedStyle(el).filter);
console.log("same-card filter before:", before, "| after hover:", after);
await b.close();
