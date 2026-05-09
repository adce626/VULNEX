export interface GospiderCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const gospiderCategories: GospiderCategory[] = [
  {
    category: "Installation",
    commands: [
      {
        command: 'GO111MODULE=on go install github.com/jaeles-project/gospider@latest',
        description: "Install Gospider using Go (requires Go 1.11+)",
      },
      {
        command: 'gospider -v',
        description: "Verify installation and check version",
      },
    ],
  },
  {
    category: "Basic Crawling",
    commands: [
      {
        command: 'gospider -s "https://google.com/" -o output -c 10 -d 1',
        description: "Crawl single site with 10 concurrent requests, depth 1",
      },
      {
        command: 'gospider -S sites.txt -o output -c 10 -d 1',
        description: "Crawl multiple sites from list",
      },
      {
        command: 'gospider -S sites.txt -o output -c 10 -d 1 -t 20',
        description: "Crawl 20 sites at same time with 10 bots each",
      },
    ],
  },
  {
    category: "3rd Party Sources",
    commands: [
      {
        command: 'gospider -s "https://google.com/" -o output -c 10 -d 1 --other-source',
        description: "Get URLs from Archive.org, CommonCrawl, VirusTotal, AlienVault",
      },
      {
        command: 'gospider -s "https://google.com/" -o output -c 10 -d 1 --other-source --include-subs',
        description: "Include subdomains from 3rd party sources",
      },
    ],
  },
  {
    category: "Custom Headers & Cookies",
    commands: [
      {
        command: 'gospider -s "https://google.com/" -o output -c 10 -d 1 -H "Accept: */*" -H "Test: test" --cookie "testA=a; testB=b"',
        description: "Use custom headers and cookies",
      },
      {
        command: 'gospider -s "https://google.com/" -o output -c 10 -d 1 --other-source --burp burp_req.txt',
        description: "Integrate with Burp Suite (export request from Burp)",
      },
    ],
  },
  {
    category: "Blacklist & Filtering",
    commands: [
      {
        command: 'gospider -s "https://google.com/" -o output -c 10 -d 1 --blacklist ".(jpg|jpeg|gif|css|tif|tiff|png|ttf|woff|woff2|ico)"',
        description: "Blacklist file extensions (default: jpg,jpeg,gif,css,tif,tiff,png,ttf,woff,woff2,ico)",
      },
      {
        command: 'gospider -s "https://google.com/" -o output -c 10 -d 1 --blacklist ".(woff|pdf)" --length --filter-length "6871,24432"',
        description: "Blacklist extensions and filter by response length",
      },
    ],
  },
  {
    category: "Output & Integration",
    commands: [
      {
        command: 'gospider -s "https://google.com/" -o output -c 10 -d 1 -q',
        description: "Quiet output mode",
      },
      {
        command: 'gospider -s "https://google.com/" -o gospider_output.txt -c 10 -d 1',
        description: "Save output to file for further processing",
      },
      {
        command: 'gospider -S targets.txt -o - -c 10 -d 1 | grep "swagger\|openapi\|redoc\|rapidoc"',
        description: "Pipe output to grep for API documentation discovery",
      },
    ],
  },
  {
    category: "Features Overview",
    commands: [
      {
        command: "Fast web crawling with Go concurrency",
        description: "High-performance crawling using Go's goroutines",
      },
      {
        command: "Brute force and parse sitemap.xml",
        description: "Automatically discovers and parses XML sitemaps",
      },
      {
        command: "Parse robots.txt",
        description: "Respects and parses robots.txt directives",
      },
      {
        command: "Generate and verify link from JavaScript files",
        description: "Extracts URLs from JS files for complete coverage",
      },
      {
        command: "Find AWS-S3 from response source",
        description: "Detects S3 bucket references in page source",
      },
      {
        command: "Find subdomains from response source",
        description: "Extracts subdomains found in responses",
      },
      {
        command: "Random mobile/web User-Agent",
        description: "Rotates User-Agent between mobile and web formats",
      },
    ],
  },
]

export const gospiderTools = [
  {
    name: "Gospider GitHub Repository",
    url: "https://github.com/jaeles-project/gospider",
    description: "Official Gospider repository with full documentation",
  },
  {
    name: "Go Language Download",
    url: "https://go.dev/dl/",
    description: "Download Go to install Gospider (requires Go 1.11+)",
  },
  {
    name: "CommonCrawl",
    url: "https://commoncrawl.org/",
    description: "One of the 3rd party sources integrated with Gospider",
  },
  {
    name: "Archive.org",
    url: "https://archive.org/",
    description: "Wayback Machine integration for historical URL discovery",
  },
]
