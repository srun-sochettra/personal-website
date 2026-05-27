// ============================================
// useCountUp — animates numbers from 0 to target
// ============================================

import { useEffect, useRef, useState } from "react"

export function useCountUp(target, options = {}) {
  const {
    duration = 1500,
    start = 0,
    enabled = true,
    easing = "easeOut",
  } = options

  const [count, setCount] = useState(start)
  const animRef = useRef(null)

  useEffect(() => {
    if (!enabled || target === 0) return

    const startTime = performance.now()
    const startVal = start
    const endVal = target

    function ease(t) {
      if (easing === "easeOut") return 1 - Math.pow(1 - t, 3)
      if (easing === "easeIn")  return t * t * t
      return t // linear
    }

    function animate(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = ease(progress)
      const current = Math.round(startVal + (endVal - startVal) * easedProgress)

      setCount(current)

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate)
      }
    }

    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [target, duration, start, enabled, easing])

  return count
}