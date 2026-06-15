import { chromium } from "playwright";
const BASE = "https://edumenezes.me";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const R=[]; const ok=(c,m)=>R.push(`${c?"✓":"❌"} ${m}`);

await page.goto(BASE + "/projects/one-second-ads", { waitUntil: "load" });
await page.waitForTimeout(1500);
// inspect prev/next hrefs
const navHrefs = await page.evaluate(() => [...document.querySelectorAll('nav a[href^="/projects/"]')].map(a=>a.getAttribute('href')));
ok(navHrefs.length===2, "prev+next links exist: " + JSON.stringify(navHrefs));

// click NEXT and wait for URL change
const next = page.locator('nav a:has-text("Next")');
await next.scrollIntoViewIfNeeded();
try { await Promise.all([ page.waitForURL("**/projects/autism-journey", { timeout: 8000 }), next.click() ]); ok(true, "NEXT navigates -> autism-journey"); }
catch { ok(false, "NEXT failed, url=" + page.url()); }

await page.waitForTimeout(1500);
// click PREVIOUS
const prev = page.locator('nav a:has-text("Previous")');
await prev.scrollIntoViewIfNeeded();
try { await Promise.all([ page.waitForURL("**/projects/one-second-ads", { timeout: 8000 }), prev.click() ]); ok(true, "PREVIOUS navigates -> one-second-ads"); }
catch { ok(false, "PREV failed, url=" + page.url()); }

await page.waitForTimeout(1500);
// click a card from index -> project
await page.goto(BASE + "/", { waitUntil: "load" });
await page.waitForTimeout(1500);
await page.evaluate(() => { const s=[...document.querySelectorAll('h2')].find(x=>/All/.test(x.textContent)); s&&s.scrollIntoView(); });
await page.waitForTimeout(800);
const firstCard = page.locator('#index a[href^="/projects/"]').first();
const href = await firstCard.getAttribute("href");
try { await Promise.all([ page.waitForURL("**"+href, { timeout: 8000 }), firstCard.click() ]); ok(true, "card click navigates -> " + href); }
catch { ok(false, "card click failed, url=" + page.url()); }

console.log(R.join("\n"));
await b.close();
