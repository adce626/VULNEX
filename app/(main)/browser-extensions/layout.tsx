import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Browser Extensions',
  description: 'Essential browser extensions for web security testing, bug bounty, and penetration testing.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
