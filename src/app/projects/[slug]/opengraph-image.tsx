import { ImageResponse } from "next/og";
import { projects } from "@/data/projects";

export const alt = "Edu Menezes — project";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BASE = "https://edumenezes.me";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  let fontData: ArrayBuffer | null = null;
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0" } }
    ).then((r) => r.text());
    const m = css.match(/url\((.+?)\)/);
    if (m) fontData = await fetch(m[1]).then((r) => r.arrayBuffer());
  } catch {}

  const serif = fontData ? "Instrument Serif, serif" : "serif";
  const poster = project?.video
    ? `${BASE}/videos/posters/${project.video.replace(/\.mp4$/, ".jpg")}`
    : undefined;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#0a0a0a" }}>
        {poster && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={poster} alt="" width={1200} height={630} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.95) 30%, rgba(10,10,10,0.25))" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px 64px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 20, letterSpacing: 4, textTransform: "uppercase", color: "rgba(242,241,237,0.7)" }}>
            <span>Edu Menezes</span>
            {project?.award && <span style={{ color: "#d0a23f" }}>{project.award}</span>}
          </div>
          <div style={{ display: "flex", flexDirection: "column", color: "#f2f1ed" }}>
            <span style={{ fontFamily: serif, fontSize: 96, lineHeight: 1 }}>{project?.title ?? "Edu Menezes"}</span>
            <span style={{ fontFamily: "monospace", fontSize: 22, letterSpacing: 3, textTransform: "uppercase", color: "rgba(242,241,237,0.7)", marginTop: 20 }}>
              {project ? `${project.client} · ${project.agency}` : "Director · Motion Design"}
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      ...(fontData && { fonts: [{ name: "Instrument Serif", data: fontData, style: "normal" as const, weight: 400 as const }] }),
    }
  );
}
