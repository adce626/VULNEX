export interface HashMatch {
  name: string
  length: number
  type: string
  confidence: "high" | "medium" | "low"
  pattern: RegExp
}

export interface CSPDirective {
  name: string
  value: string
}

export interface CSPWarning {
  directive: string
  message: string
  severity: "high" | "medium" | "info"
}

export interface PortInfo {
  port: number
  service: string
  protocol: "TCP" | "UDP" | "TCP/UDP"
  description: string
  category: "Web" | "Database" | "Mail" | "File Transfer" | "Remote Access" | "Network" | "Other"
}

export const hashPatterns: HashMatch[] = [
  { name: "MD5", length: 32, type: "hash", confidence: "high", pattern: /^[a-fA-F0-9]{32}$/ },
  { name: "SHA1", length: 40, type: "hash", confidence: "high", pattern: /^[a-fA-F0-9]{40}$/ },
  { name: "SHA256", length: 64, type: "hash", confidence: "high", pattern: /^[a-fA-F0-9]{64}$/ },
  { name: "SHA384", length: 96, type: "hash", confidence: "high", pattern: /^[a-fA-F0-9]{96}$/ },
  { name: "SHA512", length: 128, type: "hash", confidence: "high", pattern: /^[a-fA-F0-9]{128}$/ },
  { name: "NTLM", length: 32, type: "hash", confidence: "medium", pattern: /^[a-fA-F0-9]{32}$/ },
  { name: "LM Hash", length: 32, type: "hash", confidence: "low", pattern: /^[a-fA-F0-9]{32}$/ },
  { name: "MySQL < 4.1", length: 16, type: "hash", confidence: "medium", pattern: /^[a-fA-F0-9]{16}$/ },
  { name: "MySQL 5", length: 41, type: "hash", confidence: "medium", pattern: /^\*[a-fA-F0-9]{40}$/ },
  { name: "CRC32", length: 8, type: "checksum", confidence: "medium", pattern: /^[a-fA-F0-9]{8}$/ },
  { name: "Adler32", length: 8, type: "checksum", confidence: "low", pattern: /^[a-fA-F0-9]{8}$/ },
  { name: "GOST R 34.11-94", length: 64, type: "hash", confidence: "low", pattern: /^[a-fA-F0-9]{64}$/ },
  { name: "Whirlpool", length: 128, type: "hash", confidence: "low", pattern: /^[a-fA-F0-9]{128}$/ },
  { name: "Blake2b-512", length: 128, type: "hash", confidence: "low", pattern: /^[a-fA-F0-9]{128}$/ },
]

export function detectHash(input: string): HashMatch[] {
  const clean = input.trim()
  if (!clean) return []
  const results: HashMatch[] = []

  if (/^\$2[aby]\$\d{2}\$[.\/A-Za-z0-9]{53}$/.test(clean)) {
    results.push({ name: "bcrypt", length: clean.length, type: "hash", confidence: "high", pattern: /./ })
    return results
  }
  if (/^\$5\$\w{16,}$/.test(clean)) {
    results.push({ name: "SHA256-Crypt", length: clean.length, type: "hash", confidence: "high", pattern: /./ })
  }
  if (/^\$6\$\w{16,}$/.test(clean)) {
    results.push({ name: "SHA512-Crypt", length: clean.length, type: "hash", confidence: "high", pattern: /./ })
  }
  if (/^[a-fA-F0-9]{32}:.+$/.test(clean)) {
    results.push({ name: "NTLM (with username)", length: clean.length, type: "hash", confidence: "high", pattern: /./ })
    return results
  }

  for (const hp of hashPatterns) {
    if (hp.pattern.test(clean)) {
      const isNtlm = hp.name === "NTLM" && clean.length === 32 && /^[a-fA-F0-9]{32}$/.test(clean)
      if (isNtlm) {
        results.push({ name: "NTLM", length: 32, type: "hash", confidence: "medium", pattern: /./ })
        continue
      }
      const isLm = hp.name === "LM Hash" && /^[a-fA-F0-9]{32}$/.test(clean)
      if (isLm && !results.some(r => r.name === "NTLM")) {
        results.push({ ...hp })
        continue
      }
      if (hp.name !== "NTLM" && hp.name !== "LM Hash") {
        if (hp.name === "MD5" && clean.length === 32) results.push({ ...hp })
        else if (hp.name === "SHA1" && clean.length === 40) results.push({ ...hp })
        else if (results.every(r => r.name !== hp.name)) results.push({ ...hp })
      }
    }
  }

  if (clean.length === 32 && /^[a-fA-F0-9]{32}$/.test(clean)) {
    if (!results.some(r => r.name === "MD5")) results.push({ name: "MD5", length: 32, type: "hash", confidence: "high", pattern: /./ })
    if (!results.some(r => r.name === "NTLM")) results.push({ name: "NTLM", length: 32, type: "hash", confidence: "medium", pattern: /./ })
    if (!results.some(r => r.name === "LM Hash")) results.push({ name: "LM Hash", length: 32, type: "hash", confidence: "low", pattern: /./ })
  }

  return results.sort((a, b) => {
    const w = { high: 3, medium: 2, low: 1 }
    return (w[b.confidence] ?? 0) - (w[a.confidence] ?? 0)
  })
}

