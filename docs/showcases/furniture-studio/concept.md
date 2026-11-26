# Furniture studio — STATIC showcase concept

Task: CIDZO-SHOWCASE-001 / #11. Status: proposal for review, not a built site. Internal working title: Furniture Studio (no trademark clearance or public brand authorization). Explicit fictional CIDZO demonstration. Audience: homeowners comparing furniture forms and dimensions, and prospective CIDZO clients assessing craftsmanship of web design. Goal: browse a small collection, understand materials, explore a piece, and try a non-transmitting inquiry preview. No store, payment, inventory, authentication, analytics, external service or real lead collection.

## Visual direction — material editorial

An architecture-magazine composition, not a card dashboard: warm ivory canvas (#F6F3EC), charcoal text (#252723), muted olive accent (#49583E), pale sand decorative fields (#E7DED0). Primary buttons charcoal with ivory text; accent text on ivory only after verified contrast. No text over photography; boundaries, focus and error colors require contrast tests. Proposed headline typography: Georgia or a licensed editorial serif, body system sans; no external font request by default. Display typography fluid 36–88 CSS px, body 16–19, line height at least 1.5 for paragraphs. Use real headings, not text embedded in images.

Wide layout: 12-column editorial grid, max content width 1440 px, 32–64 px gutters; hero left text and right furniture-only image (approximately 5:7); asymmetric collection rows alternating image placement, consistent reading order. No card borders, decorative gradients or uniform rounded tiles. Material detail uses a horizontal swatch composition with text descriptions. Generous space and restrained dividers. Tablet 768–1023 px: six columns, 24 px gutters; mobile 320–767 px: one column, 16–24 px gutters, image after text; no horizontal scroll, no fixed-height text. At 1920 px keep readable line lengths (approximately 60–75 characters). DOM order remains meaningful; no CSS reordering that contradicts keyboard order. At 200% text resize and 400% zoom/reflow preserve content and controls. Wide-screen navigation links collapse only if a shared accessible disclosure is available; otherwise wrap links. No carousel, autoplay or animation-dependent content. Optional opacity/translation on nonessential decoration up to 180 ms, never delaying visibility, removed for reduced motion. Avoid layout shifts.

## Information architecture

| Route (proposed, pending accepted routing contract) | Purpose |
| --- | --- |
| / | Demo banner, studio introduction, featured objects, material story, collection and inquiry links |
| /collection/ | Three furniture pieces, dimensions and links; simple static listing, no search/filter obligation |
| /collection/line-table/ | Table details, dimensions, finishes, photo, inquiry preview link |
| /collection/arc-bench/ | Bench details |
| /collection/plane-shelf/ | Shelf details |
| /materials/ | Material descriptions, care guidance (illustrative, not certified) |
| /inquiry/ | Local demonstration inquiry preview; never sends data |
| unknown route | Accessible 404 with home and collection links, correct HTTP status subject to host verification |

Shared header, main landmark, breadcrumbs on detail pages, footer and visible notice “Fictional demonstration by CIDZO. No real products, orders or inquiries.” Notice repeated at inquiry action. Actual UI copy below is English concept text only, not an approved locale or release language. No switcher or translated routes before locale approval. Metadata: unique descriptive titles and descriptions, no fabricated structured business/offer/review data. Preview noindex; no invented canonical origin or sitemap. Production/indexing requires separate approval.

## Synthetic content

Hero: “Furniture shaped by everyday space.” Intro: “Explore a fictional collection of simple forms, natural textures and useful proportions.” CTA: “Explore the collection.” Material section: “Oak grain, matte surfaces and understated geometry.” All descriptions and dimensions invented solely for demonstrating layout, not real specifications, sustainability claims or guarantees.

| Piece | Description | Illustrative dimensions (W × D × H) |
| --- | --- | --- |
| Line Table | Rectangular tabletop, simple oak-tone finish | 160 × 80 × 74 cm |
| Arc Bench | Low bench with curved edges, muted finish | 120 × 38 × 44 cm |
| Plane Shelf | Open shelving with clean horizontal lines | 90 × 32 × 150 cm |

Materials: oak-tone wood (illustrative grain), matte stone-tone surface, neutral woven-texture sample. Do not imply verified material sourcing. No prices, discounts, reviews, availability, client history, real addresses or contact details. Assets are not supplied in this cycle. Proposed use: original commissioned/generated object-only or architecture imagery, or verified reusable licensed resources. Record creator/source URL or generation provenance, license/rights, permitted use, attribution, acquisition date, transformations and alt decision per asset. Review for living beings (including reflections, artwork and background), logos, rights and misleading claims. Do not publish until checks completed. Specify responsive image variants with intrinsic sizes; decorative texture alt empty; meaningful object views describe visible form and finish; no redundant alt or fabricated visual details.

## User journeys

1. Home -> collection -> detail -> dimensions/materials -> back to collection: normal links usable without JS, descriptive names and current-page indication. Direct detail URL and refresh preserve route. Breadcrumbs allow return. No inaccessible whole-card nested links.
2. Home -> materials -> collection: accessible text descriptions supplement visual samples, not color alone. No swatch control if it does not change anything.
3. Detail or navigation -> inquiry: local demo scenario with predefined selectable piece (including “Not selected”), room type and finish preference, no names, email, free text or other personal data. Explicit “Preview inquiry (demo)” action validates required choices and shows a local summary and reset option; no network submission, persistence, query string or external notification. Accessible labels, errors associated with controls, focus on error summary or first invalid control, status announcement for successful preview. No JS: clearly state preview unavailable and offer return links; no fake successful submit. If approved local interaction contract is unavailable, block this feature/runtime rather than ship a misleading placeholder.
4. Keyboard/screen-reader and mobile user can perform all journeys; clear skip link, focus, logical headings, meaningful links and sufficient targets.

See [quality and reuse plan](quality-and-reuse.md), [architecture](../../../ARCHITECTURE.md), [profile decision](../../decisions/0001-minimal-profiles.md).