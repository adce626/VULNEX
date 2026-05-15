export interface SearchsploitCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const searchsploitCategories: SearchsploitCategory[] = [
  {
    category: "Installation & Setup",
    commands: [
      { command: "apt install exploitdb", description: "Install on Kali/Debian" },
      { command: "searchsploit -u", description: "Update exploit database" },
      { command: "searchsploit --help", description: "Verify installation and show help" },
    ],
  },
  {
    category: "Basic Search",
    commands: [
      { command: "searchsploit apache 2.4", description: "#1 Search for Apache 2.4 exploits" },
      { command: "searchsploit -t wordpress", description: "#2 Search by title for WordPress exploits" },
      { command: "searchsploit -s sql injection", description: "#3 Search by description for SQL injection" },
      { command: "searchsploit linux kernel", description: "#4 Search Linux kernel exploits" },
    ],
  },
  {
    category: "Advanced Search",
    commands: [
      { command: 'searchsploit "Apache 4.2"', description: "#1 Exact phrase search with quotes" },
      { command: "searchsploit -c windows", description: "#2 Search by author" },
      { command: "searchsploit --cve 2024-", description: "#3 Search by CVE number" },
      { command: "searchsploit -j remote", description: "#4 JSON output for scripting" },
    ],
  },
  {
    category: "Exploit Details & Copying",
    commands: [
      { command: "searchsploit -p 12345", description: "#1 Show full path to exploit number 12345" },
      { command: "searchsploit -m 12345", description: "#2 Mirror/copy exploit 12345 to current directory" },
      { command: "searchsploit -w wordpress", description: "#3 Show full URL to Exploit-DB page" },
      { command: "searchsploit -x 12345", description: "#4 Examine exploit 12345 (print to stdout)" },
    ],
  },
  {
    category: "Integration with Nmap",
    commands: [
      { command: "searchsploit --nmap nmap-output.xml", description: "#1 Search exploits matching Nmap scan results" },
      { command: "nmap -sV -oX scan.xml target.com && searchsploit --nmap scan.xml", description: "#2 Full workflow: nmap scan → searchsploit lookup" },
    ],
  },
  {
    category: "Output & Filtering",
    commands: [
      { command: "searchsploit -t wordpress --exclude=\"dos\"", description: "#1 Exclude denial-of-service exploits" },
      { command: "searchsploit -o -t php", description: "#2 Output without colored formatting (pipe-safe)" },
      { command: "searchsploit -t wordpress -w | grep -v '.py'", description: "#3 Filter out Python exploits" },
      { command: "searchsploit -t wordpress -j | jq '.RESULTS_EXPLOIT[] | {Title, Path}'", description: "#4 JSON + jq for structured exploit data" },
    ],
  },
  {
    category: "Tips & Best Practices",
    commands: [
      { command: "searchsploit -t \"linux kernel\" --cve 2024 | head -10", description: "Find latest Linux kernel CVEs with exploits" },
      { command: "searchsploit -u && searchsploit -c", description: "Update database then check current counts" },
      { command: "searchsploit -t wordpress -m 12345 && python3 ./12345.py", description: "Mirror + execute workflow" },
      { command: "searchsploit --nmap scan.xml | grep -i 'high\|critical'", description: "Focus on high/critical severity matches from Nmap" },
    ],
  },
]

export const searchsploitTools = [
  { name: "Exploit-DB", url: "https://www.exploit-db.com", description: "Official Exploit Database website" },
  { name: "Searchsploit Manual", url: "https://www.exploit-db.com/searchsploit", description: "Official documentation and usage guide" },
  { name: "Nmap + Searchsploit", url: "https://www.exploit-db.com/searchsploit#nmap", description: "Integrate Nmap results with exploit lookup" },
]
