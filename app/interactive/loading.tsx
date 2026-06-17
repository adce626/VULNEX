import { Skeleton } from "@/components/skeleton"

export default function InteractiveLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="lg:pl-64">
        <div className="mx-auto max-w-6xl space-y-6 p-6">
          <Skeleton shape="rect" className="h-8 w-48" />
          <Skeleton shape="rect" className="h-40 w-full" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} shape="card" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
