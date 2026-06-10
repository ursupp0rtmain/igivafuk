# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
