import { useState, useEffect, useCallback, useRef } from "react"
import { Link } from "react-router-dom"

import EggFloat from "../ui/EggFloat"
import EggMascot from "../ui/EggMascot"
import TypewriterText from "../ui/TypewriterText"
import VisitorCounter from "../ui/VisitorCounter"
import { SpecialBadge } from "../ui/Badge"
import { getAllRepos, computeStats } from "../../lib/github"
import { getFeaturedProjects } from "../../data/projects.config"
import { useTripleClick } from "../../hooks/useKeySequence"

// ─── Icons ────────────────────────────────────────────────────────────────────

function GitHubIcon({ size = 17 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function ArrowDownIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  )
}

function ArrowRightIcon({ size = 15 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function ExternalIcon({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

function MapPinIcon({ size = 15 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function GraduationIcon({ size = 15 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 10 12 5 2 10l10 5 10-5z" />
      <path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
    </svg>
  )
}

function CodeIcon({ size = 15 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

function StarIcon({ size = 15 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

// ─── Small UI Pieces ──────────────────────────────────────────────────────────

const FALLBACK_STATS = {
  totalRepos: 33,
  totalStars: 12,
  topLanguage: "Java",
  memberSince: "2025",
}

function SkillPill({ children }) {
  return (
    <span
      className="inline-flex items-center rounded-full border border-shell-border
                 bg-white/60 px-3 py-1.5 text-xs font-medium text-aged-cream
                 backdrop-blur-sm"
    >
      {children}
    </span>
  )
}

function MiniStat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-shell-border/70 bg-white/70 p-3 text-center shadow-sm">
      <div className="mb-1 flex justify-center text-yolk-gold">
        <Icon size={15} />
      </div>

      <div className="font-serif text-xl leading-none text-shell-dark">
        {value}
      </div>

      <p className="mt-1 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-aged-cream/70">
        {label}
      </p>
    </div>
  )
}

function DataBadge({ loading, live }) {
  const text = loading
    ? "Fetching GitHub…"
    : live
      ? "Live GitHub data"
      : "Cached GitHub data"

  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border border-shell-border/70
                 bg-white/60 px-3 py-1.5 text-xs text-aged-cream/70 shadow-sm backdrop-blur-sm"
    >
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

// ─── Main Hero ────────────────────────────────────────────────────────────────

export default function Hero({ onEggCouncil }) {
  const [introVisible, setIntroVisible] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)
  const [stats, setStats] = useState(FALLBACK_STATS)
  const [statsLoading, setStatsLoading] = useState(true)
  const [liveStats, setLiveStats] = useState(false)

  const nameRef = useRef(null)
  const featuredProject = getFeaturedProjects()[0]

  useTripleClick(nameRef, onEggCouncil)

  useEffect(() => {
    async function loadStats() {
      try {
        const repos = await getAllRepos()
        setStats(computeStats(repos))
        setLiveStats(true)
      } catch {
        setStats(FALLBACK_STATS)
        setLiveStats(false)
      } finally {
        setStatsLoading(false)
      }
    }

    loadStats()
  }, [])

  const handleTypewriterDone = useCallback(() => {
    setIntroVisible(true)
    setTimeout(() => setContentVisible(true), 300)
  }, [])

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center
                 overflow-hidden bg-egg-white px-6 py-24"
    >
      {/* Background texture */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(156, 138, 110, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(156, 138, 110, 0.12) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-yolk-gold/10 blur-3xl" />
        <div className="absolute top-1/3 -left-32 h-80 w-80 rounded-full bg-amber-200/20 blur-3xl" />
        <div className="absolute bottom-0 -right-32 h-80 w-80 rounded-full bg-orange-200/20 blur-3xl" />
      </div>

      <EggFloat count={12} />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        {/* Left */}
        <div className="text-center lg:text-left">
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-yolk-gold/30
                       bg-yolk-gold/10 px-4 py-2 text-sm font-medium text-yolk-gold
                       shadow-sm backdrop-blur-sm"
            style={{ animation: "fadeUp 0.6s ease both" }}
          >
            <CodeIcon size={15} />
            building real projects, not tutorial clones
          </div>

          <h1
            ref={nameRef}
            className="font-serif text-5xl text-shell-dark
                       md:text-7xl lg:text-8xl cursor-pointer select-none"
            style={{ animation: "fadeUp 0.8s ease both" }}
            title="click 3 times. you know you want to."
          >
            Srun Sochettra
          </h1>

          <p className="mt-5 min-h-[2.25rem] text-xl font-light text-aged-cream md:text-2xl">
            <TypewriterText
              text="egg guy. builder. ships fast."
              speed={55}
              delay={600}
              onComplete={handleTypewriterDone}
            />
          </p>

          <p
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-aged-cream/85
                       transition-all duration-700 lg:mx-0"
            style={{
              opacity: introVisible ? 1 : 0,
              transform: introVisible ? "none" : "translateY(8px)",
            }}
          >
            I build full-stack apps, AI tools, mobile projects, and hardware systems
            with React, Spring Boot, Flutter, PostgreSQL, and Raspberry Pi.
          </p>

          <div
            className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm text-aged-cream/75
                       transition-all duration-700 lg:justify-start"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "none" : "translateY(8px)",
            }}
          >
            <span className="inline-flex items-center gap-1.5">
              <GraduationIcon size={15} />
              Y2 IT student at NUM
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-aged-cream/40 sm:block" />

            <span className="inline-flex items-center gap-1.5">
              <MapPinIcon size={15} />
              Phnom Penh, Cambodia
            </span>
          </div>

          <div
            className="mt-7 flex flex-wrap justify-center gap-2 transition-all duration-700 lg:justify-start"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "none" : "translateY(8px)",
              transitionDelay: "80ms",
            }}
          >
            <SkillPill>React</SkillPill>
            <SkillPill>Spring Boot</SkillPill>
            <SkillPill>Flutter</SkillPill>
            <SkillPill>PostgreSQL</SkillPill>
            <SkillPill>Raspberry Pi</SkillPill>
          </div>

          <div
            className="mt-9 flex flex-col justify-center gap-3 transition-all duration-700
                       sm:flex-row lg:justify-start"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "none" : "translateY(8px)",
              transitionDelay: "140ms",
            }}
          >
            <a
              href="#projects"
              className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base"
            >
              see my work
              <ArrowDownIcon size={17} />
            </a>

            <a
              href="https://github.com/SRUN-Sochettra"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base"
            >
              <GitHubIcon size={17} />
              view my GitHub
            </a>
          </div>

          <div
            className="mt-7 transition-all duration-700"
            style={{
              opacity: contentVisible ? 1 : 0,
              transitionDelay: "220ms",
            }}
          >
            <VisitorCounter className="justify-center lg:justify-start" />
          </div>
        </div>

        {/* Right panel */}
        <div
          className="relative mx-auto w-full max-w-md transition-all duration-700"
          style={{
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? "none" : "translateY(12px) scale(0.98)",
            transitionDelay: "180ms",
          }}
        >
          <div
            className="relative overflow-hidden rounded-[2rem] border border-shell-border/70
                       bg-gradient-to-br from-white/80 via-amber-50/70 to-egg-white/90
                       p-6 shadow-xl shadow-yolk-gold/10 backdrop-blur-sm"
          >
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-yolk-gold/15 blur-3xl" />

            <div className="relative mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="section-label mb-1">snapshot</p>
                <h2 className="font-serif text-2xl text-shell-dark">
                  GitHub pulse
                </h2>
              </div>

              <EggMascot size={72} />
            </div>

            <div className="mb-4">
              <DataBadge loading={statsLoading} live={liveStats} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <MiniStat
                icon={CodeIcon}
                label="public repos"
                value={statsLoading ? "—" : stats.totalRepos}
              />

              <MiniStat
                icon={StarIcon}
                label="total stars"
                value={statsLoading ? "—" : stats.totalStars}
              />

              <MiniStat
                icon={CodeIcon}
                label="top language"
                value={statsLoading ? "—" : stats.topLanguage}
              />

              <MiniStat
                icon={GraduationIcon}
                label="member since"
                value={statsLoading ? "—" : stats.memberSince}
              />
            </div>

            {featuredProject && (
              <div className="mt-5 rounded-2xl border border-shell-border bg-white/70 p-4 shadow-sm">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-aged-cream/70">
                      featured project
                    </p>

                    <h3 className="mt-1 font-serif text-xl text-shell-dark">
                      {featuredProject.repoName}
                    </h3>
                  </div>

                  <div className="flex flex-wrap justify-end gap-1.5">
                    {featuredProject.badges?.slice(0, 2).map((badge) => (
                      <SpecialBadge key={badge} type={badge} />
                    ))}
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-aged-cream">
                  {featuredProject.tagline}
                </p>

                <div className="mt-5 flex gap-2">
                  {featuredProject.demoUrl && (
                    <a
                      href={featuredProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex flex-1 items-center justify-center gap-2 py-2.5 text-sm"
                    >
                      try it
                      <ExternalIcon size={14} />
                    </a>
                  )}

                  <Link
                    to={`/projects/${featuredProject.slug}`}
                    className="btn-secondary inline-flex flex-1 items-center justify-center gap-2 py-2.5 text-sm"
                  >
                    story
                    <ArrowRightIcon size={14} />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700"
        style={{
          opacity: contentVisible ? 1 : 0,
          transitionDelay: "300ms",
        }}
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-aged-cream/50
                     transition-colors hover:text-yolk-gold"
          aria-label="scroll down"
        >
          <span className="text-xs uppercase tracking-widest">scroll</span>

          <div style={{ animation: "bounceArrow 1.5s ease-in-out infinite" }}>
            <ArrowDownIcon size={18} />
          </div>
        </a>
      </div>
    </section>
  )
}