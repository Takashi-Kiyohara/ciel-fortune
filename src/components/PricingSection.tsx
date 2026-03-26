"use client";

const plans = [
  {
    label: "エコノミー",
    code: "ECONOMY CLASS",
    sub: "YOUR DAILY JOURNEY",
    price: "無料",
    priceNote: "",
    features: ["デイリー占い 1回/日", "タロット1枚引き 1回/日"],
    recommended: false,
  },
  {
    label: "ビジネスクラス",
    code: "BUSINESS CLASS",
    sub: "UNLIMITED JOURNEY",
    price: "¥980",
    priceNote: "/月",
    features: ["全占いメニュー無制限", "Misaのチャット相談", "鑑定パスポート"],
    recommended: true,
  },
  {
    label: "ファーストクラス",
    code: "FIRST CLASS",
    sub: "PREMIUM JOURNEY",
    price: "¥1,980",
    priceNote: "/月",
    features: ["ビジネスの全機能", "月1回スペシャル鑑定", "限定コンテンツ"],
    recommended: false,
  },
];

export default function PricingSection() {
  return (
    <section
      id="plans"
      style={{ background: "var(--bg-dark)", padding: "160px 24px" }}
    >
      <style>{`
        @media (max-width: 768px) {
          .price-grid { grid-template-columns: 1fr !important; }
        }
        .price-btn:hover { opacity: 0.85; }
      `}</style>

      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <p
          className="font-en"
          style={{ fontSize: 12, letterSpacing: "0.3em", color: "var(--gold)", textTransform: "uppercase" }}
        >
          Boarding Pass
        </p>
        <h2
          style={{
            fontSize: "clamp(24px, 4vw, 32px)",
            color: "var(--text-light)",
            letterSpacing: "0.05em",
            marginTop: 16,
          }}
        >
          あなたの旅を選ぶ
        </h2>
        <div style={{ width: 40, height: 1, background: "var(--gold-dim)", margin: "24px auto 0" }} />
      </div>

      {/* Cards */}
      <div
        className="price-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 20,
          maxWidth: 960,
          margin: "0 auto",
        }}
      >
        {plans.map((plan) => (
          <div
            key={plan.code}
            style={{
              background: "var(--bg-card)",
              border: plan.recommended
                ? "1px solid var(--gold)"
                : "1px solid var(--border-thin)",
              borderRadius: 6,
              padding: plan.recommended ? "44px 28px" : "36px 28px",
              textAlign: "center",
            }}
          >
            {plan.recommended && (
              <p
                className="font-en"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  color: "var(--gold)",
                  marginBottom: 16,
                  textTransform: "uppercase",
                }}
              >
                Recommended
              </p>
            )}

            <p
              className="font-en"
              style={{
                fontSize: 11,
                color: "var(--text-muted)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              {plan.code}
            </p>

            <h3
              style={{
                fontSize: 26,
                color: "var(--text-light)",
                marginTop: 8,
              }}
            >
              {plan.label}
            </h3>

            <p
              className="font-en"
              style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}
            >
              {plan.sub}
            </p>

            <div style={{ marginTop: 24 }}>
              <span style={{ fontSize: 44, color: "var(--text-light)", fontWeight: 400 }}>
                {plan.price}
              </span>
              {plan.priceNote && (
                <span style={{ fontSize: 15, color: "var(--text-muted)", marginLeft: 4 }}>
                  {plan.priceNote}
                </span>
              )}
            </div>

            <div style={{ marginTop: 28, fontSize: 15, color: "var(--text-muted)", lineHeight: 2.2 }}>
              {plan.features.map((f) => (
                <div key={f}>— {f}</div>
              ))}
            </div>

            <button
              className="price-btn"
              style={{
                marginTop: 32,
                width: "100%",
                padding: 14,
                fontSize: 15,
                fontFamily: "'Noto Sans JP', sans-serif",
                fontWeight: 400,
                borderRadius: 2,
                cursor: "pointer",
                transition: "opacity 0.3s",
                ...(plan.recommended
                  ? {
                      background: "var(--gold)",
                      border: "none",
                      color: "var(--bg-deep)",
                    }
                  : {
                      background: "transparent",
                      border: "1px solid var(--border-mid)",
                      color: "var(--text-muted)",
                    }),
              }}
            >
              搭乗する
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
