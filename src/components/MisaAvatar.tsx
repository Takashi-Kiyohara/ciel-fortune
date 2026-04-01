"use client";

type Props = {
  size?: number;
};

/**
 * Misa のアバター — 三日月と星のモチーフ
 * チャット、鑑定結果、マイページなど全画面で統一して使用
 */
export default function MisaAvatar({ size = 32 }: Props) {
  const iconSize = Math.round(size * 0.6);
  return (
    <div
      className="rounded-full bg-gradient-to-br from-[var(--gold)] to-[#d4af37] flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(184,150,62,0.3)]"
      style={{ width: size, height: size }}
      role="img"
      aria-label="Misa"
    >
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* 三日月 */}
        <path
          d="M12 3a9 9 0 0 0 0 18 9 9 0 0 1 0-18z"
          fill="#0d0d1a"
          opacity="0.9"
        />
        {/* 星（大） */}
        <path
          d="M18 5l.5 1.5L20 7l-1.5.5L18 9l-.5-1.5L16 7l1.5-.5L18 5z"
          fill="#0d0d1a"
        />
        {/* 星（小） */}
        <path
          d="M15 11l.35 1.05L16.4 12.4l-1.05.35L15 13.8l-.35-1.05L13.6 12.4l1.05-.35L15 11z"
          fill="#0d0d1a"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}
