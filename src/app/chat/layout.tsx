import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ciel-fortune.vercel.app";

export const metadata: Metadata = {
  title: "Misaに恋愛相談 | Ciel Fortune",
  description:
    "世界各地で学んだ占いの知恵を持つMisaが、あなたの恋愛の悩みにじっくり向き合います。タロット、占星術、数秘術の視点から、恋のアドバイスをお届けします。",
  openGraph: {
    title: "Misaに恋愛相談 | Ciel Fortune",
    description: "世界各地で学んだ占いの知恵を持つMisaが、あなたの恋愛の悩みにじっくり向き合います。",
    url: `${siteUrl}/chat`,
    siteName: "Ciel Fortune",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Misaに恋愛相談 | Ciel Fortune",
    description: "世界各地で学んだ占いの知恵を持つMisaが、あなたの恋愛の悩みにじっくり向き合います。",
  },
};

const chatJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Misaに恋愛相談 — Ciel Fortune",
  description:
    "世界各地で学んだ占いの知恵を持つMisaが、あなたの恋愛の悩みにじっくり向き合います。",
  provider: {
    "@type": "Organization",
    name: "Ciel Fortune",
  },
  url: `${siteUrl}/chat`,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "JPY",
    description: "基本相談は無料。Premium会員は月10回まで。",
  },
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(chatJsonLd) }}
      />
      {children}
    </>
  );
}
