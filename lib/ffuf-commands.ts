export interface FFUFCommand {
  id: string
  title: string
  command: string
  description: string
}

export interface FFUFCategory {
  id: string
  title: string
  description: string
  commands: FFUFCommand[]
}

export const ffufCategories: FFUFCategory[] = [
  {
    id: "installation",
    title: "Installation",
    description: "Setup FFUF on your system",
    commands: [
      {
        id: "install-apt",
        title: "Install via APT",
        command: "apt install ffuf",
        description: "Debian/Ubuntu installation"
      }
    ]
  },
  {
    id: "basic",
    title: "Basic Commands",
    description: "Core fuzzing techniques",
    commands: [
      {
        id: "dir-bruteforce",
        title: "Directory Bruteforce",
        command: "ffuf -u https://example.com/FUZZ -w wordlist.txt",
        description: "Find hidden directories and files"
      },
      {
        id: "post-request",
        title: "POST Request Fuzzing",
        command: "ffuf -w wordlist.txt -u https://example.com/FUZZ -X POST",
        description: "Fuzz with POST method"
      },
      {
        id: "case-insensitive",
        title: "Case Insensitive",
        command: "ffuf -u https://example.com/FUZZ -w wordlist.txt -ic -c",
        description: "Ignore case with colored output"
      },
      {
        id: "file-extension",
        title: "File Extension Fuzzing",
        command: "ffuf -u https://example.com/indexFUZZ -w wordlist.txt -e .php,.asp,.bak,.db",
        description: "Test multiple file extensions"
      },
      {
        id: "recursive",
        title: "Recursive Fuzzing",
        command: "ffuf -u https://example.com/FUZZ -w wordlist.txt -recursion -recursion-depth 3",
        description: "Scan multiple directory levels"
      },
      {
        id: "filter-status",
        title: "Filter Status Codes",
        command: "ffuf -w wordlist.txt -u https://example.com/FUZZ -fc 404,500",
        description: "Exclude specific HTTP status codes"
      },
      {
        id: "multi-wordlist",
        title: "Multi Wordlist",
        command: "ffuf -u https://example.com/W2/W1/ -w dict.txt:W1 -w dns_dict.txt:W2",
        description: "Fuzz with multiple wordlists"
      }
    ]
  },
  {
    id: "subdomain-vhost",
    title: "Subdomain & VHost",
    description: "Subdomain and virtual host discovery",
    commands: [
      {
        id: "subdomain-fuzz",
        title: "Subdomain Fuzzing",
        command: "ffuf -w subdomains.txt -u https://FUZZ.example.com/",
        description: "Discover hidden subdomains"
      },
      {
        id: "vhost-fuzz",
        title: "Virtual Host Fuzzing",
        command: 'ffuf -w vhosts.txt -u https://example.com/ -H "Host: FUZZ.example.com"',
        description: "Find virtual hosts via Host header"
      }
    ]
  },
  {
    id: "parameters",
    title: "Parameter Fuzzing",
    description: "GET and POST parameter discovery",
    commands: [
      {
        id: "get-params",
        title: "GET Parameter Fuzzing",
        command: "ffuf -w wordlist.txt -u https://example.com/page.php?FUZZ=value",
        description: "Find hidden GET parameters"
      },
      {
        id: "post-params",
        title: "POST Parameter Fuzzing",
        command: "ffuf -w wordlist.txt -u https://example.com/api -X POST -d 'FUZZ=value'",
        description: "Discover POST parameters"
      },
      {
        id: "login-bypass",
        title: "Login Bypass",
        command: 'ffuf -w passwordlist.txt -X POST -d "username=admin&password=FUZZ" -u https://example.com/login',
        description: "Bruteforce login passwords"
      },
      {
        id: "put-request",
        title: "PUT Request Fuzzing",
        command: "ffuf -w wordlist.txt -X PUT -u https://example.com/FUZZ -b 'session=abcdef'",
        description: "Test file uploads with PUT"
      }
    ]
  },
  {
    id: "advanced",
    title: "Advanced Methods",
    description: "Complex fuzzing techniques",
    commands: [
      {
        id: "clusterbomb",
        title: "Clusterbomb Mode",
        command: "ffuf -w users.txt:USER -w passwords.txt:PASS -u https://example.com/login?username=USER&password=PASS -mode clusterbomb",
        description: "Test all username/password combinations"
      },
      {
        id: "clusterbomb-request",
        title: "Clusterbomb with Request File",
        command: "ffuf -request req.txt -request-proto http -mode clusterbomb -w usernames.txt:HFUZZ -w passwords.txt:WFUZZ",
        description: "Use custom request template"
      },
      {
        id: "pitchfork",
        title: "Pitchfork Mode",
        command: "ffuf -w users.txt:USER -w passwords.txt:PASS -u https://example.com/login?username=USER&password=PASS -mode pitchfork",
        description: "Paired wordlist fuzzing"
      },
      {
        id: "cookies",
        title: "With Cookies",
        command: 'ffuf -b "SESSIONID=abcd1234; USER=admin" -w wordlist.txt -u https://example.com/FUZZ',
        description: "Authenticated fuzzing with cookies"
      },
      {
        id: "proxy",
        title: "Through Proxy",
        command: "ffuf -x http://127.0.0.1:8080 -w wordlist.txt -u https://example.com/FUZZ",
        description: "Route through Burp Suite"
      },
      {
        id: "custom-header",
        title: "Custom Header Fuzzing",
        command: 'ffuf -w headers.txt -u https://example.com/ -H "X-Custom-Header: FUZZ"',
        description: "Fuzz custom HTTP headers"
      },
      {
        id: "user-agent",
        title: "Custom User-Agent",
        command: 'ffuf -u "https://example.com/FUZZ" -w wordlist.txt -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)"',
        description: "Bypass restrictions with custom UA"
      },
      {
        id: "rate-limit",
        title: "Rate Limiting",
        command: "ffuf -w wordlist.txt -u https://example.com/FUZZ -rate 50 -t 50",
        description: "Control request rate (50 req/sec)"
      }
    ]
  },
  {
    id: "output",
    title: "Output Options",
    description: "Save and export results",
    commands: [
      {
        id: "html-output",
        title: "HTML Output",
        command: "ffuf -w wordlist.txt -u https://example.com/FUZZ -o results.html -of html",
        description: "Save results as HTML"
      },
      {
        id: "json-output",
        title: "JSON Output",
        command: "ffuf -w wordlist.txt -u https://example.com/FUZZ -o results.json -of json",
        description: "Save results as JSON"
      },
      {
        id: "csv-output",
        title: "CSV Output",
        command: "ffuf -w wordlist.txt -u https://example.com/FUZZ -o results.csv -of csv",
        description: "Save results as CSV"
      },
      {
        id: "all-output",
        title: "All Formats",
        command: "ffuf -w wordlist.txt -u https://example.com/FUZZ -o results -of all",
        description: "Save in all formats"
      }
    ]
  }
]

export const wordlistResources = [
  {
    title: "CoffinXP Payloads",
    url: "https://github.com/coffinxp/payloads",
    description: "Custom payload collection"
  },
  {
    title: "SecLists",
    url: "https://github.com/danielmiessler/SecLists",
    description: "Comprehensive wordlist collection"
  },
  {
    title: "FFUF GitHub",
    url: "https://github.com/ffuf/ffuf",
    description: "Official FFUF repository"
  }
]
