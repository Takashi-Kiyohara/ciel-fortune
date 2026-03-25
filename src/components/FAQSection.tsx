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
    <div className="border-b border-[#c4a265]/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left gap-6"
      >
        <span className="text-sm sm:text-base text-[#e8e4df]/80 tracking-wide">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-[#c4a265]/50 text-base flex-shrink-0"
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
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-7 text-sm leading-[2] text-[#e8e4df]/40">
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
    <section className="py-[120px] sm:py-[160px] bg-[#0d0d1a]">
      <div className="max-w-[700px] mx-auto px-6">
        <FadeInSection className="text-center mb-14">
          <p className="font-serif-en text-[#c4a265] text-xs tracking-[0.3em] mb-4 uppercase">
            FAQ
          </p>
          <h2 className="text-2xl sm:text-[1.75rem] text-[#e8e4df] tracking-wide">
            よくある質問
          </h2>
        </FadeInSection>

        <FadeInSection>
          <div className="border-t border-[#c4a265]/10">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} {...faq} />
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
