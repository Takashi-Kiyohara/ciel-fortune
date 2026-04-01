"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// 8つのアクティブ占い（マネタイズ対象）
const activePins = [
  { slug: "tarot", label: "タロット", labelEn: "Tarot", emoji: "🃏", x: 480, y: 155, city: "Paris" },
  { slug: "western-astrology", label: "西洋占星術", labelEn: "Astrology", emoji: "✨", x: 505, y: 125, city: "Stockholm" },
  { slug: "four-pillars", label: "四柱推命", labelEn: "Four Pillars", emoji: "🏯", x: 790, y: 185, city: "Beijing" },
  { slug: "rune", label: "ルーン", labelEn: "Rune", emoji: "🪨", x: 430, y: 110, city: "Reykjavik" },
  { slug: "coffee", label: "コーヒー占い", labelEn: "Coffee Reading", emoji: "☕", x: 545, y: 185, city: "Istanbul" },
  { slug: "numerology", label: "数秘術", labelEn: "Numerology", emoji: "🔢", x: 525, y: 195, city: "Athens" },
  { slug: "vedic", label: "ヴェーダ占星術", labelEn: "Vedic Astrology", emoji: "🕉️", x: 680, y: 220, city: "Jaipur" },
  { slug: "oracle-card", label: "オラクルカード", labelEn: "Oracle Card", emoji: "🌺", x: 165, y: 235, city: "Maui" },
];

// Coming Soon — 将来追加予定（30+都市・装飾ドット）
const comingSoonDots = [
  // 北米
  { x: 200, y: 170, label: "シャーマン占い", city: "Santa Fe" },
  { x: 240, y: 155, label: "ドリームキャッチャー", city: "Sedona" },
  { x: 270, y: 145, label: "アストロ", city: "New York" },
  // 中南米
  { x: 230, y: 240, label: "マヤ暦", city: "Cancún" },
  { x: 260, y: 270, label: "コカの葉占い", city: "Cusco" },
  { x: 290, y: 300, label: "インカ占い", city: "La Paz" },
  { x: 300, y: 340, label: "カンドンブレ", city: "Salvador" },
  { x: 275, y: 250, label: "サンテリア", city: "Havana" },
  // ヨーロッパ
  { x: 460, y: 145, label: "ケルト占い", city: "Dublin" },
  { x: 497, y: 165, label: "手相占い", city: "Milan" },
  { x: 475, y: 140, label: "リーディング", city: "London" },
  { x: 510, y: 148, label: "バイキング占い", city: "Oslo" },
  { x: 495, y: 175, label: "ジプシー占い", city: "Budapest" },
  { x: 470, y: 180, label: "フラメンコ占い", city: "Madrid" },
  // アフリカ
  { x: 500, y: 240, label: "砂占い", city: "Marrakech" },
  { x: 530, y: 280, label: "イファ占い", city: "Lagos" },
  { x: 555, y: 310, label: "ボーンリーディング", city: "Nairobi" },
  { x: 540, y: 350, label: "サンゴマ", city: "Cape Town" },
  { x: 570, y: 260, label: "コプト占星術", city: "Cairo" },
  // 中東
  { x: 575, y: 210, label: "ゲオマンシー", city: "Dubai" },
  { x: 560, y: 195, label: "カバラ", city: "Jerusalem" },
  // アジア
  { x: 720, y: 205, label: "風水", city: "Hong Kong" },
  { x: 750, y: 220, label: "姓名判断", city: "Taipei" },
  { x: 830, y: 190, label: "血液型占い", city: "Tokyo" },
  { x: 810, y: 200, label: "九星気学", city: "Seoul" },
  { x: 700, y: 250, label: "ビルマ占星術", city: "Yangon" },
  { x: 720, y: 260, label: "タイ占星術", city: "Bangkok" },
  { x: 665, y: 200, label: "チベット占い", city: "Lhasa" },
  // オセアニア
  { x: 870, y: 330, label: "ドリームタイム", city: "Uluru" },
  { x: 900, y: 310, label: "マオリ占い", city: "Auckland" },
  { x: 850, y: 290, label: "バリ占い", city: "Bali" },
  // 太平洋
  { x: 130, y: 260, label: "フラ占い", city: "Honolulu" },
  { x: 920, y: 270, label: "タパ占い", city: "Fiji" },
];

