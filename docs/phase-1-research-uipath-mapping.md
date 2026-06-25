# Phase 1 Research And UiPath Mapping

## UiPath Test Cloud

Future integration should use UiPath Test Cloud as the quality signal source for release checks. Milestone 1 models the expected dashboard shape with deterministic execution results only. No real UiPath Test Cloud API calls are made.

## UiPath Test Manager

Future integration should sync generated test cases, requirements, execution outcomes, and evidence links into UiPath Test Manager. Milestone 1 keeps generated test cases in local TypeScript data and renders them in the dashboard.

## UiPath API Workflows

Future integration should trigger controlled release-check workflows and retrieve artifacts through UiPath API Workflows. Milestone 1 does not call workflow endpoints and does not create real automation jobs.

## UiPath Action Center

Future integration should create human review tasks when the release decision is `NEEDS_HUMAN_REVIEW` or `BLOCKED`. Milestone 1 presents the human review decision locally without routing tasks to Action Center.

## UiPath Coded Agents

Future integration should move deterministic agent logic into UiPath Coded Agents where the release process can be governed, versioned, and audited. Milestone 1 keeps the agent functions local, pure, and deterministic for demo reliability.
