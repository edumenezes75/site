import { chromium } from "playwright";
const b = await chromium.launch();

async function shoot(name, url, w, h, full=false) {
  const ctx = await b.newContext({ viewport:{width:w,height:h}, deviceScaleFactor:2 });
  const p = await ctx.newPage();
  await p.goto("https://edumenezes.me"+url, {waitUntil:"load", timeout:40000});
  await p.waitForTimeout(2500);
  await p.screenshot({ path:`/tmp/audit/${name}.png`, fullPage:full });
  // hero title clipping check (homepage only)
  if (url === "/") {
    const data = await p.evaluate(() => {
      const h1 = document.querySelector("h1");
      const r = h1.getBoundingClientRect();
      const cs = getComputedStyle(h1);
      // check char spans for clipping (scrollHeight > clientHeight inside overflow-hidden)
      const clipped = [...h1.querySelectorAll("span.inline-block.overflow-hidden")].filter(s => {
        const inner = s.firstElementChild;
        return inner && inner.getBoundingClientRect().height > s.getBoundingClientRect().height + 1;
      }).length;
      return { fontSize: cs.fontSize, lineHeight: cs.lineHeight, h1Width: Math.round(r.width), vw: window.innerWidth, h1Right: Math.round(r.right), overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth+1, clippedChars: clipped };
    });
    console.log(`[${name} ${w}px] hero:`, JSON.stringify(data));
  }
  await ctx.close();
}

await shoot("hero-desktop", "/", 1440, 900);
await shoot("hero-mobile", "/", 390, 844);
await shoot("hero-narrow", "/", 768, 900);
await shoot("home-full", "/", 1440, 900, true);
await shoot("proj-desktop", "/projects/one-second-ads", 1440, 900, true);
await shoot("proj-mobile", "/projects/one-second-ads", 390, 844, true);
console.log("DONE");
await b.close();
