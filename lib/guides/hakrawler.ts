import { ToolGuide } from "@/lib/guide-types"

export const hakrawlerGuide: ToolGuide = {
  id: "hakrawler",
  name: "Hakrawler",
  icon: "globe",
  category: "Recon & OSINT",
  description: "Fast web crawler for endpoint discovery",
  installation: {
    title: "Installation",
    steps: ["Install via Go", "Verify installation"],
    code: `# Using Go
go install github.com/hakluke/hakrawler@latest

# Verify
hakrawler -h`
  },
  usage: {
    title: "Basic Usage",
    description: "Crawl a target website and discover endpoints",
    code: `# Basic crawl via stdin
echo "https://example.com" | hakrawler

# Deep crawl with subdomains
echo "https://example.com" | hakrawler -subs -depth 3

# Output to file
echo "https://example.com" | hakrawler -out results.txt

# With custom user agent
echo "https://example.com" | hakrawler -u "Mozilla/5.0"`
  },
  commands: [
    { command: "-subs", description: "Include subdomains" },
    { command: "-depth", description: "Crawl depth" },
    { command: "-out", description: "Output file" },
    { command: "-u", description: "Custom user agent" },
    { command: "-t", description: "Number of threads" },
    { command: "-timeout", description: "Request timeout" },
    { command: "-insecure", description: "Skip TLS verification" },
    { command: "-h", description: "Show help" }
  ],
  whenToUse: [
    "Initial reconnaissance for endpoint discovery",
    "Finding JavaScript files and API endpoints",
    "Mapping site structure before manual testing",
    "Automated content discovery in bug bounty",
    "Collecting URLs for further analysis"
  ],
  notes: [
    "Designed for use in pipelines with other tools",
    "Lightweight and fast compared to traditional crawlers",
    "Output can be piped directly to tools like gf or qsreplace",
    "Does not render JavaScript — only parses responses"
  ],
  commonErrors: [
    { error: "No URLs found", solution: "Increase depth with -depth flag or check target accessibility" },
    { error: "TLS errors", solution: "Use -insecure flag to skip certificate verification" },
    { error: "Too many redirects", solution: "The tool follows redirects by default; check target configuration" }
  ],
  tags: ["crawler", "endpoint", "recon", "golang"]
}
