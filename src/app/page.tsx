"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { fortunes } from "@/data/fortunes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WorldMap from "@/components/WorldMap";

// Seeded random for deterministic star positions
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const stars = Array.from({ length: 40 }).map((_, i) => {
  const s = seededRandom(i + 1);
  const s2 = seededRandom(i + 41);
  const s3 = seededRandom(i + 81);
  const s4 = seededRandom(i + 121);
  const s5 = seededRandom(i + 161);
  return {
    size: 1 + s * 2,
    top: s2 * 100,
    left: s3 * 100,
    opacity: 0.1 + s4 * 0.3,
    duration: 2 + s5 * 3,
    delay: s * 3,
  };
});

type LastFortune = { slug: string; title: string; date: string } | null;

// 時間帯に応じた雰囲気演出
function getTimeGreeting(): { sub: string; mood: string } {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 10) return { sub: "朝の静けさの中で、今日の恋を覗いてみませんか", mood: "morning" };
  if (hour >= 10 && hour < 15) return { sub: "昼下がりのひととき、恋のヒントを見つけましょう", mood: "afternoon" };
  if (hour >= 15 && hour < 19) return { sub: "夕暮れの時間、星が語りかけ始めています", mood: "evening" };
  if (hour >= 19 && hour < 23) return { sub: "夜は恋の時間。星の囁きに耳を傾けて", mood: "night" };
  return { sub: "深夜の占いは、いちばん心に響くもの", mood: "latenight" };
}

// 季節メッセージ
function getSeasonalNote(): string | null {
  const now = new Date();
  const m = now.getMonth() + 1;
  const d = now.getDate();
  if (m === 2 && d >= 1 && d <= 14) return "バレンタインの恋占い、受付中";
  if (m === 3 && d >= 1 && d <= 14) return "ホワイトデーの相性占い、おすすめです";
  if (m === 7 && d >= 1 && d <= 7) return "七夕の恋占い、星に願いを込めて";
  if (m === 12 && d >= 15 && d <= 25) return "クリスマスの恋占い、特別な夜のために";
  if (m === 1 && d >= 1 && d <= 7) return "新年の恋占い、今年の恋を占いましょう";
  return null;
}

