# Phase 1 Research And UiPath Mapping

## UiPath Test Cloud

Future integration should use UiPath Test Cloud as the quality signal source for release checks. Milestone 3 models the expected dashboard shape with deterministic execution results and proof contracts only. No real UiPath Test Cloud API calls are made.

## UiPath Test Manager

Future integration should sync generated test cases, requirements, execution outcomes, and evidence links into UiPath Test Manager. Milestone 3 adds sample Test Manager-style requirements, test cases, execution results, and traceability under `uipath/test-manager`.

## UiPath API Workflows

Future integration should trigger controlled release-check workflows and retrieve artifacts through UiPath API Workflows. Milestone 3 adds request and response contracts under `uipath/api-workflows` but does not call workflow endpoints or create real automation jobs.

## UiPath Action Center

Future integration should create human review tasks when the release decision is `NEEDS_HUMAN_REVIEW` or `BLOCKED`. Milestone 3 adds a human review schema under `uipath/action-center` while still presenting the review decision locally.

## UiPath Coded Agents

Future integration should move deterministic agent logic into UiPath Coded Agents where the release process can be governed, versioned, and audited. Milestone 3 adds narrow Coded Agent contracts under `uipath/coded-agents` while keeping the working implementation local, pure, and deterministic for demo reliability.
