"use client"
import { ToolDetailLayout } from "@/components/tool-detail-layout"
import { getToolById } from "@/lib/tools-data"

export default function ToolPage() {
  const tool = getToolById("recon-ng")
  if (!tool) return null
  return <ToolDetailLayout tool={tool} pageTitle="recon-ng — Reconnaissance Framework" breadcrumbCategory="Tools" />
}



