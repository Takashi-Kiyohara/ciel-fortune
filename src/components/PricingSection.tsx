"use client";

import { motion } from "framer-motion";
import FadeInSection from "./FadeInSection";

const plans = [
  {
    className: "エコノミー",
    classCode: "ECONOMY",
    price: "無料",
    priceNote: "",
    features: ["デイリー占い 1回/日", "タロット1枚引き 1回/日"],
    recommended: false,
    destination: "YOUR DAILY JOURNEY",
  },
  {
    className: "ビジネスクラス",
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
    className: "ファーストクラス",
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
    <section id="plans" className="py-20 bg-[#1a1a2e]">
      <FadeInSection className="text-center mb-12 px-6">
        <p className="text-[#d4a574] text-sm tracking-[0.2em] mb-3">
          BOARDING PASS
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#f5f0e8]">
          あなたの旅を選ぶ
        </h2>
      </FadeInSection>

      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <FadeInSection key={plan.classCode} delay={i * 0.15}>
            <motion.div
              whileHover={{ y: -6 }}
              className={`relative rounded-2xl overflow-hidden ${
                plan.recommended
                  ? "border-2 border-[#d4a574] shadow-lg shadow-[#d4a574]/15"
                  : "border border-white/10"
              }`}
            >
              {plan.recommended && (
                <div className="bg-[#d4a574] text-[#1a1a2e] text-xs font-bold text-center py-1.5 tracking-wider">
                  ✈️ RECOMMENDED
                </div>
              )}

              {/* Ticket top */}
              <div className="bg-gradient-to-b from-[#252545] to-[#1e1e38] p-6">
                <p className="text-[#d4a574] text-xs tracking-[0.15em] mb-1">
                  {plan.classCode} CLASS
                </p>
                <h3 className="text-xl font-bold text-[#f5f0e8] mb-1">
                  {plan.className}
                </h3>
                <p className="text-xs text-[#f5f0e8]/40">
                  {plan.destination}
                </p>
              </div>

              {/* Dashed line separator */}
              <div className="relative flex items-center px-2">
                <div className="w-4 h-4 rounded-full bg-[#1a1a2e] -ml-2" />
                <div className="flex-1 border-t border-dashed border-white/15 mx-1" />
                <div className="w-4 h-4 rounded-full bg-[#1a1a2e] -mr-2" />
              </div>

              {/* Ticket bottom */}
              <div className="bg-gradient-to-b from-[#1e1e38] to-[#1a1a35] p-6">
                <div className="mb-5">
                  <span className="text-3xl font-bold text-[#f5f0e8]">
                    {plan.price}
                  </span>
                  {plan.priceNote && (
                    <span className="text-sm text-[#f5f0e8]/50">
                      {plan.priceNote}
                    </span>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-[#f5f0e8]/70"
                    >
                      <span className="text-[#d4a574] mt-0.5 text-xs">✦</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full py-3 rounded-full text-sm font-bold transition-colors ${
                    plan.recommended
                      ? "bg-[#d4a574] text-[#1a1a2e] hover:bg-[#e0be97]"
                      : "border border-[#d4a574]/40 text-[#d4a574] hover:bg-[#d4a574]/10"
                  }`}
                >
                  搭乗する
                </motion.button>
              </div>
            </motion.div>
          </FadeInSection>
        ))}
      </div>
    </section>
  );
}
