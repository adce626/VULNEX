import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Security Tools",
  description: "Browse 100+ offensive security tools for recon, exploitation, cloud, and OSINT with ready-to-use commands.",
}

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return children
}
