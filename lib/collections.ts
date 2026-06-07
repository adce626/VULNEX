"use client"

export interface CollectionItem {
  command: string
  description: string
  pageTitle: string
  pageUrl: string
  addedAt: number
}

export interface Collection {
  id: string
  name: string
  description: string
  createdAt: number
  items: CollectionItem[]
}

const COLLECTIONS_KEY = "vulnex_collections"

export function getCollections(): Collection[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(COLLECTIONS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function createCollection(name: string, description = ""): Collection {
  const collections = getCollections()
  const collection: Collection = {
    id: `col_${Date.now()}`,
    name,
    description,
    createdAt: Date.now(),
    items: [],
  }
  collections.push(collection)
  localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections))
  return collection
}

export function deleteCollection(id: string) {
  const collections = getCollections().filter((c) => c.id !== id)
  localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections))
}

export function renameCollection(id: string, name: string) {
  const collections = getCollections()
  const col = collections.find((c) => c.id === id)
  if (col) {
    col.name = name
    localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections))
  }
}

export function addToCollection(collectionId: string, item: Omit<CollectionItem, "addedAt">) {
  const collections = getCollections()
  const col = collections.find((c) => c.id === collectionId)
  if (!col) return false
  const exists = col.items.some((i) => i.command === item.command)
  if (exists) return false
  col.items.push({ ...item, addedAt: Date.now() })
  localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections))
  return true
}

export function removeFromCollection(collectionId: string, command: string) {
  const collections = getCollections()
  const col = collections.find((c) => c.id === collectionId)
  if (!col) return
  col.items = col.items.filter((i) => i.command !== command)
  localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections))
}

export function exportCollection(id: string): string {
  const collections = getCollections()
  const col = collections.find((c) => c.id === id)
  return col ? JSON.stringify(col, null, 2) : ""
}

export function getCollection(id: string): Collection | undefined {
  return getCollections().find((c) => c.id === id)
}
