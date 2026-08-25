"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Send } from "lucide-react";

type Related = { id: string; question: string };

type Message = {
  role: "user" | "assistant";
  content: string;
  source?: string | null;
  related?: Related[];
};

const suggestedQuestions = [
  "When and where is TXG 2026?",
  "What games are being played?",
  "How do I register?",
  "Where do I check standings?",
  "Who can I contact for help?",
];

export function AskChat() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const send = async (text?: string) => {
    const q = (text ?? question).trim();
    if (!q || isLoading) return;

    setMessages((prev) => [...prev, { role: "user", content: q }]);
    setQuestion("");
    setIsLoading(true);

    try {
      const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
      const res = await fetch(`${base}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer,
          source: data.source,
          related: (data.related ?? []).map((r: { id: string; question: string }) => ({
            id: r.id,
            question: r.question,
          })),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Something went wrong reaching the help desk. Please check your connection and try again.",
          source: "Error",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col px-4">
      {/* Suggested questions (only before first message) */}
      {messages.length === 0 && (
        <section className="shrink-0 pt-7">
          <h2 className="text-[10px] font-semibold uppercase tracking-wide text-zinc-300">
            Suggested Questions
          </h2>
          <div className="mt-3">
            {suggestedQuestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                disabled={isLoading}
                className="flex min-h-[44px] w-full items-center border-b border-zinc-800 text-left transition-opacity active:opacity-60 disabled:opacity-50"
              >
                <span className="flex-1 text-[11px] font-semibold">{s}</span>
                <ArrowRight className="h-4 w-4 text-zinc-400" />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Conversation */}
      <div className="min-h-0 flex-1 overflow-y-auto py-6 no-scrollbar">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="max-w-[250px] text-center text-[11px] leading-5 text-zinc-600">
              Ask anything about TXG 2026 to start a conversation.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {messages.map((m, i) => (
              <div
                key={`${m.role}-${i}`}
                className={`flex w-full ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {m.role === "user" ? (
                  <div className="max-w-[82%] rounded-2xl rounded-br-md bg-[#181818] px-4 py-3">
                    <p className="text-[12px] leading-5 text-white">{m.content}</p>
                  </div>
                ) : (
                  <div className="max-w-[88%]">
                    <p className="mb-1 text-[10px] font-semibold text-zinc-400">
                      Ki-Khobor
                    </p>
                    <div className="rounded-2xl rounded-bl-md bg-[#111111] px-4 py-3">
                      <p className="text-[12px] leading-5 text-zinc-200">{m.content}</p>
                      {m.source && (
                        <p className="mt-3 border-t border-zinc-800 pt-2 text-[9px] text-zinc-500">
                          Source · {m.source}
                        </p>
                      )}
                    </div>

                    {m.related && m.related.length > 0 && (
                      <div className="mt-2 flex flex-col gap-1.5">
                        <p className="text-[8px] uppercase tracking-wide text-zinc-600">
                          Related
                        </p>
                        {m.related.map((r) => (
                          <button
                            key={r.id}
                            type="button"
                            onClick={() => send(r.question)}
                            disabled={isLoading}
                            className="flex items-center gap-1.5 rounded-full border border-zinc-800 bg-[#141414] px-3 py-1.5 text-left text-[10px] text-zinc-300 active:opacity-60 disabled:opacity-50"
                          >
                            <ArrowRight className="h-3 w-3 shrink-0 text-zinc-500" />
                            {r.question}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex w-full justify-start">
                <div className="max-w-[88%]">
                  <p className="mb-1 text-[10px] font-semibold text-zinc-400">Ki-Khobor</p>
                  <div className="rounded-2xl rounded-bl-md bg-[#111111] px-4 py-3">
                    <div className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-zinc-500" />
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-zinc-500 [animation-delay:150ms]" />
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-zinc-500 [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={endRef} />
          </div>
        )}
      </div>

      {/* Composer */}
      <section className="shrink-0 pb-4">
        <div className="flex items-end gap-2 rounded-2xl border border-zinc-800 bg-[#111111] px-3 py-2">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about TXG..."
            rows={1}
            disabled={isLoading}
            className="max-h-32 min-h-[28px] flex-1 resize-none bg-transparent py-1 text-sm text-white outline-none placeholder:text-zinc-500 disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => send()}
            disabled={!question.trim() || isLoading}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-black transition-opacity disabled:opacity-30"
            aria-label="Send question"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-2 text-center text-[8px] text-zinc-600">
          Enter to send · Shift + Enter for a new line
        </p>
      </section>
    </div>
  );
}
