import { createClient } from "@/lib/supabase/server";
import { submitForm } from "@/app/admin/actions";
import { Field, TextInput, TextArea, Select, Checkbox, SaveButton } from "@/components/admin/Form";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { timeAgo } from "@/lib/format";
import type { Announcement } from "@/lib/database.types";

export const dynamic = "force-dynamic";

const REDIRECT = "/admin/announcements";
const CATEGORIES = ["general", "game", "schedule", "alert"];

function AnnouncementForm({ row }: { row?: Announcement }) {
  return (
    <form action={submitForm} className="space-y-3">
      <input type="hidden" name="__table" value="announcements" />
      <input type="hidden" name="__redirect" value={REDIRECT} />
      {row && <input type="hidden" name="__id" value={row.id} />}

      <Field label="Title">
        <TextInput name="title" defaultValue={row?.title ?? ""} required placeholder="e.g. Mobile Legends finals starting now" />
      </Field>
      <Field label="Details (optional)">
        <TextArea name="body" defaultValue={row?.body ?? ""} placeholder="Add more detail…" />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Category">
          <Select name="category" defaultValue={row?.category ?? "general"}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </Field>
        <div className="flex flex-col justify-end gap-2 pb-1">
          <Checkbox name="pinned" label="Pin to top" defaultChecked={row?.pinned ?? false} />
          <Checkbox name="published" label="Published" defaultChecked={row?.published ?? true} />
        </div>
      </div>
      <SaveButton>{row ? "Save changes" : "Post update"}</SaveButton>
    </form>
  );
}

export default async function AdminAnnouncements() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("announcements")
    .select("*")
    .order("pinned", { ascending: false })
    .order("created_at", { ascending: false });
  const rows = data ?? [];

  return (
    <div>
      <h1 className="text-lg font-semibold">Updates</h1>
      <p className="mt-1 text-xs text-zinc-500">
        Post live announcements and results. Pinned updates show on the home screen.
      </p>

      <details className="mt-4 rounded border border-zinc-800 bg-zinc-950 p-4">
        <summary className="cursor-pointer text-sm font-semibold">+ Post a new update</summary>
        <div className="mt-4">
          <AnnouncementForm />
        </div>
      </details>

      <div className="mt-4 space-y-2">
        {rows.map((row) => (
          <div key={row.id} className="rounded border border-zinc-800 bg-zinc-950 p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                  <span className="uppercase tracking-wide">{row.category}</span>
                  {row.pinned && <span className="text-white">· pinned</span>}
                  {!row.published && <span className="text-amber-400">· hidden</span>}
                  <span>· {timeAgo(row.created_at)}</span>
                </div>
                <div className="mt-0.5 truncate text-sm font-medium">{row.title}</div>
              </div>
              <DeleteButton table="announcements" id={row.id} redirect={REDIRECT} />
            </div>

            <details className="mt-2">
              <summary className="cursor-pointer text-xs text-zinc-400">Edit</summary>
              <div className="mt-3">
                <AnnouncementForm row={row} />
              </div>
            </details>
          </div>
        ))}
        {rows.length === 0 && <p className="text-xs text-zinc-600">No updates yet.</p>}
      </div>
    </div>
  );
}
