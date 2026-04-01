export default function ChatLoading() {
  return (
    <main className="h-screen flex flex-col bg-[var(--bg-deep)]">
      {/* Header skeleton */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[var(--border-thin)]">
        <div className="w-8 h-3 bg-[rgba(255,255,255,0.05)] rounded animate-pulse" />
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[rgba(184,150,62,0.15)] animate-pulse" />
          <div>
            <div className="w-12 h-2 bg-[rgba(184,150,62,0.15)] rounded animate-pulse mb-1" />
            <div className="w-20 h-2 bg-[rgba(255,255,255,0.05)] rounded animate-pulse" />
          </div>
        </div>
        <div className="w-10" />
      </div>

      {/* Messages area */}
      <div className="flex-1 px-4 py-6">
        <div className="flex justify-start">
          <div className="w-8 h-8 rounded-full bg-[rgba(184,150,62,0.15)] animate-pulse mr-2 mt-1" />
          <div className="bg-[rgba(255,255,255,0.05)] border border-[var(--border-thin)] rounded-lg px-4 py-3 max-w-[70%]">
            <div className="w-48 h-3 bg-[rgba(255,255,255,0.05)] rounded animate-pulse mb-2" />
            <div className="w-36 h-3 bg-[rgba(255,255,255,0.05)] rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Input skeleton */}
      <div className="border-t border-[var(--border-thin)] px-4 py-3">
        <div className="max-w-2xl mx-auto flex gap-2">
          <div className="flex-1 h-10 bg-[rgba(255,255,255,0.05)] border border-[var(--border-mid)] rounded-lg animate-pulse" />
          <div className="w-14 h-10 bg-[rgba(184,150,62,0.15)] rounded-lg animate-pulse" />
        </div>
      </div>
    </main>
  );
}
