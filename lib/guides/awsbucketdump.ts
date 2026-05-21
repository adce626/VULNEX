import { ToolGuide } from "@/lib/guide-types"

export const awsbucketdumpGuide: ToolGuide = {
  id: "awsbucketdump",
  name: "AWSBucketDump",
  icon: "cloud",
  category: "Cloud & Assets",
  description: "Security assessment tool for finding and dumping AWS S3 buckets",
  installation: {
    title: "Installation",
    steps: ["Clone repository", "Install dependencies", "Verify installation"],
    code: `# Clone repository
git clone https://github.com/jordanpotti/AWSBucketDump.git
cd AWSBucketDump

# Install dependencies
pip install -r requirements.txt

# Verify
python3 AWSBucketDump.py -h`
  },
  usage: {
    title: "Basic Usage",
    description: "Check a list of S3 bucket names and optionally download their contents",
    code: `# Check bucket names from file
python3 AWSBucketDump.py -l bucketnames.txt

# Dump contents of open buckets
python3 AWSBucketDump.py -l bucketnames.txt -D

# Check with specific size limit
python3 AWSBucketDump.py -l bucketnames.txt -g 100

# Check single bucket
python3 AWSBucketDump.py -b my-bucket-name

# Output results
python3 AWSBucketDump.py -l bucketnames.txt -o results.txt`
  },
  commands: [
    { command: "-l", description: "File containing bucket names" },
    { command: "-b", description: "Single bucket name to check" },
    { command: "-D", description: "Download contents of open buckets" },
    { command: "-g", description: "Max file size in MB to download" },
    { command: "-o", description: "Output file for results" },
    { command: "-r", description: "AWS region" },
    { command: "-t", description: "Number of threads" }
  ],
  whenToUse: [
    "Large-scale S3 bucket discovery and assessment",
    "Data leak investigations",
    "Cloud security audits",
    "Bug bounty S3 enumeration"
  ],
  notes: [
    "Can download all files from open buckets (be careful with data)",
    "Use -g to limit file size and avoid downloading massive files",
    "Always confirm you have permission before dumping bucket contents"
  ],
  commonErrors: [
    { error: "Too many files to download", solution: "Use -g flag to limit file size in MB" },
    { error: "Bucket not accessible", solution: "The bucket may exist but not be publicly accessible" }
  ],
  tags: ["s3", "aws", "bucket", "dump"]
}
