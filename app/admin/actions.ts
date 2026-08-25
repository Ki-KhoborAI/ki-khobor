"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const ALLOWED_TABLES = new Set([
  "announcements",
  "events",
  "schedule_items",
  "tournaments",
  "standings",
  "matches",
  "faqs",
  "contacts",
  "venue_locations",
  "drivers",
]);

const BOOL_FIELDS = new Set(["published", "pinned", "is_emergency", "available"]);
const INT_FIELDS = new Set([
  "sort_order",
  "played",
  "won",
  "lost",
  "points",
  "rank",
  "score_a",
  "score_b",
]);
const ARRAY_FIELDS = new Set(["tags", "keywords"]);

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return supabase;
}

function buildPayload(formData: FormData): Record<string, unknown> {
  const payload: Record<string, unknown> = {};
  const keys = new Set<string>();
  for (const key of formData.keys()) {
    if (!key.startsWith("__")) keys.add(key);
  }

  for (const key of keys) {
    if (BOOL_FIELDS.has(key)) {
      const all = formData.getAll(key).map(String);
      payload[key] = all[all.length - 1] === "true";
    } else if (INT_FIELDS.has(key)) {
      const raw = String(formData.get(key) ?? "").trim();
      payload[key] = raw === "" ? null : Number(raw);
    } else if (ARRAY_FIELDS.has(key)) {
      const raw = String(formData.get(key) ?? "");
      payload[key] = raw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    } else {
      payload[key] = String(formData.get(key) ?? "");
    }
  }
  return payload;
}

export async function submitForm(formData: FormData) {
  const table = String(formData.get("__table") ?? "");
  const id = String(formData.get("__id") ?? "");
  const redirectTo = String(formData.get("__redirect") ?? "/admin");

  if (!ALLOWED_TABLES.has(table)) throw new Error("Invalid table");
  const supabase = await requireUser();
  const payload = buildPayload(formData);

  if (id) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await supabase.from(table as any).update(payload as any).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await supabase.from(table as any).insert(payload as any);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/", "layout");
  redirect(redirectTo);
}

export async function deleteRow(formData: FormData) {
  const table = String(formData.get("__table") ?? "");
  const id = String(formData.get("__id") ?? "");
  const redirectTo = String(formData.get("__redirect") ?? "/admin");

  if (!ALLOWED_TABLES.has(table)) throw new Error("Invalid table");
  const supabase = await requireUser();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await supabase.from(table as any).delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/", "layout");
  redirect(redirectTo);
}

export async function saveSite(formData: FormData) {
  const supabase = await requireUser();

  const value = {
    eventName: String(formData.get("eventName") ?? ""),
    eventFullName: String(formData.get("eventFullName") ?? ""),
    tagline: String(formData.get("tagline") ?? ""),
    brand: String(formData.get("brand") ?? ""),
    poweredBy: String(formData.get("poweredBy") ?? ""),
    dates: String(formData.get("dates") ?? ""),
    venueName: String(formData.get("venueName") ?? ""),
    venueAddress: String(formData.get("venueAddress") ?? ""),
    venueMapQuery: String(formData.get("venueMapQuery") ?? ""),
    registrationUrl: String(formData.get("registrationUrl") ?? ""),
    organizer: String(formData.get("organizer") ?? ""),
  };

  const { error } = await supabase
    .from("settings")
    .upsert({ key: "site", value }, { onConflict: "key" });
  if (error) throw new Error(error.message);

  revalidatePath("/", "layout");
  redirect("/admin/settings");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
