import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SSRF Testing & Exploitation',
  description: 'Server-Side Request Forgery testing with cloud metadata endpoints, URL schemes, and exploitation techniques.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
