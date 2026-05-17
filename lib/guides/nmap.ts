import { ToolGuide } from "@/lib/guide-types"

export const nmapGuide: ToolGuide = {
  id: "nmap",
  name: "Nmap",
  icon: "network",
  category: "Tools & Methods",
  description: "Network scanner for host and service discovery",
  installation: {
    title: "Installation",
    steps: [
      "Install via package manager",
      "Verify installation",
      "Update scripts"
    ],
    code: `# Kali/Debian
apt install nmap

# macOS
brew install nmap

# Windows
Download from nmap.org

# Verify
nmap --version

# Update scripts
nmap --script-updatedb`
  },
  usage: {
    title: "Basic Usage",
    description: "Scan networks, discover hosts, and enumerate services",
    code: `# Basic scan
nmap 192.168.1.1

# Full port scan
nmap -p- 192.168.1.1

# Service version detection
nmap -sV 192.168.1.1

# OS detection
nmap -O 192.168.1.1

# Aggressive scan
nmap -A 192.168.1.1

# Scan with scripts
nmap --script=vuln 192.168.1.1`
  },
  commands: [
    { command: "-sS", description: "SYN scan (stealth)" },
    { command: "-sT", description: "TCP connect scan" },
    { command: "-sU", description: "UDP scan" },
    { command: "-sV", description: "Service version detection" },
    { command: "-O", description: "OS detection" },
    { command: "-A", description: "Aggressive scan" },
    { command: "-p", description: "Port specification" },
    { command: "--script", description: "Run NSE scripts" },
    { command: "-oN/-oX", description: "Output format" },
    { command: "-T0-5", description: "Timing template" }
  ],
  whenToUse: [
    "Initial network reconnaissance",
    "Service enumeration",
    "Vulnerability discovery",
    "Port scanning",
    "Network mapping"
  ],
  notes: [
    "SYN scan requires root privileges",
    "Use -T2 or lower for stealth",
    "Scripts can be noisy - use carefully",
    "Always stay within scope"
  ],
  commonErrors: [
    {
      error: "Requires root",
      solution: "Run with sudo for SYN scans"
    },
    {
      error: "Host seems down",
      solution: "Use -Pn to skip ping check"
    }
  ],
  tags: ["network", "scanning", "enumeration", "essential"]
}
