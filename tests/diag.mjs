import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto("http://localhost:3000/projects/one-second-ads", { waitUntil: "load", timeout: 30000 });
const h = await p.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < h; y += 600) { await p.evaluate(yy => window.scrollTo(0, yy), y); await p.waitForTimeout(200); }
await p.waitForTimeout(1500);
const data = await p.evaluate(() => {
  const labels = ["The Brief","The Idea","The Result","Credits"];
  return labels.map(lbl => {
    const span = [...document.querySelectorAll("span")].find(s => s.textContent.trim() === lbl);
    if (!span) return lbl + ": NOT FOUND";
    const section = span.closest("section");
    const reveals = section ? [...section.children] : [];
    const info = reveals.map(r => getComputedStyle(r).opacity + (r.textContent.trim().slice(0,18)));
    const secTop = section ? Math.round(section.getBoundingClientRect().top + window.scrollY) : -1;
    return `${lbl} @${secTop}px -> ${JSON.stringify(info)}`;
  });
});
console.log(data.join("\n"));
await b.close();
