// ============================================
// useKeySequence — detect typed sequences
// Used for: "egg" → council, "_ " → terminal
// ============================================

import { useEffect, useCallback } from "react"

export function useKeySequence(sequence, callback, options = {}) {
  const { caseSensitive = false } = options

  const normalize = useCallback((str) => {
    return caseSensitive ? str : str.toLowerCase()
  }, [caseSensitive])

  useEffect(() => {
    const target = normalize(sequence)
    let buffer = ""
    let bufferTimer = null

    function handleKeyDown(e) {
      // Don't fire when typing in inputs
      const tag = e.target?.tagName?.toLowerCase()
      if (tag === "input" || tag === "textarea" || e.target?.isContentEditable) {
        return
      }

      const key = normalize(e.key)

      // Only track single printable characters
      if (key.length !== 1) return

      buffer += key

      // Keep buffer length to sequence length + 1 for efficiency
      if (buffer.length > target.length) {
        buffer = buffer.slice(buffer.length - target.length)
      }

      // Reset buffer timer — clear buffer after 2s of inactivity
      clearTimeout(bufferTimer)
      bufferTimer = setTimeout(() => { buffer = "" }, 2000)

      if (buffer === target) {
        buffer = ""
        callback()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      clearTimeout(bufferTimer)
    }
  }, [sequence, callback, normalize])
}

// ── Triple click detector ─────────────────────
export function useTripleClick(ref, callback, delay = 500) {
  useEffect(() => {
    if (!ref?.current) return

    let clicks = 0
    let timer = null

    function handleClick() {
      clicks++
      clearTimeout(timer)
      timer = setTimeout(() => { clicks = 0 }, delay)

      if (clicks >= 3) {
        clicks = 0
        clearTimeout(timer)
        callback()
      }
    }

    const el = ref.current
    el.addEventListener("click", handleClick)
    return () => el.removeEventListener("click", handleClick)
  }, [ref, callback, delay])
}