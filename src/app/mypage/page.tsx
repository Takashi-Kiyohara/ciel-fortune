"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/useAuth";
import { useFortuneHistory } from "@/lib/useFortuneHistory";
import { fortunes } from "@/data/fortunes";
import Header from "@/components/Header";

type UserStatus = {
  isPremium: boolean;
  subscriptionStatus: string;
  purchasedSlugs: string[];
};

export default function MyPage() {
  const { user, loading, isDemo, signInWithGoogle, signOut, authFetch } = useAuth();
  const { history } = useFortuneHistory();
  const [status, setStatus] = useState<UserStatus | null>(null);
  const searchParams = useSearchParams();
  const upgradeRef = useRef<HTMLDivElement>(null);
  const [highlightUpgrade, setHighlightUpgrade] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (user && !isDemo) {
      authFetch("/api/user/status")
        .then((r) => {
          if (!r.ok) return null;
          return r.json();
        })
        .then((data) => { if (data) setStatus(data); })
        .catch(() => {});
    }
  }, [user, isDemo, authFetch]);

  // ?plan=premium でアクセスした場合、アップグレードセクションにスクロール＆ハイライト
  useEffect(() => {
    if (searchParams.get("plan") === "premium" && upgradeRef.current) {
      setHighlightUpgrade(true);
      upgradeRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      const timer = setTimeout(() => setHighlightUpgrade(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [searchParams, loading]);

  // localStorage 履歴から鑑定済みslugを算出
  const historySlugs = [...new Set(history.map((r) => r.slug))];
  const detailedSlugs = [...new Set(history.filter((r) => r.type === "detailed").map((r) => r.slug))];

  // デモモード: localStorage履歴をベースにする
  const demoStatus: UserStatus = {
    isPremium: false,
    subscriptionStatus: "free",
    purchasedSlugs: detailedSlugs,
  };

  const currentStatus = isDemo ? demoStatus : status;

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--bg-deep)]">
        <Header />
        <div className="flex items-center justify-center pt-32">
          <div className="w-6 h-6 border-2 border-[var(--gold)] border-t-transparent rounded-full animate-spin" />
        </div>
      </main>
    );
  }

  if (!user && !isDemo) {
    return (
      <main className="min-h-screen bg-[var(--bg-deep)]">
        <Header />
        <div className="max-w-md mx-auto px-6 pt-32 text-center">
          <p className="font-en text-xs tracking-[0.2em] text-[var(--gold)] uppercase mb-4">
            My Page
          </p>
          <h1 className="text-2xl text-[var(--text-light)] mb-4">マイページ</h1>
          <p className="text-sm text-[var(--text-muted)] mb-8 leading-relaxed">
            ログインすると、鑑定履歴の確認や
            <br />
            プランの管理ができます。
          </p>
          <button
            onClick={signInWithGoogle}
            className="bg-white text-gray-800 px-8 py-2.5 rounded text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            Googleでログイン
          </button>
        </div>
      </main>
    );
  }

  const isStatusLoading = !isDemo && user && !status;

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== "退会する") return;
    setIsDeleting(true);
    try {
      const res = await authFetch("/api/user/delete", { method: "DELETE" });
      if (res.ok) {
        // ローカル履歴もクリア
        localStorage.removeItem("fortune-history");
        localStorage.removeItem("chat-sessions");
        await signOut();
        window.location.href = "/?deleted=1";
      } else {
        alert("退会処理中にエラーが発生しました。しばらくしてからお試しください。");
      }
    } catch {
      alert("退会処理中にエラーが発生しました。");
    } finally {
      setIsDeleting(false);
    }
  };

  const planLabel =
    currentStatus?.subscriptionStatus === "premium"
      ? "Premium"
      : "Free";

  return (
    <main className="min-h-screen bg-[var(--bg-deep)]">
      <Header />

      <div className="max-w-2xl mx-auto px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Profile Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-full bg-[var(--gold)] flex items-center justify-center text-[var(--bg-deep)] text-2xl font-medium mx-auto mb-4">
              {isDemo ? "D" : user?.email?.charAt(0).toUpperCase() || "U"}
            </div>
            <p className="text-[var(--text-light)] mb-1">
              {isDemo ? "デモユーザー" : user?.email}
            </p>
            {isStatusLoading ? (
              <span className="inline-block h-5 w-16 bg-[rgba(255,255,255,0.05)] rounded-full animate-pulse" />
            ) : (
              <span className="inline-block text-[10px] tracking-wider font-en text-[var(--gold)] border border-[var(--gold-dim)] rounded-full px-3 py-0.5">
                {planLabel}
              </span>
            )}
          </div>

          {/* Stats */}
          {history.length > 0 ? (
            <div className="grid grid-cols-3 gap-4 mb-10">
              <div className="border border-[var(--border-thin)] rounded-lg p-4 text-center">
                <p className="text-2xl text-[var(--gold)] mb-1">
                  {historySlugs.length}
                </p>
                <p className="text-[10px] text-[var(--text-muted)]">体験した占い</p>
              </div>
              <div className="border border-[var(--border-thin)] rounded-lg p-4 text-center">
                <p className="text-2xl text-[var(--gold)] mb-1">{history.length}</p>
                <p className="text-[10px] text-[var(--text-muted)]">総鑑定回数</p>
              </div>
              <div className="border border-[var(--border-thin)] rounded-lg p-4 text-center">
                {isStatusLoading ? (
                  <>
                    <div className="h-7 w-8 mx-auto bg-[rgba(255,255,255,0.05)] rounded animate-pulse mb-1" />
                    <div className="h-3 w-12 mx-auto bg-[rgba(255,255,255,0.03)] rounded animate-pulse" />
                  </>
                ) : (
                  <>
                    <p className="text-lg text-[var(--gold)] mb-1">
                      {currentStatus?.isPremium ? "✨" : "—"}
                    </p>
                    <p className="text-[10px] text-[var(--text-muted)]">
                      {currentStatus?.isPremium ? "Premium会員" : "Free"}
                    </p>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="border border-[var(--gold-dim)] rounded-lg p-6 text-center mb-10 bg-gradient-to-b from-[rgba(184,150,62,0.03)] to-transparent">
              <p className="text-2xl mb-3">🌙</p>
              <p className="text-sm text-[var(--text-light)] mb-2">
                まだ占いを体験していませんね
              </p>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-5">
                世界各地の占いが、あなたの恋の道しるべを待っています。
                <br />
                最初の一歩を踏み出してみませんか？
              </p>
              <Link
                href="/#fortunes"
                className="inline-block border border-[var(--gold)] text-[var(--gold)] px-6 py-2.5 rounded text-sm tracking-widest hover:bg-[var(--gold)] hover:text-[var(--bg-deep)] transition-all duration-300"
              >
                占いを選ぶ
              </Link>
            </div>
          )}

          {/* Fortune History */}
          <div className="mb-10">
            <p className="font-en text-xs tracking-[0.15em] text-[var(--gold)] uppercase mb-4">
              Your Fortunes
            </p>
            <div className="space-y-3">
              {fortunes.map((fortune) => {
                const hasDetailed = detailedSlugs.includes(fortune.slug);
                const hasFree = historySlugs.includes(fortune.slug);
                const lastRecord = history.find((r) => r.slug === fortune.slug);
                const lastDate = lastRecord
                  ? new Date(lastRecord.date).toLocaleDateString("ja-JP", { month: "short", day: "numeric" })
                  : null;
                return (
                  <Link
                    key={fortune.slug}
                    href={`/fortune/${fortune.slug}`}
                    className="flex items-center gap-4 border border-[var(--border-thin)] rounded-lg p-4 hover:border-[var(--gold-dim)] transition-all group"
                  >
                    <span className="text-2xl" aria-hidden="true">{fortune.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[var(--text-light)] group-hover:text-[var(--gold-light)] transition-colors">
                        {fortune.name}
                      </p>
                      <p className="text-[10px] text-[var(--text-muted)] font-en">
                        {fortune.regionEn}
                        {lastDate && <span className="ml-2">· {lastDate}</span>}
                      </p>
                    </div>
                    {hasDetailed ? (
                      <span className="text-[10px] text-[var(--gold)] border border-[var(--gold-dim)] rounded px-2 py-0.5 flex-shrink-0">
                        鑑定済み
                      </span>
                    ) : hasFree ? (
                      <span className="text-[10px] text-[var(--text-muted)] border border-[var(--border-thin)] rounded px-2 py-0.5 flex-shrink-0">
                        お試し済み
                      </span>
                    ) : (
                      <span className="text-[10px] text-[var(--text-muted)] flex-shrink-0">
                        未体験
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Premium Upgrade / Management */}
          {currentStatus?.isPremium ? (
            <div className="border border-[var(--gold-dim)] rounded-lg p-6 text-center bg-gradient-to-b from-[rgba(184,150,62,0.03)] to-transparent mb-10">
              <p className="font-en text-xs tracking-[0.15em] text-[var(--gold)] uppercase mb-2">
                Premium
              </p>
              <h3 className="text-sm text-[var(--text-light)] mb-3">
                Premium会員をご利用いただきありがとうございます
              </h3>
              <button
                onClick={async () => {
                  try {
                    const res = await authFetch("/api/stripe/checkout", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ type: "portal" }),
                    });
                    const data = await res.json();
                    if (data.url) window.location.href = data.url;
                  } catch {
                    // Stripe未接続時は何もしない
                  }
                }}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors underline underline-offset-2"
              >
                プランの変更・解約はこちら
              </button>
            </div>
          ) : (
            <div
              ref={upgradeRef}
              className={`border rounded-lg p-6 text-center bg-gradient-to-b from-[rgba(184,150,62,0.05)] to-transparent mb-10 transition-all duration-700 ${
                highlightUpgrade
                  ? "border-[var(--gold)] shadow-[0_0_20px_rgba(196,162,101,0.15)]"
                  : "border-[var(--gold-dim)]"
              }`}
            >
              <p className="font-en text-xs tracking-[0.15em] text-[var(--gold)] uppercase mb-2">
                Upgrade
              </p>
              <h3 className="text-lg text-[var(--text-light)] mb-2">
                Premiumで全占いが見放題
              </h3>
              <p className="text-xs text-[var(--text-muted)] mb-4">
                月額¥400で8つの詳細鑑定とMisaへの恋愛相談（月10回）
              </p>
              <button
                onClick={async () => {
                  if (!user && !isDemo) {
                    signInWithGoogle();
                    return;
                  }
                  try {
                    const res = await authFetch("/api/stripe/checkout", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ type: "premium" }),
                    });
                    const data = await res.json();
                    if (data.url) window.location.href = data.url;
                  } catch {
                    // Stripe未接続時
                  }
                }}
                className="inline-block bg-[var(--gold)] text-[var(--bg-deep)] px-6 py-2.5 rounded text-sm font-medium hover:opacity-90 transition-opacity"
              >
                {user || isDemo ? "Premiumに登録する" : "ログインして始める"}
              </button>
              <p className="text-[10px] text-[var(--text-muted)] mt-3 opacity-60">
                いつでもキャンセルできます
              </p>
            </div>
          )}

          {/* Recent Activity Timeline */}
          {history.length > 0 && (
            <div className="mb-10">
              <p className="font-en text-xs tracking-[0.15em] text-[var(--gold)] uppercase mb-4">
                Recent Activity
              </p>
              <div className="space-y-2">
                {history.slice(-5).reverse().map((record, i) => {
                  const fortune = fortunes.find(f => f.slug === record.slug);
                  const date = new Date(record.date).toLocaleDateString("ja-JP", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
                  return (
                    <div key={i} className="flex items-center gap-3 text-xs">
                      <span className="text-[var(--text-muted)] w-24 flex-shrink-0">{date}</span>
                      <span className="text-[var(--gold)] opacity-60">·</span>
                      <span className="text-[var(--text-muted)]">
                        {fortune?.emoji} {fortune?.name || record.slug}
                        <span className="ml-1 opacity-60">
                          {record.type === "detailed" ? "（詳細鑑定）" : "（基本鑑定）"}
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Account Actions */}
          <div className="border-t border-[var(--border-thin)] pt-6 space-y-3">
            <p className="font-en text-xs tracking-[0.15em] text-[var(--gold)] uppercase mb-3">
              Account
            </p>
            <Link
              href="/faq"
              className="block text-sm text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors"
            >
              よくある質問
            </Link>
            <Link
              href="/terms"
              className="block text-sm text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors"
            >
              利用規約
            </Link>
            <Link
              href="/privacy"
              className="block text-sm text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors"
            >
              プライバシーポリシー
            </Link>
            <Link
              href="/legal"
              className="block text-sm text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors"
            >
              特定商取引法に基づく表記
            </Link>
            {!isDemo && (
              <>
                <button
                  onClick={signOut}
                  className="block text-sm text-red-400/60 hover:text-red-400 transition-colors mt-4"
                >
                  ログアウト
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="block text-[11px] text-[var(--text-muted)] opacity-40 hover:opacity-70 hover:text-red-400 transition-all mt-2"
                >
                  アカウントを削除する
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Account Deletion Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={(e) => { if (e.target === e.currentTarget) { setShowDeleteModal(false); setDeleteConfirmText(""); } }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#12121f] border border-[var(--border-mid)] rounded-lg p-6 max-w-sm w-full"
          >
            <p className="text-sm text-[var(--text-light)] mb-3">アカウントの削除</p>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-2">
              この操作は取り消せません。以下の情報がすべて削除されます。
            </p>
            <ul className="text-xs text-[var(--text-muted)] leading-relaxed mb-4 list-disc pl-4 space-y-1 opacity-70">
              <li>鑑定履歴</li>
              <li>Premium会員の場合、サブスクリプションの自動解約</li>
              <li>アカウント情報</li>
            </ul>
            <p className="text-xs text-[var(--text-muted)] mb-2">
              確認のため「退会する」と入力してください。
            </p>
            <input
              type="text"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder="退会する"
              className="w-full bg-[rgba(255,255,255,0.04)] border border-[var(--border-mid)] rounded px-3 py-2 text-sm text-[var(--text-light)] placeholder:text-[var(--text-muted)] placeholder:opacity-30 focus:outline-none focus:border-red-400/50 mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => { setShowDeleteModal(false); setDeleteConfirmText(""); }}
                className="flex-1 border border-[var(--border-mid)] rounded px-4 py-2 text-xs text-[var(--text-muted)] hover:border-[var(--gold-dim)] transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteConfirmText !== "退会する" || isDeleting}
                className="flex-1 bg-red-500/80 text-white rounded px-4 py-2 text-xs font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-red-500"
              >
                {isDeleting ? "処理中..." : "削除する"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
