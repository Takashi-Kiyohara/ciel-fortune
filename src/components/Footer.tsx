export default function Footer() {
  return (
    <footer className="py-16 sm:py-20 bg-[#0a0a14] border-t border-[#c4a265]/6">
      <div className="max-w-3xl mx-auto px-6 sm:px-12 text-center">
        <p className="font-serif-en text-[#c4a265]/50 text-base tracking-[0.4em] mb-10">
          CIEL FORTUNE
        </p>

        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-[#e8e4df]/20 mb-12">
          <a href="#" className="hover:text-[#c4a265]/50 transition-colors duration-300">
            利用規約
          </a>
          <a href="#" className="hover:text-[#c4a265]/50 transition-colors duration-300">
            プライバシーポリシー
          </a>
          <a href="#" className="hover:text-[#c4a265]/50 transition-colors duration-300">
            特定商取引法に基づく表記
          </a>
          <a href="#" className="hover:text-[#c4a265]/50 transition-colors duration-300">
            お問い合わせ
          </a>
        </nav>

        <p className="text-[0.6rem] text-[#e8e4df]/12 tracking-wider">
          &copy; 2026 Ciel Fortune. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
