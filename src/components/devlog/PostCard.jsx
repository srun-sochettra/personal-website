// ============================================
// PostCard — blog post preview card
// ============================================

import { Link } from "react-router-dom"

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  )
}

export default function PostCard({ post, index = 0 }) {
  return (
    <Link
      to={`/devlog/${post.slug}`}
      className="block group"
      style={{
        opacity: 0,
        animation: `fadeUp 0.4s ease ${index * 80}ms both`,
      }}
    >
      <article className="card card-hover group-hover:border-yolk-gold/30
                          transition-all duration-200">

        {/* Meta row */}
        <div className="flex items-center gap-3 text-xs text-aged-cream mb-3">
          <time dateTime={post.date}>{post.dateFormatted}</time>
          <span className="text-shell-border">·</span>
          <span className="flex items-center gap-1">
            <ClockIcon />
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-serif text-2xl text-shell-dark mb-3 leading-tight
                       group-hover:text-yolk-gold transition-colors">
          {post.title}
        </h2>

        {/* Description */}
        <p className="text-aged-cream leading-relaxed mb-4 line-clamp-3">
          {post.description}
        </p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <span key={tag} className="badge text-[11px]">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Read more */}
        <div className="flex items-center gap-1.5 text-sm text-yolk-gold/70
                        group-hover:text-yolk-gold transition-colors">
          <span>read more</span>
          <span className="group-hover:translate-x-1 transition-transform">
            <ArrowIcon />
          </span>
        </div>

      </article>
    </Link>
  )
}