// ============================================
// ProjectRelated — 3 related project cards
// ============================================

import { Link } from "react-router-dom"
import ScrollReveal from "../ui/ScrollReveal"
import { LanguageBadge, CategoryBadge } from "../ui/Badge"

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24"
         fill="#D4A847" stroke="#D4A847" strokeWidth="2" strokeLinecap="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  )
}

function RelatedCard({ repo }) {
  return (
    <Link to={`/projects/${repo.slug}`} className="block group">
      <div className="card card-hover h-full flex flex-col
                      group-hover:border-yolk-gold/30 transition-all duration-200">

        <div className="flex items-center justify-between mb-3">
          <CategoryBadge category={repo.category} />
          {repo.language && <LanguageBadge language={repo.language} />}
        </div>

        <h3 className="font-serif text-lg text-shell-dark mb-2
                       group-hover:text-yolk-gold transition-colors">
          {repo.name}
        </h3>

        <p className="text-aged-cream text-sm leading-relaxed flex-1 mb-4 line-clamp-2">
          {repo.tagline}
        </p>

        <div className="flex items-center justify-between pt-3
                        border-t border-shell-border text-xs text-aged-cream">
          <span className="flex items-center gap-1">
            <StarIcon /> {repo.stars}
          </span>
          <span className="text-yolk-gold/70 group-hover:text-yolk-gold transition-colors">
            view →
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function ProjectRelated({ repos }) {
  if (!repos || repos.length === 0) return null

  return (
    <div className="mb-16">
      <ScrollReveal>
        <div className="flex items-center gap-3 mb-8">
          <span className="section-label">you might also like</span>
          <div className="flex-1 h-px bg-shell-border" />
        </div>
      </ScrollReveal>

      <div className={`grid gap-5
        ${repos.length === 1 ? "md:grid-cols-1 max-w-sm" : ""}
        ${repos.length === 2 ? "md:grid-cols-2" : ""}
        ${repos.length >= 3  ? "md:grid-cols-3" : ""}
      `}>
        {repos.slice(0, 3).map((repo, i) => (
          <ScrollReveal key={repo.slug ?? repo.name} delay={i * 80}>
            <RelatedCard repo={repo} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}