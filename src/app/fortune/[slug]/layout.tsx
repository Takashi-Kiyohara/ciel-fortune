import type { Metadata } from "next";
import { fortunes } from "@/data/fortunes";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ciel-fortune.vercel.app";

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const fortune = fortunes.find((f) => f.slug === slug);

  if (!fortune) {
    return {
      title: "占いが見つかりません | Ciel Fortune",
    };
  }

  const title = `${fortune.name}（${fortune.nameEn}）— 恋愛占い | Ciel Fortune`;
  const description = `${fortune.shortDescription}。${fortune.misaStory.slice(0, 60)}...`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/fortune/${slug}`,
      siteName: "Ciel Fortune",
      locale: "ja_JP",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${fortune.name} | Ciel Fortune`,
      description: fortune.shortDescription,
    },
  };
}

export default function FortuneLayout({ children }: Props) {
  return children;
}
