// ============================================
// HireCalculator — interactive quote estimator
// ============================================

import { useMemo, useState } from "react"
import ScrollReveal from "../ui/ScrollReveal"

const PROJECT_TYPES = [
  {
    id: "landing",
    label: "Landing page",
    base: 15,
    description: "One-page site, clean layout, responsive design.",
  },
  {
    id: "webapp",
    label: "Web app",
    base: 30,
    description: "Frontend app with pages, state, forms, and API integration.",
  },
  {
    id: "api",
    label: "API backend",
    base: 25,
    description: "REST API, database, auth, validation, and documentation.",
  },
  {
    id: "fullstack",
    label: "Full-stack",
    base: 50,
    description: "Frontend, backend, database, deployment, and integration.",
  },
  {
    id: "mobile",
    label: "Mobile app",
    base: 60,
    description: "Flutter app with screens, API calls, and app-state logic.",
  },
]

const COMPLEXITY = [
  {
    id: "simple",
    label: "Simple",
    multiplier: 1,
    description: "Small scope. Few screens. Straightforward logic.",
  },
  {
    id: "medium",
    label: "Medium",
    multiplier: 1.5,
    description: "Multiple flows, real data, auth, dashboards, or admin tools.",
  },
  {
    id: "complex",
    label: "Complex",
    multiplier: 2.2,
    description: "Custom logic, integrations, role systems, payments, or AI.",
  },
]

const TIMELINES = [
  {
    id: "asap",
    label: "ASAP",
    urgencyAdd: 10,
    description: "Rush build. Prioritized delivery.",
  },
  {
    id: "month",
    label: "1 month",
    urgencyAdd: 0,
    description: "Normal pace. Best balance.",
  },
  {
    id: "quarter",
    label: "3 months",
    urgencyAdd: 0,
    description: "Flexible timeline. More room to polish.",
  },
]

const STACK_SUGGESTIONS = {
  landing: "React + Tailwind",
  webapp: "React + Spring Boot",
  api: "Spring Boot + PostgreSQL",
  fullstack: "React + Spring Boot + PostgreSQL",
  mobile: "Flutter + Spring Boot",
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function CodeIcon({ size = 16 }) {
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
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

function ClockIcon({ size = 16 }) {
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
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 16 14" />
    </svg>
  )
}

function LayersIcon({ size = 16 }) {
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
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  )
}

function ArrowRightIcon({ size = 15 }) {
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
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
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
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function EggIcon({ size = 15 }) {
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

// ─── UI ───────────────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <p
      className="mb-3 flex items-center gap-3 text-[11px] font-semibold uppercase
                 tracking-[0.2em] text-aged-cream"
    >
      {children}
      <span className="h-px flex-1 bg-shell-border/60" />
    </p>
  )
}

function OptionCard({ option, selected, onSelect, icon: Icon }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option.id)}
      className={`
        group relative w-full rounded-2xl border p-4 text-left shadow-sm
        transition-all duration-200
        hover:-translate-y-0.5 hover:shadow-md
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yolk-gold/40
        ${
          selected
            ? "border-yolk-gold/50 bg-yolk-gold/10 text-shell-dark"
            : "border-shell-border/80 bg-white/60 text-aged-cream hover:border-yolk-gold/35 hover:bg-white/80 hover:text-shell-dark"
        }
      `}
    >
      <div className="flex items-start gap-3">
        <div
          className={`
            flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border
            transition-all duration-200
            ${
              selected
                ? "border-yolk-gold/30 bg-yolk-gold/15 text-yolk-gold"
                : "border-shell-border bg-egg-white text-aged-cream group-hover:text-yolk-gold"
            }
          `}
        >
          <Icon size={16} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold">{option.label}</p>

            {selected && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-yolk-gold text-white">
                <CheckIcon size={12} />
              </span>
            )}
          </div>

          <p className="mt-1 text-xs leading-5 text-aged-cream/75">
            {option.description}
          </p>
        </div>
      </div>
    </button>
  )
}

function OptionGroup({ label, options, selected, onSelect, icon }) {
  return (
    <div>
      <SectionLabel>{label}</SectionLabel>

      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <OptionCard
            key={option.id}
            option={option}
            selected={selected === option.id}
            onSelect={onSelect}
            icon={icon}
          />
        ))}
      </div>
    </div>
  )
}

