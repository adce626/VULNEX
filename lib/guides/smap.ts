import { ToolGuide } from "@/lib/guide-types"

export const smapGuide: ToolGuide = {
  id: "smap",
  name: "Smap",
  icon: "zap",
  category: "Recon & OSINT",
  description: "Fast port scanner similar to Nmap written in Go with service detection and output in Nmap format",
  installation: {
    title: "Installation",
    steps: ["Install using Go", "Download from releases", "Verify installation"],
    code: `# Using Go
go install github.com/s0md3v/smap@latest

# Verify
smap --version`
  },
  usage: {
    title: "Basic Usage",
    description: "Fast port scanning with Nmap-compatible service detection and output",
    code: `# Scan all ports
smap -p- 192.168.0.1

# Scan common ports
smap 192.168.0.1

# Scan with service detection
smap -sV 192.168.0.1

# Scan multiple hosts from file
smap -iL hosts.txt

# Scan port range
smap -p 1-1000 192.168.0.1

# XML output (Nmap format)
smap -oX results.xml 192.168.0.1

# Grepable output
smap -oG results.gnmap 192.168.0.1`
  },
  commands: [
    { command: "-p", description: "Ports to scan (use -p- for all ports)" },
    { command: "-p-", description: "Scan all 65535 ports" },
    { command: "-sV", description: "Service version detection" },
    { command: "-iL", description: "File with host list" },
    { command: "-oX", description: "XML output (Nmap format)" },
    { command: "-oG", description: "Grepable output" },
    { command: "-oN", description: "Normal output" },
    { command: "-top-ports", description: "Scan top N ports" }
  ],
  whenToUse: [
    "Quick port scanning when Nmap is unavailable",
    "Automated pipelines requiring Nmap-compatible output",
    "Fast service discovery on multiple hosts",
    "Port scanning in Go-based automation workflows",
    "Compatibility with tools expecting Nmap output format"
  ],
  notes: [
    "Written in Go for faster performance than Nmap",
    "Output is fully compatible with Nmap format",
    "Supports both TCP and SYN scan modes",
    "Lightweight alternative to Nmap for simple scans"
  ],
  commonErrors: [
    { error: "No results returned", solution: "Try -p- for all ports or check host connectivity" },
    { error: "Permission denied", solution: "SYN scan requires root; use without -sS for TCP connect scan" }
  ],
  tags: ["port", "scanner", "nmap", "golang", "network"]
}
