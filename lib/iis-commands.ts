export const reconCommands = [
  {
    category: "Google Dorks",
    commands: [
      { command: 'intitle:"IIS Windows Server" site:*.target.com', description: "Search by page title" },
      { command: 'intext:"IIS Windows Server" site:*.target.com', description: "Search in page content" },
      { command: 'inurl:"IIS Windows Server" site:*.target.com', description: "Search in URL" },
    ],
  },
  {
    category: "Shodan Dorks",
    commands: [
      { command: 'http.title:"IIS"', description: "Search for IIS servers" },
      { command: 'org:"target" http.title:"IIS Windows Server"', description: "Search by organization" },
      { command: 'Ssl:"Company Inc." http.title:"IIS Windows Server"', description: "Search via SSL certificate" },
      { command: 'hostname:".target.com" "Microsoft-IIS/6.0"', description: "Search for specific version" },
      { command: 'product:"Microsoft IIS httpd" version:"7.5"', description: "Search by product and version" },
      { command: 'Ssl.cert.subject.CN:"target.com" http.title:"IIS Windows Server"', description: "Search via certificate CN" },
    ],
  },
  {
    category: "FOFA Dorks",
    commands: [
      { command: 'body="iis-8.5"', description: "Search in page body" },
      { command: 'server="Microsoft-IIS"', description: "Search for IIS servers" },
      { command: 'server="Microsoft-IIS/8.5"', description: "Search for specific version" },
      { command: 'server="Microsoft-IIS" && host=".example.com"', description: "Search with host filter" },
      { command: 'server="Microsoft-IIS" && domain="example.com"', description: "Search with domain filter" },
    ],
  },
  {
    category: "Hunter.how Dorks",
    commands: [
      { command: 'web.title="IIS Windows Server" and domain="target.com"', description: "Search by title and domain" },
      { command: 'header.server=="Microsoft-IIS/10" and domain="target.com"', description: "Search in headers" },
    ],
  },
  {
    category: "Header Verification",
    commands: [
      { command: "curl -I https://target.com", description: "Check response headers" },
    ],
  },
  {
    category: "Nmap Scanning",
    commands: [
      { command: "nmap -p 80,443 -sV -sC target.com", description: "Version and script scan" },
      { command: "nmap -p 80,443 --script http-iis-short-name-brute target.com", description: "Shortname brute scan" },
    ],
  },
]

export const subdomainCommands = [
  {
    category: "Passive Enumeration",
    commands: [
      { command: "subfinder -d example.com -all -silent -o subfinder.txt", description: "Subfinder" },
      { command: "assetfinder --subs-only example.com > assetfinder.txt", description: "Assetfinder" },
      { command: "amass enum -passive -d example.com -o amass_passive.txt", description: "Amass Passive" },
      { command: "findomain -t example.com -u findomain.txt", description: "Findomain" },
      { command: "chaos -d example.com > chaos.txt", description: "Chaos" },
      { command: "waybackurls example.com | unfurl -u domains > wayback.txt", description: "Wayback URLs" },
    ],
  },
  {
    category: "Active Enumeration",
    commands: [
      { command: "amass enum -active -d example.com -o amass_active.txt", description: "Amass Active" },
      { command: "dnsx -d example.com -resp -o dnsx.txt", description: "DNSX" },
      { command: "puredns bruteforce wordlist.txt example.com -o puredns.txt", description: "PureDNS Bruteforce" },
    ],
  },
  {
    category: "Merge Results",
    commands: [
      { command: "cat *.txt | sort -u > all_subdomains.txt", description: "Merge and deduplicate" },
    ],
  },
  {
    category: "Live Host Filtering",
    commands: [
      { command: "cat all_subdomains.txt | httpx-toolkit -mc 200 -sc -td -title -server | grep IIS", description: "Filter IIS servers" },
      { command: 'cat all_subdomains.txt | httpx-toolkit -mc 200 -sc -td -title -server | grep -i "IIS/7.5"', description: "Filter IIS 7.5" },
      { command: 'cat all_subdomains.txt | httpx-toolkit -mc 200 -sc -td -title -server | grep -i "IIS/8.5"', description: "Filter IIS 8.5" },
      { command: 'cat all_subdomains.txt | httpx-toolkit -mc 200 -sc -td -title -server | grep -i "IIS/10.0"', description: "Filter IIS 10.0" },
    ],
  },
]

