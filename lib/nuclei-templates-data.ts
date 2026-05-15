export interface NucleiTemplateCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const nucleiTemplateCategories: NucleiTemplateCategory[] = [
  {
    category: "Introduction",
    commands: [
      { command: "Nuclei by ProjectDiscovery automates security testing using customizable YAML templates. This guide covers custom templates for Open Redirect, WP-Setup, IIS, Git Exposure, CORS, Credential Disclosure, Blind SSRF, SQLi, CRLF, and more.", description: "Nuclei templates define request method, target endpoints, response matches, and conditions to detect vulnerabilities." },
    ],
  },
  {
    category: "Template Collection — Overview",
    commands: [
      { command: "https://github.com/coffinxp/nuclei-templates", description: "Full Nuclei template collection — private + default templates organized by vulnerability type" },
    ],
  },
  {
    category: "Open Redirect Detection",
    commands: [
      { command: "cat domains.txt | nuclei -t openRedirect.yaml --retries 2", description: "Detect open redirect by injecting query params with domain URL and checking for redirection" },
      { command: "https://infosecwriteups.com/from-zero-to-hero-hunting-high-paying-open-redirect-bugs-in-web-apps-fdb80286236e", description: "Full guide: Hunting high-paying open redirect bugs" },
    ],
  },
  {
    category: "WP-Setup Disclosure",
    commands: [
      { command: "cat domains.txt | nuclei -t wp-setup-config.yaml", description: "Identify wp-admin/setup-config.php exposing credentials — often P1 in bug bounty" },
    ],
  },
  {
    category: "Microsoft IIS Scanner",
    commands: [
      { command: "cat domains.txt | nuclei -t iis.yaml -c 30", description: "Leak sensitive files: credentials, config files, maintenance scripts from IIS servers" },
      { command: "shortscan https://domain.com -F", description: "After discovery, use ShortScan to find sensitive files and directories" },
    ],
  },
  {
    category: "Git Exposure",
    commands: [
      { command: "cat domains.txt | nuclei -t gitExposed.yaml", description: "Detect exposed .git directories leaking source code, commit history, and credentials" },
      { command: "./gitdumper.sh https://domain.com/.git/ outputdir", description: "After detection, use Git Dumper to recover deleted commits and extract repo details" },
    ],
  },
  {
    category: "CORS Misconfiguration",
    commands: [
      { command: "cat domains.txt | nuclei -t cors.yaml", description: "Detect permissive CORS policies allowing unauthorized cross-origin access" },
      { command: "curl -H 'Origin: http://example.com' -I https://domain.com/wp-json/ | grep -i -e 'access-control-allow-origin' -e 'access-control-allow-methods' -e 'access-control-allow-credentials'", description: "Verify CORS via curl — check for permissive ACAO headers" },
      { command: "curl -H 'Origin: http://example.com' -I https://domain.com/wp-json/", description: "Basic CORS verification — check if Origin is reflected in ACAO" },
      { command: "https://github.com/coffinxp/scripts/blob/main/CorsExploit.html", description: "CORS PoC exploit HTML — test CORS vulnerabilities in browser" },
    ],
  },
  {
    category: "Credential Disclosure",
    commands: [
      { command: "cat domains.txt | nuclei -t credentials-disclosure-all.yaml -c 30", description: "Detect exposed passwords, API keys, and sensitive credentials in web responses" },
    ],
  },
  {
    category: "Blind SSRF",
    commands: [
      { command: "cat domains.txt | nuclei -t blind-ssrf.yaml -c 30 -dast", description: "Detect blind SSRF — server makes requests to internal systems without visible response" },
    ],
  },
  {
    category: "SQL Injection (Error-Based)",
    commands: [
      { command: "cat domains.txt | nuclei -t errorsqli.yaml -dast", description: "Detect error-based SQL injection via Nuclei template" },
    ],
  },
  {
    category: "Swagger XSS Detection",
    commands: [
      { command: "subfinder -d domain.com -all -silent | httpx-toolkit -path /swagger-api/ -sc -content-length -mc 200", description: "Find Swagger/OpenAPI endpoints exposed on subdomains" },
      { command: "https://github.com/coffinxp/swagger", description: "Swagger XSS testing resources and payloads" },
      { command: "https://infosecwriteups.com/the-dark-side-of-swagger-ui-how-xss-and-html-injection-can-compromise-apis-1b670972a443", description: "Full guide: Swagger XSS and HTML injection in APIs" },
    ],
  },
  {
    category: "CRLF Injection",
    commands: [
      { command: "cat domains.txt | nuclei -t cRlf.yaml -rl 50 -c 30", description: "Detect CRLF injection — HTTP response splitting via newline injection" },
      { command: "curl -I \"https://domain.com/%0aSet-Cookie:coffin=hi;\"", description: "Verify CRLF via curl — inject Set-Cookie header with %0a" },
      { command: "https://infosecwriteups.com/master-crlf-injection-the-underrated-bug-with-dangerous-potential-33bb0d62e031", description: "Full guide: Master CRLF injection techniques" },
    ],
  },
  {
    category: "Conclusion",
    commands: [
      { command: "Nuclei custom templates automate security testing with flexibility and accuracy. Master them to enhance your vulnerability scanning — whether beginner or advanced.", description: "Full collection: github.com/coffinxp/nuclei-templates. More templates added regularly." },
    ],
  },
]

export const nucleiTemplateTools = [
  { name: "Nuclei Templates Collection", url: "https://github.com/coffinxp/nuclei-templates", description: "Custom Nuclei templates for Open Redirect, WP-Setup, IIS, Git, CORS, CRLF, SSRF, SQLi, and more" },
  { name: "CORS PoC Exploit", url: "https://github.com/coffinxp/scripts/blob/main/CorsExploit.html", description: "Browser-based CORS vulnerability PoC" },
  { name: "Swagger XSS Resources", url: "https://github.com/coffinxp/swagger", description: "Swagger/OpenAPI XSS testing payloads and resources" },
]
