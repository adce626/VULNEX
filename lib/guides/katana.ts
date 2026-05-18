import { ToolGuide } from "@/lib/guide-types"

export const katanaGuide: ToolGuide = {
  id: "katana",
  name: "Katana",
  icon: "target",
  category: "Recon & OSINT",
  description: "Next-gen web crawling and spidering tool by ProjectDiscovery",
  installation: {
    title: "Installation",
    steps: ["Install using Go", "Download from GitHub", "Verify installation"],
    code: `# Using Go
go install github.com/projectdiscovery/katana/cmd/katana@latest

# Verify
katana --version

# Update
go install github.com/projectdiscovery/katana/cmd/katana@latest`
  },
  usage: {
    title: "Basic Usage",
    description: "Crawl websites to discover endpoints, URLs, and JavaScript files",
    code: `# Basic crawl
katana -u https://example.com

# With depth control
katana -u https://example.com -d 3

# Passive mode (no active crawling)
katana -u https://example.com -p

# Output all URLs including subdomains
katana -u https://example.com -subs

# Extract JavaScript files
katana -u https://example.com -jc

# Save to file
katana -u https://example.com -o urls.txt`
  },
  commands: [
    { command: "-u", description: "Target URL" },
    { command: "-d", description: "Crawl depth" },
    { command: "-p", description: "Passive mode (no active requests)" },
    { command: "-subs", description: "Include subdomains" },
    { command: "-jc", description: "Extract JavaScript files" },
    { command: "-kf", description: "Keep URL fragments" },
    { command: "-m", description: "Maximum URLs to crawl" },
    { command: "-o", description: "Output file" },
    { command: "-proxy", description: "HTTP proxy" },
    { command: "-H", description: "Custom headers" },
    { command: "-timeout", description: "Request timeout" },
    { command: "-concurrency", description: "Number of concurrent requests" }
  ],
  whenToUse: [
    "Comprehensive web crawling for asset discovery",
    "Finding hidden endpoints and JavaScript files",
    "Passive recon without triggering alerts",
    "Mapping application attack surface",
    "Building custom wordlists from live endpoints"
  ],
  notes: [
    "Built by ProjectDiscovery — actively maintained",
    "Supports both active crawling and passive parsing",
    "Can be combined with httpx for status filtering",
    "Much faster than traditional crawlers like Burp Spider"
  ],
  commonErrors: [
    { error: "Too many URLs", solution: "Limit crawl with -m flag or reduce depth with -d" },
    { error: "Missing JavaScript URLs", solution: "Use -jc flag to specifically extract JS files" }
  ],
  tags: ["crawler", "spider", "recon", "discovery", "projectdiscovery"]
}
