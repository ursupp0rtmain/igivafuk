# Contributing

Thank you for contributing to this project — whether you're a human developer or an AI agent.

## Getting started

1. Fork or clone the repository.
2. Create a feature branch from `main`.
3. Make your changes.
4. Update `CHANGELOG.md` under `[Unreleased]`.
5. Open a pull request against `main`.

## Branch naming

Use descriptive branch names:

```
cursor/add-user-auth-5f94
cursor/fix-login-bug-5f94
feature/payment-integration
```

AI agents should use the `cursor/<description>-<suffix>` pattern.

## Changelog policy

Every pull request **must** include an update to [`CHANGELOG.md`](CHANGELOG.md) under the `[Unreleased]` section.

The CI workflow **Changelog Check** verifies this automatically. Pull requests without a `CHANGELOG.md` change will fail CI and cannot be merged (once branch protection is enabled).

### Exceptions

For trivial changes (typos, formatting-only edits), a maintainer can add the `skip-changelog` label to bypass the check. Use this sparingly.

### Local check

Run the changelog check before pushing:

```bash
chmod +x scripts/check-changelog.sh
./scripts/check-changelog.sh main
```

## Git workflow

```
main (protected)
  └── feature-branch
        ├── commits
        ├── CHANGELOG.md updated
        └── pull request → CI → merge
```

### Branch protection (maintainers)

After the first CI workflow run, enable branch protection on `main` in GitHub:

**Settings → Branches → Add rule for `main`:**

- Require a pull request before merging
- Require status checks to pass: **Verify CHANGELOG.md was updated**
- Optional: Require linear history

## Architecture decisions

For significant technical decisions (framework choice, database schema, API design), create an Architecture Decision Record (ADR) in [`docs/decisions/`](docs/decisions/).

Use the template in `docs/decisions/0001-record-architecture-decisions.md` as a starting point.

## Code style

- Follow conventions in existing code.
- Use [`.editorconfig`](.editorconfig) for consistent formatting.
- AI agents: read [`AGENTS.md`](AGENTS.md) for detailed rules.

## Reporting issues

Use the GitHub issue templates for bugs and feature requests. Clear descriptions and acceptance criteria help agents implement fixes correctly.

## Optional improvements (future)

These are not required yet but recommended as the project grows:

- **Conventional Commits** (`feat:`, `fix:`, `docs:`) for structured commit messages
- **Pre-commit hooks** via the [pre-commit](https://pre-commit.com/) framework
- **CODEOWNERS** for mandatory reviews on sensitive paths
- **Stack-specific CI** (lint, test, build) once application code exists
