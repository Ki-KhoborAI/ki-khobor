"use client";

import React, { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ─── Interactive Ki-Khobor K Icon ─────────────────────────────────────────────
// Responds to both pointer hover (desktop) and touch (mobile).
// Uses React state for active rather than CSS-only :hover so mobile tap works.
function InteractiveKIcon() {
  const [active, setActive] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activate = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActive(true);
  };

  const deactivate = () => {
    // Small delay so a tap doesn't flash instantly off
    timeoutRef.current = setTimeout(() => setActive(false), 180);
  };

  return (
    <div
      role="img"
      aria-label="Ki-Khobor icon"
      onPointerEnter={activate}
      onPointerLeave={deactivate}
      onPointerDown={activate}
      onPointerUp={deactivate}
      onPointerCancel={deactivate}
      className="relative select-none cursor-default"
      style={{
        // Scale up and reveal subtle ring on active — no permanent glow
        transform: active ? "scale(1.06) translateY(-3px)" : "scale(1) translateY(0px)",
        transition: "transform 0.45s cubic-bezier(0.34,1.56,0.64,1)",
        willChange: "transform",
      }}
    >
      {/* Subtle highlight ring — only visible on hover/tap, no blur */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow: active
            ? "0 0 0 1.5px rgba(255,255,255,0.18), 0 8px 32px -8px rgba(255,255,255,0.12)"
            : "0 0 0 0px rgba(255,255,255,0)",
          transition: "box-shadow 0.35s ease",
        }}
      />

      {/* whiteicon.png — transparent background PNG */}
      <img
        src="/whiteicon.png"
        alt="Ki-Khobor icon"
        className="w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain select-none"
        draggable={false}
      />
    </div>
  );
}

