import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { getLeaderboard, submitScore } from "../lib/supabase"

// ── Egg Clicker Game ──────────────────────────

function EggClicker() {
  const [count, setCount] = useState(0)
  const [clicks, setClicks] = useState([]) // floating +1s
  const [submitted, setSubmitted] = useState(false)
  const [playerName, setPlayerName] = useState("")
  const [leaderboard, setLeaderboard] = useState([])
  const [showSubmit, setShowSubmit] = useState(false)
  const nextId = useRef(0)

  // Load leaderboard
  useEffect(() => {
    getLeaderboard().then(data => {
      if (data) setLeaderboard(data)
    })
  }, [submitted])

  function handleClick(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setCount(prev => prev + 1)

    const id = nextId.current++
    setClicks(prev => [...prev, { id, x, y }])

    setTimeout(() => {
      setClicks(prev => prev.filter(c => c.id !== id))
    }, 800)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!playerName.trim() || count === 0) return

    const result = await submitScore({
      player_name: playerName.trim(),
      score: count,
    })

    if (!result.error) {
      setSubmitted(true)
      setShowSubmit(false)
    }
  }

  // Egg tier based on clicks
  const tier =
    count >= 1000 ? { label: "The Egg", emoji: "👑🥚" } :
    count >= 500 ? { label: "Golden Egg", emoji: "🥚✨" } :
    count >= 100 ? { label: "Good Egg", emoji: "🥚" } :
    count >= 25 ? { label: "Cracked", emoji: "🐣" } :
    { label: "Fresh Egg", emoji: "🐥" }

  return (
    <div className="max-w-lg mx-auto">
      {/* Score display */}
      <div className="text-center mb-8">
        <div className="font-serif text-6xl text-yolk-gold mb-2">{count}</div>
        <div className="flex items-center justify-center gap-2 text-egg-white/60">
          <span>{tier.emoji}</span>
          <span className="text-sm">{tier.label}</span>
        </div>
      </div>

      {/* The egg — click target */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <button
            onClick={handleClick}
            className="text-8xl select-none active:scale-90 hover:scale-105
                       transition-transform cursor-pointer outline-none
                       drop-shadow-lg"
            aria-label="click the egg"
            style={{ lineHeight: 1 }}
          >
            🥚
          </button>

          {/* Floating +1s */}
          {clicks.map(c => (
            <div
              key={c.id}
              className="absolute text-yolk-gold font-bold text-sm pointer-events-none"
              style={{
                left: c.x,
                top: c.y,
                animation: "floatUp 0.8s ease forwards",
              }}
            >
              +1
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <p className="text-center text-egg-white/30 text-xs mb-8">
        click the egg. get eggs. become The Egg.
      </p>

      {/* Submit score */}
      {count > 0 && !submitted && (
        <div className="text-center mb-8">
          {!showSubmit ? (
            <button
              onClick={() => setShowSubmit(true)}
              className="px-6 py-2.5 rounded-xl bg-yolk-gold/10 border border-yolk-gold/30
                         text-yolk-gold text-sm hover:bg-yolk-gold/20 transition-colors"
            >
              submit score to leaderboard
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="flex items-center gap-2 justify-center">
              <input
                type="text"
                value={playerName}
                onChange={e => setPlayerName(e.target.value)}
                placeholder="your name"
                maxLength={20}
                className="px-3 py-2 rounded-lg bg-egg-white/10 border border-white/20
                           text-egg-white text-sm placeholder:text-egg-white/30
                           focus:outline-none focus:border-yolk-gold/50
                           w-40"
              />
              <button
                type="submit"
                disabled={!playerName.trim()}
                className="px-4 py-2 rounded-lg bg-yolk-gold text-shell-dark text-sm
                           font-medium hover:bg-amber-400 transition-colors
                           disabled:opacity-50"
              >
                submit
              </button>
            </form>
          )}
        </div>
      )}

      {submitted && (
        <p className="text-center text-yolk-gold text-sm mb-8">
          🥚 score submitted. you're on the board.
        </p>
      )}

      {/* Leaderboard */}
      {leaderboard.length > 0 && (
        <div className="rounded-xl border border-white/10 overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10">
            <p className="text-xs text-egg-white/40 uppercase tracking-widest">
              🏆 global leaderboard
            </p>
          </div>

          {leaderboard.map((entry, i) => (
            <div
              key={entry.id}
              className={`flex items-center justify-between px-4 py-2.5 text-sm
                ${i % 2 === 0 ? "bg-egg-white/5" : "bg-transparent"}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-yolk-gold/60 font-mono text-xs w-5">
                  {i + 1}.
                </span>
                <span className="text-egg-white">
                  {i === 0 ? "👑 " : ""}
                  {entry.player_name}
                </span>
              </div>
              <span className="text-yolk-gold font-medium font-mono">
                {entry.score.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Certificate Generator ─────────────────────

function EggCertificate() {
  const [name, setName] = useState("")
  const [generated, setGenerated] = useState(false)
  const [certificate, setCertificate] = useState(null)

  function handleGenerate() {
    if (!name.trim()) return

    setCertificate({
      number: Math.floor(Math.random() * 9000) + 1000,
      issuedDate: new Date().toLocaleDateString(),
    })

    setGenerated(true)
  }

  function handleGenerateAnother() {
    setGenerated(false)
    setCertificate(null)
  }

  return (
    <div className="max-w-md mx-auto text-center">
      {!generated ? (
        <div>
          <p className="text-egg-white/60 text-sm mb-4">
            generate your egg council membership certificate
          </p>

          <div className="flex items-center gap-2 justify-center">
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="enter your name"
              maxLength={30}
              className="px-4 py-2.5 rounded-lg bg-egg-white/10 border border-white/20
                         text-egg-white text-sm placeholder:text-egg-white/30
                         focus:outline-none focus:border-yolk-gold/50 w-52"
            />
            <button
              onClick={handleGenerate}
              disabled={!name.trim()}
              className="px-5 py-2.5 rounded-lg bg-yolk-gold text-shell-dark text-sm
                         font-medium hover:bg-amber-400 transition-colors
                         disabled:opacity-50"
            >
              generate
            </button>
          </div>
        </div>
      ) : (
        <div
          className="rounded-2xl border-2 border-yolk-gold/40 p-8
                     bg-gradient-to-b from-amber-950/30 to-transparent"
          style={{ animation: "fadeUp 0.5s ease both" }}
        >
          <div className="text-5xl mb-4">🥚</div>

          <p className="text-xs text-yolk-gold/60 uppercase tracking-[0.25em] mb-4">
            official certificate of initiation
          </p>

          <h3 className="font-serif text-3xl text-yolk-gold mb-2">
            {name}
          </h3>

          <p className="text-egg-white/50 text-sm mb-6 leading-relaxed">
            is hereby recognized as a member of
            <br />
            <span className="text-yolk-gold font-medium">The Egg Council</span>
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                          bg-yolk-gold/10 border border-yolk-gold/30 mb-6"
          >
            <span>🐥</span>
            <span className="text-yolk-gold text-sm font-medium">Rank: Fresh Egg</span>
          </div>

          <div className="border-t border-white/10 pt-4 mt-4">
            <p className="text-egg-white/20 text-[10px] font-mono">
              Certificate #{certificate?.number}
              {" · "}
              Issued {certificate?.issuedDate}
              {" · "}
              Valid forever
            </p>
          </div>

          <button
            onClick={handleGenerateAnother}
            className="mt-6 text-xs text-egg-white/30 hover:text-egg-white/50 transition-colors"
          >
            generate another
          </button>
        </div>
      )}
    </div>
  )
}

// ── Main Page ─────────────────────────────────

export default function EggCouncil() {
  const [tab, setTab] = useState("lore") // lore | clicker | certificate

  const TABS = [
    { id: "lore", label: "📜 The Lore" },
    { id: "clicker", label: "🥚 Egg Clicker" },
    { id: "certificate", label: "📃 Certificate" },
  ]

  return (
    <>
      <Helmet>
        <title>🥚 The Egg Council — Sochettra</title>
        <meta
          name="description"
          content="You found the secret page. You have been initiated."
        />
      </Helmet>

      <div
        className="min-h-screen"
        style={{
          background: "radial-gradient(ellipse at center top, #1a0f00 0%, #0d0800 50%, #000 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-6 py-16">
          {/* Header */}
          <div
            className="text-center mb-16"
            style={{ animation: "fadeUp 0.6s ease both" }}
          >
            <div
              className="text-7xl mb-6 inline-block"
              style={{ animation: "bob 3s ease-in-out infinite" }}
            >
              🥚
            </div>

            <h1 className="font-serif text-5xl md:text-6xl text-yolk-gold mb-4">
              The Egg Council
            </h1>

            <p className="text-egg-white/40 max-w-lg mx-auto leading-relaxed">
              You found the secret. Welcome to the most exclusive developer community
              in Phnom Penh.
            </p>
          </div>

          {/* Tabs */}
          <div
            className="flex items-center justify-center gap-2 mb-12"
            style={{ animation: "fadeUp 0.6s ease 0.1s both" }}
          >
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${tab === t.id
                    ? "bg-yolk-gold/20 text-yolk-gold border border-yolk-gold/30"
                    : "text-egg-white/40 hover:text-egg-white/60 border border-transparent"
                  }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div style={{ animation: "fadeUp 0.5s ease 0.2s both" }}>
            {/* ── LORE TAB ── */}
            {tab === "lore" && (
              <div className="max-w-2xl mx-auto space-y-8">
                <div className="space-y-5 text-egg-white/70 leading-relaxed">
                  <div className="border-l-2 border-yolk-gold/30 pl-6">
                    <p className="text-xs text-yolk-gold/50 uppercase tracking-widest mb-3">
                      chapter i — the origin
                    </p>
                    <p>
                      In the beginning, there was a student. Second year. IT major.
                      The National University of Management, Phnom Penh. No money.
                      No connections. One laptop. And an inexplicable supply of free eggs.
                    </p>
                  </div>

                  <div className="border-l-2 border-yolk-gold/30 pl-6">
                    <p className="text-xs text-yolk-gold/50 uppercase tracking-widest mb-3">
                      chapter ii — the fuel
                    </p>
                    <p>
                      The eggs were not metaphorical. They were actual eggs.
                      Boiled, fried, scrambled — the cheapest source of protein
                      in the city. While other students ate out, this one ate eggs
                      and coded. The eggs funded the journey. Six eggs a day.
                      Every day. For months.
                    </p>
                  </div>

                  <div className="border-l-2 border-yolk-gold/30 pl-6">
                    <p className="text-xs text-yolk-gold/50 uppercase tracking-widest mb-3">
                      chapter iii — the awakening
                    </p>
                    <p>
                      Then one day — broke, job hunting, sitting in a room that
                      smelled faintly of boiled eggs — a thought arrived:
                    </p>
                    <p className="text-yolk-gold italic mt-3 font-serif text-lg">
                      "What if I could rate GitHub profiles... in eggs?"
                    </p>
                  </div>

                  <div className="border-l-2 border-yolk-gold/30 pl-6">
                    <p className="text-xs text-yolk-gold/50 uppercase tracking-widest mb-3">
                      chapter iv — the birth
                    </p>
                    <p>
                      Fourteen hours. One sitting. No breaks except for eggs.
                      EggScan was conceived, built, and deployed before dinner.
                      React for the frontend. Groq AI for the brain.
                      GitHub API for the data. Deployed to GitHub Pages for $0.
                    </p>
                    <p className="mt-3">
                      Then the creator went to a family gathering.
                      And nearly died in the bathroom.
                      The site stayed up. That's shipping.
                    </p>
                  </div>

                  <div className="border-l-2 border-yolk-gold/40 pl-6">
                    <p className="text-xs text-yolk-gold/50 uppercase tracking-widest mb-3">
                      chapter v — the empire
                    </p>
                    <p>
                      33 repositories. A browser-based operating system.
                      A full banking system. An AI agent. An RFID attendance system.
                      All built by one student in Phnom Penh. All fueled by eggs.
                    </p>
                    <p className="text-yolk-gold mt-4 font-serif text-xl">
                      The Egg Council was born.
                    </p>
                    <p className="text-egg-white/40 text-sm mt-2">
                      And you — by typing three letters — have been initiated.
                    </p>
                  </div>
                </div>

                {/* Unfiltered section */}
                <div className="mt-16 pt-8 border-t border-white/10">
                  <p className="text-xs text-yolk-gold/50 uppercase tracking-widest mb-6">
                    unfiltered sochettra
                  </p>

                  <div className="space-y-4 text-egg-white/50 text-sm leading-relaxed">
                    <p>
                      I'm not the most talented developer you'll find. I'm just the
                      one who won't stop building. I ship things that work. I eat eggs.
                      I don't pretend my code is perfect — I pretend it's shipped.
                    </p>

                    <p>
                      Most of what I build, nobody asked for. HyperspaceOS? Nobody
                      needed a browser-based desktop OS. EggScan? Nobody was rating
                      GitHub profiles in eggs. But building things nobody asked for
                      is how you learn what nobody else knows.
                    </p>

                    <p>
                      If you've read this far, you either want to hire me or
                      you're procrastinating. Either way — let's talk. I reply fast.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ── CLICKER TAB ── */}
            {tab === "clicker" && <EggClicker />}

            {/* ── CERTIFICATE TAB ── */}
            {tab === "certificate" && <EggCertificate />}
          </div>

          {/* Back to safety */}
          <div className="text-center mt-20 pt-8 border-t border-white/5">
            <Link
              to="/"
              className="text-egg-white/20 hover:text-egg-white/40
                         transition-colors text-sm"
            >
              ← escape the council · return to safety
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}