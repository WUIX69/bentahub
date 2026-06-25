# BentaHub — Unified Developer Reference Manual

Welcome to the **BentaHub** developer reference manual. This document serves as the single source of truth for our system architecture, data models, developer guidelines, API specifications, and implementation status.

---

## 1. Tech Stack

| Category | Technology | Description |
|---|---|---|
| **Framework** | Next.js 16 | App Router (with Turbopack), Server Actions, and API routes |
| **Styling & UI** | Tailwind CSS v4, Radix UI (shadcn) | Custom HSL-tailored theme UI, dark mode support, and clean animations |
| **Database** | PostgreSQL | Relational database storage |
| **ORM** | Drizzle ORM | Database schema definitions, migrations, and seeders |
| **Language** | TypeScript | Strong typing for client and server code |
| **Containerization** | Docker | Docker Compose for local database & app setup |
| **Architecture** | Feature-Sliced Design (FSD) | Structural modularity, low coupling, and isolation |

---

## 2. User Workflows & Permission Loops

The application enforces three distinct user permission loops based on role-based access control (RBAC): Admin, Employee, and Customer.

```text
               ┌──────────────────────────────┐
               │         Secure Login         │
               └──────────────┬───────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
 ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
 │    Admin     │      │   Employee   │      │   Customer   │
 │ (Global RBAC)│      │(Branch-Locked│      │(Self-Service)│
 └──────┬───────┘      └──────┬───────┘      └──────┬───────┘
        │                     │                     │
        ▼                     ▼                     ▼
 ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
 │  Analytics,  │      │ POS Checkout,│      │ Catalog,     │
 │ User Mgmt,   │      │ Stock Mgmt & │      │ Cart, Pickup │
 │ Branch Mgmt  │      │ Pickups      │      │ Reservations │
 └──────────────┘      └──────────────┘      └──────────────┘
```

### 👑 Admin Workflow (`src/app/(dashboard)/admin/`)
1. **Secure Login**: Accesses the global administrative panel with cross-branch privileges.
2. **Analytics & Reports**: Monitors centralized dashboard performance and drills down into individual branch metrics.
3. **User Management**: Configures/overrides role credentials and creates employee or admin accounts.

### 💼 Employee Workflow (`src/app/(dashboard)/employee/`)
1. **Branch Authentication**: Logs into a branch-locked interface (cannot query or mutate other branches).
2. **POS Checkout**: Scans product barcodes, dynamically updates checkout totals, and processes payments (Cash or GCash reference verification).
3. **Inventory Management**: Tracks branch-specific stock numbers (increments/decrements/stock-checks) and manages low-stock warnings.
4. **Pickup Validation**: Resolves and releases customer-reserved pickup items.

### 👤 Customer Workflow (`src/app/(dashboard)/customer/`)
1. **Registration & Catalog**: Registers or logs in, browsing live localized product catalogs.
2. **Reservation Booking**: Adds items to cart, chooses payment method, and reserves stock.
3. **In-Store Pickup**: Visits the physical branch to claim reserved items.

---

## 3. System Rules & Constraints

To prevent scope creep and support efficient storefront operations, developers must adhere to these structural constraints:

- 💸 **Strict Payment Methods**: Operations are strictly restricted to **Cash** and **GCash**. Do not integrate Credit Cards, Maya, or other digital wallets without formal scrum review.
- 🚚 **No Delivery Architecture**: Operations focus purely on walk-in and in-store pickup. Do not build shipping modules, fleet tracking, customer address managers, or dispatch pipelines.
- 🔒 **Role-Based Security**: Employees must be branch-locked; they must never query or mutate data belonging to other branches. Only Admins possess cross-branch query privileges.

---

## 4. Backend & Auth Implementation

Authentication is driven by client-side hooks (`useAuth` / `AuthProvider`) reading JWT tokens from `localStorage` and Bearer auth headers, backed by an HTTP-only `auth_token` cookie set server-side.

### 📊 Database Schema (Drizzle ORM)

#### Users Table (`src/drizzle/schema/users.ts`)
```typescript
export const userRoleEnum = pgEnum("user_role", ["admin", "employee", "customer"])

export const users = pgTable("users", {
  id: varchar("id", { length: 36 }).primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  role: userRoleEnum("role").default("customer").notNull(),
  branch: varchar("branch", { length: 50 }),
  isEmailVerified: boolean("is_email_verified").default(false).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull()
})
```

