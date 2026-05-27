import { useState, useEffect } from "react"
import ScrollReveal from "../ui/ScrollReveal"
import { useScrollReveal } from "../../hooks/useScrollReveal"
import { useCountUp } from "../../hooks/useCountUp"
import { getAllRepos, computeStats } from "../../lib/github"

// ─── Icons ────────────────────────────────────────────────────────────────────

function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function ForkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="6" r="3" />
      <path d="M6 9v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9" />
      <line x1="12" y1="12" x2="12" y2="15" />
    </svg>
  )
}

function CodeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function StatSkeleton() {
  return (
    <div className="
      relative overflow-hidden rounded-3xl border border-shell-border/60
      bg-white/60 p-5 shadow-sm animate-pulse
    ">
      <div className="mx-auto mb-5 h-12 w-12 rounded-2xl bg-shell-border/70" />
      <div className="mx-auto mb-3 h-8 w-16 rounded-lg bg-shell-border/70" />
      <div className="mx-auto h-3 w-24 rounded bg-shell-border/60" />

      <div className="
        absolute inset-0 -translate-x-full bg-gradient-to-r
        from-transparent via-white/50 to-transparent
        animate-[shimmer_1.6s_infinite]
      " />
    </div>
  )
}

// ─── Single Stat Card ─────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, suffix = "", delay }) {
  const { ref, isVisible } = useScrollReveal()
  const isNumeric = typeof value === "number"

  const animated = useCountUp(isNumeric ? value : 0, {
    duration: 1400,
    enabled: isVisible,
  })

  return (
    <ScrollReveal delay={delay}>
      <div
        ref={ref}
        className="
          group relative overflow-hidden rounded-3xl border border-shell-border/70
          bg-white/70 p-5 text-center shadow-sm backdrop-blur-sm
          transition-all duration-300 ease-out
          hover:-translate-y-1 hover:border-yolk-gold/35 hover:bg-white/90
          hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)]
        "
      >
        {/* Soft background glow */}
        <div className="
          pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full
          bg-yolk-gold/10 blur-2xl transition-opacity duration-300
          group-hover:bg-yolk-gold/20
        " />

        {/* Top shine */}
        <div className="
          pointer-events-none absolute inset-x-0 top-0 h-px
          bg-gradient-to-r from-transparent via-yolk-gold/40 to-transparent
          opacity-0 transition-opacity duration-300 group-hover:opacity-100
        " />

        {/* Icon */}
        <div className="mb-5 flex justify-center">
          <div className="
            relative flex h-12 w-12 items-center justify-center rounded-2xl
            border border-yolk-gold/20 bg-yolk-gold/10 text-yolk-gold
            shadow-[0_8px_24px_rgba(0,0,0,0.04)]
            transition-all duration-300
            group-hover:scale-110 group-hover:bg-yolk-gold/15
          ">
            <Icon />
          </div>
        </div>

        {/* Value */}
        <div className="
          font-serif text-3xl leading-none text-shell-dark tabular-nums
          sm:text-4xl
        ">
          {isNumeric ? `${animated}${suffix}` : value}
        </div>

        {/* Label */}
        <p className="
          mt-3 text-[0.68rem] font-medium uppercase tracking-[0.22em]
          text-aged-cream/80
        ">
          {label}
        </p>
      </div>
    </ScrollReveal>
  )
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ loading, live }) {
  const text = loading
    ? "Fetching from GitHub API…"
    : live
      ? "Live data · updates every visit"
      : "Showing cached data"

  return (
    <div className="
      mt-5 inline-flex items-center gap-2 rounded-full border border-shell-border/70
      bg-white/60 px-4 py-2 text-xs text-aged-cream/70 shadow-sm backdrop-blur-sm
    ">
      {loading ? (
        <span className="h-1.5 w-1.5 rounded-full bg-yolk-gold animate-pulse" />
      ) : live ? (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
        </span>
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-aged-cream/50" />
      )}

      <span>{text}</span>
    </div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────

const FALLBACK_STATS = {
  totalRepos: 33,
  totalStars: 12,
  topLanguage: "Java",
  memberSince: "2025",
}

export default function GitHubStats() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [live, setLive] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const repos = await getAllRepos()
        setStats(computeStats(repos))
        setLive(true)
      } catch {
        setStats(FALLBACK_STATS)
        setLive(false)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const cards = [
    {
      icon: ForkIcon,
      label: "public repos",
      value: stats?.totalRepos ?? 0,
      delay: 0,
    },
    {
      icon: StarIcon,
      label: "total stars",
      value: stats?.totalStars ?? 0,
      delay: 80,
    },
    {
      icon: CodeIcon,
      label: "top language",
      value: stats?.topLanguage ?? "—",
      delay: 160,
    },
    {
      icon: CalendarIcon,
      label: "member since",
      value: stats?.memberSince ?? "—",
      delay: 240,
    },
  ]

  return (
    <section className="
      section relative overflow-hidden bg-egg-white
      before:pointer-events-none before:absolute before:inset-0
      before:bg-[radial-gradient(circle_at_top,rgba(245,184,0,0.10),transparent_36%)]
    ">
      <div className="section-inner relative z-10">

        {/* Header */}
        <ScrollReveal className="mx-auto mb-12 max-w-2xl text-center">
          <p className="section-label">by the numbers</p>

          <h2 className="section-heading">
            GitHub stats
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-aged-cream/70">
            A quick snapshot of my public GitHub activity, fetched directly from
            the GitHub API when available.
          </p>

          <StatusBadge loading={loading} live={live} />
        </ScrollReveal>

        {/* Grid */}
        <div className="
          grid grid-cols-2 gap-4
          sm:gap-5
          md:grid-cols-4
        ">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <StatSkeleton key={i} />
              ))
            : cards.map((card) => (
                <StatCard key={card.label} {...card} />
              ))
          }
        </div>

      </div>
    </section>
  )
}