export default function FortuneLoading() {
  return (
    <main className="min-h-screen bg-[var(--bg-deep)]">
      {/* Header skeleton */}
      <div className="px-6 py-4 border-b border-[var(--border-thin)]">
        <div className="w-24 h-4 bg-[rgba(255,255,255,0.05)] rounded animate-pulse" />
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Fortune header skeleton */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-[rgba(255,255,255,0.05)] rounded-full mx-auto mb-4 animate-pulse" />
          <div className="w-20 h-3 bg-[rgba(255,255,255,0.05)] rounded mx-auto mb-3 animate-pulse" />
          <div className="w-48 h-7 bg-[rgba(255,255,255,0.05)] rounded mx-auto mb-3 animate-pulse" />
          <div className="w-32 h-4 bg-[rgba(255,255,255,0.05)] rounded mx-auto mb-4 animate-pulse" />
          <div className="w-64 h-4 bg-[rgba(255,255,255,0.05)] rounded mx-auto animate-pulse" />
        </div>

        {/* Misa story skeleton */}
        <div className="border border-[var(--border-thin)] rounded-lg p-6 mb-10">
          <div className="w-20 h-3 bg-[rgba(255,255,255,0.05)] rounded mb-3 animate-pulse" />
          <div className="space-y-2">
            <div className="w-full h-4 bg-[rgba(255,255,255,0.05)] rounded animate-pulse" />
            <div className="w-3/4 h-4 bg-[rgba(255,255,255,0.05)] rounded animate-pulse" />
          </div>
        </div>

        {/* Input area skeleton */}
        <div className="text-center">
          <div className="w-48 h-5 bg-[rgba(255,255,255,0.05)] rounded mx-auto mb-6 animate-pulse" />
          <div className="w-32 h-10 bg-[rgba(255,255,255,0.05)] rounded mx-auto animate-pulse" />
        </div>
      </div>
    </main>
  );
}