export function parseCSP(csp: string): CSPDirective[] {
  return csp
    .split(";")
    .map(s => s.trim())
    .filter(Boolean)
    .map(s => {
      const parts = s.split(/\s+/)
      return { name: parts[0]?.trim() ?? "", value: parts.slice(1).join(" ") }
    })
    .filter(d => d.name.length > 0)
}

export function evaluateCSP(directives: CSPDirective[]): CSPWarning[] {
  const warnings: CSPWarning[] = []
  const dirMap = new Map(directives.map(d => [d.name, d.value]))

  if (!dirMap.has("default-src")) {
    warnings.push({ directive: "default-src", message: "Missing default-src — falls back to no restrictions", severity: "high" })
  }

  const scriptSrc = dirMap.get("script-src")
  if (scriptSrc) {
    if (/unsafe-inline/.test(scriptSrc)) warnings.push({ directive: "script-src", message: "unsafe-inline allows inline scripts — XSS risk", severity: "high" })
    if (/unsafe-eval/.test(scriptSrc)) warnings.push({ directive: "script-src", message: "unsafe-eval allows eval() — code injection risk", severity: "high" })
    if (/\*/.test(scriptSrc) && !/https:/.test(scriptSrc)) warnings.push({ directive: "script-src", message: "Wildcard (*) allows all sources", severity: "high" })
    if (/strict-dynamic/.test(scriptSrc)) warnings.push({ directive: "script-src", message: "strict-dynamic bypasses whitelist — verify trust model", severity: "info" })
    if (/data:/.test(scriptSrc)) warnings.push({ directive: "script-src", message: "data: URI in script-src enables script execution via data URIs", severity: "medium" })
    if (/http:/.test(scriptSrc) && !/https:/.test(scriptSrc)) warnings.push({ directive: "script-src", message: "http: allows insecure HTTP scripts", severity: "medium" })
  } else if (dirMap.has("default-src")) {
    const ds = dirMap.get("default-src") ?? ""
    if (/unsafe-inline/.test(ds)) warnings.push({ directive: "default-src", message: "default-src has unsafe-inline — affects all fetch directives", severity: "high" })
    if (/unsafe-eval/.test(ds)) warnings.push({ directive: "default-src", message: "default-src has unsafe-eval — affects all fetch directives", severity: "high" })
    if (/\*/.test(ds)) warnings.push({ directive: "default-src", message: "Wildcard (*) in default-src allows all sources", severity: "high" })
  }

  const styleSrc = dirMap.get("style-src")
  if (styleSrc && /unsafe-inline/.test(styleSrc)) {
    warnings.push({ directive: "style-src", message: "unsafe-inline in style-src allows inline styles", severity: "medium" })
  }

  if (!dirMap.has("object-src")) {
    warnings.push({ directive: "object-src", message: "Missing object-src — recommended to set 'none'", severity: "medium" })
  }
  if (!dirMap.has("base-uri")) {
    warnings.push({ directive: "base-uri", message: "Missing base-uri — risk of base tag injection", severity: "medium" })
  }
  if (!dirMap.has("frame-ancestors")) {
    warnings.push({ directive: "frame-ancestors", message: "Missing frame-ancestors — risk of clickjacking (consider X-Frame-Options)", severity: "info" })
  }

  return warnings
}

