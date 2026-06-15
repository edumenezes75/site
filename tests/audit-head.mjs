import { request } from "playwright";
import fs from "fs";
const BASE="https://edumenezes.me";
const src=fs.readFileSync("src/data/projects.ts","utf8");
const videos=[...src.matchAll(/video: "([^"]+)"/g)].map(m=>m[1]);
const ctx=await request.newContext();
const bad=[]; let okc=0;
for (const v of [...videos, "reel.mp4", "reel-bg.mp4"]) {
  try {
    const r=await ctx.fetch(`${BASE}/videos/${v}`, { method:"HEAD", timeout:20000 });
    const len=r.headers()["content-length"];
    if (r.status()===200) okc++; else bad.push(`${r.status()} ${v}`);
  } catch(e){ bad.push(`ERR ${v}`); }
}
await ctx.dispose();
console.log(`Full films HEAD: ${okc} OK`);
console.log(bad.length? "PROBLEMS:\n"+bad.join("\n") : "✓ all full films return 200");
