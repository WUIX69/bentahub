# BentaHub — Unified Developer Reference Manual

Welcome to the **BentaHub** developer reference manual. This document serves as the single source of truth for our system architecture, data models, developer guidelines, API specifications, and implementation status.

---

## 1. Tech Stack

| Category | Technology | Description |
|---|---|---|
| **Framework** | Next.js 16 | App Router, Server Actions, and API routes |
| **Styling & UI** | Tailwind CSS, Shadcn UI | Custom theme UI and component primitives |
| **Database** | PostgreSQL | Relational database storage |
| **ORM** | Drizzle ORM | Database schema definitions, migrations, and seeders |
| **Language** | TypeScript | Strong typing for client and server code |
| **Containerization** | Docker | Docker Compose for local database & app setup |
| **Architecture** | Feature-Sliced Design (FSD) | Structural modularity, low coupling, and isolation |

---

## 2. User Workflows & Permission Loops

The application enforces four distinct user permission loops based on role-based access control (RBAC).

```text
               ┌──────────────────────────────┐
               │         Secure Login         │
               └──────────────┬───────────────┘
                              │
       ┌──────────────────────┼──────────────────────┐
       ▼                      ▼                      ▼
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│    Admin     │       │   Cashier    │       │    Staff     │
│ (Global RBAC)│       │(Branch-Locked│       │(Branch-Locked│
└──────┬───────┘       └──────┬───────┘       └──────┬───────┘
       │                      │                      │
       ▼                      ▼                      ▼
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│  Analytics & │       │ POS Scan,    │       │  Stock &     │
│ Branch Mgmt  │       │ Cash/GCash   │       │  Reservation │
│  Credentials │       │ Transactions │       │ Preparation  │
└──────────────┘       └──────────────┘       └──────────────┘
```

### 👑 Admin Workflow (`src/app/admin/`)
1. **Secure Login**: Accesses the global administrative panel.
2. **Analytics & Reports**: Monitors centralized dashboard performance and drills down into individual branch metrics.
3. **User Management**: Configures/overrides role credentials and creates cashier/staff accounts.

### 💵 Cashier Workflow (`src/app/cashier/`)
1. **Branch Authentication**: Logs into a branch-locked endpoint.
2. **POS Checkout**: Scans product barcodes, dynamically updates checkout totals, and selects payment execution (Cash or GCash reference).
3. **Transaction Sync**: Confirms purchase, prints receipt, and triggers real-time inventory deduction for that branch.

### 📦 Staff Workflow (`src/app/staff/`)
1. **Branch Stock Keeping**: Logs in to access branch-specific inventory interfaces.
2. **Inventory Updates**: Manages stock numbers (increments/decrements) upon warehouse delivery or audit.
3. **Reservation Handling**: Tracks, bundles, and packages validated customer reservations for pickup.

### 👤 Customer Workflow (`src/app/customer/`)
1. **Registration & Catalog**: Registers or logs in, browsing live localized product catalogs.
2. **Reservation Booking**: Adds items to cart, chooses payment method, and reserves stock.
3. **Pickup**: Visits the physical branch to claim reserved items.

---

## 3. System Rules & Constraints

To prevent scope creep and support efficient storefront operations, developers must adhere to these structural constraints:

- 💸 **Strict Payment Methods**: Operations are strictly restricted to **Cash** and **GCash**. Do not integrate Credit Cards, Maya, or other digital wallets without formal scrum review.
- 🚚 **No Delivery Architecture**: Operations focus purely on walk-in and in-store pickup. Do not build shipping modules, fleet tracking, customer address managers, or dispatch pipelines.
- 🔒 **Role-Based Security**: Staff and cashiers must be branch-locked; they must never query or mutate data belonging to other branches. Only Admins possess cross-branch query privileges.

---

## 4. Backend Implementation: Auth & User Management

The core user authentication uses JSON Web Tokens (JWT) stored in secure, HTTP-only cookies, combined with a 6-digit email verification flow.

### 📊 Database Schema (Drizzle ORM)

#### Users Table (`src/servers/schemas/users.ts`)
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

#### Email Verification Codes Table (`src/servers/schemas/email-verification.ts`)
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

### 🚦 Registration & Verification Flow
1. **Submit Signup**: User registers with name, email, and password.
2. **Generate Code**: System creates an unverified account, generates a 6-digit verification code with a 15-minute expiration, and logs/emails it.
3. **Verification**: User inputs the code. The system allows a maximum of 5 attempts.
4. **Issue Token**: On success, email is marked verified, a JWT token is created (expires in 7 days), set as an HTTP-only SameSite cookie, and the user is logged in.

### 🔌 API Route Specifications

