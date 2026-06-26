import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  applicationName: "AgentForge TestPilot",
  title: "AgentForge TestPilot | Release Governance Demo",
  description:
    "Deterministic release governance and evidence reporting for invoice approval automation changes.",
  openGraph: {
    title: "AgentForge TestPilot",
    description:
      "A deterministic release-check dashboard for invoice approval automation governance, risk, tests, failures, and evidence.",
    type: "website",
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-scroll-behavior="smooth" lang="en">
      <body>{children}</body>
    </html>
  );
}
