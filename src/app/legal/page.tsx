import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記",
};

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-deep)]">
      <div className="px-6 py-4 border-b border-[var(--border-thin)]">
        <Link
          href="/"
          className="text-xs text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors"
        >
          &larr; トップに戻る
        </Link>
      </div>

      <article className="max-w-2xl mx-auto px-6 py-12">
        <p className="font-en text-xs tracking-[0.2em] text-[var(--gold)] uppercase mb-4">
          Legal Notice
        </p>
        <h1 className="text-2xl text-[var(--text-light)] mb-8">
          特定商取引法に基づく表記
        </h1>

        <div className="space-y-6 text-sm">
          <div className="border border-[var(--border-thin)] rounded-lg overflow-hidden">
            {[
              ["販売事業者", "Ciel Fortune 運営事務局"],
              ["運営統括責任者", "清原 崇"],
              ["所在地", "お問い合わせいただいた方にお知らせいたします"],
              ["連絡先", "info@ciel-fortune.com（お問い合わせはメールにて受け付けております）"],
              ["販売価格", "詳細鑑定: ¥300（税込）/ Premiumプラン: ¥400/月（税込）"],
              ["支払方法", "クレジットカード（Stripe経由）"],
              ["支払時期", "単発購入: 決済時即時 / サブスクリプション: 毎月自動更新"],
              ["商品の引渡時期", "決済完了後、即時にWebサイト上で鑑定結果を表示"],
              [
                "返品・キャンセル",
                "デジタルコンテンツの性質上、鑑定結果の表示後の返品・返金はお受けできません。" +
                  "サブスクリプションは随時解約可能で、解約月末まで利用できます。",
              ],
              [
                "動作環境",
                "最新版のChrome、Safari、Firefox、Edgeに対応。" +
                  "JavaScriptの有効化が必要です。",
              ],
            ].map(([label, value], i) => (
              <div
                key={label}
                className={`flex flex-col sm:flex-row ${
                  i > 0 ? "border-t border-[var(--border-thin)]" : ""
                }`}
              >
                <div className="sm:w-40 flex-shrink-0 px-4 py-3 text-[var(--gold)] text-xs bg-[rgba(184,150,62,0.05)]">
                  {label}
                </div>
                <div className="px-4 py-3 text-[var(--text-muted)] flex-1">
                  {value}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-[var(--text-muted)] pt-4">
            ※ 本サービスで提供する占い鑑定は、エンターテインメント目的のコンテンツです。
            医療・法律・投資等の判断の根拠としてのご利用はお控えください。
          </p>
        </div>
      </article>
      <Footer />
    </main>
  );
}