export const scanningCommands = [
  {
    category: "Nuclei Templates",
    commands: [
      { command: "cat all_subdomains.txt | nuclei -t /nuclei-templates/http/misconfiguration/iis-shortname-detect.yaml", description: "Shortname detection" },
      { command: "cat all_subdomains.txt | nuclei -tags iis", description: "All IIS templates" },
      { command: "cat all_subdomains.txt | nuclei -tags cve", description: "CVE vulnerability scan" },
    ],
  },
  {
    category: "Shortscan Tool",
    commands: [
      { command: "shortscan http://target.com/", description: "Basic scan" },
      { command: "shortscan http://target.com/ -F", description: "Scan with expansion" },
      { command: "shortscan @targets.txt -F", description: "Scan target list" },
      { command: "shortscan http://target.com/admin", description: "Scan specific folder" },
      { command: "shortscan http://target.com/admin/", description: "Scan folder with /" },
    ],
  },
]

export const fuzzingCommands = [
  {
    category: "Basic Fuzzing",
    commands: [
      { command: 'ffuf -u "https://target.com/FUZZ" -c -ac -fs 0 -w iis.txt', description: "Basic scan" },
      { command: 'ffuf -u "https://target.com/FUZZ" -c -ac -fs 0 -w iis.txt -e .json,.js,.svc,.html,.htm,.txt,.zip,.asmx,.aspx,.7z,.ashx,.asp,.xml,.exe,.dll,.gz,.xsl,.bak,.old,.rar', description: "Scan with extensions" },
    ],
  },
  {
    category: "Wordlists",
    commands: [
      { command: 'ffuf -u "https://target.com/FUZZ" -c -ac -fs 0 -w /usr/share/dirbuster/wordlists/directory-list-2.3-medium.txt -e .json,.js,.svc,.html,.htm,.txt,.zip,.asmx,.aspx,.7z,.ashx,.asp,.xml,.exe,.dll,.gz,.xsl,.bak,.old,.rar', description: "Dirbuster Medium" },
      { command: 'ffuf -u "https://target.com/FUZZ" -c -ac -fs 0 -w /usr/share/seclists/Discovery/Web-Content/big.txt -e .json,.js,.svc,.html,.htm,.txt,.zip,.asmx,.aspx,.7z,.ashx,.asp,.xml,.exe,.dll,.gz,.xsl,.bak,.old,.rar', description: "Seclists Big" },
    ],
  },
  {
    category: "Prefix Variations",
    commands: [
      { command: 'ffuf -w iis.txt -u https://example.com/domainFUZZ -e .json,.js,.svc,.html,.htm,.txt,.zip,.asmx,.aspx,.7z,.ashx,.asp,.xml,.exe,.dll,.gz,.xsl,.bak,.old,.rar', description: "prefix: domain" },
      { command: 'ffuf -w iis.txt -u https://example.com/prodFUZZ -e .json,.js,.svc,.html,.htm,.txt,.zip,.asmx,.aspx,.7z,.ashx,.asp,.xml,.exe,.dll,.gz,.xsl,.bak,.old,.rar', description: "prefix: prod" },
      { command: 'ffuf -w iis.txt -u https://example.com/devFUZZ -e .json,.js,.svc,.html,.htm,.txt,.zip,.asmx,.aspx,.7z,.ashx,.asp,.xml,.exe,.dll,.gz,.xsl,.bak,.old,.rar', description: "prefix: dev" },
      { command: 'ffuf -w iis.txt -u https://example.com/stageFUZZ -e .json,.js,.svc,.html,.htm,.txt,.zip,.asmx,.aspx,.7z,.ashx,.asp,.xml,.exe,.dll,.gz,.xsl,.bak,.old,.rar', description: "prefix: stage" },
      { command: 'ffuf -w iis.txt -u https://example.com/apiFUZZ -e .json,.js,.svc,.html,.htm,.txt,.zip,.asmx,.aspx,.7z,.ashx,.asp,.xml,.exe,.dll,.gz,.xsl,.bak,.old,.rar', description: "prefix: api" },
      { command: 'ffuf -w iis.txt -u https://example.com/adminFUZZ -e .json,.js,.svc,.html,.htm,.txt,.zip,.asmx,.aspx,.7z,.ashx,.asp,.xml,.exe,.dll,.gz,.xsl,.bak,.old,.rar', description: "prefix: admin" },
    ],
  },
  {
    category: "Suffix Variations",
    commands: [
      { command: 'ffuf -w iis.txt -u https://example.com/FUZZdomain -e .json,.js,.svc,.html,.htm,.txt,.zip,.asmx,.aspx,.7z,.ashx,.asp,.xml,.exe,.dll,.gz,.xsl,.bak,.old,.rar', description: "suffix: domain" },
      { command: 'ffuf -w iis.txt -u https://example.com/FUZZprod -e .json,.js,.svc,.html,.htm,.txt,.zip,.asmx,.aspx,.7z,.ashx,.asp,.xml,.exe,.dll,.gz,.xsl,.bak,.old,.rar', description: "suffix: prod" },
      { command: 'ffuf -w iis.txt -u https://example.com/FUZZdev -e .json,.js,.svc,.html,.htm,.txt,.zip,.asmx,.aspx,.7z,.ashx,.asp,.xml,.exe,.dll,.gz,.xsl,.bak,.old,.rar', description: "suffix: dev" },
      { command: 'ffuf -w iis.txt -u https://example.com/FUZZapi -e .json,.js,.svc,.html,.htm,.txt,.zip,.asmx,.aspx,.7z,.ashx,.asp,.xml,.exe,.dll,.gz,.xsl,.bak,.old,.rar', description: "suffix: api" },
    ],
  },
  {
    category: "Hyphen & Underscore",
    commands: [
      { command: 'ffuf -w iis.txt -u https://example.com/FUZZ-domain -e .json,.js,.svc,.html,.htm,.txt,.zip,.asmx,.aspx,.7z,.ashx,.asp,.xml,.exe,.dll,.gz,.xsl,.bak,.old,.rar', description: "hyphen: -domain" },
      { command: 'ffuf -w iis.txt -u https://example.com/domain-FUZZ -e .json,.js,.svc,.html,.htm,.txt,.zip,.asmx,.aspx,.7z,.ashx,.asp,.xml,.exe,.dll,.gz,.xsl,.bak,.old,.rar', description: "hyphen: domain-" },
      { command: 'ffuf -w iis.txt -u https://example.com/FUZZ_domain -e .json,.js,.svc,.html,.htm,.txt,.zip,.asmx,.aspx,.7z,.ashx,.asp,.xml,.exe,.dll,.gz,.xsl,.bak,.old,.rar', description: "underscore: _domain" },
      { command: 'ffuf -w iis.txt -u https://example.com/domain_FUZZ -e .json,.js,.svc,.html,.htm,.txt,.zip,.asmx,.aspx,.7z,.ashx,.asp,.xml,.exe,.dll,.gz,.xsl,.bak,.old,.rar', description: "underscore: domain_" },
    ],
  },
  {
    category: "Version Variations",
    commands: [
      { command: 'ffuf -w iis.txt -u https://example.com/FUZZv1 -e .json,.js,.svc,.html,.htm,.txt,.zip,.asmx,.aspx,.7z,.ashx,.asp,.xml,.exe,.dll,.gz,.xsl,.bak,.old,.rar', description: "suffix: v1" },
      { command: 'ffuf -w iis.txt -u https://example.com/v1FUZZ -e .json,.js,.svc,.html,.htm,.txt,.zip,.asmx,.aspx,.7z,.ashx,.asp,.xml,.exe,.dll,.gz,.xsl,.bak,.old,.rar', description: "prefix: v1" },
      { command: 'ffuf -w iis.txt -u https://example.com/FUZZ-2024 -e .json,.js,.svc,.html,.htm,.txt,.zip,.asmx,.aspx,.7z,.ashx,.asp,.xml,.exe,.dll,.gz,.xsl,.bak,.old,.rar', description: "suffix: -2024" },
    ],
  },
]