export const commonPorts: PortInfo[] = [
  { port: 20, service: "FTP Data", protocol: "TCP", description: "File Transfer Protocol data transfer", category: "File Transfer" },
  { port: 21, service: "FTP", protocol: "TCP", description: "File Transfer Protocol control", category: "File Transfer" },
  { port: 22, service: "SSH", protocol: "TCP", description: "Secure Shell remote login", category: "Remote Access" },
  { port: 23, service: "Telnet", protocol: "TCP", description: "Unencrypted remote terminal", category: "Remote Access" },
  { port: 25, service: "SMTP", protocol: "TCP", description: "Simple Mail Transfer Protocol", category: "Mail" },
  { port: 53, service: "DNS", protocol: "TCP/UDP", description: "Domain Name System", category: "Network" },
  { port: 69, service: "TFTP", protocol: "UDP", description: "Trivial File Transfer Protocol", category: "File Transfer" },
  { port: 80, service: "HTTP", protocol: "TCP", description: "Hypertext Transfer Protocol", category: "Web" },
  { port: 81, service: "HTTP Alt", protocol: "TCP", description: "Alternative HTTP port", category: "Web" },
  { port: 88, service: "Kerberos", protocol: "TCP/UDP", description: "Kerberos authentication", category: "Network" },
  { port: 110, service: "POP3", protocol: "TCP", description: "Post Office Protocol v3", category: "Mail" },
  { port: 111, service: "RPC Portmap", protocol: "TCP/UDP", description: "Remote Procedure Call port mapper", category: "Network" },
  { port: 123, service: "NTP", protocol: "UDP", description: "Network Time Protocol", category: "Network" },
  { port: 135, service: "MSRPC", protocol: "TCP/UDP", description: "Microsoft RPC endpoint mapper", category: "Remote Access" },
  { port: 137, service: "NetBIOS-NS", protocol: "UDP", description: "NetBIOS Name Service", category: "Network" },
  { port: 139, service: "NetBIOS-SSN", protocol: "TCP", description: "NetBIOS Session Service", category: "Remote Access" },
  { port: 143, service: "IMAP", protocol: "TCP", description: "Internet Message Access Protocol", category: "Mail" },
  { port: 161, service: "SNMP", protocol: "UDP", description: "Simple Network Management Protocol", category: "Network" },
  { port: 162, service: "SNMP Trap", protocol: "UDP", description: "SNMP trap notifications", category: "Network" },
  { port: 389, service: "LDAP", protocol: "TCP/UDP", description: "Lightweight Directory Access Protocol", category: "Network" },
  { port: 443, service: "HTTPS", protocol: "TCP", description: "HTTP over TLS/SSL", category: "Web" },
  { port: 445, service: "SMB", protocol: "TCP", description: "Server Message Block / CIFS", category: "Remote Access" },
  { port: 464, service: "Kerberos PW", protocol: "TCP/UDP", description: "Kerberos password change", category: "Network" },
  { port: 465, service: "SMTPS", protocol: "TCP", description: "SMTP over TLS/SSL", category: "Mail" },
  { port: 500, service: "IKE", protocol: "UDP", description: "Internet Key Exchange (IPsec)", category: "Network" },
  { port: 502, service: "Modbus", protocol: "TCP", description: "Modbus industrial protocol", category: "Other" },
  { port: 514, service: "Syslog", protocol: "UDP", description: "System logging protocol", category: "Network" },
  { port: 543, service: "Kerberos-RLOGIN", protocol: "TCP", description: "Kerberized remote login", category: "Remote Access" },
  { port: 587, service: "SMTP Submission", protocol: "TCP", description: "SMTP mail submission", category: "Mail" },
  { port: 593, service: "MSRPC-HTTP", protocol: "TCP", description: "Microsoft RPC over HTTP", category: "Remote Access" },
  { port: 631, service: "IPP", protocol: "TCP/UDP", description: "Internet Printing Protocol", category: "Other" },
  { port: 636, service: "LDAPS", protocol: "TCP", description: "LDAP over TLS/SSL", category: "Network" },
  { port: 993, service: "IMAPS", protocol: "TCP", description: "IMAP over TLS/SSL", category: "Mail" },
  { port: 995, service: "POP3S", protocol: "TCP", description: "POP3 over TLS/SSL", category: "Mail" },
  { port: 1025, service: "MSRPC-alt", protocol: "TCP", description: "Alternative Microsoft RPC", category: "Remote Access" },
  { port: 1080, service: "SOCKS", protocol: "TCP", description: "SOCKS proxy protocol", category: "Network" },
  { port: 1194, service: "OpenVPN", protocol: "UDP", description: "OpenVPN tunneling", category: "Network" },
  { port: 1352, service: "Lotus Notes", protocol: "TCP", description: "IBM Lotus Notes/Domino", category: "Other" },
  { port: 1433, service: "MSSQL", protocol: "TCP", description: "Microsoft SQL Server", category: "Database" },
  { port: 1434, service: "MSSQL Monitor", protocol: "UDP", description: "Microsoft SQL Server Monitor", category: "Database" },
  { port: 1521, service: "Oracle DB", protocol: "TCP", description: "Oracle Database listener", category: "Database" },
  { port: 1701, service: "L2TP", protocol: "UDP", description: "Layer 2 Tunneling Protocol", category: "Network" },
  { port: 1723, service: "PPTP", protocol: "TCP", description: "Point-to-Point Tunneling Protocol", category: "Network" },
  { port: 1812, service: "RADIUS Auth", protocol: "UDP", description: "RADIUS authentication", category: "Network" },
  { port: 1813, service: "RADIUS Acct", protocol: "UDP", description: "RADIUS accounting", category: "Network" },
  { port: 1883, service: "MQTT", protocol: "TCP", description: "MQTT IoT messaging protocol", category: "Other" },
  { port: 2049, service: "NFS", protocol: "TCP/UDP", description: "Network File System", category: "File Transfer" },
  { port: 2082, service: "cPanel", protocol: "TCP", description: "cPanel default port", category: "Web" },
  { port: 2083, service: "cPanel SSL", protocol: "TCP", description: "cPanel over TLS/SSL", category: "Web" },
  { port: 2222, service: "SSH Alt", protocol: "TCP", description: "Alternative SSH port", category: "Remote Access" },
  { port: 2375, service: "Docker API", protocol: "TCP", description: "Docker REST API (unencrypted)", category: "Other" },
  { port: 2376, service: "Docker API SSL", protocol: "TCP", description: "Docker REST API over TLS", category: "Other" },
  { port: 2443, service: "HTTPS Alt", protocol: "TCP", description: "Alternative HTTPS port", category: "Web" },
  { port: 2483, service: "Oracle DB Alt", protocol: "TCP", description: "Oracle Database alternative", category: "Database" },
  { port: 2484, service: "Oracle DB SSL", protocol: "TCP", description: "Oracle Database over TLS", category: "Database" },
  { port: 3000, service: "Dev Server", protocol: "TCP", description: "Common development server (Rails, Node, Django)", category: "Web" },
  { port: 3128, service: "Squid Proxy", protocol: "TCP", description: "Squid web proxy cache", category: "Network" },
  { port: 3268, service: "Global Catalog", protocol: "TCP", description: "Active Directory Global Catalog", category: "Network" },
  { port: 3306, service: "MySQL", protocol: "TCP", description: "MySQL / MariaDB database", category: "Database" },
  { port: 3310, service: "ClamAV", protocol: "TCP", description: "Clam AntiVirus daemon", category: "Other" },
  { port: 3389, service: "RDP", protocol: "TCP", description: "Remote Desktop Protocol", category: "Remote Access" },
  { port: 3443, service: "HTTPS Alt 2", protocol: "TCP", description: "Alternative HTTPS port", category: "Web" },
  { port: 3690, service: "SVN", protocol: "TCP", description: "Apache Subversion version control", category: "Other" },
  { port: 4000, service: "Dev Server Alt", protocol: "TCP", description: "Common development server port", category: "Web" },
  { port: 4369, service: "Erlang Port Mapper", protocol: "TCP", description: "Erlang/OTP port mapper (RabbitMQ)", category: "Other" },
  { port: 4444, service: "Metasploit", protocol: "TCP", description: "Metasploit listener / reverse shell", category: "Other" },
  { port: 4500, service: "IPsec NAT-T", protocol: "UDP", description: "IPsec NAT traversal", category: "Network" },
  { port: 4567, service: "Play Framework", protocol: "TCP", description: "Play Framework default", category: "Web" },
  { port: 4789, service: "VXLAN", protocol: "UDP", description: "Virtual Extensible LAN", category: "Network" },
  { port: 5000, service: "Dev Server 5k", protocol: "TCP", description: "Common dev server (Flask, Docker registries)", category: "Web" },
  { port: 5432, service: "PostgreSQL", protocol: "TCP", description: "PostgreSQL database", category: "Database" },
  { port: 5555, service: "Android ADB", protocol: "TCP", description: "Android Debug Bridge", category: "Other" },
  { port: 5672, service: "AMQP", protocol: "TCP", description: "Advanced Message Queuing Protocol (RabbitMQ)", category: "Other" },
  { port: 5900, service: "VNC", protocol: "TCP", description: "Virtual Network Computing remote desktop", category: "Remote Access" },
  { port: 5985, service: "WinRM HTTP", protocol: "TCP", description: "Windows Remote Management (HTTP)", category: "Remote Access" },
  { port: 5986, service: "WinRM HTTPS", protocol: "TCP", description: "Windows Remote Management (HTTPS)", category: "Remote Access" },
  { port: 6000, service: "X11", protocol: "TCP", description: "X Window System display server", category: "Remote Access" },
  { port: 6082, service: "Varnish", protocol: "TCP", description: "Varnish cache admin interface", category: "Web" },
  { port: 6379, service: "Redis", protocol: "TCP", description: "Redis key-value store", category: "Database" },
  { port: 6443, service: "K8s API", protocol: "TCP", description: "Kubernetes API Server", category: "Other" },
  { port: 6666, service: "IRC Alt", protocol: "TCP", description: "Alternative IRC port", category: "Other" },
  { port: 6667, service: "IRC", protocol: "TCP", description: "Internet Relay Chat", category: "Other" },
  { port: 7001, service: "WebLogic", protocol: "TCP", description: "Oracle WebLogic admin panel", category: "Web" },
  { port: 7777, service: "Terracotta", protocol: "TCP", description: "Terracotta clustering / backdoor", category: "Other" },
  { port: 8000, service: "HTTP Alt 8k", protocol: "TCP", description: "Alternative HTTP port (Django, Python)", category: "Web" },
  { port: 8008, service: "HTTP Alt", protocol: "TCP", description: "Alternative HTTP port", category: "Web" },
  { port: 8009, service: "AJP", protocol: "TCP", description: "Apache JServ Protocol", category: "Web" },
  { port: 8080, service: "HTTP Proxy", protocol: "TCP", description: "HTTP Proxy / Tomcat / Java apps", category: "Web" },
  { port: 8081, service: "HTTP Proxy Alt", protocol: "TCP", description: "Alternative HTTP proxy (Graylog, etc.)", category: "Web" },
  { port: 8082, service: "HTTP Alt 8082", protocol: "TCP", description: "Alternative HTTP port", category: "Web" },
  { port: 8086, service: "InfluxDB", protocol: "TCP", description: "InfluxDB HTTP API", category: "Database" },
  { port: 8088, service: "Spark Master", protocol: "TCP", description: "Apache Spark master web UI", category: "Other" },
  { port: 8089, service: "Splunk", protocol: "TCP", description: "Splunk management port", category: "Other" },
  { port: 8090, service: "HTTP Alt 8090", protocol: "TCP", description: "Alternative HTTP port", category: "Web" },
  { port: 8433, service: "HTTPS Alt 8433", protocol: "TCP", description: "Alternative HTTPS port", category: "Web" },
  { port: 8443, service: "HTTPS Alt", protocol: "TCP", description: "Alternative HTTPS (Tomcat, Jenkins)", category: "Web" },
  { port: 8888, service: "Jupyter", protocol: "TCP", description: "Jupyter Notebook / HTTP alt", category: "Web" },
  { port: 9000, service: "Portainer", protocol: "TCP", description: "Portainer / internal services", category: "Web" },
  { port: 9001, service: "Tor", protocol: "TCP", description: "Tor network / Supervisor", category: "Other" },
  { port: 9042, service: "Cassandra", protocol: "TCP", description: "Apache Cassandra CQL", category: "Database" },
  { port: 9090, service: "Prometheus", protocol: "TCP", description: "Prometheus monitoring", category: "Other" },
  { port: 9092, service: "Kafka", protocol: "TCP", description: "Apache Kafka broker", category: "Other" },
  { port: 9100, service: "Node Exporter", protocol: "TCP", description: "Prometheus Node Exporter", category: "Other" },
  { port: 9200, service: "Elasticsearch", protocol: "TCP", description: "Elasticsearch HTTP interface", category: "Database" },
  { port: 9300, service: "Elasticsearch Node", protocol: "TCP", description: "Elasticsearch inter-node communication", category: "Database" },
  { port: 9418, service: "Git", protocol: "TCP", description: "Git Smart Protocol", category: "Other" },
  { port: 9999, service: "HTTP Alt 9999", protocol: "TCP", description: "Alternative high HTTP port", category: "Web" },
  { port: 10000, service: "Webmin", protocol: "TCP", description: "Webmin admin panel", category: "Web" },
  { port: 11211, service: "Memcached", protocol: "TCP/UDP", description: "Memcached distributed cache", category: "Database" },
  { port: 15672, service: "RabbitMQ UI", protocol: "TCP", description: "RabbitMQ management UI", category: "Web" },
  { port: 17000, service: "HTTP Alt 17k", protocol: "TCP", description: "Alternative HTTP port", category: "Web" },
  { port: 20000, service: "HTTP Alt 20k", protocol: "TCP", description: "Alternative HTTP port (DNP, usermin)", category: "Web" },
  { port: 25565, service: "Minecraft", protocol: "TCP", description: "Minecraft game server", category: "Other" },
  { port: 27017, service: "MongoDB", protocol: "TCP", description: "MongoDB database", category: "Database" },
  { port: 32400, service: "Plex", protocol: "TCP", description: "Plex Media Server", category: "Other" },
  { port: 37777, service: "RTSP Alt", protocol: "TCP", description: "Alternative RTSP streaming", category: "Other" },
  { port: 50000, service: "SAP", protocol: "TCP", description: "SAP system dispatcher", category: "Other" },
  { port: 50070, service: "HDFS", protocol: "TCP", description: "Hadoop HDFS NameNode UI", category: "Other" },
  { port: 61616, service: "ActiveMQ", protocol: "TCP", description: "ActiveMQ message broker", category: "Other" },
]

