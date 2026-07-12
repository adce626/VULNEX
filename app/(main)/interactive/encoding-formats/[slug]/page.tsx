"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { MainSidebar } from "@/components/main-sidebar"
import { PageTitle } from "@/components/page-title"
import { Breadcrumb } from "@/components/breadcrumb"
import { Footer } from "@/components/footer"
import { ArrowLeft, Hash, Shield, BookOpen, Puzzle, AlertTriangle, FileCode, Search } from "lucide-react"
import { encodingFormats, type EncodingFormat } from "@/lib/encoding-formats-data"
import { cn } from "@/lib/utils"

const categoryIcons: Record<string, React.ElementType> = {
  "Binary-to-Text": Hash,
  "Web": Shield,
  "Text": BookOpen,
  "Cipher": Puzzle,
}

function ExampleTable({ examples }: { examples: EncodingFormat["examples"] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="grid grid-cols-[1fr,2fr] divide-x divide-border bg-muted/50 text-sm font-medium text-muted-foreground">
        <div className="px-4 py-2">Input</div>
        <div className="px-4 py-2">Output</div>
      </div>
      {examples.map((ex, i) => (
        <div key={i} className={cn("grid grid-cols-[1fr,2fr] divide-x divide-border", i % 2 === 0 ? "bg-card" : "bg-muted/20")}>
          <div className="overflow-x-auto px-4 py-2.5 font-mono text-sm">{ex.input}</div>
          <div className="overflow-x-auto px-4 py-2.5 font-mono text-sm break-all">{ex.output}</div>
        </div>
      ))}
    </div>
  )
}

function InfoCard({ icon: Icon, title, children, accent }: { icon: React.ElementType; title: string; children: React.ReactNode; accent?: string }) {
  return (
    <div className="rounded-lg border border-border bg-card">
      <div className={cn("flex items-center gap-2 border-b border-border px-4 py-3 font-semibold text-sm", accent)}>
        <Icon className="h-4 w-4" />
        {title}
      </div>
      <div className="px-4 py-3 text-sm text-muted-foreground leading-relaxed">
        {children}
      </div>
    </div>
  )
}

export default function EncodingFormatPage() {
  const params = useParams()
  const slug = params.slug as string
  const format = encodingFormats.find(f => f.slug === slug)

  if (!format) return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
        <h1 className="text-xl font-semibold text-foreground">Format not found</h1>
        <p className="mt-1 text-sm text-muted-foreground">Unknown encoding format: {slug}</p>
        <Link href="/interactive" className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to Interactive Tools
        </Link>
      </div>
    </div>
  )

  const CategoryIcon = categoryIcons[format.category] || FileCode

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title={`${format.name} — Encoding Formats`} />
      <MainSidebar />

      <main id="main-content" className="lg:pl-64">
        <Breadcrumb items={[
          { label: "Interactive Tools", href: "/interactive" },
          { label: "Encoding Formats", href: "/interactive/encoding-formats" },
          { label: format.name },
        ]} />

        <div className="border-b border-border bg-gradient-to-br from-blue-600/10 via-primary/5 to-background">
          <div className="mx-auto max-w-4xl px-6 py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <CategoryIcon className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground lg:text-4xl">{format.name}</h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{format.description}</p>
            <div className="mt-4">
              <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                {format.category}
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl space-y-8 p-6">
          <InfoCard icon={BookOpen} title="How It Works" accent="text-blue-500">
            {format.howItWorks}
          </InfoCard>

          <InfoCard icon={Hash} title="Algorithm" accent="text-violet-500">
            {format.algorithm}
          </InfoCard>

          <div>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
              <Puzzle className="h-5 w-5 text-amber-500" /> Examples
            </h2>
            <ExampleTable examples={format.examples} />
          </div>

          <div>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
              <Shield className="h-5 w-5 text-green-500" /> Security Use Cases
            </h2>
            <ul className="space-y-2">
              {format.securityUseCases.map((useCase, i) => (
                <li key={i} className="flex items-start gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground">
                  <span className="mt-0.5 text-green-500">•</span>
                  {useCase}
                </li>
              ))}
            </ul>
          </div>

          {format.relatedSlugs.length > 0 && (
            <div>
              <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <FileCode className="h-5 w-5 text-cyan-500" /> Related Formats
              </h2>
              <div className="flex flex-wrap gap-2">
                {format.relatedSlugs.map(slug => {
                  const related = encodingFormats.find(f => f.slug === slug)
                  if (!related) return null
                  return (
                    <Link
                      key={slug}
                      href={`/interactive/encoding-formats/${slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      {related.name}
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          <InfoCard icon={AlertTriangle} title="Notes" accent="text-amber-500">
            {format.notes}
          </InfoCard>

          <div className="pb-8">
            <Link
              href="/interactive/encoding-formats"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to all encoding formats
            </Link>
          </div>

          <Footer text="Use this reference for legitimate security testing and educational purposes only" />
        </div>
      </main>
    </div>
  )
}
