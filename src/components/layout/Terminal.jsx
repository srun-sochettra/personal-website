import { useState, useEffect, useRef, useCallback } from "react"

// ── Command definitions ───────────────────────

const COMMANDS = {
  help: () => ({
    output: [
      "available commands:",
      "",
      "  whoami        — who is this guy",
      "  ls projects   — list all projects",
      "  cat about.txt — read about me",
      "  skills        — tech stack",
      "  contact       — how to reach me",
      "  egg           — 🥚",
      "  neofetch      — system info",
      "  clear         — clear terminal",
      "  help          — show this message",
      "",
      "type any command and press enter.",
    ],
  }),

  whoami: () => ({
    output: [
      "Srun Sochettra",
      "Y2 IT student at NUM · Phnom Penh, Cambodia 🇰🇭",
      "Egg guy. Builder. Ships fast.",
      "",
      "33 repos. Golden Egg status. Still eating eggs.",
    ],
  }),

  "ls projects": () => ({
    output: [
      "drwxr-xr-x  EggScan/          — rate GitHub profiles in eggs",
      "drwxr-xr-x  HyperspaceOS/     — desktop OS in the browser",
      "drwxr-xr-x  KhmerBanking/     — full banking system",
      "drwxr-xr-x  synaptic-ghost/   — AI agent that plans",
      "drwxr-xr-x  ResearchAI/       — AI research assistant",
      "drwxr-xr-x  RFID-System/      — hardware attendance system",
      "",
      `total: 33 repos · run 'cat about.txt' for more`,
    ],
  }),

  ls: () => COMMANDS["ls projects"](),

  "cat about.txt": () => ({
    output: [
      "┌─────────────────────────────────────────┐",
      "│            about.txt                     │",
      "├─────────────────────────────────────────┤",
      "│                                         │",
      "│  builds real things. ships fast.         │",
      "│  survives on eggs.                       │",
      "│                                         │",
      "│  moved to phnom penh with nothing        │",
      "│  but ambition and free eggs.             │",
      "│                                         │",
      "│  the eggs funded the journey.            │",
      "│  the code funded the future.             │",
      "│                                         │",
      "│  now: 33 repos. golden egg. building.    │",
      "│                                         │",
      "└─────────────────────────────────────────┘",
    ],
  }),

  cat: () => COMMANDS["cat about.txt"](),

  skills: () => ({
    output: [
      "languages:   Java · TypeScript · JavaScript · Python · Dart · C++",
      "frameworks:  Spring Boot · React · Next.js · Flutter · Tailwind",
      "tools:       PostgreSQL · Supabase · GitHub · Groq AI · Raspberry Pi",
      "",
      "current meta: React + Spring Boot + eggs",
    ],
  }),

  contact: () => ({
    output: [
      "📧  email:    your@email.com",
      "🐙  github:   github.com/SRUN-Sochettra",
      "🥚  eggscan:  srun-sochettra.github.io/EggScan",
      "📍  location: Phnom Penh, Cambodia",
      "",
      "i reply fast. usually within 24 hours.",
      "sometimes within 24 minutes.",
    ],
  }),

  neofetch: () => ({
    output: [
      "",
      "       🥚🥚🥚          sochettra@empire",
      "     🥚🥚🥚🥚🥚        ─────────────────",
      "    🥚🥚🥚🥚🥚🥚       OS:      EggOS v1.0",
      "    🥚🥚🥚🥚🥚🥚       Host:    Phnom Penh, Cambodia",
      "     🥚🥚🥚🥚🥚        Kernel:  React 18 + Vite",
      "       🥚🥚🥚          Shell:   egg-terminal v1.0",
      "                       Repos:   33",
      "                       Eggs:    ∞",
      "                       Status:  Golden Egg 🥚",
      "                       Uptime:  since 2025",
      "",
    ],
  }),

  sudo: () => ({
    output: [
      "nice try. you don't have egg privileges.",
    ],
  }),

  "rm -rf": () => ({
    output: [
      "absolutely not. these eggs are protected.",
    ],
  }),

  pwd: () => ({
    output: ["/home/sochettra/empire"],
  }),

  date: () => ({
    output: [new Date().toString()],
  }),

  echo: (args) => ({
    output: [args || ""],
  }),

  // egg command — handled specially in the processor
  egg: () => ({
    output: [
      "",
      "  🥚 initiating egg council protocol...",
      "",
      "  ██████████████████████████████████████",
      "  █                                    █",
      "  █    YOU HAVE BEEN CHOSEN.           █",
      "  █    THE EGG COUNCIL AWAITS.         █",
      "  █                                    █",
      "  ██████████████████████████████████████",
      "",
      "  redirecting in 2 seconds...",
      "",
    ],
    action: "egg-council",
  }),
}

// ── Unknown command ───────────────────────────

function unknownCommand(cmd) {
  return {
    output: [
      `command not found: ${cmd}`,
      `type 'help' for available commands.`,
    ],
  }
}

// ── Terminal line component ───────────────────

