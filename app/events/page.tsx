import { SiteShell } from "@/components/SiteShell";
import { getEvents } from "@/lib/queries";
import { getIcon } from "@/lib/icons";
import { isValidUrl } from "@/lib/format";
import { MapPin, Ticket, Trophy } from "lucide-react";

export const dynamic = "force-dynamic";

const CATEGORY_LABEL: Record<string, string> = {
  competition: "Competition",
  showcase: "Showcase",
  panel: "Panel",
  activity: "Activity",
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <SiteShell title="Events" back>
      <h2 className="text-base font-semibold md:text-3xl">Events &amp; Competitions</h2>
      <p className="mt-1 text-[8px] leading-4 text-zinc-400 md:mt-2 md:text-sm">
        Tournaments, showcases and activities at TXG 2026.
      </p>

      {events.length === 0 ? (
        <p className="mt-6 text-center text-[10px] text-zinc-600 md:text-sm">
          Events will be listed here soon.
        </p>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-2 md:mt-6 md:grid-cols-2 md:gap-4">
          {events.map((event) => {
            const Icon = getIcon(event.icon);
            return (
              <article
                key={event.id}
                className="accent-ring flex flex-col rounded-lg bg-[var(--surface)] px-3 py-3 md:rounded-xl md:px-5 md:py-5"
              >
                <div className="flex items-start gap-2.5 md:gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[2px] bg-[#1c1c1c] md:h-11 md:w-11 md:rounded-lg">
                    <Icon className="h-4 w-4 stroke-[1.5] md:h-5 md:w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="rounded-full bg-[#1c1c1c] px-1.5 py-0.5 text-[6px] font-semibold uppercase tracking-wide text-zinc-400 md:text-[10px]">
                        {CATEGORY_LABEL[event.category] ?? event.category}
                      </span>
                      {event.format && (
                        <span className="text-[7px] text-zinc-500 md:text-xs">{event.format}</span>
                      )}
                    </div>
                    <h3 className="mt-1 text-[11px] font-semibold leading-4 md:text-lg md:leading-tight">
                      {event.title}
                    </h3>
                  </div>
                </div>

                <p className="mt-2 text-[8px] leading-4 text-zinc-300 md:text-sm md:leading-relaxed">
                  {event.description}
                </p>

                {(event.prize || event.location) && (
                  <div className="mt-2 flex flex-col gap-1 md:mt-3 md:gap-1.5">
                    {event.prize && event.prize !== "—" && (
                      <div className="flex items-center gap-1.5 text-[8px] text-zinc-300 md:text-sm">
                        <Trophy className="h-3 w-3 shrink-0 md:h-4 md:w-4" />
                        <span>{event.prize}</span>
                      </div>
                    )}
                    {event.location && (
                      <div className="flex items-center gap-1.5 text-[8px] text-zinc-300 md:text-sm">
                        <MapPin className="h-3 w-3 shrink-0 md:h-4 md:w-4" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                )}

                {isValidUrl(event.registration_url) && (
                  <a
                    href={event.registration_url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary mt-3 flex h-8 items-center justify-center gap-1.5 rounded-md text-[8px] font-semibold md:mt-auto md:h-10 md:text-sm"
                  >
                    <Ticket className="h-3 w-3 md:h-4 md:w-4" />
                    Register
                  </a>
                )}
              </article>
            );
          })}
        </div>
      )}
    </SiteShell>
  );
}
