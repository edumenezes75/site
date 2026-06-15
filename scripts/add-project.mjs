#!/usr/bin/env node
/**
 * Add (or refresh) a project's video assets in one command.
 *
 *   node scripts/add-project.mjs <input-video> <slug>
 *   e.g.  node scripts/add-project.mjs ~/Desktop/new-film.mp4 my-new-film
 *
 * It generates, all web-optimised with faststart:
 *   public/videos/<slug>.mp4            full film (H.264 CRF 23, ≤1080p, AAC)
 *   public/videos/previews/<slug>.mp4   ~8s muted highlight (most dynamic cut)
 *   public/videos/posters/<slug>.jpg    poster pulled from the highlight
 * and prints the duration + a data snippet to paste into src/data/projects.ts.
 *
 * Requires ffmpeg on PATH (brew install ffmpeg) — or set FFMPEG=/path/to/ffmpeg.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const FF = process.env.FFMPEG || "ffmpeg";
const [, , input, slug] = process.argv;

function die(msg) { console.error("✗ " + msg); process.exit(1); }
if (!input || !slug) die("usage: node scripts/add-project.mjs <input-video> <slug>");
if (!existsSync(input)) die(`input not found: ${input}`);
if (!/^[a-z0-9-]+$/.test(slug)) die(`slug must be kebab-case (a-z, 0-9, -): "${slug}"`);
try { execFileSync(FF, ["-version"], { stdio: "ignore" }); }
catch { die(`ffmpeg not found. Install it (brew install ffmpeg) or set FFMPEG=/path/to/ffmpeg`); }

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const dirs = {
  video: path.join(root, "public/videos"),
  prev: path.join(root, "public/videos/previews"),
  post: path.join(root, "public/videos/posters"),
};
for (const d of Object.values(dirs)) mkdirSync(d, { recursive: true });

const ff = (args) => spawnSync(FF, args, { encoding: "utf8" });

// --- duration ---
const probe = ff(["-hide_banner", "-i", input]).stderr || "";
const dm = probe.match(/Duration: (\d+):(\d+):(\d+\.\d+)/);
const seconds = dm ? (+dm[1]) * 3600 + (+dm[2]) * 60 + parseFloat(dm[3]) : 0;
const duration = `${Math.floor(seconds / 60)}:${String(Math.round(seconds % 60)).padStart(2, "0")}`;

// --- 1. full film, web-optimised ---
const out = path.join(dirs.video, `${slug}.mp4`);
console.log("→ compressing full film…");
ff(["-y", "-i", input, "-c:v", "libx264", "-crf", "23", "-preset", "fast",
  "-pix_fmt", "yuv420p", "-vf", "scale='min(1920,iw)':-2",
  "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", out]);

// --- 2. find the most dynamic ~8s (scene-change density) ---
console.log("→ detecting highlight…");
const sc = ff(["-hide_banner", "-i", out, "-vf",
  "select='gt(scene,0.35)',metadata=print", "-an", "-f", "null", "-"]).stderr || "";
const times = [...sc.matchAll(/pts_time:(\d+\.?\d*)/g)].map((m) => parseFloat(m[1]));
const WIN = 8;
let start = Math.max(0, Math.min(seconds * 0.35, Math.max(0, seconds - WIN)));
if (times.length >= 4 && seconds > WIN) {
  let best = -1, bestN = -1;
  for (const t of times) {
    if (t + WIN > seconds) continue;
    const n = times.filter((x) => x >= t && x < t + WIN).length;
    if (n > bestN) { bestN = n; best = t; }
  }
  if (best >= 0) start = best;
}

// --- 3. preview clip (light, muted) ---
console.log(`→ preview from ${start.toFixed(1)}s…`);
ff(["-y", "-ss", start.toFixed(2), "-t", "8", "-i", out, "-an",
  "-vf", "scale=640:-2,fps=24", "-c:v", "libx264", "-crf", "30",
  "-preset", "veryfast", "-movflags", "+faststart", path.join(dirs.prev, `${slug}.mp4`)]);

// --- 4. poster from mid-highlight ---
console.log("→ poster…");
ff(["-y", "-ss", (start + 3).toFixed(2), "-i", out, "-frames:v", "1", "-q:v", "3",
  path.join(dirs.post, `${slug}.jpg`)]);

console.log(`\n✓ Done — ${slug} (${duration})\n`);
console.log("Paste into src/data/projects.ts:");
console.log(`  video: "${slug}.mp4",`);
console.log(`  duration: "${duration}",`);
console.log("  hasFilm: true,");
console.log("(plus slug, title, client, agency, year, overview, brief, idea, result, credits)\n");
