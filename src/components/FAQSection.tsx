"use client";

import { useState } from "react";

const faqs = [
  {
    q: "本当にCAが占ってくれるの？",
    a: "Misaが世界各地で学んだ占術をベースに、あなたのための鑑定を行います。一つひとつの占いに、旅先での学びと想いが込められています。",
  },
  {
    q: "いつでも解約できる？",
    a: "はい、いつでもワンクリックで解約可能です。解約後も、その月の残りの期間はすべての機能をご利用いただけます。",
  },
  {
    q: "どんな占いがある？",
    a: "タロット、星座占い、相性診断、手相、オーラ診断など、世界各地の占いを揃えています。新しい占いも旅のたびに追加していきます。",
  },
  {
    q: "鑑定パスポートって何？",
    a: "あなたの占い履歴がパスポートのスタンプのように記録されていく機能です。どの国の占いを体験したか、一目でわかるようになっています。",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: "1px solid var(--border-thin)",
        padding: "24px 0",
        cursor: "pointer",
      }}
      onClick={() => setOpen(!open)}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <span style={{ fontSize: 17, color: "var(--text-light)" }}>{q}</span>
        <span style={{ fontSize: 20, color: "var(--gold-dim)", flexShrink: 0, transition: "transform 0.3s", transform: open ? "rotate(45deg)" : "none" }}>+</span>
      </div>
      {open && (
        <div style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 2.0, paddingTop: 16 }}>
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
  return (
    <section style={{ background: "var(--bg-deep)", padding: "160px 24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <p className="font-en" style={{ fontSize: 12, letterSpacing: "0.3em", color: "var(--gold)", textTransform: "uppercase" }}>
            FAQ
          </p>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)", color: "var(--text-light)", letterSpacing: "0.05em", marginTop: 16 }}>
            よくある質問
          </h2>
          <div style={{ width: 40, height: 1, background: "var(--gold-dim)", margin: "24px auto 0" }} />
        </div>

        <div style={{ borderTop: "1px solid var(--border-thin)" }}>
          {faqs.map((faq) => (
            <FAQItem key={faq.q} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
