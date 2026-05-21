import { ToolGuide } from "@/lib/guide-types"

export const webanalyzeGuide: ToolGuide = {
  id: "webanalyze",
  name: "Webanalyze",
  icon: "search",
  category: "Recon & OSINT",
  description: "Identify technologies used on websites with Wappalyzer integration",
  installation: {
    title: "Installation",
    steps: ["Install using Go", "Download Wappalyzer apps.json", "Verify installation"],
    code: `# Install using Go
go install github.com/rverton/webanalyze/cmd/webanalyze@latest

# Download Wappalyzer fingerprints
wget https://raw.githubusercontent.com/AliasIO/wappalyzer/master/src/apps.json
webanalyze -update

# Verify
webanalyze -h`
  },
  usage: {
    title: "Basic Usage",
    description: "Detect web technologies, frameworks, and analytics tools",
    code: `# Single host
webanalyze -host example.com

# Multiple hosts from file
webanalyze -hosts hosts.txt

# With subdomains
webanalyze -host example.com -subs

# Output as CSV
webanalyze -host example.com -output csv

# Concurrency
webanalyze -hosts hosts.txt -c 50`
  },
  commands: [
    { command: "-host", description: "Single host to analyze" },
    { command: "-hosts", description: "File with list of hosts" },
    { command: "-subs", description: "Include subdomains" },
    { command: "-output", description: "Output format (csv/json)" },
    { command: "-c", description: "Concurrency level" },
    { command: "-timeout", description: "Request timeout in seconds" },
    { command: "-silent", description: "Silent mode (only results)" },
    { command: "-update", description: "Update Wappalyzer fingerprints" }
  ],
  whenToUse: [
    "Recon phase technology profiling",
    "Identifying targets running vulnerable versions",
    "Building a tech stack inventory of targets",
    "Competitive intelligence gathering"
  ],
  notes: [
    "Uses the same fingerprint database as Wappalyzer browser extension",
    "Much faster than online alternatives for bulk analysis",
    "Regularly update fingerprints with -update for accuracy"
  ],
  commonErrors: [
    { error: "Outdated fingerprints", solution: "Run webanalyze -update to get the latest Wappalyzer database" },
    { error: "No technologies detected", solution: "Check if the site is accessible or behind a login page" }
  ],
  tags: ["technology", "fingerprint", "wappalyzer", "golang"]
}
