import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: 32,
          height: 32,
          background: "#1a73e8",
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.05em",
            fontFamily: "serif",
          }}
        >
          SGF
        </span>
        <div
          style={{
            position: "absolute",
            bottom: 3,
            right: 3,
            width: 6,
            height: 6,
            background: "#fbbc04",
            borderRadius: 999,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
