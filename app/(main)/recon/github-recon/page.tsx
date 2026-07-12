"use client"

import { useState } from "react"
import Image from "next/image"
import { ContentLayout } from "@/components/content-layout"
import { CommandCard } from "@/components/command-card"
import {
  Github, Terminal, ChevronRight, ExternalLink,
  Search, Shield, FileText, Key, BookOpen, Zap, Video,
} from "lucide-react"

const phases = [
  { id: "introduction", label: "Introduction" },
  { id: "basic-search", label: "Basic Search" },
  { id: "advanced-dorks", label: "Advanced Dorks" },
  { id: "filtering", label: "Filtering" },
  { id: "keywords", label: "Keywords & Validation" },
  { id: "automation", label: "Automation" },
  { id: "git-hunting", label: ".Git Hunting" },
  { id: "conclusion", label: "Conclusion" },
]

export default function GitHubReconPage() {
  const [activeCategory, setActiveCategory] = useState("introduction")
  const [expandedImg, setExpandedImg] = useState<string | null>(null)

  const scrollToSection = (id: string) => {
    setActiveCategory(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <ContentLayout
      pageTitle="GitHub Recon"
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Recon", href: "/recon" },
        { label: "GitHub Recon" },
      ]}
      hero={{
        icon: Github,
        title: "GitHub Recon — The Underrated Technique to Discover High-Impact Leaks",
        description: "Master the Art of Finding API Keys, Credentials and Sensitive Data in Public Repositories",
        stats: [
          { label: "7 Phases", className: "bg-gray-700/10 text-gray-400" },
          { label: "30+ Commands", className: "bg-accent/10 text-accent" },
          { label: "Copy Ready", className: "bg-secondary text-foreground" },
        ],
        gradient: "from-gray-700/10 via-background to-gray-500/5",
        iconBg: "bg-gray-700/10 text-gray-400",
      }}
      phases={phases}
      activeCategory={activeCategory}
      onPhaseChange={scrollToSection}
      navActiveClass="bg-gray-700 text-white"
      expandedImg={expandedImg}
      onLightboxClose={() => setExpandedImg(null)}
      onLightboxOpen={(src) => setExpandedImg(src)}
      footerText="For authorized security testing only. Use responsibly."
    >

          {/* Introduction */}
          <section id="introduction" className="scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-foreground">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Reconnaissance is the foundation of any successful bug bounty journey and one of the most overlooked goldmines is GitHub. Developers often unknowingly push sensitive data into public repositories, giving ethical hackers a powerful vector to uncover secrets, tokens, credentials and much more.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              In this article, I&apos;ll walk you through manual and automated techniques to extract valuable data from GitHub. We&apos;ll use filters, dorks and tools &mdash; everything you need to perform impactful recon using only open-source intelligence (OSINT).
            </p>
          </section>

          {/* Basic Search Tactics */}
          <section id="basic-search" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-700/10 text-gray-400">
                <Search className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-gray-400">Phase 1</span>
                <h2 className="text-2xl font-bold text-foreground">Basic Search Tactics</h2>
              </div>
            </div>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Start by heading over to GitHub.com and typing your target domain along with a sensitive keyword in the search bar.
            </p>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Simple Keyword Search</h3>
            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <CommandCard
                command={'"example.com" password'}
                description='Search GitHub for "password" related to a domain'
                index={1}
              />
            </div>

            <h3 className="mb-3 text-lg font-semibold text-foreground">JSON-Formatted Keyword Searches</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              To make the results more relevant, format your keyword like a JSON key-value pair. Why? Because secrets stored in JSON often follow a predictable key-value pattern. This helps filter out noise and lets you focus on the juicy stuff &mdash; credentials, API keys and access tokens.
            </p>
            <CommandCard
              command={'"example.com" "password":'}
              description="JSON-formatted keyword search for precise results"
              index={2}
            />
            <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/recon/github-recon/4be6b436414d938ab1c74e9b1d015a214983776b.webp")}>
              <Image src="/images/recon/github-recon/4be6b436414d938ab1c74e9b1d015a214983776b.webp" alt="JSON keyword search results" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              You&apos;ll immediately notice a smaller set of results but each is more precise, containing values like:
            </p>
            <div className="mt-3 mb-6 rounded-lg border border-border bg-card">
              <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">JSON</div>
              <pre className="overflow-x-auto p-4 text-sm text-foreground"><code>{`"username": "admin",
"password": "supersecret123"`}</code></pre>
            </div>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Use org: Filter for Official Repositories</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              If your target has a public GitHub organization use the <code className="rounded bg-muted px-1 py-0.5 text-xs">org:</code> filter.
            </p>
            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <CommandCard
                command="org:example 'password':"
                description="Search within a specific GitHub org"
                index={3}
              />
            </div>
          </section>

          {/* Advanced GitHub Dorks */}
          <section id="advanced-dorks" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-700/10 text-gray-400">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-gray-400">Phase 2</span>
                <h2 className="text-2xl font-bold text-foreground">Custom GitHub Dorks</h2>
              </div>
            </div>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              To save time use a custom GitHub dork with logical operators: <code className="rounded bg-muted px-1 py-0.5 text-xs">AND</code>, <code className="rounded bg-muted px-1 py-0.5 text-xs">OR</code>
            </p>
            <div className="mb-6 rounded-lg border border-border bg-card p-5">
              <CommandCard
                command={'"domain" AND ("api_key" OR "secret" OR "password" OR "access_token" OR "client_secret" OR "private_key" OR "AWS_SECRET_ACCESS_KEY" OR "DB_PASSWORD" OR "slack_token" OR "github_token" OR "BEGIN RSA PRIVATE KEY")'}
                description="Multi-keyword dork with logical operators"
                index={4}
              />
            </div>
          </section>

          {/* Filtering Techniques */}
          <section id="filtering" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-700/10 text-gray-400">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-gray-400">Phase 3</span>
                <h2 className="text-2xl font-bold text-foreground">Filtering by Path, Language and File Type</h2>
              </div>
            </div>
            <p className="mb-6 text-muted-foreground leading-relaxed">
              During reconnaissance, filtering by path, language and file type helps narrow down valuable targets. Below are some common filters to use:
            </p>

            <div className="mb-6 rounded-lg border border-border bg-muted p-4 text-sm text-muted-foreground">
              <p className="mb-1"><strong className="text-foreground">filename:</strong> Search by specific file names (e.g. filename:.env)</p>
              <p className="mb-1"><strong className="text-foreground">extension:</strong> Filter by file type (e.g. extension:json)</p>
              <p className="mb-1"><strong className="text-foreground">path:</strong> Search within specific directories (e.g. path:/config)</p>
              <p className="mb-1"><strong className="text-foreground">org:</strong> Limit results to an organization (e.g. org:my-company)</p>
              <p className="mb-1"><strong className="text-foreground">repo:</strong> Focus on a specific repository (e.g. repo:my-project)</p>
            </div>

            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-2 font-semibold text-foreground">1. Filename: — Search by Specific File Name</h3>
              <CommandCard
                command='filename:.env "DB_PASSWORD"'
                description="Find .env files containing DB_PASSWORD"
                index={5}
              />
            </div>

            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-2 font-semibold text-foreground">2. Extension: — Filter by File Type</h3>
              <CommandCard
                command='extension:json "access_token"'
                description="Search JSON files for access tokens"
                index={6}
              />
            </div>

            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-2 font-semibold text-foreground">3. path: — Search Within Specific Directories</h3>
              <div className="space-y-2">
                <CommandCard command="path:/config filename:database.php" description="Find database.php inside /config" index={7} />
                <CommandCard command="path:/wp-config.php" description="Target the WordPress config file" index={8} />
                <CommandCard command="path:/src/secrets" description="Look in typical config directories" index={9} />
                <CommandCard command="path:/settings" description="Look in typical settings directories" index={10} />
                <CommandCard command="path:/.ssh" description="Search hidden .ssh folder" index={11} />
                <CommandCard command="path:/.git" description="Search hidden .git folder" index={12} />
                <CommandCard command="path:**/.env" description="Find .env files in any nested directory" index={13} />
              </div>
              <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/recon/github-recon/695f3cb26000a16b49dfa6af714d85d35daa2acc.webp")}>
                <Image src="/images/recon/github-recon/695f3cb26000a16b49dfa6af714d85d35daa2acc.webp" alt="Path filter results" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
              </div>
            </div>

            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-2 font-semibold text-foreground">4. repo: — Focus on a Specific Repository</h3>
              <CommandCard
                command="repo:vercel/next.js filename:config.js"
                description="Search config.js within a specific repo"
                index={14}
              />
            </div>

            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-2 font-semibold text-foreground">Bonus: Combine Filters for Maximum Precision</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Find files that contain both &ldquo;password&rdquo; and &ldquo;domain&rdquo; keywords anywhere within a specific language, such as .php, .jsp or .asp.
              </p>
              <CommandCard
                command={'"domain" language:PHP password'}
                description="PHP files containing domain and password keywords"
                index={15}
              />
              <p className="mt-3 text-xs text-amber-400">
                Note: Many of these credentials are committed by random developers. It&apos;s crucial to confirm if they belong to your target&apos;s assets before reporting.
              </p>
            </div>
          </section>

          {/* Advanced Keywords & Validation */}
          <section id="keywords" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-700/10 text-gray-400">
                <Key className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-gray-400">Phase 4</span>
                <h2 className="text-2xl font-bold text-foreground">Advanced Keyword Search & Validation</h2>
              </div>
            </div>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Keyword Variations</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Don&apos;t just search for &ldquo;password.&rdquo; Try variations like:
            </p>
            <div className="mb-6 inline-flex flex-wrap gap-2">
              {["password", "passwd", "pwd", "pass"].map((kw) => (
                <span key={kw} className="rounded-md bg-muted px-3 py-1 text-sm font-mono text-foreground">{kw}</span>
              ))}
            </div>

            <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">Authentication & Secrets</h3>
            <div className="mb-6 inline-flex flex-wrap gap-2">
              {["api_key", "access_token", "client_secret", "auth_token", "authorizationToken", "x-api-key", "secret", "SECRET_KEY", "secret_token", "credentials", "token", "secure"].map((kw) => (
                <span key={kw} className="rounded-md bg-muted px-3 py-1 text-sm font-mono text-foreground">{kw}</span>
              ))}
            </div>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Cloud Provider Secrets</h3>
            <div className="mb-6 inline-flex flex-wrap gap-2">
              {["AWS_SECRET_ACCESS_KEY", "AWS_ACCESS_KEY_ID", "aws_access_key_id", "aws_secret_key", "aws_token", "GCP_SECRET", "gcloud_api_key", "firebase_url", "shodan_api_key"].map((kw) => (
                <span key={kw} className="rounded-md bg-muted px-3 py-1 text-sm font-mono text-foreground">{kw}</span>
              ))}
            </div>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Database Credentials</h3>
            <div className="mb-6 inline-flex flex-wrap gap-2">
              {["DB_PASSWORD", "DATABASE_URL", "db_password", "db_pass", "MYSQL_PASSWORD", "POSTGRES_PASSWORD", "mongo_uri", "mongodb_password"].map((kw) => (
                <span key={kw} className="rounded-md bg-muted px-3 py-1 text-sm font-mono text-foreground">{kw}</span>
              ))}
            </div>

            <h3 className="mb-3 text-lg font-semibold text-foreground">SSH & Private Keys</h3>
            <div className="mb-6 inline-flex flex-wrap gap-2">
              {["BEGIN RSA PRIVATE KEY", "BEGIN OPENSSH PRIVATE KEY", "BEGIN PGP PRIVATE KEY BLOCK", "id_rsa", "private_key", "pem private", "key"].map((kw) => (
                <span key={kw} className="rounded-md bg-muted px-3 py-1 text-sm font-mono text-foreground">{kw}</span>
              ))}
            </div>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Service-Specific Tokens</h3>
            <div className="mb-6 inline-flex flex-wrap gap-2">
              {["slack_token", "discord_token", "github_token", "gitlab_token", "twilio_auth_token", "mailgun", "stripe_secret", "SF_USERNAME salesforce"].map((kw) => (
                <span key={kw} className="rounded-md bg-muted px-3 py-1 text-sm font-mono text-foreground">{kw}</span>
              ))}
            </div>

            <p className="mb-4 text-sm text-muted-foreground">
              You can explore more powerful keyword combinations in my GitHub repository here:
            </p>
            <a
              href="https://github.com/coffinxp/payloads/blob/main/github-dork.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-6 inline-flex items-center gap-2 rounded-lg bg-gray-700/10 px-4 py-2 text-sm font-medium text-gray-400 hover:bg-gray-700/20"
            >
              <Github className="h-4 w-4" />
              coffinxp/payloads — github-dork.txt
              <ExternalLink className="h-3 w-3" />
            </a>

            <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">Validating API Keys — Keyhacks</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              To verify whether exposed API keys are working use the Keyhacks repository. It includes all commands and testing methods for over 50+ types of API keys.
            </p>
            <a
              href="https://github.com/streaak/keyhacks"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-700/10 px-4 py-2 text-sm font-medium text-gray-400 hover:bg-gray-700/20"
            >
              <Github className="h-4 w-4" />
              streaak/keyhacks
              <ExternalLink className="h-3 w-3" />
            </a>
          </section>

          {/* Automation Tools */}
          <section id="automation" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-700/10 text-gray-400">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-gray-400">Phase 5</span>
                <h2 className="text-2xl font-bold text-foreground">Automation Tools</h2>
              </div>
            </div>

            {/* GitGraber */}
            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-2 font-semibold text-foreground">Automation with GitGraber</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Manual recon is great, but for mass scale use GitGraber tool.
              </p>
              <div className="space-y-2">
                <CommandCard
                  command="python3 gitGraber.py -k wordlists/keywords.txt -q nasa.gov -s"
                  description="Search for sensitive data related to the entire organization"
                  index={16}
                />
                <CommandCard
                  command='python3 gitGraber.py -k wordlists/keywords.txt -q "nasa.gov" -s'
                  description="Search for sensitive data related strictly to the domain"
                  index={17}
                />
              </div>
              <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/recon/github-recon/db40b574233fb00f7ce4beb7aeb1899a256cf5ab.webp")}>
                <Image src="/images/recon/github-recon/db40b574233fb00f7ce4beb7aeb1899a256cf5ab.webp" alt="GitGraber results" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
              </div>
            </div>

            {/* TruffleHog */}
            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <h3 className="mb-2 font-semibold text-foreground">Using TruffleHog for Deep Secret Scanning</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                TruffleHog is another powerful tool for hunting secrets in code repositories. Here&apos;s how to use it:
              </p>
              <div className="space-y-2">
                <CommandCard command="trufflehog git file:///home/user/my-repo" description="Scan a local Git repository" index={18} />
                <CommandCard command="trufflehog git https://github.com/username/repo.git" description="Scan a public GitHub repository" index={19} />
                <CommandCard command="trufflehog git https://github.com/trufflesecurity/test_keys --results=verified,unknown" description="Scan with filtering results to verified and unknown only" index={20} />
                <CommandCard command="trufflehog git https://github.com/trufflesecurity/test_keys --results=verified,unknown --json | jq" description="Scan and format output as JSON using jq" index={21} />
                <CommandCard command="trufflehog github --repo=https://github.com/trufflesecurity/test_keys --issue-comments --pr-comments" description="Scan a GitHub repo including issue and PR comments" index={22} />
                <CommandCard command="trufflehog github --org=nasa --token=yourgithubtoken" description="Scan all repos in a GitHub organization" index={23} />
                <CommandCard command="trufflehog github --repo=https://github.com/username/repo" description="Scan a specific GitHub repo" index={24} />
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/recon/github-recon/af1a6f11c0e408d9325b062aa620da43a6427351.webp")}>
                  <Image src="/images/recon/github-recon/af1a6f11c0e408d9325b062aa620da43a6427351.webp" alt="TruffleHog scan results" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
                </div>
                <div className="overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/recon/github-recon/577566a815bd848cbae45168391b881576f8168c.webp")}>
                  <Image src="/images/recon/github-recon/577566a815bd848cbae45168391b881576f8168c.webp" alt="TruffleHog JSON output" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                These TruffleHog commands help detect exposed secrets (like API keys, credentials, tokens) in Git repositories. You can scan local repos, GitHub repositories or entire organizations. Additional flags allow filtering results, parsing JSON and scanning comments in issues and PRs for deeper coverage.
              </p>
            </div>
          </section>

          {/* .Git Directory Hunting */}
          <section id="git-hunting" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-700/10 text-gray-400">
                <Terminal className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-gray-400">Phase 6</span>
                <h2 className="text-2xl font-bold text-foreground">Mass Hunting .git Directory Exposure</h2>
              </div>
            </div>
            <p className="mb-6 text-muted-foreground leading-relaxed">
              .git directories on public websites are another goldmine. Why? Because they store the entire source code history, including deleted but restorable files.
            </p>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Using Nuclei Private Template</h3>
            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <CommandCard
                command="cat domains.txt | nuclei -t gitExposed.yaml"
                description="Scan domains for exposed .git directories with Nuclei"
                index={25}
              />
              <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/recon/github-recon/10741899d84e8144eb280bee6e8767dca099c941.webp")}>
                <Image src="/images/recon/github-recon/10741899d84e8144eb280bee6e8767dca099c941.webp" alt="Nuclei .git scan results" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
              </div>
            </div>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Find Exposed .git Repositories with httpx-toolkit</h3>
            <div className="mb-8 rounded-lg border border-border bg-card p-5">
              <div className="space-y-2">
                <CommandCard
                  command="httpx-toolkit -l subs.txt -path /.git/ -mc 200"
                  description="Basic .git path probe on subdomains"
                  index={26}
                />
                <CommandCard
                  command='cat domains.txt | httpx-toolkit -sc -server -cl -path "/.git/" -mc 200 -location -ms "Index of" -probe'
                  description="Full .git probe with status, server, and content matching"
                  index={27}
                />
                <CommandCard
                  command='cat domains.txt | grep "SUCCESS" | gf urls | httpx-toolkit -sc -server -cl -path "/.git/" -mc 200 -location -ms "Index of" -probe'
                  description="Pipe successful results into .git probing"
                  index={28}
                />
              </div>
              <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/recon/github-recon/a4c54b5f072106b6eebbabb708524922d6271385.webp")}>
                <Image src="/images/recon/github-recon/a4c54b5f072106b6eebbabb708524922d6271385.webp" alt="httpx-toolkit .git scan" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
              </div>
            </div>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Instantly Detect Git Leaks with Browser Extension</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Install the .git browser extension. It automatically alerts you if any site exposes its Git repository, helping you quickly spot misconfigurations and potential attack surfaces during recon.
            </p>
            <div className="mb-6 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/recon/github-recon/9e88b6332d245550a156df2ee8fff0572c98e937.webp")}>
              <Image src="/images/recon/github-recon/9e88b6332d245550a156df2ee8fff0572c98e937.webp" alt=".git browser extension" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>
            <a
              href="https://chromewebstore.google.com/detail/dotgit/pampamgoihgcedonnphgehgondkhikel?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-8 inline-flex items-center gap-2 rounded-lg bg-gray-700/10 px-4 py-2 text-sm font-medium text-gray-400 hover:bg-gray-700/20"
            >
              <ExternalLink className="h-4 w-4" />
              .git Chrome Extension
              <ExternalLink className="h-3 w-3" />
            </a>

            <p className="mb-4 text-sm text-amber-400">
              Tip: Even if a site returns a 403 Forbidden for /.git/, don&apos;t give up — some Git files might still be accessible. Use tools like GitDumper to attempt extraction and reconstruction of the repository.
            </p>

            <h3 className="mb-3 text-lg font-semibold text-foreground">Dumping Git Repositories</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Once you&apos;ve identified a valid .git/ folder using the methods above, it&apos;s time to dump the repository contents. Use tools like GitTools, git-dumper or git-extractor to recover exposed files and inspect the source code.
            </p>
            <div className="space-y-2">
              <CommandCard
                command="./gitdumper.sh https://domain.com/.git/ outputdir"
                description="Dump .git contents with gitdumper"
                index={29}
              />
              <CommandCard
                command="git-dumper https://domain.com/.git/ outputdir"
                description="Alternative .git dumper"
                index={30}
              />
            </div>
            <div className="mt-4 overflow-hidden rounded-lg border border-border cursor-pointer" onClick={() => setExpandedImg("/images/recon/github-recon/67123b7d99be46d176b4fd22fb056e67cfec3d73.webp")}>
              <Image src="/images/recon/github-recon/67123b7d99be46d176b4fd22fb056e67cfec3d73.webp" alt="Git dumper results" width={600} height={338} className="w-full" style={{ height: "auto" }} unoptimized />
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://github.com/internetwache/GitTools"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md bg-card border border-border px-3 py-1.5 text-xs text-foreground hover:border-gray-500/50"
              >
                <Github className="h-3 w-3" />
                internetwache/GitTools
              </a>
              <a
                href="https://github.com/arthaud/git-dumper"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md bg-card border border-border px-3 py-1.5 text-xs text-foreground hover:border-gray-500/50"
              >
                <Github className="h-3 w-3" />
                arthaud/git-dumper
              </a>
            </div>

            <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">Restoring Deleted Files and File Structure Review</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              After dumping the .git folder the next step is to rebuild the full file structure. This helps uncover deleted files, sensitive data and historical changes that may still exist in the Git history.
            </p>
            <div className="mb-4 rounded-lg border border-border bg-card">
              <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">Bash</div>
              <pre className="overflow-x-auto p-4 text-sm text-foreground"><code>{`cd output_dir
git status
git restore .
git checkout .`}</code></pre>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              You can also watch this video where I showed the complete practical of this method:
            </p>
            <a
              href="https://www.youtube.com/watch?v=gFGc0ojrYD4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-700/10 px-4 py-2 text-sm font-medium text-gray-400 hover:bg-gray-700/20"
            >
              <Video className="h-4 w-4" />
              Watch Practical Demo
              <ExternalLink className="h-3 w-3" />
            </a>
          </section>

          {/* Conclusion */}
          <section id="conclusion" className="scroll-mt-24">
            <div className="rounded-xl border border-gray-700/20 bg-gradient-to-br from-gray-700/5 via-background to-gray-500/5 p-8">
              <h2 className="mb-4 text-2xl font-bold text-foreground text-center">Conclusion</h2>
              <p className="text-center text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                GitHub recon and .git hunting &mdash; double trouble for insecure developers. With the right keywords, tools and validation strategies, you can uncover serious vulnerabilities often before anyone else leading to high-impact findings and well-paid bounties.
              </p>
            </div>
          </section>

          {/* Tools & Resources */}
          <section className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-700/10 text-gray-400">
                <ExternalLink className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-gray-400">Tools</span>
                <h2 className="text-2xl font-bold text-foreground">Tools & Resources</h2>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <a href="https://github.com/streaak/keyhacks" target="_blank" rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-gray-500/50 hover:shadow-lg hover:shadow-gray-500/5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gray-700/10 text-gray-400">
                  <Key className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-foreground group-hover:text-gray-400">Keyhacks</div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">Validate 50+ types of exposed API keys with test commands</p>
                </div>
              </a>
              <a href="https://github.com/internetwache/GitTools" target="_blank" rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-gray-500/50 hover:shadow-lg hover:shadow-gray-500/5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gray-700/10 text-gray-400">
                  <Github className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-foreground group-hover:text-gray-400">GitTools</div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">Dump and extract exposed .git repositories</p>
                </div>
              </a>
              <a href="https://github.com/arthaud/git-dumper" target="_blank" rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-gray-500/50 hover:shadow-lg hover:shadow-gray-500/5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gray-700/10 text-gray-400">
                  <Terminal className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-foreground group-hover:text-gray-400">git-dumper</div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">Python tool to dump exposed .git repositories</p>
                </div>
              </a>
              <a href="https://github.com/coffinxp/payloads/blob/main/github-dork.txt" target="_blank" rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-gray-500/50 hover:shadow-lg hover:shadow-gray-500/5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gray-700/10 text-gray-400">
                  <Search className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-foreground group-hover:text-gray-400">GitHub Dork List</div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">Comprehensive GitHub dork keywords for secret hunting</p>
                </div>
              </a>
            </div>
          </section>

    </ContentLayout>
  )
}
