// ============================================
// ProjectDrawer — slides in from right
// Renders live README from GitHub API
// ============================================

import { useState, useEffect, useCallback } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import rehypeRaw from "rehype-raw"
import { getReadme } from "../../lib/github"
import { LanguageBadge, CategoryBadge, StatusBadge, SpecialBadge } from "../ui/Badge"

// ── Icons ─────────────────────────────────────

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

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

// stars using gold/bronze theme
function StarIcon() {
  return (
    <svg
      width="13"
      height="13"
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
      width="13"
      height="13"
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

function ArrowIcon() {
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
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

// ── README skeleton ───────────────────────────

function ReadmeSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="skeleton h-6 w-1/2 rounded" />
      <div className="skeleton h-4 w-full rounded" />
      <div className="skeleton h-4 w-5/6 rounded" />
      <div className="skeleton h-4 w-4/6 rounded" />
      <div className="skeleton h-32 w-full rounded-lg mt-4" />
      <div className="skeleton h-4 w-full rounded" />
      <div className="skeleton h-4 w-3/4 rounded" />
    </div>
  )
}

// ── Copy code button ──────────────────────────

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback — do nothing
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 px-2.5 py-1 rounded text-xs
                 bg-shell-border/20 text-aged-cream hover:bg-shell-border/40
                 transition-colors border border-shell-border/20"
    >
      {copied ? "copied 🥚" : "copy"}
    </button>
  )
}

// ── Markdown components ───────────────────────

function makeComponents(repoName) {
  return {
    // Images — resolve relative GitHub URLs
    img({ src, alt, ...props }) {
      const resolved = src?.startsWith("http")
        ? src
        : `https://raw.githubusercontent.com/SRUN-Sochettra/${repoName}/main/${src}`

      return (
        <img
          src={resolved}
          alt={alt}
          className="rounded-lg max-w-full my-4"
          loading="lazy"
          {...props}
        />
      )
    },

    // Code blocks with copy button
    pre({ children, ...props }) {
      const code = children?.props?.children ?? ""

      return (
        <div className="relative group my-4">
          <pre
            className="bg-shell-dark text-egg-white rounded-xl p-5
                       overflow-x-auto text-sm leading-relaxed border
                       border-shell-border/10"
            {...props}
          >
            {children}
          </pre>
          <CopyButton text={typeof code === "string" ? code : ""} />
        </div>
      )
    },

    // Inline code
    code({ inline, children, ...props }) {
      if (inline) {
        return (
          <code
            className="bg-shell-border text-shell-dark px-1.5 py-0.5 rounded text-[0.85em]"
            {...props}
          >
            {children}
          </code>
        )
      }

      return <code {...props}>{children}</code>
    },

    // Blockquote
    blockquote({ children }) {
      return (
        <blockquote
          className="border-l-4 border-yolk-gold pl-4 py-1 my-4
                     text-aged-cream italic"
        >
          {children}
        </blockquote>
      )
    },

    // Links
    a({ href, children }) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-yolk-gold underline underline-offset-2 hover:opacity-80"
        >
          {children}
        </a>
      )
    },

    // Headings
    h1: ({ children }) => (
      <h1 className="font-serif text-2xl text-shell-dark mt-8 mb-3">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-xl text-shell-dark mt-6 mb-2 pb-2 border-b border-shell-border">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-lg text-shell-dark mt-5 mb-2">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-sans text-base font-semibold text-shell-dark mt-4 mb-1">
        {children}
      </h4>
    ),

    // Paragraph
    p: ({ children }) => (
      <p className="text-shell-dark leading-7 mb-3">{children}</p>
    ),

    // Lists
    ul: ({ children }) => (
      <ul className="list-disc pl-5 mb-3 space-y-1 text-shell-dark">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-5 mb-3 space-y-1 text-shell-dark">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-6 text-sm">{children}</li>,

    // Table
    table: ({ children }) => (
      <div className="overflow-x-auto my-4">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="text-left px-3 py-2 bg-shell-border font-semibold text-shell-dark border border-shell-border">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-3 py-2 border border-shell-border text-shell-dark">
        {children}
      </td>
    ),

    // HR
    hr: () => <hr className="border-shell-border my-6" />,
  }
}

// ── Tab components ────────────────────────────

function ReadmeTab({ repo, readme, readmeLoading }) {
  if (readmeLoading) return <ReadmeSkeleton />

  if (!readme) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-3">🥚</div>
        <p className="text-aged-cream text-sm">
          this project is too cool for documentation.
        </p>
      </div>
    )
  }

  return (
    <div className="prose-egg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={makeComponents(repo.name)}
      >
        {readme}
      </ReactMarkdown>
    </div>
  )
}

