import { ToolGuide } from "@/lib/guide-types"

export const gfGuide: ToolGuide = {
  id: "gf",
  name: "gf",
  icon: "filter",
  category: "Recon & OSINT",
  description: "Filter URLs by vulnerability type for efficient triaging",
  installation: {
    title: "Installation",
    steps: [
      "Install using Go",
      "Add custom patterns",
      "Verify installation"
    ],
    code: `# Using Go
go install github.com/tomnomnom/gf@latest

# Add custom XSS pattern
echo 'xss: <script>alert(1)</script>' >> ~/.gf/patterns/xss

# Verify
gf -list`
  },
  usage: {
    title: "Basic Usage",
    description: "Filter URL lists by vulnerability patterns for efficient testing",
    code: `# Filter XSS URLs
cat all_urls.txt | gf xss > xss.txt

# Filter SSRF URLs
cat all_urls.txt | gf ssrf > ssrf.txt

# Filter Open Redirect
cat all_urls.txt | gf redirect > redirect.txt

# Filter SQL Injection
cat all_urls.txt | gf sql > sql.txt

# Multiple patterns
cat all_urls.txt | gf sqli,idor > vulns.txt`
  },
  commands: [
    { command: "gf <pattern>", description: "Filter URLs by specified pattern" },
    { command: "-list", description: "List all saved patterns" },
    { command: "-save <name>", description: "Save a new pattern" },
    { command: "-rm <name>", description: "Remove a saved pattern" },
    { command: "-only", description: "Only show matching URLs" },
    { command: "-no-color", description: "Disable colored output" }
  ],
  whenToUse: [
    "After collecting large URL lists from multiple tools",
    "Quick triaging of URLs by vulnerability type",
    "Post-reconnaissance URL filtering",
    "Preparing URLs for specific vulnerability scanners",
    "In Bug Bounty workflows for efficient targeting"
  ],
  notes: [
    "Created by Tomnomnom (author of gospider, httpx)",
    "Extremely fast due to Go implementation",
    "Supports custom patterns in ~/.gf/patterns/",
    "Can be piped with other tools like httpx",
    "Reads URLs from stdin (piping)",
    "Color-codes output by pattern type",
    "Built-in patterns for common vulnerabilities",
    "Can create custom patterns for any vulnerability"
  ],
  commonErrors: [
    {
      error: "no matching patterns",
      solution: "Add custom pattern with -save or check available patterns with -list"
    },
    {
      error: "command not found",
      solution: "Ensure ~/go/bin is in PATH or reinstall"
    },
    {
      error: "empty output",
      solution: "No URLs matched the pattern, try different patterns"
    },
    {
      error: "invalid pattern name",
      solution: "Use -list to see available pattern names"
    }
  ],
  tags: ["filter", "urls", "triage", "patterns", "go", "recon"]
}
