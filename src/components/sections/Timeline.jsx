// ============================================
// Timeline — journey from first line to now
// ============================================

import ScrollReveal from "../ui/ScrollReveal"
import { timelineEntries } from "../../data/timeline"

// ─── Icons ────────────────────────────────────────────────────────────────────

function CodeIcon({ size = 22 }) {
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

function StarIcon({ size = 22 }) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function GraduationIcon({ size = 22 }) {
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
      <path d="M22 10 12 5 2 10l10 5 10-5z" />
      <path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
    </svg>
  )
}

function ToolIcon({ size = 22 }) {
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

function RocketIcon({ size = 22 }) {
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
      <path d="M4.5 16.5c-1.5 1.26-2 4-2 4s2.74-.5 4-2c.84-.99.77-2.48-.16-3.4-.93-.93-2.41-1-3.4-.16z" />
      <path d="M9 15 15 9" />
      <path d="M15 9h5V4h-5c-3.5 0-6 2.5-6 6v1l-4 4 4 4 4-4h1c3.5 0 6-2.5 6-6z" />
    </svg>
  )
}

function ArrowRightIcon({ size = 14 }) {
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

function TimelineIcon({ entry, highlight }) {
  // Supports:
  // entry.iconKey = "code" | "star" | "graduation" | "tool" | "rocket"
  // entry.type = "img"
  // entry.icon = image url / legacy emoji / text fallback

  const iconClass = highlight ? "text-yolk-gold" : "text-aged-cream"

  if (entry.type === "img" && entry.icon) {
    return (
      <img
        src={`${entry.icon}?color=${encodeURIComponent(
          highlight ? "#D4A017" : "#9C8A6E"
        )}`}
        alt=""
        className="h-6 w-6"
        aria-hidden="true"
      />
    )
  }

  const map = {
    code: CodeIcon,
    star: StarIcon,
    graduation: GraduationIcon,
    tool: ToolIcon,
    rocket: RocketIcon,
  }

  const Icon = map[entry.iconKey] ?? map[entry.kind] ?? CodeIcon

  return <Icon size={22} className={iconClass} />
}

// ─── Marker ───────────────────────────────────────────────────────────────────

function YearPill({ year, highlight }) {
  return (
    <span
      className={`
        inline-flex rounded-full border px-3 py-1
        text-[10px] font-semibold uppercase tracking-[0.18em] whitespace-nowrap
        ${
          highlight
            ? "border-yolk-gold/40 bg-yolk-gold/10 text-yolk-gold"
            : "border-shell-border/80 bg-white/70 text-aged-cream/80"
        }
      `}
    >
      {year}
    </span>
  )
}

function TimelineMarker({ year, highlight }) {
  return (
    <div className="relative z-10 flex flex-col items-center">
      <YearPill year={year} highlight={highlight} />

      <div className="relative mt-3 flex items-center justify-center">
        {highlight && (
          <span className="absolute h-9 w-9 rounded-full bg-yolk-gold/15 animate-pulse" />
        )}

        <span
          className={`
            relative h-4 w-4 rounded-full border-2 transition-all duration-300
            ${
              highlight
                ? "border-yolk-gold bg-yolk-gold shadow-egg"
                : "border-shell-border bg-egg-white"
            }
          `}
        />
      </div>
    </div>
  )
}

function MobileMarker({ highlight }) {
  return (
    <div className="absolute left-0 top-7 z-10 flex items-center justify-center md:hidden">
      <div className="relative flex h-4 w-4 items-center justify-center">
        {highlight && (
          <span className="absolute h-7 w-7 rounded-full bg-yolk-gold/15 animate-pulse" />
        )}

        <span
          className={`
            relative h-3.5 w-3.5 rounded-full border-2
            ${
              highlight
                ? "border-yolk-gold bg-yolk-gold"
                : "border-shell-border bg-egg-white"
            }
          `}
        />
      </div>
    </div>
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function TimelineCard({ entry, side = "right", mobile = false }) {
  const highlight = Boolean(entry.highlight)
  const alignRight = side === "left"

  return (
    <article className={`relative ${alignRight ? "md:text-right" : ""}`}>
      <div
        className={`
          group relative overflow-hidden rounded-3xl border p-5 shadow-sm backdrop-blur-sm
          transition-all duration-300
          hover:-translate-y-1 hover:shadow-xl hover:shadow-yolk-gold/5
          ${
            highlight
              ? "border-yolk-gold/35 bg-gradient-to-br from-white/85 via-egg-white to-amber-50/60"
              : "border-shell-border/80 bg-white/65"
          }
        `}
      >
        {/* Soft glow */}
        <div
          className={`
            pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl
            transition-all duration-300
            ${highlight ? "bg-yolk-gold/12 group-hover:bg-yolk-gold/20" : "bg-yolk-gold/5"}
          `}
        />

        {/* Connector line to center spine — desktop only */}
        {!mobile && (
          <div
            className={`
              hidden md:block absolute top-10 h-px w-10
              ${highlight ? "bg-yolk-gold/40" : "bg-shell-border"}
              ${alignRight ? "-right-10" : "-left-10"}
            `}
            aria-hidden="true"
          />
        )}

        <div className="relative">
          {/* Mobile year */}
          <div className="mb-4 md:hidden">
            <YearPill year={entry.year} highlight={highlight} />
          </div>

          {/* Header */}
          <div
            className={`
              mb-3 flex items-start gap-3
              ${alignRight ? "md:flex-row-reverse" : ""}
            `}
          >
            <div
              className={`
                mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border
                shadow-sm transition-all duration-300 group-hover:scale-105
                ${
                  highlight
                    ? "border-yolk-gold/30 bg-yolk-gold/10 text-yolk-gold"
                    : "border-shell-border bg-amber-50/45 text-aged-cream"
                }
              `}
            >
              <TimelineIcon entry={entry} highlight={highlight} />
            </div>

            <div className={`min-w-0 flex-1 ${alignRight ? "md:text-right" : ""}`}>
              <div
                className={`
                  flex flex-wrap items-center gap-2
                  ${alignRight ? "md:justify-end" : ""}
                `}
              >
                <h3 className="font-serif text-xl leading-snug text-shell-dark transition-colors group-hover:text-yolk-gold">
                  {entry.title}
                </h3>

                {highlight && (
                  <span className="inline-flex rounded-full border border-yolk-gold/20 bg-yolk-gold/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-yolk-gold/90">
                    milestone
                  </span>
                )}
              </div>

              {(entry.tag || entry.meta) && (
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-aged-cream/55">
                  {entry.tag ?? entry.meta}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <p
            className={`
              text-sm leading-relaxed text-aged-cream
              ${alignRight ? "md:text-right" : ""}
            `}
          >
            {entry.description}
          </p>

          {entry.href && (
            <div className={`mt-4 flex ${alignRight ? "md:justify-end" : ""}`}>
              <a
                href={entry.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-shell-border/80
                           bg-white/60 px-3 py-1.5 text-xs font-medium text-aged-cream
                           transition-all duration-200 hover:border-yolk-gold/35 hover:text-shell-dark"
              >
                open
                <ArrowRightIcon />
              </a>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

// ─── Entries ──────────────────────────────────────────────────────────────────

function DesktopTimelineEntry({ entry, index }) {
  const isLeft = entry.side === "left"

  return (
    <ScrollReveal delay={index * 90} direction={isLeft ? "right" : "left"}>
      <div className="hidden md:grid md:grid-cols-[minmax(0,1fr)_96px_minmax(0,1fr)] md:items-start">
        {isLeft ? (
          <>
            <div className="pr-10">
              <TimelineCard entry={entry} side="left" />
            </div>

            <div className="flex justify-center">
              <TimelineMarker year={entry.year} highlight={entry.highlight} />
            </div>

            <div />
          </>
        ) : (
          <>
            <div />

            <div className="flex justify-center">
              <TimelineMarker year={entry.year} highlight={entry.highlight} />
            </div>

            <div className="pl-10">
              <TimelineCard entry={entry} side="right" />
            </div>
          </>
        )}
      </div>
    </ScrollReveal>
  )
}

function MobileTimelineEntry({ entry, index }) {
  return (
    <ScrollReveal delay={index * 70} direction="up">
      <div className="relative pl-10 md:hidden">
        <MobileMarker highlight={entry.highlight} />
        <TimelineCard entry={entry} mobile />
      </div>
    </ScrollReveal>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Timeline() {
  return (
    <section
      className="section relative overflow-hidden bg-gradient-to-b from-egg-white via-egg-white to-amber-50/25"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-yolk-gold/7 blur-3xl" />
        <div className="absolute -left-24 bottom-10 h-64 w-64 rounded-full bg-amber-200/15 blur-3xl" />
      </div>

      <div className="section-inner relative z-10">
        <ScrollReveal className="mx-auto mb-16 max-w-2xl text-center">
          <p className="section-label">the journey</p>

          <h2 className="section-heading">from first line to now</h2>

          <p className="section-subheading mx-auto mt-4">
            A few points in the timeline that shaped how I build.
          </p>
        </ScrollReveal>

        <div className="relative mx-auto max-w-5xl">
          {/* Mobile spine */}
          <div
            className="absolute bottom-0 left-[7px] top-0 w-px bg-gradient-to-b
                       from-transparent via-shell-border to-transparent md:hidden"
            aria-hidden="true"
          />

          {/* Desktop spine */}
          <div
            className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2
                       bg-gradient-to-b from-transparent via-shell-border to-transparent md:block"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-8 md:gap-12">
            {timelineEntries.map((entry, index) => (
              <div key={entry.id ?? `${entry.year}-${entry.title}`}>
                <MobileTimelineEntry entry={entry} index={index} />
                <DesktopTimelineEntry entry={entry} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