#### Register User (`POST /api/auth/register`)
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "confirmPassword": "password123",
    "fullName": "John Doe"
  }
  ```
- **Response (200)**:
  ```json
  {
    "success": true,
    "message": "Registration successful. Please check your email for the verification code.",
    "data": { "userId": "uuid-string", "email": "user@example.com", "requiresEmailVerification": true }
  }
  ```

#### Verify Email (`POST /api/auth/verify-email`)
- **Request Body**:
  ```json
  { "email": "user@example.com", "code": "123456" }
  ```
- **Response**: Sets `auth_token` cookie and returns user JSON.

#### Resend Verification Code (`PUT /api/auth/verify-email`)
- **Request Body**:
  ```json
  { "email": "user@example.com" }
  ```
- **Constraint**: Deletes previous active codes and enforces a 60-second cooldown before generating a new code.

#### Logout (`POST /api/auth/logout`)
- **Response**: Clears `auth_token` cookie.

### 🛡️ Security Features
- **Password Hashing**: Bcryptjs with 10 salt rounds.
- **XSS Mitigation**: Token stored strictly in HTTP-only cookies.
- **CSRF Mitigation**: SameSite configuration on cookies.
- **Brute Force Defense**: Maximum 5 attempts per verification code.
- **Dev Fallback**: Logs verification code to the server console if no email SMTP config is set.

---

## 5. Customer Portal: Status & Implementation

The customer portal is **data-layer complete** and connected to backend APIs. State management is managed client-side using Zustand stores.

### 🔄 Zustand Stores & Custom Hooks
All operations run through unified React custom hooks that wrap local Zustand stores and handle async HTTP requests:

- `useCart()` / `cartStore.ts`: Fetches, updates quantities, and removes items from the customer shopping cart.
- `useProducts()` / `productsStore.ts`: Coordinates catalog fetching and category browsing.
- `useOrders()` / `ordersStore.ts`: Creates reservations, loads transaction history, and handles cancels.
- `useNotifications()` / `notificationsStore.ts`: Manages user notification tallies and read flags.

### ⚠️ Remaining Shortcomings (TODO Checklist)

#### 🔴 CRITICAL
1. **Empty Database Seed**: The `products` table has no items initially, which crashes checkout operations. Test products must be seeded using `pnpm db:seed` or direct inserts.
2. **Catalog Detail Pages**: The product detail view `/customer/catalog/[id]` is created but contains mockup static data. It must be updated to consume the `useProducts()` hook.
3. **Cart Item Breakdown**: The `POST /api/customer/orders` handler clears the cart but does not populate the `order_items` table. The transaction history lists order totals but misses the itemized breakdown.

#### 🟡 MEDIUM
4. **Pickup Calendar Picker**: The checkout page lacks a date/time picker slot input.
5. **Search & Categories**: Catalog filters (e.g. search query, category selection, branch selection) are implemented on the backend (`/api/customer/products?branch=Main`) but lack UI binding.
6. **GCash Reference Validation**: The GCash checkout accepts any string. Add a validation hook or reference pattern check.
7. **Real-time Notifications**: Wire `customer-notifications-feed` to the `useNotifications()` hook.
8. **Cancellation Button**: Add a "Cancel Order" button to the transactions or reservations table UI using the `useOrders.cancelOrder()` hook.

#### 🟢 LOW
9. **User Settings Form**: The `/customer/settings` page is a placeholder. It needs inputs to update `fullName`, `phone`, and default branch preferences.
10. **Dashboard Summary Metrics**: The user dashboard displays placeholder card numbers. Replace these with calculations from `ordersStore` (e.g. sum of spent cash, pending reservation counts).

---

## 6. Architecture & Directory Guidelines

This repository strictly implements **Feature-Sliced Design (FSD)** guidelines to decouple features and shared utilities.

### 📂 Structural Directory Mapping
```text
src/
├── app/                              # 🌐 [App Layer] Next.js Router
│   ├── (auth)/                       # Login, Register, Verification
│   ├── customer/                     # Customer dashboard portal views
│   └── api/                          # Next.js API endpoints
├── features/                         # 🏗️ [Feature Layer] Isolated business modules
│   ├── user-mgmt/                    # Registration & sign-in components
│   └── customer-dashboard/           # Catalog views, toolbars, sidebar
├── components/                       # ✅ [Shared Layer] UI Primitives & Providers
│   ├── ui/                           # Shadcn buttons, cards, wrappers
│   └── auth-provider.tsx             # Global auth context
├── hooks/                            # ✅ [Shared Layer] Global React Hooks
│   └── useCart.ts, useOrders.ts...   # Zustand/API hooks
├── stores/                           # ✅ [Shared Layer] Global Zustand Stores
│   └── cartStore.ts, ordersStore.ts  # Client-side cache
├── servers/                          # ✅ [Shared Layer] Server Database Operations
│   ├── db/index.ts                   # Drizzle client connection
│   └── schemas/                      # Drizzle table schemas
└── middleware.ts                     # 🌐 [App Layer] Route Guard & RBAC checks
```

> [!NOTE]
> Under strict FSD rules, state management and custom hooks that are *exclusive* to a single dashboard interface should ideally reside within that feature's folder (e.g., `src/features/customer-dashboard/stores/` and `src/features/customer-dashboard/hooks/`). The current layout keeps them in the global shared `src/hooks/` and `src/stores/` directories. Developers must ensure that no other isolated feature (like `cashier-dashboard` or `staff-dashboard`) directly imports these customer-specific stores/hooks unless they are explicitly promoted to shared abstractions.

---

### 🛑 Coding & Import Rules
- **Layer imports**: Feature folders may import from the Shared layer (`components/`, `hooks/`, `lib/`, `servers/`), but **never** from other features.
- **No Cross-Feature imports**: If `features/customer-dashboard` needs a helper from `features/user-mgmt`, that helper MUST be refactored and moved to the Shared layer (e.g. `src/utils/` or `src/hooks/`).
- **Server Operations**: Use Next.js Server Actions securely inside features (e.g., `src/features/[feature-name]/servers/`) for database mutations rather than setting up separate decoupled HTTP API route structures, unless exposing endpoints for third parties.