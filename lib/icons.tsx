import {
  Gamepad2,
  Trophy,
  Swords,
  Users,
  UsersRound,
  UserRound,
  Mic,
  Presentation,
  Sparkles,
  CalendarDays,
  Clock3,
  MapPin,
  Navigation,
  Utensils,
  CircleHelp,
  BriefcaseMedical,
  ShieldCheck,
  Info,
  CarFront,
  Bike,
  Rocket,
  Globe2,
  Mail,
  Phone,
  Megaphone,
  Ticket,
  Cpu,
  Palette,
  Star,
  type LucideIcon,
} from "lucide-react";

/**
 * Icons are stored in the database as plain strings (e.g. "Trophy") so the
 * admin can pick one without touching code. This maps those names to the
 * actual lucide component, with a safe fallback.
 */
export const ICON_MAP: Record<string, LucideIcon> = {
  Gamepad2,
  Trophy,
  Swords,
  Users,
  UsersRound,
  UserRound,
  Mic,
  Presentation,
  Sparkles,
  CalendarDays,
  Clock3,
  MapPin,
  Navigation,
  Utensils,
  CircleHelp,
  BriefcaseMedical,
  ShieldCheck,
  Info,
  CarFront,
  Bike,
  Rocket,
  Globe2,
  Mail,
  Phone,
  Megaphone,
  Ticket,
  Cpu,
  Palette,
  Star,
};

/** The set of icon names offered in the admin dropdowns. */
export const ICON_NAMES = Object.keys(ICON_MAP);

export function getIcon(name: string | null | undefined): LucideIcon {
  if (name && ICON_MAP[name]) return ICON_MAP[name];
  return Info;
}
