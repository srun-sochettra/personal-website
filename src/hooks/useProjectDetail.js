// ============================================
// useProjectDetail — loads one project's full data
// Uses the same data layer as the projects page
// ============================================

import { useState, useEffect } from "react"
import { getProjects } from "../lib/projects"
import { projectsConfig } from "../data/projects.config"

export function useProjectDetail(slug) {
  const [state, setState] = useState({
    repo: null,
    config: null,
    related: [],
    loading: true,
    notFound: false,
  })

  useEffect(() => {
    if (!slug) return

    let cancelled = false

    async function load() {
      setState(prev => ({ ...prev, loading: true, notFound: false }))

      try {
        // Use the same data source as the projects page
        const allProjects = await getProjects()

        // Strategy 1: exact slug match
        let project = allProjects.find(p => p.slug === slug)

        // Strategy 2: case-insensitive slug match
        if (!project) {
          project = allProjects.find(
            p => p.slug?.toLowerCase() === slug.toLowerCase()
          )
        }

        // Strategy 3: match by repo name directly
        if (!project) {
          project = allProjects.find(
            p =>
              p.name?.toLowerCase() === slug.toLowerCase() ||
              p.repoName?.toLowerCase() === slug.toLowerCase()
          )
        }

        // Strategy 4: match with hyphens/underscores normalized
        if (!project) {
          const normalized = slug.toLowerCase().replace(/[-_]/g, "")

          project = allProjects.find(
            p =>
              p.slug?.toLowerCase().replace(/[-_]/g, "") === normalized ||
              p.name?.toLowerCase().replace(/[-_]/g, "") === normalized
          )
        }

        if (!project) {
          if (!cancelled) {
            setState({
              repo: null,
              config: null,
              related: [],
              loading: false,
              notFound: true,
            })
          }

          return
        }

        // Get the full config for this project
        const config =
          projectsConfig[project.name] ??
          projectsConfig[project.repoName] ??
          null

        // Build related projects
        let related = []

        if (config?.related?.length > 0) {
          // Manual related list from config
          related = config.related
            .map(relSlug => {
              const relProject = allProjects.find(
                p =>
                  p.slug === relSlug ||
                  p.slug?.toLowerCase() === relSlug.toLowerCase() ||
                  p.name?.toLowerCase() === relSlug.toLowerCase()
              )

              if (!relProject) return null

              return {
                slug: relProject.slug,
                name: relProject.name,
                category: relProject.category,
                tagline: relProject.tagline ?? relProject.description ?? "",
                language: relProject.language ?? null,
                stars: relProject.stars ?? 0,
              }
            })
            .filter(Boolean)
        }

        // If no manual related, auto-suggest by same category
        if (related.length === 0 && project.category) {
          related = allProjects
            .filter(
              p =>
                p.category === project.category &&
                p.slug !== project.slug &&
                p.name !== project.name
            )
            .slice(0, 3)
            .map(p => ({
              slug: p.slug,
              name: p.name,
              category: p.category,
              tagline: p.tagline ?? p.description ?? "",
              language: p.language ?? null,
              stars: p.stars ?? 0,
            }))
        }

        if (!cancelled) {
          setState({
            repo: project,
            config,
            related,
            loading: false,
            notFound: false,
          })
        }
      } catch (err) {
        console.error("[useProjectDetail]", err)

        if (!cancelled) {
          setState({
            repo: null,
            config: null,
            related: [],
            loading: false,
            notFound: true,
          })
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [slug])

  return state
}