"use client";
import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type FaqItem = {
  question: string;
  answer: string;
  category: string;
};

const faqs: FaqItem[] = [
  // サービスについて
  {
    category: "サービスについて",
    question: "Ciel Fortuneはどんなサービスですか？",
    answer:
      "Ciel Fortuneは、世界各国の占い・タロット・神秘体験を恋愛に特化してお届けする占いサービスです。国際線のCAとして世界を飛び回るMisaが、各地で出会った占いの知恵をもとに、あなたの恋愛を鑑定します。",
  },
  {
    category: "サービスについて",
    question: "Misaとはどんな人ですか？",
    answer:
      "Misaは国際線のキャビンアテンダントとして世界中を飛び回りながら、パリのタロット、ストックホルムの占星術、北京の四柱推命、レイキャビクのルーン占いなど、各地の占い師から直接学んだ知識を持つ占い師です。それぞれの土地で体験した物語とともに、あなたの恋を見つめます。",
  },
  {
    category: "サービスについて",
    question: "どんな種類の占いがありますか？",
    answer:
      "タロットカード（パリ）、西洋占星術（ストックホルム）、四柱推命（北京）、ルーン占い（レイキャビク）、コーヒーカップ占い（イスタンブール）、数秘術（アテネ）、ヴェーダ占星術（ジャイプール）、オラクルカード（マウイ島）の8種類をご用意しています。すべて恋愛に特化した内容です。",
  },
  // 料金について
  {
    category: "料金について",
    question: "無料でできることは何ですか？",
    answer:
      "全8種類の占いの基本鑑定を無料でお試しいただけます。基本鑑定では、Misaからの短いメッセージと恋愛の方向性をお伝えします。より詳しい鑑定内容（恋愛傾向、相性のポイント、具体的なアドバイス）は有料となります。",
  },
  {
    category: "料金について",
    question: "詳細鑑定の料金はいくらですか？",
    answer:
      "詳細鑑定は1回¥300でご利用いただけます。また、月額¥400のPremiumプランに加入すると、全占いの詳細鑑定が見放題になります。月に2回以上鑑定を受ける方にはPremiumがお得です。",
  },
  {
    category: "料金について",
    question: "支払い方法は何がありますか？",
    answer:
      "クレジットカード（Visa、Mastercard、American Express、JCB）でお支払いいただけます。決済は安全なStripeシステムを通じて処理されます。お客様のカード情報は当サービスでは保持しません。",
  },
  {
    category: "料金について",
    question: "Premiumプランはいつでも解約できますか？",
    answer:
      "はい、いつでも解約可能です。マイページの「プラン管理」からStripeのポータルにアクセスして解約できます。解約後も、現在の支払い期間の終了まではPremiumの機能をご利用いただけます。",
  },
  // 鑑定について
  {
    category: "鑑定について",
    question: "同じ占いを何度も受けられますか？",
    answer:
      "はい。同じ種類の占いを何度でもお受けいただけます。恋の状況や心境の変化によって、カードやルーンが伝えるメッセージも変わります。定期的に受けることで、恋の流れの変化を感じ取ることができますよ。",
  },
  {
    category: "鑑定について",
    question: "鑑定結果はどのくらいの期間参考にできますか？",
    answer:
      "鑑定の種類によりますが、おおよそ1〜3ヶ月程度を目安としています。星の動きや運気の流れは常に変化していますので、気になるタイミングで改めて鑑定を受けることをおすすめします。",
  },
  {
    category: "鑑定について",
    question: "Misaに直接相談することはできますか？",
    answer:
      "はい、チャット機能でMisaに恋愛の相談ができます。片思い、復縁、相性の悩みなど、なんでもお気軽にお話しくださいね。Misaがタロットや占星術の知恵をもとに、あなただけのアドバイスをお届けします。",
  },
  // アカウントについて
  {
    category: "アカウントについて",
    question: "アカウント登録は必要ですか？",
    answer:
      "基本鑑定は登録不要でお試しいただけます。詳細鑑定の購入や鑑定履歴の保存には、Googleアカウントでのログインが必要です。",
  },
  {
    category: "アカウントについて",
    question: "退会したい場合はどうすればいいですか？",
    answer:
      "ciel.fortune.info@gmail.com までご連絡ください。ご本人確認の上、14日以内にアカウントと関連データを削除いたします。Premiumプランをご利用中の場合、退会時にサブスクリプションも自動的に解約されます。",
  },
];

const categories = Array.from(new Set(faqs.map((f) => f.category)));

function FaqAccordion({ item }: { item: FaqItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[var(--border-thin)]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left py-5 flex items-start justify-between gap-4 group"
        aria-expanded={isOpen}
      >
        <span className="text-sm text-[var(--text-light)] group-hover:text-[var(--gold-light)] transition-colors leading-relaxed">
          {item.question}
        </span>
        <span
          className={`text-[var(--gold)] text-sm mt-0.5 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      {isOpen && (
        <div className="pb-5 -mt-1">
          <p className="text-xs text-[var(--text-muted)] leading-relaxed pl-0">
            {item.answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-deep)]">
      <Header />

      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Page Header */}
        <div className="text-center mb-12">
          <p className="font-en text-xs tracking-[0.2em] text-[var(--gold)] uppercase mb-3">
            FAQ
          </p>
          <h1 className="text-2xl sm:text-3xl text-[var(--text-light)] mb-4">
            よくある質問
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            Ciel Fortuneについて気になることをまとめました
          </p>
        </div>

        {/* FAQ Sections */}
        {categories.map((category) => (
          <section key={category} className="mb-12">
            <h2 className="font-en text-[10px] tracking-[0.15em] text-[var(--gold)] uppercase mb-4">
              {category}
            </h2>
            <div>
              {faqs
                .filter((f) => f.category === category)
                .map((item, i) => (
                  <FaqAccordion key={i} item={item} />
                ))}
            </div>
          </section>
        ))}

        {/* CTA */}
        <div className="border border-[var(--border-thin)] rounded-lg p-8 text-center mt-8">
          <p className="text-sm text-[var(--text-light)] mb-2">
            他にご質問がありますか？
          </p>
          <p className="text-xs text-[var(--text-muted)] mb-5">
            Misaに直接聞いてみるのもおすすめです
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/chat"
              className="border border-[var(--gold)] text-[var(--gold)] px-6 py-2.5 rounded text-xs hover:bg-[var(--gold)] hover:text-[var(--bg-deep)] transition-all"
            >
              Misaに相談する
            </Link>
            <a
              href="mailto:ciel.fortune.info@gmail.com"
              className="border border-[var(--border-mid)] text-[var(--text-muted)] px-6 py-2.5 rounded text-xs hover:border-[var(--gold-dim)] hover:text-[var(--gold)] transition-all"
            >
              メールでお問い合わせ
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
