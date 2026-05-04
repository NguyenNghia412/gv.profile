## Assistant guide & implementation contract

This document is written for the automated assistant and humans working on this repository. Use it as the single source of truth for the app's architecture, conventions, security requirements, and the exact behavior expected when changing authentication, API client, or deployment code.

---

## Project overview

- Name: gv.profile
- Stack: Next.js (app router, v14), TypeScript, Tailwind CSS
- Auth: `next-auth` (OAuth provider named "OpenIddict")
- HTTP: `axios` wrapper at `src/app/services/api_services.ts`
- Purpose: public website listing profiles (giảng viên) and research outputs

Core directories (important files):

- `src/app/layout.tsx` — root layout, imports `Header`, `Footer`, `Providers`.
- `src/app/page.tsx` — home page. Client component that calls `ProfileUserApi`.
- `src/app/globals.css` — global styles and fonts.
- `src/app/services/api_services.ts` — axios instance, currently returns `res.data` for responses.
- `src/app/services/profile_user.ts` — API layer used by UI components.
- `src/app/api/auth/[...nextauth]/route.ts` — NextAuth route; currently contains hard-coded secrets.
- `src/models/*.ts` — TypeScript interfaces for payloads and API responses.
- `src/components/*` — small UI components (table, loading, header, footer, pagination).

---

## Conventions & patterns

- Files under `src/app` that fetch client-side data use `use client` and call the API layer directly.
- API client (`axiosClient`) uses `baseURL` and an interceptor to return `res.data`.
- Types from `src/models` are referenced in service function signatures for clarity.
- UI components are small and stateless where possible; pages handle loading state.

---

## Security & environment requirements (must fix)

1. Secrets must not be checked into source control. The file `src/app/api/auth/[...nextauth]/route.ts` currently contains a hard-coded `clientSecret`. Move the following values to environment variables:

   - NEXTAUTH_URL (NextAuth base URL)
   - NEXTAUTH_SECRET (next-auth secret for JWT)
   - OPENID_WELL_KNOWN (well-known discovery URL for OpenIddict)
   - OPENID_CLIENT_ID
   - OPENID_CLIENT_SECRET
   - NEXT_PUBLIC_API_BASE (for client-side use if needed)

2. Create a `.env.local.example` (no secrets) listing required env vars with example values.

3. Do not commit secrets to the repo. If any secret was committed, rotate it in the provider.

---

## Implementation contract for auth & API improvements

When implementing changes to NextAuth and the API client, satisfy this contract.

Goal: Move hard-coded auth config into env vars, add safe token handling (attach access_token to API calls when available), and implement a refresh-token flow in NextAuth callbacks.

Behavioral contract (inputs/outputs):

- Inputs:
  - Environment variables (server-only) for OpenID provider configuration.
  - OAuth login flow (external provider returns tokens).
  - Client or server makes API requests through `ProfileUserApi`.

- Outputs:
  - NextAuth issues session objects with `access_token` and `user.id` available via `getServerSession` on server or `useSession` on client.
  - `axiosClient` automatically includes `Authorization: Bearer <access_token>` header when a token is available for the request context.

- Error modes:
  - Provider unreachable or misconfigured -> NextAuth returns 500/redirects to error page. Log details (server only) but never leak secrets to client.
  - Access token expired -> NextAuth `jwt` callback attempts refresh. If refresh fails, sign out the user and clear session.
  - API request fails with 401 -> if refresh is successful, retry request once; otherwise return the 401 upward.

Success criteria:

- No hard-coded secrets remain in source files.
- Env vars documented in `.env.local.example`.
- Client pages using `ProfileUserApi` continue to work for public endpoints.
- When logged in, API requests include `Authorization` header and succeed when the backend requires auth.

---

## Edge cases and test cases

Edge cases to consider when coding:

- No session at all (anonymous user) — public API calls must still work.
- Token present but expired — the `jwt` callback must try to refresh, and `axios` must retry the request after refresh.
- Refresh token revoked — user must be signed out gracefully.
- Large responses — API layer should not deadlock the UI; use pagination (already present).

Minimal tests to add (recommended):

1. Unit tests for `ProfileUserApi.getListProfile` mocking `axiosClient` and asserting correct URL and parameter handling.
2. Tests for NextAuth `jwt` callback refresh logic (mock token endpoint) to validate token rotation.

---

## Suggested concrete tasks (pick one or more)

1. Move hard-coded auth values to env vars + create `.env.local.example` (high priority).
2. Add axios request interceptor that can read the token from session/server and attach `Authorization` header (medium priority).
3. Implement refresh token flow in NextAuth `jwt` callback (medium-high priority).
4. Add `scripts` for `docker-publish` to CI or a GitHub Actions workflow to build and push images (optional).

If you pick Task 1, I will:

- Create `.env.local.example` with variable names and example values.
- Update `src/app/api/auth/[...nextauth]/route.ts` to use `process.env.*` for config.
- Update `src/app/services/api_services.ts` to use `process.env.NEXT_PUBLIC_API_BASE` or `process.env.API_BASE` depending on usage.
- Run a quick static check (TypeScript compile) to ensure no syntax errors.

---

## How to run locally (dev notes)

Use the supplied package.json scripts:

```powershell
# install deps
npm install

# run dev server (in PowerShell or WSL)
npm run dev
```

When testing auth flows locally, ensure your OpenID provider `well-known` URL is reachable from your dev machine. Use port forwarding or a tunneled URL if needed.

---

If you'd like, tell me which task from "Suggested concrete tasks" to start with and I will implement it and validate by running relevant checks.

---

Last updated: 2026-04-24
