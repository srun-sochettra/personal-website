// ============================================
// GuestbookEntry — single guestbook message
// ============================================

const EGG_DISPLAY = {
  1: "🥚",
  2: "🥚🥚",
  3: "🥚🥚🥚",
  4: "🥚🥚🥚🥚",
  5: "🥚🥚🥚🥚🥚",
}

function timeAgo(dateStr) {
  const now  = new Date()
  const date = new Date(dateStr)
  const diff = Math.floor((now - date) / 1000)

  if (diff < 60)      return "just now"
  if (diff < 3600)    return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400)   return `${Math.floor(diff / 3600)}h ago`
  if (diff < 604800)  return `${Math.floor(diff / 86400)}d ago`
  if (diff < 2592000) return `${Math.floor(diff / 604800)}w ago`

  return date.toLocaleDateString("en-US", {
    month: "short",
    day:   "numeric",
    year:  date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  })
}

// Generate a consistent color from name
function nameToColor(name) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }

  const colors = [
    "bg-amber-100 text-amber-700",
    "bg-blue-100 text-blue-700",
    "bg-green-100 text-green-700",
    "bg-purple-100 text-purple-700",
    "bg-pink-100 text-pink-700",
    "bg-teal-100 text-teal-700",
    "bg-orange-100 text-orange-700",
    "bg-indigo-100 text-indigo-700",
  ]

  return colors[Math.abs(hash) % colors.length]
}

export default function GuestbookEntry({ entry, index = 0 }) {
  const initial  = entry.name?.charAt(0)?.toUpperCase() ?? "?"
  const colorCls = nameToColor(entry.name ?? "")

  return (
    <div
      className="group"
      style={{
        opacity: 0,
        animation: `fadeUp 0.4s ease ${Math.min(index * 60, 500)}ms both`,
      }}
    >
      <div className="flex items-start gap-4 py-5 border-b border-shell-border
                      last:border-0 group-hover:bg-amber-50/20 -mx-4 px-4
                      rounded-xl transition-colors">

        {/* Avatar */}
        <div className={`w-10 h-10 rounded-full flex items-center justify-center
                         flex-shrink-0 text-sm font-bold ${colorCls}`}>
          {initial}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">

          {/* Name + time */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-medium text-shell-dark text-sm truncate">
              {entry.name}
            </span>
            <span className="text-xs text-aged-cream/60 flex-shrink-0">
              {timeAgo(entry.created_at)}
            </span>
          </div>

          {/* Message */}
          <p className="text-shell-dark text-sm leading-relaxed mb-2">
            {entry.message}
          </p>

          {/* Egg rating */}
          {entry.egg_rating && (
            <div className="flex items-center gap-1.5">
              <span className="text-sm leading-none">
                {EGG_DISPLAY[entry.egg_rating] ?? "🥚"}
              </span>
              <span className="text-[10px] text-aged-cream/50">
                {entry.egg_rating}/5 eggs
              </span>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}