export default function Loading() {
  return (
    <main className="min-h-screen bg-[var(--bg-deep)] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-6 h-6 border-2 border-[var(--gold)] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm text-[var(--text-muted)]">
          星を読み解いています...
        </p>
      </div>
    </main>
  );
}
