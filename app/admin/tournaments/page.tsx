import { createClient } from "@/lib/supabase/server";
import { submitForm } from "@/app/admin/actions";
import {
  Field,
  TextInput,
  TextArea,
  NumberInput,
  Select,
  SaveButton,
} from "@/components/admin/Form";
import { DeleteButton } from "@/components/admin/DeleteButton";
import type { Standing, Tournament } from "@/lib/database.types";

export const dynamic = "force-dynamic";

const REDIRECT = "/admin/tournaments";
const FORMATS = ["bracket", "round_robin", "leaderboard"];
const STATUSES = ["upcoming", "live", "completed"];

function TournamentForm({ row }: { row?: Tournament }) {
  return (
    <form action={submitForm} className="space-y-3">
      <input type="hidden" name="__table" value="tournaments" />
      <input type="hidden" name="__redirect" value={REDIRECT} />
      {row && <input type="hidden" name="__id" value={row.id} />}

      <div className="grid grid-cols-2 gap-3">
        <Field label="Name">
          <TextInput name="name" defaultValue={row?.name ?? ""} required />
        </Field>
        <Field label="Game">
          <TextInput name="game" defaultValue={row?.game ?? ""} />
        </Field>
        <Field label="Format">
          <Select name="format" defaultValue={row?.format ?? "leaderboard"}>
            {FORMATS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Status">
          <Select name="status" defaultValue={row?.status ?? "upcoming"}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Prize">
          <TextInput name="prize" defaultValue={row?.prize ?? ""} />
        </Field>
        <Field label="Champion (when completed)">
          <TextInput name="champion" defaultValue={row?.champion ?? ""} />
        </Field>
      </div>
      <Field label="Description">
        <TextArea name="description" defaultValue={row?.description ?? ""} />
      </Field>
      <Field label="Sort order">
        <NumberInput name="sort_order" defaultValue={row?.sort_order ?? 0} />
      </Field>
      <SaveButton>{row ? "Save tournament" : "Add tournament"}</SaveButton>
    </form>
  );
}

function StandingForm({
  tournamentId,
  row,
}: {
  tournamentId: string;
  row?: Standing;
}) {
  return (
    <form action={submitForm} className="flex flex-wrap items-end gap-2">
      <input type="hidden" name="__table" value="standings" />
      <input type="hidden" name="__redirect" value={REDIRECT} />
      <input type="hidden" name="tournament_id" value={tournamentId} />
      {row && <input type="hidden" name="__id" value={row.id} />}

      <div className="min-w-[140px] flex-1">
        <TextInput name="participant" defaultValue={row?.participant ?? ""} placeholder="Team / player" required />
      </div>
      <label className="w-12 text-center">
        <span className="block text-[9px] text-zinc-500">Rank</span>
        <NumberInput name="rank" defaultValue={row?.rank ?? ""} />
      </label>
      <label className="w-11 text-center">
        <span className="block text-[9px] text-zinc-500">P</span>
        <NumberInput name="played" defaultValue={row?.played ?? 0} />
      </label>
      <label className="w-11 text-center">
        <span className="block text-[9px] text-zinc-500">W</span>
        <NumberInput name="won" defaultValue={row?.won ?? 0} />
      </label>
      <label className="w-11 text-center">
        <span className="block text-[9px] text-zinc-500">L</span>
        <NumberInput name="lost" defaultValue={row?.lost ?? 0} />
      </label>
      <label className="w-12 text-center">
        <span className="block text-[9px] text-zinc-500">Pts</span>
        <NumberInput name="points" defaultValue={row?.points ?? 0} />
      </label>
      <SaveButton>{row ? "Save" : "Add"}</SaveButton>
      {row && <DeleteButton table="standings" id={row.id} redirect={REDIRECT} />}
    </form>
  );
}

export default async function AdminTournaments() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("tournaments")
    .select("*, standings(*)")
    .order("sort_order", { ascending: true });

  const tournaments = (data ?? []) as (Tournament & { standings: Standing[] })[];

  return (
    <div>
      <h1 className="text-lg font-semibold">Games &amp; Standings</h1>
      <p className="mt-1 text-xs text-zinc-500">
        Update tournament status, standings and winners live. Changes appear instantly on
        attendees&apos; phones.
      </p>

      <details className="mt-4 rounded border border-zinc-800 bg-zinc-950 p-4">
        <summary className="cursor-pointer text-sm font-semibold">+ Add a tournament</summary>
        <div className="mt-4">
          <TournamentForm />
        </div>
      </details>

      <div className="mt-4 space-y-3">
        {tournaments.map((t) => {
          const standings = [...(t.standings ?? [])].sort(
            (a, b) => (a.rank ?? 999) - (b.rank ?? 999) || b.points - a.points
          );
          return (
            <div key={t.id} className="rounded border border-zinc-800 bg-zinc-950 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-semibold">{t.name}</h2>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[9px] uppercase ${
                        t.status === "live"
                          ? "border-white text-white"
                          : t.status === "completed"
                          ? "border-emerald-500/50 text-emerald-300"
                          : "border-zinc-700 text-zinc-400"
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>
                  {t.game && <p className="mt-0.5 text-xs text-zinc-500">{t.game}</p>}
                </div>
                <DeleteButton table="tournaments" id={t.id} redirect={REDIRECT} />
              </div>

              {/* Standings editor */}
              <div className="mt-3 space-y-2 border-t border-zinc-800 pt-3">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                  Standings
                </p>
                {standings.map((s) => (
                  <StandingForm key={s.id} tournamentId={t.id} row={s} />
                ))}
                <div className="rounded border border-dashed border-zinc-800 p-2">
                  <StandingForm tournamentId={t.id} />
                </div>
              </div>

              <details className="mt-3 border-t border-zinc-800 pt-3">
                <summary className="cursor-pointer text-xs text-zinc-400">
                  Edit tournament details
                </summary>
                <div className="mt-3">
                  <TournamentForm row={t} />
                </div>
              </details>
            </div>
          );
        })}
        {tournaments.length === 0 && (
          <p className="text-xs text-zinc-600">No tournaments yet.</p>
        )}
      </div>
    </div>
  );
}
