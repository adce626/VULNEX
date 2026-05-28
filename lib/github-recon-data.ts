export interface GitHubReconCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const lastUpdated = "2026-05-28"
export const pageDescription = "GitHub recon — finding API keys, credentials and sensitive data in public repositories."

export const githubReconCategories: GitHubReconCategory[] = [
  {
    category: "Introduction",
    commands: [
      {
        command: "GitHub recon is an underrated OSINT technique for discovering API keys, credentials and sensitive data in public repositories",
        description: "Overview of GitHub reconnaissance techniques",
      },
    ],
  },
  {
    category: "Basic Search Tactics",
    commands: [
      {
        command: '"example.com" password',
        description: 'Search GitHub for "password" related to a domain',
      },
      {
        command: '"example.com" "password":',
        description: "JSON-formatted keyword search for precise results",
      },
      {
        command: "org:example 'password':",
        description: "Search within a specific GitHub org",
      },
    ],
  },
  {
    category: "Custom GitHub Dorks",
    commands: [
      {
        command: '"domain" AND ("api_key" OR "secret" OR "password" OR "access_token" OR "client_secret" OR "private_key" OR "AWS_SECRET_ACCESS_KEY" OR "DB_PASSWORD" OR "slack_token" OR "github_token" OR "BEGIN RSA PRIVATE KEY")',
        description: "Multi-keyword dork with logical operators",
      },
    ],
  },
  {
    category: "Filtering by Path, Language and File Type",
    commands: [
      {
        command: 'filename:.env "DB_PASSWORD"',
        description: "Find .env files containing DB_PASSWORD",
      },
      {
        command: 'extension:json "access_token"',
        description: "Search JSON files for access tokens",
      },
      {
        command: "path:/config filename:database.php",
        description: "Find database.php inside /config",
      },
      {
        command: "path:/wp-config.php",
        description: "Target the WordPress config file",
      },
      {
        command: "path:/src/secrets",
        description: "Look in typical config directories",
      },
      {
        command: "path:/.ssh",
        description: "Search hidden .ssh folder",
      },
      {
        command: "path:/.git",
        description: "Search hidden .git folder",
      },
      {
        command: "path:**/.env",
        description: "Find .env files in any nested directory",
      },
      {
        command: "repo:vercel/next.js filename:config.js",
        description: "Search config.js within a specific repo",
      },
      {
        command: '"domain" language:PHP password',
        description: "PHP files containing domain and password keywords",
      },
    ],
  },
  {
    category: "Automation with GitGraber",
    commands: [
      {
        command: "python3 gitGraber.py -k wordlists/keywords.txt -q nasa.gov -s",
        description: "Search for sensitive data related to the entire organization",
      },
      {
        command: 'python3 gitGraber.py -k wordlists/keywords.txt -q "nasa.gov" -s',
        description: "Search for sensitive data related strictly to the domain",
      },
    ],
  },
  {
    category: "Using TruffleHog for Deep Secret Scanning",
    commands: [
      {
        command: "trufflehog git file:///home/user/my-repo",
        description: "Scan a local Git repository",
      },
      {
        command: "trufflehog git https://github.com/username/repo.git",
        description: "Scan a public GitHub repository",
      },
      {
        command: "trufflehog git https://github.com/trufflesecurity/test_keys --results=verified,unknown",
        description: "Scan with filtering results to verified and unknown only",
      },
      {
        command: "trufflehog git https://github.com/trufflesecurity/test_keys --results=verified,unknown --json | jq",
        description: "Scan and format output as JSON using jq",
      },
      {
        command: "trufflehog github --repo=https://github.com/trufflesecurity/test_keys --issue-comments --pr-comments",
        description: "Scan a GitHub repo including issue and PR comments",
      },
      {
        command: "trufflehog github --org=nasa --token=yourgithubtoken",
        description: "Scan all repos in a GitHub organization",
      },
      {
        command: "trufflehog github --repo=https://github.com/username/repo",
        description: "Scan a specific GitHub repo",
      },
    ],
  },
  {
    category: "Mass Hunting .git Directory Exposure",
    commands: [
      {
        command: "cat domains.txt | nuclei -t gitExposed.yaml",
        description: "Scan domains for exposed .git directories with Nuclei",
      },
      {
        command: "httpx-toolkit -l subs.txt -path /.git/ -mc 200",
        description: "Basic .git path probe on subdomains",
      },
      {
        command: 'cat domains.txt | httpx-toolkit -sc -server -cl -path "/.git/" -mc 200 -location -ms "Index of" -probe',
        description: "Full .git probe with status, server, and content matching",
      },
      {
        command: 'cat domains.txt | grep "SUCCESS" | gf urls | httpx-toolkit -sc -server -cl -path "/.git/" -mc 200 -location -ms "Index of" -probe',
        description: "Pipe successful results into .git probing",
      },
      {
        command: "./gitdumper.sh https://domain.com/.git/ outputdir",
        description: "Dump .git contents with gitdumper",
      },
      {
        command: "git-dumper https://domain.com/.git/ outputdir",
        description: "Alternative .git dumper",
      },
    ],
  },
]
