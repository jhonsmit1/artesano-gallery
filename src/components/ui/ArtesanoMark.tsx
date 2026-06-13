"use client";

/**
 * Marca compacta para el header: la copa martini de líneas + "ARTESANO BAR"
 * en horizontal. Versión reducida del icono de la pantalla de bienvenida.
 */
export function ArtesanoMark({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <svg
        viewBox="0 0 120 120"
        className="h-9 w-9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <clipPath id="markCup">
            <path d="M40 30 H80 L60 56 Z" />
          </clipPath>
          <linearGradient id="markLiquid" x1="0" y1="30" x2="0" y2="56">
            <stop offset="0" stopColor="#F7CD82" />
            <stop offset="1" stopColor="#B5732E" />
          </linearGradient>
        </defs>
        {/* Líquido servido */}
        <g clipPath="url(#markCup)">
          <rect x="36" y="33" width="48" height="26" fill="url(#markLiquid)" />
          <rect x="36" y="33" width="48" height="2.5" fill="#FFE9B4" />
        </g>
        {/* Copa + tallo + base */}
        <g
          stroke="#E8D2A8"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M40 30 H80 L60 56 Z" />
          <path d="M60 56 V84 M46 88 H74" />
        </g>
        {/* Aceituna */}
        <circle cx="68" cy="40" r="3.2" fill="#96AA5A" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className="text-sm font-semibold tracking-[0.22em] text-neutral-100"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          ARTESANO
        </span>
        <span className="text-[0.6rem] tracking-[0.45em] text-[#E8D2A8]">
          BAR
        </span>
      </span>
    </span>
  );
}
