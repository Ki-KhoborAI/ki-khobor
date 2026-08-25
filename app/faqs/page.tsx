import { SiteShell } from "@/components/SiteShell";
import { FaqAccordion } from "@/components/FaqAccordion";
import { getFaqs } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function FAQsPage() {
  const faqs = await getFaqs();

  return (
    <SiteShell title="FAQs" back>
      <div className="md:mx-auto md:max-w-3xl">
        <h2 className="text-base font-semibold md:text-3xl">Frequently Asked Questions</h2>
        <p className="mt-1 text-[8px] leading-4 text-zinc-400 md:mt-2 md:text-sm">
          Quick answers to common TXG 2026 questions.
        </p>
        <div className="mt-4 md:mt-6">
          <FaqAccordion faqs={faqs} />
        </div>
      </div>
    </SiteShell>
  );
}
