# Next.js template

This is a Next.js template with shadcn/ui.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button";
```

## 🐳 Docker Setup

You can run the entire stack (Next.js frontend, PostgreSQL database, and migrations) using Docker.

### Prerequisites
1. Install [Docker](https://www.docker.com/) and ensure the Docker daemon is running.
2. Make sure you have created `.env.local` based on `.env.example`.

### Running the Full Application Stack
To build the images and start all services (database, migrations, and web app) in the foreground:

```bash
docker compose up --build
```

Once started, the application will be available at [http://localhost:3000](http://localhost:3000).

### Running PostgreSQL Only (For Local Development)
If you prefer to run Next.js on your host machine but want the database running in Docker:

```bash
docker compose up -d db
```

You can then run migrations and start the dev server locally:
```bash
pnpm install
pnpm db:push
pnpm dev
```

### Seeding the Database
To seed the database with initial administrative and branch data inside Docker (run this after a fresh installation or database wipe):

```bash
docker compose run --rm db-migrate pnpm db:seed
```

> [!WARNING]
> Running the seed script will clear all existing tables (branches, products, inventory, transactions) before insert! Only run this on a fresh database.
