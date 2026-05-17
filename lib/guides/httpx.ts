import { ToolGuide } from "@/lib/guide-types"

export const httpxGuide: ToolGuide = {
  id: "httpx",
  name: "httpx",
  icon: "zap",
  category: "Recon & OSINT",
  description: "Fast HTTP probing and analysis tool",
  installation: {
    title: "Installation",
    steps: [
      "Install using Go",
      "Or use Docker image",
      "Verify installation"
    ],
    code: `# Using Go
go install -v github.com/projectdiscovery/httpx/cmd/httpx@latest

# Using Docker
docker pull projectdiscovery/httpx:latest

# Verify
httpx -version`
  },
  usage: {
    title: "Basic Usage",
    description: "Probe hosts for live HTTP services and gather information",
    code: `# Basic probe
cat subdomains.txt | httpx

# With details
cat hosts.txt | httpx -status-code -title -tech-detect

# JSON output
httpx -l hosts.txt -json -o results.json

# Screenshot
httpx -l hosts.txt -screenshot`
  },
  commands: [
    { command: "-l", description: "Input file with hosts" },
    { command: "-status-code", description: "Show status codes" },
    { command: "-title", description: "Show page titles" },
    { command: "-tech-detect", description: "Detect technologies" },
    { command: "-screenshot", description: "Take screenshots" },
    { command: "-json", description: "JSON output" },
    { command: "-mc", description: "Match status codes" },
    { command: "-fc", description: "Filter status codes" },
    { command: "-threads", description: "Number of threads" }
  ],
  whenToUse: [
    "After subdomain enumeration",
    "Finding live web servers",
    "Technology fingerprinting",
    "Before vulnerability scanning"
  ],
  notes: [
    "Pairs well with subfinder output",
    "Use -tech-detect for stack identification",
    "Screenshots help visual assessment"
  ],
  commonErrors: [
    {
      error: "Too many open files",
      solution: "Reduce threads with -threads flag"
    },
    {
      error: "Connection timeouts",
      solution: "Increase timeout with -timeout flag"
    }
  ],
  tags: ["recon", "http", "probing", "enumeration"]
}