export const categoryColors: Record<string, string> = {
  Web: "from-blue-600 to-blue-400",
  Database: "from-emerald-600 to-emerald-400",
  Mail: "from-amber-600 to-amber-400",
  "File Transfer": "from-violet-600 to-violet-400",
  "Remote Access": "from-red-600 to-red-400",
  Network: "from-cyan-600 to-cyan-400",
  Other: "from-gray-600 to-gray-400",
}

export const categoryBadgeColors: Record<string, string> = {
  Web: "bg-blue-500/20 text-blue-400",
  Database: "bg-emerald-500/20 text-emerald-400",
  Mail: "bg-amber-500/20 text-amber-400",
  "File Transfer": "bg-violet-500/20 text-violet-400",
  "Remote Access": "bg-red-500/20 text-red-400",
  Network: "bg-cyan-500/20 text-cyan-400",
  Other: "bg-gray-500/20 text-gray-400",
}

export const defaultSubdomains: string[] = [
  "www", "mail", "admin", "api", "dev", "staging", "test", "blog", "cdn", "app",
  "vault", "jenkins", "gitlab", "jira", "confluence", "grafana", "prometheus",
  "kibana", "elastic", "dashboard", "monitor", "status", "help", "support",
  "docs", "wiki", "forum", "community", "shop", "store", "billing", "pay",
  "payment", "checkout", "login", "auth", "sso", "oauth", "identity",
  "account", "profile", "user", "users", "customer", "clients", "partner",
  "portal", "manager", "console", "admin-console", "management", "operations",
  "ops", "backup", "db", "database", "sql", "mysql", "redis", "cache",
  "search", "solr", "cdn", "static", "assets", "img", "images", "media",
  "upload", "download", "files", "storage", "s3", "bucket", "data",
  "analytics", "stats", "metrics", "logs", "logging", "report", "reports",
  "webmail", "email", "smtp", "imap", "pop3", "exchange", "outlook",
  "vpn", "remote", "rdp", "ssh", "shell", "terminal", "bastion",
  "proxy", "gateway", "firewall", "waf", "ids", "ips", "security",
  "jenkins", "teamcity", "build", "ci", "cd", "deploy", "release",
  "git", "svn", "code", "repository", "repo", "artifact", "nexus",
  "chat", "slack", "discord", "irc", "xmpp", "matrix", "signal",
  "calendar", "meet", "zoom", "webex", "teams", "call", "phone",
  "video", "stream", "live", "tv", "radio", "podcast", "media",
  "news", "press", "announcement", "blog", "tutorial", "learn", "academy",
  "partners", "affiliate", "reseller", "enterprise", "business", "corp", "info",
  "about", "contact", "feedback", "survey", "vote", "poll", "event",
]

