// ============================================
// Badge — language, category, status badges
// ============================================

import { LANGUAGE_COLORS } from "../../lib/github"

function Icon({ name, size = 12, className = "" }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": "true",
  }

  const icons = {
    check: (
      <svg {...common}>
        <path d="M20 6 9 17l-5-5" />
      </svg>
    ),

    wrench: (
      <svg {...common}>
        <path d="M14.7 6.3a4 4 0 0 0-5 5L3 18v3h3l6.7-6.7a4 4 0 0 0 5-5l-2.5 2.5-2.9-2.9 2.4-2.6z" />
      </svg>
    ),

    archive: (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="4" rx="1" />
        <path d="M5 8v11a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8" />
        <path d="M10 12h4" />
      </svg>
    ),

    zap: (
      <svg {...common}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),

    pin: (
      <svg {...common}>
        <path d="M12 17v5" />
        <path d="M5 17h14" />
        <path d="M7 3h10l-1 9 3 5H5l3-5-1-9z" />
      </svg>
    ),
  }

  return icons[name] ?? null
}

export function LanguageBadge({ language, className = "" }) {
  const color = LANGUAGE_COLORS[language] ?? "#9C8A6E"

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                  bg-egg-white border border-shell-border text-shell-dark ${className}`}
    >
      <span
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: color }}
      />
      {language}
    </span>
  )
}

export function CategoryBadge({ category, className = "" }) {
  const styles = {
    AI: "bg-purple-50 border-purple-200 text-purple-700",
    "Full-Stack": "bg-blue-50 border-blue-200 text-blue-700",
    Hardware: "bg-orange-50 border-orange-200 text-orange-700",
    Mobile: "bg-teal-50 border-teal-200 text-teal-700",
    Java: "bg-amber-50 border-amber-200 text-amber-700",
    Web: "bg-green-50 border-green-200 text-green-700",
    Other: "bg-gray-50 border-gray-200 text-gray-600",
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                  border ${styles[category] ?? styles.Other} ${className}`}
    >
      {category}
    </span>
  )
}

export function StatusBadge({ status, className = "" }) {
  const map = {
    shipped: {
      icon: "check",
      label: "Shipped",
      style: "text-green-700 bg-green-50 border-green-200",
    },
    "in-progress": {
      icon: "wrench",
      label: "In Progress",
      style: "text-blue-700 bg-blue-50 border-blue-200",
    },
    archived: {
      icon: "archive",
      label: "Archived",
      style: "text-gray-600 bg-gray-50 border-gray-200",
    },
  }

  const badge = map[status] ?? map.shipped

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${badge.style} ${className}`}
    >
      <Icon name={badge.icon} />
      {badge.label}
    </span>
  )
}

export function SpecialBadge({ type, className = "" }) {
  const map = {
    "fast-ship": {
      icon: "zap",
      label: "built fast",
      style: "bg-yolk-gold/10 border-yolk-gold/30 text-yolk-gold",
    },
    hardware: {
      icon: "wrench",
      label: "hardware",
      style: "bg-orange-50 border-orange-200 text-orange-700",
    },
    featured: {
      icon: "pin",
      label: "featured",
      style: "bg-shell-dark text-egg-white border-shell-dark",
    },
  }

  const badge = map[type]
  if (!badge) return null

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${badge.style} ${className}`}
    >
      <Icon name={badge.icon} />
      {badge.label}
    </span>
  )
}