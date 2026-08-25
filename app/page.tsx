import Link from "next/link";
import Image from "next/image";
import { getSiteConfig } from "@/lib/queries";

export const dynamic = "force-dynamic";

const BP = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default async function Home() {
  const site = await getSiteConfig();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#08080d] text-white">
      {/* Background image (Nagaland rhododendron at golden hour) */}
      <Image
        src="/txg-hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-black/95" />

      {/* Top logo bar */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-center px-5 py-4 md:px-8">
        <span className="text-sm font-semibold tracking-tight md:text-base">
          Ki<span className="text-[var(--accent)]">·</span>Khobor
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[440px] flex-col px-6 py-10">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${BP}/txg-logo.png`}
            alt="TXG Expo Nagaland"
            className="w-64 max-w-[80%] drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] md:w-80"
          />

          <p className="mt-6 text-sm text-zinc-200 drop-shadow md:text-lg">
            {site.eventFullName}
          </p>
          <p className="mt-3 text-[11px] text-zinc-300 drop-shadow md:text-sm">
            {site.dates} · {site.venueName}, {site.venueAddress}
          </p>
          <p className="mt-8 text-xs text-zinc-300 drop-shadow md:text-base">{site.tagline}</p>
        </div>

        <Link
          href="/help-desk"
          className="btn-primary mb-8 flex h-12 w-full items-center justify-center rounded-md text-sm font-semibold tracking-wide"
        >
          ENTER THE HELP DESK
        </Link>
      </div>
    </main>
  );
}
