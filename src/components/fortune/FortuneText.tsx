"use client";
import { motion } from "framer-motion";

// 鑑定テキストを段落ごとにスタイリングするフォーマッター
export default function FortuneText({ text }: { text: string }) {
  const paragraphs = text.split(/\n\n+/).filter((p) => p.trim());
  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className={`text-sm leading-[2] ${
            i === 0
              ? "text-[var(--gold-light)] font-medium"
              : "text-[var(--text-light)]"
          }`}
        >
          {paragraph}
        </motion.p>
      ))}
    </div>
  );
}
