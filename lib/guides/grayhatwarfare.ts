import { ToolGuide } from "@/lib/guide-types"

export const grayhatwarfareGuide: ToolGuide = {
  id: "grayhatwarfare",
  name: "GrayhatWarfare",
  icon: "cloud",
  category: "Cloud & Assets",
  description: "Grayhat Warfare API client for finding open cloud buckets",
  installation: {
    title: "Installation",
    steps: ["Clone the repository", "Install dependencies", "Configure API key"],
    code: `git clone https://github.com/mavericknerd/GrayhatWarfare.git
cd GrayhatWarfare
pip install -r requirements.txt

# Set API key
export GRAYHAT_API_KEY=your_api_key`
  },
  usage: {
    title: "Basic Usage",
    description: "Search for open buckets using the Grayhat Warfare API",
    code: `# Search for buckets
python3 grayhatwarfare.py search example

# List recent buckets
python3 grayhatwarfare.py recent

# Get bucket details
python3 grayhatwarfare.py bucket bucket-name`
  },
  commands: [
    { command: "search", description: "Search for open buckets by keyword" },
    { command: "recent", description: "List recently discovered buckets" },
    { command: "bucket", description: "Get details on a specific bucket" },
    { command: "--help", description: "Show help message" }
  ],
  whenToUse: [
    "Finding exposed S3 and Azure buckets via Grayhat Warfare database",
    "Cloud asset discovery using public bucket indexes",
    "Security research on cloud storage exposure"
  ],
  notes: [
    "Requires a Grayhat Warfare API key",
    "Free tier has limited queries per day",
    "Results are based on the Grayhat Warfare bucket database"
  ],
  commonErrors: [
    { error: "Invalid API key", solution: "Check your GRAYHAT_API_KEY environment variable" },
    { error: "Rate limit exceeded", solution: "Upgrade your API plan or wait for the limit to reset" }
  ],
  tags: ["cloud", "bucket", "search", "api"]
}
