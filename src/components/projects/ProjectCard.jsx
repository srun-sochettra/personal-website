// ============================================
// ProjectCard — grid card for projects page
// ============================================

import { LanguageBadge, CategoryBadge, SpecialBadge } from "../ui/Badge"

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24"
         fill="#D4A847" stroke="#D4A847" strokeWidth="2" strokeLinecap="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

export default function ProjectCard({ repo, onClick, style }) {
  if (!repo) return null

  function handleLinkClick(e) {
    e.stopPropagation()
  }

  return (
    <div
      className="card flex flex-col cursor-pointer group
                 hover:-translate-y-1 hover:shadow-lg
                 hover:border-yolk-gold/30
                 transition-all duration-200"
      style={style}
      onClick={() => onClick(repo)}
    >
      {/* Top row — category + language */}
      <div className="flex items-center justify-between mb-3">
        <CategoryBadge category={repo.category} />
        {repo.language && <LanguageBadge language={repo.language} />}
      </div>

      {/* Special badges */}
      {repo.badges.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {repo.badges.map(b => <SpecialBadge key={b} type={b} />)}
        </div>
      )}

      {/* Name */}
      <h3 className="font-serif text-lg text-shell-dark mb-2
                     group-hover:text-yolk-gold transition-colors leading-tight">
        {repo.name}
      </h3>

      {/* Description */}
      <p className="text-aged-cream text-sm leading-relaxed flex-1 mb-4 line-clamp-3">
        {repo.tagline}
      </p>

      {/* Topics */}
      {repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {repo.topics.slice(0, 3).map(t => (
            <span key={t} className="badge text-[11px]">{t}</span>
          ))}
          {repo.topics.length > 3 && (
            <span className="badge text-[11px]">+{repo.topics.length - 3} more</span>
          )}
        </div>
      )}

      {/* Bottom row */}
      <div className="flex items-center justify-between pt-3 border-t border-shell-border">

        {/* Stars + time */}
        <div className="flex items-center gap-3 text-xs text-aged-cream">
          <span className="flex items-center gap-1">
            <StarIcon />
            {repo.stars}
          </span>
          {repo.timeAgo && (
            <span className="hidden sm:block">{repo.timeAgo}</span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1">
          <a
            href={repo.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
            className="p-2 rounded-lg text-aged-cream hover:text-shell-dark
                       hover:bg-shell-border/40 transition-colors"
            title="view on GitHub"
          >
            <GitHubIcon />
          </a>

          {repo.demoUrl ? (
            <a
              href={repo.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
              className="p-2 rounded-lg text-aged-cream hover:text-yolk-gold
                         hover:bg-yolk-gold/10 transition-colors"
              title="live demo"
            >
              <ExternalIcon />
            </a>
          ) : (
            <span
              className="p-2 rounded-lg text-shell-border cursor-not-allowed"
              title="no demo available"
            >
              <ExternalIcon />
            </span>
          )}
        </div>
      </div>
    </div>
  )
}