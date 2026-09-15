"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import KiKhoborLogo from "./KiKhoborLogo";

// ─── Product URLs ────────────────────────────────────────────────────────────
const TXG_URL = "https://www.ki-khobor.com/txg-nagaland/help-desk";
const NIS_URL = "https://nis.ki-khobor.com/";
// ─────────────────────────────────────────────────────────────────────────────

interface ProductCardProps {
  children: React.ReactNode;
  isRevealed: boolean;
  onToggle: () => void;
  href?: string;
  "aria-label"?: string;
}

function ProductCard({
  children,
  isRevealed,
  onToggle,
  href,
  "aria-label": ariaLabel,
}: ProductCardProps) {
  // External URLs open in a new tab; same-origin URLs navigate in-place.
  const isExternal = typeof href === "string" && /^https?:\/\//.test(href);
  // Shared card wrapper — conditionally wraps in an <a> if href is provided
  if (href) {
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        aria-label={ariaLabel}
        className="group block w-full h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-2xl"
        // On desktop hover is handled via CSS group-hover. On touch, we rely on the
        // onPointerDown / onClick hybrid below to toggle the revealed state.
        onPointerDown={(e) => {
          if (e.pointerType === "touch") {
            // prevent navigation on first tap so user can see details first
            // only navigate on second tap (when already revealed)
            if (!isRevealed) {
              e.preventDefault();
              onToggle();
            }
            // if already revealed, let the default href navigate
          }
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      aria-expanded={isRevealed}
      className="group block w-full h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-2xl cursor-pointer"
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onToggle();
      }}
    >
      {children}
    </div>
  );
}

