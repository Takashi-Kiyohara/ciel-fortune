import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
};

export default function PrivacyPage() {
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
          Privacy Policy
        </p>
        <h1 className="text-2xl text-[var(--text-light)] mb-8">プライバシーポリシー</h1>

        <div className="space-y-8 text-sm text-[var(--text-muted)] leading-loose">
          <section>
            <h2 className="text-base text-[var(--text-light)] mb-3">1. 収集する情報</h2>
            <p>
              本サービスでは、Google認証を通じてメールアドレスおよび表示名を取得します。
              また、占い鑑定に必要な生年月日や星座の情報をユーザーから任意で入力いただきます。
              決済情報はStripeが安全に管理し、本サービスでは保持しません。
            </p>
          </section>

          <section>
            <h2 className="text-base text-[var(--text-light)] mb-3">2. 情報の利用目的</h2>
            <p>
              収集した情報は以下の目的で利用します：占い鑑定の提供、アカウント管理、
              サービスの改善、お問い合わせへの対応、LINE配信サービスの提供。
            </p>
          </section>

          <section>
            <h2 className="text-base text-[var(--text-light)] mb-3">3. 第三者への提供</h2>
            <p>
              法令に基づく場合を除き、ユーザーの個人情報を第三者に提供することはありません。
              ただし、以下のサービス提供者には業務委託として情報を共有する場合があります：
              Supabase（認証・データ保管）、Stripe（決済処理 — カード情報はStripeが直接管理し、本サービスでは一切保持しません）、LINE（メッセージ配信）、Vercel（ホスティング・アクセスログ）。
              各サービス提供者のプライバシーポリシーもご確認ください。
            </p>
          </section>

          <section>
            <h2 className="text-base text-[var(--text-light)] mb-3">4. Cookieの使用</h2>
            <p>
              本サービスでは認証状態の維持のためにCookieを使用します。
              ブラウザの設定によりCookieを無効にすることも可能ですが、
              一部の機能が制限される場合があります。
            </p>
          </section>

          <section>
            <h2 className="text-base text-[var(--text-light)] mb-3">5. データの保護</h2>
            <p>
              ユーザーの個人情報は、Supabaseが提供する暗号化されたデータベースに保管され、
              適切なアクセス制御（Row Level Security）により保護されています。
            </p>
          </section>

          <section>
            <h2 className="text-base text-[var(--text-light)] mb-3">6. ユーザーの権利</h2>
            <p>
              ユーザーは自身の個人情報の開示、訂正、削除を求めることができます。
              アカウントの削除を希望される場合は、info@ciel-fortune.com までご連絡ください。
              ご連絡から14日以内に、アカウント情報および関連する鑑定履歴を完全に削除いたします。
              Premiumプランをご利用中の場合は、アカウント削除前にサブスクリプションの解約もあわせて行われます。
            </p>
          </section>

          <section>
            <h2 className="text-base text-[var(--text-light)] mb-3">7. ポリシーの変更</h2>
            <p>
              本ポリシーは、法令の改正やサービス変更に伴い変更する場合があります。
              重要な変更がある場合は、サービス内の通知またはメールにて事前にお知らせいたします。
              変更後のポリシーは本ページに掲載した時点で効力を生じます。
            </p>
          </section>

          <p className="text-xs text-[var(--text-muted)] pt-4 border-t border-[var(--border-thin)]">
            制定日：2026年3月28日
          </p>
        </div>
      </article>
      <Footer />
    </main>
  );
}
