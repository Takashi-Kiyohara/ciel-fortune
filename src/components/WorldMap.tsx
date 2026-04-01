"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// 8つのアクティブ占い（マネタイズ対象）の地図上座標
// Mercator投影のSVG座標系 (viewBox 0 0 1000 500)
const activePins = [
  { slug: "tarot", label: "タロット", labelEn: "Tarot", emoji: "🃏", x: 510, y: 170, city: "Paris" },
  { slug: "western-astrology", label: "西洋占星術", labelEn: "Astrology", emoji: "✨", x: 530, y: 145, city: "Stockholm" },
  { slug: "four-pillars", label: "四柱推命", labelEn: "Four Pillars", emoji: "🏯", x: 810, y: 200, city: "Beijing" },
  { slug: "rune", label: "ルーン", labelEn: "Rune", emoji: "🩸", x: 460, y: 130, city: "Iceland" },
  { slug: "coffee", label: "コーヒー占い", labelEn: "Coffee", emoji: "☕", x: 560, y: 200, city: "Istanbul" },
  { slug: "numerology", label: "数秘術", labelEn: "Numerology", emoji: "🔢", x: 545, y: 190, city: "Athens" },
  { slug: "vedic", label: "ヴェーダ", labelEn: "Vedic", emoji: "🕉", x: 700, y: 230, city: "Jaipur" },
  { slug: "oracle-card", label: "オラクル", labelEn: "Oracle", emoji: "🌸", x: 180, y: 245, city: "Maui" },
];

// Coming Soon — 将来追加予定の占い（装飾ドット）
const comingSoonDots = [
  { x: 280, y: 185, label: "ネイティブアメリカン" },
  { x: 330, y: 280, label: "マヤ" },
  { x: 360, y: 340, label: "インカ" },
  { x: 600, y: 300, label: "アフリカン" },
  { x: 490, y: 210, label: "ケルト" },
  { x: 850, y: 175, label: "風水" },
  { x: 840, y: 260, label: "易経" },
  { x: 900, y: 320, label: "ドリームタイム" },
  { x: 770, y: 240, label: "ビルマ占星術" },
  { x: 580, y: 165, label: "カバラ" },
  { x: 310, y: 340, label: "コカの葉" },
  { x: 430, y: 300, label: "サンテリア" },
];

export default function WorldMap() {
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <svg
        viewBox="0 0 1000 500"
        className="w-full h-auto"
        style={{ filter: "drop-shadow(0 0 40px rgba(184, 150, 62, 0.05))" }}
      >
        {/* 簡易世界地図のアウトライン — 極度に簡略化したパス */}
        <defs>
          <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(184,150,62,0.06)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect width="1000" height="500" fill="url(#mapGlow)" rx="8" />

        {/* 大陸シルエット（簡略パス） */}
        {/* 北米 */}
        <path
          d="M120,100 Q140,80 200,90 Q260,85 280,110 Q310,100 320,130 Q300,150 310,180 Q290,200 270,210 Q250,230 230,240 Q200,250 180,235 Q160,250 150,230 Q130,200 120,170 Q110,140 120,100Z"
          fill="rgba(184,150,62,0.06)"
          stroke="rgba(184,150,62,0.12)"
          strokeWidth="0.5"
        />
        {/* 南米 */}
        <path
          d="M280,270 Q300,260 320,275 Q340,290 350,320 Q360,350 350,380 Q340,400 320,410 Q300,400 290,380 Q280,350 270,320 Q270,290 280,270Z"
          fill="rgba(184,150,62,0.06)"
          stroke="rgba(184,150,62,0.12)"
          strokeWidth="0.5"
        />
        {/* ヨーロッパ */}
        <path
          d="M470,100 Q490,90 520,95 Q550,100 570,110 Q580,130 570,150 Q560,170 540,175 Q520,180 500,175 Q480,170 470,155 Q460,140 465,120 Q465,110 470,100Z"
          fill="rgba(184,150,62,0.06)"
          stroke="rgba(184,150,62,0.12)"
          strokeWidth="0.5"
        />
        {/* アフリカ */}
        <path
          d="M520,200 Q540,190 570,200 Q590,220 600,260 Q610,300 600,340 Q590,370 570,380 Q550,375 540,350 Q530,320 520,280 Q510,240 520,200Z"
          fill="rgba(184,150,62,0.06)"
          stroke="rgba(184,150,62,0.12)"
          strokeWidth="0.5"
        />
        {/* アジア */}
        <path
          d="M600,80 Q650,70 720,80 Q790,90 850,100 Q880,120 870,160 Q860,200 830,220 Q800,240 760,240 Q720,235 690,220 Q660,200 640,180 Q620,160 610,130 Q600,100 600,80Z"
          fill="rgba(184,150,62,0.06)"
          stroke="rgba(184,150,62,0.12)"
          strokeWidth="0.5"
        />
        {/* オセアニア */}
        <path
          d="M860,310 Q890,300 920,310 Q940,330 935,355 Q920,370 895,370 Q870,365 860,345 Q855,325 860,310Z"
          fill="rgba(184,150,62,0.06)"
          stroke="rgba(184,150,62,0.12)"
          strokeWidth="0.5"
        />

        {/* Coming Soonドット */}
        {comingSoonDots.map((dot, i) => (
          <circle
            key={`cs-${i}`}
            cx={dot.x}
            cy={dot.y}
            r="2.5"
            fill="rgba(184,150,62,0.15)"
            className="animate-pulse"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}

        {/* アクティブ占いピン */}
        {activePins.map((pin) => (
          <g key={pin.slug}>
            {/* Glow ring */}
            <circle
              cx={pin.x}
              cy={pin.y}
              r={hoveredPin === pin.slug ? 14 : 10}
              fill="none"
              stroke="rgba(184,150,62,0.25)"
              strokeWidth="1"
              className="transition-all duration-300"
            />
            {/* Main dot */}
            <circle
              cx={pin.x}
              cy={pin.y}
              r="5"
              fill="var(--gold)"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredPin(pin.slug)}
              onMouseLeave={() => setHoveredPin(null)}
              style={{ filter: "drop-shadow(0 0 6px rgba(184,150,62,0.5))" }}
            />
            {/* Pulse animation */}
            <circle
              cx={pin.x}
              cy={pin.y}
              r="5"
              fill="none"
              stroke="var(--gold)"
              strokeWidth="1"
              opacity="0.4"
            >
              <animate attributeName="r" from="5" to="18" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.4" to="0" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </svg>

      {/* Tooltip on hover */}
      <AnimatePresence>
        {hoveredPin && (() => {
          const pin = activePins.find((p) => p.slug === hoveredPin);
          if (!pin) return null;
          // SVG座標をパーセントに変換
          const leftPct = (pin.x / 1000) * 100;
          const topPct = (pin.y / 500) * 100;
          return (
            <motion.div
              key={pin.slug}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.15 }}
              className="absolute pointer-events-none z-10"
              style={{ left: `${leftPct}%`, top: `${topPct - 8}%`, transform: "translate(-50%, -100%)" }}
            >
              <div className="bg-[#1a1a2e] border border-[var(--gold-dim)] rounded-lg px-3 py-2 text-center shadow-xl whitespace-nowrap">
                <p className="text-xs text-[var(--gold)]">{pin.emoji} {pin.label}</p>
                <p className="text-[9px] text-[var(--text-muted)]">{pin.city}</p>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* ピンの下にクリック可能なリンク一覧（モバイル対応） */}
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
            <span>{pin.city}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
