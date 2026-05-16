export interface GoogleDorkCategory {
  id: string
  title: string
  description: string
  dorks: { query: string; description: string }[]
}

export const lastUpdated = "2026-05-15"
export const pageDescription = "Powerful Google search operators and dork queries for vulnerability discovery, exposed data, and reconnaissance."

export const googleDorksData: GoogleDorkCategory[] = [
  {
    id: "login-admin",
    title: "Login Pages & Admin Panels",
    description: "Find administrative interfaces and login portals",
    dorks: [
      { query: 'intitle:"login" inurl:/admin', description: "Find admin login pages" },
      { query: 'inurl:/wp-admin', description: "WordPress admin panels" },
      { query: 'intitle:"index of" "admin"', description: "Open directory listing of admin" },
      { query: 'inurl:"/admin" intitle:"admin"', description: "Generic admin panels" },
      { query: 'inurl:admin.php', description: "PHP admin login pages" },
    ],
  },
  {
    id: "files-config",
    title: "Exposed Files & Configs",
    description: "Configuration files and sensitive documents exposed online",
    dorks: [
      { query: 'intitle:"index of" ".env"', description: "Exposed .env files with secrets" },
      { query: 'intitle:"index of" "config.php"', description: "Exposed PHP config files" },
      { query: 'intitle:"index of" "backup"', description: "Open backup directories" },
      { query: 'intitle:"index of" "database"', description: "Exposed database dumps" },
      { query: 'intitle:"index of" "sql" ext:sql', description: "Exposed SQL dump files" },
      { query: 'filetype:env "DB_PASSWORD"', description: "Exposed environment variables" },
      { query: 'filetype:xml "CONF" inurl:web.xml', description: "Java web.xml config files" },
      { query: 'inurl:"/phpinfo.php" intitle:"phpinfo"', description: "phpinfo() pages with server info" },
    ],
  },
  {
    id: "directory-listing",
    title: "Directory Listing",
    description: "Open directory listings exposing files and folders",
    dorks: [
      { query: 'intitle:"index of /" "parent directory"', description: "Generic open directory listing" },
      { query: 'intitle:"index of" ".git"', description: "Exposed .git repositories" },
      { query: 'intitle:"index of" "node_modules"', description: "Exposed node_modules" },
      { query: 'intitle:"index of" "backup" "wp-content"', description: "WordPress backup exposure" },
      { query: 'intitle:"index of" "log"', description: "Exposed log files" },
      { query: 'intitle:"index of" "secrets"', description: "Exposed secrets directories" },
    ],
  },
  {
    id: "sensitive-info",
    title: "Sensitive Information",
    description: "Passwords, keys, and confidential data leaks",
    dorks: [
      { query: 'intext:"password" filetype:txt', description: "Password files in text format" },
      { query: 'inurl:"/robots.txt" "Disallow"', description: "Find hidden paths via robots.txt" },
      { query: 'inurl:"/sitemap.xml"', description: "Sitemap files for page discovery" },
      { query: 'filetype:pdf "confidential"', description: "PDFs with confidential labels" },
      { query: 'intext:"ssh-rsa" "-----BEGIN"', description: "Exposed SSH private keys" },
      { query: 'intext:"API_KEY" filetype:env', description: "API keys in env files" },
      { query: 'intext:"aws_access_key_id" filetype:txt', description: "AWS access keys exposed" },
      { query: 'inurl:.gitignore "AWS"', description: "AWS secrets in gitignore files" },
    ],
  },
  {
    id: "vuln-discovery",
    title: "Vulnerability Discovery",
    description: "Find potentially vulnerable endpoints and services",
    dorks: [
      { query: 'inurl:"/wp-json/wp/v2/users"', description: "WordPress API user enumeration" },
      { query: 'inurl:"/api/v1" intitle:"API"', description: "Exposed API endpoints" },
      { query: 'inurl:"/graphql" intitle:"GraphQL"', description: "Exposed GraphQL interfaces" },
      { query: 'inurl:"debug" intitle:"debug"', description: "Debug mode enabled" },
      { query: 'inurl:"/actuator" intitle:"Actuator"', description: "Spring Boot actuator endpoints" },
      { query: 'inurl:"/swagger-ui.html"', description: "Swagger UI documentation pages" },
      { query: 'inurl:server-status "Apache"', description: "Apache server status pages" },
      { query: 'inurl:server-info "Apache"', description: "Apache server info pages" },
    ],
  },
  {
    id: "camera-iot",
    title: "Camera & IoT Dorks",
    description: "Internet-connected cameras and IoT device interfaces",
    dorks: [
      { query: 'intitle:"webcam" "live" "camera"', description: "Live webcams" },
      { query: 'inurl:"/viewer/live" "camera"', description: "Live viewer access" },
      { query: 'intitle:"DVR" "login"', description: "DVR login pages" },
      { query: 'intitle:"Network Camera" "login"', description: "Network camera logins" },
    ],
  },
  {
    id: "upload-exploit",
    title: "File Upload & Exploitation",
    description: "File upload endpoints and exploitable services",
    dorks: [
      { query: 'inurl:/file/upload intitle:"upload"', description: "File upload endpoints" },
      { query: 'inurl:/cgi-bin/ "test.cgi"', description: "CGI scripts" },
      { query: 'inurl:/wp-content/uploads/', description: "WordPress uploads directory" },
      { query: 'inurl:"/uploads/" intitle:"index of"', description: "Open uploads directory" },
    ],
  },
  {
    id: "errors-debug",
    title: "Error Messages & Debug Info",
    description: "Error pages and debug information leaks",
    dorks: [
      { query: 'intitle:"Warning" "mysql_connect"', description: "MySQL connection errors" },
      { query: 'intitle:"PHP Error"', description: "PHP error messages" },
      { query: 'inurl:"error_log" intitle:"error"', description: "Error log files" },
      { query: 'inurl:"/var/log/" intitle:"index of"', description: "Exposed system logs" },
      { query: 'intitle:"Stack Trace" filetype:html', description: "Stack trace information" },
    ],
  },
]
