import nodemailer from "nodemailer"

const emailUser = process.env.EMAIL_USER
const emailPassword = process.env.EMAIL_PASSWORD
const emailFrom = process.env.EMAIL_FROM || "noreply@bentahub.local"

// Create transporter (Gmail example - change for your email provider)
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: emailUser,
    pass: emailPassword,
  },
})

export async function sendVerificationEmail(email: string, code: string, fullName: string): Promise<boolean> {
  try {
    // For development, skip if credentials not set
    if (!emailUser || !emailPassword) {
      console.warn(`[DEV] Verification code for ${email}: ${code}`)
      return true
    }

    await transporter.sendMail({
      from: emailFrom,
      to: email,
      subject: "Verify your BentaHub Account",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Welcome to BentaHub, ${fullName}!</h2>
          <p style="color: #666; font-size: 16px;">
            Thank you for registering. Please verify your email by entering the code below:
          </p>
          <div style="background-color: #f0f0f0; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <p style="font-size: 32px; font-weight: bold; color: #007bff; letter-spacing: 5px; margin: 0;">
              ${code}
            </p>
          </div>
          <p style="color: #666; font-size: 14px;">
            This code will expire in 15 minutes.
          </p>
          <p style="color: #999; font-size: 12px;">
            If you did not create this account, please ignore this email.
          </p>
        </div>
      `,
    })

    return true
  } catch (error) {
    console.error("Failed to send verification email:", error)
    return false
  }
}

export async function sendPasswordResetEmail(email: string, resetLink: string, fullName: string): Promise<boolean> {
  try {
    if (!emailUser || !emailPassword) {
      console.warn(`[DEV] Password reset link for ${email}: ${resetLink}`)
      return true
    }

    await transporter.sendMail({
      from: emailFrom,
      to: email,
      subject: "Reset your BentaHub Password",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Reset Your Password</h2>
          <p style="color: #666; font-size: 16px;">
            Hi ${fullName},
          </p>
          <p style="color: #666; font-size: 16px;">
            Click the link below to reset your password:
          </p>
          <div style="margin: 20px 0;">
            <a href="${resetLink}" style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p style="color: #666; font-size: 14px;">
            This link will expire in 1 hour.
          </p>
          <p style="color: #999; font-size: 12px;">
            If you did not request this, please ignore this email.
          </p>
        </div>
      `,
    })

    return true
  } catch (error) {
    console.error("Failed to send password reset email:", error)
    return false
  }
}
