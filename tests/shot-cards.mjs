import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
const p = await ctx.newPage();
await p.goto("https://edumenezes.me/", { waitUntil: "load", timeout: 40000 });
await p.waitForTimeout(2500);
await p.evaluate(() => { const s=[...document.querySelectorAll('h2')].find(x=>/Selected/.test(x.textContent)); s&&s.scrollIntoView(); });
await p.waitForTimeout(1500);
await p.screenshot({ path: "/tmp/shots/cards-state.png" });
// hover a card and verify highlight plays
const card = p.locator('a[href^="/projects/"]').first();
const box = await card.boundingBox();
await p.mouse.move(box.x + box.width/2, box.y + 80);
await p.waitForTimeout(2000);
const v = await p.evaluate(() => { const vid=document.querySelector('a[href^="/projects/"] video'); return vid?{ct:Number(vid.currentTime.toFixed(2)),paused:vid.paused,playing:!vid.paused&&vid.currentTime>0}:'none'; });
console.log("hover highlight:", JSON.stringify(v));
await p.screenshot({ path: "/tmp/shots/card-hover.png", clip:{x:box.x,y:box.y,width:box.width,height:box.height} });
console.log("DONE");
await b.close();
