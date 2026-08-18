"use client";

import React, { useState } from "react";
import { Sparkles, MapPin, Cpu, TrendingUp, ShieldCheck, Leaf, Rocket } from "lucide-react";

const categories = [
  { id: "all", label: "All Stories", icon: Sparkles },
  { id: "northeast", label: "Northeast Regional", icon: MapPin },
  { id: "tech", label: "AI & Innovation", icon: Cpu },
  { id: "business", label: "Business & Markets", icon: TrendingUp },
  { id: "startups", label: "Startups & Youth", icon: Rocket },
  { id: "environment", label: "Climate & Energy", icon: Leaf },
  { id: "factcheck", label: "Fact Checks", icon: ShieldCheck },
];

interface CategoryTabsProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

export default function CategoryTabs({ activeTab, setActiveTab }: CategoryTabsProps) {
  return (
    <div className="w-full my-6 overflow-x-auto no-scrollbar py-2">
      <div className="flex items-center space-x-2 min-w-max">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeTab === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 border ${
                isActive
                  ? "bg-slate-900 dark:bg-sky-500 text-white border-slate-900 dark:border-sky-400 shadow-md transform scale-105"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/70"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-sky-400 dark:text-white" : "text-slate-400"}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
