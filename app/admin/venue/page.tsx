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
import { ICON_NAMES } from "@/lib/icons";
import type { VenueLocation } from "@/lib/database.types";

export const dynamic = "force-dynamic";

const REDIRECT = "/admin/venue";

function VenueForm({ row }: { row?: VenueLocation }) {
  return (
    <form action={submitForm} className="space-y-3">
      <input type="hidden" name="__table" value="venue_locations" />
      <input type="hidden" name="__redirect" value={REDIRECT} />
      {row && <input type="hidden" name="__id" value={row.id} />}

      <div className="grid grid-cols-2 gap-3">
        <Field label="Title">
          <TextInput name="title" defaultValue={row?.title ?? ""} required />
        </Field>
        <Field label="Icon">
          <Select name="icon" defaultValue={row?.icon ?? "MapPin"}>
            {ICON_NAMES.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <Field label="Description">
        <TextArea name="description" defaultValue={row?.description ?? ""} />
      </Field>
      <Field label="Sort order">
        <NumberInput name="sort_order" defaultValue={row?.sort_order ?? 0} />
      </Field>
      <div>
        <SaveButton>{row ? "Save changes" : "Add location"}</SaveButton>
      </div>
    </form>
  );
}

export default async function AdminVenue() {
  const supabase = await createClient();
  const { data } = await supabase.from("venue_locations").select("*").order("sort_order");
  const rows = data ?? [];

  return (
    <div>
      <h1 className="text-lg font-semibold">Venue Locations</h1>
      <p className="mt-1 text-xs text-zinc-500">
        The &quot;Important Locations&quot; list on the Venue screen. (Edit the venue name /
        address / map in Settings.)
      </p>

      <details className="mt-4 rounded border border-zinc-800 bg-zinc-950 p-4">
        <summary className="cursor-pointer text-sm font-semibold">+ Add a location</summary>
        <div className="mt-4">
          <VenueForm />
        </div>
      </details>

      <div className="mt-4 space-y-2">
        {rows.map((row) => (
          <div key={row.id} className="rounded border border-zinc-800 bg-zinc-950 p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{row.title}</div>
                <div className="mt-0.5 truncate text-[11px] text-zinc-500">{row.description}</div>
              </div>
              <DeleteButton table="venue_locations" id={row.id} redirect={REDIRECT} />
            </div>
            <details className="mt-2">
              <summary className="cursor-pointer text-xs text-zinc-400">Edit</summary>
              <div className="mt-3">
                <VenueForm row={row} />
              </div>
            </details>
          </div>
        ))}
        {rows.length === 0 && <p className="text-xs text-zinc-600">No locations yet.</p>}
      </div>
    </div>
  );
}
