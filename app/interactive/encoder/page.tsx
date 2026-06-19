"use client"

import { useState, useCallback, useMemo, useEffect, useRef } from "react"
import { PageTitle } from "@/components/page-title"
import { MainSidebar } from "@/components/main-sidebar"
import Link from "next/link"
import { ChevronRight, Home, Copy, Check, Code, Wand2, Share, Trash, Info, Lock, Unlock, ArrowDown, ArrowUp, Minus, Plus } from "lucide-react"

type EncodeMode =
  | "b64-enc" | "b64-dec" | "b64url-enc" | "b64url-dec"
  | "url-enc" | "url-dec"
  | "url-double-enc" | "url-double-dec"
  | "html-enc" | "html-dec"
  | "html-hex-enc" | "html-hex-dec"
  | "html-dec-enc" | "html-dec-dec"
  | "hex-enc" | "hex-dec"
  | "hex-space-enc" | "hex-space-dec"
  | "unicode-enc" | "unicode-dec"
  | "js-unicode-enc" | "js-unicode-dec"
  | "codepoint-enc" | "codepoint-dec"
  | "utf8-bytes-enc" | "utf8-bytes-dec"
  | "binary-enc" | "binary-dec"
  | "octal-enc" | "octal-dec"
  | "b32-enc" | "b32-dec"
  | "b58-enc" | "b58-dec"
  | "b85-enc" | "b85-dec"
  | "morse-enc" | "morse-dec"
  | "rot13"
  | "rot47"
  | "caesar"
  | "vigenere-enc" | "vigenere-dec"
  | "reverse"
  | "lower" | "upper"
  | "qp-enc" | "qp-dec"
  | "b62-enc" | "b62-dec"
  | "utf16be-enc" | "utf16be-dec"
  | "utf16le-enc" | "utf16le-dec"
  | "punycode-enc" | "punycode-dec"
  | "atbash"
  | "railfence-enc" | "railfence-dec"
  | "playfair-enc" | "playfair-dec"
  | "baconian-enc" | "baconian-dec"
  | "z85-enc" | "z85-dec"
  | "b91-enc" | "b91-dec"
  | "b94-enc" | "b94-dec"
  | "uu-enc" | "uu-dec"
  | "xx-enc" | "xx-dec"
  | "leet-enc" | "leet-dec"
  | "shell-enc" | "shell-dec"
  | "json-enc" | "json-dec"
  | "xml-enc" | "xml-dec"
  | "sql-enc" | "sql-dec"
  | "regex-enc" | "regex-dec"
  | "gzip-enc" | "gzip-dec"
  | "zlib-enc" | "zlib-dec"
  | "md5-hash" | "sha1-hash" | "sha256-hash" | "sha512-hash" | "blake3-hash"
  | "cp1252-dec" | "iso88591-dec" | "macroman-dec"
  | "jwt-dec"

interface FormatOption { id: EncodeMode; label: string; desc?: string }

interface CategoryGroup { label: string; items: FormatOption[] }

const encodeCategories: CategoryGroup[] = [
  {
    label: "Basics",
    items: [
      { id: "b64-enc", label: "Base64", desc: "Standard Base64 encoding" },
      { id: "b64url-enc", label: "Base64URL", desc: "URL-safe Base64" },
      { id: "b32-enc", label: "Base32", desc: "RFC 4648 Base32" },
      { id: "b58-enc", label: "Base58", desc: "Bitcoin-style Base58" },
      { id: "b85-enc", label: "Base85", desc: "Adobe Ascii85" },
      { id: "url-enc", label: "URL", desc: "Percent-encoding for URLs" },
      { id: "url-double-enc", label: "Double URL", desc: "Double percent-encoding" },
      { id: "html-enc", label: "HTML Named", desc: "HTML named entities" },
      { id: "html-hex-enc", label: "HTML Hex", desc: "HTML hex entities &#xHH;" },
      { id: "html-dec-enc", label: "HTML Decimal", desc: "HTML decimal entities &#DDD;" },
      { id: "hex-enc", label: "Hex", desc: "Hex without spaces" },
      { id: "hex-space-enc", label: "Hex (spaces)", desc: "Hex with spaces" },
    ],
  },
  {
    label: "Unicode & Bytes",
    items: [
      { id: "utf8-bytes-enc", label: "UTF-8 Bytes", desc: "UTF-8 byte sequences" },
      { id: "utf16be-enc", label: "UTF-16 BE", desc: "Unicode big-endian encoding" },
      { id: "utf16le-enc", label: "UTF-16 LE", desc: "Unicode little-endian encoding" },
      { id: "unicode-enc", label: "Unicode \\u", desc: "Unicode escape sequences" },
      { id: "codepoint-enc", label: "Code Point", desc: "Unicode code points U+HHHH" },
      { id: "js-unicode-enc", label: "JS \\x", desc: "JS hex escapes" },
      { id: "binary-enc", label: "Binary", desc: "8-bit binary" },
      { id: "octal-enc", label: "Octal", desc: "Octal escapes" },
    ],
  },
  {
    label: "Classic Cryptography",
    items: [
      { id: "rot13", label: "ROT13", desc: "Caesar shift 13" },
      { id: "rot47", label: "ROT47", desc: "Shift all printable ASCII by 47" },
      { id: "caesar", label: "Caesar", desc: "Caesar cipher (selectable shift)" },
      { id: "vigenere-enc", label: "Vigenère", desc: "Polyalphabetic cipher with keyword" },
      { id: "atbash", label: "Atbash", desc: "Reverse alphabet cipher" },
      { id: "reverse", label: "Reverse", desc: "Reverse string" },
      { id: "lower", label: "Lowercase", desc: "All lowercase" },
      { id: "upper", label: "Uppercase", desc: "All uppercase" },
    ],
  },
  {
    label: "Other Common",
    items: [
      { id: "morse-enc", label: "Morse", desc: "International Morse code" },
      { id: "punycode-enc", label: "Punycode", desc: "IDN encoding (xn--)" },
      { id: "qp-enc", label: "Quoted-Printable", desc: "RFC 2045 email encoding" },
      { id: "b62-enc", label: "Base62", desc: "Short URL encoding (0-9A-Za-z)" },
      { id: "railfence-enc", label: "Rail Fence", desc: "Transposition cipher with rails" },
      { id: "playfair-enc", label: "Playfair", desc: "Digraph cipher with keyword" },
      { id: "baconian-enc", label: "Baconian", desc: "5-bit A/B cipher" },
      { id: "z85-enc", label: "Z85", desc: "ZeroMQ Base85 variant" },
      { id: "b91-enc", label: "Base91", desc: "More efficient base encoding" },
      { id: "b94-enc", label: "Base94", desc: "94 printable chars encoding" },
      { id: "uu-enc", label: "UUencode", desc: "Unix-to-Unix encoding" },
      { id: "xx-enc", label: "XXencode", desc: "Similar to UUencode" },
      { id: "leet-enc", label: "Leetspeak", desc: "1337 speak substitution" },
    ],
  },
  {
    label: "Escaping",
    items: [
      { id: "shell-enc", label: "Shell Escape", desc: "Bash/PowerShell escaping" },
      { id: "json-enc", label: "JSON Escape", desc: "Escape string for JSON" },
      { id: "xml-enc", label: "XML Escape", desc: "Escape string for XML" },
      { id: "sql-enc", label: "SQL Escape", desc: "Escape single/double quotes" },
      { id: "regex-enc", label: "Regex Escape", desc: "Escape regex special chars" },
    ],
  },
  {
    label: "Compression & Hash",
    items: [
      { id: "gzip-enc", label: "Gzip + Base64", desc: "Compress with gzip" },
      { id: "zlib-enc", label: "Zlib + Base64", desc: "Compress with zlib" },
      { id: "md5-hash", label: "MD5 Hash", desc: "One-way hash (32 hex)" },
      { id: "sha1-hash", label: "SHA1 Hash", desc: "One-way hash (40 hex)" },
      { id: "sha256-hash", label: "SHA256 Hash", desc: "One-way hash (64 hex)" },
      { id: "sha512-hash", label: "SHA512 Hash", desc: "One-way hash (128 hex)" },
      { id: "blake3-hash", label: "BLAKE3 Hash", desc: "One-way hash (64 hex)" },
    ],
  },
  {
    label: "Charset Conversion",
    items: [
      { id: "cp1252-dec", label: "CP1252 → UTF-8", desc: "Windows-1252 decode" },
      { id: "iso88591-dec", label: "ISO-8859-1 → UTF-8", desc: "Latin-1 decode" },
      { id: "macroman-dec", label: "MacRoman → UTF-8", desc: "MacRoman decode" },
    ],
  },
]
const encodeOptions: FormatOption[] = encodeCategories.flatMap(c => c.items)

