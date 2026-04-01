// Simple in-memory rate limiter
// 本番環境ではRedis/Upstashに置き換え推奨

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const store = new Map<string, RateLimitEntry>();

// 定期的にexpiredエントリをクリーンアップ
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (entry.resetAt < now) store.delete(key);
  }
}, 60_000);

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { success: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt < now) {
    // 新しいウィンドウ開始
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    return { success: true, remaining: limit - 1, resetAt };
  }

  if (entry.count >= limit) {
    return { success: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count++;
  return { success: true, remaining: limit - entry.count, resetAt: entry.resetAt };
}

// プリセット
export const RATE_LIMITS = {
  // 占い鑑定: 1IPあたり10回/時間
  fortune: { limit: 10, windowMs: 60 * 60 * 1000 },
  // チャット: 1IPあたり20回/時間
  chat: { limit: 20, windowMs: 60 * 60 * 1000 },
  // Checkout: 1IPあたり5回/時間
  checkout: { limit: 5, windowMs: 60 * 60 * 1000 },
} as const;
