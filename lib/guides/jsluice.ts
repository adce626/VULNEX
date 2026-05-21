import { ToolGuide } from "@/lib/guide-types"

export const jsluiceGuide: ToolGuide = {
  id: "jsluice",
  name: "JSLuice",
  icon: "key",
  category: "Recon & OSINT",
  description: "Extract URLs, secrets, and other interesting data from JavaScript files with pattern matching",
  installation: {
    title: "Installation",
    steps: ["Install using Go", "Verify installation"],
    code: `# Using Go
go install github.com/BishopFox/jsluice/cmd/jsluice@latest

# Verify
jsluice -h`
  },
  usage: {
    title: "Basic Usage",
    description: "Analyze JavaScript files for URLs, secrets, and sensitive data",
    code: `# Analyze a local JS file
jsluice -i script.js

# Analyze from URL
jsluice -u https://example.com/script.js

# Analyze multiple files
jsluice -i script1.js script2.js

# Output as JSON
jsluice -i script.js -j

# Grep mode — search for patterns
jsluice -i script.js -g "api.*key"`
  },
  commands: [
    { command: "-i", description: "Input JavaScript file(s)" },
    { command: "-u", description: "URL to fetch JS from" },
    { command: "-j", description: "JSON output format" },
    { command: "-g", description: "Grep mode for custom patterns" },
    { command: "--help", description: "Show help message" }
  ],
  whenToUse: [
    "Finding hardcoded API keys and secrets in JS files",
    "Extracting all URLs from client-side JavaScript",
    "Security review of third-party JavaScript",
    "Bug bounty recon for leaked credentials in JS"
  ],
  notes: [
    "Developed by BishopFox — well-maintained security tool",
    "Uses AST analysis for accurate URL and secret extraction",
    "Less noisy than simple regex-based approaches"
  ],
  commonErrors: [
    { error: "Large JS file processing", solution: "Increase memory or use -i with smaller chunks" },
    { error: "No secrets found", solution: "Try with -g flag to search for custom patterns" }
  ],
  tags: ["js", "secret", "url", "extract"]
}
