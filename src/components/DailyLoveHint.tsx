"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/**
 * 今日の恋のヒント — Co-Star型デイリーリピート装置
 *
 * 日付 × 星座（or ランダム）でその日限りの一言メッセージを表示。
 * 占い専門家の視点: 毎日来る理由を作る + 「当たってる」感を演出。
 * BCGの視点: DAUを上げてファネル上部を太くする。
 */

// 恋のヒント — 30パターン（日付の剰余で選択）
const LOVE_HINTS = [
  { hint: "今日は直感を信じて。気になる人からの連絡には、すぐに返信を。", lucky: "淡いピンクの小物", fortune: "tarot" },
  { hint: "午後に嬉しいサプライズがありそう。心を開いて受け取って。", lucky: "カフェラテ", fortune: "coffee" },
  { hint: "今日の恋愛キーワードは「素直さ」。飾らない言葉が相手の心に届きます。", lucky: "手書きのメッセージ", fortune: "oracle-card" },
  { hint: "過去の恋にケリをつけるなら、今日がチャンス。新しい風が吹いています。", lucky: "窓を開けること", fortune: "rune" },
  { hint: "夕方以降、恋のエネルギーが高まります。夜のお出かけが吉。", lucky: "イヤリング", fortune: "western-astrology" },
  { hint: "「ありがとう」の一言が、思いがけない展開を呼びそう。", lucky: "温かい飲み物", fortune: "vedic" },
  { hint: "今日は自分磨きの日。内面を整えることで、恋の引力が強まります。", lucky: "読書の時間", fortune: "numerology" },
  { hint: "偶然の再会に注目。懐かしい人からの連絡には深い意味があるかも。", lucky: "香水をつけること", fortune: "vedic" },
  { hint: "焦らなくて大丈夫。今は種まきの時期。じっくり育てた恋が実ります。", lucky: "グリーンのアイテム", fortune: "four-pillars" },
  { hint: "相手の「小さな変化」に気づいてあげて。それが二人の距離を縮めます。", lucky: "手土産を持つこと", fortune: "coffee" },
  { hint: "今日は「聞き役」に徹すると◎。相手が心を開いてくれるサインが見えます。", lucky: "ブルーの服", fortune: "tarot" },
  { hint: "恋に迷ったら空を見上げて。月が答えをくれています。", lucky: "夜の散歩", fortune: "western-astrology" },
  { hint: "SNSでの「いいね」が恋のきっかけになるかも。小さなアクションを大切に。", lucky: "スマホケースを変える", fortune: "numerology" },
  { hint: "今日出会う人の中に、運命の人がいるかもしれません。笑顔を忘れずに。", lucky: "リップクリーム", fortune: "oracle-card" },
  { hint: "一人の時間も大切な恋のエネルギー補充。今日は自分を甘やかして。", lucky: "入浴剤", fortune: "rune" },
  { hint: "言いたかったことを伝えるなら今。星がコミュニケーションを後押しします。", lucky: "ペンを持つこと", fortune: "western-astrology" },
  { hint: "古い写真を見返すと、忘れていた大切なことを思い出せそう。", lucky: "アルバム", fortune: "four-pillars" },
  { hint: "今日のデートは新しい場所で。いつもと違う景色が恋を動かします。", lucky: "地図アプリ", fortune: "coffee" },
  { hint: "「完璧」を手放すと、自然体のあなたに惹かれる人が現れます。", lucky: "スニーカー", fortune: "oracle-card" },
  { hint: "友人からの紹介に良縁あり。誘いには二つ返事で応じて。", lucky: "お揃いのもの", fortune: "tarot" },
  { hint: "朝の過ごし方が今日の恋運を左右します。ゆっくり目覚めて。", lucky: "朝ごはんを丁寧に", fortune: "vedic" },
  { hint: "相手の好きなものを覚えておくこと。それが最高の愛情表現になります。", lucky: "メモを取る習慣", fortune: "numerology" },
  { hint: "今日は「待つ恋」より「動く恋」。あなたからの一歩が世界を変えます。", lucky: "赤いネイル", fortune: "rune" },
  { hint: "音楽が恋のスイッチを入れてくれそう。好きな曲を聴きながら出かけて。", lucky: "イヤホン", fortune: "oracle-card" },
  { hint: "料理を作ると恋愛運UP。手料理は最強の愛情伝達手段です。", lucky: "新しいレシピ", fortune: "coffee" },
  { hint: "今日のキーパーソンは「年上の人」。アドバイスに耳を傾けてみて。", lucky: "シックなアクセサリー", fortune: "four-pillars" },
  { hint: "「ごめんね」と言うべきことがあるなら今日。仲直りの星が味方しています。", lucky: "相手の好きなお菓子", fortune: "tarot" },
  { hint: "鏡の前で笑顔の練習を。その笑顔が今日の恋を引き寄せます。", lucky: "リップ", fortune: "western-astrology" },
  { hint: "寝る前に明日の恋を思い描いて。イメージした通りの出来事が起きそう。", lucky: "ラベンダーの香り", fortune: "vedic" },
  { hint: "今日は「好き」の気持ちを大切にするだけで十分。理由はいりません。", lucky: "ハート型のもの", fortune: "numerology" },
];

