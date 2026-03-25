"use client";

import FadeInSection from "./FadeInSection";

function MisaAvatar() {
  return (
    <div className="w-[200px] h-[200px] rounded-full border border-[#c4a265]/20 flex items-center justify-center mx-auto sm:mx-0">
      <span className="font-serif-en text-[#c4a265]/40 text-6xl italic select-none">
        M
      </span>
    </div>
  );
}

export default function MisaSection() {
  return (
    <section className="py-[120px] sm:py-[160px] bg-[#f8f5f0]">
      <div className="max-w-3xl mx-auto px-6 sm:px-12">
        <FadeInSection>
          <div className="flex flex-col sm:flex-row items-center gap-12 sm:gap-16">
            <div className="flex-shrink-0">
              <MisaAvatar />
            </div>

            <div className="text-center sm:text-left">
              <p className="font-serif-en text-[#c4a265] text-xs tracking-[0.3em] mb-4 uppercase">
                Your Cabin Attendant
              </p>
              <h2 className="text-xl sm:text-2xl text-[#3d3630] tracking-wide mb-8">
                はじめまして、Misaです
              </h2>
              <p className="text-sm leading-[2.2] text-[#3d3630]/55 mb-10">
                国際線CA歴8年、世界50カ国以上を旅してきました。
                <br />
                各地で出会った占い師やヒーラーから学んだ占いを、
                <br />
                あなたにお届けします。
              </p>
              <p className="font-serif-en text-4xl sm:text-5xl text-[#c4a265]/60 italic">
                Misa
              </p>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
