"use client";

import React from "react";
import KiKhoborLogo from "./KiKhoborLogo";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#030305] text-white border-t border-white/10 w-full py-16">
      <div className="max-w-container-max mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Main Column */}
        <div className="col-span-1 md:col-span-2">
          <div className="mb-4">
            <KiKhoborLogo size="sm" />
          </div>
          <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
            © {new Date().getFullYear()} Ki-Khobor. Intelligence for Institutions. Building the next generation of academic infrastructure.
          </p>
        </div>

        {/* Legal Column */}
        <div className="flex flex-col space-y-3 text-sm">
          <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-widest mb-1">
            Legal
          </h5>
          <Link
            className="text-slate-400 hover:text-white transition-colors"
            href="#"
          >
            Privacy Policy
          </Link>
          <Link
            className="text-slate-400 hover:text-white transition-colors"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-slate-400 hover:text-white transition-colors"
            href="#"
          >
            Security
          </Link>
        </div>

        {/* Access Column */}
        <div className="flex flex-col space-y-3 text-sm">
          <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-widest mb-1">
            Access
          </h5>
          <Link
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
            href="/contact"
          >
            <span className="material-symbols-outlined text-base">login</span>
            Institutional Login
          </Link>
        </div>

      </div>
    </footer>
  );
}
