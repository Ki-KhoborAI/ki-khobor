import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "./actions";

export const dynamic = "force-dynamic";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/announcements", label: "Updates" },
  { href: "/admin/tournaments", label: "Games" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/schedule", label: "Schedule" },
  { href: "/admin/faqs", label: "FAQs" },
  { href: "/admin/contacts", label: "Contacts" },
  { href: "/admin/drivers", label: "Drivers" },
  { href: "/admin/venue", label: "Venue" },
  { href: "/admin/questions", label: "Questions" },
  { href: "/admin/settings", label: "Settings" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // The login page renders under this layout but must stay chrome-free.
  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-10 border-b border-zinc-800 bg-black/95 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <Link href="/admin" className="text-sm font-semibold">
            TXG · Ki-Khobor <span className="text-zinc-500">Admin</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xs text-zinc-400 hover:text-white">
              View app ↗
            </Link>
            <form action={signOut}>
              <button className="rounded border border-zinc-700 px-2.5 py-1 text-xs text-zinc-300 hover:border-zinc-500 hover:text-white">
                Sign out
              </button>
            </form>
          </div>
        </div>

        <nav className="mx-auto max-w-4xl overflow-x-auto px-4 no-scrollbar">
          <div className="flex gap-1 pb-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 rounded px-2.5 py-1 text-xs text-zinc-400 hover:bg-zinc-900 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6">{children}</main>
    </div>
  );
}
