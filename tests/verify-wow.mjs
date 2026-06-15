import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto("http://localhost:3000/", { waitUntil: "load", timeout: 30000 });
await p.waitForTimeout(2500);
// Hero live timecode advances?
const tc1 = await p.evaluate(() => document.querySelector("section span[class*='tabular']")?.textContent || (()=>{const s=[...document.querySelectorAll('span')].find(x=>/^\d\d:\d\d:\d\d:\d\d$/.test(x.textContent.trim()));return s?s.textContent.trim():'none';})());
await p.waitForTimeout(1200);
const tc2 = await p.evaluate(() => {const s=[...document.querySelectorAll('span')].find(x=>/^\d\d:\d\d:\d\d:\d\d$/.test(x.textContent.trim()));return s?s.textContent.trim():'none';});
console.log("hero TC t0:", tc1, "-> t1:", tc2, "(advanced:", tc1!==tc2, ")");
// Scrub a card: move cursor across the first card media, check currentTime changes + timecode chip appears
const card = p.locator('a[href^="/projects/"]').first();
const box = await card.boundingBox();
await p.mouse.move(box.x + box.width*0.2, box.y + 60);
await p.waitForTimeout(600);
await p.mouse.move(box.x + box.width*0.8, box.y + 60, { steps: 10 });
await p.waitForTimeout(500);
const scrub = await p.evaluate(() => {
  const v = document.querySelector('a[href^="/projects/"] video');
  const chip = [...document.querySelectorAll('span')].find(x=>/^\d\d:\d\d:\d\d:\d\d$/.test(x.textContent.trim()) && x.className.includes('text-gold'));
  return { hasVideo: !!v, currentTime: v? Number(v.currentTime.toFixed(2)):null, paused: v? v.paused:null, chip: chip?chip.textContent.trim():'none' };
});
console.log("scrub:", JSON.stringify(scrub));
await b.close();