// 実際の世界地図パス（Natural Earth simplified）
// Mercator-like projection, viewBox 0 0 1000 500
const continentPaths = {
  northAmerica: "M145,60 L160,55 L185,58 L205,52 L230,48 L250,50 L270,55 L285,60 L295,65 L300,75 L295,85 L290,95 L295,105 L300,110 L305,115 L310,120 L305,130 L300,140 L295,150 L285,155 L275,160 L270,170 L260,175 L250,180 L245,190 L240,200 L235,205 L225,208 L215,210 L210,215 L220,225 L225,230 L230,235 L240,240 L235,245 L225,242 L210,238 L200,232 L195,225 L190,218 L180,212 L170,210 L160,205 L155,198 L150,190 L140,185 L135,175 L128,165 L125,155 L120,148 L118,140 L122,130 L125,120 L130,110 L128,100 L130,90 L135,80 L140,70 Z",
  greenland: "M360,30 L380,28 L400,32 L410,40 L405,55 L395,65 L380,68 L365,62 L355,50 L352,40 Z",
  southAmerica: "M270,255 L280,250 L290,252 L300,258 L310,265 L315,275 L318,285 L320,295 L322,310 L320,325 L318,340 L312,355 L305,365 L298,375 L290,382 L280,385 L272,378 L268,365 L265,350 L262,335 L260,320 L258,305 L255,290 L258,275 L265,262 Z",
  europe: "M455,85 L465,82 L475,80 L485,78 L495,80 L505,82 L515,80 L525,78 L535,82 L540,88 L545,95 L548,105 L545,115 L540,125 L535,130 L530,140 L525,148 L518,155 L510,160 L505,168 L498,172 L490,175 L482,178 L475,180 L468,178 L460,175 L455,168 L450,160 L448,150 L445,140 L442,130 L440,120 L442,110 L445,100 L448,92 Z",
  uk: "M455,100 L462,98 L465,105 L462,115 L458,118 L453,112 L452,105 Z",
  africa: "M475,195 L485,190 L495,188 L505,190 L515,195 L525,200 L535,205 L545,210 L555,218 L562,228 L568,240 L572,255 L575,270 L573,285 L570,300 L565,315 L558,328 L550,340 L540,350 L530,355 L520,352 L512,345 L505,335 L500,320 L497,305 L495,290 L492,275 L488,260 L483,245 L478,230 L475,215 L473,205 Z",
  asia: "M555,60 L570,55 L590,52 L610,50 L635,48 L660,50 L685,55 L710,58 L735,60 L760,65 L780,70 L800,78 L815,85 L825,92 L835,100 L840,110 L842,120 L840,132 L838,145 L835,155 L832,165 L828,175 L825,185 L820,195 L810,202 L798,208 L785,210 L775,215 L765,220 L755,225 L740,228 L725,230 L710,232 L695,235 L680,238 L665,240 L650,238 L640,232 L630,225 L620,218 L612,210 L605,200 L598,190 L592,180 L585,170 L578,160 L570,150 L565,140 L560,130 L555,120 L550,110 L548,100 L550,88 L552,75 Z",
  japan: "M830,150 L835,145 L838,152 L840,162 L838,170 L835,175 L830,168 L828,158 Z",
  india: "M650,195 L660,190 L672,192 L682,198 L688,208 L690,220 L688,232 L682,242 L675,250 L668,255 L660,258 L652,255 L645,248 L640,238 L638,228 L640,218 L642,208 L645,200 Z",
  seAsia: "M730,235 L740,232 L750,235 L760,240 L765,250 L760,260 L752,265 L742,262 L735,255 L730,245 Z",
  australia: "M810,295 L830,288 L850,285 L870,288 L888,295 L900,305 L905,318 L902,332 L895,342 L882,350 L868,355 L852,352 L838,348 L825,340 L815,330 L810,318 L808,305 Z",
  newZealand: "M910,345 L915,340 L920,345 L922,355 L918,362 L912,358 Z",
  indonesia: "M750,270 L770,268 L790,272 L800,278 L795,285 L780,288 L760,285 L750,278 Z",
  madagascar: "M580,330 L585,325 L590,330 L590,342 L585,348 L580,342 Z",
};

