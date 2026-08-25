import { SiteShell } from "@/components/SiteShell";
import { getContacts } from "@/lib/queries";
import { telHref } from "@/lib/format";
import { UserRound, Phone, Mail, MapPin, TriangleAlert } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const contacts = await getContacts();

  return (
    <SiteShell title="Contact" back>
      <h2 className="text-sm font-semibold md:text-3xl">Contact Directory</h2>
      <p className="mt-1 text-[8px] leading-4 text-zinc-400 md:mt-2 md:text-sm">
        Direct lines to support and operations.
      </p>

      {contacts.length === 0 ? (
        <p className="mt-6 text-center text-[10px] text-zinc-600 md:text-sm">
          Contact details will be listed here soon.
        </p>
      ) : (
        <section className="mt-4 grid grid-cols-1 gap-2 md:mt-6 md:grid-cols-2 md:gap-4">
          {contacts.map((contact) => (
            <article
              key={contact.id}
              className="flex flex-col rounded-[3px] bg-[#111111] px-3 py-3 md:rounded-xl md:px-5 md:py-5"
            >
              <h3 className="text-[9px] font-semibold md:text-lg">{contact.title}</h3>

              {contact.name && (
                <div className="mt-2 flex items-center gap-1.5 text-[7px] text-zinc-300 md:text-sm">
                  <UserRound className="h-3 w-3 shrink-0 md:h-4 md:w-4" />
                  <span>{contact.name}</span>
                </div>
              )}
              {contact.role && (
                <p className="ml-[18px] mt-0.5 text-[7px] text-zinc-500 md:ml-6 md:text-xs">
                  {contact.role}
                </p>
              )}
              {contact.phone && (
                <div className="mt-1.5 flex items-center gap-1.5 text-[7px] text-zinc-300 md:text-sm">
                  <Phone className="h-3 w-3 shrink-0 md:h-4 md:w-4" />
                  <span>{contact.phone}</span>
                </div>
              )}
              {contact.email && (
                <div className="mt-1 flex items-center gap-1.5 text-[7px] text-zinc-300 md:text-sm">
                  <Mail className="h-3 w-3 shrink-0 md:h-4 md:w-4" />
                  <span>{contact.email}</span>
                </div>
              )}
              {contact.location && (
                <div className="mt-1 flex items-center gap-1.5 text-[7px] text-zinc-300 md:text-sm">
                  <MapPin className="h-3 w-3 shrink-0 md:h-4 md:w-4" />
                  <span>{contact.location}</span>
                </div>
              )}

              {contact.is_emergency
                ? contact.phone && (
                    <a
                      href={telHref(contact.phone)}
                      className="mt-3 flex h-7 w-full items-center justify-center gap-1 border border-zinc-400 text-[7px] font-semibold text-white transition-opacity hover:opacity-90 md:mt-auto md:h-10 md:rounded-md md:text-sm"
                    >
                      <TriangleAlert className="h-3 w-3 md:h-4 md:w-4" />
                      IMMEDIATE ASSISTANCE
                    </a>
                  )
                : (contact.phone || contact.email) && (
                    <div className="mt-3 grid grid-cols-2 gap-1.5 md:mt-auto md:gap-2">
                      {contact.phone && (
                        <a
                          href={telHref(contact.phone)}
                          className="flex h-7 items-center justify-center gap-1 bg-white text-[7px] font-medium text-black transition-opacity hover:opacity-90 md:h-10 md:rounded-md md:text-sm"
                        >
                          <Phone className="h-3 w-3 md:h-4 md:w-4" />
                          Call
                        </a>
                      )}
                      {contact.email && (
                        <a
                          href={`mailto:${contact.email}`}
                          className={`flex h-7 items-center justify-center gap-1 border border-zinc-800 bg-[#151515] text-[7px] font-medium text-white transition-opacity hover:opacity-90 md:h-10 md:rounded-md md:text-sm ${
                            contact.phone ? "" : "col-span-2"
                          }`}
                        >
                          <Mail className="h-3 w-3 md:h-4 md:w-4" />
                          Email
                        </a>
                      )}
                    </div>
                  )}
            </article>
          ))}
        </section>
      )}
    </SiteShell>
  );
}
