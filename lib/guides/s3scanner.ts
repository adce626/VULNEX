import { ToolGuide } from "@/lib/guide-types"

export const s3scannerGuide: ToolGuide = {
  id: "s3scanner",
  name: "S3Scanner",
  icon: "cloud",
  category: "Cloud & Assets",
  description: "Find open AWS S3 buckets and dump their contents",
  installation: {
    title: "Installation",
    steps: ["Clone repository", "Install dependencies", "Verify installation"],
    code: `# Clone repository
git clone https://github.com/sa7mon/S3Scanner.git
cd S3Scanner

# Install dependencies
pip install -r requirements.txt

# Verify
python3 s3scanner.py --help`
  },
  usage: {
    title: "Basic Usage",
    description: "Check a list of bucket names for open S3 buckets and dump their contents",
    code: `# Check buckets from file
python3 s3scanner.py buckets.txt

# Check and dump contents
python3 s3scanner.py --dump buckets.txt

# Check with specific endpoints
python3 s3scanner.py --endpoint us-east-1 buckets.txt

# Include closed buckets in output
python3 s3scanner.py --include-closed buckets.txt

# Output results to file
python3 s3scanner.py buckets.txt -o results.json`
  },
  commands: [
    { command: "--dump", description: "Download contents of open buckets" },
    { command: "--endpoint", description: "AWS region endpoint" },
    { command: "--include-closed", description: "Include closed buckets in output" },
    { command: "-o", description: "Output file for results" },
    { command: "--threads", description: "Number of concurrent threads" },
    { command: "--timeout", description: "Request timeout in seconds" }
  ],
  whenToUse: [
    "Finding misconfigured S3 buckets during recon",
    "Security audits of cloud storage configurations",
    "Bug bounty hunting for S3-related vulnerabilities",
    "Data leak assessments"
  ],
  notes: [
    "Only scans buckets you have permission to test",
    "Dump feature downloads all files from open buckets",
    "Supports multiple AWS regions automatically"
  ],
  commonErrors: [
    { error: "Access denied", solution: "The bucket exists but is not public — this is expected for secure buckets" },
    { error: "Bucket not found", solution: "The bucket name does not exist — try variations or different regions" }
  ],
  tags: ["s3", "aws", "cloud", "bucket", "scanner"]
}
