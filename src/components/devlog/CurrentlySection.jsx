// ============================================
// CurrentlySection — what I'm doing right now
// ============================================

import ScrollReveal from "../ui/ScrollReveal"

const CURRENTLY = {
  building: [
    "Personal website empire (you're looking at it)",
    "Spring Boot microservices project",
    "Flutter personal finance tracker",
  ],
  learning: [
    "System design & architecture",
    "Docker containerization",
    "Writing tests before shipping (revolutionary concept)",
  ],
  eating: "Eggs. Still eggs. Always eggs. 🥚",
}

export default function CurrentlySection() {
  return (
    <ScrollReveal>
      <div className="card border-yolk-gold/20 bg-gradient-to-br
                      from-egg-white to-amber-50/20 mb-12">

        <h3 className="font-serif text-xl text-shell-dark mb-6 flex items-center gap-2">
          <span className="text-lg">📡</span>
          currently
        </h3>

        <div className="grid sm:grid-cols-3 gap-6">

          {/* Building */}
          <div>
            <p className="text-xs text-yolk-gold uppercase tracking-widest mb-3 font-semibold">
              🔨 building
            </p>
            <ul className="space-y-2">
              {CURRENTLY.building.map((item, i) => (
                <li key={i} className="text-sm text-aged-cream leading-relaxed flex items-start gap-2">
                  <span className="text-shell-border mt-1.5 text-[8px]">●</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Learning */}
          <div>
            <p className="text-xs text-yolk-gold uppercase tracking-widest mb-3 font-semibold">
              📚 learning
            </p>
            <ul className="space-y-2">
              {CURRENTLY.learning.map((item, i) => (
                <li key={i} className="text-sm text-aged-cream leading-relaxed flex items-start gap-2">
                  <span className="text-shell-border mt-1.5 text-[8px]">●</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Eating */}
          <div>
            <p className="text-xs text-yolk-gold uppercase tracking-widest mb-3 font-semibold">
              🍳 eating
            </p>
            <p className="text-sm text-aged-cream leading-relaxed">
              {CURRENTLY.eating}
            </p>
          </div>

        </div>
      </div>
    </ScrollReveal>
  )
}