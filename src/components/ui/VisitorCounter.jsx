// ============================================
// VisitorCounter — "X eggs have visited"
// ============================================

import { useVisitorCount } from "../../hooks/useVisitorCount"

export default function VisitorCounter({ className = "" }) {
  const { count, loading } = useVisitorCount()

  if (loading) {
    return (
      <div className={`flex items-center gap-1.5 text-xs text-aged-cream/60 ${className}`}>
        <span>🥚</span>
        <span className="skeleton w-20 h-3 inline-block rounded" />
        <span>eggs have visited</span>
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-1.5 text-xs text-aged-cream/70 ${className}`}>
      <span>🥚</span>
      <span className="font-medium text-aged-cream">
        {count?.toLocaleString() ?? "1,337"}
      </span>
      <span>eggs have visited</span>
    </div>
  )
}