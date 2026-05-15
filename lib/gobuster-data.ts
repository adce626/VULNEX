export interface GobusterCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const gobusterCategories: GobusterCategory[] = [
  {
    category: "Installation & Setup",
    commands: [
      { command: "apt install gobuster", description: "Install on Kali/Debian" },
      { command: "go install github.com/OJ/gobuster/v3@latest", description: "Install via Go (cross-platform)" },
      { command: "gobuster --help", description: "Verify installation" },
    ],
  },
  {
    category: "Directory Bruteforce",
    commands: [
      { command: "gobuster dir -u https://target.com -w /usr/share/wordlists/dirb/common.txt", description: "#1 Basic directory bruteforce with common wordlist" },
      { command: "gobuster dir -u https://target.com -w wordlist.txt -x php,html,txt", description: "#2 Bruteforce with file extension discovery" },
      { command: "gobuster dir -u https://target.com -w wordlist.txt -t 100", description: "#3 High-speed with 100 threads" },
      { command: "gobuster dir -u https://target.com -w wordlist.txt -s 200,301,302 -k", description: "#4 Filter by status codes, skip TLS verification" },
    ],
  },
  {
    category: "DNS Subdomain Enumeration",
    commands: [
      { command: "gobuster dns -d target.com -w subdomains.txt", description: "#1 Basic DNS subdomain discovery" },
      { command: "gobuster dns -d target.com -w subdomains.txt -t 50", description: "#2 Fast DNS enumeration with 50 threads" },
      { command: "gobuster dns -d target.com -w subdomains.txt -r 8.8.8.8", description: "#3 Use custom DNS resolver (Google DNS)" },
      { command: "gobuster dns -d target.com -w subdomains.txt -o subdomains_found.txt", description: "#4 Save results to output file" },
    ],
  },
  {
    category: "Virtual Host Discovery",
    commands: [
      { command: "gobuster vhost -u https://target.com -w vhosts.txt", description: "#1 Basic vhost enumeration" },
      { command: "gobuster vhost -u https://target.com -w vhosts.txt -t 30", description: "#2 Vhost discovery with 30 threads" },
      { command: "gobuster vhost -u https://target.com -w vhosts.txt --append-domain", description: "#3 Append domain to wordlist entries automatically" },
      { command: "gobuster vhost -u https://target.com -w vhosts.txt -o vhosts.txt", description: "#4 Save discovered vhosts to file" },
    ],
  },
  {
    category: "Advanced Options",
    commands: [
      { command: "gobuster dir -u https://target.com -w wordlist.txt -b 404", description: "#1 Exclude specific status codes" },
      { command: "gobuster dir -u https://target.com -w wordlist.txt -P password.txt", description: "#2 Use proxy for requests" },
      { command: "gobuster dir -u https://target.com -w wordlist.txt -H \"Authorization: Bearer token\"", description: "#3 Add custom headers for auth" },
      { command: "gobuster dir -u https://target.com -w wordlist.txt -n", description: "#4 Show only status codes (no full URL)" },
    ],
  },
  {
    category: "Tips & Best Practices",
    commands: [
      { command: "gobuster dir -u https://target.com -w wordlist.txt -t 50 -x php,asp,jsp,txt", description: "Start with common extensions for web apps" },
      { command: "gobuster dns -d target.com -w subdomains.txt -r 1.1.1.1", description: "Use Cloudflare DNS for faster resolution" },
      { command: "gobuster vhost -u https://target.com -w vhosts.txt -t 20", description: "Keep threads low for vhost to avoid false positives" },
      { command: "gobuster dir -u https://target.com -w wordlist.txt -o results.txt && cat results.txt | grep -E '200|301'", description: "Filter results for accessible paths only" },
    ],
  },
]

export const gobusterTools = [
  { name: "Gobuster GitHub", url: "https://github.com/OJ/gobuster", description: "Official repository with documentation" },
  { name: "SecLists - Directory Discovery", url: "https://github.com/danielmiessler/SecLists/tree/master/Discovery/Web-Content", description: "Wordlists for directory bruteforcing" },
  { name: "SecLists - Subdomains", url: "https://github.com/danielmiessler/SecLists/tree/master/Discovery/DNS", description: "Wordlists for DNS subdomain enumeration" },
]
