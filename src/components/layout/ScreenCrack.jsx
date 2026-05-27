import { useEffect, useRef, useState } from "react"

// Generate crack line segments — deterministic
const CRACK_LINES = [
  // Center burst
  { x: 50, y: 50, angle: 0, length: 35, width: 3, delay: 0 },
  { x: 50, y: 50, angle: 45, length: 40, width: 2, delay: 30 },
  { x: 50, y: 50, angle: 90, length: 30, width: 3, delay: 20 },
  { x: 50, y: 50, angle: 135, length: 38, width: 2, delay: 40 },
  { x: 50, y: 50, angle: 180, length: 32, width: 3, delay: 10 },
  { x: 50, y: 50, angle: 225, length: 42, width: 2, delay: 50 },
  { x: 50, y: 50, angle: 270, length: 28, width: 3, delay: 15 },
  { x: 50, y: 50, angle: 315, length: 36, width: 2, delay: 35 },

  // Secondary branches
  { x: 65, y: 40, angle: 30, length: 20, width: 1.5, delay: 80 },
  { x: 35, y: 60, angle: 210, length: 22, width: 1.5, delay: 90 },
  { x: 55, y: 30, angle: 60, length: 18, width: 1, delay: 100 },
  { x: 45, y: 70, angle: 250, length: 16, width: 1, delay: 110 },
  { x: 70, y: 55, angle: 350, length: 15, width: 1, delay: 120 },
  { x: 30, y: 45, angle: 170, length: 19, width: 1, delay: 130 },
]

// Small shell fragments
const FRAGMENTS = [
  { x: 48, y: 48, size: 8, rotation: 15, delay: 150 },
  { x: 52, y: 52, size: 6, rotation: -25, delay: 170 },
  { x: 45, y: 52, size: 10, rotation: 40, delay: 160 },
  { x: 55, y: 46, size: 7, rotation: -10, delay: 180 },
  { x: 50, y: 50, size: 12, rotation: 0, delay: 140 },
]

export default function ScreenCrack({ active, onComplete }) {
  const [phase, setPhase] = useState("idle") // idle → crack → shatter → done
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    const timers = []

    const schedule = (callback, delay) => {
      const timer = setTimeout(callback, delay)
      timers.push(timer)
    }

    if (!active) {
      schedule(() => {
        setPhase("idle")
      }, 0)

      return () => {
        timers.forEach(clearTimeout)
      }
    }

    // Phase 1: crack lines appear
    schedule(() => {
      setPhase("crack")
    }, 0)

    // Phase 2: fragments fly out
    schedule(() => {
      setPhase("shatter")
    }, 400)

    // Phase 3: done — notify parent
    schedule(() => {
      setPhase("done")
      onCompleteRef.current?.()
    }, 1200)

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [active])

  if (phase === "idle" || phase === "done") return null

  return (
    <div
      className="fixed inset-0 z-[9998] pointer-events-none"
      style={{ animation: "fadeIn 0.1s ease" }}
    >
      {/* White flash */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(250, 246, 238, 0.3)",
          animation:
            phase === "crack"
              ? "fadeIn 0.05s ease both, fadeOut 0.3s ease 0.1s both"
              : "none",
        }}
      />

      {/* Crack lines SVG */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {CRACK_LINES.map((line, i) => {
          const rad = (line.angle * Math.PI) / 180
          const x2 = line.x + Math.cos(rad) * line.length
          const y2 = line.y + Math.sin(rad) * line.length

          return (
            <line
              key={i}
              x1={`${line.x}%`}
              y1={`${line.y}%`}
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="#2C2416"
              strokeWidth={line.width}
              strokeLinecap="round"
              style={{
                opacity: phase === "crack" || phase === "shatter" ? 1 : 0,
                strokeDasharray: `${line.length} ${line.length}`,
                strokeDashoffset:
                  phase === "crack" || phase === "shatter"
                    ? 0
                    : line.length,
                transition: `stroke-dashoffset 0.3s ease ${line.delay}ms, opacity 0.1s ease ${line.delay}ms`,
              }}
            />
          )
        })}
      </svg>

      {/* Shell fragments */}
      {phase === "shatter" &&
        FRAGMENTS.map((frag, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${frag.x}%`,
              top: `${frag.y}%`,
              width: `${frag.size}px`,
              height: `${frag.size}px`,
              background: "#E8DFC8",
              borderRadius: "2px",
              border: "1px solid #2C2416",
              animation: `fragmentFly 0.6s ease ${frag.delay}ms both`,
              transform: `rotate(${frag.rotation}deg)`,
            }}
          />
        ))}
    </div>
  )
}