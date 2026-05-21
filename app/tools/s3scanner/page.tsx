"use client"
import { ToolDetailLayout } from "@/components/tool-detail-layout"
import { getToolById } from "@/lib/tools-data"

export default function ToolPage() {
  const tool = getToolById("s3scanner")
  if (!tool) return null
  return (
    <ToolDetailLayout
      tool={tool}
      pageTitle="S3Scanner — Open S3 Bucket Finder"
      breadcrumbCategory="Tools"
    />
  )
}
