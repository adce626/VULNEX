export interface X8Category {
  category: string
  commands: { command: string; description: string }[]
}

export const x8Categories: X8Category[] = [
  {
    category: "Installation & Setup",
    commands: [
      {
        command: "go install github.com/tomnomnom/x8@latest",
        description: "Install via Go (recommended)",
      },
      {
        command: "echo $GOPATH && ls ~/go/bin/x8",
        description: "Verify ~/go/bin is in your PATH",
      },
      {
        command: "x8 -h",
        description: "Show help and verify installation",
      },
    ],
  },
  {
    category: "Basic Parameter Fuzzing",
    commands: [
      {
        command: "x8 -u \"https://site.com/endpoint?FUZZ=test\" -w paramnames.txt",
        description: "#1 Basic GET parameter name fuzzing",
      },
      {
        command: "x8 -u \"https://site.com/api?message=FUZZ\" -w payloads.txt",
        description: "#2 Fuzz parameter values instead of names",
      },
      {
        command: "x8 -u \"https://site.com/endpoint\" -w params.txt -m POST -d \"FUZZ=value\"",
        description: "#3 POST parameter fuzzing",
      },
      {
        command: "x8 -u \"https://site.com/endpoint?FUZZ=test\" -w params.txt -json",
        description: "#4 Output results as JSON for automation",
      },
    ],
  },
  {
    category: "Performance & Speed",
    commands: [
      {
        command: "x8 -u \"https://site.com/api?FUZZ=x\" -w params.txt -t 500 --threads 100",
        description: "#1 High-speed fuzzing — 500 concurrent requests, 100 threads",
      },
      {
        command: "x8 -u \"https://site.com/endpoint\" -w params.txt -t 2000",
        description: "#2 Extremely fast — 2,000 concurrent requests",
      },
      {
        command: "cat urls.txt | x8 -w params.txt -json",
        description: "#3 Pipe URLs from stdin for batch scanning",
      },
      {
        command: "x8 -u \"https://site.com?FUZZ=test\" -w params.txt -rate 10000",
        description: "#4 Rate-limit: max 10,000 requests/second",
      },
    ],
  },
  {
    category: "Filtering & Matching",
    commands: [
      {
        command: "x8 -u \"https://site.com?FUZZ=test\" -w params.txt --filter-status 200,403",
        description: "#1 Only show results with status 200 or 403",
      },
      {
        command: "x8 -u \"https://site.com?FUZZ=test\" -w params.txt --exclude-status 404,500",
        description: "#2 Exclude results with status 404 or 500",
      },
      {
        command: "x8 -u \"https://site.com?FUZZ=test\" -w params.txt --filter-size 100-5000",
        description: "#3 Filter responses by size range (bytes)",
      },
      {
        command: "x8 -u \"https://site.com?FUZZ=test\" -w params.txt --match-regex \"error|warning|exception\"",
        description: "#4 Match responses containing specific regex patterns",
      },
    ],
  },
  {
    category: "Advanced Techniques",
    commands: [
      {
        command: "x8 -u \"https://site.com?FUZZ=test\" -w params.txt -H \"Authorization: Bearer TOKEN\"",
        description: "#1 Add custom headers for authenticated endpoints",
      },
      {
        command: "x8 -u \"https://site.com/api/v1?FUZZ=test\" -w params.txt -X PUT",
        description: "#2 Use PUT method instead of default GET",
      },
      {
        command: "x8 -u \"https://site.com:8080?FUZZ=test\" -w params.txt --self-update",
        description: "#3 Scan non-standard port and auto-update x8",
      },
      {
        command: "x8 -u \"https://site.com/api?FUZZ=1\" -w params.txt -c 50",
        description: "#4 Limit concurrent requests per host (good for WAF bypass)",
      },
    ],
  },
  {
    category: "Tips & Best Practices",
    commands: [
      {
        command: "x8 -u \"https://site.com?FUZZ=test\" -w params.txt -t 100 --threads 50",
        description: "Start with moderate concurrency, then increase",
      },
      {
        command: "x8 -u \"https://site.com?FUZZ=test\" -w params.txt --filter-status 200",
        description: "Focus on 200 responses — most likely to be valid params",
      },
      {
        command: "x8 -u \"https://site.com?FUZZ=test\" -w params.txt -json | jq '.results[] | select(.status==200)'",
        description: "JSON output + jq for advanced filtering",
      },
      {
        command: "x8 --self-update",
        description: "Keep x8 updated for latest features and fixes",
      },
    ],
  },
]

export const x8Tools = [
  {
    name: "x8 GitHub",
    url: "https://github.com/tomnomnom/x8",
    description: "Official repository with documentation",
  },
  {
    name: "SecLists Parameter Names",
    url: "https://github.com/danielmiessler/SecLists/tree/master/Discovery/Web-Content",
    description: "Wordlists for parameter name fuzzing",
  },
  {
    name: "gf - URL Filter",
    url: "https://github.com/tomnomnom/gf",
    description: "Filter x8 results by vulnerability type",
  },
]
