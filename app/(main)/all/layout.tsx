import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "All Sections",
  description: "Browse all VULNEX sections covering reconnaissance, web vulnerabilities, cloud, advanced topics, and more.",
}

export default function AllLayout({ children }: { children: React.ReactNode }) {
  return children
}
