export interface HashMatch {
  name: string
  length: number
  type: "hash" | "checksum" | "password_hash" | "kdf"
  confidence: number
  pattern: string
  prefix: string
  category: "Fast Hash" | "Password Hash" | "Checksum" | "KDF"
  collisionRisk: "High" | "Medium" | "Low" | "None"
  crackDifficulty: "Easy" | "Medium" | "Hard" | "Very Hard"
  example?: string
}

export interface HashAnalysis {
  length: number
  charSet: "Hex" | "Base64" | "Printable ASCII" | "Mixed"
  prefix: string
  matches: HashMatch[]
  bestGuess: string
}

interface HashRule {
  name: string
  type: HashMatch["type"]
  pattern: RegExp
  length?: number
  prefix: string
  category: HashMatch["category"]
  collisionRisk: HashMatch["collisionRisk"]
  crackDifficulty: HashMatch["crackDifficulty"]
  example?: string
  isLowConfidence?: boolean
}

const rules: HashRule[] = [
  // bcrypt variants
  { name: "bcrypt ($2a$)", type: "password_hash", pattern: /^\$2a\$\d{2}\$[.\/A-Za-z0-9]{53}$/, prefix: "$2a$", category: "Password Hash", collisionRisk: "None", crackDifficulty: "Hard", example: "$2a$12$LJ3m4ys3Lk0TSwHnbfOMiOXPm1Qlq5J3m4ys3Lk0TSwHnbfOMiO" },
  { name: "bcrypt ($2b$)", type: "password_hash", pattern: /^\$2b\$\d{2}\$[.\/A-Za-z0-9]{53}$/, prefix: "$2b$", category: "Password Hash", collisionRisk: "None", crackDifficulty: "Hard", example: "$2b$12$LJ3m4ys3Lk0TSwHnbfOMiOXPm1Qlq5J3m4ys3Lk0TSwHnbfOMiO" },
  { name: "bcrypt ($2x$)", type: "password_hash", pattern: /^\$2x\$\d{2}\$[.\/A-Za-z0-9]{53}$/, prefix: "$2x$", category: "Password Hash", collisionRisk: "None", crackDifficulty: "Hard", example: "$2x$12$LJ3m4ys3Lk0TSwHnbfOMiOXPm1Qlq5J3m4ys3Lk0TSwHnbfOMiO" },
  { name: "bcrypt ($2y$)", type: "password_hash", pattern: /^\$2y\$\d{2}\$[.\/A-Za-z0-9]{53}$/, prefix: "$2y$", category: "Password Hash", collisionRisk: "None", crackDifficulty: "Hard", example: "$2y$10$7rF3VrBxXrF3VrBxXrF3OuOqF3VrBxXrF3VrBxXrF3OuOqF3VrB" },

  // Unix crypt variants
  { name: "SHA512-Crypt", type: "password_hash", pattern: /^\$6\$\w{16,}$/, prefix: "$6$", category: "Password Hash", collisionRisk: "None", crackDifficulty: "Hard", example: "$6$rounds=5000$usesomesillystri$kD3D6gX8yFfRzV7nZz7z7z7z7z7z7z7z7z7z7z7z7z7z7z7z" },
  { name: "SHA256-Crypt", type: "password_hash", pattern: /^\$5\$\w{16,}$/, prefix: "$5$", category: "Password Hash", collisionRisk: "None", crackDifficulty: "Hard", example: "$5$rounds=5000$usesomesillystri$kD3D6gX8yFfRzV7nZz7z7z7z" },
  { name: "Apache MD5 ($apr1$)", type: "password_hash", pattern: /^\$apr1\$.+$/, prefix: "$apr1$", category: "Password Hash", collisionRisk: "High", crackDifficulty: "Easy", example: "$apr1$r31zyp5a$g4wH0rVR0e6Y7xq7pY7xq1" },
  { name: "DES Crypt", type: "password_hash", pattern: /^_[\.\/0-9A-Za-z]{12}$/, prefix: "_", category: "Password Hash", collisionRisk: "High", crackDifficulty: "Easy", isLowConfidence: true, example: "_J9..b4C4S4k." },

  // Argon2
  { name: "Argon2id", type: "kdf", pattern: /^\$argon2id\$.*$/, prefix: "$argon2id$", category: "KDF", collisionRisk: "None", crackDifficulty: "Very Hard", example: "$argon2id$v=19$m=65536,t=3,p=4$c29tZXNhbHQ$Rr3K9iQn3bL8g1jQ3bL8g1jQ3bL8g1jQ" },
  { name: "Argon2i", type: "kdf", pattern: /^\$argon2i\$.*$/, prefix: "$argon2i$", category: "KDF", collisionRisk: "None", crackDifficulty: "Very Hard", example: "$argon2i$v=19$m=65536,t=3,p=4$c29tZXNhbHQ$Rr3K9iQn3bL8g1jQ3bL8g1jQ" },
  { name: "Argon2d", type: "kdf", pattern: /^\$argon2d\$.*$/, prefix: "$argon2d$", category: "KDF", collisionRisk: "None", crackDifficulty: "Very Hard", example: "$argon2d$v=19$m=65536,t=3,p=4$c29tZXNhbHQ$Rr3K9iQn3bL8g1jQ" },

  // KDF
  { name: "scrypt", type: "kdf", pattern: /^\$7\$.+$/, prefix: "$7$", category: "KDF", collisionRisk: "None", crackDifficulty: "Very Hard", example: "$7$C6..../.....c29tZXNhbHR2aGVyZXRvc2NyeXB0" },
  { name: "PBKDF2", type: "kdf", pattern: /^\$pbkdf2\$.+$/, prefix: "$pbkdf2$", category: "KDF", collisionRisk: "None", crackDifficulty: "Hard", example: "$pbkdf2-sha256$i=10000$c29tZXNhbHQ$r3K9iQn3bL8g1jQ3bL8g1jQ" },

  // HMAC (indistinguishable from base hashes alone — lower confidence)
  { name: "HMAC-MD5", type: "hash", pattern: /^[a-fA-F0-9]{32}$/, length: 32, prefix: "None", category: "Fast Hash", collisionRisk: "High", crackDifficulty: "Easy", isLowConfidence: true },
  { name: "HMAC-SHA1", type: "hash", pattern: /^[a-fA-F0-9]{40}$/, length: 40, prefix: "None", category: "Fast Hash", collisionRisk: "Medium", crackDifficulty: "Medium", isLowConfidence: true },
  { name: "HMAC-SHA256", type: "hash", pattern: /^[a-fA-F0-9]{64}$/, length: 64, prefix: "None", category: "Fast Hash", collisionRisk: "Low", crackDifficulty: "Hard", isLowConfidence: true },

  // Hex hashes (checked in order from most specific to least)
  { name: "MD4", type: "hash", pattern: /^[a-fA-F0-9]{32}$/, length: 32, prefix: "None", category: "Fast Hash", collisionRisk: "High", crackDifficulty: "Easy", example: "bde52cb31de33e46245e05fbdbd6fb24" },
  { name: "MD5", type: "hash", pattern: /^[a-fA-F0-9]{32}$/, length: 32, prefix: "None", category: "Fast Hash", collisionRisk: "High", crackDifficulty: "Easy", example: "5d41402abc4b2a76b9719d911017c592" },
  { name: "NTLM", type: "hash", pattern: /^[a-fA-F0-9]{32}$/, length: 32, prefix: "None", category: "Password Hash", collisionRisk: "High", crackDifficulty: "Easy", example: "b4b9b02e6f09a9bd760f388b67351e2b" },
  { name: "LM Hash", type: "hash", pattern: /^[a-fA-F0-9]{32}$/, length: 32, prefix: "None", category: "Password Hash", collisionRisk: "High", crackDifficulty: "Easy", example: "299bd128c1101fd6" },
  { name: "SHA1", type: "hash", pattern: /^[a-fA-F0-9]{40}$/, length: 40, prefix: "None", category: "Fast Hash", collisionRisk: "Medium", crackDifficulty: "Medium", example: "a94a8fe5ccb19ba61c4c0873d391e987982fbbd3" },
  { name: "RIPEMD160", type: "hash", pattern: /^[a-fA-F0-9]{40}$/, length: 40, prefix: "None", category: "Fast Hash", collisionRisk: "Medium", crackDifficulty: "Medium", example: "a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9" },
  { name: "SHA224", type: "hash", pattern: /^[a-fA-F0-9]{56}$/, length: 56, prefix: "None", category: "Fast Hash", collisionRisk: "Low", crackDifficulty: "Hard", example: "d14a028c2a3a2bc947610222bb088ea5e4a8f7f6c8e8e8e8e8e8e8e8e8e8e8e" },
  { name: "SHA3-224", type: "hash", pattern: /^[a-fA-F0-9]{56}$/, length: 56, prefix: "None", category: "Fast Hash", collisionRisk: "Low", crackDifficulty: "Hard" },
  { name: "SHA256", type: "hash", pattern: /^[a-fA-F0-9]{64}$/, length: 64, prefix: "None", category: "Fast Hash", collisionRisk: "Low", crackDifficulty: "Hard", example: "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824" },
  { name: "SHA3-256", type: "hash", pattern: /^[a-fA-F0-9]{64}$/, length: 64, prefix: "None", category: "Fast Hash", collisionRisk: "Low", crackDifficulty: "Hard" },
  { name: "Blake2s-256", type: "hash", pattern: /^[a-fA-F0-9]{64}$/, length: 64, prefix: "None", category: "Fast Hash", collisionRisk: "Low", crackDifficulty: "Hard" },
  { name: "GOST R 34.11-94", type: "hash", pattern: /^[a-fA-F0-9]{64}$/, length: 64, prefix: "None", category: "Fast Hash", collisionRisk: "Low", crackDifficulty: "Hard" },
  { name: "SHA384", type: "hash", pattern: /^[a-fA-F0-9]{96}$/, length: 96, prefix: "None", category: "Fast Hash", collisionRisk: "Low", crackDifficulty: "Hard", example: "cb00753f45a35e8bb5a03d699ac65007272c32ab0eded1631a8b605a43ff5bed8086072ba1e7cc2358baeca134c825a7" },
  { name: "SHA3-384", type: "hash", pattern: /^[a-fA-F0-9]{96}$/, length: 96, prefix: "None", category: "Fast Hash", collisionRisk: "Low", crackDifficulty: "Hard" },
  { name: "SHA512", type: "hash", pattern: /^[a-fA-F0-9]{128}$/, length: 128, prefix: "None", category: "Fast Hash", collisionRisk: "Low", crackDifficulty: "Hard", example: "ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f" },
  { name: "SHA3-512", type: "hash", pattern: /^[a-fA-F0-9]{128}$/, length: 128, prefix: "None", category: "Fast Hash", collisionRisk: "Low", crackDifficulty: "Hard" },
  { name: "Whirlpool", type: "hash", pattern: /^[a-fA-F0-9]{128}$/, length: 128, prefix: "None", category: "Fast Hash", collisionRisk: "Low", crackDifficulty: "Hard" },
  { name: "Blake2b-512", type: "hash", pattern: /^[a-fA-F0-9]{128}$/, length: 128, prefix: "None", category: "Fast Hash", collisionRisk: "Low", crackDifficulty: "Hard" },

  // Special formats
  { name: "MySQL 5", type: "hash", pattern: /^\*[a-fA-F0-9]{40}$/, prefix: "*", category: "Fast Hash", collisionRisk: "Low", crackDifficulty: "Hard", example: "*6C8989366EAF75BB670AD8EA7A7FC1176A95CEF4" },
  { name: "MySQL < 4.1", type: "hash", pattern: /^[a-fA-F0-9]{16}$/, length: 16, prefix: "None", category: "Fast Hash", collisionRisk: "High", crackDifficulty: "Easy" },
  { name: "NTLM (with username)", type: "hash", pattern: /^[a-fA-F0-9]{32}:.+$/, prefix: "hex:", category: "Password Hash", collisionRisk: "High", crackDifficulty: "Easy", example: "b4b9b02e6f09a9bd760f388b67351e2b:username" },

  // Checksums
  { name: "CRC32", type: "checksum", pattern: /^[a-fA-F0-9]{8}$/, length: 8, prefix: "None", category: "Checksum", collisionRisk: "High", crackDifficulty: "Easy", example: "3e6d5c5a" },
  { name: "Adler32", type: "checksum", pattern: /^[a-fA-F0-9]{8}$/, length: 8, prefix: "None", category: "Checksum", collisionRisk: "High", crackDifficulty: "Easy" },
]

