# ADR-0001 — Minimal sufficient web profiles

Status: Proposed (Issue #1).
Context: CIDZO needs repeatable engineering without identical sites or unnecessary infrastructure.
Alternatives: single universal full-stack template; separate unrelated repositories for every reference; shared minimal workspace with three profiles.
Decision: shared workspace, Astro static by default, Next.js/React for dynamic/application when required. Extract code only from proven consumers; keep profile-specific runtime optional.
Consequences: lower static complexity; framework adapters may be needed; profile boundaries must be tested. No runtime or version selection implied yet.
Limits: no speculative services or empty packages. Revisit when a real use case cannot meet requirements or supported toolchain/maintenance changes materially. Acceptance: real static build and later representative dynamic/application scenarios.
