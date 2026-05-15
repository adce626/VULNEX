export interface NmapCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const nmapCategories: NmapCategory[] = [
  {
    category: "Installation",
    commands: [
      {
        command: "sudo apt install nmap",
        description: "Install on Kali/Debian/Ubuntu",
      },
      {
        command: "brew install nmap",
        description: "Install on macOS via Homebrew",
      },
      {
        command: "Download from https://nmap.org/download.html",
        description: "Official binaries for Windows and other platforms",
      },
      {
        command: "nmap --version",
        description: "Verify installation",
      },
      {
        command: "nmap --script-updatedb",
        description: "Update NSE (Nmap Scripting Engine) scripts",
      },
    ],
  },
  {
    category: "Basic Scanning",
    commands: [
      {
        command: "nmap 192.168.1.1",
        description: "Basic scan of a single host (top 1000 ports)",
      },
      {
        command: "nmap -sn 192.168.1.0/24",
        description: "Ping sweep - discover live hosts in subnet",
      },
      {
        command: "nmap -p 80,443,22 192.168.1.1",
        description: "Scan specific ports only",
      },
      {
        command: "nmap -p- 192.168.1.1",
        description: "Scan all 65535 TCP ports",
      },
      {
        command: "nmap -iL targets.txt",
        description: "Scan multiple hosts from a file",
      },
    ],
  },
  {
    category: "Service & Version Detection",
    commands: [
      {
        command: "nmap -sV 192.168.1.1",
        description: "Service version detection on default ports",
      },
      {
        command: "nmap -sV -p- 192.168.1.1",
        description: "Service detection on all ports (slow but thorough)",
      },
      {
        command: "nmap -sV --version-intensity 5 192.168.1.1",
        description: "Max intensity version detection (most accurate)",
      },
      {
        command: "nmap -sV --version-light 192.168.1.1",
        description: "Fast version detection - less probes",
      },
    ],
  },
  {
    category: "OS Detection",
    commands: [
      {
        command: "nmap -O 192.168.1.1",
        description: "OS detection (requires root for best results)",
      },
      {
        command: "nmap -O --osscan-guess 192.168.1.1",
        description: "Aggressive OS guessing for ambiguous results",
      },
      {
        command: "nmap -sV -O 192.168.1.1",
        description: "OS + service version detection combined",
      },
      {
        command: "nmap -A 192.168.1.1",
        description: "Aggressive mode: OS + version + script + traceroute",
      },
    ],
  },
  {
    category: "Scan Types",
    commands: [
      {
        command: "nmap -sS 192.168.1.1",
        description: "SYN stealth scan (requires root, half-open)",
      },
      {
        command: "nmap -sT 192.168.1.1",
        description: "TCP connect scan (no root needed, full handshake)",
      },
      {
        command: "nmap -sU 192.168.1.1",
        description: "UDP scan (slower, requires root)",
      },
      {
        command: "nmap -sA 192.168.1.1",
        description: "ACK scan - detect firewall rules",
      },
      {
        command: "nmap -sW 192.168.1.1",
        description: "Window scan - detect open ports via TCP window size",
      },
      {
        command: "nmap -sX 192.168.1.1",
        description: "Xmas scan - FIN, PSH, URG flags set",
      },
    ],
  },
  {
    category: "NSE Scripts",
    commands: [
      {
        command: "nmap --script=vuln 192.168.1.1",
        description: "Run all vulnerability detection scripts",
      },
      {
        command: "nmap --script=http-enum 192.168.1.1",
        description: "Enumerate web directories and files",
      },
      {
        command: "nmap --script=http-headers 192.168.1.1",
        description: "Check HTTP security headers",
      },
      {
        command: "nmap --script=ssl-enum-ciphers -p 443 192.168.1.1",
        description: "Enumerate SSL/TLS cipher support",
      },
      {
        command: "nmap --script=banner 192.168.1.1",
        description: "Grab service banners from open ports",
      },
      {
        command: "nmap --script=ssh-brute --script-args userdb=users.txt,passdb=pass.txt -p 22 192.168.1.1",
        description: "SSH brute force using NSE",
      },
      {
        command: "nmap --script=dns-brute --script-args dns-brute.domain=example.com,dns-brute.threads=10",
        description: "DNS subdomain brute force",
      },
    ],
  },
  {
    category: "Timing & Performance",
    commands: [
      {
        command: "nmap -T0 192.168.1.1",
        description: "Paranoid timing - IDS evasion, very slow",
      },
      {
        command: "nmap -T1 192.168.1.1",
        description: "Sneaky timing - for stealth",
      },
      {
        command: "nmap -T2 192.168.1.1",
        description: "Polite timing - less bandwidth",
      },
      {
        command: "nmap -T3 192.168.1.1",
        description: "Normal timing (default)",
      },
      {
        command: "nmap -T4 192.168.1.1",
        description: "Aggressive timing - fast scan",
      },
      {
        command: "nmap -T5 192.168.1.1",
        description: "Insane timing - may miss ports",
      },
    ],
  },
  {
    category: "Output Formats",
    commands: [
      {
        command: "nmap -oN scan.txt 192.168.1.1",
        description: "Normal text output",
      },
      {
        command: "nmap -oX scan.xml 192.168.1.1",
        description: "XML output for programmatic parsing",
      },
      {
        command: "nmap -oG scan.gnmap 192.168.1.1",
        description: "Grepable output format",
      },
      {
        command: "nmap -oA scan 192.168.1.1",
        description: "All formats: normal, XML, grepable at once",
      },
      {
        command: "nmap -oH scan.html 192.168.1.1",
        description: "HTML report output",
      },
    ],
  },
  {
    category: "Firewall Evasion",
    commands: [
      {
        command: "nmap -f 192.168.1.1",
        description: "Fragment IP packets to evade firewalls",
      },
      {
        command: "nmap -D RND:10 192.168.1.1",
        description: "Decoy scan with 10 random source IPs",
      },
      {
        command: "nmap --source-port 53 192.168.1.1",
        description: "Use DNS port (53) as source to bypass firewall",
      },
      {
        command: "nmap -g 80 192.168.1.1",
        description: "Use source port 80 (HTTP) to bypass egress filters",
      },
      {
        command: "nmap --mtu 32 192.168.1.1",
        description: "Set small MTU for packet fragmentation",
      },
      {
        command: "nmap -sS --data-length 200 192.168.1.1",
        description: "Append random data to evade signatures",
      },
    ],
  },
  {
    category: "Quick Reference",
    commands: [
      {
        command: "-sS = SYN stealth scan",
        description: "Half-open TCP scan (fast, requires root)",
      },
      {
        command: "-sT = TCP connect scan",
        description: "Full TCP handshake (no root needed)",
      },
      {
        command: "-sU = UDP scan",
        description: "Scan UDP ports (slower)",
      },
      {
        command: "-sV = Version detection",
        description: "Detect service/application versions",
      },
      {
        command: "-O = OS detection",
        description: "Identify target operating system",
      },
      {
        command: "-A = Aggressive scan",
        description: "OS + version + scripts + traceroute",
      },
      {
        command: "-p = Port range",
        description: "Specify ports to scan (e.g., -p80,443 or -p-)",
      },
      {
        command: "--script = NSE scripts",
        description: "Run Nmap Scripting Engine scripts",
      },
      {
        command: "-T0-5 = Timing template",
        description: "Scan speed from paranoid (0) to insane (5)",
      },
      {
        command: "-Pn = Skip ping",
        description: "Skip host discovery, assume host is up",
      },
    ],
  },
]

export const nmapTools = [
  {
    name: "Nmap Official Site",
    url: "https://nmap.org",
    description: "Official Nmap documentation, downloads, and reference",
  },
  {
    name: "Nmap NSE Documentation",
    url: "https://nmap.org/book/nse.html",
    description: "Nmap Scripting Engine reference and script library",
  },
  {
    name: "SecLists",
    url: "https://github.com/danielmiessler/SecLists",
    description: "Wordlists for brute force with NSE scripts",
  },
  {
    name: "Nmap Network Scanning Book",
    url: "https://nmap.org/book/",
    description: "Official Nmap guide by creator Gordon Lyon (Fyodor)",
  },
]
