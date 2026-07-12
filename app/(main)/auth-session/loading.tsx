import { MainSidebar } from "@/components/main-sidebar"
import { Skeleton } from "@/components/skeleton"

export default function AuthLoading() {
  return (
    <div className="min-h-screen bg-background">
      <MainSidebar />
      <main id="main-content" className="lg:pl-64">
        <div className="border-b border-border p-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4"><Skeleton width="w-80" height="h-10" /></div>
            <Skeleton width="w-96" height="h-5" />
          </div>
        </div>
        <div className="mx-auto max-w-6xl p-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} shape="card" />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
