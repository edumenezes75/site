// Format seconds as broadcast timecode HH:MM:SS:FF (frames at the given fps).
export function formatTimecode(seconds: number, fps = 24): string {
  const t = Number.isFinite(seconds) && seconds > 0 ? seconds : 0;
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = Math.floor(t % 60);
  const f = Math.floor((t % 1) * fps);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(h)}:${p(m)}:${p(s)}:${p(f)}`;
}
