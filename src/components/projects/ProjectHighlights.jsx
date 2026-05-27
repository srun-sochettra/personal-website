// ============================================
// ProjectHighlights — 3-5 callout cards
// The specific technical wins worth bragging about
// ============================================

import ScrollReveal from "../ui/ScrollReveal"

function HighlightCard({ highlight, index }) {
  return (
    <ScrollReveal delay={index * 100}>
      <div className="card card-hover group">
        {/* Icon */}
        <div className="text-3xl mb-4 group-hover:scale-110 transition-transform
                        inline-block">
          {highlight.icon}
        </div>

        {/* Label */}
        <h3 className="font-serif text-lg text-shell-dark mb-2 group-hover:text-yolk-gold
                       transition-colors">
          {highlight.label}
        </h3>

        {/* Description */}
        <p className="text-aged-cream text-sm leading-relaxed">
          {highlight.description}
        </p>
      </div>
    </ScrollReveal>
  )
}

export default function ProjectHighlights({ highlights }) {
  if (!highlights || highlights.length === 0) return null

  return (
    <div className="mb-16">

      {/* Section label */}
      <ScrollReveal>
        <div className="flex items-center gap-3 mb-8">
          <span className="section-label">highlights</span>
          <div className="flex-1 h-px bg-shell-border" />
        </div>
      </ScrollReveal>

      {/* Cards grid */}
      <div className={`grid gap-5
        ${highlights.length === 2 ? "md:grid-cols-2" : ""}
        ${highlights.length >= 3  ? "md:grid-cols-3" : ""}
      `}>
        {highlights.map((h, i) => (
          <HighlightCard key={i} highlight={h} index={i} />
        ))}
      </div>

    </div>
  )
}