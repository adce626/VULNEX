import { ToolGuide } from "@/lib/guide-types"

export const autoreconGuide: ToolGuide = {
  id: "autorecon",
  name: "AutoRecon",
  icon: "zap",
  category: "Recon & OSINT",
  description: "Multi-threaded reconnaissance tool that automates port scanning, service enumeration, and vulnerability detection",
  installation: {
    title: "Installation",
    steps: ["Install via pip", "Verify installation"],
    code: `# Using pip
pip install autorecon

# Verify
autorecon --help

# Update
pip install --upgrade autorecon`
  },
  usage: {
    title: "Basic Usage",
    description: "Automated reconnaissance with multiple parallel scanning modules",
    code: `# Basic scan
autorecon -t target.com

# Scan multiple targets
autorecon -t target1.com target2.com

# Output to specific directory
autorecon -t target.com -o ./results

# Quick scan (skip some modules)
autorecon -t target.com --quick

# Local file output only (no service enumeration)
autorecon -t target.com --local-only

# Disable port scanning
autorecon -t target.com --no-port-scan`
  },
  commands: [
    { command: "-t", description: "Target(s) to scan" },
    { command: "-o", description: "Output directory" },
    { command: "--quick", description: "Skip slower enumeration modules" },
    { command: "--local-only", description: "Only run locally-hosted scans" },
    { command: "--no-port-scan", description: "Skip Nmap port scanning" },
    { command: "--single-scanner", description: "Limit to one scanner at a time" },
    { command: "--only-scanners", description: "Run only specified scanner(s)" },
    { command: "--disable-servers", description: "Disable local web servers" }
  ],
  whenToUse: [
    "Initial recon in penetration testing engagements",
    "CTF competitions and hackthebox machines",
    "Comprehensive service enumeration with minimal manual effort",
    "When you need Nmap, gobuster, nikto, and other tools coordinated",
    "Time-constrained assessments requiring thorough coverage"
  ],
  notes: [
    "Orchestrates multiple tools automatically",
    "Runs Nmap, Nikto, Gobuster, and other scanners in parallel",
    "Results are organized in a clean directory structure",
    "Can be resource-intensive on large target lists"
  ],
  commonErrors: [
    { error: "Missing dependencies", solution: "Install required tools: pip install -r requirements.txt" },
    { error: "Permission errors", solution: "Some scans require root/sudo access for SYN scans" }
  ],
  tags: ["recon", "automation", "python", "scanner", "enumeration"]
}
