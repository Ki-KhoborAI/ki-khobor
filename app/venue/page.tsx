import { SiteShell } from "@/components/SiteShell";
import { getSiteConfig, getVenueLocations } from "@/lib/queries";
import { getIcon } from "@/lib/icons";
import { MapPin, Navigation } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function VenuePage() {
  const [site, locations] = await Promise.all([getSiteConfig(), getVenueLocations()]);

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    site.venueMapQuery
  )}`;

  return (
    <SiteShell title="Venue" back>
      <div className="md:grid md:grid-cols-2 md:gap-8">
        <section>
          <h2 className="text-sm font-semibold md:text-3xl">{site.venueName}</h2>
          <div className="mt-1.5 flex items-center gap-1.5 text-[8px] text-zinc-300 md:mt-3 md:text-base">
            <MapPin className="h-3 w-3 shrink-0 md:h-4 md:w-4" />
            <span>{site.venueAddress}</span>
          </div>
          <p className="mt-2 text-[8px] leading-4 text-zinc-300 md:mt-3 md:text-sm md:leading-relaxed">
            The host venue for {site.eventName} — {site.eventFullName}.
          </p>
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-3 flex h-7 w-full items-center justify-center gap-1.5 rounded-md text-[8px] font-medium md:mt-5 md:h-11 md:max-w-xs md:text-sm"
          >
            <Navigation className="h-3 w-3 md:h-4 md:w-4" />
            Get Directions
          </a>
        </section>

        {locations.length > 0 && (
          <section className="mt-5 md:mt-0">
            <h3 className="text-[11px] font-semibold md:text-lg">Important Locations</h3>
            <div className="mt-3 overflow-hidden rounded-[3px] bg-[#111111] md:rounded-lg">
              {locations.map((location, index) => {
                const Icon = getIcon(location.icon);
                return (
                  <div
                    key={location.id}
                    className={`flex gap-3 px-3 py-3 md:px-5 md:py-4 ${
                      index !== locations.length - 1 ? "border-b border-zinc-800" : ""
                    }`}
                  >
                    <div className="flex w-4 shrink-0 justify-center pt-0.5 md:w-5">
                      <Icon className="h-3.5 w-3.5 md:h-5 md:w-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[8px] font-semibold md:text-base">{location.title}</h4>
                      {location.description && (
                        <p className="mt-0.5 text-[7px] leading-3.5 text-zinc-300 md:mt-1 md:text-sm">
                          {location.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </SiteShell>
  );
}