export const shortnameCommands = [
  {
    category: "Extension-Specific Search",
    commands: [
      { command: 'ffuf -u "https://target.com/FUZZ.rar" -c -ac -fs 0 -w iis.txt', description: "Search for RAR files" },
      { command: 'ffuf -u "https://target.com/FUZZ.rar" -c -ac -fs 0 -w /usr/share/seclists/Discovery/Web-Content/big.txt', description: "RAR with Seclists" },
    ],
  },
  {
    category: "Multi-Extension Scan",
    commands: [
      { command: 'ffuf -u "https://target.com/FUZZ" -c -ac -fs 0 -w iis.txt -e .exe,.dll,.rar,.zip,.7z,.bak,.svc,.aspx', description: "Scan multiple extensions" },
    ],
  },
  {
    category: "Fullname Resolution",
    commands: [
      { command: 'ffuf -u "https://target.com/MEDIVESTFUZZ" -c -ac -fs 0 -w payloads/payloads/iis.txt -e .exe,.dll,.rar -fc 403', description: "Expand MEDIVEST~1" },
      { command: 'ffuf -u "https://target.com/FTP-Contacts/FUZZ" -c -ac -fs 0 -w payloads/payloads/iis.txt -e .json,.js,.svc,.html,.htm,.txt,.zip,.asmx,.aspx,.7z,.ashx,.asp,.xml,.exe,.dll,.gz,.xsl,.bak,.old,.rar -fc 403', description: "Scan specific folder" },
    ],
  },
]

