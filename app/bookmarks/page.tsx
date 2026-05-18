"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MainSidebar } from "@/components/main-sidebar"
import { PageTitle } from "@/components/page-title"
import { CommandCard } from "@/components/command-card"
import { getBookmarks, clearBookmarks, type Bookmark as SavedBookmark } from "@/lib/bookmarks"
import { Bookmark, Trash2, ArrowRight, ExternalLink } from "lucide-react"

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<SavedBookmark[]>([])

  useEffect(() => {
    setBookmarks(getBookmarks())
  }, [])

  const handleClear = () => {
    clearBookmarks()
    setBookmarks([])
  }

  const grouped = bookmarks.reduce<Record<string, SavedBookmark[]>>((acc, b) => {
    const key = b.pageUrl
    if (!acc[key]) acc[key] = []
    acc[key].push(b)
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="Bookmarked Commands" />
      <MainSidebar />

      <main className="lg:pl-64">
        <div className="border-b border-border bg-card/50 p-6">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Bookmarks</h1>
                <p className="mt-1 text-muted-foreground">
                  {bookmarks.length} saved {bookmarks.length === 1 ? "command" : "commands"}
                </p>
              </div>
              {bookmarks.length > 0 && (
                <button
                  onClick={handleClear}
                  className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:text-destructive hover:border-destructive/50 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl p-6">
          {bookmarks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Bookmark className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">No bookmarks yet</h2>
              <p className="mt-2 text-muted-foreground max-w-sm">
                Click the star icon on any command to save it here for quick access.
              </p>
              <Link
                href="/methods"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Browse Tools <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(grouped).map(([url, cmds]) => (
                <div key={url}>
                  <Link
                    href={url}
                    className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
                  >
                    <ExternalLink className="h-4 w-4" />
                    {cmds[0].pageTitle}
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                  <div className="space-y-3">
                    {cmds.map((cmd, i) => (
                      <CommandCard
                        key={cmd.command}
                        command={cmd.command}
                        description={cmd.description}
                        index={i + 1}
                        pageTitle={cmd.pageTitle}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
