export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg-deep)",
        borderTop: "1px solid var(--border-thin)",
        padding: "60px 24px",
        textAlign: "center",
      }}
    >
      <p
        className="font-en"
        style={{
          fontSize: 15,
          letterSpacing: "0.25em",
          color: "var(--gold-dim)",
          textTransform: "uppercase",
        }}
      >
        Ciel Fortune
      </p>

      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 32,
          marginTop: 20,
        }}
      >
        {["利用規約", "プライバシーポリシー", "特定商取引法に基づく表記", "お問い合わせ"].map(
          (label) => (
            <a
              key={label}
              href="#"
              style={{
                fontSize: 13,
                color: "var(--text-muted)",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
            >
              {label}
            </a>
          )
        )}
      </nav>

      <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 16 }}>
        &copy; 2026 Ciel Fortune. All rights reserved.
      </p>
    </footer>
  );
}
