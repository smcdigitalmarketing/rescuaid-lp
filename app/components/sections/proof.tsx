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

export function ReviewsWall({
  data,
  compact = false,
}: {
  data: PdpContent["reviews"];
  compact?: boolean;
}) {
  const first = compact ? 6 : 9;
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
      <div className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3">
        {shown.map((r) => (
          <ReviewCard key={r.name + r.quote.slice(0, 12)} review={r} />
        ))}
      </div>
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
