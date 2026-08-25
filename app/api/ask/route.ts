import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { askKnowledgeBase } from "@/lib/search";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let question = "";
  try {
    const body = await req.json();
    question = typeof body?.question === "string" ? body.question : "";
  } catch {
    // ignore
  }

  question = question.trim();
  if (!question) {
    return NextResponse.json({ error: "Empty question" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: faqs } = await supabase
    .from("faqs")
    .select("*")
    .eq("published", true);

  const result = askKnowledgeBase(faqs ?? [], question);

  // Best-effort logging so the admin can see what people ask (and what missed).
  await supabase.from("question_logs").insert({
    question,
    matched_faq_id: result.faqId,
    answered: result.confident,
  });

  return NextResponse.json(result);
}
