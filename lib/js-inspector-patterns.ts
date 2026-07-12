export type FindingSeverity = "critical" | "high" | "medium" | "info"

export interface PatternDefinition {
  type: string
  severity: FindingSeverity
  category: string
  pattern: RegExp
  description: string
}

export interface InspectorFinding {
  type: string
  severity: FindingSeverity
  category: string
  value: string
  context: string
  line: number
  pattern: string
}

const critical: PatternDefinition[] = [
  { type: "Firebase API Key", severity: "critical", category: "API Keys", pattern: /AIza[0-9A-Za-z_-]{35}/g, description: "Firebase API key exposed" },
  { type: "OpenAI API Key", severity: "critical", category: "API Keys", pattern: /sk-[a-zA-Z0-9]{20,60}/g, description: "OpenAI secret key" },
  { type: "Google OAuth Token", severity: "critical", category: "Tokens", pattern: /ya29\.[a-zA-Z0-9_-]{100,}/g, description: "Google OAuth access token" },
  { type: "AWS Access Key", severity: "critical", category: "API Keys", pattern: /AKIA[0-9A-Z]{16}/g, description: "AWS access key ID" },
  { type: "Slack Token", severity: "critical", category: "Tokens", pattern: /xox[baprs]-[a-zA-Z0-9-]{10,80}/g, description: "Slack API token" },
  { type: "GitHub Token", severity: "critical", category: "Tokens", pattern: /ghp_[a-zA-Z0-9]{36}/g, description: "GitHub personal access token" },
  { type: "GitHub Old Token", severity: "critical", category: "Tokens", pattern: /gho_[a-zA-Z0-9]{36}/g, description: "GitHub OAuth access token" },
  { type: "GitLab Token", severity: "critical", category: "Tokens", pattern: /glpat-[a-zA-Z0-9_-]{20,}/g, description: "GitLab personal access token" },
  { type: "Stripe Live Key", severity: "critical", category: "API Keys", pattern: /sk_live_[a-zA-Z0-9]{20,60}/g, description: "Stripe live secret key" },
  { type: "Stripe Test Key", severity: "critical", category: "API Keys", pattern: /sk_test_[a-zA-Z0-9]{20,60}/g, description: "Stripe test secret key" },
  { type: "SendGrid Key", severity: "critical", category: "API Keys", pattern: /SG\.[a-zA-Z0-9_-]{20,}\.[a-zA-Z0-9_-]{20,}/g, description: "SendGrid API key" },
  { type: "Twilio Key", severity: "critical", category: "API Keys", pattern: /SK[a-zA-Z0-9]{32}/g, description: "Twilio API key" },
  { type: "Telegram Bot Token", severity: "critical", category: "Tokens", pattern: /[0-9]{8,10}:[a-zA-Z0-9_-]{35}/g, description: "Telegram bot token" },
  { type: "Mapbox Token", severity: "medium", category: "Tokens", pattern: /pk\.[a-zA-Z0-9]{60,}/g, description: "Mapbox public token" },
  { type: "Mapbox Secret", severity: "critical", category: "Tokens", pattern: /sk\.[a-zA-Z0-9]{60,}/g, description: "Mapbox secret token" },
  { type: "JWT Token", severity: "critical", category: "Tokens", pattern: /eyJ[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}/g, description: "JWT token — may contain session data" },
  { type: "Bearer Token", severity: "critical", category: "Tokens", pattern: /Bearer\s+[a-zA-Z0-9_\-\.]{20,200}/g, description: "Bearer authorization token" },
  { type: "Heroku API Key", severity: "critical", category: "API Keys", pattern: /[hH][eE][rR][oO][kK][uU].{0,40}(?:key|token|secret|api)[^'\"]{0,20}['\"][a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}['\"]/g, description: "Heroku API key" },
  { type: "RSA Private Key", severity: "critical", category: "Secrets", pattern: /-----BEGIN\s?(RSA|EC|DSA|PRIVATE)?\s?PRIVATE KEY-----[\s\S]{0,10000}?-----END\s?(RSA|EC|DSA|PRIVATE)?\s?PRIVATE KEY-----/g, description: "Private key in PEM format" },
  { type: "Password Assignment", severity: "critical", category: "Credentials", pattern: /(password|passwd|pwd)\s*[:=]\s*['\"][^'\"]{3,}['\"]/gi, description: "Hardcoded password" },
  { type: "Secret Assignment", severity: "critical", category: "Secrets", pattern: /(secret|api_secret|api_key|apikey|app_secret)\s*[:=]\s*['\"][^'\"]{8,}['\"]/gi, description: "Hardcoded secret or API key" },
  { type: "client_secret", severity: "critical", category: "Secrets", pattern: /client_secret\s*[:=]\s*['\"][^'\"]{8,}['\"]/gi, description: "OAuth client secret" },
  { type: "Database Connection String", severity: "critical", category: "Credentials", pattern: /(?:mongodb|postgres(?:ql)?|mysql|redis):\/\/[^\s'"]+/gi, description: "Database connection string with credentials" },
  { type: "MongoDB URI", severity: "critical", category: "Credentials", pattern: /mongodb(?:\+srv)?:\/\/[^\s'"]+/g, description: "MongoDB connection URI" },
  { type: "PostgreSQL URI", severity: "critical", category: "Credentials", pattern: /postgres(?:ql)?:\/\/[^\s'"]+/g, description: "PostgreSQL connection URI" },
  { type: "MySQL URI", severity: "critical", category: "Credentials", pattern: /mysql:\/\/[^\s'"]+/g, description: "MySQL connection URI" },
  { type: "Redis URI", severity: "critical", category: "Credentials", pattern: /redis:\/\/[^\s'"]+/g, description: "Redis connection URI" },
  { type: "SSH Private Key Path", severity: "critical", category: "Secrets", pattern: /['\"]~?\/\.ssh\/(id_rsa|id_ed25519|id_ecdsa|id_dsa)['\"]/g, description: "SSH private key path referenced" },
  { type: "JWT Secret", severity: "critical", category: "Secrets", pattern: /jwt[_\-]?secret\s*[:=]\s*['\"][^'\"]{8,}['\"]/gi, description: "JWT signing secret" },
  { type: "Cookie Secret", severity: "critical", category: "Secrets", pattern: /cookie[_\-]?secret\s*[:=]\s*['\"][^'\"]{8,}['\"]/gi, description: "Cookie signing secret" },
  { type: "Session Secret", severity: "critical", category: "Secrets", pattern: /session[_\-]?secret\s*[:=]\s*['\"][^'\"]{8,}['\"]/gi, description: "Session secret" },
  { type: "Auth Token", severity: "critical", category: "Tokens", pattern: /(auth_token|access_token|refresh_token)\s*[:=]\s*['\"][^'\"]{8,}['\"]/gi, description: "Authentication token" },
  { type: "Sauce Token", severity: "critical", category: "Tokens", pattern: /sauce[a-zA-Z0-9_-]{20,}/g, description: "Sauce Labs access key" },
  { type: "npm Token", severity: "critical", category: "Tokens", pattern: /npm_[a-zA-Z0-9]{36}/g, description: "npm access token" },
  { type: "SSH Private Key Inline", severity: "critical", category: "Secrets", pattern: /-----BEGIN OPENSSH PRIVATE KEY-----[\s\S]{0,10000}?-----END OPENSSH PRIVATE KEY-----/g, description: "OpenSSH private key" },
  { type: ".env Reference", severity: "critical", category: "Credentials", pattern: /process\.env\.[a-zA-Z_][a-zA-Z0-9_]*(?:_KEY|_SECRET|_PASSWORD|_TOKEN|_API|API_KEY)/g, description: "Sensitive environment variable referenced" },
  { type: "AWS Session Key", severity: "critical", category: "API Keys", pattern: /ASIA[0-9A-Z]{16}/g, description: "AWS temporary session key" },
  { type: "Stripe Restricted Key", severity: "critical", category: "API Keys", pattern: /rk_(live|test)_[a-zA-Z0-9]{20,60}/g, description: "Stripe restricted API key" },
  { type: "Supabase Key", severity: "critical", category: "API Keys", pattern: /sbp_[a-zA-Z0-9]{30,}/g, description: "Supabase API key" },
  { type: "GitHub Fine-Grained PAT", severity: "critical", category: "Tokens", pattern: /github_pat_[a-zA-Z0-9]{22,}/g, description: "GitHub fine-grained personal access token" },
  { type: "GitHub Installation Token", severity: "critical", category: "Tokens", pattern: /ghs_[a-zA-Z0-9]{36}/g, description: "GitHub app installation token" },
  { type: "GitHub Refresh Token", severity: "critical", category: "Tokens", pattern: /ghr_[a-zA-Z0-9]{36}/g, description: "GitHub OAuth refresh token" },
  { type: "HashiCorp Vault Token", severity: "critical", category: "Tokens", pattern: /hvs\.[a-zA-Z0-9_-]{20,}/g, description: "HashiCorp Vault token" },
  { type: "AWS Secret Access Key", severity: "critical", category: "API Keys", pattern: /(?:aws_secret_access_key|secretAccessKey)\s*[:=]\s*['\"][^'\"]{20,}['\"]/gi, description: "AWS secret access key" },
  { type: "Google Service Account Key", severity: "critical", category: "Secrets", pattern: /['\"]private_key['\"]\s*[:=]\s*['\"]-----BEGIN/gi, description: "Google service account private key in JSON" },
]

const high: PatternDefinition[] = [
  { type: "API Route", severity: "high", category: "API Routes", pattern: /['\"`]\/(?:api|v[0-9]|rest|graphql|trpc)\/[^'\"`\s]{1,80}['\"`]/gi, description: "API endpoint route" },
  { type: "Admin Route", severity: "high", category: "API Routes", pattern: /['\"`]\/(?:admin|dashboard|manage|control|private|internal|staff|moderator)\b[^'\"`\s]{0,50}['\"`]/gi, description: "Admin/internal route" },
  { type: "Auth Route", severity: "high", category: "API Routes", pattern: /['\"`]\/(?:auth|login|signin|signup|register|oauth|token|logout|session)\b[^'\"`\s]{0,50}['\"`]/gi, description: "Authentication route" },
  { type: "Upload Route", severity: "high", category: "API Routes", pattern: /['\"`]\/(?:upload|download|file|media|asset|static|export|import)\b[^'\"`\s]{0,50}['\"`]/gi, description: "File upload/download route" },
  { type: "Webhook Route", severity: "high", category: "API Routes", pattern: /['\"`]\/(?:webhook|callback|hook|notify|event)\b[^'\"`\s]{0,50}['\"`]/gi, description: "Webhook/callback route" },
  { type: "Config Route", severity: "high", category: "API Routes", pattern: /['\"`]\/(?:config|setting|preference|profile|account|user|users)\b[^'\"`\s]{0,50}['\"`]/gi, description: "User/config route" },
  { type: "Debug Route", severity: "high", category: "API Routes", pattern: /['\"`]\/(?:debug|test|health|status|metrics|info|ping|version|swagger|docs)\b[^'\"`\s]{0,50}['\"`]/gi, description: "Debug/status route" },
  { type: "Internal IP", severity: "high", category: "Internal IPs", pattern: /(?:10\.\d{1,3}\.\d{1,3}\.\d{1,3}|172\.(?:1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3})/g, description: "Internal/private IP address" },
  { type: "Localhost", severity: "high", category: "Internal IPs", pattern: /(?:localhost|127\.0\.0\.1|0\.0\.0\.0)(?::\d{2,5})?/gi, description: "Localhost reference" },
  { type: "eval()", severity: "high", category: "Sensitive Functions", pattern: /\beval\s*\([^)]{1,200}\)/g, description: "eval() execution — possible code injection" },
  { type: "innerHTML", severity: "high", category: "Sensitive Functions", pattern: /\.innerHTML\s*=/g, description: "innerHTML assignment — XSS vector" },
  { type: "dangerouslySetInnerHTML", severity: "high", category: "Sensitive Functions", pattern: /dangerouslySetInnerHTML/g, description: "React dangerouslySetInnerHTML — XSS vector" },
  { type: "document.write", severity: "high", category: "Sensitive Functions", pattern: /document\.write\s*\(/g, description: "document.write() — XSS vector" },
  { type: "Function() Constructor", severity: "high", category: "Sensitive Functions", pattern: /new\s+Function\s*\([^)]{1,200}\)/g, description: "Function constructor — code injection" },
  { type: "setTimeout String", severity: "high", category: "Sensitive Functions", pattern: /setTimeout\s*\(\s*['\"`][^'\"`]{10,}['\"`]/g, description: "setTimeout with string — eval-like" },
  { type: "setInterval String", severity: "high", category: "Sensitive Functions", pattern: /setInterval\s*\(\s*['\"`][^'\"`]{10,}['\"`]/g, description: "setInterval with string — eval-like" },
  { type: "WebSocket", severity: "high", category: "WebSockets", pattern: /new\s+WebSocket\s*\([^)]{1,200}\)/g, description: "WebSocket connection" },
  { type: "Socket.io", severity: "high", category: "WebSockets", pattern: /io\s*\(\s*['\"`][^'\"`]{1,200}['\"`]/g, description: "Socket.io connection" },
  { type: "Firebase Config Object", severity: "medium", category: "Firebase", pattern: /apiKey:\s*['\"][^'\"]{30,}['\"]/g, description: "Firebase API key in config object" },
  { type: "Firebase Project ID", severity: "medium", category: "Firebase", pattern: /projectId:\s*['\"][^'\"]{5,}['\"]/g, description: "Firebase project ID" },
  { type: "Firebase Database URL", severity: "medium", category: "Firebase", pattern: /databaseURL:\s*['\"][^'\"]{10,}['\"]/g, description: "Firebase database URL" },
  { type: "Firebase Auth Domain", severity: "medium", category: "Firebase", pattern: /authDomain:\s*['\"][^'\"]{10,}['\"]/g, description: "Firebase auth domain" },
  { type: "AWS Bucket", severity: "high", category: "Cloud", pattern: /[a-zA-Z0-9_-]{3,63}\.s3\.amazonaws\.com/g, description: "AWS S3 bucket URL" },
  { type: "AWS S3 URL", severity: "high", category: "Cloud", pattern: /s3:\/\//g, description: "S3 bucket path" },
  { type: "AWS ARN", severity: "high", category: "Cloud", pattern: /arn:aws:[a-z0-9-]+:[a-z0-9-]+:\d{12}:[a-zA-Z0-9\/:._-]+/g, description: "AWS ARN identifier" },
  { type: "debugger Statement", severity: "high", category: "Sensitive Functions", pattern: /^\s*debugger\s*;?$/gm, description: "debugger statement left in code" },
  { type: "console.log Sensitive", severity: "high", category: "Sensitive Functions", pattern: /console\.(?:log|warn|error|debug|info)\s*\(\s*['\"`](?:password|token|secret|key|auth|cookie|session)['\"`]/gi, description: "Logging sensitive data to console" },
  { type: "Config Object — sensitive key", severity: "high", category: "Credentials", pattern: /(?:DB_PASS|REDIS_URL|MONGO_URI)\s*[:=]\s*['\"][^'\"]{1,100}['\"]/g, description: "Environment config value" },
  { type: "Google Service Account", severity: "high", category: "Cloud", pattern: /[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.iam\.gserviceaccount\.com/g, description: "Google service account email" },
  { type: "eval() with encoded string", severity: "high", category: "Obfuscation", pattern: /eval\s*\(\s*(?:atob\s*\(|['\"`][^'\"`]{0,50}(?:\\x|\\u)[^'\"`]{0,100}['\"`])/gi, description: "eval() wrapping encoded/obfuscated string" },
  { type: "Frontend Env Variable", severity: "medium", category: "Credentials", pattern: /(?:VITE_|REACT_APP_|NEXT_PUBLIC_)[a-zA-Z_][a-zA-Z0-9_]*\s*[:=]\s*['\"][^'\"]{4,100}['\"]/g, description: "Public env variable — often accidentally exposes secrets" },
  { type: "Discord Bot Token", severity: "high", category: "Tokens", pattern: /[MN][A-Za-z\d_-]{23,25}\.[A-Za-z\d_-]{6,7}/g, description: "Discord bot token" },
  { type: "DigitalOcean Token", severity: "high", category: "Tokens", pattern: /dop_v1_[a-f0-9]{64}/g, description: "DigitalOcean personal access token" },
  { type: "Slack Webhook", severity: "high", category: "Tokens", pattern: /https:\/\/hooks\.slack\.com\/services\/[a-zA-Z0-9\/_]{40,}/g, description: "Slack incoming webhook URL" },
  { type: "Sentry DSN", severity: "high", category: "Credentials", pattern: /https:\/\/[a-f0-9]{32}@[a-f0-9]{16}\.ingest\.sentry\.io\/\d+/g, description: "Sentry DSN — may expose project ID and key" },
  { type: "SonarQube Token", severity: "high", category: "Tokens", pattern: /squ_[a-f0-9]{40}/g, description: "SonarQube user token" },
  { type: "Jira API Token", severity: "high", category: "Tokens", pattern: /jira[^'\"]{0,30}(?:token|api_key|password)\s*[:=]\s*['\"][^'\"]{10,}['\"]/gi, description: "Jira API token or credential" },
  { type: "Azure DevOps Token", severity: "high", category: "Tokens", pattern: /(?:azure|devops|vsts)[^'\"]{0,20}(?:pat|token|api_key)\s*[:=]\s*['\"][^'\"]{10,}['\"]/gi, description: "Azure DevOps personal access token" },
  { type: "Cloudflare API Key", severity: "high", category: "API Keys", pattern: /cloudflare[^'\"]{0,20}(?:key|email|token)\s*[:=]\s*['\"][^'\"]{10,}['\"]/gi, description: "Cloudflare API credential" },
  { type: "WebRTC", severity: "high", category: "Network", pattern: /new\s+RTCPeerConnection\s*\(/g, description: "WebRTC peer connection — can leak internal IP" },
  { type: "Clipboard API", severity: "medium", category: "Storage", pattern: /navigator\.clipboard\s*\.\s*(?:readText|writeText|read|write)\s*\(/g, description: "Clipboard read/write — data exfiltration vector" },
  { type: "CacheStorage", severity: "medium", category: "Storage", pattern: /caches\.(?:open|match|delete|keys)\s*\(/g, description: "CacheStorage API — cached data may persist" },
]

const medium: PatternDefinition[] = [
  { type: "URL", severity: "medium", category: "URLs", pattern: /['\"`]https?:\/\/[a-zA-Z0-9][-a-zA-Z0-9.]{1,200}[a-zA-Z0-9](?::\d{2,5})?(?:\/[^\s'\"`<>{}|\\^`\n\r]*)?['\"`]/gi, description: "Full URL" },
  { type: "Staging Domain", severity: "medium", category: "URLs", pattern: /['\"`](?:https?:\/\/)?[^'\"`@]*(?:staging|dev|development|test|qa|uat|beta|sandbox|demo)[-.][a-zA-Z0-9][^'\"`]*['\"`]/gi, description: "Staging/development domain" },
  { type: "Internal Domain", severity: "medium", category: "URLs", pattern: /['\"`](?:https?:\/\/)?[^'\"`@]*(?:corp|internal|private|local|intranet)[-.][a-zA-Z0-9][^'\"`]*['\"`]/gi, description: "Internal domain name" },
  { type: "ngrok URL", severity: "medium", category: "URLs", pattern: /[a-zA-Z0-9-]+\.ngrok(?:\-free)?\.app/g, description: "ngrok tunnel URL" },
  { type: "lvh.me URL", severity: "medium", category: "URLs", pattern: /lvh\.me(?::\d{2,5})?/g, description: "Localhost alias (lvh.me)" },
  { type: "Email", severity: "medium", category: "Contacts", pattern: /['\"`][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}['\"`]/g, description: "Email address" },
  { type: "Phone Number", severity: "medium", category: "Contacts", pattern: /['\"`]\+?\d{1,3}[-.\s]?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}['\"`]/g, description: "Phone number" },
  { type: "GraphQL Introspection", severity: "medium", category: "API Routes", pattern: /__typename|__schema|__type/g, description: "GraphQL introspection query" },
  { type: "S3 Bucket Name", severity: "medium", category: "Cloud", pattern: /https?:\/\/[a-zA-Z0-9._-]{3,63}\.s3[.-]/g, description: "S3 bucket via HTTP" },
  { type: "CDN URL", severity: "medium", category: "URLs", pattern: /https?:\/\/[a-zA-Z0-9-]+\.cloudfront\.net/g, description: "CloudFront CDN URL" },

  { type: "Firebase URL", severity: "medium", category: "URLs", pattern: /https?:\/\/[a-zA-Z0-9-]+\.firebaseio\.com/g, description: "Firebase realtime DB URL" },
  { type: "Firebase App URL", severity: "medium", category: "URLs", pattern: /https?:\/\/[a-zA-Z0-9-]+\.firebaseapp\.com/g, description: "Firebase hosting URL" },
  { type: "Heroku App URL", severity: "medium", category: "URLs", pattern: /https?:\/\/[a-zA-Z0-9-]+\.herokuapp\.com/g, description: "Heroku app URL" },
  { type: "Vercel URL", severity: "medium", category: "URLs", pattern: /https?:\/\/[a-zA-Z0-9-]+\.vercel\.app/g, description: "Vercel deployment URL" },
  { type: "Netlify URL", severity: "medium", category: "URLs", pattern: /https?:\/\/[a-zA-Z0-9-]+\.netlify\.app/g, description: "Netlify site URL" },
  { type: "Render URL", severity: "medium", category: "URLs", pattern: /https?:\/\/[a-zA-Z0-9-]+\.onrender\.com/g, description: "Render app URL" },
  { type: "IP:Port", severity: "medium", category: "Internal IPs", pattern: /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{2,5}\b/g, description: "IP address with port" },
  { type: "Generic Base64 (suspicious)", severity: "medium", category: "Encoding", pattern: /['\"`][A-Za-z0-9+/]{40,}={0,2}['\"`]/g, description: "Long base64 string — possible encoded data" },
  { type: "GraphQL Endpoint", severity: "medium", category: "API Routes", pattern: /['\"`][^'\"`]{0,50}\/graphql['\"`]/gi, description: "GraphQL endpoint" },
  { type: "Stripe Publishable Key", severity: "medium", category: "API Keys", pattern: /pk_live_[a-zA-Z0-9]{20,60}/g, description: "Stripe live publishable key" },
  { type: "Hex-encoded String", severity: "medium", category: "Obfuscation", pattern: /['\"`][^'\"`]{4,}?(?:\\x[a-fA-F0-9]{2}){2,}[^'\"`]*['\"`]/g, description: "String with hex escape sequences (\\xHH)" },
  { type: "Unicode-encoded String", severity: "medium", category: "Obfuscation", pattern: /['\"`][^'\"`]{4,}?(?:\\u[a-fA-F0-9]{4}){2,}[^'\"`]*['\"`]/g, description: "String with unicode escape sequences (\\uHHHH)" },
  { type: "String.fromCharCode", severity: "medium", category: "Obfuscation", pattern: /String\.fromCharCode\s*\([^)]{3,}\)/g, description: "String.fromCharCode() — common deobfuscation technique" },
  { type: "atob/btoa usage", severity: "medium", category: "Obfuscation", pattern: /\b(?:atob|btoa)\s*\([^)]{5,}\)/g, description: "Base64 encode/decode — may indicate encoded payload" },
  { type: "parseInt with radix", severity: "medium", category: "Obfuscation", pattern: /parseInt\s*\(\s*['\"`][^'\"`]{2,}['\"`]\s*,\s*(?:1[6-9]|[2-9]\d)\s*\)/g, description: "parseInt() with non-standard radix — numeric obfuscation" },
  { type: "charCodeAt usage", severity: "medium", category: "Obfuscation", pattern: /\.charCodeAt\s*\([^)]{0,20}\)/g, description: "charCodeAt() — string manipulation used in obfuscation" },
  { type: "Obfuscated Hex Variable", severity: "medium", category: "Obfuscation", pattern: /\b_0x[a-f0-9]{4,6}\b/g, description: "Hex-encoded variable name (_0x...) — common obfuscation pattern" },
]

const info: PatternDefinition[] = [
  { type: "Source Map", severity: "info", category: "Source Maps", pattern: /\/\/#\s*sourceMappingURL=[^\s]+/g, description: "Source map reference — reveals original source" },
  { type: "Source Map File", severity: "info", category: "Source Maps", pattern: /['\"`][\w\-\.\/]+\.map['\"`]/g, description: "Reference to a .map file" },
  { type: "Dynamic Import", severity: "info", category: "Dependencies", pattern: /import\s*\(\s*['\"`][^'\"`]{1,100}['\"`]\s*\)/g, description: "Dynamic import()" },
  { type: "CDN Script", severity: "info", category: "Dependencies", pattern: /https?:\/\/[a-zA-Z0-9.-]+\/(?:cdn|lib|npm|unpkg|jsdelivr|cdnjs|packagist)[^\s'\"`]*/gi, description: "CDN library reference" },
  { type: "unpkg URL", severity: "info", category: "Dependencies", pattern: /https?:\/\/unpkg\.com\/[^\s'\"`]+/g, description: "unpkg CDN reference" },
  { type: "jsdelivr URL", severity: "info", category: "Dependencies", pattern: /https?:\/\/cdn\.jsdelivr\.net\/[^\s'\"`]+/g, description: "jsDelivr CDN reference" },
  { type: "Service Worker", severity: "info", category: "Service Workers", pattern: /navigator\.serviceWorker\.register\s*\(/g, description: "Service worker registration" },
  { type: "Local Storage", severity: "info", category: "Storage", pattern: /localStorage\.(?:getItem|setItem|removeItem)\s*\(/g, description: "LocalStorage access" },
  { type: "Session Storage", severity: "info", category: "Storage", pattern: /sessionStorage\.(?:getItem|setItem|removeItem)\s*\(/g, description: "SessionStorage access" },
  { type: "IndexedDB", severity: "info", category: "Storage", pattern: /indexedDB\.open|window\.indexedDB/g, description: "IndexedDB database access" },
  { type: "Cookie Read", severity: "info", category: "Storage", pattern: /document\.cookie/g, description: "Cookie access" },
  { type: "postMessage", severity: "info", category: "Messaging", pattern: /\.postMessage\s*\(/g, description: "Window postMessage usage" },
  { type: "addEventListener message", severity: "info", category: "Messaging", pattern: /addEventListener\s*\(\s*['\"`]message['\"`]/g, description: "Message event listener" },
  { type: "XMLHttpRequest", severity: "info", category: "Network", pattern: /new\s+XMLHttpRequest/g, description: "Legacy XHR request" },
  { type: "Minified File Indicator", severity: "info", category: "File Info", pattern: /\.min\.js\b/g, description: "File is minified" },
  { type: "ES Module Export", severity: "info", category: "File Info", pattern: /^export\s+(default\s+)?(const|let|var|function|class|interface|type)/gm, description: "ES module export" },
]

export const allPatterns: PatternDefinition[] = [
  { type: "Generic API Key Assignment", severity: "critical", category: "API Keys", pattern: /['\"]api[_-]?(?:key|secret)['\"]\s*[:=]\s*['\"][a-zA-Z0-9_\-]{16,64}['\"]/gi, description: "Generic API key assignment" },
  { type: "Generic Token Assignment", severity: "critical", category: "Tokens", pattern: /['\"]token['\"]\s*[:=]\s*['\"][a-zA-Z0-9_\-]{16,}['\"]/gi, description: "Generic token value" },
  { type: ".env Import", severity: "info", category: "Config", pattern: /require\s*\(\s*['\"`]dotenv['\"`]\s*\)/g, description: "dotenv import — environment variables in use" },
  { type: "Config JSON", severity: "info", category: "Config", pattern: /['\"`][^'\"`]*config[^'\"`]*\.json['\"`]/gi, description: "Configuration file reference" },
  { type: "debug: true", severity: "high", category: "Sensitive Functions", pattern: /debug\s*:\s*true/gi, description: "Debug mode enabled" },
  { type: "test: true", severity: "info", category: "Config", pattern: /test\s*:\s*true/gi, description: "Test mode enabled" },
  { type: "localhost URL", severity: "high", category: "URLs", pattern: /https?:\/\/localhost(?::\d{2,5})?[^\s'\"`<>{}|\\^`]*/gi, description: "Localhost URL in source" },
  { type: "Export to Excel/CSV", severity: "medium", category: "API Routes", pattern: /['\"`]\/(?:csv|xlsx|pdf|report)\b[^'\"`\s]{0,50}['\"`]/gi, description: "Data export route" },
  { type: "Search Route", severity: "medium", category: "API Routes", pattern: /['\"`]\/(?:search|query|find|lookup|suggest|autocomplete)\b[^'\"`\s]{0,50}['\"`]/gi, description: "Search/query route" },
]


export function analyzeJsSource(input: string): InspectorFinding[] {
  const lines = input.split("\n")
  const findings: InspectorFinding[] = []
  const seen = new Set<string>()

  const allUniquePatterns = [...critical, ...high, ...medium, ...info, ...allPatterns]
  const multiLinePatterns = allUniquePatterns.filter(p => p.pattern.source.includes("[\\s\\S]"))
  const singleLinePatterns = allUniquePatterns.filter(p => !p.pattern.source.includes("[\\s\\S]"))

  const strippedLines = input.replace(/\/\*[\s\S]{0,50000}?\*\//g, "").split("\n").map(l => l.replace(/\/\/.*$/, "").trim())

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const originalLine = lines[lineIdx]
    const strippedLine = strippedLines[lineIdx]
    if (!strippedLine) continue

    for (const def of singleLinePatterns) {
      def.pattern.lastIndex = 0
      let match: RegExpExecArray | null
      while ((match = def.pattern.exec(strippedLine)) !== null) {
        const value = match[0].length > 120 ? match[0].substring(0, 120) + "..." : match[0]
        const dedupKey = `${def.type}|${value}|${lineIdx + 1}`
        if (seen.has(dedupKey)) continue
        seen.add(dedupKey)
        findings.push({
          type: def.type,
          severity: def.severity,
          category: def.category,
          value,
          context: originalLine.trim().length > 150 ? originalLine.trim().substring(0, 150) + "..." : originalLine.trim(),
          line: lineIdx + 1,
          pattern: def.pattern.source.substring(0, 60),
        })
      }
    }
  }

  for (const def of multiLinePatterns) {
    def.pattern.lastIndex = 0
    let match: RegExpExecArray | null
    while ((match = def.pattern.exec(input)) !== null) {
      const value = match[0].length > 120 ? match[0].substring(0, 120) + "..." : match[0]
      const lineNum = input.substring(0, match.index).split("\n").length
      const contextLine = (lines[lineNum - 1] ?? "").trim()
      const context = contextLine.length > 150 ? contextLine.substring(0, 150) + "..." : contextLine
      const dedupKey = `${def.type}|${value}|${lineNum}`
      if (seen.has(dedupKey)) continue
      seen.add(dedupKey)
      findings.push({
        type: def.type,
        severity: def.severity,
        category: def.category,
        value,
        context,
        line: lineNum,
        pattern: def.pattern.source.substring(0, 60),
      })
    }
  }

  const entropyMinLen = 25
  const entropyThreshold = 4.5
  const entropyPat = /['\"`]([a-zA-Z0-9_\-\.\+\/=]{25,80})['\"`]/g
  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx]
    entropyPat.lastIndex = 0
    let m: RegExpExecArray | null
    while ((m = entropyPat.exec(line)) !== null) {
      const s = m[1]
      if (s.length < entropyMinLen) continue
      if (/^https?:\/\//i.test(s) || /@/.test(s) || /\.(com|net|org|io|app|dev)$/i.test(s)) continue
      if (findings.some(f => f.line === lineIdx + 1 && f.value.includes(s))) continue
      const ent = shannonEntropy(s)
      if (ent > entropyThreshold) {
        const value = s.length > 120 ? s.substring(0, 120) + "..." : s
        const dedupKey = `High Entropy String|${value}|${lineIdx + 1}`
        if (seen.has(dedupKey)) continue
        seen.add(dedupKey)
        findings.push({
          type: "High Entropy String",
          severity: "medium",
          category: "Suspicious",
          value,
          context: line.trim().length > 150 ? line.trim().substring(0, 150) + "..." : line.trim(),
          line: lineIdx + 1,
          pattern: "entropy",
        })
      }
    }
  }

  const largeArrPat = /\[(?:\s*['\"`][^'\"`]+['\"`]\s*,){5,}/g
  const arrAccessPat = /\b([a-zA-Z_]\w*)\[['\"`]?[a-zA-Z0-9_]+['\"`]?\]/g
  largeArrPat.lastIndex = 0
  const largeArrLines = new Set<number>()
  let arrMatch: RegExpExecArray | null
  while ((arrMatch = largeArrPat.exec(input)) !== null) {
    const lineNum = input.substring(0, arrMatch.index).split("\n").length
    largeArrLines.add(lineNum)
  }
  if (largeArrLines.size > 0) {
    arrAccessPat.lastIndex = 0
    const accessLines = new Set<number>()
    while ((arrMatch = arrAccessPat.exec(input)) !== null) {
      const lineNum = input.substring(0, arrMatch.index).split("\n").length
      accessLines.add(lineNum)
    }
    let found = false
    for (const l of largeArrLines) {
      if (accessLines.has(l)) {
        const key = `Array-based Obfuscation||${l}`
        if (!seen.has(key)) {
          seen.add(key)
          findings.push({
            type: "Array-based Obfuscation",
            severity: "high",
            category: "Obfuscation",
            value: `Large string array with computed access on line ${l}`,
            context: (lines[l - 1] ?? "").trim().substring(0, 150),
            line: l,
            pattern: "obfuscation-array",
          })
        }
        found = true
      }
    }
    if (!found) {
      const firstLine = Math.min(...largeArrLines)
      const key = `Suspicious String Array||${firstLine}`
      if (!seen.has(key)) {
        seen.add(key)
        findings.push({
          type: "Suspicious String Array",
          severity: "medium",
          category: "Obfuscation",
          value: `Array with 5+ string literals on line ${firstLine}`,
          context: (lines[firstLine - 1] ?? "").trim().substring(0, 150),
          line: firstLine,
          pattern: "obfuscation-array",
        })
      }
    }
  }

  const flatCasePat = /switch\s*\([^)]*\)\s*\{([^}]*case\s+[^:]+:[^}]*){5,}/g
  flatCasePat.lastIndex = 0
  let flatMatch: RegExpExecArray | null
  while ((flatMatch = flatCasePat.exec(input)) !== null) {
    const lineNum = input.substring(0, flatMatch.index).split("\n").length
    const key = `Control-Flow Flattening||${lineNum}`
    if (!seen.has(key)) {
      seen.add(key)
      findings.push({
        type: "Control-Flow Flattening",
        severity: "high",
        category: "Obfuscation",
        value: `Large switch with 6+ numeric cases at line ${lineNum}`,
        context: (lines[lineNum - 1] ?? "").trim().substring(0, 150),
        line: lineNum,
        pattern: "obfuscation-cff",
      })
    }
  }

  findings.sort((a, b) => {
    const sevOrder: Record<string, number> = { critical: 0, high: 1, medium: 2, info: 3 }
    const aOrder = sevOrder[a.severity] ?? 99
    const bOrder = sevOrder[b.severity] ?? 99
    if (aOrder !== bOrder) return aOrder - bOrder
    return a.line - b.line
  })

  const sevOrder: Record<string, number> = { critical: 0, high: 1, medium: 2, info: 3 }
  const deduped = new Map<string, InspectorFinding>()
  for (const f of findings) {
    const key = `${f.line}|${f.type}|${f.value}`
    const existing = deduped.get(key)
    if (!existing || sevOrder[f.severity] < sevOrder[existing.severity]) {
      deduped.set(key, f)
    }
  }

  const stripQ = (v: string) => v.replace(/^['\"`]|['\"`]$/g, "")
  const genericTypes = new Set([
    "URL", "Database Connection String", "localhost",
    "Internal IP", "IP:Port",
  ])
  const valueDedup = new Map<string, InspectorFinding>()
  for (const f of Array.from(deduped.values())) {
    const vKey = `${f.line}|${stripQ(f.value)}`
    const existing = valueDedup.get(vKey)
    if (!existing) {
      valueDedup.set(vKey, f)
    } else if (genericTypes.has(existing.type) && !genericTypes.has(f.type)) {
      valueDedup.set(vKey, f)
    } else if (genericTypes.has(f.type) && !genericTypes.has(existing.type)) {
    } else if (genericTypes.has(existing.type) && genericTypes.has(f.type) && f.type !== existing.type) {
      const typeRank = (t: string) => t === "Database Connection String" ? 0 : t === "URL" ? 1 : t === "localhost" ? 2 : t === "Internal IP" ? 3 : t === "IP:Port" ? 4 : 5
      if (typeRank(f.type) > typeRank(existing.type)) valueDedup.set(vKey, f)
    }
  }

  return Array.from(valueDedup.values())
}

function shannonEntropy(s: string): number {
  const freq: Record<string, number> = {}
  for (const ch of s) {
    freq[ch] = (freq[ch] || 0) + 1
  }
  const len = s.length
  let entropy = 0
  for (const c of Object.values(freq)) {
    const p = c / len
    entropy -= p * Math.log2(p)
  }
  return entropy
}

export function getSeverityCounts(findings: InspectorFinding[]): Record<FindingSeverity, number> {
  return {
    critical: findings.filter(f => f.severity === "critical").length,
    high: findings.filter(f => f.severity === "high").length,
    medium: findings.filter(f => f.severity === "medium").length,
    info: findings.filter(f => f.severity === "info").length,
  }
}

export function calculateRiskScore(findings: InspectorFinding[]): { score: number; level: "low" | "medium" | "high" | "critical" } {
  const counts = getSeverityCounts(findings)
  let score = counts.critical * 10 + counts.high * 5 + counts.medium * 2 + counts.info * 0.5

  const lineCounts: Record<number, number> = {}
  for (const f of findings) {
    lineCounts[f.line] = (lineCounts[f.line] || 0) + 1
  }
  for (const count of Object.values(lineCounts)) {
    if (count >= 3) { score *= 1.2; break }
  }

  const types = new Set(findings.map(f => f.type))
  if ((types.has("eval()") || types.has("eval() with encoded string")) &&
      (types.has("atob/btoa usage") || types.has("String.fromCharCode"))) {
    score *= 1.5
  }

  const level = score >= 30 ? "critical" : score >= 15 ? "high" : score >= 5 ? "medium" : "low"
  return { score: Math.round(score), level }
}

export async function analyzeJsSourceChunked(
  input: string,
  onProgress: (percent: number, phase: string) => void,
  signal?: AbortSignal
): Promise<InspectorFinding[]> {
  if (!input.trim()) return []

  const CHUNK_SIZE = 200
  const lines = input.split("\n")
  const findings: InspectorFinding[] = []
  const seen = new Set<string>()

  const allUniquePatterns = [...critical, ...high, ...medium, ...info, ...allPatterns]
  const multiLinePatterns = allUniquePatterns.filter(p => p.pattern.source.includes("[\\s\\S]"))
  const singleLinePatterns = allUniquePatterns.filter(p => !p.pattern.source.includes("[\\s\\S]"))

  onProgress(0, "Preparing...")
  if (signal?.aborted) return []

  const strippedLines = input.replace(/\/\*[\s\S]{0,50000}?\*\//g, "").split("\n").map(l => l.replace(/\/\/.*$/, "").trim())

  onProgress(3, "Analyzing line patterns...")
  if (signal?.aborted) return []

  const totalChunks = Math.ceil(lines.length / CHUNK_SIZE)
  for (let chunkIdx = 0; chunkIdx < totalChunks; chunkIdx++) {
    if (signal?.aborted) return []

    const start = chunkIdx * CHUNK_SIZE
    const end = Math.min(start + CHUNK_SIZE, lines.length)

    for (let lineIdx = start; lineIdx < end; lineIdx++) {
      const originalLine = lines[lineIdx]
      const strippedLine = strippedLines[lineIdx]
      if (!strippedLine) continue

      for (const def of singleLinePatterns) {
        def.pattern.lastIndex = 0
        let match: RegExpExecArray | null
        while ((match = def.pattern.exec(strippedLine)) !== null) {
          const value = match[0].length > 120 ? match[0].substring(0, 120) + "..." : match[0]
          const dedupKey = `${def.type}|${value}|${lineIdx + 1}`
          if (seen.has(dedupKey)) continue
          seen.add(dedupKey)
          findings.push({
            type: def.type,
            severity: def.severity,
            category: def.category,
            value,
            context: originalLine.trim().length > 150 ? originalLine.trim().substring(0, 150) + "..." : originalLine.trim(),
            line: lineIdx + 1,
            pattern: def.pattern.source.substring(0, 60),
          })
        }
      }
    }

    const pct = 3 + Math.round(((chunkIdx + 1) / totalChunks) * 65)
    onProgress(Math.min(pct, 68), `Analyzing line patterns... (${end}/${lines.length} lines)`)
    await new Promise(r => setTimeout(r, 0))
  }

  onProgress(70, "Checking multi-line patterns...")
  if (signal?.aborted) return []

  for (const def of multiLinePatterns) {
    def.pattern.lastIndex = 0
    let match: RegExpExecArray | null
    while ((match = def.pattern.exec(input)) !== null) {
      const value = match[0].length > 120 ? match[0].substring(0, 120) + "..." : match[0]
      const lineNum = input.substring(0, match.index).split("\n").length
      const contextLine = (lines[lineNum - 1] ?? "").trim()
      const context = contextLine.length > 150 ? contextLine.substring(0, 150) + "..." : contextLine
      const dedupKey = `${def.type}|${value}|${lineNum}`
      if (seen.has(dedupKey)) continue
      seen.add(dedupKey)
      findings.push({
        type: def.type,
        severity: def.severity,
        category: def.category,
        value,
        context,
        line: lineNum,
        pattern: def.pattern.source.substring(0, 60),
      })
    }
  }

  onProgress(80, "Analyzing entropy...")
  if (signal?.aborted) return []

  const entropyMinLen = 25
  const entropyThreshold = 4.5
  const entropyPat = /['\"`]([a-zA-Z0-9_\-\.\+\/=]{25,80})['\"`]/g
  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    if (signal?.aborted) return []
    const line = lines[lineIdx]
    entropyPat.lastIndex = 0
    let m: RegExpExecArray | null
    while ((m = entropyPat.exec(line)) !== null) {
      const s = m[1]
      if (s.length < entropyMinLen) continue
      if (/^https?:\/\//i.test(s) || /@/.test(s) || /\.(com|net|org|io|app|dev)$/i.test(s)) continue
      if (findings.some(f => f.line === lineIdx + 1 && f.value.includes(s))) continue
      const ent = shannonEntropy(s)
      if (ent > entropyThreshold) {
        const value = s.length > 120 ? s.substring(0, 120) + "..." : s
        const dedupKey = `High Entropy String|${value}|${lineIdx + 1}`
        if (seen.has(dedupKey)) continue
        seen.add(dedupKey)
        findings.push({
          type: "High Entropy String",
          severity: "medium",
          category: "Suspicious",
          value,
          context: line.trim().length > 150 ? line.trim().substring(0, 150) + "..." : line.trim(),
          line: lineIdx + 1,
          pattern: "entropy",
        })
      }
    }
    if ((lineIdx + 1) % 500 === 0) {
      const pct = 80 + Math.round(((lineIdx + 1) / lines.length) * 10)
      onProgress(Math.min(pct, 90), `Analyzing entropy... (${lineIdx + 1}/${lines.length} lines)`)
      await new Promise(r => setTimeout(r, 0))
    }
  }

  onProgress(90, "Detecting obfuscation...")
  if (signal?.aborted) return []

  const largeArrPat = /\[(?:\s*['\"`][^'\"`]+['\"`]\s*,){5,}/g
  const arrAccessPat = /\b([a-zA-Z_]\w*)\[['\"`]?[a-zA-Z0-9_]+['\"`]?\]/g
  largeArrPat.lastIndex = 0
  const largeArrLines = new Set<number>()
  let arrMatch: RegExpExecArray | null
  while ((arrMatch = largeArrPat.exec(input)) !== null) {
    const lineNum = input.substring(0, arrMatch.index).split("\n").length
    largeArrLines.add(lineNum)
  }
  if (largeArrLines.size > 0) {
    arrAccessPat.lastIndex = 0
    const accessLines = new Set<number>()
    while ((arrMatch = arrAccessPat.exec(input)) !== null) {
      const lineNum = input.substring(0, arrMatch.index).split("\n").length
      accessLines.add(lineNum)
    }
    let found = false
    for (const l of largeArrLines) {
      if (accessLines.has(l)) {
        const key = `Array-based Obfuscation||${l}`
        if (!seen.has(key)) {
          seen.add(key)
          findings.push({
            type: "Array-based Obfuscation",
            severity: "high",
            category: "Obfuscation",
            value: `Large string array with computed access on line ${l}`,
            context: (lines[l - 1] ?? "").trim().substring(0, 150),
            line: l,
            pattern: "obfuscation-array",
          })
        }
        found = true
      }
    }
    if (!found) {
      const firstLine = Math.min(...largeArrLines)
      const key = `Suspicious String Array||${firstLine}`
      if (!seen.has(key)) {
        seen.add(key)
        findings.push({
          type: "Suspicious String Array",
          severity: "medium",
          category: "Obfuscation",
          value: `Array with 5+ string literals on line ${firstLine}`,
          context: (lines[firstLine - 1] ?? "").trim().substring(0, 150),
          line: firstLine,
          pattern: "obfuscation-array",
        })
      }
    }
  }

  onProgress(94, "Detecting control-flow flattening...")
  if (signal?.aborted) return []

  const flatCasePat = /switch\s*\([^)]*\)\s*\{([^}]*case\s+[^:]+:[^}]*){5,}/g
  flatCasePat.lastIndex = 0
  let flatMatch: RegExpExecArray | null
  while ((flatMatch = flatCasePat.exec(input)) !== null) {
    const lineNum = input.substring(0, flatMatch.index).split("\n").length
    const key = `Control-Flow Flattening||${lineNum}`
    if (!seen.has(key)) {
      seen.add(key)
      findings.push({
        type: "Control-Flow Flattening",
        severity: "high",
        category: "Obfuscation",
        value: `Large switch with 6+ numeric cases at line ${lineNum}`,
        context: (lines[lineNum - 1] ?? "").trim().substring(0, 150),
        line: lineNum,
        pattern: "obfuscation-cff",
      })
    }
  }

  onProgress(97, "Finalizing results...")
  if (signal?.aborted) return []

  findings.sort((a, b) => {
    const sevOrder: Record<string, number> = { critical: 0, high: 1, medium: 2, info: 3 }
    const aOrder = sevOrder[a.severity] ?? 99
    const bOrder = sevOrder[b.severity] ?? 99
    if (aOrder !== bOrder) return aOrder - bOrder
    return a.line - b.line
  })

  const sevOrder: Record<string, number> = { critical: 0, high: 1, medium: 2, info: 3 }
  const deduped = new Map<string, InspectorFinding>()
  for (const f of findings) {
    const key = `${f.line}|${f.type}|${f.value}`
    const existing = deduped.get(key)
    if (!existing || sevOrder[f.severity] < sevOrder[existing.severity]) {
      deduped.set(key, f)
    }
  }

  const stripQ = (v: string) => v.replace(/^['\"`]|['\"`]$/g, "")
  const genericTypes = new Set([
    "URL", "Database Connection String", "localhost",
    "Internal IP", "IP:Port",
  ])
  const valueDedup = new Map<string, InspectorFinding>()
  for (const f of Array.from(deduped.values())) {
    const vKey = `${f.line}|${stripQ(f.value)}`
    const existing = valueDedup.get(vKey)
    if (!existing) {
      valueDedup.set(vKey, f)
    } else if (genericTypes.has(existing.type) && !genericTypes.has(f.type)) {
      valueDedup.set(vKey, f)
    } else if (genericTypes.has(f.type) && !genericTypes.has(existing.type)) {
    } else if (genericTypes.has(existing.type) && genericTypes.has(f.type) && f.type !== existing.type) {
      const typeRank = (t: string) => t === "Database Connection String" ? 0 : t === "URL" ? 1 : t === "localhost" ? 2 : t === "Internal IP" ? 3 : t === "IP:Port" ? 4 : 5
      if (typeRank(f.type) > typeRank(existing.type)) valueDedup.set(vKey, f)
    }
  }

  onProgress(100, "Complete")
  return Array.from(valueDedup.values())
}

export function getCategoryFindings(findings: InspectorFinding[]): Record<string, InspectorFinding[]> {
  const groups: Record<string, InspectorFinding[]> = {}
  for (const f of findings) {
    if (!groups[f.category]) groups[f.category] = []
    groups[f.category].push(f)
  }
  return groups
}
