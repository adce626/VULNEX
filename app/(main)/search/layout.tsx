import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Search",
  description: "Search across all VULNEX tools, commands, payloads, and security resources.",
}

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children
}
