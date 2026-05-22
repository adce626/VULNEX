"use client"
import { ToolDetailLayout } from "@/components/tool-detail-layout"
import { getToolById } from "@/lib/tools-data"

export default function ToolPage() {
  const tool = getToolById("jwt_tool")
  if (!tool) return null
  return (
    <ToolDetailLayout
      tool={tool}
      pageTitle="jwt_tool — JWT Security Testing"
      breadcrumbCategory="Tools"
    />
  )
}



