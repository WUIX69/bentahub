# BENTAHUB: Centralized Inventory Management and POS System

Welcome to the **BENTAHUB** developer documentation. This project is a centralized inventory management and point-of-sale (POS) system built for the Lourdes Sari-Sari Store and its branches. It replaces manual, paper-based processes with a unified, modern digital platform.

---

# 🏗️ Architecture: Feature-Sliced Design (FSD)

This project strictly follows the **Feature-Sliced Design (FSD)** architectural pattern to ensure scalability, maintainability, and clear separation of concerns across the multi-user platform.

```text
BENTAHUB/
├── src/
│   ├── app/                        # Next.js App Router (Pages, Layouts, API Routes)
│   │   ├── admin/                  # Admin dashboard & centralized monitoring panels
│   │   ├── cashier/                # Cashier POS, barcode scanning, and transaction processing
│   │   ├── staff/                  # Staff inventory updates and pickup preparation interfaces
│   │   ├── customer/               # Customer product catalog and reservation portal
│   │   └── auth/                   # Centralized login and user registration
│   ├── components/                 # Shared UI primitives (Shadcn UI, Tailwind classes)
│   ├── config/                     # Global configurations (Environment variables, App constants)
│   ├── servers/                    # Database Operations & ORM
│   │   ├── db/                     # Drizzle ORM instance and connection setup
│   │   └── schemas/                # Drizzle schemas (Categories, Products, Transactions, etc.)
│   ├── features/                   # Domain-Specific Business Logic (The Core FSD Layer)
│   │   ├── centralized-monitoring/ # Real-time cross-branch stock & sales synchronization
│   │   ├── qr-pos/                 # QR/Barcode generation, scanning, and checkout computation
│   │   ├── reservations/           # Managing product reservations, GCash/Cash payments, & pickup status
│   │   ├── analytics/              # Data inventory analytics and branch performance report generation
│   │   └── user-mgmt/              # Role-based access control and account management
│   ├── lib/                        # Third-party library wrappers (e.g., clsx, tailwind-merge)
│   └── types/                      # Global TypeScript definitions
└── drizzle.config.ts               # Drizzle ORM configuration
```

---

# 🚀 Key Features

The BentaHub system consolidates store operations into five core modules.

---

## Centralized Monitoring Module (`features/centralized-monitoring/`)

- Multi-branch stock visibility connecting all 3 branches into a single data layer.
- Consolidated real-time product inventory data synchronization.

---

## Real-Time Inventory Updating (`features/centralized-monitoring/`)

- Automatic stock deduction immediately upon successful checkout transactions.
- Automated fast-moving and low-stock indicators to streamline replenishment schedules.

---

## QR & Point of Sale (POS) Module (`features/qr-pos/`)

- Instant product scanning compatibility via external scanners to bypass manual code typing.
- Dynamic automated cart compilation and transaction subtotal/total calculations.

---

## Payment & Pick-Up Module (`features/reservations/`)

- Dual payment flow logic built specifically around Cash and GCash.
- Organized status staging for item preparation and customer in-store order release tracking.

---

## Data Inventory Analytics Module (`features/analytics/`)

- Comprehensive data inventory analytics providing real-time stock level insights, product movement tracking, and branch-level inventory performance summaries with historical trend analysis.

---

# 💻 Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js (App Router, Server Actions) |
| Styling & UI | Tailwind CSS, Shadcn UI |
| Database | PostgreSQL |
| ORM | Drizzle ORM |
| Language | TypeScript |
| Architecture | Feature-Sliced Design (FSD) |

---

# 🔄 User Workflows

Development workflows must conform with the four distinct user permission loops defined by the application architecture.

---

## Admin Workflow (`app/admin/`)

```text
[Secure Login]
        ↓
[View Analytics Dashboard]
        ↓
[Manage Cross-Branch Stock Distributions / Create Staff Accounts]
```

### Steps

1. Logs in securely to open the administrative control panel.
2. Inspects centralized performance figures and drills down into individual branch performance reports.
3. Updates master inventory data parameters (pricing, global metadata) or overrides role credentials via the user management view.

