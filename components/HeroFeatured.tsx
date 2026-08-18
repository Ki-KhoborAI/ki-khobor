"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Play,
  Share2,
  Bookmark,
  CheckCircle2,
  Clock,
  Eye,
  TrendingUp,
  ArrowRight,
  Volume2
} from "lucide-react";

export default function HeroFeatured() {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <section className="relative my-6 md:my-8">
      <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 text-white relative">
        
        {/* Background Decorative Blur & Gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0 relative z-10">
          
          {/* Main Hero Media / Image */}
          <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[400px] lg:min-h-[480px] bg-slate-800 flex items-end p-6 sm:p-8">
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80"
              alt="Northeast AI & Infrastructure"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-85 hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>

            {/* Badges on Top Left of Image */}
            <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-20">
              <span className="px-3 py-1 bg-sky-500 text-white text-xs font-bold rounded-full tracking-wide shadow-lg uppercase flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Featured Spotlight</span>
              </span>
              <span className="px-3 py-1 bg-emerald-500/80 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-emerald-400/30 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Source</span>
              </span>
            </div>

            {/* Title & Metadata Over Image */}
            <div className="relative z-20 space-y-3">
              <div className="flex items-center space-x-4 text-xs text-sky-300 font-mono">
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-sky-400" />
                  <span>Updated 15 mins ago</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Eye className="w-3.5 h-3.5 text-sky-400" />
                  <span>14.2k Views</span>
                </span>
                <span>•</span>
                <span>4 min read</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold leading-tight text-white tracking-tight hover:text-sky-200 transition-colors">
                Northeast Tech Corridor Unveils Next-Gen AI Grid for Real-Time Disaster & Economic Intelligence
              </h1>

              <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center font-bold text-sm shadow-md">
                    KK
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Ki-Khobor Special Report</p>
                    <p className="text-[11px] text-slate-400">By Ananya Das & AI Newsdesk</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`p-2.5 rounded-xl border transition-all ${
                      isBookmarked
                        ? "bg-sky-500 text-white border-sky-400"
                        : "bg-slate-900/80 text-slate-300 border-slate-700 hover:text-white"
                    }`}
                    title="Bookmark Story"
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>
                  <button
                    className="p-2.5 bg-slate-900/80 text-slate-300 border border-slate-700 hover:text-white rounded-xl transition-all"
                    title="Share Story"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* AI Bullet Key Summary Column */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-slate-900/90 border-t lg:border-t-0 lg:border-l border-slate-800">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-sky-500/20 text-sky-400 rounded-lg">
                    <Sparkles className="w-4 h-4 animate-spin-slow" />
                  </div>
                  <span className="font-display font-bold text-sm text-sky-400 tracking-wide uppercase">
                    AI Instant Executive Summary
                  </span>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-400 rounded border border-slate-700">
                  98% Confidence
                </span>
              </div>

              <div className="mt-5 space-y-3.5">
                {[
                  "Multi-node AI sensors deployed across Assam and Nagaland river basins to predict flood vectors up to 48 hours in advance.",
                  "Integrated economic dashboard tracks cross-border trade throughput with Bhutan and Myanmar in real time.",
                  "Local dialect NLP engines provide instant voice alerts in Assamese, Nagamese, Bengali, and English.",
                  "Public API launch scheduled for Q4 2026, granting free developer access to climate and trade telemetry datasets."
                ].map((point, index) => (
                  <div key={index} className="flex items-start space-x-3 group">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-[11px] font-bold text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                      {index + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed group-hover:text-white transition-colors">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action Bar */}
            <div className="mt-8 pt-5 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
              <button className="flex-1 px-4 py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-lg shadow-sky-500/20 flex items-center justify-center space-x-2 transition-all transform active:scale-98">
                <span>Read Full Coverage</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-sky-300 font-semibold text-xs sm:text-sm rounded-xl border border-slate-700 flex items-center justify-center space-x-2 transition-all">
                <Volume2 className="w-4 h-4 text-sky-400 animate-pulse" />
                <span>Listen Audio (60s)</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
