# Security and integration boundaries

This portfolio has browser-side integrations, not a supplied application server. No security audit, supported-release programme or reporting deadline is established here.

## Public configuration and writes

The Supabase client reads VITE-prefixed configuration in browser code. Treat that configuration as public, not as a secret-storage mechanism. Never put a service-role key or private GitHub token into client configuration. The commented GitHub-token suggestion is not an adopted recommendation.

No backend schema, row-level security policies, RPC implementation, moderation or server-side abuse controls are included. Verify access rules and constraints separately before enabling public guestbook/leaderboard writes. Form limits and a browser-generated click count are not trustworthy server validation or anti-cheat controls.

Contact submissions go to Formspree, including when built-in fallback configuration is used. Set and verify your own destination before testing. Do not send confidential data through a copied configuration.

## External content and privacy

Fetched README rendering enables raw HTML without a supplied sanitisation plugin. Review allowed elements, URLs and resource loading before rendering untrusted content. No exploit was executed during this refresh.

The site uses session storage, a visitor-counter integration and external services/resources. Do not rely on existing no-tracking copy as a verified privacy guarantee. Define public-message visibility, retention, deletion and moderation before collecting real visitor data.

The counter's fallback is not evidence of traffic, and client-submitted leaderboard scores are not verified achievements.

## Reporting

Use a verified private maintainer channel if available, or request one without posting sensitive details. No dedicated security mailbox or enabled private-reporting feature is confirmed by the export. Provide affected paths and a minimal synthetic reproduction; redact credentials and visitor details.

These are bounded source observations, not a complete audit or code fixes.
