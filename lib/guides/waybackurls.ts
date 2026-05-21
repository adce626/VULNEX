import { ToolGuide } from "@/lib/guide-types"

export const waybackurlsGuide: ToolGuide = {
  id: "waybackurls",
  name: "Waybackurls",
  icon: "globe",
  category: "Recon & OSINT",
  description: "Fetch all URLs from Wayback Machine for a given domain by TomNomNom",
  installation: {
    title: "Installation",
    steps: ["Install using Go", "Verify installation"],
    code: `# Using Go
go install github.com/tomnomnom/waybackurls@latest

# Verify
waybackurls --help`
  },
  usage: {
    title: "Basic Usage",
    description: "Fetch historical URLs from Wayback Machine archive for reconnaissance",
    code: `# Fetch URLs for a domain
waybackurls example.com

# Fetch URLs from multiple domains (stdin)
cat domains.txt | waybackurls

# Save to file
waybackurls example.com > urls.txt

# Fetch with dates
waybackurls -dates example.com

# Verbose output
waybackurls -verbose example.com

# Fetch from specific date range (YYYYMMDD-YYYYMMDD)
waybackurls -from 20230101 -to 20231231 example.com

# No subdomains
waybackurls -no-subs example.com`
  },
  commands: [
    { command: "-dates", description: "Show capture timestamps" },
    { command: "-from", description: "Start date (YYYYMMDD)" },
    { command: "-to", description: "End date (YYYYMMDD)" },
    { command: "-no-subs", description: "Exclude subdomains" },
    { command: "-verbose", description: "Verbose output" }
  ],
  whenToUse: [
    "Collecting historical URLs for recon",
    "Discovering old or forgotten endpoints",
    "Finding API endpoints and parameters",
    "Building URL wordlists for fuzzing",
    "Pre-scanning before vulnerability assessment"
  ],
  notes: [
    "Part of the TomNomNom toolkit ecosystem",
    "Only fetches from Wayback Machine (not other archives)",
    "Results can be piped to gf for pattern matching",
    "Combine with gau for additional archive sources"
  ],
  commonErrors: [
    { error: "No URLs found", solution: "Try without -no-subs flag or verify the domain has archive data" },
    { error: "Rate limited", solution: "Add delays between requests or reduce concurrent fetches" }
  ],
  tags: ["wayback", "urls", "archive", "recon", "tomnomnom"]
}
