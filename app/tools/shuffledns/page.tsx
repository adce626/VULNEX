"use client"
import { ToolDetailLayout } from "@/components/tool-detail-layout"
import { getToolById } from "@/lib/tools-data"

export default function ToolPage() {
  const tool = getToolById("shuffledns")
  if (!tool) return null
  return (
    <ToolDetailLayout
      tool={tool}
      pageTitle="Shuffledns — Subdomain resolver using bruteforce and wildcard filtering"
      breadcrumbCategory="Tools"
    />
  )
}



