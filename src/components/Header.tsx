"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/useAuth";

export default function Header() {
  const { user, loading, isDemo, signInWithGoogle, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Click outside to close user menu
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [userMenuOpen]);

  // Escape key to close menus
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (userMenuOpen) setUserMenuOpen(false);
        if (mobileMenuOpen) setMobileMenuOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [userMenuOpen, mobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[var(--bg-deep)]/80 backdrop-blur-md border-b border-[var(--border-thin)]">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-en text-sm tracking-[0.15em] text-[var(--gold)]">
            CIEL FORTUNE
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden sm:flex items-center gap-6" aria-label="メインナビゲーション">
          <Link
            href="/#fortunes"
            className="font-en text-[11px] tracking-widest text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors uppercase"
          >
            Fortunes
          </Link>
          <Link
            href="/chat"
            className="font-en text-[11px] tracking-widest text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors uppercase"
          >
            Chat
          </Link>
          <Link
            href="/#pricing"
            className="font-en text-[11px] tracking-widest text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors uppercase"
          >
            Pricing
          </Link>
          <Link
            href="/mypage"
            className="font-en text-[11px] tracking-widest text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors uppercase"
          >
            My Page
          </Link>

          {isDemo ? null : loading ? (
            <div className="w-16 h-6 bg-[rgba(255,255,255,0.05)] rounded animate-pulse" />
          ) : user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="w-7 h-7 rounded-full bg-[var(--gold)] flex items-center justify-center text-[var(--bg-deep)] text-xs font-medium"
                aria-label="アカウントメニュー"
                aria-expanded={userMenuOpen}
              >
                {user.email?.charAt(0).toUpperCase() || "U"}
              </button>
              {userMenuOpen && (
                <div
                  className="absolute right-0 top-10 bg-[#1a1a2e] border border-[var(--border-mid)] rounded-lg py-2 w-48 shadow-xl"
                  role="menu"
                  aria-label="アカウントメニュー"
                >
                  <p className="px-4 py-1 text-[10px] text-[var(--text-muted)] truncate" role="none">
                    {user.email}
                  </p>
                  <hr className="border-[var(--border-thin)] my-1" role="none" />
                  <Link
                    href="/mypage"
                    onClick={() => setUserMenuOpen(false)}
                    className="block w-full text-left px-4 py-2 text-xs text-[var(--text-muted)] hover:text-[var(--text-light)] hover:bg-[rgba(255,255,255,0.03)] transition-colors"
                    role="menuitem"
                  >
                    マイページ
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-[var(--text-muted)] hover:text-[var(--text-light)] hover:bg-[rgba(255,255,255,0.03)] transition-colors"
                    role="menuitem"
                  >
                    ログアウト
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="font-en text-[11px] tracking-widest text-[var(--gold)] border border-[var(--gold-dim)] px-3 py-1 rounded hover:bg-[var(--gold)] hover:text-[var(--bg-deep)] transition-all"
            >
              SIGN IN
            </button>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors"
          aria-label={mobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={mobileMenuOpen}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeWidth={1.5} d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path strokeLinecap="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="sm:hidden border-t border-[var(--border-thin)] bg-[var(--bg-deep)]/95 backdrop-blur-md px-6 py-4 space-y-3" aria-label="モバイルナビゲーション">
          <Link
            href="/#fortunes"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors"
          >
            占い一覧
          </Link>
          <Link
            href="/chat"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors"
          >
            Misaに相談
          </Link>
          <Link
            href="/#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors"
          >
            料金プラン
          </Link>
          <Link
            href="/mypage"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors"
          >
            マイページ
          </Link>
          <hr className="border-[var(--border-thin)]" />
          {user ? (
            <button
              onClick={() => {
                signOut();
                setMobileMenuOpen(false);
              }}
              className="text-sm text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors"
            >
              ログアウト
            </button>
          ) : (
            <button
              onClick={() => {
                signInWithGoogle();
                setMobileMenuOpen(false);
              }}
              className="text-sm text-[var(--gold)]"
            >
              ログイン
            </button>
          )}
        </nav>
      )}
    </header>
  );
}
