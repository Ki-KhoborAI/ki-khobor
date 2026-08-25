import { createClient } from "@/lib/supabase/server";
import { timeAgo } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminQuestions() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("question_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);
  const rows = data ?? [];

  const unanswered = rows.filter((r) => !r.answered);

  return (
    <div>
      <h1 className="text-lg font-semibold">Questions Asked</h1>
      <p className="mt-1 text-xs text-zinc-500">
        What attendees ask Ki-Khobor. Amber = no confident answer — add a FAQ to cover it.
      </p>

      {unanswered.length > 0 && (
        <div className="mt-4 rounded border border-amber-500/30 bg-amber-500/5 p-3">
          <p className="text-xs font-semibold text-amber-300">
            {unanswered.length} unanswered question{unanswered.length === 1 ? "" : "s"}
          </p>
          <ul className="mt-2 space-y-1">
            {unanswered.slice(0, 10).map((q) => (
              <li key={q.id} className="text-xs text-amber-100/80">
                {q.question}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 overflow-hidden rounded border border-zinc-800">
        {rows.map((q, i) => (
          <div
            key={q.id}
            className={`flex items-start gap-2 px-3 py-2 ${
              i !== rows.length - 1 ? "border-b border-zinc-900" : ""
            }`}
          >
            <span
              className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${
                q.answered ? "bg-emerald-400" : "bg-amber-400"
              }`}
            />
            <span className="flex-1 text-xs text-zinc-300">{q.question}</span>
            <span className="shrink-0 text-[10px] text-zinc-600">{timeAgo(q.created_at)}</span>
          </div>
        ))}
        {rows.length === 0 && (
          <p className="px-3 py-4 text-xs text-zinc-600">No questions logged yet.</p>
        )}
      </div>
    </div>
  );
}
