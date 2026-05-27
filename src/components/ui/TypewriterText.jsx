// ============================================
// TypewriterText — types character by character
// onComplete fires when done typing
// ============================================

import { useState, useEffect } from "react"

export default function TypewriterText({
  text,
  speed = 60,
  delay = 0,
  className = "",
  onComplete,
  cursor = true,
}) {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone]           = useState(false)
  const [started, setStarted]     = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStarted(true)
    }, delay)
    return () => clearTimeout(startTimer)
  }, [delay])

  useEffect(() => {
    if (!started) return

    let i = 0
    setDisplayed("")
    setDone(false)

    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))

      if (i >= text.length) {
        clearInterval(interval)
        setDone(true)
        onComplete?.()
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed, started, onComplete])

  return (
    <span className={className}>
      {displayed}
      {cursor && !done && (
        <span className="animate-pulse-soft text-yolk-gold ml-0.5">|</span>
      )}
    </span>
  )
}