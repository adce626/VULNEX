"use client"

interface DomainInputProps {
  domain: string
  setDomain: (value: string) => void
}

export function DomainInput({ domain, setDomain }: DomainInputProps) {
  return (
    <div className="mx-auto max-w-5xl px-6 mt-6">
      <div className="bg-card border border-border rounded-xl p-6">
        <label className="block text-sm font-medium text-foreground mb-2">
          Target Domain
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter target domain (e.g., target.com)"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="flex-1 bg-secondary border-border rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            onClick={() => setDomain("")}
            className="px-4 py-2 border border-border rounded-lg text-sm text-muted-foreground hover:bg-secondary transition-colors"
          >
            Clear
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Commands will auto-replace <code className="text-primary">example.com</code> with your target
        </p>
      </div>
    </div>
  )
}
