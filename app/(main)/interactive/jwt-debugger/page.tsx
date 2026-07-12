"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { PageTitle } from "@/components/page-title"
import { MainSidebar } from "@/components/main-sidebar"
import Link from "next/link"
import { ChevronRight, ChevronDown, Home, Copy, Check, Key, AlertTriangle, Shield, Clock, Terminal, Info, Skull, Trash2, Wand2, RefreshCw, Fingerprint, ClipboardPaste } from "lucide-react"
import { cn } from "@/lib/utils"

const claimDescriptions: Record<string, string> = {
  iss: "Issuer — identifies the principal that issued the JWT",
  sub: "Subject — identifies the principal that is the subject of the JWT",
  aud: "Audience — identifies the recipients that the JWT is intended for",
  exp: "Expiration Time — token expires after this timestamp",
  nbf: "Not Before — token is not valid before this timestamp",
  iat: "Issued At — timestamp when the token was issued",
  jti: "JWT ID — unique identifier for the token",
  typ: "Type — media type of the token (usually JWT)",
  azp: "Authorized Party — the party to which the token was issued",
  scope: "Scope — permissions granted by the token",
  roles: "Roles — user roles assigned to the token",
  permissions: "Permissions — specific permissions granted to the token bearer",
  client_id: "Client ID — identifies the OAuth client",
  nonce: "Nonce — replay protection value",
  email: "Email — user email address",
  name: "Name — user display name",
  preferred_username: "Preferred Username — user's preferred username",
  given_name: "Given Name — user's first name",
  family_name: "Family Name — user's last name",
}

const EXAMPLE_KEYS: Record<string, string> = {
  HS256: "a-string-secret-at-least-256-bits-long",
  HS384: "a-valid-string-secret-that-is-at-least-384-bits-long",
  HS512: "a-valid-string-secret-that-is-at-least-512-bits-long-which-is-very-long",
  RS256: "", RS384: "", RS512: "",
  PS256: "", PS384: "", PS512: "",
  ES256: "", ES384: "", ES512: "",
  EdDSA: "",
  none: "",
}

const EXAMPLE_TOKENS: Record<string, string> = {
  none: "eyJhbGciOiJub25lIn0.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTczNjI5MjEyNH0.",
  HS256: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30",
  HS384: "eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.owv7q9nVbW5tqUezF_G2nHTra-ANW3HqW9epyVwh08Y-Z-FKsnG8eBIpC4GTfTVU",
  HS512: "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.ANCf_8p1AE4ZQs7QuqGAyyfTEgYrKSjKWkhBk5cIn1_2QVr2jEjmM-1tu7EgnyOf_fAsvdFXva8Sv05iTGzETg",
  RS256: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.NHVaYe26MbtOYhSKkoKYdFVomg4i8ZJd8_-RU8VNbftc4TSMb4bXP3l3YlNWACwyXPGffz5aXHc6lty1Y2t4SWRqGteragsVdZufDn5BlnJl9pdR_kdVFUsra2rWKEofkZeIC4yWytE58sMIihvo9H1ScmmVwBcQP6XETqYd0aSHp1gOa9RdUPDvoXQ5oqygTqVtxaDr6wUFKrKItgBMzWIdNZ6y7O9E0DhEPTbE9rfBo6KTFsHAZnMg4k68CDp2woYIaXbmYTWcvbzIuHO7_37GT79XdIwkm95QJ7hYC9RiwrV7mesbY4PAahERJawntho0my942XheVLmGwLMBkQ",
  RS384: "eyJhbGciOiJSUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.o1hC1xYbJolSyh0-bOY230w22zEQSk5TiBfc-OCvtpI2JtYlW-23-8B48NpATozzMHn0j3rE0xVUldxShzy0xeJ7vYAccVXu2Gs9rnTVqouc-UZu_wJHkZiKBL67j8_61L6SXswzPAQu4kVDwAefGf5hyYBUM-80vYZwWPEpLI8K4yCBsF6I9N1yQaZAJmkMp_Iw371Menae4Mp4JusvBJS-s6LrmG2QbiZaFaxVJiW8KlUkWyUCns8-qFl5OMeYlgGFsyvvSHvXCzQrsEXqyCdS4tQJd73ayYA4SPtCb9clz76N1zE5WsV4Z0BYrxeb77oA7jJhh994RAPzCG0hmQ",
  RS512: "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.jYW04zLDHfR1v7xdrW3lCGZrMIsVe0vWCfVkN2DRns2c3MN-mcp_-RE6TN9umSBYoNV-mnb31wFf8iun3fB6aDS6m_OXAiURVEKrPFNGlR38JSHUtsFzqTOj-wFrJZN4RwvZnNGSMvK3wzzUriZqmiNLsG8lktlEn6KA4kYVaM61_NpmPHWAjGExWv7cjHYupcjMSmR8uMTwN5UuAwgW6FRstCJEfoxwb0WKiyoaSlDuIiHZJ0cyGhhEmmAPiCwtPAwGeaL1yZMcp0p82cpTQ5Qb-7CtRov3N4DcOHgWYk6LomPR5j5cCkePAz87duqyzSMpCB0mCOuE3CU2VMtGeQ",
  ES256: "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.tyh-VfuzIxCyGYDlkBA7DfyjrqmSHu6pQ2hoZuFqUSLPNY2N0mpHb3nk5K17HWP_3cYHBw7AhHale5wky6-sVA",
  ES384: "eyJhbGciOiJFUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.VUPWQZuClnkFbaEKCsPy7CZVMh5wxbCSpaAWFLpnTe9J0--PzHNeTFNXCrVHysAa3eFbuzD8_bLSsgTKC8SzHxRVSj5eN86vBPo_1fNfE7SHTYhWowjY4E_wuiC13yoj",
  ES512: "eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.AbVUinMiT3J_03je8WTOIl-VdggzvoFgnOsdouAs-DLOtQzau9valrq-S6pETyi9Q18HH-EuwX49Q7m3KC0GuNBJAc9Tksulgsdq8GqwIqZqDKmG7hNmDzaQG1Dpdezn2qzv-otf3ZZe-qNOXUMRImGekfQFIuH_MjD2e8RZyww6lbZk",
  PS256: "eyJhbGciOiJQUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.iOeNU4dAFFeBwNj6qdhdvm-IvDQrTa6R22lQVJVuWJxorJfeQww5Nwsra0PjaOYhAMj9jNMO5YLmud8U7iQ5gJK2zYyepeSuXhfSi8yjFZfRiSkelqSkU19I-Ja8aQBDbqXf2SAWA8mHF8VS3F08rgEaLCyv98fLLH4vSvsJGf6ueZSLKDVXz24rZRXGWtYYk_OYYTVgR1cg0BLCsuCvqZvHleImJKiWmtS0-CymMO4MMjCy_FIl6I56NqLE9C87tUVpo1mT-kbg5cHDD8I7MjCW5Iii5dethB4Vid3mZ6emKjVYgXrtkOQ-JyGMh6fnQxEFN1ft33GX2eRHluK9eg",
  PS384: "eyJhbGciOiJQUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.Lfe_aCQme_gQpUk9-6l9qesu0QYZtfdzfy08w8uqqPH_gnw-IVyQwyGLBHPFBJHMbifdSMxPjJjkCD0laIclhnBhowILu6k66_5Y2z78GHg8YjKocAvB-wSUiBhuV6hXVxE5emSjhfVz2OwiCk2bfk2hziRpkdMvfcITkCx9dmxHU6qcEIsTTHuH020UcGayB1-IoimnjTdCsV1y4CMr_ECDjBrqMdnontkqKRIM1dtmgYFsJM6xm7ewi_ksG_qZHhaoBkxQ9wq9OVQRGiSZYowCp73d2BF3jYMhdmv2JiaUz5jRvv6lVU7Quq6ylVAlSPxeov9voYHO1mgZFCY1kQ",
  PS512: "eyJhbGciOiJQUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.J5W09-rNx0pt5_HBiydR-vOluS6oD-RpYNa8PVWwMcBDQSXiw6-EPW8iSsalXPspGj3ouQjAnOP_4-zrlUUlvUIt2T79XyNeiKuooyIFvka3Y5NnGiOUBHWvWcWp4RcQFMBrZkHtJM23sB5D7Wxjx0-HFeNk-Y3UJgeJVhg5NaWXypLkC4y0ADrUBfGAxhvGdRdULZivfvzuVtv6AzW6NRuEE6DM9xpoWX_4here-yvLS2YPiBTZ8xbB3axdM99LhES-n52lVkiX5AWg2JJkEROZzLMpaacA_xlbUz_zbIaOaoqk8gB5oO7kI6sZej3QAdGigQy-hXiRnW_L98d4GQ",
  EdDSA: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.JkKWCY39IdWEQttmdqR7VdsvT-_QxheW_eb0S5wr_j83ltux_JDUIXs7a3Dtn3xuqzuhetiuJrWIvy5TzimeCg",
}

function b64urlDecode(str: string): string {
  try {
    const base64 = str.replace(/-/g, "+").replace(/_/g, "/").padEnd(str.length + (4 - (str.length % 4)) % 4, "=")
    return atob(base64)
  } catch { return "" }
}

function b64urlEncode(str: string): string {
  return btoa(str).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}

function arrayBufferToPem(buf: ArrayBuffer, label: string): string {
  const b64 = btoa(Array.from(new Uint8Array(buf)).map(b => String.fromCharCode(b)).join(""))
  const lines = b64.match(/.{1,64}/g) || []
  return `-----BEGIN ${label}-----\n${lines.join("\n")}\n-----END ${label}-----\n`
}

async function generateKeyPairPem(algo: string): Promise<{ privateKey: string; publicKey: string }> {
  const algoUpper = algo.toUpperCase()
  let keyPair: CryptoKeyPair
  let algParams: Algorithm | EcKeyGenParams | RsaHashedKeyGenParams
  let privateLabel = "PRIVATE KEY"
  let publicLabel = "PUBLIC KEY"

  const hashForAlgo = (bits: string): string => {
    if (bits === "512") return "SHA-512"
    if (bits === "384") return "SHA-384"
    return "SHA-256"
  }

  if (algoUpper === "EDDSA") {
    keyPair = await crypto.subtle.generateKey({ name: "Ed25519" }, true, ["sign", "verify"]) as CryptoKeyPair
  } else if (algoUpper.startsWith("ES")) {
    const curveMap: Record<string, string> = { "256": "P-256", "384": "P-384", "512": "P-521" }
    algParams = { name: "ECDSA", namedCurve: curveMap[algoUpper.slice(2)] || "P-256" }
    keyPair = await crypto.subtle.generateKey(algParams, true, ["sign", "verify"]) as CryptoKeyPair
  } else if (algoUpper.startsWith("RS")) {
    const bits = algoUpper.slice(2)
    const modulusLen = bits === "512" ? 4096 : 2048
    algParams = { name: "RSASSA-PKCS1-v1_5", modulusLength: modulusLen, publicExponent: new Uint8Array([1, 0, 1]), hash: { name: hashForAlgo(bits) } }
    keyPair = await crypto.subtle.generateKey(algParams, true, ["sign", "verify"]) as CryptoKeyPair
  } else if (algoUpper.startsWith("PS")) {
    const bits = algoUpper.slice(2)
    const modulusLen = bits === "512" ? 4096 : 2048
    algParams = { name: "RSA-PSS", modulusLength: modulusLen, publicExponent: new Uint8Array([1, 0, 1]), hash: { name: hashForAlgo(bits) } }
    keyPair = await crypto.subtle.generateKey(algParams, true, ["sign", "verify"]) as CryptoKeyPair
  } else {
    throw new Error(`Unsupported algorithm for key generation: ${algo}`)
  }

  const privRaw = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey)
  const pubRaw = await crypto.subtle.exportKey("spki", keyPair.publicKey)
  return { privateKey: arrayBufferToPem(privRaw, privateLabel), publicKey: arrayBufferToPem(pubRaw, publicLabel) }
}

