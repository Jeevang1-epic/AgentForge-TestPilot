# Coding Agent Bonus Evidence

## Tool Used

OpenAI Codex was used as the coding agent for implementation support.

## Role of the Coding Agent

Codex helped accelerate implementation, iteration, verification, and documentation for AgentForge TestPilot while keeping the project focused on a deterministic UiPath-style release-governance prototype. The tool supported code generation, refactoring, validation scripting, UI iteration, and repository quality checks.

## Human-in-the-Loop Workflow

Human review controlled the project direction, scope, architecture decisions, final acceptance, and manual verification. Generated or assisted changes were reviewed before being committed, and the final repository remains source-readable, deterministic, and auditable.

## How Codex Contributed

- App scaffold and dashboard implementation.
- Deterministic release-check pipeline.
- UiPath proof contracts and platform proof artifacts.
- Premium UI iteration.
- Screenshot capture automation.
- Repository QA audit.
- Platform proof validation.
- Documentation polish.

## Verification Commands Used

- `npm run lint`
- `npm run build`
- `npm run repo:audit`
- `npm run proof:validate`
- `npm run screenshots`

## Evidence

- Public commit history with small logical commits.
- Screenshot assets under `public/screenshots/`.
- QA report and submission checklist.
- Platform proof validation script at `scripts/validate-platform-proof.mjs`.
- Repository audit script at `scripts/repo-audit.mjs`.

## Boundaries

- No raw prompt logs are included.
- No private local artifacts are included.
- No fake UiPath live connection is claimed.
- The current project remains a deterministic prototype with a UiPath proof layer and integration-ready adapters.
- Final source remains reviewed and auditable.