// ─── About Hero Section ────────────────────────────────────────────────────────
function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger: text first, then visual, then wordmark
          if (textRef.current) {
            textRef.current.style.opacity = "1";
            textRef.current.style.transform = "translateY(0)";
          }
          setTimeout(() => {
            if (visualRef.current) {
              visualRef.current.style.opacity = "1";
              visualRef.current.style.transform = "translateY(0)";
            }
          }, 150);
          setTimeout(() => {
            if (wordmarkRef.current) {
              wordmarkRef.current.style.opacity = "1";
            }
          }, 250);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#030305] text-white overflow-hidden"
      style={{ minHeight: "clamp(520px, 90vh, 800px)" }}
    >
      {/* Very subtle dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Inner layout: padding respects header (pt-24) ── */}
      <div className="relative z-10 max-w-container-max mx-auto px-4 sm:px-8 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ─ LEFT: About text ─────────────────────────────────────── */}
          <div
            ref={textRef}
            className="space-y-7"
            style={{
              opacity: 0,
              transform: "translateY(28px)",
              transition: "opacity 0.75s ease, transform 0.75s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-slate-300">
                The Founder's Letter
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold leading-[1.08] tracking-tight text-white">
              The Future of
              <br />
              Institutional
              <br />
              <span className="text-slate-400">Knowledge</span>
            </h1>

            {/* Body */}
            <p className="text-sm sm:text-base md:text-lg text-slate-400 leading-relaxed max-w-xl">
              We started Ki-Khobor because we saw a gap between the immense data
              educational institutions generate and their ability to derive actionable
              intelligence from it. We are not just building another AI tool; we are
              building an institutional memory engine.
            </p>

            {/* Stats strip */}
            <div className="flex flex-wrap gap-8 pt-2">
              {[
                { value: "2024", label: "Founded" },
                { value: "10K+", label: "Students Served" },
                { value: "99%", label: "Uptime SLA" },
              ].map(({ value, label }) => (
                <div key={label} className="space-y-0.5">
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {value}
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-widest font-medium">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <a
                href="#why-we-build"
                className="inline-flex items-center justify-center bg-white text-slate-950 hover:bg-slate-100 font-semibold text-sm px-7 py-3.5 rounded-xl transition-all duration-300 shadow-lg active:scale-95 scroll-smooth"
              >
                Read Our Manifesto
              </a>
              <a
                href="#why-we-build"
                className="inline-flex items-center justify-center bg-white/5 hover:bg-white/10 text-white border border-white/15 font-semibold text-sm px-7 py-3.5 rounded-xl backdrop-blur-md transition-all duration-300 active:scale-95 scroll-smooth"
              >
                Our Story
              </a>
            </div>
          </div>

          {/* ─ RIGHT: Visual composition ────────────────────────────── */}
          <div
            ref={visualRef}
            className="relative flex items-center justify-start min-h-[300px] sm:min-h-[380px] lg:min-h-0 lg:h-[520px] overflow-hidden"
            style={{
              opacity: 0,
              transform: "translateY(28px)",
              transition: "opacity 0.75s ease, transform 0.75s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {/* ── OVERSIZED "KI-KHOBOR" wordmark — layered directly behind icon, left-anchored ── */}
            <div
              ref={wordmarkRef}
              className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none select-none"
              style={{
                opacity: 0,
                transition: "opacity 1.1s ease 0.25s",
              }}
              aria-hidden="true"
            >
              <span
                className="font-black uppercase text-white whitespace-nowrap block"
                style={{
                  fontSize: "clamp(40px, 7.5vw, 96px)",
                  letterSpacing: "-0.04em",
                  opacity: 0.11,
                  overflow: "hidden",
                  maxWidth: "100%",
                }}
              >
                KI-KHOBOR
              </span>
            </div>

            {/* ── ICON — foreground, offset right to reveal KI letters, interactive ── */}
            <div className="relative z-10 pl-10 sm:pl-14 md:pl-16">
              <InteractiveKIcon />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #000000)",
        }}
      />
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="bg-[#000000] text-white min-h-screen flex flex-col selection:bg-indigo-600 selection:text-white">
      {/* Shared Header Navigation */}
      <Header />

      {/* Main Canvas */}
      <main className="flex-grow">

        {/* ── NEW: Cinematic About Hero ── */}
        <AboutHero />

        {/* What is Ki-Khobor Section */}
        <section className="bg-[#000000] py-[120px] border-y border-white/10">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
              <div className="md:col-span-4 space-y-6">
                <h2 className="font-headline-md text-headline-md text-white">
                  What is Ki-Khobor?
                </h2>
                <div className="h-1 w-12 bg-indigo-500 rounded-full"></div>
              </div>

              <div className="md:col-span-8 space-y-8">
                <p className="font-body-lg text-body-lg text-slate-300">
                  At its core, Ki-Khobor is an intelligence layer designed exclusively for the rigorous demands of academia and institutional administration. It translates unstructured communication, operational data, and academic trends into clear, high-fidelity insights.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                  {/* Bento Card 1 */}
                  <div className="bg-[#0a0a0f] border border-white/10 p-6 rounded-xl space-y-4 hover:border-white/20 transition-colors">
                    <div className="w-10 h-10 bg-white/[0.05] border border-white/10 rounded-lg flex items-center justify-center text-indigo-400">
                      <span className="material-symbols-outlined">dataset</span>
                    </div>
                    <h3 className="font-label-sm text-label-sm font-semibold text-white">
                      Data Harmonization
                    </h3>
                    <p className="font-body-md text-body-md text-slate-400 text-sm">
                      Aggregating disparate data silos into a singular, cohesive institutional record.
                    </p>
                  </div>

                  {/* Bento Card 2 */}
                  <div className="bg-[#0a0a0f] border border-white/10 p-6 rounded-xl space-y-4 hover:border-white/20 transition-colors">
                    <div className="w-10 h-10 bg-white/[0.05] border border-white/10 rounded-lg flex items-center justify-center text-indigo-400">
                      <span className="material-symbols-outlined">insights</span>
                    </div>
                    <h3 className="font-label-sm text-label-sm font-semibold text-white">
                      Predictive Analytics
                    </h3>
                    <p className="font-body-md text-body-md text-slate-400 text-sm">
                      Forecasting enrollment trends, resource allocation needs, and academic outcomes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Split */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-[120px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {/* Mission */}
            <div className="border-l border-indigo-500/60 pl-8 py-4 space-y-4">
              <div className="flex items-center gap-2 text-indigo-400">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  target
                </span>
                <span className="font-mono-label text-mono-label uppercase tracking-widest">
                  Our Mission
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-white">
                Empower Educators with Clarity
              </h3>
              <p className="font-body-md text-body-md text-slate-400">
                To cut through administrative noise and deliver precise, context-aware intelligence that empowers educators and administrators to focus on what matters most: student success and institutional excellence.
              </p>
            </div>

            {/* Vision */}
            <div className="border-l border-white/15 pl-8 py-4 space-y-4">
              <div className="flex items-center gap-2 text-slate-500">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  visibility
                </span>
                <span className="font-mono-label text-mono-label uppercase tracking-widest">
                  Our Vision
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-white">
                A Sentient Infrastructure
              </h3>
              <p className="font-body-md text-body-md text-slate-400">
                We envision a future where every educational institution operates with a sentient digital infrastructure—an invisible partner that anticipates needs, optimizes resources natively, and fosters a culture of continuous learning.
              </p>
            </div>
          </div>
        </section>

        {/* Why We Are Building This (Founder's Insight) */}
        <section id="why-we-build" className="bg-[#050508] py-[120px] relative overflow-hidden border-y border-white/10 scroll-mt-20">
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          ></div>
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
            <div className="max-w-3xl mx-auto space-y-8 text-center">
              <h2 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-white">
                Why we are building this
              </h2>
              <div className="text-left bg-[#0a0a0f] border-l-[3px] border-l-indigo-500 border border-white/10 p-8 rounded-r-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <span className="material-symbols-outlined text-sm">lightbulb</span>
                  </div>
                  <span className="font-mono-label text-mono-label text-indigo-400">
                    FOUNDER'S INSIGHT
                  </span>
                </div>
                <p className="font-body-lg text-body-lg text-slate-300 italic leading-relaxed">
                  "The technology sector often treats education as an afterthought, offering repackaged enterprise tools that fail to understand the nuanced cadence of academic life. We are building Ki-Khobor to be natively institutional—designed from the ground up to respect privacy, ensure academic rigor, and integrate seamlessly into the legacy systems that hold our schools together. We build this because clarity is a right, not a luxury."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Founders Section */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-[120px] space-y-12">
          <div className="text-center space-y-4">
            <h2 className="font-headline-md text-headline-md text-white">Meet the Founders</h2>
            <p className="font-body-md text-body-md text-slate-400 max-w-xl mx-auto">
              A team bridging the gap between advanced machine learning and deep institutional experience.
            </p>
          </div>

          {/* 2-col grid: stacked on mobile, side-by-side on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Founder 1 */}
            <div className="group">
              <div className="aspect-[4/5] w-full bg-[#0a0a0f] rounded-xl overflow-hidden border border-white/10 mb-4 relative">
                <img
                  src="/DSC07285-4.png"
                  alt="Mhachen R Kithan"
                  className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <h4 className="font-label-sm text-label-sm font-semibold text-white">
                Mhachen R Kithan
              </h4>
              <p className="font-mono-label text-mono-label text-slate-500 mt-1 uppercase tracking-widest">
                Founder
              </p>
            </div>

            {/* Founder 2 */}
            <div className="group">
              <div className="aspect-[4/5] w-full bg-[#0a0a0f] rounded-xl overflow-hidden border border-white/10 mb-4 relative">
                <img
                  src="/kholi.png"
                  alt="Kohli Rudy Thongru"
                  className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <h4 className="font-label-sm text-label-sm font-semibold text-white">
                Kohli Rudy Thongru
              </h4>
              <p className="font-mono-label text-mono-label text-slate-500 mt-1 uppercase tracking-widest">
                Founder
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#000000] text-white py-[120px] border-t border-white/10">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center space-y-8">
            <h2 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-white max-w-2xl mx-auto">
              Ready to upgrade your institutional intelligence?
            </h2>
            <p className="font-body-lg text-body-lg text-slate-400 max-w-xl mx-auto">
              Join the forward-thinking institutions that are already using Ki-Khobor to transform their data into clarity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl border border-indigo-500/40 font-label-sm text-label-sm hover:bg-indigo-500 transition-colors">
                Request a Demo
              </button>
              <button className="bg-transparent text-white px-8 py-3 rounded-xl border border-white/15 font-label-sm text-label-sm hover:bg-white/5 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
