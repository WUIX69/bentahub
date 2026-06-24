/**
 * Decodes base64url encoded string into standard Uint8Array.
 */
function base64urlToBytes(base64url: string): Uint8Array {
  let base64 = base64url.replace(/-/g, "+").replace(/_/g, "/")
  const pad = base64.length % 4
  if (pad === 2) base64 += "=="
  else if (pad === 3) base64 += "="

  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

/**
 * Verify and decode a JWT using standard Web Crypto APIs (supported in Edge Runtime).
 * Returns the decoded payload on success, or null if the signature is invalid/expired.
 */
export async function verifyJwtEdge(token: string, secret: string): Promise<Record<string, unknown> | null> {
  try {
    const parts = token.split(".")
    if (parts.length !== 3) return null

    const [headerB64, payloadB64, signatureB64] = parts

    const encoder = new TextEncoder()
    const keyData = encoder.encode(secret)
    const key = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    )

    const signature = base64urlToBytes(signatureB64)
    const data = encoder.encode(`${headerB64}.${payloadB64}`)

    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      signature as BufferSource,
      data as BufferSource
    )
    if (!isValid) return null

    const payloadStr = new TextDecoder().decode(base64urlToBytes(payloadB64))
    const payload = JSON.parse(payloadStr) as Record<string, unknown>

    // Verify expiration time
    if (payload.exp && typeof payload.exp === "number" && Date.now() >= payload.exp * 1000) {
      return null
    }

    return payload
  } catch (err) {
    console.error("verifyJwtEdge failed:", err)
    return null
  }
}
