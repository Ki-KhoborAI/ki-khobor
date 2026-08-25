import { createClient } from "@/lib/supabase/server";
import { SITE_DEFAULTS, type SiteConfig } from "@/lib/site";
import type {
  Announcement,
  Contact,
  Driver,
  EventItem,
  Faq,
  ScheduleItem,
  Standing,
  Tournament,
} from "@/lib/database.types";

/**
 * Server-side data access. Every function reads through the request-scoped
 * Supabase client, so RLS applies (public sees published rows only).
 * All public pages are dynamic so live edits show up immediately.
 */

export async function getSiteConfig(): Promise<SiteConfig> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "site")
    .maybeSingle();

  const overrides = (data?.value ?? {}) as Partial<SiteConfig>;
  return { ...SITE_DEFAULTS, ...overrides };
}

export async function getAnnouncements(limit = 20): Promise<Announcement[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("announcements")
    .select("*")
    .eq("published", true)
    .order("pinned", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(limit);
  return data ?? [];
}

export async function getEvents(): Promise<EventItem[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("events")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  return data ?? [];
}

export type ScheduleByDay = { day: string; items: ScheduleItem[] }[];

export async function getSchedule(): Promise<ScheduleByDay> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("schedule_items")
    .select("*")
    .eq("published", true)
    .order("day_label", { ascending: true })
    .order("sort_order", { ascending: true });

  const items = data ?? [];
  const groups = new Map<string, ScheduleItem[]>();
  for (const item of items) {
    const key = item.day_label || "Schedule";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(item);
  }
  return Array.from(groups.entries()).map(([day, list]) => ({
    day,
    items: list,
  }));
}

export type TournamentWithStandings = Tournament & { standings: Standing[] };

export async function getTournaments(): Promise<TournamentWithStandings[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("tournaments")
    .select("*, standings(*)")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  return (data ?? []).map((t) => ({
    ...t,
    standings: [...(t.standings ?? [])].sort(
      (a, b) =>
        (a.rank ?? 999) - (b.rank ?? 999) ||
        b.points - a.points ||
        a.sort_order - b.sort_order
    ),
  })) as TournamentWithStandings[];
}

export async function getContacts(): Promise<Contact[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("contacts")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export async function getVenueLocations() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("venue_locations")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export async function getDrivers(type: "taxi" | "scooty"): Promise<Driver[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("drivers")
    .select("*")
    .eq("type", type)
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export async function getDriverCounts(): Promise<{ taxi: number; scooty: number }> {
  const supabase = await createClient();
  const [{ count: taxi }, { count: scooty }] = await Promise.all([
    supabase
      .from("drivers")
      .select("*", { count: "exact", head: true })
      .eq("type", "taxi")
      .eq("available", true),
    supabase
      .from("drivers")
      .select("*", { count: "exact", head: true })
      .eq("type", "scooty")
      .eq("available", true),
  ]);
  return { taxi: taxi ?? 0, scooty: scooty ?? 0 };
}

export async function getFaqs(): Promise<Faq[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("faqs")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  return data ?? [];
}
