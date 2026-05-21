import { ToolGuide } from "@/lib/guide-types"

export const gauplusGuide: ToolGuide = {
  id: "gauplus",
  name: "Gauplus",
  icon: "globe",
  category: "Recon & OSINT",
  description: "Improved version of Gau (GetAllUrls) with additional providers and concurrent fetching",
  installation: {
    title: "Installation",
    steps: ["Install using Go", "Verify installation"],
    code: `# Using Go
go install github.com/bp0lr/gauplus@latest

# Verify
gauplus --version`
  },
  usage: {
    title: "Basic Usage",
    description: "Fetch URLs from multiple archive sources with improved concurrency and filtering",
    code: `# Single domain
gauplus -t 5 example.com

# Multiple domains from file
cat domains.txt | gauplus -t 10

# Fetch from specific providers
gauplus -providers wayback,otx example.com

# Filter by status code
gauplus -fc 200,301,302 example.com

# Exclude URL patterns
gauplus -blacklist png,jpg,css example.com

# Include subdomains
gauplus -subs example.com

# Save to file
gauplus example.com -o urls.txt

# Verbose output
gauplus -verbose example.com`
  },
  commands: [
    { command: "-t", description: "Number of concurrent threads" },
    { command: "-providers", description: "Comma-separated providers (wayback,otx,commoncrawl)" },
    { command: "-fc", description: "Filter by status codes" },
    { command: "-blacklist", description: "Exclude URL extensions" },
    { command: "-subs", description: "Include subdomains" },
    { command: "-o", description: "Output file" },
    { command: "-verbose", description: "Verbose output" },
    { command: "-retries", description: "Number of retries on failure" },
    { command: "-timeout", description: "Request timeout in seconds" }
  ],
  whenToUse: [
    "Collecting URLs from multiple archive sources simultaneously",
    "Faster alternative to Gau for large-scale recon",
    "Filtering URLs by response status code",
    "Removing unwanted file extensions from results",
    "Bug bounty recon and asset discovery"
  ],
  notes: [
    "Enhanced fork of Gau with better performance",
    "Supports Wayback Machine, OTX, and Common Crawl",
    "More aggressive concurrency than Gau",
    "Better error handling and retry logic"
  ],
  commonErrors: [
    { error: "Too many connections", solution: "Reduce thread count with -t flag to avoid rate limiting" },
    { error: "No providers specified", solution: "Use -providers flag or default providers will be used" }
  ],
  tags: ["urls", "wayback", "archive", "recon", "golang"]
}
