import { ToolGuide } from "@/lib/guide-types"

export const mantraGuide: ToolGuide = {
  id: "mantra",
  name: "Mantra",
  icon: "code",
  category: "Recon & OSINT",
  description: "Fast JavaScript endpoint extractor — discovers API endpoints and URLs from JavaScript files",
  installation: {
    title: "Installation",
    steps: ["Install using Go", "Verify installation"],
    code: `# Using Go
go install github.com/MrEmpy/mantra@latest

# Verify
mantra version`
  },
  usage: {
    title: "Basic Usage",
    description: "Extract endpoints, URLs, and paths from JavaScript files",
    code: `# Extract from a single JS file
mantra -u https://example.com/script.js

# Extract from multiple URLs
mantra -u https://example.com/app.js https://example.com/bundle.js

# Save output to file
mantra -u https://example.com/script.js -o endpoints.txt

# Verbose output
mantra -u https://example.com/script.js -v`
  },
  commands: [
    { command: "-u", description: "URL of the JavaScript file to analyze" },
    { command: "-o", description: "Output file for extracted endpoints" },
    { command: "-v", description: "Verbose output" },
    { command: "--help", description: "Show help message" }
  ],
  whenToUse: [
    "Extracting hidden API endpoints from JS bundles",
    "Mapping client-side application routes",
    "Recon phase of bug bounty hunting",
    "Analyzing SPAs for undiscovered endpoints"
  ],
  notes: [
    "Focused specifically on endpoint extraction from JS files",
    "Useful for finding API routes hardcoded in client-side code",
    "Works well when combined with gau or waybackurls for JS discovery"
  ],
  commonErrors: [
    { error: "No endpoints found", solution: "Check if the JS file is accessible and not blocked by WAF" },
    { error: "Connection timeout", solution: "Use a VPN or proxy if the target is geo-restricted" }
  ],
  tags: ["js", "endpoint", "extract", "golang"]
}
