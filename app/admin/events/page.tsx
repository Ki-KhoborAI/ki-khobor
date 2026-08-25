import { createClient } from "@/lib/supabase/server";
import { submitForm } from "@/app/admin/actions";
import {
  Field,
  TextInput,
  TextArea,
  NumberInput,
  Select,
  Checkbox,
  SaveButton,
} from "@/components/admin/Form";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { ICON_NAMES } from "@/lib/icons";
import type { EventItem } from "@/lib/database.types";

export const dynamic = "force-dynamic";

const REDIRECT = "/admin/events";
const CATEGORIES = ["competition", "showcase", "panel", "activity"];

function EventForm({ row }: { row?: EventItem }) {
  return (
    <form action={submitForm} className="space-y-3">
      <input type="hidden" name="__table" value="events" />
      <input type="hidden" name="__redirect" value={REDIRECT} />
      {row && <input type="hidden" name="__id" value={row.id} />}

      <Field label="Title">
        <TextInput name="title" defaultValue={row?.title ?? ""} required />
      </Field>
      <Field label="Description">
        <TextArea name="description" defaultValue={row?.description ?? ""} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Category">
          <Select name="category" defaultValue={row?.category ?? "competition"}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Icon">
          <Select name="icon" defaultValue={row?.icon ?? "Gamepad2"}>
            {ICON_NAMES.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Prize">
          <TextInput name="prize" defaultValue={row?.prize ?? ""} />
        </Field>
        <Field label="Format">
          <TextInput name="format" defaultValue={row?.format ?? ""} />
        </Field>
        <Field label="Location">
          <TextInput name="location" defaultValue={row?.location ?? ""} />
        </Field>
        <Field label="Sort order">
          <NumberInput name="sort_order" defaultValue={row?.sort_order ?? 0} />
        </Field>
      </div>
      <Field label="Registration URL" hint="Leave blank to hide the Register button">
        <TextInput name="registration_url" defaultValue={row?.registration_url ?? ""} placeholder="https://…" />
      </Field>
      <Checkbox name="published" label="Published" defaultChecked={row?.published ?? true} />
      <div>
        <SaveButton>{row ? "Save changes" : "Add event"}</SaveButton>
      </div>
    </form>
  );
}

export default async function AdminEvents() {
  const supabase = await createClient();
  const { data } = await supabase.from("events").select("*").order("sort_order");
  const rows = data ?? [];

  return (
    <div>
      <h1 className="text-lg font-semibold">Events</h1>
      <p className="mt-1 text-xs text-zinc-500">Competitions, showcases, panels and activities.</p>

      <details className="mt-4 rounded border border-zinc-800 bg-zinc-950 p-4">
        <summary className="cursor-pointer text-sm font-semibold">+ Add an event</summary>
        <div className="mt-4">
          <EventForm />
        </div>
      </details>

      <div className="mt-4 space-y-2">
        {rows.map((row) => (
          <div key={row.id} className="rounded border border-zinc-800 bg-zinc-950 p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-wide text-zinc-500">
                  {row.category}
                  {!row.published && <span className="text-amber-400"> · hidden</span>}
                </div>
                <div className="mt-0.5 truncate text-sm font-medium">{row.title}</div>
              </div>
              <DeleteButton table="events" id={row.id} redirect={REDIRECT} />
            </div>
            <details className="mt-2">
              <summary className="cursor-pointer text-xs text-zinc-400">Edit</summary>
              <div className="mt-3">
                <EventForm row={row} />
              </div>
            </details>
          </div>
        ))}
        {rows.length === 0 && <p className="text-xs text-zinc-600">No events yet.</p>}
      </div>
    </div>
  );
}
