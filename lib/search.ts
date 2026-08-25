import type { Faq } from "@/lib/database.types";

/**
 * Lightweight, dependency-free semantic-ish search over the curated FAQ
 * knowledge base. It tokenises the query and scores every FAQ by weighted
 * overlap across keywords, tags, question and answer text.
 *
 * This is deliberately structured as `search(faqs, query) -> ranked results`
 * so it can later be swapped for / augmented by a pgvector embedding retriever
 * without changing any calling code (the "AI-ready" path).
 */

const STOPWORDS = new Set([
  "the", "a", "an", "is", "are", "am", "was", "were", "be", "to", "of", "for",
  "in", "on", "at", "and", "or", "do", "does", "did", "how", "what", "when",
  "where", "who", "which", "can", "i", "my", "me", "you", "your", "it", "this",
  "that", "there", "here", "get", "will", "with", "about", "please", "tell",
  "hey", "hi", "hello",
]);

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text: string): string[] {
  return normalize(text)
    .split(" ")
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

export type ScoredFaq = { faq: Faq; score: number };

export function scoreFaqs(faqs: Faq[], query: string): ScoredFaq[] {
  const qNorm = normalize(query);
  const qTokens = tokenize(query);
  if (qTokens.length === 0 && qNorm.length === 0) return [];

  const scored: ScoredFaq[] = faqs.map((faq) => {
    let score = 0;

    const questionNorm = normalize(faq.question);
    const answerTokens = new Set(tokenize(faq.answer));
    const questionTokens = new Set(tokenize(faq.question));
    const keywords = (faq.keywords ?? []).map((k) => k.toLowerCase());
    const tags = (faq.tags ?? []).map((t) => t.toLowerCase());

    // Strong signal: the whole query appears in the question (or vice versa).
    if (questionNorm && (questionNorm.includes(qNorm) || qNorm.includes(questionNorm))) {
      score += 6;
    }

    for (const token of qTokens) {
      if (keywords.some((k) => k === token || k.includes(token))) score += 4;
      if (tags.includes(token)) score += 3;
      if (questionTokens.has(token)) score += 2;
      if (answerTokens.has(token)) score += 1;
    }

    // Normalise a little by query length so long queries don't dominate.
    return { faq, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);
}

export type AskResult = {
  answer: string;
  source: string | null;
  faqId: string | null;
  confident: boolean;
  related: Faq[];
};

const FALLBACK: AskResult = {
  answer:
    "I couldn't find a verified answer for that yet. Try asking about the schedule, venue, tournaments, registration, or contacts — or check the quick links on the home screen.",
  source: "Information not available",
  faqId: null,
  confident: false,
  related: [],
};

/** Turn a query + the knowledge base into a single best answer. */
export function askKnowledgeBase(faqs: Faq[], query: string): AskResult {
  const ranked = scoreFaqs(faqs, query);
  if (ranked.length === 0) return FALLBACK;

  const top = ranked[0];
  // Confidence threshold — below this we don't assert an answer.
  const confident = top.score >= 3;

  if (!confident) {
    return {
      ...FALLBACK,
      related: ranked.slice(0, 3).map((r) => r.faq),
    };
  }

  return {
    answer: top.faq.answer,
    source: top.faq.source ?? "TXG Official Information",
    faqId: top.faq.id,
    confident: true,
    related: ranked.slice(1, 4).map((r) => r.faq),
  };
}
