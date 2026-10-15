import { useState } from "react";
import { BadgeCheck } from "lucide-react";
import type { PdpContent, Review } from "~/content/types";
import { Picture, Section, SourceBadge, Stars } from "~/components/ui";

/*
 * Section 5: social proof. Shown up front as a wall, never hidden in a
 * carousel, and every review says where it came from.
 */

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="break-inside-avoid overflow-hidden rounded-card border border-line bg-surface">
      {review.photo && (
        <div className="aspect-[4/3] bg-surface-2">
          <Picture image={review.photo} />
        </div>
      )}
      <div className="p-5">
        <Stars rating={review.rating} className="size-3.5" />
        <blockquote className="mt-2 text-[15px] leading-relaxed">
          “{review.quote}”
        </blockquote>
        <figcaption className="mt-4 flex items-center gap-3">
          {review.avatar && (
            <span className="size-9 shrink-0 overflow-hidden rounded-full">
              <Picture image={review.avatar} />
            </span>
          )}
          <span className="min-w-0 text-sm">
            <span className="flex items-center gap-1 font-bold">
              {review.name}
              <BadgeCheck
                aria-label="Verified"
                className="size-4 text-success"
              />
            </span>
            <span className="block text-xs text-muted">
              {review.meta}
              {review.date && ` · ${review.date}`}
            </span>
          </span>
        </figcaption>
        <div className="mt-3">
          <SourceBadge source={review.source} />
        </div>
      </div>
    </figure>
  );
}

/** Compact row: who and where on the left, the quote on the right. */
function ReviewRow({ review: r }: { review: Review }) {
  return (
    <figure className="grid gap-3 border-b border-line py-5 md:grid-cols-[220px_1fr] md:gap-8">
      <figcaption className="flex items-start gap-3 md:block">
        {r.photo && (
          <span className="block size-14 shrink-0 overflow-hidden rounded-card md:mb-3 md:size-20">
            <Picture image={r.photo} />
          </span>
        )}
        <span className="block text-sm">
          <span className="flex items-center gap-1 font-bold">
            {r.name}
            <BadgeCheck aria-label="Verified" className="size-4 text-success" />
          </span>
          <span className="block text-xs text-muted">
            {r.meta}
            {r.date && ` · ${r.date}`}
          </span>
          <span className="mt-1.5 block">
            <SourceBadge source={r.source} />
          </span>
        </span>
      </figcaption>
      <div>
        <Stars rating={r.rating} className="size-3.5" />
        <blockquote className="mt-2 text-base leading-relaxed md:text-lg">“{r.quote}”</blockquote>
      </div>
    </figure>
  );
}

const NOTE_TILT = ["-rotate-[1.5deg]", "rotate-[1deg]", "-rotate-[0.5deg]", "rotate-[1.5deg]"];
const NOTE_TONE = ["bg-highlight text-highlight-ink", "bg-surface text-ink", "bg-surface-2 text-ink"];

/** A sticky note: tilted, coloured, with a strip of tape. */
function ReviewNote({ review: r, i }: { review: Review; i: number }) {
  return (
    <figure
      className={`relative break-inside-avoid rounded-card p-6 pt-8 shadow-[0_8px_24px_rgba(0,0,0,0.08)] ${NOTE_TILT[i % NOTE_TILT.length]} ${NOTE_TONE[i % NOTE_TONE.length]}`}
    >
      <span aria-hidden="true" className="absolute -top-2.5 left-1/2 h-5 w-20 -translate-x-1/2 rotate-[-2deg] rounded-sm bg-brand/30" />
      {r.photo && (
        <span className="mb-4 block aspect-[4/3] overflow-hidden rounded-[calc(var(--r-card)*0.6)]">
          <Picture image={r.photo} />
        </span>
      )}
      <Stars rating={r.rating} className="size-4" />
      <blockquote className="display mt-2 text-xl leading-snug">“{r.quote}”</blockquote>
      <figcaption className="mt-4 text-sm">
        <strong>{r.name}</strong>
        <span className="opacity-70"> · {r.meta}</span>
        <span className="mt-2 block">
          <SourceBadge source={r.source} />
        </span>
      </figcaption>
    </figure>
  );
}

