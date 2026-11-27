# Future DYNAMIC / APPLICATION — minimum server trust boundaries

Status: proposed contract for Issue #5, not a runtime implementation or permission to start a new module. Applies only when CTO authorizes a concrete dynamic or application use case. See [architecture](../../ARCHITECTURE.md), [client independence](../decisions/0002-client-independence.md) and [STATIC contract](static-content-config.md). STATIC remains build-only by default.

## Contracts and ownership

Conceptual boundary notation, not source code or an API promise:

```ts
type PublicError = {
  code: "INVALID_INPUT" | "UNAUTHENTICATED" | "FORBIDDEN" |
        "NOT_FOUND" | "CONFLICT" | "RATE_LIMITED" |
        "TEMPORARY_FAILURE" | "INTERNAL_ERROR";
  requestId?: string;
};
type Outcome<T> =
  | { ok: true; data: T }
  | { ok: false; error: PublicError };
```

Design each approved use case with its own bounded request/response DTO, validation rules, ownership/role requirements, data exposure allowlist, business invariants and failure behavior. No universal generic CRUD or shared tenant service. Domain/use-case logic does not import transport or persistence; adapters enforce the public contract and depend on the domain, not vice versa. A module owns its data and invariants; other modules use explicit contracts, not hidden cross-module database writes. Choose modular monolith by default; no empty modules or speculative distributed system. Clients have separate repositories, deployments, credentials, stores, data lifecycle and opt-in updates. Shared resources require specific agreement and security/privacy review.

## Trust boundaries

| Boundary | Required when applicable |
| --- | --- |
| Browser -> server | Treat request fields, headers, IDs, roles, quantities, prices and files as untrusted. Bound size before parsing, strict DTO validation, rate limits and safe error handling. |
| Session -> protected use case | Verify session with approved mechanisms, enforce server-side action and resource ownership authorization on every protected read/write, including admin and exports; deny by default. Never rely on hidden UI. |
| Use case -> persistence | Parameterized operations; schema constraints, unique keys, foreign keys where appropriate; transactional enforcement of invariants, rollback on failure; least privilege. |
| Server -> external provider | Approved destinations, bounded timeouts and retries, response validation, protection of credentials; SSRF prevention and idempotency where relevant. No real integrations in this task. |
| Server -> browser/logs | Explicit response allowlists; no stack trace, internal details, token, password, private config or personal data in public errors/logs. Privacy-minimized diagnostics. |

Authentication identifies an actor; authorization decides permitted action on the resource, including tenant/project ownership and role. Reject unauthorized operations before exposing protected resource details; choose 403 or conceal existence with 404 under a documented policy. Map validation to 400 (or consistently documented 422), missing credentials to 401, conflict to 409, limits to 429, temporary dependency failure to 503, unexpected error to 500. Map domain failures consistently; don't expose raw database/provider messages. Bound pagination and filters; do not load unlimited records. Use opaque request IDs, not secret/user identifiers. Any externally visible API change requires CTO/Frontend agreement, compatibility/migration notes and applicable tests.

## Data integrity and lifecycle

Authoritative values (actor permissions, prices, currency, stock, booking availability) come from validated server-owned state, never client assertions. For operations where retry/double application is possible, define idempotency scope, key ownership, request fingerprint, retention and atomic result/state rules; same key with different semantic input is a conflict. Concurrent writes must preserve invariants using appropriate atomic constraints, transactions or locks; avoid check-then-write races. Money uses exact decimal or integer minor units with explicit currency and rounding rules, not binary float; orders keep agreed price/currency/item snapshots. Booking stores instants with an explicit relevant time zone and documented DST ambiguity handling; conflicting reservations cannot commit simultaneously. These are future acceptance constraints, not implemented features.

For each approved data store document owner, purpose, classification, minimum fields, retention/deletion, access policy, export and recovery. No real customer data in public repo or fixtures. Private config is validated at server startup before accepting traffic; missing/invalid required values fail safely. No secrets in logs or client bundles. Use established auth libraries/protocols, no custom cryptography. CSRF protection for cookie-authenticated mutations, safe session/cookie policy, output encoding, authorization against IDOR/BOLA, SQL injection prevention, SSRF controls, upload limits and safe storage where applicable; define concrete threat model and applicable OWASP ASVS checks before runtime approval.

Migrations: versioned and reproducible, clean install plus upgrade from supported previous schema on synthetic fixtures; verify constraints, rollback/failure behavior and compatibility. Define backup/restore evidence and rollback or forward recovery before production changes; irreversible/destructive changes require explicit founder approval, reviewed recovery strategy and authorized maintenance. No production database mutation in this Issue. Deployments are independently reversible or have documented safe forward recovery.

## Non-goals and future evidence

No actual HTTP routes, database, auth, payment, booking, notifications, providers, migrations, runtime dependencies or CI are added by #5. Future authorized tasks must prove positive/negative and boundary cases, missing resources, permission denial, dependency failures, replay, concurrency, transaction rollback, migration and recovery as applicable, with integration evidence against real test dependencies where mocks cannot prove invariants. Payment processing only by approved official provider; no card storage, verify webhook authenticity, amount/currency and replay/out-of-order behavior; browser redirects are not proof of payment. Demo payments sandbox/local simulation only; demo messages never sent to real recipients. Tests require synthetic data and permitted environments. Contract review is not implementation or security certification.
