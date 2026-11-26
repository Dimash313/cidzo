# Platform handoff — Issue #4

Base: 3ca0c3e59365c5e7470eac9e6b9406f2b958bf42. Governance integrated; CTO authorized this task. Branch: platform/issue-4-foundation.

Work in progress: minimal private workspace, strict compiler, tooling fixture, lint and proposed quality/security policy. Local environment could not install pnpm: no binary/cache and npm registry DNS unavailable. Temporary read-only branch-push workflow generates an actual lockfile and attempts checks; it must be removed before merge. Obtain its output, verify provenance and SHA-256, commit the exact generated lockfile, add a permanent PR/push frozen-install workflow, then verify the final HEAD. Do not claim success before observing runs. No application paths, production changes, or spending. No merge. Independent audit only after final CI evidence is available.
