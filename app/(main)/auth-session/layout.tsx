import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Auth & Session Vulnerabilities',
  description: 'Session management flaws, JWT attacks, OAuth misconfigurations, and authentication bypass techniques.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
