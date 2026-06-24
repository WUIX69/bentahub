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

- Schema: `src/drizzle/schema/` (Drizzle ORM with `postgres-js` driver)
- Migration SQL: `src/drizzle/migrations/`
- DB client: `src/drizzle/db.ts` — reads `DATABASE_URL`, falls back to `postgresql://postgres:postgres@localhost:5432/bentahub`
- Seed (`pnpm db:seed`): auto-parses `.env.local`, **clears all tables first** (branches, products, branchInventory, transactions)
- Both `drizzle.config.ts` and `src/drizzle/db.ts` independently parse `.env.local` at runtime

## Architecture & FSD rules

Feature-Sliced Design. Strict isolation rules:

- **`src/features/*/`** — isolated business modules. Cannot import from other features.
- **`src/components/`, `src/hooks/`, `src/lib/`, `src/stores/`, `src/types/`, `src/config/`** — shared global layer.
- Cross-feature import = refactor into a global directory.
- `src/app/` — Next.js App Router pages, layouts, API routes.
- For feature-specific server actions, use `src/features/[name]/actions/` (not separate API routes unless third-party needed).

Actual shared dirs are sparser than docs suggest: `src/data/` is empty, `src/contexts/` is empty. The aspirational patterns in `docs/FEATURE-SLICED-DESIGN.md` (dbCache, t3-env, subscriptions) do not exist in this codebase.

## App structure

Route groups under `src/app/`:

- `/(landing)/` — public landing
- `/(auth)/` — login, register, verify-email, forgot/reset-password
- `/(dashboard)/admin/` — global cross-branch admin panel
- `/(dashboard)/employee/` — branch-locked POS + inventory + pickup (role replaces former "cashier" + "staff")
- `/(dashboard)/customer/` — catalog, cart, checkout, reservations (pickup only, no delivery)

## Roles & constraints

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

- **Prettier**: no semicolons, double quotes, trailing commas, LF line endings, printWidth 80, `prettier-plugin-tailwindcss`
- **ESLint**: flat config via `eslint-config-next/core-web-vitals` + `typescript`
- **Tailwind CSS v4**: `@import "tailwindcss"` (no `@tailwind` directives), `@theme inline` for CSS variables
- **Types**: `@/*` path alias maps to `src/*`, strict mode

## Known gotchas

- Seed script hardcodes DATABASE_URL fallback `postgresql://postgres:postgres@localhost:5432/bentahub`
- `src/proxy.ts` is dead/unwired middleware — was intended for route protection but auth is done client-side in each dashboard layout
- Customer Zustand stores (`src/stores/`, `src/hooks/`) are global but conceptually customer-only — don't import into employee/admin features unless promoted to shared abstractions
- No CI workflows or test suites exist
- `.graphifyignore` excludes `node_modules/`, `package.json`, config files, test files, `src/lib/utils.ts`, `src/components/ui/`
- `tsconfig.json` excludes `ECC` and `everything-claude-code` directories
- `.gitignore` excludes `.github`, `.vscode`, `.claude`, `.data`
