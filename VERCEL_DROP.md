# Deploy the Northstar storefront preview with Vercel Drop

1. Upload the whole `northstar-commerce-vercel-drop.zip` at https://vercel.com/drop.
2. Vercel should detect **Next.js**. The root is `northstar-commerce-vercel-drop/` inside the ZIP.
3. Keep the default environment configuration. `CATALOG_MODE=demo` is the default, so no PostgreSQL URL is required for the preview.
4. Start deployment. The public storefront, browsing, searching, and product pages use **fictional in-memory sample data** and are read-only.
5. To use the actual database later, configure `CATALOG_MODE=database`, supply a PostgreSQL `DATABASE_URL`, apply the schema and seed it using the documented database tooling. Production payments and real checkout are NOT implemented.

## Fixes after first upload

- Fixed the TypeScript error TS18048 by defaulting `maximumFractionDigits` safely.
- Fixed narrow literal union `.includes()` errors for order status checks in the seed script by using typed `ReadonlySet<OrderStatus>`.
- Added the explicit `CATALOG_MODE=demo` mode to avoid requiring a configured database for a preview deployment. The real database-backed service remains available when explicitly enabled.

## Limitations

Not a complete e-commerce service. There are no customer accounts, carts, live payments, order processing, admin functionality, or real inventory workflows yet. The Prisma schema has no production-ready baseline migration. Dependency-based `npm run build` was not runnable inside the packaging environment because registry access is unavailable, so the Vercel build must be used to verify installation and production compile.
