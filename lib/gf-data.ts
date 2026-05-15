export interface GfCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const gfCategories: GfCategory[] = [
  {
    category: "Installation & Setup",
    commands: [
      {
        command: "go install github.com/tomnomnom/gf@latest",
        description: "Install gf via Go",
      },
      {
        command: "echo 'export PATH=$PATH:~/go/bin' >> ~/.bashrc && source ~/.bashrc",
        description: "Add Go binaries to PATH",
      },
      {
        command: "git clone https://github.com/1ndianl33t/Gf-Patterns.git && mv Gf-Patterns/*.json ~/.gf/",
        description: "Install community-contributed pattern collection",
      },
      {
        command: "gf -list",
        description: "Verify installation — list all available patterns",
      },
    ],
  },
  {
    category: "Built-in Vulnerability Patterns",
    commands: [
      {
        command: "cat urls.txt | gf xss > xss_urls.txt",
        description: "#1 Filter URLs potentially vulnerable to Cross-Site Scripting",
      },
      {
        command: "cat urls.txt | gf ssrf > ssrf_urls.txt",
        description: "#2 Filter URLs potentially vulnerable to SSRF",
      },
      {
        command: "cat urls.txt | gf sqli > sqli_urls.txt",
        description: "#3 Filter URLs potentially vulnerable to SQL Injection",
      },
      {
        command: "cat urls.txt | gf redirect > redirect_urls.txt",
        description: "#4 Filter URLs with open redirect potential",
      },
      {
        command: "cat urls.txt | gf idor > idor_urls.txt",
        description: "#5 Filter URLs with potential Insecure Direct Object References",
      },
    ],
  },
  {
    category: "Advanced Pattern Filtering",
    commands: [
      {
        command: "cat urls.txt | gf lfi > lfi_urls.txt",
        description: "#1 Filter URLs with potential Local File Inclusion",
      },
      {
        command: "cat urls.txt | gf rce > rce_urls.txt",
        description: "#2 Filter URLs with potential Remote Code Execution",
      },
      {
        command: "cat urls.txt | gf debug-pages > debug.txt",
        description: "#3 Filter URLs matching debug page patterns",
      },
      {
        command: "cat urls.txt | gf s3-buckets > s3.txt",
        description: "#4 Filter URLs referencing AWS S3 buckets",
      },
      {
        command: "cat urls.txt | gf takeovers > takeover.txt",
        description: "#5 Filter URLs with potential subdomain takeover",
      },
    ],
  },
  {
    category: "Combined Filters & Piping",
    commands: [
      {
        command: "cat urls.txt | gf xss,ssrf,sqli,redirect > all_vulns.txt",
        description: "#1 Combine multiple vulnerability filters in one pass",
      },
      {
        command: "cat urls.txt | gf xss | httpx -mc 200 -o live_xss.txt",
        description: "#2 Filter XSS URLs then probe for live hosts",
      },
      {
        command: "cat urls.txt | gf ssrf | sort -u | tee ssrf_unique.txt",
        description: "#3 Filter SSRF URLs, deduplicate, save to file",
      },
      {
        command: "gospider -s \"https://target.com\" | gf xss | grep -E '\\?.*='",
        description: "#4 Full pipeline: crawl → filter XSS → only URLs with params",
      },
    ],
  },
  {
    category: "Custom Patterns",
    commands: [
      {
        command: "echo '{\"flags\":\"--help|-h|-\\?\",\"pattern\":\"help|manual|guide\"}' > ~/.gf/help.json",
        description: "#1 Create a custom pattern to find help/documentation pages",
      },
      {
        command: "gf -save admin-paths",
        description: "#2 Save stdin output as a new interactively-defined pattern",
      },
      {
        command: "gf admin-paths < urls.txt > admin_urls.txt",
        description: "#3 Use a custom saved pattern to filter URLs",
      },
      {
        command: "cat urls.txt | gf -rm bad-pattern",
        description: "#4 Remove a saved pattern by name",
      },
    ],
  },
  {
    category: "Tips & Best Practices",
    commands: [
      {
        command: "cat urls.txt | gf xss | sort -u > xss_unique.txt",
        description: "Always sort -u to deduplicate before saving",
      },
      {
        command: "gf -list | tr ',' '\\n' | sort",
        description: "List available patterns in a readable format",
      },
      {
        command: "paramspider -d target.com | gf xss,ssrf,sqli,redirect | sort -u > all_vulns.txt",
        description: "Full param discovery pipeline with gf filtering",
      },
      {
        command: "cat urls.txt | gf xss | httpx -json | jq -r 'select(.status_code==200) | .url'",
        description: "End-to-end: filter, probe, extract confirmed live URLs",
      },
    ],
  },
]

export const gfTools = [
  {
    name: "gf GitHub",
    url: "https://github.com/tomnomnom/gf",
    description: "Official gf repository by Tomnomnom",
  },
  {
    name: "Gf-Patterns",
    url: "https://github.com/1ndianl33t/Gf-Patterns",
    description: "Community collection of additional gf patterns",
  },
  {
    name: "ParamSpider",
    url: "https://github.com/devanshbatham/ParamSpider",
    description: "URL collection with parameters → feed into gf",
  },
]
