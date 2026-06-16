"use client"

import { cn } from "@/lib/utils"

interface SkeletonProps {
  shape?: "rect" | "circle" | "card" | "text"
  width?: string
  height?: string
  size?: string
  lines?: number
  className?: string
}

function SkeletonBase({ className }: { className?: string }) {
  return <div className={cn("shimmer rounded-md", className)} />
}

export function Skeleton({ shape = "rect", width, height, size, lines = 3, className }: SkeletonProps) {
  if (shape === "circle") {
    return <SkeletonBase className={cn("rounded-full", size || "h-10 w-10", className)} />
  }

  if (shape === "card") {
    return (
      <div className={cn("rounded-xl border border-border bg-card p-4 grid-item", className)}>
        <div className="flex items-center gap-3 mb-3">
          <SkeletonBase className="h-9 w-9 rounded-lg" />
          <SkeletonBase className="h-4 flex-1" />
        </div>
        <SkeletonBase className="h-3 w-full mb-2" />
        <SkeletonBase className="h-3 w-3/4" />
      </div>
    )
  }

  if (shape === "text") {
    return (
      <div className={cn("space-y-2", className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <SkeletonBase
            key={i}
            className={cn("h-3", i === lines - 1 ? "w-3/5" : "w-full")}
          />
        ))}
      </div>
    )
  }

  return <SkeletonBase className={cn(height || "h-4", width || "w-full", className)} />
}
