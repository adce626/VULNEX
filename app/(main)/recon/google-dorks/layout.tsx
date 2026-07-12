import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Google Dorks',
  description: 'Powerful Google search operators and dork queries for vulnerability discovery, exposed data, and reconnaissance.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
