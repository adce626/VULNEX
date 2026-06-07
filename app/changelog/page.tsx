const entries = [
  {
    version: 'v1.4.0',
    date: 'June 2026',
    title: 'Homepage Enhancements',
    changes: [

      'Random Payload of the Day card with "Try your luck" button',
      'Live animated counters that count up on scroll (Sections, Topics, Commands)',
      'Auto-rotating featured sections carousel with navigation dots',
      'Quick Start Wizard overlay for first-time visitors',
      'GitHub-style contribution heatmap showing activity',
      'Fixed removeChild runtime error in TypewriterEffect and RandomPayload (nested setTimeout cleanup)',
    ],
  },
  {
    version: 'v1.3.0',
    date: 'June 2026',
    title: 'Cache Deception Refactor + API',
    changes: [
      'Refactored 735-line cache deception page into 11 reusable section components',
      'Extracted all payload/URL data into separate data.ts file',
      'Added public JSON API endpoint: /api/payloads/cache-deception',
      'Fixed 3 build errors and added 240+ Open Redirect payloads',
      'Consolidated 16 groups of CommandCards into grouped vertical URL lists',
      'Converted 8 payload grids to vertical flex-col layout',
    ],
  },
  {
    version: 'v1.2.0',
    date: 'May 2026',
    title: 'SQL Injection Methodology',
    changes: [
      'Added comprehensive SQL injection methodology guide',
      'New step-by-step testing workflows',
      'Enhanced payload organization',
    ],
  },
  {
    version: 'v1.1.0',
    date: 'April 2026',
    title: 'Toolkit',
    changes: [
      'Introduced the Toolkit section',
      'Added tool integration guides',
      'New command search with ranking',
    ],
  },
  {
    version: 'v1.0.0',
    date: 'March 2026',
    title: 'Initial Release',
    changes: [
      'First release of VULNEX',
      'Core vulnerability guides and payloads',
      'Tool documentation and bookmarks',
      'Search functionality',
    ],
  },
]

export default function ChangelogPage() {
  return (
    <main id="main-content" className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Changelog</h1>
      <div className="relative border-l border-border ml-3">
        {entries.map((entry) => (
          <div key={entry.version} className="relative mb-10 ml-6">
            <div className="absolute -left-[1.625rem] top-1 h-3 w-3 rounded-full border-2 border-primary bg-background" />
            <div className="flex flex-wrap items-baseline gap-3 mb-2">
              <h2 className="text-xl font-semibold">{entry.version}</h2>
              <span className="text-sm text-muted-foreground">{entry.date}</span>
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              {entry.title}
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              {entry.changes.map((change) => (
                <li key={change}>{change}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  )
}
