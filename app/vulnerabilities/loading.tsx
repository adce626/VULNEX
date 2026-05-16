import { MainSidebar } from "@/components/main-sidebar"

export default function VulnsLoading() {
  return (
    <div className="min-h-screen bg-background">
      <MainSidebar />
      <main className="lg:pl-64">
        <div className="border-b border-border p-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 h-4 w-48 animate-pulse rounded bg-muted" />
            <div className="mb-4 h-10 w-72 animate-pulse rounded-lg bg-muted" />
            <div className="h-5 w-96 animate-pulse rounded bg-muted" />
          </div>
        </div>
        <div className="mx-auto max-w-6xl p-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-40 animate-pulse rounded-2xl bg-card border border-border" />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
