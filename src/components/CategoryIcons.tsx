import { Category } from "@/data/fortunes";

const s = { stroke: "#c4a265", strokeWidth: 1.5, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function CategoryIcon({ id, size = 16 }: { id: Category; size?: number }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" };
  switch (id) {
    case "tarot-card":
      return <svg {...p}><rect x="5" y="2" width="14" height="20" rx="2" {...s} /><line x1="9" y1="7" x2="15" y2="7" {...s} /><line x1="12" y1="12" x2="12" y2="17" {...s} /></svg>;
    case "astrology":
      return <svg {...p}><circle cx="12" cy="12" r="3" {...s} /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" {...s} /></svg>;
    case "numerology":
      return <svg {...p}><path d="M8 4h2v16M14 4c2.5 0 4 1.5 4 4s-1.5 4-4 4 4 1.5 4 4-1.5 4-4 4" {...s} /></svg>;
    case "palmistry":
      return <svg {...p}><path d="M6 12V8a2 2 0 0 1 4 0v4M10 8V5a2 2 0 0 1 4 0v7M14 6.5a2 2 0 0 1 4 0V14a6 6 0 0 1-12 4V12" {...s} /></svg>;
    case "tasseography":
      return <svg {...p}><path d="M5 12h14M5 12a2 2 0 0 0 2 6h10a2 2 0 0 0 2-6M7 8c0-2 1-4 5-4s5 2 5 4" {...s} /></svg>;
    case "crystal":
      return <svg {...p}><path d="M6 3h12l-3 18H9L6 3zM6 3l6 8 6-8" {...s} /></svg>;
    case "nature":
      return <svg {...p}><path d="M12 22V10M12 10C12 6 8 2 4 2c0 4 2 8 8 8zM12 14c0-4 4-8 8-8-4 0-8 4-8 8z" {...s} /></svg>;
    case "rune":
      return <svg {...p}><path d="M8 3v18M8 12l8-9M8 12l8 9" {...s} /></svg>;
    case "dream":
      return <svg {...p}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" {...s} /></svg>;
    case "fengshui":
      return <svg {...p}><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" {...s} /></svg>;
    case "oracle":
      return <svg {...p}><path d="M6 3h12a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM7 7v14M12 7v14M17 7v14" {...s} /></svg>;
    case "ritual":
      return <svg {...p}><path d="M12 22c-2 0-4-3-4-8s2-8 4-8 4 3 4 8-2 8-4 8zM8 6c-1.5.5-3 1-3 3s2 4 3 5M16 6c1.5.5 3 1 3 3s-2 4-3 5" {...s} /></svg>;
    default:
      return <svg {...p}><circle cx="12" cy="12" r="8" {...s} /></svg>;
  }
}
