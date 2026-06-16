# Contributing to igivafuk

Thanks for helping people build structured projects instead of AI slop.

## Setup

```bash
git clone https://github.com/ursupp0rtmain/igivafuk.git
cd igivafuk
npm install
npm test
```

## Workflow

1. Branch from `main`: `cursor/<description>-5f94`
2. Update `CHANGELOG.md` under `[Unreleased]`
3. Run `npm test`
4. Open a pull request

## Package changes

CLI code lives in `packages/create-igivafuk/`. Templates live in `packages/create-igivafuk/templates/default/`.

After template changes, run a local scaffold to verify:

```bash
npm run create-igivafuk -- test-output -y --no-git
npx igivafuk doctor test-output
```

## Publishing to GitHub Packages

Packages: `@ursupp0rtmain/create-igivafuk` and `@ursupp0rtmain/igivafuk`.

### Option A — GitHub Actions (recommended)

1. Ensure **Settings → Actions → General → Workflow permissions** is set to **Read and write permissions** (required for `GITHUB_TOKEN` to publish packages).
2. Run workflow: **Actions → Publish to GitHub Packages → Run workflow** (not the old "Publish to npm" workflow).

Uses `GITHUB_TOKEN` automatically — no extra secret required.

### Option B — Local (repo root)

**Always publish from the repository root**, not from `packages/create-igivafuk/`:

```bash
git pull origin main
export NODE_AUTH_TOKEN="$(gh auth token)"   # needs write:packages
./scripts/publish.sh
```

Windows PowerShell:

```powershell
$env:NODE_AUTH_TOKEN = gh auth token
.\scripts\publish.ps1
```

Or step by step:

```bash
npm install
npm run build -w packages/create-igivafuk
npm publish -w packages/create-igivafuk
npm publish -w packages/igivafuk
```

### Common mistakes

| Problem | Fix |
|---------|-----|
| `cd packages/create-igivafuk` fails | You're in the wrong folder — use repo root |
| `Cannot find package 'esbuild'` | Run `npm install` from **repo root** first |
| `401 Unauthorized` on publish | Set `NODE_AUTH_TOKEN` with `write:packages` scope |
| `igivafuk/igivafuk/` nested path | `cd` to the outer repo root with `package.json` |

Bump version in `packages/create-igivafuk/package.json` and `packages/igivafuk/package.json`, then update `CHANGELOG.md` before publishing.
