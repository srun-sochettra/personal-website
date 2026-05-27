// ============================================
// Home — all sections assembled
// ============================================

import { Helmet } from "react-helmet-async"
import Hero             from "../components/sections/Hero"
import About            from "../components/sections/About"
import Timeline         from "../components/sections/Timeline"
import FeaturedProjects from "../components/sections/FeaturedProjects"
import TechStack        from "../components/sections/TechStack"
import HireCalculator   from "../components/sections/HireCalculator"
import Contact          from "../components/sections/Contact"

export default function Home({ onEggCouncil }) {
  return (
    <>
      <Helmet>
        <title>Sochettra — Egg Guy. Builder. Ships Fast.</title>
        <meta
          name="description"
          content="Y2 IT student from Phnom Penh who builds real things, ships fast, and happens to really like eggs. 33 projects. $0 budget."
        />
      </Helmet>

      {/* Section order matches the blueprint */}
      <Hero            onEggCouncil={onEggCouncil} />
      <About />
      <Timeline />
      <FeaturedProjects />
      <TechStack />
      <HireCalculator />
      <Contact />
    </>
  )
}