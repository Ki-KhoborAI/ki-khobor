import { createClient } from "@/lib/supabase/server";
import { submitForm } from "@/app/admin/actions";
import {
  Field,
  TextInput,
  NumberInput,
  Select,
  Checkbox,
  SaveButton,
} from "@/components/admin/Form";
import { DeleteButton } from "@/components/admin/DeleteButton";
import type { Driver } from "@/lib/database.types";

export const dynamic = "force-dynamic";

const REDIRECT = "/admin/drivers";

function DriverForm({ row }: { row?: Driver }) {
  return (
    <form action={submitForm} className="flex flex-wrap items-end gap-2">
      <input type="hidden" name="__table" value="drivers" />
      <input type="hidden" name="__redirect" value={REDIRECT} />
      {row && <input type="hidden" name="__id" value={row.id} />}

      <label className="w-24">
        <span className="block text-[9px] text-zinc-500">Type</span>
        <Select name="type" defaultValue={row?.type ?? "taxi"}>
          <option value="taxi">taxi</option>
          <option value="scooty">scooty</option>
        </Select>
      </label>
      <label className="min-w-[130px] flex-1">
        <span className="block text-[9px] text-zinc-500">Name</span>
        <TextInput name="name" defaultValue={row?.name ?? ""} required />
      </label>
      <label className="w-32">
        <span className="block text-[9px] text-zinc-500">Phone</span>
        <TextInput name="phone" defaultValue={row?.phone ?? ""} required />
      </label>
      <label className="w-16">
        <span className="block text-[9px] text-zinc-500">Order</span>
        <NumberInput name="sort_order" defaultValue={row?.sort_order ?? 0} />
      </label>
      <div className="pb-1.5">
        <Checkbox name="available" label="Available" defaultChecked={row?.available ?? true} />
      </div>
      <SaveButton>{row ? "Save" : "Add"}</SaveButton>
      {row && <DeleteButton table="drivers" id={row.id} redirect={REDIRECT} />}
    </form>
  );
}

export default async function AdminDrivers() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("drivers")
    .select("*")
    .order("type")
    .order("sort_order");
  const rows = data ?? [];

  return (
    <div>
      <h1 className="text-lg font-semibold">Transportation Drivers</h1>
      <p className="mt-1 text-xs text-zinc-500">
        Taxi and scooty drivers attendees can call. Toggle availability as needed.
      </p>

      <div className="mt-4 rounded border border-dashed border-zinc-800 bg-zinc-950 p-3">
        <p className="mb-2 text-xs font-semibold">Add a driver</p>
        <DriverForm />
      </div>

      <div className="mt-4 space-y-2">
        {rows.map((row) => (
          <div key={row.id} className="rounded border border-zinc-800 bg-zinc-950 p-3">
            <DriverForm row={row} />
          </div>
        ))}
        {rows.length === 0 && <p className="text-xs text-zinc-600">No drivers yet.</p>}
      </div>
    </div>
  );
}
