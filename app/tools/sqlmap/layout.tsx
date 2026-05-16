import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SQLMap — SQL Injection Automation',
  description: 'Automated SQL injection testing with SQLMap including WAF bypass, data extraction, and advanced techniques.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
