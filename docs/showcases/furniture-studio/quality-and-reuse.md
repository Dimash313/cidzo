# Furniture studio — acceptance and platform consumption plan

Task #11; design requirements only. No implementation, browser rendering, CI pass or compliance claim. References: [concept](concept.md), [architecture](../../../ARCHITECTURE.md), [ownership](../../governance/ownership-and-gates.md).

## Proposed consumer map (not existing exports)

| Need | Candidate shared owner | Local site responsibility |
| --- | --- | --- |
| Colors, spacing, typography, focus | CHAT 03 Design | Editorial palette and rhythm using accepted token contract |
| Semantic links, buttons, navigation disclosure, form fields, status and error presentation | CHAT 03 Primitives | Site layout, copy, labels and selected scenario |
| Static typed content, locale and metadata, inquiry input contract | CHAT 04 Content / Connect with CHAT 03 consumer | Synthetic objects, content and page data; no custom submission service |
| Responsive image, layout and motion support | CHAT 03 Design / Layout / Motion | Object composition and responsive cropping |
| Astro build, preview rules, CI, browser/axe/performance and security policies, future Forge | CHAT 05 Foundation / Verify / Shield / Deploy | Consumer-specific tests and asset records in separately authorized scope |

Main at pinned base contains governance documents, no reusable runtime. Draft #9 static content schema is official-site-oriented (services/contact records); it is not an accepted furniture product schema or interactive form contract. Request CTO coordinate whether static collection records (slug, title, description, dimensions, finish, image metadata) and local no-network demo form are supported by an approved extension or site-local typed data consuming shared boundaries. No commerce module is needed for this STATIC browse-only project; do not implement a cart or duplicate a shared validator. Draft #10 quality/security gates and #8 dispatcher are proposals only. Revalidate exact accepted revisions after integration. No changes to root manifest, shared packages, other docs or workflows in #11. No new Issue needed now: feedback on #11 for CTO triage and duplicate check. Local editorial sections may be project-specific, not a second UI library.

## Future implementation acceptance matrix (all NOT RUN)

| ID | Verification and expected result |
| --- | --- |
| S01 | Clean checkout, approved pinned dependencies and frozen install; strict types, lint, tests and static build pass; no server, database, paid service or secret. Verify generated routes and 404. |
| S02 | All navigation, direct routes, breadcrumbs and return links work; keyboard and JS-disabled navigation verified; route metadata unique, preview non-indexable. |
| S03 | Collection has exactly three fictional records and valid detail links; missing/duplicate slug, malformed dimensions, unsafe text or asset path fails validation; no untrusted HTML. |
| S04 | Inquiry invalid/valid/reset flows; labels, associated errors and summary; inspect network/storage before and after action: zero transmissions or persisted user choices; no PII fields; direct detail context uses allowlisted IDs only, no arbitrary URL redirects. No JS fallback explicit. |
| S05 | Screenshots at proposed 320, 375, 768, 1024, 1440, 1920 CSS px, portrait/landscape as applicable; no clipped text, overlap, unexpected shifts or horizontal overflow. Test long strings, zoom/reflow 400%, text resize 200%, keyboard and touch. Actual approved browser matrix required (propose Chromium, Firefox, WebKit); no unsupported browser claims. |
| S06 | WCAG 2.2 AA applicable criteria: landmarks/headings, labels/names, meaningful alt, visible unobscured focus, keyboard/no trap, contrast 4.5:1 normal text and 3:1 large text/nontext as applicable, minimum target size 24 CSS px or documented exception (design target 44), reduced motion, live status and error recovery. Run axe and manual checks including a screen-reader flow; no conformance from automated scores alone. |
| S07 | Review applicable ASVS controls and static threat model: escaped text, safe local links/asset paths, no unsafe HTML, secrets, remote scripts, tracking, data collection or real network form. Verify host headers, preview access/indexing and dependency/license/advisory checks with Platform. Document inapplicable server/auth controls. |
| S08 | Responsive optimized images with intrinsic dimensions, below-fold lazy loading, prioritize hero only; no render-blocking third-party font or script. Proposed lab budgets pending Platform: initial compressed JS <= 30 KiB, CSS <= 40 KiB, mobile hero <= 200 KiB, initial mobile transferred assets <= 500 KiB (excluding lazy below-fold); measure actual transfer on cold cache, disclose profile, repeat three times and record median. Platform-approved budgets supersede proposals. |
| S09 | Lighthouse CI lab LCP <= 2.5 s, CLS <= 0.1 under agreed profile; record TBT as separate lab metric, scripted interactions as diagnostic only. Field p75 targets LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1; field UNKNOWN until representative user data. No analytics solely for this demo. |
| S10 | Explicit demo banner on every route, no real orders, ratings, metrics, contact destinations or payment; reviewed asset rights/no living beings/music; document launch instructions, limitations, rollback/preview policy and exact SHA checks; independent audit then CTO review. |

Screenshots, actual build output and run URLs must be attached in future implementation PR. Check actual changed-path inventory including renames/deletions, exact base/head, all applicable CI and audit verdict. No independent acceptance or publication implied.

## Gates and unresolved decisions

HARD none for #11 documentation. SOFT alignment with #4/#5/#6 and #7/#8. Runtime requires new authorized Issue, exact base, assigned project path, approved static architecture/consumer contracts and serialized manifest/lockfile ownership where needed. CTO to confirm collection schema, local-only interaction, browser/asset budgets, locale and final public name; founder resolves content/rights uncertainty and authorizes publication. No automatic production integration. No real assets or dependencies acquired.