"use client";

import React, { useState } from "react";
import {
  Search,
  Sparkles,
  Globe,
  Sun,
  Moon,
  Menu,
  X,
  Volume2,
  BellRing,
  Newspaper,
  Radio,
  Bookmark,
  ChevronDown
} from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");
  const [isLangOpen, setIsLangOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-effect border-b border-slate-200/80 dark:border-slate-800/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center space-x-3">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-orange-500 rounded-xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative px-3.5 py-2 bg-slate-900 text-white rounded-xl flex items-center space-x-2 border border-slate-700/50">
                <Newspaper className="w-6 h-6 text-sky-400 animate-pulse" />
                <span className="font-display font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-sky-200 bg-clip-text text-transparent">
                  Ki-Khobor
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-sky-500/20 text-sky-400 border border-sky-400/30 rounded-md tracking-wide uppercase">
                  AI
                </span>
              </div>
            </div>

            {/* Live Indicator */}
            <div className="hidden lg:flex items-center space-x-2 px-2.5 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>LIVE FEED</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-6 text-sm font-medium">
            <a
              href="#top"
              className="text-sky-600 dark:text-sky-400 font-semibold px-3 py-2 rounded-lg bg-sky-500/10 dark:bg-sky-500/20"
            >
              Top Headlines
            </a>
            <a
              href="#regional"
              className="text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors px-2 py-1.5"
            >
              Northeast
            </a>
            <a
              href="#tech"
              className="text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors px-2 py-1.5 flex items-center space-x-1"
            >
              <span>Tech & AI</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </a>
            <a
              href="#business"
              className="text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors px-2 py-1.5"
            >
              Business
            </a>
            <a
              href="#factcheck"
              className="text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors px-2 py-1.5"
            >
              Fact-Check
            </a>
          </nav>

          {/* Search Bar & Actions */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Search Input Box */}
            <div className="relative group">
              <input
                type="text"
                placeholder="Search AI summaries, topic..."
                className="w-44 md:w-56 lg:w-64 pl-9 pr-8 py-2 text-xs md:text-sm bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 rounded-full border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <kbd className="hidden lg:inline-block absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-200 dark:bg-slate-700 rounded">
                ⌘K
              </kbd>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors flex items-center space-x-1 text-xs font-medium border border-slate-200 dark:border-slate-700"
                title="Change Language"
              >
                <Globe className="w-4 h-4 text-sky-500" />
                <span className="hidden lg:inline">{selectedLang}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-1.5 z-50">
                  {["English", "Assamese", "Bengali", "Nagamese"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setSelectedLang(lang);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-1.5 text-xs font-medium hover:bg-sky-50 dark:hover:bg-slate-700/60 ${
                        selectedLang === lang ? "text-sky-600 dark:text-sky-400 font-bold" : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* AI Audio Podcast Button */}
            <button
              className="p-2.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-full hover:shadow-lg hover:shadow-sky-500/25 transition-all transform active:scale-95"
              title="Listen to 60s Daily Audio Brief"
            >
              <Volume2 className="w-4 h-4" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors border border-slate-200 dark:border-slate-700"
              title="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-slate-600 dark:text-slate-300"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 text-slate-700 dark:text-slate-200 rounded-xl bg-slate-100 dark:bg-slate-800"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg px-4 pt-3 pb-6 space-y-3">
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Search AI summaries..."
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <a
            href="#top"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400"
          >
            Top Headlines
          </a>
          <a
            href="#regional"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            Northeast Updates
          </a>
          <a
            href="#tech"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            Tech & AI Spotlight
          </a>
          <a
            href="#business"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            Business & Finance
          </a>
          <a
            href="#factcheck"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            Verified Fact Check
          </a>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500">Language: {selectedLang}</span>
            <div className="flex space-x-1">
              {["English", "Assamese", "Bengali"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLang(lang)}
                  className={`px-2 py-1 text-xs rounded ${selectedLang === lang ? "bg-sky-500 text-white font-bold" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"}`}
                >
                  {lang.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
