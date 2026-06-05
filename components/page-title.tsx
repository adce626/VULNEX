"use client"

import { useEffect, memo } from "react"

export const PageTitle = memo(function PageTitle({ title }: { title: string }) {
  useEffect(() => {
    document.title = `${title} | VULNEX`
  }, [title])
  return null
})

export function generateMetadata(title: string) {
  return { title: `${title} | VULNEX` }
}
