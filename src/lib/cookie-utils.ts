/**
 * Shared cookie configuration for the auth_token.
 *
 * Centralised here so every endpoint that sets or clears the cookie
 * uses identical options (httpOnly, sameSite, secure, maxAge, path).
 */

/** Cookie name used across all auth endpoints. */
export const AUTH_COOKIE_NAME = "auth_token"

/** Max age for the auth cookie (7 days in seconds). */
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60

/**
 * Build a cookie options object suitable for `response.cookies.set()`.
 * Uses `lax` sameSite to work correctly with external-link navigations
 * (e.g. clicking a link in a verification email).
 */
export function buildAuthCookie(token: string) {
  const isProduction = process.env.NODE_ENV === "production"

  return {
    name: AUTH_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax" as const,
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  }
}
