import type { Metadata } from "next";
import { Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";

const zenMaru = Zen_Maru_Gothic({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

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
    <html lang="ja" className={zenMaru.className}>
      <body>{children}</body>
    </html>
  );
}
