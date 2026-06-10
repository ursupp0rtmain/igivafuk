# {{PROJECT_NAME}}

> {{PROJECT_DESCRIPTION}}

Built with [igivafuk]({{WEBSITE_URL}}) — {{TAGLINE}}

You said you didn't give a f***. Turns out you do. Good.

## About

{{PROJECT_NAME}} is a structured project for AI-assisted development. Agents follow rules in `AGENTS.md`; humans follow `CONTRIBUTING.md`. Every change is tracked in `CHANGELOG.md`.

Replace this section with your product vision once you know what you're building.

## Repository structure

```
{{PROJECT_SLUG}}/
├── .github/          # CI workflows, PR and issue templates
├── docs/             # Architecture docs and decision records (ADRs)
├── scripts/          # Automation scripts (e.g. changelog check)
├── src/              # Application source code
├── tests/            # Automated tests
├── AGENTS.md         # Rules for AI agents
├── CHANGELOG.md      # Project changelog (required on every PR)
└── CONTRIBUTING.md   # Contribution workflow
```

## Development workflow

1. Create a feature branch from `main`
2. Make changes (code, docs, config)
3. **Update `CHANGELOG.md`** under `[Unreleased]` — enforced by CI
4. Open a pull request
5. Wait for CI to pass, then merge

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## Check your structure

```bash
npx igivafuk doctor
```

## AI agent development

If you are an AI agent working on this repository, read [AGENTS.md](AGENTS.md) before making any changes.

## Local setup

Document your stack and setup steps here once chosen. See [docs/architecture.md](docs/architecture.md).

```bash
chmod +x scripts/check-changelog.sh
./scripts/check-changelog.sh main
```

## Links

- [igivafuk]({{WEBSITE_URL}}) — structure over slop
- [Changelog](CHANGELOG.md)
- [Contributing](CONTRIBUTING.md)
- [Agent instructions](AGENTS.md)
- [Architecture](docs/architecture.md)
