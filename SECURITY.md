# Foundation security baseline

Status: proposed; applies to the tooling fixture, not an assertion of application security.

- No secrets, credentials, client material, real user data or production access in this public repository or its CI.
- Use read-only checkout permissions, no persisted credentials, full commit SHA pins, GitHub-hosted standard Linux runners only. Never use privileged untrusted pull_request_target execution or paid runners without permission.
- Exact dependency versions and generated integrity-bearing lockfile; disable lifecycle scripts for the fixture. Review new dependencies, licenses, transitive dependencies and known advisories before merge. No unverified dependency exceptions.
- Required CI must run on actual reviewed code without path-filter gaps, skipped required steps or continue-on-error. Branch rules are owned by the founder; Platform does not change settings.
- Never print credentials or environment dumps. Temporary bootstrap prints only the generated public dependency lockfile and its hash; remove it before merge.
- Fixture slug validation is not a filesystem security boundary; Forge path containment, symlink handling and atomic writes require separate implementation and tests.
- For future STATIC, DYNAMIC and APPLICATION projects, document applicable threat models and OWASP ASVS controls, validated trust boundaries, least privilege, privacy, secrets, secure deployment and rollback. No deployment or compliance claim in #4.

Rollback: if an integrated tooling change fails, propose a reviewed revert PR to the last verified state and re-run affected checks; do not disable branch rules or force-push. No production system exists in this scope.
