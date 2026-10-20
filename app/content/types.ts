import type { Img } from "~/lib/images";
import type { IconName } from "~/components/icons";

/**
 * Everything one landing page needs. Every page renders the same section
 * order (docs/pdp-template-sop.md); concepts differ in copy, imagery, theme
 * and a few layout options.
 */

/**
 * The product gallery: seven slides, one per job, in this order (Russab's
 * spec, docs/pdp-template-sop.md §2). Photos carry no words; every word on a
 * slide is HTML so it stays sharp and editable.
 */
export type Slide =
  /** 1 · A big benefit headline, not the product shot. */
  | { kind: "headline"; image: Img; eyebrow?: string; headline: string; sub?: string; proof?: string }
  /** 2 · The product in use, with a benefit overlay. */
  | { kind: "inUse"; image: Img; eyebrow?: string; headline: string; points?: string[] }
  /** 3 · Before and after: unprepared → prepared. */
  | { kind: "beforeAfter"; headline: string; before: BeforeAfterSide; after: BeforeAfterSide }
  /** 4 · What's inside the package. */
  | { kind: "inside"; image: Img; headline: string; items: { qty?: string; name: string; note?: string }[] }
  /** 5 · How it works, in 3–4 visual steps. */
  | { kind: "steps"; headline: string; steps: { title: string; image: Img }[] }
  /** 6 · Us vs them. */
  | {
      kind: "compare";
      headline: string;
      us: { name: string; image: Img };
      them: { name: string; image: Img };
      rows: { label: string; us: string; them: string }[];
    }
  /** 7 · A review screenshot with a real quote. */
  | { kind: "review"; headline?: string; review: Review }
  /** 8 · Extra, after the seven images: a silent looping demo video. */
  | { kind: "video"; src: string; poster: string; alt: string; eyebrow?: string; headline: string };

export type SlideKind = Slide["kind"];

export type BeforeAfterSide = { image: Img; label: string; caption: string };

export type Gift = { title: string; value: number; image: Img };

export type Tier = {
  id: string;
  title: string;
  sub: string;
  kits: number;
  price: number;
  compareAt: number;
  badge?: string;
  image: Img;
  gifts: Gift[];
};

export type AddOn = {
  id: string;
  title: string;
  blurb: string;
  price: number;
  compareAt?: number;
  image: Img;
};

export type ReviewSource = "Loox" | "Facebook" | "rescuaid.com";

export type Review = {
  name: string;
  /** Shown under the name, e.g. "Active EMT" or "Verified buyer". */
  meta: string;
  source: ReviewSource;
  date?: string;
  rating: number;
  quote: string;
  photo?: Img;
  avatar?: Img;
};

export type ValueProp = {
  eyebrow?: string;
  /** The benefit, in one sentence. Most people read only this. */
  headline: string;
  /** How it delivers the benefit. */
  body: string;
  image: Img;
  points?: string[];
};

export type Step = { title: string; body: string; image: Img };

export type Stat = { value: string; label: string; tone?: "good" | "bad" };

export type Faq = { q: string; a: string };

export type PdpContent = {
  announcement: string;
  gallery: Slide[];
  proofLine: string;
  eyebrow?: string;
  /** Optional editorial byline under the subtitle (e.g. "By the RescUAid team · 4 min read"). */
  byline?: string;
  /** Product name plus the benefit, stacked into one title. */
  title: { product: string; benefit: string };
  subtitle: string;
  bullets: { icon: IconName; text: string }[];
  /** Optional expert quote shown in the hero, under the bullets. */
  heroQuote?: Review;

  buy: {
    steps: [string, string];
    tiers: Tier[];
    defaultTier: string;
    addOns: AddOn[];
    cta: string;
  };
  underAtc: {
    lines: { icon: IconName; text: string }[];
    urgency: string;
    guarantee: { title: string; body: string };
    review: Review;
  };

  accordions: { title: string; body: string[] }[];
  lifestyle: Img[];

  reviews: {
    headline: string;
    sub: string;
    rating: number;
    count: number;
    items: Review[];
  };

  valueProps: { eyebrow?: string; headline: string; items: ValueProp[] };
  howItWorks: { headline: string; sub: string; steps: Step[] };
  stats: { headline: string; sub: string; items: Stat[] };
  comparison: {
    headline: string;
    sub: string;
    us: string;
    them: string;
    rows: { label: string; us: string; them: string }[];
  };

  guarantee: {
    days: number;
    headline: string;
    body: string;
    points: string[];
    image: Img;
  };
  finalProof: { headline: string; sub: string; items: Review[] };
  faqs: Faq[];
  safety: string;
};

export type ThemeName =
  | "store"
  | "clinical"
  | "family"
  | "offer"
  | "premium"
  | "pulse"
  | "soft"
  | "field"
  | "pop"
  | "heritage"
  | "retro"
  | "story"
  | "luxe";

/** A text wordmark for a brand direction, in place of the store logo. */
export type Wordmark = {
  text: string;
  mark: "plus" | "heart" | "shield" | "spark" | "cross" | "sun" | "gem";
};

export type ConceptPage = {
  slug: string;
  /** Internal concept name for the review hub. */
  name: string;
  /** "brand" = a new brand direction; otherwise an angle on today's RescUAid brand. */
  group?: "brand";
  path: string;
  theme: ThemeName;
  /** Google Fonts `family=` query for this concept. */
  fonts: string;
  hypothesis: string;
  traffic: string;
  /** Which of the video's principles this page leans on hardest. */
  principles: string[];
  meta: { title: string; description: string };
  /** Thumbnail on the review hub. */
  cover: Img;
  layout: {
    /** Short page: drops the value-prop slider, lifestyle strip and long review wall. */
    compact?: boolean;
    valueProps: "alternating" | "cards" | "bento" | "numbered";
    /** The store logo (default) or a brand direction's own wordmark. */
    wordmark?: Wordmark;
    /** Logo left with nav beside it (default), or logo centred with nav below. */
    header?: "standard" | "centered";
    /** Gallery left (default) or right of the product info; "headline" puts the title full-width above both. */
    hero?: "split" | "reverse" | "headline";
    /** Bundle picker: stacked cards (default), side-by-side columns, or pills plus one detail card. */
    tiers?: "stack" | "grid" | "pills";
    /** Review wall: masonry cards (default), compact rows, sticky notes, or a photo wall. */
    reviews?: "masonry" | "list" | "notes" | "ugc" | "quotes";
    /** Decorative band between major sections. */
    divider?: "none" | "wave" | "stripe" | "rule" | "ornament";
    /** Live countdown in the announcement bar (the store has one). Default true. */
    countdownBar?: boolean;
  };
  content: PdpContent;
};
