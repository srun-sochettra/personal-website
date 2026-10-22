# Eggfolio

**An egg-themed developer portfolio with a GitHub-powered project browser, Markdown devlog and interactive extras.**

Built with React and Vite, this personal-site experiment combines a cream-and-gold visual identity with project drawers, case-study pages, a simulated terminal and an Egg Council clicker. Supabase supplies the guestbook, visitor-counter interface and leaderboard; Formspree handles contact submissions.

The suggested repository name is **eggfolio**, replacing personal-website. This documentation does not rename the remote or change the internal package name. This React/Vite codebase is distinct from the separate Next.js portfolio; no current production URL is claimed here.

## Explore

| Route | Source-backed purpose |
| --- | --- |
| `/` | Introduction, timeline, featured projects, stack, rough quote estimator and contact form |
| `/projects` | GitHub repositories with category filters, search, sorting and README drawer |
| `/projects/:slug` | Project story, highlights, technical sections, README and related work |
| `/devlog` and `/devlog/:slug` | Local Markdown post registry and article renderer |
| `/guestbook` | Public messages and site ratings through Supabase |
| `/egg-council` | Clicker, leaderboard and an on-screen novelty certificate |

Type `egg` outside editable fields to trigger the council reveal, or `_` to open the simulated terminal. The terminal displays predefined responses, not shell execution. The certificate is an in-page novelty, not an exported credential. The quote estimator uses hard-coded arithmetic, not an invoicing or booking service.

## Stack

Declared dependency ranges include React `^19.2.6`, Vite `^8.0.12`, React Router `^7.15.1`, Tailwind CSS `^3.4.19` and Supabase JS `^2.106.1`. Markdown rendering uses react-markdown, remark-gfm, rehype-highlight and rehype-raw. See [package.json](package.json) for the complete declaration, not a verified installed dependency set.

## Local development

Suggested commands from the original repository root:

```sh
npm install
npm run dev
```

Use Node.js compatible with the declared tooling. No engine constraint or lockfile is included in the export, so this refresh does not establish a minimum Node version or reproducible dependency resolution.

Create a local `.env` with your own configuration if enabling integrations:

```dotenv
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_FORMSPREE_ID=
VITE_CONTACT_EMAIL=
```

These names are read by the supplied source. No environment template is supplied. The Supabase client becomes null without its two values; reads then return empty/fallback data and writes report missing configuration. Contact settings have built-in fallbacks, so leaving variables unset does not disable submissions. Configure your own destination before sending a test message.

The browser client expects `guestbook`, `visitor_count` and `egg_clicks` tables plus an `increment_visitor_count` RPC. No SQL schema, migrations, row-level security policies or RPC definition are included. Client calls are not enough to reconstruct a secure backend contract. Review [SECURITY.md](SECURITY.md) before exposing writes publicly.

## Content and architecture

- [src/App.jsx](src/App.jsx): route composition and overlay state.
- [src/data/projects.config.js](src/data/projects.config.js): curated metadata joined to repositories by exact name.
- [src/lib/github.js](src/lib/github.js): public API requests and in-memory caches.
- [src/lib/projects.js](src/lib/projects.js): display model and repository exclusions.
- [src/data/posts/index.js](src/data/posts/index.js): local Markdown registry and a simple frontmatter parser.
- [src/lib/supabase.js](src/lib/supabase.js): guestbook, counter and leaderboard calls.
- [src/components/sections/Contact.jsx](src/components/sections/Contact.jsx): Formspree submission.

Repository renames need matching config keys and repoName values reviewed. A redirect at the remote does not update this exact-name join. Relative README images also assume a main branch.

The three supplied Markdown post files are empty. The renderer and registry exist, but this snapshot is not a populated devlog. Profile text, project descriptions, contact addresses and older links require a content review before publication; they are not verified current biography or project evidence.

## Checks and known gaps

Available scripts:

```sh
npm run lint
npm run build
npm run preview
```

No test script or automated test suite is supplied. None of these commands was run during this refresh.

- Projects.jsx imports a lowercase useGitHubRepos path, while the supplied filename starts with uppercase UseGitHubRepos. Check this mismatch on a case-sensitive filesystem before expecting a build.
- GitHub fetch failures can become empty arrays/null rather than propagated errors. UI empty/live states therefore do not reliably distinguish unavailable data.
- Visitor counts include a hard-coded fallback, not verified analytics. Session storage is a browser-side counting guard, not unique-person measurement.
- Remote Markdown rendering enables raw HTML without a supplied sanitisation plugin. Treat fetched content as untrusted.
- Modal focus behaviour, hidden mobile navigation and reduced-motion support need manual verification. No accessibility or performance guarantee is made.

BrowserRouter and the root Vite base require deployment routing review. No hosting workflow or deep-link fallback is supplied; changing the repository name alone is not a deployment configuration. Refer to [refresh notes](docs/repository-refresh.md).

## Contributing and licence

Read [CONTRIBUTING.md](CONTRIBUTING.md) and [SECURITY.md](SECURITY.md). No project licence is included in the export; this refresh assigns none. Existing assets and source remain unchanged.
