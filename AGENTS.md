## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, invoke the `skill` tool with `skill: "graphify"` before doing anything else.

Rules:

- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- Dirty graphify-out/ files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

## Research

When the user asks to research/search/find anything on the web or social platforms, use the **agent-reach** skill (supports web search, Twitter/X, Reddit, B站, Xiaohongshu, V2EX, LinkedIn, GitHub, YouTube, RSS). Run `agent-reach doctor --json` first to check which backends are available.

## Project overview

Next.js 16 (App Router) + React 19 + TypeScript POS/inventory system. Drizzle ORM on PostgreSQL, Tailwind CSS v4, Shadcn UI (radix-nova), Zustand, pnpm, Docker.

## Commands

| Command | What it runs |
|---------|-------------|
| `pnpm dev` | `next dev --turbopack` |
| `pnpm build` | `next build` (standalone output) |
| `pnpm lint` | `eslint` (flat config) |
| `pnpm format` | `prettier --write "**/*.{ts,tsx}"` |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm validate` | `pnpm lint && pnpm typecheck` |
| `pnpm db:push` | `drizzle-kit push` |
| `pnpm db:generate` | `drizzle-kit generate` |
| `pnpm db:seed` | `npx tsx src/drizzle/seed.ts` |
| `pnpm db:studio` | `drizzle-kit studio` |
| `pnpm docker:up` | `docker compose up -d` |
| `pnpm docker:down` | `docker compose down` |
| `pnpm docker:reset` | `docker compose down -v` |

Always run `pnpm validate` before committing. No test suite exists.

## Schema & DB

- Schema: `src/drizzle/schema/` — 10 tables (users, email-verification, password-reset, branches, branch-inventory, products, transactions, cart-items, notifications, orders)
- Migration SQL: `src/drizzle/migrations/`
- DB client: `src/drizzle/db.ts` — reads `DATABASE_URL`, falls back to `postgresql://postgres:postgres@localhost:5432/bentahub`
- `drizzle.config.ts` sets `strict: false`; both it and `db.ts` parse `.env.local` independently
- `tsconfig.json` `rootDir` is `.` (not `src`)
- `pnpm db:seed` clears all tables, creates 6 test accounts (2 per role), 3 branches, 28 products, inventory, 12 months of transactions

## Test accounts

Run `pnpm db:seed`. Credentials printed at end. See `docs/RUNBOOK.md`.

## Architecture & FSD rules

Feature-Sliced Design. No import-boundary enforcement in ESLint.

- `src/features/*/` — isolated modules, cannot import from other features. Cross-feature code → global dirs.
- **Global shared**: `src/components/`, `src/hooks/`, `src/lib/`, `src/stores/`, `src/types/`, `src/config/`
- `src/app/` — App Router pages, layouts, API routes
- Feature-specific server actions in `src/features/[name]/actions/`
- `src/contexts/auth-context.tsx` — active (used by root layout). `src/data/env/` — t3-env style client/server env files. `src/utils/` exists but empty. `src/server/` doesn't exist.
- `docs/FEATURE-SLICED-DESIGN.md` describes aspirational patterns (dbCache, t3-env, subscriptions) that don't exist in code.
- `docs/BENTAHUB.md` is stale — references `cashier`/`staff` roles and old paths.

## App structure (`src/app/`)

- `/(landing)/` — public landing
- `/(auth)/` — login, register, verify-email, forgot/reset-password
- `/(dashboard)/shared/` — role-adaptive cross-role pages (notifications, transactions, history, monitoring, payments, pickups, reservations, settings). Sidebar adapts via `useAuth().user.role`.
- `/(dashboard)/admin/` — cross-branch admin panel
- `/(dashboard)/employee/` — branch-locked (pos, inventory, stock-check)
- `/(dashboard)/customer/` — catalog, cart, checkout

## Roles & constraints

DB enum `user_role`: `"admin"` | `"employee"` | `"customer"` (not `cashier`/`staff`).

- **admin** — global cross-branch access
- **employee** — branch-locked. Unified cashier+staff role.
- **customer** — registration, catalog, cart, reservation, pickup
- Only **Cash** and **GCash**. No delivery (walk-in/pickup only).

## Auth & security

- JWT via `localStorage` + Bearer `Authorization` header. Auth via `useAuth` hook → `AuthProvider` at `@/contexts/auth-context.tsx`. Secondary HTTP-only `auth_token` cookie.
- Registration: email + 6-digit code (15 min, 5 attempts, SHA-256 hashed). Code logged to console in dev. Email fallback: SMTP → Mailpit → Ethereal → JSON.
- Password hashing: bcryptjs, 10 rounds.
- `src/proxy.ts` implements JWT middleware auth with route/role protection but is **not wired up** (not named `middleware.ts`). Auth checks are client-side in dashboard layouts.
- Key files: `src/lib/auth-utils.ts`, `src/lib/auth-edge-utils.ts`, `src/lib/email-service.ts`.

## Style

- **Prettier**: no semicolons, double quotes, trailing commas (es5), LF, printWidth 80, `prettier-plugin-tailwindcss` (tailwindStylesheet: `src/app/globals.css`, tailwindFunctions: `["cn", "cva"]`)
- **ESLint**: flat config, `eslint-config-next/core-web-vitals` + typescript
- **Tailwind CSS v4**: `@import "tailwindcss"` (no `@tailwind`), `@theme inline` for CSS variables
- **Types**: `@/*` → `src/*`, strict mode

## Known gotchas

- Seed script and `drizzle.config.ts` hardcode DATABASE_URL fallback `postgresql://postgres:postgres@localhost:5432/bentahub`
- `src/proxy.ts` is dead/unwired — was intended as middleware but auth is client-side
- Customer Zustand stores (`src/stores/`, `src/hooks/`) are in global dirs but conceptually customer-only — don't import into employee/admin features
- No CI workflows or test suites
- `tsconfig.json` and ESLint both exclude `ECC` and `everything-claude-code`
- `.gitignore` excludes `.github`, `.vscode`, `.claude`, `.data`
- `.graphifyignore` excludes config files, test files, `src/lib/utils.ts`, `src/components/ui/`
