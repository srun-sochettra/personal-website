// ============================================
// Projects page — full showcase
// ============================================

import { useState, useCallback, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { Helmet } from "react-helmet-async"

import EggFloat from "../components/ui/EggFloat"
import SkeletonCard from "../components/ui/SkeletonCard"
import ScrollReveal from "../components/ui/ScrollReveal"
import FilterBar from "../components/projects/FilterBar"
import ProjectCard from "../components/projects/ProjectCard"
import ProjectDrawer from "../components/projects/ProjectDrawer"
import EggScanBanner from "../components/projects/EggScanBanner"

import {
  useGitHubRepos,
  useFilteredRepos,
  useCategoryCounts,
} from "../hooks/useGitHubRepos"

// ── Konami code easter egg ────────────────────

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
]

function useKonami(callback) {
  useEffect(() => {
    let index = 0

    function handler(event) {
      if (event.key === KONAMI[index]) {
        index += 1

        if (index === KONAMI.length) {
          index = 0
          callback()
        }

        return
      }

      index = event.key === KONAMI[0] ? 1 : 0
    }

    window.addEventListener("keydown", handler)

    return () => window.removeEventListener("keydown", handler)
  }, [callback])
}

// ── Icons ─────────────────────────────────────

function Icon({ name, size = 18, className = "", strokeWidth = 2 }) {
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
    folder: (
      <svg {...common}>
        <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
    ),

    alert: (
      <svg {...common}>
        <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),

    search: (
      <svg {...common}>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),

    refresh: (
      <svg {...common}>
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10" />
        <path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14" />
      </svg>
    ),

    spark: (
      <svg {...common}>
        <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3z" />
        <path d="M19 14l.9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14z" />
      </svg>
    ),

    code: (
      <svg {...common}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),

    check: (
      <svg {...common}>
        <path d="M20 6 9 17l-5-5" />
      </svg>
    ),

    close: (
      <svg {...common}>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
  }

  return icons[name] ?? null
}

// ── UI states ─────────────────────────────────

