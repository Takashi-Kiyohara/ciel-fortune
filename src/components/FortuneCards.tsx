"use client";

import { motion } from "framer-motion";
import FadeInSection from "./FadeInSection";

const fortunes = [
  {
    emoji: "🃏",
    title: "パリのタロット",
    description:
      "マレ地区の裏路地で出会った老婦人から教わった、本場のタロットリーディング",
    accent: "#c4a0e8",
  },
  {
    emoji: "⭐",
    title: "星空のデイリー占い",
    description:
      "ドバイの砂漠で見た満天の星。あの夜から始まった、毎朝届く星のメッセージ",
    accent: "#f0d07a",
  },
  {
    emoji: "💕",
    title: "NY×東洋の相性診断",
    description:
      "チャイナタウンで知った東西融合の相性術。二人の未来を旅の物語で",
    accent: "#e88a9a",
  },
  {
    emoji: "✋",
    title: "京都の手相鑑定",
    description:
      "祇園で出会った100歳のおばあちゃんが教えてくれた、手のひらの秘密",
    accent: "#8acaa0",
  },
];

export default function FortuneCards() {
  return (
    <section className="py-20 bg-[#1a1a2e]">
      <FadeInSection className="text-center mb-10 px-6">
        <p className="text-[#d4a574] text-sm tracking-[0.2em] mb-3">
          FORTUNE COLLECTION
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#f5f0e8]">
          世界各地の占いコレクション
        </h2>
      </FadeInSection>

      <div className="flex gap-5 overflow-x-auto px-6 pb-4 snap-x snap-mandatory hide-scrollbar">
        {fortunes.map((fortune, i) => (
          <motion.div
            key={fortune.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className="flex-shrink-0 w-[280px] snap-center rounded-2xl p-6 bg-gradient-to-b from-[#252545] to-[#1e1e38] border border-white/5 cursor-pointer transition-shadow hover:shadow-xl hover:shadow-[#d4a574]/10"
          >
            <span className="text-4xl block mb-4">{fortune.emoji}</span>
            <h3
              className="text-lg font-bold mb-3"
              style={{ color: fortune.accent }}
            >
              {fortune.title}
            </h3>
            <p className="text-sm leading-relaxed text-[#f5f0e8]/60">
              {fortune.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
