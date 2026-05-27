// ============================================
// GuestbookStats — aggregate egg stats
// ============================================

import { useMemo } from "react"

export default function GuestbookStats({ entries }) {
  const stats = useMemo(() => {
    if (!entries || entries.length === 0) {
      return { total: 0, avgRating: 0, totalEggs: 0, topRating: 0 }
    }

    const withRating = entries.filter(e => e.egg_rating)
    const totalEggs  = withRating.reduce((s, e) => s + e.egg_rating, 0)
    const avgRating  = withRating.length > 0
      ? (totalEggs / withRating.length).toFixed(1)
      : 0

    const ratingCounts = {}
    withRating.forEach(e => {
      ratingCounts[e.egg_rating] = (ratingCounts[e.egg_rating] ?? 0) + 1
    })
    const topRating = Object.entries(ratingCounts)
      .sort((a, b) => b[1] - a[1])[0]?.[0] ?? 0

    return {
      total:     entries.length,
      avgRating,
      totalEggs,
      topRating: Number(topRating),
    }
  }, [entries])

  if (stats.total === 0) return null

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
      <div className="card py-4 text-center">
        <div className="font-serif text-2xl text-yolk-gold">{stats.total}</div>
        <div className="text-xs text-aged-cream">messages</div>
      </div>
      <div className="card py-4 text-center">
        <div className="font-serif text-2xl text-yolk-gold">{stats.avgRating}</div>
        <div className="text-xs text-aged-cream">avg rating</div>
      </div>
      <div className="card py-4 text-center">
        <div className="font-serif text-2xl text-yolk-gold">{stats.totalEggs}</div>
        <div className="text-xs text-aged-cream">total eggs</div>
      </div>
      <div className="card py-4 text-center">
        <div className="font-serif text-2xl text-yolk-gold">
          {"🥚".repeat(stats.topRating || 1)}
        </div>
        <div className="text-xs text-aged-cream">most common</div>
      </div>
    </div>
  )
}