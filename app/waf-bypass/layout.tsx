import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WAF Bypass & PoCs',
  description: 'WAF bypass techniques, SQLMap evasion, IDOR exploitation, and 403 bypass methodologies.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
