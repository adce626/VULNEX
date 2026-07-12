import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recon & OSINT',
  description: 'Information gathering, subdomain enumeration, Google dorks, Shodan, and reconnaissance techniques.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
