# Agent Instructions

This repository is developed primarily with AI agents (Cursor Cloud Agents, local agents). Follow these rules on every task.

## Before you start

1. Read `README.md` for project context.
2. Read `docs/architecture.md` for the current system design (when available).
3. Read surrounding code in `src/` before making changes — match existing conventions.

## Branch workflow

- Create feature branches from `main`: `cursor/<short-description>-<suffix>`
- Never commit directly to `main`.
- Open a pull request before considering work complete.
- Ensure CI passes before requesting merge.

## Changelog (required)

**Every pull request must update `CHANGELOG.md`** under the `[Unreleased]` section.

- Add entries under the appropriate heading: `Added`, `Changed`, `Fixed`, `Removed`.
- Write clear, user-facing descriptions of what changed.
- For trivial changes only, a maintainer may add the `skip-changelog` label to bypass the CI check.

## Code changes

- **Minimize scope** — only change what the task requires. No drive-by refactors.
- **No secrets** — never commit `.env`, API keys, tokens, or credentials. Add new variables to `.env.example` instead.
- **Reuse existing patterns** — extend existing functions and components rather than reimplementing.
- **Comments** — only for non-obvious business logic; code should be self-explanatory.
- **Tests** — add tests when they cover real behavior; skip trivial assertions.

## Commits

- Use clear, complete sentences (German or English — stay consistent within a PR).
- One logical change per commit when possible.

## Documentation

- Update `docs/architecture.md` when the system design changes.
- For significant architectural decisions, add an ADR in `docs/decisions/`.
- Update `README.md` if setup or usage instructions change.

## Pull requests

- Fill out the PR template checklist.
- Confirm `CHANGELOG.md` is updated.
- Describe what changed and why in the PR summary.
