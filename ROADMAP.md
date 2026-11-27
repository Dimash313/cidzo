# CIDZO roadmap

All phases are PLAN unless verified in STATE.md. No promised dates. Each phase requires exact-SHA evidence, independent audit, CTO review and founder-authorized merge where applicable.

| Phase | Outcome | Gate |
| --- | --- | --- |
| 0 Governance & Foundation | documented architecture, pinned minimal workspace, quality/security contracts | governance and tooling audited; clean frozen install and checks on minimal real fixture; no fake checks |
| 1 Design System & Static Foundation | initial tokens, accessible primitives, static reference | actual Astro build, responsive/browser and axe checks, documented contracts |
| 2 Official CIDZO Website | truthful studio site using reference foundation | reviewed content, deploy preview, performance/accessibility/SEO verification |
| 3 Dynamic Foundation | validated server/config/data boundaries | real narrow reference scenario, authorization and validation evidence |
| 4 Commerce & Business Modules | demanded catalog/commerce modules | sandbox-only checkout if relevant, abuse/error/authorization tests |
| 5 Application Foundation | one real representative application use case | verified domain boundaries, migrations, recovery and access controls |
| 6 Forge & Automated Project Generation | independent reproducible scaffolding | generated clean projects build outside source repo, no secrets/runtime coupling |
| 7 Showcase Expansion | varied explicitly labeled demos | per-project quality and visual differentiation |
| 8 Production Readiness | release and operational evidence | deployment, rollback, security and monitoring evidence; no unverified readiness claim |

PHASE 0 order: governance (#1 / PR #2, integrated) -> Platform workspace and quality policy (#4) and Backend content/config contracts (#5) in parallel, after CTO pins the new base -> independent audit and integration of both -> Frontend static design and reference (#6). #6 is blocked until #4 is integrated and #5 contracts are accepted and integrated; CTO pins the new base and serializes any manifest/lockfile work before activation. No runtime modules before a concrete use case. Audit can review each submitted exact SHA; no parallel edits to shared paths. Test architecture on official site before broad template generation.

Expansion: #11 Showcase concept and #12 official-site design specification are independent preparation authorized by founder; neither is a runtime release or a new hard dependency of #6. #4 and #5 remain critical prerequisites for #6. #13 scope checker follows #4 integration and approved dispatcher policy; no competing workflow edits. Showcase implementation is separately authorized after relevant stable contracts/tooling, not necessarily after completion of all phases. Merge order follows actual dependencies and review evidence, not issue numbers.
