"use client"
import { ToolDetailLayout } from "@/components/tool-detail-layout"
import { getToolById } from "@/lib/tools-data"

export default function ToolPage() {
  const tool = getToolById("masscan")
  if (!tool) return null
  return (
    <ToolDetailLayout
      tool={tool}
      pageTitle="Masscan — Mass IP Scanner"
      breadcrumbCategory="Methods"
    />
  )
}