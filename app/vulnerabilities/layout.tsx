import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Web Vulnerabilities',
  description: 'SQL injection, XSS, SSRF, IDOR, and common web security flaws with ready-to-use payloads.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
