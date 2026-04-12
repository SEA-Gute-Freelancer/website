import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#C9A96E",
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "#1E1A16",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.05em",
            fontFamily: "serif",
          }}
        >
          SGF
        </span>
      </div>
    ),
    { ...size }
  );
}