function detectCharSet(s: string): "Hex" | "Base64" | "Printable ASCII" | "Mixed" {
  if (/^[a-fA-F0-9]+$/.test(s)) return "Hex"
  if (/^[A-Za-z0-9+\/=]+$/.test(s) || /^[A-Za-z0-9\-_]+$/.test(s)) return "Base64"
  if (/^[\x20-\x7E]+$/.test(s)) return "Printable ASCII"
  return "Mixed"
}

function detectPrefix(s: string): string {
  if (/^\$2[abxy]\$/.test(s)) { const m = s.match(/^\$2[abxy]\$\d{2}\$/); return m ? m[0] : "$2" }
  if (/^\$\d+\$/.test(s)) { const m = s.match(/^\$\d+\$/); return m ? m[0] : "$" }
  if (/^\$argon2[id]?\$/.test(s)) { const m = s.match(/^\$argon2[id]?\$/); return m ? m[0] : "$argon2" }
  if (/^\$pbkdf2\$/.test(s)) return "$pbkdf2$"
  if (/^\$apr1\$/.test(s)) return "$apr1$"
  if (/^SCRYPT:/.test(s)) return "SCRYPT:"
  if (/^\*/.test(s)) return "*"
  if (/^_/.test(s) && /^_[\.\/0-9A-Za-z]{12}$/.test(s)) return "_"
  return "None"
}

