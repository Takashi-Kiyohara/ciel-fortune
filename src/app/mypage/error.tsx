"use client";

import Link from "next/link";

export default function MyPageError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-[var(--bg-deep)] flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <p className="text-3xl mb-4">🌙</p>
        <h1 className="text-lg text-[var(--text-light)] mb-2">
          ページの読み込みに失敗しました
        </h1>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-6">
          一時的な問題かもしれません。
          <br />
          もう一度お試しいただくか、トップページからやり直してください。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-block border border-[var(--gold)] text-[var(--gold)] px-6 py-2.5 rounded text-sm tracking-widest hover:bg-[var(--gold)] hover:text-[var(--bg-deep)] transition-all duration-300"
          >
            再読み込み
          </button>
          <Link
            href="/"
            className="inline-block border border-[var(--border-mid)] text-[var(--text-muted)] px-6 py-2.5 rounded text-sm tracking-widest hover:border-[var(--gold-dim)] hover:text-[var(--gold)] transition-all duration-300"
          >
            トップページへ
          </Link>
        </div>
      </div>
    </main>
  );
}
