import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth-utils"
import type { AuthResponse } from "@/types/auth"

export async function GET(request: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    const token = request.cookies.get("auth_token")?.value

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "No token found",
        },
        { status: 401 }
      )
    }

    // Verify token
    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid token",
        },
        { status: 401 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Token is valid",
        data: {
          userId: decoded.userId,
          email: decoded.email,
          fullName: decoded.fullName,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Token verification error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during verification",
      },
      { status: 500 }
    )
  }
}
