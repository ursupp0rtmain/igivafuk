# igivafuk

> **Structure over slop.** Scaffold agent-ready projects that don't suck.

[idontgivaf.uk](https://idontgivaf.uk) says you don't give a f***. **igivafuk** says you actually do — you want to build something good, with structure, not another AI-generated mess.

## Quick start

Packages are published on [GitHub Packages](https://github.com/ursupp0rtmain/igivafuk/packages). Add this to `~/.npmrc` (or project `.npmrc`):

```ini
@ursupp0rtmain:registry=https://npm.pkg.github.com
```

Then scaffold a project:

```bash
npm create @ursupp0rtmain/igivafuk@latest my-app
# or
npx @ursupp0rtmain/create-igivafuk my-app
```

Interactive mode (default):

```bash
npx @ursupp0rtmain/create-igivafuk
```

Skip prompts:

```bash
npx @ursupp0rtmain/create-igivafuk my-app -d "My awesome SaaS" -y
```

Check an existing project:

```bash
npx @ursupp0rtmain/igivafuk doctor
```

For private repos, authenticate with a GitHub token that has `read:packages`:

```bash
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

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
| `npm create @ursupp0rtmain/igivafuk@latest <name>` | Scaffold a new project |
| `npx @ursupp0rtmain/create-igivafuk <name>` | Same, via npx |
| `npx @ursupp0rtmain/igivafuk doctor [dir]` | Verify project structure |
| `npx @ursupp0rtmain/igivafuk create <name>` | Scaffold via main CLI |

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
packages/create-igivafuk/   # CLI + templates (@ursupp0rtmain/create-igivafuk)
packages/igivafuk/          # doctor wrapper (@ursupp0rtmain/igivafuk)
```

```bash
git clone https://github.com/ursupp0rtmain/igivafuk.git
cd igivafuk
npm install
npm test

# local scaffold test
npm run create-igivafuk -- my-test-app -y --no-git
npx igivafuk doctor my-test-app
```

## Publish to GitHub Packages

From the **repository root** (not `packages/create-igivafuk/`):

```bash
export NODE_AUTH_TOKEN="$(gh auth token)"
npm run publish:cli
```

Or run **Actions → Publish to GitHub Packages** in GitHub.

Publishes `@ursupp0rtmain/create-igivafuk` first, then `@ursupp0rtmain/igivafuk` (dependency order).

## Links

- Website: [idontgivaf.uk](https://idontgivaf.uk)
- [Changelog](CHANGELOG.md)
- [Contributing](CONTRIBUTING.md)

## License

MIT
