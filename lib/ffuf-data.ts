export interface FFUFCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const ffufCategories: FFUFCategory[] = [
  // =================== INSTALLATION ==================
  {
    category: "Installation",
    commands: [
      {
        command: "apt install ffuf",
        description: "Debian/Ubuntu installation",
      },
      {
        command: "go install github.com/ffuf/ffuf@latest",
        description: "Install via Go (cross-platform)",
      },
    ],
  },

  // =================== BASIC COMMANDS ==================
  {
    category: "Basic Commands",
    commands: [
      {
        command: "ffuf -u https://example.com/FUZZ -w wordlist.txt",
        description: "#1 Directory bruteforce - find hidden directories/files",
      },
      {
        command: "ffuf -w wordlist.txt -u https://example.com/FUZZ -X POST",
        description: "#2 POST request fuzzing",
      },
      {
        command: "ffuf -u https://example.com/FUZZ -w wordlist.txt -ic -c",
        description: "#3 Case insensitive with colored output",
      },
      {
        command: "ffuf -u https://example.com/indexFUZZ -w wordlist.txt -e .php,.asp,.bak,.db",
        description: "#4 File extension fuzzing",
      },
      {
        command: "ffuf -u https://example.com/FUZZ -w wordlist.txt -recursion -recursion-depth 3",
        description: "#5 Recursive fuzzing (scan multiple directory levels)",
      },
      {
        command: "ffuf -w wordlist.txt -u https://example.com/FUZZ -fc 404,500",
        description: "#6 Filter status codes (exclude 404 and 500)",
      },
      {
        command: "ffuf -u https://example.com/W2/W1/ -w dict.txt:W1 -w dns_dict.txt:W2",
        description: "#7 Multi wordlist fuzzing",
      },
    ],
  },

  // =================== SUBDOMAIN & VHOST ==================
  {
    category: "Subdomain & VHost",
    commands: [
      {
        command: "ffuf -w subdomains.txt -u https://FUZZ.example.com/",
        description: "#1 Subdomain fuzzing - discover hidden subdomains",
      },
      {
        command: `ffuf -w vhosts.txt -u https://example.com/ -H "Host: FUZZ.example.com"`,
        description: "#2 Virtual host fuzzing via Host header",
      },
    ],
  },

  // =================== PARAMETER FUZZING ==================
  {
    category: "Parameter Fuzzing",
    commands: [
      {
        command: "ffuf -w wordlist.txt -u https://example.com/page.php?FUZZ=value",
        description: "#1 GET parameter fuzzing - find hidden parameters",
      },
      {
        command: `ffuf -w wordlist.txt -u https://example.com/api -X POST -d 'FUZZ=value'`,
        description: "#2 POST parameter fuzzing",
      },
      {
        command: `ffuf -w passwordlist.txt -X POST -d "username=admin&password=FUZZ" -u https://example.com/login`,
        description: "#3 Login bruteforce - attack password field",
      },
      {
        command: `ffuf -w wordlist.txt -X PUT -u https://example.com/FUZZ -b 'session=abcdef'`,
        description: "#4 PUT request fuzzing with cookies",
      },
    ],
  },

  // =================== ADVANCED METHODS ==================
  {
    category: "Advanced Methods",
    commands: [
      {
        command: "ffuf -w users.txt:USER -w passwords.txt:PASS -u https://example.com/login?username=USER&password=PASS -mode clusterbomb",
        description: "#1 Clusterbomb mode - test all username/password combinations",
      },
      {
        command: "ffuf -request req.txt -request-proto http -mode clusterbomb -w usernames.txt:HFUZZ -w passwords.txt:WFUZZ",
        description: "#2 Clusterbomb with custom request file",
      },
      {
        command: "ffuf -w users.txt:USER -w passwords.txt:PASS -u https://example.com/login?username=USER&password=PASS -mode pitchfork",
        description: "#3 Pitchfork mode - paired wordlist fuzzing",
      },
      {
        command: `ffuf -b "SESSIONID=abcd1234; USER=admin" -w wordlist.txt -u https://example.com/FUZZ`,
        description: "#4 Authenticated fuzzing with cookies",
      },
      {
        command: "ffuf -x http://127.0.0.1:8080 -w wordlist.txt -u https://example.com/FUZZ",
        description: "#5 Route through Burp Suite proxy",
      },
      {
        command: `ffuf -w headers.txt -u https://example.com/ -H "X-Custom-Header: FUZZ"`,
        description: "#6 Custom header fuzzing",
      },
      {
        command: `ffuf -u "https://example.com/FUZZ" -w wordlist.txt -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)"`,
        description: "#7 Custom User-Agent to bypass restrictions",
      },
      {
        command: "ffuf -w wordlist.txt -u https://example.com/FUZZ -rate 50 -t 50",
        description: "#8 Rate limiting - control request rate (50 req/sec, 50 threads)",
      },
    ],
  },

  // =================== OUTPUT OPTIONS ==================
  {
    category: "Output Options",
    commands: [
      {
        command: "ffuf -w wordlist.txt -u https://example.com/FUZZ -o results.html -of html",
        description: "#1 Save results as HTML",
      },
      {
        command: "ffuf -w wordlist.txt -u https://example.com/FUZZ -o results.json -of json",
        description: "#2 Save results as JSON",
      },
      {
        command: "ffuf -w wordlist.txt -u https://example.com/FUZZ -o results.csv -of csv",
        description: "#3 Save results as CSV",
      },
      {
        command: "ffuf -w wordlist.txt -u https://example.com/FUZZ -o results -of all",
        description: "#4 Save in all formats (html, json, csv, ecsv)",
      },
    ],
  },

  // =================== QUICK REFERENCE ==================
  {
    category: "Quick Reference",
    commands: [
      {
        command: "FUZZ = Placeholder for wordlist value",
        description: "Replace with wordlist entries during fuzzing",
      },
      {
        command: "-w = Wordlist file path",
        description: "Specify the wordlist file to use",
      },
      {
        command: "-u = Target URL",
        description: "The URL to fuzz (include FUZZ placeholder)",
      },
      {
        command: "-X = HTTP method (GET, POST, PUT, etc.)",
        description: "Specify the HTTP method to use",
      },
      {
        command: "-H = Custom header",
        description: "Add custom HTTP headers (e.g., Host, User-Agent)",
      },
      {
        command: "-fc = Filter status codes (exclude)",
        description: "Exclude specific HTTP status codes from results",
      },
      {
        command: "-fs = Filter by size (exclude)",
        description: "Exclude responses with specific size",
      },
      {
        command: "-b = Cookie data",
        description: "Add cookies for authenticated fuzzing",
      },
      {
        command: "-o = Output file",
        description: "Save results to specified file",
      },
      {
        command: "-x = Proxy URL",
        description: "Route traffic through proxy (e.g., Burp Suite)",
      },
    ],
  },
]

export const ffufTools = [
  {
    name: "FFUF GitHub",
    url: "https://github.com/ffuf/ffuf",
    description: "Official FFUF repository and documentation",
  },
  {
    name: "SecLists",
    url: "https://github.com/danielmiessler/SecLists",
    description: "Comprehensive wordlist collection for fuzzing",
  },
  {
    name: "CoffinXP Payloads",
    url: "https://github.com/coffinxp/payloads",
    description: "Custom payload and wordlist collection",
  },
  {
    name: "FFUF GitHub Wiki",
    url: "https://github.com/ffuf/ffuf/wiki",
    description: "Official wiki with examples and tutorials",
  },
]
