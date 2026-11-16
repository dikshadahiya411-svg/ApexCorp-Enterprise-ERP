# ApexCorp Enterprise Operations & Security ERP

A real Next.js App Router / TypeScript / Prisma / PostgreSQL starter application designed for Vercel hosting. It contains integrated login, registration, optional TOTP MFA, strict Biba access rules, maker-checker financial transactions, resource records, user administration, audit events, reports, and a custom responsive graphite/forest-green interface.

**This is a functional MVP, not a security-certified production ERP.** See `SECURITY_ARCHITECTURE.md` and `KNOWN_LIMITATIONS.md` before real-world use.

## Requirements

- Node.js 20.9+ (Node.js 22 LTS recommended)
- PostgreSQL database (Neon, Supabase Postgres, or another reachable Postgres service)
- npm

## Run locally

1. `npm install`
2. Copy `.env.example` to `.env.local` and set `DATABASE_URL`, `AUTH_SECRET` (32+ random characters) and `MFA_ENCRYPTION_KEY` (64 random hexadecimal characters).
3. Prisma CLI reads `.env`, not necessarily `.env.local`. For local migrations and seeding, also create a **private** `.env` with the same values. Never commit these files.
4. `npm run db:push` (creates the initial database schema; for production, adopt committed Prisma migrations after validation)
5. Set `BOOTSTRAP_ADMIN_EMAIL` and `BOOTSTRAP_ADMIN_PASSWORD` in your private `.env` and run `npm run db:seed` to create the initial admin. Remove bootstrap variables after seeding.
6. `npm run dev` and open http://localhost:3000
7. Log in as the administrator and visit **Account security** to enable MFA before attempting administrative changes.
8. Create a second account using Register. Use admin controls to assign a Maker or Checker role and suitable integrity levels. A maker creates/submits a voucher; a *different* Checker/Finance user approves it; a Finance user posts it.

**Integrity policy note:** Strict Biba no-read-down means HIGH users cannot view LOW resources or transactions. For a simple demonstration, assign maker and checker the same LOW integrity level. Administrative changes require an MFA-enabled admin account.

## Deploy on Vercel from GitHub

1. Create a GitHub repository and push this folder (not the parent ZIP).
2. Provision a hosted PostgreSQL database and copy its server connection URL.
3. In Vercel, import the GitHub repository as a Next.js project.
4. Add Vercel environment variables: `DATABASE_URL`, `AUTH_SECRET`, `MFA_ENCRYPTION_KEY`. Use secure random values and the appropriate pooled/database URL for your provider.
5. Before deployment, initialize the schema from a trusted environment using `npx prisma db push` with production `DATABASE_URL`. For ongoing production changes, adopt reviewed and committed Prisma migrations.
6. Deploy. The build command is `npx prisma generate && next build`.
7. Create the first administrator using the bootstrap script from a trusted environment, then remove bootstrap credentials. **Never** expose admin passwords in the frontend or commit them to Git.
8. Test sign-in, MFA, authorization, resources, ledger workflow and exports on the deployed URL.

### Why PostgreSQL?

Vercel supports Next.js functions; SQL Server 2022 and the ASP.NET MVC server from the original specification are not bundled here. This is the requested Vercel-compatible adaptation, using PostgreSQL for persistent data.

## Commands

- `npm run dev` — start development server
- `npm run build` — generate Prisma client and build Next.js
- `npm test` — run Biba rule unit tests
- `npm run db:migrate` — generate/apply a development migration
- `npm run db:push` — initialize the schema (use reviewed migrations for subsequent production changes)
- `npm run db:seed` — seed departments and optional initial admin

## Key files

- `app/api/` — authenticated API route handlers
- `components/Portal.tsx` — interactive UI
- `prisma/schema.prisma` — normalized database schema
- `lib/security.ts` — Biba rules
- `lib/auth.ts` — signed HTTP-only sessions
- `lib/mfa.ts` — encrypted TOTP secret utilities
- `tests/security.test.ts` — Biba policy tests

## Notes

Register creates a VIEWER/LOW user, never an admin. The seed script creates the first admin only when the database has no admin. Authentication and financial actions use server-side checks. No real emails are sent, and password reset is not yet implemented. This starter should undergo additional security review and integration tests before real financial data is used.
