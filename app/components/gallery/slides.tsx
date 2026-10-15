import { BadgeCheck, Check, X } from "lucide-react";
import type { Slide } from "~/content/types";
import { LOOX } from "~/content/base";
import { Picture, Stars } from "~/components/ui";

/*
 * The seven gallery slides. Each one is laid out in container-query units
 * (cqw: 1% of the slide's width) inside a square, so the same markup renders
 * as a small gallery tile, a thumbnail, and a 1600 px export for Shopify.
 * The parent must set `[container-type:inline-size]` and a square aspect.
 */

export function SlideView({
  slide,
  priority = false,
}: {
  slide: Slide;
  priority?: boolean;
}) {
  switch (slide.kind) {
    case "headline":
      return (
        <div className="relative h-full overflow-hidden bg-surface">
          <Picture image={slide.image} priority={priority} />
          <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-bg from-40% via-bg/85 to-transparent px-[7cqw] pb-[16cqw] pt-[8cqw]">
            {slide.eyebrow && (
              <p className="mb-[2cqw] text-[3.3cqw] font-bold uppercase tracking-[0.16em] text-brand">
                {slide.eyebrow}
              </p>
            )}
            <p className="display text-[9.2cqw] text-ink">{slide.headline}</p>
            {slide.sub && (
              <p className="mt-[2.5cqw] text-[4.2cqw] font-medium text-muted">
                {slide.sub}
              </p>
            )}
          </div>
          {slide.proof && (
            <p className="absolute bottom-[5cqw] left-[5cqw] flex items-center gap-[1.5cqw] rounded-full bg-surface/95 px-[3cqw] py-[1.6cqw] text-[3.2cqw] font-semibold text-ink shadow">
              <Stars rating={5} className="size-[3.4cqw]" />
              {slide.proof}
            </p>
          )}
        </div>
      );

    case "inUse":
      return (
        <div className="relative h-full overflow-hidden">
          <Picture image={slide.image} priority={priority} />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-[6cqw] pt-[18cqw] text-white">
            {slide.eyebrow && (
              <p className="mb-[1.5cqw] text-[3.2cqw] font-bold uppercase tracking-[0.14em] opacity-90">
                {slide.eyebrow}
              </p>
            )}
            <p className="display text-[7.6cqw]">{slide.headline}</p>
            {slide.points && (
              <ul className="mt-[3cqw] flex flex-wrap gap-[2cqw] text-[3.5cqw] font-semibold">
                {slide.points.map((pt) => (
                  <li
                    key={pt}
                    className="flex items-center gap-[1.2cqw] rounded-full bg-white/15 px-[2.6cqw] py-[1.2cqw] backdrop-blur"
                  >
                    <Check aria-hidden="true" className="size-[3.6cqw]" />
                    {pt}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      );

    case "beforeAfter":
      return (
        <div className="flex h-full flex-col bg-surface">
          <p className="display px-[6cqw] py-[5cqw] text-center text-[6.6cqw] text-ink">
            {slide.headline}
          </p>
          <div className="grid flex-1 grid-cols-2 gap-[1cqw]">
            {[
              { side: slide.before, after: false },
              { side: slide.after, after: true },
            ].map(({ side, after }) => (
              <div key={side.label} className="relative overflow-hidden">
                <Picture
                  image={side.image}
                  className={after ? "" : "grayscale-[60%]"}
                />
                <span
                  className={`absolute left-[3cqw] top-[3cqw] rounded-full px-[2.6cqw] py-[1cqw] text-[3.2cqw] font-bold uppercase tracking-wide ${
                    after ? "bg-brand text-brand-ink" : "bg-black/70 text-white"
                  }`}
                >
                  {side.label}
                </span>
                <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-[3.5cqw] pt-[12cqw] text-[3.7cqw] font-semibold leading-snug text-white">
                  {side.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    case "inside":
      return (
        <div className="flex h-full flex-col bg-surface-2">
          <p className="display px-[6cqw] pt-[6cqw] text-center text-[7cqw] text-ink">
            {slide.headline}
          </p>
          <div className="relative mx-[5cqw] my-[3cqw] min-h-0 flex-1 overflow-hidden rounded-[2cqw]">
            <Picture image={slide.image} priority={priority} />
          </div>
          <ul className="grid grid-cols-2 gap-[2cqw] px-[5cqw] pb-[5cqw]">
            {slide.items.map((it) => (
              <li
                key={it.name}
                className="flex items-start gap-[2cqw] rounded-[1.6cqw] bg-surface p-[2.4cqw] shadow-sm"
              >
                <span className="grid size-[6.4cqw] shrink-0 place-items-center rounded-full bg-brand text-[3.1cqw] font-bold text-brand-ink">
                  {it.qty ?? (
                    <Check aria-hidden="true" className="size-[3.4cqw]" />
                  )}
                </span>
                <span className="text-[3.3cqw] leading-tight">
                  <strong className="block text-ink">{it.name}</strong>
                  {it.note && (
                    <span className="text-[2.9cqw] text-muted">{it.note}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "steps":
      return (
        <div className="flex h-full flex-col bg-surface">
          <p className="display px-[6cqw] pb-[4cqw] pt-[6cqw] text-center text-[7cqw] text-ink">
            {slide.headline}
          </p>
          <ol
            className="grid flex-1 gap-[2.5cqw] px-[4cqw] pb-[5cqw]"
            style={{
              gridTemplateColumns: `repeat(${slide.steps.length}, minmax(0, 1fr))`,
            }}
          >
            {slide.steps.map((s, i) => (
              <li
                key={s.title}
                className="flex flex-col overflow-hidden rounded-[2cqw] bg-surface-2"
              >
                <div className="relative min-h-0 flex-1">
                  <Picture image={s.image} />
                  <span className="absolute left-[2cqw] top-[2cqw] grid size-[8cqw] place-items-center rounded-full bg-brand text-[4.4cqw] font-bold text-brand-ink">
                    {i + 1}
                  </span>
                </div>
                <p className="display py-[3cqw] text-center text-[5.2cqw] text-ink">
                  {s.title}
                </p>
              </li>
            ))}
          </ol>
        </div>
      );

    case "compare":
      return (
        <div className="flex h-full flex-col bg-surface">
          <p className="display px-[6cqw] pb-[3cqw] pt-[5cqw] text-center text-[6.2cqw] text-ink">
            {slide.headline}
          </p>
          <div className="grid grid-cols-[1.25fr_1fr_1fr] items-end gap-x-[2cqw] px-[5cqw]">
            <span />
            {[
              { col: slide.us, ours: true },
              { col: slide.them, ours: false },
            ].map(({ col, ours }) => (
              <div key={col.name} className="text-center">
                <div
                  className={`mx-auto h-[20cqw] w-[20cqw] overflow-hidden rounded-[2cqw] border-[0.6cqw] ${ours ? "border-brand bg-surface" : "border-line bg-surface-2"}`}
                >
                  <Picture
                    image={col.image}
                    fit="contain"
                    className={ours ? "" : "grayscale"}
                  />
                </div>
                <p
                  className={`mt-[1.5cqw] text-[3.4cqw] font-bold ${ours ? "text-brand" : "text-muted"}`}
                >
                  {col.name}
                </p>
              </div>
            ))}
          </div>
          <ul className="mt-[2.5cqw] flex-1 px-[5cqw] pb-[4cqw]">
            {slide.rows.map((r) => (
              <li
                key={r.label}
                className="grid grid-cols-[1.25fr_1fr_1fr] items-center gap-x-[2cqw] border-t border-line py-[1.8cqw] text-[3.1cqw] leading-tight"
              >
                <span className="font-semibold text-ink">{r.label}</span>
                <span className="flex items-center justify-center gap-[1cqw] text-center font-bold text-ink">
                  <Check
                    aria-hidden="true"
                    className="size-[3.8cqw] shrink-0 text-success"
                  />
                  {r.us}
                </span>
                <span className="flex items-center justify-center gap-[1cqw] text-center text-muted">
                  <X
                    aria-hidden="true"
                    className="size-[3.8cqw] shrink-0 text-brand"
                  />
                  {r.them}
                </span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "review":
      return <ReviewScreenshot slide={slide} />;
  }
}

/** A review rendered like a screenshot of the Loox widget on the live store. */
function ReviewScreenshot({
  slide,
}: {
  slide: Extract<Slide, { kind: "review" }>;
}) {
  const r = slide.review;
  // Long quotes get a shorter photo and smaller type so the whole quote shows.
  const long = r.quote.length > 160;
  const source =
    r.source === "Loox"
      ? `Loox · ${LOOX.count} reviews · ${LOOX.rating} ★`
      : r.source === "Facebook"
        ? "Facebook"
        : "rescuaid.com · Verified purchase";
  return (
    <div className="flex h-full flex-col items-center justify-center bg-[#eef0f3] p-[6cqw] font-[Inter,system-ui,sans-serif]">
      {slide.headline && (
        <p className="display mb-[3.5cqw] text-center text-[5.8cqw] text-ink">
          {slide.headline}
        </p>
      )}
      <figure className="w-full overflow-hidden rounded-[2.4cqw] bg-white text-[#16151a] shadow-[0_2cqw_6cqw_rgba(0,0,0,0.12)]">
        {r.photo && (
          <div className={long ? "h-[18cqw]" : "h-[30cqw]"}>
            <Picture image={r.photo} className="object-[center_20%]" />
          </div>
        )}
        <div className="p-[5cqw]">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-[1.5cqw] text-[3.6cqw] font-bold">
              {r.name}
              <span className="inline-flex items-center gap-[0.6cqw] text-[2.8cqw] font-semibold text-[#1f7a4d]">
                <BadgeCheck aria-hidden="true" className="size-[3.4cqw]" />
                Verified
              </span>
            </span>
            {r.date && (
              <span className="text-[2.8cqw] text-[#6b6775]">{r.date}</span>
            )}
          </div>
          <span className="mt-[1.2cqw] block text-[#f5a524]">
            <Stars rating={r.rating} className="size-[3.6cqw]" />
          </span>
          <blockquote
            className={`mt-[2cqw] leading-snug ${long ? "text-[3.2cqw]" : r.photo ? "text-[3.9cqw]" : "text-[5cqw]"}`}
          >
            “{r.quote}”
          </blockquote>
          {r.meta && !r.meta.startsWith("Verified") && (
            <p className="mt-[1.6cqw] text-[2.9cqw] text-[#6b6775]">{r.meta}</p>
          )}
        </div>
        <p className="border-t border-[#e6e4ea] px-[5cqw] py-[2.2cqw] text-[2.7cqw] text-[#6b6775]">
          {source}
        </p>
      </figure>
    </div>
  );
}

/** Small preview for the gallery's thumbnail strip. */
export function SlideThumb({ slide }: { slide: Slide }) {
  switch (slide.kind) {
    case "headline":
    case "inUse":
    case "inside":
      return (
        <Picture
          image={slide.image}
          fit={slide.kind === "inside" ? "contain" : "cover"}
        />
      );
    case "beforeAfter":
      return (
        <span className="grid h-full grid-cols-2">
          <Picture image={slide.before.image} className="grayscale-[60%]" />
          <Picture image={slide.after.image} />
        </span>
      );
    case "steps":
      return <Picture image={slide.steps[0].image} />;
    case "compare":
      return <Picture image={slide.us.image} fit="contain" />;
    case "review":
      return slide.review.photo ? (
        <Picture image={slide.review.photo} />
      ) : (
        <span className="grid h-full place-items-center bg-surface text-star">
          <Stars rating={5} className="size-2" />
        </span>
      );
  }
}

/** Russab's names for the seven slides, used on /gallery and in export file names. */
export const SLIDE_LABELS: Record<Slide["kind"], string> = {
  headline: "Benefit headline",
  inUse: "In use",
  beforeAfter: "Before and after",
  inside: "What's inside",
  steps: "How it works",
  compare: "Us vs them",
  review: "Review",
};

/** Where `npm run gallery:export` writes each slide (public/ is served as-is). */
export const exportPath = (slug: string, n: number, kind: string) =>
  `/gallery/${slug}/${String(n).padStart(2, "0")}-${kind}.jpg`;
