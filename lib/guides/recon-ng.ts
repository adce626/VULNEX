import { ToolGuide } from "@/lib/guide-types"

export const reconngGuide: ToolGuide = {
  id: "recon-ng",
  name: "recon-ng",
  icon: "globe",
  category: "Recon & OSINT",
  description: "Full-featured reconnaissance framework with modular architecture",
  installation: {
    title: "Installation",
    steps: ["Clone the repository", "Install dependencies", "Verify installation"],
    code: `git clone https://github.com/lanmaster53/recon-ng.git
cd recon-ng
pip install -r REQUIREMENTS

# Verify
python3 recon-ng --help`
  },
  usage: {
    title: "Basic Usage",
    description: "Modular reconnaissance framework for OSINT gathering",
    code: `# Start recon-ng
python3 recon-ng

# Inside the interactive shell:
# Install modules
marketplace install all

# Search for modules
marketplace search whois

# Load a module
modules load recon/domains-hosts/google_site_web

# Run with current workspace
run

# Show available modules
modules search`
  },
  commands: [
    { command: "marketplace install", description: "Install modules from the marketplace" },
    { command: "modules load", description: "Load a specific module" },
    { command: "run", description: "Execute the loaded module" },
    { command: "workspaces", description: "Manage workspaces" },
    { command: "keys", description: "Manage API keys for modules" }
  ],
  whenToUse: [
    "Comprehensive reconnaissance and OSINT gathering",
    "Domain and host enumeration",
    "Contact and credential discovery",
    "Geolocation and social media intelligence"
  ],
  notes: [
    "Modular framework with hundreds of community modules",
    "Requires API keys for some modules",
    "Results are stored in a workspace database for analysis"
  ],
  commonErrors: [
    { error: "Module not installed", solution: "Use 'marketplace install <module>' to install it first" },
    { error: "API key required", solution: "Use 'keys add <service> <key>' to configure API keys" }
  ],
  tags: ["recon", "framework", "osint", "python"]
}
