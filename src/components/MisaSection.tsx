"use client";

export default function MisaSection() {
  return (
    <section style={{ background: "var(--bg-warm)", padding: "160px 24px" }}>
      <style>{`
        @media (max-width: 768px) {
          .misa-flex { flex-direction: column !important; text-align: center !important; }
        }
      `}</style>
      <div
        className="misa-flex"
        style={{
          maxWidth: 800,
          margin: "0 auto",
          display: "flex",
          gap: 60,
          alignItems: "center",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 180,
            height: 180,
            borderRadius: "50%",
            border: "1px solid var(--gold-dim)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span
            className="font-en"
            style={{ fontSize: 56, color: "var(--gold)", fontWeight: 300 }}
          >
            M
          </span>
        </div>

        {/* Text */}
        <div>
          <p
            className="font-en"
            style={{
              fontSize: 12,
              letterSpacing: "0.25em",
              color: "var(--text-dark-sub)",
              textTransform: "uppercase",
            }}
          >
            Your Cabin Attendant
          </p>

          <h2
            style={{
              fontSize: "clamp(26px, 4vw, 36px)",
              color: "var(--text-dark)",
              marginTop: 16,
            }}
          >
            はじめまして、Misaです
          </h2>

          <p
            style={{
              fontSize: 16,
              color: "var(--text-dark-sub)",
              lineHeight: 2.2,
              marginTop: 28,
            }}
          >
            国際線CA歴8年、世界50カ国以上を旅してきました。
            <br />
            各地で出会った占い師やヒーラーから学んだ占いを、
            <br />
            あなたにお届けします。
          </p>

          <p
            className="font-en"
            style={{
              fontSize: 32,
              color: "var(--gold)",
              fontStyle: "italic",
              marginTop: 28,
            }}
          >
            Misa
          </p>
        </div>
      </div>
    </section>
  );
}
