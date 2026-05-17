import { ToolGuide } from "@/lib/guide-types"

export const jwtToolGuide: ToolGuide = {
  id: "jwt_tool",
  name: "jwt_tool",
  icon: "key",
  category: "Advanced Topics",
  description: "JWT testing and exploitation toolkit",
  installation: {
    title: "Installation",
    steps: [
      "Clone repository",
      "Install dependencies",
      "Run jwt_tool"
    ],
    code: `# Clone
git clone https://github.com/ticarpi/jwt_tool.git
cd jwt_tool

# Install dependencies
pip3 install -r requirements.txt

# Run
python3 jwt_tool.py -h`
  },
  usage: {
    title: "Basic Usage",
    description: "Test and manipulate JSON Web Tokens",
    code: `# Decode JWT
python3 jwt_tool.py <JWT>

# Test all attacks
python3 jwt_tool.py -M at -t "https://example.com" <JWT>

# Tamper mode
python3 jwt_tool.py -T <JWT>

# Sign with key
python3 jwt_tool.py -S hs256 -p "secret" <JWT>`
  },
  commands: [
    { command: "-M at", description: "All tests mode" },
    { command: "-T", description: "Tamper mode" },
    { command: "-S", description: "Sign with algorithm" },
    { command: "-p", description: "Secret/key" },
    { command: "-I", description: "Inject claims" },
    { command: "-pc", description: "Payload claim" }
  ],
  whenToUse: [
    "JWT security testing",
    "Algorithm confusion attacks",
    "Token manipulation",
    "Key guessing"
  ],
  notes: [
    "Check for none algorithm",
    "Test algorithm confusion",
    "Try common weak secrets"
  ],
  commonErrors: [
    {
      error: "Invalid token format",
      solution: "Ensure proper JWT format with three parts"
    }
  ],
  tags: ["jwt", "auth", "tokens", "exploitation"]
}
