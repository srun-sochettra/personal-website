// ============================================
// DevlogPost — single post page
// /devlog/:slug
// ============================================

import { useParams, Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { getPostBySlug, posts } from "../data/posts/index"
import PostRenderer from "../components/devlog/PostRenderer"
import ScrollReveal from "../components/ui/ScrollReveal"
import EggFloat from "../components/ui/EggFloat"

function ArrowLeftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="19" y1="12" x2="5" y2="12"/>
      <polyline points="12 19 5 12 12 5"/>
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  )
}

export default function DevlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  // Find prev/next posts
  const currentIndex = posts.findIndex(p => p.slug === slug)
  const prevPost     = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null
  const nextPost     = currentIndex > 0                ? posts[currentIndex - 1] : null

  if (!post) {
    return (
      <>
        <Helmet>
          <title>Post not found — Devlog</title>
        </Helmet>
        <div className="relative min-h-screen flex items-center justify-center
                        bg-egg-white overflow-hidden px-6">
          <EggFloat count={4} />
          <div className="relative z-10 text-center">
            <div className="text-5xl mb-4">🥚</div>
            <h1 className="font-serif text-3xl text-shell-dark mb-3">
              post not found
            </h1>
            <p className="text-aged-cream mb-6">
              this post doesn't exist. or I haven't written it yet.
            </p>
            <Link to="/devlog" className="btn-primary">
              back to devlog
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>{post.title} — Devlog — Sochettra</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={`${post.title} — Sochettra's Devlog`} />
        <meta property="og:description" content={post.description} />
      </Helmet>

      <div className="bg-egg-white min-h-screen">

        {/* Post header */}
        <header className="max-w-2xl mx-auto px-6 pt-12 pb-10">

          {/* Back */}
          <ScrollReveal>
            <Link
              to="/devlog"
              className="inline-flex items-center gap-2 text-sm text-aged-cream
                         hover:text-yolk-gold transition-colors mb-8 group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">
                <ArrowLeftIcon />
              </span>
              back to devlog
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={50}>
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-aged-cream mb-4">
              <time dateTime={post.date}>{post.dateFormatted}</time>
              <span className="text-shell-border">·</span>
              <span className="flex items-center gap-1">
                <ClockIcon />
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-4xl md:text-5xl text-shell-dark mb-5
                           leading-tight tracking-tight">
              {post.title}
            </h1>

            {/* Description */}
            {post.description && (
              <p className="text-aged-cream text-lg leading-relaxed mb-6">
                {post.description}
              </p>
            )}

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Link
                    key={tag}
                    to={`/devlog?tag=${tag}`}
                    className="badge hover:border-yolk-gold/40 hover:text-yolk-gold
                               transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
          </ScrollReveal>

          {/* Divider */}
          <div className="divider mt-8" />
        </header>

        {/* Post content */}
        <ScrollReveal delay={100}>
          <div className="px-6 pb-16">
            <PostRenderer content={post.content} />
          </div>
        </ScrollReveal>

        {/* Post footer */}
        <div className="max-w-2xl mx-auto px-6 pb-16">

          {/* End mark */}
          <div className="text-center mb-12">
            <span className="text-2xl">🥚</span>
          </div>

          {/* Prev / Next navigation */}
          <div className="grid sm:grid-cols-2 gap-4">
            {prevPost ? (
              <Link
                to={`/devlog/${prevPost.slug}`}
                className="card card-hover group text-left"
              >
                <p className="text-xs text-aged-cream uppercase tracking-widest mb-2">
                  ← previous
                </p>
                <h3 className="font-serif text-lg text-shell-dark
                               group-hover:text-yolk-gold transition-colors leading-tight">
                  {prevPost.title}
                </h3>
              </Link>
            ) : (
              <div />
            )}

            {nextPost ? (
              <Link
                to={`/devlog/${nextPost.slug}`}
                className="card card-hover group text-right"
              >
                <p className="text-xs text-aged-cream uppercase tracking-widest mb-2">
                  next →
                </p>
                <h3 className="font-serif text-lg text-shell-dark
                               group-hover:text-yolk-gold transition-colors leading-tight">
                  {nextPost.title}
                </h3>
              </Link>
            ) : (
              <div />
            )}
          </div>

          {/* Back to devlog */}
          <div className="text-center mt-12 pt-8 border-t border-shell-border">
            <Link
              to="/devlog"
              className="btn-secondary text-sm inline-flex items-center gap-2"
            >
              all posts
              <ArrowIcon />
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}