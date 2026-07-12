import type { ReconChapter } from "./recon-flow-data"

export const automationChapters: ReconChapter[] = [
  {
    id: "pipeline-basics",
    number: 1,
    title: "Building Your First Recon Pipeline",
    subtitle: "Chain tools together so your recon runs while you sleep",
    color: "oklch(0.55 0.22 25)",
    overview:
      "A recon pipeline chains multiple tools together so the output of one feeds into the input of the next. Instead of running subfinder, then httpx, then nuclei manually, you build a script that does all of it in one command. This chapter teaches you to build, test, and deploy your first automated recon pipeline — from a simple one-liner to a full multi-stage system.",
    sections: [
      {
        title: "The Unix Pipe Philosophy",
        text: "Every ProjectDiscovery tool follows the same pattern: stdin → tool → stdout. This means you can connect them infinitely. Learn the pipe basics first — once you understand this pattern, you can build any pipeline by just swapping tools in and out.",
        commands: [
          {
            cmd: "subfinder -d example.com -silent | httpx -silent -title -status-code | head -20",
            desc: "The simplest pipeline: subdomains → live probe → preview. Three tools, one command, no temp files.",
          },
          {
            cmd: "cat domains.txt | subfinder -silent | dnsx -silent -a -resp-only | sort -u > ips.txt",
            desc: "Domain to IP pipeline: batch subdomain enumeration → DNS resolution → unique IP list",
          },
          {
            cmd: "subfinder -d example.com -silent | httpx -silent -title -status-code -tech-detect | grep -v 404 | tee live-sites.txt",
            desc: "Full recon one-liner: enumerate → probe → filter 404s → display AND save output simultaneously",
          },
          {
            cmd: "subfinder -d example.com -silent | dnsx -silent -a -resp-only | naabu -list - -top-ports 1000 -silent | tee port-scan.txt",
            desc: "Complete surface scan: subdomains → IPs → port scan — all without writing a single temp file",
          },
          {
            cmd: "subfinder -d example.com -silent | httpx -silent | nuclei -silent -t ~/nuclei-templates/ -o nuclei-results.txt",
            desc: "The golden pipeline: find subs → probe live → scan for vulns — the foundation of every automated workflow",
          },
          {
            cmd: "cat urls.txt | grep -E '\\.js$' | nuclei -silent -tags exposures -o js-secrets.txt",
            desc: "JavaScript scanning pipeline: filter JS files from URL list → scan for API keys and secrets with Nuclei",
          },
        ],
        tips: [
          "Use -silent flag on every tool — it strips headers and progress bars so only clean data flows through the pipe",
          "Always test pipe segments individually before chaining — add | head to preview before full execution",
          "The tee command lets you save intermediate output AND continue the pipe: | tee step1.txt | tool2",
          "Pipes are memory-efficient — data flows through RAM without writing to disk until you want it to",
        ],
      },
      {
        title: "Your First Automation Script",
        text: "Move from one-liners to a proper bash script. A script gives you control over input validation, error handling, output organization, and timestamped logging. Start simple — this script takes a domain, enumerates subdomains, probes them, and scans for vulnerabilities with organized output.",
        commands: [
          {
            cmd: '#!/bin/bash\nTARGET=$1\nOUTDIR="recon-$TARGET-$(date +%Y%m%d-%H%M)"\nmkdir -p $OUTDIR\nsubfinder -d $TARGET -silent -o $OUTDIR/subs.txt\ndnsx -l $OUTDIR/subs.txt -silent -a -resp-only -o $OUTDIR/ips.txt\nhttpx -l $OUTDIR/subs.txt -silent -title -status-code -tech-detect -o $OUTDIR/live.txt\nnuclei -l $OUTDIR/live.txt -silent -o $OUTDIR/nuclei-results.txt\necho "Done — results in $OUTDIR"',
            desc: "Complete recon script: input domain, timestamped output directory, sequential enumeration, and vulnerability scanning",
          },
          {
            cmd: 'chmod +x recon.sh && ./recon.sh example.com',
            desc: "Make the script executable and run it against your target — outputs go to a timestamped folder",
          },
          {
            cmd: "for domain in $(cat targets.txt); do ./recon.sh $domain; done",
            desc: "Batch mode: run the same recon script against every domain in your target list automatically",
          },
          {
            cmd: '#!/bin/bash\nTARGET=$1\nOUTDIR="recon-$TARGET"\n[ -d "$OUTDIR" ] && echo "Error: $OUTDIR exists" && exit 1\nmkdir $OUTDIR\nsubfinder -d $TARGET -silent -o $OUTDIR/subs.txt\necho "Phase 1/4 complete: $(wc -l < $OUTDIR/subs.txt) subdomains"',
            desc: "Script with error handling: check for duplicate runs, show progress after each phase with counter",
          },
          {
            cmd: './recon.sh example.com 2>&1 | tee recon.log',
            desc: "Run the script and log everything to a file for debugging and audit trail",
          },
          {
            cmd: '#!/bin/bash\nrun_phase() {\n  local phase=$1\n  local cmd=$2\n  echo "[$(date +%H:%M:%S)] Phase $phase started"\n  eval "$cmd"\n  echo "[$(date +%H:%M:%S)] Phase $phase finished"\n}\nrun_phase "1-Subs" "subfinder -d $1 -silent -o subs.txt"\nrun_phase "2-Live" "httpx -l subs.txt -silent -o live.txt"',
            desc: "Modular script with function-based phases — timestamped logging for each phase with start/finish markers",
          },
        ],
        tips: [
          "Always use timestamped output directories — they prevent overwrites and give you a history of scans",
          "Add error checking: if a tool fails (non-zero exit), the script should log the failure and continue to the next phase",
          "Test your script with a small domain first before running against your actual target",
          "Use 2>&1 to capture stderr — many CLI tools write progress and errors to stderr, not stdout",
        ],
      },
      {
        title: "Multi-Stage Recon Pipeline",
        text: "A production-grade pipeline runs stages in parallel, handles failures gracefully, and notifies you when results are ready. This section builds a complete multi-stage pipeline that handles subdomain enumeration, port scanning, technology detection, vulnerability scanning, and reporting.",
        commands: [
          {
            cmd: '#!/bin/bash\nTARGET=$1; O="recon-$TARGET-$(date +%Y%m%d)"\nmkdir -p $O/{subs,ports,live,vulns,report}\nsubfinder -d $TARGET -silent -o $O/subs/all.txt\npuredns resolve $O/subs/all.txt -r resolvers.txt -o $O/subs/resolved.txt\nhttpx -l $O/subs/resolved.txt -silent -title -tech-detect -status-code -o $O/live/enriched.txt\nnaabu -list $(awk \'{print $NF}\' $O/subs/resolved.txt | sort -u) -top-ports 1000 -silent -o $O/ports/open.txt',
            desc: "Stage 1: parallel-ready pipeline design — each phase uses a dedicated subdirectory for clean output organization",
          },
          {
            cmd: "subfinder -d example.com -silent | dnsx -silent -a -resp-only | naabu -list - -top-ports 100 -silent > ips-ports.txt",
            desc: "Parallel execution pipe: subdomains → IP resolution → port scan in one memory-efficient pipeline",
          },
          {
            cmd: "nuclei -l $O/live/enriched.txt -t cves/ -severity critical,high -silent -o $O/vulns/critical.txt",
            desc: "Stage 2: vulnerability scanning — focus on critical and high severity CVEs first for maximum impact",
          },
          {
            cmd: "nuclei -l $O/live/enriched.txt -t exposures/ -silent -o $O/vulns/exposures.txt",
            desc: "Stage 3: exposure scanning — check for open S3 buckets, debug pages, admin panels, and misconfigurations",
          },
          {
            cmd: "nuclei -l $O/live/enriched.txt -t misconfiguration/ -silent -o $O/vulns/misconfig.txt",
            desc: "Stage 4: misconfiguration scanning — find security header gaps, directory listing, and other common flaws",
          },
          {
            cmd: "cat $O/vulns/*.txt | grep -v '^$' | sort -u > $O/report/all-findings.txt",
            desc: "Report generation: merge all vulnerability files into a single deduplicated findings report",
          },
          {
            cmd: "wc -l $O/report/all-findings.txt && echo 'vulnerabilities found'",
            desc: "Quick summary: count total unique findings and display directly in terminal output",
          },
        ],
        tips: [
          "Run the port scan and subdomain enumeration in parallel — they don't depend on each other (subdomains → IPs vs direct IP scan)",
          "Use separate output directories per stage so you can re-run individual stages without losing previous results",
          "The -t flag in nuclei accepts a directory path — organize your own template collection by category",
          "Always sort and deduplicate final output — the same vulnerability might be detected by multiple templates",
        ],
      },
      {
        title: "Notification & Alerting",
        text: "A pipeline that runs silently and never tells you anything is useless. Set up notifications so you get alerts when critical vulnerabilities are found. Support multiple channels: a terminal bell for local scripts, Telegram for remote monitoring, and Slack for team collaboration.",
        commands: [
          {
            cmd: 'echo "Critical vulnerability found!" | notify -silent -provider telegram',
            desc: "Send a notification via Telegram using ProjectDiscovery's notify tool — requires pre-configured provider",
          },
          {
            cmd: 'nuclei -l live.txt -t cves/ -severity critical -json -silent | notify -silent',
            desc: "Pipe critical Nuclei findings directly to Telegram/Slack — instant alert when something important is found",
          },
          {
            cmd: '#!/bin/bash\nnotify_critical() {\n  local finding=$1\n  echo "$finding" | notify -silent -provider telegram\n  echo "$finding" | notify -silent -provider slack\n  echo -e "\\a"  # terminal bell\n}\nsubfinder -d $1 -silent | httpx -silent | nuclei -t cves/ -severity critical -json -silent | while read line; do\n  notify_critical "$line"\ndone',
            desc: "Multi-channel alert script: Telegram + Slack + terminal bell when critical CVEs are detected in real-time",
          },
          {
            cmd: "notify -provider telegram -silent -data '{\"message\":\"Recon complete for example.com — 23 live hosts, 12 open ports, 3 critical findings\"}'",
            desc: "Send a formatted summary message at the end of a pipeline run — one digest instead of multiple alerts",
          },
          {
            cmd: "nuclei -l live.txt -t cves/ -json -silent | jq -r '[.info.severity, .info.name, .host] | @tsv' | while IFS=$'\\t' read sev name host; do echo \"Alert: $sev - $name on $host\" | notify -silent; done",
            desc: "Parse Nuclei JSON output with jq and send individual alerts per finding with severity and host info",
          },
          {
            cmd: "cat $OUTDIR/vulns/critical.txt | notify -silent -bulk -id critical-findings",
            desc: "Bulk notify: send all critical findings as a single message using a custom provider ID",
          },
        ],
        tips: [
          "Configure notify providers once in ~/.config/notify/provider-config.yaml — supports Telegram, Slack, Discord, and more",
          "Use Telegram for personal alerts — it's free, fast, and works on mobile with no additional setup",
          "Slack is better for team pipelines — use separate channels for critical vs informational alerts",
          "Always include the target domain and severity in the alert message so you can triage from your phone",
        ],
      },
      {
        title: "Parallel Execution with GNU Parallel & xargs",
        text: "Most recon tools are CPU-bound or I/O-bound on a single thread. GNU Parallel and xargs distribute work across all CPU cores, processing multiple targets simultaneously. A pipeline that takes 1 hour on one core finishes in 2 minutes on 30 cores. This is the single biggest performance optimization you can make.",
        commands: [
          {
            cmd: "cat domains.txt | parallel -j 32 'subfinder -d {} -silent | httpx -silent -title -status-code >> results/{}.txt'",
            desc: "Parallel subdomain enumeration across 32 cores — each domain gets its own subfinder+httpx pipeline",
          },
          {
            cmd: "subfinder -d example.com -silent | parallel -j 50 'dnsx -silent -a -resp-only | httpx -silent -title -status-code'",
            desc: "Parallel DNS resolution and HTTP probing — 50 subdomains processed simultaneously",
          },
          {
            cmd: "cat targets.txt | xargs -P 10 -I {} ./recon-single.sh {}",
            desc: "xargs with 10 parallel processes — runs the recon script for 10 targets at once",
          },
          {
            cmd: "seq 1 65535 | parallel -j 100 'naabu -host example.com -p {} -silent 2>/dev/null' | sort -u > all-ports.txt",
            desc: "Parallel full port scan with naabu — 100 ports at a time, completes a full 65535 scan in seconds",
          },
          {
            cmd: "parallel -a urls.txt -j 20 'curl -sI {} | head -1' ::: {} > response-codes.txt",
            desc: "Parallel HTTP header fetcher — check response codes for 20 URLs simultaneously",
          },
          {
            cmd: '#!/bin/bash\nscan_domain() {\n  local d=$1\n  subfinder -d $d -silent | httpx -silent | nuclei -silent -o "nuclei-$d.txt"\n}\nexport -f scan_domain\ncat top-100-targets.txt | parallel -j 10 scan_domain {}',
            desc: "Export a bash function and run it with GNU Parallel — full pipeline across 100 targets, 10 at a time",
          },
          {
            cmd: "parallel -j 0 --progress 'echo Scanning {}; nmap -sV -p 80,443 {}' :::: ip-list.txt",
            desc: "Parallel nmap with progress bar — shows real-time completion stats for each target being scanned",
          },
        ],
        tips: [
          "GNU Parallel's -j 0 uses all available cores automatically, -j N specifies the exact parallelism level",
          "Start with -j 10 and increase gradually — too much parallelism can trigger rate limiting on the target",
          "Use --progress to see how many jobs are complete when scanning large lists of targets",
          "For I/O-bound tools (like httpx), higher parallelism (j=100+) is safe. For CPU-bound (nmap), match core count",
        ],
      },
      {
        title: "GitOps for Recon — Version-Controlled Results",
        text: "Store every scan result in a Git repository. Each run creates a commit with timestamped results — you can see exactly what changed, when, and roll back if needed. GitOps turns your recon into a searchable, auditable, collaborative database. Push to GitHub/GitLab for remote backup and team access.",
        commands: [
          {
            cmd: '#!/bin/bash\n# git-recon.sh — automated recon with Git tracking\nTARGET=$1; REPO="$HOME/recon-results/$TARGET"\nmkdir -p $REPO; cd $REPO\n[ ! -d ".git" ] && git init && git commit --allow-empty -m "init"\nsubfinder -d $TARGET -silent -o subs.txt\nhttpx -l subs.txt -silent -title -status-code -tech-detect -o live.txt\nnuclei -l live.txt -silent -o nuclei.txt\ngit add .\ngit commit -m "recon $(date +%Y-%m-%d_%H:%M)"',
            desc: "Auto-commit script: run recon and immediately commit results to local Git repository with timestamp",
          },
          {
            cmd: "cd ~/recon-results/example.com && git log --oneline -10",
            desc: "View the last 10 recon runs — each commit represents a full scan cycle with timestamp",
          },
          {
            cmd: "cd ~/recon-results/example.com && git diff HEAD~1 -- subs.txt",
            desc: "Compare subdomains between today's scan and yesterday's — exactly what changed in the diff",
          },
          {
            cmd: "cd ~/recon-results/example.com && git diff HEAD~7 -- nuclei.txt | grep '^+' | grep -v '^+++'",
            desc: "See all new vulnerabilities found in the last week — grep only the additions in the diff",
          },
          {
            cmd: "cd ~/recon-results && git remote add origin git@github.com:user/recon-results.git && git push -u origin main",
            desc: "Push all recon results to a private GitHub repository — remote backup and team collaboration",
          },
          {
            cmd: '#!/bin/bash\n# push-recon.sh — auto push after every scan\ncd ~/recon-results/example.com\ngit add .\ngit commit -m "auto-scan $(date +%Y-%m-%d_%H:%M)"\ngit push origin main 2>&1 || echo "Push failed — will retry next cycle"',
            desc: "Auto-push script: commit and push to remote after every scan cycle with automatic retry logic",
          },
          {
            cmd: "cd ~/recon-results && grep -r 'admin' --include='live.txt' | grep '200'",
            desc: "Search across ALL historical scan data: find every admin panel that ever returned 200 across all targets",
          },
        ],
        tips: [
          "Use a .gitignore to exclude large binary files (screenshots, full nmap XML) — keep the repo lean for fast diffs",
          "GitHub's diff view shows exactly which subdomains appeared and disappeared — built-in change detection",
          "Tag critical findings: `git tag bounty-001-nov-15` — makes it easy to reference findings in reports",
          "Private repos are free on GitHub — use them for all you recon data, never push to public repos",
        ],
      },
      {
        title: "Cloud-Native Serverless Pipelines",
        text: "Run your pipeline without managing a server. AWS Lambda, Google Cloud Run, and GitHub Actions can execute recon tasks on-demand. Provision a cloud function for each tool, chain them via HTTP/webhooks, and only pay for the compute time you use. Serverless approaches excel at burstable workloads like mass scanning.",
        commands: [
          {
            cmd: 'cat << EOF > .github/workflows/nightly-recon.yml\nname: Nightly Recon\non:\n  schedule:\n    - cron: "0 2 * * *"\n  workflow_dispatch:\njobs:\n  recon:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Install tools\n        run: |\n          go install github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest\n          go install github.com/projectdiscovery/httpx/cmd/httpx@latest\n          go install github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest\n      - name: Run recon\n        run: |\n          subfinder -d example.com -silent | httpx -silent | nuclei -silent -o results.txt\n          cat results.txt\n      - name: Commit results\n        run: |\n          git config user.name "recon-bot"\n          git add .\n          git commit -m "nightly recon $(date +%Y%m%d)" || echo "no changes"\n          git push\nEOF',
            desc: "GitHub Actions workflow: scheduled nightly recon on GitHub's infrastructure — free, no server needed",
          },
          {
            cmd: "gcloud functions deploy subfinder-scan --runtime go121 --trigger-http --allow-unauthenticated --entry-point Scan",
            desc: "Deploy a Google Cloud Function that runs subfinder — serverless HTTP-triggered recon",
          },
          {
            cmd: 'curl -X POST https://YOUR_CLOUD_FUNCTION_URL -d \'{"domain": "example.com"}\'',
            desc: "Trigger a serverless scan via HTTP POST — integrate into any pipeline with a simple curl call",
          },
          {
            cmd: 'cat << EOF > Dockerfile.cloudrun\nFROM ubuntu:22.04\nRUN apt update && apt install -y golang git\nRUN go install github.com/projectdiscovery/httpx/cmd/httpx@latest\nENTRYPOINT ["httpx"]\nEOF',
            desc: "Cloud Run container: single-purpose container with httpx — deploy as a stateless microservice",
          },
          {
            cmd: "gcloud run deploy httpx-scan --image gcr.io/your-project/httpx-scan --cpu 4 --memory 8Gi --timeout 900",
            desc: "Deploy to Cloud Run with 4 CPUs, 8GB RAM, and 15-minute timeout — enough for large target lists",
          },
          {
            cmd: "aws lambda create-function --function-name recon-subfinder --runtime go1.x --role arn:aws:iam::xxx:role/lambda-exec --zip-file fileb://function.zip",
            desc: "AWS Lambda deployment for subfinder — serverless recon in the AWS ecosystem with IAM role security",
          },
        ],
        tips: [
          "GitHub Actions gives you 2000 minutes/month free — enough for daily recon on 5-10 targets",
          "Cloud Run charges only when your function is running — idle costs $0, perfect for periodic scanning",
          "Lambda has a 15-minute timeout limit — split large scanning jobs into smaller batches",
          "Store API keys (Shodan, Chaos) in GitHub Secrets or cloud environment variables — never in code",
        ],
      },
    ],
    tools: [
      {
        name: "notify",
        desc: "ProjectDiscovery notification tool — sends pipeline results to Telegram, Slack, Discord, and 20+ services",
        install: "go install -v github.com/projectdiscovery/notify/cmd/notify@latest",
        link: "https://github.com/projectdiscovery/notify",
      },
      {
        name: "bash",
        desc: "The GNU Bourne-Again SHell — the foundation of every automation pipeline on Linux",
        install: "Pre-installed on most Linux systems. Windows: WSL or Git Bash",
        link: "https://www.gnu.org/software/bash/",
      },
      {
        name: "jq",
        desc: "Lightweight JSON processor — essential for parsing tool outputs in pipelines",
        install: "apt install jq",
        link: "https://github.com/jqlang/jq",
      },
      {
        name: "parallel",
        desc: "GNU Parallel — distribute jobs across all CPU cores for massive speedup",
        install: "apt install parallel",
        link: "https://www.gnu.org/software/parallel/",
      },
      {
        name: "git",
        desc: "Version control system — track every scan result with full history and change detection",
        install: "apt install git",
        link: "https://git-scm.com/",
      },
      {
        name: "gh",
        desc: "GitHub CLI — automate repository creation, pushing, and management from the terminal",
        install: "Can be downloaded from https://cli.github.com/",
        link: "https://cli.github.com/",
      },
    ],
    summary:
      "You now understand the core automation patterns: Unix pipes, bash scripting, multi-stage pipelines, parallel execution, GitOps version control, serverless cloud deployment, and real-time notifications. These building blocks let you automate any recon workflow. Chapter 2 takes this further with Nuclei's advanced capabilities.",
  },
  {
    id: "nuclei-advanced",
    number: 2,
    title: "Advanced Nuclei Automation",
    subtitle: "Custom templates, workflows, and fuzzing at scale",
    color: "oklch(0.72 0.16 75)",
    overview:
      "Nuclei is the most powerful tool in your automation arsenal. Beyond basic scanning, it supports custom templates, multi-step workflows, HTTP fuzzing, code execution, and conditional logic. This chapter teaches you to write your own templates, build complex workflows that chain multiple checks together, and use Nuclei for targeted fuzzing and brute-forcing.",
    sections: [
      {
        title: "Template Fundamentals",
        text: "Nuclei templates are YAML files that define how to detect vulnerabilities. Every template has a request section (what to send) and a matcher section (what to look for in the response). Learn to read templates, understand their structure, and write your own targeted checks.",
        commands: [
          {
            cmd: "nuclei -u https://example.com -t cves/ -stats -o scan-results.txt",
            desc: "Run all CVE templates with live statistics — shows progress, found, and rate metrics in real-time",
          },
          {
            cmd: "nuclei -u https://example.com -t ~/nuclei-templates/ -severity critical,high -o critical-only.txt",
            desc: "Run only critical and high severity templates — focus on the most impactful findings first",
          },
          {
            cmd: "nuclei -u https://example.com -t ~/nuclei-templates/ -s 200,403,500 -o status-filtered.txt",
            desc: "Filter results by HTTP status code — useful when looking for specific response patterns",
          },
          {
            cmd: "nuclei -u https://example.com -t ~/nuclei-templates/ -json -o scan.json",
            desc: "JSON output format — machine-readable output for pipeline processing with jq and other tools",
          },
          {
            cmd: "nuclei -u https://example.com -t ~/nuclei-templates/ -rl 150 -rate-limit-minute 60 -o rate-limited.txt",
            desc: "Rate-limited scan — 150 requests per second, 60 per minute to avoid WAF blocks",
          },
          {
            cmd: "nuclei -l live-urls.txt -t ~/nuclei-templates/ -bulk-size 25 -c 10 -o batch-scan.txt",
            desc: "Batch scanning across multiple targets — 25 URLs per batch, 10 concurrent hosts",
          },
          {
            cmd: "cat nuclei-results.json | jq -r '[.info.severity, .info.name, .host] | @tsv' | column -t -s $'\\t'",
            desc: "Format JSON results into a clean severity | name | host table for easy triage and reporting",
          },
        ],
        tips: [
          "Organize templates by category: cves/, exposures/, misconfiguration/, technologies/, takeovers/",
          "Use -stats for long-running scans — it shows progress so you know something is happening",
          "Rate limiting (-rl 150) is essential on bug bounty targets — most programs expect slow, careful scanning",
          "Store JSON output when running in pipelines — it's easier to parse, filter, and analyze programmatically",
        ],
      },
      {
        title: "Writing Custom Templates",
        text: "Custom Nuclei templates let you check for vulnerabilities specific to your target. Write templates for internal applications, custom software, or unique misconfigurations. A Nuclei template defines one or more HTTP requests and matchers that extract specific patterns from responses.",
        commands: [
          {
            cmd: "cat ~/nuclei-templates/cves/2023/CVE-2023-XXXX.yaml",
            desc: "Read an existing CVE template to understand the YAML structure: id, info, requests, and matchers sections",
          },
          {
            cmd: 'cat << EOF > custom-check.yaml\nid: custom-config-exposure\ninfo:\n  name: Custom Config Exposure\n  severity: medium\n  description: Checks for exposed configuration file\nrequests:\n  - method: GET\n    path:\n      - "{{BaseURL}}/config.json"\n    matchers:\n      - type: word\n        words:\n          - "api_key"\n          - "database"\n          - "password"\nEOF',
            desc: "Custom template from scratch: checks for config.json files containing sensitive keywords like api_key or password",
          },
          {
            cmd: "nuclei -u https://target.com -t custom-check.yaml -o custom-results.txt",
            desc: "Run your custom template against a target to test it works before adding it to your template library",
          },
          {
            cmd: 'cat << EOF > multi-endpoint.yaml\nid: multi-endpoint-check\ninfo:\n  name: Multiple Endpoint Check\n  severity: info\nrequests:\n  - method: GET\n    path:\n      - "{{BaseURL}}/robots.txt"\n      - "{{BaseURL}}/sitemap.xml"\n      - "{{BaseURL}}/.well-known/security.txt"\n    matchers:\n      - type: word\n        words:\n          - "Disallow"\n          - "sitemap"\n          - "security"\nEOF',
            desc: "Multi-endpoint template: checks multiple paths in a single request block for common security-related files",
          },
          {
            cmd: 'cat << EOF > conditional-template.yaml\nid: conditional-dir-check\ninfo:\n  name: Directory exists check\n  severity: info\nrequests:\n  - method: GET\n    path:\n      - "{{BaseURL}}/{{path}}"    \n    payloads:\n      path: admin-paths.txt\n    stop-at-first-match: true\n    matchers:\n      - type: status\n        status:\n          - 200\n          - 403\n          - 401\nEOF',
            desc: "Parameterized template with payload file — iterates over admin-paths.txt and stops on first match (200/403/401)",
          },
          {
            cmd: "nuclei -u https://target.com -t my-templates/ -workflows -o workflow-results.txt",
            desc: "Run a custom template directory with workflow execution — templates in subdirectories run in sequence",
          },
        ],
        tips: [
          "Test custom templates against a target you own before using them in bug bounty engagements",
          "Use {{BaseURL}} as the placeholder — Nuclei automatically replaces it with each target from your input list",
          "The stop-at-first-match flag prevents redundant requests once a finding is confirmed",
          "Build a library of reusable matcher snippets (status codes, words, regex) for faster template writing",
        ],
      },
      {
        title: "Nuclei Workflows",
        text: "Workflows chain multiple templates together with conditional logic. Template A runs first — if it matches, Template B runs. If Template B matches, Template C runs. This enables multi-stage exploitation checks where each step builds on the previous one.",
        commands: [
          {
            cmd: 'cat << EOF > chain-workflow.yaml\nid: xss-to-account-takeover\ninfo:\n  name: XSS to ATO chaining\n  author: automation-guide\nsteps:\n  - template: xss-detection.yaml\n    matchers:\n      - name: xss-found\n  - template: cookie-grabber.yaml\n    matchers:\n      - name: cookie-captured\n  - template: session-hijack.yaml\n    conditions:\n      - xss-found\n      - cookie-captured\nEOF',
            desc: "Conditional workflow: runs cookie-grabber only if XSS is found, then session-hijack only if cookie is captured",
          },
          {
            cmd: "nuclei -u https://target.com -w chain-workflow.yaml -o workflow-results.txt",
            desc: "Execute a workflow file — Nuclei processes templates in order with the defined conditions",
          },
          {
            cmd: 'cat << EOF > tech-then-exploit.yaml\nid: tech-to-exploit\ninfo:\n  name: Tech detection then exploit\nsteps:\n  - template: tech-detect/wordpress.yaml\n    matchers:\n      - name: wp-version\n  - template: cves/wordpress/\n    conditions:\n      - wp-version\nEOF',
            desc: "Smart workflow: detect the technology first, then run ALL relevant CVE templates only if the technology is found",
          },
          {
            cmd: 'cat << EOF > multi-condition.yaml\nid: port-and-service\ninfo:\n  name: Port discovery with service check\nsteps:\n  - template: port-scan.yaml\n    matchers:\n      - name: port-443\n  - template: ssl-check.yaml\n    matchers:\n      - name: weak-ciphers\n  - template: heartbleed.yaml\n    conditions:\n      - port-443\n      - weak-ciphers\nEOF',
            desc: "Multi-condition workflow: runs Heartbleed check only if port 443 is open AND weak ciphers are detected",
          },
          {
            cmd: "nuclei -l targets.txt -w workflows/ -o all-workflow-results.txt",
            desc: "Run an entire workflow directory against a target list — processes all .yaml files as individual workflows",
          },
        ],
        tips: [
          "Workflows are slower than individual templates because they run sequentially — use them for targeted chaining, not bulk scanning",
          "Name your matchers descriptively (xss-found, wp-version) — they become the conditions for downstream templates",
          "Workflows can reference other workflows, creating nested chaining for complex multi-step exploits",
          "Use workflows to reduce noise: only run an exploit template if the technology detection template confirms the target is vulnerable",
        ],
      },
      {
        title: "Nuclei Fuzzing & HTTP Brute-Force",
        text: "Beyond vulnerability scanning, Nuclei excels at fuzzing and brute-forcing. Use raw HTTP requests with payload substitution to test endpoints, parameters, and authentication. Nuclei fuzzing is faster than ffuf for some use cases because it avoids the overhead of separate HTTP connections.",
        commands: [
          {
            cmd: 'cat << EOF > dir-fuzz.yaml\nid: directory-fuzzing\ninfo:\n  name: Nuclei directory fuzzing\nrequests:\n  - raw:\n      - |\n        GET {{BaseURL}}/{{path}} HTTP/1.1\n        Host: {{Hostname}}\n    payloads:\n      path: directory-wordlist.txt\n    stop-at-first-match: true\n    matchers:\n      - type: status\n        status:\n          - 200\n          - 403\n          - 401\nEOF',
            desc: "Nuclei-based directory fuzzing — reads paths from a wordlist and checks for 200/403/401 responses",
          },
          {
            cmd: "nuclei -u https://target.com -t dir-fuzz.yaml -o fuzzed-dirs.txt -rl 100",
            desc: "Run the fuzzing template with rate limiting (100 req/s) to avoid triggering WAFs",
          },
          {
            cmd: 'cat << EOF > param-fuzz.yaml\nid: parameter-fuzzing\ninfo:\n  name: Nuclei parameter fuzzing\nrequests:\n  - raw:\n      - |\n        GET {{BaseURL}}/api?{{param}}=test HTTP/1.1\n        Host: {{Hostname}}\n    payloads:\n      param: params.txt\n    matchers:\n      - type: word\n        words:\n          - "error"\n          - "warning"\n          - "exception"\n          - "stack trace"\n        negative: true\nEOF',
            desc: "Parameter fuzzing template — injects parameter names from a wordlist and checks for error/exception responses",
          },
          {
            cmd: "cat ~/nuclei-templates/fuzzing/oauth-brute.yaml | head -30",
            desc: "Read an existing brute-force template to understand the pattern — common for OAuth token and session testing",
          },
        ],
        tips: [
          "Nuclei fuzzing is best for targeted, small wordlists (< 1000 items) — use ffuf for large-scale fuzzing",
          "Raw HTTP requests give you full control over headers, body, and method — useful for API testing",
          "Use {{Hostname}} for the Host header and {{BaseURL}} for the full URL — they differ in redirect handling",
          "Stop-at-first-match is critical for fuzzing — without it, Nuclei continues scanning even after a hit is found",
        ],
      },
      {
        title: "Template Development Workflow",
        text: "Writing Nuclei templates is a skill that compounds over time. Set up a proper development workflow: a directory structure for your custom templates, a testing pipeline that validates them against known targets, and a peer review process. Well-written templates are reusable across hundreds of engagements.",
        commands: [
          {
            cmd: 'mkdir -p ~/custom-templates/{cves,exposures,tech-detect,misconfig,workflows} && ls ~/custom-templates/',
            desc: "Organized template directory structure — categories mirror the official template repo for consistency",
          },
          {
            cmd: 'cat << EOF > ~/custom-templates/tech-detect/custom-cms.yaml\nid: custom-cms-detection\ninfo:\n  name: Custom CMS Detection\n  author: hunter\n  severity: info\n  description: Detects Custom CMS v3.x by its unique path\nrequests:\n  - method: GET\n    path:\n      - "{{BaseURL}}/custom-cms/version.php"\n    matchers:\n      - type: word\n        words:\n          - "Custom CMS v3."\nEOF',
            desc: "Create your first custom technology detection template — detect a specific CMS version by its unique path",
          },
          {
            cmd: "nuclei -u https://test-target.com -t ~/custom-templates/ -v",
            desc: "Test all your custom templates against a known target in verbose mode — see exactly what matched and why",
          },
          {
            cmd: 'cat << EOF > ~/custom-templates/workflows/cms-chain.yaml\nid: cms-chain\ninfo:\n  name: CMS Detection to Exploit Chain\nsteps:\n  - template: ~/custom-templates/tech-detect/custom-cms.yaml\n    matchers:\n      - name: cms-detected\n  - template: ~/nuclei-templates/cves/2023/*cms*\n    conditions:\n      - cms-detected\nEOF',
            desc: "Chain workflow: detect the CMS first → automatically run all matching CVE templates if found",
          },
          {
            cmd: "nuclei -u https://target.com -t ~/custom-templates/ -validate",
            desc: "Validate ALL your templates for YAML syntax errors before using them in a real engagement",
          },
          {
            cmd: "nuclei -u https://target.com -t ~/custom-templates/ -duc -o only-new-findings.txt",
            desc: "Deduplicate: skip findings from previous runs (-duc) so you only see NEW vulnerabilities",
          },
          {
            cmd: 'cat << EOF >> ~/.bash_aliases\nalias ncv="nuclei -validate"\nalias ncs="nuclei -duc -silent"\nEOF && source ~/.bash_aliases',
            desc: "Shell aliases for common Nuclei operations — validate templates with ncv and scan with -duc via ncs",
          },
        ],
        tips: [
          "Always validate templates with `-validate` flag before committing them to your collection",
          "Use -duc (deduplicate) during daily scans — it skips previously detected findings and shows only what's new",
          "Version control your custom templates with Git — track changes, roll back mistakes, share with teammates",
          "Name templates descriptively: `cve-year-software-description.yaml` makes them easy to find later",
        ],
      },
      {
        title: "CI/CD Integration — GitHub Actions Pipeline",
        text: "Embed recon directly into your CI/CD pipeline. Every time you push code, your infrastructure gets scanned automatically. Pull requests trigger targeted scans of new endpoints. This catches vulnerabilities within minutes of deployment — before they reach production and before attackers find them.",
        commands: [
          {
            cmd: 'cat << EOF > .github/workflows/recon-on-push.yml\nname: PR Recon Scan\non:\n  pull_request:\n    branches: [main]\njobs:\n  recon:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Install tools\n        run: |\n          go install github.com/projectdiscovery/httpx/cmd/httpx@latest\n          go install github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest\n      - name: Scan new endpoints\n        run: |\n          git diff --name-only origin/main | grep -E "html|js|php" > changed-files.txt\n          cat changed-files.txt | httpx -silent | nuclei -silent -o pr-findings.txt || true\n          cat pr-findings.txt\nEOF',
            desc: "PR-triggered recon: scans only the files changed in a pull request for vulnerabilities — targeted and fast",
          },
          {
            cmd: 'cat << EOF > .github/workflows/weekly-full-scan.yml\nname: Weekly Full Infrastructure Scan\non:\n  schedule:\n    - cron: "0 6 * * 1"\njobs:\n  scan:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Full recon scan\n        run: |\n          subfinder -d example.com -silent > subs.txt\n          httpx -l subs.txt -silent -o live.txt\n          nuclei -l live.txt -silent -o vulns.txt\n      - name: Upload results\n        uses: actions/upload-artifact@v4\n        with:\n          name: scan-results\n          path: "*.txt"\n      - name: Notify on findings\n        if: failure()\n        run: echo "Scan failed — check logs" | notify -silent\nEOF',
            desc: "Weekly full scan via GitHub Actions with artifact storage and failure notification",
          },
          {
            cmd: "gh workflow run nightly-recon.yml -f domain=example.com",
            desc: "Trigger a workflow manually via GitHub CLI — useful for ad-hoc scans without opening the browser",
          },
          {
            cmd: "gh run list --workflow=nightly-recon.yml --limit 5 --json conclusion,createdAt,displayTitle",
            desc: "View the last 5 workflow runs with their status and timestamps — monitor scan health from terminal",
          },
          {
            cmd: 'cat << EOF > .github/workflows/auto-triage.yml\nname: Auto-Triage Findings\non:\n  workflow_run:\n    workflows: ["Nightly Recon"]\n    types:\n      - completed\njobs:\n  triage:\n    runs-on: ubuntu-latest\n    if: ${{ github.event.workflow_run.conclusion == "success" }}\n    steps:\n      - name: Download artifacts\n        uses: actions/download-artifact@v4\n      - name: Analyze findings\n        run: |\n          cat vulns.txt | grep -i "critical" > critical.txt\n          if [ -s critical.txt ]; then\n            echo "CRITICAL FINDINGS DETECTED" | notify -silent\n            cat critical.txt | notify -silent\n          fi\nEOF',
            desc: "Auto-triage pipeline: after recon completes, auto-analyze findings and alert only on critical severity",
          },
        ],
        tips: [
          "GitHub Actions has a 6-hour execution limit — plenty for most recon tasks, split larger scans into separate jobs",
          "Use actions/cache to cache Go modules and tool installations — reduces setup time from 2 minutes to 10 seconds",
          "Upload scan results as artifacts — they're stored for 90 days and downloadable from the Actions UI",
          "Use workflow_dispatch with input parameters for ad-hoc scanning: `workflow_dispatch: inputs: domain: required: true`",
        ],
      },
      {
        title: "Building a Custom Template Collection",
        text: "Over time, build your own private template library targeting specific platforms, software, and misconfigurations you encounter frequently. A curated collection of 50 well-written templates is worth more than 10,000 generic ones. Prioritize templates for bug bounty programs you hunt on regularly.",
        commands: [
          {
            cmd: "nuclei -update-templates && nuclei -silent -t ~/nuclei-templates/ -stats -o full-scan.txt",
            desc: "Update the official template repo and run a full baseline scan — capture everything as your starting point",
          },
          {
            cmd: "cat full-scan.txt | awk '{print $2}' | sort | uniq -c | sort -rn | head -20",
            desc: "Analyze which templates trigger most often — identify the patterns that actually matter for your targets",
          },
          {
            cmd: "mv ~/nuclei-templates/cves/2020/ ~/nuclei-templates-archive/",
            desc: "Prune outdated templates (4+ year old CVEs) — they add noise and rarely apply to modern targets",
          },
          {
            cmd: '#!/bin/bash\n# organize-templates.sh — keep only useful templates\ncd ~/nuclei-templates\nmkdir -p active/\ncp cves/*/*[Ww]ordpress* active/\ncp cves/*/*[Ll]aravel* active/\ncp cves/*/*[Aa]pache* active/\ncp exposures/* active/\ncp misconfiguration/* active/\necho "Archived $(find . -name \"*.yaml\" | wc -l) templates to active/"',
            desc: "Template curation script: extract only templates relevant to your targets (WordPress, Laravel, Apache, etc.)",
          },
          {
            cmd: 'cat << EOF > ~/custom-templates/misconfig/debug-endpoints.yaml\nid: debug-endpoint-check\ninfo:\n  name: Debug Endpoint Exposure\n  severity: medium\n  description: Check for exposed debug endpoints\nrequests:\n  - method: GET\n    path:\n      - "{{BaseURL}}/debug"\n      - "{{BaseURL}}/phpinfo.php"\n      - "{{BaseURL}}/.env"\n      - "{{BaseURL}}/info.php"\n    matchers:\n      - type: word\n        words:\n          - "PHP Version"\n          - "DB_HOST"\n          - "APP_ENV"\n          - "xdebug"\nEOF',
            desc: "Custom debug endpoint scanner — checks multiple debug paths and matches on known informational responses",
          },
          {
            cmd: "nuclei -l live.txt -t ~/custom-templates/ -author hunter -o my-findings.txt",
            desc: "Run only templates created by you (filter by author) — useful when testing newly written templates",
          },
        ],
        tips: [
          "Tag your templates with `x-bbp: true` in the info section to mark them as bug-bounty-specific for faster scans",
          "Delete templates for software you never encounter (SAP, Oracle, Lotus Notes) — they just add noise",
          "Create a 'watchlist' directory for high-value targets (admin panels, debug endpoints, API docs) — scan these daily",
          "Share templates with trusted peers — collaborative template development produces better coverage",
        ],
      },
    ],
    tools: [
      {
        name: "nuclei",
        desc: "Fast vulnerability scanner with 10,000+ templates, custom templates, workflows, and fuzzing",
        install: "go install -v github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest",
        link: "https://github.com/projectdiscovery/nuclei",
      },
      {
        name: "nuclei-templates",
        desc: "Official template repository — 10,000+ templates for CVEs, exposures, misconfigurations, and tech detection",
        install: "git clone https://github.com/projectdiscovery/nuclei-templates.git ~/nuclei-templates",
        link: "https://github.com/projectdiscovery/nuclei-templates",
      },
      {
        name: "vs code",
        desc: "YAML syntax highlighting and validation makes writing custom templates much easier",
        install: "Can be downloaded from https://code.visualstudio.com/download",
        link: "https://code.visualstudio.com",
      },
    ],
    summary:
      "You now understand Nuclei at an expert level: reading templates, writing your own, building conditional workflows, and fuzzing endpoints. Chapter 3 takes automation further with cron jobs, Docker, and a fully automated monitoring infrastructure.",
  },
  {
    id: "scheduled-automation",
    number: 3,
    title: "Scheduled Scanning & Monitoring",
    subtitle: "Run your pipelines automatically on a schedule and never miss a change",
    color: "oklch(0.65 0.18 50)",
    overview:
      "The most powerful recon setup runs continuously. Instead of scanning once, you scan every day and compare results. New subdomains, open ports, and technologies are detected automatically as they appear. This chapter teaches you to deploy your pipeline on a VPS, schedule it with cron and systemd, run it in Docker containers, and monitor results over time with change detection.",
    sections: [
      {
        title: "Cron-Based Scheduling",
        text: "Cron is the simplest and most reliable scheduler on Linux. Set your pipeline to run daily, weekly, or hourly. Combine multiple cron jobs for different pipeline stages — subdomain enum every 6 hours, port scan daily, vulnerability scan weekly.",
        commands: [
          {
            cmd: "crontab -e",
            desc: "Edit your cron jobs — opens the crontab file in your default editor (nano/vim)",
          },
          {
            cmd: "0 */6 * * * /home/user/scripts/recon.sh example.com >> /var/log/recon.log 2>&1",
            desc: "Run recon pipeline every 6 hours — logs all output to a central file for debugging",
          },
          {
            cmd: "0 2 * * * /home/user/scripts/nuclei-scan.sh example.com",
            desc: "Run vulnerability scan daily at 2 AM — off-peak hours for minimal target disruption",
          },
          {
            cmd: "0 0 * * 0 /home/user/scripts/full-recon.sh example.com",
            desc: "Full recon scan every Sunday at midnight — comprehensive weekly review of the target's attack surface",
          },
          {
            cmd: "*/30 * * * * /home/user/scripts/check-new-subs.sh example.com",
            desc: "Check for new subdomains every 30 minutes — rapid detection of newly deployed assets",
          },
          {
            cmd: "0 6 * * 1 /home/user/scripts/diff-report.sh example.com",
            desc: "Generate a diff report every Monday at 6 AM — compares this week's results with last week's",
          },
          {
            cmd: "cat /var/log/recon.log | grep -E 'critical|high|ERROR' | tail -20",
            desc: "Quick check: view the most recent critical findings and errors from your cron logs",
          },
          {
            cmd: '#!/bin/bash\n# check-cron.sh — verify all cron jobs are running\necho "Cron jobs for $(whoami):"\ncrontab -l\n# latest log entries\ntail -5 /var/log/recon.log',
            desc: "Health check script: verify cron jobs are registered and the latest logs show recent activity",
          },
        ],
        tips: [
          "Always use absolute paths in cron jobs — cron runs with a minimal PATH that doesn't include Go or local bin directories",
          "Log everything to a file — when something breaks, the log file is your only debugging tool",
          "Set MAILTO in your crontab to get email alerts when a cron job produces output or errors",
          "Cron doesn't load your shell profile — add PATH=$PATH:/usr/local/go/bin:/home/user/go/bin at the top of scripts",
        ],
      },
      {
        title: "Systemd Services & Timers",
        text: "Systemd timers are more reliable than cron for complex pipelines. They support dependencies (Timer B starts only after Service A finishes), randomized delays, and persistent state across reboots. Use systemd for production-grade scheduled scanning.",
        commands: [
          {
            cmd: 'cat << EOF | sudo tee /etc/systemd/system/recon-pipeline.service\n[Unit]\nDescription=Recon Pipeline Service\nAfter=network.target\n\n[Service]\nType=oneshot\nExecStart=/home/user/scripts/recon.sh example.com\nUser=user\nGroup=user\nEOF',
            desc: "Create a systemd service unit — defines what command to run as a systemd-managed service",
          },
          {
            cmd: 'cat << EOF | sudo tee /etc/systemd/system/recon-pipeline.timer\n[Unit]\nDescription=Run recon every 6 hours\n\n[Timer]\nOnCalendar=*-*-* 0,6,12,18:00:00\nRandomizedDelaySec=300\nPersistent=true\n\n[Install]\nWantedBy=timers.target\nEOF',
            desc: "Create a systemd timer unit — schedules the service to run at 0/6/12/18 with randomized delay for stealth",
          },
          {
            cmd: "sudo systemctl daemon-reload && sudo systemctl enable recon-pipeline.timer && sudo systemctl start recon-pipeline.timer",
            desc: "Reload systemd, enable the timer to start on boot, and activate it immediately",
          },
          {
            cmd: "sudo systemctl status recon-pipeline.timer && sudo systemctl list-timers --all | grep recon",
            desc: "Verify the timer is active — shows next run time, last run time, and status",
          },
          {
            cmd: "sudo journalctl -u recon-pipeline.service -f",
            desc: "Follow the service logs in real-time — useful for debugging pipeline execution",
          },
          {
            cmd: "sudo journalctl -u recon-pipeline.service --since '1 hour ago' | grep -E 'error|critical|finding'",
            desc: "Filter service logs for the past hour — grep for important keywords in pipeline output",
          },
          {
            cmd: 'cat << EOF > /etc/systemd/system/nuclei-scan.service\n[Unit]\nDescription=Weekly nuclei vulnerability scan\nAfter=recon-pipeline.service\n\n[Service]\nType=oneshot\nExecStart=/home/user/scripts/nuclei-scan.sh\nEOF',
            desc: "Dependency-based service: this scan runs AFTER the recon pipeline completes successfully",
          },
        ],
        tips: [
          "RandomizedDelaySec prevents all your scans from hitting the target at the exact same minute — adds stealth",
          "Use Type=oneshot for scanning services — they run once and exit, unlike daemons that stay running",
          "Dependencies (After=) let you chain services — recon finishes, then nuclei scan starts automatically",
          "Journalctl logs are persistent and rotated automatically — no need to manage log files manually",
        ],
      },
      {
        title: "Docker Deployment",
        text: "Docker containers provide a reproducible environment for your pipelines. No more dependency issues, Go version conflicts, or missing tools. Build a Docker image with all your tools pre-installed and run it anywhere — locally, on a VPS, or in CI/CD.",
        commands: [
          {
            cmd: 'cat << EOF > Dockerfile\nFROM ubuntu:22.04\nRUN apt update && apt install -y golang git curl jq ca-certificates\nRUN go install -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest\nRUN go install -v github.com/projectdiscovery/httpx/cmd/httpx@latest\nRUN go install -v github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest\nRUN go install -v github.com/projectdiscovery/notify/cmd/notify@latest\nENV PATH="/root/go/bin:${PATH}"\nWORKDIR /recon\nCOPY scripts/ .\nENTRYPOINT ["./recon.sh"]\nEOF',
            desc: "Dockerfile with all recon tools pre-installed — single image that contains your entire pipeline toolchain",
          },
          {
            cmd: "docker build -t recon-pipeline .",
            desc: "Build the Docker image — downloads dependencies and installs all tools in a reproducible environment",
          },
          {
            cmd: "docker run --rm -v $(pwd)/output:/recon/output recon-pipeline example.com",
            desc: "Run the pipeline container — mounts a local output directory so results persist after the container exits",
          },
          {
            cmd: 'cat << EOF > docker-compose.yml\nversion: "3.8"\nservices:\n  recon:\n    build: .\n    volumes:\n      - ./output:/recon/output\n      - ./config:/recon/config\n    command: ["./recon.sh", "example.com"]\nEOF',
            desc: "Docker Compose configuration — simplifies volume mounts and command arguments",
          },
          {
            cmd: "docker-compose up && docker-compose down",
            desc: "Run via Docker Compose and clean up — containers are ephemeral, only results persist",
          },
          {
            cmd: 'cat << EOF > .dockerignore\nnode_modules\n.git\n*.md\noutput/temp\nEOF',
            desc: "Docker ignore file — prevents unnecessary files from being copied into the image, keeping it small",
          },
        ],
        tips: [
          "Pin tool versions in Dockerfile with @latest or specific versions to ensure reproducible builds",
          "Use multi-stage builds for smaller images — build tools in one stage, copy binaries to a minimal runtime stage",
          "Mount config directories as volumes so you can update API keys and wordlists without rebuilding the image",
          "Run containers with --rm flag to automatically clean up after execution — prevents disk filling up",
        ],
      },
      {
        title: "Change Detection & Diffing",
        text: "Scanning once gives you a snapshot. Scanning every day gives you a timeline. Use diff tools to compare today's results with yesterday's — new subdomains, new ports, new technologies, and new vulnerabilities appear as changes. This is how you find zero-day assets that no one else has discovered yet.",
        commands: [
          {
            cmd: '#!/bin/bash\n# diff-recon.sh — compare recon runs\nTODAY=reports/$(date +%Y%m%d)\nYESTERDAY=reports/$(date -d "yesterday" +%Y%m%d)\nif [ -d "$YESTERDAY" ]; then\n  echo "=== New Subdomains ==="\n  diff $YESTERDAY/subs.txt $TODAY/subs.txt | grep "^>" | wc -l\n  echo "=== Removed Subdomains ==="\n  diff $YESTERDAY/subs.txt $TODAY/subs.txt | grep "^<" | wc -l\nfi',
            desc: "Change detection script: compare today's subdomains with yesterday's — find what changed",
          },
          {
            cmd: 'diff --unchanged-line-format= --old-line-format="[-%L]" --new-line-format="[+%L]" old-subs.txt new-subs.txt > subs-changes.txt',
            desc: "Formatted diff output — marks removed entries with [-] and new entries with [+] for clear reading",
          },
          {
            cmd: "cat new-subs.txt | while read sub; do grep -q $sub old-subs.txt || echo $sub >> unique-new-subs.txt; done",
            desc: "Simple bash loop: find subdomains in today's scan that weren't in yesterday's scan",
          },
          {
            cmd: "comm -13 old-sorted.txt new-sorted.txt > truly-new.txt",
            desc: "Fast set comparison with comm — line 3 shows entries only in new-sorted.txt (requires sorted input)",
          },
          {
            cmd: "cat new-subs.txt | grep -vxFf old-subs.txt > brand-new-subs.txt",
            desc: "grep-based set subtraction: find lines in new that don't exist in old — simple and effective",
          },
          {
            cmd: "notify -silent -data '{\"message\":\"New subdomain detected: admin-staging.example.com\"}' -provider telegram",
            desc: "Alert on change detection: send an instant Telegram notification when a new high-value subdomain is found",
          },
        ],
        tips: [
          "Store every scan result in a date-stamped directory — creates a historical timeline you can query later",
          "New subdomains with admin, api, dev, or staging in the name are always worth immediate investigation",
          "Set up automated alerts for new critical findings — be the first person to find a new vulnerability",
          "Change detection is how professional bug hunters find zero-day assets — new == undiscovered == higher bounty potential",
        ],
      },
      {
        title: "VPS Setup & Hardening",
        text: "Your automated pipeline needs a home. A $5/month VPS is enough to run continuous recon for multiple targets. This section covers VPS selection, initial setup, security hardening, and monitoring — everything you need to deploy a production-grade recon infrastructure.",
        commands: [
          {
            cmd: "ssh root@YOUR_VPS_IP && apt update && apt upgrade -y",
            desc: "Initial VPS setup: SSH into the server and update all packages to the latest versions",
          },
          {
            cmd: "adduser hunter && usermod -aG sudo hunter",
            desc: "Create a dedicated user for recon operations — never run pipelines as root for security",
          },
          {
            cmd: "ssh-keygen -t ed25519 -f ~/.ssh/recon-key && ssh-copy-id -i ~/.ssh/recon-key hunter@YOUR_VPS_IP",
            desc: "Generate an Ed25519 SSH key and copy it to the VPS for passwordless authentication",
          },
          {
            cmd: 'echo "Port 2222\nPermitRootLogin no\nPasswordAuthentication no\nPubkeyAuthentication yes" | sudo tee /etc/ssh/sshd_config.d/hardening.conf',
            desc: "SSH hardening: custom port (2222), disable root login and passwords, require key-based auth",
          },
          {
            cmd: "sudo ufw allow 2222/tcp && sudo ufw allow 80,443/tcp && sudo ufw enable",
            desc: "Firewall: allow SSH on custom port, allow outbound HTTP/HTTPS, block everything else",
          },
          {
            cmd: "sudo apt install -y docker.io docker-compose && sudo usermod -aG docker hunter",
            desc: "Install Docker and add your user to the docker group so you can run containers without sudo",
          },
          {
            cmd: "sudo apt install -y fail2ban && sudo systemctl enable fail2ban",
            desc: "Install fail2ban to automatically block IPs with repeated failed SSH login attempts",
          },
          {
            cmd: "go install -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest && go install -v github.com/projectdiscovery/httpx/cmd/httpx@latest && go install -v github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest && go install -v github.com/projectdiscovery/notify/cmd/notify@latest",
            desc: "Install all core recon tools on the VPS — run once during initial setup",
          },
        ],
        tips: [
          "A $5-10/month VPS from DigitalOcean, Hetzner, or Linode is sufficient for personal recon infrastructure",
          "Use a VPS in a different region than your target — some programs geo-filter their monitoring",
          "Set up automatic security updates: sudo apt install unattended-upgrades",
          "Monitor disk usage with df -h and set up a cron job to clean old scan results automatically",
        ],
      },
      {
        title: "Visualization & Reporting",
        text: "Raw scan output is useful, but visual reports communicate findings much more effectively — especially when sharing with team members or including in bug bounty submissions. Build automated HTML reports that summarize every scan run, highlight new findings, and provide drill-down access to raw data.",
        commands: [
          {
            cmd: '#!/bin/bash\n# generate-report.sh — build an HTML report from scan output\ncat << EOF > report.html\n<html><head><title>Recon Report - $(date +%Y-%m-%d)</title>\n<style>\nbody { font-family: monospace; background: #1a1a2e; color: #e0e0e0; padding: 2rem; }\nh1 { color: #ff6b6b; border-bottom: 2px solid #ffd93d; }\nh2 { color: #ffd93d; }\n.vuln-critical { color: #ff4757; font-weight: bold; }\n.vuln-high { color: #ff6b81; }\n.vuln-medium { color: #ffa502; }\n.vuln-low { color: #2ed573; }\n.section { background: #16213e; padding: 1rem; border-radius: 8px; margin: 1rem 0; }\n.summary { display: flex; gap: 2rem; }\n.stat { text-align: center; background: #0f3460; padding: 1rem; border-radius: 8px; min-width: 120px; }\n.stat-value { font-size: 2rem; font-weight: bold; color: #ffd93d; }\nEOF\necho "<div class=\\"summary\\">" >> report.html\nfor cat in critical high medium low; do\n  count=$(grep -ci "$cat" scan-results.txt 2>/dev/null || echo 0)\n  echo "<div class=\\"stat\\"><div class=\\"stat-value\\">$count</div><div>$cat</div></div>" >> report.html\ndone\necho "</div></body></html>" >> report.html\nscp report.html user@vps:/var/www/html/recon-report.html\necho "Report generated: report.html"',
            desc: "Generate a self-contained HTML report with severity distribution stats — scp it to a web server for live viewing",
          },
          {
            cmd: "cat scan-results.txt | sort -t'[' -k2 | awk -F'[][]' '{print $2, $0}' | sort -rn > sorted-by-severity.txt",
            desc: "Sort findings by severity — extract the severity label and sort descending so critical issues appear first",
          },
          {
            cmd: "cat scan-results.txt | awk -F'[][]' '{a[$2]++} END {for(s in a) print s, a[s]}' | sort -k2 -rn",
            desc: "Severity distribution summary — count how many critical, high, medium, and low findings per scan run",
          },
          {
            cmd: "nuclei -l live.txt -o json-output.json -json -silent",
            desc: "Output Nuclei results in JSON format — machine-readable for programmatic processing and dashboarding",
          },
          {
            cmd: "cat json-output.json | jq -r '[.info.severity, .info.name, .host] | @tsv' | column -t -s $'\\t'",
            desc: "Parse JSON results into a clean aligned table with jq — severity, template name, and affected host",
          },
          {
            cmd: 'cat << EOF > ~/scripts/trend-report.sh\n#!/bin/bash\n# Track weekly finding counts across all targets\nTARGETS=(\n  "example.com"\n  "test.com"\n  "demo.org"\n)\nfor domain in "${TARGETS[@]}"; do\n  echo "=== $domain ==="\n  total=$(find reports/$domain -name "vulns.txt" -exec cat {} + | grep -v "^$" | wc -l)\n  echo "Total findings (all time): $total"\n  this_week=$(find reports/$domain -name "vulns.txt" -mtime -7 -exec cat {} + | grep -v "^$" | wc -l)\n  echo "This week: $this_week"\ndone\nEOF && chmod +x ~/scripts/trend-report.sh',
            desc: "Trend analysis script: report total and weekly finding counts across all bug bounty targets",
          },
        ],
        tips: [
          "Host reports on a simple static file server (nginx, Python http.server) for easy sharing with team members",
          "Generate JSON output alongside text output — JSON makes it easy to build dashboards and feed data into other tools",
          "Use the 'new findings' count as your personal KPI — if it drops to zero, time to switch targets or methodology",
          "Color-code severity in HTML reports: critical=red, high=orange, medium=yellow, low=green for instant recognition",
        ],
      },
      {
        title: "Cloud Storage Integration",
        text: "Your VPS has limited disk space. For long-term data retention, offload scan results to object storage. DigitalOcean Spaces, AWS S3, or Backblaze B2 cost pennies per month and provide unlimited storage for historical scan data. This section covers automated uploads and data archival.",
        commands: [
          {
            cmd: "sudo apt install s3cmd && s3cmd --configure",
            desc: "Install s3cmd (works with S3, DO Spaces, and MinIO) and run the interactive configuration wizard",
          },
          {
            cmd: "s3cmd mb s3://recon-results-$(date +%Y%m) --region=nyc3",
            desc: "Create a monthly bucket for recon results — each month gets its own bucket for organization",
          },
          {
            cmd: "s3cmd sync reports/ s3://recon-results/$(date +%Y%m)/ --delete-removed",
            desc: "Sync local reports directory to cloud storage — uploads new files and removes deleted ones",
          },
          {
            cmd: "s3cmd put scan-results.tar.gz s3://recon-archive/$(date +%Y%m%d)-scan.tar.gz",
            desc: "Upload a compressed archive of scan results — tar.gz reduces storage by 80-90%",
          },
          {
            cmd: "s3cmd ls s3://recon-results/ --recursive | tail -20",
            desc: "List the most recent files in cloud storage — verify uploads are working correctly",
          },
          {
            cmd: '#!/bin/bash\n# daily-archive.sh — compress and upload\nTIMESTAMP=$(date +%Y%m%d_%H%M)\ntar -czf /tmp/scan-$TIMESTAMP.tar.gz reports/$TIMESTAMP/\ns3cmd put /tmp/scan-$TIMESTAMP.tar.gz s3://recon-archive/\nrm /tmp/scan-$TIMESTAMP.tar.gz',
            desc: "Daily archive script: compress, upload, and clean up — keeps VPS storage usage under control",
          },
          {
            cmd: "s3cmd setacl s3://recon-archive/20250711-scan.tar.gz --acl-public",
            desc: "Make specific results publicly accessible — useful for sharing findings with program teams or collaborators",
          },
          {
            cmd: 'cat << EOF >> ~/scripts/cron-jobs.sh\n# Daily archive to cloud storage at 6 AM\n0 6 * * * /home/hunter/scripts/daily-archive.sh\nEOF',
            desc: "Schedule automatic daily cloud backups — add to your existing cron-jobs.sh and never lose results",
          },
        ],
        tips: [
          "Sync to cloud AFTER each scan run, not once per day — prevents data loss if your VPS crashes",
          "Use lifecycle policies to auto-delete archives older than 90 days — saves money on storage costs",
          "DigitalOcean Spaces is cheapest ($5/month for 250GB) — more cost-effective than S3 for personal use",
          "Encrypt sensitive data with gpg before uploading: gpg -c scan-results.txt && s3cmd put scan-results.txt.gpg s3://...",
        ],
      },
      {
        title: "Monitoring Dashboards — Grafana & Prometheus",
        text: "When you're running recon on 20+ targets, you need a centralized dashboard to monitor scan health, finding trends, and infrastructure status. Grafana connected to a Prometheus metrics exporter gives you real-time visibility into your entire recon pipeline — all from a single web interface.",
        commands: [
          {
            cmd: 'cat << EOF > docker-compose-monitoring.yml\nversion: "3.8"\nservices:\n  prometheus:\n    image: prom/prometheus:latest\n    volumes:\n      - ./prometheus.yml:/etc/prometheus/prometheus.yml\n      - prometheus-data:/prometheus\n    ports:\n      - "9090:9090"\n  grafana:\n    image: grafana/grafana:latest\n    volumes:\n      - grafana-data:/var/lib/grafana\n    ports:\n      - "3000:3000"\n    depends_on:\n      - prometheus\nvolumes:\n  prometheus-data:\n  grafana-data:\nEOF',
            desc: "Docker Compose for Prometheus + Grafana — spin up a full monitoring stack in seconds",
          },
          {
            cmd: 'cat << EOF > prometheus.yml\nscrape_configs:\n  - job_name: "recon-metrics"\n    static_configs:\n      - targets: ["localhost:8000"]\nEOF',
            desc: "Prometheus scrape config — pull metrics from your recon metrics exporter running on port 8000",
          },
          {
            cmd: 'cat << EOF > ~/scripts/metrics-exporter.py\n#!/usr/bin/env python3\nfrom http.server import HTTPServer, BaseHTTPRequestHandler\nimport subprocess, os\n\nclass MetricsHandler(BaseHTTPRequestHandler):\n    def do_GET(self):\n        subs = int(subprocess.getoutput("cat reports/latest/subs.txt 2>/dev/null | wc -l") or 0)\n        live = int(subprocess.getoutput("cat reports/latest/live.txt 2>/dev/null | wc -l") or 0)\n        vulns = int(subprocess.getoutput("cat reports/latest/vulns.txt 2>/dev/null | wc -l") or 0)\n        disk = subprocess.getoutput("df / --output=pcent | tail -1 | tr -d \' %\'")\n        metrics = f"""# HELP recon_subs_total Total subdomains discovered\n# TYPE recon_subs_total gauge\nrecon_subs_total {subs}\n# HELP recon_live_total Live hosts found\n# TYPE recon_live_total gauge\nrecon_live_total {live}\n# HELP recon_vulns_total Total vulnerabilities found\n# TYPE recon_vulns_total gauge\nrecon_vulns_total {vulns}\n# HELP recon_disk_usage VPS disk usage percent\n# TYPE recon_disk_usage gauge\nrecon_disk_usage {disk}\n"""\n        self.send_response(200)\n        self.send_header("Content-type", "text/plain")\n        self.end_headers()\n        self.wfile.write(metrics.encode())\n\nHTTPServer(("0.0.0.0", 8000), MetricsHandler).serve_forever()\nEOF',
            desc: "Prometheus metrics exporter — exposes subdomain count, live hosts, vulnerabilities, and disk usage as Prometheus metrics",
          },
          {
            cmd: "docker compose -f docker-compose-monitoring.yml up -d",
            desc: "Start the monitoring stack in detached mode — Prometheus on :9090, Grafana on :3000",
          },
          {
            cmd: 'cat << EOF > ~/scripts/start-monitoring.sh\n#!/bin/bash\n# Start the metrics exporter and monitoring stack\npython3 ~/scripts/metrics-exporter.py &\nsleep 2\ndocker compose -f ~/docker-compose-monitoring.yml up -d\necho "Grafana: http://localhost:3000 (admin/admin)"\necho "Prometheus: http://localhost:9090"\nEOF && chmod +x ~/scripts/start-monitoring.sh',
            desc: "One-command monitoring startup — launches the metrics exporter and the full monitoring stack",
          },
          {
            cmd: 'curl -s http://localhost:8000 | grep -E "^recon_"',
            desc: "Verify the metrics exporter is working — should return current subdomain count, live hosts, vuln count, and disk usage",
          },
          {
            cmd: 'echo "Alerting rule added: if subdomain count drops by 50% in 24h, check for VPS/data corruption"',
            desc: "Create a Prometheus alert: sudden drop in subdomain count likely indicates data loss or scan failure",
          },
        ],
        tips: [
          "Import recon dashboards from Grafana.com to save hours of setup time — search for 'recon' or 'security scanning'",
          "Set up Prometheus Alertmanager for push notifications when scans fail or disk space runs low",
          "Run the metrics exporter as a systemd service so it automatically restarts after VPS reboots",
          "Monitor system resources (CPU, RAM, disk) alongside recon metrics — a VPS running at 100% disk needs cleaning",
        ],
      },
    ],
    tools: [
      {
        name: "cron",
        desc: "Job scheduler for Unix-like systems — runs your pipelines on a time-based schedule",
        link: "https://man7.org/linux/man-pages/man5/crontab.5.html",
      },
      {
        name: "systemd",
        desc: "System and service manager for Linux — more reliable than cron with dependency support",
        link: "https://systemd.io/",
      },
      {
        name: "docker",
        desc: "Container platform for reproducible pipeline environments across any infrastructure",
        install: "https://docs.docker.com/engine/install/",
        link: "https://www.docker.com/",
      },
      {
        name: "ufw",
        desc: "Uncomplicated Firewall — simple firewall management for securing your VPS",
        install: "sudo apt install ufw",
        link: "https://wiki.ubuntu.com/UncomplicatedFirewall",
      },
      {
        name: "fail2ban",
        desc: "Intrusion prevention tool that blocks brute-force SSH attacks automatically",
        install: "sudo apt install fail2ban",
        link: "https://github.com/fail2ban/fail2ban",
      },
      {
        name: "s3cmd",
        desc: "Command-line S3 client for cloud storage uploads — works with AWS S3, DO Spaces, MinIO",
        install: "sudo apt install s3cmd",
        link: "https://s3tools.org/s3cmd",
      },
      {
        name: "grafana",
        desc: "Open-source analytics and monitoring dashboard — visualize scan metrics and trends",
        install: "Run via Docker: grafana/grafana:latest",
        link: "https://grafana.com/",
      },
      {
        name: "prometheus",
        desc: "Metrics collection and alerting toolkit — stores scan metrics for real-time querying",
        install: "Run via Docker: prom/prometheus:latest",
        link: "https://prometheus.io/",
      },
    ],
    summary:
      "You now have a fully automated recon infrastructure: cron/systemd scheduling, Docker reproducibility, change detection, cloud storage backups, a hardened VPS, and a Grafana monitoring dashboard. Your pipeline runs continuously, detects new assets automatically, and alerts you in real-time. This is the infrastructure that separates professional bug hunters from beginners.",
  },
]
