// JSON-LD 構造化データ — WebSite + Organization
// Google検索結果でリッチスニペットを表示するため

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ciel-fortune.vercel.app";

export function WebsiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ciel Fortune",
    alternateName: "シエルフォーチュン",
    url: siteUrl,
    description:
      "国際線CA Misaが世界各地で学んだ占いの知恵で、あなたの恋愛を導きます。タロット、西洋占星術、四柱推命など8つの恋愛占い。",
    inLanguage: "ja",
    publisher: {
      "@type": "Organization",
      name: "Ciel Fortune",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/favicon.svg`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function FortuneJsonLd({
  name,
  nameEn,
  description,
  region,
  slug,
}: {
  name: string;
  nameEn: string;
  description: string;
  region: string;
  slug: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${name} — Ciel Fortune`,
    alternateName: nameEn,
    description,
    provider: {
      "@type": "Organization",
      name: "Ciel Fortune",
    },
    areaServed: {
      "@type": "Place",
      name: region,
    },
    url: `${siteUrl}/fortune/${slug}`,
    offers: [
      {
        "@type": "Offer",
        name: "基本鑑定",
        price: "0",
        priceCurrency: "JPY",
      },
      {
        "@type": "Offer",
        name: "詳細恋愛鑑定",
        price: "300",
        priceCurrency: "JPY",
      },
    ],
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ciel Fortune",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "占い一覧",
        item: `${siteUrl}/#fortunes`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name,
        item: `${siteUrl}/fortune/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </>
  );
}
