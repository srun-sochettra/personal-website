// ============================================
// ProjectMeta — stats + metadata grid
// ============================================

import ScrollReveal from "../ui/ScrollReveal"

export default function ProjectMeta({ repo, config }) {
  if (!repo) return null

  const htmlUrl = repo.htmlUrl ?? `https://github.com/SRUN-Sochettra/${repo.name}`

  const rows = [
    {
      label: "Repository",
      value: (
        <a
          href={htmlUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-yolk-gold hover:underline underline-offset-2 text-sm"
        >
          {htmlUrl.replace("https://", "")}
        </a>
      ),
    },
    { label: "Language",     value: repo.language ?? "—" },
    {
      label: "Size",
      value: repo.size
        ? repo.size >= 1024
          ? `${(repo.size / 1024).toFixed(1)} MB`
          : `${repo.size} KB`
        : "—",
    },
    { label: "Stars",        value: `⭐ ${repo.stars ?? 0}` },
    { label: "Forks",        value: `🍴 ${repo.forks ?? 0}` },
    { label: "Open issues",  value: repo.openIssues ?? 0 },
    { label: "License",      value: repo.license ?? "—" },
    {
      label: "Created",
      value: repo.createdAt
        ? new Date(repo.createdAt).toLocaleDateString("en-US", {
            year: "numeric", month: "long",
          })
        : "—",
    },
    { label: "Last updated", value: repo.timeAgo ?? "—" },
    ...(config?.status ? [{
      label: "Status",
      value: config.status === "shipped"
        ? "✅ Shipped"
        : config.status === "in-progress"
        ? "🔧 In Progress"
        : "🗃️ Archived",
    }] : []),
  ]

  return (
    <div className="mb-16">
      <ScrollReveal>
        <div className="flex items-center gap-3 mb-8">
          <span className="section-label">details</span>
          <div className="flex-1 h-px bg-shell-border" />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <div className="grid md:grid-cols-2 gap-6">

          {/* Metadata table */}
          <div className="rounded-xl border border-shell-border overflow-hidden">
            {rows.map(({ label, value }, i) => (
              <div
                key={label}
                className={`flex items-center justify-between px-4 py-3 text-sm
                  ${i % 2 === 0 ? "bg-egg-white" : "bg-amber-50/20"}`}
              >
                <span className="text-aged-cream font-medium flex-shrink-0 mr-4">
                  {label}
                </span>
                <span className="text-shell-dark text-right truncate">
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Topics */}
          <div>
            {repo.topics?.length > 0 && (
              <div className="card mb-4">
                <p className="text-xs text-aged-cream uppercase tracking-widest mb-3">
                  Topics
                </p>
                <div className="flex flex-wrap gap-2">
                  {repo.topics.map(t => (
                    <span key={t} className="badge">{t}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Quick stats */}
            <div className="card">
              <p className="text-xs text-aged-cream uppercase tracking-widest mb-3">
                At a glance
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="font-serif text-2xl text-yolk-gold">
                    {repo.stars ?? 0}
                  </div>
                  <div className="text-xs text-aged-cream">stars</div>
                </div>
                <div>
                  <div className="font-serif text-2xl text-yolk-gold">
                    {repo.forks ?? 0}
                  </div>
                  <div className="text-xs text-aged-cream">forks</div>
                </div>
                <div>
                  <div className="font-serif text-2xl text-yolk-gold">
                    {repo.openIssues ?? 0}
                  </div>
                  <div className="text-xs text-aged-cream">issues</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </ScrollReveal>
    </div>
  )
}