export const iisVersions = [
  {
    version: "IIS 6.0",
    era: "Windows Server 2003",
    weaknesses: [
      "WebDAV enabled by default",
      "PUT upload misconfiguration",
      "Classic ASP applications",
      "Weak request filtering",
      "Shortname vulnerability (8.3)",
      "Outdated SSL/TLS protocols",
      "Exposed ISAPI Extensions",
    ],
    testFocus: "shortname, WebDAV, legacy ASP, weak TLS, ViewState",
    severity: "critical",
  },
  {
    version: "IIS 7.0 / 7.5",
    era: "Windows Server 2008 / 2008 R2",
    weaknesses: [
      "Shortname vulnerability (8.3) common",
      "Frequent WebDAV misconfigurations",
      "Request filtering bypass",
      "Invalid ViewState in legacy ASP.NET",
      "TRACE may be enabled",
      "Weak or predictable MachineKey",
    ],
    testFocus: "shortname, WebDAV, ViewState, weak TLS",
    severity: "high",
  },
  {
    version: "IIS 8.0 / 8.5",
    era: "Windows Server 2012 / 2012 R2",
    weaknesses: [
      "Shortname may still exist",
      "Weak upload validation",
      "WebDAV in migrated environments",
      "Legacy ASP.NET components",
      "TLS misconfiguration",
      "Verbose error pages",
    ],
    testFocus: "handler misconfig, upload abuse, legacy configs",
    severity: "medium",
  },
  {
    version: "IIS 10.0",
    era: "Windows Server 2016+",
    weaknesses: [
      "Secure by default - issues mostly from misconfig",
      "Exposed debug endpoints (trace.axd)",
      "Insecure file upload logic",
      "Weak path permissions",
      "Azure App Service errors",
      "Legacy .NET applications",
    ],
    testFocus: "application logic, access control, debug exposure, backup leaks",
    severity: "low",
  },
]

export const fileExtensions = [
  { ext: ".json", desc: "Config files, API responses, stored data" },
  { ext: ".js", desc: "JavaScript files that may expose endpoints or keys" },
  { ext: ".svc", desc: "WCF service endpoints" },
  { ext: ".html", desc: "Static web pages" },
  { ext: ".htm", desc: "Legacy web page format" },
  { ext: ".txt", desc: "Notes, logs, or exposed data" },
  { ext: ".zip", desc: "Compressed backups or archived content" },
  { ext: ".asmx", desc: "XML web services" },
  { ext: ".aspx", desc: "ASP.NET pages" },
  { ext: ".7z", desc: "Archived or packed files" },
  { ext: ".ashx", desc: "HTTP handlers for APIs or file processing" },
  { ext: ".asp", desc: "Legacy Active Server Pages" },
  { ext: ".xml", desc: "Configs, data files, or service responses" },
  { ext: ".exe", desc: "Executables, installers, or internal tools" },
  { ext: ".dll", desc: "Application libraries that may be directly accessible" },
  { ext: ".gz", desc: "Compressed backup or log files" },
  { ext: ".xsl", desc: "Stylesheets used for XML transformation" },
  { ext: ".bak", desc: "Backup copies of important files" },
  { ext: ".old", desc: "Old versions of server files" },
  { ext: ".rar", desc: "Archives containing site data or backups" },
]

export const upcomingSections = [
  { title: "Apache Hacking", description: "Coming Soon", icon: "server" },
  { title: "Nginx Exploitation", description: "Coming Soon", icon: "globe" },
  { title: "Tomcat Attacks", description: "Coming Soon", icon: "coffee" },
  { title: "Node.js Security", description: "Coming Soon", icon: "hexagon" },
]