export default function Home() {
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [lastFortune, setLastFortune] = useState<LastFortune>(null);
  const [timeGreeting, setTimeGreeting] = useState<{ sub: string; mood: string } | null>(null);
  const [seasonalNote, setSeasonalNote] = useState<string | null>(null);

  useEffect(() => {
    setTimeGreeting(getTimeGreeting());
    setSeasonalNote(getSeasonalNote());
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const visited = localStorage.getItem("ciel-fortune-visited");
      if (!visited) {
        setIsFirstVisit(true);
        localStorage.setItem("ciel-fortune-visited", "1");
      } else {
        // 返ってきたユーザー: 最後に体験した占いを取得
        try {
          const raw = localStorage.getItem("ciel-fortune-history");
          if (raw) {
            const history = JSON.parse(raw);
            if (Array.isArray(history) && history.length > 0) {
              const last = history[history.length - 1];
              setLastFortune({ slug: last.slug, title: last.title, date: last.date });
            }
          }
        } catch { /* ignore */ }
      }
    }
  }, []);

  return (
    <main className="min-h-screen bg-[var(--bg-deep)]">
      <Header />

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 pt-24 sm:pt-32 pb-16 sm:pb-20 text-center min-h-[85vh] sm:min-h-0">
        {/* Stars background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {stars.map((star, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[var(--gold)]"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
                top: `${star.top}%`,
                left: `${star.left}%`,
                opacity: star.opacity,
                animation: `twinkle ${star.duration}s ease-in-out infinite alternate`,
                animationDelay: `${star.delay}s`,
              }}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-en text-sm tracking-[0.3em] text-[var(--gold)] uppercase mb-6"
        >
          World Fortune Experience
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-en text-5xl sm:text-7xl font-light text-[var(--gold-light)] mb-6"
        >
          Ciel Fortune
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg text-[var(--text-light)] max-w-lg leading-relaxed mb-4"
        >
          世界各地で学んだ占いの知恵で
          <br />
          あなたの恋の迷いを、一緒に解いていきます。
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xs text-[var(--text-muted)] mb-2"
        >
          {timeGreeting ? timeGreeting.sub : "パリ、ストックホルム、北京 ── 各地の伝統占術をMisaが語りかけます"}
        </motion.p>

        {seasonalNote && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-[10px] text-[var(--gold)] opacity-70 mb-8"
          >
            ✦ {seasonalNote}
          </motion.p>
        )}
        {!seasonalNote && <div className="mb-8" />}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a
            href="#fortunes"
            className="inline-block bg-[var(--gold)] text-[var(--bg-deep)] px-10 py-3.5 rounded text-sm font-medium tracking-wider hover:opacity-90 transition-opacity"
          >
            無料で占いを始める
          </a>
          <p className="text-[10px] text-[var(--text-muted)] mt-3 opacity-70">
            登録不要 &middot; 8種類の恋愛占い
          </p>
          <p className="sr-only">8つの恋愛占いから選んで無料で体験できます</p>
        </motion.div>

        {/* Returning user welcome-back nudge */}
        <AnimatePresence>
          {lastFortune && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8"
            >
              <Link
                href={`/fortune/${lastFortune.slug}`}
                className="inline-flex items-center gap-2 border border-[var(--border-thin)] rounded-full px-5 py-2 text-xs text-[var(--text-muted)] hover:border-[var(--gold-dim)] hover:text-[var(--gold)] transition-all"
              >
                <span className="opacity-60">おかえりなさい</span>
                <span className="w-px h-3 bg-[var(--border-mid)]" />
                <span>前回の「{lastFortune.title}」をもう一度</span>
                <span className="text-[var(--gold)] opacity-50">&rarr;</span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Misa Introduction */}
      <section className="px-6 py-16 max-w-2xl mx-auto text-center">
        <p className="font-en text-xs tracking-[0.2em] text-[var(--gold)] uppercase mb-4">
          About Misa
        </p>
        <h2 className="text-xl sm:text-2xl text-[var(--text-light)] mb-6 leading-relaxed">
          世界各地のフライトで出会った
          <br />
          占いの知恵を、あなたに。
        </h2>
        <p className="text-sm text-[var(--text-muted)] leading-loose">
          国際線CAとして世界を飛び回る中で、パリのタロット、イスタンブールのコーヒー占い、
          インドのヴェーダ占星術 ── 各地で出会った占いの奥深さに魅了されました。
          その体験と知恵を、あなたの恋愛にお届けします。
        </p>
      </section>

      {/* World Map — Misaの旅路 */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="font-en text-xs tracking-[0.2em] text-[var(--gold)] uppercase mb-3">
            World Map
          </p>
          <h2 className="text-xl sm:text-2xl text-[var(--text-light)] mb-4">
            Misaが出会った世界の占い
          </h2>
          <p className="text-xs text-[var(--text-muted)] max-w-lg mx-auto leading-relaxed">
            パリのカフェで引いたタロット、北京の師匠に学んだ四柱推命 ──
            フライトのたびに出会った占術が、あなたの恋を照らします。
          </p>
        </div>
        <WorldMap />
        <p className="text-center text-[10px] text-[var(--text-muted)] opacity-50 mt-4">
          淡いドットは今後追加予定の占術です
        </p>
      </section>

      {/* Fortunes Grid */}
      <section id="fortunes" className="px-6 py-16 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-en text-xs tracking-[0.2em] text-[var(--gold)] uppercase mb-3">
            8 Love Fortunes
          </p>
          <h2 className="text-2xl sm:text-3xl text-[var(--text-light)] mb-4">
            恋愛に特化した世界の占い
          </h2>
          <p className="text-sm text-[var(--text-muted)]">
            最初の占いは無料でお試し。もっと深く知りたいときだけ、¥300で詳細鑑定を。
          </p>

          {/* Service Highlights */}
          <div className="grid grid-cols-3 gap-6 mt-10 mb-2">
            <div className="text-center">
              <p className="text-2xl text-[var(--gold)] font-en">8</p>
              <p className="text-[10px] text-[var(--text-muted)] mt-1">世界の占い</p>
            </div>
            <div className="text-center">
              <p className="text-2xl text-[var(--gold)] font-en">¥0</p>
              <p className="text-[10px] text-[var(--text-muted)] mt-1">基本鑑定は無料</p>
            </div>
            <div className="text-center">
              <p className="text-2xl text-[var(--gold)] font-en">24h</p>
              <p className="text-[10px] text-[var(--text-muted)] mt-1">いつでも相談可能</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {fortunes.map((fortune, i) => (
            <motion.div
              key={fortune.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={`/fortune/${fortune.slug}`}
                className="group block bg-[var(--bg-card)] border border-[var(--border-thin)] rounded-lg p-6 hover:border-[var(--gold-dim)] hover:bg-[rgba(184,150,62,0.03)] hover:-translate-y-1 transition-all duration-300 h-full"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl" aria-hidden="true">{fortune.emoji}</span>
                  <div className="flex flex-col items-end gap-1">
                    {isFirstVisit && i === 0 && (
                      <span className="text-[9px] text-[var(--gold)] bg-[rgba(184,150,62,0.12)] border border-[var(--gold-dim)] rounded-full px-2 py-0.5 animate-pulse">
                        おすすめ
                      </span>
                    )}
                    <span className="text-[9px] text-[var(--text-muted)] bg-[rgba(255,255,255,0.04)] border border-[var(--border-thin)] rounded-full px-2 py-0.5">
                      無料で試せます
                    </span>
                  </div>
                </div>
                <p className="font-en text-[10px] tracking-[0.15em] text-[var(--gold)] uppercase mb-1">
                  {fortune.regionEn}
                </p>
                <h3 className="text-base text-[var(--text-light)] mb-1 group-hover:text-[var(--gold-light)] transition-colors">
                  {fortune.name}
                </h3>
                <p className="font-en text-xs text-[var(--text-muted)] mb-3">
                  {fortune.nameEn}
                </p>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-3">
                  {fortune.shortDescription}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[var(--gold)] border border-[var(--gold-dim)] rounded px-2 py-0.5">
                    {fortune.lovePoint}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="px-6 py-16 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="font-en text-xs tracking-[0.2em] text-[var(--gold)] uppercase mb-3">
            Voices
          </p>
          <h2 className="text-xl sm:text-2xl text-[var(--text-light)]">
            体験した方の声
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              text: "タロットの結果が、今の自分の状況にぴったりで驚きました。Misaの言葉が温かくて、前向きになれました。",
              age: "20代",
              fortune: "タロットリーディング",
            },
            {
              text: "四柱推命で自分の恋愛パターンを知れて納得。付き合い方を見直すきっかけになりました。",
              age: "30代",
              fortune: "四柱推命",
            },
            {
              text: "ルーン占い、初めてでしたがカードを選ぶ体験が楽しかった。結果も的確で友達にもすすめました。",
              age: "20代",
              fortune: "ルーンオラクル",
            },
          ].map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border border-[var(--border-thin)] rounded-lg p-5"
            >
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-3">
                &ldquo;{v.text}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[var(--text-muted)] opacity-60">{v.age}</span>
                <span className="text-[10px] text-[var(--gold)] opacity-60">{v.fortune}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 py-20 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-en text-xs tracking-[0.2em] text-[var(--gold)] uppercase mb-3">
            Pricing
          </p>
          <h2 className="text-2xl text-[var(--text-light)] mb-4">料金プラン</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Free */}
          <div className="border border-[var(--border-thin)] rounded-lg p-6 flex flex-col">
            <p className="font-en text-sm text-[var(--gold)] mb-1">Free</p>
            <p className="text-2xl text-[var(--text-light)] mb-1">¥0</p>
            <p className="text-xs text-[var(--text-muted)] mb-6">基本鑑定が無料</p>
            <ul className="text-xs text-[var(--text-muted)] space-y-2 mb-6">
              <li>全8占いの概要結果</li>
              <li>週間恋愛運（LINE）</li>
              <li>占い履歴 直近3件</li>
            </ul>
            <div className="mt-auto">
              <Link
                href="/#fortunes"
                className="block text-center border border-[var(--border-mid)] text-[var(--text-muted)] px-4 py-2.5 rounded text-xs hover:border-[var(--gold-dim)] hover:text-[var(--gold)] transition-all"
              >
                無料で試す
              </Link>
            </div>
          </div>

          {/* Per-use */}
          <div className="border border-[var(--gold-dim)] rounded-lg p-6 relative flex flex-col">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--gold)] text-[var(--bg-deep)] text-[10px] px-3 py-0.5 rounded-full tracking-wider">
              人気
            </div>
            <p className="font-en text-sm text-[var(--gold)] mb-1">Per Reading</p>
            <p className="text-2xl text-[var(--text-light)] mb-1">¥300<span className="text-sm text-[var(--text-muted)]">/回</span></p>
            <p className="text-xs text-[var(--text-muted)] mb-6">気になったときに1回から</p>
            <ul className="text-xs text-[var(--text-muted)] space-y-2 mb-6">
              <li>1回分の詳細恋愛鑑定</li>
              <li>Misaの手紙風アドバイス</li>
              <li>Misaへの恋愛相談: ¥500/回</li>
            </ul>
            <div className="mt-auto">
              <Link
                href="/#fortunes"
                className="block text-center bg-[var(--gold)] text-[var(--bg-deep)] px-4 py-2.5 rounded text-xs font-medium hover:opacity-90 transition-opacity"
              >
                占いを選んで鑑定する
              </Link>
            </div>
          </div>

          {/* Premium */}
          <div className="border border-[var(--border-thin)] rounded-lg p-6 flex flex-col">
            <p className="font-en text-sm text-[var(--gold)] mb-1">Premium</p>
            <p className="text-2xl text-[var(--text-light)] mb-1">¥400<span className="text-sm text-[var(--text-muted)]">/月</span></p>
            <p className="text-xs text-[var(--text-muted)] mb-6">2回以上ならお得</p>
            <ul className="text-xs text-[var(--text-muted)] space-y-2 mb-6">
              <li>全占い詳細鑑定が見放題</li>
              <li>Misaへの相談 月10回付き</li>
              <li>運勢推移チャート</li>
              <li>LINE週間占い 詳細版</li>
            </ul>
            <div className="mt-auto">
              <Link
                href="/mypage?plan=premium"
                className="block text-center border border-[var(--gold)] text-[var(--gold)] px-4 py-2.5 rounded text-xs hover:bg-[var(--gold)] hover:text-[var(--bg-deep)] transition-all"
              >
                Premiumを始める
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "本当に無料で占えますか？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "はい。8つの占いすべてで、基本鑑定は無料です。登録も不要で、すぐにお試しいただけます。もっと詳しい鑑定が欲しいときだけ、1回¥300の個別購入またはPremiumプラン（¥400/月）をご利用ください。",
                },
              },
              {
                "@type": "Question",
                name: "Misaとは誰ですか？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Misaは国際線CAとして世界を飛び回る中で、パリのタロット、イスタンブールのコーヒー占い、インドのヴェーダ占星術など各地の占いを学んだ占い師です。その旅の知恵と経験を活かして、あなたの恋愛を一緒に見つめます。",
                },
              },
              {
                "@type": "Question",
                name: "占い結果の精度はどのくらいですか？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "各占術の伝統的な解釈に基づき、あなたの誕生日や星座、引いたカードに応じてパーソナライズされた鑑定をお届けします。本サービスはエンターテインメント目的のコンテンツです。",
                },
              },
            ],
          }),
        }}
      />

      {/* Mini FAQ — SEO & conversion */}
      <section className="px-6 py-16 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="font-en text-xs tracking-[0.2em] text-[var(--gold)] uppercase mb-3">
            FAQ
          </p>
          <h2 className="text-xl sm:text-2xl text-[var(--text-light)]">
            よくある質問
          </h2>
        </div>
        <div className="space-y-4">
          {[
            {
              q: "本当に無料で占えますか？",
              a: "はい。8つの占いすべてで、基本鑑定は無料です。登録も不要で、すぐにお試しいただけます。もっと詳しい鑑定が欲しいときだけ、1回¥300の個別購入またはPremiumプラン（¥400/月）をご利用ください。",
            },
            {
              q: "Misaとは誰ですか？",
              a: "Misaは国際線CAとして世界を飛び回る中で、パリのタロット、イスタンブールのコーヒー占い、インドのヴェーダ占星術など各地の占いを学んだ占い師です。その旅の知恵と経験を活かして、あなたの恋愛を一緒に見つめます。",
            },
            {
              q: "占い結果の精度はどのくらいですか？",
              a: "各占術の伝統的な解釈に基づき、あなたの誕生日や星座、引いたカードに応じてパーソナライズされた鑑定をお届けします。本サービスはエンターテインメント目的のコンテンツです。",
            },
          ].map((faq, i) => (
            <details
              key={i}
              className="group border border-[var(--border-thin)] rounded-lg"
            >
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm text-[var(--text-light)] hover:text-[var(--gold-light)] transition-colors">
                {faq.q}
                <span className="text-[var(--gold)] opacity-50 group-open:rotate-45 transition-transform text-lg ml-2">
                  +
                </span>
              </summary>
              <p className="px-5 pb-4 text-xs text-[var(--text-muted)] leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            href="/faq"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors"
          >
            すべてのFAQを見る &rarr;
          </Link>
        </div>
      </section>

      {/* Chat CTA */}
      <section className="px-6 py-20 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-en text-xs tracking-[0.2em] text-[var(--gold)] uppercase mb-3">
            Chat with Misa
          </p>
          <h2 className="text-2xl text-[var(--text-light)] mb-4">
            恋の悩み、Misaに話してみませんか？
          </h2>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-8">
            フライトの合間に、世界中で学んだ占いの知恵を使って<br />
            あなたの恋愛の悩みにじっくり向き合います。
          </p>
          <Link
            href="/chat"
            className="inline-block border border-[var(--gold)] text-[var(--gold)] px-8 py-3 rounded text-sm tracking-widest hover:bg-[var(--gold)] hover:text-[var(--bg-deep)] transition-all duration-300"
          >
            Misaに相談する
          </Link>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