export default function WorldMap() {
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <svg
        viewBox="0 0 1000 420"
        className="w-full h-auto"
        role="img"
        aria-label="Misaが世界中で出会った占いの地図"
      >
        <defs>
          {/* 地図全体のグロー */}
          <radialGradient id="mapGlow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="rgba(184,150,62,0.04)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          {/* ピンのグロー */}
          <filter id="pinGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* 大陸のグラデーション */}
          <linearGradient id="continentFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(184,150,62,0.08)" />
            <stop offset="100%" stopColor="rgba(184,150,62,0.03)" />
          </linearGradient>
        </defs>

        {/* 背景 */}
        <rect width="1000" height="420" fill="url(#mapGlow)" rx="8" />

        {/* 経度線（控えめなグリッド） */}
        {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((x) => (
          <line
            key={`lng-${x}`}
            x1={x} y1="20" x2={x} y2="400"
            stroke="rgba(184,150,62,0.04)"
            strokeWidth="0.5"
            strokeDasharray="4,8"
          />
        ))}
        {/* 緯度線 */}
        {[80, 160, 240, 320, 400].map((y) => (
          <line
            key={`lat-${y}`}
            x1="20" y1={y} x2="980" y2={y}
            stroke="rgba(184,150,62,0.04)"
            strokeWidth="0.5"
            strokeDasharray="4,8"
          />
        ))}
        {/* 赤道（少し目立つ） */}
        <line x1="20" y1="240" x2="980" y2="240" stroke="rgba(184,150,62,0.06)" strokeWidth="0.5" strokeDasharray="2,6" />

        {/* 大陸シルエット */}
        {Object.entries(continentPaths).map(([name, d]) => (
          <path
            key={name}
            d={d}
            fill="url(#continentFill)"
            stroke="rgba(184,150,62,0.15)"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
        ))}

        {/* フライトルート（Misaの旅路を示す曲線） */}
        {[
          // Maui → Paris
          { x1: 165, y1: 235, x2: 480, y2: 155, cx: 320, cy: 80 },
          // Paris → Stockholm
          { x1: 480, y1: 155, x2: 505, y2: 125, cx: 492, cy: 130 },
          // Stockholm → Reykjavik
          { x1: 505, y1: 125, x2: 430, y2: 110, cx: 468, cy: 95 },
          // Paris → Istanbul
          { x1: 480, y1: 155, x2: 545, y2: 185, cx: 512, cy: 155 },
          // Istanbul → Athens
          { x1: 545, y1: 185, x2: 525, y2: 195, cx: 535, cy: 195 },
          // Istanbul → Jaipur
          { x1: 545, y1: 185, x2: 680, y2: 220, cx: 612, cy: 175 },
          // Jaipur → Beijing
          { x1: 680, y1: 220, x2: 790, y2: 185, cx: 735, cy: 170 },
        ].map((route, i) => (
          <path
            key={`route-${i}`}
            d={`M${route.x1},${route.y1} Q${route.cx},${route.cy} ${route.x2},${route.y2}`}
            fill="none"
            stroke="rgba(184,150,62,0.08)"
            strokeWidth="0.8"
            strokeDasharray="3,5"
          />
        ))}

        {/* Coming Soon ドット（30+都市） */}
        {comingSoonDots.map((dot, i) => (
          <g key={`cs-${i}`}>
            <circle
              cx={dot.x}
              cy={dot.y}
              r="2"
              fill="rgba(184,150,62,0.12)"
            >
              <animate
                attributeName="opacity"
                values="0.12;0.25;0.12"
                dur={`${3 + (i % 4)}s`}
                repeatCount="indefinite"
                begin={`${(i * 0.5) % 3}s`}
              />
            </circle>
          </g>
        ))}

        {/* アクティブ占いピン（8つ） */}
        {activePins.map((pin) => {
          const isHovered = hoveredPin === pin.slug;
          return (
            <g key={pin.slug} filter="url(#pinGlow)">
              {/* 外側パルスリング */}
              <circle
                cx={pin.x}
                cy={pin.y}
                r="4"
                fill="none"
                stroke="var(--gold)"
                strokeWidth="0.8"
                opacity="0.3"
              >
                <animate attributeName="r" from="4" to="16" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.3" to="0" dur="2.5s" repeatCount="indefinite" />
              </circle>
              {/* ホバーリング */}
              <circle
                cx={pin.x}
                cy={pin.y}
                r={isHovered ? 12 : 8}
                fill="none"
                stroke="rgba(184,150,62,0.3)"
                strokeWidth={isHovered ? 1.5 : 0.8}
                className="transition-all duration-300"
              />
              {/* メインドット */}
              <circle
                cx={pin.x}
                cy={pin.y}
                r={isHovered ? 5 : 4}
                fill="var(--gold)"
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredPin(pin.slug)}
                onMouseLeave={() => setHoveredPin(null)}
              />
              {/* 都市名ラベル（常時表示・控えめ） */}
              <text
                x={pin.x}
                y={pin.y + 16}
                textAnchor="middle"
                fill="rgba(184,150,62,0.4)"
                fontSize="7"
                fontFamily="'Cormorant Garamond', serif"
                letterSpacing="0.5"
              >
                {pin.city}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip on hover */}
      <AnimatePresence>
        {hoveredPin && (() => {
          const pin = activePins.find((p) => p.slug === hoveredPin);
          if (!pin) return null;
          const leftPct = (pin.x / 1000) * 100;
          const topPct = (pin.y / 420) * 100;
          return (
            <motion.div
              key={pin.slug}
              initial={{ opacity: 0, y: 4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute pointer-events-none z-10"
              style={{ left: `${leftPct}%`, top: `${topPct - 6}%`, transform: "translate(-50%, -100%)" }}
            >
              <div className="bg-[var(--bg-deep)] border border-[var(--gold-dim)] rounded-lg px-4 py-2.5 text-center shadow-2xl whitespace-nowrap">
                <p className="text-sm text-[var(--gold)] mb-0.5">{pin.emoji} {pin.label}</p>
                <p className="font-en text-[10px] text-[var(--text-muted)] tracking-wider">{pin.city} · {pin.labelEn}</p>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* モバイル用リンクボタン */}
      <div className="flex flex-wrap justify-center gap-2 mt-6">
        {activePins.map((pin) => (
          <Link
            key={pin.slug}
            href={`/fortune/${pin.slug}`}
            className="flex items-center gap-1.5 border border-[var(--border-thin)] rounded-full px-3 py-1.5 text-[10px] text-[var(--text-muted)] hover:border-[var(--gold-dim)] hover:text-[var(--gold)] transition-all"
            onMouseEnter={() => setHoveredPin(pin.slug)}
            onMouseLeave={() => setHoveredPin(null)}
          >
            <span>{pin.emoji}</span>
            <span className="font-en tracking-wider">{pin.city}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
