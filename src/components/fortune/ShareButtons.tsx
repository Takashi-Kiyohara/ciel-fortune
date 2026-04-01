"use client";

type ShareButtonsProps = {
  fortuneName: string;
  variant?: "free" | "detailed";
};

// X (Twitter) icon
function XIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// LINE icon
function LineIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 5.81 2 10.5c0 4.01 3.17 7.36 7.47 8.27.29.06.68.2.78.44.09.22.06.56.03.78l-.13.78c-.04.22-.17.87.76.47.93-.4 5.03-2.96 6.86-5.07C19.85 13.73 22 12.26 22 10.5 22 5.81 17.52 2 12 2z" />
    </svg>
  );
}

// Share/Upload icon
function ShareIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}

export default function ShareButtons({ fortuneName, variant = "free" }: ShareButtonsProps) {
  const shareText = variant === "detailed"
    ? `${fortuneName}をMisaに鑑定してもらいました ✨`
    : `${fortuneName}でMisaからメッセージをもらいました ✨`;

  const btnSize = variant === "detailed" ? "w-8 h-8" : "w-7 h-7";
  const iconSize = variant === "detailed" ? { x: 14, line: 16 } : { x: 12, line: 14 };

  return (
    <div className="flex items-center justify-center gap-4">
      <span className="text-[10px] text-[var(--text-muted)]">シェアする</span>
      <button
        onClick={() => {
          const url = typeof window !== "undefined" ? window.location.href : "";
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
            "_blank",
            "width=550,height=420"
          );
        }}
        className={`${btnSize} rounded-full border border-[var(--border-thin)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors`}
        aria-label="Xでシェア"
      >
        <XIcon size={iconSize.x} />
      </button>
      <button
        onClick={() => {
          const url = typeof window !== "undefined" ? window.location.href : "";
          window.open(
            `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`,
            "_blank",
            "width=550,height=420"
          );
        }}
        className={`${btnSize} rounded-full border border-[var(--border-thin)] flex items-center justify-center text-[var(--text-muted)] hover:border-[#06C755] hover:text-[#06C755] transition-colors`}
        aria-label="LINEでシェア"
      >
        <LineIcon size={iconSize.line} />
      </button>
      {variant === "detailed" && (
        <button
          onClick={() => {
            if (typeof navigator !== "undefined" && navigator.share) {
              navigator.share({
                title: `${fortuneName} | Ciel Fortune`,
                text: "Misaに恋愛を鑑定してもらいました",
                url: window.location.href,
              }).catch(() => {});
            } else if (typeof navigator !== "undefined") {
              navigator.clipboard.writeText(window.location.href).catch(() => {});
            }
          }}
          className={`${btnSize} rounded-full border border-[var(--border-thin)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors`}
          aria-label="リンクをシェア"
        >
          <ShareIcon />
        </button>
      )}
    </div>
  );
}
