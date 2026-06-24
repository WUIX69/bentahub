import crypto from "crypto"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    // Return a default during dev if not set to prevent crash during builds/pushes
    return "default-secret-key-for-development-purposes-only"
  }
  return secret
}

const JWT_SECRET: string = getJwtSecret()

/** Number of bcrypt salt rounds used for password hashing. */
const BCRYPT_SALT_ROUNDS = 10

/** JWT token expiration time. */
const TOKEN_EXPIRY = "7d"

// ---------------------------------------------------------------------------
// Token payload type
// ---------------------------------------------------------------------------

export interface TokenPayload {
  userId: string
  email: string
  fullName: string
  role: string
}

// ---------------------------------------------------------------------------
// ID & code generation (cryptographically secure)
// ---------------------------------------------------------------------------

/** Generate a cryptographically secure UUID v4 for database record IDs. */
export function generateId(): string {
  return crypto.randomUUID()
}

/** Generate a cryptographically secure 6-digit verification code. */
export function generateVerificationCode(): string {
  return crypto.randomInt(100000, 999999).toString()
}

/** Hash the 6-digit verification code using SHA-256 for secure DB storage. */
export function hashVerificationCode(code: string): string {
  return crypto.createHash("sha256").update(code).digest("hex")
}

// ---------------------------------------------------------------------------
// Password hashing & verification
// ---------------------------------------------------------------------------

/** Hash a plaintext password using bcrypt. */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcryptjs.genSalt(BCRYPT_SALT_ROUNDS)
  return bcryptjs.hash(password, salt)
}

/** Compare a plaintext password against a bcrypt hash. */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcryptjs.compare(password, hash)
}

// ---------------------------------------------------------------------------
// JWT token management
// ---------------------------------------------------------------------------

/** Sign a new JWT containing the user's identity and role. */
export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY })
}

/** Verify and decode a JWT. Returns the payload on success, `null` on failure. */
export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as unknown as TokenPayload
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Token extraction from NextRequest
// ---------------------------------------------------------------------------

export interface RequestLike {
  headers?: {
    get?: (name: string) => string | null
  }
  cookies?: {
    get?: (name: string) => { value: string } | string | null | undefined
  } | Record<string, string>
}

/**
 * Extract a Bearer token from a request's Authorization header or HTTP-only cookies.
 * Returns `null` if the token is missing or malformed.
 */
export function extractToken(request: RequestLike): string | null {
  // 1. Try Authorization header
  const header = typeof request.headers?.get === "function"
    ? request.headers.get("Authorization")
    : (request.headers as Record<string, string | undefined>)?.[
        "authorization"
      ]

  if (header && header.startsWith("Bearer ")) {
    return header.slice(7)
  }

  // 2. Try Cookies
  if (request.cookies) {
    if (typeof request.cookies.get === "function") {
      const cookie = request.cookies.get("auth_token")
      if (cookie) {
        return typeof cookie === "string" ? cookie : cookie.value
      }
    } else {
      const cookiesObj = request.cookies as Record<string, string | undefined>
      if (cookiesObj["auth_token"]) {
        return cookiesObj["auth_token"]
      }
    }
  }

  return null
}
