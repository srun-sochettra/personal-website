// ============================================
// ProjectFooterCTA — bottom of every detail page
// ============================================

import { Link } from "react-router-dom"

function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  )
}

export default function ProjectFooterCTA() {
  return (
    <section className="border-t border-shell-border bg-gradient-to-b
                        from-egg-white to-amber-50/20">
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">

        <div className="text-4xl mb-6">🥚</div>

        <h2 className="font-serif text-4xl text-shell-dark mb-4">
          want to build something like this?
        </h2>

        <p className="text-aged-cream text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          I'm available for freelance work, internships, and collabs.
          I build fast, ship real things, and reply within 24 hours.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/#contact" className="btn-primary text-base px-8 py-3.5">
            let's talk →
          </a>
          <Link
            to="/projects"
            className="btn-secondary text-base px-8 py-3.5 inline-flex items-center gap-2"
          >
            see all projects
            <ArrowIcon />
          </Link>
        </div>

      </div>
    </section>
  )
}