// 月の満ち欠け（簡易計算）
function getMoonPhase(): { emoji: string; name: string } {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  // 簡易的な月齢計算（Conwayの方法を簡略化）
  const c = Math.floor(year / 100);
  const y = year - 19 * Math.floor(year / 19);
  const k = Math.floor((c - 17) / 25);
  let i = c - Math.floor(c / 4) - Math.floor((c - k) / 3) + 19 * y + 15;
  i = i - 30 * Math.floor(i / 30);
  i = i - Math.floor(i / 28) * (1 - Math.floor(i / 28) * Math.floor(29 / (i + 1)) * Math.floor((21 - y) / 11));
  let j = year + Math.floor(year / 4) + i + 2 - c + Math.floor(c / 4);
  j = j - 7 * Math.floor(j / 7);
  const l = i - j;
  const moonAge = ((((month + day + l) % 30) + 30) % 30);

  if (moonAge < 2) return { emoji: "🌑", name: "新月" };
  if (moonAge < 7) return { emoji: "🌒", name: "三日月" };
  if (moonAge < 10) return { emoji: "🌓", name: "上弦の月" };
  if (moonAge < 14) return { emoji: "🌔", name: "十三夜月" };
  if (moonAge < 17) return { emoji: "🌕", name: "満月" };
  if (moonAge < 21) return { emoji: "🌖", name: "十八夜月" };
  if (moonAge < 25) return { emoji: "🌗", name: "下弦の月" };
  return { emoji: "🌘", name: "二十六夜月" };
}

export default function DailyLoveHint() {
  const [hint, setHint] = useState<typeof LOVE_HINTS[0] | null>(null);
  const [moon, setMoon] = useState<{ emoji: string; name: string } | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const now = new Date();
    const dayOfYear = Math.floor(
      (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
    );
    const index = dayOfYear % LOVE_HINTS.length;
    setHint(LOVE_HINTS[index]);
    setMoon(getMoonPhase());
  }, []);

  if (!hint || !moon) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border border-[var(--border-thin)] rounded-lg p-5 cursor-pointer hover:border-[var(--gold-dim)] transition-colors"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <p className="font-en text-[10px] tracking-[0.15em] text-[var(--gold)] uppercase">
              Today&apos;s Love Hint
            </p>
            <span className="text-xs" aria-hidden="true">{moon.emoji}</span>
            <span className="text-[9px] text-[var(--text-muted)] opacity-60">
              {moon.name}
            </span>
          </div>
          <p className="text-sm text-[var(--text-light)] leading-relaxed">
            {hint.hint}
          </p>
        </div>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className="text-[var(--gold)] opacity-40 text-xs mt-1 ml-2"
        >
          ▼
        </motion.span>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-3 mt-3 border-t border-[var(--border-thin)] flex items-center justify-between">
              <div>
                <p className="text-[10px] text-[var(--text-muted)] mb-1">
                  今日のラッキーアイテム
                </p>
                <p className="text-xs text-[var(--gold)]">
                  {hint.lucky}
                </p>
              </div>
              <Link
                href={`/fortune/${hint.fortune}`}
                onClick={(e) => e.stopPropagation()}
                className="text-[10px] border border-[var(--gold-dim)] text-[var(--gold)] rounded-full px-3 py-1 hover:bg-[var(--gold)] hover:text-[var(--bg-deep)] transition-all"
              >
                詳しく占う
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
