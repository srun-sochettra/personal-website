import { useState, useRef, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { useTripleClick } from "../../hooks/useKeySequence"

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/devlog", label: "Devlog" },
  { to: "/guestbook", label: "Guestbook" },
]

function MenuIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
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

export default function Navbar({ onEggCouncil }) {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const nameRef = useRef(null)

  useTripleClick(nameRef, onEggCouncil)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12)

    handler()
    window.addEventListener("scroll", handler, { passive: true })

    return () => window.removeEventListener("scroll", handler)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") setOpen(false)
    }

    if (open) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [open])

  function isActive(to) {
    if (to === "/") return location.pathname === "/"
    return location.pathname === to || location.pathname.startsWith(`${to}/`)
  }

  return (
    <nav
      className={`
        sticky top-0 z-50 border-b transition-all duration-300
        ${
          scrolled
            ? "border-shell-border/80 bg-egg-white/85 shadow-sm backdrop-blur-xl"
            : "border-transparent bg-egg-white/70 backdrop-blur-md"
        }
      `}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          to="/"
          className="group inline-flex items-center gap-2 rounded-full outline-none
                     focus-visible:ring-2 focus-visible:ring-yolk-gold/50"
          aria-label="Go to homepage"
        >
          <span
            ref={nameRef}
            className="font-serif text-xl text-yolk-gold transition-opacity
                       group-hover:opacity-80 cursor-pointer select-none"
            title="try clicking 3 times"
          >
            Sochettra
          </span>

          <span
            className="hidden rounded-full border border-yolk-gold/20 bg-yolk-gold/10
                       px-2 py-0.5 text-[0.62rem] font-medium uppercase tracking-[0.18em]
                       text-yolk-gold sm:inline-flex"
          >
            builder
          </span>
        </Link>

        {/* Desktop links */}
        <div
          className="hidden items-center rounded-full border border-shell-border/70
                     bg-white/55 p-1 shadow-sm backdrop-blur-sm md:flex"
        >
          {NAV_LINKS.map((link) => {
            const active = isActive(link.to)

            return (
              <Link
                key={link.to}
                to={link.to}
                aria-current={active ? "page" : undefined}
                className={`
                  relative rounded-full px-4 py-2 text-sm transition-all duration-200
                  outline-none focus-visible:ring-2 focus-visible:ring-yolk-gold/40
                  ${
                    active
                      ? "bg-yolk-gold/10 text-yolk-gold shadow-sm"
                      : "text-aged-cream hover:bg-shell-border/20 hover:text-shell-dark"
                  }
                `}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Mobile button */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className={`
            inline-flex h-10 w-10 items-center justify-center rounded-2xl border
            transition-all duration-200 md:hidden
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yolk-gold/50
            ${
              open
                ? "border-yolk-gold/30 bg-yolk-gold/10 text-yolk-gold"
                : "border-shell-border bg-white/60 text-aged-cream hover:bg-shell-border/20 hover:text-shell-dark"
            }
          `}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile backdrop */}
      <div
        className={`
          fixed inset-0 top-16 z-40 bg-shell-dark/10 backdrop-blur-[2px]
          transition-opacity duration-200 md:hidden
          ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}
        `}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile menu */}
      <div
        id="mobile-navigation"
        className={`
          absolute left-0 right-0 top-16 z-50 border-b border-shell-border/80
          bg-egg-white/95 px-6 pb-6 pt-3 shadow-lg backdrop-blur-xl
          transition-all duration-250 md:hidden
          ${
            open
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-3 opacity-0"
          }
        `}
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-1 rounded-3xl border border-shell-border/70 bg-white/60 p-2 shadow-sm">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.to)

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  aria-current={active ? "page" : undefined}
                  className={`
                    flex items-center justify-between rounded-2xl px-4 py-3 text-sm
                    transition-all duration-200
                    ${
                      active
                        ? "bg-yolk-gold/10 text-yolk-gold"
                        : "text-aged-cream hover:bg-shell-border/20 hover:text-shell-dark"
                    }
                  `}
                >
                  <span>{link.label}</span>
                  {active && <ArrowIcon />}
                </Link>
              )
            })}
          </div>

          <div className="mt-4 rounded-3xl border border-shell-border/70 bg-white/50 p-4 text-sm text-aged-cream/75">
            <p className="font-serif text-lg text-shell-dark">Srun Sochettra</p>
            <p className="mt-1 leading-relaxed">
              Y2 IT student building full-stack, AI, mobile, and hardware projects.
            </p>
          </div>
        </div>
      </div>
    </nav>
  )
}