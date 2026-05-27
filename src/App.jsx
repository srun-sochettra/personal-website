import { Routes, Route } from "react-router-dom"
import { useState, useCallback, useRef } from "react"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Terminal from "./components/layout/Terminal"
import EggCouncilOverlay from "./components/layout/EggCouncilOverlay"
import { useKeySequence } from "./hooks/useKeySequence"

// Pages
import Home          from "./pages/Home"
import Projects      from "./pages/Projects"
import ProjectDetail from "./pages/ProjectDetail"
import Devlog        from "./pages/Devlog"
import Guestbook     from "./pages/Guestbook"
import EggCouncil    from "./pages/EggCouncil"
import NotFound      from "./pages/NotFound"
import DevlogPost from "./pages/DevlogPost"

export default function App() {
  const [terminalOpen, setTerminalOpen]   = useState(false)
  const [councilOpen, setCouncilOpen]     = useState(false)
  const councilCooldown = useRef(false)

  const openTerminal = useCallback(() => {
    if (!councilOpen) setTerminalOpen(true)
  }, [councilOpen])

  const initiateCouncil = useCallback(() => {
    if (councilCooldown.current || councilOpen || terminalOpen) return
    councilCooldown.current = true
    setCouncilOpen(true)

    // Prevent re-triggering for 3 seconds
    setTimeout(() => { councilCooldown.current = false }, 3000)
  }, [councilOpen, terminalOpen])

  const closeCouncil = useCallback(() => {
    setCouncilOpen(false)
  }, [])

  useKeySequence("_", openTerminal)
  useKeySequence("egg", initiateCouncil)

  return (
    <div className="min-h-screen bg-egg-white flex flex-col">
      <Navbar onEggCouncil={initiateCouncil} />

      <main className="flex-1">
        <Routes>
          <Route path="/"                element={<Home onEggCouncil={initiateCouncil} />} />
          <Route path="/projects"        element={<Projects />} />
          <Route path="/projects/:slug"  element={<ProjectDetail />} />
          <Route path="/devlog"          element={<Devlog />} />
          <Route path="/devlog/:slug" element={<DevlogPost />} />
          <Route path="/guestbook"       element={<Guestbook />} />
          <Route path="/egg-council"     element={<EggCouncil />} />
          <Route path="*"               element={<NotFound />} />
        </Routes>
      </main>

      <Footer onEggCouncil={initiateCouncil} />

      <Terminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onEggCouncil={initiateCouncil}
      />

      <EggCouncilOverlay
        isOpen={councilOpen}
        onClose={closeCouncil}
      />
    </div>
  )
}