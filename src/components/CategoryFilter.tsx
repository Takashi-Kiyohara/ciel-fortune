"use client";

import { categories, Category } from "@/data/fortunes";

export default function CategoryFilter({
  active,
  onChange,
}: {
  active: Category;
  onChange: (cat: Category) => void;
}) {
  return (
    <div
      className="hide-scrollbar"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 12,
        maxWidth: 1000,
        margin: "0 auto",
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .cat-filter-wrap { flex-wrap: nowrap !important; justify-content: flex-start !important; overflow-x: auto; }
        }
      `}</style>
      <div
        className="cat-filter-wrap hide-scrollbar"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 12,
          width: "100%",
        }}
      >
        {categories.map((cat) => {
          const selected = active === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              style={{
                fontFamily: "'Noto Sans JP', sans-serif",
                fontSize: 15,
                fontWeight: selected ? 400 : 300,
                color: selected ? "var(--bg-deep)" : "var(--text-muted)",
                background: selected ? "var(--gold)" : "transparent",
                border: `1px solid ${selected ? "var(--gold)" : "var(--border-thin)"}`,
                padding: "12px 28px",
                borderRadius: 4,
                cursor: "pointer",
                transition: "all 0.3s",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                if (!selected) {
                  (e.target as HTMLElement).style.borderColor = "var(--border-mid)";
                  (e.target as HTMLElement).style.color = "var(--text-light)";
                }
              }}
              onMouseLeave={(e) => {
                if (!selected) {
                  (e.target as HTMLElement).style.borderColor = "var(--border-thin)";
                  (e.target as HTMLElement).style.color = "var(--text-muted)";
                }
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
