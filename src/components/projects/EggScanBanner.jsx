import { useState, useEffect, useRef } from "react"

// ───────────────── Icons ─────────────────

function ExternalIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2.25l2.954 5.984 6.604.96-4.779 4.657 1.128 6.577L12 17.322l-5.907 3.106 1.128-6.577-4.779-4.657 6.604-.96L12 2.25z" />
    </svg>
  )
}

// ───────────────── Main Banner ─────────────────

export default function EggScanBanner() {
  const [stars, setStars] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    fetch("https://api.github.com/repos/SRUN-Sochettra/EggScan")
      .then(r => r.json())
      .then(d => setStars(d.stargazers_count || 0))
      .catch(() => setStars(0))
  }, [])

  function handleMove(e) {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ref.current.style.setProperty("--x", `${x}px`)
    ref.current.style.setProperty("--y", `${y}px`)
  }

  return (
    <section
      ref={ref}
      onMouseMove={handleMove}
      className="
        group relative mb-8 overflow-hidden rounded-[28px]
        border border-yellow-400/15
        bg-[#120b03]
        shadow-[0_30px_80px_rgba(0,0,0,0.35)]
      "
      style={{
        background:
          "radial-gradient(circle at var(--x,50%) var(--y,50%), rgba(255,196,0,0.22), transparent 34%), linear-gradient(135deg,#2c1f0b 0%,#171006 48%,#070503 100%)",
      }}
    >
      {/* Glow blobs */}
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-yellow-400/20 blur-3xl transition duration-700 group-hover:bg-yellow-400/25" />
      <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

      {/* Grid overlay */}
      <div
        className="
          absolute inset-0 opacity-[0.08]
          [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)]
          [background-size:42px_42px]
        "
      />

      {/* Dark glass overlay */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 px-6 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
        <div className="max-w-3xl">
          {/* Badges */}
          <div className="mb-5 flex flex-wrap gap-2">
            <span className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-yellow-300">
              flagship
            </span>

            <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
              fast build
            </span>

            <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
              2026
            </span>
          </div>

          {/* Title */}
          <h2 className="mb-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
            EggScan
          </h2>

          {/* Description */}
          <p className="mb-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Rate any GitHub profile in eggs. A playful developer tool powered by
            the GitHub API, built fast, shipped clean, and designed with a
            golden dark interface.
          </p>

          {/* Tech stack */}
          <div className="mb-7 flex flex-wrap gap-2">
            {["React", "GitHub API", "Tailwind", "Vercel", "Profile Scoring"].map(
              item => (
                <span
                  key={item}
                  className="
                    rounded-full border border-white/10
                    bg-white/[0.07] px-3 py-1.5
                    text-xs font-medium text-white/70
                    backdrop-blur
                    transition hover:border-yellow-400/30 hover:bg-yellow-400/10 hover:text-yellow-200
                  "
                >
                  {item}
                </span>
              )
            )}
          </div>

          {/* Meta */}
          <div className="mb-7 flex flex-wrap items-center gap-3 text-sm text-white/55">
            <span className="flex items-center gap-1.5 text-yellow-300">
              <StarIcon />
              {stars} stars
            </span>

            <span className="h-1 w-1 rounded-full bg-white/30" />

            <span>shipped in one day</span>

            <span className="h-1 w-1 rounded-full bg-white/30" />

            <span>developer project</span>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <a
              href="https://eggscan.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex items-center gap-2 rounded-xl
                bg-yellow-400 px-5 py-2.5
                text-sm font-bold text-black
                shadow-[0_12px_30px_rgba(250,204,21,0.25)]
                transition
                hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-[0_16px_40px_rgba(250,204,21,0.35)]
                active:translate-y-0
              "
            >
              try it live
              <ExternalIcon />
            </a>

            <a
              href="https://github.com/SRUN-Sochettra/EggScan"
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex items-center gap-2 rounded-xl
                border border-white/15 bg-white/[0.06]
                px-5 py-2.5
                text-sm font-semibold text-white/75
                backdrop-blur
                transition
                hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.1] hover:text-white
                active:translate-y-0
              "
            >
              <GitHubIcon />
              GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Bottom shine */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />
    </section>
  )
}