// ============================================
// SkeletonCard — placeholder while loading
// ============================================

export default function SkeletonCard({ className = "" }) {
  return (
    <div className={`card ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="skeleton h-4 w-16 rounded" />
        <div className="skeleton h-5 w-12 rounded-full" />
      </div>
      <div className="skeleton h-5 w-3/4 rounded mb-2" />
      <div className="skeleton h-4 w-full rounded mb-1" />
      <div className="skeleton h-4 w-2/3 rounded mb-4" />
      <div className="flex gap-2 mb-4">
        <div className="skeleton h-6 w-16 rounded-full" />
        <div className="skeleton h-6 w-20 rounded-full" />
        <div className="skeleton h-6 w-14 rounded-full" />
      </div>
      <div className="flex justify-between items-center">
        <div className="skeleton h-4 w-16 rounded" />
        <div className="flex gap-2">
          <div className="skeleton h-8 w-8 rounded-lg" />
          <div className="skeleton h-8 w-8 rounded-lg" />
        </div>
      </div>
    </div>
  )
}