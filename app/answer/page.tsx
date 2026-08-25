import { redirect } from "next/navigation";

// The Ask screen now handles questions and answers inline as a conversation,
// so this legacy route just forwards there.
export default function AnswerPage() {
  redirect(`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/ask`);
}
