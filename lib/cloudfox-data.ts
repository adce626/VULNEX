export interface CloudFoxCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const cloudfoxCategories: CloudFoxCategory[] = [
  {
    category: "Installation",
    commands: [
      {
        command: "go install github.com/BishopFox/cloudfox@latest",
        description: "Install using Go",
      },
      {
        command: "aws configure",
        description: "Configure AWS credentials before using CloudFox",
      },
      {
        command: "cloudfox --help",
        description: "Verify installation and show help",
      },
    ],
  },
  {
    category: "AWS - Basic Enumeration",
    commands: [
      {
        command: "cloudfox aws --profile my-profile all-checks",
        description: "Run all enumeration checks against an AWS account",
      },
      {
        command: "cloudfox aws --profile my-profile all-checks --principal <user-arn>",
        description: "All checks from perspective of a specific principal",
      },
      {
        command: "cloudfox aws --profile my-profile all-checks -o /tmp/cloudfox-output",
        description: "Save all results to custom output directory",
      },
      {
        command: "cloudfox aws --profile my-profile all-checks --regions us-east-1,us-west-2",
        description: "Limit checks to specific regions",
      },
    ],
  },
  {
    category: "AWS - Principals & Permissions",
    commands: [
      {
        command: "cloudfox aws --profile my-profile principals",
        description: "List all IAM principals (users, roles, groups)",
      },
      {
        command: "cloudfox aws --profile my-profile permissions",
        description: "Analyze IAM permissions and policies",
      },
      {
        command: "cloudfox aws --profile my-profile permissions --principal admin-role",
        description: "Check permissions for a specific IAM principal",
      },
      {
        command: "cloudfox aws --profile my-profile role-trusts",
        description: "Analyze role trust policies for privilege escalation",
      },
    ],
  },
  {
    category: "AWS - Secrets & Data",
    commands: [
      {
        command: "cloudfox aws --profile my-profile secrets",
        description: "Discover secrets in Secrets Manager and Parameter Store",
      },
      {
        command: "cloudfox aws --profile my-profile secrets --service secretsmanager",
        description: "Check only Secrets Manager for secrets",
      },
      {
        command: "cloudfox aws --profile my-profile secrets --show true",
        description: "Reveal secret values (not just names)",
      },
      {
        command: "cloudfox aws --profile my-profile buckets",
        description: "Enumerate S3 buckets and check permissions",
      },
      {
        command: "cloudfox aws --profile my-profile buckets --show-size",
        description: "Show S3 bucket sizes",
      },
    ],
  },
  {
    category: "AWS - Compute & Network",
    commands: [
      {
        command: "cloudfox aws --profile my-profile instances",
        description: "List all EC2 instances across regions",
      },
      {
        command: "cloudfox aws --profile my-profile instances --show-public-ips",
        description: "Show public IPs of EC2 instances",
      },
      {
        command: "cloudfox aws --profile my-profile ladders",
        description: "Find privilege escalation paths",
      },
      {
        command: "cloudfox aws --profile my-profile security-groups",
        description: "List security group rules and exposure",
      },
      {
        command: "cloudfox aws --profile my-profile vpcs",
        description: "List VPCs and networking configuration",
      },
    ],
  },
  {
    category: "AWS - Privilege Escalation",
    commands: [
      {
        command: "cloudfox aws --profile my-profile ladders",
        description: "Map privilege escalation paths in the environment",
      },
      {
        command: "cloudfox aws --profile my-profile ladders --principal my-user",
        description: "Find privilege escalation paths for a specific user",
      },
      {
        command: "cloudfox aws --profile my-profile ladders --output-format dot",
        description: "Generate Graphviz DOT file for visual analysis",
      },
      {
        command: "cloudfox aws --profile my-profile ladders --output-format png",
        description: "Generate PNG diagram of escalation paths",
      },
    ],
  },
  {
    category: "Azure Enumeration",
    commands: [
      {
        command: "cloudfox azure --tenant <tenant-id> all-checks",
        description: "Run all enumeration against Azure tenant",
      },
      {
        command: "cloudfox azure --tenant <tenant-id> --subscription <sub-id> all-checks",
        description: "Run checks against specific subscription",
      },
      {
        command: "cloudfox azure --tenant <tenant-id> --principal <principal-id> all-checks",
        description: "Check from perspective of specific principal",
      },
      {
        command: "cloudfox azure --tenant <tenant-id> storage",
        description: "Enumerate Azure storage accounts",
      },
      {
        command: "cloudfox azure --tenant <tenant-id> vms",
        description: "List Azure VM instances",
      },
    ],
  },
  {
    category: "Output & Reporting",
    commands: [
      {
        command: "cloudfox aws --profile my-profile all-checks -o /tmp/loot",
        description: "Save loot to custom directory",
      },
      {
        command: "cloudfox aws --profile my-profile all-checks --output-format json",
        description: "JSON output for machine parsing",
      },
      {
        command: "cloudfox aws --profile my-profile all-checks --wrap true",
        description: "Wrap text in terminal output for readability",
      },
      {
        command: "cloudfox aws --profile my-profile permissions --wrap false",
        description: "Disable text wrapping for script parsing",
      },
    ],
  },
  {
    category: "Quick Reference",
    commands: [
      {
        command: "all-checks = Full enumeration",
        description: "Run every available enumeration check",
      },
      {
        command: "principals = IAM principals",
        description: "List users, roles, and groups",
      },
      {
        command: "permissions = Permission analysis",
        description: "Analyze IAM policies and permissions",
      },
      {
        command: "secrets = Secret discovery",
        description: "Find secrets in cloud secret stores",
      },
      {
        command: "instances = Compute instances",
        description: "List EC2/Azure VM instances",
      },
      {
        command: "buckets = Storage enumeration",
        description: "List S3/Azure storage with permissions",
      },
      {
        command: "ladders = Escalation paths",
        description: "Map privilege escalation opportunities",
      },
      {
        command: "--profile = AWS profile",
        description: "Specify AWS CLI profile to use",
      },
      {
        command: "--principal = Target principal",
        description: "Check from perspective of specific IAM principal",
      },
      {
        command: "-o = Output directory",
        description: "Custom output directory for loot files",
      },
    ],
  },
]

export const cloudfoxTools = [
  {
    name: "CloudFox GitHub",
    url: "https://github.com/BishopFox/cloudfox",
    description: "Official repository with documentation and releases",
  },
  {
    name: "BishopFox",
    url: "https://bishopfox.com",
    description: "BishopFox security research team behind CloudFox",
  },
  {
    name: "AWS CLI Documentation",
    url: "https://aws.amazon.com/cli/",
    description: "Configure AWS credentials for CloudFox",
  },
  {
    name: "Azure CLI Documentation",
    url: "https://docs.microsoft.com/cli/azure/",
    description: "Configure Azure credentials for CloudFox",
  },
  {
    name: "Stratus Red Team",
    url: "https://stratus-red-team.cloud/",
    description: "Granular atomic attack techniques for cloud environments",
  },
]
