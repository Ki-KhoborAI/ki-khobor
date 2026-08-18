"use client";

import React, { useState } from "react";
import { Zap, Volume2, VolumeX, Sparkles, TrendingUp } from "lucide-react";

const headlines = [
  { id: 1, text: "Guwahati-Kohima High-Speed Rail Survey Phase 2 Approved by Railway Board", category: "INFRASTRUCTURE", time: "10m ago" },
  { id: 2, text: "AI-Powered Multilingual News Translation Engine Launched Across Northeast India", category: "TECH", time: "25m ago" },
  { id: 3, text: "Naga Youth Tech Summit 2026 Announces \$2M Startup Innovation Fund", category: "STARTUPS", time: "42m ago" },
  { id: 4, text: "Brahmaputra Green Energy Corridor Milestone: 500MW Hydro Expansion Complete", category: "CLIMATE", time: "1h ago" },
];

export default function BreakingNewsTicker() {
  const [isAudioMuted, setIsAudioMuted] = useState(true);

  return (
    <div className="w-full bg-slate-900 text-white border-b border-slate-800 text-xs md:text-sm py-2.5 px-4 overflow-hidden shadow-inner">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Flash Badge */}
        <div className="flex items-center space-x-2 shrink-0 z-10 pr-3 bg-slate-900 border-r border-slate-800">
          <span className="flex items-center space-x-1.5 px-2.5 py-1 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-md font-bold tracking-wider uppercase text-[11px] shadow-sm animate-pulse">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>FLASH</span>
          </span>
        </div>

        {/* Ticker Content */}
        <div className="flex-1 overflow-hidden relative mx-3">
          <div className="whitespace-nowrap flex space-x-12 animate-ticker">
            {headlines.concat(headlines).map((item, index) => (
              <div key={`${item.id}-${index}`} className="inline-flex items-center space-x-2 text-slate-200 hover:text-sky-400 cursor-pointer transition-colors">
                <span className="px-1.5 py-0.5 text-[10px] font-mono bg-sky-500/20 text-sky-400 border border-sky-500/30 rounded uppercase font-semibold">
                  {item.category}
                </span>
                <span className="font-medium text-slate-100">{item.text}</span>
                <span className="text-[11px] text-slate-400 font-mono">({item.time})</span>
                <span className="text-slate-700">|</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mute / Audio Control */}
        <div className="hidden sm:flex items-center space-x-2 shrink-0 z-10 pl-3 bg-slate-900 border-l border-slate-800">
          <button
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            className="p-1.5 text-slate-400 hover:text-sky-400 hover:bg-slate-800 rounded-lg transition-colors flex items-center space-x-1 text-xs"
            title={isAudioMuted ? "Unmute Live Audio Updates" : "Mute Live Audio Updates"}
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-sky-400 animate-pulse" />}
            <span className="hidden md:inline text-[11px] text-slate-400 font-medium">
              {isAudioMuted ? "Audio Off" : "Audio On"}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}
