-- TXG · Ki-Khobor Help Desk — database schema
-- Already applied to the `ki-khobor` Supabase project. Kept here so the backend
-- can be reproduced on a fresh project (run this, then seed.sql).

create extension if not exists vector;
create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create table if not exists public.settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null default '',
  category text not null default 'general' check (category in ('general','game','schedule','alert')),
  pinned boolean not null default false,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default 'competition' check (category in ('competition','showcase','panel','activity')),
  description text not null default '',
  prize text default '',
  format text default '',
  location text default '',
  registration_url text default '',
  icon text default 'Gamepad2',
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.schedule_items (
  id uuid primary key default gen_random_uuid(),
  day_label text not null default 'Day 1',
  event_date date,
  start_time text not null default '',
  end_time text default '',
  title text not null,
  location text default '',
  description text default '',
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tournaments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  game text default '',
  format text not null default 'leaderboard' check (format in ('bracket','round_robin','leaderboard')),
  status text not null default 'upcoming' check (status in ('upcoming','live','completed')),
  prize text default '',
  description text default '',
  champion text default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.standings (
  id uuid primary key default gen_random_uuid(),
  tournament_id uuid not null references public.tournaments(id) on delete cascade,
  participant text not null,
  played int not null default 0,
  won int not null default 0,
  lost int not null default 0,
  points int not null default 0,
  rank int,
  note text default '',
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  tournament_id uuid not null references public.tournaments(id) on delete cascade,
  round text default '',
  participant_a text default '',
  participant_b text default '',
  score_a int,
  score_b int,
  winner text default '',
  status text not null default 'scheduled' check (status in ('scheduled','live','completed')),
  scheduled_at text default '',
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text default 'general',
  tags text[] not null default '{}',
  keywords text[] not null default '{}',
  source text default 'TXG Official Information',
  sort_order int not null default 0,
  helpful_count int not null default 0,
  not_helpful_count int not null default 0,
  published boolean not null default true,
  embedding vector(1536),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  name text default '',
  role text default '',
  phone text default '',
  email text default '',
  location text default '',
  is_emergency boolean not null default false,
  sort_order int not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.venue_locations (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default '',
  icon text default 'MapPin',
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.drivers (
  id uuid primary key default gen_random_uuid(),
  type text not null default 'taxi' check (type in ('taxi','scooty')),
  name text not null,
  phone text not null,
  available boolean not null default true,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.question_logs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  matched_faq_id uuid references public.faqs(id) on delete set null,
  answered boolean not null default false,
  created_at timestamptz not null default now()
);

-- updated_at triggers
create trigger trg_settings_updated before update on public.settings for each row execute function public.set_updated_at();
create trigger trg_announcements_updated before update on public.announcements for each row execute function public.set_updated_at();
create trigger trg_events_updated before update on public.events for each row execute function public.set_updated_at();
create trigger trg_schedule_updated before update on public.schedule_items for each row execute function public.set_updated_at();
create trigger trg_tournaments_updated before update on public.tournaments for each row execute function public.set_updated_at();
create trigger trg_standings_updated before update on public.standings for each row execute function public.set_updated_at();
create trigger trg_matches_updated before update on public.matches for each row execute function public.set_updated_at();
create trigger trg_faqs_updated before update on public.faqs for each row execute function public.set_updated_at();
create trigger trg_contacts_updated before update on public.contacts for each row execute function public.set_updated_at();
create trigger trg_venue_updated before update on public.venue_locations for each row execute function public.set_updated_at();
create trigger trg_drivers_updated before update on public.drivers for each row execute function public.set_updated_at();

-- Row Level Security
alter table public.settings enable row level security;
alter table public.announcements enable row level security;
alter table public.events enable row level security;
alter table public.schedule_items enable row level security;
alter table public.tournaments enable row level security;
alter table public.standings enable row level security;
alter table public.matches enable row level security;
alter table public.faqs enable row level security;
alter table public.contacts enable row level security;
alter table public.venue_locations enable row level security;
alter table public.drivers enable row level security;
alter table public.question_logs enable row level security;

create policy "read_published" on public.announcements for select using (published = true);
create policy "read_published" on public.events for select using (published = true);
create policy "read_published" on public.schedule_items for select using (published = true);
create policy "read_published" on public.faqs for select using (published = true);
create policy "read_published" on public.contacts for select using (published = true);
create policy "read_all" on public.settings for select using (true);
create policy "read_all" on public.tournaments for select using (true);
create policy "read_all" on public.standings for select using (true);
create policy "read_all" on public.matches for select using (true);
create policy "read_all" on public.venue_locations for select using (true);
create policy "read_all" on public.drivers for select using (true);

create policy "admin_all" on public.settings for all to authenticated using (true) with check (true);
create policy "admin_all" on public.announcements for all to authenticated using (true) with check (true);
create policy "admin_all" on public.events for all to authenticated using (true) with check (true);
create policy "admin_all" on public.schedule_items for all to authenticated using (true) with check (true);
create policy "admin_all" on public.tournaments for all to authenticated using (true) with check (true);
create policy "admin_all" on public.standings for all to authenticated using (true) with check (true);
create policy "admin_all" on public.matches for all to authenticated using (true) with check (true);
create policy "admin_all" on public.faqs for all to authenticated using (true) with check (true);
create policy "admin_all" on public.contacts for all to authenticated using (true) with check (true);
create policy "admin_all" on public.venue_locations for all to authenticated using (true) with check (true);
create policy "admin_all" on public.drivers for all to authenticated using (true) with check (true);
create policy "admin_all" on public.question_logs for all to authenticated using (true) with check (true);
create policy "anon_insert_questions" on public.question_logs for insert to anon with check (true);

-- Indexes
create index if not exists idx_events_sort on public.events (sort_order);
create index if not exists idx_schedule_sort on public.schedule_items (day_label, sort_order);
create index if not exists idx_standings_tournament on public.standings (tournament_id, sort_order);
create index if not exists idx_matches_tournament on public.matches (tournament_id, sort_order);
create index if not exists idx_faqs_published on public.faqs (published);
create index if not exists idx_announcements_pinned on public.announcements (pinned, created_at desc);

-- Realtime (live standings / updates on attendees' phones)
alter publication supabase_realtime add table public.announcements;
alter publication supabase_realtime add table public.tournaments;
alter publication supabase_realtime add table public.standings;
alter publication supabase_realtime add table public.matches;

-- Admin user (change the password immediately). Creates admin@ki-khobor.com.
-- do $$
-- declare new_id uuid := gen_random_uuid();
-- begin
--   insert into auth.users (instance_id,id,aud,role,email,encrypted_password,email_confirmed_at,created_at,updated_at,raw_app_meta_data,raw_user_meta_data,confirmation_token,recovery_token,email_change_token_new,email_change)
--   values ('00000000-0000-0000-0000-000000000000',new_id,'authenticated','authenticated','admin@ki-khobor.com',crypt('TxgAdmin@2026',gen_salt('bf')),now(),now(),now(),'{"provider":"email","providers":["email"]}'::jsonb,'{}'::jsonb,'','','','');
--   insert into auth.identities (id,user_id,provider_id,identity_data,provider,last_sign_in_at,created_at,updated_at)
--   values (gen_random_uuid(),new_id,new_id::text,jsonb_build_object('sub',new_id::text,'email','admin@ki-khobor.com','email_verified',true),'email',now(),now(),now());
-- end $$;
