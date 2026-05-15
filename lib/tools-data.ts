export interface ToolGuide {
  id: string
  name: string
  icon: string
  category: string
  description: string
  installation: {
    title: string
    steps: string[]
    code?: string
  }
  usage: {
    title: string
    description: string
    code?: string
  }
  commands: {
    command: string
    description: string
  }[]
  whenToUse: string[]
  notes: string[]
  commonErrors: {
    error: string
    solution: string
  }[]
  tags: string[]
}

export const toolsData: ToolGuide[] = [
  // Recon & OSINT Tools
  {
    id: "subfinder",
    name: "Subfinder",
    icon: "search",
    category: "Recon & OSINT",
    description: "Fast passive subdomain enumeration tool",
    installation: {
      title: "Installation",
      steps: [
        "Install Go 1.21+ on your system",
        "Run the installation command",
        "Verify installation"
      ],
      code: `# Using Go
go install -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest

# Using Docker
docker pull projectdiscovery/subfinder:latest

# Verify
subfinder -version`
    },
    usage: {
      title: "Basic Usage",
      description: "Subfinder is designed for passive subdomain discovery using various sources",
      code: `# Basic scan
subfinder -d example.com

# With output file
subfinder -d example.com -o subdomains.txt

# Multiple domains
subfinder -dL domains.txt -o results.txt

# Silent mode with only results
subfinder -d example.com -silent`
    },
    commands: [
      { command: "-d", description: "Target domain to enumerate" },
      { command: "-dL", description: "File containing list of domains" },
      { command: "-o", description: "Output file path" },
      { command: "-oJ", description: "Output in JSON format" },
      { command: "-silent", description: "Show only results" },
      { command: "-sources", description: "Specific sources to use" },
      { command: "-recursive", description: "Enable recursive enumeration" },
      { command: "-all", description: "Use all sources (slow)" },
      { command: "-config", description: "Config file path" },
      { command: "-t", description: "Number of threads" }
    ],
    whenToUse: [
      "Initial reconnaissance phase",
      "Expanding attack surface",
      "Before active scanning",
      "Bug bounty recon automation",
      "Asset discovery"
    ],
    notes: [
      "Configure API keys in ~/.config/subfinder/provider-config.yaml for better results",
      "Free sources have rate limits",
      "Combine with other tools like httpx for live host detection",
      "Use -all flag sparingly as it's slow but thorough"
    ],
    commonErrors: [
      {
        error: "No results found",
        solution: "Add API keys for sources like SecurityTrails, Shodan, Censys"
      },
      {
        error: "Rate limit exceeded",
        solution: "Use -rl flag to set rate limit or wait before retrying"
      },
      {
        error: "Config file not found",
        solution: "Run subfinder once to generate default config at ~/.config/subfinder/"
      }
    ],
    tags: ["recon", "subdomains", "passive", "osint"]
  },
  {
    id: "amass",
    name: "Amass",
    icon: "globe",
    category: "Recon & OSINT",
    description: "In-depth attack surface mapping and asset discovery",
    installation: {
      title: "Installation",
      steps: [
        "Install via package manager or Go",
        "Configure API keys",
        "Verify installation"
      ],
      code: `# Using Go
go install -v github.com/owasp-amass/amass/v4/...@master

# macOS
brew install amass

# Kali Linux
apt install amass

# Verify
amass -version`
    },
    usage: {
      title: "Basic Usage",
      description: "Amass performs network mapping and external asset discovery",
      code: `# Passive enumeration
amass enum -passive -d example.com

# Active enumeration
amass enum -active -d example.com -p 80,443,8080

# With brute force
amass enum -brute -d example.com -w wordlist.txt

# Intel gathering
amass intel -whois -d example.com`
    },
    commands: [
      { command: "enum", description: "Perform subdomain enumeration" },
      { command: "intel", description: "Gather intelligence on targets" },
      { command: "-passive", description: "Passive mode only" },
      { command: "-active", description: "Enable active techniques" },
      { command: "-brute", description: "Enable brute force" },
      { command: "-w", description: "Wordlist for brute force" },
      { command: "-d", description: "Target domain" },
      { command: "-o", description: "Output file" },
      { command: "-config", description: "Config file path" }
    ],
    whenToUse: [
      "Comprehensive asset discovery",
      "When you need more than subdomains",
      "Finding related domains and ASNs",
      "Building complete attack surface map"
    ],
    notes: [
      "More thorough but slower than subfinder",
      "Configure data sources in config.yaml",
      "Use -passive for stealth",
      "Database stored in ~/.config/amass/"
    ],
    commonErrors: [
      {
        error: "Slow performance",
        solution: "Use -passive mode or limit data sources in config"
      },
      {
        error: "Memory issues",
        solution: "Limit concurrent requests with -max-dns-queries"
      }
    ],
    tags: ["recon", "subdomains", "osint", "mapping"]
  },
  {
    id: "httpx",
    name: "httpx",
    icon: "zap",
    category: "Recon & OSINT",
    description: "Fast HTTP probing and analysis tool",
    installation: {
      title: "Installation",
      steps: [
        "Install using Go",
        "Or use Docker image",
        "Verify installation"
      ],
      code: `# Using Go
go install -v github.com/projectdiscovery/httpx/cmd/httpx@latest

# Using Docker
docker pull projectdiscovery/httpx:latest

# Verify
httpx -version`
    },
    usage: {
      title: "Basic Usage",
      description: "Probe hosts for live HTTP services and gather information",
      code: `# Basic probe
cat subdomains.txt | httpx

# With details
cat hosts.txt | httpx -status-code -title -tech-detect

# JSON output
httpx -l hosts.txt -json -o results.json

# Screenshot
httpx -l hosts.txt -screenshot`
    },
    commands: [
      { command: "-l", description: "Input file with hosts" },
      { command: "-status-code", description: "Show status codes" },
      { command: "-title", description: "Show page titles" },
      { command: "-tech-detect", description: "Detect technologies" },
      { command: "-screenshot", description: "Take screenshots" },
      { command: "-json", description: "JSON output" },
      { command: "-mc", description: "Match status codes" },
      { command: "-fc", description: "Filter status codes" },
      { command: "-threads", description: "Number of threads" }
    ],
    whenToUse: [
      "After subdomain enumeration",
      "Finding live web servers",
      "Technology fingerprinting",
      "Before vulnerability scanning"
    ],
    notes: [
      "Pairs well with subfinder output",
      "Use -tech-detect for stack identification",
      "Screenshots help visual assessment"
    ],
    commonErrors: [
      {
        error: "Too many open files",
        solution: "Reduce threads with -threads flag"
      },
      {
        error: "Connection timeouts",
        solution: "Increase timeout with -timeout flag"
      }
    ],
    tags: ["recon", "http", "probing", "enumeration"]
  },

  // Web Vulnerabilities Tools
  {
    id: "nuclei",
    name: "Nuclei",
    icon: "target",
    category: "Web Vulnerabilities",
    description: "Fast vulnerability scanner with template-based detection",
    installation: {
      title: "Installation",
      steps: [
        "Install using Go",
        "Update nuclei templates",
        "Verify installation"
      ],
      code: `# Using Go
go install -v github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest

# Update templates
nuclei -update-templates

# Verify
nuclei -version`
    },
    usage: {
      title: "Basic Usage",
      description: "Scan targets using YAML templates for various vulnerabilities",
      code: `# Basic scan
nuclei -u https://example.com

# Scan with specific templates
nuclei -u https://example.com -t cves/

# Multiple targets
nuclei -l urls.txt -t vulnerabilities/

# Severity filter
nuclei -u https://example.com -s critical,high

# Custom template
nuclei -u https://example.com -t my-template.yaml`
    },
    commands: [
      { command: "-u", description: "Target URL" },
      { command: "-l", description: "List of target URLs" },
      { command: "-t", description: "Template or folder path" },
      { command: "-s", description: "Severity filter" },
      { command: "-tags", description: "Filter by tags" },
      { command: "-o", description: "Output file" },
      { command: "-json", description: "JSON output" },
      { command: "-rate-limit", description: "Requests per second" },
      { command: "-c", description: "Concurrent templates" },
      { command: "-silent", description: "Silent mode" }
    ],
    whenToUse: [
      "Automated vulnerability scanning",
      "CVE detection",
      "Misconfigurations discovery",
      "Custom security checks",
      "CI/CD security testing"
    ],
    notes: [
      "Templates updated frequently - run -update-templates regularly",
      "Create custom templates for specific checks",
      "Use -rate-limit to avoid overwhelming targets",
      "Combine with httpx for efficient scanning"
    ],
    commonErrors: [
      {
        error: "No templates found",
        solution: "Run nuclei -update-templates to download templates"
      },
      {
        error: "Rate limited",
        solution: "Use -rate-limit flag to slow down requests"
      },
      {
        error: "False positives",
        solution: "Verify manually and adjust template matchers"
      }
    ],
    tags: ["vuln-scanner", "templates", "automation", "cve"]
  },
  {
    id: "sqlmap",
    name: "SQLMap",
    icon: "database",
    category: "Web Vulnerabilities",
    description: "Automatic SQL injection detection and exploitation tool",
    installation: {
      title: "Installation",
      steps: [
        "Clone from GitHub or use package manager",
        "Ensure Python 3 is installed",
        "Verify installation"
      ],
      code: `# Using Git
git clone https://github.com/sqlmapproject/sqlmap.git
cd sqlmap
python3 sqlmap.py --version

# Kali Linux
apt install sqlmap

# macOS
brew install sqlmap`
    },
    usage: {
      title: "Basic Usage",
      description: "Test and exploit SQL injection vulnerabilities",
      code: `# Basic test
sqlmap -u "https://example.com/page?id=1"

# With POST data
sqlmap -u "https://example.com/login" --data="user=admin&pass=test"

# Database enumeration
sqlmap -u "https://example.com/page?id=1" --dbs

# Dump table
sqlmap -u "https://example.com/page?id=1" -D dbname -T users --dump

# With cookie
sqlmap -u "https://example.com/page?id=1" --cookie="session=abc123"`
    },
    commands: [
      { command: "-u", description: "Target URL with parameter" },
      { command: "--data", description: "POST data string" },
      { command: "--dbs", description: "Enumerate databases" },
      { command: "-D", description: "Specify database" },
      { command: "-T", description: "Specify table" },
      { command: "--dump", description: "Dump table contents" },
      { command: "--cookie", description: "HTTP cookie header" },
      { command: "--level", description: "Test level (1-5)" },
      { command: "--risk", description: "Risk level (1-3)" },
      { command: "--batch", description: "Non-interactive mode" },
      { command: "--tamper", description: "Use tamper scripts" }
    ],
    whenToUse: [
      "Testing for SQL injection",
      "Exploiting confirmed SQLi",
      "Database enumeration",
      "Data extraction",
      "Privilege escalation via SQLi"
    ],
    notes: [
      "Always get authorization before testing",
      "Start with low level/risk and increase",
      "Use --tamper for WAF bypass",
      "Check all injectable parameters"
    ],
    commonErrors: [
      {
        error: "Parameter not injectable",
        solution: "Try --level=5 --risk=3 or test manually first"
      },
      {
        error: "WAF blocking requests",
        solution: "Use --tamper scripts like space2comment, randomcase"
      },
      {
        error: "Connection timeouts",
        solution: "Increase --timeout or use --delay between requests"
      }
    ],
    tags: ["sqli", "database", "exploitation", "injection"]
  },
  {
    id: "xsstrike",
    name: "XSStrike",
    icon: "code",
    category: "Web Vulnerabilities",
    description: "Advanced XSS detection and exploitation suite",
    installation: {
      title: "Installation",
      steps: [
        "Clone repository",
        "Install dependencies",
        "Run XSStrike"
      ],
      code: `# Clone and setup
git clone https://github.com/s0md3v/XSStrike.git
cd XSStrike
pip3 install -r requirements.txt

# Run
python3 xsstrike.py -h`
    },
    usage: {
      title: "Basic Usage",
      description: "Detect and exploit XSS vulnerabilities with intelligent payload generation",
      code: `# Basic scan
python3 xsstrike.py -u "https://example.com/search?q=test"

# POST request
python3 xsstrike.py -u "https://example.com/comment" --data "text=test"

# Crawl and scan
python3 xsstrike.py -u "https://example.com" --crawl

# Blind XSS
python3 xsstrike.py -u "https://example.com/page?id=1" --blind`
    },
    commands: [
      { command: "-u", description: "Target URL" },
      { command: "--data", description: "POST data" },
      { command: "--crawl", description: "Crawl and test" },
      { command: "--blind", description: "Blind XSS mode" },
      { command: "--fuzzer", description: "Fuzzing mode" },
      { command: "-t", description: "Number of threads" },
      { command: "--skip-dom", description: "Skip DOM XSS check" },
      { command: "-d", description: "Delay between requests" }
    ],
    whenToUse: [
      "Testing for reflected XSS",
      "Finding DOM-based XSS",
      "Bypassing XSS filters",
      "Generating custom payloads"
    ],
    notes: [
      "Uses intelligent analysis not just fuzzing",
      "Can detect context and generate appropriate payloads",
      "Combine with manual testing for best results"
    ],
    commonErrors: [
      {
        error: "No vulnerabilities found",
        solution: "Try manual testing with different contexts"
      },
      {
        error: "Rate limited",
        solution: "Use -d flag to add delay"
      }
    ],
    tags: ["xss", "fuzzing", "exploitation", "web"]
  },

  // Tools & Methods
  {
    id: "burpsuite",
    name: "Burp Suite",
    icon: "shield",
    category: "Tools & Methods",
    description: "Industry-standard web security testing platform",
    installation: {
      title: "Installation",
      steps: [
        "Download from PortSwigger website",
        "Install Java if needed",
        "Run installer"
      ],
      code: `# Download from
https://portswigger.net/burp/releases

# Kali Linux
apt install burpsuite

# Run
burpsuite

# Configure browser proxy: 127.0.0.1:8080`
    },
    usage: {
      title: "Basic Usage",
      description: "Intercept, modify, and analyze HTTP traffic",
      code: `# Key steps:
1. Set browser proxy to 127.0.0.1:8080
2. Import Burp CA certificate
3. Enable intercept in Proxy tab
4. Browse target application
5. Send interesting requests to Repeater/Intruder

# Useful shortcuts:
Ctrl+R - Send to Repeater
Ctrl+I - Send to Intruder
Ctrl+Shift+R - Repeat request`
    },
    commands: [
      { command: "Proxy", description: "Intercept HTTP traffic" },
      { command: "Repeater", description: "Manually modify requests" },
      { command: "Intruder", description: "Automated attacks" },
      { command: "Scanner", description: "Vulnerability scanning (Pro)" },
      { command: "Decoder", description: "Encode/decode data" },
      { command: "Comparer", description: "Compare responses" },
      { command: "Logger", description: "View all traffic" }
    ],
    whenToUse: [
      "Manual web application testing",
      "Request manipulation",
      "Authentication testing",
      "Parameter fuzzing",
      "Business logic testing"
    ],
    notes: [
      "Free Community edition has limited features",
      "Pro version includes scanner and advanced tools",
      "Install CA cert to intercept HTTPS",
      "Use scope to filter traffic"
    ],
    commonErrors: [
      {
        error: "HTTPS not working",
        solution: "Install Burp CA certificate in browser"
      },
      {
        error: "Intercept not catching requests",
        solution: "Check proxy settings and scope configuration"
      },
      {
        error: "Java errors",
        solution: "Update Java to latest version"
      }
    ],
    tags: ["proxy", "manual-testing", "web", "essential"]
  },
  {
    id: "ffuf",
    name: "ffuf",
    icon: "folder-search",
    category: "Tools & Methods",
    description: "Fast web fuzzer for content discovery and parameter fuzzing",
    installation: {
      title: "Installation",
      steps: [
        "Install using Go",
        "Download wordlists",
        "Verify installation"
      ],
      code: `# Using Go
go install github.com/ffuf/ffuf/v2@latest

# Download SecLists
git clone https://github.com/danielmiessler/SecLists.git

# Verify
ffuf -V`
    },
    usage: {
      title: "Basic Usage",
      description: "Fuzz web endpoints for directories, files, and parameters",
      code: `# Directory bruteforce
ffuf -u https://example.com/FUZZ -w wordlist.txt

# File extension fuzzing
ffuf -u https://example.com/FUZZ -w files.txt -e .php,.html,.js

# Parameter fuzzing
ffuf -u "https://example.com/api?FUZZ=test" -w params.txt

# POST data fuzzing
ffuf -u https://example.com/login -X POST -d "user=admin&pass=FUZZ" -w passwords.txt

# Subdomain fuzzing
ffuf -u https://FUZZ.example.com -w subdomains.txt`
    },
    commands: [
      { command: "-u", description: "Target URL with FUZZ keyword" },
      { command: "-w", description: "Wordlist path" },
      { command: "-e", description: "Extensions to append" },
      { command: "-X", description: "HTTP method" },
      { command: "-d", description: "POST data" },
      { command: "-H", description: "HTTP header" },
      { command: "-mc", description: "Match status codes" },
      { command: "-fc", description: "Filter status codes" },
      { command: "-fs", description: "Filter response size" },
      { command: "-t", description: "Number of threads" },
      { command: "-rate", description: "Requests per second" },
      { command: "-o", description: "Output file" }
    ],
    whenToUse: [
      "Content discovery",
      "Finding hidden endpoints",
      "Parameter bruteforcing",
      "Virtual host discovery",
      "API endpoint enumeration"
    ],
    notes: [
      "Use -fc to filter unwanted responses",
      "Calibrate with -ac for auto-calibration",
      "Use SecLists for comprehensive wordlists",
      "Rate limit to avoid detection"
    ],
    commonErrors: [
      {
        error: "Too many results",
        solution: "Use -fc to filter status codes or -fs to filter sizes"
      },
      {
        error: "Blocked by WAF",
        solution: "Reduce rate with -rate flag, use -H for custom headers"
      }
    ],
    tags: ["fuzzing", "bruteforce", "discovery", "enumeration"]
  },
  {
    id: "nmap",
    name: "Nmap",
    icon: "network",
    category: "Tools & Methods",
    description: "Network scanner for host and service discovery",
    installation: {
      title: "Installation",
      steps: [
        "Install via package manager",
        "Verify installation",
        "Update scripts"
      ],
      code: `# Kali/Debian
apt install nmap

# macOS
brew install nmap

# Windows
Download from nmap.org

# Verify
nmap --version

# Update scripts
nmap --script-updatedb`
    },
    usage: {
      title: "Basic Usage",
      description: "Scan networks, discover hosts, and enumerate services",
      code: `# Basic scan
nmap 192.168.1.1

# Full port scan
nmap -p- 192.168.1.1

# Service version detection
nmap -sV 192.168.1.1

# OS detection
nmap -O 192.168.1.1

# Aggressive scan
nmap -A 192.168.1.1

# Scan with scripts
nmap --script=vuln 192.168.1.1`
    },
    commands: [
      { command: "-sS", description: "SYN scan (stealth)" },
      { command: "-sT", description: "TCP connect scan" },
      { command: "-sU", description: "UDP scan" },
      { command: "-sV", description: "Service version detection" },
      { command: "-O", description: "OS detection" },
      { command: "-A", description: "Aggressive scan" },
      { command: "-p", description: "Port specification" },
      { command: "--script", description: "Run NSE scripts" },
      { command: "-oN/-oX", description: "Output format" },
      { command: "-T0-5", description: "Timing template" }
    ],
    whenToUse: [
      "Initial network reconnaissance",
      "Service enumeration",
      "Vulnerability discovery",
      "Port scanning",
      "Network mapping"
    ],
    notes: [
      "SYN scan requires root privileges",
      "Use -T2 or lower for stealth",
      "Scripts can be noisy - use carefully",
      "Always stay within scope"
    ],
    commonErrors: [
      {
        error: "Requires root",
        solution: "Run with sudo for SYN scans"
      },
      {
        error: "Host seems down",
        solution: "Use -Pn to skip ping check"
      }
    ],
    tags: ["network", "scanning", "enumeration", "essential"]
  },

  // Cloud & Assets
  {
    id: "cloudfox",
    name: "CloudFox",
    icon: "cloud",
    category: "Cloud & Assets",
    description: "AWS and Azure enumeration and privilege escalation tool",
    installation: {
      title: "Installation",
      steps: [
        "Install using Go",
        "Configure cloud credentials",
        "Verify installation"
      ],
      code: `# Using Go
go install github.com/BishopFox/cloudfox@latest

# Configure AWS credentials
aws configure

# Verify
cloudfox --help`
    },
    usage: {
      title: "Basic Usage",
      description: "Enumerate cloud resources and find attack paths",
      code: `# AWS - All checks
cloudfox aws --profile victim all-checks

# Specific commands
cloudfox aws principals
cloudfox aws permissions
cloudfox aws secrets

# Azure
cloudfox azure --tenant xxx all-checks`
    },
    commands: [
      { command: "all-checks", description: "Run all enumeration" },
      { command: "principals", description: "List IAM principals" },
      { command: "permissions", description: "Check permissions" },
      { command: "secrets", description: "Find secrets" },
      { command: "instances", description: "List EC2 instances" },
      { command: "--profile", description: "AWS profile to use" }
    ],
    whenToUse: [
      "Cloud security assessments",
      "Post-compromise enumeration",
      "Privilege escalation research",
      "Finding misconfigurations"
    ],
    notes: [
      "Requires valid cloud credentials",
      "Results saved to loot directory",
      "Use with proper authorization"
    ],
    commonErrors: [
      {
        error: "Invalid credentials",
        solution: "Check AWS/Azure credential configuration"
      },
      {
        error: "Access denied",
        solution: "Credentials may lack required permissions"
      }
    ],
    tags: ["cloud", "aws", "azure", "enumeration"]
  },

  // Advanced Topics
  // Advanced Topics
  {
    id: "jwt_tool",
    name: "jwt_tool",
    icon: "key",
    category: "Advanced Topics",
    description: "JWT testing and exploitation toolkit",
    installation: {
      title: "Installation",
      steps: [
        "Clone repository",
        "Install dependencies",
        "Run jwt_tool"
      ],
      code: `# Clone
git clone https://github.com/ticarpi/jwt_tool.git
cd jwt_tool

# Install dependencies
pip3 install -r requirements.txt

# Run
python3 jwt_tool.py -h`
    },
    usage: {
      title: "Basic Usage",
      description: "Test and manipulate JSON Web Tokens",
      code: `# Decode JWT
python3 jwt_tool.py <JWT>

# Test all attacks
python3 jwt_tool.py -M at -t "https://example.com" <JWT>

# Tamper mode
python3 jwt_tool.py -T <JWT>

# Sign with key
python3 jwt_tool.py -S hs256 -p "secret" <JWT>`
    },
    commands: [
      { command: "-M at", description: "All tests mode" },
      { command: "-T", description: "Tamper mode" },
      { command: "-S", description: "Sign with algorithm" },
      { command: "-p", description: "Secret/key" },
      { command: "-I", description: "Inject claims" },
      { command: "-pc", description: "Payload claim" }
    ],
    whenToUse: [
      "JWT security testing",
      "Algorithm confusion attacks",
      "Token manipulation",
      "Key guessing"
    ],
    notes: [
      "Check for none algorithm",
      "Test algorithm confusion",
      "Try common weak secrets"
    ],
    commonErrors: [
      {
        error: "Invalid token format",
        solution: "Ensure proper JWT format with three parts"
      }
    ],
    tags: ["jwt", "auth", "tokens", "exploitation"]
  },

  // Recon & OSINT - Parameter Discovery Tools
  {
    id: "arjun",
    name: "Arjun",
    icon: "search",
    category: "Recon & OSINT",
    description: "API parameter discovery tool with smart brute-forcing",
    installation: {
      title: "Installation",
      steps: [
        "Install via pip",
        "Or clone from GitHub",
        "Verify installation"
      ],
      code: `# Using pip
pip install arjun

# Or from GitHub
git clone https://github.com/s0md3v/Arjun
cd Arjun
pip install -r requirements.txt

# Verify
python arjun.py -h`
    },
    usage: {
      title: "Basic Usage",
      description: "Discover hidden API parameters using intelligent brute-forcing",
      code: `# Basic GET parameter discovery
python arjun.py -u https://site.com/endpoint.php

# POST parameter discovery with JSON
python arjun.py -u https://site.com/api -m POST -T "application/json"

# Save results to JSON
python arjun.py -u https://site.com/api -o results.json

# With custom threads
python arjun.py -u https://site.com/api -t 120`
    },
    commands: [
      { command: "-u", description: "Target URL" },
      { command: "-o", description: "Output file path" },
      { command: "-m", description: "HTTP method (GET/POST)" },
      { command: "-T", description: "Content-Type header" },
      { command: "-t", description: "Number of threads" },
      { command: "-d", description: "Raw POST data" },
      { command: "-i", description: "Input from file" },
      { command: "-p", description: "Add persistent parameters" },
      { command: "-q", description: "Quiet mode" },
      { command: "-oA", description: "Save in all formats" }
    ],
    whenToUse: [
      "API parameter discovery",
      "Pre-exploitation reconnaissance",
      "Finding hidden or undocumented parameters",
      "REST API security testing",
      "Bug bounty hunting on APIs"
    ],
    notes: [
      "Does not need parameter wordlists — discovers params automatically",
      "Uses API-specific payloads, not generic brute-force",
      "Supports JSON, form-data, and urlencoded content types",
      "Best for REST APIs rather than HTML forms",
      "Can be combined with ffuf for better coverage",
      "Requires Python 3.6+"
    ],
    commonErrors: [
      {
        error: "ConnectionError / Connection Refused",
        solution: "Ensure the server is running and URL is correct"
      },
      {
        error: "403 Forbidden",
        solution: "Add custom headers or use cookies for authentication"
      },
      {
        error: "ModuleNotFoundError",
        solution: "Install dependencies: pip install -r requirements.txt"
      }
    ],
    tags: ["api", "parameter", "discovery", "brute-force", "recon"]
  },
  {
    id: "paramspider",
    name: "ParamSpider",
    icon: "globe",
    category: "Recon & OSINT",
    description: "Passive parameter extraction from web archives",
    installation: {
      title: "Installation",
      steps: [
        "Clone from GitHub",
        "Install Python dependencies",
        "Verify installation"
      ],
      code: `# Clone repository
git clone https://github.com/devanshbatham/ParamSpider.git
cd ParamSpider
pip install -r requirements.txt

# Verify
python3 paramspider -h`
    },
    usage: {
      title: "Basic Usage",
      description: "Extract URLs with parameters from Wayback Machine and Common Crawl",
      code: `# Basic domain scan
python3 paramspider -d site.com

# Save with FUZZ placeholder
python3 paramspider -d site.com -p "FUZZ=value"

# Set depth
python3 paramspider -d site.com -l 2

# Filter by vulnerability type
python3 paramspider -d site.com | grep xss > xss.txt

# Save to file
python3 paramspider -d site.com -o output.txt`
    },
    commands: [
      { command: "-d", description: "Target domain" },
      { command: "-p", description: "Output pattern with FUZZ placeholder" },
      { command: "-l", description: "Search depth (levels)" },
      { command: "-o", description: "Output file" },
      { command: "-s", description: "Search in Google instead of Wayback" },
      { command: "-b", description: "Search engine (baidu, bing, etc.)" },
      { command: "-a", description: "Include all subdomains" },
      { command: "-q", description: "Quiet mode" }
    ],
    whenToUse: [
      "Initial reconnaissance on new targets",
      "Discovering hidden parameters without touching the target",
      "Collecting URLs before deep testing",
      "Quick parameter discovery from historical data",
      "Before using Arjun or ffuf for deeper testing"
    ],
    notes: [
      "Works passively — no direct interaction with target",
      "Uses Wayback Machine and Common Crawl as data sources",
      "Excellent for gathering initial data before active testing",
      "Results may contain outdated or invalid URLs",
      "Can be combined with Arjun for comprehensive coverage",
      "Very fast compared to interactive tools",
      "Does not work on domains without archived data"
    ],
    commonErrors: [
      {
        error: "No results found",
        solution: "Target may have no archived data. Try Google source (-s) or different domain"
      },
      {
        error: "Rate limiting from Wayback Machine",
        solution: "Add delay between requests or reduce depth"
      },
      {
        error: "ModuleNotFoundError",
        solution: "Install requirements: pip install -r requirements.txt"
      },
      {
        error: "SSL Certificate errors",
        solution: "Update requests library or use --no-check-certificate"
      }
    ],
    tags: ["passive", "recon", "parameters", "wayback", "archives"]
  },
  {
    id: "x8",
    name: "x8",
    icon: "zap",
    category: "Recon & OSINT",
    description: "Extremely fast alternative to ffuf for parameter fuzzing",
    installation: {
      title: "Installation",
      steps: [
        "Install using Go",
        "Verify installation"
      ],
      code: `# Using Go
go install github.com/tomnomnom/x8@latest

# Verify
x8 -h`
    },
    usage: {
      title: "Basic Usage",
      description: "High-speed parameter and directory fuzzing written in Go",
      code: `# Basic parameter fuzzing
x8 -u "https://site.com/endpoint?FUZZ=test" -w paramnames.txt

# Filter by status codes
x8 -u "https://site.com/api?param=FUZZ" -w values.txt --filter-status 200,403

# High-speed fuzzing with threads
x8 -u "https://site.com/endpoint" -w params.txt -t 200 --threads 50

# Multiple URLs from file
cat urls.txt | x8 -w params.txt -json`
    },
    commands: [
      { command: "-u", description: "Target URL with FUZZ placeholder" },
      { command: "-w", description: "Wordlist file path" },
      { command: "-t", description: "Concurrent requests" },
      { command: "--threads", description: "Number of execution threads" },
      { command: "--filter-status", description: "Filter by status codes" },
      { command: "-m", description: "HTTP method (GET/POST)" },
      { command: "-j", description: "JSON output" },
      { command: "-d", description: "POST data" },
      { command: "-H", description: "Custom headers" },
      { command: "--self-update", description: "Self-update to latest version" }
    ],
    whenToUse: [
      "When you need faster results than ffuf",
      "As alternative to ffuf in parameter fuzzing",
      "Scanning large URL lists quickly",
      "Combined with Arjun for comprehensive coverage",
      "In high-performance environments with many threads"
    ],
    notes: [
      "10-100x faster than ffuf in some scenarios",
      "Written in Go for high performance",
      "Compatible with standard wordlists used with ffuf",
      "Supports stdin piping for URL lists",
      "Auto-update with --self-update flag",
      "Low resource usage compared to Python tools",
      "Can be combined with gf for result filtering",
      "Suitable for quick initial fuzzing"
    ],
    commonErrors: [
      {
        error: "no response from the target",
        solution: "Check if server is running and URL is correct"
      },
      {
        error: "rate limiting / 429 Too Many Requests",
        solution: "Reduce threads or add --delay flag"
      },
      {
        error: "panic: runtime error",
        solution: "Check input and URL format"
      },
      {
        error: "wordlist file not found",
        solution: "Use full path to wordlist file"
      }
    ],
    tags: ["fuzzing", "fast", "parameter", "go", "brute-force"]
  },
  {
    id: "gf",
    name: "gf",
    icon: "filter",
    category: "Recon & OSINT",
    description: "Filter URLs by vulnerability type for efficient triaging",
    installation: {
      title: "Installation",
      steps: [
        "Install using Go",
        "Add custom patterns",
        "Verify installation"
      ],
      code: `# Using Go
go install github.com/tomnomnom/gf@latest

# Add custom XSS pattern
echo 'xss: <script>alert(1)</script>' >> ~/.gf/patterns/xss

# Verify
gf -list`
    },
    usage: {
      title: "Basic Usage",
      description: "Filter URL lists by vulnerability patterns for efficient testing",
      code: `# Filter XSS URLs
cat all_urls.txt | gf xss > xss.txt

# Filter SSRF URLs
cat all_urls.txt | gf ssrf > ssrf.txt

# Filter Open Redirect
cat all_urls.txt | gf redirect > redirect.txt

# Filter SQL Injection
cat all_urls.txt | gf sql > sql.txt

# Multiple patterns
cat all_urls.txt | gf sqli,idor > vulns.txt`
    },
    commands: [
      { command: "gf <pattern>", description: "Filter URLs by specified pattern" },
      { command: "-list", description: "List all saved patterns" },
      { command: "-save <name>", description: "Save a new pattern" },
      { command: "-rm <name>", description: "Remove a saved pattern" },
      { command: "-only", description: "Only show matching URLs" },
      { command: "-no-color", description: "Disable colored output" }
    ],
    whenToUse: [
      "After collecting large URL lists from multiple tools",
      "Quick triaging of URLs by vulnerability type",
      "Post-reconnaissance URL filtering",
      "Preparing URLs for specific vulnerability scanners",
      "In Bug Bounty workflows for efficient targeting"
    ],
    notes: [
      "Created by Tomnomnom (author of gospider, httpx)",
      "Extremely fast due to Go implementation",
      "Supports custom patterns in ~/.gf/patterns/",
      "Can be piped with other tools like httpx",
      "Reads URLs from stdin (piping)",
      "Color-codes output by pattern type",
      "Built-in patterns for common vulnerabilities",
      "Can create custom patterns for any vulnerability"
    ],
    commonErrors: [
      {
        error: "no matching patterns",
        solution: "Add custom pattern with -save or check available patterns with -list"
      },
      {
        error: "command not found",
        solution: "Ensure ~/go/bin is in PATH or reinstall"
      },
      {
        error: "empty output",
        solution: "No URLs matched the pattern, try different patterns"
      },
      {
        error: "invalid pattern name",
        solution: "Use -list to see available pattern names"
      }
    ],
    tags: ["filter", "urls", "triage", "patterns", "go", "recon"]
  }
]

export const getToolsByCategory = (category: string): ToolGuide[] => {
  return toolsData.filter(tool => tool.category === category)
}

export const getToolById = (id: string): ToolGuide | undefined => {
  return toolsData.find(tool => tool.id === id)
}

export const getAllCategories = (): string[] => {
  return [...new Set(toolsData.map(tool => tool.category))]
}
