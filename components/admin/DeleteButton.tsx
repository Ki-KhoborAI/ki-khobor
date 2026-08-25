"use client";

import { deleteRow } from "@/app/admin/actions";

export function DeleteButton({
  table,
  id,
  redirect,
}: {
  table: string;
  id: string;
  redirect: string;
}) {
  return (
    <form
      action={deleteRow}
      onSubmit={(e) => {
        if (!confirm("Delete this item? This cannot be undone.")) e.preventDefault();
      }}
    >
      <input type="hidden" name="__table" value={table} />
      <input type="hidden" name="__id" value={id} />
      <input type="hidden" name="__redirect" value={redirect} />
      <button
        type="submit"
        className="rounded border border-zinc-700 px-2.5 py-1 text-xs text-red-400 transition-colors hover:border-red-500/50 hover:text-red-300"
      >
        Delete
      </button>
    </form>
  );
}
