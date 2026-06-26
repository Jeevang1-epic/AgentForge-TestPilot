import Link from "next/link";
import type { ReactNode } from "react";
import { PremiumCursorGlow } from "@/components/ui/PremiumCursorGlow";

interface PremiumShellProps {
  active?: "home" | "dashboard" | "governance" | "releases" | "analytics";
  children: ReactNode;
}

const navItems = [
  { href: "/release-check", key: "dashboard", label: "Dashboard" },
  { href: "/release-check", key: "governance", label: "Governance" },
  { href: "/release-check", key: "releases", label: "Releases" },
  { href: "/#documentation", key: "analytics", label: "Analytics" },
] as const;

export function PremiumShell({ active = "home", children }: PremiumShellProps) {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-[var(--background)] text-[var(--text)]">
      <PremiumCursorGlow />
      <div className="premium-noise pointer-events-none absolute inset-0 z-0 opacity-80" />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-4 py-5 sm:px-6 lg:px-10">
        <nav className="premium-shadow flex items-center justify-between gap-4 rounded-full border border-[var(--border)] bg-white/82 px-5 py-4 backdrop-blur-xl">
          <Link className="flex items-center gap-3" href="/">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-low)] text-sm font-black text-[var(--primary)]">
              AF
            </span>
            <span className="text-lg font-black tracking-[-0.03em] text-[var(--primary)] md:text-2xl">
              AgentForge TestPilot
            </span>
          </Link>
          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <Link
                className={`pb-1 text-sm font-extrabold uppercase tracking-[0.12em] transition hover:text-[var(--primary)] ${
                  active === item.key
                    ? "border-b-2 border-[var(--primary)] text-[var(--primary)]"
                    : "text-[var(--secondary-text)]"
                }`}
                href={item.href}
                key={item.key}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            className="hidden rounded-full bg-[var(--primary-container)] px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-[var(--primary)] transition hover:bg-[var(--primary-soft)] md:inline-flex"
            href="/release-check"
          >
            Create Release
          </Link>
          <span className="hidden h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-low)] text-xs font-black text-[var(--primary)] sm:inline-flex">
            QA
          </span>
        </nav>
        {children}
      </div>
    </main>
  );
}
