import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import ScrollReveal from "../ui/ScrollReveal"
import SkeletonCard from "../ui/SkeletonCard"
import { LanguageBadge, SpecialBadge } from "../ui/Badge"
import { getAllRepos, timeAgo } from "../../lib/github"
import { getFeaturedProjects } from "../../data/projects.config"

// ─── Icons ────────────────────────────────────────────────────────────────────

function Icon({ name, size = 15, className = "", strokeWidth = 2 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": "true",
  }

  const icons = {
    star: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),

    github: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-hidden="true"
      >
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),

    external: (
      <svg {...common}>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    ),

    arrowRight: (
      <svg {...common}>
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    ),

    folder: (
      <svg {...common}>
        <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
    ),

    calendar: (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),

    status: (
      <svg {...common}>
        <path d="M20 6 9 17l-5-5" />
      </svg>
    ),

    alert: (
      <svg {...common}>
        <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  }

  return icons[name] ?? null
}

// ─── Small UI ─────────────────────────────────────────────────────────────────

function StatPill({ stars, updated }) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-aged-cream">
      <span className="inline-flex items-center gap-1.5">
        <Icon name="star" size={14} className="text-yolk-gold" />
        <span>{stars}</span>
      </span>

      {updated && (
        <>
          <span className="h-3 w-px bg-shell-border" />
          <span>updated {updated}</span>
        </>
      )}
    </div>
  )
}

function MetaPill({ icon, label }) {
  if (!label) return null

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border border-shell-border/70
                 bg-white/60 px-2.5 py-1 text-xs font-medium text-aged-cream
                 backdrop-blur-sm"
    >
      <Icon name={icon} size={12} />
      {label}
    </span>
  )
}

function DataStatus({ loading, error }) {
  const text = loading
    ? "Fetching GitHub repos…"
    : error
      ? "GitHub data unavailable"
      : "Live GitHub data"

  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border border-shell-border/70
                 bg-white/60 px-3 py-1.5 text-xs text-aged-cream/70 shadow-sm backdrop-blur-sm"
    >
      {loading ? (
        <span className="h-1.5 w-1.5 rounded-full bg-yolk-gold animate-pulse" />
      ) : error ? (
        <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
      ) : (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
        </span>
      )}

      <span>{text}</span>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="col-span-full rounded-3xl border border-shell-border/70 bg-white/60 p-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-shell-border bg-white/70 text-yolk-gold">
        <Icon name="folder" size={24} />
      </div>

      <p className="font-serif text-xl text-shell-dark">No featured projects yet.</p>

      <p className="mt-2 text-sm text-aged-cream">
        Add <code className="rounded bg-shell-border/40 px-1">featured: true</code> to a project config.
      </p>
    </div>
  )
}

function ErrorState() {
  return (
    <div
      className="col-span-full flex flex-col items-center justify-center rounded-3xl
                 border border-shell-border/70 bg-white/60 px-6 py-12 text-center shadow-sm"
    >
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl
                   border border-shell-border bg-white/70 text-yolk-gold"
      >
        <Icon name="alert" size={24} strokeWidth={1.8} />
      </div>

      <p className="font-serif text-xl text-shell-dark">Couldn’t fetch repo data.</p>

      <p className="mt-2 max-w-sm text-sm leading-6 text-aged-cream">
        The project config still exists, but GitHub stats are unavailable right now.
      </p>

      <button
        type="button"
        onClick={() => window.location.reload()}
        className="btn-ghost mt-4 text-xs"
      >
        try again
      </button>
    </div>
  )
}

// ─── Hero Card ────────────────────────────────────────────────────────────────

