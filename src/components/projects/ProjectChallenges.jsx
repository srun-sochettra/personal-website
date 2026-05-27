// ============================================
// ProjectChallenges — what was hard + what I'd do differently
// The section that wins interviews
// ============================================

import ScrollReveal from "../ui/ScrollReveal"

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
         className="text-red-400 flex-shrink-0 mt-0.5">
      <circle cx="12" cy="12" r="10"/>
      <line x1="15" y1="9" x2="9" y2="15"/>
      <line x1="9" y1="9" x2="15" y2="15"/>
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
         className="text-yolk-gold flex-shrink-0 mt-0.5">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  )
}

export default function ProjectChallenges({ challenges }) {
  if (!challenges) return null
  const { hard, different } = challenges
  if (!hard?.length && !different?.length) return null

  return (
    <div className="mb-16">
      <ScrollReveal>
        <div className="flex items-center gap-3 mb-8">
          <span className="section-label">lessons</span>
          <div className="flex-1 h-px bg-shell-border" />
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-6">

        {/* What was hard */}
        {hard?.length > 0 && (
          <ScrollReveal delay={0}>
            <div className="card h-full">
              <h3 className="font-serif text-lg text-shell-dark mb-5">
                what was hard
              </h3>
              <ul className="space-y-4">
                {hard.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckIcon />
                    <p className="text-aged-cream text-sm leading-relaxed">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        )}

        {/* What I'd do differently */}
        {different?.length > 0 && (
          <ScrollReveal delay={100}>
            <div className="card h-full">
              <h3 className="font-serif text-lg text-shell-dark mb-5">
                what I'd do differently
              </h3>
              <ul className="space-y-4">
                {different.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <ArrowIcon />
                    <p className="text-aged-cream text-sm leading-relaxed">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        )}

      </div>
    </div>
  )
}