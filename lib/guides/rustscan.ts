import { ToolGuide } from "@/lib/guide-types"

export const rustscanGuide: ToolGuide = {
  id: "rustscan",
  name: "RustScan",
  icon: "zap",
  category: "Recon & OSINT",
  description: "Fast port scanner written in Rust with Nmap integration for service detection",
  installation: {
    title: "Installation",
    steps: ["Install via cargo", "Install via Docker", "Verify installation"],
    code: `# Using Cargo
cargo install rustscan

# Using Docker
docker pull rustscan/rustscan

# Verify
rustscan --version

# Docker usage
docker run -it --rm --name rustscan rustscan/rustscan -a 192.168.0.1`
  },
  usage: {
    title: "Basic Usage",
    description: "Fast port scanning with automatic Nmap script execution on open ports",
    code: `# Scan single host
rustscan -a 192.168.0.1

# Scan with Nmap service detection
rustscan -a 192.168.0.1 -- -A

# Scan multiple hosts
rustscan -a 192.168.0.0/24

# Custom port range
rustscan -a 192.168.0.1 -p 1-1000

# Increased timeout for slower hosts
rustscan -a 192.168.0.1 -t 2000

# Scan with custom Nmap arguments
rustscan -a 192.168.0.1 -- -sV -sC

# Batch mode
rustscan -a hosts.txt -- -A`
  },
  commands: [
    { command: "-a", description: "Target IP, CIDR, or file of hosts" },
    { command: "-p", description: "Port range to scan" },
    { command: "-t", description: "Timeout in milliseconds (default 1500)" },
    { command: "-b", description: "Batch size for parallel scanning" },
    { command: "-g", description: "Scan mode (default: Connect scan)" },
    { command: "--", description: "Nmap arguments passed after --" },
    { command: "--tries", description: "Number of scan attempts" },
    { command: "--no-config", description: "Skip config file loading" }
  ],
  whenToUse: [
    "Fast initial port discovery in penetration tests",
    "Time-sensitive scanning engagements",
    "Scanning large IP ranges quickly",
    "Automated Nmap service detection on discovered ports",
    "CTF challenges and lab environments"
  ],
  notes: [
    "Written in Rust for maximum performance",
    "Automatically pipes open ports to Nmap for detailed scanning",
    "Docker image is available for cross-platform use",
    "Batch mode reduces scanning time for large target lists"
  ],
  commonErrors: [
    { error: "Nmap not found", solution: "Ensure Nmap is installed and in PATH when using -- arguments" },
    { error: "Permission denied", solution: "Run with sudo or use a non-privileged scan method" }
  ],
  tags: ["port", "scanner", "rust", "fast", "nmap", "network"]
}
