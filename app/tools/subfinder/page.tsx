"use client"
import { ToolDetailLayout } from "@/components/tool-detail-layout"
import { getToolById } from "@/lib/tools-data"

export default function ToolPage() {
  const tool = getToolById("subfinder")
  if (!tool) return null
  return (
    <ToolDetailLayout
      tool={tool}
      pageTitle="Subfinder — Subdomain Enumeration"
      breadcrumbCategory="Tools"
    />
  )
}
