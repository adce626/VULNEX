import Link from "next/link"
import { Home, ChevronRight } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="border-b border-border bg-card/50">
      <div className="mx-auto max-w-5xl px-6 py-3">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Link href="/" aria-label="Home" className="flex items-center gap-1 hover:text-foreground">
              <Home className="h-4 w-4" />
            </Link>
          </span>
          {items.map((item, idx) => (
            <span key={idx} className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4" />
              {item.href ? (
                <Link href={item.href} className="hover:text-foreground">
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground">{item.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </div>
  )
}
