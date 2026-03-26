"use client";

import { motion } from "framer-motion";

const stars = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  top: `${Math.floor(Math.random() * 100)}%`,
  left: `${Math.floor(Math.random() * 100)}%`,
  size: Math.random() * 1.5 + 0.5,
  delay: Math.random() * 6,
  dur: Math.random() * 4 + 6,
}));

export default function HeroSection() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 24px",
        position: "relative",
        overflow: "hidden",
        background: "var(--bg-deep)",
      }}
    >
      {/* Stars */}
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: "var(--gold)",
            animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite alternate`,
            pointerEvents: "none",
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{ position: "relative", zIndex: 1, maxWidth: 600 }}
      >
        <p
          className="font-en"
          style={{
            fontSize: 13,
            letterSpacing: "0.35em",
            color: "var(--gold)",
            marginBottom: 28,
            textTransform: "uppercase",
          }}
        >
          Ciel Fortune
        </p>

        <h1
          style={{
            fontSize: "clamp(36px, 6vw, 60px)",
            lineHeight: 1.6,
            color: "var(--text-light)",
          }}
        >
          世界を旅するCAが集めた、
          <br />
          あなただけの占い
        </h1>

        <p
          style={{
            fontSize: 16,
            color: "var(--text-muted)",
            lineHeight: 2.2,
            letterSpacing: "0.05em",
            marginTop: 40,
          }}
        >
          パリのタロット、京都の手相、バリのオーラ診断 ——
          <br />
          50カ国を巡ったCAが出会った占いを、
          <br />
          あなたのもとに届けます
        </p>

        <motion.a
          href="#plans"
          whileHover={{ backgroundColor: "var(--gold)", color: "var(--bg-deep)" }}
          style={{
            display: "inline-block",
            marginTop: 56,
            background: "transparent",
            border: "1px solid var(--gold)",
            color: "var(--gold)",
            fontFamily: "'Noto Sans JP', sans-serif",
            fontWeight: 400,
            fontSize: 15,
            letterSpacing: "0.12em",
            padding: "16px 64px",
            borderRadius: 2,
            cursor: "pointer",
            transition: "all 0.4s ease",
            textDecoration: "none",
          }}
        >
          無料で占ってみる
        </motion.a>
      </motion.div>
    </section>
  );
}
