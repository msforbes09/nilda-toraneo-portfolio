import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Required for `output: "export"`: the route has no request-time input.
export const dynamic = "force-static";

const { person, meta } = site;

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#0f1b2d",
        color: "#f4f1ea",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontSize: 22,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: "#b8c0cf",
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "#1f7a4d",
          }}
        />
        {person.title}
      </div>
      <div
        style={{
          marginTop: 28,
          fontSize: 64,
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: -1,
        }}
      >
        {person.name}
      </div>
      <div
        style={{
          marginTop: 24,
          fontSize: 28,
          color: "#b8c0cf",
          maxWidth: 900,
        }}
      >
        {meta.description}
      </div>
    </div>,
    { ...size },
  );
}
