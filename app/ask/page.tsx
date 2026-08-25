import { BackHeader } from "@/components/BackHeader";
import { AskChat } from "@/components/AskChat";

export const metadata = { title: "Ask Ki-Khobor · TXG 2026" };

export default function AskPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[390px] flex-col bg-black md:max-w-2xl">
        <BackHeader title="Ask Ki-Khobor" center />
        <AskChat />
      </div>
    </main>
  );
}
