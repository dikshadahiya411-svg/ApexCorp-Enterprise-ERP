# Known limitations / verification status

This deliverable is a **working-oriented MVP codebase** and not a finished enterprise-grade security product.

- No database credentials or running hosted database were provided, so real database operations were not verified here.
- No actual Vercel deployment was performed.
- The UI is implemented but browser screenshot/Playwright testing was not performed in this environment.
- No password reset email or secure admin-led MFA reset workflow.
- TOTP replay prevention and rate limiting need additional work.
- Audit history is not externally tamper-proof.
- Financial ledger tracks workflow and value, not balanced double-entry accounting.
- Strict Biba may make records invisible to high-integrity users by design.
- Resource edit/delete endpoints exist, but UI currently supports resource creation/listing only.
- Audit pagination is API-based; frontend shows latest page only.
- User permissions are role-based, not a full dynamic permission matrix.
- The initial database schema is supplied as `prisma/schema.prisma`. Run `npx prisma db push` from a trusted environment to initialize it. Reviewed migrations should be added for future production schema changes.
- Confirm compilation and tests in your environment using `npm install && npm run build && npm test`.
