# CIDZO Master Architecture — proposed foundation

Status: proposed in Issue #1; not implemented. Scope: internal reusable web engineering, not a hosted multi-tenant platform. Prefer minimal sufficient architecture, individual design and shared engineering.

## Profiles and contracts
| Profile | Runtime | Required contract | Explicitly optional |
| --- | --- | --- | --- |
| STATIC | Astro static output | typed content/config, semantic HTML, responsive styling, deterministic build | islands only when justified; external forms only with approved data/privacy contract |
| DYNAMIC | Next.js / React, Node where needed | explicit server/client boundaries, validated inputs, server-side authorization where relevant, documented data lifecycle | PostgreSQL, admin, commerce, auth only per project need |
| APPLICATION | Next.js / React, Node where needed | domain/use-case boundaries, explicit persistence interfaces, authorization, error model, migration and recovery plan | jobs, integrations, dedicated services only on evidence |

No DB, server runtime, auth or containers for STATIC without ADR. No microservices, CQRS, event sourcing or heavy messaging without demonstrated need. FastAPI/Python only via justified ADR.

## Proposed workspace and dependency direction
- apps/site: official CIDZO Astro site; apps/showcase-* only when approved, explicitly demo.
- packages/design: tokens and style contracts (no app imports).
- packages/ui: reusable accessible primitives; no business rules, no app dependencies; framework-specific adapters only when needed.
- packages/modules: later domain capabilities, separated by feature; domain code independent of transport/persistence, adapters depend on contracts.
- templates/static, templates/dynamic, templates/application: independent project scaffolds added when validated by a real reference site.
- tools/forge: later generator; consumes versioned templates, never a required client runtime.
- tooling/config and tooling scripts only when shared use warrants them.
- docs: decisions, contracts, governance and handoffs.

Paths are reserved design proposals, not existing directories. Apps and templates consume public package exports; modules and UI do not import apps; no cycles or hidden global state. Prefer source reuse via explicit package exports or copied template snapshots over runtime dependence. Strict TypeScript, pnpm workspace and committed lockfile with pinned compatible tooling. Platform owns root config. Add packages only when a concrete consumer exists. Validate licenses, maintenance, vulnerability exposure, bundle cost and compatibility before dependencies; record version decisions against official docs. Never use latest in reproducible builds.

## Configuration, data and resources
Validate typed public configuration and private environment values separately at trust boundaries (Zod or justified equivalent); fail safely on invalid required config. No secrets in client bundles, logs or repo. Per-project config, credentials, database and deployment; no shared client records. STATIC uses build-time content, DYNAMIC/APPLICATION use project-owned stores when required. Relational data uses PostgreSQL by default if needed; documented schema constraints, transactional integrity, least-privilege access, retention/deletion and backups. Migrations versioned, tested on synthetic data, with rollback or documented forward recovery; never destructive by default. No real payments in demos.

Localization: explicit locale registry, fallback, locale-aware URL/metadata and formatting, RTL when supported, externalized text, no assumptions about available translations. Asset provenance/license record; optimize responsive resources, fonts and images; no music or images of living beings in created materials per founder. No invented metrics or reviews.

## Client independence and evolution
Each client uses separate repository, build, configuration, data, release history, and deployment. Export reproducible template snapshot plus pinned dependencies; verify clean install/build without CIDZO runtime. Updates opt-in via reviewed client PR, compatibility notes, explicit migrations, tests and rollback. Public repo contains no private client data. Record licenses and attribution for third-party assets/code; internal code redistribution terms require founder decision; do not presume open-source license from public visibility.

## Operations and quality
CI: frozen install, strict types, lint, unit tests, build, Playwright/axe where applicable, performance budgets and security checks as relevant. Platform defines concrete commands and pins; no checks claimed before runs. Deploy static output or appropriate runtime with isolated preview, environment validation, immutable artifact or reproducible release, known previous release and rollback procedure. Observability minimal and privacy-preserving; no unnecessary tracking. No paid infrastructure without permission. WCAG 2.2 AA and applicable OWASP ASVS; public-site CWV targets LCP <=2.5s, INP <=200ms, CLS <=0.1, field and lab separated. No unsupported 10/10.

Subsystems activated by evidence: Foundation, Forge, Design, Primitives, Layout, Motion, Content, Localization, Commerce, Identity, Search, Connect, Shield, Performance, Verify, Deploy, Observe, Preview. These are internal capabilities, not products; no empty modules. Start with tooling and actual static site, then extract proven shared parts. Track debt by Issue with owner, cost, trigger and review date; avoid speculative abstractions.

See [ADR-0001](docs/decisions/0001-minimal-profiles.md), [ADR-0002](docs/decisions/0002-client-independence.md), [ownership and gates](docs/governance/ownership-and-gates.md).
