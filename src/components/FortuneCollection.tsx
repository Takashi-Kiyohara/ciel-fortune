"use client";

import { useState } from "react";
import { fortunes, Category } from "@/data/fortunes";
import FadeInSection from "./FadeInSection";
import CategoryFilter from "./CategoryFilter";
import WorldMap from "./WorldMap";
import CompatibilityMatrix from "./CompatibilityMatrix";
import RecommendedCards from "./RecommendedCards";

export default function FortuneCollection() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  return (
    <section className="py-[120px] sm:py-[160px] bg-[#0d0d1a]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12">
        {/* Heading */}
        <FadeInSection className="text-center mb-16">
          <p className="font-serif-en text-[#c4a265] text-xs tracking-[0.3em] mb-4 uppercase">
            Fortune Collection
          </p>
          <h2 className="text-2xl sm:text-[1.75rem] text-[#e8e4df] tracking-wide">
            世界各地の占いコレクション
          </h2>
          <div className="w-10 h-px bg-[#c4a265]/20 mx-auto mt-6" />
        </FadeInSection>

        {/* Category filter */}
        <FadeInSection className="mb-12">
          <CategoryFilter
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </FadeInSection>

        {/* World map */}
        <FadeInSection>
          <WorldMap fortunes={fortunes} activeCategory={activeCategory} />
        </FadeInSection>

        {/* Compatibility matrix */}
        <CompatibilityMatrix />

        {/* Misa's recommended */}
        <RecommendedCards />
      </div>
    </section>
  );
}
