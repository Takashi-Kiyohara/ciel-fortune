"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendGAEvent } from "@/components/GoogleAnalytics";

interface SaveReadingPromptProps {
  fortuneName: string;
  onDismiss?: () => void;
}

/**
 * Soft email capture — 無料鑑定後に「結果を保存する」プロンプトを表示。
 * 登録不要で、メールだけで結果保存 + 週間占いの案内を受け取れる。
 * コンバージョンファネルの重要な入り口。
 */
export default function SaveReadingPrompt({ fortuneName, onDismiss }: SaveReadingPromptProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // 既に一度表示・入力済みならスキップ
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("ciel-fortune-email-saved");
    if (saved && !submitted) return null;
  }

  if (dismissed) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    sendGAEvent("email_capture", { fortune_type: fortuneName, source: "save_reading" });

    // 将来的にSupabaseに保存（現在はlocalStorageのみ）
    localStorage.setItem("ciel-fortune-email-saved", email);
    setSubmitted(true);
  };

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <AnimatePresence>
      {!submitted ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-6 border border-[var(--border-thin)] rounded-lg p-5 relative"
        >
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-[var(--text-muted)] opacity-40 hover:opacity-70 transition-opacity text-xs"
            aria-label="閉じる"
          >
            ✕
          </button>
          <p className="text-xs text-[var(--gold)] mb-1 font-en tracking-wider uppercase">
            Save Your Reading
          </p>
          <p className="text-sm text-[var(--text-light)] mb-2">
            鑑定結果をメールで受け取れます
          </p>
          <p className="text-[10px] text-[var(--text-muted)] mb-4 leading-relaxed">
            メールアドレスを入力すると、今回の結果とMisaからの週間恋愛運がメールで届きます。
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="メールアドレス"
              className="flex-1 bg-transparent border border-[var(--border-mid)] rounded px-3 py-2 text-xs text-[var(--text-light)] placeholder:text-[var(--text-muted)] placeholder:opacity-50 focus:outline-none focus:border-[var(--gold)] transition-colors"
            />
            <button
              type="submit"
              className="border border-[var(--gold-dim)] text-[var(--gold)] px-4 py-2 rounded text-xs hover:bg-[var(--gold)] hover:text-[var(--bg-deep)] transition-all whitespace-nowrap"
            >
              保存する
            </button>
          </form>
          <p className="text-[9px] text-[var(--text-muted)] opacity-40 mt-2">
            いつでも配信停止できます
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 border border-[var(--gold-dim)] rounded-lg p-5 text-center"
        >
          <p className="text-xs text-[var(--gold)] mb-1">✦ ありがとうございます</p>
          <p className="text-sm text-[var(--text-light)]">
            結果をお送りしますね。Misaからの週間恋愛運もお届けします。
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
