"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search } from "lucide-react";

/** Shared bottom navigation used across the help-desk screens. */
export function BottomNav() {
  const pathname = usePathname() ?? "";
  const isAsk = pathname.startsWith("/ask");
  const isHome = !isAsk;

  return (
    <nav className="grid h-12 shrink-0 grid-cols-2 border-t border-zinc-800">
      <Link
        href="/help-desk"
        className={`flex flex-col items-center justify-center text-[8px] font-medium ${
          isHome ? "border-t border-white text-white" : "text-zinc-400"
        }`}
      >
        <Home className="h-4 w-4" />
        <span className="mt-0.5">Home</span>
      </Link>

      <Link
        href="/ask"
        className={`flex flex-col items-center justify-center text-[8px] font-medium ${
          isAsk ? "border-t border-white text-white" : "text-zinc-400"
        }`}
      >
        <Search className="h-4 w-4" />
        <span className="mt-0.5">Ask</span>
      </Link>
    </nav>
  );
}
