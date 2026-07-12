import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Interactive Tools",
  description: "Client-side security testing tools — Payload Builder, JWT Debugger, Encoder, Hash Detector, Wordlist Generator, CSP Evaluator, Subdomain Permutation, Port Visualizer",
}

export default function InteractiveLayout({ children }: { children: React.ReactNode }) {
  return children
}
