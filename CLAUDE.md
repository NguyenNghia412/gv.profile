# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vietnamese teacher profile management system for HUCE (Hanoi University of Civil Engineering). Displays lecturer info and scientific publications, protected by OAuth 2.0 via OpenIddict.

## Environment Variables

Copy `.env.example` to `.env.local`. Required vars:
- `NEXTAUTH_URL` — public base URL of this app
- `NEXTAUTH_SECRET` — NextAuth signing secret
- `AUTH_ISSUER` — OpenIddict authority URL
- `AUTH_CLIENT_ID` / `AUTH_CLIENT_SECRET` — OAuth client credentials
- `NEXT_PUBLIC_BASE_URL` — backend API base URL (injected at runtime via `next-runtime-env`)

## Architecture

### Auth Flow
NextAuth (`src/app/api/auth/[...nextauth]/route.ts`) uses a custom OpenIddict OAuth provider with PKCE. Tokens (access, refresh, id) are stored in a JWT session cookie. `src/app/api/auth/refresh/route.ts` handles silent token refresh by reading the cookie directly, calling `/connect/token`, and rewriting the cookie — this route is called by the axios interceptor in `src/app/services/api_services.ts` whenever a 401 is received.

### API Client
`src/app/services/api_services.ts` exports a singleton `axiosClient` with:
- Request interceptor: attaches `Bearer` token from the NextAuth session
- Response interceptor: on 401, calls `/api/auth/refresh` then retries the original request

All data fetching calls go through this client. Server-side calls use `getServerSession` to pass the token directly.

### Page Structure
- `/` — paginated teacher list table
- `/teacher/thong-tin-chung/[mans]` — teacher general info (profile, education history, work history)
- `/teacher/cong-bo-khoa-hoc/[mans]` — scientific publications (5 categories, each paginated)

The `[mans]` segment is the teacher's employee ID.

### Component Layers
- `src/components/layout/` — Header (with nav and logout), Footer
- `src/components/pages/` — page-specific components; `LoginToView` gates sections requiring auth
- `src/components/ui/` — generic primitives: Table, Pagination, Loading, Dropdown, etc.

### Models
All TypeScript interfaces are in `src/models/`:
- `profile.model.ts` — `IProfile`, `IDetailProfile`, `ICongBoKhoaHoc`, `IBaiBaoCongBo`, `IGIaiThuongKHCN`, `ISachXuatBan`, `IViewRowQuaTrinhCongTac`, `IViewRowQuaTrinhDaoTao`
- `response.models.ts` — API response wrappers

### Path Alias
`@/*` maps to `./src/*` — use this for all imports.

## Key Conventions
- Vietnamese variable/field names mirror the backend API (e.g., `mans`, `hoTen`, `donVi`, `coSoKhoaHoc`)
- Runtime env vars accessed via `env()` from `next-runtime-env`, not `process.env`, for client-side vars
- `src/lib/common.ts` — `CommonUtils` with JWT parsing helpers
- `src/constants/menu.ts` — navigation menu structure

## Techstack
- Nextjs 14 + Next Auth 4.24
- Style: Tailwind, Shadcn
- Icon: Lucide react

## Styling
- Do not write custom style if tailwind already cover it
- Use shadcn components as most as possible
- Do not create new theme color
