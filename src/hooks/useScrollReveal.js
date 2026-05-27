// ============================================
// useScrollReveal — IntersectionObserver hook
// Animates elements into view as you scroll
// ============================================

import { useEffect, useRef, useState } from "react"

export function useScrollReveal(options = {}) {
  const {
    threshold = 0.15,
    rootMargin = "0px 0px -50px 0px",
    once = true,
  } = options

  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, isVisible }
}

// ── Stagger children reveal ───────────────────
export function useStaggerReveal(count, options = {}) {
  const { staggerMs = 100, ...rest } = options
  const { ref, isVisible } = useScrollReveal(rest)

  const getDelay = (index) => ({
    transitionDelay: isVisible ? `${index * staggerMs}ms` : "0ms"
  })

  return { ref, isVisible, getDelay }
}