---

## Cashier Workflow (`app/cashier/`)

```text
[Branch-Locked Login]
        ↓
[Scan Product Barcodes via POS]
        ↓
[Select Cash/GCash]
        ↓
[Confirm & Print Receipt]
```

### Steps

1. Authenticates into a branch-locked endpoint.
2. Uses the POS interface to scan checkout items, instantly populating shopping totals.
3. Inputs payment execution method (Cash or verified GCash input reference).
4. Dispatches transaction payload to automatically update branch-assigned stock counts in real time.

---

## Staff Workflow (`app/staff/`)

```text
[Staff Login]
        ↓
[Monitor Low-Stock Warnings]
        ↓
[Update Inventory Increments]
        ↓
[Prepare Reservation Deliveries]
```

### Steps

1. Logs in to access branch-specific stock-keeping interfaces.
2. Edits product record updates or updates standard floor counts upon warehouse arrivals.
3. Flags and reviews incoming validated reservations to bundle and package items cleanly for pending client handovers.

---

## Customer Workflow (`app/customer/`)

```text
[Register/Login]
        ↓
[Browse Real-time Catalog]
        ↓
[Reserve Items]
        ↓
[Pay via Cash/GCash]
        ↓
[In-Store Pickup]
```

### Steps

1. Registers/logs into the user portal and lands on the interactive localized catalog homepage.
2. Views live availability of items per branch before making selection decisions.
3. Sets aside active product reservations and routes through checkout.
4. Visits the physical designated branch to complete in-store pickup verification.

---

# ⚙️ Developer Setup & Git Practices

The project uses the **Agile Scrum Methodology** to accommodate evolving store operations and user feedback.

---

## 1. Local Setup

### Clone the Repository

```bash
git clone <repository-url>
```

### Install Dependencies

```bash
npm install
```

_or_

```bash
pnpm install
```

_or_

```bash
yarn install
```

### Start PostgreSQL

Ensure you have a PostgreSQL instance running locally.

### Configure Environment Variables

Copy `.env.example` into `.env` and configure database connection strings.

### Push Database Schema via Drizzle ORM

```bash
npm run db:push
```

### Run Development Server

```bash
npm run dev
```

---

## 2. Feature Development (FSD Rules)

### Domain Separation

- Never mix domains.
- Logic for reservations belongs strictly inside `features/reservations/`.
- Pages inside the `app/` layer should only consume exposed boundaries from `features/` and `components/`.

### Server Actions

- Use Next.js Server Actions securely inside feature boundaries for database modifications.
- Avoid unnecessary decoupled HTTP API route structures.

### UI Consistency

- Use the shared atomic component layer inside `src/components/`.
- Maintain styling consistency with Tailwind CSS and Shadcn UI primitives.

---

## 3. Version Control & Git Workflow

### Branch Naming

Use descriptive branch tags:

```text
feature/qr-pos
bugfix/admin-analytics
ui/customer-catalog
```

### Commit Standards

- Write clear, single-purpose commits.
- Describe functional code changes accurately.

### Pull Requests

Before merging:

- Pass type checks:

```bash
npm run typecheck
```

- Verify successful server builds.
- Ensure at least one peer-review approval before merging into staging.

---

# 📋 System Rules & Constraints

## Strict Payment Methods

The project scope is intentionally limited to:

- Cash
- GCash

Do not integrate alternate payment methods (Credit Card, Maya, etc.) without formal scrum team evaluation.

---

## No Delivery Architecture

Operations follow a strict walk-in and in-store pickup process.

Do not implement:

- Shipping modules
- Delivery tracking
- Address management
- Fleet tracking systems

---

## Role-Based Security

- Cashier and Staff accounts must only access records assigned to their branch.
- Cross-branch monitoring and consolidated analytics are exclusive to authorized Admin accounts.

---

# 👨‍💻 Maintained By

**BentaHub Development Team**

- Buemia
- Gunio
- Lim
- Lozano