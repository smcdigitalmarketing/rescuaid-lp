import { Check, Minus } from "lucide-react";
import type { PdpContent } from "~/content/types";
import { Picture, Section } from "~/components/ui";

/*
 * Section 6: value props. The headline carries the benefit (most people read
 * only that), the body explains how, and the image backs up the claim.
 */

export function ValueProps({
  data,
  style,
}: {
  data: PdpContent["valueProps"];
  style: "alternating" | "cards";
}) {
  if (style === "cards") {
    return (
      <Section eyebrow={data.eyebrow} title={data.headline}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((v) => (
            <article
              key={v.headline}
              className="overflow-hidden rounded-card border border-line bg-surface"
            >
              <div className="aspect-[4/3] bg-surface-2">
                <Picture image={v.image} />
              </div>
              <div className="p-6">
                {v.eyebrow && (
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-brand">
                    {v.eyebrow}
                  </p>
                )}
                <h3 className="display text-xl md:text-2xl">{v.headline}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {v.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>
    );
  }
  return (
    <Section eyebrow={data.eyebrow} title={data.headline}>
      <div className="space-y-16 md:space-y-24">
        {data.items.map((v, i) => (
          <article
            key={v.headline}
            className="grid items-center gap-8 md:grid-cols-2 md:gap-14"
          >
            <div
              className={`aspect-[4/3] overflow-hidden rounded-card bg-surface-2 ${i % 2 ? "md:order-2" : ""}`}
            >
              <Picture image={v.image} />
            </div>
            <div>
              {v.eyebrow && (
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">
                  {v.eyebrow}
                </p>
              )}
              <h3 className="display text-2xl md:text-[2.1rem]">
                {v.headline}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
                {v.body}
              </p>
              {v.points && (
                <ul className="mt-5 space-y-2">
                  {v.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-[15px]">
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-success"
                      />
                      {pt}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function HowItWorks({
  data,
  safety,
}: {
  data: PdpContent["howItWorks"];
  safety: string;
}) {
  return (
    <Section id="how" tone="alt" title={data.headline} sub={data.sub}>
      <ol className="grid gap-5 md:grid-cols-3">
        {data.steps.map((s, i) => (
          <li
            key={s.title}
            className="overflow-hidden rounded-card border border-line bg-surface"
          >
            <div className="aspect-[4/3] bg-surface-2">
              <Picture image={s.image} />
            </div>
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
                Step {i + 1}
              </p>
              <h3 className="display mt-1 text-2xl">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                {s.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mx-auto mt-8 max-w-3xl rounded-card border border-line bg-surface p-4 text-xs leading-relaxed text-muted">
        <strong className="text-ink">Important: </strong>
        {safety}
      </p>
    </Section>
  );
}

export function StatsBand({ data }: { data: PdpContent["stats"] }) {
  return (
    <Section tone="accent" title={data.headline} sub={data.sub}>
      <ol className="grid gap-px overflow-hidden rounded-card bg-accent-ink/15 sm:grid-cols-2 lg:grid-cols-4">
        {data.items.map((s) => (
          <li key={s.value} className="bg-accent p-6">
            <p
              className={`display text-4xl ${s.tone === "good" ? "text-highlight" : ""}`}
            >
              {s.value}
            </p>
            <p className="mt-2 text-sm opacity-80">{s.label}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function Comparison({ data }: { data: PdpContent["comparison"] }) {
  return (
    <Section title={data.headline} sub={data.sub}>
      <div className="mx-auto max-w-3xl overflow-hidden rounded-card border border-line bg-surface">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="p-4">
                <span className="sr-only">Feature</span>
              </th>
              <th
                scope="col"
                className="bg-highlight p-4 text-center font-bold text-highlight-ink"
              >
                {data.us}
              </th>
              <th
                scope="col"
                className="p-4 text-center font-semibold text-muted"
              >
                {data.them}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.rows.map((r) => (
              <tr key={r.label} className="border-b border-line last:border-0">
                <th scope="row" className="p-4 font-medium">
                  {r.label}
                </th>
                <td className="bg-highlight/40 p-4 text-center font-semibold">
                  <span className="inline-flex items-center gap-1.5">
                    <Check aria-hidden="true" className="size-4 text-success" />
                    {r.us}
                  </span>
                </td>
                <td className="p-4 text-center text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <Minus aria-hidden="true" className="size-4" />
                    {r.them}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
