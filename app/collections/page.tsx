"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MainSidebar } from "@/components/main-sidebar"
import { PageTitle } from "@/components/page-title"
import { getCollections, createCollection, deleteCollection, type Collection } from "@/lib/collections"
import { FolderOpen, Plus, Trash2, ArrowRight, ExternalLink } from "lucide-react"

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [showCreate, setShowCreate] = useState(false)
  const [newName, setNewName] = useState("")
  const [newDesc, setNewDesc] = useState("")

  useEffect(() => { setCollections(getCollections()) }, [])

  const handleCreate = () => {
    if (!newName.trim()) return
    createCollection(newName.trim(), newDesc.trim())
    setCollections(getCollections())
    setNewName("")
    setNewDesc("")
    setShowCreate(false)
  }

  const handleDelete = (id: string) => {
    deleteCollection(id)
    setCollections(getCollections())
  }

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="Collections" />
      <MainSidebar />
      <main id="main-content" className="lg:pl-64">
        <div className="border-b border-border bg-card/50 p-6">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Collections</h1>
                <p className="mt-1 text-muted-foreground">{collections.length} collections</p>
              </div>
              <button
                onClick={() => setShowCreate(true)}
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Plus className="h-4 w-4" />
                New Collection
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl p-6">
          {showCreate && (
            <div className="mb-6 rounded-xl border border-border bg-card p-5">
              <h2 className="text-lg font-semibold text-foreground mb-3">Create Collection</h2>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Collection name"
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary mb-2"
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              />
              <input
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Description (optional)"
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary mb-3"
              />
              <div className="flex gap-2">
                <button onClick={handleCreate} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Create</button>
                <button onClick={() => setShowCreate(false)} className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground">Cancel</button>
              </div>
            </div>
          )}

          {collections.length === 0 && !showCreate && (
            <div className="flex flex-col items-center py-20 text-center">
              <FolderOpen className="h-12 w-12 text-muted-foreground/40 mb-4" />
              <p className="text-muted-foreground">No collections yet</p>
              <button onClick={() => setShowCreate(true)} className="mt-4 text-sm text-primary hover:underline">Create your first collection</button>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            {collections.map((col) => (
              <div key={col.id} className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <FolderOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{col.name}</h3>
                      {col.description && <p className="text-xs text-muted-foreground">{col.description}</p>}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(col.id)}
                    className="opacity-0 group-hover:opacity-100 flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-muted transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{col.items.length} items</p>
                <Link
                  href={`/collections/${col.id}`}
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80"
                >
                  Open Collection <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
