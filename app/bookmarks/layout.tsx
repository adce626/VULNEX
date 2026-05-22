import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bookmarks",
  description: "View your saved bookmarks for quick access to your favorite tools, commands, and resources.",
}

export default function BookmarksLayout({ children }: { children: React.ReactNode }) {
  return children
}