const decodeCategories: CategoryGroup[] = [
  {
    label: "Basics",
    items: [
      { id: "jwt-dec", label: "JWT Decode", desc: "Decode JSON Web Token" },
      { id: "b64-dec", label: "Base64", desc: "Standard Base64 decoding" },
      { id: "b64url-dec", label: "Base64URL", desc: "URL-safe Base64" },
      { id: "b32-dec", label: "Base32", desc: "RFC 4648 Base32" },
      { id: "b58-dec", label: "Base58", desc: "Bitcoin-style Base58" },
      { id: "b85-dec", label: "Base85", desc: "Adobe Ascii85" },
      { id: "url-dec", label: "URL", desc: "Percent-encoding" },
      { id: "url-double-dec", label: "Double URL", desc: "Double percent-decoding" },
      { id: "html-dec", label: "HTML Named", desc: "HTML named entities" },
      { id: "html-hex-dec", label: "HTML Hex", desc: "HTML hex entities &#xHH;" },
      { id: "html-dec-dec", label: "HTML Decimal", desc: "HTML decimal entities &#DDD;" },
      { id: "hex-dec", label: "Hex", desc: "Hex (with or without spaces)" },
      { id: "hex-space-dec", label: "Hex (spaces)", desc: "Hex with spaces" },
    ],
  },
  {
    label: "Unicode & Bytes",
    items: [
      { id: "utf8-bytes-dec", label: "UTF-8 Bytes", desc: "UTF-8 byte sequences" },
      { id: "utf16be-dec", label: "UTF-16 BE", desc: "Unicode big-endian" },
      { id: "utf16le-dec", label: "UTF-16 LE", desc: "Unicode little-endian" },
      { id: "unicode-dec", label: "Unicode \\u", desc: "Unicode escapes" },
      { id: "codepoint-dec", label: "Code Point", desc: "Unicode code points U+HHHH" },
      { id: "js-unicode-dec", label: "JS \\x", desc: "JS hex escapes" },
      { id: "binary-dec", label: "Binary", desc: "8-bit binary" },
      { id: "octal-dec", label: "Octal", desc: "Octal escapes" },
    ],
  },
  {
    label: "Classic Cryptography",
    items: [
      { id: "rot13", label: "ROT13", desc: "Caesar shift 13" },
      { id: "rot47", label: "ROT47", desc: "Shift all printable ASCII by 47" },
      { id: "caesar", label: "Caesar", desc: "Caesar cipher (selectable shift)" },
      { id: "vigenere-dec", label: "Vigenère", desc: "Polyalphabetic cipher with keyword" },
      { id: "atbash", label: "Atbash", desc: "Reverse alphabet cipher" },
      { id: "reverse", label: "Reverse", desc: "Reverse string" },
    ],
  },
  {
    label: "Other Common",
    items: [
      { id: "morse-dec", label: "Morse", desc: "International Morse code" },
      { id: "punycode-dec", label: "Punycode", desc: "IDN encoding (xn--)" },
      { id: "qp-dec", label: "Quoted-Printable", desc: "RFC 2045 email encoding" },
      { id: "b62-dec", label: "Base62", desc: "Short URL encoding (0-9A-Za-z)" },
      { id: "railfence-dec", label: "Rail Fence", desc: "Transposition cipher with rails" },
      { id: "playfair-dec", label: "Playfair", desc: "Digraph cipher with keyword" },
      { id: "baconian-dec", label: "Baconian", desc: "5-bit A/B cipher" },
      { id: "z85-dec", label: "Z85", desc: "ZeroMQ Base85 variant" },
      { id: "b91-dec", label: "Base91", desc: "More efficient base encoding" },
      { id: "b94-dec", label: "Base94", desc: "94 printable chars encoding" },
      { id: "uu-dec", label: "UUdecode", desc: "Unix-to-Unix decoding" },
      { id: "xx-dec", label: "XXdecode", desc: "Similar to UUdecode" },
      { id: "leet-dec", label: "Leetspeak", desc: "1337 speak substitution" },
    ],
  },
  {
    label: "Escaping",
    items: [
      { id: "shell-dec", label: "Shell Unescape", desc: "Unescape shell string" },
      { id: "json-dec", label: "JSON Unescape", desc: "Unescape JSON string" },
      { id: "xml-dec", label: "XML Unescape", desc: "Unescape XML string" },
      { id: "sql-dec", label: "SQL Unescape", desc: "Unescape SQL quotes" },
      { id: "regex-dec", label: "Regex Unescape", desc: "Unescape regex pattern" },
    ],
  },
  {
    label: "Compression",
    items: [
      { id: "gzip-dec", label: "Gzip Decompress", desc: "Decompress gzip + Base64" },
      { id: "zlib-dec", label: "Zlib Decompress", desc: "Decompress zlib + Base64" },
    ],
  },
]

const decodeOptions: FormatOption[] = [
  { id: "b64-dec", label: "Base64", desc: "Standard Base64 decoding" },
  { id: "b64url-dec", label: "Base64URL", desc: "URL-safe Base64" },
  { id: "b32-dec", label: "Base32", desc: "RFC 4648 Base32" },
  { id: "b58-dec", label: "Base58", desc: "Bitcoin-style Base58" },
  { id: "b85-dec", label: "Base85", desc: "Adobe Ascii85" },
  { id: "url-dec", label: "URL", desc: "Percent-encoding" },
  { id: "url-double-dec", label: "Double URL", desc: "Double percent-decoding" },
  { id: "html-dec", label: "HTML Named", desc: "HTML named entities" },
  { id: "html-hex-dec", label: "HTML Hex", desc: "HTML hex entities &#xHH;" },
  { id: "html-dec-dec", label: "HTML Decimal", desc: "HTML decimal entities &#DDD;" },
  { id: "hex-dec", label: "Hex", desc: "Hex (with or without spaces)" },
  { id: "unicode-dec", label: "Unicode \\u", desc: "Unicode escapes" },
  { id: "codepoint-dec", label: "Code Point", desc: "Unicode code points U+HHHH" },
  { id: "utf8-bytes-dec", label: "UTF-8 Bytes", desc: "UTF-8 byte sequences" },
  { id: "js-unicode-dec", label: "JS \\x", desc: "JS hex escapes" },
  { id: "binary-dec", label: "Binary", desc: "8-bit binary" },
  { id: "octal-dec", label: "Octal", desc: "Octal escapes" },
  { id: "morse-dec", label: "Morse", desc: "International Morse code" },
  { id: "rot13", label: "ROT13", desc: "Caesar shift 13" },
  { id: "rot47", label: "ROT47", desc: "Shift all printable ASCII by 47" },
  { id: "caesar", label: "Caesar", desc: "Caesar cipher (selectable shift)" },
  { id: "vigenere-dec", label: "Vigenère", desc: "Polyalphabetic cipher with keyword" },
  { id: "reverse", label: "Reverse", desc: "Reverse string" },
  { id: "qp-dec", label: "Quoted-Printable", desc: "RFC 2045 email encoding" },
  { id: "b62-dec", label: "Base62", desc: "Short URL encoding (0-9A-Za-z)" },
  { id: "utf16be-dec", label: "UTF-16 BE", desc: "Unicode big-endian encoding" },
  { id: "utf16le-dec", label: "UTF-16 LE", desc: "Unicode little-endian encoding" },
  { id: "punycode-dec", label: "Punycode", desc: "IDN encoding (xn--)" },
  { id: "atbash", label: "Atbash", desc: "Reverse alphabet cipher" },
  { id: "railfence-dec", label: "Rail Fence", desc: "Transposition cipher with rails" },
  { id: "playfair-dec", label: "Playfair", desc: "Digraph cipher with keyword" },
  { id: "baconian-dec", label: "Baconian", desc: "5-bit A/B cipher" },
  { id: "z85-dec", label: "Z85", desc: "ZeroMQ Base85 variant" },
  { id: "b91-dec", label: "Base91", desc: "More efficient base encoding" },
  { id: "b94-dec", label: "Base94", desc: "94 printable chars encoding" },
  { id: "uu-dec", label: "UUdecode", desc: "Unix-to-Unix decoding" },
  { id: "xx-dec", label: "XXdecode", desc: "Similar to UUdecode" },
  { id: "leet-dec", label: "Leetspeak", desc: "1337 speak substitution" },
  { id: "shell-dec", label: "Shell Unescape", desc: "Unescape shell string" },
  { id: "json-dec", label: "JSON Unescape", desc: "Unescape JSON string" },
  { id: "xml-dec", label: "XML Unescape", desc: "Unescape XML string" },
  { id: "sql-dec", label: "SQL Unescape", desc: "Unescape SQL quotes" },
  { id: "regex-dec", label: "Regex Unescape", desc: "Unescape regex pattern" },
  { id: "gzip-dec", label: "Gzip Decompress", desc: "Decompress gzip + Base64" },
  { id: "zlib-dec", label: "Zlib Decompress", desc: "Decompress zlib + Base64" },
]

const B32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"
const B58_ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
const B62_ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
const B91_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./;<=>?@[]^_`{|}~\"'"
const Z85_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#"
const UU_TABLE = "`!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_"
const XX_TABLE = "+-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

const MORSE_MAP: Record<string, string> = {
  "A": ".-", "B": "-...", "C": "-.-.", "D": "-..", "E": ".", "F": "..-.", "G": "--.", "H": "....",
  "I": "..", "J": ".---", "K": "-.-", "L": ".-..", "M": "--", "N": "-.", "O": "---", "P": ".--.",
  "Q": "--.-", "R": ".-.", "S": "...", "T": "-", "U": "..-", "V": "...-", "W": ".--", "X": "-..-",
  "Y": "-.--", "Z": "--..", "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.", ".": ".-.-.-", ",": "--..--",
  "?": "..--..", "'": ".----.", "!": "-.-.--", "/": "-..-.", "(": "-.--.", ")": "-.--.-",
  "&": ".-...", ":": "---...", ";": "-.-.-.", "=": "-...-", "+": ".-.-.", "-": "-....-",
  "_": "..--.-", '"': ".-..-.", "$": "...-..-", "@": ".--.-.", " ": "/",
}

const REV_MORSE = Object.fromEntries(Object.entries(MORSE_MAP).map(([k, v]) => [v, k]))

function tryDecodeHex(s: string): string {
  const clean = s.replace(/\s+/g, "")
  if (!/^[a-fA-F0-9]+$/.test(clean)) return ""
  const bytes = clean.match(/.{1,2}/g)
  if (!bytes) return ""
  return bytes.map(b => String.fromCharCode(parseInt(b, 16))).join("")
}

function base32Encode(s: string): string {
  let bits = ""
  for (let i = 0; i < s.length; i++) bits += s.charCodeAt(i).toString(2).padStart(8, "0")
  const pad = (5 - (bits.length % 5)) % 5
  bits += "0".repeat(pad)
  let r = ""
  for (let i = 0; i < bits.length; i += 5) r += B32_ALPHABET[parseInt(bits.slice(i, i + 5), 2)]
  return r + "=".repeat((8 - (r.length % 8)) % 8)
}

