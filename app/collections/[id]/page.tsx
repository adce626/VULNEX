"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { MainSidebar } from "@/components/main-sidebar"
import { PageTitle } from "@/components/page-title"
import { CommandCard } from "@/components/command-card"
import { getCollection, deleteCollection, exportCollection, addToCollection, type Collection } from "@/lib/collections"
import { FolderOpen, Trash2, ArrowLeft, Download, Copy, ExternalLink, Plus, X } from "lucide-react"

export default function CollectionDetailPage() {
  const params = useParams()
  const [collection, setCollection] = useState<Collection | undefined>()
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newCommand, setNewCommand] = useState("")
  const [newDesc, setNewDesc] = useState("")

  useEffect(() => {
    if (params.id) {
      setCollection(getCollection(params.id as string))
      setLoading(false)
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!collection) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Collection not found</p>
      </div>
    )
  }

  const handleDelete = () => {
    deleteCollection(collection.id)
    window.location.href = "/collections"
  }

  const handleExport = () => {
    const json = exportCollection(collection.id)
    const blob = new Blob([json], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${collection.name.replace(/\s+/g, "-").toLowerCase()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleCopyExport = () => {
    navigator.clipboard.writeText(exportCollection(collection.id))
  }

  const handleAddItem = () => {
    if (!newCommand.trim()) return
    const added = addToCollection(collection.id, {
      command: newCommand.trim(),
      description: newDesc.trim() || "Manually added",
      pageTitle: collection.name,
      pageUrl: `/collections/${collection.id}`,
    })
    if (added) {
      setCollection(getCollection(collection.id))
      setNewCommand("")
      setNewDesc("")
      setShowAddForm(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title={collection.name} />
      <MainSidebar />
      <main id="main-content" className="lg:pl-64">
        <div className="border-b border-border bg-card/50 p-6">
          <div className="mx-auto max-w-4xl">
            <Link href="/collections" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-3">
              <ArrowLeft className="h-3 w-3" /> Back to Collections
            </Link>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FolderOpen className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{collection.name}</h1>
                  <p className="text-sm text-muted-foreground">{collection.items.length} items</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setShowAddForm(!showAddForm)} className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <Plus className="h-3.5 w-3.5" /> Add Item
                </button>
                <button onClick={handleExport} className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <Download className="h-3.5 w-3.5" /> Export
                </button>
                <button onClick={handleCopyExport} className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <Copy className="h-3.5 w-3.5" /> Copy JSON
                </button>
                <button onClick={handleDelete} className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground hover:text-destructive hover:border-destructive/50 transition-colors">
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl p-6">
          {showAddForm && (
            <div className="mb-6 rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-foreground">Add Item</h3>
                <button onClick={() => setShowAddForm(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-3">
                <input
                  value={newCommand}
                  onChange={(e) => setNewCommand(e.target.value)}
                  placeholder="Command / payload"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                />
                <input
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Description (optional)"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                />
                <div className="flex justify-end gap-2">
                  <button onClick={() => setShowAddForm(false)} className="rounded-lg px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
                  <button onClick={handleAddItem} className="rounded-lg bg-primary px-3 py-1.5 text-xs text-primary-foreground hover:bg-primary/90 transition-colors">Add</button>
                </div>
              </div>
            </div>
          )}
          {collection.items.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-center">
              <FolderOpen className="h-12 w-12 text-muted-foreground/40 mb-4" />
              <p className="text-muted-foreground">This collection is empty</p>
              <p className="text-xs text-muted-foreground mt-1">Browse pages and use the bookmark button to add commands</p>
            </div>
          ) : (
            <div className="space-y-2">
              {collection.items.map((item) => (
                <CommandCard
                  key={item.command}
                  command={item.command}
                  description={item.description}
                  pageTitle={item.pageTitle}
                  index={0}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
