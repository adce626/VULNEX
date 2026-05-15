export interface AmassCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const amassCategories: AmassCategory[] = [
  {
    category: "Installation",
    commands: [
      {
        command: "go install -v github.com/owasp-amass/amass/v4/...@master",
        description: "Install using Go (latest version)",
      },
      {
        command: "brew install amass",
        description: "Install on macOS via Homebrew",
      },
      {
        command: "sudo apt install amass",
        description: "Install on Kali/Debian via apt",
      },
      {
        command: "amass -version",
        description: "Verify installation",
      },
    ],
  },
  {
    category: "Passive Enumeration",
    commands: [
      {
        command: "amass enum -passive -d example.com",
        description: "Passive subdomain enumeration (no direct interaction)",
      },
      {
        command: "amass enum -passive -d example.com -o subs.txt",
        description: "Passive enum with output file",
      },
      {
        command: "amass enum -passive -d example.com -json results.json",
        description: "JSON output for programmatic processing",
      },
      {
        command: "amass enum -passive -df domains.txt -o all_subs.txt",
        description: "Enumerate multiple domains from file",
      },
    ],
  },
  {
    category: "Active Enumeration",
    commands: [
      {
        command: "amass enum -active -d example.com -p 80,443,8080",
        description: "Active enumeration with port probing",
      },
      {
        command: "amass enum -active -d example.com -p 443 -o active.txt",
        description: "Active scan on specific port",
      },
      {
        command: "amass enum -active -d example.com -ip",
        description: "Show resolved IP addresses",
      },
      {
        command: "amass enum -active -d example.com -ip -oA results",
        description: "Save in all formats (text, JSON, etc.)",
      },
    ],
  },
  {
    category: "Brute Force",
    commands: [
      {
        command: "amass enum -brute -d example.com -w wordlist.txt",
        description: "Brute force subdomains with custom wordlist",
      },
      {
        command: "amass enum -brute -d example.com -w /usr/share/wordlists/seclists/Discovery/DNS/subdomains-top1million-5000.txt",
        description: "Brute force with SecLists wordlist",
      },
      {
        command: "amass enum -brute -d example.com -min-for-recursive 3",
        description: "Enable recursive brute force when 3+ subdomains found",
      },
    ],
  },
  {
    category: "Intel Gathering",
    commands: [
      {
        command: "amass intel -whois -d example.com",
        description: "Gather WHOIS intelligence on domain",
      },
      {
        command: "amass intel -asn 12345",
        description: "Find all domains associated with an ASN",
      },
      {
        command: "amass intel -org \"Target Company\"",
        description: "Find domains by organization name",
      },
      {
        command: "amass intel -whois -d example.com -o intel.txt",
        description: "Save intel results to file",
      },
    ],
  },
  {
    category: "Visualization",
    commands: [
      {
        command: "amass viz -d example.com -o viz_output",
        description: "Generate HTML visualization of enumeration results",
      },
      {
        command: "amass viz -d example.com -maltego -o maltego_export",
        description: "Export data for Maltego graph analysis",
      },
      {
        command: "amass viz -enum -d3",
        description: "D3.js interactive visualization",
      },
    ],
  },
  {
    category: "Database & Tracking",
    commands: [
      {
        command: "amass db -show -d example.com",
        description: "Show enumeration results stored in database",
      },
      {
        command: "amass db -names -d example.com",
        description: "List unique subdomains in database",
      },
      {
        command: "amass db -stats -d example.com",
        description: "Show enumeration statistics from database",
      },
      {
        command: "amass -oA enum1 amass enum -passive -d example.com",
        description: "Named enumeration with tagged output",
      },
    ],
  },
  {
    category: "Configuration",
    commands: [
      {
        command: "amass enum -config config.ini -d example.com",
        description: "Use custom configuration file",
      },
      {
        command: "amass enum -d example.com -include-dir /custom/dir",
        description: "Include custom data directory",
      },
      {
        command: "amass enum -d example.com -max-dns-queries 5000",
        description: "Limit total DNS queries",
      },
    ],
  },
  {
    category: "Quick Reference",
    commands: [
      {
        command: "enum = Enumerate subdomains",
        description: "Perform subdomain enumeration",
      },
      {
        command: "intel = Gather intelligence",
        description: "Collect open-source intelligence on targets",
      },
      {
        command: "db = Database operations",
        description: "Query and manage enumerated data",
      },
      {
        command: "viz = Visualization",
        description: "Generate visual representations of data",
      },
      {
        command: "-passive = Passive mode",
        description: "No direct interaction with target infrastructure",
      },
      {
        command: "-active = Active mode",
        description: "Interact with target infrastructure",
      },
      {
        command: "-brute = Brute force mode",
        description: "Attempt subdomain guessing with wordlist",
      },
      {
        command: "-ip = Show IPs",
        description: "Display resolved IP addresses",
      },
    ],
  },
]

export const amassTools = [
  {
    name: "Amass GitHub",
    url: "https://github.com/owasp-amass/amass",
    description: "Official OWASP Amass repository with documentation",
  },
  {
    name: "OWASP Amass Project",
    url: "https://owasp.org/www-project-amass/",
    description: "OWASP project page with background information",
  },
  {
    name: "SecLists",
    url: "https://github.com/danielmiessler/SecLists",
    description: "Wordlists for brute force enumeration",
  },
  {
    name: "Maltego",
    url: "https://www.maltego.com/",
    description: "Graph-based link analysis tool compatible with Amass exports",
  },
]
