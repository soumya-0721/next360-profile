import { ImageResponse } from "next/og";

import { company } from "@/lib/site";

/*
  Per-page Open Graph card. Previously every share preview used one static
  hero photograph, so a LinkedIn post for /projects looked identical to one
  for /privacy. metadataFor now points here per route.

  No font files are fetched: Satori resolves the platform default, which keeps
  this dependency-free and fast. Only ASCII renders reliably, so the two
  glyphs that used to break output are spelled out.
*/
export const runtime = "edge";
export const alt = "Next360";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") ?? company.name).slice(0, 90);
  const label = (searchParams.get("label") ?? company.descriptor).slice(0, 60);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0f0f0f",
          padding: 72,
        }}
      >
        {/* lime rail */}
        <div style={{ display: "flex", width: 180, height: 14, background: "#ccff00" }} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#9ca3af",
            }}
          >
            {label}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontSize: 82,
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: -2.5,
              color: "#ffffff",
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                width: 44,
                height: 44,
                borderRadius: 999,
                background: "#ccff00",
              }}
            />
            <div style={{ display: "flex", fontSize: 34, fontWeight: 900, color: "#ffffff" }}>
              NEXT360
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#9ca3af" }}>{company.contact.website.replace(/^https?:\/\//, "")}</div>
        </div>
      </div>
    ),
    size,
  );
}