// ============================================
// EggFloat — decorative background eggs
// Pure CSS, pointer-events none, zero impact
// ============================================

const EGG_SVG = ({ size = 60, opacity = 0.06 }) => (
  <svg
    width={size}
    height={size * 1.25}
    viewBox="0 0 80 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ opacity }}
  >
    {/* Egg body */}
    <ellipse
      cx="40" cy="57" rx="32" ry="40"
      stroke="#2C2416"
      strokeWidth="2"
      fill="none"
    />
    {/* Eyes */}
    <circle cx="31" cy="50" r="4" fill="#2C2416" />
    <circle cx="49" cy="50" r="4" fill="#2C2416" />
    {/* Eye shine */}
    <circle cx="33" cy="48" r="1.5" fill="#FAF6EE" />
    <circle cx="51" cy="48" r="1.5" fill="#FAF6EE" />
    {/* Smile */}
    <path
      d="M 31 62 Q 40 70 49 62"
      stroke="#2C2416"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
)

// Predefined positions — deterministic, no random on render
const EGG_POSITIONS = [
  { top: "8%",  left: "5%",   size: 55,  opacity: 0.05, animClass: "animate-float-slow",  delay: "0s"    },
  { top: "15%", left: "88%",  size: 70,  opacity: 0.06, animClass: "animate-float-med",   delay: "0.8s"  },
  { top: "35%", left: "3%",   size: 45,  opacity: 0.04, animClass: "animate-float-fast",  delay: "1.2s"  },
  { top: "42%", left: "92%",  size: 60,  opacity: 0.05, animClass: "animate-float-slow",  delay: "0.4s"  },
  { top: "62%", left: "8%",   size: 50,  opacity: 0.04, animClass: "animate-float-med",   delay: "1.6s"  },
  { top: "70%", left: "85%",  size: 65,  opacity: 0.06, animClass: "animate-float-fast",  delay: "0.2s"  },
  { top: "85%", left: "20%",  size: 40,  opacity: 0.03, animClass: "animate-float-slow",  delay: "1s"    },
  { top: "78%", left: "60%",  size: 55,  opacity: 0.05, animClass: "animate-float-med",   delay: "0.6s"  },
  { top: "22%", left: "45%",  size: 35,  opacity: 0.03, animClass: "animate-float-fast",  delay: "1.8s"  },
  { top: "55%", left: "50%",  size: 48,  opacity: 0.04, animClass: "animate-float-slow",  delay: "1.4s"  },
]

export default function EggFloat({ count = 10, className = "" }) {
  const eggs = EGG_POSITIONS.slice(0, count)

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    >
      {eggs.map((egg, i) => (
        <div
          key={i}
          className={egg.animClass}
          style={{
            position:    "absolute",
            top:         egg.top,
            left:        egg.left,
            animationDelay: egg.delay,
          }}
        >
          <EGG_SVG size={egg.size} opacity={egg.opacity} />
        </div>
      ))}
    </div>
  )
}