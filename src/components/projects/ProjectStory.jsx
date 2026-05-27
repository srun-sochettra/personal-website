// ============================================
// ProjectStory — the human narrative
// The thing that makes recruiters remember you
// ============================================

import ScrollReveal from "../ui/ScrollReveal"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export default function ProjectStory({ story }) {
  if (!story) return null

  return (
    <ScrollReveal>
      <div className="mb-16">

        {/* Chapter label */}
        <div className="flex items-center gap-3 mb-6">
          <span className="section-label">the story</span>
          <div className="flex-1 h-px bg-shell-border" />
        </div>

        {/* Story text */}
        <div className="max-w-2xl">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => (
                <p className="text-shell-dark text-lg leading-relaxed mb-4 last:mb-0">
                  {children}
                </p>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-shell-dark">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="italic text-aged-cream">{children}</em>
              ),
            }}
          >
            {story}
          </ReactMarkdown>
        </div>

      </div>
    </ScrollReveal>
  )
}