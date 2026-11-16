# GitHub → Vercel quick guide

1. Unzip the archive. Open the inner `ApexCorp_Enterprise_ERP` folder.
2. On GitHub, create a new empty repository, e.g. `apexcorp-enterprise-erp`.
3. From the project folder run:
   ```sh
   git init
   git add .
   git commit -m "Initial ApexCorp ERP"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/apexcorp-enterprise-erp.git
   git push -u origin main
   ```
4. Create a PostgreSQL database (Neon or Supabase Postgres) and obtain its connection string.
5. Locally configure `.env`, install dependencies and initialize the schema with `npx prisma db push`. For subsequent production schema changes, create and commit reviewed migrations.
6. On https://vercel.com/new import the repository.
7. Add `DATABASE_URL`, `AUTH_SECRET`, `MFA_ENCRYPTION_KEY` as environment variables in Vercel settings.
8. Initialize the database with `npx prisma db push` from a trusted environment connected to production PostgreSQL.
9. Deploy and bootstrap your admin securely from your own machine. Do not upload `.env` or secrets.
10. Test functionality. See README and KNOWN_LIMITATIONS.
