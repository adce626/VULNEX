export interface GitHubReconCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const githubReconCategories: GitHubReconCategory[] = [
  {
    category: "Introduction",
    commands: [
      { command: "GitHub reconnaissance is a goldmine for bug bounty hunters. Developers often push sensitive data into public repos — secrets, tokens, credentials and more.", description: "This guide covers manual + automated techniques: filters, dorks, and tools for OSINT-based GitHub recon." },
    ],
  },
  {
    category: "Basic Search Tactics",
    commands: [
      { command: '"example.com" password', description: "#1 Basic search — finds files with 'password' linked to target domain" },
      { command: '"example.com" "password":', description: "#2 JSON-formatted search — filters noise, finds key-value secrets like \"username\":\"admin\",\"password\":\"supersecret123\"" },
    ],
  },
  {
    category: "org: Filter for Official Repos",
    commands: [
      { command: 'org:example "password":', description: "Limit search to a GitHub organization's official repositories" },
    ],
  },
  {
    category: "Custom GitHub Dorks",
    commands: [
      { command: '"domain" AND ("api_key" OR "secret" OR "password" OR "access_token" OR "client_secret" OR "private_key" OR "AWS_SECRET_ACCESS_KEY" OR "DB_PASSWORD" OR "slack_token" OR "github_token" OR "BEGIN RSA PRIVATE KEY")', description: "Combined dork — pulls results matching ANY sensitive keyword in one search" },
    ],
  },
  {
    category: "Filters — filename / extension / path",
    commands: [
      { command: 'filename:.env "DB_PASSWORD"', description: "#1 filename — finds .env files containing DB_PASSWORD" },
      { command: 'extension:json "access_token"', description: "#2 extension — searches .json files for access_token strings" },
      { command: 'path:/config filename:database.php', description: "#3 path — finds database.php inside any /config directory" },
      { command: 'path:/wp-config.php', description: "#4 path — targets WordPress config file" },
      { command: 'path:/.ssh', description: "#5 path — searches hidden .ssh folder for SSH keys" },
      { command: 'path:/.git', description: "#6 path — searches hidden .git folder" },
      { command: 'path:**/.env', description: "#7 path — finds .env files in any nested directory" },
    ],
  },
  {
    category: "Filters — repo: Focus on Specific Repo",
    commands: [
      { command: "repo:vercel/next.js filename:config.js", description: "Limit search to a single repository" },
    ],
  },
  {
    category: "Combine Filters for Maximum Precision",
    commands: [
      { command: '"domain" language:PHP password', description: "Find PHP files containing both 'password' and 'domain' — useful for target-specific credential hunting" },
    ],
  },
  {
    category: "Keyword Variations",
    commands: [
      { command: "password passwd pwd pass", description: "Don't just search for 'password' — try variations" },
    ],
  },
  {
    category: "Advanced Keywords — Auth & Secrets",
    commands: [
      { command: "api_key access_token client_secret auth_token authorizationToken x-api-key secret SECRET_KEY secret_token credentials token secure", description: "Authentication and secrets keywords for GitHub dorking" },
    ],
  },
  {
    category: "Advanced Keywords — Cloud Provider Secrets",
    commands: [
      { command: "AWS_SECRET_ACCESS_KEY AWS_ACCESS_KEY_ID aws_access_key_id aws_secret_key aws_token GCP_SECRET gcloud_api_key firebase_url shodan_api_key", description: "Cloud provider API keys and tokens" },
    ],
  },
  {
    category: "Advanced Keywords — Database Credentials",
    commands: [
      { command: "DB_PASSWORD DATABASE_URL db_password db_pass MYSQL_PASSWORD POSTGRES_PASSWORD mongo_uri mongodb_password", description: "Database connection strings and passwords" },
    ],
  },
  {
    category: "Advanced Keywords — SSH & Private Keys",
    commands: [
      { command: "BEGIN RSA PRIVATE KEY BEGIN OPENSSH PRIVATE KEY BEGIN PGP PRIVATE KEY BLOCK id_rsa private_key pem private key", description: "SSH keys and PGP private key blocks" },
    ],
  },
  {
    category: "Advanced Keywords — Service Tokens",
    commands: [
      { command: "slack_token discord_token github_token gitlab_token twilio_auth_token mailgun stripe_secret SF_USERNAME salesforce", description: "Service-specific API tokens and secrets" },
    ],
  },
  {
    category: "Keyword Reference Repository",
    commands: [
      { command: "https://github.com/coffinxp/payloads/blob/main/github-dork.txt", description: "Full keyword collection for GitHub recon dorking" },
    ],
  },
  {
    category: "Validating API Keys — Keyhacks",
    commands: [
      { command: "https://github.com/streaak/keyhacks", description: "Keyhacks — testing methods for 50+ types of API keys to validate exposed credentials" },
    ],
  },
  {
    category: "Automation — GitGraber",
    commands: [
      { command: "python3 gitGraber.py -k wordlists/keywords.txt -q nasa.gov -s", description: "#1 Search entire GitHub org for sensitive keywords" },
      { command: 'python3 gitGraber.py -k wordlists/keywords.txt -q "nasa.gov" -s', description: "#2 Strict domain search — returns direct URLs, timestamps, raw JSON preview" },
    ],
  },
  {
    category: "Automation — TruffleHog",
    commands: [
      { command: "trufflehog git file:///home/user/my-repo", description: "#1 Scan a local Git repository for secrets" },
      { command: "trufflehog git https://github.com/username/repo.git", description: "#2 Scan a public GitHub repository" },
      { command: "trufflehog git https://github.com/trufflesecurity/test_keys --results=verified,unknown", description: "#3 Filter results — show only verified and unknown findings" },
      { command: "trufflehog git https://github.com/trufflesecurity/test_keys --results=verified,unknown --json | jq", description: "#4 JSON output piped into jq for readability" },
      { command: "trufflehog github --repo=https://github.com/trufflesecurity/test_keys --issue-comments --pr-comments", description: "#5 Scan GitHub repo including issue and PR comments" },
      { command: "trufflehog github --org=nasa --token=yourgithubtoken", description: "#6 Scan all repos in a GitHub organization" },
      { command: "trufflehog github --repo=https://github.com/username/repo", description: "#7 Basic GitHub repo scan" },
    ],
  },
  {
    category: "Mass Hunting — Exposed .git Directories",
    commands: [
      { command: 'httpx-toolkit -l subs.txt -path "/.git/" -mc 200', description: "#1 Find exposed .git directories — filter 200 OK responses" },
      { command: 'cat domains.txt | httpx-toolkit -sc -server -cl -path "/.git/" -mc 200 -location -ms "Index of" -probe', description: "#2 Full probe — status, server, content-length, Index-of match, redirect location" },
      { command: 'cat domains.txt | grep "SUCCESS" | gf urls | httpx-toolkit -sc -server -cl -path "/.git/" -mc 200 -location -ms "Index of" -probe', description: "#3 Pipeline — grep success → gf filter → httpx probe" },
    ],
  },
  {
    category: ".git Browser Extension",
    commands: [
      { command: "https://chromewebstore.google.com/detail/dotgit/pampamgoihgcedonnphgehgondkhikel", description: "Install .git browser extension — automatically alerts if a site exposes its Git repository" },
    ],
  },
  {
    category: "Dumping .git Repositories",
    commands: [
      { command: "./gitdumper.sh https://domain.com/.git/ outputdir", description: "#1 GitTools gitdumper — dump exposed .git contents" },
      { command: "git-dumper https://domain.com/.git/ outputdir", description: "#2 git-dumper — alternative tool for .git extraction" },
      { command: "cd output_dir && git status && git restore . && git checkout .", description: "#3 Restore deleted files from dumped .git to see full history" },
    ],
  },
  {
    category: "Git Recon Video Walkthrough",
    commands: [
      { command: "https://www.youtube.com/watch?v=gFGc0ojrYD4", description: "Complete practical demonstration of GitHub recon + .git hunting methods" },
    ],
  },
  {
    category: "Tools & Resources",
    commands: [
      { command: "GitGraber — https://github.com/hisxo/gitGraber", description: "Automated GitHub secret scanning tool" },
      { command: "TruffleHog — https://github.com/trufflesecurity/trufflehog", description: "Deep secret scanning for Git repositories" },
      { command: "GitTools — https://github.com/internetwache/GitTools", description: "Dump and extract exposed .git directories" },
      { command: "git-dumper — https://github.com/arthaud/git-dumper", description: "Simple .git directory dumper" },
      { command: "Keyhacks — https://github.com/streaak/keyhacks", description: "Validate exposed API keys with testing commands" },
    ],
  },
  {
    category: "Conclusion",
    commands: [
      { command: "GitHub recon + .git hunting expose serious vulnerabilities. With the right keywords, tools, and validation strategies, you can uncover high-impact findings before anyone else.", description: "Combine: GitHub dorks → TruffleHog/GitGraber → .git dumping → Keyhacks validation → $bounties" },
    ],
  },
]

export const githubReconTools = [
  { name: "GitGraber", url: "https://github.com/hisxo/gitGraber", description: "Automated GitHub secret scanning with keyword matching" },
  { name: "TruffleHog", url: "https://github.com/trufflesecurity/trufflehog", description: "Deep secret scanning for Git repos — local, GitHub org, PR comments" },
  { name: "GitTools", url: "https://github.com/internetwache/GitTools", description: "Dump and extract exposed .git directories" },
  { name: "git-dumper", url: "https://github.com/arthaud/git-dumper", description: "Simple tool for dumping exposed .git repositories" },
  { name: "Keyhacks", url: "https://github.com/streaak/keyhacks", description: "Validate 50+ types of exposed API keys with test commands" },
  { name: "GitHub Dork Keywords", url: "https://github.com/coffinxp/payloads/blob/main/github-dork.txt", description: "Comprehensive keyword collection for GitHub dorking" },
]
