"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MagicalLoading({ fortuneName }: { fortuneName: string }) {
  const [dots, setDots] = useState(0);
  const messages = [
    `Misaが${fortuneName}の結果を読み解いています`,
    "星の配置を確認しています",
    "あなただけのメッセージを紡いでいます",
  ];
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const dotTimer = setInterval(() => setDots((d) => (d + 1) % 4), 500);
    const msgTimer = setInterval(() => setMsgIndex((i) => (i + 1) % messages.length), 3000);
    return () => {
      clearInterval(dotTimer);
      clearInterval(msgTimer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-16 text-center"
    >
      <motion.div
        className="mx-auto w-16 h-16 mb-6 relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-[var(--gold)]"
            style={{
              top: `${50 - 45 * Math.cos((deg * Math.PI) / 180)}%`,
              left: `${50 + 45 * Math.sin((deg * Math.PI) / 180)}%`,
            }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, delay: i * 0.25, repeat: Infinity }}
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[var(--gold)] text-xl">{"\u2726"}</span>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.p
          key={msgIndex}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="text-sm text-[var(--text-muted)]"
        >
          {messages[msgIndex]}{".".repeat(dots)}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}
