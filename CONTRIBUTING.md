# Contributing to igivafuk

Thanks for helping people build structured projects instead of AI slop.

## Setup

```bash
git clone https://github.com/ursupp0rtmain/startup.git
cd startup
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

## Publishing

Maintainers publish from `packages/create-igivafuk`:

```bash
npm publish --access public
```

Bump version in `packages/create-igivafuk/package.json` and update `CHANGELOG.md` before publishing.
