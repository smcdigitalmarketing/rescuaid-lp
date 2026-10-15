import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import type { PdpContent, Review, Slide } from "~/content/types";
import { money } from "~/data/catalog";
import { Icon } from "~/components/icons";
import { Picture, Stars } from "~/components/ui";
import { SlideThumb, SlideView } from "~/components/gallery/slides";
import { Lightbox } from "~/components/gallery/lightbox";

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
  /** The slide open in the lightbox, or null. */
  const [zoom, setZoom] = useState<number | null>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => setIndex(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const go = (i: number, behavior: ScrollBehavior = "smooth") => {
    const el = track.current;
    if (!el) return;
    const n = (i + slides.length) % slides.length;
    el.scrollTo({ left: n * el.clientWidth, behavior });
  };

  /** Closing the lightbox leaves the gallery on the slide that was open. */
  const closeZoom = () => {
    if (zoom !== null) go(zoom, "instant");
    setZoom(null);
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
              className="relative aspect-square w-full shrink-0 snap-center overflow-hidden [container-type:inline-size]"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
            >
              <SlideView slide={s} priority={i === 0} />
              <button
                type="button"
                onClick={() => setZoom(i)}
                className="absolute inset-0 cursor-zoom-in"
                aria-label={`Enlarge image ${i + 1}`}
              />
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
        <button
          type="button"
          onClick={() => setZoom(index)}
          className="absolute right-2 top-2 rounded-full bg-black/55 p-1.5 text-white hover:bg-black/70"
          aria-label="View larger"
        >
          <Maximize2 aria-hidden="true" className="size-4" />
        </button>
        <span className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-black/55 px-2 py-0.5 text-[11px] font-semibold text-white tabular-nums">
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
      {zoom !== null && (
        <Lightbox
          slides={slides}
          index={zoom}
          // The concept's theme, read from the page wrapper, so the portal keeps its look.
          theme={track.current?.closest<HTMLElement>("[data-theme]")?.dataset.theme ?? "store"}
          onIndex={setZoom}
          onClose={closeZoom}
        />
      )}
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
        <p className="eyebrow mb-2 text-xs font-bold uppercase tracking-[0.16em] text-muted">
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
