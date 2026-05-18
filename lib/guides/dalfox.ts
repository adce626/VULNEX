import { ToolGuide } from "@/lib/guide-types"

export const dalfoxGuide: ToolGuide = {
  id: "dalfox",
  name: "Dalfox",
  icon: "zap",
  category: "Web Vulnerabilities",
  description: "Advanced XSS vulnerability scanner and parameter analysis tool",
  installation: {
    title: "Installation",
    steps: ["Install using Go", "Download from GitHub releases", "Verify installation"],
    code: `# Using Go
go install github.com/hahwul/dalfox/v2@latest

# Or download from releases
wget https://github.com/hahwul/dalfox/releases/latest/download/dalfox_linux_amd64.tar.gz

# Verify
dalfox version`
  },
  usage: {
    title: "Basic Usage",
    description: "Scan URLs for XSS vulnerabilities with automatic parameter detection",
    code: `# Single URL scan
dalfox url https://example.com/page.php?name=test

# Scan from file
dalfox file urls.txt

# Passive mode with pipeline
cat urls.txt | dalfox pipe

# Blind XSS with callback
dalfox url https://example.com/page?q=1 --blind https://your.xss.ht

# Report output
dalfox url https://example.com/page?p=1 -o report.html`
  },
  commands: [
    { command: "url", description: "Scan a single URL" },
    { command: "file", description: "Scan URLs from a file" },
    { command: "pipe", description: "Scan URLs from stdin" },
    { command: "--blind", description: "Set blind XSS callback URL" },
    { command: "--found-action", description: "Action when XSS is found" },
    { command: "--output", description: "Save results to file" },
    { command: "--format", description: "Output format (json/html)" },
    { command: "--mining-dict", description: "Use dictionary for param mining" },
    { command: "--cookie", description: "Set cookie for authenticated scans" },
    { command: "--header", description: "Add custom headers" },
    { command: "--delay", description: "Delay between requests" },
    { command: "--timeout", description: "Request timeout in seconds" }
  ],
  whenToUse: [
    "Scanning large lists of URLs for XSS",
    "Automated XSS detection in CI/CD pipelines",
    "Blind XSS testing with callback servers",
    "Post-recon XSS analysis of collected URLs",
    "Validating XSS findings with proof-of-concept"
  ],
  notes: [
    "Written in Go — very fast compared to traditional XSS scanners",
    "Supports WAF detection and bypass techniques",
    "Can mine parameters from responses automatically",
    "Integrates with Slack and Discord for notifications"
  ],
  commonErrors: [
    { error: "No XSS found", solution: "Try --mining-dict to discover more parameters, or use --deep for thorough scanning" },
    { error: "Rate limited", solution: "Increase delay with --delay flag, rotate user-agents with --header" }
  ],
  tags: ["xss", "scanner", "automation", "fuzzing", "parameter"]
}
