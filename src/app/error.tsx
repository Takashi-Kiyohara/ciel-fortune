"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-[var(--bg-deep)] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-4xl mb-6">✨</p>
        <h1 className="text-xl text-[var(--text-light)] mb-3">
          星の巡りが少し乱れているようです
        </h1>
        <p className="text-sm text-[var(--text-muted)] mb-8 leading-relaxed">
          一時的なものですので、少しだけお待ちくださいね。
          <br />
          深呼吸をして、もう一度試してみてください。
        </p>
        <button
          onClick={reset}
          className="inline-block border border-[var(--gold)] text-[var(--gold)] px-8 py-3 rounded text-sm tracking-widest hover:bg-[var(--gold)] hover:text-[var(--bg-deep)] transition-all duration-300"
        >
          もう一度試す
        </button>
      </div>
    </main>
  );
}
