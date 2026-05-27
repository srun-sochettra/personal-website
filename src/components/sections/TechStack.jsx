// ============================================
// TechStack — icon badges grouped by category
// ============================================

import ScrollReveal from "../ui/ScrollReveal"
import { techStack } from "../../data/techStack"

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

function ToolIcon({ size = 16 }) {
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
      <path d="M14.7 6.3a4 4 0 0 0-5 5L3 18v3h3l6.7-6.7a4 4 0 0 0 5-5l-2.5 2.5-2.9-2.9 2.4-2.6z" />
    </svg>
  )
}

function DatabaseIcon({ size = 16 }) {
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
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5" />
      <path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3" />
    </svg>
  )
}

function ChipIcon({ size = 16 }) {
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
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <rect x="10" y="10" width="4" height="4" rx="1" />
      <line x1="4" y1="9" x2="7" y2="9" />
      <line x1="4" y1="15" x2="7" y2="15" />
      <line x1="17" y1="9" x2="20" y2="9" />
      <line x1="17" y1="15" x2="20" y2="15" />
      <line x1="9" y1="4" x2="9" y2="7" />
      <line x1="15" y1="4" x2="15" y2="7" />
      <line x1="9" y1="17" x2="9" y2="20" />
      <line x1="15" y1="17" x2="15" y2="20" />
    </svg>
  )
}

function GroupIcon({ group }) {
  const normalized = group.toLowerCase()

  if (normalized.includes("database") || normalized.includes("backend")) {
    return <DatabaseIcon />
  }

  if (
    normalized.includes("hardware") ||
    normalized.includes("iot") ||
    normalized.includes("embedded")
  ) {
    return <ChipIcon />
  }

  if (
    normalized.includes("tool") ||
    normalized.includes("dev") ||
    normalized.includes("workflow")
  ) {
    return <ToolIcon />
  }

  if (
    normalized.includes("frontend") ||
    normalized.includes("mobile") ||
    normalized.includes("web")
  ) {
    return <CodeIcon />
  }

  return <LayersIcon />
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getCoreStack() {
  return Object.values(techStack)
    .flat()
    .slice(0, 6)
}

function TechBadge({ tech }) {
  return (
    <div
      className="group/badge relative inline-flex items-center gap-2 rounded-2xl border
                 border-shell-border/70 bg-white/65 px-3.5 py-2 text-sm font-medium
                 text-shell-dark shadow-sm backdrop-blur-sm transition-all duration-200
                 hover:-translate-y-0.5 hover:border-yolk-gold/35 hover:bg-white/85
                 hover:shadow-md"
      style={{
        borderLeftColor: tech.color,
        borderLeftWidth: "3px",
      }}
      title={tech.name}
    >
      <span
        className="h-2.5 w-2.5 shrink-0 rounded-full shadow-sm transition-transform duration-200
                   group-hover/badge:scale-125"
        style={{ backgroundColor: tech.color }}
        aria-hidden="true"
      />

      <span className="transition-colors duration-200 group-hover/badge:text-yolk-gold">
        {tech.name}
      </span>
    </div>
  )
}

function CoreStackCard() {
  const core = getCoreStack()

  if (core.length === 0) return null

  return (
    <ScrollReveal delay={80}>
      <div
        className="relative overflow-hidden rounded-[2rem] border border-yolk-gold/25
                   bg-gradient-to-br from-white/80 via-egg-white to-amber-50/60
                   p-6 shadow-sm backdrop-blur-sm"
      >
        <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-yolk-gold/10 blur-3xl" />

        <div className="relative">
          <div className="mb-4 flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-2xl border
                         border-yolk-gold/20 bg-yolk-gold/10 text-yolk-gold"
            >
              <LayersIcon size={20} />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-aged-cream/60">
                core stack
              </p>
              <h3 className="font-serif text-2xl text-shell-dark">
                tools I reach for first
              </h3>
            </div>
          </div>

          <p className="mb-5 max-w-2xl text-sm leading-6 text-aged-cream/75">
            The stack changes depending on the project, but these are the tools
            that usually show up when I need to build and ship fast.
          </p>

          <div className="flex flex-wrap gap-2">
            {core.map((tech) => (
              <TechBadge key={tech.name} tech={tech} />
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}

function TechGroup({ group, techs, index }) {
  return (
    <ScrollReveal delay={index * 80}>
      <section
        className="group relative overflow-hidden rounded-[2rem] border border-shell-border/80
                   bg-white/60 p-5 shadow-sm backdrop-blur-sm transition-all duration-300
                   hover:-translate-y-1 hover:border-yolk-gold/35 hover:bg-white/80
                   hover:shadow-xl hover:shadow-yolk-gold/5"
      >
        <div
          className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full
                     bg-yolk-gold/5 blur-3xl transition-colors duration-300
                     group-hover:bg-yolk-gold/12"
        />

        <div className="relative">
          <div className="mb-5 flex items-center gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl
                         border border-yolk-gold/20 bg-yolk-gold/10 text-yolk-gold
                         transition-transform duration-300 group-hover:scale-105"
            >
              <GroupIcon group={group} />
            </div>

            <div className="min-w-0">
              <h3 className="font-serif text-xl text-shell-dark">{group}</h3>
              <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.18em] text-aged-cream/55">
                {techs.length} {techs.length === 1 ? "tool" : "tools"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {techs.map((tech) => (
              <TechBadge key={tech.name} tech={tech} />
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  )
}

export default function TechStack() {
  const groups = Object.entries(techStack)

  return (
    <section
      className="section relative overflow-hidden bg-egg-white
                 before:pointer-events-none before:absolute before:inset-0
                 before:bg-[radial-gradient(circle_at_top,rgba(245,184,0,0.09),transparent_34%)]"
    >
      <div className="section-inner relative z-10">
        <ScrollReveal className="mx-auto mb-12 max-w-2xl text-center">
          <p className="section-label">the toolbox</p>

          <h2 className="section-heading">tech stack</h2>

          <p className="section-subheading mx-auto mt-4">
            Tools I actually use across web apps, APIs, mobile builds, AI tools,
            and hardware projects.
          </p>
        </ScrollReveal>

        <div className="mb-6">
          <CoreStackCard />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {groups.map(([group, techs], index) => (
            <TechGroup
              key={group}
              group={group}
              techs={techs}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}