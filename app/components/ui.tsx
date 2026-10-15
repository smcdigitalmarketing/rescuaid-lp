import type { ReactNode } from "react";
import { Star } from "lucide-react";
import logoUrl from "~/assets/brand/rescuaid-logo.webp";
import type { ReviewSource } from "~/content/types";
import type { Img } from "~/lib/images";

export function Logo({ className = "h-9" }: { className?: string }) {
  return (
    <img
      src={logoUrl}
      alt="RescUAid"
      width={900}
      height={216}
      className={`w-auto ${className}`}
    />
  );
}

export function Stars({
  rating = 5,
  className = "size-4",
}: {
  rating?: number;
  className?: string;
}) {
  return (
    <span
      className="inline-flex gap-0.5 text-star"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={className}
          fill={i < Math.round(rating) ? "currentColor" : "none"}
          stroke="currentColor"
        />
      ))}
    </span>
  );
}

export function Picture({
  image,
  className = "",
  priority = false,
  fit = "cover",
}: {
  image: Img;
  className?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
}) {
  return (
    <img
      src={image.src}
      alt={image.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={`h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"} ${className}`}
    />
  );
}

/** A page section with an optional centered heading block. */
export function Section({
  id,
  tone = "default",
  eyebrow,
  title,
  sub,
  children,
  className = "",
}: {
  id?: string;
  tone?: "default" | "alt" | "accent";
  eyebrow?: string;
  title?: ReactNode;
  sub?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const tones = {
    default: "bg-bg",
    alt: "bg-surface-2",
    accent: "bg-accent text-accent-ink",
  };
  return (
    <section
      id={id}
      className={`scroll-mt-20 px-4 py-14 md:py-20 ${tones[tone]} ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title || sub) && (
          <header className="mx-auto mb-10 max-w-2xl text-center">
            {eyebrow && (
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="display text-3xl md:text-[2.6rem]">{title}</h2>
            )}
            {sub && (
              <p
                className={`mt-4 text-base md:text-lg ${tone === "accent" ? "opacity-80" : "text-muted"}`}
              >
                {sub}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

const sourceLabel: Record<ReviewSource, string> = {
  Loox: "Verified review · Loox",
  Facebook: "Posted on Facebook",
  "rescuaid.com": "Verified purchase",
};

/** Where a review came from. The video: proof is only believable with a source. */
export function SourceBadge({ source }: { source: ReviewSource }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-surface-2 px-2 py-0.5 text-[11px] font-semibold text-muted">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-success" />
      {sourceLabel[source]}
    </span>
  );
}
