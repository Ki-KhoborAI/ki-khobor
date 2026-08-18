"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  icon: string;
  tags: string[];
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "ai-development",
    number: "01",
    title: "AI Development",
    shortDesc:
      "Architecting bespoke, intelligent systems engineered specifically for institutional knowledge, workflows, and academic rigor.",
    icon: "psychology",
    tags: [
      "AI-powered institutional solutions",
      "Custom AI assistants",
      "Intelligent automation",
    ],
  },
  {
    id: "ai-integration",
    number: "02",
    title: "AI Integration",
    shortDesc:
      "Seamlessly embedding advanced language models and cognitive search into existing campus databases and ERPs.",
    icon: "hub",
    tags: [
      "Integrating AI into existing institutional workflows",
      "API and platform integration",
      "AI-powered information systems",
    ],
  },
  {
    id: "institutional-automation",
    number: "03",
    title: "Institutional Automation",
    shortDesc:
      "Eliminating repetitive inquiry bottlenecks and streamlining complex administrative workflows with zero data loss.",
    icon: "auto_mode",
    tags: [
      "Automating repetitive institutional processes",
      "Improving operational efficiency",
      "Reducing manual workload",
    ],
  },
  {
    id: "ai-consulting",
    number: "04",
    title: "AI Consulting",
    shortDesc:
      "Providing strategic roadmaps, compliance audits, and pragmatic AI implementation blueprints for academic leadership.",
    icon: "insights",
    tags: [
      "AI strategy",
      "Digital transformation",
      "Identifying practical AI use cases",
    ],
  },
];

export default function ServicesPage() {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const handleCardTouch = (id: string) => {
    setActiveCardId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-[#000000] text-white min-h-screen flex flex-col selection:bg-indigo-600 selection:text-white">
      {/* Shared Header Navigation */}
      <Header />

      {/* Main Services Canvas */}
      <main className="flex-grow pt-28 pb-20 md:pt-36 md:pb-28 overflow-x-hidden">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-8">
          
          {/* ─── Hero / Header Section ────────────────────────────────────────── */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 md:pb-20 border-b border-white/10">
            {/* Introductory Heading */}
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-slate-400 mb-3 tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                Institutional Capabilities
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.15]">
                <span className="block font-bold text-white tracking-tight">
                  AI Solutions that
                </span>
                <span className="block font-serif italic font-normal text-slate-400 sm:mt-1">
                  are built for institutions.
                </span>
              </h1>
            </div>

            {/* View Projects Button */}
            <div className="flex-shrink-0 pt-2 md:pt-0">
              <Link
                href="/#products-services"
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-white/30 text-xs sm:text-sm font-medium text-slate-200 hover:text-white transition-all duration-300 shadow-sm hover:shadow-[0_0_25px_rgba(255,255,255,0.12)] active:scale-95 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                id="view-projects-btn"
                aria-label="View Projects and Products"
              >
                <span>View Projects</span>
                <span className="material-symbols-outlined text-base sm:text-lg text-slate-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                  north_east
                </span>
              </Link>
            </div>
          </div>

          {/* ─── Services Grid ─────────────────────────────────────────────────── */}
          <div className="pt-10 sm:pt-14 md:pt-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {SERVICES_DATA.map((service, index) => {
                const isActive = activeCardId === service.id;

                return (
                  <div
                    key={service.id}
                    onClick={() => handleCardTouch(service.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleCardTouch(service.id);
                      }
                    }}
                    style={{ animationDelay: `${index * 120}ms` }}
                    className={`
                      animate-fade-in-up
                      group relative flex flex-col justify-between
                      min-h-[420px] sm:min-h-[440px] md:min-h-[460px]
                      p-6 sm:p-7 rounded-2xl sm:rounded-3xl
                      bg-[#0a0a0f] border
                      transition-all duration-300 ease-out cursor-pointer
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
                      ${
                        isActive
                          ? "border-white/30 bg-[#12121c] -translate-y-1.5 shadow-[0_16px_40px_-12px_rgba(79,70,229,0.25)]"
                          : "border-white/[0.08] hover:border-white/20 hover:bg-[#0e0e16] hover:-translate-y-1.5 hover:shadow-[0_16px_40px_-12px_rgba(79,70,229,0.18)]"
                      }
                    `}
                  >
                    {/* Ambient Glow Gradient inside card */}
                    <div
                      className={`
                        pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl
                        bg-gradient-to-b from-indigo-500/[0.07] via-transparent to-transparent
                        transition-opacity duration-300
                        ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                      `}
                    />

                    {/* Top Section: Service Number & Icon */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.06]">
                        {/* Service Number */}
                        <span className="font-mono text-sm sm:text-base font-semibold text-slate-500 group-hover:text-indigo-400 transition-colors">
                          {service.number}
                        </span>

                        {/* Service Icon */}
                        <div
                          className={`
                            w-10 h-10 rounded-xl flex items-center justify-center
                            border transition-all duration-300
                            ${
                              isActive
                                ? "bg-indigo-600/20 border-indigo-500/40 text-indigo-300"
                                : "bg-white/[0.03] border-white/10 text-slate-400 group-hover:text-white group-hover:border-white/20 group-hover:bg-white/[0.07]"
                            }
                          `}
                        >
                          <span className="material-symbols-outlined text-xl">
                            {service.icon}
                          </span>
                        </div>
                      </div>

                      {/* Service Title */}
                      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-3 group-hover:text-indigo-200 transition-colors">
                        {service.title}
                      </h2>

                      {/* Service Short Description */}
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {service.shortDesc}
                      </p>
                    </div>

                    {/* Bottom Section: Capability Tag Pills */}
                    <div className="relative z-10 pt-6 mt-6 border-t border-white/[0.06]">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-3">
                        Capabilities
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.tags.map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className={`
                              text-xs px-2.5 py-1 rounded-md transition-all duration-200
                              ${
                                isActive
                                  ? "bg-white/10 text-slate-200 border border-white/20"
                                  : "bg-white/[0.03] text-slate-400 border border-white/[0.06] group-hover:border-white/15 group-hover:text-slate-300"
                              }
                            `}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ─── Bottom CTA Strip ──────────────────────────────────────────────── */}
          <div className="mt-20 sm:mt-28 p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#0e0e16] to-[#08080c] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-xl">
              <p className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-2">
                Deploy Institutional AI
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Ready to transform campus intelligence?
              </h3>
              <p className="text-sm text-slate-400 mt-2">
                Partner with Ki-Khobor to design customized, hallucination-free AI architectures for your institution.
              </p>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-semibold text-sm transition-all shadow-lg active:scale-95"
              >
                Schedule a Consultation
              </Link>
            </div>
          </div>

        </div>
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
