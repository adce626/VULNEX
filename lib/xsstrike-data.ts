export interface XSStrikeCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const xsstrikeCategories: XSStrikeCategory[] = [
  {
    category: "Installation",
    commands: [
      {
        command: "git clone https://github.com/s0md3v/XSStrike.git && cd XSStrike && pip3 install -r requirements.txt",
        description: "Clone repository and install dependencies",
      },
      {
        command: "python3 xsstrike.py -h",
        description: "Verify installation and show help",
      },
    ],
  },
  {
    category: "Basic Scanning",
    commands: [
      {
        command: "python3 xsstrike.py -u \"https://example.com/search?q=test\"",
        description: "Basic XSS scan with GET parameter",
      },
      {
        command: "python3 xsstrike.py -u \"https://example.com/page\" --data \"text=test\"",
        description: "POST request XSS scan",
      },
      {
        command: "python3 xsstrike.py -u \"https://example.com/search?q=test\" --params",
        description: "Scan all parameters in the URL",
      },
      {
        command: "python3 xsstrike.py -u \"https://example.com/search?q=test&id=1\" -p \"q\"",
        description: "Scan specific parameter only",
      },
    ],
  },
  {
    category: "Crawling Mode",
    commands: [
      {
        command: "python3 xsstrike.py -u \"https://example.com\" --crawl",
        description: "Crawl website and test all discovered endpoints",
      },
      {
        command: "python3 xsstrike.py -u \"https://example.com\" --crawl -l 3",
        description: "Crawl with depth level 3",
      },
      {
        command: "python3 xsstrike.py -u \"https://example.com\" --crawl --params",
        description: "Crawl and test all parameters on discovered pages",
      },
    ],
  },
  {
    category: "Blind XSS",
    commands: [
      {
        command: "python3 xsstrike.py -u \"https://example.com/page?id=1\" --blind",
        description: "Test for blind XSS with callback detection",
      },
      {
        command: "python3 xsstrike.py -u \"https://example.com/form\" --data \"name=test&email=test@test.com\" --blind",
        description: "POST form blind XSS testing",
      },
    ],
  },
  {
    category: "Fuzzing Mode",
    commands: [
      {
        command: "python3 xsstrike.py -u \"https://example.com/search?q=test\" --fuzzer",
        description: "Enable fuzzer mode for deeper testing",
      },
      {
        command: "python3 xsstrike.py -u \"https://example.com/search?q=test\" --fuzzer --skip-dom",
        description: "Fuzzer mode without DOM checks (faster)",
      },
      {
        command: "python3 xsstrike.py -u \"https://example.com/search?q=test\" -t 10",
        description: "Use 10 threads for faster fuzzing",
      },
    ],
  },
  {
    category: "Advanced Options",
    commands: [
      {
        command: "python3 xsstrike.py -u \"https://example.com/page?id=1\" --headers",
        description: "Test HTTP headers for XSS",
      },
      {
        command: "python3 xsstrike.py -u \"https://example.com/page?id=1\" -d 2",
        description: "Set delay of 2 seconds between requests",
      },
      {
        command: "python3 xsstrike.py -u \"https://example.com/page?id=1\" --timeout 15",
        description: "Set request timeout to 15 seconds",
      },
      {
        command: "python3 xsstrike.py -u \"https://example.com/page?id=1\" --proxy \"http://127.0.0.1:8080\"",
        description: "Route through Burp Suite proxy",
      },
      {
        command: "python3 xsstrike.py -u \"https://example.com/page?id=1\" --skip",
        description: "Skip confirmation prompts for each finding",
      },
    ],
  },
  {
    category: "Configuration",
    commands: [
      {
        command: "python3 xsstrike.py -u \"https://example.com/page?id=1\" --user-agent \"Mozilla/5.0\"",
        description: "Set custom User-Agent header",
      },
      {
        command: "python3 xsstrike.py -u \"https://example.com/page?id=1\" --cookie \"session=abc123\"",
        description: "Use authentication cookies",
      },
      {
        command: "python3 xsstrike.py -u \"https://example.com/page?id=1\" -s",
        description: "Enable SSL/TLS verification",
      },
      {
        command: "python3 xsstrike.py -u \"https://example.com/page?id=1\" --file-output",
        description: "Save findings to file for later review",
      },
    ],
  },
  {
        category: "Quick Reference",
    commands: [
      {
        command: "-u = Target URL",
        description: "URL with parameters to test",
      },
      {
        command: "--data = POST data",
        description: "POST body data string",
      },
      {
        command: "--crawl = Crawl mode",
        description: "Crawl website for all endpoints",
      },
      {
        command: "--blind = Blind XSS",
        description: "Test for blind XSS vulnerabilities",
      },
      {
        command: "--fuzzer = Fuzzer mode",
        description: "Enable payload fuzzing engine",
      },
      {
        command: "-p = Parameter name",
        description: "Test specific parameter only",
      },
      {
        command: "--params = All parameters",
        description: "Test all URL parameters",
      },
      {
        command: "-t = Thread count",
        description: "Number of concurrent threads",
      },
      {
        command: "-d = Request delay",
        description: "Delay between requests in seconds",
      },
      {
        command: "--proxy = Proxy URL",
        description: "HTTP/HTTPS proxy for traffic interception",
      },
    ],
  },
]

export const xsstrikeTools = [
  {
    name: "XSStrike GitHub",
    url: "https://github.com/s0md3v/XSStrike",
    description: "Official repository with documentation and source code",
  },
  {
    name: "PortSwigger XSS Cheat Sheet",
    url: "https://portswigger.net/web-security/cross-site-scripting/cheat-sheet",
    description: "Comprehensive XSS payload reference",
  },
  {
    name: "PayloadsAllTheThings - XSS",
    url: "https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/XSS%20Injection",
    description: "Extensive XSS payload collection",
  },
  {
    name: "OWASP XSS Filter Evasion",
    url: "https://cheatsheetseries.owasp.org/cheatsheets/XSS_Filter_Evasion_Cheat_Sheet.html",
    description: "XSS bypass techniques reference",
  },
]
