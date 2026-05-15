export interface NucleiCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const nucleiCategories: NucleiCategory[] = [
  {
    category: "Installation",
    commands: [
      {
        command: "go install -v github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest",
        description: "Install using Go",
      },
      {
        command: "nuclei -update-templates",
        description: "Update all nuclei templates to latest version",
      },
      {
        command: "nuclei -version",
        description: "Verify installation and check version",
      },
      {
        command: "nuclei -ut -v",
        description: "Update templates with verbose output",
      },
    ],
  },
  {
    category: "Basic Scanning",
    commands: [
      {
        command: "nuclei -u https://example.com",
        description: "Basic scan with all templates against a single target",
      },
      {
        command: "nuclei -l urls.txt -o results.txt",
        description: "Scan multiple targets from file and save results",
      },
      {
        command: "nuclei -u https://example.com -silent",
        description: "Silent mode - output only findings",
      },
      {
        command: "nuclei -u https://example.com -json -o results.json",
        description: "JSON output for programmatic processing",
      },
    ],
  },
  {
    category: "Template Filtering",
    commands: [
      {
        command: "nuclei -u https://example.com -t cves/",
        description: "Scan using only CVE templates",
      },
      {
        command: "nuclei -u https://example.com -t vulnerabilities/",
        description: "Scan using vulnerability templates",
      },
      {
        command: "nuclei -u https://example.com -t exposures/ -t misconfiguration/",
        description: "Scan using multiple template categories",
      },
      {
        command: "nuclei -u https://example.com -tags cve,iot",
        description: "Filter templates by tags (e.g., CVE + IoT related)",
      },
      {
        command: "nuclei -u https://example.com -exclude-tags dos",
        description: "Exclude templates with specific tags (e.g., DoS)",
      },
      {
        command: "nuclei -u https://example.com -t cves/2024/",
        description: "Scan with templates from a specific year",
      },
    ],
  },
  {
    category: "Severity Filtering",
    commands: [
      {
        command: "nuclei -u https://example.com -s critical,high",
        description: "Show only critical and high severity findings",
      },
      {
        command: "nuclei -u https://example.com -s medium",
        description: "Show only medium severity findings",
      },
      {
        command: "nuclei -u https://example.com -s low,info",
        description: "Show low and informational findings",
      },
      {
        command: "nuclei -u https://example.com -severity critical,high,medium",
        description: "Alternative severity filter syntax",
      },
    ],
  },
  {
    category: "Custom Templates",
    commands: [
      {
        command: "nuclei -u https://example.com -t my-custom-template.yaml",
        description: "Run a single custom template",
      },
      {
        command: "nuclei -u https://example.com -t custom-templates/",
        description: "Run all templates from a custom directory",
      },
      {
        command: "nuclei -u https://example.com -w workflows/",
        description: "Run workflow files (multi-step templates)",
      },
      {
        command: "nuclei -u https://example.com -t cves/ -w my-workflow.yaml",
        description: "Combine templates and workflows",
      },
    ],
  },
  {
    category: "Rate & Performance",
    commands: [
      {
        command: "nuclei -u https://example.com -rate-limit 50",
        description: "Limit to 50 requests per second",
      },
      {
        command: "nuclei -u https://example.com -c 10",
        description: "Run 10 templates concurrently",
      },
      {
        command: "nuclei -u https://example.com -bulk-size 25",
        description: "Number of targets to process in parallel",
      },
      {
        command: "nuclei -u https://example.com -timeout 10",
        description: "Set request timeout in seconds",
      },
      {
        command: "nuclei -u https://example.com -retries 2",
        description: "Retry failed requests up to 2 times",
      },
      {
        command: "nuclei -u https://example.com -max-host-error 5",
        description: "Skip host after 5 consecutive errors",
      },
    ],
  },
  {
    category: "Output & Reporting",
    commands: [
      {
        command: "nuclei -u https://example.com -o report.txt",
        description: "Save findings to text file",
      },
      {
        command: "nuclei -u https://example.com -json -o findings.json",
        description: "Save findings in JSON format",
      },
      {
        command: "nuclei -u https://example.com -me markdown-report/",
        description: "Generate markdown report in a directory",
      },
      {
        command: "nuclei -u https://example.com -jira -jira-user user -jira-pass pass",
        description: "Send findings directly to Jira",
      },
      {
        command: "nuclei -u https://example.com -si slack-webhook-url",
        description: "Send findings to Slack webhook",
      },
      {
        command: "nuclei -u https://example.com -stats -sj",
        description: "Show real-time scan statistics with JSON output",
      },
    ],
  },
  {
    category: "Advanced Scanning",
    commands: [
      {
        command: "nuclei -u https://example.com -headless",
        description: "Use headless browser for JavaScript-heavy targets",
      },
      {
        command: "nuclei -u https://example.com -v -debug",
        description: "Verbose debug mode for troubleshooting",
      },
      {
        command: "nuclei -u https://example.com -proxy http://127.0.0.1:8080",
        description: "Route traffic through Burp Suite proxy",
      },
      {
        command: "nuclei -u https://example.com -H \"X-Custom: value\"",
        description: "Add custom headers to all requests",
      },
      {
        command: "nuclei -u https://example.com -var \"THREAD=5\"",
        description: "Pass variables to templates",
      },
      {
        command: "nuclei -u https://example.com -auth-url http://example.com/login -auth-form-data 'user=admin&pass=pass'",
        description: "Authenticated scanning with form-based login",
      },
    ],
  },
  {
    category: "Pipeline Integration",
    commands: [
      {
        command: "subfinder -d example.com -silent | httpx -silent | nuclei -t cves/ -o cves.txt",
        description: "Full recon-to-vuln pipeline",
      },
      {
        command: "cat urls.txt | nuclei -t exposures/ -json | jq '.info.name'",
        description: "Extract finding names from JSON output",
      },
      {
        command: "nuclei -u https://example.com -t cves/ -json | jq -r '.matched-at'",
        description: "Extract matched URLs from results",
      },
    ],
  },
  {
    category: "Quick Reference",
    commands: [
      {
        command: "-u = Target URL",
        description: "Single target URL to scan",
      },
      {
        command: "-l = Target list file",
        description: "File containing list of target URLs",
      },
      {
        command: "-t = Template path",
        description: "Template file, directory, or URL",
      },
      {
        command: "-s = Severity filter",
        description: "Filter by severity: info, low, medium, high, critical",
      },
      {
        command: "-tags = Template tags",
        description: "Filter templates by comma-separated tags",
      },
      {
        command: "-rate-limit = Request rate",
        description: "Maximum requests per second",
      },
      {
        command: "-json = JSON output",
        description: "Output results in JSON lines format",
      },
      {
        command: "-headless = Headless mode",
        description: "Use headless browser for JS execution",
      },
      {
        command: "-proxy = Proxy URL",
        description: "Use HTTP/HTTPS proxy",
      },
      {
        command: "-v = Verbose",
        description: "Show verbose output",
      },
    ],
  },
]

export const nucleiTools = [
  {
    name: "Nuclei GitHub",
    url: "https://github.com/projectdiscovery/nuclei",
    description: "Official repository with documentation and releases",
  },
  {
    name: "Nuclei Templates",
    url: "https://github.com/projectdiscovery/nuclei-templates",
    description: "Community-contributed template repository",
  },
  {
    name: "ProjectDiscovery",
    url: "https://projectdiscovery.io",
    description: "Nuclei is part of the ProjectDiscovery suite",
  },
  {
    name: "PDM - Template Playground",
    url: "https://playground.projectdiscovery.io",
    description: "Online playground for testing nuclei templates",
  },
  {
    name: "Templating Guide",
    url: "https://docs.projectdiscovery.io/templates/introduction",
    description: "Official documentation for writing custom templates",
  },
]
