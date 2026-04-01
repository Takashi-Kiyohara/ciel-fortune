"use client";

export default function ChatError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="h-screen flex flex-col bg-[var(--bg-deep)]">
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <p className="text-3xl mb-4">🌙</p>
          <h1 className="text-lg text-[var(--text-light)] mb-2">
            通信が途切れてしまったようです
          </h1>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-6">
            Misaとの接続が一時的に不安定になっています。
            <br />
            少しだけお待ちいただいてから、もう一度お試しください。
          </p>
          <button
            onClick={reset}
            className="inline-block border border-[var(--gold)] text-[var(--gold)] px-6 py-2.5 rounded text-sm tracking-widest hover:bg-[var(--gold)] hover:text-[var(--bg-deep)] transition-all duration-300"
          >
            もう一度つなげる
          </button>
        </div>
      </div>
    </main>
  );
}
