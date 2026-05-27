// ============================================
// Guestbook — community messages + egg ratings
// ============================================

import { useState, useEffect, useCallback } from "react"
import { Helmet } from "react-helmet-async"
import EggFloat         from "../components/ui/EggFloat"
import ScrollReveal     from "../components/ui/ScrollReveal"
import GuestbookForm    from "../components/guestbook/GuestbookForm"
import GuestbookEntry   from "../components/guestbook/GuestbookEntry"
import GuestbookStats   from "../components/guestbook/GuestbookStats"
import { getGuestbookEntries } from "../lib/supabase"

export default function Guestbook() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  // Load entries
  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const data = await getGuestbookEntries()
        if (!cancelled) {
          setEntries(data)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  // Handle new entry — add to top of list immediately
  const handleNewEntry = useCallback((newEntry) => {
    if (newEntry) {
      setEntries(prev => [newEntry, ...prev])
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>Guestbook — Sochettra</title>
        <meta name="description" content="Leave a message. Rate the site in eggs. No account needed." />
      </Helmet>

      {/* Header */}
      <section className="relative bg-egg-white pt-16 pb-8 px-6 overflow-hidden">
        <EggFloat count={5} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <p className="section-label">the guestbook</p>
            <h1 className="font-serif text-5xl md:text-6xl text-shell-dark mb-4">
              say hi 🥚
            </h1>
            <p className="text-aged-cream text-lg max-w-lg mx-auto">
              leave a message. rate the site in eggs.
              no account needed. just vibes.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">

        <div className="grid lg:grid-cols-5 gap-10">

          {/* Left — form (2 cols) */}
          <div className="lg:col-span-2">
            <ScrollReveal>
              <div className="lg:sticky lg:top-24">
                <GuestbookForm onNewEntry={handleNewEntry} />

                {/* Fun note below form */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-aged-cream/40">
                    messages are stored in supabase.<br />
                    no tracking. no cookies. just eggs.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — messages (3 cols) */}
          <div className="lg:col-span-3">

            {/* Stats */}
            {!loading && entries.length > 0 && (
              <ScrollReveal>
                <GuestbookStats entries={entries} />
              </ScrollReveal>
            )}

            {/* Messages header */}
            <ScrollReveal>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl text-shell-dark">
                  messages
                </h2>
                {!loading && (
                  <span className="text-xs text-aged-cream">
                    {entries.length} {entries.length === 1 ? "message" : "messages"}
                  </span>
                )}
              </div>
            </ScrollReveal>

            {/* Loading */}
            {loading && (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-4 py-4">
                    <div className="skeleton w-10 h-10 rounded-full flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="skeleton h-4 w-24 rounded" />
                      <div className="skeleton h-4 w-full rounded" />
                      <div className="skeleton h-4 w-2/3 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error */}
            {error && !loading && (
              <div className="card text-center py-10">
                <div className="text-4xl mb-3">🥚</div>
                <p className="text-aged-cream text-sm mb-2">
                  couldn't load messages.
                </p>
                <p className="text-xs text-aged-cream/60">
                  supabase might be sleeping. {error}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="btn-ghost text-sm mt-4"
                >
                  try again
                </button>
              </div>
            )}

            {/* Empty state */}
            {!loading && !error && entries.length === 0 && (
              <div className="card text-center py-12">
                <div className="text-5xl mb-4">🥚</div>
                <h3 className="font-serif text-xl text-shell-dark mb-2">
                  no messages yet.
                </h3>
                <p className="text-aged-cream text-sm">
                  be the first egg to sign the guestbook.
                </p>
              </div>
            )}

            {/* Entries list */}
            {!loading && !error && entries.length > 0 && (
              <div className="card">
                {entries.map((entry, i) => (
                  <GuestbookEntry
                    key={entry.id}
                    entry={entry}
                    index={i}
                  />
                ))}
              </div>
            )}

            {/* Bottom message */}
            {!loading && entries.length > 0 && (
              <div className="text-center mt-8">
                <p className="text-xs text-aged-cream/40">
                  showing latest {entries.length} messages · newest first 🥚
                </p>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <section className="border-t border-shell-border bg-gradient-to-b
                          from-egg-white to-amber-50/20">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="text-3xl mb-4">🥚</div>
          <h2 className="font-serif text-3xl text-shell-dark mb-3">
            thanks for visiting.
          </h2>
          <p className="text-aged-cream mb-8">
            every egg that visits makes this site better.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/#contact" className="btn-primary">
              hire me →
            </a>
            <a href="/" className="btn-secondary">
              back to home
            </a>
          </div>
        </div>
      </section>
    </>
  )
}