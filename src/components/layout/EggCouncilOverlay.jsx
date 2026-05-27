import { useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import ScreenCrack from "./ScreenCrack"

export default function EggCouncilOverlay({ isOpen, onClose }) {
  const [crackDone, setCrackDone] = useState(false)
  const navigate = useNavigate()

  const handleCrackComplete = useCallback(() => {
    setCrackDone(true)
  }, [])

  const handleEnter = useCallback(() => {
    onClose()
    setCrackDone(false)
    navigate("/egg-council")
  }, [onClose, navigate])

  const handleDismiss = useCallback(() => {
    onClose()
    setCrackDone(false)
  }, [onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Screen crack animation */}
      <ScreenCrack active={isOpen && !crackDone} onComplete={handleCrackComplete} />

      {/* Council reveal — shows after crack finishes */}
      {crackDone && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-6"
          onClick={handleDismiss}
          style={{
            background: "radial-gradient(ellipse at center, #1a0f00 0%, #0d0800 100%)",
            animation: "fadeIn 0.5s ease both",
          }}
        >
          <div
            className="text-center max-w-lg"
            onClick={e => e.stopPropagation()}
            style={{ animation: "fadeUp 0.6s ease 0.2s both" }}
          >
            {/* Giant egg */}
            <div
              className="text-8xl mb-8 inline-block"
              style={{ animation: "bob 3s ease-in-out infinite" }}
            >
              🥚
            </div>

            {/* Title */}
            <h1 className="font-serif text-5xl text-yolk-gold mb-4">
              The Egg Council
            </h1>

            {/* Message */}
            <p className="text-egg-white/60 text-lg leading-relaxed mb-3">
              You typed "egg." The screen cracked.
            </p>
            <p className="text-egg-white/40 mb-8 leading-relaxed">
              You have been initiated into the most exclusive developer
              community in the history of Phnom Penh.
            </p>

            {/* Rank */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                            bg-yolk-gold/10 border border-yolk-gold/30 mb-10">
              <span className="text-sm">🥚</span>
              <span className="text-yolk-gold text-sm font-medium">
                Your rank: Fresh Egg
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleEnter}
                className="px-8 py-3.5 rounded-xl bg-yolk-gold text-shell-dark
                           font-medium hover:bg-amber-400 transition-colors
                           active:scale-95 shadow-egg-md"
              >
                enter the council 🥚
              </button>
              <button
                onClick={handleDismiss}
                className="px-6 py-3 rounded-xl text-egg-white/40
                           hover:text-egg-white/70 transition-colors text-sm"
              >
                stay unscrambled
              </button>
            </div>

            {/* Hint */}
            <p className="text-egg-white/20 text-xs mt-10">
              click anywhere outside to close · ESC to exit
            </p>
          </div>
        </div>
      )}
    </>
  )
}