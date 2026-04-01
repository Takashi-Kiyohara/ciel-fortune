"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// タロットカードの裏面・表面
const tarotCards = [
  { name: "The Star", nameJa: "星", numeral: "XVII", meaning: "希望と直感 ── 恋の光が差す" },
  { name: "Two of Cups", nameJa: "カップの2", numeral: "II", meaning: "相思相愛 ── 心と心が繋がる" },
  { name: "The World", nameJa: "世界", numeral: "XXI", meaning: "成就と完全 ── 恋が実を結ぶ" },
  { name: "The Lovers", nameJa: "恋人", numeral: "VI", meaning: "選択と情熱 ── 運命の出会い" },
  { name: "The Moon", nameJa: "月", numeral: "XVIII", meaning: "潜在意識 ── 隠れた想い" },
  { name: "Wheel of Fortune", nameJa: "運命の輪", numeral: "X", meaning: "転機の訪れ ── 恋の流れが変わる" },
];

// ルーンシンボル
const runeSymbols = [
  { name: "Gebo", nameJa: "ゲボ", symbol: "ᚷ", meaning: "贈り物・互いの絆" },
  { name: "Wunjo", nameJa: "ウンジョ", symbol: "ᚹ", meaning: "喜び・幸福の時" },
  { name: "Berkana", nameJa: "ベルカナ", symbol: "ᛒ", meaning: "成長・新しい始まり" },

];

// オラクルカードの意味
const oracleCards = [
  { name: "Aloha", nameJa: "アロハ", symbol: "🌺", meaning: "無条件の愛に心を開いて" },
  { name: "Mana", nameJa: "マナ", symbol: "🌊", meaning: "内なる力を信じて進んで" },
  { name: "Ohana", nameJa: "オハナ", symbol: "🌴", meaning: "大切な人との絆を深めて" },
  { name: "Mahalo", nameJa: "マハロ", symbol: "🌅", meaning: "感謝が新しい恋を引き寄せる" },
];

type CardDrawAnimationProps = {
  onComplete: () => void;
  type: "tarot" | "rune" | "oracle-card";
};

