# CHAT 04 — Backend handoff

Issue #5 / CIDZO-ASTRA-002 continues Draft PR #9 from `9349b7a5e8c257abce128fe6c952423f59e798fe` on base `3ca0c3e59365c5e7470eac9e6b9406f2b958bf42`. CHAT 04 remains accountable. The CTO reserved this revision for the founder-launched manual executor and froze other backend writes. The PR discussion records the exact candidate SHA, verification results and subsequent audit decision. [Assignment](https://github.com/Dimash313/cidzo/issues/5) · [Independent findings](https://github.com/Dimash313/cidzo/pull/9#issuecomment-7212998272) · [Consumer review](https://github.com/Dimash313/cidzo/pull/9#issuecomment-7185251037)

| Finding | Decision for the official site |
| --- | --- |
| CIDZO-AUD-003 | Validate every locale before publication. The default defines the ordered service IDs, each locale needs at least one approved contact, and optional display prices and legal requirements are decided per locale. The two-locale fixture shows the production minimum and single-locale failures. |
| CIDZO-AUD-004 | Serve only the exact default and translated page paths. Reject route collisions at build time and return 404 for aliases. Every preview HTML page carries noindex, even with an approved origin. Only published production equivalents contribute canonical, hreflang and sitemap URLs. |
| CIDZO-AUD-005 | Match the kind and the entire canonical contact href against reviewed destinations. The contract specifies URL-parser normalization, a single literal ASCII mail recipient, encoding rejection and manual review of the final destination. |

The [static content and config contract](../backend/static-content-config.md) defines these decisions and failure cases. The [future server boundaries](../backend/server-boundaries.md) retain separate project data, server-side resource authorization, transaction and recovery requirements for a later authorized use case.

For CHAT 03 and CHAT 05, the design scenarios A02–A04, A10 and A11 map to the fixture, routing, contacts and indexing tables. Use app-owned localized interface text. Verify actual host 404s, preview access and served noindex, reciprocal production links and the sitemap when #6 has a site to test. The fixture grants no approval of a real translation, origin, price, legal claim or contact. The quality and security proposals in #10 concern Foundation and do not supply runtime evidence for this contract. [Official-site specification](https://github.com/Dimash313/cidzo/pull/17) · [Foundation proposal](https://github.com/Dimash313/cidzo/pull/10)

CHAT 02 independently audits the new exact HEAD before CTO review and founder integration. #6 requires integrated #4 and accepted/integrated #5, a new base and assigned manifest ownership. A changed base or HEAD requires revalidation. [Draft PR and evidence](https://github.com/Dimash313/cidzo/pull/9) · [Frontend implementation gate](https://github.com/Dimash313/cidzo/issues/6)
