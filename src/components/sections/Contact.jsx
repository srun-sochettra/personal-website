import { useState } from "react"
import ScrollReveal from "../ui/ScrollReveal"

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID ?? "xpqnlgwk"

const CONTACT_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL ?? "srunsochettra@email.com"

// ─── Icons ────────────────────────────────────────────────────────────────────

function GitHubIcon({ size = 16 }) {
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

function MailIcon({ size = 16 }) {
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

function MapPinIcon({ size = 16 }) {
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
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function SendIcon({ size = 15 }) {
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
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

function CheckIcon({ size = 28 }) {
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

function AlertIcon({ size = 16 }) {
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
      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
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

// ─── UI Pieces ────────────────────────────────────────────────────────────────

function ContactCard({ href, label, description, icon, external = false }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-4 rounded-3xl border border-shell-border/80
                 bg-white/60 p-4 shadow-sm backdrop-blur-sm transition-all duration-300
                 hover:-translate-y-0.5 hover:border-yolk-gold/35 hover:bg-white/80
                 hover:shadow-md focus-visible:outline-none focus-visible:ring-2
                 focus-visible:ring-yolk-gold/40"
    >
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl
                   border border-yolk-gold/20 bg-yolk-gold/10 text-yolk-gold
                   transition-transform duration-300 group-hover:scale-105"
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-shell-dark">{label}</p>
        <p className="mt-0.5 text-xs leading-5 text-aged-cream/70">
          {description}
        </p>
      </div>

      {external && (
        <span className="text-aged-cream/50 transition-colors group-hover:text-yolk-gold">
          <ExternalIcon />
        </span>
      )}
    </a>
  )
}

function InfoPill({ icon, children }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border border-shell-border/70
                 bg-white/60 px-3 py-1.5 text-xs font-medium text-aged-cream
                 backdrop-blur-sm"
    >
      {icon}
      {children}
    </span>
  )
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  multiline = false,
  value,
  error,
  touched,
  onChange,
  onBlur,
}) {
  const hasError = touched && error
  const Tag = multiline ? "textarea" : "input"

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <label
          className="block text-xs font-semibold uppercase tracking-[0.18em]
                     text-aged-cream"
          htmlFor={name}
        >
          {label}
        </label>

        {hasError && (
          <span className="text-xs font-medium text-red-400">{error}</span>
        )}
      </div>

      <Tag
        id={name}
        name={name}
        type={multiline ? undefined : type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={multiline ? 6 : undefined}
        aria-invalid={Boolean(hasError)}
        aria-describedby={hasError ? `${name}-error` : undefined}
        className={`
          w-full rounded-2xl border px-4 py-3 text-sm text-shell-dark
          shadow-sm transition-all resize-none
          placeholder:text-aged-cream/40
          focus:outline-none focus:ring-2 focus:ring-yolk-gold/30
          ${
            hasError
              ? "border-red-300 bg-red-50/40 focus:border-red-300"
              : "border-shell-border/80 bg-white/65 focus:border-yolk-gold/50 focus:bg-white"
          }
        `}
      />

      {hasError && (
        <p id={`${name}-error`} className="sr-only">
          {error}
        </p>
      )}
    </div>
  )
}

function SuccessState({ onReset }) {
  return (
    <div
      className="relative overflow-hidden rounded-[2rem] border border-yolk-gold/30
                 bg-gradient-to-br from-white/85 via-egg-white to-amber-50/60
                 px-6 py-14 text-center shadow-xl shadow-yolk-gold/10"
    >
      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-yolk-gold/10 blur-3xl" />

      <div className="relative flex flex-col items-center">
        <div
          className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl
                     border border-yolk-gold/35 bg-yolk-gold/10 text-yolk-gold"
        >
          <CheckIcon />
        </div>

        <h3 className="font-serif text-2xl text-shell-dark">
          message received.
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-aged-cream/75">
          You’re golden. I’ll get back to you soon.
        </p>

        <button
          type="button"
          onClick={onReset}
          className="btn-ghost mt-6 text-sm"
        >
          send another message
        </button>
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [status, setStatus] = useState("idle")
  const [touched, setTouched] = useState({})

  const contactLinks = [
    {
      href: "https://github.com/SRUN-Sochettra",
      label: "SRUN-Sochettra",
      description: "GitHub profile and project source code.",
      icon: <GitHubIcon />,
      external: true,
    },
    {
      href: `mailto:${CONTACT_EMAIL}`,
      label: CONTACT_EMAIL,
      description: "Direct email for projects or collaboration.",
      icon: <MailIcon />,
    },
  ]

  const errors = {
    name: !form.name.trim() ? "required" : null,
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
      ? "invalid email"
      : null,
    message:
      form.message.trim().length < 10 ? "10 characters minimum" : null,
  }

  const isValid = !Object.values(errors).some(Boolean)

  function handleChange(event) {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))

    if (status === "error") {
      setStatus("idle")
    }
  }

  function handleBlur(event) {
    setTouched((current) => ({
      ...current,
      [event.target.name]: true,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setTouched({
      name: true,
      email: true,
      message: true,
    })

    if (!isValid) return

    setStatus("loading")

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      })

      if (!response.ok) {
        setStatus("error")
        return
      }

      setStatus("success")
      setForm({
        name: "",
        email: "",
        message: "",
      })
      setTouched({})
    } catch {
      setStatus("error")
    }
  }

  return (
    <section
      id="contact"
      className="section relative overflow-hidden bg-egg-white
                 before:pointer-events-none before:absolute before:inset-0
                 before:bg-[radial-gradient(circle_at_top_right,rgba(245,184,0,0.09),transparent_34%)]"
    >
      <div className="section-inner relative z-10">
        <ScrollReveal className="mx-auto mb-12 max-w-2xl text-center">
          <p className="section-label">get in touch</p>

          <h2 className="section-heading">let's build something</h2>

          <p className="section-subheading mx-auto mt-4">
            Project idea, collaboration, question, or a weird useful thing you
            want built — send it over.
          </p>
        </ScrollReveal>

        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left info */}
          <ScrollReveal direction="right">
            <aside
              className="relative overflow-hidden rounded-[2rem] border border-shell-border/80
                         bg-white/60 p-6 shadow-sm backdrop-blur-sm"
            >
              <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-yolk-gold/7 blur-3xl" />

              <div className="relative">
                <p className="section-label mb-3">availability</p>

                <h3 className="font-serif text-3xl leading-tight text-shell-dark">
                  Got a project?
                  <br />
                  Tell me the scope.
                </h3>

                <p className="mt-4 text-sm leading-6 text-aged-cream/75">
                  I reply fast — usually within 24 hours, sometimes much sooner.
                  The clearer the scope, the better the answer.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <InfoPill icon={<ClockIcon size={13} />}>
                    replies within 24h
                  </InfoPill>

                  <InfoPill icon={<MapPinIcon size={13} />}>
                    Phnom Penh, Cambodia
                  </InfoPill>
                </div>

                <div className="mt-8 space-y-3">
                  {contactLinks.map((link) => (
                    <ContactCard key={link.label} {...link} />
                  ))}

                  <div
                    className="flex items-center gap-4 rounded-3xl border border-shell-border/80
                               bg-white/50 p-4 text-aged-cream shadow-sm backdrop-blur-sm"
                  >
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl
                                 border border-shell-border bg-egg-white"
                    >
                      <MapPinIcon />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-shell-dark">
                        Phnom Penh, Cambodia
                      </p>
                      <p className="mt-0.5 text-xs text-aged-cream/70">
                        Remote-friendly. Local-friendly too.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </ScrollReveal>

          {/* Right form */}
          <ScrollReveal direction="left" delay={100}>
            {status === "success" ? (
              <SuccessState onReset={() => setStatus("idle")} />
            ) : (
              <form
                onSubmit={handleSubmit}
                className="relative overflow-hidden rounded-[2rem] border border-shell-border/80
                           bg-white/65 p-6 shadow-sm backdrop-blur-sm"
                noValidate
              >
                <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-yolk-gold/7 blur-3xl" />

                <div className="relative">
                  <div className="mb-6">
                    <p className="section-label mb-2">message</p>

                    <h3 className="font-serif text-2xl text-shell-dark">
                      What are we building?
                    </h3>
                  </div>

                  <div className="space-y-5">
                    <Field
                      name="name"
                      label="name"
                      placeholder="your name"
                      value={form.name}
                      error={errors.name}
                      touched={touched.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <Field
                      name="email"
                      label="email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      error={errors.email}
                      touched={touched.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <Field
                      name="message"
                      label="message"
                      placeholder="what are we building?"
                      multiline
                      value={form.message}
                      error={errors.message}
                      touched={touched.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    {status === "error" && (
                      <div
                        className="flex items-start gap-3 rounded-2xl border border-red-200
                                   bg-red-50/60 px-4 py-3 text-sm text-red-500"
                      >
                        <AlertIcon />
                        <p>
                          Something went wrong. Try again, or email me directly
                          at{" "}
                          <a
                            href={`mailto:${CONTACT_EMAIL}`}
                            className="font-medium underline underline-offset-2"
                          >
                            {CONTACT_EMAIL}
                          </a>
                          .
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="btn-primary inline-flex w-full items-center justify-center gap-2
                                 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "loading" ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                          sending...
                        </span>
                      ) : (
                        <>
                          <SendIcon />
                          send message
                        </>
                      )}
                    </button>

                    <p className="border-t border-shell-border/70 pt-4 text-xs leading-5 text-aged-cream/55">
                      This form uses Formspree. If the form fails, email is the
                      backup route.
                    </p>
                  </div>
                </div>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}