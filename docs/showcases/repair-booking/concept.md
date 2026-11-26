# Repair booking — DYNAMIC showcase concept

CIDZO-SHOWCASE-002 / Issue #15. Design/requirements only. Working title: Repair Desk (not trademark-cleared or approved for release). Fictional household appliance service. Audience: visitors exploring appliance categories and convenient service windows; CIDZO prospects evaluating booking UX. Goal: accessible simulated booking with changing availability, not real repair guidance or lead generation.

## Minimal architecture
STATIC is sufficient for service information and a local inquiry preview (furniture #11), but independent browser states cannot prove shared availability, authoritative revalidation and concurrent contention. Future DYNAMIC is justified only by that narrow capability: static-renderable public content plus isolated synthetic server-owned fixture, bounded availability read and demo reservation mutation. Next.js/React and approved shared interfaces are candidates under [architecture](../../../ARCHITECTURE.md); no version, implementation or runtime authorization here. Persistence belongs to CHAT 04: smallest approved adapter capable of proving isolation and atomic conflict; do not claim durable booking from a browser or unsupported multi-process memory store. No APPLICATION, login, payment, admin, dispatch, notifications, external API, real booking or personal data.

## Visual direction: operational service desk
Task-first layout rather than #11 editorial imagery: navy #102A43, white #FFFFFF, pale blue #E8F0F7, deep teal #006B63 for action, amber #805000 and red #A61B29 for status text on suitable light backgrounds. Color never sole status signal. System sans, 40–56 px headings desktop / 30–36 mobile, 16–18 body, tabular times. Verify final contrast; visible focus, restrained 4–8 px rounding, clear numbered steps; no gradients, video, carousel or sticky overlay. Desktop 12-column max 1200 px: headline/CTA beside geometric appliance silhouette; category list with separators; booking 8-column form + 4-column summary, summary after form in DOM. Tablet two columns only if fit; 320–767 px single column in DOM order, times wrap, no horizontal calendar scroll. At 320/375/768/1024/1440/1920 CSS px verify clipping, long text, focus order; 200% text resize and 400% zoom/reflow. Nonessential motion <=150 ms, removed with reduced motion; no auto-advance. Native controls or approved shared primitives.

## Page map
| Proposed route | Purpose |
| --- | --- |
| / | Demo notice, headline “Choose a service time”, supported appliances, three-step explanation, CTA |
| /services/ | Three fictional diagnostic-visit categories |
| /services/washing-machine/ | Sample symptoms, link to booking |
| /services/refrigerator/ | Same purpose, distinct category content |
| /services/dishwasher/ | Same purpose, distinct category content |
| /booking/ | Appliance, time, review, result in same flow (no shareable booking URL) |
| /about-demo/ | Fictional status, privacy, fixture/reset explanation |
| unknown route | Accessible 404 and return links; verify actual status |

Header with text wordmark, service/about/booking links, skip link, main landmark; footer and every view including error/confirmation/404 explicitly state “Fictional CIDZO demonstration — no real service visit or appointment.” English copy illustrative only, no approved locale. Unique metadata, no invented canonical host, LocalBusiness/review markup or sitemap; preview non-indexable pending authorized publication. No false address, phone, prices, warranties, response time, experience or reviews.

## Synthetic content and assets
Washer: not draining / unusual noise / other predefined issue. Refrigerator: not cooling / temperature variation / other. Dishwasher: not starting / not draining / other. Symptoms not diagnosis or instructions. No free text, upload, name, contact, address, serial number. Proposed geometric appliance silhouettes or object-only still life, no people, animals, reflections of living beings, music, brand marks or unlicensed materials. No acquired assets. Record creator/source or generation provenance, rights/license, attribution, date, permitted uses, transformations and alt rationale; review restrictions before use. Intrinsic dimensions and responsive variants; adjacent-label icons decorative, meaningful image alt accurate. See [scenarios](booking-scenarios.md), [quality](quality-and-integration.md), [handoff](handoff.md).
