# Ownership and integration gates

Integrated operational boundaries (Issue #1 / PR #2). Each concrete Issue pins base SHA, paths and dependencies; no writes before authorized prerequisites and conflict recheck.

| Center | Exclusive initial area | Restrictions |
| --- | --- | --- |
| CTO | README, AGENTS, ARCHITECTURE, ROADMAP, STATE, docs/architecture, docs/decisions, docs/governance, docs/handoffs/cto.md | no runtime/config changes in governance PR |
| Audit | Issue/PR review evidence; docs/handoffs/audit.md only if separately authorized | no fixing audited implementation, no merge |
| Design | packages/design, packages/ui, apps/site, templates/** frontend architecture, docs/frontend, docs/handoffs/frontend.md when assigned | no root workspace/lockfile edits |
| Backend | docs/backend, packages/modules when assigned, docs/handoffs/backend.md | no auth/DB/provider before approved need, no shared config |
| Platform | root tooling/config/lockfile, workflows, tools/forge, QUALITY.md, SECURITY.md, docs/handoffs/platform.md | no security settings changes or paid runners |
| Showcase (manual only) | showcases/<assigned-project>, docs/showcases/<assigned-project>, docs/handoffs/showcase.md | founder command «Продолжаем дальше» only; no shared libraries, root config or official site |
| Codex Manager | manual coordination only, no standing write scope | founder-transmitted CTO assignment only; no credit spending without authorization |

QUALITY and SECURITY: Platform is sole writer; CTO reviews contract. Root package manifests/lockfile: Platform sole writer, other centers request dependency changes through Issue. New workspace manifests may require serialized Platform coordination; never simultaneous lockfile writes. Future path overlaps require CTO assignment.

Foundation exit: governance PR audited; actual workspace with compatible pinned versions, frozen lockfile and strict type config; real minimal build/test fixture, meaningful CI with least privilege and no suppressed checks; documented quality/security gates; exact-SHA successful applicable CI and audit; no open blocking findings. Phase 1/2 additionally require actual Astro reference and browser/axe/performance checks, not merely a fixture. Field CWV may remain unknown until users exist. No claim of compliance based only on automated checks. Founder merges only after CTO review.

Integrate by dependency DAG, not PR number. Audit checks exact diff, source SHA, base compatibility, actual run evidence, no scope drift, security and documented limits. New head requires affected re-audit. No merge until founder authorization; verify resulting main and update state.

Single Writer per Scope: [Task Dispatcher](task-dispatcher.md) defines reservations, read-only paths, typed dependencies, base-controlled authorization and mandatory pre-write rechecks. A center can be active on an independent task while its other task is blocked. Only explicitly assigned paths may be written.
