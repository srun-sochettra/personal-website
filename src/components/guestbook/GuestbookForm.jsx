// ============================================
// GuestbookForm — name + message + egg rating
// ============================================

import { useState, useCallback } from "react"
import { addGuestbookEntry } from "../../lib/supabase"

function SendIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  )
}

const EGG_RATINGS = [
  { value: 1, label: "🥚",         text: "raw"         },
  { value: 2, label: "🥚🥚",       text: "cracked"     },
  { value: 3, label: "🥚🥚🥚",     text: "good egg"    },
  { value: 4, label: "🥚🥚🥚🥚",   text: "golden"      },
  { value: 5, label: "🥚🥚🥚🥚🥚", text: "the egg"     },
]

export default function GuestbookForm({ onNewEntry }) {
  const [form, setForm]       = useState({ name: "", message: "" })
  const [eggRating, setEggRating] = useState(3)
  const [status, setStatus]   = useState("idle") // idle | loading | success | error
  const [touched, setTouched] = useState({})

  const errors = {
    name:    !form.name.trim()               ? "name is required"           : null,
    message: form.message.trim().length < 3  ? "say something (3+ chars)"  : null,
  }

  const isValid = !Object.values(errors).some(Boolean)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  function handleBlur(e) {
    setTouched(t => ({ ...t, [e.target.name]: true }))
  }

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    setTouched({ name: true, message: true })
    if (!isValid) return

    setStatus("loading")

    const result = await addGuestbookEntry({
      name:       form.name.trim(),
      message:    form.message.trim(),
      egg_rating: eggRating,
    })

    if (result.error) {
      setStatus("error")
    } else {
      setStatus("success")
      onNewEntry?.(result.data)

      // Reset after 3 seconds
      setTimeout(() => {
        setForm({ name: "", message: "" })
        setEggRating(3)
        setTouched({})
        setStatus("idle")
      }, 3000)
    }
  }, [form, eggRating, isValid, onNewEntry])

  // Success state
  if (status === "success") {
    return (
      <div className="card border-yolk-gold/30 bg-gradient-to-br
                      from-egg-white to-amber-50/30 text-center py-10">
        <div className="text-5xl mb-4">🥚</div>
        <h3 className="font-serif text-xl text-shell-dark mb-2">
          message received.
        </h3>
        <p className="text-aged-cream text-sm">
          you're golden. thanks for stopping by.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-5" noValidate>

      <h3 className="font-serif text-xl text-shell-dark mb-2">
        leave a message 🥚
      </h3>

      <p className="text-aged-cream text-sm mb-4">
        say hi. leave a note. rate the site in eggs.
        no account needed.
      </p>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-shell-dark mb-1.5"
               htmlFor="gb-name">
          name
        </label>
        <input
          id="gb-name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="your name"
          maxLength={50}
          className={`w-full px-4 py-3 rounded-lg border text-shell-dark text-sm
                      bg-egg-white placeholder:text-aged-cream/50
                      focus:outline-none focus:ring-2 focus:ring-yolk-gold/40
                      transition-colors resize-none
                      ${touched.name && errors.name
                        ? "border-red-300"
                        : "border-shell-border focus:border-yolk-gold/60"
                      }`}
        />
        {touched.name && errors.name && (
          <p className="text-xs text-red-500 mt-1">{errors.name}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-shell-dark mb-1.5"
               htmlFor="gb-message">
          message
        </label>
        <textarea
          id="gb-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="say something nice (or weird, I don't judge)"
          maxLength={500}
          rows={3}
          className={`w-full px-4 py-3 rounded-lg border text-shell-dark text-sm
                      bg-egg-white placeholder:text-aged-cream/50
                      focus:outline-none focus:ring-2 focus:ring-yolk-gold/40
                      transition-colors resize-none
                      ${touched.message && errors.message
                        ? "border-red-300"
                        : "border-shell-border focus:border-yolk-gold/60"
                      }`}
        />
        <div className="flex justify-between items-center mt-1">
          {touched.message && errors.message ? (
            <p className="text-xs text-red-500">{errors.message}</p>
          ) : (
            <span />
          )}
          <span className="text-xs text-aged-cream/50">
            {form.message.length}/500
          </span>
        </div>
      </div>

      {/* Egg rating */}
      <div>
        <label className="block text-sm font-medium text-shell-dark mb-3">
          rate this site in eggs
        </label>
        <div className="flex items-center gap-2">
          {EGG_RATINGS.map(rating => (
            <button
              key={rating.value}
              type="button"
              onClick={() => setEggRating(rating.value)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl
                          border transition-all duration-150 min-w-[52px]
                ${eggRating === rating.value
                  ? "bg-yolk-gold/10 border-yolk-gold/40 shadow-sm scale-105"
                  : "bg-egg-white border-shell-border hover:border-yolk-gold/30"
                }`}
              title={rating.text}
            >
              <span className="text-lg leading-none">{rating.value}</span>
              <span className="text-[10px] text-aged-cream leading-none">
                {rating.text}
              </span>
            </button>
          ))}
        </div>
        <p className="text-xs text-aged-cream/50 mt-2">
          currently: {EGG_RATINGS.find(r => r.value === eggRating)?.label}{" "}
          ({EGG_RATINGS.find(r => r.value === eggRating)?.text})
        </p>
      </div>

      {/* Error */}
      {status === "error" && (
        <p className="text-xs text-red-500">
          something went wrong. supabase might be sleeping. try again.
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full justify-center
                   disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <span className="flex items-center gap-2">
            <span className="inline-block animate-spin">🥚</span>
            sending...
          </span>
        ) : (
          <>
            <SendIcon />
            sign the guestbook 🥚
          </>
        )}
      </button>

    </form>
  )
}