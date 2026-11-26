# Repair booking — acceptance and platform reuse

Issue #15. All future runtime checks PLAN / NOT RUN. References: [architecture](../../../ARCHITECTURE.md), [minimal profiles](../../decisions/0001-minimal-profiles.md), [ownership](../../governance/ownership-and-gates.md). Read-only proposals [#8](https://github.com/Dimash313/cidzo/pull/8), [#9](https://github.com/Dimash313/cidzo/pull/9), [#10](https://github.com/Dimash313/cidzo/pull/10), [#14](https://github.com/Dimash313/cidzo/pull/14) not accepted runtime contracts. Main contains governance only, no implemented shared UI or booking module observed. No alternative platform.

| Need | Owner via CTO | Local responsibility |
| --- | --- | --- |
| Tokens, navigation, buttons, steps, fields, status and focus | CHAT 03 | Service-desk composition and synthetic copy |
| Availability, atomic conflict, retry, fixture lifecycle, privacy/validation | CHAT 04 | Consume approved interfaces, no duplicate booking logic |
| Build, preview, CI, browser/axe/performance, security | CHAT 05 | Consumer tests/evidence in separately authorized scope |
| Profile, dependency order, contracts, manifest ownership | CHAT 01 | Consumer feedback |

#11 STATIC furniture catalog and local inquiry versus #15 task-first DYNAMIC shared contention. Both consume future primitives/content boundaries; different visual rhythm, layout, typography and user goals. #5 generic trust boundaries are not booking API; #4/#6 unfinished; #13 scope checker separate task, manual checks not automatic enforcement. Use #15 discussion for CTO triage rather than duplicate module Issue.

| ID | Future verification and expected result |
| --- | --- |
| R01 | Approved exact pins, frozen clean install, strict types, lint, tests, build, dependency/license/advisory review |
| R02 | Routes, links, correct 404, demo banner on all states, noindex preview, unique metadata, keyboard/no-JS public navigation |
| R03 | Valid bounded fixture intervals, unique IDs, zone, allowed category/symptom; malformed, unknown and mismatched inputs safely rejected before mutation |
| R04 | All [scenario](booking-scenarios.md) flows, no error-as-success; review matches actual selection |
| R05 | Two concurrent distinct requests to same capacity/slot: exactly one commit and one conflict in real approved test adapter; readback proves invariant. Replay, same-key different intent, rollback and ambiguous timeout/reconciliation; mock-only insufficient |
| R06 | Two controlled actors in same namespace contend; separate namespaces cannot read/mutate/reset each other; expiry/restart/reset per policy, no PII, cleanup and recovery evidence |
| R07 | Adjacent vs overlapping intervals per contract; timezone formatting and applicable DST gap/fold; no client clock/stale cache authorizes mutation |
| R08 | Applicable ASVS threat model: server validation, authorization/isolation, safe errors/output, request bounds and abuse limits, CSRF if ambient credentials, parameterized storage if used, no arbitrary URLs/providers/secrets/log payloads; deny cases and inapplicable controls documented |
| R09 | WCAG 2.2 AA manual + axe: landmarks, labels, errors, visible unobscured focus, keyboard/no trap, contrast 4.5:1 normal / 3:1 large/nontext as applicable, target >=24 CSS px except documented exceptions (design target 44), non-color status, announcements, reduced motion, screen-reader journey |
| R10 | Actual screenshots at 320/375/768/1024/1440/1920 CSS px, portrait/landscape, 400% zoom, 200% text resize, long strings, touch/keyboard, approved browser matrix (Chromium/Firefox/WebKit proposed) |
| R11 | Proposed budgets pending Platform: initial compressed JS <=120 KiB public / <=180 KiB booking; CSS <=45 KiB; initial mobile transferred assets <=500 KiB excluding lazy below-fold; no third-party requests; cold cache, agreed profile, median three runs, route-specific payload |
| R12 | Lab LCP <=2.5 s, CLS <=0.1 agreed profile; TBT and interaction traces separate; field p75 LCP <=2.5 s, INP <=200 ms, CLS <=0.1 unknown until representative data; no analytics just for demo |
| R13 | Explicit demo, no real payments/visits/notifications/data, no music/living-being imagery or false business claims, asset provenance and content review |
| R14 | Launch, isolation, retention/reset, recovery/rollback and limitations documented; exact SHA CI, changed-path inventory (incl renames/deletes), independent audit, CTO review, founder-only merge/publication |

HARD none for concept; SOFT #4/#5/#6/#8/#11/#14. CONTRACT before runtime: accepted availability/mutation, data/privacy/lifecycle and UI interfaces at exact refs, Platform gates, separate CTO task and exact base/runtime paths; serialize shared manifest changes. Working brand, illustrative locale and zone, lifecycle and budgets not approved. No implementation, tests, screenshots, assets or deployment. See [concept](concept.md) and [handoff](handoff.md).
