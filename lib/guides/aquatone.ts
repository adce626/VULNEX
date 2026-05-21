import { ToolGuide } from "@/lib/guide-types"

export const aquatoneGuide: ToolGuide = {
  id: "aquatone",
  name: "Aquatone",
  icon: "globe",
  category: "Recon & OSINT",
  description: "Visual inspection and screenshot tool for discovering websites at scale",
  installation: {
    title: "Installation",
    steps: ["Install using Go", "Or download from releases", "Verify installation"],
    code: `# Using Go
go install github.com/michenriksen/aquatone@latest

# Or download from releases
wget https://github.com/michenriksen/aquatone/releases/latest/download/aquatone_linux_amd64.zip
unzip aquatone_linux_amd64.zip

# Verify
aquatone -version`
  },
  usage: {
    title: "Basic Usage",
    description: "Take screenshots of multiple websites and generate a visual report",
    code: `# Screenshot hosts from stdin
cat hosts.txt | aquatone

# Screenshot with specific concurrency
cat hosts.txt | aquatone -threads 10

# Output to custom directory
cat hosts.txt | aquatone -out ./screenshots

# Scan specific ports
cat hosts.txt | aquatone -ports 80,443,8080

# Use HTTP proxy
cat hosts.txt | aquatone -proxy http://127.0.0.1:8080`
  },
  commands: [
    { command: "-out", description: "Output directory for screenshots" },
    { command: "-threads", description: "Number of concurrent threads" },
    { command: "-ports", description: "Ports to scan (default 80,443)" },
    { command: "-proxy", description: "HTTP proxy for requests" },
    { command: "-timeout", description: "Page load timeout in seconds" },
    { command: "-no-color", description: "Disable colored output" }
  ],
  whenToUse: [
    "Visual recon of large subdomain lists",
    "Generating visual reports for penetration tests",
    "Identifying interesting targets from a large scope",
    "Quick triage of web application screens"
  ],
  notes: [
    "Generates an HTML report with screenshots for easy browsing",
    "Automatically deduplicates hosts pointing to the same IP",
    "Can integrate with nmap XML output for port-based scanning"
  ],
  commonErrors: [
    { error: "Chrome/Chromium not found", solution: "Ensure Chrome or Chromium is installed and in PATH" },
    { error: "Screenshots are blank", solution: "Try increasing timeout with -timeout flag" }
  ],
  tags: ["screenshot", "visual", "recon", "web"]
}
