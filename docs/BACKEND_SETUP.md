# Backend Setup Documentation

## Overview

The BentaHub backend is built with:
- **Next.js 16** - API routes
- **TypeScript** - Type safety
- **Drizzle ORM** - Database management
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Nodemailer** - Email verification

## Setup Instructions

### 1. Prerequisites

- Node.js 18+
- PostgreSQL 12+
- npm or pnpm

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/bentahub"

# JWT
JWT_SECRET="your-secret-key"

# Email (Gmail example)
EMAIL_SERVICE="gmail"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
EMAIL_FROM="noreply@bentahub.local"

# App
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 4. Database Setup

#### Option A: Using the Setup Script

```bash
# On macOS/Linux
bash scripts/setup-db.sh

# On Windows (PowerShell)
powershell -ExecutionPolicy Bypass -File scripts/setup-db.ps1
```

#### Option B: Manual Setup

```bash
# Create database
createdb -U postgres bentahub

# Generate and run migrations
npm run db:generate
npm run db:push
```

### 5. Start Development Server

```bash
npm run dev
```

Server will run at `http://localhost:3000`

## API Routes

### Authentication

#### Register User
- **Endpoint**: `POST /api/auth/register`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "confirmPassword": "password123",
    "fullName": "John Doe"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Registration successful. Please check your email for the verification code.",
    "data": {
      "userId": "user-id",
      "email": "user@example.com",
      "requiresEmailVerification": true
    }
  }
  ```

#### Verify Email
- **Endpoint**: `POST /api/auth/verify-email`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "code": "123456"
  }
  ```
- **Response**: Sets `auth_token` cookie and returns user data

#### Resend Verification Code
- **Endpoint**: `PUT /api/auth/verify-email`
- **Body**:
  ```json
  {
    "email": "user@example.com"
  }
  ```

#### Logout
- **Endpoint**: `POST /api/auth/logout`
- **Response**: Clears `auth_token` cookie

## Database Schema

### Users Table

```sql
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role ENUM('admin', 'cashier', 'staff', 'customer') DEFAULT 'customer',
  branch VARCHAR(50),
  is_email_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Email Verification Codes Table

```sql
CREATE TABLE email_verification_codes (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  code VARCHAR(6) NOT NULL,
  email VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  attempts INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Features

### ✅ Registration Flow
1. User submits registration form
2. System validates input and checks duplicate email
3. User created with unverified email
4. Verification code generated (6 digits, 15-minute expiry)
5. Email sent with verification code
6. User enters code to verify email
7. JWT token generated and set as HTTP-only cookie
8. User redirected to dashboard

### ✅ Security Features
- Password hashing with bcryptjs (10 salt rounds)
- JWT token authentication
- HTTP-only cookies (no XSS vulnerability)
- Email verification (prevents fake registrations)
- Attempt limiting (5 max attempts per code)
- Token expiration (7 days)
- CSRF protection via SameSite cookies

### ✅ Email Verification
- 6-digit codes generated
- 15-minute expiration
- Resend functionality with cooldown
- Attempt limiting
- Graceful dev mode (logs to console if email not configured)

## Middleware

The authentication middleware protects routes:

- Public routes: `/`, `/login`, `/register`
- Protected routes: `/admin`, `/cashier`, `/staff`, `/customer`
- API routes: Protected based on token validation

To protect a route, place it outside the `(landing)` or `(auth)` groups.

## File Structure (FSD Alignment)

All directories in the codebase are structured according to the Feature-Sliced Design (FSD) architecture layers:

```text
src/
├── app/                              # 🌐 [App Layer] Next.js App Router (Pages, Layouts, API Routes)
│   └── api/auth/
│       ├── register/route.ts         # Authentication endpoints
│       ├── verify-email/route.ts
│       └── logout/route.ts
├── features/                         # 🏗️ [Feature Layer] Self-contained business modules
│   └── user-mgmt/                    # Isolated feature domain for user authentication & signup
│       ├── actions/
│       │   └── register.ts           # Feature-specific server actions
│       ├── components/
│       │   ├── auth-header.tsx       # Feature-specific UI components
│       │   ├── password-input.tsx
│       │   └── register-form.tsx
│       └── index.ts                  # Clean public interface for app routes to import
├── components/                       # ✅ [Shared Layer] Global shared UI components
│   └── auth-provider.tsx             # Global authentication context provider
├── lib/                              # ✅ [Shared Layer] Global third-party wrapper configurations
│   ├── auth-utils.ts                 # Security utilities (JWT, hashing, ID generation)
│   └── email-service.ts              # Nodemailer wrappers and email templates
├── servers/                          # ✅ [Shared Layer] Global shared database operations
│   ├── db/
│   │   └── index.ts                  # Database connection pool
│   └── schemas/                      # Database schemas (Drizzle relations & types)
│       ├── users.ts                  
│       ├── email-verification.ts     
│       └── index.ts                  
├── types/                            # ✅ [Shared Layer] Ambient TypeScript types
│   └── auth.ts                       # Shared type definitions
└── middleware.ts                     # 🌐 [App Layer] Global route protection & RBAC checks
```

## Testing

### Manual Testing

1. **Register**:
   ```bash
   curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "password": "password123",
       "confirmPassword": "password123",
       "fullName": "Test User"
     }'
   ```

2. **Verify Email**:
   ```bash
   curl -X POST http://localhost:3000/api/auth/verify-email \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "code": "123456"
     }'
   ```

## Troubleshooting

### Database Connection Error
- Check PostgreSQL is running: `psql -U postgres`
- Verify `DATABASE_URL` in `.env.local`
- Ensure database exists: `psql -U postgres -l`

### Email Not Sending
- In development, codes are logged to console
- Check `EMAIL_*` environment variables
- For Gmail: Use App Password, not regular password

### Token Invalid Error
- Check `JWT_SECRET` is set
- Token expires after 7 days (re-login required)
- Clear cookies in browser DevTools if persisted

## Next Steps

After registration is complete:

1. Implement login endpoint
2. Add password reset flow
3. Implement role-based access control
4. Create admin account management
5. Add user profile management
6. Implement refresh token logic
