# TXG · Ki-Khobor Help Desk

The official help-desk / info companion app for **TXG 2026 — Technology, Gaming &
Innovation Expo** (NBCC Convention Hall, Kohima · Aug 28–29, 2026), built by
**Ki-Khobor** (a student startup from Tetso College).

A mobile-first web app where attendees can browse events, the schedule, the venue,
transport and contacts; check **live tournament standings and winners**; read **live
updates**; and ask the **Ki-Khobor assistant** anything about TXG. A single admin keeps
it all current from `/admin`.

- **Stack:** Next.js 16 (App Router) · React 19 · Tailwind v4 · TypeScript
- **Backend:** Supabase (Postgres + Auth + Realtime + RLS)

## Getting started (local)

```bash
npm install
npm run dev
# open http://localhost:3000
```

`.env.local` is already included and points at the live Supabase project, so real data
loads immediately. Environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_KEY=...     # Supabase publishable key (safe for the browser; RLS enforces writes)
```

## Admin

Go to `/admin` and sign in. Default: `admin@ki-khobor.com` / `TxgAdmin@2026` (change it
in the Supabase dashboard). Full instructions in **[ADMIN_GUIDE.md](./ADMIN_GUIDE.md)**.

## Project structure

```
app/
  page.tsx              Landing
  help-desk/            Home hub (menu + live announcement banner)
  events/ schedule/ venue/ contact/ faqs/ transportation/ about-txg/
  games/                Live tournaments & standings (Realtime)
  updates/              Live announcements feed (Realtime)
  ask/                  Ask Ki-Khobor (chat)  →  app/api/ask  (search + logging)
  admin/                Login + full content management panel
components/             Shared UI (nav, headers, admin form primitives, realtime)
lib/
  supabase/             Browser + server + middleware clients
  queries.ts            Server-side data access
  search.ts             Smart FAQ search (AI-ready)
  database.types.ts     Generated Supabase types
supabase/               schema.sql + seed.sql (reference / re-provisioning)
```

## Backend

The Supabase project (`ki-khobor`) is already provisioned with the schema, seed data,
RLS policies, Realtime, and the admin user. `supabase/schema.sql` and `supabase/seed.sql`
reproduce it on a fresh project if ever needed. Public reads are open (published rows
only); all writes require an authenticated admin session.

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Import it in Vercel.
3. Add the two env vars above in Vercel → Project → Settings → Environment Variables.
4. Deploy. (In Supabase → Authentication → URL Configuration, add your Vercel URL.)

Then, on the main site, point the "Ki-Khobor TXG" product link (currently the
`PRODUCT_2_LINK` placeholder) at the deployed URL.
