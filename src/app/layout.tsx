import type { Metadata, Viewport } from "next";
import { WebsiteJsonLd } from "@/components/JsonLd";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ciel-fortune.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Ciel Fortune | 世界を旅するCAが届ける占い",
    template: "%s | Ciel Fortune",
  },
  description:
    "国際線CA Misaが世界各地で出会った占いをあなたに。タロット、西洋占星術、四柱推命など8つの恋愛占いで、あなたの恋を導きます。",
  keywords: ["占い", "恋愛占い", "タロット", "西洋占星術", "四柱推命", "無料占い", "恋愛相談"],
  authors: [{ name: "Ciel Fortune" }],
  creator: "Ciel Fortune",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "Ciel Fortune",
    title: "Ciel Fortune | 世界を旅するCAが届ける恋愛占い",
    description:
      "国際線CA Misaが世界各地で学んだ8つの占いで、あなたの恋を導きます。基本鑑定は無料。",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ciel Fortune — 世界を旅するCAが届ける占い",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ciel Fortune | 世界を旅するCAが届ける恋愛占い",
    description:
      "国際線CA Misaが世界各地で学んだ8つの占いで、あなたの恋を導きます。",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d0d1a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Noto+Sans+JP:wght@300;400;500&family=Shippori+Mincho+B1:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <GoogleAnalytics />
        <WebsiteJsonLd />
        {children}
      </body>
    </html>
  );
}
