import { ImageResponse } from "next/og";
import { fortunes } from "@/data/fortunes";

export const runtime = "edge";
export const alt = "Ciel Fortune";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// OG画像は1日キャッシュ
export const revalidate = 86400;

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fortune = fortunes.find((f) => f.slug === slug);
  const name = fortune?.name || "占い";
  const emoji = fortune?.emoji || "✨";
  const region = fortune?.regionEn || "";
  const lovePoint = fortune?.lovePoint || "";

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
        {/* Gold border */}
        <div
          style={{
            position: "absolute",
            inset: "24px",
            border: "1px solid rgba(196, 162, 101, 0.3)",
            borderRadius: "8px",
            display: "flex",
          }}
        />
        {/* Decorative stars */}
        {[
          { top: "15%", left: "12%", size: 4, opacity: 0.3 },
          { top: "22%", right: "15%", size: 3, opacity: 0.2 },
          { top: "72%", left: "18%", size: 3, opacity: 0.25 },
          { top: "68%", right: "10%", size: 5, opacity: 0.2 },
          { top: "35%", left: "8%", size: 2, opacity: 0.15 },
        ].map((star, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: star.top,
              left: "left" in star ? star.left : undefined,
              right: "right" in star ? star.right : undefined,
              width: `${star.size}px`,
              height: `${star.size}px`,
              borderRadius: "50%",
              background: `rgba(196, 162, 101, ${star.opacity})`,
              display: "flex",
            }}
          />
        ))}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              letterSpacing: "0.3em",
              color: "#c4a265",
              textTransform: "uppercase" as const,
            }}
          >
            Ciel Fortune
          </div>

          <div style={{ fontSize: "72px", marginTop: "8px" }}>{emoji}</div>

          <div
            style={{
              fontSize: "14px",
              letterSpacing: "0.2em",
              color: "rgba(196, 162, 101, 0.7)",
              textTransform: "uppercase" as const,
            }}
          >
            {region}
          </div>

          <div
            style={{
              fontSize: "42px",
              color: "#f8f5f0",
              fontWeight: 400,
              textAlign: "center",
            }}
          >
            {name}
          </div>

          <div
            style={{
              fontSize: "16px",
              color: "rgba(232, 228, 223, 0.5)",
              marginTop: "4px",
            }}
          >
            {lovePoint}
          </div>

          <div
            style={{
              marginTop: "32px",
              border: "1px solid #c4a265",
              borderRadius: "4px",
              padding: "10px 32px",
              fontSize: "14px",
              color: "#c4a265",
              letterSpacing: "0.15em",
            }}
          >
            無料で鑑定を始める
          </div>

          <div
            style={{
              marginTop: "16px",
              fontSize: "12px",
              color: "rgba(196, 162, 101, 0.5)",
              letterSpacing: "0.2em",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            by Misa — World Fortune Experience
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
