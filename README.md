# BentaHub — Centralized Inventory Management and POS System

Welcome to **BentaHub**, a unified digital platform built for the Lourdes Sari-Sari Store and its branches. This application replaces manual, paper-based business operations with a modern centralized system that tracks transactions, manages inventory, triggers low-stock alerts, and handles customer-facing product reservations in real time.

---

## 🛠️ Technology Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, Server Actions) |
| **Styling & UI** | Tailwind CSS, Shadcn UI |
| **Database** | PostgreSQL |
| **ORM** | Drizzle ORM |
| **Language** | TypeScript |
| **Containerization** | Docker & Docker Compose |
| **Architecture** | Feature-Sliced Design (FSD) |

---

## 🚀 Local Development Setup

To run the application locally, you will need a running PostgreSQL database.

### 1. Prerequisites
- Ensure you have **Node.js 18+** installed.
- Ensure you have **PostgreSQL 12+** installed and running on your machine.

### 2. Configure Environment Variables
Copy `.env.example` to `.env` (or `.env.local`) and configure your database connection credentials and secrets:
```bash
cp .env.example .env
```

### 3. Install Dependencies
```bash
pnpm install
```

### 4. Database Setup
You can push the schema and seed initial data automatically or manually:

#### Option A: Using the Setup Scripts
```bash
# On macOS/Linux:
bash scripts/setup-db.sh

# On Windows (PowerShell):
powershell -ExecutionPolicy Bypass -File scripts/setup-db.ps1
```

#### Option B: Manual Setup
```bash
# Push the schema definitions to PostgreSQL
pnpm db:push

# Seed the database with default administrative users, branches, and mock products
pnpm db:seed
```

### 5. Run the Development Server
```bash
pnpm dev
```
Once started, the application will be available at [http://localhost:3000](http://localhost:3000).

---

## 🐳 Docker Support

You can also spin up the application and database instantly using Docker:

1. **Build and Run Containers**:
   ```bash
   docker-compose up -d --build
   ```
2. The Next.js application will be exposed at [http://localhost:3000](http://localhost:3000).
3. The database container is pre-configured with:
   - `POSTGRES_USER=postgres`
   - `POSTGRES_PASSWORD=postgres`
   - `POSTGRES_DB=bentahub`
4. **Teardown & Clean Volumes**:
   ```bash
   docker-compose down -v
   ```

> [!WARNING]
> Running the seed script will clear all existing tables (branches, products, inventory, transactions) before inserting fresh mock data. Only run this on a fresh database.

---

## 📚 Project Documentation

Explore the sub-documentations to understand code conventions, setups, and workflows:

- 📖 [**BentaHub Developer Manual** (docs/BENTAHUB.md)](file:///c:/projects/bentahub/docs/BENTAHUB.md) — Unified reference for permission workflows, API routes, database schemas, security features, and implementation status.
- 📐 [**Feature-Sliced Design Rules** (docs/FEATURE-SLICED-DESIGN.md)](file:///c:/projects/bentahub/docs/FEATURE-SLICED-DESIGN.md) — Folder isolation rules, import boundaries, and architectural guidelines.
- 🤝 [**Contributing Guide** (docs/CONTRIBUTING.md)](file:///c:/projects/bentahub/docs/CONTRIBUTING.md) — Local contribution setup, pre-commit code style checks, and PR checklist.
- ⚙️ [**Environment Variables** (docs/ENV.md)](file:///c:/projects/bentahub/docs/ENV.md) — Full list of active environment configurations.
- 📋 [**Operations Runbook** (docs/RUNBOOK.md)](file:///c:/projects/bentahub/docs/RUNBOOK.md) — Deployment, troubleshooting, and rollback procedures.
