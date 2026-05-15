export interface HttpxCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const httpxCategories: HttpxCategory[] = [
  {
    category: "Installation",
    commands: [
      {
        command: "go install -v github.com/projectdiscovery/httpx/cmd/httpx@latest",
        description: "Install using Go",
      },
      {
        command: "docker pull projectdiscovery/httpx:latest",
        description: "Pull Docker image",
      },
      {
        command: "httpx -version",
        description: "Verify installation",
      },
    ],
  },
  {
    category: "Basic Probing",
    commands: [
      {
        command: "cat subdomains.txt | httpx",
        description: "Basic probe - check which hosts are alive (HTTP 200)",
      },
      {
        command: "httpx -l hosts.txt -o alive.txt",
        description: "Probe hosts from file and save alive ones",
      },
      {
        command: "cat subs.txt | httpx -silent",
        description: "Silent mode - output only URLs",
      },
      {
        command: "echo \"https://example.com\" | httpx",
        description: "Probe a single target",
      },
    ],
  },
  {
    category: "Response Details",
    commands: [
      {
        command: "cat hosts.txt | httpx -status-code -title -tech-detect",
        description: "Show status codes, page titles, and detected technologies",
      },
      {
        command: "cat hosts.txt | httpx -status-code -title -web-server",
        description: "Show status codes, titles, and web server software",
      },
      {
        command: "cat hosts.txt | httpx -status-code -content-type -content-length",
        description: "Show content-type and content-length headers",
      },
      {
        command: "cat hosts.txt | httpx -location",
        description: "Show redirect location headers",
      },
    ],
  },
  {
    category: "Technology Detection",
    commands: [
      {
        command: "cat urls.txt | httpx -tech-detect -json",
        description: "Detect technologies with JSON output for analysis",
      },
      {
        command: "cat urls.txt | httpx -tech-detect -web-server -status-code",
        description: "Comprehensive tech + server + status overview",
      },
      {
        command: "httpx -l urls.txt -tech-detect -o tech-report.txt",
        description: "Save technology detection results to file",
      },
    ],
  },
  {
    category: "Screenshots",
    commands: [
      {
        command: "cat urls.txt | httpx -screenshot",
        description: "Take screenshots of all live URLs",
      },
      {
        command: "cat urls.txt | httpx -screenshot -srd screenshots/",
        description: "Save screenshots to custom directory",
      },
      {
        command: "httpx -l urls.txt -screenshot -system-chrome",
        description: "Use system Chrome for better rendering",
      },
    ],
  },
  {
    category: "Filtering & Matching",
    commands: [
      {
        command: "cat hosts.txt | httpx -mc 200",
        description: "Only show hosts returning 200 OK",
      },
      {
        command: "cat hosts.txt | httpx -fc 404,403",
        description: "Filter out hosts returning 404 or 403",
      },
      {
        command: "cat hosts.txt | httpx -title -ms \"Login\"",
        description: "Show only pages with \"Login\" in the title",
      },
      {
        command: "cat hosts.txt | httpx -title -fs \"403 Forbidden\"",
        description: "Filter out pages containing \"403 Forbidden\"",
      },
      {
        command: "cat hosts.txt | httpx -probe -path /admin",
        description: "Probe specific path on each host",
      },
    ],
  },
  {
    category: "Advanced Features",
    commands: [
      {
        command: "cat hosts.txt | httpx -json -o results.json",
        description: "Full JSON output with all metadata",
      },
      {
        command: "cat hosts.txt | httpx -cdn -cdn-cache",
        description: "Check if host is behind CDN and cache results",
      },
      {
        command: "cat hosts.txt | httpx -ports 80,443,8080,8443",
        description: "Probe multiple ports on each host",
      },
      {
        command: "cat hosts.txt | httpx -threads 100",
        description: "Use 100 concurrent threads for fast probing",
      },
      {
        command: "cat hosts.txt | httpx -timeout 10",
        description: "Set request timeout to 10 seconds",
      },
      {
        command: "cat hosts.txt | httpx -retries 2",
        description: "Retry failed requests up to 2 times",
      },
    ],
  },
  {
    category: "Pipeline Integration",
    commands: [
      {
        command: "subfinder -d example.com -silent | httpx -silent | nuclei -t cves/",
        description: "Full pipeline: subfinder -> httpx -> nuclei",
      },
      {
        command: "cat subs.txt | httpx -status-code -title -tech-detect | grep -v \"404\"",
        description: "Live probing with grep filtering",
      },
      {
        command: "httpx -l urls.txt -json | jq '. | select(.tech != null)'",
        description: "Filter JSON output to show only hosts with detected tech",
      },
    ],
  },
  {
    category: "Quick Reference",
    commands: [
      {
        command: "-l = Input file",
        description: "File containing list of hosts/URLs to probe",
      },
      {
        command: "-status-code = Show HTTP status",
        description: "Display HTTP status code for each host",
      },
      {
        command: "-title = Show page title",
        description: "Display HTML title tag content",
      },
      {
        command: "-tech-detect = Detect technologies",
        description: "Identify web frameworks, CMS, libraries",
      },
      {
        command: "-screenshot = Take screenshots",
        description: "Capture visual screenshots of pages",
      },
      {
        command: "-mc/-fc = Match/Filter codes",
        description: "Include or exclude by status code",
      },
      {
        command: "-json = JSON output",
        description: "Output results in JSON format",
      },
      {
        command: "-threads = Concurrency",
        description: "Number of concurrent requests",
      },
      {
        command: "-timeout = Request timeout",
        description: "Seconds to wait before timeout",
      },
      {
        command: "-ports = Custom ports",
        description: "Comma-separated list of ports to probe",
      },
    ],
  },
]

export const httpxTools = [
  {
    name: "httpx GitHub",
    url: "https://github.com/projectdiscovery/httpx",
    description: "Official repository with documentation and releases",
  },
  {
    name: "ProjectDiscovery",
    url: "https://projectdiscovery.io",
    description: "httpx is part of the ProjectDiscovery suite",
  },
  {
    name: "Subfinder",
    url: "https://github.com/projectdiscovery/subfinder",
    description: "Use with subfinder for complete recon workflow",
  },
  {
    name: "Nuclei",
    url: "https://github.com/projectdiscovery/nuclei",
    description: "Feed httpx results into nuclei for vulnerability scanning",
  },
]
