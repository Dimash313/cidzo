# Official CIDZO site — design specification

PLAN / Issue #12. Documentation only; no approved visual identity change, runtime or publication. See [architecture](../../../ARCHITECTURE.md) and [governance](../../../AGENTS.md). Proposed content contract: https://github.com/Dimash313/cidzo/pull/9 (not integrated). The official site is not a fictional showcase; its portfolio entries must explicitly identify demos.

## Direction: precise editorial grid
Use a high-contrast ink/paper canvas, asymmetric desktop hero with large headline and original abstract geometric linework, thin rules, numbered service rows and generous whitespace. Avoid generic card grids, gradients, fake dashboard illustrations and decorative motion. Use the approved CIDZO mark only after obtaining its source and provenance; until then use plain text CIDZO in internal preview. No music or living-being imagery. Use system sans-serif with Cyrillic/Kazakh coverage initially; any custom font requires license and glyph review. No external font requests by default.

## First reference: one static page per enabled locale
- Header: skip link, brand/home link, section navigation, available locale links.
- Main: one h1 from heading; introduction; approved contact CTA if available; services section h2 with semantic list and h3 titles, summaries and optional approved price labels; contacts h2 with ordinary links.
- Footer: studio name, approved legal notice if applicable. No invented registration, address, team, claims, testimonials or metrics.
- Later sections (about, process, FAQ, portfolio, separate pricing/legal pages) require reviewed content and a contract extension where needed. Do not create empty navigation targets. No fake client cases. Portfolio links only to approved demo publications with explicit labels.
- Internal preview with absent services/contacts: omit corresponding navigation and CTA, show a localized explicit preview notice, not a fabricated contact or dead button. Production must fail release if required approved content is absent.

## Proposed token direction
Base palette: ink #101010, paper #F5F5F5, white #FFFFFF, neutral #595959, line #767676, accent #005FCC (proposal only; brand approval pending).
Semantic roles: surface paper, text ink, secondary text neutral, border line, action ink on white or white on ink, focus accent on light surfaces and white on dark surfaces with a contrasting offset. Never use color alone to communicate state. Verify actual adjacent colors and every hover/focus/disabled state; decorative lines need not be interactive boundaries.
Typography: body 1rem/1.6; heading 2rem–4.5rem fluid with line-height 1.1–1.2; section heading 1.5rem–2.5rem; text measure 65ch maximum. No fixed text heights. Spacing scale 4/8/12/16/24/32/48/64/96 CSS px, rem-based implementation. Container max 1280px, gutters 16–48px; 0–4px radius for studio brand only. Shared base and semantic tokens must not encode CIDZO brand values as universal defaults. Motion 120–200ms for optional state transitions, no entrance dependency or looping decoration. Reduced motion removes nonessential movement.

## Responsive composition
| CSS width | Expected layout |
| --- | --- |
| 320, 360, 390 | single column; wrapped nav and locale links; headline wraps naturally; service rows stack; 16px gutter |
| 768 | single or two-column hero if content fits; services use flexible title/summary columns; 24px gutter |
| 1024, 1280 | asymmetric two-column hero; visible nav; service rows use numbered/title/summary columns; 32px gutter |
| 1440, 1920 | centered max-width container; 48px outer gutter minimum when space permits; no stretched text |
Breakpoints are content-driven, not device detection. Use logical properties, min-width zero, wrapping long words/URLs, intrinsic media sizes. At 400% zoom on 1280px viewport reflow to 320 CSS px without horizontal scroll. At 200% text size no clipping or overlap. Test landscape and mobile keyboard if future inputs exist. No hamburger or JS required for initial short navigation.

## Interaction and accessibility
Native anchors for navigation and external contact; no button pretending to be a link. Tab order follows DOM; skip link reaches main; focus remains visible and unobscured. Target 44x44 CSS px for primary controls, WCAG 2.2 AA minimum 24x24 or applicable spacing exception. Current locale indicated by text and aria-current; locale names in their own language, not flags. Decorative geometry hidden from assistive technology; meaningful images require alt text and approved provenance. No forced locale redirect, autoplay, modal, carousel or focus trap. Hover effects have equivalent focus state. Core navigation and content work with JS disabled. No loading skeleton for build-time content. Unknown route returns real 404 with reviewed recovery link, not a successful fallback page.

## Candidate shared components (only if consumed by #6)
Container: page width/gutters; Stack: section rhythm if repeated; Link: navigation/contact with focus and external destination policy; section heading and service list remain app composition until reuse proven. Tokens in packages/design; reusable primitives in packages/ui; app owns content and brand overrides. No Button, Dialog, Drawer, form, auth, cart, database, analytics, CMS, motion library or component lab in this first reference without a real approved need. No dependency selection in this task.
