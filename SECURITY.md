# Foundation security policy

## CI trust boundary

Foundation CI uses standard GitHub-hosted Ubuntu 24.04 runners, empty token permissions, a ten-minute job limit and cancellation of superseded runs on the same event/ref. Public source is fetched by exact SHA over HTTPS with native Git. Credential helpers are disabled for the fetch. No token, saved remote or checkout credential is needed. This checkout depends on the repository remaining public. Review the design before making it private.

The workflow downloads the official Linux x64 Node archive and the published pnpm tarball over HTTPS, checks pinned SHA-256 and SHA-512 values before extraction and executes the verified versions. It installs no external Actions, install scripts or global npm packages. The runner image and GitHub service can receive updates. No shared package cache, deployment, package publication or production access is part of this job.

Run untrusted PR code only in the unprivileged PR workflow. Keep secrets, real personal or client data, production configuration and environment dumps out of the repository, job arguments, logs and artifacts. If a credential is exposed, revoke or rotate it first, remove the source of exposure and coordinate incident handling privately. Preserve required gates. Changes to GitHub rules and required checks belong to the founder.

## Dependency review

| Component | Provenance, terms and reason |
| --- | --- |
| Node.js 22.23.5 | Maintenance LTS Jod, supported through 2027-04-30. The upstream release index marks this patch as a security release. The runtime runs the compiler, CLI and built-in tests. Retain the distribution LICENSE and its bundled third-party terms when redistributing. [Release](https://nodejs.org/en/blog/release/v22.23.5) · [Schedule](https://github.com/nodejs/Release/blob/main/schedule.json) · [Checksums](https://nodejs.org/dist/v22.23.5/SHASUMS256.txt) |
| pnpm 11.29.0 | Official maintained 11.x release at review time. Its Node requirement is ≥22.13. Exact bytes bootstrap the frozen workspace. MIT and bundled third-party terms apply. Record and compare registry integrity independently when updating. [Release](https://github.com/pnpm/pnpm/releases/tag/v11.29.0) · [Registry metadata](https://registry.npmjs.org/pnpm/11.29.0) |
| TypeScript 5.9.3 | Only workspace development dependency, no registry dependencies. Requires Node ≥14.17. Retain this verified compiler for the fixture. A future maintenance window for 5.9 has not been established. Preserve Apache-2.0, copyright and third-party notices when distributing copies, and mark modified files. [Release](https://github.com/microsoft/TypeScript/releases/tag/v5.9.3) · [Registry metadata](https://registry.npmjs.org/typescript/5.9.3) |

The November 27, 2026 review found zero workspace advisories via `pnpm audit`, including TypeScript. No vulnerable/unpatched range in the Node Security WG core index matched 22.23.5. Direct GitHub Advisory Database queries for the pinned pnpm and TypeScript versions returned no matches. Each source has its own coverage. [Node core advisories](https://github.com/nodejs/security-wg/blob/main/vuln/core/index.json) · [GitHub Advisory Database](https://github.com/advisories)

The pnpm distribution bundles additional code outside the workspace lockfile. npm bulk-advisory queries for 432 identifiable name/version pairs from bundle paths and package manifests returned two moderate findings: `glob@13.0.7` may continue filesystem traversal after cancellation, and `minimatch@10.2.6` may consume excessive resources processing crafted patterns. This fixture uses one literal workspace path, takes no external patterns, disables install scripts and bounds runner time. These are outstanding tool risks. Recheck patched 11.x bundles and reassess before accepting patterns from outside the repository or broadening the workspace. pnpm 12 introduces a separate platform binary and requires a new bootstrap and lockfile compatibility review. [glob advisory](https://github.com/advisories/GHSA-3g3m-2fjr-6pw4) · [minimatch advisory](https://github.com/advisories/GHSA-g3hv-75wg-m249)

Registry metadata for those identifiable components included permissive licenses and additional obligations for redistribution. Preserve copyright, license and attribution notices. In particular, review file-level MPL-2.0 for `next-path`, LGPL-3.0+ source and relinking obligations for `openpgp`, and CC-BY-3.0 attribution for `spdx-exceptions` before shipping a copy of the tools. CI consumes upstream archives. Bundle paths and registry metadata cannot establish a complete native-code inventory or a legal determination for a future redistributed product.

For dependency or tool updates, review upstream maintenance, release notes, license changes, applicable transitive advisories, artifact hashes and compatibility. Pin exact versions. Any external Action introduced later requires a verified full commit SHA and a review of its bundled dependencies. Generate a changed lockfile with the pinned pnpm and inspect the complete diff. Require a clean frozen install with lifecycle scripts disabled and rerun applicable checks on the exact candidate. Report an unavailable advisory service as unknown, retain its failure and retry. Triage findings explicitly. Never suppress them, automatically apply audit fixes or weaken CI to obtain a passing result.

## Limits and rollback

Slug validation covers string syntax. Future Forge filesystem containment, symlink handling and safe writes require separate controls. Future web applications need a project-specific threat model and applicable OWASP ASVS verification.

For an integrated regression, identify the introducing commit and last verified revision. Propose a reviewed revert restoring code, manifests, lockfile and CI together. Run the same clean checks, security review and exact-SHA audit. The founder controls merge after CTO review. Never rewrite shared history or bypass a failing gate.
