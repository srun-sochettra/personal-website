// ============================================
// GitHub API — wrapper + in-memory cache
// ============================================

const GITHUB_USER = "SRUN-Sochettra"
const BASE_URL = "https://api.github.com"

// Single shared cache — survives full session, no re-fetches
const cache = {
  repos:   null,
  user:    null,
  readmes: {},
}

// ── Headers ──────────────────────────────────
// Add a token here if you hit rate limits during dev
// const TOKEN = import.meta.env.VITE_GITHUB_TOKEN
const headers = {
  Accept: "application/vnd.github.v3+json",
  // ...(TOKEN ? { Authorization: `token ${TOKEN}` } : {}),
}

// ── Fetch all repos ───────────────────────────
export async function getAllRepos() {
  if (cache.repos) return cache.repos

  try {
    // GitHub paginates at 100 — fetch page 1 and 2 to cover 33 repos
    const [page1, page2] = await Promise.all([
      fetch(`${BASE_URL}/users/${GITHUB_USER}/repos?per_page=100&sort=updated&page=1`, { headers }),
      fetch(`${BASE_URL}/users/${GITHUB_USER}/repos?per_page=100&sort=updated&page=2`, { headers }),
    ])

    const data1 = page1.ok ? await page1.json() : []
    const data2 = page2.ok ? await page2.json() : []

    cache.repos = [...data1, ...data2]
    return cache.repos
  } catch (err) {
    console.error("[GitHub API] getAllRepos failed:", err)
    return []
  }
}

// ── Fetch user profile stats ─────────────────
export async function getUserStats() {
  if (cache.user) return cache.user

  try {
    const res = await fetch(`${BASE_URL}/users/${GITHUB_USER}`, { headers })
    if (!res.ok) throw new Error(`Status ${res.status}`)
    cache.user = await res.json()
    return cache.user
  } catch (err) {
    console.error("[GitHub API] getUserStats failed:", err)
    return null
  }
}

// ── Fetch README for a single repo ───────────
export async function getReadme(repoName) {
  if (cache.readmes[repoName] !== undefined) return cache.readmes[repoName]

  try {
    const res = await fetch(
      `${BASE_URL}/repos/${GITHUB_USER}/${repoName}/readme`,
      { headers: { ...headers, Accept: "application/vnd.github.v3.raw" } }
    )

    if (res.status === 404) {
      cache.readmes[repoName] = null
      return null
    }

    if (!res.ok) throw new Error(`Status ${res.status}`)

    const text = await res.text()
    cache.readmes[repoName] = text
    return text
  } catch (err) {
    console.error(`[GitHub API] getReadme failed for ${repoName}:`, err)
    cache.readmes[repoName] = null
    return null
  }
}

// ── Compute aggregate stats from repo list ───
export function computeStats(repos) {
  if (!repos || repos.length === 0) return {
    totalRepos: 0,
    totalStars: 0,
    topLanguage: "N/A",
    memberSince:  "2025",
  }

  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)

  // Count language occurrences
  const langCount = {}
  repos.forEach(r => {
    if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1
  })
  const topLanguage = Object.entries(langCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "N/A"

  return {
    totalRepos:   repos.length,
    totalStars,
    topLanguage,
    memberSince:  "2025",
  }
}

// ── Merge GitHub data with config data ───────
export function mergeRepoWithConfig(githubRepo, projectConfig) {
  if (!projectConfig) return githubRepo
  return {
    ...githubRepo,
    // Config overrides take priority for display fields
    _config:     projectConfig,
    _slug:       projectConfig.slug,
    _category:   projectConfig.category,
    _featured:   projectConfig.featured ?? false,
    _demoUrl:    projectConfig.demoUrl ?? null,
    _status:     projectConfig.status ?? "shipped",
    _badges:     projectConfig.badges ?? [],
    _tagline:    projectConfig.tagline ?? githubRepo.description,
    _builtDate:  projectConfig.builtDate ?? null,
  }
}

// ── Format relative time ──────────────────────
export function timeAgo(dateString) {
  const date = new Date(dateString)
  const now  = new Date()
  const diff = Math.floor((now - date) / 1000)

  if (diff < 60)     return "just now"
  if (diff < 3600)   return `${Math.floor(diff / 60)} minutes ago`
  if (diff < 86400)  return `${Math.floor(diff / 3600)} hours ago`
  if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`
  if (diff < 2592000)return `${Math.floor(diff / 604800)} weeks ago`

  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
}

// ── Language color map ────────────────────────
export const LANGUAGE_COLORS = {
  JavaScript:  "#F7DF1E",
  TypeScript:  "#3178C6",
  Java:        "#ED8B00",
  Python:      "#3776AB",
  Dart:        "#0175C2",
  "C++":       "#00599C",
  C:           "#555555",
  HTML:        "#E34F26",
  CSS:         "#1572B6",
  Shell:       "#89E051",
  Kotlin:      "#7F52FF",
  Swift:       "#FA7343",
}

export function getLanguageColor(language) {
  return LANGUAGE_COLORS[language] ?? "#9C8A6E"
}