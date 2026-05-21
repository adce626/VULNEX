import { ToolGuide } from "@/lib/guide-types"

export const maigretGuide: ToolGuide = {
  id: "maigret",
  name: "Maigret",
  icon: "search",
  category: "Recon & OSINT",
  description: "Collect a dossier on a person by searching usernames across thousands of sites",
  installation: {
    title: "Installation",
    steps: ["Install using pip", "Clone from GitHub", "Verify installation"],
    code: `# Using pip
pip install maigret

# From source
git clone https://github.com/soxoj/maigret.git
cd maigret
pip install -r requirements.txt

# Verify
maigret --help`
  },
  usage: {
    title: "Basic Usage",
    description: "Search for a username across thousands of websites",
    code: `# Search single username
maigret username

# Save HTML report
maigret username --html report.html

# Search with all sites
maigret username --all

# Input from file
maigret --usernames-file users.txt

# With timeout and retries
maigret username --timeout 10 --retries 2`
  },
  commands: [
    { command: "--html", description: "Save results as HTML report" },
    { command: "--all", description: "Use all available sites" },
    { command: "--timeout", description: "Request timeout in seconds" },
    { command: "--retries", description: "Number of retries on failure" },
    { command: "--usernames-file", description: "Input file with usernames" },
    { command: "--pdf", description: "Export results as PDF" },
    { command: "--csv", description: "Export results as CSV" },
    { command: "--top-sites", description: "Use only top N sites" },
    { command: "--no-recursion", description: "Disable recursive search" },
    { command: "--json", description: "JSON output format" }
  ],
  whenToUse: [
    "OSINT investigations and reconnaissance",
    "Social media account discovery",
    "Finding all profiles of a target username",
    "Digital footprint analysis",
    "Threat intelligence gathering"
  ],
  notes: [
    "Checks 2500+ websites for username presence",
    "Generates detailed HTML reports with screenshots",
    "Supports recursive search for related usernames",
    "Can be used offline with a local site list",
    "Regularly updated with new site support"
  ],
  commonErrors: [
    { error: "Too many requests / rate limiting", solution: "Reduce concurrency or add delays between requests" },
    { error: "No results found", solution: "Try with --all flag to include all sites, or check username spelling" },
    { error: "Connection timeout", solution: "Increase timeout with --timeout and check your internet connection" }
  ],
  tags: ["osint", "username", "social", "recon", "investigation"]
}
