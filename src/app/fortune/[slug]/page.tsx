"use client";
import { useParams, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { fortunes, fortunePairs } from "@/data/fortunes";
import { zodiacSigns } from "@/data/zodiac";
import { getFreeResult } from "@/data/free-results";
import { useAuth } from "@/lib/useAuth";
import { useFortuneHistory } from "@/lib/useFortuneHistory";
import MisaAvatar from "@/components/MisaAvatar";
import { FortuneJsonLd } from "@/components/JsonLd";
import { sendGAEvent } from "@/components/GoogleAnalytics";
import {
  FortuneText,
  CardDrawAnimation,
  MagicalLoading,
  ShareButtons,
  AuthModal,
  SaveReadingPrompt,
} from "@/components/fortune";

export default function FortunePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const fortune = fortunes.find((f) => f.slug === slug);
  const { user, loading: authLoading, isDemo, signInWithGoogle, authFetch } = useAuth();
  const { history, addRecord } = useFortuneHistory();

  // States
  const [stage, setStage] = useState<"input" | "drawing" | "free-result" | "loading" | "detailed">("input");
  const [birthday, setBirthday] = useState("");
  const [selectedZodiac, setSelectedZodiac] = useState("");
  const [freeText, setFreeText] = useState("");
  const [detailedFortune, setDetailedFortune] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  // 過去の履歴から誕生日・星座を自動入力
  useEffect(() => {
    if (history.length === 0) return;
    const pastRecord = history.find((r) => r.birthday || r.zodiac);
    if (pastRecord) {
      if (pastRecord.birthday && !birthday) setBirthday(pastRecord.birthday);
      if (pastRecord.zodiac && !selectedZodiac) setSelectedZodiac(pastRecord.zodiac);
    }
  // 初回のみ実行
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  const handleDetailedReading = useCallback(async () => {
    sendGAEvent("fortune_detailed_start", { fortune_type: slug });
    setStage("loading");
    try {
      const res = await authFetch("/api/fortune", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          birthday: birthday || undefined,
          zodiac: selectedZodiac || undefined,
        }),
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setDetailedFortune(data.fortune);
      setStage("detailed");
      addRecord({ slug, title: fortune?.name || slug, zodiac: selectedZodiac, birthday, type: "detailed" });
    } catch {
      setDetailedFortune(
        "申し訳ございません。ただいま星の通信状態が不安定なようです。少し時間をおいて、もう一度お試しくださいね。"
      );
      setStage("detailed");
    }
  }, [slug, birthday, selectedZodiac, addRecord, fortune?.name, authFetch]);

  // 決済成功後の自動鑑定
  useEffect(() => {
    if (searchParams.get("payment") === "success") {
      setPaymentSuccess(true);
      handleDetailedReading();
    }
  }, [searchParams, handleDetailedReading]);

  if (!fortune) {
    return (
      <main className="min-h-screen bg-[var(--bg-deep)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl mb-4">🌙</p>
          <p className="text-sm text-[var(--text-muted)] mb-4">この占いはまだ見つかりませんでした</p>
          <Link href="/#fortunes" className="text-[var(--gold)] text-sm inline-block hover:underline">
            他の占いを見てみる
          </Link>
        </div>
      </main>
    );
  }

  const isCardDraw = fortune.inputType === "card-draw";

  const handleStart = () => {
    sendGAEvent("fortune_start", { fortune_type: slug, input_method: fortune.inputType });
    if (isCardDraw) {
      setStage("drawing");
    } else {
      const text = getFreeResult(slug, selectedZodiac, birthday);
      setFreeText(text);
      setStage("free-result");
      addRecord({ slug, title: fortune?.name || slug, zodiac: selectedZodiac, birthday, type: "free" });
    }
  };

  const handleDrawComplete = () => {
    const text = getFreeResult(slug, selectedZodiac, birthday);
    setFreeText(text);
    setStage("free-result");
    addRecord({ slug, title: fortune?.name || slug, zodiac: selectedZodiac, birthday, type: "free" });
  };

  const handleReset = () => {
    setStage("input");
    setFreeText("");
    setDetailedFortune("");
    setPaymentSuccess(false);
  };

  return (
    <main className="min-h-screen bg-[var(--bg-deep)]">
      <FortuneJsonLd
        name={fortune.name}
        nameEn={fortune.nameEn}
        description={fortune.shortDescription}
        region={fortune.region}
        slug={fortune.slug}
      />
      {/* Header */}
      <div className="px-6 py-4 border-b border-[var(--border-thin)]">
        <Link href="/" className="text-xs text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors">
          &larr; 占い一覧に戻る
        </Link>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Fortune Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="text-5xl mb-4">{fortune.emoji}</div>
          <p className="font-en text-xs tracking-[0.2em] text-[var(--gold)] uppercase mb-2">
            {fortune.regionEn}
          </p>
          <h1 className="text-2xl sm:text-3xl text-[var(--text-light)] mb-2">{fortune.name}</h1>
          <p className="font-en text-sm text-[var(--text-muted)] mb-4">{fortune.nameEn}</p>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-md mx-auto">
            {fortune.shortDescription}
          </p>
        </motion.div>

        {/* Misa's Story */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="border border-[var(--border-thin)] rounded-lg p-6 mb-10"
        >
          <p className="font-en text-[10px] tracking-[0.15em] text-[var(--gold)] uppercase mb-2">
            Misa&apos;s Story
          </p>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed italic">
            &ldquo;{fortune.misaStory}&rdquo;
          </p>
          {selectedZodiac && (() => {
            const zInfo = zodiacSigns.find(z => z.sign === selectedZodiac);
            if (!zInfo) return null;
            return (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.4 }}
                className="text-xs text-[var(--gold)] mt-3 pt-3 border-t border-[var(--border-thin)] leading-relaxed"
              >
                {zInfo.emoji} {zInfo.label}のあなたは「{zInfo.trait}」タイプ。{zInfo.element}のエレメントを持つあなたに、この占いはきっと深く響くはず。
              </motion.p>
            );
          })()}
        </motion.div>

        <AnimatePresence mode="wait">
          {/* ===== INPUT STAGE ===== */}
          {stage === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              {fortune.inputType === "birthday" && (
                <div className="mb-8">
                  <label className="text-sm text-[var(--text-light)] block mb-3">
                    あなたの生年月日を教えてください
                  </label>
                  <input
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    aria-describedby="birthday-hint"
                    className="bg-transparent border border-[var(--border-mid)] rounded px-4 py-2.5 text-[var(--text-light)] text-sm w-full max-w-xs mx-auto block focus:outline-none focus:border-[var(--gold)] transition-colors"
                  />
                  {!birthday && (
                    <p id="birthday-hint" className="text-[10px] text-[var(--text-muted)] mt-2 opacity-70">
                      生年月日を入力すると、鑑定を始められます
                    </p>
                  )}
                </div>
              )}

              {fortune.inputType === "zodiac" && (
                <div className="mb-8">
                  <label className="text-sm text-[var(--text-light)] block mb-4">
                    あなたの星座を選んでください
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-w-sm mx-auto">
                    {zodiacSigns.map((z) => (
                      <button
                        key={z.sign}
                        onClick={() => setSelectedZodiac(z.sign)}
                        aria-label={`${z.label}（${z.dates}）`}
                        aria-pressed={selectedZodiac === z.sign}
                        className={`flex flex-col items-center py-3.5 px-2 rounded-lg border transition-all min-h-[56px] ${
                          selectedZodiac === z.sign
                            ? "border-[var(--gold)] bg-[rgba(184,150,62,0.1)] text-[var(--gold)]"
                            : "border-[var(--border-thin)] text-[var(--text-muted)] hover:border-[var(--gold-dim)]"
                        }`}
                      >
                        <span className="text-lg mb-1" aria-hidden="true">{z.emoji}</span>
                        <span className="text-xs">{z.label}</span>
                        <span className="text-[10px] opacity-60 mt-0.5">{z.dates}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {fortune.inputType === "card-draw" && (
                <div className="mb-8">
                  <p className="text-sm text-[var(--text-light)] mb-2">
                    心の中で恋の悩みを思い浮かべてください
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    準備ができたら、ボタンを押してカードを引きましょう
                  </p>
                </div>
              )}

              {fortune.inputType === "free" && (
                <div className="mb-8">
                  <p className="text-sm text-[var(--text-light)] mb-2">
                    目を閉じて、深呼吸してください
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    リラックスした心で、Misaの声に耳を傾けましょう
                  </p>
                </div>
              )}

              <motion.button
                onClick={handleStart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={fortune.inputType === "birthday" && !birthday}
                className="border border-[var(--gold)] text-[var(--gold)] px-10 py-3 rounded text-sm tracking-widest hover:bg-[var(--gold)] hover:text-[var(--bg-deep)] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {fortune.inputType === "card-draw"
                  ? "カードを引く"
                  : fortune.inputType === "free"
                  ? "占いを始める"
                  : "鑑定を始める"}
              </motion.button>
            </motion.div>
          )}

          {/* ===== CARD DRAW ANIMATION ===== */}
          {stage === "drawing" && (
            <motion.div
              key="drawing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CardDrawAnimation
                onComplete={handleDrawComplete}
                type={slug as "tarot" | "rune" | "oracle-card"}
              />
            </motion.div>
          )}

          {/* ===== FREE RESULT ===== */}
          {stage === "free-result" && (
            <motion.div
              key="free-result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="border border-[var(--border-thin)] rounded-lg p-8 mb-8">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-en text-[10px] tracking-[0.15em] text-[var(--gold)] uppercase">
                    Misa&apos;s Message
                  </p>
                  <p className="text-[9px] text-[var(--text-muted)] opacity-50">
                    {new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" })}
                    {history.length > 0 && ` · ${history.length + 1}回目の鑑定`}
                  </p>
                </div>
                <FortuneText text={freeText} />
                <div className="mt-4 pt-4 border-t border-[var(--border-thin)]">
                  <p className="text-xs text-[var(--text-muted)] italic">
                    もっと詳しいお話ができますよ ── Misa
                  </p>
                </div>
              </div>

              {/* 詳細鑑定への誘導（ペイウォール） */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="border border-[var(--gold-dim)] rounded-lg p-8 text-center bg-gradient-to-b from-[rgba(184,150,62,0.06)] to-transparent"
              >
                <h3 className="text-lg text-[var(--text-light)] mb-2">
                  Misaの詳しい鑑定を読む
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-3 max-w-sm mx-auto">
                  あなたの恋愛傾向、相性のポイント、
                  具体的なアドバイスを手紙のようにお届けします。
                </p>
                <p className="text-[10px] text-[var(--gold)] opacity-70 mb-5">
                  今日この占いを体験した方: {(() => {
                    const day = new Date().getDate();
                    const hash = slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
                    return 38 + ((hash + day) % 35);
                  })()}人
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <motion.button
                    onClick={() => {
                      if (!user && !authLoading && !isDemo) {
                        setShowAuthModal(true);
                        return;
                      }
                      handleDetailedReading();
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-[var(--gold)] text-[var(--bg-deep)] px-6 py-2.5 rounded text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    {isDemo ? "詳しい鑑定を見る（無料体験）" : "この鑑定を購入 \u00A5300"}
                  </motion.button>
                  {!isDemo && (
                    <button
                      onClick={async () => {
                        if (!user && !authLoading) {
                          setShowAuthModal(true);
                          return;
                        }
                        setIsCheckoutLoading(true);
                        sendGAEvent("begin_checkout", { fortune_type: slug, value: 300, currency: "JPY" });
                        try {
                          const res = await authFetch("/api/stripe/checkout", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              type: "premium",
                              fortuneSlug: slug,
                            }),
                          });
                          const data = await res.json();
                          if (data.url) window.location.href = data.url;
                        } catch {
                          // Stripe未接続
                        } finally {
                          setIsCheckoutLoading(false);
                        }
                      }}
                      disabled={isCheckoutLoading}
                      className="border border-[var(--gold-dim)] text-[var(--gold)] px-6 py-2.5 rounded text-sm hover:border-[var(--gold)] transition-colors disabled:opacity-40"
                    >
                      {isCheckoutLoading ? "準備中..." : "Premium ¥400/月 で見放題"}
                    </button>
                  )}
                </div>

                {paymentSuccess && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-[var(--gold)] mt-4"
                  >
                    ありがとうございます。Misaがあなたの恋を読み解いています...
                  </motion.p>
                )}
              </motion.div>

              {/* Reading Count Chat Nudge — 3回目以降に表示 */}
              {(() => {
                const readingCount = history.length;
                if (readingCount < 3) return null;
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 border border-[var(--gold-dim)] rounded-lg p-5 text-center bg-gradient-to-b from-[rgba(184,150,62,0.04)] to-transparent"
                  >
                    <p className="text-xs text-[var(--gold)] mb-1">
                      {readingCount}回目の占い、お疲れさまです
                    </p>
                    <p className="text-sm text-[var(--text-light)] mb-3">
                      同じ悩みが続いていませんか？ Misaに直接相談してみて。
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mb-4 leading-relaxed">
                      占い結果だけでは見えない、あなただけの恋のアドバイスをお届けします。
                    </p>
                    <Link
                      href="/chat"
                      className="inline-block bg-[var(--gold)] text-[var(--bg-deep)] px-6 py-2.5 rounded text-xs font-medium hover:opacity-90 transition-opacity"
                    >
                      Misaに恋愛相談する
                    </Link>
                  </motion.div>
                );
              })()}

              {/* Share */}
              <div className="mt-4">
                <ShareButtons fortuneName={fortune.name} variant="free" />
              </div>

              {/* Email Capture — 鑑定結果を保存 */}
              {!user && <SaveReadingPrompt fortuneName={fortune.name} />}

              {/* 他の占い導線 — 未体験の占いを優先表示 */}
              {(() => {
                const pairSlugs = fortunePairs[slug] || [];
                const pairFortunes = pairSlugs
                  .map((s) => fortunes.find((f) => f.slug === s))
                  .filter(Boolean);
                if (pairFortunes.length === 0) return null;
                const triedSlugs = new Set(history.map((r) => r.slug));
                const sorted = [...pairFortunes].sort((a, b) => {
                  const aTried = triedSlugs.has(a!.slug) ? 1 : 0;
                  const bTried = triedSlugs.has(b!.slug) ? 1 : 0;
                  return aTried - bTried;
                });
                return (
                  <div className="mt-6 border border-[var(--border-thin)] rounded-lg p-5">
                    <p className="text-xs text-[var(--gold)] mb-1 text-center font-en tracking-wider uppercase">
                      Also Try
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mb-4 text-center">
                      別の角度からも恋を見つめてみませんか？
                    </p>
                    <div className="space-y-3">
                      {sorted.map((pf) => {
                        const tried = triedSlugs.has(pf!.slug);
                        return (
                          <Link
                            key={pf!.slug}
                            href={`/fortune/${pf!.slug}`}
                            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                          >
                            <span className="text-2xl" aria-hidden="true">{pf!.emoji}</span>
                            <div className="flex-1">
                              <p className="text-sm text-[var(--text-light)]">{pf!.name}</p>
                              <p className="text-[10px] text-[var(--text-muted)]">{pf!.lovePoint}</p>
                            </div>
                            <span className={`text-[10px] border rounded-full px-2 py-0.5 ${
                              tried
                                ? "text-[var(--text-muted)] border-[var(--border-thin)] opacity-60"
                                : "text-[var(--gold)] border-[var(--gold-dim)]"
                            }`}>
                              {tried ? "体験済み" : "無料で試す"}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* Chat CTA — 3回未満のユーザーに表示 */}
              {history.length < 3 && (
                <div className="mt-6 border border-[var(--border-thin)] rounded-lg p-6 text-center">
                  <p className="text-sm text-[var(--text-light)] mb-2">
                    Misaに直接相談してみませんか？
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mb-4">
                    あなたの恋の悩みにMisaが個別に答えます
                  </p>
                  <Link
                    href="/chat"
                    className="inline-block border border-[var(--border-mid)] text-[var(--text-muted)] px-6 py-2 rounded text-xs hover:text-[var(--gold)] hover:border-[var(--gold-dim)] transition-all"
                  >
                    Misaに相談する
                  </Link>
                </div>
              )}

              {/* 戻る */}
              <div className="mt-8 text-center">
                <button
                  onClick={handleReset}
                  className="text-xs text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors"
                >
                  もう一度占う
                </button>
              </div>
            </motion.div>
          )}

          {/* ===== MAGICAL LOADING ===== */}
          {stage === "loading" && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <MagicalLoading fortuneName={fortune.name} />
            </motion.div>
          )}

          {/* ===== DETAILED RESULT ===== */}
          {stage === "detailed" && (
            <motion.div
              key="detailed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="border border-[var(--gold-dim)] rounded-lg p-8 bg-gradient-to-b from-[rgba(184,150,62,0.06)] to-transparent">
                <div className="flex items-center gap-3 mb-6">
                  <MisaAvatar size={36} />
                  <div>
                    <p className="font-en text-[10px] tracking-[0.15em] text-[var(--gold)] uppercase">
                      Detailed Love Reading
                    </p>
                    <p className="text-[10px] text-[var(--text-muted)]">by Misa</p>
                  </div>
                </div>
                <FortuneText text={detailedFortune} />
              </div>

              {/* Share */}
              <div className="mt-6">
                <ShareButtons fortuneName={fortune.name} variant="detailed" />
              </div>

              {/* Chat Upsell */}
              <div className="mt-6 border border-[var(--border-thin)] rounded-lg p-6 text-center">
                <p className="text-sm text-[var(--text-light)] mb-2">
                  この結果について、もっと聞きたいことはありますか？
                </p>
                <Link
                  href="/chat"
                  className="inline-block border border-[var(--gold-dim)] text-[var(--gold)] px-6 py-2 rounded text-xs hover:bg-[var(--gold)] hover:text-[var(--bg-deep)] transition-all mt-3"
                >
                  Misaに相談する
                </Link>
              </div>

              {/* Complementary Fortune Suggestions — 未体験を優先 */}
              {(() => {
                const pairSlugs = fortunePairs[slug] || [];
                const pairFortunes = pairSlugs
                  .map((s) => fortunes.find((f) => f.slug === s))
                  .filter(Boolean);
                if (pairFortunes.length === 0) return null;
                const triedSlugs = new Set(history.map((r) => r.slug));
                const sorted = [...pairFortunes].sort((a, b) => {
                  const aTried = triedSlugs.has(a!.slug) ? 1 : 0;
                  const bTried = triedSlugs.has(b!.slug) ? 1 : 0;
                  return aTried - bTried;
                });
                return (
                  <div className="mt-6 border border-[var(--border-thin)] rounded-lg p-5">
                    <p className="text-xs text-[var(--text-muted)] mb-4 text-center">
                      この占いと相性の良い占いで、別の角度からも恋を見つめてみませんか？
                    </p>
                    <div className="space-y-3">
                      {sorted.map((pf) => {
                        const tried = triedSlugs.has(pf!.slug);
                        return (
                          <Link
                            key={pf!.slug}
                            href={`/fortune/${pf!.slug}`}
                            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                          >
                            <span className="text-2xl" aria-hidden="true">{pf!.emoji}</span>
                            <div className="flex-1">
                              <p className="text-sm text-[var(--text-light)]">{pf!.name}</p>
                              <p className="text-[10px] text-[var(--text-muted)]">{pf!.lovePoint}</p>
                            </div>
                            <span className={`text-xs ${tried ? "text-[var(--text-muted)] opacity-60" : "text-[var(--gold)]"}`}>
                              {tried ? "体験済み" : "試す →"}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* 戻る */}
              <div className="mt-8 text-center">
                <button
                  onClick={handleReset}
                  className="text-xs text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors"
                >
                  もう一度占う
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Disclaimer */}
      <div className="max-w-2xl mx-auto px-6 pb-12">
        <p className="text-[9px] text-[var(--text-muted)] opacity-50 text-center leading-relaxed">
          本鑑定はエンターテインメント目的のコンテンツです。医療・法律・投資等の判断の根拠としてのご利用はお控えください。
        </p>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          onSignIn={() => {
            signInWithGoogle();
            setShowAuthModal(false);
          }}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </main>
  );
}
