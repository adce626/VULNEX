export interface SubfinderCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const subfinderCategories: SubfinderCategory[] = [
  {
    category: "Installation",
    commands: [
      {
        command: "go install -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest",
        description: "Install using Go (requires Go 1.21+)",
      },
      {
        command: "subfinder -version",
        description: "Verify installation",
      },
    ],
  },
  {
    category: "Basic Enumeration",
    commands: [
      {
        command: "subfinder -d example.com",
        description: "Basic subdomain enumeration for a single domain",
      },
      {
        command: "subfinder -d example.com -o subdomains.txt",
        description: "Save results to a file",
      },
      {
        command: "subfinder -d example.com -silent",
        description: "Silent mode - output only subdomains (no banners)",
      },
      {
        command: "subfinder -d example.com -oJ",
        description: "JSON output format for programmatic use",
      },
    ],
  },
  {
    category: "Multiple Domains",
    commands: [
      {
        command: "subfinder -dL domains.txt -o results.txt",
        description: "Enumerate subdomains for multiple domains from a file",
      },
      {
        command: "subfinder -d example.com -all",
        description: "Use all sources (slow but thorough)",
      },
      {
        command: "subfinder -d example.com -recursive",
        description: "Enable recursive enumeration (find subdomains of subdomains)",
      },
      {
        command: "subfinder -d example.com -list-sources",
        description: "List all available data sources",
      },
    ],
  },
  {
    category: "Source Selection",
    commands: [
      {
        command: "subfinder -d example.com -sources alienvault,securitytrails",
        description: "Use specific sources only",
      },
      {
        command: "subfinder -d example.com -exclude-sources crtsh",
        description: "Exclude specific sources",
      },
      {
        command: "subfinder -d example.com -use-all=false -sources virustotal",
        description: "Use only VirusTotal as source",
      },
    ],
  },
  {
    category: "Output Formats",
    commands: [
      {
        command: "subfinder -d example.com -o results.txt",
        description: "Text output (one subdomain per line)",
      },
      {
        command: "subfinder -d example.com -oJ -o results.json",
        description: "JSON output with metadata",
      },
      {
        command: "subfinder -d example.com -o results.txt -cs",
        description: "Output with color support",
      },
      {
        command: "subfinder -d example.com -nW",
        description: "Remove wildcard subdomains from results",
      },
    ],
  },
  {
    category: "Performance Tuning",
    commands: [
      {
        command: "subfinder -d example.com -t 100",
        description: "Set number of concurrent threads (default: 10)",
      },
      {
        command: "subfinder -d example.com -rl 100",
        description: "Set rate limit (requests per minute)",
      },
      {
        command: "subfinder -d example.com -timeout 30",
        description: "Set HTTP request timeout in seconds",
      },
      {
        command: "subfinder -d example.com -max-time 120",
        description: "Set maximum execution time in seconds",
      },
    ],
  },
  {
    category: "Pipeline Integration",
    commands: [
      {
        command: "subfinder -d example.com -silent | httpx -silent | nuclei -t cves/",
        description: "Full recon pipeline: subfinder -> httpx -> nuclei",
      },
      {
        command: "subfinder -d example.com -silent | httpx -title -tech-detect -status-code",
        description: "Find live hosts with tech detection",
      },
      {
        command: "subfinder -d example.com -o subs.txt && httpx -l subs.txt -o live.txt",
        description: "Two-step: enumerate then probe",
      },
    ],
  },
  {
    category: "Quick Reference",
    commands: [
      {
        command: "-d = Target domain",
        description: "Domain to enumerate subdomains for",
      },
      {
        command: "-dL = Domain list file",
        description: "File containing multiple domains to enumerate",
      },
      {
        command: "-o = Output file",
        description: "Write results to file",
      },
      {
        command: "-oJ = JSON output",
        description: "Output results in JSON format",
      },
      {
        command: "-silent = Quiet mode",
        description: "Show only subdomains, no extra output",
      },
      {
        command: "-sources = Source list",
        description: "Comma-separated list of sources to use",
      },
      {
        command: "-recursive = Recursive mode",
        description: "Perform recursive subdomain discovery",
      },
      {
        command: "-t = Thread count",
        description: "Number of concurrent goroutines",
      },
      {
        command: "-nW = Remove wildcards",
        description: "Filter out wildcard subdomains",
      },
    ],
  },
]

export const subfinderTools = [
  {
    name: "Subfinder GitHub",
    url: "https://github.com/projectdiscovery/subfinder",
    description: "Official repository with documentation and releases",
  },
  {
    name: "ProjectDiscovery",
    url: "https://projectdiscovery.io",
    description: "Subfinder is part of the ProjectDiscovery suite",
  },
  {
    name: "Httpx",
    url: "https://github.com/projectdiscovery/httpx",
    description: "Pair with httpx for live host probing",
  },
  {
    name: "Chaos ProjectDiscovery",
    url: "https://chaos.projectdiscovery.io",
    description: "Community-driven DNS dataset for subdomain discovery",
  },
]
