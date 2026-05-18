import { ToolGuide } from "@/lib/guide-types"

export const gauGuide: ToolGuide = {
  id: "gau",
  name: "Gau (GetAllUrls)",
  icon: "globe",
  category: "Recon & OSINT",
  description: "Fetch known URLs from AlienVault OTX, Wayback Machine, and Common Crawl",
  installation: {
    title: "Installation",
    steps: ["Install using Go", "Download from releases", "Verify installation"],
    code: `# Using Go
go install github.com/lc/gau/v2/cmd/gau@latest

# Verify
gau --version

# Update to latest
go install github.com/lc/gau/v2/cmd/gau@latest`
  },
  usage: {
    title: "Basic Usage",
    description: "Fetch all known URLs for a domain from public archives",
    code: `# Single domain
gau example.com

# Multiple domains from file
cat domains.txt | gau

# Fetch from specific providers
gau --providers wayback,otx,commoncrawl example.com

# With subdomains
gau --subs example.com

# Save to file
gau example.com -o urls.txt

# Filter by status code
gau example.com --fc 404`
  },
  commands: [
    { command: "--providers", description: "Data sources (wayback,otx,commoncrawl)" },
    { command: "--subs", description: "Include subdomains" },
    { command: "--fc", description: "Filter status codes" },
    { command: "--o", description: "Output file" },
    { command: "--retries", description: "Number of retries on failure" },
    { command: "--timeout", description: "Request timeout" },
    { command: "--concurrent", description: "Concurrent requests" },
    { command: "--blacklist", description: "Exclude extensions" },
    { command: "--threads", description: "Number of threads" },
    { command: "--verbose", description: "Verbose output" }
  ],
  whenToUse: [
    "Collecting URLs before vulnerability scanning",
    "Building a wordlist of valid endpoints",
    "Discovering hidden API endpoints",
    "Finding old endpoints still accessible",
    "Recon phase of bug bounty hunting"
  ],
  notes: [
    "Combines data from multiple archive sources",
    "Much faster than fetching from each source individually",
    "Use --subs to include all discovered subdomains",
    "Results can be piped directly into tools like gf or dalfox"
  ],
  commonErrors: [
    { error: "No results found", solution: "Try with --subs flag, some domains only have data from certain providers" },
    { error: "Rate limited", solution: "Reduce concurrent requests with --concurrent flag and increase --retries" }
  ],
  tags: ["recon", "urls", "wayback", "archives", "osint"]
}