function TerminalLine({ entry }) {
  if (entry.type === "input") {
    return (
      <div className="flex items-start gap-2">
        <span className="text-yolk-gold flex-shrink-0 select-none">
          sochettra@egg:~$
        </span>
        <span className="text-egg-white">{entry.text}</span>
      </div>
    )
  }

  return (
    <div className="text-egg-white/70 whitespace-pre-wrap leading-relaxed">
      {entry.text}
    </div>
  )
}

// ── Main terminal component ───────────────────

export default function Terminal({ isOpen, onClose, onEggCouncil }) {
  const [history, setHistory]       = useState([
    { type: "output", text: "welcome to egg terminal v1.0" },
    { type: "output", text: "type 'help' for available commands.\n" },
  ])
  const [input, setInput]           = useState("")
  const [cmdHistory, setCmdHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const inputRef    = useRef(null)
  const scrollRef   = useRef(null)

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])

  // ESC to close
  useEffect(() => {
    if (!isOpen) return

    function handleKey(e) {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [isOpen, onClose])

  // Process command
  const processCommand = useCallback((rawCmd) => {
    const trimmed = rawCmd.trim()
    if (!trimmed) return

    // Add to display history
    const newHistory = [...history, { type: "input", text: trimmed }]

    // Add to command history for arrow keys
    setCmdHistory(prev => [...prev, trimmed])
    setHistoryIndex(-1)

    // Handle clear
    if (trimmed === "clear") {
      setHistory([])
      return
    }

    // Match command
    const lower = trimmed.toLowerCase()

    // Handle echo with args
    if (lower.startsWith("echo ")) {
      const result = COMMANDS.echo(trimmed.slice(5))
      result.output.forEach(line => {
        newHistory.push({ type: "output", text: line })
      })
      setHistory(newHistory)
      return
    }

    // Match exact or known commands
    const cmd = COMMANDS[lower]
    const result = cmd ? cmd() : unknownCommand(trimmed)

    result.output.forEach(line => {
      newHistory.push({ type: "output", text: line })
    })

    // Add empty line after output
    newHistory.push({ type: "output", text: "" })

    setHistory(newHistory)

    // Handle actions
    if (result.action === "egg-council") {
      setTimeout(() => {
        onClose()
        onEggCouncil?.()
      }, 2000)
    }
  }, [history, onClose, onEggCouncil])

  // Handle key events
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      processCommand(input)
      setInput("")
    }

    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (cmdHistory.length === 0) return
      const newIndex = historyIndex === -1
        ? cmdHistory.length - 1
        : Math.max(0, historyIndex - 1)
      setHistoryIndex(newIndex)
      setInput(cmdHistory[newIndex] ?? "")
    }

    if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex === -1) return
      const newIndex = historyIndex + 1
      if (newIndex >= cmdHistory.length) {
        setHistoryIndex(-1)
        setInput("")
      } else {
        setHistoryIndex(newIndex)
        setInput(cmdHistory[newIndex] ?? "")
      }
    }

    // Tab completion — basic
    if (e.key === "Tab") {
      e.preventDefault()
      const partial = input.toLowerCase()
      if (!partial) return
      const match = Object.keys(COMMANDS).find(c => c.startsWith(partial))
      if (match) setInput(match)
    }
  }, [input, cmdHistory, historyIndex, processCommand])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      style={{
        background: "rgba(44, 36, 22, 0.85)",
        backdropFilter: "blur(8px)",
        animation: "fadeIn 0.2s ease",
      }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl
                   border border-shell-border/20"
        onClick={e => e.stopPropagation()}
        style={{ animation: "fadeUp 0.3s ease" }}
      >
        {/* Title bar */}
        <div className="bg-shell-dark flex items-center justify-between px-4 py-3
                        border-b border-white/5">
          <div className="flex items-center gap-2">
            {/* Traffic lights */}
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500
                         transition-colors"
              aria-label="close"
            />
            <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
            <div className="w-3 h-3 rounded-full bg-green-400/60" />
          </div>
          <span className="text-egg-white/30 text-xs font-mono">
            egg-terminal — sochettra@empire
          </span>
          <span className="text-egg-white/20 text-xs">
            ESC to close
          </span>
        </div>

        {/* Terminal body */}
        <div
          ref={scrollRef}
          className="bg-shell-dark p-5 h-[60vh] max-h-[500px] overflow-y-auto
                     font-mono text-sm leading-relaxed"
          onClick={() => inputRef.current?.focus()}
        >
          {/* History */}
          {history.map((entry, i) => (
            <TerminalLine key={i} entry={entry} />
          ))}

          {/* Active input line */}
          <div className="flex items-start gap-2 mt-1">
            <span className="text-yolk-gold flex-shrink-0 select-none">
              sochettra@egg:~$
            </span>
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-egg-white outline-none
                           caret-yolk-gold font-mono text-sm"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck="false"
              />
            </div>
          </div>
        </div>

        {/* Bottom hint bar */}
        <div className="bg-shell-dark px-5 py-2 border-t border-white/5
                        flex items-center justify-between text-[10px] text-egg-white/20
                        font-mono">
          <span>↑↓ history · TAB autocomplete · ESC close</span>
          <span>🥚 egg terminal v1.0</span>
        </div>
      </div>
    </div>
  )
}