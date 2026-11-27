# Foundation quality contract

Foundation covers the private pnpm workspace and the compiled slug fixture. The acceptance unit is a full Git commit SHA.

## Reproduce a candidate

Start with a clean checkout, an empty package store and no generated files. Use Node.js 22.23.5 and pnpm 11.29.0. The CI workflow shows the official Linux x64 archives and pinned checksums. The root manifest pins TypeScript 5.9.3 as a development dependency. These versions run the existing strict compiler and Node test runner without additional runtime or testing packages.

```sh
node --version
pnpm --version
sha256sum pnpm-lock.yaml
pnpm install --frozen-lockfile --ignore-scripts
pnpm run lint
pnpm run typecheck
pnpm run build
pnpm run test
pnpm audit
sha256sum pnpm-lock.yaml
git diff --exit-code HEAD --
git diff --check
git status --porcelain
```

| Gate | Acceptance |
| --- | --- |
| Workspace | The root and `@cidzo/foundation-fixture` are private, with unique names and no workspace dependency cycle. Only the existing fixture is enrolled. `pnpm list -r --depth Infinity` shows TypeScript at the root and no fixture dependencies. |
| Install | Actual versions match both pins. A tracked, nonempty lockfile installs with lifecycle scripts disabled. The package manager fails on incompatible engines or a mismatched manager. Running a script with stale dependencies requires an explicit install. |
| Lint | The deterministic checker requires LF, a final newline, spaces and no trailing whitespace. It scans the root package/workspace/TS configs and supported text extensions under `tooling/`, excluding `dist` and `node_modules`. It rejects tooling symlinks and the `ts-ignore`, `ts-nocheck` and `ts-expect-error` markers in TS files. Its scope is textual. Semantic analysis, workflow syntax and Markdown outside tooling require separate review. |
| Typecheck and build | Strict TypeScript must produce zero diagnostics. Typecheck emits nothing. A clean build must emit a nonempty `tooling/fixture/dist/slug.js`. `noEmitOnError` prevents new output on a compiler error. |
| Tests | `pnpm run test` rebuilds, then Node tests the emitted module. Cover both length limits, segmented slugs, case, Unicode, controls and whitespace, paths, invalid types and conversion hooks. A real regression must fail. |
| Integrity and reproducibility | The two lockfile hashes must match. The Git diff and porcelain status must be empty. No ignored files, dependency directories, compiler caches or build output may be tracked. In two independent clean checkouts of the same SHA with separate empty stores and the pinned Linux toolchain, compare the relative emitted file lists and SHA-256 of every output. |
| Dependencies and security | Include devDependencies in the registry audit. Separately review the Node distribution, package manager and CI bootstrap when their inputs change. Record findings and service failures under the [security policy](SECURITY.md). |

When a gate changes, exercise it in a disposable copy. A prohibited TS suppression must fail lint. A type mismatch must fail typecheck and a clean build must emit nothing. A validator that accepts boxed strings must fail the functional suite. Keep these mutations out of the submitted tree.

## Review and integration

Foundation CI checks every push and pull request, including drafts. For PRs the head job checks out the event's full head SHA. A second job checks GitHub's synthetic merge revision, verifies the two parents against the event base/head and repeats the suite. Compare the actual checkout in the log to the current PR revisions before using a result. Repeat affected checks and independent review when either revision changes.

CHAT 02 reviews the full diff against the assigned base, ownership, evidence, residual risks and rollback. CTO review follows. The founder controls integration and required status-check settings. Automated results establish the listed behaviors only. A numerical quality rating requires separate evidence.

## First web reference

The fixture has no rendered document, browser input, network page load or users. Browser accessibility, compatibility and rendering metrics first apply to an actual web surface. Review WCAG 2.2 AA with automated checks and manual keyboard, focus and assistive-technology testing. Select applicable OWASP ASVS controls against the application's threat model. For public sites measure field p75 LCP ≤ 2.5 s, INP ≤ 200 ms and CLS ≤ 0.1. Record device, network and workload for reproducible lab measurements. Field results require real traffic.
