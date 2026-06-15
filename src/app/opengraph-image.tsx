import { ImageResponse } from "next/og";

export const alt = "Edu Menezes — Director, Motion Design & Edit";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  let fontData: ArrayBuffer | null = null;
  try {
    const cssRes = await fetch(
      "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..60,700&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0" } }
    );
    const css = await cssRes.text();
    const match = css.match(/url\((.+?)\)/);
    if (match) {
      fontData = await fetch(match[1]).then((r) => r.arrayBuffer());
    }
  } catch {
    // Fall back to system font if Google Fonts is unreachable
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#f2f1ed",
          padding: "64px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: fontData ? "Bricolage Grotesque, sans-serif" : "sans-serif",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "rgba(242,241,237,0.5)",
          }}
        >
          <span>Director — Motion Design — Edit</span>
          <span style={{ color: "#c8a24a" }}>8 Cannes Lions</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: fontData ? "Bricolage Grotesque, sans-serif" : "sans-serif",
            fontWeight: 700,
            fontSize: 168,
            lineHeight: 0.95,
            letterSpacing: -4,
            textTransform: "uppercase",
          }}
        >
          <span>Edu</span>
          <span>Menezes</span>
        </div>
      </div>
    ),
    {
      ...size,
      ...(fontData && {
        fonts: [
          { name: "Bricolage Grotesque", data: fontData, style: "normal", weight: 700 },
        ],
      }),
    }
  );
}
