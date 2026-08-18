import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ki-Khobor | Intelligence for Institutions",
  description: "Empowering colleges and schools with AI-driven assistants that make information universally accessible and administrative services structurally smarter.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col selection:bg-indigo-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
