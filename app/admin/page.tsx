import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function count(table: string) {
  const supabase = await createClient();
  const { count } = await supabase
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .from(table as any)
    .select("*", { count: "exact", head: true });
  return count ?? 0;
}

const CARDS = [
  { table: "announcements", label: "Updates", href: "/admin/announcements" },
  { table: "tournaments", label: "Tournaments", href: "/admin/tournaments" },
  { table: "events", label: "Events", href: "/admin/events" },
  { table: "schedule_items", label: "Schedule items", href: "/admin/schedule" },
  { table: "faqs", label: "FAQs", href: "/admin/faqs" },
  { table: "contacts", label: "Contacts", href: "/admin/contacts" },
  { table: "drivers", label: "Drivers", href: "/admin/drivers" },
  { table: "venue_locations", label: "Venue spots", href: "/admin/venue" },
];

export default async function AdminDashboard() {
  const counts = await Promise.all(CARDS.map((c) => count(c.table)));

  const supabase = await createClient();
  const { data: recentQuestions } = await supabase
    .from("question_logs")
    .select("id, question, answered, created_at")
    .order("created_at", { ascending: false })
    .limit(6);

  return (
    <div>
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <p className="mt-1 text-xs text-zinc-500">
        Manage everything attendees see in the TXG help desk.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {CARDS.map((c, i) => (
          <Link
            key={c.table}
            href={c.href}
            className="rounded border border-zinc-800 bg-zinc-950 p-3 transition-colors hover:border-zinc-600"
          >
            <div className="text-2xl font-semibold">{counts[i]}</div>
            <div className="mt-0.5 text-xs text-zinc-400">{c.label}</div>
          </Link>
        ))}
      </div>

      <div className="mt-6 rounded border border-zinc-800 bg-zinc-950 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Recent questions asked</h2>
          <Link href="/admin/questions" className="text-xs text-zinc-400 hover:text-white">
            View all
          </Link>
        </div>
        {recentQuestions && recentQuestions.length > 0 ? (
          <ul className="mt-3 space-y-2">
            {recentQuestions.map((q) => (
              <li key={q.id} className="flex items-start gap-2 text-xs">
                <span
                  className={`mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                    q.answered ? "bg-emerald-400" : "bg-amber-400"
                  }`}
                  title={q.answered ? "Answered" : "No confident answer"}
                />
                <span className="text-zinc-300">{q.question}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-xs text-zinc-600">No questions asked yet.</p>
        )}
        <p className="mt-3 text-[10px] text-zinc-600">
          Amber dots are questions the knowledge base couldn&apos;t answer confidently — good
          candidates for a new FAQ.
        </p>
      </div>
    </div>
  );
}
