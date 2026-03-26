"use client";

import Link from "next/link";
import { fortunes, recommendedSlugs } from "@/data/fortunes";

const topColors = ["var(--gold)", "var(--sage)", "var(--lavender)", "var(--gold-light)"];

const recommended = recommendedSlugs
  .map((slug) => fortunes.find((f) => f.slug === slug)!)
  .filter(Boolean);

export default function RecommendedCards() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 24,
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .rec-grid { grid-template-columns: 1fr !important; }
        }
        .rec-card:hover { border-color: var(--border-mid) !important; transform: translateY(-3px); }
      `}</style>
      <div
        className="rec-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          width: "100%",
        }}
      >
        {recommended.map((fortune, i) => (
          <Link
            key={fortune.slug}
            href={`/fortunes/${fortune.slug}`}
            style={{ textDecoration: "none" }}
          >
            <div
              className="rec-card"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-thin)",
                borderRadius: 6,
                borderTop: `2px solid ${topColors[i]}`,
                padding: 36,
                transition: "border-color 0.3s, transform 0.3s",
              }}
            >
              <div style={{ fontSize: 13, color: "var(--text-muted)", letterSpacing: "0.05em" }}>
                {fortune.country}
                {fortune.city ? ` / ${fortune.city}` : ""}
              </div>
              <div
                style={{
                  fontFamily: "'Shippori Mincho B1', serif",
                  fontSize: 22,
                  color: "var(--gold-light)",
                  marginTop: 8,
                }}
              >
                {fortune.name}
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: "var(--text-muted)",
                  lineHeight: 1.8,
                  marginTop: 12,
                }}
              >
                {fortune.shortDescription}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
