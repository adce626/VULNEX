export interface WPScanCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const wpscanCategories: WPScanCategory[] = [
  {
    category: "Installation & Setup",
    commands: [
      { command: "gem install wpscan", description: "Install via Ruby gem" },
      { command: "apt install wpscan", description: "Install on Kali/Debian" },
      { command: "wpscan --version", description: "Verify installation" },
    ],
  },
  {
    category: "Basic Scanning",
    commands: [
      { command: "wpscan --url https://target.com", description: "#1 Basic scan — enumerate core WordPress info" },
      { command: "wpscan --url https://target.com -e u", description: "#2 Enumerate users only" },
      { command: "wpscan --url https://target.com -e vp,vt", description: "#3 Enumerate vulnerable plugins and themes" },
      { command: "wpscan --url https://target.com --api-token TOKEN", description: "#4 Use WPVulnDB API token for vuln detection" },
    ],
  },
  {
    category: "User & Credential Enumeration",
    commands: [
      { command: "wpscan --url https://target.com --enumerate u", description: "#1 List all WordPress users" },
      { command: "wpscan --url https://target.com --enumerate u1-100", description: "#2 Enumerate users from ID 1 to 100" },
      { command: "wpscan --url https://target.com --passwords rockyou.txt --usernames admin", description: "#3 Brute-force admin password" },
      { command: "wpscan --url https://target.com --password-attack xmlrpc -t 20 -U users.txt -P pass.txt", description: "#4 XML-RPC brute-force with threads" },
    ],
  },
  {
    category: "Plugin & Theme Detection",
    commands: [
      { command: "wpscan --url https://target.com -e vp", description: "#1 Enumerate vulnerable plugins only" },
      { command: "wpscan --url https://target.com --plugins-version-detection aggressive", description: "#2 Aggressive plugin version detection" },
      { command: "wpscan --url https://target.com -e ap,at", description: "#3 Enumerate all plugins and themes" },
      { command: "wpscan --url https://target.com -e tt", description: "#4 Enumerate timthumb files" },
    ],
  },
  {
    category: "Advanced Options",
    commands: [
      { command: "wpscan --url https://target.com --random-user-agent", description: "#1 Random User-Agent to avoid blocking" },
      { command: "wpscan --url https://target.com --proxy http://127.0.0.1:8080", description: "#2 Route through Burp Suite proxy" },
      { command: "wpscan --url https://target.com --cookie \"wordpress_logged_in=abc\"", description: "#3 Authenticated scan with session cookie" },
      { command: "wpscan --url https://target.com -o output.txt --format cli-no-color", description: "#4 Save output to file, no color codes" },
    ],
  },
  {
    category: "Tips & Best Practices",
    commands: [
      { command: "wpscan --url https://target.com --api-token TOKEN -e vp,u", description: "Use API token + user + vuln plugin enum for best results" },
      { command: "wpscan --url https://target.com --plugins-version-detection passive --random-user-agent", description: "Stealth scan: passive detection + random UA" },
      { command: "wpscan --url https://target.com --password-attack xmlrpc -U admin -P rockyou.txt -t 10", description: "Targeted xmlrpc brute-force with rate limiting" },
      { command: "wpscan --url https://target.com --enumerate cb", description: "Enumerate custom 404 pages (useful for theme detection)" },
    ],
  },
]

export const wpscanTools = [
  { name: "WPScan GitHub", url: "https://github.com/wpscanteam/wpscan", description: "Official WPScan repository" },
  { name: "WPVulnDB", url: "https://wpvulndb.com", description: "WordPress vulnerability database — API key required" },
  { name: "WordPress Security", url: "https://wordpress.org/plugins/wp-security-audit-log/", description: "Official WordPress security plugin" },
]