export default function CardDrawAnimation({ onComplete, type }: CardDrawAnimationProps) {
  const [phase, setPhase] = useState<"shuffle" | "select" | "reveal" | "done">("shuffle");
  const [revealedCards, setRevealedCards] = useState<number[]>([]);

  const cards = type === "rune" ? runeSymbols : type === "oracle-card" ? oracleCards : tarotCards;
  const cardCount = type === "rune" ? 3 : type === "tarot" ? 5 : 4;
  const revealCount = type === "rune" ? 1 : 3;

  useEffect(() => {
    const timer = setTimeout(() => setPhase("select"), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (idx: number) => {
    if (phase !== "select" || revealedCards.includes(idx)) return;

    const newRevealed = [...revealedCards, idx];
    setRevealedCards(newRevealed);

    if (newRevealed.length >= revealCount) {
      // 全カード選択後 → meaningフェーズ → doneフェーズ
      setTimeout(() => {
        setPhase("reveal");
        setTimeout(() => {
          setPhase("done");
          setTimeout(onComplete, 1200);
        }, 3000);
      }, 800);
    }
  };

  return (
    <div className="py-8">
      <AnimatePresence mode="wait">
        {phase === "shuffle" && (
          <motion.div
            key="shuffle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <p className="text-sm text-[var(--text-muted)] mb-6">
              {type === "rune" ? "ルーンを混ぜています..." : "カードをシャッフルしています..."}
            </p>
            <div className="flex justify-center gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-10 h-16 rounded border border-[var(--gold-dim)] bg-gradient-to-b from-[rgba(184,150,62,0.15)] to-[rgba(184,150,62,0.05)]"
                  animate={{
                    y: [0, -8, 0, 5, 0],
                    rotate: [0, -2, 0, 2, 0],
                  }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 0.3,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {phase === "select" && (
          <motion.div
            key="select"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="text-sm text-[var(--text-light)] mb-2">
              {type === "rune"
                ? "1つのルーンを選んでください"
                : `${revealCount}枚のカードを選んでください`}
            </p>
            <p className="text-xs text-[var(--text-muted)] mb-6">
              {revealedCards.length}/{revealCount} 選択済み
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              {Array.from({ length: cardCount }).map((_, i) => {
                const isRevealed = revealedCards.includes(i);
                const card = cards[i % cards.length];
                return (
                  <motion.button
                    key={i}
                    onClick={() => handleCardClick(i)}
                    whileHover={!isRevealed ? { y: -8, scale: 1.05 } : {}}
                    whileTap={!isRevealed ? { scale: 0.95 } : {}}
                    className="relative perspective-500"
                    disabled={isRevealed && revealedCards.length >= revealCount}
                  >
                    <AnimatePresence mode="wait">
                      {!isRevealed ? (
                        <motion.div
                          key={`back-${i}`}
                          className="w-16 h-24 sm:w-20 sm:h-28 rounded-lg border border-[var(--gold-dim)] bg-gradient-to-b from-[rgba(184,150,62,0.2)] to-[rgba(184,150,62,0.05)] cursor-pointer flex items-center justify-center hover:border-[var(--gold)] card-shimmer"
                          initial={false}
                          exit={{ rotateY: 90, scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="w-10 h-14 sm:w-12 sm:h-18 border border-[var(--gold-dim)] rounded opacity-40 flex items-center justify-center">
                            <span className="text-[var(--gold)] text-lg opacity-60">
                              {type === "rune" ? "\u16A0" : "\u2726"}
                            </span>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key={`front-${i}`}
                          className="w-16 h-24 sm:w-20 sm:h-28 rounded-lg border border-[var(--gold)] bg-gradient-to-b from-[rgba(184,150,62,0.25)] to-[rgba(13,13,26,0.9)] flex flex-col items-center justify-center p-1"
                          initial={{ rotateY: -90, scale: 0.9 }}
                          animate={{ rotateY: 0, scale: 1 }}
                          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                        >
                          {type === "rune" ? (
                            <>
                              <span className="text-[var(--gold)] text-xl mb-1">
                                {(card as typeof runeSymbols[0]).symbol}
                              </span>
                              <span className="text-[8px] text-[var(--gold-light)]">
                                {(card as typeof runeSymbols[0]).nameJa}
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="font-en text-[8px] text-[var(--gold)] opacity-60">
                                {(card as typeof tarotCards[0]).numeral}
                              </span>
                              <span className="text-[var(--gold)] text-lg my-1">{"\u2726"}</span>
                              <span className="text-[7px] text-[var(--gold-light)] text-center leading-tight">
                                {(card as typeof tarotCards[0]).nameJa}
                              </span>
                            </>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {phase === "reveal" && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-4"
          >
            <p className="text-xs text-[var(--text-muted)] mb-5">
              {type === "rune" ? "ルーンが語りかけています..." : "カードが語る恋のメッセージ"}
            </p>
            <div className="flex flex-col items-center gap-3">
              {revealedCards.map((idx, i) => {
                const card = cards[idx % cards.length];
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.5, duration: 0.5 }}
                    className="flex items-center gap-3 border border-[var(--gold-dim)] rounded-lg px-5 py-3 bg-[rgba(184,150,62,0.04)] max-w-xs w-full"
                  >
                    <span className="text-lg text-[var(--gold)]">
                      {type === "rune"
                        ? (card as typeof runeSymbols[0]).symbol
                        : type === "oracle-card"
                        ? (card as typeof oracleCards[0]).symbol
                        : "\u2726"}
                    </span>
                    <div className="text-left">
                      <p className="text-xs text-[var(--gold-light)] font-medium">
                        {"nameJa" in card ? card.nameJa : ""}
                      </p>
                      <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">
                        {"meaning" in card ? card.meaning : ""}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {phase === "done" && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-4"
          >
            <div className="text-2xl text-[var(--gold)] mb-2">{"\u2728"}</div>
            <p className="text-sm text-[var(--gold-light)]">
              {type === "rune" ? "ルーンの導きを聞いて..." : "Misaがカードを読み解いています..."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