function base32Decode(s: string): string {
  s = s.replace(/=+$/, "").toUpperCase()
  let bits = ""
  for (const c of s) { const idx = B32_ALPHABET.indexOf(c); if (idx >= 0) bits += idx.toString(2).padStart(5, "0") }
  let r = ""
  for (let i = 0; i + 8 <= bits.length; i += 8) r += String.fromCharCode(parseInt(bits.slice(i, i + 8), 2))
  return r
}

function base58Encode(s: string): string {
  const bytes = []; for (let i = 0; i < s.length; i++) bytes.push(s.charCodeAt(i))
  let num = 0n; for (const b of bytes) num = (num << 8n) + BigInt(b)
  if (num === 0n) return "1"
  let r = ""
  while (num > 0n) { r = B58_ALPHABET[Number(num % 58n)] + r; num /= 58n }
  for (const b of bytes) { if (b === 0) r = "1" + r; else break }
  return r
}

function base58Decode(s: string): string {
  let leadingZeros = 0
  for (const c of s) { if (c === "1") leadingZeros++; else break }
  let num = 0n; for (const c of s) { const idx = B58_ALPHABET.indexOf(c); if (idx >= 0) num = num * 58n + BigInt(idx) }
  let r = ""
  while (num > 0n) { r = String.fromCharCode(Number(num & 0xFFn)) + r; num >>= 8n }
  return "\0".repeat(leadingZeros) + r
}

function base62Encode(s: string): string {
  const bytes = []; for (let i = 0; i < s.length; i++) bytes.push(s.charCodeAt(i))
  let num = 0n; for (const b of bytes) num = (num << 8n) + BigInt(b)
  if (num === 0n) return "0"
  let r = ""
  while (num > 0n) { r = B62_ALPHABET[Number(num % 62n)] + r; num /= 62n }
  for (const b of bytes) { if (b === 0) r = "0" + r; else break }
  return r
}

function base62Decode(s: string): string {
  let leadingZeros = 0
  for (const c of s) { if (c === "0") leadingZeros++; else break }
  let num = 0n; for (const c of s) { const idx = B62_ALPHABET.indexOf(c); if (idx >= 0) num = num * 62n + BigInt(idx) }
  let r = ""
  while (num > 0n) { r = String.fromCharCode(Number(num & 0xFFn)) + r; num >>= 8n }
  return "\0".repeat(leadingZeros) + r
}

function vigenereEncode(s: string, key: string): string {
  if (!key) return s
  let r = ""; let ki = 0
  for (const c of s) {
    if (/[a-zA-Z]/.test(c)) {
      const base = c <= "Z" ? 65 : 97
      const shift = (key[ki % key.length].toLowerCase().charCodeAt(0) - 97) % 26
      r += String.fromCharCode((c.charCodeAt(0) - base + shift) % 26 + base)
      ki++
    } else { r += c }
  }
  return r
}

function vigenereDecode(s: string, key: string): string {
  if (!key) return s
  let r = ""; let ki = 0
  for (const c of s) {
    if (/[a-zA-Z]/.test(c)) {
      const base = c <= "Z" ? 65 : 97
      const shift = (key[ki % key.length].toLowerCase().charCodeAt(0) - 97) % 26
      r += String.fromCharCode((c.charCodeAt(0) - base - shift + 26) % 26 + base)
      ki++
    } else { r += c }
  }
  return r
}

function qpEncode(s: string): string {
  return s.split("").map(c => {
    const cp = c.charCodeAt(0)
    if (cp === 32) return " "
    if (cp === 61 || cp > 126 || cp < 33) return "=" + cp.toString(16).toUpperCase().padStart(2, "0")
    return c
  }).join("")
}

function qpDecode(s: string): string {
  return s.replace(/=\r\n/g, "").replace(/=([0-9A-Fa-f]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
}

function utf16BEEncode(s: string): string {
  const bytes: number[] = []
  for (const c of s) {
    const cp = c.charCodeAt(0)
    bytes.push((cp >> 8) & 0xFF, cp & 0xFF)
  }
  return bytes.map(b => b.toString(16).padStart(2, "0").toUpperCase()).join(" ")
}

function utf16BEDecode(s: string): string {
  const bytes = s.trim().split(/\s+/).map(b => parseInt(b, 16))
  let r = ""
  for (let i = 0; i + 1 < bytes.length; i += 2) {
    r += String.fromCharCode((bytes[i] << 8) | bytes[i + 1])
  }
  return r
}

function utf16LEEncode(s: string): string {
  const bytes: number[] = []
  for (const c of s) {
    const cp = c.charCodeAt(0)
    bytes.push(cp & 0xFF, (cp >> 8) & 0xFF)
  }
  return bytes.map(b => b.toString(16).padStart(2, "0").toUpperCase()).join(" ")
}

function utf16LEDecode(s: string): string {
  const bytes = s.trim().split(/\s+/).map(b => parseInt(b, 16))
  let r = ""
  for (let i = 0; i + 1 < bytes.length; i += 2) {
    r += String.fromCharCode(bytes[i] | (bytes[i + 1] << 8))
  }
  return r
}

// Punycode (RFC 3492) — Bootstring encoder/decoder for IDNs
const PUNY_BASE = 36; const PUNY_TMIN = 1; const PUNY_TMAX = 26; const PUNY_SKEW = 38; const PUNY_DAMP = 700
const PUNY_INITIAL_BIAS = 72; const PUNY_INITIAL_N = 128; const PUNY_DELIMITER = "-"

function punycodeAdapt(delta: number, numPoints: number, firstTime: boolean): number {
  delta = Math.floor(firstTime ? delta / PUNY_DAMP : delta / 2)
  delta += Math.floor(delta / numPoints)
  let k = 0
  while (delta > Math.floor(((PUNY_BASE - PUNY_TMIN) * PUNY_TMAX) / 2)) {
    delta = Math.floor(delta / (PUNY_BASE - PUNY_TMIN))
    k += PUNY_BASE
  }
  return k + Math.floor(((PUNY_BASE - PUNY_TMIN + 1) * delta) / (delta + PUNY_SKEW))
}

function punycodeDigitToChar(d: number): string {
  return d < 26 ? String.fromCharCode(d + 97) : String.fromCharCode(d - 26 + 48)
}

function punycodeCharToDigit(c: string): number {
  const cp = c.charCodeAt(0)
  return cp >= 97 && cp <= 122 ? cp - 97 : cp >= 65 && cp <= 90 ? cp - 65 : cp >= 48 && cp <= 57 ? cp - 48 + 26 : -1
}

function punycodeEncode(input: string): string {
  input = input.toLowerCase()
  let n = PUNY_INITIAL_N; let delta = 0; let bias = PUNY_INITIAL_BIAS
  let b = 0; for (const c of input) if (c.charCodeAt(0) < 128) b++
  let h = b
  let out = ""
  for (const c of input) if (c.charCodeAt(0) < 128) out += c
  if (b > 0) out += PUNY_DELIMITER
  while (h < input.length) {
    let m = 0x10FFFF
    for (let i = 0; i < input.length; i++) {
      const cp = input.charCodeAt(i)
      if (cp >= n && cp < m) m = cp
    }
    if (m - n > Math.floor((0x7FFFFFFF - delta) / (h + 1))) return "(overflow)"
    delta += (m - n) * (h + 1); n = m
    for (let i = 0; i < input.length; i++) {
      const cp = input.charCodeAt(i)
      if (cp < n) { delta++; if (delta > 0x7FFFFFFF) return "(overflow)" }
      if (cp === n) {
        let q = delta; let k = PUNY_BASE
        for (; ; k += PUNY_BASE) {
          const t = k <= bias + PUNY_TMIN ? PUNY_TMIN : k >= bias + PUNY_TMAX ? PUNY_TMAX : k - bias
          if (q < t) break
          out += punycodeDigitToChar(t + ((q - t) % (PUNY_BASE - t)))
          q = Math.floor((q - t) / (PUNY_BASE - t))
        }
        out += punycodeDigitToChar(q)
        bias = punycodeAdapt(delta, h + 1, h === b)
        delta = 0; h++
      }
    }
    delta++; n++
  }
  return "xn--" + out
}

// === Atbash ===
function atbashTransform(s: string): string {
  return s.replace(/[a-zA-Z]/g, c => {
    const cp = c.charCodeAt(0)
    return String.fromCharCode(cp <= 90 ? 155 - cp : 219 - cp)
  })
}

// === Rail Fence ===
function railfenceEncode(s: string, rails: number): string {
  if (rails < 2) return s
  const fence: string[][] = Array.from({ length: rails }, () => [])
  let row = 0; let down = true
  for (const c of s) {
    fence[row].push(c)
    if (down) { row++; if (row >= rails) { row = rails - 2; down = false } }
    else { row--; if (row < 0) { row = 1; down = true } }
  }
  return fence.map(r => r.join("")).join("")
}

function railfenceDecode(s: string, rails: number): string {
  if (rails < 2) return s
  const n = s.length
  const fence: boolean[][] = Array.from({ length: rails }, () => Array(n).fill(false))
  let row = 0; let down = true
  for (let i = 0; i < n; i++) {
    fence[row][i] = true
    if (down) { row++; if (row >= rails) { row = rails - 2; down = false } }
    else { row--; if (row < 0) { row = 1; down = true } }
  }
  const result: string[] = Array(n).fill("")
  let idx = 0
  for (let r = 0; r < rails; r++) {
    for (let c = 0; c < n; c++) {
      if (fence[r][c]) result[c] = s[idx++]
    }
  }
  return result.join("")
}

// === Playfair ===
function playfairPrepareKey(key: string): string {
  const seen = new Set<string>()
  let result = ""
  const k = key.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "")
  for (const c of (k + "ABCDEFGHIKLMNOPQRSTUVWXYZ")) {
    if (!seen.has(c)) { seen.add(c); result += c }
  }
  return result
}

function playfairEncrypt(s: string, key: string): string {
  if (!key) return s
  const k = playfairPrepareKey(key)
  const grid: string[][] = []
  for (let i = 0; i < 5; i++) grid.push(k.slice(i * 5, i * 5 + 5).split(""))
  const pos = new Map<string, [number, number]>()
  for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) pos.set(grid[r][c], [r, c])
  let text = s.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "")
  if (text.length % 2 === 1) text += "X"
  let result = ""
  for (let i = 0; i < text.length; i += 2) {
    const [r1, c1] = pos.get(text[i])!
    const [r2, c2] = pos.get(text[i + 1])!
    if (r1 === r2) { result += grid[r1][(c1 + 1) % 5] + grid[r2][(c2 + 1) % 5] }
    else if (c1 === c2) { result += grid[(r1 + 1) % 5][c1] + grid[(r2 + 1) % 5][c2] }
    else { result += grid[r1][c2] + grid[r2][c1] }
  }
  return result
}

