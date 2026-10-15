import type { Img } from "~/lib/images";
import type { IconName } from "~/components/icons";

/**
 * Everything one landing page needs. Every page renders the same section
 * order (docs/pdp-template-sop.md); concepts differ in copy, imagery, theme
 * and a few layout options.
 */

/** Which job the slide does in the gallery story (see the SOP's slide order). */
export type SlideRole =
  | "product"
  | "pain"
  | "value"
  | "how"
  | "proof"
  | "compare"
  | "guarantee"
  | "lifestyle";

export type Slide = { role: SlideRole } & (
  | { kind: "photo"; image: Img; fit?: "cover" | "contain" }
  | {
      kind: "overlay";
      image: Img;
      eyebrow?: string;
      headline: string;
      points?: string[];
      /** Where the text block sits on the photo. */
      align?: "top" | "bottom";
    }
  | { kind: "proof"; review: Review }
  | { kind: "guarantee"; days: number; headline: string; body: string }
);

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

export type ThemeName = "store" | "clinical" | "family" | "offer" | "premium";

export type ConceptPage = {
  slug: string;
  /** Internal concept name for the review hub. */
  name: string;
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
    valueProps: "alternating" | "cards";
    /** Live countdown in the announcement bar (the store has one). Default true. */
    countdownBar?: boolean;
  };
  content: PdpContent;
};
