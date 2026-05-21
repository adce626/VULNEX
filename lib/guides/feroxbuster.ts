import { ToolGuide } from "@/lib/guide-types"

export const feroxbusterGuide: ToolGuide = {
  id: "feroxbuster",
  name: "Feroxbuster",
  icon: "zap",
  category: "Recon & OSINT",
  description: "Fast content discovery tool written in Rust for directory and file brute-forcing",
  installation: {
    title: "Installation",
    steps: ["Install via cargo", "Download from releases", "Verify installation"],
    code: `# Using Cargo
cargo install feroxbuster

# Download from releases
# Visit https://github.com/epi052/feroxbuster/releases

# Verify
feroxbuster --version`
  },
  usage: {
    title: "Basic Usage",
    description: "Fast recursive content discovery with wildcard detection and filtering",
    code: `# Basic directory scan
feroxbuster -u https://example.com -w wordlist.txt

# Recursive scan with depth
feroxbuster -u https://example.com -w wordlist.txt -d 3

# Filter by status code
feroxbuster -u https://example.com -w wordlist.txt --filter-status 404

# Scan with extensions
feroxbuster -u https://example.com -w wordlist.txt -x php,asp,html

# Rate limiting
feroxbuster -u https://example.com -w wordlist.txt --rate-limit 60

# Thread count
feroxbuster -u https://example.com -w wordlist.txt -t 50

# Quiet mode with JSON output
feroxbuster -u https://example.com -w wordlist.txt --json -q

# Wildcard detection
feroxbuster -u https://example.com -w wordlist.txt --auto-tune`
  },
  commands: [
    { command: "-u", description: "Target URL" },
    { command: "-w", description: "Wordlist file" },
    { command: "-d", description: "Recursion depth" },
    { command: "-x", description: "File extensions to scan" },
    { command: "-t", description: "Number of threads" },
    { command: "--filter-status", description: "Filter response status codes" },
    { command: "--filter-size", description: "Filter response sizes" },
    { command: "--rate-limit", description: "Requests per second" },
    { command: "--json", description: "JSON output" },
    { command: "--auto-tune", description: "Auto-detect and handle wildcards" },
    { command: "-q", description: "Quiet mode" }
  ],
  whenToUse: [
    "Directory and file brute-forcing on web applications",
    "Discovering hidden endpoints and admin panels",
    "Recursive content discovery with depth control",
    "Filtering out false positives from wildcard responses",
    "API endpoint discovery with extension filtering"
  ],
  notes: [
    "Written in Rust for exceptional speed",
    "Automatic wildcard detection reduces false positives",
    "Supports recursive scanning with configurable depth",
    "JSON output for integration with other tools"
  ],
  commonErrors: [
    { error: "Too many false positives", solution: "Use --auto-tune for wildcard detection or filter by response size" },
    { error: "Rate limited by server", solution: "Reduce rate-limit and thread count with --rate-limit and -t" }
  ],
  tags: ["content", "discovery", "rust", "bruteforce", "directory"]
}
