import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { getDriverCounts } from "@/lib/queries";
import { CarFront, Bike } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function TransportationPage() {
  const counts = await getDriverCounts();

  const options = [
    { label: "Taxi", count: counts.taxi, icon: CarFront, route: "/transportation/taxi" },
    { label: "Scooty", count: counts.scooty, icon: Bike, route: "/transportation/scooty" },
  ];

  return (
    <SiteShell title="Transportation" back>
      <h2 className="text-xl font-semibold tracking-tight md:text-3xl">Need a ride?</h2>
      <p className="mt-1 text-sm text-zinc-500 md:mt-2 md:text-base">
        Choose a transportation option below.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-2 md:mt-8 md:grid-cols-2 md:gap-4">
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <Link
              key={option.label}
              href={option.route}
              className="flex w-full items-center gap-3 bg-[#111111] px-4 py-4 text-left transition-colors hover:bg-[#171717] md:rounded-xl md:gap-4 md:px-6 md:py-6"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#181818] md:h-14 md:w-14 md:rounded-lg">
                <Icon className="h-5 w-5 stroke-[1.5] md:h-7 md:w-7" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold md:text-xl">{option.label}</p>
                <p className="mt-0.5 text-xs text-zinc-500 md:text-sm">
                  {option.count} {option.count === 1 ? "driver" : "drivers"} available
                </p>
              </div>
              <span className="text-lg text-zinc-500 md:text-2xl">→</span>
            </Link>
          );
        })}
      </div>
    </SiteShell>
  );
}
