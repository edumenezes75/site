import { chromium, devices } from "playwright";
const BASE="https://edumenezes.me";
const b=await chromium.launch();
const ctx=await b.newContext({ ...devices["iPhone 12"] });
const page=await ctx.newPage();
const errs=[]; page.on("pageerror",e=>errs.push(e.message.slice(0,80)));
const R=[]; const ok=(c,m)=>R.push(`${c?"✓":"❌"} ${m}`);

await page.goto(BASE+"/", { waitUntil:"load", timeout:40000 });
await page.waitForTimeout(2500);
const ov = await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth+1);
ok(!ov, `home no horizontal overflow (vw=${await page.evaluate(()=>innerWidth)})`);
ok(await page.evaluate(()=>document.body.hasAttribute('data-cursor-ready')), "hydrated");
// scroll to grid, check a card video autoplays in view (touch)
await page.evaluate(()=>{const s=[...document.querySelectorAll('h2')].find(x=>/All/.test(x.textContent));s&&s.scrollIntoView();});
await page.waitForTimeout(2500);
ok(await page.evaluate(()=>{for(const v of document.querySelectorAll('#index video')){if(!v.paused&&v.currentTime>0)return true;}return false;}), "card autoplays in view (touch)");
// tap a card -> project
const card = page.locator('#index a[href^="/projects/"]').first();
const href = await card.getAttribute("href");
try{ await Promise.all([page.waitForURL("**"+href,{timeout:8000}), card.tap()]); ok(true,"tap navigates -> "+href);}catch{ok(false,"tap failed "+page.url());}
await page.waitForTimeout(2000);
const ov2 = await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth+1);
ok(!ov2, "project page no horizontal overflow");
ok((await page.locator("h1").textContent())?.length>0, "project h1 renders");

console.log(R.join("\n"));
console.log("MOBILE ERRORS:", errs.length?errs.join(" | "):"none");
await b.close();
