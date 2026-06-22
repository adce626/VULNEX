import Link from "next/link"
import { Bug, Github, Terminal, FileText, Shield } from "lucide-react"

interface FooterProps {
  text?: string
}

const quickLinks = [
  { label: "Home", href: "/", icon: Shield },
  { label: "Payloads", href: "/payloads", icon: Bug },
  { label: "Tools", href: "/tools", icon: Terminal },
  { label: "Changelog", href: "/changelog", icon: FileText },
]

export function Footer({ text }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border pt-8 pb-6">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-foreground">VULNEX</span>
          </div>
          <nav className="flex items-center gap-4">
            {quickLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {link.label}
                </Link>
              )
            })}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="https://x.com/adce626"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="X (Twitter)"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://github.com/adce626"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-muted-foreground/60">
          <p>
            {text || "For ethical use only — educational purposes. All content provided for authorized security testing and research."}
          </p>
          <p className="mt-1">&copy; {year} VULNEX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
