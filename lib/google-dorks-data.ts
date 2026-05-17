export interface GoogleDorkCategory {
  id: string
  title: string
  description: string
  dorks: { command: string; description: string }[]
}

export const lastUpdated = "2026-05-15"
export const pageDescription = "Powerful Google search operators and dork queries for vulnerability discovery, exposed data, and reconnaissance."

export const googleDorksData: GoogleDorkCategory[] = [
  {
    id: "login-admin",
    title: "Login Pages & Admin Panels",
    description: "Find administrative interfaces and login portals",
    dorks: [
      { command: 'intitle:"login" inurl:/admin', description: "Find admin login pages" },
      { command: 'inurl:/wp-admin', description: "WordPress admin panels" },
      { command: 'intitle:"index of" "admin"', description: "Open directory listing of admin" },
      { command: 'inurl:"/admin" intitle:"admin"', description: "Generic admin panels" },
      { command: 'inurl:admin.php', description: "PHP admin login pages" },
    ],
  },
  {
    id: "files-config",
    title: "Exposed Files & Configs",
    description: "Configuration files and sensitive documents exposed online",
    dorks: [
      { command: 'intitle:"index of" ".env"', description: "Exposed .env files with secrets" },
      { command: 'intitle:"index of" "config.php"', description: "Exposed PHP config files" },
      { command: 'intitle:"index of" "backup"', description: "Open backup directories" },
      { command: 'intitle:"index of" "database"', description: "Exposed database dumps" },
      { command: 'intitle:"index of" "sql" ext:sql', description: "Exposed SQL dump files" },
      { command: 'filetype:env "DB_PASSWORD"', description: "Exposed environment variables" },
      { command: 'filetype:xml "CONF" inurl:web.xml', description: "Java web.xml config files" },
      { command: 'inurl:"/phpinfo.php" intitle:"phpinfo"', description: "phpinfo() pages with server info" },
    ],
  },
  {
    id: "directory-listing",
    title: "Directory Listing",
    description: "Open directory listings exposing files and folders",
    dorks: [
      { command: 'intitle:"index of /" "parent directory"', description: "Generic open directory listing" },
      { command: 'intitle:"index of" ".git"', description: "Exposed .git repositories" },
      { command: 'intitle:"index of" "node_modules"', description: "Exposed node_modules" },
      { command: 'intitle:"index of" "backup" "wp-content"', description: "WordPress backup exposure" },
      { command: 'intitle:"index of" "log"', description: "Exposed log files" },
      { command: 'intitle:"index of" "secrets"', description: "Exposed secrets directories" },
    ],
  },
  {
    id: "sensitive-info",
    title: "Sensitive Information",
    description: "Passwords, keys, and confidential data leaks",
    dorks: [
      { command: 'intext:"password" filetype:txt', description: "Password files in text format" },
      { command: 'inurl:"/robots.txt" "Disallow"', description: "Find hidden paths via robots.txt" },
      { command: 'inurl:"/sitemap.xml"', description: "Sitemap files for page discovery" },
      { command: 'filetype:pdf "confidential"', description: "PDFs with confidential labels" },
      { command: 'intext:"ssh-rsa" "-----BEGIN"', description: "Exposed SSH private keys" },
      { command: 'intext:"API_KEY" filetype:env', description: "API keys in env files" },
      { command: 'intext:"aws_access_key_id" filetype:txt', description: "AWS access keys exposed" },
      { command: 'inurl:.gitignore "AWS"', description: "AWS secrets in gitignore files" },
    ],
  },
  {
    id: "vuln-discovery",
    title: "Vulnerability Discovery",
    description: "Find potentially vulnerable endpoints and services",
    dorks: [
      { command: 'inurl:"/wp-json/wp/v2/users"', description: "WordPress API user enumeration" },
      { command: 'inurl:"/api/v1" intitle:"API"', description: "Exposed API endpoints" },
      { command: 'inurl:"/graphql" intitle:"GraphQL"', description: "Exposed GraphQL interfaces" },
      { command: 'inurl:"debug" intitle:"debug"', description: "Debug mode enabled" },
      { command: 'inurl:"/actuator" intitle:"Actuator"', description: "Spring Boot actuator endpoints" },
      { command: 'inurl:"/swagger-ui.html"', description: "Swagger UI documentation pages" },
      { command: 'inurl:server-status "Apache"', description: "Apache server status pages" },
      { command: 'inurl:server-info "Apache"', description: "Apache server info pages" },
    ],
  },
  {
    id: "camera-iot",
    title: "Camera & IoT Dorks",
    description: "Internet-connected cameras and IoT device interfaces",
    dorks: [
      { command: 'intitle:"webcam" "live" "camera"', description: "Live webcams" },
      { command: 'inurl:"/viewer/live" "camera"', description: "Live viewer access" },
      { command: 'intitle:"DVR" "login"', description: "DVR login pages" },
      { command: 'intitle:"Network Camera" "login"', description: "Network camera logins" },
    ],
  },
  {
    id: "upload-exploit",
    title: "File Upload & Exploitation",
    description: "File upload endpoints and exploitable services",
    dorks: [
      { command: 'inurl:/file/upload intitle:"upload"', description: "File upload endpoints" },
      { command: 'inurl:/cgi-bin/ "test.cgi"', description: "CGI scripts" },
      { command: 'inurl:/wp-content/uploads/', description: "WordPress uploads directory" },
      { command: 'inurl:"/uploads/" intitle:"index of"', description: "Open uploads directory" },
    ],
  },
  {
    id: "errors-debug",
    title: "Error Messages & Debug Info",
    description: "Error pages and debug information leaks",
    dorks: [
      { command: 'intitle:"Warning" "mysql_connect"', description: "MySQL connection errors" },
      { command: 'intitle:"PHP Error"', description: "PHP error messages" },
      { command: 'inurl:"error_log" intitle:"error"', description: "Error log files" },
      { command: 'inurl:"/var/log/" intitle:"index of"', description: "Exposed system logs" },
      { command: 'intitle:"Stack Trace" filetype:html', description: "Stack trace information" },
    ],
  },
]