function pemToArrayBuffer(pem: string): ArrayBuffer {
  const b64 = pem.replace(/-----BEGIN[^-]+-----/, "").replace(/-----END[^-]+-----/, "").replace(/\s/g, "")
  const bin = atob(b64)
  const buf = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i)
  return buf.buffer
}

async function signJwt(
  headerJson: string,
  payloadJson: string,
  secret: string,
  algo: string,
  isBase64url: boolean
): Promise<{ token: string; signature: string; error?: string }> {
  let header: Record<string, unknown>, payload: Record<string, unknown>
  try { header = JSON.parse(headerJson) } catch { return { token: "", signature: "", error: "Invalid header JSON" } }
  try { payload = JSON.parse(payloadJson) } catch { return { token: "", signature: "", error: "Invalid payload JSON" } }

  header.alg = algo
  if (!header.typ) header.typ = "JWT"

  const enc = new TextEncoder()
  const data = enc.encode(`${b64urlEncode(JSON.stringify(header))}.${b64urlEncode(JSON.stringify(payload))}`)
  const algoUpper = algo.toUpperCase()

  try {
    let sigBuf: ArrayBuffer
    let key: CryptoKey

    if (algoUpper === "NONE") {
      const token = `${b64urlEncode(JSON.stringify(header))}.${b64urlEncode(JSON.stringify(payload))}.`
      return { token, signature: "(unsigned)" }
    } else if (algoUpper === "EDDSA") {
      key = await crypto.subtle.importKey("pkcs8", pemToArrayBuffer(secret), { name: "Ed25519" }, false, ["sign"])
      sigBuf = await crypto.subtle.sign("Ed25519", key, data)
    } else if (algoUpper.startsWith("HS")) {
      const hashName = `SHA-${algoUpper.slice(2)}`
      const keyBytes = isBase64url
        ? Uint8Array.from(atob(secret.replace(/-/g, "+").replace(/_/g, "/").padEnd(secret.length + (4 - (secret.length % 4)) % 4, "=")), c => c.charCodeAt(0))
        : enc.encode(secret)
      key = await crypto.subtle.importKey("raw", keyBytes, { name: "HMAC", hash: { name: hashName } }, false, ["sign"])
      sigBuf = await crypto.subtle.sign("HMAC", key, data)
    } else if (algoUpper.startsWith("RS")) {
      const hashName = `SHA-${algoUpper.slice(2)}`
      key = await crypto.subtle.importKey("pkcs8", pemToArrayBuffer(secret), { name: "RSASSA-PKCS1-v1_5", hash: { name: hashName } }, false, ["sign"])
      sigBuf = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, data)
    } else if (algoUpper.startsWith("PS")) {
      const hashName = `SHA-${algoUpper.slice(2)}`
      key = await crypto.subtle.importKey("pkcs8", pemToArrayBuffer(secret), { name: "RSA-PSS", hash: { name: hashName } }, false, ["sign"])
      sigBuf = await crypto.subtle.sign({ name: "RSA-PSS", saltLength: 32 }, key, data)
    } else if (algoUpper.startsWith("ES")) {
      const curveMap: Record<string, string> = { "256": "P-256", "384": "P-384", "512": "P-521" }
      const curve = curveMap[algoUpper.slice(2)] || "P-256"
      key = await crypto.subtle.importKey("pkcs8", pemToArrayBuffer(secret), { name: "ECDSA", namedCurve: curve }, false, ["sign"])
      sigBuf = await crypto.subtle.sign({ name: "ECDSA", hash: { name: `SHA-${algoUpper.slice(2)}` } }, key, data)
    } else {
      return { token: "", signature: "", error: `Unsupported algorithm: ${algo}` }
    }

    const sigBytes = new Uint8Array(sigBuf)
    const signature = b64urlEncode(String.fromCharCode.apply(null, Array.from(sigBytes)))
    const token = `${b64urlEncode(JSON.stringify(header))}.${b64urlEncode(JSON.stringify(payload))}.${signature}`
    return { token, signature }
  } catch (e: unknown) {
    const err = e as Error
    return { token: "", signature: "", error: `Signing failed: ${err?.message || err?.name || "Cause: key format may be invalid for this algorithm"}` }
  }
}

async function verifyJwt(
  token: string,
  keyStr: string,
  algo: string
): Promise<{ valid: boolean; error?: string }> {
  if (typeof crypto?.subtle === "undefined") {
    return { valid: false, error: "crypto.subtle is not available. This tool requires a secure context (HTTPS) or localhost." }
  }

  const parts = token.trim().split(".")
  if (parts.length !== 3) return { valid: false, error: "Invalid JWT format" }

  const headerRaw = b64urlDecode(parts[0])
  const payloadRaw = b64urlDecode(parts[1])
  const sigRaw = parts[2]
  if (!headerRaw || !payloadRaw || !sigRaw) return { valid: false, error: "Failed to decode JWT parts" }

  let headerObj: Record<string, unknown>
  try { headerObj = JSON.parse(headerRaw) as Record<string, unknown> } catch { return { valid: false, error: "Invalid header JSON" } }

  const alg = (algo || String(headerObj.alg ?? "")).toUpperCase()
  const data = new TextEncoder().encode(`${b64urlEncode(headerRaw)}.${b64urlEncode(payloadRaw)}`)
  const sigBytes = Uint8Array.from(atob(sigRaw.replace(/-/g, "+").replace(/_/g, "/")), c => c.charCodeAt(0))

  let keyStrClean = keyStr.trim()

  // Detect JWK format
  const isJwk = keyStrClean.startsWith("{")
  let jwkObj: JsonWebKey | null = null
  if (isJwk) {
    try { jwkObj = JSON.parse(keyStrClean) as JsonWebKey } catch { return { valid: false, error: "Invalid JWK JSON format" } }
  }

  try {
    let key: CryptoKey

    if (alg.startsWith("HS")) {
      if (!isJwk && keyStrClean.includes("-----")) {
        return { valid: false, error: "HMAC algorithm expects a plain-text secret, not a PEM-formatted key" }
      }
      const hashName = `SHA-${alg.slice(2)}`
      const keyBytes = isJwk
        ? Uint8Array.from(atob(jwkObj!.k.replace(/-/g, "+").replace(/_/g, "/")), c => c.charCodeAt(0))
        : new TextEncoder().encode(keyStrClean)
      key = await crypto.subtle.importKey("raw", keyBytes, { name: "HMAC", hash: { name: hashName } }, false, ["verify"])
      return { valid: await crypto.subtle.verify("HMAC", key, sigBytes, data) }
    } else if (alg === "EDDSA") {
      if (!keyStrClean.includes("-----") && !isJwk) {
        return { valid: false, error: "EdDSA requires a public key in PEM or JWK format" }
      }
      if (isJwk) {
        key = await crypto.subtle.importKey("jwk", jwkObj, { name: "Ed25519" }, false, ["verify"])
      } else {
        key = await crypto.subtle.importKey("spki", pemToArrayBuffer(keyStrClean), { name: "Ed25519" }, false, ["verify"])
      }
      return { valid: await crypto.subtle.verify("Ed25519", key, sigBytes, data) }
    } else if (alg.startsWith("RS")) {
      const hashName = `SHA-${alg.slice(2)}`
      if (!keyStrClean.includes("-----") && !isJwk) {
        return { valid: false, error: "RSA requires a public key in PEM or JWK format" }
      }
      if (isJwk) {
        key = await crypto.subtle.importKey("jwk", jwkObj, { name: "RSASSA-PKCS1-v1_5", hash: { name: hashName } }, false, ["verify"])
      } else {
        key = await crypto.subtle.importKey("spki", pemToArrayBuffer(keyStrClean), { name: "RSASSA-PKCS1-v1_5", hash: { name: hashName } }, false, ["verify"])
      }
      return { valid: await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, sigBytes, data) }
    } else if (alg.startsWith("PS")) {
      const hashName = `SHA-${alg.slice(2)}`
      if (!keyStrClean.includes("-----") && !isJwk) {
        return { valid: false, error: "RSA-PSS requires a public key in PEM or JWK format" }
      }
      if (isJwk) {
        key = await crypto.subtle.importKey("jwk", jwkObj, { name: "RSA-PSS", hash: { name: hashName } }, false, ["verify"])
      } else {
        key = await crypto.subtle.importKey("spki", pemToArrayBuffer(keyStrClean), { name: "RSA-PSS", hash: { name: hashName } }, false, ["verify"])
      }
      return { valid: await crypto.subtle.verify({ name: "RSA-PSS", saltLength: 32 }, key, sigBytes, data) }
    } else if (alg.startsWith("ES")) {
      const curveMap: Record<string, string> = { "256": "P-256", "384": "P-384", "512": "P-521" }
      const curve = curveMap[alg.slice(2)] || "P-256"
      if (!keyStrClean.includes("-----") && !isJwk) {
        return { valid: false, error: "ECDSA requires a public key in PEM or JWK format" }
      }
      if (isJwk) {
        key = await crypto.subtle.importKey("jwk", jwkObj, { name: "ECDSA", namedCurve: curve }, false, ["verify"])
      } else {
        key = await crypto.subtle.importKey("spki", pemToArrayBuffer(keyStrClean), { name: "ECDSA", namedCurve: curve }, false, ["verify"])
      }
      return { valid: await crypto.subtle.verify({ name: "ECDSA", hash: { name: `SHA-${alg.slice(2)}` } }, key, sigBytes, data) }
    } else if (alg === "NONE") {
      return { valid: sigRaw === "" }
    }
    return { valid: false, error: `Unsupported algorithm: ${alg}` }
  } catch (e: unknown) {
    const err = e as Error
    return { valid: false, error: `Verification failed: ${err.message || "Unknown error"}` }
  }
}

