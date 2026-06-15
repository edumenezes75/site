import { chromium } from "playwright";
const BASE = "https://edumenezes.me";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errors = [];
page.on("console", m => { if (m.type() === "error") errors.push(m.text().slice(0,100)); });
page.on("pageerror", e => errors.push("PAGEERR " + e.message.slice(0,100)));
const R = [];
const ok = (c, m) => R.push(`${c ? "✓" : "❌"} ${m}`);

// HOME
await page.goto(BASE + "/", { waitUntil: "load", timeout: 40000 });
await page.waitForTimeout(2500);
ok(await page.locator("header nav a").count() >= 3, "header nav present");
const heroTC1 = await page.evaluate(() => {const s=[...document.querySelectorAll('span')].find(x=>/^\d\d:\d\d:\d\d:\d\d$/.test(x.textContent.trim()));return s?s.textContent.trim():'none';});
await page.waitForTimeout(1000);
const heroTC2 = await page.evaluate(() => {const s=[...document.querySelectorAll('span')].find(x=>/^\d\d:\d\d:\d\d:\d\d$/.test(x.textContent.trim()));return s?s.textContent.trim():'none';});
ok(heroTC1 !== heroTC2 && heroTC1 !== 'none', `hero live timecode ticking (${heroTC1}->${heroTC2})`);
// hero reel playing
ok(await page.evaluate(()=>{const v=document.querySelector('section video'); return v && !v.paused && v.currentTime>0;}), "hero reel playing");
// lead hero in view + plays
await page.evaluate(() => { const s=[...document.querySelectorAll('h2')].find(x=>/Selected/.test(x.textContent)); s&&s.scrollIntoView(); });
await page.waitForTimeout(2000);
ok(await page.evaluate(()=>{const v=document.querySelectorAll('video'); for(const x of v){ if(!x.paused && x.currentTime>0) return true;} return false;}), "lead/grid video plays in view");
// filter
await page.evaluate(() => { const s=[...document.querySelectorAll('h2')].find(x=>/All/.test(x.textContent)); s&&s.scrollIntoView(); });
await page.waitForTimeout(800);
const allCount = await page.locator('#index a[href^="/projects/"]').count();
await page.locator('button:has-text("Direction")').first().click();
await page.waitForTimeout(700);
const dirCount = await page.locator('#index a[href^="/projects/"]').count();
ok(dirCount < allCount && dirCount > 0, `filter works (all ${allCount} -> Direction ${dirCount})`);
await page.locator('button:has-text("All")').first().click();
await page.waitForTimeout(500);

// NAVIGATE INTO A PROJECT
await page.goto(BASE + "/projects/one-second-ads", { waitUntil: "load", timeout: 40000 });
await page.waitForTimeout(2500);
ok((await page.locator("h1").textContent())?.includes("One Second Ads"), "project page title");
ok(await page.evaluate(()=>{const v=document.querySelector('section video'); return v && v.readyState>=2;}), "project film loaded");
ok(await page.locator('button:has-text("Watch with sound")').count() === 1, "watch-with-sound button");
ok(await page.locator('button:has-text("Fullscreen")').count() === 1, "fullscreen button");
// sound toggle
const m1 = await page.evaluate(()=>document.querySelector('section video').muted);
await page.locator('button:has-text("Watch with sound")').click();
await page.waitForTimeout(800);
const m2 = await page.evaluate(()=>document.querySelector('section video').muted);
ok(m1 === true && m2 === false, "sound toggle unmutes");
// NEXT nav (click)
const nextLink = page.locator('a:has-text("Next")').first();
await nextLink.scrollIntoViewIfNeeded();
await nextLink.click();
await page.waitForTimeout(2500);
ok(page.url().includes("/projects/autism-journey"), `next nav -> ${page.url().split('/').pop()}`);
// BACK to index
await page.locator('a:has-text("Back to Index")').first().click();
await page.waitForTimeout(2500);
ok(page.url().includes("edumenezes.me") && !page.url().includes("/projects/"), `back to index -> ${page.url()}`);
ok(await page.locator('#index').count() >= 1, "index section present after back");

console.log(R.join("\n"));
console.log("CONSOLE ERRORS:", errors.length ? errors.join(" | ") : "none");
await b.close();
