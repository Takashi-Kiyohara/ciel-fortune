"use client";

import { motion } from "framer-motion";
import Stars from "./Stars";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center bg-gradient-to-b from-[#0e0e1a] via-[#1a1a2e] to-[#2a2a4e] overflow-hidden">
      <Stars count={80} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 max-w-lg mx-auto"
      >
        <p className="text-[#d4a574] text-sm tracking-[0.3em] mb-6">
          CIEL FORTUNE
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold leading-relaxed mb-6 text-[#f5f0e8]">
          世界を旅するCAが集めた、
          <br />
          あなただけの占い
        </h1>
        <p className="text-base sm:text-lg leading-relaxed text-[#f5f0e8]/70 mb-10 max-w-md mx-auto">
          パリのタロット、京都の手相、バリのオーラ診断...
          <br />
          50カ国を巡ったCAが出会った占いを、
          <br />
          あなたのスマホに届けます
        </p>

        <motion.a
          href="#plans"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block bg-[#d4a574] text-[#1a1a2e] font-bold text-lg px-8 py-4 rounded-full shadow-lg shadow-[#d4a574]/20 hover:bg-[#e0be97] transition-colors"
        >
          ✈️ 無料で占ってみる
        </motion.a>
      </motion.div>

      {/* Gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#1a1a2e] to-transparent" />
    </section>
  );
}
