"use client";

import { matrixPurposes, matrixCategories, matrixData } from "@/data/fortunes";
import FadeInSection from "./FadeInSection";

function Cell({ value }: { value: number }) {
  if (value === 2)
    return <span className="text-[#c4a265] text-sm font-medium">&#9678;</span>;
  if (value === 1)
    return <span className="text-[#c4a265]/50 text-sm">&#9675;</span>;
  if (value === 0.5)
    return <span className="text-[#c4a265]/25 text-xs">&#9651;</span>;
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
      </FadeInSection>

      <FadeInSection>
        <div className="max-w-[1000px] mx-auto overflow-x-auto hide-scrollbar">
          <table className="w-full min-w-[700px] border-collapse text-xs">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-[#0d0d1a] p-3 text-left text-[#c4a265]/50 font-normal border-b border-[#c4a265]/10" />
                {matrixPurposes.map((p) => (
                  <th
                    key={p}
                    className="p-3 text-center text-[#c4a265] font-normal tracking-wide border-b border-[#c4a265]/10"
                  >
                    {p}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrixCategories.map((cat, rowIdx) => (
                <tr key={cat}>
                  <td className="sticky left-0 z-10 bg-[#0d0d1a] p-3 text-[#c4a265]/70 whitespace-nowrap border-b border-[#c4a265]/5">
                    {cat}
                  </td>
                  {matrixData[rowIdx].map((val, colIdx) => (
                    <td
                      key={colIdx}
                      className="p-3 text-center border-b border-[#c4a265]/5"
                    >
                      <Cell value={val} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center text-[10px] text-[#e8e4df]/20 mt-6 tracking-wide">
          気になる目的をタップすると、おすすめの占いが見つかります
        </p>
      </FadeInSection>
    </div>
  );
}
