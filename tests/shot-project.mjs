import { chromium } from "playwright";

const BASE = process.env.SHOT_BASE || "https://edumenezes.me";
const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();
await page.goto(BASE + "/projects/one-second-ads", { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});

// Scroll through the page in steps so ScrollTrigger reveals fire
const height = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < height; y += 700) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(250);
}
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(800);

await page.screenshot({ path: "/tmp/shots/project-scrolled-full.png", fullPage: true });
console.log("DONE project scrolled");
await browser.close();
