"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6 sm:px-12"
          style={{
            background: "rgba(8, 8, 17, 0.8)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <a
            href="#"
            className="font-serif-en text-[#c4a265]/70 text-[13px] tracking-[0.2em] uppercase hover:text-[#c4a265] transition-colors duration-300"
          >
            Ciel Fortune
          </a>

          <a
            href="#plans"
            className="border border-[#c4a265]/30 text-[#c4a265]/70 text-[11px] tracking-[0.12em] px-5 py-2 rounded hover:bg-[#c4a265] hover:text-[#0d0d1a] transition-all duration-400"
          >
            無料で占ってみる
          </a>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