export const leetMap: Record<string, string> = {
  a: "4", e: "3", i: "1", o: "0", s: "5", t: "7", l: "1", z: "2",
  g: "9", b: "8", x: "x",
}

export function generatePermutations(domain: string, words: string[], patterns: string[]): string[] {
  const result = new Set<string>()
  const d = domain.toLowerCase().trim()
  if (!d) return []
  for (const word of words) {
    const w = word.trim().toLowerCase()
    if (!w) continue
    for (const pattern of patterns) {
      result.add(pattern.replace(/\{word\}/g, w).replace(/\{domain\}/g, d))
    }
  }
  return Array.from(result).sort()
}

export function generateWordlist(
  baseWords: string[],
  options: {
    prefixes: string[]
    suffixes: string[]
    leet: boolean
    capitalize: boolean
    numberSuffix: boolean
    numberStart: number
    numberEnd: number
    specialSuffix: boolean
    specialChars: string[]
  }
): string[] {
  const result = new Set<string>()

  for (const word of baseWords) {
    const w = word.trim()
    if (!w) continue

    result.add(w)
    if (options.capitalize) result.add(w.charAt(0).toUpperCase() + w.slice(1))
    if (options.leet) {
      const leeted = w.split("").map(c => leetMap[c.toLowerCase()] || c).join("")
      result.add(leeted)
    }

    for (const p of options.prefixes) {
      if (!p) continue
      result.add(p + w)
      if (options.capitalize) result.add(p + w.charAt(0).toUpperCase() + w.slice(1))
    }
    for (const s of options.suffixes) {
      if (!s) continue
      result.add(w + s)
      if (options.capitalize) result.add(w.charAt(0).toUpperCase() + w.slice(1) + s)
    }
    if (options.numberSuffix) {
      for (let n = options.numberStart; n <= options.numberEnd; n++) {
        result.add(w + n)
      }
    }
    if (options.specialSuffix) {
      for (const sc of options.specialChars) {
        result.add(w + sc)
      }
    }
  }

  return Array.from(result).sort()
}

