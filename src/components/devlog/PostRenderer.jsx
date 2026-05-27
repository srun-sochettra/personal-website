// ============================================
// PostRenderer — renders a single post's markdown
// ============================================

import { useState, useCallback } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import rehypeRaw from "rehype-raw"

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* silent */ }
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

const components = {
  h1: ({ children }) => (
    <h1 className="font-serif text-3xl text-shell-dark mt-10 mb-4 pb-3
                   border-b border-shell-border">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-serif text-2xl text-shell-dark mt-10 mb-4 pb-2
                   border-b border-shell-border">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-serif text-xl text-shell-dark mt-8 mb-3">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="font-sans font-semibold text-shell-dark mt-6 mb-2">
      {children}
    </h4>
  ),

  p: ({ children }) => (
    <p className="text-shell-dark leading-8 mb-5 text-[17px]">{children}</p>
  ),

  ul: ({ children }) => (
    <ul className="list-disc pl-6 mb-5 space-y-2 text-shell-dark">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 mb-5 space-y-2 text-shell-dark">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="leading-7 text-[16px]">{children}</li>
  ),

  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-yolk-gold pl-5 py-2 my-6
                           text-aged-cream italic bg-amber-50/30
                           rounded-r-xl pr-5">
      {children}
    </blockquote>
  ),

  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer"
       className="text-yolk-gold underline underline-offset-3
                  hover:opacity-75 transition-opacity">
      {children}
    </a>
  ),

  strong: ({ children }) => (
    <strong className="font-semibold text-shell-dark">{children}</strong>
  ),

  em: ({ children }) => (
    <em className="italic">{children}</em>
  ),

  pre: ({ children }) => {
    const codeEl  = children?.props
    const codeStr = codeEl?.children ?? ""
    const lang    = codeEl?.className?.replace("language-", "") ?? ""

    return (
      <div className="relative group my-6">
        {lang && (
          <div className="absolute top-3 left-4 text-[10px] text-egg-white/30
                          font-mono uppercase tracking-widest">
            {lang}
          </div>
        )}
        <pre className="bg-shell-dark text-egg-white rounded-xl pt-10 pb-5 px-5
                        overflow-x-auto text-sm leading-relaxed
                        border border-shell-border/10">
          {children}
        </pre>
        <CopyButton text={typeof codeStr === "string" ? codeStr : ""} />
      </div>
    )
  },

  code: ({ inline, children }) => {
    if (inline) {
      return (
        <code className="bg-shell-border text-shell-dark px-1.5 py-0.5
                         rounded text-[0.85em] font-mono">
          {children}
        </code>
      )
    }
    return <code>{children}</code>
  },

  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt ?? ""}
      className="rounded-xl max-w-full my-6 border border-shell-border"
      loading="lazy"
    />
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
    <th className="text-left px-4 py-3 font-semibold text-shell-dark">{children}</th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 border-t border-shell-border text-shell-dark">{children}</td>
  ),

  hr: () => <hr className="border-shell-border my-10" />,
}

export default function PostRenderer({ content }) {
  return (
    <article className="max-w-2xl mx-auto">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}