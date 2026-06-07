import { ExternalLink, Video } from "lucide-react"

export function ConclusionSection() {
  return (
    <section className="scroll-mt-24">
      <div className="rounded-xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 via-background to-orange-500/5 p-8">
        <h2 className="mb-4 text-2xl font-bold text-foreground text-center">Conclusion</h2>
        <p className="text-center text-muted-foreground leading-relaxed max-w-3xl mx-auto">
          Web cache deception is a powerful attack vector that can expose sensitive information and bypass security measures. By understanding the default paths, sensitive headers and various techniques to manipulate caching behavior you can identify and exploit these vulnerabilities effectively. Always remember to use tools like the Gift of Speed Cache Checker to analyze caching behavior and uncover potential weaknesses.
        </p>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          You can also watch this video walkthrough showing the full practical demonstration of these methods in action, including account takeover:
        </p>
        <div className="mt-4 text-center">
          <a
            href="https://www.youtube.com/watch?v=Epzi1fWwdKk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-500 hover:bg-amber-500/20"
          >
            <Video className="h-4 w-4" />
            Watch Full Walkthrough
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </section>
  )
}
