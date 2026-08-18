"use client";

import React, { useEffect, useRef, useState } from "react";
import KiKhoborLogo from "./KiKhoborLogo";
import Link from "next/link";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const ambientCoreRef = useRef<HTMLDivElement>(null);
  const logoHaloRef = useRef<HTMLDivElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Position tracking using refs to avoid React re-renders during 60fps touch/pointer drag
  const posRef = useRef({
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    currentOpacity: 0.7,
    targetOpacity: 0.7,
    isInteracting: false,
    initialized: false,
  });

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    // Initialize target & current position at container center
    const rect = heroEl.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    posRef.current.currentX = centerX;
    posRef.current.currentY = centerY;
    posRef.current.targetX = centerX;
    posRef.current.targetY = centerY;
    posRef.current.initialized = true;

    let animFrameId: number;

    // Animation Loop with smooth lerp (linear interpolation)
    const render = () => {
      const pos = posRef.current;

      // Magnetic lerp factor: smooth weight, settle without jitter
      const ease = pos.isInteracting ? 0.08 : 0.045;
      pos.currentX += (pos.targetX - pos.currentX) * ease;
      pos.currentY += (pos.targetY - pos.currentY) * ease;
      pos.currentOpacity += (pos.targetOpacity - pos.currentOpacity) * 0.06;

      // Update primary diffused light layer transform directly via DOM
      if (lightRef.current) {
        lightRef.current.style.transform = `translate3d(${pos.currentX}px, ${pos.currentY}px, 0) translate(-50%, -50%)`;
        lightRef.current.style.opacity = pos.currentOpacity.toFixed(3);
      }

      // Update inner core light transform
      if (ambientCoreRef.current) {
        ambientCoreRef.current.style.transform = `translate3d(${pos.currentX}px, ${pos.currentY}px, 0) translate(-50%, -50%)`;
      }

      // Calculate distance to center to illuminate the logo halo smoothly as light approaches
      if (logoHaloRef.current && heroRef.current) {
        const hRect = heroRef.current.getBoundingClientRect();
        const cX = hRect.width / 2;
        const cY = hRect.height / 2;
        const distance = Math.hypot(pos.currentX - cX, pos.currentY - cY);
        const maxDist = Math.hypot(cX, cY) || 1;
        const proximity = Math.max(0, 1 - distance / (maxDist * 0.55));
        const glowOpacity = 0.25 + proximity * 0.55;
        logoHaloRef.current.style.opacity = glowOpacity.toFixed(3);
      }

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    // Update center position on window resize
    const handleResize = () => {
      if (!heroRef.current) return;
      const r = heroRef.current.getBoundingClientRect();
      if (!posRef.current.isInteracting) {
        posRef.current.targetX = r.width / 2;
        posRef.current.targetY = r.height / 2;
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Pointer event handlers (Unified touch + mouse handling)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    posRef.current.targetX = x;
    posRef.current.targetY = y;
    posRef.current.targetOpacity = 0.95; // Brighter when finger/mouse touches
    posRef.current.isInteracting = true;

    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  const handlePointerLeave = () => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    // Smoothly fade back toward visual center
    posRef.current.targetX = rect.width / 2;
    posRef.current.targetY = rect.height / 2;
    posRef.current.targetOpacity = 0.65;
    posRef.current.isInteracting = false;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0 && heroRef.current) {
      const touch = e.touches[0];
      const rect = heroRef.current.getBoundingClientRect();
      posRef.current.targetX = touch.clientX - rect.left;
      posRef.current.targetY = touch.clientY - rect.top;
      posRef.current.targetOpacity = 0.95;
      posRef.current.isInteracting = true;
      if (!hasInteracted) setHasInteracted(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0 && heroRef.current) {
      const touch = e.touches[0];
      const rect = heroRef.current.getBoundingClientRect();
      posRef.current.targetX = touch.clientX - rect.left;
      posRef.current.targetY = touch.clientY - rect.top;
      posRef.current.targetOpacity = 0.95;
      posRef.current.isInteracting = true;
    }
  };

  const handleTouchEnd = () => {
    handlePointerLeave();
  };

  return (
    <section
      ref={heroRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className="relative w-full min-h-[92vh] sm:min-h-screen bg-[#030305] text-white flex flex-col justify-between items-center overflow-hidden touch-pan-y select-none pt-24 pb-16 px-4 sm:px-8"
      style={{ touchAction: "pan-y" }} // Mobile-first: ensure vertical scrolling is smooth
    >
      {/* Background Subtle Ambient Grid */}
      <div
        className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none"
        aria-hidden="true"
      />

      {/* Outer Soft Ambient Lighting (Large Radial Gradient) */}
      <div
        ref={lightRef}
        className="pointer-events-none absolute left-0 top-0 rounded-full will-change-transform z-0"
        style={{
          width: "min(90vw, 750px)",
          height: "min(90vw, 750px)",
          background: `
            radial-gradient(circle at center, 
              rgba(255, 255, 255, 0) 0%, 
              rgba(220, 235, 255, 0) 25%, 
              rgba(140, 171, 255, 0) 50%, 
              rgba(60, 90, 200, 0) 75%, 
              rgba(0, 0, 0, 0) 100%
            )
          `,
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />

      {/* Inner Core Bright Glow Layer */}
      <div
        ref={ambientCoreRef}
        className="pointer-events-none absolute left-0 top-0 rounded-full will-change-transform z-0"
        style={{
          width: "min(50vw, 380px)",
          height: "min(50vw, 380px)",
          background: `radial-gradient(circle at center, rgba(255, 255, 255, 0.28) 0%, rgba(200, 220, 255, 0.08) 55%, rgba(0, 0, 0, 0) 85%)`,
          filter: "blur(20px)",
        }}
        aria-hidden="true"
      />

      {/* Top Tagline Badge */}
      <div className="relative z-10 pt-4 sm:pt-8 text-center animate-fade-in">
        <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full px-4 py-1.5 shadow-2xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs sm:text-sm font-medium tracking-wide text-slate-300">
            Ki-Khobor Intelligence Platform
          </span>
        </div>
      </div>

      {/* Visual Center: Ki-Khobor Logo + Interactive Halo */}
      <div className="relative z-10 my-auto py-12 flex flex-col items-center justify-center text-center max-w-4xl mx-auto w-full">
        {/* Soft Stationary Halo behind Logo */}
        <div
          ref={logoHaloRef}
          className="absolute inset-0 -m-12 rounded-full pointer-events-none transition-opacity duration-300 z-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.08) 45%, transparent 75%)",
            filter: "blur(50px)",
          }}
          aria-hidden="true"
        />

        {/* Primary Focal Point: Official Ki-Khobor Logo */}
        <div className="relative z-10 transform hover:scale-[1.02] transition-transform duration-500 ease-out">
          <KiKhoborLogo size="hero" iconSrc="/7.png" />
        </div>

        {/* Hero Subtitle */}
        <p className="mt-8 sm:mt-10 text-base sm:text-lg md:text-xl text-slate-400 font-normal max-w-2xl mx-auto leading-relaxed px-4 tracking-wide font-sans">
          Next-generation intelligence for institutions. Making knowledge universally accessible and administrative services structurally smarter.
        </p>

        {/* Call to Action Buttons */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full px-4 max-w-md sm:max-w-none">
          <Link
            href="/contact"
            className="w-full sm:w-auto min-w-[180px] bg-white text-slate-950 hover:bg-slate-100 font-semibold text-sm sm:text-base px-8 py-3.5 sm:py-4 rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] active:scale-95 text-center"
          >
            Talk to Us
          </Link>
          <Link
            href="/services"
            className="w-full sm:w-auto min-w-[180px] bg-white/5 hover:bg-white/10 text-white border border-white/15 font-semibold text-sm sm:text-base px-8 py-3.5 sm:py-4 rounded-xl backdrop-blur-md transition-all duration-300 active:scale-95 text-center"
          >
            Explore Services
          </Link>
        </div>
      </div>

      {/* Interactive Micro-Hint at Bottom */}
      <div className="relative z-10 pb-4 text-center pointer-events-none">
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium tracking-wide">
          <span className="material-symbols-outlined text-base text-slate-400 animate-bounce">
            touch_app
          </span>
          <span>
            {hasInteracted
              ? "Light follows your finger"
              : "Drag or slide your finger across to illuminate"}
          </span>
        </div>
      </div>
    </section>
  );
}
