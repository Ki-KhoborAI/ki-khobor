import { getSiteConfig } from "@/lib/queries";
import { saveSite } from "@/app/admin/actions";
import { Field, TextInput, SaveButton } from "@/components/admin/Form";

export const dynamic = "force-dynamic";

export default async function AdminSettings() {
  const site = await getSiteConfig();

  return (
    <div>
      <h1 className="text-lg font-semibold">Site Settings</h1>
      <p className="mt-1 text-xs text-zinc-500">
        Event name, dates, venue and links used across the app.
      </p>

      <form action={saveSite} className="mt-4 space-y-3 rounded border border-zinc-800 bg-zinc-950 p-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Event name" hint="Short, e.g. TXG 2026">
            <TextInput name="eventName" defaultValue={site.eventName} />
          </Field>
          <Field label="Full name">
            <TextInput name="eventFullName" defaultValue={site.eventFullName} />
          </Field>
          <Field label="Brand (header)">
            <TextInput name="brand" defaultValue={site.brand} />
          </Field>
          <Field label="Powered by">
            <TextInput name="poweredBy" defaultValue={site.poweredBy} />
          </Field>
          <Field label="Dates">
            <TextInput name="dates" defaultValue={site.dates} />
          </Field>
          <Field label="Organizer">
            <TextInput name="organizer" defaultValue={site.organizer} />
          </Field>
          <Field label="Venue name">
            <TextInput name="venueName" defaultValue={site.venueName} />
          </Field>
          <Field label="Venue address">
            <TextInput name="venueAddress" defaultValue={site.venueAddress} />
          </Field>
          <Field label="Map search query" hint="Used for the Get Directions button">
            <TextInput name="venueMapQuery" defaultValue={site.venueMapQuery} />
          </Field>
          <Field label="Registration URL">
            <TextInput name="registrationUrl" defaultValue={site.registrationUrl} />
          </Field>
        </div>
        <Field label="Tagline (landing screen)">
          <TextInput name="tagline" defaultValue={site.tagline} />
        </Field>
        <div>
          <SaveButton>Save settings</SaveButton>
        </div>
      </form>
    </div>
  );
}
