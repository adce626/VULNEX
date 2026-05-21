"use client"
import { ToolDetailLayout } from "@/components/tool-detail-layout"
import { getToolById } from "@/lib/tools-data"

export default function ToolPage() {
  const tool = getToolById("lazys3")
  if (!tool) return null
  return (
    <ToolDetailLayout
      tool={tool}
      pageTitle="LazyS3 — S3 Bucket Brute Forcer"
      breadcrumbCategory="Tools"
    />
  )
}
