import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "利用規約",
};

export default function TermsPage() {
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
          Terms of Service
        </p>
        <h1 className="text-2xl text-[var(--text-light)] mb-8">利用規約</h1>

        <div className="space-y-8 text-sm text-[var(--text-muted)] leading-loose">
          <section>
            <h2 className="text-base text-[var(--text-light)] mb-3">第1条（適用）</h2>
            <p>
              本規約は、Ciel Fortune（以下「本サービス」）が提供する全てのサービスの利用条件を定めるものです。
              ユーザーは本規約に同意の上、本サービスを利用するものとします。
            </p>
          </section>

          <section>
            <h2 className="text-base text-[var(--text-light)] mb-3">第2条（サービスの内容）</h2>
            <p>
              本サービスは、占い・運勢に関するエンターテインメントコンテンツを提供するものです。
              本サービスで提供される鑑定結果は娯楽目的であり、人生の重大な決定（医療、法律、投資等）の根拠として使用することは推奨しません。
            </p>
          </section>

          <section>
            <h2 className="text-base text-[var(--text-light)] mb-3">第3条（利用料金）</h2>
            <p>
              基本鑑定は無料でご利用いただけます。詳細鑑定（1回¥300）およびPremiumプラン（月額¥400）は
              Stripeを通じた決済により提供されます。サブスクリプションの解約は随時可能で、
              解約月末まで利用可能です。
            </p>
          </section>

          <section>
            <h2 className="text-base text-[var(--text-light)] mb-3">第4条（禁止事項）</h2>
            <p>
              ユーザーは以下の行為を行ってはなりません：本サービスの不正利用、リバースエンジニアリング、
              他のユーザーへの迷惑行為、虚偽情報の登録、本サービスのコンテンツの無断転載。
            </p>
          </section>

          <section>
            <h2 className="text-base text-[var(--text-light)] mb-3">第5条（免責事項）</h2>
            <p>
              本サービスの鑑定結果はエンターテインメント目的であり、その正確性や結果を保証するものではありません。
              本サービスの利用により生じた損害について、運営者は一切の責任を負いません。
            </p>
          </section>

          <section>
            <h2 className="text-base text-[var(--text-light)] mb-3">第6条（規約の変更）</h2>
            <p>
              運営者は、必要に応じて本規約を変更できるものとします。
              重要な変更がある場合は、変更の7日前までにサービス内の通知またはメールにてお知らせいたします。
              変更後の規約は、本ページに掲載し、通知期間が経過した時点で効力を生じます。
              変更後もサービスを継続利用された場合、変更後の規約に同意したものとみなします。
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
