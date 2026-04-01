import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "マイページ | Ciel Fortune",
  description:
    "あなたの占い鑑定履歴やプランの管理ができます。世界の占いで恋愛を見つめた記録をここで振り返りましょう。",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
