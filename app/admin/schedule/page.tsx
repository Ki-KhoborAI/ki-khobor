import { createClient } from "@/lib/supabase/server";
import { submitForm } from "@/app/admin/actions";
import {
  Field,
  TextInput,
  TextArea,
  NumberInput,
  Checkbox,
  SaveButton,
} from "@/components/admin/Form";
import { DeleteButton } from "@/components/admin/DeleteButton";
import type { ScheduleItem } from "@/lib/database.types";

export const dynamic = "force-dynamic";

const REDIRECT = "/admin/schedule";

function ScheduleForm({ row }: { row?: ScheduleItem }) {
  return (
    <form action={submitForm} className="space-y-3">
      <input type="hidden" name="__table" value="schedule_items" />
      <input type="hidden" name="__redirect" value={REDIRECT} />
      {row && <input type="hidden" name="__id" value={row.id} />}

      <div className="grid grid-cols-2 gap-3">
        <Field label="Day label" hint="e.g. Day 1 · Aug 28">
          <TextInput name="day_label" defaultValue={row?.day_label ?? "Day 1 · Aug 28"} required />
        </Field>
        <Field label="Date">
          <TextInput type="date" name="event_date" defaultValue={row?.event_date ?? ""} />
        </Field>
        <Field label="Start time" hint="e.g. 10:00 AM">
          <TextInput name="start_time" defaultValue={row?.start_time ?? ""} />
        </Field>
        <Field label="End time">
          <TextInput name="end_time" defaultValue={row?.end_time ?? ""} />
        </Field>
      </div>
      <Field label="Title">
        <TextInput name="title" defaultValue={row?.title ?? ""} required />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Location">
          <TextInput name="location" defaultValue={row?.location ?? ""} />
        </Field>
        <Field label="Sort order">
          <NumberInput name="sort_order" defaultValue={row?.sort_order ?? 0} />
        </Field>
      </div>
      <Field label="Description">
        <TextArea name="description" defaultValue={row?.description ?? ""} />
      </Field>
      <Checkbox name="published" label="Published" defaultChecked={row?.published ?? true} />
      <div>
        <SaveButton>{row ? "Save changes" : "Add item"}</SaveButton>
      </div>
    </form>
  );
}

export default async function AdminSchedule() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("schedule_items")
    .select("*")
    .order("day_label")
    .order("sort_order");
  const rows = data ?? [];

  return (
    <div>
      <h1 className="text-lg font-semibold">Schedule</h1>
      <p className="mt-1 text-xs text-zinc-500">The agenda shown on the Schedule screen.</p>

      <details className="mt-4 rounded border border-zinc-800 bg-zinc-950 p-4">
        <summary className="cursor-pointer text-sm font-semibold">+ Add a schedule item</summary>
        <div className="mt-4">
          <ScheduleForm />
        </div>
      </details>

      <div className="mt-4 space-y-2">
        {rows.map((row) => (
          <div key={row.id} className="rounded border border-zinc-800 bg-zinc-950 p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-wide text-zinc-500">
                  {row.day_label} · {row.start_time}
                  {!row.published && <span className="text-amber-400"> · hidden</span>}
                </div>
                <div className="mt-0.5 truncate text-sm font-medium">{row.title}</div>
              </div>
              <DeleteButton table="schedule_items" id={row.id} redirect={REDIRECT} />
            </div>
            <details className="mt-2">
              <summary className="cursor-pointer text-xs text-zinc-400">Edit</summary>
              <div className="mt-3">
                <ScheduleForm row={row} />
              </div>
            </details>
          </div>
        ))}
        {rows.length === 0 && <p className="text-xs text-zinc-600">No schedule items yet.</p>}
      </div>
    </div>
  );
}
