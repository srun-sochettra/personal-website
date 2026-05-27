import { useState, useEffect, useRef, useCallback } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import rehypeRaw from "rehype-raw"
import ScrollReveal from "../ui/ScrollReveal"
import { getReadme } from "../../lib/github"

// ── Skeleton ──────────────────────────────────

function ReadmeSkeleton() {
  return (
    <div className="space-y-4">
      <div className="skeleton h-7 w-1/3 rounded" />
      <div className="skeleton h-4 w-full rounded" />
      <div className="skeleton h-4 w-5/6 rounded" />
      <div className="skeleton h-4 w-4/6 rounded" />
      <div className="skeleton h-36 w-full rounded-xl mt-6" />
      <div className="skeleton h-4 w-full rounded" />
      <div className="skeleton h-4 w-3/4 rounded" />
    </div>
  )
}

// ── Copy button ───────────────────────────────

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // silent
    }
  }, [text])

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 px-2.5 py-1 rounded text-xs
                 bg-egg-white/10 text-egg-white/60 hover:bg-egg-white/20
                 hover:text-egg-white transition-colors border border-white/10"
    >
      {copied ? "copied 🥚" : "copy"}
    </button>
  )
}

// ── Markdown component overrides ──────────────

function makeComponents(repoName) {
  return {
    img({ src, alt }) {
      const isAbsolute = src?.startsWith("http") || src?.startsWith("//")
      const resolved = isAbsolute
        ? src
        : `https://raw.githubusercontent.com/SRUN-Sochettra/${repoName}/main/${src}`

      return (
        <img
          src={resolved}
          alt={alt ?? ""}
          className="rounded-xl max-w-full my-6 border border-shell-border"
          loading="lazy"
          onError={e => {
            e.target.style.display = "none"
          }}
        />
      )
    },

    pre({ children }) {
      const codeEl = children?.props
      const codeStr = codeEl?.children ?? ""
      const lang = codeEl?.className?.replace("language-", "") ?? ""

      return (
        <div className="relative group my-6">
          {lang && (
            <div
              className="absolute top-3 left-4 text-[10px] text-egg-white/30
                         font-mono uppercase tracking-widest"
            >
              {lang}
            </div>
          )}

          <pre
            className="bg-shell-dark text-egg-white rounded-xl pt-10 pb-5 px-5
                       overflow-x-auto text-sm leading-relaxed
                       border border-shell-border/10"
          >
            {children}
          </pre>

          <CopyButton text={typeof codeStr === "string" ? codeStr : ""} />
        </div>
      )
    },

    code({ inline, children }) {
      if (inline) {
        return (
          <code
            className="bg-shell-border text-shell-dark px-1.5 py-0.5
                       rounded text-[0.85em] font-mono"
          >
            {children}
          </code>
        )
      }

      return <code>{children}</code>
    },

    blockquote({ children }) {
      return (
        <blockquote
          className="border-l-4 border-yolk-gold pl-5 py-2 my-5
                     text-aged-cream italic bg-amber-50/20
                     rounded-r-lg pr-4"
        >
          {children}
        </blockquote>
      )
    },

    a({ href, children }) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-yolk-gold underline underline-offset-2
                     hover:opacity-75 transition-opacity"
        >
          {children}
        </a>
      )
    },

    h1: ({ children }) => (
      <h1
        className="font-serif text-3xl text-shell-dark mt-10 mb-4 pb-3
                   border-b border-shell-border"
      >
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <h2
        className="font-serif text-2xl text-shell-dark mt-8 mb-3 pb-2
                   border-b border-shell-border"
      >
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="font-serif text-xl text-shell-dark mt-6 mb-2">
        {children}
      </h3>
    ),

    h4: ({ children }) => (
      <h4 className="font-sans font-semibold text-shell-dark mt-5 mb-2">
        {children}
      </h4>
    ),

    p: ({ children }) => (
      <p className="text-shell-dark leading-7 mb-4">{children}</p>
    ),

    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-1.5 text-shell-dark">
        {children}
      </ul>
    ),

    ol: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-1.5 text-shell-dark">
        {children}
      </ol>
    ),

    li: ({ children }) => (
      <li className="leading-7 text-sm">{children}</li>
    ),

    table: ({ children }) => (
      <div className="overflow-x-auto my-6 rounded-xl border border-shell-border">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    ),

    thead: ({ children }) => (
      <thead className="bg-shell-border">{children}</thead>
    ),

    th: ({ children }) => (
      <th className="text-left px-4 py-3 font-semibold text-shell-dark">
        {children}
      </th>
    ),

    td: ({ children }) => (
      <td className="px-4 py-3 border-t border-shell-border text-shell-dark">
        {children}
      </td>
    ),

    hr: () => <hr className="border-shell-border my-8" />,
  }
}

// ── Main component ────────────────────────────

export default function ProjectReadme({ repoName }) {
  const [state, setState] = useState({
    repoName: null,
    readme: null,
    loading: false,
    readAll: false,
  })

  const bottomRef = useRef(null)
  const hasMarked = useRef(false)

  // Fetch README
  useEffect(() => {
    if (!repoName) return

    let cancelled = false
    hasMarked.current = false

    getReadme(repoName)
      .then(text => {
        if (!cancelled) {
          setState({
            repoName,
            readme: text,
            loading: false,
            readAll: false,
          })
        }
      })
      .catch(() => {
        if (!cancelled) {
          setState({
            repoName,
            readme: null,
            loading: false,
            readAll: false,
          })
        }
      })

    return () => {
      cancelled = true
    }
  }, [repoName])

  const isCurrentRepo = state.repoName === repoName

  const readme = isCurrentRepo ? state.readme : null
  const loading = Boolean(repoName) && (!isCurrentRepo || state.loading)
  const readAll = isCurrentRepo ? state.readAll : false

  // Detect scroll to bottom of README
  useEffect(() => {
    const el = bottomRef.current
    if (!el || hasMarked.current || loading || !readme) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasMarked.current) {
          const key = `readme_read_${repoName}`

          if (!sessionStorage.getItem(key)) {
            sessionStorage.setItem(key, "true")
            hasMarked.current = true

            setState(prev => ({
              ...prev,
              readAll: true,
            }))
          }
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
    }
  }, [loading, readme, repoName])

  return (
    <div className="mb-16">
      <ScrollReveal>
        <div className="flex items-center gap-3 mb-8">
          <span className="section-label">documentation</span>
          <div className="flex-1 h-px bg-shell-border" />
        </div>
      </ScrollReveal>

      {/* Loading */}
      {loading && (
        <div className="card">
          <ReadmeSkeleton />
        </div>
      )}

      {/* No readme */}
      {!loading && !readme && (
        <div className="card text-center py-12">
          <div className="text-4xl mb-3">🥚</div>
          <p className="text-aged-cream text-sm">
            this project skipped the documentation.
          </p>
          <p className="text-xs text-aged-cream/60 mt-1">
            the code speaks for itself. probably.
          </p>
        </div>
      )}

      {/* Rendered README */}
      {!loading && readme && (
        <div className="card max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
            components={makeComponents(repoName)}
          >
            {readme}
          </ReactMarkdown>

          {/* Scroll sentinel */}
          <div ref={bottomRef} />

          {/* Easter egg */}
          {readAll && (
            <div className="text-center py-6 border-t border-shell-border mt-8">
              <p className="text-xs text-aged-cream/40">
                🥚 you read the whole thing. golden egg behavior.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}