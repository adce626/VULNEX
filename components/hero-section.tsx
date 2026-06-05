import type { ReactElement } from "react"

interface HeroSectionProps {
  icon: ReactElement
  title: string
  description: string
  gradient?: string
  iconBg?: string
  iconColor?: string
}

export function HeroSection({
  icon,
  title,
  description,
  gradient = "from-primary/5 via-background to-accent/5",
  iconBg = "bg-primary/10",
  iconColor = "text-primary",
}: HeroSectionProps) {
  return (
    <div className={`border-b border-border bg-gradient-to-br ${gradient}`}>
      <div className="mx-auto max-w-5xl px-6 py-12 text-center">
        <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${iconBg} ${iconColor}`}>
          {icon}
        </div>
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        <p className="mt-2 text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}