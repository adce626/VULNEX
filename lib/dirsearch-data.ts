export interface DirsearchCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const dirsearchCategories: DirsearchCategory[] = [
  {
    category: "Installation & Setup",
    commands: [
      { command: "git clone https://github.com/maurosoria/dirsearch.git && cd dirsearch", description: "Clone from GitHub" },
      { command: "pip install -r requirements.txt", description: "Install Python dependencies" },
      { command: "python3 dirsearch.py --help", description: "Verify installation" },
    ],
  },
  {
    category: "Basic Directory Scanning",
    commands: [
      { command: "python3 dirsearch.py -u https://target.com", description: "#1 Basic scan with default wordlist" },
      { command: "python3 dirsearch.py -u https://target.com -e php,html,asp", description: "#2 Scan with specific file extensions" },
      { command: "python3 dirsearch.py -u https://target.com -x 403,404", description: "#3 Exclude 403 and 404 status codes" },
      { command: "python3 dirsearch.py -u https://target.com -t 100", description: "#4 High-speed with 100 threads" },
    ],
  },
  {
    category: "Recursive Scanning",
    commands: [
      { command: "python3 dirsearch.py -u https://target.com -r", description: "#1 Enable recursive scanning" },
      { command: "python3 dirsearch.py -u https://target.com -R 3", description: "#2 Recursive scan with max depth 3" },
      { command: "python3 dirsearch.py -u https://target.com --recursive-status 200,301", description: "#3 Recursive scan on successful status codes only" },
      { command: "python3 dirsearch.py -u https://target.com -r -e php -w custom.txt", description: "#4 Recursive scan with custom wordlist + extension" },
    ],
  },
  {
    category: "Batch & Multi-Target",
    commands: [
      { command: "python3 dirsearch.py -l targets.txt", description: "#1 Scan multiple targets from file" },
      { command: "python3 dirsearch.py -l targets.txt -t 50 --random-agent", description: "#2 Batch with random user-agents" },
      { command: "python3 dirsearch.py -u https://target.com --simple-report=report.txt", description: "#3 Generate simple text report" },
      { command: "python3 dirsearch.py -u https://target.com --json-report=report.json", description: "#4 Generate JSON report for automation" },
    ],
  },
  {
    category: "Advanced Options",
    commands: [
      { command: "python3 dirsearch.py -u https://target.com --proxy http://127.0.0.1:8080", description: "#1 Route through Burp Suite proxy" },
      { command: "python3 dirsearch.py -u https://target.com --cookies \"session=abc\"", description: "#2 Add session cookies for authenticated scan" },
      { command: "python3 dirsearch.py -u https://target.com -H \"X-Forwarded-For: 127.0.0.1\"", description: "#3 Spoof IP with custom header" },
      { command: "python3 dirsearch.py -u https://target.com --timeout 5 --max-retries 2", description: "#4 Custom timeout and retry settings" },
    ],
  },
  {
    category: "Tips & Best Practices",
    commands: [
      { command: "python3 dirsearch.py -u https://target.com -e php,bak,txt,zip,sql -x 403,404,500", description: "Useful extensions + exclude noise" },
      { command: "python3 dirsearch.py -u https://target.com -r -R 2 -t 100 --random-agent", description: "Recursive + high-speed + stealth" },
      { command: "python3 dirsearch.py -u https://target.com --full-url", description: "Show full URLs in output (copy-ready)" },
      { command: "python3 dirsearch.py -u https://target.com -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt", description: "Use DirBuster wordlist for comprehensive scanning" },
    ],
  },
]

export const dirsearchTools = [
  { name: "Dirsearch GitHub", url: "https://github.com/maurosoria/dirsearch", description: "Advanced web path brute-forcing tool" },
  { name: "SecLists — Discovery", url: "https://github.com/danielmiessler/SecLists/tree/master/Discovery/Web-Content", description: "Comprehensive wordlists for directory scanning" },
  { name: "DirBuster Wordlists", url: "https://www.kali.org/tools/dirbuster/", description: "Wordlists from OWASP DirBuster project" },
]
