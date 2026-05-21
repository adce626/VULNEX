import { ToolGuide } from "@/lib/guide-types"

export const kxssGuide: ToolGuide = {
  id: "kxss",
  name: "Kxss",
  icon: "shield",
  category: "Recon & OSINT",
  description: "Cross-site scripting detector",
  installation: {
    title: "Installation",
    steps: ["Install via Go", "Verify installation"],
    code: `# Using Go
go install github.com/tomnomnom/hacks/kxss@latest

# Verify
kxss -h`
  },
  usage: {
    title: "Basic Usage",
    description: "Detect reflected XSS vulnerabilities in URLs",
    code: `# Scan URLs from stdin
cat urls.txt | kxss

# Scan a single URL
echo "https://example.com/?q=test" | kxss

# Pipe from wayback machine
katana -u https://example.com | kxss

# With custom payload
cat urls.txt | kxss -p "PAYLOAD"`
  },
  commands: [
    { command: "-p", description: "Custom payload to inject" },
    { command: "-h", description: "Show help" }
  ],
  whenToUse: [
    "Reflected XSS detection",
    "Mass scanning of URL lists",
    "Bug bounty automation pipelines",
    "Validating XSS filters",
    "Quick triage of collected URLs"
  ],
  notes: [
    "Part of TomNomNom's hacks collection",
    "Works best as part of a pipeline with gau, waybackurls, or katana",
    "Detects reflection of injected payloads in responses",
    "Lightweight and fast for bulk URL processing"
  ],
  commonErrors: [
    { error: "No input", solution: "Provide URLs via stdin: cat urls.txt | kxss" },
    { error: "False positives", solution: "Manually verify each reflected parameter" }
  ],
  tags: ["xss", "scanner", "detector", "golang"]
}
