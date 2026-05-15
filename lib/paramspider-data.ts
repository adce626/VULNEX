export interface ParamSpiderCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const paramSpiderCategories: ParamSpiderCategory[] = [
  {
    category: "Installation & Setup",
    commands: [
      {
        command: "git clone https://github.com/devanshbatham/ParamSpider.git",
        description: "Clone the repository",
      },
      {
        command: "cd ParamSpider && pip install -r requirements.txt",
        description: "Install Python dependencies",
      },
      {
        command: "python3 paramspider.py -h",
        description: "Verify installation and show help",
      },
    ],
  },
  {
    category: "Basic Extraction",
    commands: [
      {
        command: "python3 paramspider.py -d site.com",
        description: "#1 Basic crawl — extract all URLs with parameters from Wayback Machine",
      },
      {
        command: "python3 paramspider.py -d site.com -o output.txt",
        description: "#2 Save results directly to a file",
      },
      {
        command: "python3 paramspider.py -d site.com --subs",
        description: "#3 Include subdomains in the results",
      },
      {
        command: "python3 paramspider.py -d site.com -q",
        description: "#4 Quiet mode — only output results, no banners",
      },
    ],
  },
  {
    category: "Filtering & Output",
    commands: [
      {
        command: "python3 paramspider.py -d site.com -p \"FUZZ=value\"",
        description: "#1 Replace parameter values with FUZZ placeholder for fuzzing",
      },
      {
        command: "python3 paramspider.py -d site.com | grep xss > xss_urls.txt",
        description: "#2 Pipe output and filter for XSS candidate URLs",
      },
      {
        command: "python3 paramspider.py -d site.com | gf ssrf > ssrf.txt",
        description: "#3 Pipe directly into gf for SSRF filtering",
      },
      {
        command: "python3 paramspider.py -d site.com -e 200,301,302",
        description: "#4 Filter URLs by HTTP status codes",
      },
    ],
  },
  {
    category: "Advanced Options",
    commands: [
      {
        command: "python3 paramspider.py -d site.com --level high",
        description: "#1 High crawl depth for more comprehensive results",
      },
      {
        command: "python3 paramspider.py -d site.com --placeholder FUZZ",
        description: "#2 Custom placeholder instead of parameter values",
      },
      {
        command: "python3 paramspider.py -d site.com --config config.yaml",
        description: "#3 Use a custom configuration file",
      },
      {
        command: "python3 paramspider.py -d site.com --retries 5",
        description: "#4 Set retry count for failed requests",
      },
    ],
  },
  {
    category: "Workflow Integration",
    commands: [
      {
        command: "python3 paramspider.py -d site.com -o urls.txt && cat urls.txt | gf xss > xss.txt",
        description: "#1 Extract then filter for XSS in one pipeline",
      },
      {
        command: "python3 paramspider.py -d site.com -p \"FUZZ=1\" | httpx -mc 200 | tee live.txt",
        description: "#2 Extract, probe for live hosts, save results",
      },
      {
        command: "python3 paramspider.py -d site.com && python3 paramspider.py -d subs.site.com",
        description: "#3 Run against multiple domains sequentially",
      },
      {
        command: "for d in $(cat domains.txt); do python3 paramspider.py -d $d -o $d.txt; done",
        description: "#4 Batch process multiple target domains",
      },
    ],
  },
  {
    category: "Tips & Best Practices",
    commands: [
      {
        command: "python3 paramspider.py -d site.com -p \"FUZZ=1\" > fuzzable.txt",
        description: "Always use -p flag to make output ffuf/x8-ready",
      },
      {
        command: "python3 paramspider.py -d site.com --level high --subs",
        description: "High level + subdomains for maximum coverage on large targets",
      },
      {
        command: "python3 paramspider.py -d site.com | grep -v '.js\\|.css\\|.png'",
        description: "Filter out static file extensions (JS, CSS, images)",
      },
      {
        command: "python3 paramspider.py -d site.com | anew prev_scan.txt",
        description: "Use anew to track new URLs between scans",
      },
    ],
  },
]

export const paramSpiderTools = [
  {
    name: "ParamSpider GitHub",
    url: "https://github.com/devanshbatham/ParamSpider",
    description: "Official repository with documentation",
  },
  {
    name: "Wayback Machine",
    url: "https://web.archive.org",
    description: "Source of historical URL data used by ParamSpider",
  },
  {
    name: "gf - URL Filter",
    url: "https://github.com/tomnomnom/gf",
    description: "Filter ParamSpider output by vulnerability type",
  },
]
