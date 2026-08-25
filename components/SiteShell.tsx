"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search } from "lucide-react";
import type { ReactNode } from "react";

const BP = process.env.NEXT_PUBLIC_BASE_PATH || "";

const NAV = [
  { href: "/help-desk", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/schedule", label: "Schedule" },
  { href: "/games", label: "Games" },
  { href: "/updates", label: "Updates" },
  { href: "/venue", label: "Venue" },
  { href: "/transportation", label: "Transport" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
  { href: "/about-txg", label: "About" },
];

/** Ki-Khobor wordmark (left). Swap for a logo image if one is provided. */
function KiKhoborMark() {
  return (
    <Link href="/help-desk" className="flex shrink-0 items-center gap-2">
      <span className="text-sm font-semibold tracking-tight md:text-base">
        Ki<span className="text-[var(--accent)]">·</span>Khobor
      </span>
    </Link>
  );
}

/** TXG Expo Nagaland logo (right). */
function TxgMark() {
  return (
    <Link href="/help-desk" className="flex shrink-0 items-center" aria-label="TXG Expo Nagaland">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${BP}/txg-logo.png`} alt="TXG Expo Nagaland" className="h-6 w-auto md:h-9" />
    </Link>
  );
}

export function SiteShell({
  children,
}: {
  title?: string;
  back?: boolean;
  brand?: string;
  children: ReactNode;
}) {
  const pathname = usePathname() ?? "";
  const isActive = (href: string) =>
    href === "/help-desk" ? pathname === "/help-desk" : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-[var(--background)] text-white">
      {/* ===== Sticky header (all breakpoints) ===== */}
      <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[#08080d]/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 md:h-16 md:px-6">
          <KiKhoborMark />

          {/* Desktop nav */}
          <nav className="hidden flex-1 items-center justify-center gap-1 overflow-x-auto md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 rounded-md px-3 py-1.5 text-sm transition-colors ${
                  isActive(item.href)
                    ? "bg-white/5 text-white shadow-[inset_0_-2px_0_0_var(--accent)]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/ask"
              className="btn-primary hidden items-center gap-1.5 rounded-md px-4 py-1.5 text-sm font-semibold md:flex"
            >
              <Search className="h-3.5 w-3.5" />
              Ask
            </Link>
            <TxgMark />
          </div>
        </div>
      </header>

      {/* ===== Content ===== */}
      <main className="mx-auto w-full max-w-[420px] px-3 pb-20 pt-4 md:max-w-6xl md:px-6 md:pb-12 md:pt-8">
        {children}
      </main>

      {/* ===== Mobile bottom nav ===== */}
      <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto grid h-14 max-w-[420px] grid-cols-2 border-t border-[var(--border)] bg-[#08080d]/95 backdrop-blur md:hidden">
        <Link
          href="/help-desk"
          className={`flex flex-col items-center justify-center text-[9px] font-medium ${
            !pathname.startsWith("/ask") ? "text-[var(--accent)]" : "text-zinc-400"
          }`}
        >
          <Home className="h-4 w-4" />
          <span className="mt-0.5">Home</span>
        </Link>
        <Link
          href="/ask"
          className={`flex flex-col items-center justify-center text-[9px] font-medium ${
            pathname.startsWith("/ask") ? "text-[var(--accent)]" : "text-zinc-400"
          }`}
        >
          <Search className="h-4 w-4" />
          <span className="mt-0.5">Ask</span>
        </Link>
      </nav>
    </div>
  );
}
