// ============================================
// FilterBar — sticky, tabs + search + sort
// ============================================

import { useRef, useEffect, useState } from "react"
import { CATEGORIES } from "../../data/projects.config"

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round"
         className="text-aged-cream">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  )
}

const SORT_OPTIONS = [
  { value: "stars",    label: "Most stars"       },
  { value: "updated",  label: "Recently updated"  },
  { value: "alpha",    label: "Alphabetical"      },
  { value: "category", label: "Category"          },
]

export default function FilterBar({
  filter, onFilter,
  search, onSearch,
  sort,   onSort,
  counts,
}) {
  const [isStuck, setIsStuck]     = useState(false)
  const [sortOpen, setSortOpen]   = useState(false)
  const sentinelRef = useRef(null)
  const sortRef     = useRef(null)

  // Detect when filter bar becomes sticky
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { threshold: 1, rootMargin: "-64px 0px 0px 0px" }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  // Close sort dropdown on outside click
  useEffect(() => {
    function handler(e) {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setSortOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const currentSortLabel = SORT_OPTIONS.find(o => o.value === sort)?.label ?? "Most stars"

  return (
    <>
      {/* Sentinel — invisible div to detect scroll position */}
      <div ref={sentinelRef} className="h-px" />

      <div
        className={`sticky top-16 z-40 bg-egg-white/95 backdrop-blur-sm
                    transition-shadow duration-200 py-4 px-6
                    ${isStuck ? "shadow-sm border-b border-shell-border" : ""}`}
      >
        <div className="max-w-6xl mx-auto">

          {/* Top row — search + sort */}
          <div className="flex items-center gap-3 mb-4">

            {/* Search */}
            <div className="relative flex-1 max-w-xs">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                value={search}
                onChange={e => onSearch(e.target.value)}
                placeholder="search projects..."
                className="w-full pl-9 pr-4 py-2 text-sm rounded-lg
                           border border-shell-border bg-egg-white
                           text-shell-dark placeholder:text-aged-cream/50
                           focus:outline-none focus:ring-2 focus:ring-yolk-gold/40
                           focus:border-yolk-gold/60 transition-colors"
              />
              {search && (
                <button
                  onClick={() => onSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2
                             text-aged-cream hover:text-shell-dark transition-colors text-lg leading-none"
                >
                  ×
                </button>
              )}
            </div>

            {/* Sort dropdown */}
            <div ref={sortRef} className="relative ml-auto">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg
                           border border-shell-border text-aged-cream
                           hover:border-yolk-gold/40 hover:text-shell-dark
                           transition-colors bg-egg-white"
              >
                <span className="hidden sm:block">Sort: </span>
                <span className="text-shell-dark font-medium">{currentSortLabel}</span>
                <ChevronIcon />
              </button>

              {sortOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-egg-white
                                border border-shell-border rounded-xl shadow-lg
                                overflow-hidden z-50">
                  {SORT_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => { onSort(opt.value); setSortOpen(false) }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors
                        ${sort === opt.value
                          ? "bg-yolk-gold/10 text-yolk-gold font-medium"
                          : "text-aged-cream hover:bg-shell-border/30 hover:text-shell-dark"
                        }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Filter tabs — horizontally scrollable on mobile */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none"
               style={{ scrollbarWidth: "none" }}>
            {CATEGORIES.map(cat => {
              const count = counts?.[cat] ?? 0
              const active = filter === cat

              return (
                <button
                  key={cat}
                  onClick={() => onFilter(cat)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5
                              rounded-full text-sm font-medium border transition-all duration-150
                    ${active
                      ? "bg-yolk-gold text-shell-dark border-yolk-gold shadow-sm"
                      : "bg-egg-white text-aged-cream border-shell-border hover:border-yolk-gold/40 hover:text-shell-dark"
                    }`}
                >
                  {cat}
                  {count > 0 && (
                    <span className={`text-xs rounded-full px-1.5 py-0.5
                      ${active ? "bg-shell-dark/20" : "bg-shell-border text-aged-cream"}`}>
                      {count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

        </div>
      </div>
    </>
  )
}