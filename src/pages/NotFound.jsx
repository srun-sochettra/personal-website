import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import EggFloat from "../components/ui/EggFloat"

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 — this page is scrambled 💀</title>
      </Helmet>

      <div className="relative min-h-screen flex items-center justify-center
                      bg-egg-white overflow-hidden px-6">
        <EggFloat count={6} />

        <div className="relative z-10 text-center max-w-md mx-auto">
          <div className="text-7xl mb-6 animate-bob inline-block">🥚</div>

          <h1 className="font-serif text-4xl md:text-5xl text-shell-dark mb-4">
            this page is scrambled 💀
          </h1>

          <p className="text-aged-cream mb-8 text-lg">
            go back home before you lose all your eggs.
          </p>

          <Link to="/" className="btn-primary">
            back to safety
          </Link>

          <p className="text-xs text-aged-cream/40 mt-8">
            404 · page not found
          </p>
        </div>
      </div>
    </>
  )
}