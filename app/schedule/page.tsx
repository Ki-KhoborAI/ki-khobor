import { SiteShell } from "@/components/SiteShell";
import { getSchedule } from "@/lib/queries";
import { MapPin } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SchedulePage() {
  const days = await getSchedule();

  return (
    <SiteShell title="Schedule" back>
      <h2 className="text-base font-semibold md:text-3xl">Event Agenda</h2>
      <p className="mt-1 text-[8px] leading-4 text-zinc-400 md:mt-2 md:text-sm">
        The full TXG 2026 programme across both days.
      </p>

      {days.length === 0 ? (
        <p className="mt-6 text-center text-[10px] text-zinc-600 md:text-sm">
          The schedule will be published soon.
        </p>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-5 md:mt-8 md:grid-cols-2 md:gap-8">
          {days.map((group) => (
            <div key={group.day}>
              <h3 className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-zinc-300 md:mb-4 md:text-sm">
                {group.day}
              </h3>
              <div className="relative pl-4">
                <div className="absolute bottom-1 left-[2px] top-1 w-px bg-zinc-700" />
                <div className="flex flex-col gap-3 md:gap-4">
                  {group.items.map((item) => (
                    <div key={item.id} className="relative">
                      <div className="absolute -left-[18px] top-4 h-2 w-2 rounded-full border border-zinc-400 bg-black" />
                      <article className="rounded-[3px] bg-[#111111] px-3 py-3 md:rounded-lg md:px-5 md:py-4">
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="text-[9px] font-semibold leading-4 md:text-base">
                            {item.title}
                          </h4>
                          <span className="shrink-0 text-[8px] font-semibold text-white md:text-sm">
                            {item.start_time}
                            {item.end_time ? ` – ${item.end_time}` : ""}
                          </span>
                        </div>
                        {item.location && (
                          <div className="mt-1.5 flex items-center gap-1.5 text-[7px] text-zinc-300 md:text-xs">
                            <MapPin className="h-3 w-3 shrink-0 md:h-3.5 md:w-3.5" />
                            <span>{item.location}</span>
                          </div>
                        )}
                        {item.description && (
                          <p className="mt-2 text-[8px] leading-4 text-zinc-300 md:text-sm">
                            {item.description}
                          </p>
                        )}
                      </article>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </SiteShell>
  );
}
