import { ToolGuide } from "@/lib/guide-types"

export const maltegoGuide: ToolGuide = {
  id: "maltego",
  name: "Maltego",
  icon: "globe",
  category: "Recon & OSINT",
  description: "Powerful OSINT and link analysis tool for mapping relationships between entities",
  installation: {
    title: "Installation",
    steps: ["Download from official site", "Install the application", "Register for Community Edition"],
    code: `# Download from official site
# https://www.maltego.com/downloads/

# Linux
wget https://www.maltego.com/download/maltego.deb
sudo dpkg -i maltego.deb

# macOS
# Download .dmg from Maltego website

# Windows
# Download .exe installer from Maltego website

# Verify
maltego --version`
  },
  usage: {
    title: "Basic Usage",
    description: "Visual link analysis and entity mapping for OSINT investigations",
    code: `# Command-line transforms
maltego-tx --run "maltego.DNSFromDomain" domain example.com

# Run a specific transform
maltego-tx --run "maltego.EmailFromDomain" domain example.com

# Export graph
maltego --export graph.mtgx

# Batch transform from file
maltego-tx --entities entities.txt --transforms transforms.txt`
  },
  commands: [
    { command: "--run", description: "Run a specific transform" },
    { command: "--entities", description: "Input entities file" },
    { command: "--transforms", description: "Transforms to apply" },
    { command: "--export", description: "Export graph to file" },
    { command: "--format", description: "Output format (csv, json, graphml)" },
    { command: "--limit", description: "Maximum results per transform" },
    { command: "--timeout", description: "Transform timeout in seconds" }
  ],
  whenToUse: [
    "Visualizing relationships between OSINT data points",
    "Mapping social networks and connections",
    "Investigating infrastructure relationships",
    "Documenting findings in a visual graph format",
    "Complex multi-source intelligence analysis"
  ],
  notes: [
    "Community Edition is free with some limitations",
    "Extensible with transforms from Paterva and community",
    "Supports integrations with VirusTotal, Shodan, HaveIBeenPwned",
    "Best used as a GUI application, CLI support is limited",
    "Ideal for visual presentation of OSINT findings"
  ],
  commonErrors: [
    { error: "Transform failed", solution: "Check API keys for the specific transform service and internet connectivity" },
    { error: "Rate limited by service", solution: "Add delays between transforms or reduce batch size" },
    { error: "License expired", solution: "Renew your Community Edition license or upgrade to a paid plan" }
  ],
  tags: ["osint", "visualization", "analysis", "recon", "graph"]
}
