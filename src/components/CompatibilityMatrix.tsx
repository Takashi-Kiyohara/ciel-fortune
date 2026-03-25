"use client";

import { matrixPurposes, matrixCategories, matrixData } from "@/data/fortunes";
import FadeInSection from "./FadeInSection";

// Column color groups
const colColors: string[] = [
  "#9e7b9e", // 恋愛 — lavender
  "#c4a265", // 仕事 — gold
  "#9e7b9e", // 人間関係 — lavender
  "#c4a265", // 金運 — gold
  "#7d9a7e", // 健康 — sage
  "#d4b87a", // 転機 — light gold
  "#c4a265", // 命名 — gold
  "#d4b87a", // 引越し — light gold
  "#7d9a7e", // 自己理解 — sage
];

function Cell({ value, colIdx }: { value: number; colIdx: number }) {
  const color = colColors[colIdx];
  if (value === 2)
    return (
      <span className="text-lg font-medium" style={{ color }}>
        &#9678;
      </span>
    );
  if (value === 1)
    return (
      <span className="text-base" style={{ color, opacity: 0.5 }}>
        &#9675;
      </span>
    );
  if (value === 0.5)
    return (
      <span className="text-sm" style={{ color, opacity: 0.3 }}>
        &#9651;
      </span>
    );
  return <span />;
}

export default function CompatibilityMatrix() {
  return (
    <div className="mt-[120px] sm:mt-[160px]">
      <FadeInSection className="text-center mb-12">
        <p className="font-serif-en text-[#c4a265] text-xs tracking-[0.3em] mb-4 uppercase">
          Compatibility
        </p>
        <h3 className="text-xl sm:text-2xl text-[#e8e4df] tracking-wide">
          どの占いがあなたに合う？
        </h3>
        <div className="w-10 h-px bg-[#c4a265]/20 mx-auto mt-6" />
      </FadeInSection>

      <FadeInSection>
        <div className="max-w-[1000px] mx-auto overflow-x-auto hide-scrollbar">
          <table className="w-full min-w-[700px] border-collapse text-xs">
            <thead>
              <tr>
                <th
                  className="sticky left-0 z-10 p-3 text-left text-[#c4a265]/40 font-normal border-b border-[#c4a265]/10"
                  style={{ background: "rgba(184,150,62,0.03)" }}
                />
                {matrixPurposes.map((p) => (
                  <th
                    key={p}
                    className="p-3 text-center text-[#c4a265] font-normal tracking-wide border-b border-[#c4a265]/10"
                    style={{ background: "rgba(184,150,62,0.03)" }}
                  >
                    {p}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrixCategories.map((cat, rowIdx) => (
                <tr key={cat}>
                  <td
                    className="sticky left-0 z-10 p-3 text-[#c4a265]/60 whitespace-nowrap border-b border-[#c4a265]/5"
                    style={{ background: "#0d0d1a" }}
                  >
                    {cat}
                  </td>
                  {matrixData[rowIdx].map((val, colIdx) => (
                    <td
                      key={colIdx}
                      className="p-3 text-center border-b border-[#c4a265]/5"
                    >
                      <Cell value={val} colIdx={colIdx} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center text-[10px] text-[#e8e4df]/18 mt-6 tracking-wide">
          気になる目的をタップすると、おすすめの占いが見つかります
        </p>
      </FadeInSection>
    </div>
  );
}
