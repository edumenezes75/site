import { chromium, request } from "playwright";
import fs from "fs";

const BASE = "https://edumenezes.me";
const src = fs.readFileSync("src/data/projects.ts", "utf8");
const slugs = [...src.matchAll(/slug: "([^"]+)"/g)].map(m => m[1]);
const videos = [...src.matchAll(/video: "([^"]+)"/g)].map(m => m[1]);

const ctx = await request.newContext();
const bad = [];
async function check(path, expect = 200) {
  try { const r = await ctx.get(BASE + path, { timeout: 30000 }); if (r.status() !== expect) bad.push(`${r.status()} ${path}`); return r.status(); }
  catch (e) { bad.push(`ERR ${path} ${e.message.slice(0,40)}`); }
}

// routes
for (const p of ["/", "/sitemap.xml", "/robots.txt", "/opengraph-image", "/icon", "/apple-icon"]) await check(p);
for (const s of slugs) await check(`/projects/${s}`);
await check("/projects/zzz-404", 404);
// assets
for (const v of videos) { await check(`/videos/${v}`); await check(`/videos/previews/${v}`); await check(`/videos/posters/${v.replace(/\.mp4$/,".jpg")}`); }
await check("/videos/reel.mp4"); await check("/videos/reel-bg.mp4"); await check("/videos/posters/reel.jpg");
await ctx.dispose();

console.log(`ROUTES+ASSETS: ${slugs.length} projects, ${videos.length} films checked`);
console.log(bad.length ? "PROBLEMS:\n" + bad.join("\n") : "✓ all routes + assets OK (200 / 404 as expected)");
