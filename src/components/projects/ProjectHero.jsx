// ============================================
// ProjectHero — top section of detail page
// ============================================

import { Link } from "react-router-dom"
import {
  LanguageBadge,
  CategoryBadge,
  StatusBadge,
  SpecialBadge,
} from "../ui/Badge"

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

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
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="#D4A847"
      stroke="#D4A847"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function ForkIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="12" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="6" r="3" />
      <path d="M6 9v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9" />
      <line x1="12" y1="12" x2="12" y2="15" />
    </svg>
  )
}

function ArrowLeftIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  )
}

// ── Right side visual — adapts to project type ──

function ProjectVisual({ config, repo }) {
  // Screenshots first
  if (config?.screenshots?.length > 0) {
    return (
      <div className="rounded-2xl overflow-hidden border border-shell-border shadow-card">
        <img
          src={config.screenshots[0]}
          alt={`${config.repoName ?? repo?.name ?? "Project"} screenshot`}
          className="w-full object-cover"
        />
      </div>
    )
  }

  // Hardware badge — show a placeholder
  if (config?.badges?.includes("hardware")) {
    return (
      <div className="rounded-2xl border border-shell-border bg-gradient-to-br from-orange-50 to-amber-50/30 p-8 text-center">
        <div className="text-6xl mb-4">🔧</div>
        <p className="text-aged-cream text-sm">hardware project</p>
        <p className="text-xs text-aged-cream/60 mt-1">
          real hardware. real circuits. it actually worked.
        </p>
      </div>
    )
  }

  // Fast ship badge
  if (config?.badges?.includes("fast-ship")) {
    return (
      <div className="rounded-2xl border border-yolk-gold/30 bg-gradient-to-br from-amber-50/50 to-egg-white p-8 text-center">
        <div className="text-6xl mb-4 animate-bob inline-block">🥚</div>

        <div className="font-serif text-2xl text-shell-dark mb-2">
          built in one day
        </div>

        <p className="text-aged-cream text-sm leading-relaxed">
          conceived, built, and deployed in a single session. no tutorial
          followed. just building.
        </p>

        <div className="mt-6 pt-4 border-t border-shell-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="font-serif text-2xl text-yolk-gold">1</div>
              <div className="text-xs text-aged-cream">day</div>
            </div>

            <div>
              <div className="font-serif text-2xl text-yolk-gold">0</div>
              <div className="text-xs text-aged-cream">tutorials</div>
            </div>

            <div>
              <div className="font-serif text-2xl text-yolk-gold">∞</div>
              <div className="text-xs text-aged-cream">eggs</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Default — code snippet style card
  return (
    <div className="rounded-2xl border border-shell-border overflow-hidden shadow-card">
      <div className="bg-shell-dark px-4 py-3 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-400/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
        <div className="w-3 h-3 rounded-full bg-green-400/60" />

        <span className="text-egg-white/30 text-xs ml-2 font-mono">
          {repo?.name ?? "project"}
        </span>
      </div>

      <div className="bg-shell-dark p-6 font-mono text-sm leading-relaxed">
        <div className="text-aged-cream/40 mb-1">
          // {repo?.language ?? "code"}
        </div>

        <div className="text-yolk-gold">const</div>

        <div className="text-egg-white ml-4">
          <span className="text-blue-300">{repo?.name ?? "project"}</span>
          <span className="text-egg-white/60"> = </span>
          <span className="text-green-300">{"{"}</span>
        </div>

        <div className="text-egg-white/70 ml-8 text-xs space-y-1 mt-1">
          <div>
            <span className="text-aged-cream">built</span>:{" "}
            <span className="text-green-300">
              "{config?.builtDate ?? "2026"}"
            </span>
            ,
          </div>

          <div>
            <span className="text-aged-cream">status</span>:{" "}
            <span className="text-green-300">
              "{config?.status ?? "shipped"}"
            </span>
            ,
          </div>

          <div>
            <span className="text-aged-cream">category</span>:{" "}
            <span className="text-green-300">
              "{config?.category ?? "project"}"
            </span>
            ,
          </div>

          <div>
            <span className="text-aged-cream">eggs</span>:{" "}
            <span className="text-yolk-gold">Infinity</span>,
          </div>
        </div>

        <div className="text-green-300 ml-4">{"}"}</div>
      </div>
    </div>
  )
}

export default function ProjectHero({ repo, config }) {
  if (!repo && !config) return null

  const name = config?.repoName ?? repo?.name ?? "Project"
  const tagline = config?.tagline ?? repo?.tagline ?? repo?.description ?? ""
  const stars = repo?.stars ?? 0
  const forks = repo?.forks ?? 0
  const language = repo?.language ?? null
  const category = config?.category ?? repo?.category ?? "Other"
  const status = config?.status ?? repo?.status ?? "shipped"
  const badges = config?.badges ?? repo?.badges ?? []
  const demoUrl = config?.demoUrl ?? repo?.demoUrl ?? repo?.homepage ?? null
  const htmlUrl =
    repo?.htmlUrl ?? `https://github.com/SRUN-Sochettra/${name}`
  const builtDate = config?.builtDate ?? repo?.builtDate ?? null
  const timeAgo = repo?.timeAgo ?? null

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-yolk-gold/5 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 py-10 md:py-14">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-aged-cream hover:text-shell-dark transition-colors mb-8"
        >
          <ArrowLeftIcon />
          Back to projects
        </Link>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {language && <LanguageBadge language={language} />}
              {category && <CategoryBadge category={category} />}
              {status && <StatusBadge status={status} />}

              {badges.map(badge => (
                <SpecialBadge key={badge} badge={badge} />
              ))}
            </div>

            <h1 className="font-serif text-4xl md:text-6xl text-shell-dark leading-tight tracking-tight">
              {name}
            </h1>

            {tagline && (
              <p className="mt-5 text-lg md:text-xl text-aged-cream leading-relaxed max-w-2xl">
                {tagline}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-aged-cream">
              <span className="inline-flex items-center gap-1.5">
                <StarIcon />
                {stars}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <ForkIcon />
                {forks}
              </span>

              {builtDate && <span>built {builtDate}</span>}
              {timeAgo && <span>{timeAgo}</span>}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {htmlUrl && (
                <a
                  href={htmlUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-shell-dark text-egg-white px-5 py-3 text-sm font-medium hover:bg-shell-dark/90 transition-colors"
                >
                  <GitHubIcon />
                  View code
                </a>
              )}

              {demoUrl && (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-shell-border bg-egg-white px-5 py-3 text-sm font-medium text-shell-dark hover:border-yolk-gold/60 hover:bg-yolk-gold/5 transition-colors"
                >
                  <ExternalIcon />
                  Live demo
                </a>
              )}
            </div>
          </div>

          <ProjectVisual config={config} repo={repo} />
        </div>
      </div>
    </section>
  )
}