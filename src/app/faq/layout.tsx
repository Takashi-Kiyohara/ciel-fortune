import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ciel-fortune.vercel.app";

export const metadata: Metadata = {
  title: "よくある質問（FAQ）| Ciel Fortune",
  description:
    "Ciel Fortuneの料金、占いの種類、Premiumプランの解約方法、アカウントの退会方法など、よくある質問をまとめました。",
  openGraph: {
    title: "よくある質問（FAQ）| Ciel Fortune",
    description: "Ciel Fortuneについてよくある質問をまとめました。料金、占いの種類、プランについてご確認いただけます。",
    url: `${siteUrl}/faq`,
    siteName: "Ciel Fortune",
    locale: "ja_JP",
    type: "website",
  },
};

// FAQ Schema (FAQPage structured data for Google rich results)
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Ciel Fortuneはどんなサービスですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ciel Fortuneは、世界各国の占い・タロット・神秘体験を恋愛に特化してお届けする占いサービスです。国際線のCAとして世界を飛び回るMisaが、各地で出会った占いの知恵をもとに、あなたの恋愛を鑑定します。",
      },
    },
    {
      "@type": "Question",
      name: "どんな種類の占いがありますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "タロットカード（パリ）、西洋占星術（ストックホルム）、四柱推命（北京）、ルーン占い（レイキャビク）、コーヒーカップ占い（イスタンブール）、数秘術（アテネ）、ヴェーダ占星術（ジャイプール）、オラクルカード（マウイ島）の8種類をご用意しています。",
      },
    },
    {
      "@type": "Question",
      name: "無料でできることは何ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "全8種類の占いの基本鑑定を無料でお試しいただけます。基本鑑定では、Misaからの短いメッセージと恋愛の方向性をお伝えします。",
      },
    },
    {
      "@type": "Question",
      name: "詳細鑑定の料金はいくらですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "詳細鑑定は1回¥300でご利用いただけます。また、月額¥400のPremiumプランに加入すると、全占いの詳細鑑定が見放題になります。",
      },
    },
    {
      "@type": "Question",
      name: "Premiumプランはいつでも解約できますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "はい、いつでも解約可能です。マイページの「プラン管理」からStripeのポータルにアクセスして解約できます。解約後も、現在の支払い期間の終了まではPremiumの機能をご利用いただけます。",
      },
    },
    {
      "@type": "Question",
      name: "Misaに直接相談することはできますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "はい、チャット機能でMisaに恋愛の相談ができます。片思い、復縁、相性の悩みなど、なんでもお気軽にお話しくださいね。",
      },
    },
  ],
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
