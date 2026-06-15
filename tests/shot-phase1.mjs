import { chromium } from "playwright";
const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:2});
const p=await ctx.newPage();
await p.goto("http://localhost:3000/",{waitUntil:"load",timeout:30000});
await p.waitForTimeout(2500);
// checks
const cta = await p.locator('header a:has-text("Start a project")').count();
const avail = await p.locator('text=Available for projects worldwide').count();
const posi = await p.locator('text=Motion director for award-winning campaigns').count();
const mailto = await p.locator('header a[href^="mailto:"]').getAttribute('href');
console.log("header CTA:", cta, "| availability:", avail, "| positioning:", posi);
console.log("mailto prefilled:", (mailto||'').slice(0,70));
await p.screenshot({path:"/tmp/shots/p1-hero.png"});
await p.evaluate(()=>{const f=document.querySelector('#about'); f&&f.scrollIntoView();});
await p.waitForTimeout(1200);
await p.screenshot({path:"/tmp/shots/p1-contact.png"});
console.log("DONE");
await b.close();
