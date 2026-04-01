import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ciel Fortune — 世界を旅するCAが届ける恋愛占い";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// OG画像は1日キャッシュ
export const revalidate = 86400;

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0d0d1a 0%, #1a1a2e 50%, #0d0d1a 100%)",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Stars */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              borderRadius: "50%",
              background: "#c4a265",
              opacity: 0.2 + Math.random() * 0.4,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Gold border frame */}
        <div
          style={{
            position: "absolute",
            inset: "24px",
            border: "1px solid rgba(196, 162, 101, 0.3)",
            borderRadius: "8px",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: "16px",
              letterSpacing: "0.3em",
              color: "#c4a265",
              textTransform: "uppercase" as const,
            }}
          >
            Ciel Fortune
          </div>

          <div
            style={{
              fontSize: "48px",
              color: "#f8f5f0",
              fontWeight: 400,
              textAlign: "center",
              lineHeight: 1.4,
            }}
          >
            世界を旅するCAが届ける
            <br />
            恋愛占い
          </div>

          <div
            style={{
              fontSize: "16px",
              color: "rgba(232, 228, 223, 0.5)",
              marginTop: "8px",
            }}
          >
            タロット・占星術・四柱推命 — 8つの占いで恋を導く
          </div>

          {/* Fortune emojis */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "24px",
              fontSize: "28px",
            }}
          >
            <span>🃏</span>
            <span>✨</span>
            <span>🏯</span>
            <span>☕</span>
            <span>🔢</span>
            <span>🕉</span>
            <span>🌸</span>
          </div>

          <div
            style={{
              marginTop: "24px",
              border: "1px solid #c4a265",
              borderRadius: "4px",
              padding: "10px 32px",
              fontSize: "14px",
              color: "#c4a265",
              letterSpacing: "0.15em",
            }}
          >
            基本鑑定 無料 ／ 詳細鑑定 ¥300〜
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