function confidenceForMatch(s: string, rule: HashRule, sameLengthCount: number, isLowConfidence: boolean): number {
  if (rule.prefix !== "None" && s.startsWith(rule.prefix)) return isLowConfidence ? 88 : 98
  if (rule.type === "checksum" && rule.length === s.length) return isLowConfidence ? 80 : 90
  if (rule.pattern.source.includes("[a-fA-F0-9]")) {
    if (sameLengthCount === 1) return isLowConfidence ? 85 : 95
    if (sameLengthCount <= 2) return isLowConfidence ? 75 : 85
    if (sameLengthCount <= 4) return isLowConfidence ? 65 : 75
    return isLowConfidence ? 55 : 65
  }
  return isLowConfidence ? 70 : 80
}

export function analyzeHash(input: string): HashAnalysis {
  const clean = input.trim()
  const fallback: HashAnalysis = {
    length: clean.length,
    charSet: detectCharSet(clean),
    prefix: detectPrefix(clean),
    matches: [],
    bestGuess: "Unknown",
  }
  if (!clean) return { length: 0, charSet: "Printable ASCII", prefix: "None", matches: [], bestGuess: "Unknown" }

  const matching: { rule: HashRule; confidence: number }[] = []

  for (const rule of rules) {
    if (rule.pattern.test(clean)) {
      matching.push({ rule, confidence: 0 })
    }
  }

  if (matching.length === 0) return fallback

  const matchingRules = matching.map(m => m.rule)
  const hexRulesAtSameLength = matchingRules.filter(r => r.pattern.source.includes("[a-fA-F0-9]") && (r.length === clean.length || !r.length)).length

  const results = matching.map(m => ({
    ...m,
    confidence: confidenceForMatch(clean, m.rule, hexRulesAtSameLength, !!m.rule.isLowConfidence),
  }))

  results.sort((a, b) => b.confidence - a.confidence)

  const matches = results.map((m, i) => ({
    name: m.rule.name,
    length: m.rule.length || clean.length,
    type: m.rule.type,
    confidence: i === 0 ? Math.min(100, m.confidence + 2) : m.confidence,
    pattern: m.rule.pattern.source,
    prefix: m.rule.prefix,
    category: m.rule.category,
    collisionRisk: m.rule.collisionRisk,
    crackDifficulty: m.rule.crackDifficulty,
    example: m.rule.example,
  }))

  const bestGuess = matches.length > 0 ? matches[0].name : "Unknown"

  return {
    length: clean.length,
    charSet: detectCharSet(clean),
    prefix: detectPrefix(clean),
    matches,
    bestGuess,
  }
}

