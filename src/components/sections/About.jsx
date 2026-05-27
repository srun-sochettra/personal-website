import ScrollReveal from "../ui/ScrollReveal"

const EGGSCAN_VERDICT = {
  avatar: "https://github.com/SRUN-Sochettra.png",
  name: "SRUN-Sochettra",
  score: 88,
  tier: "Golden Egg",
  verdict: "Prolific builder. Ships fast. Diverse stack. Strong momentum.",
}

const STACKS = [
  "React",
  "Spring Boot",
  "Flutter",
  "PostgreSQL",
  "Raspberry Pi",
  "AI agents",
]

// ─── Icons ────────────────────────────────────────────────────────────────────

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

function MailIcon({ size = 15 }) {
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
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function ExternalIcon({ size = 12 }) {
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

function EggIcon({ size = 16 }) {
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
      <path d="M12 22c4.2 0 7-3.2 7-8.1C19 8.2 15.6 2 12 2S5 8.2 5 13.9C5 18.8 7.8 22 12 22z" />
    </svg>
  )
}

function SparkIcon({ size = 14 }) {
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
      <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3z" />
      <path d="M19 14l.9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14z" />
    </svg>
  )
}

function CheckIcon({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

// ─── Small Pieces ─────────────────────────────────────────────────────────────

function StackPill({ children }) {
  return (
    <span
      className="inline-flex items-center rounded-full border border-shell-border/70
                 bg-white/60 px-3 py-1.5 text-xs font-medium text-aged-cream
                 backdrop-blur-sm"
    >
      {children}
    </span>
  )
}

function SignalRow({ children }) {
  return (
    <li className="flex items-center gap-2 text-sm text-aged-cream/80">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-yolk-gold/10 text-yolk-gold">
        <CheckIcon size={12} />
      </span>
      {children}
    </li>
  )
}

// ─── Verdict Card ─────────────────────────────────────────────────────────────

function EggScanVerdictCard() {
  return (
    <div
      className="group relative overflow-hidden rounded-[2rem]
                 border border-yolk-gold/25 bg-white/70 p-6 shadow-sm
                 backdrop-blur-sm transition-all duration-300
                 hover:-translate-y-1 hover:border-yolk-gold/40
                 hover:shadow-xl hover:shadow-yolk-gold/10"
    >
      {/* Glow */}
      <div
        className="absolute -right-14 -top-14 h-40 w-40 rounded-full
                   bg-yolk-gold/10 blur-3xl transition-all
                   group-hover:bg-yolk-gold/20"
      />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px
                   bg-gradient-to-r from-transparent via-yolk-gold/40 to-transparent
                   opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Header */}
      <div className="relative mb-5 flex items-center justify-between border-b border-shell-border/60 pb-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-aged-cream/60">
            EggScan preview
          </p>

          <p className="mt-1 font-serif text-xl text-shell-dark">
            GitHub profile verdict
          </p>
        </div>

        <span
          className="inline-flex items-center gap-1.5 rounded-full border border-yolk-gold/25
                     bg-yolk-gold/10 px-2.5 py-1 text-xs font-medium text-yolk-gold"
        >
          <SparkIcon />
          AI analysis
        </span>
      </div>

      {/* Profile */}
      <div className="relative mb-5 flex items-center gap-3">
        <img
          src={EGGSCAN_VERDICT.avatar}
          alt={`${EGGSCAN_VERDICT.name} GitHub avatar`}
          className="h-12 w-12 rounded-full border-2 border-yolk-gold/30 shadow-sm"
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/48x48/FAF6EE/D4A847?text=S"
          }}
        />

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-shell-dark">
            {EGGSCAN_VERDICT.name}
          </p>

          <p className="truncate text-xs text-aged-cream/70">
            github.com/{EGGSCAN_VERDICT.name}
          </p>
        </div>
      </div>

      {/* Score */}
      <div className="relative mb-4 flex items-end justify-between gap-4">
        <div className="flex items-end gap-3">
          <div
            className="bg-gradient-to-br from-yolk-gold to-amber-500
                       bg-clip-text font-serif text-5xl font-bold leading-none
                       text-transparent"
          >
            {EGGSCAN_VERDICT.score}
          </div>

          <div className="pb-1.5">
            <div className="flex items-center gap-1.5 text-shell-dark">
              <span className="text-yolk-gold">
                <EggIcon size={16} />
              </span>

              <span className="text-sm font-semibold">
                {EGGSCAN_VERDICT.tier}
              </span>
            </div>

            <p className="mt-0.5 text-xs text-aged-cream/60">
              profile score
            </p>
          </div>
        </div>

        <span className="pb-2 text-xs font-medium text-aged-cream/60">
          /100
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative mb-5 h-2.5 w-full overflow-hidden rounded-full bg-shell-border/70">
        <div
          className="h-full rounded-full bg-gradient-to-r from-yolk-gold to-amber-500"
          style={{ width: `${EGGSCAN_VERDICT.score}%` }}
        />

        <div
          className="absolute inset-0 bg-gradient-to-r
                     from-transparent via-white/40 to-transparent
                     animate-[shimmer_2s_infinite]"
        />
      </div>

      {/* Verdict */}
      <blockquote
        className="relative mb-5 rounded-2xl border border-shell-border/70
                   bg-white/55 p-4 text-sm italic leading-relaxed
                   text-aged-cream/90"
      >
        “{EGGSCAN_VERDICT.verdict}”
      </blockquote>

      {/* Signals */}
      <ul className="mb-5 grid gap-2">
        <SignalRow>Diverse project portfolio</SignalRow>
        <SignalRow>Consistent shipping momentum</SignalRow>
        <SignalRow>Strong full-stack signal</SignalRow>
      </ul>

      {/* CTA */}
      <a
        href="https://eggscan.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2 rounded-2xl
                   border border-shell-border bg-white/60 py-3 text-sm font-medium
                   text-aged-cream transition-all duration-200
                   hover:border-yolk-gold/40 hover:bg-white hover:text-shell-dark
                   focus-visible:outline-none focus-visible:ring-2
                   focus-visible:ring-yolk-gold/40"
      >
        scan your GitHub
        <ExternalIcon />
      </a>
    </div>
  )
}

