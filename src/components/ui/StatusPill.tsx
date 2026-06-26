import type { ReactNode } from "react";

type StatusPillVariant = "blocked" | "review" | "ready" | "passed" | "pending";

interface StatusPillProps {
  children: ReactNode;
  className?: string;
  variant: StatusPillVariant;
}

const variantClassNames: Record<StatusPillVariant, string> = {
  blocked: "border-[#efb5ad] bg-[var(--error-soft)] text-[var(--error)]",
  review: "border-[#e4cfad] bg-[#fff4df] text-[#85632c]",
  ready: "border-[#cbd8c7] bg-[#eef5ea] text-[var(--success-muted)]",
  passed: "border-[#cbd8c7] bg-[#f3f8f0] text-[#587158]",
  pending: "border-[#d9d0c7] bg-[var(--surface-raised)] text-[var(--muted-text)]",
};

export function StatusPill({
  children,
  className = "",
  variant,
}: StatusPillProps) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] ${variantClassNames[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
