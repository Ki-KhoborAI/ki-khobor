"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import KiKhoborLogo from "./KiKhoborLogo";

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  const isServices = pathname === "/services";
  const isContact = pathname === "/contact";

  return (
    <>
      {/* TopAppBar */}
      <header className="w-full fixed top-0 backdrop-blur-xl bg-[#030305]/80 border-b border-white/10 z-50 transition-all duration-300">
        <div className="max-w-container-max mx-auto px-4 sm:px-8 flex justify-between items-center h-20 relative">

          {/* Logo & Home Link */}
          <Link
            href="/"
            className="flex items-center space-x-3 cursor-pointer active:opacity-80 transition-all"
          >
            <KiKhoborLogo size="sm" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center font-medium absolute left-1/2 -translate-x-1/2">
            <Link
              href="/"
              className={`text-sm font-medium transition-all ${isHome
                ? "text-white border-b-2 border-white pb-1 font-semibold"
                : "text-slate-400 hover:text-white"
                }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium transition-all ${isAbout
                ? "text-white border-b-2 border-white pb-1 font-semibold"
                : "text-slate-400 hover:text-white"
                }`}
            >
              About
            </Link>
            <Link
              href="/services"
              className={`text-sm font-medium transition-all ${isServices
                ? "text-white border-b-2 border-white pb-1 font-semibold"
                : "text-slate-400 hover:text-white"
                }`}
            >
              Services
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium transition-all ${isContact
                ? "text-white border-b-2 border-white pb-1 font-semibold"
                : "text-slate-400 hover:text-white"
                }`}
            >
              Contact
            </Link>
          </nav>


          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Menu"
            className="md:hidden text-white cursor-pointer active:opacity-70 transition-all p-2 rounded-lg hover:bg-white/10"
            id="mobile-menu-btn"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${isDrawerOpen ? "block" : "hidden"
          }`}
        id="mobile-drawer"
      >
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          id="drawer-overlay"
          onClick={() => setIsDrawerOpen(false)}
        />
        <div
          className={`h-full w-80 fixed right-0 top-0 shadow-2xl bg-[#0a0a0f] border-l border-white/10 flex flex-col p-6 space-y-6 transform transition-transform duration-300 ease-in-out ${isDrawerOpen ? "translate-x-0" : "translate-x-full"
            }`}
          id="drawer-content"
        >
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <KiKhoborLogo size="sm" />
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="text-slate-400 hover:text-white p-2"
              id="close-drawer"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          <nav className="flex flex-col space-y-2 font-medium">
            <Link
              href="/"
              onClick={() => setIsDrawerOpen(false)}
              className={`flex items-center gap-4 p-3.5 text-base rounded-xl transition-colors ${isHome
                ? "bg-white/10 text-white font-bold"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
            >
              <span className="material-symbols-outlined text-xl">home</span>
              <span>Home</span>
            </Link>

            <Link
              href="/about"
              onClick={() => setIsDrawerOpen(false)}
              className={`flex items-center gap-4 p-3.5 text-base rounded-xl transition-colors ${isAbout
                ? "bg-white/10 text-white font-bold"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
            >
              <span className="material-symbols-outlined text-xl">info</span>
              <span>About</span>
            </Link>

            <Link
              href="/services"
              onClick={() => setIsDrawerOpen(false)}
              className={`flex items-center gap-4 p-3.5 text-base rounded-xl transition-colors ${isServices
                ? "bg-white/10 text-white font-bold"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
            >
              <span className="material-symbols-outlined text-xl">bolt</span>
              <span>Services</span>
            </Link>

            <Link
              href="/contact"
              onClick={() => setIsDrawerOpen(false)}
              className={`flex items-center gap-4 p-3.5 text-base rounded-xl transition-colors ${isContact
                ? "bg-white/10 text-white font-bold"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
            >
              <span className="material-symbols-outlined text-xl">mail</span>
              <span>Contact</span>
            </Link>
          </nav>

        </div>
      </div>
    </>
  );
}
