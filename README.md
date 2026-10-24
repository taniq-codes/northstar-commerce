# Northstar Market — E-commerce Platform

**Delivery status:** Phase 1 source-code foundation (offline scaffold); **not production-ready**. This project is based on the attached 37-section master specification. For a detailed map of implemented versus pending features, see `docs/DECISIONS.md` and `docs/TESTING.md`.

## What is here now

- Next.js 16 App Router, React 19, strict TypeScript, Tailwind, accessible UI primitives, responsive storefront shell, light/dark theme toggle.
- Homepage, basic product search/listing and product detail views using **explicit demo mode** (60 fictional products, no database required) or PostgreSQL (when `CATALOG_MODE=database` is configured).
- Prisma schema for users/roles, categories, products/variants, inventory, carts, orders, payments, refunds, reviews, marketing, shipping, tax, and audit trails.
- Deterministic, idempotent development seed for **8 main categories (+16 children), 6 brands, 60 products, 35 users, 40 orders, 30 reviews and 5 coupons**.
- `/api/health`, dev-only `/styleguide`, responsive page skeleton, clear loading and error pages.
- Docker Compose (app, Postgres, Redis, Mailpit, MinIO), basic test files and CI workflow.

**Vercel Drop:** Upload the ZIP at `https://vercel.com/drop`; default `CATALOG_MODE=demo` runs without any database URL. See `VERCEL_DROP.md`.

**Not active yet:** authentication, customer cart, payment collection, stock reservation, staff admin operations, transactional email, and checkout. Do not use this project to take real orders.

## Versions and prerequisites

- Node.js **24 LTS** (security-patched build recommended), pnpm **10.20.0**.
- Next.js **16.4.2** and React **19.3.1** to include security fixes released on October 14–15, 2026.
- Prisma **6.19.0** to keep the mature `prisma-client-js` schema/adapter while the codebase is initially established.
- Docker Engine + Docker Compose V2 for local DB/services (optional when using existing Postgres).

## Fastest setup (Docker)

From the extracted repository root, with Docker installed:

```bash
docker compose up --build
```

The development app initializes the schema with `prisma db push`, loads demo seed records, and serves `http://localhost:3000`. Startup depends on image/package downloads. The dashboard services are Mailpit at `http://localhost:8025` and MinIO at `http://localhost:9001`.

**Warning:** demo Docker credentials are deliberately public and must never be used for a publicly accessible environment. `db push` is only for initial local prototyping; use reviewed migrations before staging/production.

## Native development (Windows PowerShell)

```powershell
corepack enable
corepack prepare pnpm@10.20.0 --activate
pnpm install
Copy-Item .env.example .env
# Optional: for the database-backed catalog, change CATALOG_MODE=database in .env
# Start Postgres using Docker, or point DATABASE_URL to your PostgreSQL instance
# Example: docker compose up -d db
pnpm db:push
pnpm db:seed
pnpm dev
```

Visit `http://localhost:3000`, `/shop`, `/styleguide` (development only), and `/api/health`. In default demo mode, the catalog is visible without PostgreSQL. Database mode requires the configured database and seeded records.

## Verification

```bash
pnpm exec prisma validate
pnpm db:generate
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

**Verification caveat:** This scaffold was authored in a workspace without access to the npm registry and without Docker. The code files can undergo static syntax checks, but **dependency installation, Prisma schema validation, migration application, browser tests, and CI passing status are not verified** in the delivery environment. Follow `docs/TESTING.md` for the remaining verification steps.

## Project map

```text
src/app                     Next.js App Router pages, layouts and route handlers
src/components/ui           shadcn-style local UI components
src/components/layout       Header, footer and theme support
src/components/product      Reusable product cards
src/server/repositories     Database queries (no queries in UI)
src/server/services         Data shaping and typed service boundary
src/lib                     Prisma singleton, environment validation, utilities
src/types                   Public DTOs
prisma/schema.prisma        Normalized PostgreSQL domain schema
prisma/seed.ts              Local demo seed (repeatable)
tests/                      Unit and end-to-end test samples
docs/                       Architecture, decisions, security, test, deployment notes
```

## Roadmap

Build according to the original phase numbering:

1. Foundation (this repository — partial, awaiting runtime verification/migrations)
2. Authentication and customer accounts
3. Full catalog, filtering, variant galleries and search relevance
4. Persistent cart, wishlist, coupons and price engine
5. Checkout, COD, payment adapter, order processing
6. Role-protected admin panel
7. Reviews, content and engagement
8. Security/performance/accessibility/SEO hardening
9. Optional features and local providers
10. Launch readiness and handover

Before launch, select and verify actual payment availability for your business entity and market. For Bangladesh, an adapter for a supported **local payment gateway** may be needed. Do not assume a Stripe account can be opened for a Bangladesh entity without checking eligibility.

## Troubleshooting

- **DB connection fails:** check `docker compose ps`, DATABASE_URL host (`db` inside Compose, `localhost` outside) and password.
- **Missing Prisma client:** run `pnpm db:generate` after `pnpm install`.
- **Empty storefront (database mode):** run `pnpm db:seed` on the same DATABASE_URL.
- **Missing tables:** in local development, run `pnpm db:push`. Do not apply this approach to production.
- **Compiler complains:** open an issue with exact error log and version; the offline package/build verification limitation is disclosed above.
