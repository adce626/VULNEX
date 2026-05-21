import { ToolGuide } from "@/lib/guide-types"

export const secretfinderGuide: ToolGuide = {
  id: "secretfinder",
  name: "SecretFinder",
  icon: "key",
  category: "Recon & OSINT",
  description: "Find sensitive data in JS files",
  installation: {
    title: "Installation",
    steps: ["Clone the repository", "Install Python dependencies", "Verify installation"],
    code: `# Clone the repository
git clone https://github.com/m4ll0k/SecretFinder.git
cd SecretFinder

# Install dependencies
pip install -r requirements.txt

# Verify
python3 SecretFinder.py -h`
  },
  usage: {
    title: "Basic Usage",
    description: "Search JavaScript files for secrets, API keys, and tokens",
    code: `# Scan a single JS file
python3 SecretFinder.py -i https://example.com/script.js -o cli

# Scan with regex input file
python3 SecretFinder.py -i https://example.com/script.js -o cli -r custom_rules.txt

# Scan with grep-like output
python3 SecretFinder.py -i https://example.com/script.js -o html

# Scan without SSL verification
python3 SecretFinder.py -i https://example.com/script.js -o cli --nossl`
  },
  commands: [
    { command: "-i", description: "Input URL or file" },
    { command: "-o", description: "Output format (cli/html/json)" },
    { command: "-r", description: "Custom regex rules file" },
    { command: "--nossl", description: "Disable SSL verification" },
    { command: "-c", description: "Cookies for authentication" },
    { command: "-g", description: "Google dork search" }
  ],
  whenToUse: [
    "Finding API keys and secrets in JavaScript",
    "Reconnaissance on SPA and web applications",
    "Bug bounty recon for exposed credentials",
    "Security audit of JavaScript assets",
    "Finding hardcoded tokens and passwords"
  ],
  notes: [
    "Uses both regex patterns and entropy analysis",
    "Supports multiple output formats (CLI, HTML, JSON)",
    "Can process local files and remote URLs",
    "Custom regex rules can be added for specific patterns",
    "Designed for bug bounty recon workflows"
  ],
  commonErrors: [
    { error: "ModuleNotFoundError", solution: "Run: pip install -r requirements.txt" },
    { error: "No secrets found", solution: "Try with custom regex rules or different JS files" },
    { error: "SSL certificate error", solution: "Use --nossl flag to disable verification" }
  ],
  tags: ["secret", "js", "finder", "recon", "python"]
}
