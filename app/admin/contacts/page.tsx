import { createClient } from "@/lib/supabase/server";
import { submitForm } from "@/app/admin/actions";
import {
  Field,
  TextInput,
  NumberInput,
  Checkbox,
  SaveButton,
} from "@/components/admin/Form";
import { DeleteButton } from "@/components/admin/DeleteButton";
import type { Contact } from "@/lib/database.types";

export const dynamic = "force-dynamic";

const REDIRECT = "/admin/contacts";

function ContactForm({ row }: { row?: Contact }) {
  return (
    <form action={submitForm} className="space-y-3">
      <input type="hidden" name="__table" value="contacts" />
      <input type="hidden" name="__redirect" value={REDIRECT} />
      {row && <input type="hidden" name="__id" value={row.id} />}

      <div className="grid grid-cols-2 gap-3">
        <Field label="Title" hint="e.g. Help Desk">
          <TextInput name="title" defaultValue={row?.title ?? ""} required />
        </Field>
        <Field label="Name">
          <TextInput name="name" defaultValue={row?.name ?? ""} />
        </Field>
        <Field label="Role">
          <TextInput name="role" defaultValue={row?.role ?? ""} />
        </Field>
        <Field label="Phone" hint="Enables the Call button">
          <TextInput name="phone" defaultValue={row?.phone ?? ""} />
        </Field>
        <Field label="Email" hint="Enables the Email button">
          <TextInput name="email" defaultValue={row?.email ?? ""} />
        </Field>
        <Field label="Location">
          <TextInput name="location" defaultValue={row?.location ?? ""} />
        </Field>
        <Field label="Sort order">
          <NumberInput name="sort_order" defaultValue={row?.sort_order ?? 0} />
        </Field>
      </div>
      <div className="flex items-center gap-4">
        <Checkbox name="is_emergency" label="Emergency contact" defaultChecked={row?.is_emergency ?? false} />
        <Checkbox name="published" label="Published" defaultChecked={row?.published ?? true} />
      </div>
      <div>
        <SaveButton>{row ? "Save changes" : "Add contact"}</SaveButton>
      </div>
    </form>
  );
}

export default async function AdminContacts() {
  const supabase = await createClient();
  const { data } = await supabase.from("contacts").select("*").order("sort_order");
  const rows = data ?? [];

  return (
    <div>
      <h1 className="text-lg font-semibold">Contacts</h1>
      <p className="mt-1 text-xs text-zinc-500">
        Support directory. Add a phone or email to enable the Call / Email buttons.
      </p>

      <details className="mt-4 rounded border border-zinc-800 bg-zinc-950 p-4">
        <summary className="cursor-pointer text-sm font-semibold">+ Add a contact</summary>
        <div className="mt-4">
          <ContactForm />
        </div>
      </details>

      <div className="mt-4 space-y-2">
        {rows.map((row) => (
          <div key={row.id} className="rounded border border-zinc-800 bg-zinc-950 p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">
                  {row.title}
                  {row.is_emergency && <span className="ml-2 text-[10px] text-red-400">emergency</span>}
                </div>
                <div className="mt-0.5 truncate text-[11px] text-zinc-500">
                  {[row.name, row.phone, row.email].filter(Boolean).join(" · ") || "No details"}
                </div>
              </div>
              <DeleteButton table="contacts" id={row.id} redirect={REDIRECT} />
            </div>
            <details className="mt-2">
              <summary className="cursor-pointer text-xs text-zinc-400">Edit</summary>
              <div className="mt-3">
                <ContactForm row={row} />
              </div>
            </details>
          </div>
        ))}
        {rows.length === 0 && <p className="text-xs text-zinc-600">No contacts yet.</p>}
      </div>
    </div>
  );
}
