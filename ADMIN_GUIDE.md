# TXG · Ki-Khobor Help Desk — Admin Guide

The admin panel lets one person keep everything in the app up to date, live during
the event. It works on a phone or a laptop.

## Signing in

1. Go to **`/admin`** (e.g. `http://localhost:3000/admin`, or `https://your-site.vercel.app/admin`).
2. Sign in with the admin account:
   - **Email:** `admin@ki-khobor.com`
   - **Password:** `TxgAdmin@2026`  ← change this (see below).

### Change the password / email or add another admin

In the [Supabase dashboard](https://supabase.com/dashboard) → project **ki-khobor** →
**Authentication → Users**, you can reset the password, change the email, or invite
another admin. Any user that can sign in has full admin access.

## What you can manage

| Section | What it controls |
|---|---|
| **Updates** | Live announcements. Pinned ones show on the home screen and the Updates feed. |
| **Games** | Tournaments, their status (upcoming / live / completed), standings, and champions. |
| **Events** | Competitions, showcases, panels — with a Register link. |
| **Schedule** | The two-day agenda. |
| **FAQs** | The FAQ screen **and** the answers the "Ask Ki-Khobor" assistant gives. |
| **Contacts** | Support directory (Call / Email buttons appear when you add a number/email). |
| **Drivers** | Taxi and scooty drivers, with availability toggles. |
| **Venue** | The "important locations" list. |
| **Questions** | What people have asked the assistant (amber = it had no confident answer). |
| **Settings** | Event name, dates, venue, links. |

Every change appears in the app immediately. Standings, tournaments and updates also
**push live** to phones that already have the page open (no refresh needed).

## Running the games live (the main event-day job)

1. Open **Games** in the admin panel.
2. When a tournament starts, set its **Status** to `live`.
3. As matches finish, update each team's **P / W / L / Pts** and **Rank**, then Save.
4. When it's over, set **Status** to `completed` and fill in **Champion**.
5. Post a **Update** ("Mobile Legends won by Team X!") so it shows on the home screen.

## Improving the assistant

Open **Questions** to see what attendees asked. Anything with an amber dot didn't get
a confident answer — add a matching **FAQ** (with good keywords) and the assistant will
answer it from then on.

## The "Ask" assistant, and adding real AI later

Today the assistant does fast, reliable **keyword search over your FAQs** — no AI cost,
no wrong answers. The data is already structured for a future upgrade: the `faqs` table
has an `embedding` column (pgvector is enabled), so a real LLM/RAG assistant can be added
later without changing any of the screens.
