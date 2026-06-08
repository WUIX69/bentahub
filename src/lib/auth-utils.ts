import crypto from "crypto"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

// ---------------------------------------------------------------------------
// Environment validation — fail fast if JWT_SECRET is not configured
// ---------------------------------------------------------------------------

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error(
      "FATAL: JWT_SECRET environment variable is not set. " +
        "The application cannot start without a valid secret for signing tokens."
    )
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
