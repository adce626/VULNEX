"use client"

import Link from "next/link"
import { MainSidebar } from "@/components/main-sidebar"
import { PageTitle } from "@/components/page-title"
import { Breadcrumb } from "@/components/breadcrumb"
import { Footer } from "@/components/footer"
import { FileCode, Hash, Shield, BookOpen, Puzzle, ArrowLeft } from "lucide-react"
import { encodingFormats, sidebarEncodingItems } from "@/lib/encoding-formats-data"
import { cn } from "@/lib/utils"

const categoryColor: Record<string, string> = {
  "Binary-to-Text": "border-blue-500/30 bg-blue-500/10 text-blue-500",
  "Web": "border-green-500/30 bg-green-500/10 text-green-500",
  "Text": "border-violet-500/30 bg-violet-500/10 text-violet-500",
  "Cipher": "border-amber-500/30 bg-amber-500/10 text-amber-500",
}

const categoryIcons: Record<string, React.ElementType> = {
  "Binary-to-Text": Hash,
  "Web": Shield,
  "Text": BookOpen,
  "Cipher": Puzzle,
}

export default function EncodingFormatsPage() {
  const grouped = encodingFormats.reduce((acc, f) => {
    if (!acc[f.category]) acc[f.category] = []
    acc[f.category].push(f)
    return acc
  }, {} as Record<string, typeof encodingFormats>)

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="Encoding Formats — Interactive Tools" />
      <MainSidebar />

      <main id="main-content" className="lg:pl-64">
        <Breadcrumb items={[
          { label: "Interactive Tools", href: "/interactive" },
          { label: "Encoding Formats" },
        ]} />

        <div className="border-b border-border bg-gradient-to-br from-blue-600/10 via-primary/5 to-background">
          <div className="mx-auto max-w-4xl px-6 py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <FileCode className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground lg:text-4xl">Encoding Formats</h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              A comprehensive reference of encoding formats used in web security testing — from Base64 and URL encoding to Caesar ciphers and Morse code. Each entry explains the algorithm, shows examples, and lists security-relevant use cases.
            </p>
            <div className="mt-4">
              <Link href="/interactive" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4" /> Back to Interactive Tools
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl space-y-12 p-6">
          {Object.entries(grouped).map(([category, formats]) => {
            const CatIcon = categoryIcons[category] || FileCode
            return (
              <section key={category}>
                <div className="mb-4 flex items-center gap-2">
                  <CatIcon className="h-5 w-5 text-muted-foreground" />
                  <h2 className="text-xl font-semibold text-foreground">{category}</h2>
                  <span className="text-sm text-muted-foreground">({formats.length} formats)</span>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {formats.map(f => {
                    const item = sidebarEncodingItems.find(i => i.href === `/interactive/encoding-formats/${f.slug}`)
                    return (
                      <Link
                        key={f.slug}
                        href={`/interactive/encoding-formats/${f.slug}`}
                        className={cn(
                          "group rounded-lg border border-border bg-card p-4 transition-all hover:shadow-md",
                          "hover:border-primary/50 hover:-translate-y-0.5"
                        )}
                      >
                        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {item?.title || f.name}
                        </h3>
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                          {f.description}
                        </p>
                        <div className="mt-2 flex items-center gap-1.5">
                          <span className={cn("inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium", categoryColor[f.category])}>
                            {f.category}
                          </span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </section>
            )
          })}

          <Footer text="Use this reference for legitimate security testing and educational purposes only" />
        </div>
      </main>
    </div>
  )
}
