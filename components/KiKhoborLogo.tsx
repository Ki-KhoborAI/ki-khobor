"use client";

import React from "react";

interface KiKhoborLogoProps {
  className?: string;
  iconOnly?: boolean;
  textColor?: string;
  iconColor?: string;
  iconSrc?: string;
  size?: "sm" | "md" | "lg" | "xl" | "hero";
}

export default function KiKhoborLogo({
  className = "",
  iconOnly = false,
  textColor = "text-white",
  iconColor = "text-white",
  iconSrc = "/whiteicon.png",
  size = "md",
}: KiKhoborLogoProps) {
  const sizeClasses = {
    sm: "h-8 text-lg sm:text-xl gap-3",
    md: "h-10 text-xl sm:text-2xl gap-4",
    lg: "h-14 text-2xl sm:text-3xl gap-5",
    xl: "h-20 text-3xl sm:text-4xl md:text-5xl gap-6",
    hero: "h-20 sm:h-28 md:h-36 lg:h-44 text-2xl sm:text-4xl md:text-5xl gap-4 sm:gap-7",
  };

  const currentSizeClass = sizeClasses[size] || sizeClasses.md;

  return (
    <div className={`inline-flex items-center select-none ${currentSizeClass} ${className}`}>
      <img
        src={iconSrc}
        alt="Ki-Khobor icon"
        className="h-full w-auto max-w-full shrink-0 object-contain"
      />

      {!iconOnly && (
        <span
          className={`font-bold tracking-[0.25em] sm:tracking-[0.3em] uppercase font-sans whitespace-nowrap ${textColor}`}
        >

        </span>
      )}
    </div>
  );
}