import { ToolGuide } from "@/lib/guide-types"

export const theHarvesterGuide: ToolGuide = {
  id: "theharvester",
  name: "theHarvester",
  icon: "search",
  category: "Recon & OSINT",
  description:
    "theHarvester is a passive OSINT and reconnaissance tool designed to gather emails, subdomains, IP addresses, and URLs from publicly available sources. It is commonly used in the early stages of penetration testing and security assessments to map an organization's external footprint.",
  installation: {
    title: "Installation",
    steps: [
      "Install via APT (Kali/Debian): sudo apt update && sudo apt install theharvester",
      "Install via Homebrew (macOS): brew install theharvester",
      "Install via pip (any platform): pip install theHarvester",
      "Clone from GitHub: git clone https://github.com/laramies/theHarvester.git && cd theHarvester && pip install -r requirements.txt",
    ],
    code: "sudo apt install theharvester",
  },
  usage: {
    title: "Basic Usage",
    description:
      "theHarvester queries public search engines and APIs to collect information about a target domain. Common searches include email addresses, subdomains, and IP ranges.",
    code: "theHarvester -d example.com -b google",
  },
  commands: [
    {
      command: "theHarvester -d <domain> -b <source>",
      description: "Run a basic search against a specific domain using a single data source",
    },
    {
      command: "theHarvester -d <domain> -b all",
      description: "Search all available data sources for the target domain",
    },
    {
      command: "theHarvester -d <domain> -b google -l 500",
      description: "Limit the number of search results returned (default: 500)",
    },
    {
      command: "theHarvester -d <domain> -b linkedin",
      description: "Search LinkedIn to find employee names and email addresses",
    },
    {
      command: "theHarvester -d <domain> -b baidu -f results.html",
      description: "Output results to an HTML file",
    },
    {
      command: "theHarvester -d <domain> -b yahoo -s",
      description: "Enable strict mode to only return verified results",
    },
    {
      command: "theHarvester -d <domain> -b bing -v",
      description: "Run in verbose mode for detailed output",
    },
    {
      command: "theHarvester -h",
      description: "Display the help menu with all available options",
    },
    {
      command: "theHarvester -d <domain> -b dns -l 200 -f output.xml",
      description: "Use DNS brute force to discover subdomains and save results to XML",
    },
    {
      command: "theHarvester -d <domain> -b yandex -e 8.8.8.8",
      description: "Use a custom DNS server for resolution during the search",
    },
    {
      command: "theHarvester -d <domain> -b google -n",
      description: "Show only discovered subdomains in the output",
    },
    {
      command: "theHarvester -d <domain> -b certspotter -t 60",
      description: "Set a custom request timeout in seconds",
    },
  ],
  whenToUse: [
    "During the reconnaissance phase of a penetration test to gather target emails and subdomains",
    "When performing OSINT investigations to map an organization's internet-facing infrastructure",
    "To discover employees and email formats for social engineering campaigns",
    "To identify expired or unmonitored subdomains that could be vulnerable to takeover",
    "As a quick passive check before running more aggressive scanning tools",
  ],
  notes: [
    "theHarvester only performs passive reconnaissance and does not directly interact with the target systems.",
    "Some search engines (like Google) may rate-limit or block requests if too many queries are sent in a short period.",
    "Results quality depends heavily on the data source chosen — use multiple sources for a complete picture.",
    "Always ensure you have proper authorization before using theHarvester against any domain you do not own.",
  ],
  commonErrors: [
    {
      error: "No results found for the specified source",
      solution:
        "The search engine or API may not have indexed data for the target domain. Try switching to a different source (-b bing, -b yahoo, -b dns) or use -b all.",
    },
    {
      error: "API key required for source",
      solution:
        "Some sources (e.g., Shodan, Hunter, SecurityTrails) require an API key. Set the corresponding environment variable or add the key in the config file at ~/theHarvester/api-keys.yaml.",
    },
    {
      error: "theHarvester: command not found",
      solution:
        "theHarvester is not in your PATH. Install it via your package manager or run it directly from the cloned directory with python theHarvester.py.",
    },
  ],
  tags: ["osint", "recon", "email", "subdomain", "python"],
}