const UGC_TONE = ["bg-accent text-accent-ink", "bg-brand text-brand-ink", "bg-highlight text-highlight-ink", "bg-ink text-bg"];

/** Photo-wall tile: customer photos full-bleed, text reviews as bold colour blocks. */
function ReviewTile({ review: r, i }: { review: Review; i: number }) {
  if (r.photo)
    return (
      <figure className="relative aspect-square overflow-hidden rounded-card">
        <Picture image={r.photo} />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-4 pt-14 text-white">
          <blockquote className="line-clamp-3 text-sm font-medium leading-snug">“{r.quote}”</blockquote>
          <figcaption className="mt-2 text-xs opacity-85">
            <strong>{r.name}</strong> · {r.source === "Loox" ? "Verified · Loox" : r.meta}
          </figcaption>
        </div>
      </figure>
    );
  return (
    <figure className={`flex aspect-square flex-col justify-between rounded-card p-5 ${UGC_TONE[i % UGC_TONE.length]}`}>
      <Stars rating={r.rating} className="size-4" />
      <blockquote className="display line-clamp-5 text-lg leading-snug md:text-xl">“{r.quote}”</blockquote>
      <figcaption className="text-xs opacity-85">
        <strong>{r.name}</strong> · {r.source === "Loox" ? "Verified · Loox" : r.meta}
      </figcaption>
    </figure>
  );
}

export function ReviewsWall({
  data,
  compact = false,
  variant = "masonry",
}: {
  data: PdpContent["reviews"];
  compact?: boolean;
  variant?: "masonry" | "list" | "notes" | "ugc";
}) {
  const first = variant === "ugc" ? 8 : compact ? 6 : 9;
  const [all, setAll] = useState(false);
  const shown = all ? data.items : data.items.slice(0, first);
  return (
    <Section id="reviews" tone="alt" title={data.headline} sub={data.sub}>
      <div className="mx-auto mb-10 flex w-fit flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full border border-line bg-surface px-5 py-2 text-sm">
        <Stars rating={data.rating} />
        <strong>{data.rating.toFixed(1)} out of 5</strong>
        <span className="text-muted">
          from {data.count} verified reviews on Loox
        </span>
      </div>
      {variant === "list" ? (
        <div className="mx-auto max-w-4xl border-t border-line">
          {shown.map((r) => (
            <ReviewRow key={r.name + r.quote.slice(0, 12)} review={r} />
          ))}
        </div>
      ) : variant === "notes" ? (
        <div className="columns-1 gap-8 px-2 pt-2 sm:columns-2 lg:columns-3">
          {shown.map((r, i) => (
            <div key={r.name + r.quote.slice(0, 12)} className="mb-8 break-inside-avoid pt-2">
              <ReviewNote review={r} i={i} />
            </div>
          ))}
        </div>
      ) : variant === "ugc" ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {shown.map((r, i) => (
            <ReviewTile
              key={r.name + r.quote.slice(0, 12)}
              review={r}
              i={shown.slice(0, i).filter((x) => !x.photo).length}
            />
          ))}
        </div>
      ) : (
        <div className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3">
          {shown.map((r) => (
            <ReviewCard key={r.name + r.quote.slice(0, 12)} review={r} />
          ))}
        </div>
      )}
      {data.items.length > first && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setAll((v) => !v)}
            className="rounded-btn border-2 border-ink px-6 py-3 text-sm font-bold"
          >
            {all
              ? "Show fewer reviews"
              : `Show all ${data.items.length} reviews`}
          </button>
        </div>
      )}
    </Section>
  );
}
