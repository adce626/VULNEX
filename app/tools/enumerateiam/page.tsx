"use client"
import { ToolDetailLayout } from "@/components/tool-detail-layout"
import { getToolById } from "@/lib/tools-data"

export default function ToolPage() {
  const tool = getToolById("enumerateiam")
  if (!tool) return null
  return <ToolDetailLayout tool={tool} pageTitle="enumerate-iam — AWS IAM Permission Enumeration" breadcrumbCategory="Tools" />
}



