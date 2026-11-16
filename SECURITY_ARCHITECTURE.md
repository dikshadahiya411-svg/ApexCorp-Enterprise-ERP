# Security architecture

- Authentication: bcrypt password hashes, signed HttpOnly SameSite=Lax JWT cookie, server-side user active check, 12-hour session lifetime, lockout after five failures for 15 minutes.
- MFA: TOTP via otplib; secrets encrypted with AES-256-GCM and `MFA_ENCRYPTION_KEY`; one-time recovery codes stored as SHA-256 hashes. Administrative user modifications require an MFA-enabled admin. TOTP replay prevention is **not** fully implemented; production deployments need server-side per-step replay tracking and rate limits.
- Integrity: `canRead(subject, object)` enforces `object >= subject`; `canWrite(subject, object)` enforces `subject >= object`. No implicit admin exception. Dashboard and listing queries filter classified records server-side.
- Financial workflow: DRAFT -> PENDING_APPROVAL -> APPROVED or REJECTED -> POSTED. Self-approval and self-posting forbidden. Conditional updateMany with version field helps reject conflicting updates; approvals and approval status are written atomically. Ledger posted records have no edit/delete endpoints.
- Audits: login outcomes and security events persisted to PostgreSQL; audit views restricted to ADMIN/AUDITOR. User role modifications logged.
- Limitations: TOTP replay protection, account recovery, external password reset email, CSRF defense-in-depth for all mutations, tamper-resistant audit storage, fine-grained RBAC permissions, financial balancing/compensation, MFA enforcement for all privileged actions, and comprehensive integration testing require additional work.
- Production: Use TLS, rate limiting at the edge, strong secrets, restricted database privileges, backup/restore, independent audit review, monitoring, and penetration testing.