#### Email Verification Codes Table (`src/drizzle/schema/email-verification.ts`)
```typescript
export const emailVerifications = pgTable("email_verifications", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 36 }).notNull().references(() => users.id, { onDelete: "cascade" }),
  code: varchar("code", { length: 255 }).notNull(), // SHA-256 hashed code
  email: varchar("email", { length: 255 }).notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  attempts: integer("attempts").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull()
})
```

### 🚦 Registration & Verification Flow
1. **Submit Signup**: User registers with name, email, and password.
2. **Generate Code**: System creates an unverified account, generates a 6-digit verification code with a 15-minute expiration, and logs/emails it.
3. **Verification**: User inputs the code. The system allows a maximum of 5 attempts.
4. **Issue Token**: On success, email is marked verified, a JWT token is created, set as Bearer / cookie, and the user is logged in.

---

## 5. Directory & FSD Guidelines

This repository strictly implements **Feature-Sliced Design (FSD)** guidelines to decouple features and shared utilities.

### 📂 Structural Directory Mapping
```text
src/
├── app/                              # 🌐 [App Layer] Next.js Router
│   ├── (auth)/                       # Login, Register, Verification, Forgot Password
│   ├── (dashboard)/                  # Shared and role-specific dashboard views
│   │   ├── admin/                    # Admin portal dashboard pages
│   │   ├── employee/                 # Employee POS & Inventory dashboard pages
│   │   ├── customer/                 # Customer catalog, cart, and checkout dashboard pages
│   │   └── shared/                   # Role-adaptive cross-role shared pages (Notifications, Settings, etc.)
│   └── api/                          # Next.js API endpoints
├── features/                         # 🏗️ [Feature Layer] Isolated FSD business modules
│   ├── user-mgmt/                    # Registration, sign-in, and account server actions & components
│   ├── customer-dashboard/           # Catalog views, product cards, order history
│   ├── employee-dashboard/           # POS terminal, live inventory views
│   ├── admin-dashboard/              # Branch oversight, staff setup, analytics
│   ├── monitoring/                   # Live monitoring dashboard widgets
│   ├── notifications/                # Alerting & notifications components
│   ├── payments/                     # Cash & GCash payments manager components
│   ├── pickups/                      # Order pickup confirmation components
│   ├── reservations/                 # Reserved stock manager tables
│   └── settings/                     # User/branch settings forms
├── components/                       # ✅ [Shared Layer] UI Primitives & Providers
│   ├── ui/                           # Radix-nova/Shadcn primitives
│   └── auth-provider.tsx             # Global auth context
├── hooks/                            # ✅ [Shared Layer] Global React Hooks
│   └── useCart.ts, useOrders.ts...   # Zustand/API hooks
├── stores/                           # ✅ [Shared Layer] Global Zustand Stores
│   └── cartStore.ts, ordersStore.ts  # Client-side cache
├── drizzle/                          # ✅ [Shared Layer] Drizzle ORM Database Configuration
│   ├── db.ts                         # PostgreSQL connection pool & Drizzle client
│   ├── schema/                       # Declarative Drizzle table schemas
│   └── migrations/                   # Generated SQL schema migrations
├── proxy.ts                          # 🌐 [App Layer] Dead JWT middleware route guard (auth done client-side in layouts)
└── scripts/                          # 🛠️ Database setup and seed CLI utilities
```

### 🛑 Coding & Import Rules
- **Layer imports**: Feature folders may import from the Shared layer (`components/`, `hooks/`, `lib/`, `drizzle/`), but **never** from other features. Cross-feature imports are strictly forbidden.
- **Shared Code Promotion**: If `features/customer-dashboard` needs a helper from `features/user-mgmt`, that helper MUST be refactored and moved to the Shared layer (e.g. `src/hooks/`, `src/lib/`, or `src/components/`).
- **Server Actions**: Use Next.js Server Actions securely inside features (e.g., `src/features/[feature-name]/actions/`) for mutations rather than setting up separate decoupled HTTP API route structures.