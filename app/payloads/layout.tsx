import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Payloads",
  description: "Curated payload lists for XSS, SQL injection, SSTI, command injection, and more web security testing scenarios.",
}

export default function PayloadsLayout({ children }: { children: React.ReactNode }) {
  return children
}
