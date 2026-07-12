export interface NmapItem {
  name: string
  description: string
  command?: string
  note?: string
}

export interface NmapSection {
  id: string
  title: string
  description: string
  items: NmapItem[]
}

export const nmapReferenceSections: NmapSection[] = [
  {
    id: "scan-types",
    title: "SCAN TYPES",
    description: "Nmap supports multiple scan types for different network conditions and firewall configurations.",
    items: [
      {
        name: "TCP SYN Scan",
        description: "Half-open scan. Sends SYN, waits for SYN/ACK (open) or RST (closed). Fastest and most common. Requires root/Administrator privileges.",
        command: "nmap -sS <target>",
        note: "Default scan type when run as root. Hard to detect because no full connection is completed.",
      },
      {
        name: "TCP Connect Scan",
        description: "Full TCP handshake (SYN → SYN/ACK → ACK). Used when raw packet privileges are unavailable. More detectable but does not require root.",
        command: "nmap -sT <target>",
      },
      {
        name: "UDP Scan",
        description: "Sends UDP packets to target ports. ICMP port-unreachable means closed; no response means open/filtered. Significantly slower than TCP scans.",
        command: "nmap -sU <target>",
        note: "Always combine with a TCP scan: nmap -sS -sU <target>. Increase speed with --min-rate or --max-retries 1.",
      },
      {
        name: "TCP FIN Scan",
        description: "Sends FIN flag packets. Stealthy bypass for non-stateful firewalls. Closed ports reply with RST; open/filtered ports ignore the packet.",
        command: "nmap -sF <target>",
      },
      {
        name: "TCP Xmas Scan",
        description: "Sends packets with FIN, PSH, URG flags set (tree lit like a Christmas tree). Same stealth behavior as FIN scan.",
        command: "nmap -sX <target>",
      },
      {
        name: "TCP Null Scan",
        description: "Sends packets with no flags set. Same stealth behavior as FIN/Xmas scans.",
        command: "nmap -sN <target>",
      },
      {
        name: "Ping Sweep",
        description: "Host discovery without port scan. Tests which hosts are online using ICMP, TCP, or ARP probes.",
        command: "nmap -sn <target>",
        note: "Use -sn 192.168.1.0/24 to discover all live hosts on a subnet in seconds.",
      },
      {
        name: "Idle Scan",
        description: "Zombie-based stealth scan. Uses a idle host (zombie) with predictable IPID sequence to probe the target. The target sees the zombie's IP, not yours.",
        command: "nmap -sI <zombie_ip> <target>",
      },
      {
        name: "FTP Bounce Scan",
        description: "Bounces scan through an FTP server's proxy feature (PORT command). Obsolete but useful on legacy networks.",
        command: "nmap -b <ftp_server> <target>",
      },
    ],
  },
  {
    id: "nse-categories",
    title: "NSE SCRIPT CATEGORIES",
    description: "Nmap Scripting Engine scripts are organized by categories. Use --script <category> to run all scripts in a category.",
    items: [
      {
        name: "Default (-sC)",
        description: "Default script set. Balanced enumeration and discovery. Activated automatically with -A or explicitly with -sC.",
        command: "nmap -sC <target>",
      },
      {
        name: "Safe",
        description: "Scripts unlikely to crash services or disrupt operations. Good for production environments.",
        command: "nmap --script safe <target>",
      },
      {
        name: "Vulnerability",
        description: "Checks for known vulnerabilities: MS17-010, Heartbleed, Shellshock, SMBGhost, and hundreds more.",
        command: "nmap --script vuln <target>",
      },
      {
        name: "Exploit",
        description: "Attempts actual exploitation of vulnerable services. Use with caution — may crash targets.",
        command: "nmap --script exploit <target>",
      },
      {
        name: "Authentication",
        description: "Tests for authentication bypasses and default/weak credentials across services.",
        command: "nmap --script auth <target>",
      },
      {
        name: "Brute Force",
        description: "Performs brute-force attacks against various services (HTTP, FTP, SSH, Telnet, SMB, databases).",
        command: "nmap --script brute <target>",
      },
      {
        name: "Discovery",
        description: "Service and host discovery — DNS zone transfer, directory enumeration, service fingerprinting.",
        command: "nmap --script discovery <target>",
      },
      {
        name: "Intrusive",
        description: "Aggressive scripts that may crash services or trigger alerts. Includes brute, exploit, dos, and fuzzer scripts.",
        command: "nmap --script intrusive <target>",
      },
      {
        name: "Version Detection",
        description: "Service and application version detection beyond what -sV provides. Use to fine-tune service identification.",
        command: "nmap --script version <target>",
      },
      {
        name: "Broadcast",
        description: "Scripts that use broadcast discovery (ARP, DHCP, DNS, NBNS, UPnP, WS-Discovery) to find hosts on the local network.",
        command: "nmap --script broadcast <target>",
      },
      {
        name: "Malware",
        description: "Detects backdoors, rootkits, and malware infections on open ports.",
        command: "nmap --script malware <target>",
      },
      {
        name: "Denial of Service",
        description: "Tests for denial-of-service vulnerabilities. Can crash services — use only in controlled environments.",
        command: "nmap --script dos <target>",
      },
    ],
  },
  {
    id: "nse-by-service",
    title: "NSE BY SERVICE",
    description: "Targeted NSE scripts organized by common network services. Each script command is ready to run.",
    items: [
      {
        name: "SMB (445) — Vulnerability & Enumeration",
        description: "MS17-010 EternalBlue check, SMBGhost (CVE-2020-0796), share enumeration, OS discovery, user enumeration.",
        command: "nmap -p445 --script smb-vuln-ms17-010,smb-vuln-cve-2020-0796,smb-enum-shares,smb-os-discovery <target>",
      },
      {
        name: "HTTP (80,443) — Web Enumeration",
        description: "Directory brute-force, HTTP methods, security headers, webdav scan, WAF detection, CMS fingerprinting.",
        command: "nmap -p80,443 --script http-enum,http-headers,http-methods,http-webdav-scan,http-waf-detect,http-title <target>",
      },
      {
        name: "SSL/TLS — Cipher & Vulnerability",
        description: "Cipher strength enumeration, Heartbleed, POODLE, LOGJAM, certificate info, weak key detection.",
        command: "nmap -p443 --script ssl-enum-ciphers,ssl-heartbleed,ssl-cert,ssl-dh-params <target>",
      },
      {
        name: "DNS (53) — Zone & Enumeration",
        description: "Zone transfer, subdomain brute-force, DNS recursion check, service discovery (SRV records).",
        command: "nmap -p53 --script dns-zone-transfer,dns-brute,dns-recursion,dns-srv-enum <target>",
      },
      {
        name: "FTP (21) — Anonymous & Enumeration",
        description: "Anonymous FTP login check, brute-force, NFS export enumeration via FTP bounce.",
        command: "nmap -p21 --script ftp-anon,ftp-brute,ftp-syst <target>",
      },
      {
        name: "SMTP (25,465,587) — Relay & Enumeration",
        description: "Open relay detection, user enumeration via VRFY/EXPN/RCPT TO, SMTP commands.",
        command: "nmap -p25 --script smtp-open-relay,smtp-enum-users,smtp-commands <target>",
      },
      {
        name: "MySQL (3306)",
        description: "Empty password check, user enumeration, brue-force, NTLM challenge capture.",
        command: "nmap -p3306 --script mysql-empty-password,mysql-enum,mysql-brute,mysql-ntlm-info <target>",
      },
      {
        name: "MSSQL (1433)",
        description: "Empty password, brue-force, xp_cmdshell detection, NTLM info disclosure.",
        command: "nmap -p1433 --script ms-sql-empty-password,ms-sql-brute,ms-sql-xp-cmdshell,ms-sql-ntlm-info <target>",
      },
      {
        name: "SNMP (161)",
        description: "Brute-force community strings, system info, running processes, open TCP/UDP ports, installed software.",
        command: "nmap -sU -p161 --script snmp-brute,snmp-info,snmp-processes,snmp-win32-services,snmp-interfaces <target>",
      },
      {
        name: "RDP (3389)",
        description: "Encryption level enumeration, NTLM info disclosure, BlueKeep (MS12-020) check, brute-force.",
        command: "nmap -p3389 --script rdp-enum-encryption,rdp-ntlm-info,rdp-vuln-ms12-020,rdp-brute <target>",
      },
      {
        name: "Redis (6379)",
        description: "Information disclosure, brue-force attacks, unauthorized access check.",
        command: "nmap -p6379 --script redis-info,redis-brute <target>",
      },
      {
        name: "LDAP (389)",
        description: "Brute-force, anonymous bind detection, directory information tree enumeration.",
        command: "nmap -p389 --script ldap-brute,ldap-search,ldap-rootdse <target>",
      },
      {
        name: "Kerberos (88)",
        description: "User enumeration via Kerberos (AS-REP), service ticket discovery.",
        command: "nmap -p88 --script krb5-enum-users --script-args krb5-enum-users-realm='<domain>' <target>",
      },
    ],
  },
  {
    id: "output-formats",
    title: "OUTPUT FORMATS",
    description: "Nmap supports multiple output formats for automation, reporting, and further processing.",
    items: [
      {
        name: "Normal Output",
        description: "Human-readable format. Saves the same output you see on screen to a file.",
        command: "nmap -oN scan.txt <target>",
      },
      {
        name: "XML Output",
        description: "Machine-parsable XML format. Ideal for automation, integration with tools, and generating reports.",
        command: "nmap -oX scan.xml <target>",
        note: "XML can be converted to HTML reports using: xsltproc scan.xml -o scan.html",
      },
      {
        name: "Grepable Output",
        description: "One-line-per-host format. Parseable with grep, awk, sed. Useful for quick filtering.",
        command: "nmap -oG scan.gnmap <target>",
      },
      {
        name: "All Formats",
        description: "Saves normal, XML, and grepable output simultaneously with a single base filename.",
        command: "nmap -oA scan <target>",
        note: "Creates scan.nmap (normal), scan.xml, and scan.gnmap in one run.",
      },
      {
        name: "Append Output",
        description: "Appends results to an existing output file instead of overwriting it.",
        command: "nmap --append-output -oN scan.txt <target>",
      },
    ],
  },
  {
    id: "timing-templates",
    title: "TIMING TEMPLATES",
    description: "Nmap provides six timing templates (T0–T5) to control scan speed, bandwidth usage, and stealth.",
    items: [
      {
        name: "T0 — Paranoid",
        description: "Extremely slow. One packet every 5 minutes. Designed for IDS evasion. Impractical for most scenarios.",
        command: "nmap -T0 <target>",
      },
      {
        name: "T1 — Sneaky",
        description: "Very slow. One packet every 15 seconds. Still impractical but more reasonable for careful evasion.",
        command: "nmap -T1 <target>",
      },
      {
        name: "T2 — Polite",
        description: "Slow. Reduces bandwidth to minimize impact on the network. Good for production environments.",
        command: "nmap -T2 <target>",
      },
      {
        name: "T3 — Normal",
        description: "Default timing. Balances speed and accuracy. Suitable for most local network scans.",
        command: "nmap -T3 <target>",
      },
      {
        name: "T4 — Aggressive",
        description: "Fast. Assumes a reliable, low-latency network. Speeds up scans significantly. The most common choice for CTF and internal pentests.",
        command: "nmap -T4 <target>",
        note: "Use T4 for most internal pentesting scenarios. Combine with --min-rate 1000 for faster results.",
      },
      {
        name: "T5 — Insane",
        description: "Extremely fast. Minimal timeouts and retransmissions. May miss open ports on slow or congested networks.",
        command: "nmap -T5 <target>",
      },
    ],
  },
  {
    id: "firewall-evasion",
    title: "FIREWALL EVASION",
    description: "Techniques to bypass firewalls, IDS/IPS, and packet filters during network scanning.",
    items: [
      {
        name: "Decoy Scan",
        description: "Spoofs random decoy IPs alongside your real IP. The target sees multiple hosts scanning simultaneously, making it harder to identify the real source.",
        command: "nmap -D RND:10 <target>",
        note: "Use specific IPs instead of RND: nmap -D 192.168.1.10,10.0.0.1,203.0.113.5 <target>",
      },
      {
        name: "Source Port Manipulation",
        description: "Sets a specific source port for probes. Some firewalls allow common ports (53, 80, 443) through without inspection.",
        command: "nmap --source-port 53 <target>",
      },
      {
        name: "Packet Fragmentation",
        description: "Splits TCP headers across multiple packets. Makes it harder for packet filters and IDS to detect the scan type.",
        command: "nmap -f <target>",
        note: "Use -ff for even smaller fragments (16 bytes instead of 8). Fragmentation may cause instability on some networks.",
      },
      {
        name: "MTU Customization",
        description: "Sets a custom MTU (must be a multiple of 8) for even more granular packet fragmentation control.",
        command: "nmap --mtu 24 <target>",
      },
      {
        name: "MAC Address Spoofing",
        description: "Spoofs the source MAC address. Useful for bypassing MAC-based filtering on local networks.",
        command: "nmap --spoof-mac 00:11:22:33:44:55 <target>",
        note: "Use --spoof-mac 0 for a completely random MAC address.",
      },
      {
        name: "TTL Manipulation",
        description: "Sets the IP Time-To-Live value. Can be used to map network topology or evade certain filters.",
        command: "nmap --ttl 128 <target>",
      },
      {
        name: "Bad Checksum",
        description: "Sends packets with deliberately incorrect TCP/UDP checksums. Some firewalls may drop these packets, while older hosts may process them.",
        command: "nmap --badsum <target>",
      },
      {
        name: "Scan Delay",
        description: "Adds a delay between probes to avoid triggering rate-based detection systems.",
        command: "nmap --scan-delay 1s <target>",
        note: "Useful when combined with -T0 or -T1 for maximum stealth.",
      },
      {
        name: "Proxies",
        description: "Route scan through HTTP/SOCKS proxies to hide the true source IP.",
        command: "nmap --proxies http://proxy:8080,http://proxy2:8080 <target>",
      },
    ],
  },
  {
    id: "quick-one-liners",
    title: "QUICK ONE-LINERS",
    description: "Practical ready-to-use nmap commands for common penetration testing tasks.",
    items: [
      {
        name: "Quick Full Port Scan",
        description: "Scans all 65535 TCP ports at high speed. Ideal for initial reconnaissance.",
        command: "nmap -p- --min-rate 5000 -T4 <target>",
      },
      {
        name: "Service & OS Detection",
        description: "Combines OS detection, version detection, default scripts, and traceroute in a single run.",
        command: "nmap -A <target>",
        note: "Use -A sparingly — it is noisy and generates significant traffic on the target network.",
      },
      {
        name: "Vulnerability Scan",
        description: "Runs all vulnerability detection scripts against the target.",
        command: "nmap --script vuln -p- <target>",
      },
      {
        name: "All Hosts Subnet Discovery",
        description: "Discovers all live hosts on a subnet with a quick ping sweep.",
        command: "nmap -sn 192.168.1.0/24",
      },
      {
        name: "Top 1000 Ports with Scripts",
        description: "Scans top 1000 ports with version detection and default scripts.",
        command: "nmap -sV -sC <target>",
      },
      {
        name: "UDP Top 100 Scan",
        description: "Scans top 100 UDP ports with service detection.",
        command: "nmap -sU --top-ports 100 -sV <target>",
      },
      {
        name: "HTTP Full Recon",
        description: "Runs all HTTP-related scripts against web ports.",
        command: "nmap -p80,443,8080,8443 --script http-* <target>",
      },
      {
        name: "Export All Formats with Vuln Scan",
        description: "Runs a vulnerability scan and saves results in all output formats for reporting.",
        command: "nmap -oA vuln-scan --script vuln -p- <target>",
      },
      {
        name: "Stealth Corporate Scan",
        description: "Polite scan with decoys, source port 53, and fragmention for maximum stealth.",
        command: "nmap -T2 -D RND:8 --source-port 53 -f <target>",
      },
      {
        name: "SMB Quick Win",
        description: "Checks for MS17-010 EternalBlue and enumerates SMB shares in one go.",
        command: "nmap -p445 --script smb-vuln-ms17-010,smb-enum-shares --script-args smbuser=guest,smbpass='' <target>",
      },
    ],
  },
]
