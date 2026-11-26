# Foundation quality gates

Status: proposed for Issue #4. Do not merge until the generated lockfile is committed, the temporary bootstrap workflow is removed, and the permanent clean frozen-install workflow has passed on the reviewed HEAD.

## Initial tooling fixture

- TYPES: `pnpm run typecheck` — strict compiler, zero diagnostics.
- STYLE: `pnpm run lint` — deterministic formatting and TypeScript suppression checks; this is a limited baseline, not a full semantic linter.
- BUILD: `pnpm run build` — emits fixture JavaScript with no compiler errors.
- FUNCTIONALITY: `pnpm run test` — positive and negative Node test cases, zero failures.
- DEPENDENCIES: exact tool versions; committed pnpm-generated lockfile; frozen clean install with lifecycle scripts disabled; reviewed dependency changes.
- SECURITY: see SECURITY.md; independent review of workflow permissions, pins and dependency provenance.
- ARCHITECTURE: fixture only under tooling; no application runtime or speculative packages.
- DOCUMENTATION: review paths, commands, constraints and explicit evidence before integration.

ACCESSIBILITY, browser COMPATIBILITY and PERFORMANCE are not applicable to the CLI/compiler fixture. They become mandatory for the first actual web reference. Assess WCAG 2.2 AA with automated and manual tests; do not infer conformance from axe alone. Evaluate applicable OWASP ASVS controls against each real application's threat model. Public site targets: LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1 at p75 in field data; separate lab budgets and results, no field claims before real measurements.

A successful bootstrap is not proof of a reproducible clean checkout until the lockfile is committed and verified on the final SHA. Audit and CTO integration review are required. No unsupported 10/10 claims.

## Toolchain proposal

Node 22.23.5 LTS, pnpm 11.29.0 (MIT; Node 22+), TypeScript 5.9.3 (Apache-2.0). Node uses the MIT license plus bundled third-party notices. TypeScript 5.9 is the conventional JS compiler chosen for the small fixture rather than adopting a new compiler architecture during bootstrap. Re-evaluate lifecycle and advisories before merge and upgrades. Verify actual compatibility by CI, not by version numbers.

Sources: https://nodejs.org/en/blog/release/v22.23.5 ; https://github.com/pnpm/pnpm/releases/tag/v11.29.0 ; https://pnpm.io/installation ; https://github.com/microsoft/TypeScript/releases/tag/v5.9.3 ; https://github.com/actions/checkout/releases/tag/v7.0.1 ; https://github.com/actions/setup-node/releases/tag/v7.1.0 .