function DataStatus({ loading, error, total }) {
  const text = loading
    ? "Fetching GitHub repos…"
    : error
      ? "GitHub data unavailable"
      : `${total} repos loaded from GitHub`

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

function EmptyState({ onClear }) {
  return (
    <div
      className="col-span-full rounded-[2rem] border border-shell-border/80
                 bg-white/60 px-6 py-16 text-center shadow-sm backdrop-blur-sm"
    >
      <div
        className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-3xl
                   border border-yolk-gold/20 bg-yolk-gold/10 text-yolk-gold"
      >
        <Icon name="search" size={26} />
      </div>

      <h3 className="font-serif text-2xl text-shell-dark">
        no projects found.
      </h3>

      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-aged-cream">
        Try a different category, change the search term, or clear the filters.
      </p>

      <button
        type="button"
        onClick={onClear}
        className="btn-secondary mt-6 inline-flex items-center gap-2 text-sm"
      >
        <Icon name="close" size={14} />
        clear filters
      </button>
    </div>
  )
}

function ErrorState({ error }) {
  return (
    <div
      className="col-span-full rounded-[2rem] border border-shell-border/80
                 bg-white/60 px-6 py-16 text-center shadow-sm backdrop-blur-sm"
    >
      <div
        className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-3xl
                   border border-yolk-gold/20 bg-yolk-gold/10 text-yolk-gold"
      >
        <Icon name="alert" size={26} />
      </div>

      <h3 className="font-serif text-2xl text-shell-dark">
        GitHub is unavailable right now.
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-aged-cream">
        Repo data could not be fetched. Try refreshing the page.
      </p>

      {error && (
        <p className="mx-auto mt-3 max-w-md break-words text-xs text-aged-cream/50">
          {String(error)}
        </p>
      )}

      <button
        type="button"
        onClick={() => window.location.reload()}
        className="btn-secondary mt-6 inline-flex items-center gap-2 text-sm"
      >
        <Icon name="refresh" size={14} />
        retry
      </button>
    </div>
  )
}

function FilterSummary({
  filter,
  search,
  filteredCount,
  totalCount,
  onClear,
}) {
  const hasFilters = filter !== "All" || Boolean(search)

  if (!hasFilters) return null

  return (
    <div
      className="mb-6 flex flex-col gap-3 rounded-3xl border border-shell-border/70
                 bg-white/60 px-4 py-3 text-sm text-aged-cream shadow-sm
                 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between"
    >
      <span>
        showing{" "}
        <span className="font-medium text-shell-dark">{filteredCount}</span> of{" "}
        <span className="font-medium text-shell-dark">{totalCount}</span>{" "}
        projects
        {filter !== "All" && (
          <>
            {" "}
            · category:{" "}
            <span className="font-medium text-yolk-gold">{filter}</span>
          </>
        )}
        {search && (
          <>
            {" "}
            · search:{" "}
            <span className="font-medium text-yolk-gold">"{search}"</span>
          </>
        )}
      </span>

      <button
        type="button"
        onClick={onClear}
        className="inline-flex items-center gap-1.5 text-xs text-aged-cream
                   transition-colors hover:text-shell-dark"
      >
        <Icon name="close" size={13} />
        clear
      </button>
    </div>
  )
}

function AllLoadedMessage({ count }) {
  if (!count) return null

  return (
    <div className="col-span-full pt-4 text-center">
      <p className="text-xs text-aged-cream/45">
        end of list · {count} projects shown
      </p>
    </div>
  )
}

function FlipCard() {
  return (
    <div
      className="flex min-h-[220px] items-center justify-center rounded-3xl border
                 border-shell-dark bg-shell-dark p-6 text-center text-egg-white shadow-sm"
    >
      <div>
        <div
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl
                     border border-egg-white/15 bg-egg-white/10 text-yolk-gold"
        >
          <Icon name="spark" size={22} />
        </div>

        <p className="font-serif text-lg text-egg-white">
          easter egg unlocked
        </p>

        <p className="mt-2 text-xs leading-5 text-egg-white/60">
          Konami still works.
        </p>
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filter = searchParams.get("filter") ?? "All"
  const search = searchParams.get("search") ?? ""
  const sort = searchParams.get("sort") ?? "stars"

  const [selectedRepo, setSelectedRepo] = useState(null)
  const [flipped, setFlipped] = useState(false)

  const { repos, loading, error } = useGitHubRepos()
  const filtered = useFilteredRepos(repos, { filter, search, sort })
  const counts = useCategoryCounts(repos)

  const eggScanRepo = repos.find((repo) => repo.name === "EggScan")
  const eggScanStars =
    eggScanRepo?.stargazers_count ?? eggScanRepo?.stars ?? 0

  const showAll = filter === "All" && !search
  const showEmpty = !loading && !error && filtered.length === 0
  const showLoaded =
    showAll &&
    !loading &&
    !error &&
    filtered.length === repos.length &&
    repos.length > 0

  function updateParams(updater) {
    setSearchParams((current) => {
      const next = new URLSearchParams(current)
      updater(next)
      return next
    })
  }

  function setFilter(value) {
    updateParams((params) => {
      if (value && value !== "All") {
        params.set("filter", value)
      } else {
        params.delete("filter")
      }

      params.delete("search")
    })
  }

  function setSearch(value) {
    updateParams((params) => {
      const trimmed = value.trim()

      if (trimmed) {
        params.set("search", trimmed)
      } else {
        params.delete("search")
      }
    })
  }

  function setSort(value) {
    updateParams((params) => {
      if (value && value !== "stars") {
        params.set("sort", value)
      } else {
        params.delete("sort")
      }
    })
  }

  function clearAll() {
    setSearchParams({})
  }

  const selectedIndex = selectedRepo
    ? filtered.findIndex((repo) => repo.name === selectedRepo.name)
    : -1

  function openDrawer(repo) {
    setSelectedRepo(repo)
  }

  function closeDrawer() {
    setSelectedRepo(null)
  }

  function goNext() {
    if (selectedIndex < filtered.length - 1) {
      setSelectedRepo(filtered[selectedIndex + 1])
    }
  }

  function goPrev() {
    if (selectedIndex > 0) {
      setSelectedRepo(filtered[selectedIndex - 1])
    }
  }

  const handleKonami = useCallback(() => {
    setFlipped(true)
    window.setTimeout(() => setFlipped(false), 3000)
  }, [])

  useKonami(handleKonami)

  return (
    <>
      <Helmet>
        <title>Projects — Sochettra</title>
        <meta
          name="description"
          content="Projects by Srun Sochettra — full-stack, AI, mobile, Java, web, and hardware builds."
        />
      </Helmet>

      {/* Header */}
      <section
        className="relative overflow-hidden bg-egg-white px-6 pb-10 pt-16
                   before:pointer-events-none before:absolute before:inset-0
                   before:bg-[radial-gradient(circle_at_top,rgba(245,184,0,0.10),transparent_34%)]"
      >
        <EggFloat count={6} />

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <ScrollReveal>
            <p className="section-label">the work</p>

            <h1 className="mb-4 font-serif text-5xl text-shell-dark md:text-6xl">
              things I've built
            </h1>

            <p className="mx-auto max-w-2xl text-lg leading-7 text-aged-cream">
              Full-stack apps, AI tools, mobile projects, Java coursework,
              hardware systems, and weird useful experiments.
            </p>

            <div className="mt-5">
              <DataStatus loading={loading} error={error} total={repos.length} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Filter bar */}
      <FilterBar
        filter={filter}
        onFilter={setFilter}
        search={search}
        onSearch={setSearch}
        sort={sort}
        onSort={setSort}
        counts={counts}
      />

      {/* Main content */}
      <main className="relative mx-auto max-w-6xl px-6 py-8">
        {showAll && !loading && !error && (
          <ScrollReveal>
            <EggScanBanner stars={eggScanStars} />
          </ScrollReveal>
        )}

        <FilterSummary
          filter={filter}
          search={search}
          filteredCount={filtered.length}
          totalCount={repos.length}
          onClear={clearAll}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {loading &&
            Array.from({ length: 9 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}

          {error && !loading && <ErrorState error={error} />}

          {showEmpty && <EmptyState onClear={clearAll} />}

          {!loading &&
            !error &&
            filtered.map((repo, index) => (
              <div
                key={repo.id ?? repo.name}
                style={{
                  opacity: 0,
                  animation: `fadeUp 0.4s ease ${Math.min(
                    index * 40,
                    400
                  )}ms both`,
                  transform: flipped ? "rotateY(180deg)" : "none",
                  transition: "transform 0.6s ease",
                  perspective: "1000px",
                }}
              >
                {flipped ? (
                  <div style={{ transform: "rotateY(180deg)" }}>
                    <FlipCard />
                  </div>
                ) : (
                  <ProjectCard repo={repo} onClick={openDrawer} />
                )}
              </div>
            ))}

          {showLoaded && <AllLoadedMessage count={repos.length} />}
        </div>
      </main>

      {/* Drawer */}
      <ProjectDrawer
        repo={selectedRepo}
        onClose={closeDrawer}
        onNext={selectedIndex < filtered.length - 1 ? goNext : null}
        onPrev={selectedIndex > 0 ? goPrev : null}
      />
    </>
  )
}