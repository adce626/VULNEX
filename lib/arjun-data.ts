export interface ArjunCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const arjunCategories: ArjunCategory[] = [
  {
    category: "Installation & Setup",
    commands: [
      {
        command: "pip install arjun",
        description: "Install via pip (Python 3.6+)",
      },
      {
        command: "git clone https://github.com/s0md3v/Arjun.git && cd Arjun && pip install -r requirements.txt",
        description: "Clone from GitHub and install dependencies",
      },
      {
        command: "python arjun.py -h",
        description: "Verify installation and show help",
      },
    ],
  },
  {
    category: "Basic GET Parameter Discovery",
    commands: [
      {
        command: "arjun -u \"https://site.com/endpoint.php\"",
        description: "#1 Basic scan — discovers hidden GET parameters automatically",
      },
      {
        command: "arjun -u \"https://site.com/api/users\" -t 50 -o results.json",
        description: "#2 With 50 threads, save results as JSON",
      },
      {
        command: "arjun -u \"https://site.com/search\" --stable",
        description: "#3 Stable mode — slower but more reliable",
      },
      {
        command: "arjun -u \"https://site.com/endpoint\" -q",
        description: "#4 Quiet mode — only show discovered parameters",
      },
    ],
  },
  {
    category: "POST & JSON Parameter Discovery",
    commands: [
      {
        command: "arjun -u \"https://site.com/login\" -m POST",
        description: "#1 Discover POST parameters on login endpoint",
      },
      {
        command: "arjun -u \"https://site.com/api\" -m POST -T \"application/json\"",
        description: "#2 JSON API — discover JSON body parameters",
      },
      {
        command: "arjun -u \"https://site.com/api\" -d '{\"existing\":\"data\"}' -m JSON",
        description: "#3 Include existing JSON body, find hidden params",
      },
      {
        command: "arjun -u \"https://site.com/form\" -m POST -T \"application/x-www-form-urlencoded\"",
        description: "#4 URL-encoded form parameter discovery",
      },
    ],
  },
  {
    category: "Advanced Options",
    commands: [
      {
        command: "arjun -u \"https://site.com/endpoint\" -w custom_params.txt",
        description: "#1 Use a custom parameter wordlist",
      },
      {
        command: "arjun -u \"https://site.com/secure\" --headers 'Authorization: Bearer TOKEN'",
        description: "#2 Add authentication headers",
      },
      {
        command: "arjun -u \"https://site.com/api\" --include '{\"static\":\"data\"}' -m JSON",
        description: "#3 Include additional parameters in every request",
      },
      {
        command: "arjun -u \"https://site.com/endpoint\" --passive",
        description: "#4 Passive mode — use Wayback Machine data only, no live requests",
      },
    ],
  },
  {
    category: "Output & Automation",
    commands: [
      {
        command: "arjun -u \"https://site.com/api\" -o results.json -oJ",
        description: "#1 Save results as JSON for programmatic use",
      },
      {
        command: "arjun -u \"https://site.com/api\" --output-format html",
        description: "#2 Export results as HTML report",
      },
      {
        command: "cat urls.txt | arjun",
        description: "#3 Pipe multiple URLs from a file for batch scanning",
      },
      {
        command: "arjun -i targets.txt -t 100 --timeout 10",
        description: "#4 Batch scan from file with custom timeout",
      },
    ],
  },
  {
    category: "Tips & Best Practices",
    commands: [
      {
        command: "arjun -u \"https://site.com/endpoint\" -t 200",
        description: "Increase threads for faster results (default: 5)",
      },
      {
        command: "arjun -u \"https://site.com/endpoint\" --stable",
        description: "Stable mode if results seem inconsistent",
      },
      {
        command: "arjun -u \"https://site.com/endpoint\" -m GET -m POST",
        description: "Test both GET and POST parameters simultaneously",
      },
      {
        command: "arjun -u \"https://site.com/api\" --passive | arjun -u \"https://site.com/api\"",
        description: "Combine passive + active for maximum coverage",
      },
    ],
  },
]

export const arjunTools = [
  {
    name: "Arjun GitHub",
    url: "https://github.com/s0md3v/Arjun",
    description: "Official repository with documentation and examples",
  },
  {
    name: "SecLists Parameter Names",
    url: "https://github.com/danielmiessler/SecLists/tree/master/Discovery/Web-Content",
    description: "Wordlists for parameter name fuzzing",
  },
  {
    name: "ParamSpider",
    url: "https://github.com/devanshbatham/ParamSpider",
    description: "Passive parameter extraction from archives",
  },
]
