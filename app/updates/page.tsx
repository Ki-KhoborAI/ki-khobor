import { SiteShell } from "@/components/SiteShell";
import { RealtimeRefresh } from "@/components/RealtimeRefresh";
import { getAnnouncements } from "@/lib/queries";
import { timeAgo } from "@/lib/format";
import { Pin } from "lucide-react";

export const dynamic = "force-dynamic";

const CATEGORY: Record<string, string> = {
  general: "General",
  game: "Games",
  schedule: "Schedule",
  alert: "Alert",
};

export default async function UpdatesPage() {
  const announcements = await getAnnouncements(50);

  return (
    <SiteShell title="Updates" back>
      <RealtimeRefresh tables={["announcements"]} />
      <div className="md:mx-auto md:max-w-3xl">
        <h2 className="text-base font-semibold md:text-3xl">Live Updates</h2>
        <p className="mt-1 text-[8px] leading-4 text-zinc-400 md:mt-2 md:text-sm">
          Announcements and results as they happen.
        </p>

        {announcements.length === 0 ? (
          <p className="mt-6 text-center text-[10px] text-zinc-600 md:text-sm">
            No updates yet. Check back soon.
          </p>
        ) : (
          <div className="mt-4 flex flex-col gap-2 md:mt-6 md:gap-3">
            {announcements.map((a) => (
              <article
                key={a.id}
                className={`rounded-[3px] bg-[#111111] px-3 py-3 md:rounded-lg md:px-5 md:py-4 ${
                  a.category === "alert" ? "border border-zinc-500" : ""
                }`}
              >
                <div className="flex items-center gap-1.5">
                  {a.pinned && <Pin className="h-2.5 w-2.5 text-white md:h-3.5 md:w-3.5" />}
                  <span className="text-[7px] font-semibold uppercase tracking-wide text-zinc-500 md:text-xs">
                    {CATEGORY[a.category] ?? "Update"}
                  </span>
                  <span className="text-[7px] text-zinc-600 md:text-xs">
                    · {timeAgo(a.created_at)}
                  </span>
                </div>
                <h3 className="mt-1 text-[11px] font-semibold leading-4 md:text-lg">{a.title}</h3>
                {a.body && (
                  <p className="mt-1 whitespace-pre-line text-[8px] leading-4 text-zinc-300 md:mt-2 md:text-sm md:leading-relaxed">
                    {a.body}
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </SiteShell>
  );
}