// MD5 implementation for verification
function md5(s: string): string {
  function rotateLeft(x: number, n: number) { return (x << n) | (x >>> (32 - n)) }
  function toHex(i: number): string { const h = i.toString(16); return h.length === 1 ? "0" + h : h }
  const sUtf8 = unescape(encodeURIComponent(s))
  const bytes: number[] = []
  for (let i = 0; i < sUtf8.length; i++) bytes.push(sUtf8.charCodeAt(i))
  const origLen = bytes.length * 8
  bytes.push(0x80)
  while (bytes.length % 64 !== 56) bytes.push(0)
  for (let i = 0; i < 8; i++) bytes.push((origLen >>> (i * 8)) & 0xFF)

  const K = [0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
    0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
    0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
    0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
    0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
    0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
    0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
    0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391]
  const S = [7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
    5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
    4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
    6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21]

  let a0 = 0x67452301, b0 = 0xefcdab89, c0 = 0x98badcfe, d0 = 0x10325476
  const words: number[] = []
  for (let i = 0; i < bytes.length; i += 4) {
    words.push(bytes[i] | (bytes[i + 1] << 8) | (bytes[i + 2] << 16) | (bytes[i + 3] << 24))
  }

  for (let block = 0; block < words.length; block += 16) {
    let a = a0, b = b0, c = c0, d = d0
    for (let i = 0; i < 64; i++) {
      let f: number, g: number
      if (i < 16) { f = (b & c) | (~b & d); g = i }
      else if (i < 32) { f = (d & b) | (~d & c); g = (5 * i + 1) % 16 }
      else if (i < 48) { f = b ^ c ^ d; g = (3 * i + 5) % 16 }
      else { f = c ^ (b | ~d); g = (7 * i) % 16 }
      const temp = d; d = c; c = b; b = b + rotateLeft(a + f + K[i] + words[block + g], S[i]); a = temp
    }
    a0 = (a0 + a) >>> 0; b0 = (b0 + b) >>> 0; c0 = (c0 + c) >>> 0; d0 = (d0 + d) >>> 0
  }
  return toHex(a0) + toHex(b0) + toHex(c0) + toHex(d0)
}

