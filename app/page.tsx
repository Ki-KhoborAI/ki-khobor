"use client";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustSection from "@/components/TrustSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* TopAppBar Navigation */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Hero Section & Campus Assistant Dashboard */}
        <HeroSection />

        {/* Trust & Institutions Section */}
        <TrustSection />
      </main>

      {/* Footer Section */}
      <Footer />
    </>
  );
}
