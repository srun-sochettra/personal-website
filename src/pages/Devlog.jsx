// ============================================
// Devlog — blog post list page
// ============================================

import { useState } from "react"
import { Helmet } from "react-helmet-async"
import EggFloat from "../components/ui/EggFloat"
import ScrollReveal from "../components/ui/ScrollReveal"
import PostCard from "../components/devlog/PostCard"
import CurrentlySection from "../components/devlog/CurrentlySection"
import { posts, getAllTags } from "../data/posts/index"

export default function Devlog() {
  const [activeTag, setActiveTag] = useState(null)

  const allTags = getAllTags()

  const filtered = activeTag
    ? posts.filter((post) => post.tags.includes(activeTag))
    : posts

  return (
    <>
      <Helmet>
        <title>Devlog — Sochettra</title>
        <meta
          name="description"
          content="Short posts about what I'm building, learning, and surviving. Eggs included."
        />
      </Helmet>

      {/* Header */}
      <section className="relative bg-egg-white pt-16 pb-8 px-6 overflow-hidden">
        <EggFloat count={5} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <p className="section-label">the devlog</p>

            <h1 className="font-serif text-5xl md:text-6xl text-shell-dark mb-4">
              building in public
            </h1>

            <p className="text-aged-cream text-lg max-w-xl mx-auto">
              short posts about what I'm building, learning, and surviving.
              updates whenever I ship something or have a thought worth sharing.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Currently section */}
        <CurrentlySection />

        {/* Tag filters */}
        {allTags.length > 0 && (
          <ScrollReveal>
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                type="button"
                onClick={() => setActiveTag(null)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium border
                  transition-all duration-150
                  ${
                    !activeTag
                      ? "bg-yolk-gold text-shell-dark border-yolk-gold"
                      : "bg-egg-white text-aged-cream border-shell-border hover:border-yolk-gold/40"
                  }`}
              >
                all posts ({posts.length})
              </button>

              {allTags.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-medium border
                    transition-all duration-150
                    ${
                      activeTag === tag
                        ? "bg-yolk-gold text-shell-dark border-yolk-gold"
                        : "bg-egg-white text-aged-cream border-shell-border hover:border-yolk-gold/40"
                    }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* Post list */}
        <div className="space-y-6">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-3">🥚</div>

              <p className="text-aged-cream">
                no posts with this tag yet.
              </p>

              <button
                type="button"
                onClick={() => setActiveTag(null)}
                className="btn-ghost text-sm mt-4"
              >
                show all posts
              </button>
            </div>
          ) : (
            filtered.map((post, index) => (
              <PostCard
                key={post.slug}
                post={post}
                index={index}
              />
            ))
          )}
        </div>

        {/* Bottom message */}
        {filtered.length > 0 && (
          <div className="text-center mt-12 pt-8 border-t border-shell-border">
            <p className="text-xs text-aged-cream/40">
              that&apos;s all for now. more posts coming as I build more things. 🥚
            </p>
          </div>
        )}
      </div>
    </>
  )
}