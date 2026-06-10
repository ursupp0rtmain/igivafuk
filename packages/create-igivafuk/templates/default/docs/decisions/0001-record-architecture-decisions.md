# 1. Record architecture decisions

Date: 2026-06-10

## Status

Accepted

## Context

We need to record the architectural decisions made on this project. This enables both human developers and AI agents to understand why certain choices were made.

## Decision

We will use Architecture Decision Records (ADRs) as described by [Michael Nygard](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions).

ADRs are stored in `docs/decisions/` and numbered sequentially:

```
docs/decisions/
├── 0001-record-architecture-decisions.md
├── 0002-choose-frontend-framework.md
└── ...
```

## Consequences

- Significant technical decisions are documented in a consistent format.
- AI agents can read ADRs to understand constraints and past choices.
- New ADRs supersede old ones by updating the `Status` field to `Superseded by ADR-NNNN`.

## Template for new ADRs

Copy this structure for new decisions:

```markdown
# N. Title

Date: YYYY-MM-DD

## Status

Proposed | Accepted | Deprecated | Superseded by ADR-NNNN

## Context

What is the issue that we're seeing that is motivating this decision?

## Decision

What is the change that we're proposing and/or doing?

## Consequences

What becomes easier or more difficult because of this change?
```
