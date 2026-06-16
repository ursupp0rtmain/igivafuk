# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Add language-specific setup presets for JavaScript, TypeScript, Python, Go, Rust, and C#/.NET scaffolds.
- Add `--language/-l` and `--list-languages` options to `create-igivafuk`.
- Generate language-specific README, AGENTS, CONTRIBUTING, and architecture guidance for selected setup presets.

## [0.1.5] - 2026-06-10

### Changed

- Remove `src/`, `tests/`, and `.github/ISSUE_TEMPLATE/` from default scaffold
- `igivafuk doctor` now checks 8 required files

## [0.1.4] - 2026-06-10

### Changed

- Slim default template: removed `docs/` and `scripts/` folders — minimal structure only
- `igivafuk doctor` now checks 10 required files instead of 13

## [0.1.3] - 2026-06-10

### Fixed

- Template `.gitignore` renamed to `_gitignore` so npm includes it in published tarball (npm never packs `.gitignore` files)
- `bin` paths in package.json normalized to avoid npm publish warnings

### Added

- GitHub Actions workflow `publish-npm.yml` for one-click npm publish via `NPM_TOKEN` secret
- `scripts/publish.sh` and `scripts/publish.ps1` helper scripts

## [0.1.2] - 2026-06-10

### Added

- Separate `igivafuk` npm package so `npx igivafuk doctor` works (previously 404 — only `create-igivafuk` existed)

### Fixed

- Publish workflow: commit `dist/`, npx esbuild fallback, `npm run publish:cli` from repo root

## [0.1.1] - 2026-06-10

### Fixed

- Bundle CLI with esbuild so `@clack/prompts` is included in the published package
- Fix `npx igivafuk doctor` failing when dependencies are not hoisted locally
- Use dynamic imports in CLI so `doctor` does not load the `create` module
- Fix template path resolution for bundled distribution builds

## [0.1.0] - 2026-06-10

### Added

- `create-igivafuk` npm package — CLI to scaffold structured, agent-ready projects
- `igivafuk doctor` command to verify project structure and score compliance
- Default template with `AGENTS.md`, changelog CI, ADRs, and igivafuk branding
- Monorepo structure with npm workspaces
- CI workflow for package tests and scaffold smoke test
- Product README with igivafuk positioning (structure over slop)
