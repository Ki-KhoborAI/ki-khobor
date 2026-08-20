"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
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
                { value: "2026", label: "Founded" },
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
                href="#founder-stories"
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
                  src="/DSC09354.jpg"
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
                  src="/DSC09345.jpg"
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

        {/* ── Founder Stories Section ─────────────────────────────────────────── */}
        <section
          id="founder-stories"
          className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-[120px] space-y-8 scroll-mt-24"
          aria-label="Founder Stories"
        >
          {/* Section header */}
          <div className="text-center space-y-3 pb-4">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              <span className="font-mono-label text-mono-label uppercase tracking-widest text-slate-400 text-[10px] sm:text-xs">
                Founder Stories
              </span>
            </div>
            <h2 className="font-headline-md text-headline-md text-white">
              The people behind the product
            </h2>
            <p className="font-body-md text-body-md text-slate-400 max-w-lg mx-auto">
              Two perspectives, one shared conviction — that institutional intelligence deserves better tools.
            </p>
          </div>

          {/* ── Individual founder story cards ─── */}
          <div className="flex flex-col gap-6 sm:gap-8">

            {/* ─ Founder 1: Mhachen R Kithan ─ */}
            <article className="group bg-[#0a0a0f] border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_8px_40px_-12px_rgba(255,255,255,0.06)]">
              {/*
                Mobile: stacked (photo on top, text below)
                md+:   two-column flex (photo left ~280px, text right fills)
              */}
              <div className="flex flex-col md:flex-row">
                {/* Photo */}
                <div className="w-full md:w-[280px] md:flex-shrink-0 aspect-[4/3] md:aspect-auto md:min-h-[340px] overflow-hidden">
                  <img
                    src="/DSC09362.jpg"
                    alt="Mhachen R Kithan"
                    className="w-full h-full object-cover object-center grayscale transition-all duration-500 group-hover:grayscale-[0.4]"
                    style={{ minHeight: "200px" }}
                  />
                </div>

                {/* Text content */}
                <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10 space-y-4 flex-1">
                  {/* Label */}
                  <span className="font-mono-label text-mono-label uppercase tracking-widest text-indigo-400 text-[10px] sm:text-xs">
                    Founder
                  </span>

                  {/* Name */}
                  <h3 className="font-label-sm text-label-sm font-bold text-white text-lg sm:text-xl leading-snug">
                    Mhachen R Kithan
                  </h3>

                  {/* Divider */}
                  <div className="h-px w-10 bg-white/15" />

                  {/* Bio */}
                  <p className="font-body-md text-body-md text-slate-400 leading-relaxed text-sm sm:text-base max-w-prose">
                    I’m Mhachen Kithan, a 20-year-old computer science student and founder of Ki-Khobor. My journey into entrepreneurship started somewhat unexpectedly at the NE Tech Summit at NIELIT Kohima. It was our very first pitching experience, and honestly, we were just figuring things out as we went.
                    We didn’t have much experience, and we weren’t even sure what to expect. We just had an idea we believed in, a lot of excitement, and the courage to stand in front of people and present it.
                    Somehow, we managed to win, Crazy Right....
                    And that experience changed the way I looked at ideas. It made me realise that entrepreneurship wasn’t just about having a great idea—it was about having the courage to build it, put yourself out there, hear criticism, learn, and keep going.
                    From that first experience, I started taking entrepreneurship more seriously. I began participating in more competitions, meeting new people, working with different teams, and learning about the business side of turning an idea into something real.
                    I’m still figuring things out, and I’m still learning with every step. But somewhere along the way, I realised that I genuinely enjoy the process—the uncertainty, the challenges, the small wins, and everything in between.
                    For me, this journey is still just beginning, and I’m excited to see where it takes me.
                  </p>

                  {/* Expertise tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {["AI Research", "Product Architecture", "Data Engineering"].map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] sm:text-xs font-medium uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            {/* ─ Founder 2: Kohli Rudy Thongru ─ */}
            <article className="group bg-[#0a0a0f] border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_8px_40px_-12px_rgba(255,255,255,0.06)]">
              <div className="flex flex-col md:flex-row">
                {/* Photo */}
                <div className="w-full md:w-[280px] md:flex-shrink-0 aspect-[4/3] md:aspect-auto md:min-h-[340px] overflow-hidden">
                  <img
                    src="/DSC09349.jpg"
                    alt="Kohli Rudy Thongru"
                    className="w-full h-full object-cover object-center grayscale transition-all duration-500 group-hover:grayscale-[0.4]"
                    style={{ minHeight: "200px" }}
                  />
                </div>

                {/* Text content */}
                <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10 space-y-4 flex-1">
                  {/* Label */}
                  <span className="font-mono-label text-mono-label uppercase tracking-widest text-indigo-400 text-[10px] sm:text-xs">
                    Founder
                  </span>

                  {/* Name */}
                  <h3 className="font-label-sm text-label-sm font-bold text-white text-lg sm:text-xl leading-snug">
                    Kohli Rudy Thongru
                  </h3>

                  {/* Divider */}
                  <div className="h-px w-10 bg-white/15" />

                  {/* Bio */}
                  <p className="font-body-md text-body-md text-slate-400 leading-relaxed text-sm sm:text-base max-w-prose">
                    I’m Kohli Rudy Thongru, a 21-year-old builder, and founder of Ki-Khobor.
                    I’ve always been curious about technology, but over time that curiosity grew into an interest in startups, entrepreneurship, and turning ideas into something real. I enjoy experimenting, figuring things out, and learning by actually building rather than just talking about an idea.
                    A lot of my journey has been about trying things—working on projects, taking part in competitions, pitching ideas, organizing initiatives, and learning from the things that didn't go as planned. Each experience has made me more willing to take an idea beyond my head and actually give it a shot.
                    I know not everything I try will work. But I’d rather try, fail, and learn from it than do nothing and lose the opportunity to find out what I could have built.
                    More than anything, I want the things I build to have some meaning beyond myself. If I’m going to put my time and energy into something, I want it to benefit the people around me and contribute something to the community I come from.
                    That’s a big part of what led me to Ki-Khobor.
                    I saw a problem that students experience every day: information is often available, but finding the right information at the right time isn't always easy. Instead of just accepting that as the way things are, I wanted to try building something that could actually make it easier.
                    Ki-Khobor is still early, and there’s a lot I’m learning along the way. But that’s what I enjoy about building—trying something, learning from it, and making the next version better.
                    I don't know exactly where this journey will take me.
                    But I know I want to keep building things that are useful, keep taking chances, and hopefully leave the people around me a little better off because I tried.
                  </p>

                  {/* Expertise tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {["Strategy & GTM", "Institutional Consulting", "Systems Design"].map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] sm:text-xs font-medium uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* ── Combined founding story wide card ─────────────────────────── */}
          <div className="group bg-[#0a0a0f] border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_12px_48px_-16px_rgba(99,102,241,0.12)]">
            <div className="flex flex-col lg:flex-row">

              {/* Left: dual portrait collage */}
              <div className="w-full lg:w-[380px] lg:flex-shrink-0 relative overflow-hidden"
                style={{ minHeight: "280px" }}>
                {/* Stacked grayscale portraits */}
                {/* Single full-bleed photo */}
                <img
                  src="/DSC09379.jpg"
                  alt="Ki-Khobor founders"
                  className="absolute inset-0 w-full h-full object-cover object-center grayscale transition-all duration-700 group-hover:grayscale-[0.3]"
                />
                {/* Gradient overlay for text readability on mobile */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 40%, #0a0a0f 100%)",
                  }}
                />
                {/* "Origin Story" badge over image */}
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                  <span className="font-mono-label text-mono-label uppercase tracking-widest text-slate-300 text-[10px]">
                    Origin Story
                  </span>
                </div>
              </div>

              {/* Right: narrative text */}
              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12 space-y-5 flex-1">
                {/* Eyebrow */}
                <span className="font-mono-label text-mono-label uppercase tracking-widest text-indigo-400 text-[10px] sm:text-xs">
                  How Ki-Khobor Began
                </span>

                <h3 className="font-headline-md text-headline-md text-white text-xl sm:text-2xl leading-tight">
                  Built from conviction, not a pitch deck
                </h3>

                <div className="h-px w-12 bg-indigo-500/50" />

                <div className="space-y-4 font-body-md text-body-md text-slate-400 leading-relaxed text-sm sm:text-base max-w-prose">
                  <p>
                    Ki-Khobor started with two friends, Mhachen Kithan and Kohli Sangtam, who shared a common interest in technology, ideas, and the excitement of building something of our own.
                    Our journey into entrepreneurship wasn’t a straight path. It started with small ideas, conversations, competitions, and a lot of trial and error. Our first pitching experience at the NE Tech Summit at NIELIT Kohima was where we got our first real taste of what it meant to put an idea in front of people. Somehow, we managed to win—and that gave us the confidence to keep going.
                    Since then, we’ve had our share of wins and losses. There were competitions where we spent sleepless nights building and refining our ideas, only to walk away without the result we wanted. Vibe Coding was one of those experiences. It was disappointing after everything we had put into it, but it also reminded us that entrepreneurship isn’t always about winning. Sometimes, the lessons from losing stay with you longer.
                  </p>
                  <p>
                    Through all these experiences, we kept learning, challenging each other, trying new things, and slowly understanding what it actually takes to turn an idea into something real.
                    That journey eventually led us to Ki-Khobor.
                    We’re still students, still learning, and still figuring things out. But we’ve learned to value the process—the wins, the failures, the late nights, and everything in between.
                    And this is only the beginning.
                  </p>
                </div>

                {/* Quote callout */}
                <div className="border-l-[2px] border-indigo-500/50 pl-4 mt-2">
                  <p className="text-slate-300 italic text-sm sm:text-base leading-relaxed font-body-md text-body-md">
                    &ldquo;We didn&apos;t start with a product. We started with a problem we both
                    couldn&apos;t stop thinking about.&rdquo;
                  </p>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono-label text-mono-label mt-1 block">
                    — The Founders, Ki-Khobor
                  </span>
                </div>
              </div>
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
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-indigo-600 text-white px-8 py-3 rounded-xl border border-indigo-500/40 font-label-sm text-label-sm hover:bg-indigo-500 transition-colors"
              >
                Request a Demo
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-transparent text-white px-8 py-3 rounded-xl border border-white/15 font-label-sm text-label-sm hover:bg-white/5 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