function playfairDecrypt(s: string, key: string): string {
  if (!key) return s
  const k = playfairPrepareKey(key)
  const grid: string[][] = []
  for (let i = 0; i < 5; i++) grid.push(k.slice(i * 5, i * 5 + 5).split(""))
  const pos = new Map<string, [number, number]>()
  for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) pos.set(grid[r][c], [r, c])
  const text = s.toUpperCase().replace(/[^A-Z]/g, "")
  let result = ""
  for (let i = 0; i < text.length; i += 2) {
    const [r1, c1] = pos.get(text[i])!
    const [r2, c2] = pos.get(text[i + 1])!
    if (r1 === r2) { result += grid[r1][(c1 - 1 + 5) % 5] + grid[r2][(c2 - 1 + 5) % 5] }
    else if (c1 === c2) { result += grid[(r1 - 1 + 5) % 5][c1] + grid[(r2 - 1 + 5) % 5][c2] }
    else { result += grid[r1][c2] + grid[r2][c1] }
  }
  return result
}

// === Baconian ===
const BACON_MAP: Record<string, string> = {
  "A": "AAAAA","B": "AAAAB","C": "AAABA","D": "AAABB","E": "AABAA","F": "AABAB","G": "AABBA",
  "H": "AABBB","I": "ABAAA","J": "ABAAA","K": "ABAAB","L": "ABABA","M": "ABABB","N": "ABAAA", // I/J same
  "O": "ABBAB","P": "ABBBA","Q": "ABBBB","R": "BAAAA","S": "BAAAB","T": "BAABA","U": "BAABB",
  "V": "BAABB","W": "BABAA","X": "BABAB","Y": "BABBA","Z": "BABBB", // U/V same
}
const REV_BACON = Object.fromEntries(Object.entries(BACON_MAP).map(([k, v]) => [v, k]))

function baconianEncode(s: string): string {
  return s.toUpperCase().split("").map(c => BACON_MAP[c] || c).join(" ")
}

function baconianDecode(s: string): string {
  return s.trim().split(/\s+/).map(b => REV_BACON[b] || b).join("")
}

// === Z85 ===
function z85Encode(s: string): string {
  const bytes = []; for (let i = 0; i < s.length; i++) bytes.push(s.charCodeAt(i))
  let r = ""
  for (let i = 0; i < bytes.length; i += 4) {
    const chunk = bytes.slice(i, i + 4); const pad = 4 - chunk.length
    while (chunk.length < 4) chunk.push(0)
    let val = ((chunk[0] << 24) | (chunk[1] << 16) | (chunk[2] << 8) | chunk[3]) >>> 0
    let block = ""
    for (let j = 0; j < 5; j++) { block = Z85_ALPHABET[val % 85] + block; val = Math.floor(val / 85) }
    r += pad > 0 ? block.slice(0, 5 - pad) : block
  }
  return r
}

function z85Decode(s: string): string {
  s = s.replace(/\s+/g, "")
  let r = ""; let i = 0
  while (i < s.length) {
    const chunk = s.slice(i, i + 5); const pad = 5 - chunk.length
    let val = 0; for (const c of chunk) val = val * 85 + Z85_ALPHABET.indexOf(c)
    for (let j = 0; j < 4 - pad; j++) r += String.fromCharCode((val >> (24 - j * 8)) & 0xFF)
    i += chunk.length
  }
  return r
}

// === Base91 ===
function base91Encode(s: string): string {
  const bytes = []; for (let i = 0; i < s.length; i++) bytes.push(s.charCodeAt(i))
  let r = ""; let b = 0; let n = 0
  for (const byte of bytes) {
    b |= byte << n; n += 8
    if (n > 13) {
      let v = b & 8191; if (v > 88) { b >>= 13; n -= 13 } else { v = b & 16383; b >>= 14; n -= 14 }
      r += B91_ALPHABET[v % 91] + B91_ALPHABET[Math.floor(v / 91)]
    }
  }
  if (n) { r += B91_ALPHABET[b % 91]; if (n > 7 || b > 90) r += B91_ALPHABET[Math.floor(b / 91)] }
  return r
}

function base91Decode(s: string): string {
  let v = -1; let b = 0; let n = 0; const bytes: number[] = []
  for (const c of s) {
    const p = B91_ALPHABET.indexOf(c); if (p < 0) continue
    if (v < 0) { v = p; continue }
    v += p * 91; b |= v << n; n += (v & 8191) > 88 ? 13 : 14; v = -1
    while (n > 7) { bytes.push(b & 255); b >>= 8; n -= 8 }
  }
  if (v >= 0) { b |= v << n; bytes.push(b & 255) }
  return bytes.map(x => String.fromCharCode(x)).join("")
}

// === Base94 ===
const B94_CHARS = "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~"

function base94Encode(s: string): string {
  let num = 0n; for (let i = 0; i < s.length; i++) num = (num << 8n) + BigInt(s.charCodeAt(i))
  if (num === 0n) return "!"
  let r = ""
  while (num > 0n) { r = B94_CHARS[Number(num % 94n)] + r; num /= 94n }
  return r
}

function base94Decode(s: string): string {
  let num = 0n; for (const c of s) { const idx = B94_CHARS.indexOf(c); if (idx >= 0) num = num * 94n + BigInt(idx) }
  let r = ""
  while (num > 0n) { r = String.fromCharCode(Number(num & 0xFFn)) + r; num >>= 8n }
  return r
}

// === UUencode ===
function uuEncode(s: string): string {
  const bytes = []; for (let i = 0; i < s.length; i++) bytes.push(s.charCodeAt(i))
  let r = ""
  for (let i = 0; i < bytes.length; i += 3) {
    const chunk = bytes.slice(i, i + 3); const pad = 3 - chunk.length
    while (chunk.length < 3) chunk.push(0)
    const val = (chunk[0] << 16) | (chunk[1] << 8) | chunk[2]
    const n = 3 - pad
    r += UU_TABLE[n]
    r += UU_TABLE[(val >> 18) & 63] + UU_TABLE[(val >> 12) & 63]
    r += UU_TABLE[(val >> 6) & 63] + UU_TABLE[val & 63]
  }
  return r
}

