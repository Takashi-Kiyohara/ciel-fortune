import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ciel Fortune | 世界を旅するCAが届ける占い",
  description:
    "パリのタロット、京都の手相、バリのオーラ診断。国際線CA Misaが世界50カ国で出会った占いを、あなたのスマホに届けます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
