import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Advanced Topics',
  description: 'LLM injection, blind XSS, auth & session attacks, registration vulns, rate limit bypass, and advanced exploitation.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
