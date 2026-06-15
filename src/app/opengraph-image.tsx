import { ImageResponse } from "next/og";

export const alt = "Edu Menezes — Director, Motion Design & Edit";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  let fontData: ArrayBuffer | null = null;
  try {
    const cssRes = await fetch(
      "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap",
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

  const serif = fontData ? "Instrument Serif, serif" : "serif";

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
            fontFamily: "monospace",
            fontSize: 20,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: "rgba(242,241,237,0.6)",
          }}
        >
          <span>Director — Motion Design — Edit</span>
          <span style={{ color: "#c6aa6e" }}>8 Cannes Lions</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: serif,
            fontSize: 180,
            lineHeight: 0.9,
            letterSpacing: -2,
          }}
        >
          <span>Edu</span>
          <span style={{ fontStyle: "italic" }}>Menezes</span>
        </div>
      </div>
    ),
    {
      ...size,
      ...(fontData && {
        fonts: [
          { name: "Instrument Serif", data: fontData, style: "normal", weight: 400 },
        ],
      }),
    }
  );
}
