import { getAllRepos, mergeRepoWithConfig } from "./github"
import { projectsConfig } from "../data/projects.config"

// Format GitHub date → "May 2026"
function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  })
}

export async function getProjects() {
  const repos = await getAllRepos()

  const projects = repos.map(repo => {
    const config = projectsConfig[repo.name]
    const merged = mergeRepoWithConfig(repo, config)

    return {
      // Base GitHub
      id: repo.id,
      name: repo.name,
      repoName: repo.name,
      description: repo.description,
      language: repo.language,
      topics: repo.topics || [],
      homepage: repo.homepage,
      stars: repo.stargazers_count,
      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
      archived: repo.archived,

      // Config overrides (already merged inside)
      slug: merged._slug || repo.name.toLowerCase(),
      category: merged._category || "Other",
      featured: merged._featured || false,
      featuredOrder: config?.featuredOrder ?? 99,
      demoUrl: merged._demoUrl || null,
      badges: merged._badges || [],
      tagline: merged._tagline || repo.description,

      // Smart fallbacks
      builtDate: merged._builtDate || formatDate(repo.created_at),
      status: merged._status || (repo.archived ? "archived" : "shipped"),
    }
  })

  // FINAL CLEAN OUTPUT
  return projects
    .filter(p => p.name !== "SRUN-Sochettra") // hide GitHub profile repo
    .filter(p => !p.name.toLowerCase().includes("test")) // hide junk
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
}
