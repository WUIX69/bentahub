import nodemailer from "nodemailer"

const emailFrom = process.env.EMAIL_FROM || "noreply@bentahub.local"

let cachedTransporter: nodemailer.Transporter | null = null

/**
 * Dynamically resolves the best available nodemailer transporter.
 * 1. Uses explicit SMTP credentials (e.g. Gmail) if EMAIL_USER and EMAIL_PASSWORD are provided.
 * 2. Attempts to connect to a local SMTP server (e.g. Mailpit) on EMAIL_HOST:EMAIL_PORT.
 * 3. Falls back to generating a temporary Ethereal test account dynamically.
 */
async function getTransporter(): Promise<nodemailer.Transporter> {
  if (cachedTransporter) return cachedTransporter

  const emailHost = process.env.EMAIL_HOST || "localhost"
  const emailPort = process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 1025
  const emailUser = process.env.EMAIL_USER
  const emailPassword = process.env.EMAIL_PASSWORD
  const emailService = process.env.EMAIL_SERVICE

  // 1. Check if user configured explicit credentials (e.g. Gmail, SendGrid)
  if (emailUser && emailPassword) {
    if (emailService) {
      console.log(`✉️ Using email service: ${emailService}`)
      cachedTransporter = nodemailer.createTransport({
        service: emailService,
        auth: {
          user: emailUser,
          pass: emailPassword,
        },
      })
    } else {
      console.log(`✉️ Using custom SMTP server at ${emailHost}:${emailPort}`)
      cachedTransporter = nodemailer.createTransport({
        host: emailHost,
        port: emailPort,
        secure: process.env.EMAIL_SECURE === "true",
        auth: {
          user: emailUser,
          pass: emailPassword,
        },
      })
    }
    return cachedTransporter
  }

  // 2. Try to connect to local SMTP catcher (e.g. Mailpit/Maildev) without credentials
  try {
    const localTransporter = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      secure: false,
      ignoreTLS: true,
    })

    // Test connection to see if it is running
    await localTransporter.verify()
    console.log(`✉️ Connected to local SMTP mail catcher at ${emailHost}:${emailPort}`)
    cachedTransporter = localTransporter
    return cachedTransporter
  } catch (err) {
    console.log(`ℹ️ Local SMTP mail catcher not running at ${emailHost}:${emailPort}.`)
  }

  // 3. Fallback: Automatically generate an Ethereal Email test account
  try {
    console.log("✉️ Creating dynamic Ethereal Email test account...")
    const testAccount = await nodemailer.createTestAccount()
    cachedTransporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    })
    console.log(`✅ Temporary Ethereal account created: ${testAccount.user}`)
    return cachedTransporter
  } catch (err) {
    console.error("❌ Failed to create automatic Ethereal account:", err)
    // Absolute fallback: mock JSON transport to prevent app crashes
    cachedTransporter = nodemailer.createTransport({
      jsonTransport: true,
    })
    return cachedTransporter
  }
}

export async function sendVerificationEmail(email: string, code: string, fullName: string): Promise<boolean> {
  try {
    const transporter = await getTransporter()
    console.log(`[DEV] Verification code for ${email}: ${code}`)

    const info = await transporter.sendMail({
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

    const previewUrl = nodemailer.getTestMessageUrl(info)
    if (previewUrl) {
      console.log(`✉️ Ethereal Email Preview URL: ${previewUrl}`)
    }

    return true
  } catch (error) {
    console.error("Failed to send verification email:", error)
    return false
  }
}

export async function sendPasswordResetEmail(email: string, code: string, resetLink: string, fullName: string): Promise<boolean> {
  try {
    const transporter = await getTransporter()
    console.log(`[DEV] Password reset code for ${email}: ${code} (Link: ${resetLink})`)

    const info = await transporter.sendMail({
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
            You requested to reset your password. Use the verification code below to proceed:
          </p>
          <div style="background-color: #f0f0f0; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <p style="font-size: 32px; font-weight: bold; color: #007bff; letter-spacing: 5px; margin: 0;">
              ${code}
            </p>
          </div>
          <p style="color: #666; font-size: 16px;">
            Or click the button below to go directly to the password reset page:
          </p>
          <div style="margin: 20px 0;">
            <a href="${resetLink}" style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p style="color: #666; font-size: 14px;">
            This code and link will expire in 1 hour.
          </p>
          <p style="color: #999; font-size: 12px;">
            If you did not request this, please ignore this email.
          </p>
        </div>
      `,
    })

    const previewUrl = nodemailer.getTestMessageUrl(info)
    if (previewUrl) {
      console.log(`✉️ Ethereal Email Preview URL: ${previewUrl}`)
    }

    return true
  } catch (error) {
    console.error("Failed to send password reset email:", error)
    return false
  }
}
