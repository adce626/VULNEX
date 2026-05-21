import { ToolGuide } from "@/lib/guide-types"

export const gcpbucketbruteGuide: ToolGuide = {
  id: "gcpbucketbrute",
  name: "GCPBucketBrute",
  icon: "cloud",
  category: "Cloud & Assets",
  description: "Brute force GCP bucket names to find open storage",
  installation: {
    title: "Installation",
    steps: ["Clone the repository", "Install dependencies", "Verify installation"],
    code: `git clone https://github.com/RhinoSecurityLabs/GCPBucketBrute.git
cd GCPBucketBrute
pip install -r requirements.txt

# Verify
python3 gcpbucketbrute.py --help`
  },
  usage: {
    title: "Basic Usage",
    description: "Brute force GCS bucket names using a keyword or wordlist",
    code: `# Brute force with keyword
python3 gcpbucketbrute.py -k example

# Use a custom wordlist
python3 gcpbucketbrute.py -w wordlist.txt

# Check specific bucket names
python3 gcpbucketbrute.py -b bucket-name`
  },
  commands: [
    { command: "-k", description: "Keyword to generate bucket names" },
    { command: "-w", description: "Wordlist file with bucket names" },
    { command: "-b", description: "Specific bucket name to check" },
    { command: "-o", description: "Output file for results" }
  ],
  whenToUse: [
    "Finding publicly accessible GCP storage buckets",
    "Testing for exposed GCS buckets during cloud assessments",
    "Asset discovery for Google Cloud Platform targets"
  ],
  notes: [
    "Only works with Google Cloud Storage buckets",
    "Rate limiting may apply from Google's side",
    "Use with proper authorization"
  ],
  commonErrors: [
    { error: "All buckets private", solution: "Try different keywords or a larger wordlist" },
    { error: "Connection errors", solution: "Check internet connectivity or use a VPN" }
  ],
  tags: ["gcp", "bucket", "bruteforce", "cloud"]
}
