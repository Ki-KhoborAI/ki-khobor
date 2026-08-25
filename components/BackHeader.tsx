"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

/** Slim header with a back button and title. Responsive height/type. */
export function BackHeader({
  title,
  right,
  center = false,
}: {
  title: string;
  right?: ReactNode;
  center?: boolean;
}) {
  const router = useRouter();

  return (
    <header className="flex h-11 shrink-0 items-center border-b border-zinc-800 px-3 md:h-14 md:px-6">
      <button
        type="button"
        onClick={() => router.back()}
        className="flex h-8 w-8 items-center justify-start active:opacity-60"
        aria-label="Go back"
      >
        <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
      </button>

      <h1
        className={`flex-1 text-sm font-semibold md:text-base ${center ? "text-center" : ""}`}
      >
        {title}
      </h1>

      {right ?? <div className="w-8" />}
    </header>
  );
}