export default function TrustSection() {
  // Mobile-first: track which card has been tapped/revealed
  const [txgRevealed, setTxgRevealed] = useState(false);
  const [nisRevealed, setNisRevealed] = useState(false);

  const toggleTxg = useCallback(() => setTxgRevealed((v) => !v), []);
  const toggleNis = useCallback(() => setNisRevealed((v) => !v), []);

  return (
    <section id="products-services" className="py-20 sm:py-28 bg-[#050507] border-t border-white/10 text-white scroll-mt-20">
      <div className="max-w-container-max mx-auto px-4 sm:px-8">

        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-[0.3em] mb-3">
            Built by Ki-Khobor
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
            Products & Services
          </h2>
        </div>

        {/* Cards Grid — responsive two-column layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 w-full max-w-3xl">

          {/* ── Card: Ki-Khobor TXG ─────────────────────────────────────── */}
          <ProductCard
            isRevealed={txgRevealed}
            onToggle={toggleTxg}
            href={TXG_URL}
            aria-label="Ki-Khobor TXG — tap to learn more, then visit"
          >
            <div
              className={`
                relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c11]
                transition-all duration-500 ease-out h-full
                group-hover:border-white/20 group-hover:bg-[#111118]
                group-focus-visible:border-white/30
                ${txgRevealed ? "border-white/20 bg-[#111118]" : ""}
              `}
            >
              {/* Subtle inner glow on hover/reveal */}
              <div
                className={`
                  pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500
                  bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.05)_0%,_transparent_60%)]
                  opacity-0 group-hover:opacity-100 ${txgRevealed ? "opacity-100" : ""}
                `}
              />

              {/* Card content */}
              <div className="relative z-10 p-7 sm:p-8 flex flex-col h-full min-h-[320px] sm:min-h-[380px]">

                {/* Top row: logo badge + arrow */}
                <div className="flex items-start justify-between mb-8">
                  {/* TXG logo badge — fixed size so both badges match */}
                  <div className="flex items-center justify-center w-[72px] h-[56px] sm:w-[88px] sm:h-[64px] bg-white/5 border border-white/10 rounded-2xl overflow-hidden relative">
                    <img
                      src="/TXGColour.png"
                      alt="Ki-Khobor TXG logo"
                      className="max-h-[40px] sm:max-h-[48px] max-w-full w-auto object-contain"
                    />
                  </div>

                  {/* Arrow icon — animates on hover/reveal */}
                  <span
                    className={`
                      material-symbols-outlined text-slate-600 text-xl transition-all duration-300
                      group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5
                      ${txgRevealed ? "text-white translate-x-0.5 -translate-y-0.5" : ""}
                    `}
                  >
                    arrow_outward
                  </span>
                </div>

                {/* TXG product title */}
                <div className="mb-5">
                  <p className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Ki-Khobor TXG</p>
                </div>

                {/* Static tagline — always visible */}
                <p className="text-xs sm:text-sm text-slate-500 font-medium tracking-wide mb-4">
                  Smart Event & Venue Help Desk
                </p>

                {/* Reveal panel — visible on hover (desktop) or tap (mobile) */}
                <div
                  className={`
                    flex-grow flex flex-col justify-end gap-4
                    transition-all duration-500 ease-out
                    group-hover:opacity-100 group-hover:translate-y-0
                    ${txgRevealed
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-3 md:opacity-0 md:translate-y-3"
                    }
                    md:opacity-0 md:translate-y-3 md:group-hover:opacity-100 md:group-hover:translate-y-0
                  `}
                >
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    TXG Help Desk is a smart, phone-first information platform designed to help visitors ask, discover, and navigate TXG — from event schedules and venues to FAQs, transportation, and real-time event updates, powered by Ki-Khobor.
                  </p>

                  {/* Feature chips */}
                  <div className="flex flex-wrap gap-2">
                    {["Event Schedules", "Venue Navigation", "Real-Time Updates", "Phone-First"].map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] sm:text-xs text-slate-400 border border-white/10 rounded-full px-2.5 py-1 bg-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Visit CTA — shown on mobile after reveal */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mt-1 md:hidden">
                    <span className="material-symbols-outlined text-base">touch_app</span>
                    <span>Tap again to visit TXG</span>
                  </div>
                </div>

                {/* Mobile tap hint — shown when NOT revealed */}
                <div
                  className={`
                    flex items-center gap-1.5 text-xs text-slate-600 mt-auto pt-4 md:hidden
                    transition-opacity duration-300
                    ${txgRevealed ? "opacity-0 pointer-events-none" : "opacity-100"}
                  `}
                >
                  <span className="material-symbols-outlined text-base">touch_app</span>
                  <span>Tap to learn more</span>
                </div>
              </div>
            </div>
          </ProductCard>

          {/* ── Card: NIS 2026 ───────────────────────────────────────────── */}
          <ProductCard
            isRevealed={nisRevealed}
            onToggle={toggleNis}
            href={NIS_URL}
            aria-label="ki-Khobor NIS  — tap to learn more, then visit"
          >
            <div
              className={`
                relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c11]
                transition-all duration-500 ease-out h-full
                group-hover:border-white/20 group-hover:bg-[#111118]
                group-focus-visible:border-white/30
                ${nisRevealed ? "border-white/20 bg-[#111118]" : ""}
              `}
            >
              {/* Subtle inner glow on hover/reveal */}
              <div
                className={`
                  pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500
                  bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.05)_0%,_transparent_60%)]
                  opacity-0 group-hover:opacity-100 ${nisRevealed ? "opacity-100" : ""}
                `}
              />

              {/* Card content */}
              <div className="relative z-10 p-7 sm:p-8 flex flex-col h-full min-h-[320px] sm:min-h-[380px]">

                {/* Top row: logo badge + arrow */}
                <div className="flex items-start justify-between mb-8">
                  {/* NIS logo badge — fixed size so both badges match */}
                  {/* nis-logo.png: no-space filename for Linux/Vercel compatibility */}
                  <div className="flex items-center justify-center w-[72px] h-[56px] sm:w-[88px] sm:h-[64px] bg-white/5 border border-white/10 rounded-2xl overflow-hidden relative">
                    <img
                      src="/nis-logo.png"
                      alt="NIS 2026 logo"
                      className="w-full h-full object-contain"
                      style={{ mixBlendMode: "multiply" }}
                    />
                  </div>

                  {/* Arrow icon — animates on hover/reveal */}
                  <span
                    className={`
                      material-symbols-outlined text-slate-600 text-xl transition-all duration-300
                      group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5
                      ${nisRevealed ? "text-white translate-x-0.5 -translate-y-0.5" : ""}
                    `}
                  >
                    arrow_outward
                  </span>
                </div>

                {/* NIS product title */}
                <div className="mb-5">
                  <p className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Ki-Khobor NIS</p>
                </div>

                {/* Static tagline — always visible */}
                <p className="text-xs sm:text-sm text-slate-500 font-medium tracking-wide mb-4">
                  Nagaland Influencers Summit
                </p>

                {/* Reveal panel — visible on hover (desktop) or tap (mobile) */}
                <div
                  className={`
                    flex-grow flex flex-col justify-end gap-4
                    transition-all duration-500 ease-out
                    group-hover:opacity-100 group-hover:translate-y-0
                    ${nisRevealed
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-3 md:opacity-0 md:translate-y-3"
                    }
                    md:opacity-0 md:translate-y-3 md:group-hover:opacity-100 md:group-hover:translate-y-0
                  `}
                >
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    A two-day creator-focused summit bringing together influencers, artists, performers, entrepreneurs and young creatives to connect, learn, collaborate and create meaningful impact beyond social media. Featuring workshops, panel discussions, networking, live performances, a concert and the NIS Awards 2026.
                  </p>

                  {/* Feature chips */}
                  <div className="flex flex-wrap gap-2">
                    {["Creators", "Networking", "Workshops", "NIS Awards"].map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] sm:text-xs text-slate-400 border border-white/10 rounded-full px-2.5 py-1 bg-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Visit CTA — shown on mobile after reveal */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mt-1 md:hidden">
                    <span className="material-symbols-outlined text-base">touch_app</span>
                    <span>Tap again to visit NIS 2026</span>
                  </div>
                </div>

                {/* Mobile tap hint — shown when NOT revealed */}
                <div
                  className={`
                    flex items-center gap-1.5 text-xs text-slate-600 mt-auto pt-4 md:hidden
                    transition-opacity duration-300
                    ${nisRevealed ? "opacity-0 pointer-events-none" : "opacity-100"}
                  `}
                >
                  <span className="material-symbols-outlined text-base">touch_app</span>
                  <span>Tap to learn more</span>
                </div>
              </div>
            </div>
          </ProductCard>

        </div>
      </div>
    </section>
  );
}
