export interface CommandItem {
  cmd: string
  desc: string
}

export interface SectionBlock {
  title: string
  text: string
  commands: CommandItem[]
  tips: string[]
}

export interface ReconChapter {
  id: string
  number: number
  title: string
  subtitle: string
  overview: string
  sections: SectionBlock[]
  tools: { name: string; desc: string; install?: string; link?: string }[]
  summary: string
  color: string
}

export const reconFlowChapters: ReconChapter[] = [
  {
    id: "subdomain-enumeration",
    number: 1,
    title: "Subdomain Enumeration & Asset Discovery",
    subtitle: "Map the target's entire digital footprint before you attack",
    color: "oklch(0.55 0.22 25)",
    overview:
      "Subdomain enumeration is the first and most critical step in any bug bounty engagement. The more assets you find, the larger your attack surface. Start passive to stay under the radar, then go active to uncover hidden gems. Combine multiple sources and tools — no single tool finds everything.",
    sections: [
      {
        title: "Passive Reconnaissance",
        text: "Passive techniques gather subdomains without touching the target's servers. Start here — it's silent, fast, and often reveals 60-70% of all subdomains. Certificate Transparency logs, DNS dataset dumps, and search engines are your best friends. Combine multiple passive tools — each one queries different sources and no single tool catches everything.",
        commands: [
          {
            cmd: "subfinder -d example.com -o passive-subs.txt",
            desc: "Passive subdomain enumeration using 30+ sources (CT logs, DNS dumps, search engines, APIs)",
          },
          {
            cmd: "subfinder -d example.com -all -o all-passive.txt",
            desc: "Enable all passive sources including slower APIs (Shodan, Virustotal, SecurityTrails)",
          },
          {
            cmd: "curl -s 'https://crt.sh/?q=%25.example.com&output=json' | jq -r '.[].name_value' | sort -u",
            desc: "Query Certificate Transparency logs directly for all issued certificates on the domain",
          },
          {
            cmd: "curl -s 'https://crt.sh/?q=%25.example.com&output=json' | jq -r '.[].name_value' | sed 's/\\*\\\.//g' | sort -u > crtsh-subs.txt",
            desc: "Same as above but filter out wildcard entries for a cleaner subdomain list",
          },
          {
            cmd: "findomain --target example.com --output",
            desc: "Fast passive subdomain discovery using Certificate Transparency, AnubisDB, and other sources",
          },
          {
            cmd: "assetfinder --subs-only example.com > assetfinder-subs.txt",
            desc: "Simple passive subdomain discovery using various sources including crt.sh and DNS",
          },
          {
            cmd: "cat passive-subs.txt | dnsx -silent -o live-subs.txt",
            desc: "Validate discovered subdomains — only keep those that resolve to an IP address",
          },
          {
            cmd: "cat *.txt | sort -u | grep -E '^[a-zA-Z0-9.-]+\\.example\\.com$' > all-passive-unique.txt",
            desc: "Merge all passive sources into one deduplicated and filtered list",
          },
          {
            cmd: "chaos -d example.com -key $CHAOS_KEY -o chaos-subs.txt",
            desc: "Fetch subdomains from ProjectDiscovery's Chaos dataset — curated passive dataset updated daily",
          },
          {
            cmd: "curl -s 'https://api.securitytrails.com/v1/domain/example.com/subdomains' -H 'APIKEY: YOUR_KEY' | jq -r '.subdomains[]' | awk '{print $0\".example.com\"}' > securitytrails-subs.txt",
            desc: "SecurityTrails API — excellent passive source with historical subdomain data",
          },
        ],
        tips: [
          "Set up API keys for subfinder: export the keys in your shell config for better coverage (Shodan, Virustotal, SecurityTrails, Censys)",
          "Certificate Transparency is the single most reliable passive source — always run crt.sh independently",
          "Run passive enumeration in the background while you work on other parts of the engagement",
          "Merge ALL passive outputs before moving to active — you'll get 30-40% more subs by combining tools",
          "Create a shell script that runs all passive tools sequentially and merges the output automatically",
        ],
      },
      {
        title: "Certificate Transparency & SSL Analysis",
        text: "Certificate Transparency logs are the richest passive source for subdomain discovery. Every time an organization issues an SSL certificate, the domain is logged in a public CT log. Beyond subdomain enumeration, SSL certificates reveal expiration dates, issuer details, alternate domain names (SANs), and often expose staging/dev certificates that aren't in any DNS wordlist.",
        commands: [
          {
            cmd: "curl -s 'https://crt.sh/?q=%25.example.com&output=json' | jq -r '.[].name_value' | sort -u > crtsh-all.txt",
            desc: "Full CT log dump from crt.sh — the most comprehensive free CT source",
          },
          {
            cmd: "curl -s 'https://crt.sh/?q=%25.example.com&output=json' | jq -r '.[].name_value' | sed 's/\\*\\.//g' | anew subs-found.txt",
            desc: "Strip wildcard prefixes and append only new subdomains to your master list",
          },
          {
            cmd: "tlsx -san -cn -host example.com -o tlsx-output.txt",
            desc: "Fast TLS certificate enumeration — extract SANs (Subject Alternative Names) and CNs from certificates",
          },
          {
            cmd: "echo example.com | tlsx -san -cn -so -o cert-domains.txt",
            desc: "TLS certificate subject output — captures every domain name listed in the certificate",
          },
          {
            cmd: "openssl s_client -connect example.com:443 2>/dev/null | openssl x509 -noout -text | grep -A1 'Subject Alternative Name' | tr ',' '\\n' | sed 's/^ *//' | awk '{print $1}' | sed 's/DNS://g' | sort -u",
            desc: "Manual SSL inspection — extract SANs using raw OpenSSL when tools aren't available",
          },
          {
            cmd: "curl -s 'https://certspotter.com/api/v0/certs?domain=example.com' | jq -r '.[].dns_names[]' | grep 'example.com' | sort -u > certspotter-subs.txt",
            desc: "CertSpotter API — another CT source that sometimes finds domains crt.sh misses",
          },
          {
            cmd: "curl -s 'https://api.certspotter.com/v1/issuances?domain=example.com&include_subdomains=true&expand=dns_names' | jq -r '.[].dns_names[]' | grep 'example.com' | sort -u",
            desc: "CertSpotter with include_subdomains — catches wildcard certificate SANs",
          },
          {
            cmd: "python3 -c \"import ssl, socket; cert = ssl.get_server_certificate((('example.com', 443))); print(cert)\" | openssl x509 -text -noout | grep 'Subject:'",
            desc: "Python SSL extraction — useful in scripts for automated certificate collection",
          },
        ],
        tips: [
          "Search for SANs (Subject Alternative Names) — they often contain internal services, subdomains, and dev portals",
          "Check for expired certificates — they sometimes list domains that are no longer monitored but still accessible",
          "Use tlsx for bulk scanning — it's much faster than OpenSSL when processing hundreds of domains",
          "CertSpotter often catches certificates that crt.sh misses because it queries a different set of CT logs",
        ],
      },
      {
        title: "Active Enumeration",
        text: "Active techniques send requests to DNS servers and brute-force common subdomain patterns. Use these after passive recon to catch what passive missed — especially internal subdomains, dev environments, and staging servers. Active enumeration is louder but finds subdomains that no passive source has ever indexed.",
        commands: [
          {
            cmd: "puredns bruteforce subdomains-top1million-5000.txt example.com -r resolvers.txt -o active-subs.txt",
            desc: "Brute-force subdomains using a wordlist with wildcard filtering and mass DNS resolution",
          },
          {
            cmd: "shuffledns -d example.com -list subdomains-top1million-5000.txt -r resolvers.txt -o found.txt",
            desc: "High-performance DNS bruteforce using shuffledns (faster than puredns for smaller wordlists)",
          },
          {
            cmd: "dnsx -d example.com -a -aaaa -cname -ns -mx -soa -resp -o dns-records.txt",
            desc: "Enumerate all DNS record types for the root domain — uncover mail servers, nameservers, and more",
          },
          {
            cmd: "puredns resolve subs-to-resolve.txt -r resolvers.txt -w wildcard-detect.txt",
            desc: "Resolve all collected subdomains with wildcard detection to filter out garbage DNS wildcard responses",
          },
          {
            cmd: "amass enum -d example.com -o amass-output.txt -config config.ini",
            desc: "OWASP Amass — deep active enum with ASN lookup, reverse DNS, and certificate scraping (takes time but thorough)",
          },
          {
            cmd: "amass enum -d example.com -passive -o amass-passive.txt",
            desc: "Amass passive mode — useful when you want Amass's sources without the aggressive active scanning",
          },
          {
            cmd: "dnsx -d example.com -a -resp -silent > resolved-ips.txt && cat resolved-ips.txt | awk '{print $NF}' | sort -u > target-ips.txt",
            desc: "Resolve root domain IPs — gives you a starting IP list for port scanning",
          },
          {
            cmd: "dnsx -l all-subs.txt -a -resp-only -silent -o all-ips.txt",
            desc: "Mass resolve all subdomains to IPs for port scanning in chapter 2",
          },
        ],
        tips: [
          "Use a curated resolvers list (resolvers.txt) — fetch one from ProjectDiscovery's trusted list on GitHub",
          "Wordlist quality matters more than quantity: subdomains-top1million-5000.txt is an excellent starting point",
          "Run active enumeration during off-peak hours to avoid rate limiting and WAF triggers",
          "Amass is slow but thorough — run it in the background while you work on other parts of recon",
          "Always resolve subdomains to IPs — you need both for the next phases",
        ],
      },
      {
        title: "ASN & IP Range Discovery",
        text: "Every organization owns specific IP ranges and ASNs. Finding the full IP space gives you access to all self-hosted services — not just those mapped to subdomains. Use ASN lookup, BGP tools, and reverse WHOIS to map the target's complete network footprint.",
        commands: [
          {
            cmd: "whois -h whois.radb.net -- '-i origin AS12345' | grep -Eo '([0-9]+\\.){3}[0-9]+/[0-9]+' | sort -u",
            desc: "Query RADB for all IP ranges announced by a specific ASN — reveals the full network block",
          },
          {
            cmd: "whois -h whois.arin.net 'n AS12345' | grep -Eo '([0-9]+\\.){3}[0-9]+/[0-9]+' | sort -u",
            desc: "ARIN WHOIS query for IP ranges associated with an ASN — complementary to RADB",
          },
          {
            cmd: "curl -s 'https://api.bgpview.io/asn/AS12345/prefixes' | jq -r '.data.ipv4_prefixes[].prefix' > asn-ranges.txt",
            desc: "BGPView API — modern, fast ASN prefix enumeration without whois dependencies",
          },
          {
            cmd: "curl -s 'https://api.bgpview.io/asn/AS12345/peers' | jq -r '.data.peers[].asn' > peer-asns.txt",
            desc: "Find peer ASNs — sometimes the target uses CDNs or partners that extend the attack surface",
          },
          {
            cmd: "amass intel -asn AS12345 -o amass-asn-nets.txt",
            desc: "Amass ASN intelligence — fetches all netblocks for the given ASN with WHOIS data",
          },
          {
            cmd: "cat asn-ranges.txt | naabu -top-ports 100 -o asn-open-ports.txt",
            desc: "Rapid port scan across all discovered IP ranges — identifies exposed services on the network block",
          },
          {
            cmd: "curl -s 'https://ipinfo.io/AS12345' | grep -oP '([0-9]+\\.){3}[0-9]+/[0-9]+' | sort -u",
            desc: "IPinfo ASN lookup — another reliable source for IP range discovery",
          },
        ],
        tips: [
          "Identify the target's ASN by resolving any of their IPs: whois -h whois.radb.net '8.8.8.8' and look for origin AS",
          "Large organizations often have multiple ASNs — check all of them for complete coverage",
          "Scanning the full IP range often reveals staging/dev servers that aren't linked from the main DNS",
          "Peer ASNs sometimes belong to third-party vendors hosting the target's infrastructure",
        ],
      },
      {
        title: "Reverse DNS & PTR Records",
        text: "Reverse DNS lookups convert IP addresses back to hostnames. This technique discovers servers that have PTR records but no forward DNS entry — meaning they exist but won't show up in any subdomain enumeration. This is particularly effective for cloud-hosted targets.",
        commands: [
          {
            cmd: "dnsx -l all-ips.txt -ptr -resp-only -o ptr-records.txt",
            desc: "Bulk PTR lookup on all discovered IPs — reveal hostnames that don't have forward DNS",
          },
          {
            cmd: "cat all-ips.txt | while read ip; do dig +short -x $ip; done | grep 'example.com' > ptr-matches.txt",
            desc: "Traditional reverse DNS lookup using dig — filter results that belong to the target domain",
          },
          {
            cmd: "nmap -sL -n 192.168.0.0/24 | grep '(' | awk '{print $5}' | tr -d '()' | grep 'example.com'",
            desc: "Nmap reverse DNS scan across an IP range — discovers hostnames on the entire netblock",
          },
          {
            cmd: "curl -s 'https://sonar.omnisint.io/reverse/8.8.8.8' | jq '.'",
            desc: "Omnisint reverse DNS lookup API — quick check without installing tools",
          },
        ],
        tips: [
          "PTR records often expose internal naming conventions, server roles, and data center locations",
          "Run reverse DNS after ASN discovery — scan the full IP ranges, not just resolved subdomain IPs",
          "Cloud targets (AWS, GCP, Azure) often have PTR records that reveal instance IDs and regions",
        ],
      },
      {
        title: "Permutation & Alteration",
        text: "Subdomain permutations generate variations of known subdomains using common patterns (wildcard→wildcard-api, dev→dev-api, staging→staging-old). This technique finds subdomains that no wordlist would ever contain. Feed discovered subdomains into permutation generators and re-run validation — each pass reveals more assets.",
        commands: [
          {
            cmd: "alterx -list found-subs.txt -o permutations.txt",
            desc: "Generate permutation mutations from known subdomains using common patterns and prefixes",
          },
          {
            cmd: "alterx -list found-subs.txt -o permutations.txt -enrich",
            desc: "Enriched permutation generation — adds more mutation patterns for deeper coverage",
          },
          {
            cmd: "puredns resolve permutations.txt -r resolvers.txt -o perm-resolved.txt",
            desc: "Resolve all generated permutations to find new live subdomains",
          },
          {
            cmd: "gotator -sub found-subs.txt -perm permutations.txt -depth 1 -numbers 5 -mindup -adv -silent | sort -u > gotator-output.txt",
            desc: "Advanced permutation generator with depth control and duplicate prevention",
          },
          {
            cmd: "gotator -sub found-subs.txt -perm wordlist.txt -depth 2 -numbers 10 -mindup -silent | sort -u > deep-permutations.txt",
            desc: "Deep permutation with numbers 0-9 on found subdomains — finds variations like dev-api-02",
          },
          {
            cmd: "regulator -l found-subs.txt -o regulator-perms.txt",
            desc: "Regex-based subdomain permutation generator from Tom Hudson — pattern extraction and mutation",
          },
          {
            cmd: "puredns resolve regulator-perms.txt -r resolvers.txt -o extra-subs.txt",
            desc: "Resolve regulator-generated permutations to validate new discoveries",
          },
          {
            cmd: "cat perm-resolved.txt extra-subs.txt | sort -u > all-perm-subs.txt",
            desc: "Merge all permutation results for the next pipeline step",
          },
        ],
        tips: [
          "Feed permutation results back into the pipeline — run subfinder and httpx on newly discovered subdomains",
          "Use -numbers flag in gotator to generate numeric variations (dev01, dev02, staging-backup-01)",
          "Permutations are especially effective for finding staging, dev, and backup servers",
          "Run multiple permutation rounds — discovered subs in round 1 become input for round 2",
          "The most valuable permutations often involve adding environment prefixes: dev-, stage-, test-, uat-",
        ],
      },
      {
        title: "Subdomain Takeover Detection",
        text: "Subdomain takeover occurs when a DNS CNAME points to a cloud service (AWS S3, GitHub Pages, Heroku, etc.) that is no longer in use. An attacker can register the unclaimed resource and serve content on the target's domain. This is a high-severity finding that must be checked on every engagement.",
        commands: [
          {
            cmd: "nuclei -l all-subs.txt -tags takeover -o takeover-results.txt",
            desc: "Nuclei takeover detection — runs 100+ templates targeting AWS, Azure, GCP, GitHub, and more",
          },
          {
            cmd: "subjack -w all-subs.txt -t 100 -timeout 10 -o subjack-results.txt -ssl",
            desc: "Classic subdomain takeover scanner with SSL support — checks services, CNAMEs, and fingerprints",
          },
          {
            cmd: "subjack -w all-subs.txt -t 50 -timeout 10 -o subjack-verbose.txt -v",
            desc: "Subjack in verbose mode — shows which services are checked and why they passed/failed",
          },
          {
            cmd: "httpx -l all-subs.txt -status-code -cdn -o httpx-cdn.txt && cat httpx-cdn.txt | grep -E 'cloudfront|akamai|azureedge|s3.amazonaws' > cdn-check.txt",
            desc: "Filter subdomains pointing to CDN/cloud services to manually inspect for claimable resources",
          },
          {
            cmd: "cat all-subs.txt | dnsx -cname -resp-only | grep -iE 's3\\.amazonaws|cloudfront|azureedge|heroku|github\\.io|pantheon|wordpress\\.com|squarespace' > potential-takeovers.txt",
            desc: "Check DNS CNAME records directly for known unclaimed service patterns",
          },
          {
            cmd: "curl -s -I 'http://subdomain.example.com' | grep -i 'Server:'",
            desc: "Check HTTP response headers for cloud service indicators (e.g., Server: AmazonS3, CloudFront)",
          },
        ],
        tips: [
          "Focus on subdomains returning 404 (NXDOMAIN for CNAME target) — they're the most likely to be takoverable",
          "AWS S3 bucket takeovers are the most common — always check S3 CNAMEs first",
          "Not all cloud CNAMEs are vulnerable — verify by trying to register the resource before filing a report",
          "Some services (like GitHub Pages) require the CNAME to exactly match a repo name — check this manually",
        ],
      },
      {
        title: "Validation & Sorting",
        text: "Not all subdomains are useful. Filter for HTTP/HTTPS services, identify technologies, and categorize by response behavior. This step separates the gold from the noise. Always run httpx with multiple flags in one pass to avoid re-scanning the same subdomains repeatedly.",
        commands: [
          {
            cmd: "cat all-subs.txt | httpx -silent -o live-urls.txt",
            desc: "Probe all subdomains for HTTP/HTTPS services and return only live URLs",
          },
          {
            cmd: "cat all-subs.txt | httpx -silent -title -tech-detect -status-code -o enriched.txt",
            desc: "Enrich live subdomains with page titles, technology stack, and HTTP status codes",
          },
          {
            cmd: "cat all-subs.txt | httpx -silent -content-length -web-server -response-time -o detailed.txt",
            desc: "Deep probe — capture response metadata for fingerprinting and comparison",
          },
          {
            cmd: "cat enriched.txt | grep -E '301|302|401|403' > redirects-and-restricted.txt",
            desc: "Filter for interesting HTTP responses — redirects and restricted pages are prime targets",
          },
          {
            cmd: "cat all-subs.txt | httpx -silent -ports 80,443,8080,8443,8000,3000,9090,4443 -o live-multi-ports.txt",
            desc: "Multi-port probing — some services run on non-standard web ports, httpx will check all of them",
          },
          {
            cmd: "cat all-subs.txt | httpx -silent -title -status-code -tech-detect -follow-redirects -o enriched-redirects.txt",
            desc: "Follow redirects during probing — catch domains that redirect to different hosts or use path forwarding",
          },
          {
            cmd: "cat enriched.txt | grep -vE '200|301|302' > non-standard-responses.txt",
            desc: "Flag non-standard responses (500, 403, 401, 503) for early vulnerability triage",
          },
          {
            cmd: "cat enriched.txt | grep -iE 'dashboard|admin|portal|login|signin|api|console' > high-value-targets.txt",
            desc: "Keyword filter enriched output for high-value endpoints like admin panels and login pages",
          },
          {
            cmd: "cat enriched.txt | grep -iE 'wordpress|joomla|drupal|laravel|php' > cms-targets.txt",
            desc: "Detect CMS-based targets — each CMS has its own set of known vulnerabilities and attack techniques",
          },
        ],
        tips: [
          "Group output by subdomain source (passive vs active) so you can identify which techniques work best",
          "401/403 pages often hide unprotected functionality — mark them for deeper inspection",
          "Check for subdomain takeover: httpx with -cdn flag detects unclaimed cloud resources",
          "Run validation after every subdomain discovery round — don't wait until the end",
          "Use the enriched output to prioritize: 200 + interesting title + known technology = high value target",
        ],
      },
    ],
    tools: [
      {
        name: "subfinder",
        desc: "Fast passive subdomain enumerator from ProjectDiscovery with 30+ sources",
        install: "go install -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest",
        link: "https://github.com/projectdiscovery/subfinder",
      },
      {
        name: "amass",
        desc: "OWASP's comprehensive attack surface mapping tool — passive and active enumeration with ASN lookups",
        install: "go install -v github.com/owasp-amass/amass/v4/...@master",
        link: "https://github.com/owasp-amass/amass",
      },
      {
        name: "findomain",
        desc: "Fast subdomain enumerator using Certificate Transparency, AnubisDB, and other passive sources",
        install: "Can be downloaded from https://github.com/Findomain/Findomain/releases",
        link: "https://github.com/Findomain/Findomain",
      },
      {
        name: "assetfinder",
        desc: "Simple passive subdomain finder from Tom Hudson — good for quick passive validation",
        install: "go install -v github.com/tomnomnom/assetfinder@latest",
        link: "https://github.com/tomnomnom/assetfinder",
      },
      {
        name: "chaos",
        desc: "ProjectDiscovery's curated subdomain dataset from millions of CT logs updated daily",
        install: "go install -v github.com/projectdiscovery/chaos-client/cmd/chaos@latest",
        link: "https://github.com/projectdiscovery/chaos-client",
      },
      {
        name: "tlsx",
        desc: "Fast TLS certificate enumerator — extracts SANs, CNs, and certificate metadata from live hosts",
        install: "go install -v github.com/projectdiscovery/tlsx/cmd/tlsx@latest",
        link: "https://github.com/projectdiscovery/tlsx",
      },
      {
        name: "puredns",
        desc: "High-performance DNS resolver with wildcard filtering and bruteforce",
        install: "go install -v github.com/d3mondev/puredns/v2@latest",
        link: "https://github.com/d3mondev/puredns",
      },
      {
        name: "shuffledns",
        desc: "Massive-scale DNS bruteforce tool from ProjectDiscovery",
        install: "go install -v github.com/projectdiscovery/shuffledns/cmd/shuffledns@latest",
        link: "https://github.com/projectdiscovery/shuffledns",
      },
      {
        name: "dnsx",
        desc: "Multi-purpose DNS toolkit for record enumeration and resolution",
        install: "go install -v github.com/projectdiscovery/dnsx/cmd/dnsx@latest",
        link: "https://github.com/projectdiscovery/dnsx",
      },
      {
        name: "alterx",
        desc: "Subdomain permutation generator with pattern-based mutations",
        install: "go install -v github.com/projectdiscovery/alterx/cmd/alterx@latest",
        link: "https://github.com/projectdiscovery/alterx",
      },
      {
        name: "gotator",
        desc: "Advanced permutation generator with depth control, numeric variations, and dedup",
        install: "go install -v github.com/Josue87/gotator@latest",
        link: "https://github.com/Josue87/gotator",
      },
      {
        name: "httpx",
        desc: "HTTP probing toolkit — validates, fingerprints, and enriches live endpoints",
        install: "go install -v github.com/projectdiscovery/httpx/cmd/httpx@latest",
        link: "https://github.com/projectdiscovery/httpx",
      },
      {
        name: "subjack",
        desc: "Subdomain takeover scanner — checks CNAMEs for unclaimed cloud resources",
        install: "go install -v github.com/haccer/subjack@latest",
        link: "https://github.com/haccer/subjack",
      },
    ],
    summary:
      "By the end of this phase, you should have a comprehensive list of live subdomains enriched with technology fingerprints and HTTP metadata. Feed everything into chapter 2 for port-level scanning.",
  },
  {
    id: "port-scanning",
    number: 2,
    title: "Port Scanning & Service Identification",
    subtitle: "Every open port is a potential entry point — find them all",
    color: "oklch(0.72 0.16 75)",
    overview:
      "Port scanning reveals every service running on your target's infrastructure. The goal is not just to find open ports, but to identify service versions, operating systems, and misconfigurations — all without triggering alerts. Choose your scanner based on scope: masscan for the full internet view, naabu for speed, nmap for depth.",
    sections: [
      {
        title: "High-Speed Port Discovery",
        text: "Begin with wide scans to identify all open ports across your target range. Speed matters here — you want results fast so you can focus on interesting services. Use masscan for large IP ranges, naabu for focused target lists. Always start with the top 100-1000 ports before going full port range.",
        commands: [
          {
            cmd: "naabu -list live-ips.txt -top-ports 100 -o open-ports-100.txt",
            desc: "Quick initial scan — top 100 ports covers the most common services in under 30 seconds per host",
          },
          {
            cmd: "naabu -list live-ips.txt -top-ports 1000 -o open-ports.txt",
            desc: "Scan the top 1000 ports across all live IPs — fast, reliable, and CDN-aware",
          },
          {
            cmd: "naabu -list live-ips.txt -p - -exclude-ports 80,443 -rate 1500 -o full-scan.txt",
            desc: "Full 65535 port scan excluding web ports — catch non-standard services hiding on high ports",
          },
          {
            cmd: "masscan -p1-65535 --rate=10000 --output-format grepable --output-file masscan.out 192.168.1.0/24",
            desc: "Masscan the entire subnet at 10k packets/sec — use with caution and only with permission",
          },
          {
            cmd: "masscan -p80,443,8000-8100,9000-10000 --rate=5000 -iL ip-ranges.txt -oJ masscan-web.json",
            desc: "Targeted masscan for web ports only — high-speed scan of non-standard web ports across IP ranges",
          },
          {
            cmd: "rustscan -a target.com --ulimit 5000 -g -- -A -sC",
            desc: "RustScan wrapper: ultra-fast discovery then auto-pipes results into nmap for service enumeration",
          },
          {
            cmd: "rustscan -a ips.txt --scan-order Random --grepsable -b 1500 -t 2000 -- -sV",
            desc: "RustScan batch mode — random scan order with custom batch size and timeout settings",
          },
          {
            cmd: "zmap -p 443 -i eth0 -w ip-ranges.txt -o https-servers.txt",
            desc: "ZMap single-port scan across an IP range — useful for finding all HTTPS servers in a netblock",
          },
          {
            cmd: "cat nmap-output.gnmap | grep 'open' | awk '{print $2}' | sort -u > live-hosts.txt",
            desc: "Extract live hosts from nmap grepable output for focused deeper scanning",
          },
        ],
        tips: [
          "Start with top 1000 ports — they cover 90%+ of common services. Only go full port if you have time",
          "Set rate limits carefully: 1000-1500 pps for naabu, 10k max for masscan to avoid network issues",
          "Exclude web ports (80, 443) from initial scans if your target is web-heavy — focus on non-standard services",
          "Always scan from multiple VPS in different regions to bypass IP-based rate limiting",
          "Use -random-scan-order to avoid triggering sequential scan detection WAFs",
        ],
      },
      {
        title: "Service Version Detection",
        text: "Once you know which ports are open, determine exactly what software is running and which version. Version numbers tell you what CVEs to look for, what exploits might work, and what configurations are worth testing. Use multiple version detection techniques — passive banners and active probing complement each other.",
        commands: [
          {
            cmd: "sudo nmap -sV -sC -Pn -p 22,80,443,8080 -oA service-scan target.com",
            desc: "Version detection (-sV) + default scripts (-sC) against specific ports — the standard recon scan",
          },
          {
            cmd: "sudo nmap -sV --version-intensity 9 -p- -oA deep-scan target.com",
            desc: "Max-intensity version detection on all ports — takes longer but catches every version string",
          },
          {
            cmd: "nmap -sV -A -T4 -p $(tr ',' '\n' < open-ports.txt | paste -sd ',') -iL targets.txt -oA batch-scan",
            desc: "Batch scan all open ports from discovery against a list of targets with OS detection (-A)",
          },
          {
            cmd: "nmap -sV -T4 --min-rate=1000 -p 80,443,8000,8080,8443,3000,5000,9090 -iL targets.txt -oA web-scan",
            desc: "High-speed web port batch scan across all targets — useful when you have 100+ live hosts",
          },
          {
            cmd: "nmap -sV -sC -O --osscan-guess -p 22,3306,5432,6379,27017 -oA db-servers target.com",
            desc: "Target database servers specifically — detect DB versions and run relevant NSE scripts",
          },
          {
            cmd: "smap -iL targets.txt -oA smap-results",
            desc: "Smap — parses Shodan data for service information without scanning (requires Shodan API key)",
          },
          {
            cmd: "nc -nv target.com 22 2>&1 | grep -E 'SSH-2\\.0|OpenSSH'",
            desc: "Banner grab SSH service using netcat — quick version check without full nmap scan",
          },
          {
            cmd: "echo '' | openssl s_client -connect target.com:443 2>/dev/null | openssl x509 -noout -subject -dates -issuer",
            desc: "Grab TLS certificate details — subject, expiration, issuer for fingerprinting and compliance checks",
          },
        ],
        tips: [
          "Use --version-intensity only when you need deep fingerprinting — it adds time but catches obscure services",
          "Save scan results in all formats (-oA) for grepable, XML, and normal — you'll need the XML for tools",
          "For large engagements, scan by service category (web ports, database ports, mail ports) instead of all at once",
          "Banner grabbing with netcat/OpenSSL is silent and fast — use it for quick service verification",
          "Cross-reference nmap version output with CVE databases using searchsploit for instant exploit mapping",
        ],
      },
      {
        title: "NSE Script Enumeration",
        text: "Nmap's NSE (Nmap Scripting Engine) scripts automate service-specific enumeration. Run them against identified services to extract banners, enumerate users, check default credentials, and detect known vulnerabilities. Group scripts by service type for organized results.",
        commands: [
          {
            cmd: "nmap -sV --script=http-enum,http-headers,http-title,http-server-header -p 80,443,8080,8443 target.com",
            desc: "Web service enumeration scripts — discover hidden directories, tech versions, and server info",
          },
          {
            cmd: "nmap -sV --script=ssl-enum-ciphers,ssl-cert,ssl-heartbleed -p 443 target.com",
            desc: "SSL/TLS enumeration — check cipher strength, certificate details, and Heartbleed vulnerability",
          },
          {
            cmd: "nmap -sV --script=mysql-info,mysql-empty-password,mysql-users -p 3306 target.com",
            desc: "MySQL enumeration — info, blank passwords, and user account discovery",
          },
          {
            cmd: "nmap -sV --script=smb-enum-shares,smb-os-discovery,smb-enum-users -p 445 target.com",
            desc: "SMB enumeration — shared drives, OS version, and user accounts",
          },
          {
            cmd: "nmap -sV --script=dns-zone-transfer,dns-brute,dns-service-discovery -p 53 target.com",
            desc: "DNS enumeration — check for zone transfer vulnerabilities and brute-force subdomains",
          },
          {
            cmd: "nmap -sV --script=redis-info,redis-brute -p 6379 target.com",
            desc: "Redis enumeration — server info and brute-force common password patterns",
          },
          {
            cmd: "nmap -sV --script=mongodb-info -p 27017 target.com",
            desc: "MongoDB enumeration — version, databases, and server status (often unprotected)",
          },
          {
            cmd: "nmap -sV --script=ftp-anon,ftp-bounce,ftp-syst -p 21 target.com",
            desc: "FTP enumeration — check anonymous access, bounce attack, and system type disclosure",
          },
          {
            cmd: "nmap -sV --script=rdp-enum-encryption,rdp-ntlm-info -p 3389 target.com",
            desc: "RDP enumeration — encryption level, NTLM authentication info, and Windows version",
          },
        ],
        tips: [
          "Always run ssl-enum-ciphers on HTTPS sites — weak ciphers are an easy finding for your report",
          "Group NSE scripts by category: safe scripts are non-intrusive, default scripts may cause minor disruption",
          "Run http-enum on every web server — it checks for common directories, backups, and admin panels",
          "Create a script that runs all relevant NSE scripts based on which ports are discovered (service-based automation)",
        ],
      },
      {
        title: "Vulnerability Detection with NSE",
        text: "Nmap includes NSE scripts that detect specific vulnerabilities. Run these against services where you've identified versions to validate potential CVEs. These scripts are non-intrusive but can save hours of manual vulnerability research.",
        commands: [
          {
            cmd: "nmap -sV --script=vuln -p 80,443,8080 target.com -oA vuln-scan",
            desc: "Run ALL vulnerability detection scripts against web ports — checks known CVEs and misconfigurations",
          },
          {
            cmd: "nmap -sV --script=vulners -p 22,80,443 --script-args mincvss=5.0 -oA vulners-scan",
            desc: "Query the Vulners database for CVEs matching discovered service versions (CVSS > 5.0)",
          },
          {
            cmd: "nmap -sV --script=http-shellshock --script-args='http-shellshock.uri=/cgi-bin/test.cgi' -p 80 target.com",
            desc: "Test for Shellshock vulnerability on CGI endpoints — old but still present on legacy servers",
          },
          {
            cmd: "nmap -sV --script=http-slowloris-check -p 80,443,8080 target.com",
            desc: "Check for Slowloris DoS vulnerability — common on misconfigured Apache and IIS servers",
          },
          {
            cmd: "nmap -sV --script=tls-nextprotoneg,tls-alpn -p 443 target.com",
            desc: "Check TLS protocol support — insecure protocols like SSLv3 and TLS 1.0 are reportable findings",
          },
        ],
        tips: [
          "The vuln script category can be intrusive — run it carefully on production systems",
          "Cross-reference vulners output with exploit-db/searchsploit for working exploit code",
          "Not all CVE detections are 100% reliable — manually verify before reporting",
        ],
      },
      {
        title: "Banner Grabbing & Manual Probing",
        text: "Banner grabbing reveals exactly what software and version is running behind each port without sending crafted packets. Use netcat, OpenSSL, and curl to extract server banners. This technique is quieter than nmap and sometimes reveals version information that nmap misses.",
        commands: [
          {
            cmd: "nc -vn target.com 22 2>&1 | head -1",
            desc: "SSH banner grab — shows SSH version and often the OS distribution",
          },
          {
            cmd: "nc -vn target.com 21 2>&1 | head -1",
            desc: "FTP banner grab — reveals FTP server software, version, and sometimes OS information",
          },
          {
            cmd: "curl -sI 'https://target.com' | grep -iE 'server|powered|x-powered|via|x-served'",
            desc: "Extract web server headers — identifies server, framework, caching layer, and reverse proxies",
          },
          {
            cmd: "curl -sI 'https://target.com' | grep -iE 'set-cookie:'",
            desc: "Extract cookies — identify session mechanisms and framework-specific cookie signatures",
          },
          {
            cmd: "echo '' | openssl s_client -connect target.com:443 2>/dev/null | grep -E 'subject=|issuer=|notBefore|notAfter'",
            desc: "TLS certificate metadata — subject, issuer, and validity period for the service certificate",
          },
          {
            cmd: "echo '' | openssl s_client -connect target.com:443 2>/dev/null | openssl x509 -text -noout | grep -A1 'Subject Alternative Name'",
            desc: "Extract SANs from TLS certificate — discovers additional domains covered by the same certificate",
          },
          {
            cmd: "curl -s 'http://target.com' | head -50",
            desc: "Grab the raw HTML of the main page — look for comment tags, hidden inputs, and version disclosures",
          },
          {
            cmd: "curl -s -X OPTIONS 'http://target.com' -I | grep -i 'allow:'",
            desc: "Check allowed HTTP methods — PUT, DELETE, and PATCH are often exposed but shouldn't be",
          },
        ],
        tips: [
          "Banner grabbing is passive and leaves minimal logs — use it as your first touch on every service",
          "Version numbers in banners don't always match the actual version — verify with multiple techniques",
          "Check for server header version disclosure (Apache/2.4.49) — these map directly to known CVEs",
          "Document every banner — they're evidence for your vulnerability report",
        ],
      },
      {
        title: "Service Brute-Force Testing",
        text: "After identifying services with authentication (SSH, FTP, SMTP, databases), test for weak credentials using targeted brute-force tools. Use small, targeted wordlists first — common usernames and passwords — before going full scale. Always respect scope and rate limits.",
        commands: [
          {
            cmd: "brutespray -f nmap-xml-output.xml -q -t 10 -T 5",
            desc: "Auto-brute all services found in nmap XML — matches ports to services and runs targeted wordlists",
          },
          {
            cmd: "hydra -l admin -P common-passwords.txt ssh://target.com -t 4 -o hydra-ssh.txt",
            desc: "SSH brute-force with single username and password list — best for targeted internal testing",
          },
          {
            cmd: "hydra -L common-users.txt -P common-passwords.txt ftp://target.com -t 4 -o hydra-ftp.txt",
            desc: "FTP brute-force with username and password lists — test for weak FTP credentials",
          },
          {
            cmd: "nmap -p 1433 --script ms-sql-brute --script-args userdb=users.txt,passdb=pass.txt target.com",
            desc: "MSSQL brute-force via NSE script — quiet and integrated with nmap service detection",
          },
          {
            cmd: "medusa -h target.com -U users.txt -P passes.txt -M ssh -t 3 -O medusa-ssh.txt",
            desc: "Medusa SSH brute-force — alternative to hydra with parallel connection support",
          },
        ],
        tips: [
          "Always check scope before brute-forcing — many programs explicitly prohibit it",
          "Use rate limiting (-t 4) to avoid account lockouts and WAF blocks",
          "Start with default credentials lists before general wordlists",
          "Document locked accounts — they indicate active monitoring and security controls",
        ],
      },
      {
        title: "Service-Specific Probing",
        text: "Beyond nmap, use dedicated tools for deep service probing. Each protocol has specialist tools that extract more information than a general scanner ever could. These tools reveal version-specific configurations, default credentials, and misconfigurations.",
        commands: [
          {
            cmd: "whatweb -a 3 target.com --log-verbose=web-tech.txt",
            desc: "Aggressive web technology fingerprinting — detects CMS, frameworks, analytics, and more",
          },
          {
            cmd: "whatweb -a 3 -l live-urls.txt --log-verbose=batch-web-tech.txt",
            desc: "Batch technology detection across all live URLs — processes from a file list efficiently",
          },
          {
            cmd: "smbclient -L //target.com -N",
            desc: "List SMB shares anonymously — a single misconfigured share can lead to full compromise",
          },
          {
            cmd: "smbmap -H target.com -u '' -p ''",
            desc: "SMB map with null session — checks anonymous access and lists share permissions",
          },
          {
            cmd: "dig axfr @ns1.target.com target.com",
            desc: "Attempt DNS zone transfer — one of the oldest but most rewarding recon checks",
          },
          {
            cmd: "curl -s -I -L http://target.com | grep -i 'server\\|powered-by\\|x-'" ,
            desc: "Grab HTTP response headers for server info, framework hints, and security headers inventory",
          },
          {
            cmd: "ike-scan target.com",
            desc: "IKE VPN discovery — identifies VPN servers and fingerprint the vendor (Cisco, Palo Alto, etc.)",
          },
          {
            cmd: "ike-scan -M -A target.com",
            desc: "Aggressive IKE scan — attempts to retrieve the VPN's group ID and authentication method",
          },
          {
            cmd: "rdp-sec-check.pl target.com",
            desc: "RDP security checker — evaluates encryption protocols and security settings",
          },
        ],
        tips: [
          "Check for zone transfer on every nameserver — it's a quick test that can reveal the entire DNS layout",
          "SMB shares (port 445) with anonymous access are rare but when found, they often contain sensitive data",
          "Document every version number you find — build a CVE list for each service in your notes",
          "IKE VPNs are common on enterprise targets — fingerprinting the vendor helps choose the right exploit tools",
          "RDP misconfigurations (NLA disabled) are a common finding on Windows servers exposed to the internet",
        ],
      },
    ],
    tools: [
      {
        name: "naabu",
        desc: "Fast port scanner with CDN detection and service discovery from ProjectDiscovery",
        install: "go install -v github.com/projectdiscovery/naabu/v2/cmd/naabu@latest",
        link: "https://github.com/projectdiscovery/naabu",
      },
      {
        name: "masscan",
        desc: "The fastest internet-wide port scanner — scans millions of IPs in minutes",
        install: "apt install masscan",
        link: "https://github.com/robertdavidgraham/masscan",
      },
      {
        name: "zmap",
        desc: "Single-port internet-wide scanner — fast and efficient for protocol-specific scans",
        install: "apt install zmap",
        link: "https://github.com/zmap/zmap",
      },
      {
        name: "nmap",
        desc: "The gold standard for network exploration and security auditing",
        install: "Can be downloaded from https://nmap.org/download.html",
        link: "https://nmap.org",
      },
      {
        name: "rustscan",
        desc: "Ultra-fast port scanner that pipes results directly into nmap for service detection",
        install: "Can be downloaded from https://github.com/RustScan/RustScan/releases",
        link: "https://github.com/RustScan/RustScan",
      },
      {
        name: "smap",
        desc: "Shodan-based service mapper — gets service info from Shodan without touching the target",
        install: "go install -v github.com/s0md3v/smap/cmd/smap@latest",
        link: "https://github.com/s0md3v/smap",
      },
      {
        name: "brutespray",
        desc: "Auto-brute-force all services from nmap output with service-specific wordlists",
        install: "Can be downloaded from https://github.com/x90skysn3k/brutespray",
        link: "https://github.com/x90skysn3k/brutespray",
      },
      {
        name: "hydra",
        desc: "Fast network login cracker supporting 50+ protocols for targeted brute-force testing",
        install: "apt install hydra",
        link: "https://github.com/vanhauser-thc/thc-hydra",
      },
      {
        name: "whatweb",
        desc: "Next-generation web technology fingerprinting tool",
        install: "Can be downloaded from https://github.com/urbanadventurer/WhatWeb",
        link: "https://github.com/urbanadventurer/WhatWeb",
      },
      {
        name: "ike-scan",
        desc: "IKE protocol scanner for discovering and fingerprinting VPN servers",
        install: "apt install ike-scan",
        link: "https://github.com/royhills/ike-scan",
      },
    ],
    summary:
      "You now have a complete port-level map of the target: every open port, the service running on it, its version, and relevant NSE findings. This data feeds directly into chapter 3 for endpoint-level discovery.",
  },
  {
    id: "endpoint-discovery",
    number: 3,
    title: "Endpoint Discovery & Technology Fingerprinting",
    subtitle: "Find every URL, parameter, and hidden function",
    color: "oklch(0.65 0.18 50)",
    overview:
      "With live subdomains and open ports in hand, the next step is mapping every accessible URL, parameter, and endpoint. The goal is to build a complete picture of the web application's surface area — every page, every API call, every parameter. This is where recon becomes actionable.",
    sections: [
      {
        title: "URL Collection from Historical Sources",
        text: "Historical URL sources reveal endpoints that may no longer be linked from the main site but are still accessible. Wayback Machine, CommonCrawl, and URL scanning services index URLs that can expose hidden functionality, old API versions, and developer staging areas. Always run multiple URL collectors and merge the results.",
        commands: [
          {
            cmd: "gau --subs example.com | grep -E '\\.js|\\.json|\\.yaml|\\.env|\\.config' > sensitive-files.txt",
            desc: "Gather all known URLs from Wayback, CommonCrawl, AlienVault, and URLScan — filter for sensitive files",
          },
          {
            cmd: "gau --subs example.com --o gau-all.txt",
            desc: "Full GAU output without filtering — capture every known URL for the target including all subdomains",
          },
          {
            cmd: "katana -u https://example.com -d 2 -jc -kf -silent -o all-urls.txt",
            desc: "Crawl with Katana: follow links 2 levels deep, extract JavaScript, filter false positives",
          },
          {
            cmd: "katana -u https://example.com -d 3 -jc -kf -aff -silent -o deep-crawl.txt",
            desc: "Deep Katana crawl with form extraction (-aff) and 3-level depth — catches more endpoints including forms",
          },
          {
            cmd: "waybackurls example.com | sort -u > wayback-data.txt",
            desc: "Fetch all URLs from the Wayback Machine archive — often reveals old endpoints and backup files",
          },
          {
            cmd: "waybackurls example.com | unfurl --unique keys > wayback-params.txt",
            desc: "Extract unique parameter names from Wayback URLs using unfurl — clean parameter dictionary",
          },
          {
            cmd: "gospider -s https://example.com -d 2 -c 10 -t 10 --robots -o gospider-output",
            desc: "GoSpider with robots.txt parsing — discovers hidden URLs via sitemap and robot disallowed paths",
          },
          {
            cmd: "gospider -S live-urls.txt -d 1 -c 5 -t 10 --other-source -o gospider-batch",
            desc: "Batch GoSpider across all live URLs — pipeline discovery from multiple sources including Wayback",
          },
          {
            cmd: "hakrawler -url https://example.com -depth 2 -plain > hakrawler-output.txt",
            desc: "Lightweight Go crawler — simple but effective, especially for smaller targets",
          },
          {
            cmd: "cat wayback-data.txt gau-all.txt | sort -u | grep -E '\\.js|\\.json|\\.xml|\\.yaml|\\.env|\\.config|\\.bak|\\.old|\\.sql' > sensitive-files.txt",
            desc: "Merge all sources and filter for sensitive file extensions — configuration files, backups, and source code",
          },
        ],
        tips: [
          "Historical URLs are the #1 source for finding API endpoints, admin panels, and forgotten functionality",
          "Filter for .js files early — JavaScript files often contain API keys, internal endpoints, and route definitions",
          "Merge all URL sources (gau, katana, waybackurls) into a single deduplicated list before analysis",
          "Run GAU and WaybackURLs first (they're fast), then katana/gospider for live crawling",
          "Check robots.txt and sitemap.xml — they often list hidden paths that the developers wanted to hide",
        ],
      },
      {
        title: "JavaScript Analysis & Secret Discovery",
        text: "Modern web applications rely heavily on JavaScript. These files often contain hardcoded API keys, internal endpoints, access tokens, and developer comments. Extract and analyze every JavaScript file from the target — automated tools can scan hundreds of files in seconds.",
        commands: [
          {
            cmd: "katana -u https://example.com -jc -d 2 -silent | grep -E '\\.js(\\?|$)' | sort -u > js-files.txt",
            desc: "Extract all JavaScript file URLs from the target's web pages using Katana",
          },
          {
            cmd: "cat js-files.txt | while read url; do curl -s $url | grep -oP '(?<=\"|\\')(https?://[^\"\\' ]+)' | sort -u >> js-endpoints.txt; done",
            desc: "Extract endpoint URLs from within JavaScript files — often where API routes are defined",
          },
          {
            cmd: "nuclei -l js-files.txt -tags exposures -o js-secrets.txt",
            desc: "Scan JavaScript files for API keys, tokens, and hardcoded secrets using Nuclei templates",
          },
          {
            cmd: "mantra -l js-files.txt -o mantra-output.txt",
            desc: "Automated JS secret scanner — detects API keys, access tokens, JWTs, and hardcoded credentials",
          },
          {
            cmd: "cat js-files.txt | while read url; do echo $url; curl -s $url | grep -oP 'AIza[0-9A-Za-z-_]{33}|sk-[0-9a-zA-Z]{32}|ghp_[0-9a-zA-Z]{36}|AKIA[0-9A-Z]{16}' || true; done > secrets-found.txt",
            desc: "Regex-based secret scanning for common key patterns: Google API, OpenAI, GitHub tokens, AWS keys",
          },
          {
            cmd: "subjs -i js-files.txt -o subjs-endpoints.txt",
            desc: "Extract endpoints from JavaScript files using subjs — lightweight and fast URL extraction",
          },
          {
            cmd: "python3 -c \"from urllib.parse import urlparse; import json; print('Script loaded')\"",
            desc: "Prepare your environment for deeper JS analysis with node.js and puppeteer for dynamic extraction",
          },
        ],
        tips: [
          "Google API keys (AIza...) in JS files are the most common finding — check if they're restricted to specific services",
          "AWS keys (AKIA...) are critical findings — verify immediately if they're active using aws-cli",
          "Check the source map files (.map) — they often contain the original source code with comments and secrets",
          "Modern SPAs bundle all routes in JS — parsing JS reveals the entire front-end attack surface",
        ],
      },
      {
        title: "URL Processing & Organization",
        text: "Raw URL collections are messy. Deduplicate, sort, organize by path structure, and filter noise before analysis. Use purpose-built tools to extract the signal from the noise — categorize endpoints into API routes, static assets, admin panels, and parameters.",
        commands: [
          {
            cmd: "cat all-urls.txt | sort -u > urls-deduped.txt",
            desc: "Basic deduplication — removes duplicate URLs from merged source files",
          },
          {
            cmd: "cat urls-deduped.txt | uro -o urls-clean.txt",
            desc: "URO: smart URL deduplicator — removes duplicates, parameterless variants, and path noise intelligently",
          },
          {
            cmd: "cat urls-clean.txt | unfurl --unique paths > unique-paths.txt",
            desc: "Extract unique URL paths (without domains) to identify the directory structure",
          },
          {
            cmd: "cat urls-clean.txt | unfurl --unique keys > unique-params.txt",
            desc: "Extract unique parameter names across all endpoints for your fuzzing dictionary",
          },
          {
            cmd: "cat urls-clean.txt | grep -E 'api|graphql|rest|v1|v2|v3|swagger|openapi' > api-endpoints.txt",
            desc: "Filter for API-related paths — GraphQL, REST, Swagger docs, and versioned API routes",
          },
          {
            cmd: "cat urls-clean.txt | unfurl format %d | sort -u > unique-domains.txt",
            desc: "Extract all unique domains (hostnames) from URL collection — useful for identifying scope expansion",
          },
          {
            cmd: "cat urls-clean.txt | grep -iE 'admin|dashboard|console|portal|cpanel|phpmyadmin' > admin-panels.txt",
            desc: "Keyword filter for admin and management interfaces — high-value target list",
          },
        ],
        tips: [
          "URO is essential — it can reduce 100k URLs to 10k meaningful ones without losing important endpoints",
          "Group URLs by response status after probing — 200s are active, 302s are redirects, 404s are dead",
          "API endpoints are your highest priority — focus parameter testing and authentication bypass there",
          "Build a sitemap visualization from the path structure to understand the application architecture",
        ],
      },
      {
        title: "Directory & File Fuzzing",
        text: "Fuzzing reveals hidden directories and files that aren't linked anywhere — admin panels, backup files, configuration dumps, and staging environments. Use wordlists tailored to the target's technology stack for the best results. Fuzzing is the single most effective technique for discovering hidden attack surface.",
        commands: [
          {
            cmd: "ffuf -u https://target.com/FUZZ -w directory-list-lowercase-2.3-medium.txt -mc 200,204,301,302,307,401,403 -o fuzz-results.json",
            desc: "Directory fuzzing with filtered response codes — catch all interesting responses including restricted areas",
          },
          {
            cmd: "ffuf -u https://target.com/FUZZ -w common-php.txt -e .php,.bak,.old,.txt,.html -mc 200 -o php-pages.json",
            desc: "File extension fuzzing to find backup files, old versions, and source code leaks",
          },
          {
            cmd: "ffuf -u https://target.com/FUZZ -w subdomains.txt -H 'Host: FUZZ.target.com' -mc 200,301,302,403,401",
            desc: "Virtual host fuzzing — discover subdomains that resolve but aren't in DNS by testing Host headers",
          },
          {
            cmd: "ffuf -u https://target.com/FUZZ -w common-admin.txt -mc 200,403 -o admin-panels.json",
            desc: "Target admin panels specifically — 403 responses often mean the page exists but is restricted",
          },
          {
            cmd: "ffuf -u https://target.com/FUZZ -w content-discovery-wordlist.txt -recursion -recursion-depth 2 -mc 200,204,301,302 -o recursive-fuzz.json",
            desc: "Recursive directory fuzzing — automatically follows discovered directories and fuzzes inside them",
          },
          {
            cmd: "ffuf -u https://target.com/graphql -w param-list.txt -X POST -d 'query={FUZZ}' -H 'Content-Type: application/json' -mc 200",
            desc: "GraphQL endpoint fuzzing — discover available queries by injecting field names into introspection queries",
          },
          {
            cmd: "ffuf -u https://target.com/FUZZ -w files-with-sensitive-data.txt -e .sql,.dump,.tar.gz,.zip,.tgz -mc 200 -o sensitive-leaks.json",
            desc: "Search for sensitive data leaks — database dumps, backups, and compressed archives",
          },
          {
            cmd: "dirsearch -u https://target.com -e php,asp,js,txt -x 404,503 -t 50 --recursive --deep-recursive",
            desc: "Dirsearch as alternative to ffuf — multi-extension and recursive scanning with thread control",
          },
          {
            cmd: "dirsearch -l live-urls.txt -e php,html,txt -x 404 -t 30 --format json -o dirsearch-batch.json",
            desc: "Batch dirsearch across all live URLs — useful for large engagements with hundreds of hosts",
          },
        ],
        tips: [
          "Start with a small, targeted wordlist before going large — you can always expand",
          "401 and 403 responses are valuable — they confirm the file exists even if you can't access it",
          "Use the -recursion flag in ffuf to automatically fuzz discovered directories",
          "Always fuzz with multi-extension (-e) — a backup.php~ or config.bak can contain the entire database config",
          "Filter out 404 and 503 responses early — they add noise without actionable results",
        ],
      },
      {
        title: "Content Discovery with Advanced Filters",
        text: "Advanced content discovery uses length filtering, response comparison, and custom matchers to identify real endpoints among thousands of false positives. Smart filtering reduces noise from 99% to actionable results within minutes.",
        commands: [
          {
            cmd: "ffuf -u https://target.com/FUZZ -w big-wordlist.txt -mc 200 -fs 1234 -o filtered-results.json",
            desc: "Filter by response size (-fs) to ignore known default pages — 1234 is the size of your custom 404 page",
          },
          {
            cmd: "ffuf -u https://target.com/FUZZ -w wordlist.txt -mc all -fc 404 -ac",
            desc: "Auto-calibrate filtering (-ac) — ffuf detects the 404 response pattern and filters it automatically",
          },
          {
            cmd: "ffuf -u https://target.com/FUZZ -w wordlist.txt -mc 200 -recursion -recursion-depth 2 -replay-proxy http://127.0.0.1:8080",
            desc: "Recursive fuzzing with Burp Suite replay — automatically send discovered pages to Burp for manual inspection",
          },
          {
            cmd: "feroxbuster -u https://target.com -w wordlist.txt -d 2 -t 50 -o ferox-results.json",
            desc: "Rust-based content discovery with recursion and smart 404 filtering — fast alternative to ffuf",
          },
          {
            cmd: "feroxbuster -u https://target.com -w wordlist.txt -x php,txt,html,json -d 3 -s 200,204,301,302,403,401,500 -o deep-ferox.json",
            desc: "Feroxbuster with multi-extension, deep recursion, and status code whitelist — thorough but fast",
          },
        ],
        tips: [
          "Use -ac (auto-calibrate) on every ffuf scan to save hours of manual filtering",
          "Response size filtering (-fs) is more reliable than status code filtering — many 404s return 200 status",
          "Run feroxbuster with -d 3 for complete coverage, but use -d 1 for initial quick scan",
          "Replay interesting findings through Burp Suite for immediate manual inspection",
        ],
      },
      {
        title: "API Endpoint Discovery",
        text: "APIs are the backbone of modern web applications and a rich source of vulnerabilities. Find API documentation (Swagger, OpenAPI), test GraphQL introspection, enumerate RESTful endpoints, and look for API keys in client-side code. APIs often expose functionality not available through the web interface.",
        commands: [
          {
            cmd: "ffuf -u https://target.com/api/v1/FUZZ -w api-endpoints.txt -mc 200,201,401,403,405 -o api-endpoints.json",
            desc: "Discover API endpoints by fuzzing common API paths with different response code filtering",
          },
          {
            cmd: "curl -s 'https://target.com/swagger/v1/swagger.json' | jq '.paths | keys'",
            desc: "Fetch Swagger/OpenAPI documentation — complete API schema with endpoints, methods, and parameters",
          },
          {
            cmd: "curl -s 'https://target.com/graphql' -X POST -H 'Content-Type: application/json' -d '{\"query\":\"query { __schema { types { name } } }\"}' | jq '.'",
            desc: "GraphQL introspection query — if enabled, reveals the entire schema including hidden queries and mutations",
          },
          {
            cmd: "curl -s 'https://target.com/graphql' -X POST -H 'Content-Type: application/json' -d '{\"query\":\"{ __schema { queryType { fields { name args { name } } } } }\"}' | jq '.'",
            desc: "Detailed GraphQL introspection — enumerates all query fields and their arguments",
          },
          {
            cmd: "cat urls-clean.txt | grep -Ei '/api/|/rest/|/graphql|/v1/|/v2/|/v3/' | sort -u > api-routes.txt",
            desc: "Extract API routes from URL collection — filter for known API path patterns",
          },
          {
            cmd: "nuclei -l api-routes.txt -tags api,exposure -o api-vulns.txt",
            desc: "Scan discovered API endpoints for common API vulnerabilities using Nuclei templates",
          },
          {
            cmd: "curl -s 'https://target.com/.well-known/openid-configuration' | jq '.'",
            desc: "Check OpenID Connect discovery endpoint — reveals authentication endpoints, issuer, and JWKS URI",
          },
        ],
        tips: [
          "Swagger/OpenAPI docs are the holy grail — they list every endpoint with parameters and authentication requirements",
          "If GraphQL introspection is enabled, the entire database schema may be exposed — document it thoroughly",
          "API endpoints often lack the authentication controls that protect the main web application",
          "Check for common API docs paths: /api/docs, /swagger, /openapi.json, /api/v1/openapi.json",
        ],
      },
      {
        title: "Technology Fingerprinting",
        text: "Every technology choice introduces specific attack surfaces. Identify the CMS, framework, CDN, WAF, and server software of every target. This knowledge guides your exploit selection and helps you avoid wasting time on irrelevant attacks. Cross-reference technology data with known CVEs for instant exploit mapping.",
        commands: [
          {
            cmd: "httpx -l live-urls.txt -silent -tech-detect -title -web-server -status-code -o fingerprinted.txt",
            desc: "Batch technology detection across all live URLs — framework, CDN, WAF, server header in one pass",
          },
          {
            cmd: "wappalyzer-cli https://target.com",
            desc: "Wappalyzer CLI for technology stack detection — supports single URL deep analysis",
          },
          {
            cmd: "whatweb -a 3 https://target.com --log-verbose=whatweb-detailed.txt",
            desc: "WhatWeb aggressive detection — more thorough than httpx but slower, catches obscure CMS versions",
          },
          {
            cmd: "curl -sIX GET https://target.com | grep -i 'server\\|powered-by\\|x-generator\\|x-frame-options'",
            desc: "Manual header inspection to identify server software and security header gaps",
          },
          {
            cmd: "nuclei -l live-urls.txt -tags tech-detect -o tech-stack.json -json",
            desc: "Use Nuclei templates to detect technologies — runs 100+ tech fingerprint templates in parallel",
          },
          {
            cmd: "nuclei -l live-urls.txt -tags cves -severity critical,high -o cve-scan.txt",
            desc: "Quick critical/high CVE scan against all live URLs — catch low-hanging fruit before manual testing",
          },
          {
            cmd: "curl -s 'https://target.com' | grep -iE 'wordpress|wp-content|wp-includes|wp-json' > cms-detection.txt",
            desc: "CMS detection from page source — WordPress, Joomla, Drupal, and other CMS have unique fingerprints in HTML",
          },
          {
            cmd: "curl -s 'https://target.com/robots.txt'",
            desc: "Check robots.txt — often lists admin paths, staging areas, and directories the devs wanted to hide from search engines",
          },
          {
            cmd: "curl -s 'https://target.com/sitemap.xml' | grep -oP '<loc>[^<]+</loc>' | sed 's/<[^>]+>//g' > sitemap-urls.txt",
            desc: "Parse sitemap.xml for all indexed URLs — frequently includes hidden pages and admin sections",
          },
        ],
        tips: [
          "Cross-reference technology data with known CVEs — a specific version of Apache/Nginx/WordPress = specific exploits",
          "Identify the WAF early (Cloudflare, Akamai, ModSecurity) to plan your bypass strategy later",
          "Document the full tech stack per subdomain — you'll reference this during the exploitation phase",
          "Robots.txt is NOT a security measure but it often reveals the developer's hidden paths and testing endpoints",
          "Run nuclei CVE templates after fingerprinting — matching tech versions to CVEs is automated",
        ],
      },
      {
        title: "Parameter Discovery & Analysis",
        text: "Parameters are where vulnerabilities live. Find every parameter across every endpoint, then test them systematically. Use scraping, crawling, and common parameter wordlists to build your attack surface. The more parameters you test, the more bugs you'll find.",
        commands: [
          {
            cmd: "katana -u https://target.com -d 3 -aff -kf -silent | grep -oP '\\?.*?=[^&]+' | sort -u > params.txt",
            desc: "Extract all URL parameters from crawled pages using regex pattern matching",
          },
          {
            cmd: "gau --subs target.com | qsfind | sort -u > discovered-params.txt",
            desc: "Find parameters in Wayback data that aren't commonly scanned — hidden params from older endpoints",
          },
          {
            cmd: "ffuf -u https://target.com/page?FUZZ=test -w param-list.txt -fc 500,502",
            desc: "Parameter fuzzing — test common parameter names across a known endpoint to discover hidden inputs",
          },
          {
            cmd: "cat discovered-params.txt | sort -u | grep -vi 'utm_\\|ref_\\|campaign\\|source' > clean-params.txt",
            desc: "Filter out tracking/analytics parameters — focus on functional parameters that affect application logic",
          },
          {
            cmd: "python3 -c \"import sys; params = set(); [params.update(line.split('?')[1].split('&') for line in sys.stdin if '?' in line) for _ in [0]]; print('\\n'.join(p.split('=')[0] for p in set(sum(params, []))))\" < all-urls.txt | sort -u > all-params.txt",
            desc: "Python one-liner to extract ALL unique parameter names from URL collection — thorough but slow for large files",
          },
          {
            cmd: "cat all-urls.txt | unfurl --unique keys > all-unfurl-params.txt",
            desc: "Unfurl parameter extraction — clean, fast, and handles complex URLs with multiple parameters",
          },
          {
            cmd: "cat all-urls.txt | grep -oP '\\?(.*?)(?:$|&)' | sed 's/\\?//;s/&/\\n/g' | grep -oP '^[^=]+' | sort -u > regex-params.txt",
            desc: "Regex-based parameter name extraction from full URL list — works on any dataset",
          },
        ],
        tips: [
          "Focus on parameters that affect application logic (id, user, file, page, action, token, redirect, url)",
          "Parameters found in historical URLs are gold — they often lead to deprecated but still-functional logic",
          "Build your own parameter wordlist over time by collecting interesting params from every engagement",
          "Test parameter pollution on every endpoint with multiple parameters of the same name",
          "Document which endpoints accept POST vs GET parameters — API-style endpoints often accept JSON body params",
        ],
      },
      {
        title: "Screenshotting & Visual Analysis",
        text: "Screenshots give you a bird's eye view of the target's web properties. Skimming screenshots is much faster than visiting each URL manually. Use this to identify interesting pages, login portals, admin panels, and unusual content in seconds rather than hours.",
        commands: [
          {
            cmd: "gowitness file -f live-urls.txt --destination screenshots",
            desc: "Batch screenshot all live URLs and generate an HTML report for visual browsing",
          },
          {
            cmd: "gowitness file -f live-urls.txt --destination screenshots --resolution 1920x1080 --delay 2",
            desc: "Screenshots with custom resolution and page load delay for JavaScript-rendered content",
          },
          {
            cmd: "gowitness nmap -f nmap-output.xml --destination nmap-screenshots",
            desc: "Screenshot directly from nmap XML — combines port scan with visual recon in one command",
          },
          {
            cmd: "cat screenshots/gowitness-report.html | grep -i 'login\\|admin\\|portal\\|dashboard\\|signin'",
            desc: "Search the screenshot report for interesting page titles to identify high-value targets",
          },
          {
            cmd: "cat screenshots/gowitness-report.html | grep -oP '(?<=alt=\")[^\"]+' | sort -u > screenshot-titles.txt",
            desc: "Extract all page titles from the screenshot report for keyword analysis and categorization",
          },
          {
            cmd: "aquatone-scan -u https://target.com && aquatone-gather ./aquatone",
            desc: "Aquatone alternative — screenshots with built-in clustering by similarity (dev vs prod environments)",
          },
        ],
        tips: [
          "Open the gowitness HTML report in your browser — it groups screenshots visually for rapid triage",
          "Login portals, admin panels, and dashboards are your highest-priority targets in any engagement",
          "Check for default credentials on any discovered login pages — document them for your report",
          "Screenshots of error pages (500, 503) often reveal stack traces, debug info, and version numbers",
        ],
      },
    ],
    tools: [
      {
        name: "gau",
        desc: "GetAllUrls — fetches known URLs from Wayback, CommonCrawl, AlienVault, and URLScan",
        install: "go install -v github.com/lc/gau/v2/cmd/gau@latest",
        link: "https://github.com/lc/gau",
      },
      {
        name: "katana",
        desc: "Fast web crawler from ProjectDiscovery with JS parsing and form extraction",
        install: "go install -v github.com/projectdiscovery/katana/cmd/katana@latest",
        link: "https://github.com/projectdiscovery/katana",
      },
      {
        name: "waybackurls",
        desc: "Fetch all URLs from Wayback Machine archive for a given domain",
        install: "go install -v github.com/tomnomnom/waybackurls@latest",
        link: "https://github.com/tomnomnom/waybackurls",
      },
      {
        name: "gospider",
        desc: "Fast web spider with robots.txt parsing, sitemap support, and form extraction",
        install: "go install -v github.com/jaeles-project/gospider@latest",
        link: "https://github.com/jaeles-project/gospider",
      },
      {
        name: "hakrawler",
        desc: "Lightweight Go web crawler for endpoint discovery and URL collection",
        install: "go install -v github.com/hakluke/hakrawler@latest",
        link: "https://github.com/hakluke/hakrawler",
      },
      {
        name: "ffuf",
        desc: "The fastest web fuzzer — directory busting, parameter fuzzing, and VHOST discovery",
        install: "go install -v github.com/ffuf/ffuf/v2@latest",
        link: "https://github.com/ffuf/ffuf",
      },
      {
        name: "feroxbuster",
        desc: "Rust-based content discovery tool with recursion, multi-extension, and smart filtering",
        install: "Can be downloaded from https://github.com/epi052/feroxbuster/releases",
        link: "https://github.com/epi052/feroxbuster",
      },
      {
        name: "dirsearch",
        desc: "Python-based directory brute-forcer with multi-threading and recursive scanning",
        install: "Can be downloaded from https://github.com/maurosoria/dirsearch",
        link: "https://github.com/maurosoria/dirsearch",
      },
      {
        name: "uro",
        desc: "Smart URL deduplicator — removes noise and parameterless variants from URL lists",
        install: "pip install uro",
        link: "https://github.com/s0md3v/uro",
      },
      {
        name: "unfurl",
        desc: "URL extractor and parser — extract domains, paths, parameters, and values from URL lists",
        install: "go install -v github.com/tomnomnom/unfurl@latest",
        link: "https://github.com/tomnomnom/unfurl",
      },
      {
        name: "nuclei",
        desc: "Fast vulnerability scanner with 10,000+ templates including tech detection and CVE scanning",
        install: "go install -v github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest",
        link: "https://github.com/projectdiscovery/nuclei",
      },
      {
        name: "gowitness",
        desc: "Web screenshot utility with reporting — batch screenshots for visual recon",
        install: "go install -v github.com/sensepost/gowitness@latest",
        link: "https://github.com/sensepost/gowitness",
      },
      {
        name: "mantra",
        desc: "Automated JS secret scanner — detects API keys, tokens, JWTs, and credentials in JS files",
        install: "go install -v github.com/MrEmpy/mantra@latest",
        link: "https://github.com/MrEmpy/mantra",
      },
      {
        name: "subjs",
        desc: "Fast JavaScript file endpoint extractor — pulls URLs from JS files for further analysis",
        install: "go install -v github.com/lc/subjs@latest",
        link: "https://github.com/lc/subjs",
      },
    ],
    summary:
      "You now have a complete endpoint-level map: every URL, the technology behind it, its parameters, and visual evidence. This is the final output of the recon flow — the foundation for every vulnerability you'll find.",
  },
]
