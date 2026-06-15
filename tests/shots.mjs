import { chromium } from "playwright";

const BASE = process.env.SHOT_BASE || "https://edumenezes.me";
const shots = [
  { name: "home-desktop", url: "/", w: 1440, h: 900, full: false },
  { name: "home-desktop-full", url: "/", w: 1440, h: 900, full: true },
  { name: "home-mobile", url: "/", w: 390, h: 844, full: false },
  { name: "project-desktop", url: "/projects/one-second-ads", w: 1440, h: 900, full: true },
  { name: "project-mobile", url: "/projects/one-second-ads", w: 390, h: 844, full: false },
];

const browser = await chromium.launch();
for (const s of shots) {
  const ctx = await browser.newContext({
    viewport: { width: s.w, height: s.h },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  await page.goto(BASE + s.url, { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `/tmp/shots/${s.name}.png`, fullPage: s.full });
  console.log("captured", s.name);
  await ctx.close();
}
await browser.close();
console.log("DONE");
