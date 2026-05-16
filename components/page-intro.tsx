interface PageIntroProps {
  title: string
  description: string
  lastUpdated?: string
}

export function PageIntro({ title, description, lastUpdated }: PageIntroProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      <p className="mt-2 text-muted-foreground">{description}</p>
      {lastUpdated && (
        <p className="mt-2 text-xs text-muted-foreground/60">
          Last updated: {lastUpdated}
        </p>
      )}
    </div>
  )
}