function StackBadge({ children }) {
  return (
    <span
      className="inline-flex items-center rounded-full border border-shell-border/70
                 bg-white/65 px-2.5 py-1 text-xs font-medium text-aged-cream"
    >
      {children}
    </span>
  )
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-shell-border/60 py-3 last:border-b-0">
      <span className="text-xs font-medium uppercase tracking-[0.16em] text-aged-cream/65">
        {label}
      </span>

      <span className="text-right text-sm font-medium text-shell-dark">
        {value}
      </span>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function HireCalculator() {
  const [projectType, setProjectType] = useState("webapp")
  const [complexity, setComplexity] = useState("medium")
  const [timeline, setTimeline] = useState("month")
  const [contacted, setContacted] = useState(false)

  const estimate = useMemo(() => {
    const type = PROJECT_TYPES.find((project) => project.id === projectType)
    const complexityOption = COMPLEXITY.find((item) => item.id === complexity)
    const timelineOption = TIMELINES.find((item) => item.id === timeline)

    const baseMin = type.base
    const baseMax = Math.round(baseMin * 1.4)

    const min =
      Math.round(baseMin * complexityOption.multiplier) +
      timelineOption.urgencyAdd

    const max =
      Math.round(baseMax * complexityOption.multiplier) +
      timelineOption.urgencyAdd

    return {
      type,
      complexity: complexityOption,
      timeline: timelineOption,
      min,
      max,
      stack: STACK_SUGGESTIONS[projectType],
      eggMin: Math.round(min / 0.25),
      eggMax: Math.round(max / 0.25),
    }
  }, [projectType, complexity, timeline])

  return (
    <section
      className="section relative overflow-hidden bg-gradient-to-b from-egg-white to-amber-50/30
                 before:pointer-events-none before:absolute before:inset-0
                 before:bg-[radial-gradient(circle_at_top,rgba(245,184,0,0.09),transparent_34%)]"
    >
      <div className="section-inner relative z-10">
        <ScrollReveal className="mx-auto mb-12 max-w-2xl text-center">
          <p className="section-label">hire me</p>

          <h2 className="section-heading">rough project estimator</h2>

          <p className="section-subheading mx-auto mt-4">
            Not a real invoice. Just a quick way to frame scope before we talk.
          </p>
        </ScrollReveal>

        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_380px]">
          {/* Controls */}
          <ScrollReveal>
            <div
              className="relative overflow-hidden rounded-[2rem] border border-shell-border/80
                         bg-white/65 p-5 shadow-sm backdrop-blur-sm sm:p-6"
            >
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-yolk-gold/7 blur-3xl" />

              <div className="relative space-y-8">
                <OptionGroup
                  label="what do you need?"
                  options={PROJECT_TYPES}
                  selected={projectType}
                  onSelect={setProjectType}
                  icon={CodeIcon}
                />

                <OptionGroup
                  label="how complex?"
                  options={COMPLEXITY}
                  selected={complexity}
                  onSelect={setComplexity}
                  icon={LayersIcon}
                />

                <OptionGroup
                  label="timeline?"
                  options={TIMELINES}
                  selected={timeline}
                  onSelect={setTimeline}
                  icon={ClockIcon}
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Output */}
          <ScrollReveal delay={120} direction="left">
            <aside
              className="sticky top-24 overflow-hidden rounded-[2rem] border border-yolk-gold/25
                         bg-gradient-to-br from-white/85 via-egg-white to-amber-50/60
                         p-6 shadow-xl shadow-yolk-gold/10 backdrop-blur-sm"
            >
              <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-yolk-gold/10 blur-3xl" />

              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aged-cream/65">
                  estimated range
                </p>

                <div className="mt-3 flex flex-wrap items-end gap-x-2 gap-y-1">
                  <span className="font-serif text-5xl leading-none text-shell-dark">
                    ${estimate.min}
                  </span>

                  <span className="pb-1 text-xl text-aged-cream">–</span>

                  <span className="font-serif text-5xl leading-none text-shell-dark">
                    ${estimate.max}
                  </span>

                  <span className="pb-1 text-sm font-medium text-aged-cream">
                    USD
                  </span>
                </div>

                <p className="mt-3 flex items-center gap-1.5 text-xs text-aged-cream/70">
                  <EggIcon size={13} />
                  {estimate.eggMin.toLocaleString()}–
                  {estimate.eggMax.toLocaleString()} eggs, if paid in eggs.
                </p>

                <div className="my-6 h-px bg-shell-border/70" />

                <div className="rounded-3xl border border-shell-border/70 bg-white/60 p-4">
                  <SummaryRow label="project" value={estimate.type.label} />
                  <SummaryRow label="scope" value={estimate.complexity.label} />
                  <SummaryRow label="timeline" value={estimate.timeline.label} />
                </div>

                <div className="mt-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-aged-cream/65">
                    suggested stack
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {estimate.stack.split(" + ").map((stackItem) => (
                      <StackBadge key={stackItem}>{stackItem}</StackBadge>
                    ))}
                  </div>
                </div>

                <div className="mt-6 rounded-3xl border border-shell-border/70 bg-white/50 p-4">
                  <p className="font-serif text-lg text-shell-dark">
                    what affects the final price?
                  </p>

                  <ul className="mt-3 space-y-2 text-sm leading-6 text-aged-cream/75">
                    <li>• number of screens and user flows</li>
                    <li>• authentication, roles, dashboards, or payments</li>
                    <li>• database design and deployment requirements</li>
                    <li>• whether the deadline is relaxed or cursed</li>
                  </ul>
                </div>

                <div className="mt-6">
                  {contacted ? (
                    <p className="rounded-2xl border border-yolk-gold/25 bg-yolk-gold/10 px-4 py-3 text-sm font-medium text-yolk-gold">
                      scrolling you down ↓
                    </p>
                  ) : (
                    <a
                      href="#contact"
                      onClick={() => setContacted(true)}
                      className="btn-primary inline-flex w-full items-center justify-center gap-2"
                    >
                      sounds right? let's talk
                      <ArrowRightIcon />
                    </a>
                  )}
                </div>

                <p className="mt-5 border-t border-shell-border/70 pt-4 text-xs leading-5 text-aged-cream/55">
                  Estimates only. Actual scope gets discussed before any
                  commitment. I reply within 24 hours — sometimes 24 minutes.
                </p>
              </div>
            </aside>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}