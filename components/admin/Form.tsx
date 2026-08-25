import type { ReactNode } from "react";

const inputCls =
  "w-full rounded border border-zinc-700 bg-zinc-900 px-2.5 py-1.5 text-sm text-white outline-none focus:border-zinc-500 placeholder:text-zinc-600";

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-zinc-300">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[10px] text-zinc-500">{hint}</span>}
    </label>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={inputCls} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputCls} min-h-[70px]`} />;
}

export function NumberInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input type="number" {...props} className={inputCls} />;
}

export function Select({
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <select {...props} className={inputCls}>
      {children}
    </select>
  );
}

export function Checkbox({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-zinc-300">
      {/* Hidden default ensures the field is always submitted; checkbox overrides when checked */}
      <input type="hidden" name={name} value="false" />
      <input
        type="checkbox"
        name={name}
        value="true"
        defaultChecked={defaultChecked}
        className="h-4 w-4 accent-white"
      />
      {label}
    </label>
  );
}

export function SaveButton({ children = "Save" }: { children?: ReactNode }) {
  return (
    <button
      type="submit"
      className="rounded bg-white px-3 py-1.5 text-sm font-semibold text-black transition-opacity active:opacity-70"
    >
      {children}
    </button>
  );
}
