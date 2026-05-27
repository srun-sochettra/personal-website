// ============================================
// Post registry — import all markdown posts
// Add new posts here when you write them
// ============================================

// Import raw markdown
import post001 from "./001-how-i-built-eggscan-in-one-day.md?raw"
import post002 from "./002-building-the-personal-website-empire.md?raw"
import post003 from "./003-what-im-learning-right-now.md?raw"

// ── Parse frontmatter from markdown ───────────
function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { meta: {}, content: raw }

  const frontmatter = match[1]
  const content     = match[2].trim()
  const meta        = {}

  frontmatter.split("\n").forEach(line => {
    const colonIndex = line.indexOf(":")
    if (colonIndex === -1) return

    const key   = line.slice(0, colonIndex).trim()
    let   value = line.slice(colonIndex + 1).trim()

    // Parse arrays: [tag1, tag2, tag3]
    if (value.startsWith("[") && value.endsWith("]")) {
      value = value
        .slice(1, -1)
        .split(",")
        .map(s => s.trim().replace(/^['"]|['"]$/g, ""))
    }

    meta[key] = value
  })

  return { meta, content }
}

// ── Build post objects ────────────────────────
function buildPost(raw, slug) {
  const { meta, content } = parseFrontmatter(raw)

  return {
    slug,
    title:       meta.title       ?? "Untitled",
    date:        meta.date        ?? "2026-01-01",
    tags:        Array.isArray(meta.tags) ? meta.tags : [],
    description: meta.description ?? "",
    content,
    // Computed
    dateFormatted: formatDate(meta.date),
    readTime:      estimateReadTime(content),
  }
}

function formatDate(dateStr) {
  if (!dateStr) return ""
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year:  "numeric",
      month: "long",
      day:   "numeric",
    })
  } catch {
    return dateStr
  }
}

function estimateReadTime(content) {
  const words = content.split(/\s+/).length
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min read`
}

// ── Export all posts ──────────────────────────

export const posts = [
  buildPost(post001, "how-i-built-eggscan-in-one-day"),
  buildPost(post002, "building-the-personal-website-empire"),
  buildPost(post003, "what-im-learning-right-now"),
].sort((a, b) => new Date(b.date) - new Date(a.date))

// newest first

export function getPostBySlug(slug) {
  return posts.find(p => p.slug === slug) ?? null
}

export function getAllTags() {
  const tagSet = new Set()
  posts.forEach(p => p.tags.forEach(t => tagSet.add(t)))
  return Array.from(tagSet).sort()
}