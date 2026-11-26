# ADR-0002 — Independent client projects

Status: Proposed (Issue #1).
Context: shared engineering must not couple client releases or expose client data.
Alternatives: central multi-tenant runtime; shared git submodule; standalone exported template with pinned dependencies and explicit updates.
Decision: separate client repositories, reproducible snapshot, no mandatory central runtime; updates opt-in and audited.
Consequences: clients can deploy independently; updates need deliberate migration and compatibility testing. No automatic propagation of platform changes.
Limits: approved shared services may be integrated by explicit client agreement and data/security review. Revisit if a concrete client need proves central service necessary. Acceptance: clean standalone install/build and deployment/rollback documented when Forge is implemented.