export interface InteractiveToolInfo {
  id: string
  title: string
  description: string
  icon: string
  href: string
  color: string
}

export const interactiveTools: InteractiveToolInfo[] = [
  {
    id: "encoder",
    title: "Universal Encoder",
    description: "Encode and decode between Base64, URL, HTML, Hex, Unicode, JWT, Base62, Base85, Base36, Binary, Octal, and ROT13",
    icon: "Code",
    href: "/interactive/encoder",
    color: "from-cyan-600 to-teal-400",
  },
  {
    id: "jwt-debugger",
    title: "JWT Debugger",
    description: "Decode, inspect, and analyze JWT tokens — header, payload, and signature",
    icon: "Key",
    href: "/interactive/jwt-debugger",
    color: "from-amber-600 to-yellow-400",
  },
  {
    id: "hash-detector",
    title: "Hash Detector",
    description: "Identify hash types by length, prefix, and character patterns",
    icon: "Fingerprint",
    href: "/interactive/hash-detector",
    color: "from-violet-600 to-purple-400",
  },
  {
    id: "csp-evaluator",
    title: "CSP Evaluator",
    description: "Parse and analyze Content Security Policy headers for security weaknesses",
    icon: "Shield",
    href: "/interactive/csp-evaluator",
    color: "from-emerald-600 to-green-400",
  },
  {
    id: "port-visualizer",
    title: "Port Visualizer",
    description: "Browse and search common network ports with service details and categories",
    icon: "Network",
    href: "/interactive/port-visualizer",
    color: "from-sky-600 to-blue-400",
  },
]
