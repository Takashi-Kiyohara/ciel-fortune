"use client";

import { motion } from "framer-motion";
import FadeInSection from "./FadeInSection";

const fortunes = [
  {
    icon: "🃏",
    title: "パリのタロット",
    description:
      "マレ地区の裏路地で出会った老婦人から教わった、本場のタロットリーディング",
  },
  {
    icon: "✦",
    title: "星空のデイリー占い",
    description:
      "ドバイの砂漠で見た満天の星。あの夜から始まった、毎朝届く星のメッセージ",
  },
  {
    icon: "♡",
    title: "NY×東洋の相性診断",
    description:
      "チャイナタウンで知った東西融合の相性術。二人の未来を旅の物語で",
  },
  {
    icon: "☽",
    title: "京都の手相鑑定",
    description:
      "祇園で出会った100歳のおばあちゃんが教えてくれた、手のひらの秘密",
  },
];

export default function FortuneCards() {
  return (
    <section className="py-[120px] sm:py-[160px] bg-[#0d0d1a]">
      <div className="max-w-[1100px] mx-auto px-6">
        <FadeInSection className="text-center mb-16">
          <p className="font-serif-en text-[#c4a265] text-xs tracking-[0.3em] mb-4 uppercase">
            Fortune Collection
          </p>
          <h2 className="text-2xl sm:text-[1.75rem] text-[#e8e4df] tracking-wide">
            世界各地の占いコレクション
          </h2>
        </FadeInSection>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {fortunes.map((fortune, i) => (
            <FadeInSection key={fortune.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="border border-[#c4a265]/15 rounded-md p-6 sm:p-8 bg-[#141425] hover:border-[#c4a265]/30 transition-colors duration-500"
              >
                <span className="text-[#c4a265]/70 text-lg block mb-6 font-serif-en">
                  {fortune.icon}
                </span>
                <h3 className="text-[#c4a265] text-sm sm:text-base font-medium mb-4 tracking-wide">
                  {fortune.title}
                </h3>
                <p className="text-xs sm:text-sm leading-[2] text-[#e8e4df]/40">
                  {fortune.description}
                </p>
              </motion.div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
