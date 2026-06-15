import { chromium } from "playwright";
const b=await chromium.launch(); const p=await (await b.newContext({viewport:{width:1440,height:1000}})).newPage();
await p.goto("http://localhost:3000/",{waitUntil:"load",timeout:30000}); await p.waitForTimeout(1500);
await p.evaluate(()=>{const s=[...document.querySelectorAll('h2')].find(x=>/Selected/.test(x.textContent));s&&s.scrollIntoView();}); await p.waitForTimeout(800);
const hrefs = await p.evaluate(()=>[...document.querySelectorAll('#index a[href^="/projects/"]')].map(a=>a.getAttribute('href')));
const uniq=new Set(hrefs);
console.log("All view: total card links =", hrefs.length, "| unique =", uniq.size, "| duplicates =", hrefs.length-uniq.size);
// filter Direction
await p.locator('button:has-text("Direction")').first().click(); await p.waitForTimeout(700);
const dh = await p.evaluate(()=>[...document.querySelectorAll('#index a[href^="/projects/"]')].map(a=>a.getAttribute('href')));
console.log("Direction view: links =", dh.length, "| unique =", new Set(dh).size, JSON.stringify(dh));
await b.close();
