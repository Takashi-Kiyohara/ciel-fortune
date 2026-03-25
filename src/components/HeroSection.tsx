"use client";

import { motion } from "framer-motion";
import Stars from "./Stars";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 sm:px-12 text-center bg-[#0d0d1a] overflow-hidden">
      <Stars count={20} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="relative z-10 max-w-xl mx-auto"
      >
        <p className="font-serif-en text-[#c4a265] text-sm tracking-[0.35em] mb-12 uppercase">
          Ciel Fortune
        </p>

        <h1 className="text-[1.75rem] sm:text-[2.25rem] leading-[1.8] mb-8 text-[#e8e4df] tracking-wide">
          世界を旅するCAが集めた、
          <br />
          あなただけの占い
        </h1>

        <p className="text-sm sm:text-[0.9375rem] leading-[2.2] text-[#e8e4df]/45 mb-20 max-w-sm mx-auto tracking-wider">
          パリのタロット、京都の手相、バリのオーラ診断 ——
          <br />
          50カ国を巡ったCAが出会った占いを、
          <br />
          あなたのもとに届けます
        </p>

        <motion.a
          href="#plans"
          whileHover={{ backgroundColor: "#c4a265", color: "#0d0d1a" }}
          whileTap={{ scale: 0.98 }}
          className="inline-block border border-[#c4a265]/60 text-[#c4a265] text-[15px] tracking-[0.15em] px-12 py-4 rounded transition-all duration-500"
        >
          無料で占ってみる
        </motion.a>
      </motion.div>

      {/* Section divider */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[60px] h-px bg-[#c4a265]/15" />
    </section>
  );
}
