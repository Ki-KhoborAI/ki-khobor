# Deploying TXG at ki-khobor.com/txg-nagaland

The TXG help desk is its own app. To make it live at **ki-khobor.com/txg-nagaland**
without touching the chat app, deploy it once and point that path at it.

## Step 1 — Deploy the TXG app to Vercel

1. Push this project to a GitHub repo.
2. In Vercel, **New Project → import the repo**.
3. Add **Environment Variables** (Project → Settings → Environment Variables):

   | Name | Value |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://ugcltyihvdwbbxegvvou.supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_KEY` | `sb_publishable_GnOuWPJV2fXx0U7CdS0YoA_uAInin-_` |
   | `NEXT_PUBLIC_BASE_PATH` | `/txg-nagaland` |

   > The base-path var is what makes the app serve correctly under the subpath.
   > (Locally you leave it unset, so `npm run dev` stays at `localhost:3000/`.)
4. Deploy. You'll get a URL like `https://txg-kikhobor.vercel.app`. Its pages live
   under `…/txg-nagaland` (e.g. `https://txg-kikhobor.vercel.app/txg-nagaland`).

## Step 2 — Point ki-khobor.com/txg-nagaland at it (rewrite)

On the **ki-khobor.com** project (the Ki-Khobor team owns this), add a rewrite so the
path is proxied to the TXG deployment. On Vercel, add/merge a **`vercel.json`** at the
repo root:

```json
{
  "rewrites": [
    { "source": "/txg-nagaland", "destination": "https://txg-kikhobor.vercel.app/txg-nagaland" },
    { "source": "/txg-nagaland/:path*", "destination": "https://txg-kikhobor.vercel.app/txg-nagaland/:path*" }
  ]
}
```

Replace `txg-kikhobor.vercel.app` with the real TXG deployment domain. Redeploy
ki-khobor.com. Now **ki-khobor.com/txg-nagaland** serves the TXG help desk, and the chat
app is completely untouched.

> Prefer a subdomain? `txg.ki-khobor.com` is even simpler — deploy the TXG app, add that
> domain to it in Vercel, and **skip the base path** (unset `NEXT_PUBLIC_BASE_PATH`) and
> the rewrite entirely. Either gives a Ki-Khobor-branded URL.

## Step 3 — Supabase auth URLs

In Supabase → **Authentication → URL Configuration**, add your public URL(s)
(`https://ki-khobor.com` and/or the Vercel domain) to **Site URL / Redirect URLs** so the
admin login works in production.

## Step 4 — Link the ad

Point the main site's "Ki-Khobor TXG" card (currently the `PRODUCT_2_LINK` placeholder)
at `/txg-nagaland`. Done — the ad now opens the live help desk.