export async function verifyHash(hash: string, plaintext: string): Promise<{ algorithm: string; matches: boolean; computed: string }[]> {
  const results: { algorithm: string; matches: boolean; computed: string }[] = []
  const encoder = new TextEncoder()
  const cleanHash = hash.trim().toLowerCase()
  const cleanText = plaintext.trim()

  // MD5
  const md5Result = md5(cleanText)
  results.push({ algorithm: "MD5", matches: md5Result === cleanHash, computed: md5Result })

  // SHA1 via Web Crypto
  try {
    const sha1Buf = await crypto.subtle.digest("SHA-1", encoder.encode(cleanText))
    const sha1Hex = Array.from(new Uint8Array(sha1Buf)).map(b => b.toString(16).padStart(2, "0")).join("")
    results.push({ algorithm: "SHA1", matches: sha1Hex === cleanHash, computed: sha1Hex })
  } catch { /* ignore */ }

  // SHA256
  try {
    const sha256Buf = await crypto.subtle.digest("SHA-256", encoder.encode(cleanText))
    const sha256Hex = Array.from(new Uint8Array(sha256Buf)).map(b => b.toString(16).padStart(2, "0")).join("")
    results.push({ algorithm: "SHA256", matches: sha256Hex === cleanHash, computed: sha256Hex })
  } catch { /* ignore */ }

  // SHA384
  try {
    const sha384Buf = await crypto.subtle.digest("SHA-384", encoder.encode(cleanText))
    const sha384Hex = Array.from(new Uint8Array(sha384Buf)).map(b => b.toString(16).padStart(2, "0")).join("")
    results.push({ algorithm: "SHA384", matches: sha384Hex === cleanHash, computed: sha384Hex })
  } catch { /* ignore */ }

  // SHA512
  try {
    const sha512Buf = await crypto.subtle.digest("SHA-512", encoder.encode(cleanText))
    const sha512Hex = Array.from(new Uint8Array(sha512Buf)).map(b => b.toString(16).padStart(2, "0")).join("")
    results.push({ algorithm: "SHA512", matches: sha512Hex === cleanHash, computed: sha512Hex })
  } catch { /* ignore */ }

  return results.filter(r => r.matches || results.filter(x => x.matches).length === 0)
}

export const lookupLinks = [
  { name: "CrackStation", url: "https://crackstation.net/" },
  { name: "Hashes.com", url: (h: string) => `https://hashes.com/en/decrypt/${h}` },
  { name: "md5decrypt", url: (h: string) => `https://md5decrypt.net/en/` },
  { name: "Hash Toolkit", url: (h: string) => `https://hashtoolkit.com/reverse-hash?hash=${h}` },
  { name: "Nitrxgen", url: (h: string) => `https://www.nitrxgen.io/md5-db/${h}` },
  { name: "md5hashing", url: (h: string) => `https://md5hashing.net/hash/${h}` },
  { name: "Hashes.org", url: (h: string) => `https://hashes.org/search.php?hash=${h}` },
]

const ruleNamesByLength: Record<number, HashRule[]> = {}
for (const r of rules) {
  const len = r.length || 0
  if (!ruleNamesByLength[len]) ruleNamesByLength[len] = []
  ruleNamesByLength[len].push(r)
}

export function getExampleForSlug(slug: string): string | undefined {
  return rules.find(r => r.name.toLowerCase().replace(/[\s\(\)\$]/g, "") === slug.toLowerCase().replace(/[\s\(\)\$]/g, ""))?.example
}
