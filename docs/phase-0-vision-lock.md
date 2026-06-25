# Phase 0 Vision Lock

## Product

AgentForge TestPilot is a release-governance dashboard for enterprise automation teams. It helps quality owners decide whether an automation change is safe to release by combining requirement analysis, risk mapping, generated tests, execution review, failure diagnosis, human review routing, and evidence reporting.

## Demo Scenario

The Milestone 1 scenario is an invoice approval automation release check. A threshold-routing change is proposed for invoice approvals. The release check finds that a high-value invoice can bypass manager approval after the change, creating a critical governance failure.

## Locked Scope

- Build a working Next.js application.
- Use deterministic local demo data only.
- Keep all agent functions pure TypeScript and deterministic.
- Focus only on invoice approval automation release governance.
- Show a professional enterprise command-center dashboard.
- Return a default release decision of `BLOCKED`.

## Out Of Scope

- Real UiPath API calls.
- Authentication.
- Database persistence.
- Payments.
- External APIs.
- Generic QA use cases outside invoice approval release governance.

## Milestone 1 Success Criteria

- The `/` page explains AgentForge TestPilot clearly.
- The `/release-check` page shows the full release check flow.
- The critical failed test is visible and tied to business impact.
- The release decision is blocked or requires human review.
- The evidence report preview is ready for a hackathon demo.
