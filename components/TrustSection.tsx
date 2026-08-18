"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import KiKhoborLogo from "./KiKhoborLogo";

// ─── Product URLs ────────────────────────────────────────────────────────────
const TETSO_URL = "https://ki-khobor-tetso-p9yq.vercel.app/";
const TXG_URL = "PRODUCT_2_LINK";
// ─────────────────────────────────────────────────────────────────────────────

// Inline SVG sub-brand mark for "TETSO"
function TetsoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Tetso wordmark"
    >
      {/* T */}
      <rect x="0" y="8" width="52" height="10" rx="5" fill="currentColor" />
      <rect x="21" y="8" width="10" height="64" rx="5" fill="currentColor" />
      {/* E */}
      <rect x="62" y="8" width="10" height="64" rx="5" fill="currentColor" />
      <rect x="62" y="8" width="44" height="10" rx="5" fill="currentColor" />
      <rect x="62" y="35" width="36" height="9" rx="4.5" fill="currentColor" />
      <rect x="62" y="62" width="44" height="10" rx="5" fill="currentColor" />
      {/* T */}
      <rect x="118" y="8" width="52" height="10" rx="5" fill="currentColor" />
      <rect x="139" y="8" width="10" height="64" rx="5" fill="currentColor" />
      {/* S */}
      <path
        d="M 180 42 C 180 35 186 30 195 30 H 214 C 221 30 226 25 226 18 C 226 11 221 8 214 8 H 180"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 226 38 C 226 45 220 50 211 50 H 192 C 185 50 180 55 180 62 C 180 69 185 72 192 72 H 226"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />
      {/* O */}
      <rect x="240" y="8" width="10" height="64" rx="5" fill="currentColor" />
      <rect x="300" y="8" width="10" height="64" rx="5" fill="currentColor" />
      <rect x="240" y="8" width="70" height="10" rx="5" fill="currentColor" />
      <rect x="240" y="62" width="70" height="10" rx="5" fill="currentColor" />
    </svg>
  );
}

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
  // Shared card wrapper — conditionally wraps in an <a> if href is provided
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className="group block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-2xl"
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
      className="group block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-2xl cursor-pointer"
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
  const [tetsoRevealed, setTetsoRevealed] = useState(false);
  const [txgRevealed, setTxgRevealed] = useState(false);

  const toggleTetso = useCallback(() => setTetsoRevealed((v) => !v), []);
  const toggleTxg = useCallback(() => setTxgRevealed((v) => !v), []);

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

        {/* Cards Grid — stacked on mobile, 2-col on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

          {/* ── Card 1: Ki-Khobor Tetso ──────────────────────────────────── */}
          <ProductCard
            isRevealed={tetsoRevealed}
            onToggle={toggleTetso}
            href={TETSO_URL}
            aria-label="Ki-Khobor Tetso — tap to learn more, then visit"
          >
            <div
              className={`
                relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c11]
                transition-all duration-500 ease-out min-h-[280px] sm:min-h-[320px]
                group-hover:border-white/20 group-hover:bg-[#111118]
                group-focus-visible:border-white/30
                ${tetsoRevealed ? "border-white/20 bg-[#111118]" : ""}
              `}
            >
              {/* Subtle inner glow on hover/reveal */}
              <div
                className={`
                  pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500
                  bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.05)_0%,_transparent_60%)]
                  opacity-0 group-hover:opacity-100 ${tetsoRevealed ? "opacity-100" : ""}
                `}
              />

              {/* Card content */}
              <div className="relative z-10 p-7 sm:p-8 flex flex-col h-full min-h-[280px] sm:min-h-[320px]">

                {/* Top row: logo badge + arrow */}
                <div className="flex items-start justify-between mb-8">
                  {/* Tetso logo badge */}
                  <div className="inline-flex items-center bg-white/5 border border-white/10 rounded-2xl px-3 py-2">
                    <img
                      src="/kikhoboroldlogo.png"
                      alt="Ki-Khobor Tetso logo"
                      className="h-10 sm:h-12 w-auto object-contain"
                    />
                  </div>

                  {/* Arrow icon — animates on hover/reveal */}
                  <span
                    className={`
                      material-symbols-outlined text-slate-600 text-xl transition-all duration-300
                      group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5
                      ${tetsoRevealed ? "text-white translate-x-0.5 -translate-y-0.5" : ""}
                    `}
                  >
                    arrow_outward
                  </span>
                </div>

                {/* Product title */}
                <div className="mb-5">
                  <p className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Ki-Khobor Tetso</p>
                </div>

                {/* Static tagline — always visible */}
                <p className="text-xs sm:text-sm text-slate-500 font-medium tracking-wide mb-4">
                  Institutional Intelligence Platform
                </p>

                {/* Reveal panel — visible on hover (desktop) or tap (mobile) */}
                <div
                  className={`
                    flex-grow flex flex-col justify-end gap-4
                    transition-all duration-500 ease-out
                    group-hover:opacity-100 group-hover:translate-y-0
                    ${tetsoRevealed
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-3 md:opacity-0 md:translate-y-3"
                    }
                    md:opacity-0 md:translate-y-3 md:group-hover:opacity-100 md:group-hover:translate-y-0
                  `}
                >
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    Ki-Khobor Tetso College is a locally built, AI-powered information platform designed to make verified campus and event information easier to access. It provides relevant answers from trusted institutional sources, helping students and visitors ask, discover, and navigate with confidence.
                  </p>

                  {/* Feature chips */}
                  <div className="flex flex-wrap gap-2">
                    {["AI-Powered", "Verified Sources", "Campus Intelligence", "Zero Hallucinations"].map((tag) => (
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
                    <span>Tap again to visit Tetso</span>
                  </div>
                </div>

                {/* Mobile tap hint — shown when NOT revealed */}
                <div
                  className={`
                    flex items-center gap-1.5 text-xs text-slate-600 mt-auto pt-4 md:hidden
                    transition-opacity duration-300
                    ${tetsoRevealed ? "opacity-0 pointer-events-none" : "opacity-100"}
                  `}
                >
                  <span className="material-symbols-outlined text-base">touch_app</span>
                  <span>Tap to learn more</span>
                </div>
              </div>
            </div>
          </ProductCard>

          {/* ── Card 2: Ki-Khobor TXG ─────────────────────────────────────── */}
          <ProductCard
            isRevealed={txgRevealed}
            onToggle={toggleTxg}
            href={TXG_URL}
            aria-label="Ki-Khobor TXG — tap to learn more, then visit"
          >
            <div
              className={`
                relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c11]
                transition-all duration-500 ease-out min-h-[280px] sm:min-h-[320px]
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
              <div className="relative z-10 p-7 sm:p-8 flex flex-col h-full min-h-[280px] sm:min-h-[320px]">

                {/* Top row: logo badge + arrow */}
                <div className="flex items-start justify-between mb-8">
                  {/* TXG logo badge */}
                  <div className="inline-flex items-center bg-white/5 border border-white/10 rounded-2xl px-3 py-2">
                    <img
                      src="/TXGColour.png"
                      alt="Ki-Khobor TXG logo"
                      className="h-10 sm:h-12 w-auto object-contain"
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

        </div>
      </div>
    </section>
  );
}
