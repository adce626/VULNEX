import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SQL Injection Guide',
  description: 'Comprehensive SQL injection payloads and techniques including time-based, error-based, UNION, blind, and WAF bypass methods.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
