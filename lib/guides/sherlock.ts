import { ToolGuide } from "@/lib/guide-types"

export const sherlockGuide: ToolGuide = {
  id: "sherlock",
  name: "Sherlock",
  icon: "search",
  category: "Recon & OSINT",
  description: "Search for usernames across hundreds of social networks and websites",
  installation: {
    title: "Installation",
    steps: [
      "Install using pip",
      "Or install from source via git clone",
      "Or install via apt (Kali/Parrot)"
    ],
    code: `# Using pip
pip install sherlock-project

# Using git clone (latest)
git clone https://github.com/sherlock-project/sherlock.git
cd sherlock
pip install -r requirements.txt

# Using apt (Kali Linux)
sudo apt install sherlock`
  },
  usage: {
    title: "Basic Usage",
    description: "Search for usernames across hundreds of social networks",
    code: `# Search a single username
sherlock username

# Search multiple usernames
sherlock user1 user2 user3

# Output results as CSV
sherlock username --csv

# Output results as TXT
sherlock username --txt

# Use Tor proxy for anonymity
sherlock username --proxy socks5://127.0.0.1:9050

# Search only specific sites
sherlock username --site github twitter

# Include NSFW sites
sherlock username --nsfw

# Increase timeout for slow responses
sherlock username --timeout 30`
  },
  commands: [
    { command: "sherlock <username>", description: "Search for a single username" },
    { command: "--output", description: "Save results to a file" },
    { command: "--csv", description: "Export results in CSV format" },
    { command: "--timeout", description: "Set request timeout (seconds)" },
    { command: "--proxy", description: "Use a proxy (HTTP/SOCKS)" },
    { command: "--site", description: "Limit search to specific sites" },
    { command: "--nsfw", description: "Include NSFW sites in search" },
    { command: "--txt", description: "Export results as plain text" },
    { command: "--all", description: "Show all results (no filtering)" },
    { command: "-h, --help", description: "Display help and usage info" }
  ],
  whenToUse: [
    "Checking username availability across platforms",
    "Investigating a person's online presence",
    "Social media account discovery during OSINT",
    "Finding unused usernames for personal branding",
    "Mapping a target's digital footprint"
  ],
  notes: [
    "Some sites may rate-limit or block automated requests",
    "Use Tor or a VPN to avoid IP-based blocking",
    "Sherlock relies on public profile pages — false negatives can occur",
    "Results depend on site availability and response times"
  ],
  commonErrors: [
    {
      error: "Connection refused / timeout on many sites",
      solution: "Increase timeout with --timeout 30 or use a proxy"
    },
    {
      error: "Too many requests — getting blocked",
      solution: "Use --proxy with Tor (socks5://127.0.0.1:9050) to rotate IPs"
    },
    {
      error: "ModuleNotFoundError: No module named 'sherlock'",
      solution: "Ensure dependencies are installed: pip install -r requirements.txt"
    }
  ],
  tags: ["osint", "username", "social", "recon", "python"]
}
