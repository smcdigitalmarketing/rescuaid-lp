import { useEffect, useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { PdpContent, Review, Slide } from "~/content/types";
import { money } from "~/data/catalog";
import { Icon } from "~/components/icons";
import { Picture, SourceBadge, Stars } from "~/components/ui";

/*
 * Section 1: above the fold. The video's rule: someone who only swipes the
 * gallery and reads the title should already be sold, so the gallery tells
 * the whole story and the text stack runs proof → title → price → bullets.
 */

// ── Gallery ─────────────────────────────────────────────────────────────────

/**
 * Swipeable square gallery. Slides are laid out in container-query units
 * (cqw), so text on infographic slides stays sharp and proportional at any
 * size, the same approach as the ad creatives in the rescu-aid repo.
 */
export function MediaGallery({ slides }: { slides: Slide[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => setIndex(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    const n = (i + slides.length) % slides.length;
    el.scrollTo({ left: n * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="min-w-0">
      <div className="relative">
        <div
          ref={track}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden rounded-card bg-surface-2"
          aria-roledescription="carousel"
          aria-label="Product images"
        >
          {slides.map((s, i) => (
            <div
              key={i}
              className="aspect-square w-full shrink-0 snap-center overflow-hidden [container-type:inline-size]"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
            >
              <SlideView slide={s} priority={i === 0} />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(index - 1)}
          className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-surface/90 p-2 shadow md:block"
          aria-label="Previous image"
        >
          <ChevronLeft aria-hidden="true" className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-surface/90 p-2 shadow md:block"
          aria-label="Next image"
        >
          <ChevronRight aria-hidden="true" className="size-5" />
        </button>
        <span className="absolute bottom-2 right-2 rounded-full bg-black/55 px-2 py-0.5 text-[11px] font-semibold text-white tabular-nums">
          {index + 1} / {slides.length}
        </span>
      </div>
      <div className="mt-2.5 flex justify-center gap-1.5 md:hidden" aria-hidden="true">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${i === index ? "w-5 bg-ink" : "w-1.5 bg-line"}`}
          />
        ))}
      </div>
      <div
        className="no-scrollbar mt-3 hidden gap-2 overflow-x-auto md:flex"
        role="group"
        aria-label="Choose image"
      >
        {slides.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => go(i)}
            aria-label={`Show image ${i + 1}`}
            aria-current={i === index}
            className={`size-14 shrink-0 overflow-hidden rounded-[calc(var(--r-card)*0.6)] border-2 bg-surface-2 transition md:size-16 ${
              i === index
                ? "border-ink"
                : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <SlideThumb slide={s} />
          </button>
        ))}
      </div>
    </div>
  );
}

function SlideThumb({ slide }: { slide: Slide }) {
  switch (slide.kind) {
    case "photo":
    case "overlay":
      return (
        <Picture
          image={slide.image}
          fit={slide.kind === "photo" ? (slide.fit ?? "cover") : "cover"}
        />
      );
    case "proof":
      return (
        <span className="grid h-full place-items-center bg-surface text-star">
          <Stars rating={5} className="size-2" />
        </span>
      );
    case "guarantee":
      return (
        <span className="grid h-full place-items-center bg-accent text-[10px] font-bold leading-tight text-accent-ink">
          {slide.days}
          <br />
          DAYS
        </span>
      );
  }
}

function SlideView({ slide, priority }: { slide: Slide; priority: boolean }) {
  switch (slide.kind) {
    case "photo":
      return (
        <Picture
          image={slide.image}
          priority={priority}
          fit={slide.fit ?? "cover"}
          className={slide.fit === "contain" ? "bg-white" : ""}
        />
      );
    case "overlay":
      return (
        <div className="relative h-full overflow-hidden">
          <Picture image={slide.image} priority={priority} />
          <div
            className={`absolute inset-x-0 ${slide.align === "top" ? "top-0 bg-gradient-to-b" : "bottom-0 bg-gradient-to-t"} from-black/80 via-black/45 to-transparent p-[6cqw] ${slide.align === "top" ? "pb-[16cqw]" : "pt-[16cqw]"} text-white`}
          >
            {slide.eyebrow && (
              <p className="mb-[1.5cqw] text-[3.2cqw] font-bold uppercase tracking-[0.14em] opacity-90">
                {slide.eyebrow}
              </p>
            )}
            <p className="display text-[7.4cqw]">{slide.headline}</p>
            {slide.points && (
              <ul className="mt-[3cqw] space-y-[1.4cqw] text-[3.8cqw] font-medium">
                {slide.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-[1.6cqw]">
                    <Check
                      aria-hidden="true"
                      className="mt-[0.4cqw] size-[4.2cqw] shrink-0"
                    />
                    {pt}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      );
    case "proof":
      return <ProofSlide review={slide.review} />;
    case "guarantee":
      return (
        <div className="flex h-full flex-col items-center justify-center bg-accent p-[8cqw] text-center text-accent-ink">
          <div className="grid size-[30cqw] place-items-center rounded-full border-[0.8cqw] border-current">
            <p className="display text-[11cqw] leading-none">
              {slide.days}
              <span className="block text-[3.6cqw] tracking-[0.2em]">DAYS</span>
            </p>
          </div>
          <p className="display mt-[6cqw] text-[7cqw]">{slide.headline}</p>
          <p className="mt-[3cqw] max-w-[80cqw] text-[3.9cqw] opacity-85">
            {slide.body}
          </p>
        </div>
      );
  }
}

function ProofSlide({ review }: { review: Review }) {
  return (
    <div className="relative flex h-full flex-col justify-between bg-surface p-[7cqw]">
      {review.photo && (
        <div className="absolute inset-y-0 right-0 w-[42cqw] overflow-hidden">
          <Picture image={review.photo} />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/30 to-transparent" />
        </div>
      )}
      <div className="relative">
        <Quote aria-hidden="true" className="size-[9cqw] text-brand" />
        <Stars rating={review.rating} className="size-[5cqw]" />
      </div>
      <p
        className={`display relative text-[6.2cqw] ${review.photo ? "max-w-[58cqw]" : ""}`}
      >
        “{review.quote}”
      </p>
      <div className="relative text-[3.6cqw]">
        <p className="font-bold">{review.name}</p>
        <p className="text-muted">{review.meta}</p>
        <div className="mt-[2cqw] origin-left scale-[1.25]">
          <SourceBadge source={review.source} />
        </div>
      </div>
    </div>
  );
}

// ── Text stack ─────────────────────────────────────────────────────────────

/** Social proof goes first: on mobile people read top to bottom. */
export function ProofLine({ text }: { text: string }) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-brand">
      <Stars rating={5} />
      <span>{text}</span>
    </p>
  );
}

/** Product name plus benefit, so a reader who only sees the title still gets the point. */
export function BenefitTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: PdpContent["title"];
  subtitle: string;
}) {
  return (
    <div>
      {eyebrow && (
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-muted">
          {eyebrow}
        </p>
      )}
      <h1 className="display text-[1.65rem] md:text-[2.4rem]">
        <span className="block text-[0.5em] tracking-wide text-muted">
          {title.product}
        </span>
        {title.benefit}
      </h1>
      <p className="mt-3 text-base text-muted md:text-lg">{subtitle}</p>
    </div>
  );
}

/** Don't make people do math: say the dollar amount they save. */
export function PriceSavings({
  price,
  compareAt,
}: {
  price: number;
  compareAt: number;
}) {
  const save = compareAt - price;
  return (
    <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className="text-3xl font-bold">{money(price)}</span>
      {save > 0 && (
        <>
          <s className="text-lg text-muted">{money(compareAt)}</s>
          <span className="rounded-full bg-highlight px-2.5 py-1 text-sm font-bold text-highlight-ink">
            You save {money(save)}
          </span>
        </>
      )}
    </p>
  );
}

export function IconBullets({ items }: { items: PdpContent["bullets"] }) {
  return (
    <ul className="grid gap-3">
      {items.map((b) => (
        <li key={b.text} className="flex items-start gap-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-2 text-brand">
            <Icon name={b.icon} className="size-4" />
          </span>
          <span className="pt-1 text-[15px] leading-snug">{b.text}</span>
        </li>
      ))}
    </ul>
  );
}

export function HeroQuote({ review }: { review: Review }) {
  return (
    <figure className="flex gap-3 rounded-card border border-line bg-surface p-4">
      {review.photo && (
        <div className="size-12 shrink-0 overflow-hidden rounded-full">
          <Picture image={review.photo} />
        </div>
      )}
      <div>
        <blockquote className="text-sm leading-relaxed">
          “{review.quote}”
        </blockquote>
        <figcaption className="mt-2 text-xs text-muted">
          <strong className="text-ink">{review.name}</strong>, {review.meta}
        </figcaption>
      </div>
    </figure>
  );
}
