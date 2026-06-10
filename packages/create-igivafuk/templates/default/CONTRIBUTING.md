# Contributing

This project uses [igivafuk]({{WEBSITE_URL}}) — structure over slop.

## Getting started

1. Clone the repository.
2. Create a feature branch from `main`.
3. Make your changes.
4. Update `CHANGELOG.md` under `[Unreleased]`.
5. Open a pull request against `main`.

## Changelog policy

Every pull request **must** update [`CHANGELOG.md`](CHANGELOG.md). CI enforces this via **Changelog Check**.

For trivial changes only, maintainers can add the `skip-changelog` label.

## Verify structure

```bash
npx igivafuk doctor
```

## Branch protection (maintainers)

Enable on `main` in GitHub:

- Require pull request before merging
- Require status check: **Verify CHANGELOG.md was updated**
