// ============================================
// useVisitorCount — increments + returns count
// Runs once per session via sessionStorage guard
// ============================================

import { useEffect, useState } from "react"
import { incrementVisitorCount, getVisitorCount } from "../lib/supabase"

export function useVisitorCount() {
  const [count, setCount] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function run() {
      try {
        const alreadyCounted = sessionStorage.getItem("egg_visited")

        let finalCount
        if (!alreadyCounted) {
          // New session — increment
          finalCount = await incrementVisitorCount()
          sessionStorage.setItem("egg_visited", "true")
        } else {
          // Returning within same session — just read
          finalCount = await getVisitorCount()
        }

        setCount(finalCount)
      } catch (err) {
        console.error("useVisitorCount error:", err)
        setCount(1337) // fallback
      } finally {
        setLoading(false)
      }
    }

    run()
  }, [])

  return { count, loading }
}