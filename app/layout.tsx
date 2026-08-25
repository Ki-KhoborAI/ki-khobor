import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TXG 2026 · Ki-Khobor Help Desk",
  description:
    "Your digital guide to TXG 2026 — Nagaland's Technology, Gaming & Innovation Expo. Schedule, venue, live standings, updates and help, powered by Ki-Khobor.",
  applicationName: "TXG · Ki-Khobor",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "TXG · Ki-Khobor",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
