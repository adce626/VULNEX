import { AlertTriangle } from "lucide-react"
import { delimiters, encodedDelimiters, delimiterExamples, semiExtList, semiExtUrls, encodedExtList, encodedExtUrls, extStarList, extStarUrls, realWorldProfile, realWorldApi } from "./data"

function VerticalList({ items, className }: { items: string[]; className?: string }) {
  return (
    <div className={`flex flex-col ${className || "p-4 text-sm font-mono text-foreground"}`}>
      {items.map((item) => (
        <span key={item} className="py-0.5 break-all">{item}</span>
      ))}
    </div>
  )
}

function Card({ label, items }: { label?: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-border bg-card">
      {label && (
        <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">
          {label}
        </div>
      )}
      <VerticalList items={items} />
    </div>
  )
}

export function AdvancedBypassesSection() {
  return (
    <section id="advanced-bypasses" className="scroll-mt-24">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div>
          <span className="text-xs font-medium text-amber-500">Phase 6</span>
          <h2 className="text-2xl font-bold text-foreground">Advanced Bypass Techniques</h2>
        </div>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-foreground">Delimiters and Special Characters</h3>
      <p className="mb-4 text-muted-foreground leading-relaxed">
        Use these delimiters and special characters to creatively manipulate URLs and bypass cache rules:
      </p>

      <Card label="Delimiters" items={delimiters} />
      <div className="mt-4">
        <Card label="Encoded Delimiters" items={encodedDelimiters} />
      </div>

      <div className="mt-4 rounded-lg border border-border bg-card">
        <VerticalList items={delimiterExamples} />
      </div>

      <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">Special Delimiter Testing</h3>
      <p className="mb-4 text-muted-foreground leading-relaxed">
        Try inserting these special delimiters right before file extensions to see if caching systems mishandle the URLs:
      </p>

      <Card label=";.ext?test=123" items={semiExtList} />
      <div className="mt-4">
        <Card items={semiExtUrls} />
      </div>

      <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">Encoded Delimiter Testing</h3>
      <p className="mb-4 text-muted-foreground leading-relaxed">
        Use URL-encoded special characters before file extensions to bypass cache rules:
      </p>

      <Card label="%60.ext?test=123" items={encodedExtList} />
      <div className="mt-4">
        <Card items={encodedExtUrls} />
      </div>

      <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">Advanced Testing Combinations</h3>
      <p className="mb-4 text-muted-foreground leading-relaxed">
        Test URLs by appending file extensions combined with /* to trick caches into storing sensitive responses:
      </p>

      <Card label=".ext/*" items={extStarList} />
      <div className="mt-4">
        <Card items={extStarUrls} />
      </div>

      <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">Real-World Examples</h3>

      <h4 className="mb-2 font-medium text-foreground">Profile Page Poisoning</h4>
      <p className="mb-4 text-muted-foreground leading-relaxed">
        Discovery: A tester noticed that /user/profile contained sensitive user information.<br />
        Testing: The tester appended a static extension to the URL: /user/profile.css<br />
        Verification: After logging out and accessing /user/profile.css in incognito, the same sensitive data was returned.<br />
        Root Cause: The CDN was caching based on the file extension, treating the .css URL as a static resource while the backend still processed it as a profile request.
      </p>
      <Card items={realWorldProfile} />

      <h4 className="mb-2 mt-6 font-medium text-foreground">API Endpoint Manipulation</h4>
      <p className="mb-4 text-muted-foreground leading-relaxed">
        Discovery: An API endpoint at /api/user/data returned JSON with user-specific information.<br />
        Testing: The tester added a cache-busting parameter with a static extension: /api/user/data?callback=static.js<br />
        Verification: When accessed without authentication, the endpoint returned the cached user data.<br />
        Root Cause: The CDN was configured to cache based on the presence of certain query parameters.
      </p>
      <Card items={realWorldApi} />
    </section>
  )
}
