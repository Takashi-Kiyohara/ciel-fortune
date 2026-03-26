"use client";

import { useState } from "react";
import { fortunes, Category } from "@/data/fortunes";
import CategoryFilter from "./CategoryFilter";
import WorldMap from "./WorldMap";
import CompatibilityMatrix from "./CompatibilityMatrix";
import RecommendedCards from "./RecommendedCards";

function SectionHeading({
  enLabel,
  title,
}: {
  enLabel: string;
  title: string;
}) {
  return (
    <div style={{ textAlign: "center", marginBottom: 60 }}>
      <p
        className="font-en"
        style={{
          fontSize: 12,
          letterSpacing: "0.3em",
          color: "var(--gold)",
          textTransform: "uppercase",
        }}
      >
        {enLabel}
      </p>
      <h2
        style={{
          fontSize: "clamp(24px, 4vw, 32px)",
          color: "var(--text-light)",
          letterSpacing: "0.05em",
          marginTop: 16,
        }}
      >
        {title}
      </h2>
      <div
        style={{
          width: 40,
          height: 1,
          background: "var(--gold-dim)",
          margin: "24px auto 0",
        }}
      />
    </div>
  );
}

export default function FortuneCollection() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  return (
    <section style={{ background: "var(--bg-dark)", padding: "160px 24px" }}>
      <SectionHeading enLabel="Fortune Collection" title="世界各地の占いコレクション" />

      <div style={{ marginBottom: 48 }}>
        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
      </div>

      <WorldMap fortunes={fortunes} activeCategory={activeCategory} />

      {/* Matrix */}
      <div style={{ marginTop: 160 }}>
        <SectionHeading enLabel="Compatibility" title="どの占いがあなたに合う？" />
        <CompatibilityMatrix />
        <p style={{ textAlign: "center", fontSize: 13, color: "var(--text-muted)", marginTop: 20 }}>
          気になる目的をタップすると、おすすめの占いが見つかります
        </p>
      </div>

      {/* Recommended */}
      <div style={{ marginTop: 160 }}>
        <SectionHeading enLabel="Misa's Choice" title="Misaのおすすめ" />
        <RecommendedCards />
      </div>
    </section>
  );
}
