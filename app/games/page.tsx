import { SiteShell } from "@/components/SiteShell";
import { RealtimeRefresh } from "@/components/RealtimeRefresh";
import { getTournaments } from "@/lib/queries";
import { Trophy } from "lucide-react";

export const dynamic = "force-dynamic";

const STATUS: Record<string, { label: string; cls: string; dot?: boolean }> = {
  live: { label: "LIVE", cls: "border-[#ff3b3b] text-[#ff3b3b]", dot: true },
  upcoming: { label: "Upcoming", cls: "border-zinc-700 text-zinc-400" },
  completed: { label: "Completed", cls: "border-zinc-600 text-zinc-300" },
};

const ORDER: Record<string, number> = { live: 0, upcoming: 1, completed: 2 };

export default async function GamesPage() {
  const tournaments = await getTournaments();
  const sorted = [...tournaments].sort(
    (a, b) => (ORDER[a.status] ?? 9) - (ORDER[b.status] ?? 9) || a.sort_order - b.sort_order
  );

  return (
    <SiteShell title="Games &amp; Standings" back>
      <RealtimeRefresh tables={["tournaments", "standings", "matches"]} />
      <h2 className="text-base font-semibold md:text-3xl">Live Results</h2>
      <p className="mt-1 text-[8px] leading-4 text-zinc-400 md:mt-2 md:text-sm">
        Standings and winners update live during the event.
      </p>

      {sorted.length === 0 && (
        <p className="mt-6 text-center text-[10px] text-zinc-600 md:text-sm">
          Tournaments will appear here soon.
        </p>
      )}

      <div className="mt-4 grid grid-cols-1 gap-2 md:mt-6 md:grid-cols-2 md:gap-4">
        {sorted.map((t) => {
          const status = STATUS[t.status] ?? STATUS.upcoming;
          return (
            <article
              key={t.id}
              className="accent-ring rounded-lg bg-[var(--surface)] px-3 py-3 md:rounded-xl md:px-5 md:py-5"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="truncate text-[11px] font-semibold md:text-lg">{t.name}</h3>
                  {t.game && (
                    <p className="mt-0.5 truncate text-[8px] text-zinc-500 md:text-sm">{t.game}</p>
                  )}
                </div>
                <span
                  className={`flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[7px] font-semibold uppercase tracking-wide md:text-[10px] ${status.cls}`}
                >
                  {status.dot && (
                    <span className="h-1 w-1 animate-pulse rounded-full bg-current md:h-1.5 md:w-1.5" />
                  )}
                  {status.label}
                </span>
              </div>

              {t.prize && <p className="mt-1.5 text-[8px] text-zinc-400 md:text-sm">🏆 {t.prize}</p>}

              {t.status === "completed" && t.champion && (
                <div className="mt-2 flex items-center gap-1.5 rounded-[2px] border border-zinc-700 bg-[#161616] px-2 py-1.5 md:px-3 md:py-2">
                  <Trophy className="h-3 w-3 shrink-0 text-white md:h-4 md:w-4" />
                  <span className="text-[9px] font-semibold md:text-sm">Champion · {t.champion}</span>
                </div>
              )}

              {t.standings.length > 0 ? (
                <div className="mt-2.5 overflow-hidden rounded-[2px] border border-zinc-800 md:mt-4 md:rounded-md">
                  <div className="grid grid-cols-[16px_1fr_20px_20px_20px_24px] items-center gap-1 border-b border-zinc-800 bg-[#161616] px-2 py-1 text-[7px] font-semibold uppercase tracking-wide text-zinc-500 md:grid-cols-[28px_1fr_36px_36px_36px_44px] md:px-3 md:py-2 md:text-[11px]">
                    <span>#</span>
                    <span>Team / Player</span>
                    <span className="text-center">P</span>
                    <span className="text-center">W</span>
                    <span className="text-center">L</span>
                    <span className="text-center">Pts</span>
                  </div>
                  {t.standings.map((s, i) => (
                    <div
                      key={s.id}
                      className={`grid grid-cols-[16px_1fr_20px_20px_20px_24px] items-center gap-1 px-2 py-1.5 text-[8px] md:grid-cols-[28px_1fr_36px_36px_36px_44px] md:px-3 md:py-2.5 md:text-sm ${
                        i !== t.standings.length - 1 ? "border-b border-zinc-900" : ""
                      }`}
                    >
                      <span className="font-semibold text-zinc-400">{s.rank ?? i + 1}</span>
                      <span className="truncate">{s.participant}</span>
                      <span className="text-center text-zinc-400">{s.played}</span>
                      <span className="text-center text-zinc-400">{s.won}</span>
                      <span className="text-center text-zinc-400">{s.lost}</span>
                      <span className="text-center font-semibold">{s.points}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-2.5 text-[8px] text-zinc-600 md:mt-4 md:text-sm">
                  Standings will appear once matches begin.
                </p>
              )}
            </article>
          );
        })}
      </div>
    </SiteShell>
  );
}
