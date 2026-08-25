/**
 * Default site configuration. These values are overridden at runtime by rows
 * in the `settings` table (key = "site"), so the admin can change the event
 * name, dates, venue and hero copy without a redeploy.
 */
export const SITE_DEFAULTS = {
  eventName: "TXG 2026",
  eventFullName: "Technology, Gaming & Innovation Expo",
  tagline: "Your digital guide to TXG.",
  brand: "TXG · KI-KHOBOR",
  poweredBy: "Powered by Ki-Khobor",
  dates: "August 28–29, 2026",
  venueName: "NBCC Convention Hall",
  venueAddress: "Kohima, Nagaland",
  venueMapQuery: "NBCC Convention Hall Kohima Nagaland",
  registrationUrl: "https://www.txg-nagaland.com/",
  organizer: "Nagaland E-Sports Society",
};

export type SiteConfig = typeof SITE_DEFAULTS;
