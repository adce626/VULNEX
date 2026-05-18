import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FFUF — Fuzzing Tool',
  description: 'Master FFUF for directory bruteforcing, parameter fuzzing, subdomain discovery, and vhost enumeration.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
