## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, invoke the `skill` tool with `skill: "graphify"` before doing anything else.

Rules:

- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- Dirty graphify-out/ files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

## Project overview

Next.js 16 (App Router) + React 19 + TypeScript POS/inventory system for a sari-sari store chain. Drizzle ORM on PostgreSQL, Tailwind CSS v4, Shadcn UI (radix-nova), Zustand state, pnpm, Docker.

## Commands

| Command             | What it runs                         |
| ------------------- | ------------------------------------ |
| `pnpm dev`          | `next dev --turbopack`               |
| `pnpm build`        | `next build` (output: standalone)    |
| `pnpm lint`         | `eslint` (flat config)               |
| `pnpm format`       | `prettier --write \"**/*.{ts,tsx}\"` |
| `pnpm typecheck`    | `tsc --noEmit`                       |
| `pnpm validate`     | `pnpm lint && pnpm typecheck`        |
| `pnpm db:push`      | `drizzle-kit push`                   |
| `pnpm db:generate`  | `drizzle-kit generate`               |
| `pnpm db:seed`      | `npx tsx src/drizzle/seed.ts`        |
| `pnpm db:studio`    | `drizzle-kit studio`                 |
| `pnpm docker:up`    | `docker compose up -d`               |
| `pnpm docker:down`  | `docker compose down`                |
| `pnpm docker:logs`  | `docker compose logs -f`             |
| `pnpm docker:reset` | `docker compose down -v`             |

Always run `lint -> typecheck` (or `pnpm validate`) before committing. There are no tests.

## Schema & DB

- Schema: `src/drizzle/schema/` (Drizzle ORM with `postgres-js` driver, `postgres` connection pool)
- 10 tables: users, email-verification, password-reset, branches, branch-inventory, products, transactions, cart-items, notifications, orders
- Migration SQL: `src/drizzle/migrations/`
- DB client: `src/drizzle/db.ts` — reads `DATABASE_URL`, falls back to `postgresql://postgres:postgres@localhost:5432/bentahub`
- Seed (`pnpm db:seed`): auto-parses `.env.local`, **clears all tables** (users, branches, products, branchInventory, transactions), creates 6 test accounts (2 per role), 3 branches, 28 products, inventory, and 12 months of transactions
- Both `drizzle.config.ts` and `src/drizzle/db.ts` independently parse `.env.local` at runtime
- `drizzle.config.ts` sets `strict: false`
- `tsconfig.json` `rootDir` is `.` (not `src`)

## Test accounts

Run `pnpm db:seed` to reset everything. Credentials printed at end of seed run. See `docs/RUNBOOK.md` for the account table.

## Architecture & FSD rules

Feature-Sliced Design. Strict isolation rules:

- **`src/features/*/`** — isolated business modules. Cannot import from other features.
- **`src/components/`, `src/hooks/`, `src/lib/`, `src/stores/`, `src/types/`, `src/config/`** — shared global layer.
- Cross-feature import = refactor into a global directory.
- `src/app/` — Next.js App Router pages, layouts, API routes.
- For feature-specific server actions, use `src/features/[name]/actions/` (not separate API routes unless third-party needed).
- **No import-boundary enforcement** in ESLint config (only `eslint-config-next/core-web-vitals` + typescript).
- Some shared dirs are empty or sparser than docs suggest: `src/data/` and `src/contexts/` exist but are empty; `src/server/` and `src/utils/` don't exist.
- `docs/FEATURE-SLICED-DESIGN.md` describes aspirational patterns (dbCache, t3-env, subscriptions, permissions.ts) that do **not** exist in code.
- `docs/BENTAHUB.md` is stale — references `cashier`/`staff` roles and old `src/servers/` paths.

## App structure

Route groups under `src/app/`:

- `/(landing)/` — public landing
- `/(auth)/` — login, register, verify-email, forgot/reset-password
- `/(dashboard)/shared/` — role-adaptive cross-role pages (notifications, transactions, history, monitoring, payments, pickups, reservations, settings). Sidebar/topbar adapts to `useAuth().user.role`. Created to eliminate duplicated role-specific pages.
- `/(dashboard)/admin/` — global cross-branch admin panel + admin-specific pages (sales, users)
- `/(dashboard)/employee/` — branch-locked pages that remain role-specific (pos, inventory, stock-check)
- `/(dashboard)/customer/` — customer-only pages that remain specific (catalog, cart, checkout)

Old role-specific pages for shared concepts (notifications, settings, transactions, etc.) redirect to `/shared/*` via `useEffect` or `redirect()`.

## Roles & constraints

DB enum `user_role` values: `"admin"`, `"employee"`, `"customer"` (not `cashier` or `staff`).

- **admin** — global cross-branch access, user mgmt, analytics
- **employee** — branch-locked (never query/mutate other branches). Unified role: cashier + staff functionality merged
- **customer** — registration, catalog browsing, cart, reservation, pickup
- Only **Cash** and **GCash** payment methods. No delivery (walk-in/pickup only).

## Auth & security

- JWT via `localStorage` (client) + Bearer `Authorization` header on API calls. Auth via `useAuth` hook (`@/hooks/useAuth` → `AuthProvider` at `@/components/auth-provider.tsx`). HTTP-only `auth_token` cookie set server-side as secondary mechanism.
- Registration: email + 6-digit verification code (15 min expiry, max 5 attempts, SHA-256 hashed in DB).
- Code is logged to console in dev. Email delivery falls back through: SMTP → local Mailpit → Ethereal → JSON transport.
- Password hashing: bcryptjs, 10 salt rounds.
- **No `middleware.ts`** exists. `src/proxy.ts` implements full JWT middleware auth with route/role protection but is **not wired up** — auth checks happen client-side in layout components.
- See `src/lib/auth-utils.ts`, `src/lib/auth-edge-utils.ts`, and `src/lib/email-service.ts`.

## Style

- **Prettier**: no semicolons, double quotes, trailing commas, LF line endings, printWidth 80, `prettier-plugin-tailwindcss` with `tailwindStylesheet: "src/app/globals.css"` and `tailwindFunctions: ["cn", "cva"]`
- **ESLint**: flat config via `eslint-config-next/core-web-vitals` + `typescript`
- **Tailwind CSS v4**: `@import "tailwindcss"` (no `@tailwind` directives), `@theme inline` for CSS variables
- **Types**: `@/*` path alias maps to `src/*`, strict mode

## Known gotchas

- Seed script and `drizzle.config.ts` hardcode DATABASE_URL fallback `postgresql://postgres:postgres@localhost:5432/bentahub`
- `src/proxy.ts` is dead/unwired middleware — was intended for route protection but auth is done client-side in each dashboard layout
- Customer Zustand stores (`src/stores/`, `src/hooks/`) are in global dirs but conceptually customer-only — don't import into employee/admin features unless promoted to shared
- No CI workflows or test suites exist
- `.graphifyignore` excludes `node_modules/`, `package.json`, config files, test files, `src/lib/utils.ts`, `src/components/ui/`
- `tsconfig.json` and ESLint both exclude `ECC` and `everything-claude-code` directories
- `.gitignore` excludes `.github`, `.vscode`, `.claude`, `.data`
