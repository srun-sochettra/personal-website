// ============================================
// ProjectDetail — full project page
// /projects/:slug
// ============================================

import { useParams, Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { useProjectDetail } from "../hooks/useProjectDetail"
import ProjectHero       from "../components/projects/ProjectHero"
import ProjectStory      from "../components/projects/ProjectStory"
import ProjectHighlights from "../components/projects/ProjectHighlights"
import ProjectDeepDive   from "../components/projects/ProjectDeepDive"
import ProjectReadme     from "../components/projects/ProjectReadme"
import ProjectMeta       from "../components/projects/ProjectMeta"
import ProjectChallenges from "../components/projects/ProjectChallenges"
import ProjectRelated    from "../components/projects/ProjectRelated"
import ProjectFooterCTA  from "../components/projects/ProjectFooterCTA"
import EggFloat          from "../components/ui/EggFloat"
import { timeAgo }       from "../lib/github"

// ── Loading skeleton ──────────────────────────

function PageSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
      <div className="skeleton h-4 w-24 rounded" />
      <div className="skeleton h-12 w-1/2 rounded" />
      <div className="skeleton h-6 w-3/4 rounded" />
      <div className="skeleton h-6 w-1/3 rounded" />
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="skeleton h-48 rounded-xl" />
        <div className="skeleton h-48 rounded-xl" />
      </div>
      <div className="skeleton h-64 rounded-xl mt-8" />
    </div>
  )
}

// ── Not found ─────────────────────────────────

function ProjectNotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center
                    bg-egg-white overflow-hidden px-6">
      <EggFloat count={5} />
      <div className="relative z-10 text-center max-w-md">
        <div className="text-6xl mb-6">🥚</div>
        <h1 className="font-serif text-4xl text-shell-dark mb-4">
          project not found
        </h1>
        <p className="text-aged-cream mb-8">
          this project doesn't exist. or I haven't shipped it yet.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/projects" className="btn-primary">
            see all projects
          </Link>
          <Link to="/" className="btn-secondary">
            go home
          </Link>
        </div>
      </div>
    </div>
  )
}

// ── Normalize repo shape for child components ─

function normalizeRepo(project) {
  if (!project) return null

  return {
    ...project,
    // Ensure child components can find these fields
    htmlUrl:    project.htmlUrl ?? `https://github.com/SRUN-Sochettra/${project.name}`,
    stars:      project.stars ?? project.stargazers_count ?? 0,
    forks:      project.forks ?? project.forks_count ?? 0,
    openIssues: project.openIssues ?? project.open_issues_count ?? 0,
    timeAgo:    project.timeAgo ?? (project.updatedAt ? timeAgo(project.updatedAt) : null),
    topics:     project.topics ?? [],
    license:    project.license ?? null,
    size:       project.size ?? 0,
  }
}

// ── Main page ─────────────────────────────────

export default function ProjectDetail() {
  const { slug } = useParams()
  const { repo: rawRepo, config, related, loading, notFound } = useProjectDetail(slug)

  const repo     = normalizeRepo(rawRepo)
  const name     = config?.repoName ?? repo?.name ?? "Project"
  const tagline  = config?.tagline  ?? repo?.tagline ?? repo?.description ?? ""
  const repoName = config?.repoName ?? repo?.name

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Loading... — Sochettra</title>
        </Helmet>
        <PageSkeleton />
      </>
    )
  }

  if (notFound) {
    return (
      <>
        <Helmet>
          <title>Project not found — Sochettra</title>
        </Helmet>
        <ProjectNotFound />
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>{name} — Sochettra's Projects</title>
        <meta
          name="description"
          content={tagline || `${name} — a project by Srun Sochettra.`}
        />
        <meta property="og:title"       content={`${name} by Sochettra`} />
        <meta property="og:description" content={tagline} />
        {config?.ogImage && (
          <meta property="og:image" content={config.ogImage} />
        )}
      </Helmet>

      {/* Hero */}
      <ProjectHero repo={repo} config={config} />

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Story — only if written */}
        <ProjectStory story={config?.story} />

        {/* Highlights — only if defined */}
        <ProjectHighlights highlights={config?.highlights} />

        {/* Deep dive — only if defined */}
        <ProjectDeepDive deepDive={config?.deepDive} />

        {/* README — always, fetched live */}
        <ProjectReadme repoName={repoName} />

        {/* Metadata */}
        <ProjectMeta repo={repo} config={config} />

        {/* Challenges — only if written */}
        <ProjectChallenges challenges={config?.challenges} />

        {/* Related projects */}
        <ProjectRelated repos={related} />

      </div>

      {/* Footer CTA */}
      <ProjectFooterCTA />
    </>
  )
}