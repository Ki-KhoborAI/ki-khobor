import { SiteShell } from "@/components/SiteShell";
import { getSiteConfig } from "@/lib/queries";
import { Gamepad2, Cpu, Mic, CalendarDays, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

const highlights = [
  {
    title: "Competitive Gaming & Esports",
    icon: Gamepad2,
    description:
      "Inter-college and open tournaments across Mobile Legends, MOBA 5v5 and a mini-tournament series, with prize pools worth lakhs.",
  },
  {
    title: "Game Development & Tech",
    icon: Cpu,
    description:
      "A showcase for local developers and studios, alongside technology exhibitions and an innovation hub.",
  },
  {
    title: "Careers & Creator Economy",
    icon: Mic,
    description:
      "Panels with industry experts on building careers in gaming, tech, esports and content creation.",
  },
];

export default async function AboutTXGPage() {
  const site = await getSiteConfig();

  return (
    <SiteShell title="About TXG" back>
      <div className="md:mx-auto md:max-w-4xl">
        <section>
          <h2 className="text-sm font-semibold md:text-3xl">{site.eventFullName}</h2>
          <p className="mt-1.5 text-[8px] leading-4 text-zinc-300 md:mt-3 md:text-base md:leading-relaxed">
            {site.eventName} is Nagaland&apos;s first state-level technology and gaming expo —
            uniting competitive gaming, game development, tech, education, careers and the creator
            economy on one platform. Organised by the {site.organizer}.
          </p>
        </section>

        <section className="mt-4 grid grid-cols-1 gap-2 md:mt-8 md:grid-cols-3 md:gap-4">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="rounded-[3px] bg-[#111111] px-3 py-3 md:rounded-xl md:px-5 md:py-5"
              >
                <Icon className="h-3.5 w-3.5 md:h-6 md:w-6" />
                <h3 className="mt-2 text-[9px] font-semibold md:mt-3 md:text-base">{item.title}</h3>
                <p className="mt-1 text-[7px] leading-3.5 text-zinc-300 md:mt-2 md:text-sm md:leading-relaxed">
                  {item.description}
                </p>
              </article>
            );
          })}
        </section>

        <section className="mt-2 rounded-[3px] bg-[#111111] px-3 py-3 md:mt-4 md:rounded-xl md:px-5 md:py-5">
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-3 w-3 md:h-4 md:w-4" />
            <span className="text-[7px] font-semibold uppercase tracking-wide text-zinc-400 md:text-xs">
              When & Where
            </span>
          </div>
          <h3 className="mt-1.5 text-[11px] font-semibold md:mt-2 md:text-xl">{site.dates}</h3>
          <p className="mt-1 text-[8px] text-zinc-300 md:text-base">
            {site.venueName}, {site.venueAddress}
          </p>
        </section>

        <section className="mt-2 rounded-[3px] bg-[#111111] px-3 py-3 md:mt-4 md:rounded-xl md:px-5 md:py-5">
          <p className="text-[6px] font-semibold uppercase tracking-wide text-zinc-500 md:text-xs">
            Official Website
          </p>
          <a
            href={site.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 flex w-full items-center justify-between text-left active:opacity-60 md:mt-2"
          >
            <span className="text-[8px] font-medium md:text-base">
              {site.registrationUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            </span>
            <ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
          </a>
        </section>

        <section className="mt-2 rounded-[3px] border border-zinc-800 px-3 py-3 md:mt-4 md:rounded-xl md:px-5 md:py-5">
          <p className="text-[8px] leading-4 text-zinc-400 md:text-sm md:leading-relaxed">
            This help desk is built and run by{" "}
            <span className="font-semibold text-white">Ki-Khobor</span>, a student startup from
            Tetso College providing information services for institutions and events.
          </p>
        </section>
      </div>
    </SiteShell>
  );
}
