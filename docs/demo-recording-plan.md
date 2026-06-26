# Demo Recording Plan

## Goal

Record a clear 5-minute hackathon video that shows AgentForge TestPilot as a judge-ready release governance prototype for UiPath automation teams.

## 5-Minute Structure

| Time | Scene | What To Show | What To Say |
| --- | --- | --- | --- |
| 0:00-0:30 | Opening | `http://localhost:3000` landing page | "AgentForge TestPilot is an AI release gate for UiPath automations. This demo checks whether an invoice approval automation change is safe to release." |
| 0:30-1:10 | Thesis and scenario | Top of `/release-check` | "The scenario is invoice approval threshold routing. Finance wants preferred vendor invoices below USD 25,000 to move faster while preserving manager approval for high-value invoices." |
| 1:10-1:45 | Judge Demo Flow | Judge Demo Flow panel and agent timeline | "The release check receives the change, analyzes risk, generates tests, detects a critical failure, blocks the release, and records evidence." |
| 1:45-2:25 | Requirements and risk | Requirement analysis and risk score panels | "The pipeline extracts business rules and acceptance criteria, then scores risk as critical because approval thresholds, exception handling, and auditability are in scope." |
| 2:25-3:05 | Test coverage and execution | Coverage table and execution results | "Five tests are generated. Four pass, but the high-value manager approval test fails." |
| 3:05-3:45 | Failure diagnosis | Failed test and diagnosis panels | "The preferred-vendor fast path bypassed the high-value approval guard, so a USD 48,500 invoice went directly to finance validation." |
| 3:45-4:25 | Decision and evidence | Human review and evidence report preview | "The release is blocked. The report captures the requirement trace, risk, coverage, failed test, root cause, release decision, human decision, and timestamp." |
| 4:25-5:00 | UiPath proof layer | UiPath mapping panel and repository folders | "The proof layer maps this prototype to Test Manager, API Workflows, Action Center, and Coded Agents. Real UiPath connectivity is intentionally future work." |

## Scenes To Record

1. Landing page hero and critical finding card.
2. Release dashboard header with project thesis and demo scenario.
3. Judge Demo Flow panel.
4. Agent timeline.
5. Requirement analysis panel.
6. Risk score and risk factors.
7. Test coverage table.
8. Execution results and critical failed test.
9. Failure diagnosis.
10. Human review and release decision.
11. Evidence report preview and copy-ready markdown.
12. UiPath mapping panel.

## Screenshot References

- `public/screenshots/homepage-full.png`
- `public/screenshots/homepage-viewport.png`
- `public/screenshots/release-check-full.png`
- `public/screenshots/release-check-viewport.png`
- `public/screenshots/release-critical-failure.png`
- `public/screenshots/evidence-report-preview.png`
- `public/screenshots/uipath-proof-layer.png`

## Recording Notes

- Keep the browser zoom at 90 or 100 percent.
- Use a single browser tab unless showing the repository structure briefly.
- Speak in terms of release governance, controls, evidence, and human review.
- Avoid claiming that real UiPath APIs are connected.
- Keep the run local and deterministic.

## Final Closing Line

"AgentForge TestPilot turns automation release risk into a clear decision: what changed, what failed, why it failed, what evidence proves it, and what human approval is required before production."
