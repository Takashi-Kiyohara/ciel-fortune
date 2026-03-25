"use client";

import { motion } from "framer-motion";
import FadeInSection from "./FadeInSection";

const plans = [
  {
    label: "エコノミー",
    classCode: "ECONOMY",
    price: "無料",
    priceNote: "",
    features: ["デイリー占い 1回/日", "タロット1枚引き 1回/日"],
    recommended: false,
    destination: "YOUR DAILY JOURNEY",
  },
  {
    label: "ビジネスクラス",
    classCode: "BUSINESS",
    price: "¥980",
    priceNote: "/月",
    features: [
      "全占いメニュー無制限",
      "Misaのチャット相談",
      "鑑定パスポート",
    ],
    recommended: true,
    destination: "UNLIMITED JOURNEY",
  },
  {
    label: "ファーストクラス",
    classCode: "FIRST",
    price: "¥1,980",
    priceNote: "/月",
    features: [
      "ビジネスの全機能",
      "月1回スペシャル鑑定",
      "限定コンテンツ",
    ],
    recommended: false,
    destination: "PREMIUM JOURNEY",
  },
];

export default function PricingSection() {
  return (
    <section id="plans" className="py-[120px] sm:py-[160px] bg-[#0d0d1a]">
      <div className="max-w-[1000px] mx-auto px-6 sm:px-12">
        <FadeInSection className="text-center mb-16">
          <p className="font-serif-en text-[#c4a265] text-xs tracking-[0.3em] mb-4 uppercase">
            Boarding Pass
          </p>
          <h2 className="text-2xl sm:text-[1.75rem] text-[#e8e4df] tracking-wide">
            あなたの旅を選ぶ
          </h2>
          <div className="w-10 h-px bg-[#c4a265]/20 mx-auto mt-6" />
        </FadeInSection>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-start">
          {plans.map((plan, i) => (
            <FadeInSection key={plan.classCode} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`relative rounded-md overflow-hidden transition-colors duration-500 ${
                  plan.recommended
                    ? "border border-[#c4a265]/40 sm:scale-[1.03] sm:origin-top"
                    : "border border-[#e8e4df]/6"
                }`}
              >
                {plan.recommended && (
                  <div className="bg-[#c4a265]/8 border-b border-[#c4a265]/15 text-[#c4a265] text-[0.6rem] text-center py-2 tracking-[0.25em] uppercase font-serif-en">
                    Recommended
                  </div>
                )}

                <div
                  className="p-7"
                  style={
                    plan.recommended
                      ? {
                          background:
                            "linear-gradient(180deg, rgba(184,150,62,0.04) 0%, #141425 100%)",
                        }
                      : { background: "#141425" }
                  }
                >
                  <p className="font-serif-en text-[#c4a265]/50 text-[0.6rem] tracking-[0.2em] mb-2 uppercase">
                    {plan.classCode} Class
                  </p>
                  <h3 className="text-lg text-[#e8e4df] tracking-wide mb-1">
                    {plan.label}
                  </h3>
                  <p className="font-serif-en text-[0.6rem] text-[#e8e4df]/20 tracking-[0.15em]">
                    {plan.destination}
                  </p>
                </div>

                <div className="relative flex items-center bg-[#141425]">
                  <div className="w-3 h-3 rounded-full bg-[#0d0d1a] -ml-1.5" />
                  <div className="flex-1 border-t border-dashed border-[#c4a265]/8 mx-2" />
                  <div className="w-3 h-3 rounded-full bg-[#0d0d1a] -mr-1.5" />
                </div>

                <div
                  className={`bg-[#141425] ${plan.recommended ? "p-7 pb-9" : "p-7"}`}
                >
                  <div className="mb-7">
                    <span className="text-2xl font-medium text-[#e8e4df]">
                      {plan.price}
                    </span>
                    {plan.priceNote && (
                      <span className="text-xs text-[#e8e4df]/30 ml-1">
                        {plan.priceNote}
                      </span>
                    )}
                  </div>

                  <ul className="space-y-3.5 mb-8">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-[#e8e4df]/45"
                      >
                        <span className="text-[#c4a265]/40 text-[0.45rem] mt-1.5">
                          &#9670;
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={
                      plan.recommended
                        ? { opacity: 0.9 }
                        : { backgroundColor: "#c4a265", color: "#0d0d1a" }
                    }
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3.5 rounded text-sm tracking-[0.1em] transition-all duration-500 ${
                      plan.recommended
                        ? "bg-[#c4a265] text-[#0d0d1a]"
                        : "border border-[#c4a265]/25 text-[#c4a265]"
                    }`}
                  >
                    搭乗する
                  </motion.button>
                </div>
              </motion.div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
