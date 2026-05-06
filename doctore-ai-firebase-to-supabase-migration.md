# Doctore AI — Firebase to Supabase Migration Directive

**Decision:** Firebase is deprecated. Supabase Postgres/Auth is canonical.

## Why

Doctore AI is relational by design: bets, signals, odds snapshots, model runs, imports, settlements and CLV records must be joinable, auditable and protected with row-level security. Maintaining Firebase and Supabase in parallel creates inconsistent auth, duplicated data models and higher defect risk.

## Required migration order

1. Search and inventory all Firebase usage.
2. Remove Firebase client/admin dependencies after equivalent Supabase paths exist.
3. Add Supabase environment variables.
4. Add typed Supabase clients for browser, server and admin contexts.
5. Add migrations and RLS policies.
6. Replace auth/session checks.
7. Replace Firestore reads/writes with Supabase queries.
8. Add integration tests for RLS and ledger isolation.
9. Confirm no Firebase references remain.

## Search command

```bash
rg -n "firebase|firestore|getFirestore|getAuth|initializeApp|firebase-admin|onAuthStateChanged|collection\(|doc\(|setDoc|addDoc|getDocs|query\(" .
```

## Package commands

```bash
npm uninstall firebase firebase-admin
npm install @supabase/supabase-js @supabase/ssr
```

## Environment variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_DB_URL=
```

## Acceptance criteria

- No Firebase dependencies remain in `package.json`.
- No Firebase imports or Firestore operations remain in the repository.
- Supabase clients are centralized under `lib/db/`.
- User-owned data references `auth.users(id)`.
- RLS is enabled and tested for all user-owned tables.
- Dashboard, ledger import and analytics run through Supabase only.
