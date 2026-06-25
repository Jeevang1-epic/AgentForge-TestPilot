import type { RiskFactor, RiskLevel } from "@/lib/types/releaseCheck";

export function calculateRiskScore(factors: RiskFactor[]): number {
  const weightedSeverity = factors.reduce(
    (total, factor) => total + factor.severity * factor.weight,
    0,
  );
  const maximumSeverity = factors.reduce(
    (total, factor) => total + 5 * factor.weight,
    0,
  );

  return Math.round((weightedSeverity / maximumSeverity) * 100);
}

export function mapRiskLevel(score: number): RiskLevel {
  if (score >= 85) {
    return "CRITICAL";
  }

  if (score >= 70) {
    return "HIGH";
  }

  if (score >= 40) {
    return "MEDIUM";
  }

  return "LOW";
}
