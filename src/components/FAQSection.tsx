"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeInSection from "./FadeInSection";

const faqs = [
  {
    question: "本当にCAが占ってくれるの？",
    answer:
      "Misaが世界各地で学んだ占術をベースに、あなたのための鑑定を行います。一つひとつの占いに、旅先での学びと想いが込められています。",
  },
  {
    question: "いつでも解約できる？",
    answer:
      "はい、いつでもワンクリックで解約可能です。解約後も、その月の残りの期間はすべての機能をご利用いただけます。",
  },
  {
    question: "どんな占いがある？",
    answer:
      "タロット、星座占い、相性診断、手相、オーラ診断など、世界各地の占いを揃えています。新しい占いも旅のたびに追加していきます。",
  },
  {
    question: "鑑定パスポートって何？",
    answer:
      "あなたの占い履歴がパスポートのスタンプのように記録されていく機能です。どの国の占いを体験したか、一目でわかるようになっています。",
  },
];

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="text-base font-medium text-[#f5f0e8]">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[#d4a574] text-xl flex-shrink-0"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-[#f5f0e8]/60">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section className="py-20 bg-[#1a1a2e]">
      <div className="max-w-2xl mx-auto px-6">
        <FadeInSection className="text-center mb-10">
          <p className="text-[#d4a574] text-sm tracking-[0.2em] mb-3">FAQ</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#f5f0e8]">
            よくある質問
          </h2>
        </FadeInSection>

        <FadeInSection>
          <div>
            {faqs.map((faq) => (
              <FAQItem key={faq.question} {...faq} />
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
