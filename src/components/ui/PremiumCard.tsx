import type { HTMLAttributes, ReactNode } from "react";

type PremiumCardTone = "default" | "low" | "raised" | "danger";

interface PremiumCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  tone?: PremiumCardTone;
}

const toneClassNames: Record<PremiumCardTone, string> = {
  default: "border-[var(--border)] bg-[var(--surface-card)]",
  low: "border-[#ded5ca] bg-[var(--surface-low)]",
  raised: "border-[var(--border)] bg-[var(--surface-raised)]",
  danger: "border-[#efb5ad] bg-[#fff7f5]",
};

export function PremiumCard({
  children,
  className = "",
  hover = false,
  tone = "default",
  ...props
}: PremiumCardProps) {
  return (
    <div
      {...props}
      className={`min-w-0 rounded-[24px] border p-6 premium-soft-shadow ${toneClassNames[tone]} ${
        hover ? "transition duration-200 hover:-translate-y-1" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
