import { SiteShell } from "@/components/SiteShell";
import { getDrivers } from "@/lib/queries";
import { telHref } from "@/lib/format";
import { Phone } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ScootyPage() {
  const drivers = await getDrivers("scooty");

  return (
    <SiteShell title="Scooty Drivers" back>
      <h2 className="text-xl font-semibold tracking-tight md:text-3xl">Scooty Drivers</h2>
      <p className="mt-1 text-sm text-zinc-500 md:mt-2 md:text-base">
        Contact a driver for transportation.
      </p>

      {drivers.length === 0 ? (
        <p className="mt-6 text-center text-[10px] text-zinc-600 md:text-sm">No drivers listed yet.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3">
          {drivers.map((driver) => (
            <div
              key={driver.id}
              className="flex items-center gap-3 bg-[#111111] px-4 py-4 md:rounded-lg md:px-5"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold md:text-base">{driver.name}</p>
                <p className="mt-1 text-xs text-zinc-500 md:text-sm">{driver.phone}</p>
              </div>
              {driver.available ? (
                <a
                  href={telHref(driver.phone)}
                  className="btn-primary flex h-9 shrink-0 items-center gap-1.5 rounded-md px-3 text-xs font-semibold md:h-10 md:px-4 md:text-sm"
                >
                  <Phone className="h-3.5 w-3.5" />
                  Call
                </a>
              ) : (
                <span className="shrink-0 px-3 text-[10px] text-zinc-600 md:text-sm">Unavailable</span>
              )}
            </div>
          ))}
        </div>
      )}
    </SiteShell>
  );
}