// ─── About Section ────────────────────────────────────────────────────────────

export default function About() {
  return (
    <section
      id="about"
      className="section relative overflow-hidden bg-egg-white
                 before:pointer-events-none before:absolute before:inset-0
                 before:bg-[radial-gradient(circle_at_top_left,rgba(245,184,0,0.08),transparent_34%)]"
    >
      <div className="section-inner relative z-10">
        <ScrollReveal>
          <p className="section-label">about</p>
        </ScrollReveal>

        <div className="grid items-start gap-12 md:grid-cols-2 lg:gap-20">
          <div>
            <ScrollReveal delay={100}>
              <h2 className="section-heading mb-6">the egg guy</h2>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="mb-5 text-lg leading-relaxed text-shell-dark">
                I'm a second-year IT student at the National University of
                Management in Phnom Penh. I build real things: full-stack apps,
                AI tools, hardware systems, and occasionally a browser-based
                desktop OS nobody asked for.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <p className="mb-7 leading-relaxed text-aged-cream/80">
                I care about shipping. Not just finishing tutorials or polishing
                fake case studies — actually building projects that run, break,
                teach me something, and get better with each version.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={350}>
              <div className="mb-8 flex flex-wrap gap-2">
                {STACKS.map((stack) => (
                  <StackPill key={stack}>{stack}</StackPill>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/SRUN-Sochettra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center gap-2 px-4 py-2 text-sm"
                >
                  <GitHubIcon />
                  GitHub
                </a>

                <a
                  href="mailto:srunsochettra@email.com"
                  className="btn-secondary inline-flex items-center gap-2 px-4 py-2 text-sm"
                >
                  <MailIcon />
                  Email
                </a>

                <a
                  href="https://eggscan.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 px-4 py-2 text-sm"
                >
                  <EggIcon />
                  EggScan
                </a>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={200} direction="left">
            <EggScanVerdictCard />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}