import { ToolGuide } from "@/lib/guide-types"

export const eyewitnessGuide: ToolGuide = {
  id: "eyewitness",
  name: "EyeWitness",
  icon: "shield",
  category: "Recon & OSINT",
  description: "Take screenshots of web applications, desktops, and network services at scale",
  installation: {
    title: "Installation",
    steps: ["Clone repository", "Run setup script", "Verify installation"],
    code: `# Clone the repository
git clone https://github.com/FortyNorthSecurity/EyeWitness.git
cd EyeWitness

# Run setup (Linux)
cd Python/setup
./setup.sh

# Run
python3 EyeWitness.py -h`
  },
  usage: {
    title: "Basic Usage",
    description: "Screenshot web applications from a list of URLs",
    code: `# Screenshot from URL list
python3 EyeWitness.py -f urls.txt --web

# Single URL
python3 EyeWitness.py --single https://example.com

# Screenshot with Nmap input
python3 EyeWitness.py -x nmap.xml --web

# Use specific browser
python3 EyeWitness.py -f urls.txt --web --timeout 30`
  },
  commands: [
    { command: "-f", description: "File containing URLs" },
    { command: "-x", description: "Nmap XML file input" },
    { command: "--single", description: "Single URL screenshot" },
    { command: "--web", description: "Web protocol mode (HTTP/HTTPS)" },
    { command: "--timeout", description: "Page load timeout in seconds" },
    { command: "--max-retries", description: "Maximum retry attempts" },
    { command: "--user-agent", description: "Custom User-Agent string" },
    { command: "--proxy", description: "HTTP proxy for requests" },
    { command: "-d", description: "Output directory" }
  ],
  whenToUse: [
    "Pentest engagement visual documentation",
    "Large-scale web application recon",
    "Identifying interesting web servers from port scans",
    "Client-side assessment reporting"
  ],
  notes: [
    "Supports multiple protocols: HTTP, HTTPS, RDP, VNC",
    "Generates a comprehensive HTML report",
    "Can use Firefox, Chrome, or headless browsers",
    "Includes a built-in web server for report viewing"
  ],
  commonErrors: [
    { error: "Browser not found", solution: "Install Firefox or Chrome and run the setup script again" },
    { error: "Timeouts on slow sites", solution: "Increase --timeout value for slow-loading pages" }
  ],
  tags: ["screenshot", "visual", "recon", "python"]
}
