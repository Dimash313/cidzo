# Official site — acceptance and content coordination

PLAN, not test results. Companion [design](design.md); [roadmap](../../../ROADMAP.md). Align with proposed Platform policy https://github.com/Dimash313/cidzo/pull/10 and Backend contract https://github.com/Dimash313/cidzo/pull/9 after acceptance. Runtime Issue #6 remains blocked.

## Content and release decisions
Backend proposal supplies studioName, locale registry/default, optional canonicalOrigin, title, description, heading, introduction, services (stable id/title/summary/optional priceLabel), contacts (label/kind/href), optional legalNotice. Map directly; do not add required fields without owner agreement. UI labels (skip link, section titles, preview notice, 404 recovery, locale names) need reviewed locale resources; ask Backend/CTO whether app-owned dictionary or contract extension. ru/kk/en are candidate languages, not verified translations; future ar/RTL uses logical layout, lang/dir and locale-aware formatting. Enable only complete reviewed records. No mixed-language fallback on published routes. Default route / and other locale routes per accepted contract. Unknown HTTP paths return 404; confirm host behavior, trailing slash/case and reserved route collisions with Backend/Platform. Confirm stable service ID sets/order and optional section rules across locales. No arbitrary URLs, raw HTML, private configuration or customer data. Contact links require exact approved destination and manual destination verification; no automatic sending or tracking. No price, legal claim, domain, contact or asset is approved by this spec.

Founder review before publication: approved mark and asset rights, exact service scope and wording, prices if shown, public contact destinations, legal obligations, enabled translations, production origin. Preview must be non-indexable; verify noindex response/meta and access policy, not robots disallow alone. Production canonical, hreflang and sitemap only for approved origin and published equivalents; no invented origin. Confirm preview alternate behavior with Backend. Localized title/description, Open Graph only truthful approved fields, no fake review schema. Sitemap/robots and HTTP status checks at deployment.

## Future acceptance matrix
| ID | Scenario | Expected evidence |
| --- | --- | --- |
| A01 | Clean checkout and build | frozen install, strict types, build and exact SHA CI after Platform integration |
| A02 | Valid and invalid content | valid preview builds; invalid required fields, duplicate locales, unsafe URLs fail; no partial publish |
| A03 | Empty preview | no dead links or fabricated services/contact; explicit preview notice; production gate rejects |
| A04 | Locale routing | only complete enabled routes, correct lang/dir, no forced redirect, unknown path 404 |
| A05 | Responsive | browser screenshots and overflow assertions at 320/360/390/768/1024/1280/1440/1920 |
| A06 | Zoom and long text | manual 200% text and 400% zoom, long Kazakh/Cyrillic text, future RTL fixture; no loss |
| A07 | Keyboard | manual skip link, logical Tab order, visible unobscured focus, Enter activates links |
| A08 | Accessibility | axe plus manual headings, landmarks, names, contrast (4.5:1 normal, 3:1 large and applicable UI), target sizes and screen reader checks |
| A09 | Motion and JS | reduced-motion removes optional motion; core content/navigation with JS disabled |
| A10 | Contact | approved exact destination, safe URL validation, no side effects before explicit click |
| A11 | SEO | localized metadata, canonical/alternate/sitemap consistency, real 404, preview noindex |
| A12 | Performance | repeatable mobile lab profile, record tool/browser/device/network and raw results; no field claims |
| A13 | Asset/content review | provenance/license, approved copy, no fabricated claims, no music/living-being images |
| A14 | Browser matrix | Platform-approved Chromium/Firefox/WebKit versions and manual mobile checks; document unsupported cases |

Proposed initial budgets for Platform review: zero client JS for core static navigation, no third-party runtime requests, no custom font until justified, reserve dimensions for any approved imagery. Record transferred HTML/CSS/JS/media bytes and lab LCP/CLS; use lab interaction diagnostics separately from field INP. Public field p75 targets LCP <=2.5s, INP <=200ms, CLS <=0.1; field data UNKNOWN until measured. No Lighthouse score or WCAG compliance claim from this document. Browser tests, axe, build and deployment not run here.

## Handoff gate
Independent audit of documentation scope, links, contract alignment and acceptance coverage; CTO review then founder integration. #12 is a soft input to #6, not an additional hard gate. #6 requires actual #4/#5 integration, accepted content contract, exact new base and serialized manifest ownership. No runtime or showcase work authorized here.
