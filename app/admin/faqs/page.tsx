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
import type { Faq } from "@/lib/database.types";

export const dynamic = "force-dynamic";

const REDIRECT = "/admin/faqs";

function FaqForm({ row }: { row?: Faq }) {
  return (
    <form action={submitForm} className="space-y-3">
      <input type="hidden" name="__table" value="faqs" />
      <input type="hidden" name="__redirect" value={REDIRECT} />
      {row && <input type="hidden" name="__id" value={row.id} />}

      <Field label="Question">
        <TextInput name="question" defaultValue={row?.question ?? ""} required />
      </Field>
      <Field label="Answer">
        <TextArea name="answer" defaultValue={row?.answer ?? ""} required />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Category">
          <TextInput name="category" defaultValue={row?.category ?? "general"} />
        </Field>
        <Field label="Source label">
          <TextInput name="source" defaultValue={row?.source ?? "TXG Official Information"} />
        </Field>
      </div>
      <Field
        label="Keywords"
        hint="Comma-separated — these power the Ask search. Add words people might use."
      >
        <TextInput name="keywords" defaultValue={(row?.keywords ?? []).join(", ")} placeholder="venue, where, location" />
      </Field>
      <Field label="Tags" hint="Comma-separated (optional grouping)">
        <TextInput name="tags" defaultValue={(row?.tags ?? []).join(", ")} placeholder="venue, general" />
      </Field>
      <div className="flex items-center gap-4">
        <Field label="Sort order">
          <NumberInput name="sort_order" defaultValue={row?.sort_order ?? 0} />
        </Field>
        <div className="pt-5">
          <Checkbox name="published" label="Published" defaultChecked={row?.published ?? true} />
        </div>
      </div>
      <div>
        <SaveButton>{row ? "Save changes" : "Add FAQ"}</SaveButton>
      </div>
    </form>
  );
}

export default async function AdminFaqs() {
  const supabase = await createClient();
  const { data } = await supabase.from("faqs").select("*").order("sort_order");
  const rows = data ?? [];

  return (
    <div>
      <h1 className="text-lg font-semibold">FAQs &amp; Knowledge Base</h1>
      <p className="mt-1 text-xs text-zinc-500">
        Powers the FAQ screen and the smart Ask Ki-Khobor answers. Good keywords = better answers.
      </p>

      <details className="mt-4 rounded border border-zinc-800 bg-zinc-950 p-4">
        <summary className="cursor-pointer text-sm font-semibold">+ Add a FAQ</summary>
        <div className="mt-4">
          <FaqForm />
        </div>
      </details>

      <div className="mt-4 space-y-2">
        {rows.map((row) => (
          <div key={row.id} className="rounded border border-zinc-800 bg-zinc-950 p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{row.question}</div>
                <div className="mt-0.5 truncate text-[11px] text-zinc-500">{row.answer}</div>
                {!row.published && <span className="text-[10px] text-amber-400">hidden</span>}
              </div>
              <DeleteButton table="faqs" id={row.id} redirect={REDIRECT} />
            </div>
            <details className="mt-2">
              <summary className="cursor-pointer text-xs text-zinc-400">Edit</summary>
              <div className="mt-3">
                <FaqForm row={row} />
              </div>
            </details>
          </div>
        ))}
        {rows.length === 0 && <p className="text-xs text-zinc-600">No FAQs yet.</p>}
      </div>
    </div>
  );
}
