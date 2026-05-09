export interface ShodanDorksCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const shodanDorksCategories: ShodanDorksCategory[] = [
  // =================== BASIC FILTERS ==================
  {
    category: "Basic Filters",
    commands: [
      {
        command: 'country:"SA" OR country:"US" OR country:"IN"',
        description: "#1 Filter by country code (2-letter ISO)",
      },
      {
        command: 'city:"Riyadh" OR city:"Dubai" OR city:"London"',
        description: "#2 Filter by city name",
      },
      {
        command: 'geo:"24.7136, 46.6753"',
        description: "#3 Filter by GPS coordinates (latitude, longitude)",
      },
      {
        command: 'org:"Company Name"',
        description: "#4 Most important for Bug Bounty - filter by organization",
      },
      {
        command: 'hostname:"target.com" OR hostname:"*.target.com"',
        description: "#5 Filter by hostname (wildcard supported)",
      },
      {
        command: 'port:"80" OR port:"443" OR port:"22" OR port:"3389"',
        description: "#6 Filter by port number",
      },
      {
        command: 'product:"Apache" OR product:"nginx" OR product:"Jenkins"',
        description: "#7 Filter by product name",
      },
      {
        command: 'os:"Windows" OR os:"Linux" OR os:"IOS"',
        description: "#8 Filter by operating system",
      },
      {
        command: 'version:"1.2.3"',
        description: "#9 Filter by software version",
      },
      {
        command: 'ssl.cert.subject.CN:"target.com"',
        description: "#10 Find SSL certificates with specific CN",
      },
      {
        command: 'has_screenshot:true',
        description: "#11 Only show results with screenshots",
      },
    ],
  },

  // =================== EXPOSED ADMIN PANELS ==================
  {
    category: "Exposed Admin Panels & Dashboards",
    commands: [
      {
        command: 'http.title:"Dashboard" OR http.title:"Admin" port:"80"',
        description: "#1 Dashboard/Admin panels on port 80",
      },
      {
        command: 'http.title:"Jenkins" OR http.title:"Jenkins"',
        description: "#2 Jenkins CI/CD panels",
      },
      {
        command: 'http.title:"Grafana" OR http.title:"Kibana"',
        description: "#3 Grafana/Kibana monitoring dashboards",
      },
      {
        command: 'http.title:"phpMyAdmin" OR http.favicon.hash:-123456',
        description: "#4 phpMyAdmin database management (favicon hash)",
      },
      {
        command: 'http.title:"FortiPortal" OR http.title:"FortiGate"',
        description: "#5 Fortinet FortiPortal/FortiGate",
      },
      {
        command: 'http.title:"FleetCart" OR http.title:"Forgejo" OR http.title:"Gitea"',
        description: "#6 Git repository management tools",
      },
      {
        command: 'http.title:"IPCam Client" OR http.title:"Live View" port:"80"',
        description: "#7 Camera/webcam viewing interfaces",
      },
      {
        command: 'http.title:"Blue Iris" OR http.title:"NVR" OR http.title:"DVR"',
        description: "#8 NVR/DVR surveillance systems",
      },
    ],
  },

  // =================== DATABASES & STORAGE ==================
  {
    category: "Databases & Storage",
    commands: [
      {
        command: 'product:"MongoDB" port:"27017"',
        description: "#1 MongoDB NoSQL database (default port 27017)",
      },
      {
        command: 'product:"Redis"',
        description: "#2 Redis in-memory data store",
      },
      {
        command: 'product:"MySQL" port:"3306"',
        description: "#3 MySQL database server",
      },
      {
        command: 'product:"Elasticsearch" port:"9200"',
        description: "#4 Elasticsearch search engine",
      },
      {
        command: 'product:"CouchDB" port:"5984"',
        description: "#5 CouchDB NoSQL database",
      },
      {
        command: 'port:5432 "PostgreSQL"',
        description: "#6 PostgreSQL database",
      },
      {
        command: 'port:"6379" "authentication disabled" (Redis)',
        description: "#7 Redis with authentication disabled",
      },
      {
        command: 'port:"27017" "authentication disabled" (MongoDB)',
        description: "#8 MongoDB with authentication disabled",
      },
      {
        command: 'port:9200 "MongoDB Server Information"',
        description: "#9 Elasticsearch with exposed info",
      },
    ],
  },

  // =================== CAMERAS & IOT ==================
  {
    category: "Cameras & IoT Devices",
    commands: [
      {
        command: 'product:"Hikvision IP Camera"',
        description: "#1 Hikvision IP cameras",
      },
      {
        command: 'http.title:"IPCam Client" OR Server:"webcam"',
        description: "#2 Webcam/IP camera clients",
      },
      {
        command: 'http.title:"Live View" OR http.title:"Live View" port:"80"',
        description: "#3 Live camera view interfaces",
      },
      {
        command: 'device:"webcam"',
        description: "#4 Webcam/IoT devices",
      },
      {
        command: 'http.title:"Blue Iris" OR http.title:"NVR"',
        description: "#5 Blue Iris NVR software",
      },
      {
        command: 'port:"8080" "MJPEG Stream"',
        description: "#6 MJPEG video streams on port 8080",
      },
      {
        command: 'port:"554" "RTSP/1.0"',
        description: "#7 RTSP streaming protocol",
      },
      {
        command: 'http.title:"DVR" OR http.title:"NVR" port:"80"',
        description: "#8 DVR/NVR surveillance systems",
      },
    ],
  },

  // =================== INDUSTRIAL CONTROL (ICS/SCADA) ==================
  {
    category: "Industrial Control Systems (ICS/SCADA)",
    commands: [
      {
        command: 'port:"502" (Modbus)',
        description: "#1 Modbus TCP (port 502) - ICS protocol",
      },
      {
        command: 'port:"44818" (EtherNet/IP)',
        description: "#2 EtherNet/IP (port 44818) - Rockwell Automation",
      },
      {
        command: 'port:"20000" (DNP3)',
        description: "#3 DNP3 (port 20000) - Distributed Network Protocol",
      },
      {
        command: 'port:"47808" (BACnet)',
        description: "#4 BACnet (port 47808) - Building automation",
      },
      {
        command: 'product:"Schneider Electric" OR product:"Siemens"',
        description: "#5 Schneider Electric/Siemens ICS devices",
      },
      {
        command: 'port:"443" "Rockwell" OR "Schneider"',
        description: "#6 Industrial devices on HTTPS",
      },
      {
        command: 'tag:ics',
        description: "#7 Filter by ICS tag in Shodan",
      },
      {
        command: 'port:"102" "Siemens S7"',
        description: "#8 Siemens S7 PLC (port 102)",
      },
    ],
  },

  // =================== REMOTE ACCESS & SERVICES ==================
  {
    category: "Remote Access & Services",
    commands: [
      {
        command: 'port:"22" "SSH-2.0"',
        description: "#1 SSH (port 22) - Secure Shell",
      },
      {
        command: 'port:"23" "Telnet" OR "login:"',
        description: "#2 Telnet (port 23) - Unencrypted remote access",
      },
      {
        command: 'port:"3389" "RDP" OR "NLA"',
        description: "#3 RDP (port 3389) - Remote Desktop Protocol",
      },
      {
        command: 'port:"5900" "RFB" OR "VNC"',
        description: "#4 VNC (port 5900) - Virtual Network Computing",
      },
      {
        command: 'port:"25" "SMTP" OR "220"',
        description: "#5 SMTP (port 25) - Email server",
      },
      {
        command: 'port:"139" "NetBIOS" OR "SMB"',
        description: "#6 NetBIOS/SMB (port 139) - Windows file sharing",
      },
      {
        command: 'port:"445" "SMB" OR "Microsoft-DS"',
        description: "#7 SMB (port 445) - Direct SMB over TCP",
      },
      {
        command: 'port:"1723" "PPTP"',
        description: "#8 PPTP (port 1723) - VPN protocol",
      },
    ],
  },

  // =================== SENSITIVE FILES & EXPOSED DIRECTORIES ==================
  {
    category: "Sensitive Files & Exposed Directories",
    commands: [
      {
        command: 'http.title:"Index of /"',
        description: "#1 Directory listing enabled (Index of /)",
      },
      {
        command: 'http.title:"Index of /" "parent directory"',
        description: "#2 Parent directory listing",
      },
      {
        command: 'http.html:"BEGIN RSA PRIVATE KEY" OR http.html:"BEGIN OPENSSH PRIVATE KEY"',
        description: "#3 Exposed SSH private keys in response",
      },
      {
        command: 'http.html:".env" OR http.html:"config.php" OR http.html:"database.yml"',
        description: "#4 Environment/config files exposed",
      },
      {
        command: 'http.html:"api_key" OR http.html:"aws_secret" OR http.html:"password"',
        description: "#5 API keys/secrets in HTTP response",
      },
      {
        command: 'http.html:".pem" OR http.html:".crt" OR http.html:".pfx"',
        description: "#6 Certificate/key files exposed",
      },
      {
        command: 'http.html:"id_rsa" OR http.html:"id_dsa" OR http.html:"authorized_keys"',
        description: "#7 SSH keys in HTML response",
      },
      {
        command: 'http.html:".sql" OR http.html:".db" OR http.html:".log"',
        description: "#8 Database/backup/log files exposed",
      },
    ],
  },

  // =================== BUG BOUNTY SPECIFIC RECON ==================
  {
    category: "Bug Bounty Specific Recon",
    commands: [
      {
        command: 'org:"targetcompany" http.title:"Index of /"',
        description: "#1 Find exposed directories for target org",
      },
      {
        command: 'hostname:"target.com" http.title:"Dashboard" port:"80" OR port:"443"',
        description: "#2 Admin panels for specific hostname",
      },
      {
        command: 'org:"target" port:"80" http.title:"login" OR http.title:"admin"',
        description: "#3 Login pages for target organization",
      },
      {
        command: 'hostname:"*.target.com" "authentication disabled"',
        description: "#4 Services with auth disabled on subdomains",
      },
      {
        command: 'org:"target" has_screenshot:true port:"80" OR port:"443"',
        description: "#5 Bug bounty with screenshots enabled",
      },
      {
        command: 'hostname:"target.com" ssl.cert.expired:true',
        description: "#6 Expired SSL certificates",
      },
      {
        command: 'org:"target" vuln:"CVE-2021-XXXX"',
        description: "#7 Known CVEs in target's infrastructure",
      },
    ],
  },

  // =================== ADVANCED COMBINED QUERIES ==================
  {
    category: "Advanced & Powerful Combinations",
    commands: [
      {
        command: 'org:"target" country:"US" product:"Apache" version:"2.4.49"',
        description: "#1 Org + Country + Product + Version",
      },
      {
        command: 'hostname:"target.com" http.title:"Index of /" -http.title:"login" -http.title:"admin"',
        description: "#2 Exclude login/admin from results",
      },
      {
        command: 'port:"80" OR port:"443" (org:"target") AND has_screenshot:true',
        description: "#3 Parentheses for grouping conditions",
      },
      {
        command: 'vuln:CVE-2021-41773 OR vuln:CVE-2021-44228 (Log4j)',
        description: "#4 Search for specific CVEs (Log4j example)",
      },
      {
        command: 'org:"target" after:"2025-01-01" before:"2026-01-01"',
        description: "#5 Filter by date range",
      },
      {
        command: 'http.favicon.hash:-1041246900 (Jenkins favicon)',
        description: "#6 Find services by favicon hash",
      },
      {
        command: 'org:"target" port:"443" ssl.cert.expired:true has_screenshot:true',
        description: "#7 Combined: Org + SSL expired + screenshots",
      },
    ],
  },

  // =================== MITIGATION ==================
  {
    category: "Mitigation & Prevention",
    commands: [
      {
        command: "#1: Never expose admin panels to the public internet",
        description: "Use VPN or IP whitelisting for admin access",
      },
      {
        command: "#2: Keep software updated and patched",
        description: "Monitor CVE databases for your tech stack",
      },
      {
        command: "#3: Use strong authentication and firewalls",
        description: "Change default credentials, enable 2FA, restrict ports",
      },
      {
        command: "#4: Monitor Shodan for your organization",
        description: "Set up alerts when new services appear in Shodan",
      },
      {
        command: "#5: Disable directory listing on web servers",
        description: "Configure server to prevent Index of / exposure",
      },
      {
        command: "#6: Use SSL/TLS properly with valid certificates",
        description: "Avoid self-signed or expired certificates",
      },
    ],
  },
]

export const shodanDorksTools = [
  {
    name: "Shodan",
    url: "https://www.shodan.io/",
    description: "Official Shodan search engine",
  },
  {
    name: "Shodan Dorks List",
    url: "https://github.com/coffinxp/shodan-dorks",
    description: "CoffinXP Shodan Dorks repository",
  },
  {
    name: "Shodan CLI",
    url: "https://cli.shodan.io/",
    description: "Command-line interface for Shodan",
  },
  {
    name: "Shodan API Documentation",
    url: "https://developer.shodan.io/api",
    description: "Official API docs for automated queries",
  },
]
