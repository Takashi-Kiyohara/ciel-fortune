import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-thin)] bg-[var(--bg-deep)]">
      <div className="max-w-5xl mx-auto px-6 py-14">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <p className="font-en text-lg text-[var(--gold-light)] mb-2">Ciel Fortune</p>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              世界を飛び回るCAのMisaが出会った、
              各国の占い・タロット・神秘体験を
              あなたの恋に届けます。
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-en text-[10px] tracking-[0.15em] text-[var(--gold)] uppercase mb-3">
              Menu
            </p>
            <nav className="flex flex-col gap-2" aria-label="サイトメニュー">
              <Link href="/#fortunes" className="text-xs text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors">
                占い一覧
              </Link>
              <Link href="/chat" className="text-xs text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors">
                Misaに相談
              </Link>
              <Link href="/#pricing" className="text-xs text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors">
                料金プラン
              </Link>
              <Link href="/mypage" className="text-xs text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors">
                マイページ
              </Link>
              <Link href="/faq" className="text-xs text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors">
                よくある質問
              </Link>
            </nav>
          </div>

          {/* Legal + Contact */}
          <div>
            <p className="font-en text-[10px] tracking-[0.15em] text-[var(--gold)] uppercase mb-3">
              Legal
            </p>
            <nav className="flex flex-col gap-2 mb-6" aria-label="法的情報">
              <Link href="/terms" className="text-xs text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors">
                利用規約
              </Link>
              <Link href="/privacy" className="text-xs text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors">
                プライバシーポリシー
              </Link>
              <Link href="/legal" className="text-xs text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors">
                特定商取引法に基づく表記
              </Link>
            </nav>
            <p className="font-en text-[10px] tracking-[0.15em] text-[var(--gold)] uppercase mb-2">
              Contact
            </p>
            <a
              href="mailto:ciel.fortune.info@gmail.com"
              className="text-xs text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors"
            >
              ciel.fortune.info@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[var(--border-thin)] pt-6 text-center">
          <p className="text-xs text-[var(--text-muted)] mb-3">
            &copy; {new Date().getFullYear()} Ciel Fortune. All rights reserved.
          </p>
          <p className="text-[9px] text-[var(--text-muted)] opacity-50 max-w-sm mx-auto leading-relaxed">
            本サービスの占い鑑定はエンターテインメント目的のコンテンツです。
            医療・法律・投資等の判断の根拠としてのご利用はお控えください。
          </p>
        </div>
      </div>
    </footer>
  );
}
