import { ToolGuide } from "@/lib/guide-types"

export const spiderfootGuide: ToolGuide = {
  id: "spiderfoot",
  name: "SpiderFoot",
  icon: "globe",
  category: "Recon & OSINT",
  description: "Automated OSINT and threat intelligence reconnaissance tool",
  installation: {
    title: "Installation",
    steps: ["Clone the repository", "Install dependencies", "Run the setup"],
    code: `git clone https://github.com/smicallef/spiderfoot.git
cd spiderfoot
pip install -r requirements.txt

# Verify
python3 sf.py --help`
  },
  usage: {
    title: "Basic Usage",
    description: "Automated OSINT scanning with CLI or web interface",
    code: `# CLI scan against a domain
python3 sf.py -m example.com

# Start the web interface
python3 sf.py -l 0.0.0.0:5001

# Scan with specific modules
python3 sf.py -m example.com -m dns,whois,ssl

# Output results to file
python3 sf.py -m example.com -o json > results.json`
  },
  commands: [
    { command: "-m", description: "Target domain or IP to scan" },
    { command: "-l", description: "Listen address for the web UI" },
    { command: "-o", description: "Output format (json, csv, html)" },
    { command: "-s", description: "Comma-separated list of modules to use" },
    { command: "-q", description: "Quiet mode — suppress banner output" }
  ],
  whenToUse: [
    "Automated OSINT collection for domains, IPs, and emails",
    "Threat intelligence gathering",
    "Surface and deep web reconnaissance",
    "Finding exposed information about an organization"
  ],
  notes: [
    "200+ built-in OSINT modules",
    "Web UI available for interactive use",
    "Results are correlated to show relationships",
    "Can be used with Docker as well"
  ],
  commonErrors: [
    { error: "Module errors", solution: "Check that all dependencies are installed for the specific module" },
    { error: "Connection timeout", solution: "Some modules require internet access or may be blocked" }
  ],
  tags: ["osint", "threat", "intelligence", "recon"]
}