function HeroCard({ config, repo }) {
  const stars = repo?.stargazers_count ?? 0
  const updated = repo?.pushed_at ? timeAgo(repo.pushed_at) : null
  const lang = repo?.language ?? null

  return (
    <ScrollReveal delay={0} className="col-span-full">
      <article
        className="group relative overflow-hidden rounded-[2rem] border border-yolk-gold/35
                   bg-gradient-to-br from-white/85 via-egg-white to-amber-50/55
                   p-6 shadow-sm backdrop-blur-sm transition-all duration-300
                   hover:-translate-y-1 hover:border-yolk-gold/55
                   hover:shadow-xl hover:shadow-yolk-gold/10"
      >
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full
                     bg-yolk-gold/10 blur-3xl transition-colors duration-500
                     group-hover:bg-yolk-gold/20"
        />

        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px
                     bg-gradient-to-r from-transparent via-yolk-gold/40 to-transparent"
        />

        <div className="relative grid gap-8 lg:grid-cols-[1fr_260px] lg:items-center">
          {/* Content */}
          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {config.badges?.map((badge) => (
                <SpecialBadge key={badge} type={badge} />
              ))}

              {lang && <LanguageBadge language={lang} />}
            </div>

            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-aged-cream/60">
              featured project
            </p>

            <h3
              className="font-serif text-3xl leading-tight text-shell-dark transition-colors
                         duration-200 group-hover:text-yolk-gold sm:text-4xl"
            >
              {config.repoName}
            </h3>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-aged-cream">
              {config.tagline ?? repo?.description ?? "No description yet."}
            </p>

            <div className="mt-5">
              <StatPill stars={stars} updated={updated} />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {config.demoUrl && (
                <a
                  href={config.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 text-sm"
                >
                  try it live
                  <Icon name="external" size={13} />
                </a>
              )}

              <a
                href={`https://github.com/SRUN-Sochettra/${config.repoName}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2 text-sm"
              >
                <Icon name="github" size={14} />
                view source
              </a>

              <Link
                to={`/projects/${config.slug}`}
                className="btn-ghost inline-flex items-center gap-1.5 text-sm"
              >
                full story
                <Icon name="arrowRight" size={15} />
              </Link>
            </div>
          </div>

          {/* Metadata panel */}
          <aside
            className="rounded-3xl border border-shell-border/70 bg-white/60 p-4 shadow-sm
                       backdrop-blur-sm"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-yolk-gold/20 bg-yolk-gold/10 text-yolk-gold">
              <Icon name="folder" size={24} />
            </div>

            <p className="font-serif text-xl text-shell-dark">{config.category}</p>

            <p className="mt-1 text-sm leading-6 text-aged-cream/75">
              Pulled from your project config and enriched with live GitHub repo data.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <MetaPill icon="status" label={config.status} />
              <MetaPill icon="calendar" label={config.builtDate} />
              <MetaPill icon="star" label={`${stars} stars`} />
            </div>
          </aside>
        </div>
      </article>
    </ScrollReveal>
  )
}

// ─── Regular Card ─────────────────────────────────────────────────────────────

function RegularCard({ config, repo, index }) {
  const stars = repo?.stargazers_count ?? 0
  const updated = repo?.pushed_at ? timeAgo(repo.pushed_at) : null
  const lang = repo?.language ?? null

  return (
    <ScrollReveal delay={index * 80}>
      <article className="h-full">
        <Link to={`/projects/${config.slug}`} className="group block h-full">
          <div
            className="relative flex h-full flex-col overflow-hidden rounded-3xl border
                       border-shell-border/80 bg-white/65 p-5 shadow-sm backdrop-blur-sm
                       transition-all duration-300 hover:-translate-y-1
                       hover:border-yolk-gold/40 hover:bg-white/80
                       hover:shadow-xl hover:shadow-yolk-gold/5"
          >
            <div
              className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full
                         bg-yolk-gold/5 blur-3xl transition-colors duration-300
                         group-hover:bg-yolk-gold/12"
            />

            <div className="relative flex h-full flex-col">
              <div className="mb-4 flex items-start justify-between gap-2">
                <div className="flex min-w-0 flex-wrap gap-1.5">
                  {config.badges?.slice(0, 1).map((badge) => (
                    <SpecialBadge key={badge} type={badge} />
                  ))}

                  <MetaPill icon="folder" label={config.category} />
                </div>

                {lang && <LanguageBadge language={lang} />}
              </div>

              <h3
                className="font-serif text-lg leading-snug text-shell-dark transition-colors
                           duration-150 group-hover:text-yolk-gold"
              >
                {config.repoName}
              </h3>

              <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-aged-cream">
                {config.tagline ?? repo?.description ?? "No description yet."}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <MetaPill icon="status" label={config.status} />
                <MetaPill icon="calendar" label={config.builtDate} />
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-shell-border/80 pt-4">
                <StatPill stars={stars} updated={updated} />

                <span
                  className="inline-flex items-center gap-1 text-xs text-yolk-gold/65
                             transition-colors duration-150 group-hover:text-yolk-gold"
                >
                  view
                  <Icon name="arrowRight" size={15} />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </article>
    </ScrollReveal>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function FeaturedProjects() {
  const [repos, setRepos] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const featured = getFeaturedProjects()

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const allRepos = await getAllRepos()
        const repoMap = Object.fromEntries(allRepos.map((repo) => [repo.name, repo]))

        if (!cancelled) {
          setRepos(repoMap)
          setError(false)
        }
      } catch (err) {
        console.error(err)

        if (!cancelled) {
          setError(true)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section
      id="projects"
      className="section relative overflow-hidden bg-gradient-to-b from-amber-50/20 via-egg-white to-egg-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-yolk-gold/7 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-amber-200/15 blur-3xl" />
      </div>

      <div className="section-inner relative z-10">
        <ScrollReveal className="mx-auto mb-12 max-w-2xl text-center">
          <p className="section-label">selected work</p>

          <h2 className="section-heading">things I've built</h2>

          <p className="section-subheading mx-auto mt-3">
            Real projects, real problems, and the occasional thing nobody asked for.
          </p>

          <div className="mt-5">
            <DataStatus loading={loading} error={error} />
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : error ? (
            <ErrorState />
          ) : featured.length === 0 ? (
            <EmptyState />
          ) : (
            featured.map((config, index) =>
              index === 0 ? (
                <HeroCard
                  key={config.slug}
                  config={config}
                  repo={repos[config.repoName]}
                />
              ) : (
                <RegularCard
                  key={config.slug}
                  config={config}
                  repo={repos[config.repoName]}
                  index={index}
                />
              )
            )
          )}
        </div>

        {!loading && !error && featured.length > 0 && (
          <ScrollReveal className="mt-12 text-center">
            <Link
              to="/projects"
              className="btn-secondary inline-flex items-center gap-2 text-sm"
            >
              see all projects
              <Icon name="arrowRight" size={15} />
            </Link>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}