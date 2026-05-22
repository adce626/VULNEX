"use client"
import { ToolDetailLayout } from "@/components/tool-detail-layout"
import { getToolById } from "@/lib/tools-data"

export default function ToolPage() {
  const tool = getToolById("witnessme")
  if (!tool) return null
  return (
    <ToolDetailLayout
      tool={tool}
      pageTitle="WitnessMe — Web Recon Screenshot Tool"
      breadcrumbCategory="Tools"
    />
  )
}



