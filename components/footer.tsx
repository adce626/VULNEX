interface FooterProps {
  text?: string
}

export function Footer({ text = "This guide is for ethical use and authorized penetration testing only" }: FooterProps) {
  return (
    <footer className="border-t border-border pt-8 text-center">
      <p className="text-sm text-muted-foreground">{text}</p>
    </footer>
  )
}