function formatJSON(str: string): string {
  try { return JSON.stringify(JSON.parse(str), null, 2) } catch { return str }
}

function renderColoredJSON(obj: unknown): React.ReactNode {
  const format = (val: unknown, indent: number): React.ReactNode => {
    const pad = "  ".repeat(indent)
    if (val === null) return <span className="text-red-400">null</span>
    if (typeof val === "boolean") return <span className="text-red-400">{String(val)}</span>
    if (typeof val === "number") return <span className="text-blue-400">{String(val)}</span>
    if (typeof val === "string") return <span><span className="text-muted-foreground/50">&quot;</span><span className="text-green-400">{val}</span><span className="text-muted-foreground/50">&quot;</span></span>
    if (Array.isArray(val)) {
      if (val.length === 0) return <span className="text-muted-foreground/50">[]</span>
      const items = val.map((v, i) => <span key={i}>{pad}  {format(v, indent + 1)}{i < val.length - 1 ? <span className="text-muted-foreground/30">,</span> : ""}{"\n"}</span>)
      return <span>[{"\n"}{items}{pad}]</span>
    }
    if (typeof val === "object") {
      const keys = Object.keys(val)
      if (keys.length === 0) return <span className="text-muted-foreground/50">{'{}'}</span>
      const entries = keys.map((k, i) => {
        const comma = i < keys.length - 1 ? <span className="text-muted-foreground/30">,</span> : ""
        return <span key={k}>{pad}  <span className="text-amber-400">&quot;{k}&quot;</span><span className="text-muted-foreground/30">: </span>{format(val[k], indent + 1)}{comma}{"\n"}</span>
      })
      return <span>{'{\n'}{entries}{pad}{'}'}</span>
    }
    return <span>{String(val)}</span>
  }
  return format(obj, 0)
}

function getAlgorithm(header: Record<string, unknown>): string { return (header?.alg as string) || "unknown" }
function getKid(header: Record<string, unknown>): string | null { return (header?.kid as string) || null }
function getJKU(header: Record<string, unknown>): string | null { return (header?.jku as string) || null }
function getJWK(header: Record<string, unknown>): JsonWebKey | null { return (header?.jwk as JsonWebKey) || null }
function getX5u(header: Record<string, unknown>): string | null { return (header?.x5u as string) || null }
function getTyp(header: Record<string, unknown>): string | null { return (header?.typ as string) || null }

function parseTime(ts: number): { date: string; relative: string } {
  const d = new Date(ts * 1000)
  const now = Date.now()
  const diff = d.getTime() - now
  const absDays = Math.abs(diff) / 86400000
  let relative: string
  if (diff < 0) relative = absDays < 1 ? `${Math.round(-diff / 3600000)}h ago` : `${Math.round(absDays)}d ago`
  else relative = absDays < 1 ? `in ${Math.round(diff / 3600000)}h` : `in ${Math.round(absDays)}d`
  return { date: d.toLocaleString(), relative }
}

function algVerdict(alg: string): { text: string; color: string } {
  const lower = alg.toLowerCase()
  if (lower === "none") return { text: "CRITICAL — alg=none allows forged tokens", color: "text-red-400" }
  if (lower === "hs1") return { text: "WEAK — HS1 is trivially breakable", color: "text-orange-400" }
  if (lower.startsWith("hs") && !lower.endsWith("256") && !lower.endsWith("384") && !lower.endsWith("512")) return { text: "Weak HMAC algorithm", color: "text-orange-400" }
  if (lower === "hs256") return { text: "Standard HMAC-SHA256", color: "text-green-400" }
  if (lower === "hs384") return { text: "Strong HMAC-SHA384", color: "text-green-400" }
  if (lower === "hs512") return { text: "Strong HMAC-SHA512", color: "text-green-400" }
  if (lower.startsWith("rs")) return { text: "RSA — verify with public key", color: "text-yellow-400" }
  if (lower.startsWith("es")) return { text: "ECDSA — verify with public key", color: "text-yellow-400" }
  if (lower.startsWith("ps")) return { text: "RSASSA-PSS — verify with public key", color: "text-yellow-400" }
  if (lower === "eddsa" || lower === "ed25519") return { text: "EdDSA — verify with public key", color: "text-yellow-400" }
  return { text: "Unknown algorithm — review carefully", color: "text-muted-foreground" }
}

