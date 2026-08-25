import Link from "next/link";
import Image from "next/image";
import {
  CalendarDays,
  Clock3,
  Trophy,
  MapPin,
  CarFront,
  CircleHelp,
  Mail,
  Info,
  Search,
  Megaphone,
  ChevronRight,
} from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { RealtimeRefresh } from "@/components/RealtimeRefresh";
import { getSiteConfig, getAnnouncements } from "@/lib/queries";

export const dynamic = "force-dynamic";

const menuItems = [
  { label: "Events", icon: CalendarDays, route: "/events" },
  { label: "Schedule", icon: Clock3, route: "/schedule" },
  { label: "Games", icon: Trophy, route: "/games" },
  { label: "Venue", icon: MapPin, route: "/venue" },
  { label: "Transportation", icon: CarFront, route: "/transportation" },
  { label: "FAQs", icon: CircleHelp, route: "/faqs" },
  { label: "Contact", icon: Mail, route: "/contact" },
  { label: "About TXG", icon: Info, route: "/about-txg" },
];

export default async function HelpDeskPage() {
  const [site, announcements] = await Promise.all([
    getSiteConfig(),
    getAnnouncements(1),
  ]);
  const latest = announcements[0];

  return (
    <SiteShell title={site.brand} brand={site.brand}>
      <RealtimeRefresh tables={["announcements"]} />

      <div className="md:mx-auto md:max-w-4xl">
        {/* Hero band */}
        <div className="relative overflow-hidden rounded-lg md:rounded-2xl">
          <Image
            src="/txg-hero.jpg"
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 56rem, 100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
          <div className="relative z-10 px-4 py-8 md:px-8 md:py-14">
            <h1 className="text-xl font-semibold tracking-tight drop-shadow-lg md:text-4xl">
              How can we help?
            </h1>
            <p className="mt-1 text-xs text-zinc-200 drop-shadow md:mt-2 md:text-base">
              {site.eventName} · {site.dates} · {site.venueName}
            </p>
          </div>
        </div>

        {/* Live announcement banner */}
        {latest && (
          <Link
            href="/updates"
            className="mt-4 flex items-center gap-2 rounded-[3px] border border-zinc-700 bg-[#141414] px-3 py-2.5 transition-opacity hover:opacity-80 md:mt-6 md:rounded-lg md:px-5 md:py-4"
          >
            <Megaphone className="h-4 w-4 shrink-0 text-white md:h-5 md:w-5" />
            <span className="min-w-0 flex-1">
              <span className="block text-[9px] font-semibold uppercase tracking-wide text-zinc-500 md:text-xs">
                Latest update
              </span>
              <span className="block truncate text-[11px] font-medium text-white md:text-base">
                {latest.title}
              </span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-zinc-500 md:h-5 md:w-5" />
          </Link>
        )}

        {/* Ask entry */}
        <Link
          href="/ask"
          className="accent-ring mt-3 flex h-12 w-full items-center gap-2 rounded-lg bg-[var(--surface)] px-3 text-left md:mt-6 md:h-14 md:px-5"
        >
          <Search className="h-4 w-4 text-[var(--accent)] md:h-5 md:w-5" />
          <span className="text-sm text-zinc-400 md:text-base">
            Ask anything about {site.eventName}…
          </span>
        </Link>

        {/* Quick Access grid */}
        <div className="mt-5 grid grid-cols-2 gap-2 md:mt-8 md:grid-cols-4 md:gap-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.route}
                className="accent-ring flex h-[72px] flex-col items-start justify-center rounded-lg bg-[var(--surface)] px-3 md:h-36 md:rounded-xl md:px-5"
              >
                <Icon className="h-5 w-5 stroke-[1.5] text-[var(--accent)] md:h-7 md:w-7" />
                <span className="mt-2 text-[10px] font-semibold md:mt-4 md:text-base">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </SiteShell>
  );
}
