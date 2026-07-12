import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Methods',
  description: 'Interactive usage guides for subfinder, nuclei, sqlmap, ffuf, Burp Suite, and 24+ security tools.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
