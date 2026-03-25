"use client";

import { categories, Category } from "@/data/fortunes";
import { CategoryIcon } from "./CategoryIcons";

export default function CategoryFilter({
  active,
  onChange,
}: {
  active: Category;
  onChange: (cat: Category) => void;
}) {
  return (
    <div className="flex gap-3.5 overflow-x-auto pb-3 hide-scrollbar sm:flex-wrap sm:justify-center">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded text-xs tracking-wide whitespace-nowrap border transition-all duration-300 flex-shrink-0 ${
            active === cat.id
              ? "bg-[#c4a265] text-[#0d0d1a] border-[#c4a265]"
              : "bg-transparent text-[#c4a265]/60 border-[#c4a265]/12 hover:border-[#c4a265]/25"
          }`}
        >
          {cat.id !== "all" && (
            <span
              className={
                active === cat.id ? "[&_svg]:stroke-[#0d0d1a]" : ""
              }
            >
              <CategoryIcon id={cat.id} size={13} />
            </span>
          )}
          {cat.label}
          {active === cat.id && (
            <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 text-[#c4a265] text-[6px] leading-none">
              ▼
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
