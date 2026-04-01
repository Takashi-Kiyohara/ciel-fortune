"use client";
import { motion } from "framer-motion";

type AuthModalProps = {
  onSignIn: () => void;
  onClose: () => void;
};

export default function AuthModal({ onSignIn, onClose }: AuthModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#1a1a2e] border border-[var(--border-mid)] rounded-lg p-8 max-w-sm w-full text-center"
      >
        <p className="font-en text-xs tracking-[0.15em] text-[var(--gold)] uppercase mb-2">
          Sign In
        </p>
        <h3 className="text-lg text-[var(--text-light)] mb-2">
          あなたの鑑定結果を大切に保管するために
        </h3>
        <p className="text-xs text-[var(--text-muted)] mb-6">
          ログインすると、鑑定結果をいつでも振り返ったり
          <br />
          Misaとの相談をより深くお楽しみいただけます
        </p>
        <button
          onClick={onSignIn}
          className="w-full bg-white text-gray-800 px-6 py-2.5 rounded text-sm font-medium hover:bg-gray-100 transition-colors mb-3"
        >
          Googleでログイン
        </button>
        <button
          onClick={onClose}
          className="text-xs text-[var(--text-muted)] hover:text-[var(--text-light)] transition-colors"
        >
          あとで
        </button>
      </motion.div>
    </div>
  );
}
