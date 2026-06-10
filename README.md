# igivafuk

> **Structure over slop.** Scaffold agent-ready projects that don't suck.

[idontgivaf.uk](https://idontgivaf.uk) says you don't give a f***. **igivafuk** says you actually do — you want to build something good, with structure, not another AI-generated mess.

## Quick start

```bash
npm create igivafuk@latest my-app
# or
npx create-igivafuk my-app
```

Interactive mode (default):

```bash
npx create-igivafuk
```

Skip prompts:

```bash
npx create-igivafuk my-app -d "My awesome SaaS" -y
```

Check an existing project:

```bash
npx igivafuk doctor
```

Requires the `igivafuk` package on npm (published alongside `create-igivafuk`).

## What you get

Every scaffolded project includes:

| File / folder | Purpose |
|---------------|---------|
| `AGENTS.md` | Hard rules for AI agents — no slop |
| `CHANGELOG.md` | Keep a Changelog format, CI-enforced |
| `CONTRIBUTING.md` | Git workflow for humans and agents |
| `.github/workflows/` | Changelog check on every PR |
| `docs/architecture.md` | Force architecture thinking early |
| `docs/decisions/` | ADR template for real decisions |
| `src/` + `tests/` | Clear home for code and tests |
| `.igivafuk.json` | Manifest for `igivafuk doctor` |

## Commands

| Command | Description |
|---------|-------------|
| `npm create igivafuk@latest <name>` | Scaffold a new project |
| `npx create-igivafuk <name>` | Same, via npx |
| `npx igivafuk doctor [dir]` | Verify project structure (`igivafuk` package) |
| `npx igivafuk create <name>` | Scaffold via main CLI (`igivafuk` package) |

### Options

```
-d, --description <text>  Project description
-y, --yes                 Skip prompts
--no-git                  Skip git init
-h, --help                Show help
```

## Why igivafuk?

AI agents are fast. Too fast. Without guardrails you get:

- 500 files, zero architecture
- PRs with no changelog, no context
- Secrets in `.env` committed by accident
- "It works" code nobody can maintain

igivafuk scaffolds the **minimum viable structure** so agents (and you) build something worth shipping.

**You said you didn't give a f***. Turns out you do. Good.**

## Development

This repo is a monorepo:

```
packages/create-igivafuk/   # npm package (CLI + templates)
```

```bash
git clone https://github.com/ursupp0rtmain/startup.git
cd startup
npm install
npm test

# local scaffold test
npm run create-igivafuk -- my-test-app -y --no-git
npx igivafuk doctor my-test-app
```

## Publish to npm

From the **repository root** (not `packages/create-igivafuk/`):

```bash
npm install
npm run publish:cli
```

Publishes both `create-igivafuk` and `igivafuk` packages. Order matters — `igivafuk` depends on `create-igivafuk`.

## Links

- Website: [idontgivaf.uk](https://idontgivaf.uk)
- [Changelog](CHANGELOG.md)
- [Contributing](CONTRIBUTING.md)

## License

MIT
