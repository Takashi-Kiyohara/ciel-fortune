export default function Footer() {
  return (
    <footer className="py-12 bg-[#0e0e1a] border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-[#d4a574] text-lg tracking-[0.3em] mb-6">
          CIEL FORTUNE
        </p>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-[#f5f0e8]/40 mb-8">
          <a href="#" className="hover:text-[#d4a574] transition-colors">
            利用規約
          </a>
          <a href="#" className="hover:text-[#d4a574] transition-colors">
            プライバシーポリシー
          </a>
          <a href="#" className="hover:text-[#d4a574] transition-colors">
            特定商取引法に基づく表記
          </a>
          <a href="#" className="hover:text-[#d4a574] transition-colors">
            お問い合わせ
          </a>
        </nav>

        <p className="text-xs text-[#f5f0e8]/25">
          &copy; 2025 Ciel Fortune. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
