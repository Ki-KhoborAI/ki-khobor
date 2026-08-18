"use client";

import React, { useState } from "react";
import { Sparkles, Clock, Share2, Bookmark, ChevronRight, CheckCircle2 } from "lucide-react";

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  aiSummary: string;
  category: string;
  imageUrl: string;
  readTime: string;
  timeAgo: string;
  source: string;
  verified: boolean;
}

export default function ArticleCard({ article }: { article: Article }) {
  const [showAiSummary, setShowAiSummary] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="group bg-white dark:bg-slate-800/90 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700/70 hover:shadow-xl hover:border-sky-500/40 dark:hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Article Image Container */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60"></div>

          {/* Category Badge & Verification */}
          <div className="absolute top-3 left-3 flex items-center space-x-2">
            <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-slate-900/90 backdrop-blur-md text-sky-400 border border-slate-700 rounded-md">
              {article.category}
            </span>
            {article.verified && (
              <span className="p-1 bg-emerald-500/90 text-white rounded-md backdrop-blur-md" title="Fact-Checked & Verified">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
            )}
          </div>

          {/* Bookmark Quick Action */}
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md transition-colors ${
              isBookmarked
                ? "bg-sky-500 text-white"
                : "bg-slate-900/70 text-slate-300 hover:text-white hover:bg-slate-900"
            }`}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>

          {/* Read Time & Time Ago Bar */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-slate-300">
            <span className="flex items-center space-x-1">
              <Clock className="w-3 h-3 text-sky-400" />
              <span>{article.timeAgo}</span>
            </span>
            <span>{article.readTime}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5">
          <p className="text-xs font-semibold text-sky-600 dark:text-sky-400 mb-1">
            Source: {article.source}
          </p>

          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>

          {/* AI Summary Accordion Toggle */}
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60">
            <button
              onClick={() => setShowAiSummary(!showAiSummary)}
              className="w-full flex items-center justify-between px-3 py-2 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 rounded-xl text-xs font-semibold hover:bg-sky-100 dark:hover:bg-sky-900/50 transition-colors"
            >
              <div className="flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                <span>{showAiSummary ? "Hide AI Summary" : "View 2-Line AI Summary"}</span>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${showAiSummary ? "rotate-90" : ""}`} />
            </button>

            {showAiSummary && (
              <div className="mt-2 p-3 bg-slate-50 dark:bg-slate-900/80 rounded-xl text-xs text-slate-700 dark:text-slate-300 border border-sky-500/20 leading-relaxed font-sans animate-fadeIn">
                <div className="flex items-center space-x-1 text-[10px] font-bold text-sky-500 uppercase tracking-wider mb-1">
                  <span>AI Insight Highlight</span>
                </div>
                {article.aiSummary}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-5 pb-4 pt-0 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
        <a href={`#article-${article.id}`} className="text-sky-600 dark:text-sky-400 hover:underline flex items-center space-x-1">
          <span>Read Story</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </a>

        <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors" title="Share">
          <Share2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