function kidIsDangerous(kid: string): boolean {
  return /['";\s=#&?/\\<>]/.test(kid)
}

function computeScore(issues: { severity: string }[]): number {
  let score = 100
  for (const i of issues) {
    if (i.severity === "critical") score -= 40
    else if (i.severity === "high") score -= 25
    else if (i.severity === "medium") score -= 15
    else if (i.severity === "info") score -= 5
  }
  return Math.max(0, score)
}

function scoreColor(score: number): string {
  if (score >= 80) return "text-green-400"
  if (score >= 50) return "text-amber-400"
  return "text-red-400"
}

function scoreBgColor(score: number): string {
  if (score >= 80) return "bg-green-500"
  if (score >= 50) return "bg-amber-500"
  return "bg-red-500"
}

interface SecurityIssue {
  severity: "critical" | "high" | "medium" | "info"
  icon: React.ElementType
  title: string
  description: string
}

interface TimelineEntry {
  date: string
  relative: string
  expired?: boolean
  future?: boolean
}

interface ClaimEntry {
  name: string
  description: string
  value: unknown
  severity?: "good" | "warn" | "info"
}

interface DecodedToken {
  error: string | null
  header: string | null
  payload: string | null
  signature: string | null
  alg: string
  kid: string | null
  jku: string | null
  jwk: JsonWebKey | null
  x5u: string | null
  x5c: string[] | null
  x5t: string | null
  crit: string[] | null
  typ: string | null
  headerObj: Record<string, unknown>
  payloadObj: Record<string, unknown>
  verdict: { text: string; color: string } | null
  issues: SecurityIssue[]
  score: number
  hashcatMode: string | null
  timeline: Record<string, TimelineEntry>
  claims: ClaimEntry[]
  tlIatPct: number
  tlNbfPct: number
  tlExpPct: number
}

const EMPTY_DECODED: DecodedToken = {
  error: null, header: null, payload: null, signature: null, alg: "", kid: null,
  headerObj: null, payloadObj: null, verdict: null, issues: [], score: 100,
  hashcatMode: null, timeline: null, claims: [],
  jku: null, jwk: null, x5u: null, x5c: null, x5t: null, crit: null, typ: null,
  tlIatPct: 0, tlNbfPct: 50, tlExpPct: 100,
}

function buildSecurityIssues(headerObj: Record<string, unknown>, payloadObj: Record<string, unknown>, alg: string, kid: string | null, jku: string | null, jwk: JsonWebKey | null, x5u: string | null, x5c?: string | null, x5t?: string | null, crit?: string[] | null): SecurityIssue[] {
  const issues: SecurityIssue[] = []
  if (alg.toLowerCase() === "none") { issues.push({ severity: "critical", icon: Skull, title: "alg=none Attack", description: "The algorithm is set to 'none'. An attacker can forge any JWT by removing the signature and setting alg to none." }) }
  if (jku) { issues.push({ severity: "high", icon: Skull, title: "JKU Header Present", description: `JKU (JWK Set URL): ${jku}. An attacker could host a malicious JWK set and point the JKU to it. Only use trusted HTTPS URLs.` }) }
  if (x5u) { issues.push({ severity: "high", icon: Skull, title: "X5U Header Present", description: `X5U (X.509 URL): ${x5u}. Similar to JKU — an attacker could point this to a malicious certificate.` }) }
  if (jwk) { issues.push({ severity: "high", icon: Skull, title: "JWK Header Present (Embedded Key)", description: "The token contains an embedded JWK. Unless you explicitly trust the embedded key, this is a high-risk vector — the issuer controls the key." }) }
  if (x5c) { issues.push({ severity: "medium", icon: Shield, title: "X5C Certificate Chain Present", description: "The token includes an X.509 certificate chain. Verify the chain validity and trust anchor before using the key." }) }
  if (kid && kidIsDangerous(kid)) { issues.push({ severity: "high", icon: Skull, title: "Dangerous kid Value", description: `The kid contains special characters: "${kid}". This could be SQL injection, NoSQL injection, or path traversal. Always sanitize kid lookups.` }) }
  if (crit && crit.length > 0) { issues.push({ severity: "high", icon: AlertTriangle, title: "Critical Headers (crit)", description: `The token declares critical headers: ${crit.join(", ")}. Your library MUST support all of them or reject the token.` }) }
  const isWeakHmac = alg.toLowerCase().startsWith("hs") && !["hs256", "hs384", "hs512"].includes(alg.toLowerCase())
  if (isWeakHmac) { issues.push({ severity: "medium", icon: AlertTriangle, title: "Weak HMAC Algorithm", description: `${alg} is a weak HMAC variant. Use HS256 or higher.` }) }
  return issues
}

function buildTokenTimeline(payloadObj: Record<string, unknown>, issues: SecurityIssue[]): Record<string, TimelineEntry> {
  const timeline: Record<string, TimelineEntry> = {}
  if (payloadObj.exp) {
    const t = parseTime(payloadObj.exp)
    const expired = new Date(payloadObj.exp * 1000).getTime() < Date.now()
    timeline.exp = { ...t, expired }
    if (expired) issues.push({ severity: "medium", icon: Clock, title: "Token Expired", description: `This token expired ${t.relative} (${t.date}). Expired tokens should be rejected.` })
    else issues.push({ severity: "info", icon: Info, title: "Token Valid", description: `Token expires ${t.relative} (${t.date}).` })
  } else { issues.push({ severity: "info", icon: Info, title: "No Expiration (exp)", description: "The token has no expiration claim. If it's stolen, it can be used indefinitely." }) }
  if (payloadObj.iat) {
    timeline.iat = parseTime(payloadObj.iat)
  } else { issues.push({ severity: "info", icon: Info, title: "No Issued At (iat)", description: "Without an iat claim, there's no record of when the token was created." }) }
  if (payloadObj.nbf) {
    const t = parseTime(payloadObj.nbf)
    const future = new Date(payloadObj.nbf * 1000).getTime() > Date.now()
    timeline.nbf = { ...t, future }
    if (future) issues.push({ severity: "info", icon: Clock, title: "Not Yet Valid (nbf)", description: `This token is not valid until ${t.date} (${t.relative}).` })
  }
  return timeline
}

function computeTimelinePcts(payloadObj: Record<string, unknown>): { tlIatPct: number; tlNbfPct: number; tlExpPct: number } {
  let tlIatPct = 0; let tlNbfPct = 50; let tlExpPct = 100
  if (payloadObj.iat && payloadObj.exp) {
    const total = payloadObj.exp - payloadObj.iat
    if (total > 0) {
      tlIatPct = 0; tlExpPct = 100
      tlNbfPct = payloadObj.nbf ? Math.round(((payloadObj.nbf - payloadObj.iat) / total) * 100) : 50
    }
  } else if (payloadObj.iat && payloadObj.nbf) {
    tlIatPct = 0; tlNbfPct = 100; tlExpPct = 100
  }
  return { tlIatPct, tlNbfPct, tlExpPct }
}

function extractClaims(payloadObj: Record<string, unknown>): ClaimEntry[] {
  const claims: ClaimEntry[] = []
  for (const key of Object.keys(payloadObj)) {
    const desc = claimDescriptions[key.toLowerCase()] || "Custom claim"
    let sev: "good" | "warn" | "info" | undefined
    if (["iss", "sub", "aud", "exp", "iat", "nbf", "jti"].includes(key.toLowerCase())) sev = "good"
    else sev = "info"
    claims.push({ name: key, description: desc, value: payloadObj[key], severity: sev })
  }
  return claims
}

export default function JwtDebuggerPage() {
  const [activeTab, setActiveTab] = useState<"decoder" | "encoder">("decoder")
  const [token, setToken] = useState("")
  const [copiedPart, setCopiedPart] = useState<string | null>(null)

  // Encoder state
  const [encoderAlgo, setEncoderAlgo] = useState("HS256")
  const [headerJson, setHeaderJson] = useState(JSON.stringify({ alg: "HS256", typ: "JWT" }, null, 2))
  const [payloadJson, setPayloadJson] = useState(JSON.stringify({ sub: "1234567890", name: "John Doe", admin: true, iat: Math.floor(Date.now() / 1000) }, null, 2))
  const [secretInput, setSecretInput] = useState(EXAMPLE_KEYS.HS256)
  const [isBase64urlSecret, setIsBase64urlSecret] = useState(false)
  const [encodedResult, setEncodedResult] = useState<{ token: string; signature: string; error?: string }>({ token: "", signature: "" })
  const [signing, setSigning] = useState(false)


  // Decoder view state
  const [headerView, setHeaderView] = useState<"json" | "claims">("json")
  const [payloadView, setPayloadView] = useState<"json" | "claims">("json")
  // Decoder verification state
  const [verifyKey, setVerifyKey] = useState("")
  const [verifying, setVerifying] = useState(false)
  const [verifyResult, setVerifyResult] = useState<{ valid: boolean; error?: string } | null>(null)
  const [generatingKey, setGeneratingKey] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["secScore", "secIssues", "secHeader", "secPayload", "secTimeline", "secAlgo", "secFindings", "secJose", "secSig", "secVerify", "secHashcat", "secAttacks"]))

  const toggleSection = useCallback((id: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }, [])

  const headerValid = useMemo(() => { try { JSON.parse(headerJson); return true } catch { return false } }, [headerJson])
  const payloadValid = useMemo(() => { try { JSON.parse(payloadJson); return true } catch { return false } }, [payloadJson])
  const isAsymmetric = encoderAlgo.startsWith("RS") || encoderAlgo.startsWith("ES") || encoderAlgo.startsWith("PS") || encoderAlgo === "EdDSA"
  const isNoneAlgo = encoderAlgo === "none"
  const minHmacLen = encoderAlgo === "HS512" ? 64 : encoderAlgo === "HS384" ? 48 : 32
  const secretValid = isNoneAlgo ? true : isAsymmetric ? secretInput.trim().length > 0 : secretInput.length >= minHmacLen

  const parsed = useMemo((): DecodedToken => {
    const parts = token.trim().split(".")
    if (parts.length !== 3) return { ...EMPTY_DECODED, error: "Invalid JWT format. Expected 3 dot-separated parts (header.payload.signature)" }

    const headerRaw = b64urlDecode(parts[0])
    const payloadRaw = b64urlDecode(parts[1])
    const sigRaw = parts[2]
    if (!headerRaw || !payloadRaw) return { ...EMPTY_DECODED, error: "Failed to decode JWT parts — invalid Base64 encoding" }

    let headerObj: Record<string, unknown>, payloadObj: Record<string, unknown>
    try { headerObj = JSON.parse(headerRaw) as Record<string, unknown> } catch { headerObj = {} }
    try { payloadObj = JSON.parse(payloadRaw) as Record<string, unknown> } catch { payloadObj = {} }

    const alg = getAlgorithm(headerObj)
    const kid = getKid(headerObj)
    const jku = getJKU(headerObj)
    const jwk = getJWK(headerObj)
    const x5u = getX5u(headerObj)
    const x5c = headerObj?.x5c || null
    const x5t = headerObj?.["x5t#S256"] || headerObj?.x5t || null
    const critInput: string[] | null = headerObj?.crit || null
    const typ = getTyp(headerObj)

    const issues = buildSecurityIssues(headerObj, payloadObj, alg, kid, jku, jwk, x5u, x5c, x5t, critInput)
    const timeline = buildTokenTimeline(payloadObj, issues)
    const claims = extractClaims(payloadObj)
    const { tlIatPct, tlNbfPct, tlExpPct } = computeTimelinePcts(payloadObj)
    const score = computeScore(issues)

    let hashcatMode: string | null = null
    if (alg.toLowerCase() === "hs256") hashcatMode = "16500"
    else if (alg.toLowerCase() === "hs384") hashcatMode = "16600"
    else if (alg.toLowerCase() === "hs512") hashcatMode = "16700"
    else if (alg.toLowerCase() === "rs256" || alg.toLowerCase() === "rs384" || alg.toLowerCase() === "rs512") hashcatMode = "16610"
    else if (alg.toLowerCase() === "es256") hashcatMode = "16710"
    else if (alg.toLowerCase() === "es384") hashcatMode = "16720"
    else if (alg.toLowerCase() === "es512") hashcatMode = "16730"

    return {
      error: null, header: formatJSON(headerRaw), payload: formatJSON(payloadRaw),
      signature: sigRaw, alg, kid, jku, jwk, x5u, x5c, x5t, crit: critInput,
      typ, headerObj, payloadObj,
      verdict: algVerdict(alg), issues, score, hashcatMode, timeline, claims,
      tlIatPct, tlNbfPct, tlExpPct,
    }
  }, [token])

  useEffect(() => {
    const saved = localStorage.getItem("jwt-active-tab")
    if (saved === "encoder" || saved === "decoder") setActiveTab(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem("jwt-active-tab", activeTab)
  }, [activeTab])

  const copyPart = useCallback(async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedPart(id)
    setTimeout(() => setCopiedPart(null), 2000)
  }, [])

  const handleTabChange = useCallback(async (tab: "decoder" | "encoder") => {
    if (tab === "encoder" && parsed.headerObj && parsed.payloadObj) {
      setHeaderJson(JSON.stringify(parsed.headerObj, null, 2))
      setPayloadJson(JSON.stringify(parsed.payloadObj, null, 2))
      const alg = parsed.alg === "unknown" ? "HS256" : parsed.alg.toUpperCase()
      const validAlgos = ["HS256","HS384","HS512","RS256","RS384","RS512","ES256","ES384","ES512","PS256","PS384","PS512","EdDSA","NONE"]
      const matched = validAlgos.find(a => a === alg)
      if (matched) {
        const targetAlgo = matched === "NONE" ? "none" : matched
        setEncoderAlgo(targetAlgo)
        const isAsym = targetAlgo.startsWith("RS") || targetAlgo.startsWith("ES") || targetAlgo.startsWith("PS") || targetAlgo === "EdDSA"
        if (isAsym) {
          try {
            const kp = await generateKeyPairPem(targetAlgo)
            setSecretInput(kp.privateKey)
          } catch { setSecretInput("") }
        } else {
          setSecretInput(EXAMPLE_KEYS[targetAlgo as keyof typeof EXAMPLE_KEYS] || "")
        }
      }
      setVerifyResult(null)
      setEncodedResult({ token: "", signature: "" })
    }
    setActiveTab(tab)
  }, [parsed])

  const handleSign = useCallback(async () => {
    setSigning(true)
    setEncodedResult({ token: "", signature: "" })
    try {
      const result = await signJwt(headerJson, payloadJson, secretInput, encoderAlgo, isBase64urlSecret)
      setEncodedResult(result)
    } catch (e: unknown) {
      const err = e as Error
      setEncodedResult({ token: "", signature: "", error: `Signing failed: ${err?.message || err?.name || "Cause unknown. The key may not be valid for this algorithm."}` })
    }
    setSigning(false)
  }, [headerJson, payloadJson, secretInput, encoderAlgo, isBase64urlSecret])

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="JWT Debugger — Interactive Tools" />
      <MainSidebar />
      <main id="main-content" className="lg:pl-64">
        <div className="border-b border-border bg-black/50">
          <div className="mx-auto max-w-6xl px-6 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="flex items-center gap-1 text-primary hover:underline"><Home className="h-4 w-4" /></Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/interactive" className="text-primary hover:underline">Interactive Tools</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary">JWT Debugger</span>
            </nav>
          </div>
        </div>

        <div className="border-b border-border bg-gradient-to-br from-black via-zinc-900 to-black">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-600 to-yellow-400 shadow-md">
                <Key className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">JWT Debugger</h1>
                <p className="mt-1 text-muted-foreground">Decode, inspect, and analyze JSON Web Tokens for security vulnerabilities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mx-auto max-w-6xl px-6 pt-2">
          <div className="flex gap-1 rounded-xl border border-border/50 bg-card p-1 w-fit">
            <button onClick={() => handleTabChange("decoder")}
              className={cn("px-5 py-2 rounded-lg text-sm font-medium transition-all", activeTab === "decoder" && "bg-primary text-primary-foreground shadow-sm")}>
              Decode / Analyze
            </button>
            <button onClick={() => handleTabChange("encoder")}
              className={cn("px-5 py-2 rounded-lg text-sm font-medium transition-all", activeTab === "encoder" && "bg-primary text-primary-foreground shadow-sm")}>
              Encode / Create
            </button>
          </div>
        </div>

        {activeTab === "decoder" && (
        <div className="mx-auto max-w-6xl space-y-6 p-6">
          {/* Input */}
    <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-muted-foreground">JWT Token</label>
              <div className="flex items-center gap-2">
                <select value="" onChange={e => {
                  const v = e.target.value; if (v) {
                    setToken(v)
                    // pre‑fill verify key for HMAC examples
                    const algoKey = (Object.entries(EXAMPLE_TOKENS) as [string, string][]).find(([, jwt]) => jwt === v)?.[0]
                    if (algoKey && algoKey.startsWith("HS")) {
                      const secret = EXAMPLE_KEYS[algoKey as keyof typeof EXAMPLE_KEYS]
                      if (secret) setSecretInput(secret)
                    }
                  }
                }}
                  className="rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs text-muted-foreground focus:outline-none focus:border-primary">
                  <option value="" disabled>Load example token…</option>
                  {Object.entries(EXAMPLE_TOKENS).map(([algo, jwt]) => (
                    <option key={algo} value={jwt}>{algo === "none" ? "unsigned (none)" : algo}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-1 overflow-hidden rounded-xl border border-border/50 bg-card">
              <textarea value={token} onChange={e => setToken(e.target.value)}
                rows={4}
                className="w-full resize-y bg-transparent p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
                spellCheck={false}
                placeholder="Paste your JWT here..."
              />
              <div className="flex items-center justify-between border-t border-border/50 px-4 py-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{token.trim().length > 0 ? `${token.length} chars` : "Paste a JWT token to decode"}</span>
                  {token.trim().split(".").length === 3 && (
                    <span className="rounded bg-green-500/15 px-1.5 py-0.5 text-[9px] font-bold text-green-400">VALID JWT</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.readText().then(text => {
                        if (text) setToken(text)
                      }).catch(() => {})
                    }
                  }}
                    title="Paste from clipboard & decode"
                    className="flex items-center gap-1 rounded-lg bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary hover:bg-primary/20 transition-colors">
                    <ClipboardPaste className="h-3 w-3" />
                    Paste &amp; Decode
                  </button>
                  {(() => {
                    const parts = token.trim().split(".")
                    if (parts.length === 3) {
                      return (
                        <div className="flex items-center gap-1 font-mono text-[11px]">
                          <span className="text-green-400">{parts[0].length > 12 ? `${parts[0].slice(0, 12)}...` : parts[0]}</span>
                          <span className="text-muted-foreground/50">.</span>
                          <span className="text-blue-400">{parts[1].length > 12 ? `${parts[1].slice(0, 12)}...` : parts[1]}</span>
                          <span className="text-muted-foreground/50">.</span>
                          <span className="text-red-400">{parts[2].length > 12 ? `${parts[2].slice(0, 12)}...` : parts[2]}</span>
                        </div>
                      )
                    }
                    return null
                  })()}
                </div>
              </div>
            </div>
          </div>

          {/* Token metadata */}
          {parsed.header && (
            <div className="flex flex-wrap items-center gap-3 text-[10px] text-muted-foreground">
              <span className="rounded-md border border-border/30 bg-card px-2 py-1">{token.trim().length} chars</span>
              <span className="rounded-md border border-border/30 bg-card px-2 py-1">{parsed.claims.length} claims</span>
              {parsed.alg && <span className="rounded-md border border-border/30 bg-card px-2 py-1">alg: {parsed.alg}</span>}
              {parsed.signature && <span className="rounded-md border border-border/30 bg-card px-2 py-1">sig: {parsed.signature.substring(0, 12)}...</span>}
            </div>
          )}

          {parsed.error && (
            <div className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
              <AlertTriangle className="h-5 w-5 shrink-0 text-red-400" />
              <p className="text-sm text-red-300">{parsed.error}</p>
            </div>
          )}

          {parsed.header && (
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                {/* Security Score */}
                <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
                  <button onClick={() => toggleSection("secScore")} className="w-full text-left">
                    <div className={cn("flex items-center justify-between px-5 py-3 border-b border-border/50", parsed.score >= 80 ? "bg-gradient-to-r from-green-500/10 to-transparent" : parsed.score >= 50 ? "bg-gradient-to-r from-amber-500/10 to-transparent" : "bg-gradient-to-r from-red-500/10 to-transparent")}>
                      <div className="flex items-center gap-2">
                        <Shield className={cn("h-5 w-5", scoreColor(parsed.score))} />
                        <h3 className="text-sm font-bold text-foreground">Security Score</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={cn("text-2xl font-bold", scoreColor(parsed.score))}>{parsed.score}/100</span>
                        <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", expandedSections.has("secScore") ? "" : "-rotate-90")} />
                      </div>
                    </div>
                  </button>
                  {expandedSections.has("secScore") && <div className="p-5 pt-4 space-y-3">
                    <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                      <div className={cn("h-full rounded-full transition-all duration-700 ease-out", scoreBgColor(parsed.score))} style={{ width: `${parsed.score}%` }} />
                    </div>
                    <p className="text-xs font-medium text-muted-foreground leading-relaxed">
                      {parsed.score >= 80 ? "✓ No critical issues detected" : parsed.score >= 50 ? "⚠ Several issues found — review the alerts below" : "✗ Critical security vulnerabilities detected"}
                    </p>
                  </div>}
                </div>

                  {/* Security Issues */}
                {parsed.issues.filter(i => i.severity === "critical" || i.severity === "high").length > 0 && (
                  <div className="space-y-3">
                    <button onClick={() => toggleSection("secIssues")} className="w-full flex items-center gap-2 border-b border-red-500/20 pb-2">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                      <h3 className="text-sm font-bold uppercase tracking-wider text-red-400">Security Alerts</h3>
                      <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-bold text-red-400">{parsed.issues.filter(i => i.severity === "critical" || i.severity === "high").length}</span>
                      <ChevronDown className={cn("h-3.5 w-3.5 text-muted-foreground ml-auto transition-transform", expandedSections.has("secIssues") ? "" : "-rotate-90")} />
                    </button>
                    {expandedSections.has("secIssues") && parsed.issues.filter(i => i.severity === "critical" || i.severity === "high").map((issue, idx) => {
                      const Icon = issue.icon
                      return (
                        <div key={idx} className={cn("border-l-4 flex items-start gap-3 rounded-r-xl border p-4", issue.severity === "critical" ? "border-l-red-500 border-red-500/30 bg-red-500/10" : "border-l-orange-500 border-orange-500/30 bg-orange-500/10")}>
                          <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", issue.severity === "critical" ? "text-red-400" : "text-orange-400")} />
                          <div>
                            <p className={cn("text-sm font-semibold", issue.severity === "critical" ? "text-red-300" : "text-orange-300")}>{issue.title}</p>
                            <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{issue.description}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Decoded Header */}
                <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
                  <button onClick={() => toggleSection("secHeader")} className="w-full flex items-center justify-between border-b border-border/50 bg-gradient-to-r from-green-500/5 to-transparent px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-green-500/15">
                        <Shield className="h-3.5 w-3.5 text-green-400" />
                      </div>
                      <h3 className="text-sm font-bold text-foreground">Decoded Header</h3>
                    </div>
                    <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                      <div className="flex gap-0.5 rounded-lg border border-border/30 bg-muted/30 p-0.5">
                        <button onClick={() => setHeaderView("json")} className={cn("rounded-md px-2.5 py-1 text-[11px] font-medium transition-all", headerView === "json" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>JSON</button>
                        <button onClick={() => setHeaderView("claims")} className={cn("rounded-md px-2.5 py-1 text-[11px] font-medium transition-all", headerView === "claims" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>Claims Breakdown</button>
                      </div>
                      <button onClick={e => { e.stopPropagation(); copyPart(parsed.header || "", "header") }} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                        {copiedPart === "header" ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
                        {copiedPart === "header" ? "Copied" : "Copy"}
                      </button>
                      <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", expandedSections.has("secHeader") ? "" : "-rotate-90")} />
                    </div>
                  </button>
                  {expandedSections.has("secHeader") && (headerView === "json" ? (
                    <div className="relative">
                      <div className="absolute right-3 top-3 rounded bg-muted/80 px-2 py-0.5 text-[10px] text-muted-foreground font-mono">{Object.keys(parsed.headerObj || {}).length} fields</div>
                      <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed">{parsed.headerObj ? renderColoredJSON(parsed.headerObj) : parsed.header}</pre>
                    </div>
                  ) : (
                    <div className="divide-y divide-border/50">
                      {parsed.headerObj && Object.entries(parsed.headerObj).map(([key, val]) => {
                        const hdv = ["exp", "iat", "nbf"].includes(key) && typeof val === "number" ? `${val} (${new Date(val * 1000).toString()})` : String(val)
                        const hColor = key === "alg" ? "border-l-green-500/60" : key === "typ" ? "border-l-blue-500/60" : (["jku","jwk","x5u","kid"].includes(key) ? "border-l-amber-500/60" : "border-l-muted-foreground/20")
                        const valColor = typeof val === "boolean" ? "text-red-400" : (["exp","iat","nbf"].includes(key) && typeof val === "number" ? "text-blue-400" : typeof val === "string" || typeof val === "number" ? "text-green-400" : "text-muted-foreground")
                        return (
                        <div key={key} className={cn("border-l-2 px-5 py-3 hover:bg-muted/20 transition-colors", hColor)}>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <span className={cn("inline-flex rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                                key === "alg" ? "bg-green-500/15 text-green-400" :
                                key === "typ" ? "bg-blue-500/15 text-blue-400" :
                                ["jku","jwk","x5u","kid"].includes(key) ? "bg-amber-500/15 text-amber-400" :
                                "bg-muted text-muted-foreground")}>{key}</span>
                              <code className={cn("font-mono text-xs break-all", valColor)}>{hdv}</code>
                            </div>
                          </div>
                          {key === "alg" && <p className="mt-1.5 text-[11px] text-muted-foreground/70 leading-relaxed">The algorithm used to sign the JWT. <a href="https://datatracker.ietf.org/doc/html/rfc7518#section-3.1" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Learn more →</a></p>}
                          {key === "typ" && <p className="mt-1.5 text-[11px] text-muted-foreground/70 leading-relaxed">The media type of this complete JWT. <a href="https://datatracker.ietf.org/doc/html/rfc7519#section-5.1" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Learn more →</a></p>}
                          {key === "kid" && <p className="mt-1.5 text-[11px] text-muted-foreground/70 leading-relaxed">Key ID — a hint indicating which key was used to sign the JWT. <a href="https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.4" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Learn more →</a></p>}
                          {key === "jku" && <p className="mt-1.5 text-[11px] text-muted-foreground/70 leading-relaxed">JWK Set URL — a URI that refers to a resource for a set of JSON-encoded public keys. <a href="https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.2" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Learn more →</a></p>}
                          {key === "jwk" && <p className="mt-1.5 text-[11px] text-muted-foreground/70 leading-relaxed">JSON Web Key — the public key embedded directly in the JWT header. <a href="https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.3" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Learn more →</a></p>}
                          {key === "x5u" && <p className="mt-1.5 text-[11px] text-muted-foreground/70 leading-relaxed">X.509 URL — a URI that refers to a resource for the X.509 public key certificate. <a href="https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.5" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Learn more →</a></p>}
                          {key === "cty" && <p className="mt-1.5 text-[11px] text-muted-foreground/70 leading-relaxed">Content Type — declares the media type of the secured content (nested JWT). <a href="https://datatracker.ietf.org/doc/html/rfc7519#section-5.2" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Learn more →</a></p>}
                        </div>
                      )})}
                    </div>
                  ))}
                </div>

                {/* Decoded Payload */}
                <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
                  <button onClick={() => toggleSection("secPayload")} className="w-full flex items-center justify-between border-b border-border/50 bg-gradient-to-r from-blue-500/5 to-transparent px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-500/15">
                        <Info className="h-3.5 w-3.5 text-blue-400" />
                      </div>
                      <h3 className="text-sm font-bold text-foreground">Decoded Payload</h3>
                    </div>
                    <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                      <div className="flex gap-0.5 rounded-lg border border-border/30 bg-muted/30 p-0.5">
                        <button onClick={() => setPayloadView("json")} className={cn("rounded-md px-2.5 py-1 text-[11px] font-medium transition-all", payloadView === "json" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>JSON</button>
                        <button onClick={() => setPayloadView("claims")} className={cn("rounded-md px-2.5 py-1 text-[11px] font-medium transition-all", payloadView === "claims" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>Claims Breakdown</button>
                      </div>
                      <button onClick={e => { e.stopPropagation(); copyPart(parsed.payload || "", "payload") }} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                        {copiedPart === "payload" ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
                        {copiedPart === "payload" ? "Copied" : "Copy"}
                      </button>
                      <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", expandedSections.has("secPayload") ? "" : "-rotate-90")} />
                    </div>
                  </button>
                  {expandedSections.has("secPayload") && (payloadView === "json" ? (
                    <div className="relative">
                      <div className="absolute right-3 top-3 rounded bg-muted/80 px-2 py-0.5 text-[10px] text-muted-foreground font-mono">{Object.keys(parsed.payloadObj || {}).length} fields</div>
                      <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed">{parsed.payloadObj ? renderColoredJSON(parsed.payloadObj) : parsed.payload}</pre>
                    </div>
                  ) : (
                    <div className="divide-y divide-border/50">
                      {parsed.payloadObj && Object.entries(parsed.payloadObj).map(([key, val]) => {
                        const dv = typeof val === "object" ? JSON.stringify(val) : (["exp", "iat", "nbf"].includes(key) && typeof val === "number" ? `${val} (${new Date(val * 1000).toString()})` : String(val))
                        const claimSev = ["iss","sub","aud","exp","iat","nbf","jti"].includes(key.toLowerCase()) ? "good" : key === "permissions" ? "warn" : "info"
                        const borderColor = claimSev === "good" ? "border-l-green-500/60" : claimSev === "warn" ? "border-l-amber-500/60" : "border-l-muted-foreground/20"
                        const badgeColor = claimSev === "good" ? "bg-green-500/15 text-green-400" : claimSev === "warn" ? "bg-amber-500/15 text-amber-400" : "bg-muted text-muted-foreground"
                        const valColor = typeof val === "boolean" ? "text-red-400" : (["exp","iat","nbf"].includes(key) && typeof val === "number" ? "text-blue-400" : typeof val === "string" || typeof val === "number" ? "text-green-400" : "text-muted-foreground")
                        return (
                          <div key={key} className={cn("border-l-2 px-5 py-3 hover:bg-muted/20 transition-colors", borderColor)}>
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <span className={cn("inline-flex rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider", badgeColor)}>{key}</span>
                                <code className={cn("font-mono text-xs break-all", valColor)}>{dv}</code>
                              </div>
                            </div>
                            {key === "sub" && <p className="mt-1.5 text-[11px] text-muted-foreground/70 leading-relaxed">The sub (subject) claim identifies the principal that is the subject of the JWT. <a href="https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.2" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Learn more →</a></p>}
                            {key === "iat" && <p className="mt-1.5 text-[11px] text-muted-foreground/70 leading-relaxed">The iat (issued at) claim identifies the time at which the JWT was issued. This claim can be used to determine the age of the JWT. <a href="https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.6" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Learn more →</a><br /><span className="text-[11px] text-muted-foreground/60">This value must be a NumericDate type, representing seconds.</span></p>}
                            {key === "exp" && <p className="mt-1.5 text-[11px] text-muted-foreground/70 leading-relaxed">The exp (expiration time) claim identifies the expiration time on or after which the JWT MUST NOT be accepted for processing. <a href="https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.4" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Learn more →</a></p>}
                            {key === "nbf" && <p className="mt-1.5 text-[11px] text-muted-foreground/70 leading-relaxed">The nbf (not before) claim identifies the time before which the JWT MUST NOT be accepted for processing. <a href="https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.5" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Learn more →</a></p>}
                            {key === "iss" && <p className="mt-1.5 text-[11px] text-muted-foreground/70 leading-relaxed">The iss (issuer) claim identifies the principal that issued the JWT. <a href="https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.1" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Learn more →</a></p>}
                            {key === "aud" && <p className="mt-1.5 text-[11px] text-muted-foreground/70 leading-relaxed">The aud (audience) claim identifies the recipients that the JWT is intended for. <a href="https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.3" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Learn more →</a></p>}
                            {key === "jti" && <p className="mt-1.5 text-[11px] text-muted-foreground/70 leading-relaxed">The jti (JWT ID) claim provides a unique identifier for the JWT. <a href="https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.7" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Learn more →</a></p>}
                            {key === "permissions" && <p className="mt-1.5 text-[11px] text-muted-foreground/70 leading-relaxed">The permissions granted to the token bearer for accessing resources.</p>}
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>

                {/* Timeline */}
                {Object.keys(parsed.timeline || {}).length > 0 && (
                  <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
                    <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500/5 to-transparent px-5 py-2 border-b border-border/50">
                      <Clock className="h-3.5 w-3.5 text-blue-400" />
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Timeline</h3>
                    </div>
                    <div className="p-5 space-y-4">
                      {parsed.timeline?.iat && (
                        <div className="flex items-center justify-between text-sm border-l-2 border-green-500/50 pl-3">
                          <span className="text-muted-foreground font-medium">Issued (iat)</span>
                          <div className="text-right">
                            <span className="text-foreground">{parsed.timeline.iat.date}</span>
                            <span className="ml-2 text-xs text-muted-foreground">({parsed.timeline.iat.relative})</span>
                          </div>
                        </div>
                      )}
                      {parsed.timeline?.nbf && (
                        <div className="flex items-center justify-between text-sm border-l-2 border-amber-500/50 pl-3">
                          <span className="text-muted-foreground font-medium">Not Before (nbf)</span>
                          <div className="text-right">
                            <span className="text-foreground">{parsed.timeline.nbf.date}</span>
                            <span className={cn("ml-2 text-xs", parsed.timeline.nbf.future ? "text-orange-400 font-medium" : "text-muted-foreground")}>({parsed.timeline.nbf.relative})</span>
                          </div>
                        </div>
                      )}
                      {parsed.timeline?.exp && (
                        <div className={cn("flex items-center justify-between text-sm border-l-2 pl-3", parsed.timeline.exp.expired ? "border-l-red-500/50" : "border-l-green-500/50")}>
                          <span className="text-muted-foreground font-medium">Expires (exp)</span>
                          <div className="text-right">
                            <span className={parsed.timeline.exp.expired ? "text-red-400 font-medium" : "text-green-400 font-medium"}>{parsed.timeline.exp.date}</span>
                            <span className={cn("ml-2 text-xs", parsed.timeline.exp.expired ? "text-red-400" : "text-green-400")}>({parsed.timeline.exp.relative})</span>
                          </div>
                        </div>
                      )}
                      {(parsed.timeline?.iat || parsed.timeline?.nbf || parsed.timeline?.exp) && (
                        <div className="relative h-2.5 overflow-hidden rounded-full bg-muted">
                          <div className="absolute left-0 top-0 h-full rounded-full bg-green-500" style={{ width: `${parsed.tlNbfPct}%` }} />
                          {parsed.timeline?.nbf && (
                            <div className="absolute top-0 h-full rounded-full bg-amber-500" style={{ left: `${parsed.tlNbfPct}%`, width: `${Math.max(1, parsed.tlExpPct - parsed.tlNbfPct)}%` }} />
                          )}
                          {parsed.timeline?.exp && (
                            <div className="absolute top-0 h-full rounded-full bg-red-500" style={{ left: `${parsed.tlExpPct}%`, width: `${Math.max(1, 100 - parsed.tlExpPct)}%` }} />
                          )}
                        </div>
                      )}
                      <div className="flex justify-between text-[10px] font-medium">
                        <span className={cn(parsed.timeline?.iat ? "text-green-400" : "text-muted-foreground/50")}>iat</span>
                        <span className={cn(parsed.timeline?.nbf ? "text-amber-400" : "text-muted-foreground/50")}>nbf</span>
                        <span className={cn(parsed.timeline?.exp ? "text-red-400" : "text-muted-foreground/50")}>exp</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {/* Algorithm */}
                <div className={cn("rounded-xl border overflow-hidden", parsed.verdict?.color?.includes("red") ? "border-red-500/30" : parsed.verdict?.color?.includes("orange") ? "border-orange-500/30" : "border-border/50")}>
                  <div className={cn("px-5 py-2", parsed.verdict?.color?.includes("red") ? "bg-red-500/10" : parsed.verdict?.color?.includes("orange") ? "bg-orange-500/10" : "bg-card")}>
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Algorithm</h3>
                  </div>
                  <div className="p-5 pt-3">
                    <div className="flex items-center gap-3">
                      <span className={cn("rounded-lg px-3 py-1 font-mono text-lg font-bold", parsed.verdict?.color?.includes("red") ? "bg-red-500/20 text-red-300" : parsed.verdict?.color?.includes("orange") ? "bg-orange-500/20 text-orange-300" : "bg-muted text-foreground")}>{parsed.alg}</span>
                    </div>
                    <p className={cn("mt-2 text-xs font-medium", parsed.verdict?.color || "text-muted-foreground")}>{parsed.verdict?.text}</p>
                    {parsed.typ && <p className="mt-1 text-xs text-muted-foreground">Type: <code className="font-mono font-bold">{parsed.typ}</code></p>}
                  </div>
                </div>

                {/* Medium/Info issues */}
                {parsed.issues.filter(i => i.severity === "medium" || i.severity === "info").length > 0 && (
                  <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
                    <div className="flex items-center justify-between bg-gradient-to-r from-amber-500/5 to-transparent px-5 py-2 border-b border-border/50">
                      <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground"><Info className="h-3.5 w-3.5" /> Findings</h3>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">{parsed.issues.filter(i => i.severity === "medium" || i.severity === "info").length}</span>
                    </div>
                    <div className="divide-y divide-border/30">
                      {parsed.issues.filter(i => i.severity === "medium" || i.severity === "info").map((issue, idx) => {
                        const Icon = issue.icon
                        return (
                          <div key={idx} className={cn("flex items-start gap-3 px-5 py-3", issue.severity === "medium" ? "bg-amber-500/[0.03]" : "")}>
                            <Icon className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", issue.severity === "medium" ? "text-orange-400" : "text-muted-foreground")} />
                            <div>
                              <p className="text-xs font-semibold text-foreground">{issue.title}</p>
                              <p className="mt-0.5 text-[11px] text-muted-foreground leading-relaxed">{issue.description}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* JOSE Headers Group */}
                {(parsed.kid || parsed.jku || parsed.x5u || parsed.jwk || parsed.x5c || parsed.x5t || parsed.crit) && (
                  <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
                    <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500/5 to-transparent px-5 py-2 border-b border-border/50">
                      <Key className="h-3.5 w-3.5 text-amber-400" />
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">JOSE Headers</h3>
                    </div>
                    <div className="divide-y divide-border/30">
                      {parsed.kid && (
                        <div className="px-5 py-3">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Key ID (kid)</span>
                            {kidIsDangerous(parsed.kid) && <span className="rounded bg-red-500/15 px-1.5 py-0.5 text-[9px] font-bold text-red-400">INJECTION RISK</span>}
                          </div>
                          <code className="block break-all rounded bg-muted px-2 py-1.5 font-mono text-xs text-foreground">{parsed.kid}</code>
                          {kidIsDangerous(parsed.kid) && <p className="mt-1.5 text-[10px] text-red-400">Special chars detected — possible injection</p>}
                        </div>
                      )}
                      {parsed.jku && (
                        <div className="px-5 py-3">
                          <span className="block mb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">JWK Set URL (jku)</span>
                          <code className="block break-all rounded bg-muted px-2 py-1.5 font-mono text-xs text-orange-400">{parsed.jku}</code>
                          <p className="mt-1.5 text-[10px] text-muted-foreground">Verify this URL is HTTPS and points to a trusted JWK set</p>
                        </div>
                      )}
                      {parsed.jwk && (
                        <div className="px-5 py-3">
                          <span className="block mb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">JSON Web Key (jwk)</span>
                          <pre className="overflow-x-auto rounded bg-muted p-2 font-mono text-[10px] text-orange-400">{JSON.stringify(parsed.jwk, null, 1)}</pre>
                          <p className="mt-1.5 text-[10px] text-red-400 font-medium">Embedded key — verify trust before using</p>
                        </div>
                      )}
                      {parsed.x5c && (
                        <div className="px-5 py-3">
                          <span className="block mb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">X.509 Certificate (x5c)</span>
                          <code className="block break-all rounded bg-muted px-2 py-1.5 font-mono text-[10px] text-foreground">{parsed.x5c.length} certificate{(parsed.x5c.length || 0) > 1 ? "s" : ""} in chain</code>
                          <p className="mt-1.5 text-[10px] text-muted-foreground">First certificate: <code className="font-mono">{parsed.x5c[0]?.substring(0, 40)}...</code></p>
                        </div>
                      )}
                      {parsed.x5t && (
                        <div className="px-5 py-3">
                          <span className="block mb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">X.509 Thumbprint (x5t)</span>
                          <code className="block break-all rounded bg-muted px-2 py-1.5 font-mono text-xs text-foreground">{parsed.x5t}</code>
                        </div>
                      )}
                      {parsed.x5u && (
                        <div className="px-5 py-3">
                          <span className="block mb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">X.509 URL (x5u)</span>
                          <code className="block break-all rounded bg-muted px-2 py-1.5 font-mono text-xs text-orange-400">{parsed.x5u}</code>
                        </div>
                      )}
                      {parsed.crit && parsed.crit.length > 0 && (
                        <div className="px-5 py-3">
                          <span className="block mb-1.5 text-[10px] font-bold uppercase tracking-wider text-red-400">Critical Headers (crit)</span>
                          <div className="flex flex-wrap gap-1">
                            {parsed.crit.map((h: string) => (
                              <span key={h} className="rounded bg-red-500/15 px-1.5 py-0.5 text-[10px] font-bold text-red-400">{h}</span>
                            ))}
                          </div>
                          <p className="mt-1.5 text-[10px] text-red-400">Token MUST be rejected if these headers are not understood</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Signature */}
                <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
                  <div className="flex items-center justify-between bg-gradient-to-r from-purple-500/5 to-transparent px-5 py-2 border-b border-border/50">
                    <div className="flex items-center gap-2">
                      <Fingerprint className="h-3.5 w-3.5 text-purple-400" />
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Signature</h3>
                    </div>
                    <button onClick={() => copyPart(parsed.signature || "", "signature")} className="flex items-center gap-1.5 text-[10px] text-muted-foreground hover:text-foreground transition-colors font-medium">
                      {copiedPart === "signature" ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3" />}
                      {copiedPart === "signature" ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="p-5">
                    <code className="block break-all rounded bg-muted px-3 py-2 font-mono text-xs text-foreground">{parsed.signature?.substring(0, 48)}{(parsed.signature?.length || 0) > 48 ? "..." : ""}</code>
                    <p className="mt-2 text-[11px] text-muted-foreground">Signature verification requires the secret/public key</p>
                  </div>
                </div>

                {/* Signature Verification */}
                <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-cyan-500/5 to-transparent border-b border-border/50 px-5 py-2">
                    <Fingerprint className="h-3.5 w-3.5 text-cyan-400" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Signature Verification</h3>
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="rounded-lg border border-border/30 bg-muted/20 px-3 py-2">
                      <p className="text-[11px] text-muted-foreground">{parsed.alg?.toLowerCase().startsWith("hs") ? "Enter the secret used to sign the JWT below:" : "Paste the public key to verify the signature:"}</p>
                    </div>
                    {parsed.alg?.toLowerCase().startsWith("hs") && verifyKey.trim().length > 0 && (
                      <SecretStrengthIndicator secret={verifyKey} />
                    )}
                    <textarea value={verifyKey} onChange={e => { setVerifyKey(e.target.value); setVerifyResult(null) }}
                      rows={4}
                      placeholder={parsed.alg?.toLowerCase().startsWith("hs") ? "Paste the HMAC secret..." : "-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----"}
                      className="w-full resize-y rounded-lg border border-border bg-muted/30 p-3 font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary"
                    />
                    <button onClick={async () => {
                      if (!verifyKey.trim()) return
                      setVerifying(true)
                      setVerifyResult(null)
                      try {
                        const result = await verifyJwt(token, verifyKey, parsed.alg)
                        setVerifyResult(result)
                      } catch (e: unknown) {
                        const err = e as Error
                        setVerifyResult({ valid: false, error: err.message || "Unknown error" })
                      }
                      setVerifying(false)
                    }} disabled={verifying || !verifyKey.trim() || !parsed.header}
                      className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all w-fit shadow-sm">
                      {verifying ? <><RefreshCw className="h-3.5 w-3.5 animate-spin" /> Verifying...</> : <><Fingerprint className="h-3.5 w-3.5" /> Verify Signature</>}
                    </button>
                    {verifyResult && (
                      <div className={cn("flex items-start gap-3 rounded-xl border-l-4 p-4", verifyResult.valid ? "border-l-green-500 border-green-500/30 bg-green-500/10" : "border-l-red-500 border-red-500/30 bg-red-500/10")}>
                        {verifyResult.valid ? <Check className="h-5 w-5 shrink-0 text-green-400 mt-0.5" /> : <AlertTriangle className="h-5 w-5 shrink-0 text-red-400 mt-0.5" />}
                        <div>
                          <p className={cn("text-sm font-bold", verifyResult.valid ? "text-green-300" : "text-red-300")}>
                            {verifyResult.valid ? "Signature is VALID ✓" : "Signature is INVALID ✗"}
                          </p>
                          {verifyResult.error && <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{verifyResult.error}</p>}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Hashcat command */}
                {parsed.hashcatMode && (
                  <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
                    <div className="flex items-center gap-2 bg-gradient-to-r from-green-500/5 to-transparent px-5 py-2 border-b border-border/50">
                      <Terminal className="h-3.5 w-3.5 text-green-400" />
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Crack with hashcat</h3>
                    </div>
                    <div className="p-5">
                      <code className="block break-all rounded bg-black/90 px-3 py-2.5 font-mono text-xs text-green-400 border border-green-500/20">hashcat -m {parsed.hashcatMode} jwt.txt wordlist.txt</code>
                      <p className="mt-2 text-[11px] text-muted-foreground">Extract the full token to <code className="font-mono font-bold">jwt.txt</code> and run against a wordlist</p>
                    </div>
                  </div>
                )}

                {/* Common attacks */}
                <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-red-500/5 to-transparent px-5 py-2 border-b border-border/50">
                    <Skull className="h-3.5 w-3.5 text-red-400" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Common Attacks</h3>
                  </div>
                  <div className="p-5">
                    <ul className="space-y-2 text-xs">
                      <li className="flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 rounded-full bg-red-400 shrink-0"></span><span className="text-red-400 font-medium">alg=none</span><span className="text-muted-foreground">— set algorithm to none</span></li>
                      <li className="flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 rounded-full bg-orange-400 shrink-0"></span><span className="text-orange-400 font-medium">RS→HS confusion</span><span className="text-muted-foreground">— use public key as HMAC secret</span></li>
                      <li className="flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 rounded-full bg-orange-400 shrink-0"></span><span className="text-orange-400 font-medium">kid injection</span><span className="text-muted-foreground">— SQLi, path traversal in kid</span></li>
                      <li className="flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 rounded-full bg-orange-400 shrink-0"></span><span className="text-orange-400 font-medium">JKU injection</span><span className="text-muted-foreground">— point JKU to attacker JWK set</span></li>
                      <li className="flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 rounded-full bg-yellow-400 shrink-0"></span><span className="text-yellow-400 font-medium">Weak HMAC secret</span><span className="text-muted-foreground">— crack with hashcat (mode 16500)</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        )}

        {activeTab === "encoder" && (
        <div className="mx-auto max-w-6xl space-y-6 p-6" onKeyDown={e => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey) && !signing && headerValid && payloadValid && secretValid) { e.preventDefault(); handleSign() } }}>
          <div>
            <h2 className="text-xl font-bold text-foreground">JWT Encoder</h2>
            <p className="text-sm text-muted-foreground mt-1">Create and sign a new JSON Web Token</p>
          </div>

          {/* Generate example + Algorithm */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button onClick={async () => {
              const currentAlgo = encoderAlgo === "none" ? "HS256" : encoderAlgo
              setHeaderJson(JSON.stringify({ alg: currentAlgo, typ: "JWT" }, null, 2))
              setPayloadJson(JSON.stringify({ sub: "1234567890", name: "John Doe", admin: true, iat: Math.floor(Date.now() / 1000) }, null, 2))
              setEncoderAlgo(currentAlgo)
              const isAsym = currentAlgo.startsWith("RS") || currentAlgo.startsWith("ES") || currentAlgo.startsWith("PS") || currentAlgo === "EdDSA"
              if (isAsym) {
                try {
                  const kp = await generateKeyPairPem(currentAlgo)
                  setSecretInput(kp.privateKey)
                } catch { setSecretInput("") }
              } else {
                setSecretInput(EXAMPLE_KEYS[currentAlgo as keyof typeof EXAMPLE_KEYS] || "")
              }
              setEncodedResult({ token: "", signature: "" })
              setVerifyResult(null)
            }} className="flex items-center gap-2 rounded-xl border border-border/50 bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">
              <Wand2 className="h-4 w-4" /> Generate Example
            </button>
            <div className="flex items-center gap-3">
              <label className="text-sm text-muted-foreground whitespace-nowrap font-medium">Signing Algorithm</label>
              <select value={encoderAlgo} onChange={async e => {
                const newAlgo = e.target.value
                setEncoderAlgo(newAlgo)
                const isAsym = newAlgo.startsWith("RS") || newAlgo.startsWith("ES") || newAlgo.startsWith("PS") || newAlgo === "EdDSA"
                if (isAsym) {
                  setGeneratingKey(true)
                  try {
                    const kp = await generateKeyPairPem(newAlgo)
                    setSecretInput(kp.privateKey)
                  } catch { setSecretInput("") }
                  setGeneratingKey(false)
                } else {
                  const exampleKey = EXAMPLE_KEYS[newAlgo as keyof typeof EXAMPLE_KEYS]
                  if (exampleKey !== undefined) setSecretInput(exampleKey)
                }
                try {
                  const h = JSON.parse(headerJson)
                  h.alg = newAlgo === "none" ? "none" : newAlgo
                  setHeaderJson(JSON.stringify(h, null, 2))
                } catch {}
                setEncodedResult({ token: "", signature: "" })
              }}
                className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary min-w-[200px]">
                <option value="none">none</option>
                <option value="HS256">HS256</option>
                <option value="HS384">HS384</option>
                <option value="HS512">HS512</option>
                <option value="RS256">RS256</option>
                <option value="RS384">RS384</option>
                <option value="RS512">RS512</option>
                <option value="ES256">ES256</option>
                <option value="ES384">ES384</option>
                <option value="ES512">ES512</option>
                <option value="PS256">PS256</option>
                <option value="PS384">PS384</option>
                <option value="PS512">PS512</option>
                <option value="EdDSA">EdDSA (Ed25519)</option>
              </select>
            </div>
          </div>

          {/* Header */}
          <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
            <div className="flex items-center justify-between border-b border-border/50 px-5 py-3">
              <div>
                <h3 className="text-sm font-bold text-foreground">Header</h3>
                <p className="text-xs text-muted-foreground">json</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => { try { setHeaderJson(JSON.stringify(JSON.parse(headerJson), null, 2)) } catch { /* ignore */ } }} className="flex items-center gap-1 rounded-md border border-border/30 px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Format JSON
                </button>
                <button onClick={() => copyPart(headerJson, "header-json")} className="flex items-center gap-1 rounded-md border border-border/30 px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  {copiedPart === "header-json" ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiedPart === "header-json" ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
            <textarea value={headerJson} onChange={e => setHeaderJson(e.target.value)}
              rows={4}
              className="w-full resize-y bg-transparent p-5 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
              spellCheck={false}
            />
            <div className="border-t border-border/50 px-5 py-2">
              {headerValid && <span className="flex items-center gap-1 text-xs text-green-400"><Shield className="h-3 w-3" /> Valid header</span>}
              {!headerValid && <span className="text-xs text-red-400">Invalid JSON</span>}
            </div>
          </div>

          {/* Payload */}
          <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
            <div className="flex items-center justify-between border-b border-border/50 px-5 py-3">
              <div>
                <h3 className="text-sm font-bold text-foreground">Payload</h3>
                <p className="text-xs text-muted-foreground">json</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => { try { setPayloadJson(JSON.stringify(JSON.parse(payloadJson), null, 2)) } catch { /* ignore */ } }} className="flex items-center gap-1 rounded-md border border-border/30 px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Format JSON
                </button>
                <button onClick={() => copyPart(payloadJson, "payload-json")} className="flex items-center gap-1 rounded-md border border-border/30 px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  {copiedPart === "payload-json" ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiedPart === "payload-json" ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
            <textarea value={payloadJson} onChange={e => setPayloadJson(e.target.value)}
              rows={Math.max(4, (payloadJson.match(/\n/g) || []).length + 1)}
              className="w-full resize-y bg-transparent p-5 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none min-h-[120px]"
              spellCheck={false}
            />
            <div className="border-t border-border/50 px-5 py-2">
              {payloadValid && <span className="flex items-center gap-1 text-xs text-green-400"><Shield className="h-3 w-3" /> Valid payload</span>}
              {!payloadValid && <span className="text-xs text-red-400">Invalid JSON</span>}
            </div>
          </div>

          {/* Sign JWT button */}
          <button onClick={handleSign} disabled={signing || !headerValid || !payloadValid || !secretValid}
            className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all w-fit">
            {signing ? "Signing..." : "Sign JWT"}
          </button>

          {/* Key section */}
          {isNoneAlgo ? (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
              <p className="text-xs text-amber-400 font-medium">No signature — alg=none produces an unsigned token</p>
            </div>
          ) : (
          <div className="rounded-xl border border-border/50 bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">
                {isAsymmetric ? "Private Key" : "Secret Key"}
              </h3>
              <div className="flex items-center gap-2">
                <button onClick={() => setSecretInput("")} className="flex items-center gap-1 rounded-md border border-border/30 px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <Trash2 className="h-3 w-3" /> Clear
                </button>
                <button onClick={() => copyPart(secretInput, "secret-key")} className="flex items-center gap-1 rounded-md border border-border/30 px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  {copiedPart === "secret-key" ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiedPart === "secret-key" ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
            {isAsymmetric ? (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <textarea value={secretInput} onChange={e => { setSecretInput(e.target.value); setEncodedResult({ token: "", signature: "" }) }}
                    rows={8}
                    placeholder="Paste your PKCS#8 PEM private key..."
                    className="flex-1 resize-y rounded-lg border border-border bg-muted/30 p-3 font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button onClick={async () => {
                    setGeneratingKey(true)
                    try {
                      const kp = await generateKeyPairPem(encoderAlgo)
                      setSecretInput(kp.privateKey)
                    } catch (e: unknown) {
                      const err = e as Error
                      setEncodedResult({ token: "", signature: "", error: `Key generation failed: ${err?.message || "Unknown error"}` })
                    }
                    setGeneratingKey(false)
                  }} disabled={generatingKey}
                    className="flex items-center gap-1 rounded-md border border-border/30 px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50">
                    <RefreshCw className={cn("h-3 w-3", generatingKey && "animate-spin")} /> Generate New Key Pair
                  </button>
                  {secretInput.trim() && secretInput.includes("BEGIN") && (
                    <span className="flex items-center gap-1 text-xs text-green-400"><Shield className="h-3 w-3" /> Private key loaded</span>
                  )}
                  {(!secretInput.trim() || !secretInput.includes("BEGIN")) && (
                    <span className="text-xs text-orange-400">Paste a PKCS#8 PEM private key for {encoderAlgo}</span>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <input type="text" value={secretInput} onChange={e => { setSecretInput(e.target.value); setEncodedResult({ token: "", signature: "" }) }}
                    className="flex-1 rounded-lg border border-border bg-muted/30 px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                    placeholder="Enter your secret key..."
                  />
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" checked={isBase64urlSecret} onChange={e => { setIsBase64urlSecret(e.target.checked); setEncodedResult({ token: "", signature: "" }) }}
                      className="h-3.5 w-3.5 rounded border-border accent-cyan-500 cursor-pointer" />
                    <span className="text-[11px] font-medium text-muted-foreground">Base64URL Encoded</span>
                  </label>

                  {/* Secret strength */}
                  {(() => {
                    const len = secretInput.length
                    const hasUpper = /[A-Z]/.test(secretInput)
                    const hasLower = /[a-z]/.test(secretInput)
                    const hasDigit = /[0-9]/.test(secretInput)
                    const hasSpecial = /[^A-Za-z0-9]/.test(secretInput)
                    const score = (len >= 8 ? 1 : 0) + (len >= 16 ? 1 : 0) + (hasUpper ? 1 : 0) + (hasLower ? 1 : 0) + (hasDigit ? 1 : 0) + (hasSpecial ? 1 : 0)
                    if (secretInput.length === 0) return null
                    return (
                      <span className={cn("flex items-center gap-1 text-xs", score >= 5 ? "text-green-400" : score >= 3 ? "text-amber-400" : "text-red-400")}>
                        <Shield className="h-3 w-3" />
                        {score >= 5 ? "Strong" : score >= 3 ? "Medium" : "Weak"}
                      </span>
                    )
                  })()}
                  {!secretValid && secretInput.length > 0 && <span className="text-xs text-orange-400">Minimum {minHmacLen} characters recommended for {encoderAlgo}</span>}
                </div>
              </div>
            )}
          </div>
          )}

          {/* Encoder error */}
          {encodedResult.error && (
            <div className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
              <AlertTriangle className="h-5 w-5 shrink-0 text-red-400" />
              <p className="text-sm text-red-300">{encodedResult.error}</p>
            </div>
          )}

          {/* Encoded JWT — always visible */}
          <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
            <div className="flex items-center justify-between border-b border-border/50 px-5 py-3">
              <h3 className="text-sm font-semibold text-foreground">Encoded JWT</h3>
              <div className="flex items-center gap-2">
                {encodedResult.token && (
                  <button onClick={() => copyPart(encodedResult.token, "encoded-jwt")} className="flex items-center gap-1.5 rounded-md border border-border/30 px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                    {copiedPart === "encoded-jwt" ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
                    {copiedPart === "encoded-jwt" ? "Copied!" : "Copy JWT"}
                  </button>
                )}
              </div>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-sm text-foreground break-all whitespace-pre-wrap">
              {encodedResult.token || "Click \"Sign JWT\" above to generate your encoded token."}
            </pre>
          </div>
        </div>
        )}
      </main>
    </div>
  )
}

function SecretStrengthIndicator({ secret }: { secret: string }) {
  const len = secret.length
  const charTypes = new Set(
    [...secret].map(c => {
      if (/[a-z]/.test(c)) return "lower"
      if (/[A-Z]/.test(c)) return "upper"
      if (/[0-9]/.test(c)) return "digit"
      return "special"
    })
  )
  const score = Math.min(100, Math.round(len * (1 + charTypes.size * 0.25) * 2.5))
  const label = score < 30 ? "Weak" : score < 60 ? "Fair" : score < 85 ? "Good" : "Strong"
  const color = score < 30 ? "bg-red-500" : score < 60 ? "bg-amber-500" : score < 85 ? "bg-blue-500" : "bg-green-500"
  const textColor = score < 30 ? "text-red-400" : score < 60 ? "text-amber-400" : score < 85 ? "text-blue-400" : "text-green-400"
  return (
    <div className="flex items-center gap-2 px-1">
      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
        <div className={`h-full ${color} transition-all duration-300`} style={{ width: `${score}%` }} />
      </div>
      <span className={`text-[10px] font-bold ${textColor}`}>{label}</span>
    </div>
  )
}
