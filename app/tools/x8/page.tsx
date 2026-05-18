"use client"
import { ToolDetailLayout } from "@/components/tool-detail-layout"
import { getToolById } from "@/lib/tools-data"

export default function ToolPage() {
  const tool = getToolById("x8")
  if (!tool) return null
  return (
    <ToolDetailLayout
      tool={tool}
      pageTitle="X8 — Hidden Parameter Fuzzer"
      breadcrumbCategory="Tools"
    />
  )
}