function DetailsTab({ repo }) {
  const rows = [
    {
      label: "Repository",
      value: (
        <a
          href={repo.htmlUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-yolk-gold hover:underline text-xs"
        >
          {repo.htmlUrl?.replace("https://", "")}
        </a>
      ),
    },
    { label: "Language", value: repo.language ?? "—" },
    { label: "Size", value: repo.size ? `${(repo.size / 1024).toFixed(1)} MB` : "—" },
    { label: "Stars", value: repo.stars },
    { label: "Forks", value: repo.forks },
    { label: "Open issues", value: repo.openIssues },
    { label: "License", value: repo.license ?? "—" },
    {
      label: "Created",
      value: repo.createdAt
        ? new Date(repo.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
          })
        : "—",
    },
    { label: "Last updated", value: repo.timeAgo ?? "—" },
  ]

  return (
    <div>
      <div className="rounded-xl border border-shell-border overflow-hidden">
        {rows.map(({ label, value }, i) => (
          <div
            key={label}
            className={`flex items-center justify-between px-4 py-3 text-sm
              ${i % 2 === 0 ? "bg-egg-white" : "bg-amber-50/20"}`}
          >
            <span className="text-aged-cream font-medium">{label}</span>
            <span className="text-shell-dark text-right">{value}</span>
          </div>
        ))}
      </div>

      {/* Topics */}
      {repo.topics?.length > 0 && (
        <div className="mt-4">
          <p className="text-xs text-aged-cream uppercase tracking-widest mb-2">
            Topics
          </p>
          <div className="flex flex-wrap gap-2">
            {repo.topics.map((t) => (
              <span key={t} className="badge">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main drawer ───────────────────────────────

export default function ProjectDrawer({ repo, onClose, onNext, onPrev }) {
  const repoName = repo?.name

  const [tabState, setTabState] = useState({
    repoName: null,
    tab: "readme",
  })

  const [readmeState, setReadmeState] = useState({
    repoName: null,
    readme: null,
  })

  const tab = tabState.repoName === repoName ? tabState.tab : "readme"

  const readme =
    readmeState.repoName === repoName ? readmeState.readme : null

  const readmeLoading =
    Boolean(repoName) && readmeState.repoName !== repoName

  // Fetch README when repo name changes.
  // No synchronous setState here; loading/reset is derived during render.
  useEffect(() => {
    if (!repoName) return undefined

    let cancelled = false

    getReadme(repoName)
      .then((text) => {
        if (!cancelled) {
          setReadmeState({
            repoName,
            readme: text,
          })
        }
      })
      .catch(() => {
        if (!cancelled) {
          setReadmeState({
            repoName,
            readme: null,
          })
        }
      })

    return () => {
      cancelled = true
    }
  }, [repoName])

  // ESC to close, arrow keys to navigate
  const handleKey = useCallback(
    (e) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") onNext?.()
      if (e.key === "ArrowLeft") onPrev?.()
    },
    [onClose, onNext, onPrev]
  )

  useEffect(() => {
    if (!repo) return undefined

    window.addEventListener("keydown", handleKey)

    return () => {
      window.removeEventListener("keydown", handleKey)
    }
  }, [repo, handleKey])

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = repo ? "hidden" : ""

    return () => {
      document.body.style.overflow = ""
    }
  }, [repo])

  if (!repo) return null

  const TABS = [
    { id: "readme", label: "README" },
    { id: "details", label: "Details" },
  ]

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-shell-dark/40 backdrop-blur-sm"
        onClick={onClose}
        style={{ animation: "fadeIn 0.2s ease" }}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 bottom-0 z-50
                   w-full md:w-[55%] lg:w-[48%] max-w-2xl
                   bg-egg-white flex flex-col shadow-2xl"
        style={{ animation: "slideInRight 0.35s ease" }}
      >
        {/* Header */}
        <div className="flex-shrink-0 px-6 pt-5 pb-4 border-b border-shell-border">
          {/* Top row */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0 pr-4">
              <h2 className="font-serif text-2xl text-shell-dark truncate">
                {repo.name}
              </h2>

              <div className="flex flex-wrap items-center gap-2 mt-2">
                <CategoryBadge category={repo.category} />
                {repo.language && <LanguageBadge language={repo.language} />}
                <StatusBadge status={repo.status} />
                {repo.badges?.map((b) => (
                  <SpecialBadge key={b} type={b} />
                ))}
              </div>
            </div>

            <button
              onClick={onClose}
              className="flex-shrink-0 p-2 rounded-lg text-aged-cream
                         hover:text-shell-dark hover:bg-shell-border/40
                         transition-colors"
              aria-label="close"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-4 text-xs text-aged-cream mb-4">
            <span className="flex items-center gap-1">
              <StarIcon /> {repo.stars}
            </span>

            <span className="flex items-center gap-1">
              <ForkIcon /> {repo.forks}
            </span>

            {repo.timeAgo && <span>updated {repo.timeAgo}</span>}
            {repo.builtDate && <span>built {repo.builtDate}</span>}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 mb-4">
            <a
              href={repo.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs py-2 px-4"
            >
              <GitHubIcon />
              GitHub
            </a>

            {repo.demoUrl && (
              <a
                href={repo.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs py-2 px-4"
              >
                live demo
                <ExternalIcon />
              </a>
            )}

            <a
              href={`/projects/${repo.slug ?? repo.name?.toLowerCase()}`}
              className="btn-ghost text-xs py-2 px-3 ml-auto"
            >
              full page
              <ArrowIcon />
            </a>
          </div>

          {/* Tabs */}
          <div className="flex gap-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() =>
                  setTabState({
                    repoName,
                    tab: t.id,
                  })
                }
                className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors
                  ${
                    tab === t.id
                      ? "bg-yolk-gold/10 text-yolk-gold"
                      : "text-aged-cream hover:text-shell-dark hover:bg-shell-border/30"
                  }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Body — scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {tab === "readme" && (
            <ReadmeTab
              repo={repo}
              readme={readme}
              readmeLoading={readmeLoading}
            />
          )}

          {tab === "details" && <DetailsTab repo={repo} />}
        </div>

        {/* Footer nav — prev/next */}
        {(onPrev || onNext) && (
          <div
            className="flex-shrink-0 flex items-center justify-between
                       px-6 py-3 border-t border-shell-border"
          >
            <button
              onClick={onPrev}
              disabled={!onPrev}
              className="btn-ghost text-xs disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ← prev
            </button>

            <span className="text-xs text-aged-cream/50">
              ← → to navigate · ESC to close
            </span>

            <button
              onClick={onNext}
              disabled={!onNext}
              className="btn-ghost text-xs disabled:opacity-30 disabled:cursor-not-allowed"
            >
              next →
            </button>
          </div>
        )}
      </div>
    </>
  )
}