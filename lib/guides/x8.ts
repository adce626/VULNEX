import { ToolGuide } from "@/lib/guide-types"

export const x8Guide: ToolGuide = {
  id: "x8",
  name: "x8",
  icon: "zap",
  category: "Recon & OSINT",
  description: "Extremely fast alternative to ffuf for parameter fuzzing",
  installation: {
    title: "Installation",
    steps: [
      "Install using Go",
      "Verify installation"
    ],
    code: `# Using Go
go install github.com/Sh1Yo/x8@latest

# Verify
x8 -h`
  },
  usage: {
    title: "Basic Usage",
    description: "High-speed parameter and directory fuzzing written in Go",
    code: `# Basic parameter fuzzing
x8 -u "https://site.com/endpoint?FUZZ=test" -w paramnames.txt

# Filter by status codes
x8 -u "https://site.com/api?param=FUZZ" -w values.txt --filter-status 200,403

# High-speed fuzzing with threads
x8 -u "https://site.com/endpoint" -w params.txt -t 200 --threads 50

# Multiple URLs from file
cat urls.txt | x8 -w params.txt -json`
  },
  commands: [
    { command: "-u", description: "Target URL with FUZZ placeholder" },
    { command: "-w", description: "Wordlist file path" },
    { command: "-t", description: "Concurrent requests" },
    { command: "--threads", description: "Number of execution threads" },
    { command: "--filter-status", description: "Filter by status codes" },
    { command: "-m", description: "HTTP method (GET/POST)" },
    { command: "-j", description: "JSON output" },
    { command: "-d", description: "POST data" },
    { command: "-H", description: "Custom headers" },
    { command: "--self-update", description: "Self-update to latest version" }
  ],
  whenToUse: [
    "When you need faster results than ffuf",
    "As alternative to ffuf in parameter fuzzing",
    "Scanning large URL lists quickly",
    "Combined with Arjun for comprehensive coverage",
    "In high-performance environments with many threads"
  ],
  notes: [
    "10-100x faster than ffuf in some scenarios",
    "Written in Go for high performance",
    "Compatible with standard wordlists used with ffuf",
    "Supports stdin piping for URL lists",
    "Auto-update with --self-update flag",
    "Low resource usage compared to Python tools",
    "Can be combined with gf for result filtering",
    "Suitable for quick initial fuzzing"
  ],
  commonErrors: [
    {
      error: "no response from the target",
      solution: "Check if server is running and URL is correct"
    },
    {
      error: "rate limiting / 429 Too Many Requests",
      solution: "Reduce threads or add --delay flag"
    },
    {
      error: "panic: runtime error",
      solution: "Check input and URL format"
    },
    {
      error: "wordlist file not found",
      solution: "Use full path to wordlist file"
    }
  ],
  tags: ["fuzzing", "fast", "parameter", "go", "brute-force"]
}
