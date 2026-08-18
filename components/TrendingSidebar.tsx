"use client";

import React, { useState } from "react";
import { TrendingUp, ShieldCheck, Mail, Sparkles, ChevronRight, CheckCircle } from "lucide-react";

const trendingArticles = [
  { id: "1", title: "Dimapur Logistics Park Secures \$45M Expansion Agreement", category: "COMMERCE", reads: "18.4k reads" },
  { id: "2", title: "Assam Solar Energy Tariff Reduced by 15% under New Green Policy", category: "ENERGY", reads: "14.1k reads" },
  { id: "3", title: "Shillong Cherry Blossom AI Tech Summit Registration Opens", category: "EVENTS", reads: "11.8k reads" },
  { id: "4", title: "Manipur Handloom Weavers Integrate Smart Blockchain Origin Tracking", category: "INNOVATION", reads: "9.5k reads" },
  { id: "5", title: "Hornbill Festival 2026 Launches Virtual Reality Global Livestream", category: "CULTURE", reads: "8.2k reads" },
];

export default function TrendingSidebar() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <aside className="space-y-6">
      
      {/* 1. Trending Articles Widget */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700/70 shadow-lg">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700/70">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-slate-100">
              Trending Stories
            </h3>
          </div>
          <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/50 px-2 py-0.5 rounded-full border border-sky-200 dark:border-sky-800">
            REAL-TIME
          </span>
        </div>

        <div className="mt-4 space-y-4">
          {trendingArticles.map((item, index) => (
            <div key={item.id} className="flex items-start space-x-3.5 group cursor-pointer">
              <span className="font-display font-black text-xl text-slate-300 dark:text-slate-600 group-hover:text-sky-500 transition-colors w-6">
                0{index + 1}
              </span>
              <div className="flex-1 pb-3 border-b border-slate-100 dark:border-slate-700/40 group-last:border-none">
                <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                  {item.category}
                </span>
                <h4 className="font-medium text-xs sm:text-sm text-slate-800 dark:text-slate-200 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-2 leading-snug">
                  {item.title}
                </h4>
                <span className="text-[11px] text-slate-400 font-mono mt-1 block">
                  {item.reads}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. AI Fact Check Badge Widget */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-white rounded-3xl p-6 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Ki-Khobor FactGuard</span>
        </div>

        <h4 className="font-display font-bold text-lg text-white">
          100% AI & Human Verified News Signals
        </h4>

        <p className="mt-2 text-xs text-slate-300 leading-relaxed">
          Every story published on Ki-Khobor undergoes cross-verifications across regional official bulletins and trusted correspondents before syndication.
        </p>

        <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-sky-400">
          <span>Explore Verification Standards</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* 3. Daily AI Newsletter Signup */}
      <div className="bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-3xl p-6 shadow-xl relative">
        <div className="flex items-center space-x-2 mb-2">
          <Sparkles className="w-5 h-5 text-amber-300" />
          <h4 className="font-display font-bold text-lg text-white">
            Daily 8 AM AI Digest
          </h4>
        </div>

        <p className="text-xs text-sky-100 leading-relaxed mb-4">
          Get the top 5 regional news summaries delivered straight to your WhatsApp or inbox every morning.
        </p>

        {isSubscribed ? (
          <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl text-xs font-semibold text-white flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-300" />
            <span>Subscribed! Check your inbox for confirmation.</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-2.5">
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-9 pr-3 py-2.5 bg-white/10 placeholder-sky-200 text-white text-xs rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Mail className="w-4 h-4 text-sky-200 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-white text-sky-600 font-bold text-xs rounded-xl shadow-md hover:bg-sky-50 transition-colors"
            >
              Subscribe Free
            </button>
          </form>
        )}
      </div>

    </aside>
  );
}
