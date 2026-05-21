import { ToolGuide } from "@/lib/guide-types"

export const witnessmeGuide: ToolGuide = {
  id: "witnessme",
  name: "WitnessMe",
  icon: "shield",
  category: "Recon & OSINT",
  description: "Web reconnaissance screenshot tool with built-in discovery and reporting",
  installation: {
    title: "Installation",
    steps: ["Install using pip", "Or clone and install from source", "Verify installation"],
    code: `# Using pip
pip install witnessme

# Or from source
git clone https://github.com/byt3bl33d3r/WitnessMe.git
cd WitnessMe
pip install .

# Verify
witnessme --help`
  },
  usage: {
    title: "Basic Usage",
    description: "Take screenshots of websites with automatic browser management",
    code: `# Screenshot from stdin
witnessme < file.txt

# Output to specific directory
witnessme -o ./screens < file.txt

# Custom concurrency
witnessme -t 20 < file.txt

# Scan with Nmap XML
witnessme --nmap-xml scan.xml

# Serve report
witnessme serve ./screens`
  },
  commands: [
    { command: "-o", description: "Output directory" },
    { command: "-t", description: "Number of threads" },
    { command: "--nmap-xml", description: "Parse Nmap XML for targets" },
    { command: "serve", description: "Start report server" },
    { command: "--timeout", description: "Request timeout" },
    { command: "--headless", description: "Use headless browser mode" },
    { command: "--proxy", description: "HTTP proxy" },
    { command: "--no-sandbox", description: "Disable Chrome sandbox" }
  ],
  whenToUse: [
    "Automated web recon with screenshot reporting",
    "Penetration test evidence collection",
    "Large-scale target visual assessment",
    "Integrating screenshots into recon pipelines"
  ],
  notes: [
    "Automatically manages Chrome/chromedriver for you",
    "Generates an HTML report with filters and search",
    "Built by @byt3bl33d3r — well-known security tool author"
  ],
  commonErrors: [
    { error: "Chrome driver issues", solution: "Run 'witnessme install' to automatically download ChromeDriver" },
    { error: "Blank screenshots", solution: "Check if the target site requires JavaScript or authentication" }
  ],
  tags: ["screenshot", "visual", "recon", "python"]
}
