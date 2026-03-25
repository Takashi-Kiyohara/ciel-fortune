"use client";

import FadeInSection from "./FadeInSection";

function MisaSilhouette() {
  return (
    <svg
      viewBox="0 0 200 280"
      className="w-40 h-56 sm:w-48 sm:h-64 mx-auto sm:mx-0"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hat */}
      <ellipse cx="100" cy="52" rx="42" ry="8" fill="#1a1a2e" />
      <path
        d="M65 52 C65 30, 135 30, 135 52"
        fill="#1a1a2e"
        stroke="#d4a574"
        strokeWidth="1"
      />
      <rect x="60" y="48" width="80" height="8" rx="2" fill="#1a1a2e" stroke="#d4a574" strokeWidth="0.5" />

      {/* Head */}
      <circle cx="100" cy="85" r="28" fill="#1a1a2e" stroke="#d4a574" strokeWidth="1.5" />

      {/* Neck */}
      <rect x="92" y="113" width="16" height="12" fill="#1a1a2e" />

      {/* Scarf / neckerchief */}
      <path
        d="M80 125 L100 145 L120 125 Z"
        fill="#d4a574"
        opacity="0.8"
      />

      {/* Jacket body */}
      <path
        d="M60 125 C60 125, 80 120, 100 125 C120 120, 140 125, 140 125 L145 210 L55 210 Z"
        fill="#1a1a2e"
        stroke="#d4a574"
        strokeWidth="1.5"
      />

      {/* Jacket buttons */}
      <circle cx="100" cy="155" r="2.5" fill="#d4a574" />
      <circle cx="100" cy="175" r="2.5" fill="#d4a574" />
      <circle cx="100" cy="195" r="2.5" fill="#d4a574" />

      {/* Wings pin */}
      <path
        d="M82 140 L90 136 L98 140 L90 138 Z"
        fill="#d4a574"
        opacity="0.9"
      />

      {/* Skirt */}
      <path
        d="M55 210 L45 270 L155 270 L145 210 Z"
        fill="#1a1a2e"
        stroke="#d4a574"
        strokeWidth="1.5"
      />

      {/* Hair flowing */}
      <path
        d="M72 70 C60 80, 58 110, 62 125"
        stroke="#d4a574"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M128 70 C140 80, 142 110, 138 125"
        stroke="#d4a574"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}

export default function MisaSection() {
  return (
    <section className="py-20 bg-[#f5f0e8]">
      <div className="max-w-4xl mx-auto px-6">
        <FadeInSection>
          <div className="flex flex-col sm:flex-row items-center gap-10">
            <div className="flex-shrink-0">
              <MisaSilhouette />
            </div>

            <div className="text-center sm:text-left">
              <p className="text-[#d4a574] text-sm tracking-[0.2em] mb-3">
                YOUR CABIN ATTENDANT
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a2e] mb-6">
                はじめまして、Misaです
              </h2>
              <p className="text-base leading-loose text-[#1a1a2e]/70 mb-6">
                こんにちは、Misaです。
                <br />
                国際線CA歴8年、世界50カ国以上を旅してきました。
                <br />
                各地で出会った占い師やヒーラーから学んだ占いを、
                <br />
                あなたにお届けします。✈️
              </p>
              <p
                className="text-2xl text-[#d4a574] italic"
                style={{ fontFamily: "cursive, serif" }}
              >
                Misa
              </p>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