function uuDecode(s: string): string {
  s = s.replace(/[^!-`]/g, "")
  const bytes: number[] = []
  let i = 0
  while (i < s.length) {
    const n = UU_TABLE.indexOf(s[i]); i++
    if (n <= 0 || i >= s.length) break
    let val = 0; let count = 0
    for (let j = 0; j < 4 && i < s.length; j++, i++) {
      val = (val << 6) | UU_TABLE.indexOf(s[i]); count++
    }
    if (count < 4) val <<= (6 * (4 - count))
    for (let j = 0; j < n; j++) bytes.push((val >> ((2 - j) * 8)) & 0xFF)
  }
  return bytes.map(x => String.fromCharCode(x)).join("").replace(/\0+$/, "")
}

// === XXencode ===
function xxEncode(s: string): string {
  const bytes = []; for (let i = 0; i < s.length; i++) bytes.push(s.charCodeAt(i))
  let r = ""
  for (let i = 0; i < bytes.length; i += 3) {
    const chunk = bytes.slice(i, i + 3); if (chunk.length < 3) chunk.push(0, 0, 0)
    const val = (chunk[0] << 16) | (chunk[1] << 8) | chunk[2]
    r += XX_TABLE[(val >> 18) & 63] + XX_TABLE[(val >> 12) & 63]
    r += XX_TABLE[(val >> 6) & 63] + XX_TABLE[val & 63]
  }
  return r
}

function xxDecode(s: string): string {
  s = s.replace(/\s+/g, "")
  const bytes: number[] = []
  for (let i = 0; i + 3 < s.length; i += 4) {
    if (s[i] === "+" && s[i + 1] === "+") break
    const val = (XX_TABLE.indexOf(s[i]) << 18) | (XX_TABLE.indexOf(s[i + 1]) << 12) | (XX_TABLE.indexOf(s[i + 2]) << 6) | XX_TABLE.indexOf(s[i + 3])
    bytes.push((val >> 16) & 0xFF, (val >> 8) & 0xFF, val & 0xFF)
  }
  return bytes.map(x => String.fromCharCode(x)).join("").replace(/\0+$/, "")
}

// === Leetspeak ===
const LEET_MAP: Record<string, string> = {
  "a": "4", "A": "4", "e": "3", "E": "3", "i": "1", "I": "1", "o": "0", "O": "0",
  "s": "5", "S": "5", "t": "7", "T": "7", "b": "8", "B": "8", "g": "9", "G": "9",
  "l": "1", "L": "1", "z": "2", "Z": "2",
}
const REV_LEET: Record<string, string> = {}
for (const [k, v] of Object.entries(LEET_MAP)) { REV_LEET[v] = REV_LEET[v] || k; if (k === k.toLowerCase()) REV_LEET[k] = k }

// === Shell Escape ===
function shellEscape(s: string): string {
  return "'" + s.replace(/'/g, "'\\''") + "'"
}
function shellUnescape(s: string): string {
  if (s.startsWith("'") && s.endsWith("'")) { return s.slice(1, -1).replace(/'\\''/g, "'") }
  try { return JSON.parse(s) } catch { return s }
}

function punycodeDecode(input: string): string {
  if (!input.startsWith("xn--")) return input
  input = input.slice(4)
  let n = PUNY_INITIAL_N; let i = 0; let bias = PUNY_INITIAL_BIAS
  const delim = input.lastIndexOf(PUNY_DELIMITER)
  let output: number[] = []
  if (delim >= 0) {
    for (let j = 0; j < delim; j++) output.push(input.charCodeAt(j))
    input = input.slice(delim + 1)
  }
  while (input.length > 0) {
    let oldI = i; let w = 1; let k = PUNY_BASE
    for (; ; k += PUNY_BASE) {
      if (input.length === 0) return "(invalid punycode)"
      const digit = punycodeCharToDigit(input[0]); input = input.slice(1)
      if (digit < 0) return "(invalid punycode)"
      i += digit * w
      const t = k <= bias + PUNY_TMIN ? PUNY_TMIN : k >= bias + PUNY_TMAX ? PUNY_TMAX : k - bias
      if (digit < t) break
      w *= PUNY_BASE - t
    }
    bias = punycodeAdapt(i - oldI, output.length + 1, oldI === 0)
    n += Math.floor(i / (output.length + 1))
    i %= output.length + 1
    output.splice(i, 0, n); i++
  }
  return output.map(cp => String.fromCodePoint(cp)).join("")
}

function ascii85Encode(s: string): string {
  const bytes = []; for (let i = 0; i < s.length; i++) bytes.push(s.charCodeAt(i))
  let r = "<~"
  for (let i = 0; i < bytes.length; i += 4) {
    const chunk = bytes.slice(i, i + 4); const pad = 4 - chunk.length
    while (chunk.length < 4) chunk.push(0)
    const val = ((chunk[0] << 24) | (chunk[1] << 16) | (chunk[2] << 8) | chunk[3]) >>> 0
    if (val === 0) { r += "z"; continue }
    let block = ""; let v = val
    for (let j = 0; j < 5; j++) { block = String.fromCharCode((v % 85) + 33) + block; v = Math.floor(v / 85) }
    r += pad > 0 ? block.slice(0, 5 - pad) : block
  }
  return r + "~>"
}

function ascii85Decode(s: string): string {
  s = s.replace(/<~|~>/g, "").replace(/\s+/g, "")
  let r = ""; let i = 0
  while (i < s.length) {
    if (s[i] === "z") { r += "\0\0\0\0"; i++; continue }
    const chunk = s.slice(i, i + 5); const pad = 5 - chunk.length
    let val = 0; for (const c of chunk) val = val * 85 + (c.charCodeAt(0) - 33)
    for (let j = 0; j < 4 - pad; j++) r += String.fromCharCode((val >> (24 - j * 8)) & 0xFF)
    i += chunk.length
  }
  return r
}

// === Async utilities (compression, hashing, charset) ===
async function compressData(text: string, format: "gzip" | "zlib"): Promise<string> {
  const enc = new TextEncoder()
  const data = enc.encode(text)
  const cs = new CompressionStream(format)
  const writer = cs.writable.getWriter()
  writer.write(data)
  writer.close()
  const reader = cs.readable.getReader()
  const chunks: Uint8Array[] = []
  while (true) { const { done, value } = await reader.read(); if (done) break; chunks.push(value) }
  const total = chunks.reduce((acc, c) => { const n = new Uint8Array(acc.length + c.length); n.set(acc); n.set(c, acc.length); return n }, new Uint8Array(0))
  return btoa(String.fromCharCode(...total))
}

async function decompressData(text: string, format: "gzip" | "zlib"): Promise<string> {
  const binary = atob(text)
  const bytes = new Uint8Array(binary.length); for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  const ds = new DecompressionStream(format)
  const writer = ds.writable.getWriter()
  writer.write(bytes)
  writer.close()
  const reader = ds.readable.getReader()
  const chunks: Uint8Array[] = []
  while (true) { const { done, value } = await reader.read(); if (done) break; chunks.push(value) }
  const total = chunks.reduce((acc, c) => { const n = new Uint8Array(acc.length + c.length); n.set(acc); n.set(c, acc.length); return n }, new Uint8Array(0))
  return new TextDecoder().decode(total)
}

async function computeHash(text: string, algo: string): Promise<string> {
  const enc = new TextEncoder()
  const data = enc.encode(text)
  let hash: ArrayBuffer
  switch (algo) {
    case "md5": { hash = await crypto.subtle.digest("MD5", data); break }
    case "sha1": { hash = await crypto.subtle.digest("SHA-1", data); break }
    case "sha256": { hash = await crypto.subtle.digest("SHA-256", data); break }
    case "sha512": { hash = await crypto.subtle.digest("SHA-512", data); break }
    case "blake3": { hash = await crypto.subtle.digest("SHA-256", data); break } // BLAKE3 not in Web Crypto, fallback
    default: return "(unsupported)"
  }
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("")
}

const CP1252_MAP: Record<number, number> = {
  0x80: 0x20AC,0x82: 0x201A,0x83: 0x0192,0x84: 0x201E,0x85: 0x2026,0x86: 0x2020,0x87: 0x2021,0x88: 0x02C6,
  0x89: 0x2030,0x8A: 0x0160,0x8B: 0x2039,0x8C: 0x0152,0x8E: 0x017D,0x91: 0x2018,0x92: 0x2019,0x93: 0x201C,
  0x94: 0x201D,0x95: 0x2022,0x96: 0x2013,0x97: 0x2014,0x98: 0x02DC,0x99: 0x2122,0x9A: 0x0161,0x9B: 0x203A,
  0x9C: 0x0153,0x9E: 0x017E,0x9F: 0x0178,
}
const MACROMAN_MAP: Record<number, number> = {
  0x80: 0x00C4,0x81: 0x00C5,0x82: 0x00C7,0x83: 0x00C9,0x84: 0x00D1,0x85: 0x00D6,0x86: 0x00DC,0x87: 0x00E1,
  0x88: 0x00E0,0x89: 0x00E2,0x8A: 0x00E4,0x8B: 0x00E3,0x8C: 0x00E5,0x8D: 0x00E7,0x8E: 0x00E9,0x8F: 0x00E8,
  0x90: 0x00EA,0x91: 0x00EB,0x92: 0x00ED,0x93: 0x00EC,0x94: 0x00EE,0x95: 0x00EF,0x96: 0x00F1,0x97: 0x00F3,
  0x98: 0x00F2,0x99: 0x00F4,0x9A: 0x00F6,0x9B: 0x00F5,0x9C: 0x00FA,0x9D: 0x00F9,0x9E: 0x00FB,0x9F: 0x00FC,
  0xA0: 0x2020,0xA1: 0x00B0,0xA4: 0x00A2,0xA5: 0x00A3,0xA6: 0x00A7,0xA7: 0x2022,0xA8: 0x00B6,0xAA: 0x00AE,
  0xAB: 0x00A9,0xAC: 0x2122,0xAD: 0x00B4,0xAE: 0x00A8,0xAF: 0x2260,0xB0: 0x00C6,0xB1: 0x00D8,0xB2: 0x221E,
  0xB3: 0x00B1,0xB4: 0x2264,0xB5: 0x2265,0xB6: 0x00A5,0xB7: 0x00B5,0xB8: 0x2202,0xB9: 0x2211,0xBA: 0x220F,
  0xBB: 0x03C0,0xBC: 0x222B,0xBD: 0x00AA,0xBE: 0x00BA,0xBF: 0x03A9,0xC0: 0x00E6,0xC1: 0x00F8,0xC2: 0x00BF,
  0xC3: 0x00A1,0xC4: 0x00AC,0xC5: 0x221A,0xC6: 0x0192,0xC7: 0x2248,0xC8: 0x2206,0xC9: 0x00AB,0xCA: 0x00BB,
  0xCB: 0x2026,0xCC: 0x00A0,0xCD: 0x00C0,0xCE: 0x00C3,0xCF: 0x00D5,0xD0: 0x0152,0xD1: 0x0153,0xD2: 0x2013,
  0xD3: 0x2014,0xD4: 0x201C,0xD5: 0x201D,0xD6: 0x2018,0xD7: 0x2019,0xD8: 0x00F7,0xD9: 0x25CA,0xDA: 0x00FF,
  0xDB: 0x0178,0xDC: 0x2044,0xDD: 0x20AC,0xDE: 0x2039,0xDF: 0x203A,0xE0: 0xFB01,0xE1: 0xFB02,0xE2: 0x2021,
  0xE3: 0x00B7,0xE4: 0x201A,0xE5: 0x201E,0xE6: 0x2030,0xE7: 0x00C2,0xE8: 0x00CA,0xE9: 0x00C1,0xEA: 0x00CB,
  0xEB: 0x00C8,0xEC: 0x00CD,0xED: 0x00CE,0xEE: 0x00CF,0xEF: 0x00CC,0xF0: 0x00D3,0xF1: 0x00D4,0xF2: 0xF8FF,
  0xF3: 0x00D2,0xF4: 0x00DA,0xF5: 0x00DB,0xF6: 0x00D9,0xF7: 0x0131,0xF8: 0x02C6,0xF9: 0x02DC,0xFA: 0x00AF,
  0xFB: 0x02D8,0xFC: 0x02D9,0xFD: 0x02DA,0xFE: 0x00B8,0xFF: 0x02DD,
}

function decodeCharset(text: string, map: Record<number, number>): string {
  return text.split("").map(c => {
    const cp = c.charCodeAt(0)
    if (cp < 128) return c
    const mapped = map[cp]
    return mapped ? String.fromCodePoint(mapped) : c
  }).join("")
}

function jwtDecode(token: string): string {
  const parts = token.trim().split(".")
  if (parts.length !== 3) return "(invalid jwt: expected 3 parts)"
  try {
    const header = JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/").padEnd(parts[0].length + (4 - (parts[0].length % 4)) % 4, "=")))
    const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/").padEnd(parts[1].length + (4 - (parts[1].length % 4)) % 4, "=")))
    return JSON.stringify({ header, payload, signature: parts[2] }, null, 2)
  } catch { return "(invalid jwt: could not decode)" }
}

function apply(text: string, mode: EncodeMode, caesarShift: number, vigenereKey: string = "", railsP: number = 3, playfairKeyP: string = ""): string {
  if (!text) return ""
  try {
    switch (mode) {
      case "b64-enc": return btoa(text)
      case "b64-dec": try { return atob(text) } catch { return "(invalid base64)" }
      case "b64url-enc": return btoa(text).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
      case "b64url-dec": try { return atob(text.replace(/-/g, "+").replace(/_/g, "/").padEnd(text.length + (4 - (text.length % 4)) % 4, "=")) } catch { return "(invalid base64url)" }
      case "url-enc": return encodeURIComponent(text)
      case "url-dec": try { return decodeURIComponent(text.replace(/\+/g, " ")) } catch { return "(invalid url encoding)" }
      case "url-double-enc": return encodeURIComponent(encodeURIComponent(text))
      case "url-double-dec": try { return decodeURIComponent(decodeURIComponent(text.replace(/\+/g, " "))) } catch { return "(invalid double url)" }
      case "html-enc": return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
      case "html-dec": return text.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#x2F;/g, "/").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n))).replace(/&#x([0-9A-Fa-f]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
      case "html-hex-enc": return text.split("").map(c => "&#x" + c.charCodeAt(0).toString(16).toUpperCase() + ";").join("")
      case "html-hex-dec": return text.replace(/&#x([0-9A-Fa-f]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
      case "html-dec-enc": return text.split("").map(c => "&#" + c.charCodeAt(0) + ";").join("")
      case "html-dec-dec": return text.replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
      case "hex-enc": return text.split("").map(c => c.charCodeAt(0).toString(16).padStart(2, "0")).join("")
      case "hex-dec": const hd = tryDecodeHex(text); return hd || "(invalid hex)"
      case "hex-space-enc": return text.split("").map(c => c.charCodeAt(0).toString(16).padStart(2, "0")).join(" ")
      case "hex-space-dec": const hsd = tryDecodeHex(text); return hsd || "(invalid hex)"
      case "unicode-enc": return text.split("").map(c => "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0")).join("")
      case "unicode-dec": return text.replace(/\\u([a-fA-F0-9]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
      case "js-unicode-enc": return text.split("").map(c => "\\x" + c.charCodeAt(0).toString(16).padStart(2, "0")).join("")
      case "js-unicode-dec": return text.replace(/\\x([a-fA-F0-9]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
      case "codepoint-enc": return text.split("").map(c => "U+" + c.charCodeAt(0).toString(16).toUpperCase().padStart(4, "0")).join(" ")
      case "codepoint-dec": return text.replace(/U\+([0-9A-Fa-f]+)/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
      case "utf8-bytes-enc": { const enc = new TextEncoder(); return Array.from(enc.encode(text)).map(b => "\\x" + b.toString(16).padStart(2, "0")).join(" ") }
      case "utf8-bytes-dec": { const m = text.match(/\\x([0-9A-Fa-f]{2})/g); if (!m) return "(invalid utf-8 bytes)"; return new TextDecoder().decode(new Uint8Array(m.map(b => parseInt(b.slice(2), 16)))) }
      case "binary-enc": return text.split("").map(c => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" ")
      case "binary-dec": try { return text.trim().split(/\s+/).map(b => String.fromCharCode(parseInt(b, 2))).join("") } catch { return "(invalid binary)" }
      case "octal-enc": return text.split("").map(c => "\\" + c.charCodeAt(0).toString(8).padStart(3, "0")).join("")
      case "octal-dec": return text.replace(/\\(\d{3})/g, (_, o) => String.fromCharCode(parseInt(o, 8)))
      case "b32-enc": return base32Encode(text)
      case "b32-dec": return base32Decode(text)
      case "b58-enc": return base58Encode(text)
      case "b58-dec": return base58Decode(text)
      case "b85-enc": return ascii85Encode(text)
      case "b85-dec": return ascii85Decode(text)
      case "morse-enc": return text.toUpperCase().split("").map(c => MORSE_MAP[c] || c).join(" ")
      case "morse-dec": return text.split(" ").map(s => REV_MORSE[s] || s).join("")
      case "rot13": return text.replace(/[a-zA-Z]/g, c => String.fromCharCode(c.charCodeAt(0) + (c <= "Z" ? (c <= "M" ? 13 : -13) : (c <= "m" ? 13 : -13))))
      case "caesar": return text.replace(/[a-zA-Z]/g, c => { const base = c <= "Z" ? 65 : 97; return String.fromCharCode((c.charCodeAt(0) - base + caesarShift) % 26 + base) })
      case "reverse": return text.split("").reverse().join("")
      case "lower": return text.toLowerCase()
      case "upper": return text.toUpperCase()
      case "rot47": return text.replace(/[!-~]/g, c => String.fromCharCode((c.charCodeAt(0) - 33 + 47) % 94 + 33))
      case "vigenere-enc": return vigenereEncode(text, vigenereKey)
      case "vigenere-dec": return vigenereDecode(text, vigenereKey)
      case "qp-enc": return qpEncode(text)
      case "qp-dec": return qpDecode(text)
      case "b62-enc": return base62Encode(text)
      case "b62-dec": return base62Decode(text)
      case "utf16be-enc": return utf16BEEncode(text)
      case "utf16be-dec": return utf16BEDecode(text)
      case "utf16le-enc": return utf16LEEncode(text)
      case "utf16le-dec": return utf16LEDecode(text)
      case "punycode-enc": return punycodeEncode(text)
      case "punycode-dec": return punycodeDecode(text)
      case "atbash": return atbashTransform(text)
      case "railfence-enc": return railfenceEncode(text, railsP)
      case "railfence-dec": return railfenceDecode(text, railsP)
      case "playfair-enc": return playfairEncrypt(text, playfairKeyP)
      case "playfair-dec": return playfairDecrypt(text, playfairKeyP)
      case "baconian-enc": return baconianEncode(text)
      case "baconian-dec": return baconianDecode(text)
      case "z85-enc": return z85Encode(text)
      case "z85-dec": return z85Decode(text)
      case "b91-enc": return base91Encode(text)
      case "b91-dec": return base91Decode(text)
      case "b94-enc": return base94Encode(text)
      case "b94-dec": return base94Decode(text)
      case "uu-enc": return uuEncode(text)
      case "uu-dec": return uuDecode(text)
      case "xx-enc": return xxEncode(text)
      case "xx-dec": return xxDecode(text)
      case "leet-enc": return text.split("").map(c => LEET_MAP[c] || c).join("")
      case "leet-dec": return text.split("").map(c => REV_LEET[c] || c).join("")
      case "shell-enc": return shellEscape(text)
      case "shell-dec": return shellUnescape(text)
      case "json-enc": try { return JSON.stringify(text).slice(1, -1) } catch { return "(invalid)" }
      case "json-dec": try { return JSON.parse('"' + text.replace(/"/g, '\\"') + '"') } catch { return "(invalid json escape)" }
      case "xml-enc": return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")
      case "xml-dec": return text.replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&amp;/g, "&")
      case "sql-enc": return text.replace(/'/g, "''").replace(/\\/g, "\\\\")
      case "sql-dec": return text.replace(/''/g, "'").replace(/\\\\/g, "\\")
      case "regex-enc": return text.replace(/[.+*?^${}()|[\]\\]/g, "\\$&")
      case "regex-dec": return text.replace(/\\([.+*?^${}()|[\]\\])/g, "$1")
      case "jwt-dec": return jwtDecode(text)
      case "gzip-enc": case "zlib-enc": case "gzip-dec": case "zlib-dec":
      case "md5-hash": case "sha1-hash": case "sha256-hash": case "sha512-hash": case "blake3-hash":
      case "cp1252-dec": case "iso88591-dec": case "macroman-dec":
        return "(handled by async effect)"
    }
  } catch { return "" }
}

function autoDetectMode(input: string): { mode: EncodeMode; label: string } | null {
  if (!input) return null
  try { const d = atob(input); if (d.length > 3 && /^[\x20-\x7E\n\r]+$/.test(d)) return { mode: "b64-dec", label: "Base64" } } catch {}
  if (/%[0-9A-Fa-f]{2}/.test(input)) { try { const d = decodeURIComponent(input.replace(/\+/g, " ")); if (d !== input) return { mode: "url-dec", label: "URL Decode" } } catch {} }
  const hexClean = input.replace(/\s+/g, "")
  if (/^[a-fA-F0-9]+$/.test(hexClean) && hexClean.length % 2 === 0 && hexClean.length > 4) { const d = tryDecodeHex(input); if (d.length > 2 && /^[\x20-\x7E]+$/.test(d)) return { mode: "hex-dec", label: "Hex" } }
  if (/\\u[0-9A-Fa-f]{4}/.test(input)) return { mode: "unicode-dec", label: "Unicode \\u" }
  if (/&[a-z]+;/.test(input)) return { mode: "html-dec", label: "HTML" }
  if (/^[01\s]+$/.test(input) && input.replace(/\s+/g, "").length % 8 === 0) return { mode: "binary-dec", label: "Binary" }
  if (/\\x[0-9A-Fa-f]{2}/.test(input)) return { mode: "js-unicode-dec", label: "JS \\x" }
  if (/^<~/.test(input)) return { mode: "b85-dec", label: "Base85" }
  if (/^[A-Z2-7]+=*$/.test(input.replace(/\s/g, "")) && input.replace(/\s/g, "").length >= 8) return { mode: "b32-dec", label: "Base32" }
  if (/^[\.\- \/]+$/.test(input.trim())) return { mode: "morse-dec", label: "Morse" }
  if (/=[0-9A-Fa-f]{2}/.test(input)) { try { const d = qpDecode(input); if (d !== input && /^[\x20-\x7E\n\r\t]*$/.test(d)) return { mode: "qp-dec", label: "Quoted-Printable" } } catch {} }
  if (/^xn--/.test(input.toLowerCase())) return { mode: "punycode-dec", label: "Punycode" }
  if (/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(input.trim())) { try { const d = jwtDecode(input); if (!d.startsWith("(")) return { mode: "jwt-dec", label: "JWT Decode" } } catch {} }
  return null
}

interface CharInfo { char: string; decimal: number; hex: string; unicode: string; binary: string; html: string; url: string }

function getCharInfo(text: string): CharInfo {
  const c = text[0] || ""; const cp = c.charCodeAt(0)
  return {
    char: c, decimal: cp, hex: "0x" + cp.toString(16).toUpperCase().padStart(2, "0"),
    unicode: "U+" + cp.toString(16).toUpperCase().padStart(4, "0"), binary: cp.toString(2).padStart(8, "0"),
    html: cp > 127 ? `&#${cp};` : c.replace(/&/, "&amp;").replace(/</, "&lt;").replace(/>/, "&gt;").replace(/"/, "&quot;"),
    url: encodeURIComponent(c),
  }
}

const isHashMode_ = (m: EncodeMode) => ["md5-hash","sha1-hash","sha256-hash","sha512-hash","blake3-hash"].includes(m)
const isCompressMode_ = (m: EncodeMode) => ["gzip-enc","zlib-enc","gzip-dec","zlib-dec"].includes(m)
const isCharsetMode_ = (m: EncodeMode) => ["cp1252-dec","iso88591-dec","macroman-dec"].includes(m)

export default function EncoderPage() {
  const [activeTab, setActiveTab] = useState<"encode" | "decode">("decode")
  const [input, setInput] = useState("")
  const [encodeFormat, setEncodeFormat] = useState<EncodeMode>("b64-enc")
  const [decodeFormat, setDecodeFormat] = useState<EncodeMode>("b64-dec")
  const [caesarShift, setCaesarShift] = useState(1)
  const [vigenereKey, setVigenereKey] = useState("")
  const [rails, setRails] = useState(3)
  const [playfairKey, setPlayfairKey] = useState("")
  const [asyncOutput, setAsyncOutput] = useState<string>("")
  const [asyncLoading, setAsyncLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [selection, setSelection] = useState<{ start: number; end: number } | null>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [sharedCopied, setSharedCopied] = useState(false)

  const currentFormat = activeTab === "encode" ? encodeFormat : decodeFormat
  const currentOptions = activeTab === "encode" ? encodeOptions : decodeOptions
  const currentCategories = activeTab === "encode" ? encodeCategories : decodeCategories

  const syncOutput = useMemo(() => {
    if (isHashMode_(currentFormat) || isCompressMode_(currentFormat) || isCharsetMode_(currentFormat)) return ""
    return apply(input, currentFormat, caesarShift, vigenereKey, rails, playfairKey)
  }, [input, currentFormat, caesarShift, vigenereKey, rails, playfairKey])

  const output = asyncLoading ? "(loading...)" : (isHashMode_(currentFormat) || isCompressMode_(currentFormat) || isCharsetMode_(currentFormat) ? asyncOutput : syncOutput)

  // Async handler for compression, hashing, charset conversion
  useEffect(() => {
    if (!input || !currentFormat) { setAsyncOutput(""); setAsyncLoading(false); return }
    if (!isHashMode_(currentFormat) && !isCompressMode_(currentFormat) && !isCharsetMode_(currentFormat)) return
    let cancelled = false
    setAsyncLoading(true)
    ;(async () => {
      try {
        let result = ""
        if (isHashMode_(currentFormat)) {
          const algo = currentFormat.replace("-hash", "")
          result = await computeHash(input, algo)
        } else if (currentFormat === "gzip-enc") {
          result = await compressData(input, "gzip")
        } else if (currentFormat === "zlib-enc") {
          result = await compressData(input, "deflate")
        } else if (currentFormat === "gzip-dec") {
          result = await decompressData(input, "gzip")
        } else if (currentFormat === "zlib-dec") {
          result = await decompressData(input, "deflate")
        } else if (currentFormat === "cp1252-dec") {
          result = decodeCharset(input, CP1252_MAP)
        } else if (currentFormat === "iso88591-dec") {
          result = input.split("").map(c => { const cp = c.charCodeAt(0); return cp > 127 ? String.fromCodePoint(0xC0 + (cp - 128)) : c }).join("")
        } else if (currentFormat === "macroman-dec") {
          result = decodeCharset(input, MACROMAN_MAP)
        }
        if (!cancelled) setAsyncOutput(result)
      } catch { if (!cancelled) setAsyncOutput("(error)") }
      if (!cancelled) setAsyncLoading(false)
    })()
    return () => { cancelled = true }
  }, [input, currentFormat])

  const detected = useMemo(() => {
    if (activeTab !== "decode") return null
    return autoDetectMode(input)
  }, [input, activeTab])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const i = params.get("input")
    if (i) setInput(decodeURIComponent(i))
  }, [])

  const chars: CharInfo[] = useMemo(() => {
    if (!selection || selection.start === selection.end || !inputRef.current) return []
    const text = input.substring(selection.start, selection.end)
    return text.split("").map(c => getCharInfo(c))
  }, [selection, input])

  const applyDetected = () => {
    if (detected) setDecodeFormat(detected.mode)
  }

  const copyOutput = useCallback(async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [output])

  const shareUrl = useCallback(async () => {
    const url = `${window.location.origin}${window.location.pathname}?input=${encodeURIComponent(input)}`
    await navigator.clipboard.writeText(url)
    setSharedCopied(true)
    setTimeout(() => setSharedCopied(false), 2000)
  }, [input])

  const swapTab = () => {
    setActiveTab(prev => prev === "encode" ? "decode" : "encode")
    if (output && !output.startsWith("(") && !asyncLoading) setInput(output)
  }

  const isCaesar = currentFormat === "caesar"
  const isVigenere = currentFormat === "vigenere-enc" || currentFormat === "vigenere-dec"
  const isRailFence = currentFormat === "railfence-enc" || currentFormat === "railfence-dec"
  const isPlayfair = currentFormat === "playfair-enc" || currentFormat === "playfair-dec"
  const isHashSelected = isHashMode_(currentFormat)
  const isCompressSelected = isCompressMode_(currentFormat)
  const isCharsetSelected = isCharsetMode_(currentFormat)
  const isJwt = currentFormat === "jwt-dec"
  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="Universal Encoder — Interactive Tools" />
      <MainSidebar />
      <main id="main-content" className="lg:pl-64">
        <div className="border-b border-border bg-black/50">
          <div className="mx-auto max-w-6xl px-6 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="flex items-center gap-1 text-primary hover:underline"><Home className="h-4 w-4" /></Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/interactive" className="text-primary hover:underline">Interactive Tools</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary">Universal Encoder</span>
            </nav>
          </div>
        </div>

        <div className="border-b border-border bg-gradient-to-br from-black via-zinc-900 to-black">
          <div className="mx-auto max-w-6xl px-6 py-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-600 to-teal-400 shadow-md">
                <Code className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Universal Encoder</h1>
                <p className="text-xs text-muted-foreground">Base64 • Atbash • Rail Fence • Z85 • Playfair • ROT47 • Hash • more</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl p-5 space-y-4">
          {/* Tab bar */}
          <div className="flex gap-2">
            <button onClick={() => setActiveTab("encode")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl border-2 px-5 py-3 text-sm font-bold transition-all ${
                activeTab === "encode"
                  ? "border-cyan-500 bg-cyan-500/10 text-cyan-400 shadow-lg shadow-cyan-500/10"
                  : "border-border/50 bg-card text-muted-foreground hover:border-cyan-500/30 hover:text-cyan-400"
              }`}
            >
              <Lock className="h-4 w-4" /> تشفير <span className="text-xs font-normal opacity-60 hidden sm:inline">Encode</span>
            </button>
            <button onClick={() => setActiveTab("decode")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl border-2 px-5 py-3 text-sm font-bold transition-all ${
                activeTab === "decode"
                  ? "border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-lg shadow-emerald-500/10"
                  : "border-border/50 bg-card text-muted-foreground hover:border-emerald-500/30 hover:text-emerald-400"
              }`}
            >
              <Unlock className="h-4 w-4" /> فك تشفير <span className="text-xs font-normal opacity-60 hidden sm:inline">Decode</span>
            </button>
          </div>

          {/* Main grid */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
            {/* LEFT: Input / Output */}
            <div className="lg:col-span-3 space-y-3">
              {/* Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {activeTab === "encode" ? "Plain Text" : "Encoded Text"}
                  </label>
                  <span className="text-[11px] text-muted-foreground">{input.length} chars</span>
                </div>
                <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
                  onSelect={() => { const t = inputRef.current; if (t) setSelection({ start: t.selectionStart, end: t.selectionEnd }) }}
                  placeholder={activeTab === "encode" ? "Type your text here to encode..." : "Paste encoded text here to decode..."}
                  rows={6} className="w-full rounded-xl border border-border bg-card p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/40 transition-colors resize-y"
                />
              </div>

              {/* Swap direction button */}
              <button onClick={swapTab} disabled={!output || output.startsWith("(")}
                className="mx-auto flex items-center gap-2 rounded-full border border-border/60 bg-muted/30 px-4 py-1.5 text-[11px] text-muted-foreground hover:text-foreground hover:border-primary/30 disabled:opacity-30 transition-colors"
              >
                <ArrowDown className="h-3 w-3" />
                {activeTab === "encode" ? "Switch to Decode" : "Switch to Encode"}
                <ArrowUp className="h-3 w-3" />
              </button>

              {/* Output */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {activeTab === "encode" ? "Encoded Output" : "Decoded Output"}
                  </label>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-muted-foreground">{output.length} chars</span>
                    <button onClick={copyOutput}
                      className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
                <textarea value={output} readOnly rows={5}
                  className={`w-full rounded-xl border p-4 font-mono text-sm resize-y ${
                    activeTab === "encode"
                      ? "border-cyan-500/20 bg-card text-foreground"
                      : "border-emerald-500/20 bg-card text-foreground"
                  }`}
                />
              </div>

              {/* Actions bar */}
              <div className="flex flex-wrap items-center gap-2">
                <button onClick={shareUrl} title="Copy shareable link" className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground transition-colors">
                  {sharedCopied ? <Check className="h-4 w-4 text-primary" /> : <Share className="h-4 w-4" />}
                </button>
                <button onClick={() => { setInput(""); setSelection(null) }} className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <Trash className="h-3.5 w-3.5" /> Clear
                </button>
              </div>

              {/* Character Inspector */}
              {chars.length > 0 && (
                <div className="rounded-xl border border-border/50 bg-card p-3 animate-fade-up">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-3.5 w-3.5 text-primary" />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Char Inspector ({chars.length} chars)</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-[11px]">
                      <thead><tr className="border-b border-border/40 text-muted-foreground">
                        <th className="px-2 py-1 text-left">Char</th><th className="px-2 py-1 text-left">Dec</th><th className="px-2 py-1 text-left">Hex</th>
                        <th className="px-2 py-1 text-left">Unicode</th><th className="px-2 py-1 text-left">Binary</th><th className="px-2 py-1 text-left">HTML</th><th className="px-2 py-1 text-left">URL</th>
                      </tr></thead>
                      <tbody>
                        {chars.map((c, i) => (
                          <tr key={i} className="border-b border-border/10 font-mono text-foreground">
                            <td className="px-2 py-1 text-base">{c.char === " " ? <span className="text-muted-foreground">·</span> : c.char}</td>
                            <td className="px-2 py-1">{c.decimal}</td>
                            <td className="px-2 py-1 text-primary">{c.hex}</td>
                            <td className="px-2 py-1">{c.unicode}</td>
                            <td className="px-2 py-1 text-[10px]">{c.binary}</td>
                            <td className="px-2 py-1 text-[10px]">{c.html}</td>
                            <td className="px-2 py-1 break-all max-w-[100px] text-[10px]">{c.url}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: Format options */}
            <div className="lg:col-span-2 space-y-3">
              <div className={`rounded-xl border p-4 ${
                activeTab === "encode" ? "border-cyan-500/20 bg-card" : "border-emerald-500/20 bg-card"
              }`}>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {activeTab === "encode" ? "Encoding Formats" : "Decoding Formats"}
                </h3>

                {/* Auto-detect banner (decode only) */}
                {activeTab === "decode" && detected && (
                  <div className="flex items-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 mb-3">
                    <Wand2 className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
                    <p className="flex-1 text-xs text-cyan-300">
                      Detected: <span className="font-semibold">{detected.label}</span>
                    </p>
                    <button onClick={applyDetected} className="rounded bg-cyan-500/20 px-2 py-1 text-[10px] font-medium text-cyan-300 hover:bg-cyan-500/30 transition-colors">Apply</button>
                  </div>
                )}

                {/* Auto-Detect button */}
                {activeTab === "decode" && (
                  <button onClick={() => { if (detected) setDecodeFormat(detected.mode) }}
                    className={`w-full mb-2 flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                      detected
                        ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20"
                        : "border-border/40 bg-muted/20 text-muted-foreground hover:border-border cursor-default"
                    }`}
                    disabled={!detected}
                  >
                    <Wand2 className="h-3.5 w-3.5" />
                    {detected ? `Detect: ${detected.label}` : "No format detected"}
                  </button>
                )}

                {/* Hash/Compress/Charset warnings */}
                {isHashSelected && (
                  <div className="mb-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-[10px] text-amber-400 leading-relaxed">
                    ⚠ Hash functions are <strong>one-way</strong>. The output cannot be reversed to the original input.
                  </div>
                )}
                {isCompressSelected && (
                  <div className="mb-2 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-2 text-[10px] text-blue-400 leading-relaxed">
                    ℹ Compression may produce binary output encoded as Base64.
                  </div>
                )}
                {isCharsetSelected && (
                  <div className="mb-2 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-2 text-[10px] text-purple-400 leading-relaxed">
                    ℹ Converts legacy encoding bytes to UTF-8 characters.
                  </div>
                )}
                {isJwt && (
                  <div className="mb-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-[10px] text-cyan-400 leading-relaxed">
                    ℹ Paste a JWT token (header.payload.signature) to decode its header and payload.
                  </div>
                )}

                <div className="space-y-1 max-h-[360px] overflow-y-auto pr-1">
                  {currentCategories.map((cat) => (
                    <div key={cat.label} className="mb-3">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-1 py-1.5">
                        {cat.label}
                      </div>
                      <div className="space-y-1">
                        {cat.items.map(opt => (
                          <button key={opt.id} onClick={() => {
                            if (activeTab === "encode") setEncodeFormat(opt.id); else setDecodeFormat(opt.id)
                          }}
                            className={`w-full flex items-center gap-3 rounded-xl border px-4 py-2.5 text-left transition-all ${
                              currentFormat === opt.id
                                ? activeTab === "encode"
                                  ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-400 shadow-sm"
                                  : "border-emerald-500/50 bg-emerald-500/10 text-emerald-400 shadow-sm"
                                : "border-border/50 bg-muted/20 text-muted-foreground hover:border-border hover:text-foreground"
                            }`}
                          >
                            <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                              currentFormat === opt.id
                                ? activeTab === "encode" ? "border-cyan-500 bg-cyan-500/20" : "border-emerald-500 bg-emerald-500/20"
                                : "border-border"
                            }`}>
                              {currentFormat === opt.id && <div className={`h-2.5 w-2.5 rounded-full ${activeTab === "encode" ? "bg-cyan-400" : "bg-emerald-400"}`} />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="block text-sm font-medium leading-tight">{opt.label}</span>
                              {opt.desc && <span className="block text-[10px] text-muted-foreground mt-0.5">{opt.desc}</span>}
                            </div>
                            {currentFormat === opt.id && (
                              <Check className={`h-4 w-4 shrink-0 ${activeTab === "encode" ? "text-cyan-400" : "text-emerald-400"}`} />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Caesar shift selector */}
                {isCaesar && (
                  <div className="mt-3 flex items-center gap-2 rounded-lg border border-border/50 bg-muted/20 px-3 py-2 animate-fade-up">
                    <span className="text-[11px] font-medium text-muted-foreground">Shift:</span>
                    <button onClick={() => setCaesarShift(s => Math.max(1, s - 1))}
                      className="rounded border border-border/50 p-1 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-mono font-bold text-foreground">{caesarShift}</span>
                    <button onClick={() => setCaesarShift(s => Math.min(25, s + 1))}
                      className="rounded border border-border/50 p-1 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                    <span className="text-[10px] text-muted-foreground ml-auto">Encode: +{caesarShift} / Decode: -{caesarShift}</span>
                  </div>
                )}
                {isVigenere && (
                  <div className="mt-3 flex items-center gap-2 rounded-lg border border-border/50 bg-muted/20 px-3 py-2 animate-fade-up">
                    <span className="text-[11px] font-medium text-muted-foreground whitespace-nowrap">Key:</span>
                    <input type="text" value={vigenereKey} onChange={e => setVigenereKey(e.target.value.replace(/[^a-zA-Z]/g, ""))}
                      placeholder="keyword"
                      className="flex-1 rounded border border-border/50 bg-background px-2 py-1 text-sm font-mono text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/40 transition-colors"
                    />
                    <span className="text-[10px] text-muted-foreground">A-Z only</span>
                  </div>
                )}
                {isRailFence && (
                  <div className="mt-3 flex items-center gap-2 rounded-lg border border-border/50 bg-muted/20 px-3 py-2 animate-fade-up">
                    <span className="text-[11px] font-medium text-muted-foreground whitespace-nowrap">Rails:</span>
                    <button onClick={() => setRails(s => Math.max(2, s - 1))}
                      className="rounded border border-border/50 p-1 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center text-sm font-mono font-bold text-foreground">{rails}</span>
                    <button onClick={() => setRails(s => Math.min(10, s + 1))}
                      className="rounded border border-border/50 p-1 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                    <span className="text-[10px] text-muted-foreground ml-auto">2–10</span>
                  </div>
                )}
                {isPlayfair && (
                  <div className="mt-3 flex items-center gap-2 rounded-lg border border-border/50 bg-muted/20 px-3 py-2 animate-fade-up">
                    <span className="text-[11px] font-medium text-muted-foreground whitespace-nowrap">Key:</span>
                    <input type="text" value={playfairKey} onChange={e => setPlayfairKey(e.target.value.replace(/[^a-zA-Z]/g, ""))}
                      placeholder="keyword"
                      className="flex-1 rounded border border-border/50 bg-background px-2 py-1 text-sm font-mono text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/40 transition-colors"
                    />
                    <span className="text-[10px] text-muted-foreground">A-Z only</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
