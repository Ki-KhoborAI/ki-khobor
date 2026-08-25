"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/database.types";

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  if (faqs.length === 0) {
    return (
      <p className="mt-6 text-center text-[10px] text-zinc-600 md:text-sm">
        No FAQs yet. Check back soon.
      </p>
    );
  }

  return (
    <section className="overflow-hidden rounded-[3px] bg-[#111111] md:rounded-lg">
      {faqs.map((faq, index) => {
        const isOpen = openId === faq.id;
        return (
          <div
            key={faq.id}
            className={index !== faqs.length - 1 ? "border-b border-zinc-800" : ""}
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              className="flex min-h-[44px] w-full items-center gap-3 px-3 text-left active:opacity-60 md:min-h-[56px] md:px-5"
              aria-expanded={isOpen}
            >
              <span className="flex-1 text-[9px] font-medium md:text-base">{faq.question}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 shrink-0 text-zinc-400 transition-transform md:h-5 md:w-5 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-3 pb-3 md:px-5 md:pb-5">
                <div className="border-t border-zinc-800 pt-3">
                  <p className="text-[8px] leading-4 text-zinc-300 md:text-sm md:leading-relaxed">
                    {faq.answer}
                  </p>
                  {faq.source && (
                    <p className="mt-2 text-[7px] text-zinc-600 md:text-xs">Source · {faq.source}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
