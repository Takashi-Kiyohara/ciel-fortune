"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fortunes, recommendedSlugs } from "@/data/fortunes";
import { CategoryIcon } from "./CategoryIcons";
import FadeInSection from "./FadeInSection";

const recommended = recommendedSlugs
  .map((slug) => fortunes.find((f) => f.slug === slug)!)
  .filter(Boolean);

export default function RecommendedCards() {
  return (
    <div className="mt-[120px] sm:mt-[160px]">
      <FadeInSection className="text-center mb-12">
        <p className="font-serif-en text-[#c4a265] text-xs tracking-[0.3em] mb-4 uppercase">
          {"Misa's Choice"}
        </p>
        <h3 className="text-xl sm:text-2xl text-[#e8e4df] tracking-wide">
          Misaのおすすめ
        </h3>
      </FadeInSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {recommended.map((fortune, i) => (
          <FadeInSection key={fortune.slug} delay={i * 0.08}>
            <Link href={`/fortunes/${fortune.slug}`}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="p-7 sm:p-8 rounded-md bg-[#ffffff05] border border-[#c4a265]/12 hover:border-[#c4a265]/25 transition-colors duration-500"
              >
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 opacity-60">
                    <CategoryIcon id={fortune.category} size={18} />
                  </span>
                  <div>
                    <p className="text-[10px] text-[#c4a265]/50 tracking-wide mb-1.5">
                      {fortune.country}
                      {fortune.city ? ` / ${fortune.city}` : ""}
                    </p>
                    <h4 className="text-[#c4a265] text-sm tracking-wide mb-3">
                      {fortune.name}
                    </h4>
                    <p className="text-xs leading-[2] text-[#e8e4df]/35">
                      {fortune.shortDescription}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          </FadeInSection>
        ))}
      </div>
    </div>
  );
}
