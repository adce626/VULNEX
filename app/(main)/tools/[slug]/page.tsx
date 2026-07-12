"use client"
import { use } from "react"
import { ToolDetailLayout } from "@/components/tool-detail-layout"
import { getToolById } from "@/lib/tools-data"
import { notFound } from "next/navigation"

export default function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const tool = getToolById(slug)
  if (!tool) notFound()
  return (
    <ToolDetailLayout
      tool={tool}
      pageTitle={`${tool.name} — ${tool.description}`}
      breadcrumbCategory="Tools"
    />
  )
}
