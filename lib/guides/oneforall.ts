import { ToolGuide } from "@/lib/guide-types"

export const oneforallGuide: ToolGuide = {
  id: "oneforall",
  name: "OneForAll",
  icon: "globe",
  category: "Recon & OSINT",
  description: "Powerful subdomain enumeration tool",
  installation: {
    title: "Installation",
    steps: [
      "Clone the repository",
      "Navigate into the directory",
      "Install Python dependencies",
      "Verify installation"
    ],
    code: `git clone https://github.com/shmilylty/OneForAll.git
cd OneForAll
python3 -m pip install -r requirements.txt

# Verify
python3 oneforall.py --help`
  },
  usage: {
    title: "Basic Usage",
    description: "OneForAll combines over 20 data sources for comprehensive subdomain discovery with built-in validation",
    code: `# Full scan
python3 oneforall.py --target example.com run

# Quick scan (fewer sources)
python3 oneforall.py --target example.com --fmt json run

# Output to specific directory
python3 oneforall.py --target example.com --path ./results run`
  },
  commands: [
    { command: "--target", description: "Target domain" },
    { command: "run", description: "Execute the enumeration" },
    { command: "--fmt", description: "Output format (csv, json, txt)" },
    { command: "--path", description: "Custom output directory" },
    { command: "--valid", description: "Only output validated subdomains" }
  ],
  whenToUse: [
    "Comprehensive multi-source subdomain discovery",
    "When quality and validation matter",
    "Automated recon pipelines",
    "Chinese-speaking security researchers (docs in Chinese)"
  ],
  notes: [
    "Uses 20+ data sources including search engines and certificate transparency",
    "Built-in subdomain validation with DNS resolution and HTTP probe",
    "Documentation and config comments are primarily in Chinese",
    "Heavier than other tools — expect longer run times"
  ],
  commonErrors: [
    {
      error: "pip install fails",
      solution: "Use a virtual environment: python3 -m venv venv && source venv/bin/activate"
    },
    {
      error: "Too many requests / banned by sources",
      solution: "Increase delays in config/setting.py or use fewer sources"
    }
  ],
  tags: ["subdomain", "recon", "osint", "python"]
}
