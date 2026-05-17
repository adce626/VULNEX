import { ToolGuide } from "@/lib/guide-types"

export const arjunGuide: ToolGuide = {
  id: "arjun",
  name: "Arjun",
  icon: "search",
  category: "Recon & OSINT",
  description: "API parameter discovery tool with smart brute-forcing",
  installation: {
    title: "Installation",
    steps: [
      "Install via pip",
      "Or clone from GitHub",
      "Verify installation"
    ],
    code: `# Using pip
pip install arjun

# Or from GitHub
git clone https://github.com/s0md3v/Arjun
cd Arjun
pip install -r requirements.txt

# Verify
python arjun.py -h`
  },
  usage: {
    title: "Basic Usage",
    description: "Discover hidden API parameters using intelligent brute-forcing",
    code: `# Basic GET parameter discovery
python arjun.py -u https://site.com/endpoint.php

# POST parameter discovery with JSON
python arjun.py -u https://site.com/api -m POST -T "application/json"

# Save results to JSON
python arjun.py -u https://site.com/api -o results.json

# With custom threads
python arjun.py -u https://site.com/api -t 120`
  },
  commands: [
    { command: "-u", description: "Target URL" },
    { command: "-o", description: "Output file path" },
    { command: "-m", description: "HTTP method (GET/POST)" },
    { command: "-T", description: "Content-Type header" },
    { command: "-t", description: "Number of threads" },
    { command: "-d", description: "Raw POST data" },
    { command: "-i", description: "Input from file" },
    { command: "-p", description: "Add persistent parameters" },
    { command: "-q", description: "Quiet mode" },
    { command: "-oA", description: "Save in all formats" }
  ],
  whenToUse: [
    "API parameter discovery",
    "Pre-exploitation reconnaissance",
    "Finding hidden or undocumented parameters",
    "REST API security testing",
    "Bug bounty hunting on APIs"
  ],
  notes: [
    "Does not need parameter wordlists — discovers params automatically",
    "Uses API-specific payloads, not generic brute-force",
    "Supports JSON, form-data, and urlencoded content types",
    "Best for REST APIs rather than HTML forms",
    "Can be combined with ffuf for better coverage",
    "Requires Python 3.6+"
  ],
  commonErrors: [
    {
      error: "ConnectionError / Connection Refused",
      solution: "Ensure the server is running and URL is correct"
    },
    {
      error: "403 Forbidden",
      solution: "Add custom headers or use cookies for authentication"
    },
    {
      error: "ModuleNotFoundError",
      solution: "Install dependencies: pip install -r requirements.txt"
    }
  ],
  tags: ["api", "parameter", "discovery", "brute-force", "recon"]
}
