// ============================================
// ProjectDeepDive — architecture / how it works
// Handles flow, architecture, markdown types
// ============================================

import ScrollReveal from "../ui/ScrollReveal"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

// ── Flow diagram ──────────────────────────────

function FlowDiagram({ steps }) {
  return (
    <div className="max-w-lg mx-auto">
      {steps.map((step, i) => (
        <div key={i}>
          {/* Step box */}
          <div className="card border-yolk-gold/20 hover:border-yolk-gold/40
                          transition-colors group">
            <div className="flex items-start gap-4">
              {/* Step number */}
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-yolk-gold/10
                              border border-yolk-gold/30 flex items-center justify-center
                              group-hover:bg-yolk-gold/20 transition-colors">
                <span className="text-xs font-bold text-yolk-gold">{i + 1}</span>
              </div>

              <div className="flex-1 min-w-0">
                {/* Step label */}
                <p className="text-shell-dark font-medium text-sm mb-1">
                  {step.label}
                </p>
                {/* Annotation */}
                {step.note && (
                  <p className="text-aged-cream text-xs leading-relaxed">
                    {step.note}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Arrow connector */}
          {i < steps.length - 1 && (
            <div className="flex justify-center my-1">
              <div className="flex flex-col items-center">
                <div className="w-px h-5 bg-shell-border" />
                <svg width="12" height="8" viewBox="0 0 12 8" className="text-shell-border">
                  <path d="M6 8 L0 0 L12 0 Z" fill="currentColor" />
                </svg>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ── Architecture layers ───────────────────────

function ArchitectureDiagram({ layers }) {
  return (
    <div className="max-w-md mx-auto space-y-2">
      {layers.map((layer, i) => (
        <div key={i}>
          {/* Layer box */}
          <div className={`card text-center
            ${i === 0 ? "border-yolk-gold/40 bg-amber-50/30" : ""}
            ${i === layers.length - 1 ? "border-blue-200 bg-blue-50/20" : ""}
          `}>
            <p className="font-medium text-shell-dark text-sm">{layer.label}</p>
            {layer.note && (
              <p className="text-xs text-aged-cream mt-1">{layer.note}</p>
            )}
          </div>

          {/* Connector */}
          {i < layers.length - 1 && (
            <div className="flex flex-col items-center my-1">
              <div className="w-px h-4 bg-shell-border" />
              <svg width="12" height="8" viewBox="0 0 12 8" className="text-shell-border">
                <path d="M6 8 L0 0 L12 0 Z" fill="currentColor" />
              </svg>
              <span className="text-[10px] text-aged-cream/60 mt-0.5">
                {layers[i].connector ?? "↓"}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ── Markdown deep dive ────────────────────────

function MarkdownContent({ content }) {
  return (
    <div className="max-w-2xl">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h3: ({ children }) => (
            <h3 className="font-serif text-lg text-shell-dark mt-6 mb-2">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="text-aged-cream leading-relaxed mb-3 text-sm">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-5 space-y-1 mb-3 text-aged-cream text-sm">{children}</ul>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">{children}</li>
          ),
          code: ({ children }) => (
            <code className="bg-shell-border text-shell-dark px-1.5 py-0.5 rounded text-xs">
              {children}
            </code>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

// ── Main component ────────────────────────────

export default function ProjectDeepDive({ deepDive }) {
  if (!deepDive) return null

  return (
    <div className="mb-16">
      <ScrollReveal>
        <div className="flex items-center gap-3 mb-8">
          <span className="section-label">how it works</span>
          <div className="flex-1 h-px bg-shell-border" />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        {deepDive.type === "flow" && deepDive.steps && (
          <FlowDiagram steps={deepDive.steps} />
        )}

        {deepDive.type === "architecture" && deepDive.layers && (
          <ArchitectureDiagram layers={deepDive.layers} />
        )}

        {deepDive.type === "markdown" && deepDive.content && (
          <MarkdownContent content={deepDive.content} />
        )}
      </ScrollReveal>
    </div>
  )
}