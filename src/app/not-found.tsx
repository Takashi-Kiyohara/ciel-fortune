import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--bg-deep)] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-4xl mb-6">🌙</p>
        <h1 className="text-xl text-[var(--text-light)] mb-3">
          この道の先は、まだ見えないようです
        </h1>
        <p className="text-sm text-[var(--text-muted)] mb-8 leading-relaxed">
          お探しのページが見つかりませんでした。
          <br />
          Misaが占いの世界でお待ちしていますね。
        </p>
        <Link
          href="/"
          className="inline-block border border-[var(--gold)] text-[var(--gold)] px-8 py-3 rounded text-sm tracking-widest hover:bg-[var(--gold)] hover:text-[var(--bg-deep)] transition-all duration-300"
        >
          占いの入り口へ戻る
        </Link>
      </div>
    </main>
  );
}
