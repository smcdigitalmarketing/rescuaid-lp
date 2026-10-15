import { ShieldCheck } from "lucide-react";
import type { PdpContent } from "~/content/types";
import { SUPPORT_EMAIL } from "~/content/base";
import { Picture, Section } from "~/components/ui";
import { Accordions } from "./details";
import { ReviewCard } from "./proof";

/*
 * Section 7: closing. Guarantee, one last round of proof, then the FAQ, so
 * the last thing before the footer answers the remaining doubts.
 */

export function GuaranteeBlock({
  data,
  onShop,
}: {
  data: PdpContent["guarantee"];
  onShop: () => void;
}) {
  return (
    <Section>
      <div className="grid items-center gap-10 overflow-hidden rounded-card border border-line bg-surface md:grid-cols-2">
        <div className="aspect-[4/3] h-full bg-surface-2 md:aspect-auto">
          <Picture image={data.image} />
        </div>
        <div className="p-6 md:p-10">
          <div className="mb-5 grid size-20 place-items-center rounded-full border-4 border-brand text-center text-brand">
            <p className="display text-2xl leading-none">
              {data.days}
              <span className="block text-[10px] tracking-[0.2em]">DAYS</span>
            </p>
          </div>
          <h2 className="display text-3xl md:text-4xl">{data.headline}</h2>
          <p className="mt-4 leading-relaxed text-muted">{data.body}</p>
          <ul className="mt-5 space-y-2 text-[15px]">
            {data.points.map((pt) => (
              <li key={pt} className="flex items-start gap-2">
                <ShieldCheck
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-success"
                />
                {pt}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={onShop}
            className="btn-primary mt-7 w-full px-8 py-4 font-bold uppercase tracking-wide md:w-auto"
          >
            Choose your kit
          </button>
        </div>
      </div>
    </Section>
  );
}

export function FinalProof({ data }: { data: PdpContent["finalProof"] }) {
  return (
    <Section
      tone="alt"
      eyebrow="Hall of saves"
      title={data.headline}
      sub={data.sub}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {data.items.map((r) => (
          <ReviewCard key={r.name} review={r} />
        ))}
      </div>
    </Section>
  );
}

export function Faq({ items }: { items: PdpContent["faqs"] }) {
  return (
    <Section
      id="faq"
      title="Questions, answered"
      sub="Everything families ask before they order."
    >
      <div className="mx-auto max-w-3xl">
        <Accordions items={items.map((f) => ({ title: f.q, body: [f.a] }))} />
        <p className="mt-8 text-center text-sm text-muted">
          Still have a question? Email{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="font-semibold text-ink underline"
          >
            {SUPPORT_EMAIL}
          </a>
          , Monday to Friday, 9am–5pm EST.
        </p>
      </div>
    </Section>
  );
}
