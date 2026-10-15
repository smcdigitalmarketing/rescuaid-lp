import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import type { Route } from "./+types/home";
import { pages } from "~/content/pages";
import { portedAt } from "~/data/catalog";
import { fontHref } from "~/lib/seo";
import { Logo } from "~/components/ui";

export const meta: Route.MetaFunction = () => [
  { title: "RescUAid landing page concepts" },
  { name: "robots", content: "noindex, nofollow" },
  {
    tagName: "link",
    rel: "stylesheet",
    href: fontHref("family=Inter:wght@400;500;600;700"),
  },
];

/** The SOP, a markdown file in the GitHub repo. */
const SOP_URL =
  "https://github.com/smcdigitalmarketing/rescuaid-lp/blob/main/docs/pdp-template-sop.md";

const framework = [
  [
    "Above the fold",
    "Infographic gallery, proof line above the title, benefit-stacked title, price with the dollar saving, icon bullets.",
  ],
  [
    "Buy box",
    "Numbered steps, every bundle visible with a thumbnail, total, “You save $X” and gift thumbnails.",
  ],
  [
    "Under the button",
    "Shipping and returns, urgency, the guarantee spelled out, one short review. No payment badges.",
  ],
  [
    "Details",
    "Accordions with the first one open, then an auto-scrolling lifestyle strip.",
  ],
  [
    "Social proof",
    "A wall of reviews shown up front, each with its source, name and photo.",
  ],
  [
    "Value props",
    "Benefit headlines, how it works, the time-matters stats and a comparison table.",
  ],
  [
    "Closing",
    "Guarantee, then final stories, then the FAQ, then the footer. Sticky add to cart throughout.",
  ],
];

export default function Home() {
  return (
    <div className="min-h-dvh bg-[#f6f6f4] font-[Inter,system-ui,sans-serif] text-[#16151a]">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5">
          <Logo className="h-8" />
          <p className="text-xs text-black/50">
            Internal preview · not indexed
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c62828]">
          Landing page proof of concept
        </p>
        <h1 className="mt-2 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
          Five ways to sell RescUAid 2.0, all built on one product page template
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-black/60">
          Every page uses the same seven-section structure from the “premium
          product page” framework, with the real RescUAid products, prices,
          photos and reviews from rescuaid.com. They differ in angle, look and
          offer emphasis, so each one tests a single idea. On the live store
          each would be its own page on rescuaid.com.
        </p>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {pages.map((p) => {
            const img = p.cover;
            return (
              <li key={p.slug}>
                <Link
                  to={p.path}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-black/10 bg-white transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-black/5">
                    {img && (
                      <img
                        src={img.src}
                        alt=""
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="font-mono text-[11px] text-black/45">
                      {p.path}
                    </p>
                    <h2 className="mt-1 text-xl font-bold">{p.name}</h2>
                    <p className="mt-2 text-sm text-black/65">{p.hypothesis}</p>
                    <p className="mt-3 text-xs">
                      <span className="font-semibold">Traffic: </span>
                      <span className="text-black/60">{p.traffic}</span>
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {p.principles.map((x) => (
                        <li
                          key={x}
                          className="rounded-full bg-black/5 px-2 py-0.5 text-[11px] text-black/70"
                        >
                          {x}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-[#c62828]">
                      Open page
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 transition group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          to="/gallery"
          className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-black/10 bg-white p-6 transition hover:shadow-lg md:p-8"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c62828]">Product gallery</p>
            <p className="mt-1 text-xl font-bold">7 gallery images per concept, ready for Shopify</p>
            <p className="mt-1 text-sm text-black/60">
              Benefit headline, in use, before and after, what's inside, how it works, us vs them, and a real review.
              Download each as a 1600 × 1600 JPG.
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#c62828]">
            View gallery images
            <ArrowRight aria-hidden="true" className="size-4" />
          </span>
        </Link>

        <section className="mt-16 rounded-xl border border-black/10 bg-white p-6 md:p-10">
          <h2 className="text-2xl font-bold">How every page is built</h2>
          <p className="mt-2 max-w-3xl text-black/60">
            The same seven sections, in the same order, on every concept. The
            full SOP covers the copy rules, gallery slide order and launch
            checklist:{" "}
            <a
              href={SOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#c62828] underline"
            >
              read the SOP
            </a>
            .
          </p>
          <ol className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-2">
            {framework.map(([title, body], i) => (
              <li key={title} className="flex gap-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#16151a] text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="mt-1 text-sm text-black/60">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <p className="mt-10 text-xs text-black/45">
          Products, prices and photos ported from rescuaid.com on {portedAt}.
          Cart and checkout are mocked: nothing is charged and nothing is sent
          to Shopify.
        </p>
      </main>
    </div>
  );
}
