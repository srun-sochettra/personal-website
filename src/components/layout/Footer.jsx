import { useRef } from "react"
import { Link } from "react-router-dom"
import { useTripleClick } from "../../hooks/useKeySequence"

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/devlog", label: "Devlog" },
  { to: "/guestbook", label: "Guestbook" },
]

function GitHubIcon({ size = 15 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function ArrowUpIcon({ size = 15 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  )
}

function ExternalIcon({ size = 13 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

function BackToTopButton() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="inline-flex items-center gap-1.5 rounded-full border border-shell-border/70
                 bg-white/60 px-3 py-2 text-xs font-medium text-aged-cream
                 shadow-sm backdrop-blur-sm transition-all duration-200
                 hover:-translate-y-0.5 hover:border-yolk-gold/35 hover:text-yolk-gold
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yolk-gold/40"
      aria-label="Back to top"
    >
      <ArrowUpIcon />
      top
    </button>
  )
}

export default function Footer({ onEggCouncil }) {
  const eggGuyRef = useRef(null)
  useTripleClick(eggGuyRef, onEggCouncil)

  const year = new Date().getFullYear()

  return (
    <footer
      className="relative overflow-hidden border-t border-shell-border/80 bg-egg-white
                 before:pointer-events-none before:absolute before:inset-0
                 before:bg-[radial-gradient(circle_at_bottom_right,rgba(245,184,0,0.10),transparent_34%)]"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr_1fr] md:items-start">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full outline-none
                         focus-visible:ring-2 focus-visible:ring-yolk-gold/40"
              aria-label="Go to homepage"
            >
              <span className="font-serif text-2xl text-yolk-gold">
                Sochettra
              </span>

              <span
                className="rounded-full border border-yolk-gold/20 bg-yolk-gold/10
                           px-2 py-0.5 text-[0.62rem] font-medium uppercase tracking-[0.18em]
                           text-yolk-gold"
              >
                builder
              </span>
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-aged-cream/75">
              Full-stack, AI, mobile, and hardware projects. Built by an{" "}
              <span
                ref={eggGuyRef}
                className="cursor-pointer select-none font-medium text-shell-dark
                           transition-colors hover:text-yolk-gold"
                title="triple click me"
              >
                egg guy
              </span>
              .
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-aged-cream/60">
              explore
            </p>

            <div className="grid grid-cols-2 gap-2 sm:max-w-xs">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-2xl border border-transparent px-3 py-2 text-sm
                             text-aged-cream transition-all duration-200
                             hover:border-shell-border/70 hover:bg-white/55 hover:text-shell-dark
                             focus-visible:outline-none focus-visible:ring-2
                             focus-visible:ring-yolk-gold/40"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Right actions */}
          <div className="flex flex-col gap-4 md:items-end">
            <div className="flex flex-wrap gap-2 md:justify-end">
              <a
                href="https://github.com/SRUN-Sochettra"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-shell-border/70
                           bg-white/60 px-3 py-2 text-xs font-medium text-aged-cream
                           shadow-sm backdrop-blur-sm transition-all duration-200
                           hover:-translate-y-0.5 hover:border-yolk-gold/35 hover:text-shell-dark
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yolk-gold/40"
              >
                <GitHubIcon />
                SRUN-Sochettra
                <ExternalIcon />
              </a>

              <BackToTopButton />
            </div>

            <div
              className="rounded-3xl border border-shell-border/70 bg-white/50 p-4 text-sm
                         text-aged-cream/75 shadow-sm backdrop-blur-sm md:max-w-xs md:text-right"
            >
              <p className="font-serif text-lg text-shell-dark">
                still shipping.
              </p>

              <p className="mt-1 leading-6">
                If something here looks weird, it was probably intentional.
                Or shipped too fast.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-8 flex flex-col gap-4 border-t border-shell-border/80 pt-6
                     text-xs text-aged-cream/55 md:flex-row md:items-center md:justify-between"
        >
          <p>
            © {year} Srun Sochettra. Built with React, caffeine, and suspicious egg energy.
          </p>

          <p className="leading-6">
            type{" "}
            <kbd className="rounded border border-shell-border/70 bg-white/60 px-1.5 py-0.5 font-mono text-[10px] text-aged-cream">
              egg
            </kbd>{" "}
            anywhere · press{" "}
            <kbd className="rounded border border-shell-border/70 bg-white/60 px-1.5 py-0.5 font-mono text-[10px] text-aged-cream">
              _
            </kbd>{" "}
            for terminal
          </p>
        </div>
      </div>
    </footer>
  )
}