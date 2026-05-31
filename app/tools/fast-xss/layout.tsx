import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Fast XSS",
}

export default function FastXSSLayout({ children }: { children: React.ReactNode }) {
  return children
}
