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
npx igivafuk@latest doctor test-output
```

## Publishing to npm

**Always publish from the repository root**, not from `packages/create-igivafuk/`:

```bash
# From repo root (the folder that contains package.json + packages/)
git pull origin main
npm run publish:cli
```

Or step by step:

```bash
npm install
npm run build
npm publish -w create-igivafuk --access public
```

### Common mistakes

| Problem | Fix |
|---------|-----|
| `cd packages/create-igivafuk` fails | You're in the wrong folder — use repo root |
| `Cannot find package 'esbuild'` | Run `npm install` from **repo root** first |
| `igivafuk/igivafuk/` nested path | `cd` to the outer repo root with `package.json` |

Bump version in `packages/create-igivafuk/package.json` and update `CHANGELOG.md` before publishing.
