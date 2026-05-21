import { ToolGuide } from "@/lib/guide-types"

export const uniscanGuide: ToolGuide = {
  id: "uniscan",
  name: "Uniscan",
  icon: "shield",
  category: "Recon & OSINT",
  description: "Remote file include and directory traversal scanner",
  installation: {
    title: "Installation",
    steps: ["Clone the repository", "Install Python dependencies", "Verify installation"],
    code: `# Clone the repository
git clone https://github.com/aracilinux/uniscan.git
cd uniscan

# Install dependencies
pip install -r requirements.txt

# Verify
python3 uniscan.py -h`
  },
  usage: {
    title: "Basic Usage",
    description: "Scan for LFI, RFI, and directory traversal vulnerabilities",
    code: `# Full scan (crawl, static, dynamic, and config check)
python3 uniscan.py -u https://example.com -qweds

# Crawl only
python3 uniscan.py -u https://example.com -q

# Static checks only
python3 uniscan.py -u https://example.com -w

# Dynamic checks (LFI/RFI)
python3 uniscan.py -u https://example.com -e

# Config file checks
python3 uniscan.py -u https://example.com -s`
  },
  commands: [
    { command: "-u", description: "Target URL" },
    { command: "-q", description: "Enable crawler module" },
    { command: "-w", description: "Enable static checks" },
    { command: "-e", description: "Enable dynamic checks (LFI/RFI)" },
    { command: "-s", description: "Enable config file checks" },
    { command: "-d", description: "Enable directory traversal checks" },
    { command: "-r", description: "Enable robots.txt/sitemap check" },
    { command: "-o", description: "Output directory" }
  ],
  whenToUse: [
    "Testing for LFI and RFI vulnerabilities",
    "Directory traversal testing",
    "Web server configuration review",
    "Initial vulnerability scanning",
    "Bug bounty recon on PHP applications"
  ],
  notes: [
    "Combines crawling with vulnerability detection",
    "Flags -q, -w, -e, -d, -s can be combined (e.g., -qweds)",
    "Designed for Linux systems",
    "Static checks look for common configuration issues",
    "Dynamic checks test parameter injection for LFI/RFI"
  ],
  commonErrors: [
    { error: "ModuleNotFoundError", solution: "Run: pip install -r requirements.txt" },
    { error: "No results", solution: "The target may not be vulnerable; try with different flags" },
    { error: "Crawl takes too long", solution: "Limit the scope or use only specific check flags" }
  ],
  tags: ["scanner", "lfi", "rfi", "vulnerability"]
}
