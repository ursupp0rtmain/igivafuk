# Agent Instructions

This project was scaffolded with [igivafuk]({{WEBSITE_URL}}) — structured development, not AI slop.

Follow these rules on every task.

## Before you start

1. Read `README.md` for project context.
2. Read surrounding code in `src/` before making changes — match existing conventions.

## Branch workflow

- Create feature branches from `main`: `cursor/<short-description>-<suffix>`
- Never commit directly to `main`.
- Open a pull request before considering work complete.
- Ensure CI passes before requesting merge.

## Changelog (required)

**Every pull request must update `CHANGELOG.md`** under the `[Unreleased]` section.

- Add entries under: `Added`, `Changed`, `Fixed`, `Removed`.
- Write clear, user-facing descriptions.
- For trivial changes only, a maintainer may add the `skip-changelog` label.

## Code changes

- **Minimize scope** — only change what the task requires. No drive-by refactors.
- **No secrets** — never commit `.env`, API keys, or credentials. Use `.env.example` for new vars.
- **Reuse existing patterns** — extend existing code rather than reimplementing.
- **Comments** — only for non-obvious logic; code should be self-explanatory.
- **Tests** — add tests when they cover real behavior.

## Quality bar

Do not:

- Ship large PRs without changelog entries
- Generate boilerplate dumps without purpose
- Add folders or files without a clear reason

## Pull requests

- Fill out the PR template checklist.
- Confirm `CHANGELOG.md` is updated.
- Describe what changed and why.
