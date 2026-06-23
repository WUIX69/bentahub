# BentaHub — Agent Instructions

## Project overview

Next.js 16 (App Router) + React 19 + TypeScript POS/inventory system for a sari-sari store chain. Drizzle ORM on PostgreSQL, Tailwind CSS v4, Shadcn UI (radix-nova style), Zustand state, pnpm, Docker.

## Commands

| Command | What it runs |
|---|---|
| `pnpm dev` | `next dev --turbopack` |
| `pnpm build` | `next build` (output: standalone) |
| `pnpm lint` | `eslint` (flat config) |
| `pnpm format` | `prettier --write \"**/*.{ts,tsx}\"` |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm validate` | `pnpm lint && pnpm typecheck` |
| `pnpm db:push` | `drizzle-kit push:pg` |
| `pnpm db:generate` | `drizzle-kit generate:pg` |
| `pnpm db:seed` | `npx tsx scripts/seed-admin-data.ts` |
| `pnpm db:studio` | `drizzle-kit studio` |

Always run `lint -> typecheck` (or `pnpm validate`) before committing. There are no tests.

## Architecture & FSD rules

This repo uses **Feature-Sliced Design**. Strict isolation rules:

- **`src/features/*/`** — isolated business modules. Cannot import from other features.
- **`src/components/`, `src/hooks/`, `src/lib/`, `src/servers/`, `src/stores/`, `src/types/`, `src/config/`** — shared global layer.
- Cross-feature import = refactor the shared piece into a global directory.
- `src/app/` — Next.js App Router pages, layouts, API routes (`api/auth/`, `api/admin/`, `api/customer/`).
- For feature-specific server actions, use `src/features/[name]/actions/` (not separate API routes unless third-party needed).

## App structure

- `/(landing)/` — public landing
- `/(auth)/` — login, register, verify-email, forgot/reset-password
- `/admin/` — global cross-branch admin panel
- `/cashier/` — branch-locked POS (scan, cash/gcash checkout)
- `/staff/` — branch-locked inventory and pickup management
- `/customer/` — catalog, cart, checkout, reservations (pickup only, no delivery)

## Roles & constraints

- **admin** — global cross-branch access, user mgmt, analytics
- **cashier, staff** — branch-locked (never query/mutate other branches)
- **customer** — registration, catalog browsing, cart, reservation, pickup
- Only **Cash** and **GCash** payment methods. No delivery architecture (walk-in/pickup only).

## Auth & security

- JWT stored in HTTP-only cookie (`auth_token`), 7-day expiry. Auth via client-side `AuthProvider`/`useAuth` + server-side API route checks. **No `middleware.ts`** exists.
- Registration: email + 6-digit verification code (15 min expiry, max 5 attempts, SHA-256 hashed in DB).
- Code is logged to console in dev (no SMTP needed). Email falls back through: SMTP → local Mailpit → Ethereal → JSON transport.
- Password hashing: bcryptjs, 10 salt rounds.
- See `src/lib/auth-utils.ts` and `src/lib/email-service.ts`.

## Database

- Schema: `src/servers/schemas/` (Drizzle ORM with `pg` driver)
- Migration SQL: `drizzle/`
- Connection: `src/servers/db/index.ts` (reads `DATABASE_URL`, falls back to `postgresql://postgres:postgres@localhost:5432/bentahub`)
- Seed (`pnpm db:seed`): auto-parses `.env.local`, **clears all tables first** (branches, products, branchInventory, transactions).
- Docker: `docker-compose up -d` starts PostgreSQL 15 + app. App waits for healthy DB.

## Style

- **Prettier**: no semicolons, double quotes, trailing commas, LF line endings, printWidth 80, `prettier-plugin-tailwindcss`
- **ESLint**: flat config via `eslint-config-next/core-web-vitals` + `typescript`
- **Tailwind CSS v4**: `@import "tailwindcss"` (no `@tailwind` directives), `@theme inline` for CSS variables, `@custom-variant dark`
- **Types**: `@/*` path alias maps to `src/*`, strict mode

## Known gotchas

- Seed script hardcodes DATABASE_URL fallback `postgresql://postgres:postgres@localhost:5432/bentahub`
- `src/proxy.ts` exists but is a pass-through (auth is client-side)
- Customer Zustand stores (`src/stores/`, `src/hooks/`) are global but conceptually customer-only — don't import into cashier/staff features unless promoted to shared abstractions
- No CI workflows or test suites exist
- `.graphifyignore` excludes `node_modules/`, `package.json`, config files, test files, `src/lib/utils.ts`, `src/components/ui/`

## graphify

This project has a knowledge graph at `graphify-out/` with god nodes and cross-file relationships.

When the user types `/graphify`, invoke `skill` with `skill: "graphify"` before anything else.
- For codebase questions, run `graphify query "<question>"` when `graphify-out/graph.json` exists.
- Use `graphify path "<A>" "<B>"` for relationships, `graphify explain "<concept>"` for focused concepts.
- Skip only if the task is about stale graph output or user says not to use it.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
