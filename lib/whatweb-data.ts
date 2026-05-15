export interface WhatWebCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const whatwebCategories: WhatWebCategory[] = [
  {
    category: "Installation & Setup",
    commands: [
      { command: "apt install whatweb", description: "Install on Kali/Debian" },
      { command: "gem install whatweb", description: "Install via Ruby gem" },
      { command: "whatweb --version", description: "Verify installation" },
    ],
  },
  {
    category: "Basic Fingerprinting",
    commands: [
      { command: "whatweb example.com", description: "#1 Basic scan — identify technologies on target" },
      { command: "whatweb example.com -v", description: "#2 Verbose mode — detailed plugin output" },
      { command: "whatweb -a 3 example.com", description: "#3 Aggression level 3 — aggressive probing" },
      { command: "whatweb example.com -q", description: "#4 Quiet mode — reduce output noise" },
    ],
  },
  {
    category: "Batch Scanning",
    commands: [
      { command: "whatweb -i urls.txt", description: "#1 Scan multiple targets from file" },
      { command: "cat domains.txt | whatweb", description: "#2 Pipe domains into whatweb" },
      { command: "whatweb -i urls.txt --log-json results.json", description: "#3 Batch scan with JSON output" },
      { command: "whatweb -i urls.txt -t 50", description: "#4 Batch scan with 50 concurrent threads" },
    ],
  },
  {
    category: "Output Formats",
    commands: [
      { command: "whatweb example.com --log-json results.json", description: "#1 JSON format — parseable output" },
      { command: "whatweb example.com --log-xml results.xml", description: "#2 XML format" },
      { command: "whatweb example.com --log-verbose verbose.txt", description: "#3 Verbose log for detailed analysis" },
      { command: "whatweb -i urls.txt -o results.txt", description: "#4 Simple output to file" },
    ],
  },
  {
    category: "Advanced Options",
    commands: [
      { command: "whatweb example.com -H \"Cookie: session=abc\"", description: "#1 Add custom HTTP headers" },
      { command: "whatweb example.com -p wordpress,phpbb", description: "#2 Use specific plugins only" },
      { command: "whatweb example.com -p +wordpress", description: "#3 Add wordpress plugin to defaults" },
      { command: "whatweb example.com -p -wordpress", description: "#4 Remove wordpress plugin from defaults" },
      { command: "whatweb example.com --proxy http://127.0.0.1:8080", description: "#5 Route through Burp Suite proxy" },
    ],
  },
  {
    category: "Tips & Best Practices",
    commands: [
      { command: "whatweb example.com -a 3 -v | grep -E 'CMS|Framework|Server|Platform'", description: "Filter output for key technologies only" },
      { command: "whatweb example.com --log-json out.json && cat out.json | jq '.plugins | keys'", description: "Use jq to extract plugin names from JSON" },
      { command: "whatweb -a 3 -i targets.txt -t 100", description: "Mass scan: high aggression + 100 threads" },
      { command: "whatweb example.com -p wordpress && wpscan --url example.com", description: "Confirm WordPress with whatweb then scan with wpscan" },
    ],
  },
]

export const whatwebTools = [
  { name: "WhatWeb GitHub", url: "https://github.com/urbanadventurer/WhatWeb", description: "Official repository with 1800+ plugins" },
  { name: "BuiltWith", url: "https://builtwith.com", description: "Online technology lookup alternative" },
  { name: "Wappalyzer", url: "https://www.wappalyzer.com", description: "Browser extension for tech identification" },
]
