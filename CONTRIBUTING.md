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

## Publishing to npm

### Option A — GitHub Actions (recommended)

1. Create an npm access token: https://www.npmjs.com/settings/~youruser/tokens (type: **Automation**)
2. Add it to GitHub: **Repo → Settings → Secrets → Actions → `NPM_TOKEN`**
3. Run workflow: **Actions → Publish to npm → Run workflow**

### Option B — Local (repo root)

**Always publish from the repository root**, not from `packages/create-igivafuk/`:

```bash
git pull origin main
npm login
./scripts/publish.sh
```

Windows PowerShell:

```powershell
npm login
.\scripts\publish.ps1
```

Or step by step:

```bash
npm install
npm run build -w create-igivafuk
npm publish -w create-igivafuk --access public
npm publish -w igivafuk --access public
```

### Common mistakes

| Problem | Fix |
|---------|-----|
| `cd packages/create-igivafuk` fails | You're in the wrong folder — use repo root |
| `Cannot find package 'esbuild'` | Run `npm install` from **repo root** first |
| `igivafuk/igivafuk/` nested path | `cd` to the outer repo root with `package.json` |

Bump version in `packages/create-igivafuk/package.json` and update `CHANGELOG.md` before publishing.
