// ============================================
// EggMascot — the main character
// ============================================

export default function EggMascot({ size = 80, className = "" }) {
  return (
    <div className={`animate-bob inline-block ${className}`} aria-hidden="true">
      <svg
        width={size}
        height={size * 1.25}
        viewBox="0 0 80 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Egg body */}
        <ellipse
          cx="40" cy="57" rx="33" ry="42"
          fill="#FAF6EE"
          stroke="#D4A847"
          strokeWidth="2.5"
        />

        {/* Inner glow */}
        <ellipse
          cx="40" cy="57" rx="28" ry="36"
          fill="url(#eggGradient)"
          opacity="0.4"
        />

        {/* Eyes */}
        <circle cx="30" cy="50" r="5" fill="#2C2416" />
        <circle cx="50" cy="50" r="5" fill="#2C2416" />

        {/* Eye shine */}
        <circle cx="32" cy="47.5" r="2" fill="#FAF6EE" />
        <circle cx="52" cy="47.5" r="2" fill="#FAF6EE" />

        {/* Blush */}
        <ellipse cx="22" cy="58" rx="5" ry="3" fill="#D4A847" opacity="0.25" />
        <ellipse cx="58" cy="58" rx="5" ry="3" fill="#D4A847" opacity="0.25" />

        {/* Smile */}
        <path
          d="M 30 65 Q 40 75 50 65"
          stroke="#2C2416"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* Crown hint (very subtle) */}
        <path
          d="M 25 18 L 30 8 L 40 14 L 50 8 L 55 18"
          stroke="#D4A847"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />

        <defs>
          <radialGradient id="eggGradient" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#D4A847" />
            <stop offset="100%" stopColor="#FAF6EE" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  )
}