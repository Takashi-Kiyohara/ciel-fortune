"use client";

import FadeInSection from "./FadeInSection";

function MisaPortrait() {
  return (
    <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full border border-[#c4a265]/20 flex items-center justify-center mx-auto sm:mx-0 relative overflow-hidden">
      <svg
        viewBox="0 0 200 200"
        className="w-28 h-28 sm:w-32 sm:h-32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hair */}
        <path
          d="M62 85 C62 55, 138 55, 138 85 L140 120 C140 120, 135 100, 100 100 C65 100, 60 120, 60 120 Z"
          fill="none"
          stroke="#c4a265"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <path
          d="M60 110 C55 130, 52 155, 58 170"
          stroke="#c4a265"
          strokeWidth="0.6"
          fill="none"
          opacity="0.35"
        />
        <path
          d="M140 110 C145 130, 148 155, 142 170"
          stroke="#c4a265"
          strokeWidth="0.6"
          fill="none"
          opacity="0.35"
        />

        {/* Face outline */}
        <ellipse
          cx="100"
          cy="88"
          rx="26"
          ry="30"
          fill="none"
          stroke="#c4a265"
          strokeWidth="0.8"
          opacity="0.6"
        />

        {/* Neck */}
        <line x1="93" y1="118" x2="91" y2="132" stroke="#c4a265" strokeWidth="0.6" opacity="0.4" />
        <line x1="107" y1="118" x2="109" y2="132" stroke="#c4a265" strokeWidth="0.6" opacity="0.4" />

        {/* Collar */}
        <path
          d="M78 138 L100 155 L122 138"
          fill="none"
          stroke="#c4a265"
          strokeWidth="0.8"
          opacity="0.5"
        />

        {/* Jacket lapels */}
        <path
          d="M78 138 L72 175 L100 165 L128 175 L122 138"
          fill="none"
          stroke="#c4a265"
          strokeWidth="0.7"
          opacity="0.4"
        />

        {/* Wings pin — tiny detail */}
        <path
          d="M92 148 L100 145 L108 148"
          fill="none"
          stroke="#c4a265"
          strokeWidth="0.6"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}

export default function MisaSection() {
  return (
    <section className="py-[120px] sm:py-[160px] bg-[#f8f5f0]">
      <div className="max-w-3xl mx-auto px-6">
        <FadeInSection>
          <div className="flex flex-col sm:flex-row items-center gap-12 sm:gap-16">
            <div className="flex-shrink-0">
              <MisaPortrait />
            </div>

            <div className="text-center sm:text-left">
              <p className="font-serif-en text-[#c4a265] text-xs tracking-[0.3em] mb-4 uppercase">
                Your Cabin Attendant
              </p>
              <h2 className="text-xl sm:text-2xl text-[#3d3630] tracking-wide mb-8">
                はじめまして、Misaです
              </h2>
              <p className="text-sm leading-[2.2] text-[#3d3630]/60 mb-10">
                国際線CA歴8年、世界50カ国以上を旅してきました。
                <br />
                各地で出会った占い師やヒーラーから学んだ占いを、
                <br />
                あなたにお届けします。
              </p>
              <p className="font-serif-en text-3xl sm:text-4xl text-[#c4a265]/70 italic">
                Misa
              </p>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
