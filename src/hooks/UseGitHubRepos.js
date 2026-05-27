// ============================================
// useGitHubRepos — unified data layer (clean)
// ============================================

import { useState, useEffect, useMemo } from "react"
import { getProjects } from "../lib/projects"

export function useGitHubRepos() {
  const [repos, setRepos]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const projects = await getProjects()
        setRepos(projects)
      } catch (err) {
        console.error("[useGitHubRepos]", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return { repos, loading, error }
}

//
// ── Filter + search + sort ───────────────────
//
export function useFilteredRepos(repos, { filter, search, sort }) {
  return useMemo(() => {
    let result = [...repos]

    // ✅ Category filter
    if (filter && filter !== "All") {
      result = result.filter(r => r.category === filter)
    }

    // ✅ Search (name + tagline + description + topics)
    if (search && search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.tagline?.toLowerCase().includes(q) ||
        r.description?.toLowerCase().includes(q) ||
        r.topics?.some(t => t.toLowerCase().includes(q))
      )
    }

    // ✅ Sorting
    switch (sort) {
      case "stars":
        result.sort((a, b) => b.stars - a.stars)
        break

      case "updated":
        result.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        break

      case "alpha":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break

      case "category":
        result.sort((a, b) => a.category.localeCompare(b.category))
        break

      default:
        break
    }

    return result
  }, [repos, filter, search, sort])
}

//
// ── Category counts ───────────────────────────
//
export function useCategoryCounts(repos) {
  return useMemo(() => {
    const counts = { All: repos.length }

    repos.forEach(r => {
      counts[r.category] = (counts[r.category] ?? 0) + 1
    })

    return counts
  }, [repos])
}