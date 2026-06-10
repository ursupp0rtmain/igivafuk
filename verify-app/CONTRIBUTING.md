# Contributing

This project uses [igivafuk](https://idontgivaf.uk) — structure over slop.

Thank you for contributing, whether you're a human or an AI agent.

## Getting started

1. Clone the repository.
2. Create a feature branch from `main`.
3. Make your changes.
4. Update `CHANGELOG.md` under `[Unreleased]`.
5. Open a pull request against `main`.

## Changelog policy

Every pull request **must** update [`CHANGELOG.md`](CHANGELOG.md). CI enforces this via **Changelog Check**.

### Local check

```bash
./scripts/check-changelog.sh main
```

### Exceptions

Maintainers can add the `skip-changelog` label for trivial changes only.

## Verify structure

```bash
npx igivafuk doctor
```

## Architecture decisions

Significant technical decisions go in [`docs/decisions/`](docs/decisions/) as ADRs.

## Branch protection (maintainers)

Enable on `main` in GitHub:

- Require pull request before merging
- Require status check: **Verify CHANGELOG.md was updated**
