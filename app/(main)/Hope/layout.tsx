import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "HOPE — A Hunter's Journey",
  description: "A beginner's roadmap from first recon to bug bounty. Mindset, growth, and the path to becoming a security researcher.",
}

export default function HopeLayout({ children }: { children: React.ReactNode }) {
  return children
}
