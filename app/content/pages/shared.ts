/**
 * Defaults every concept starts from. A concept page spreads these and then
 * overrides the copy angle, gallery, bullets and value props.
 */
import { lifeImg } from "~/lib/images";
import {
  FREE_SHIPPING_MIN,
  GUARANTEE_DAYS,
  LOOX,
  accordions,
  addOns,
  comparisonRows,
  expert,
  faqs,
  guaranteeCopy,
  lifestyle,
  loox,
  safety,
  steps,
  stories,
  tiers,
  timeStats,
  underAtcLines,
} from "../base";
import type { PdpContent, Review, Slide } from "../types";

// ── Gallery slide builders (Russab's 7-slide order) ─────────────────────────

/** 3 · The two before → after pairs: the same scene, without and with the device. */
export const pairs = {
  dinner: {
    before: lifeImg("beforeDinner", "A mother watching her toddler eat at a family dinner, nothing within reach"),
    after: lifeImg("v2Hero", "The same family dinner, relaxed, with RescUAid on the counter"),
  },
  alone: {
    before: lifeImg("beforeAlone", "A woman alone in her kitchen looking at her phone, uneasy"),
    after: lifeImg("adAlone", "The same woman making tea, calm, with RescUAid on the counter"),
  },
};

/** 4 · What's inside: the kit as sold (practice masks and the travel case are extra). */
export function insideSlide(headline = "Everything in the kit"): Slide {
  return {
    kind: "inside",
    image: lifeImg("adInside", "RescUAid device, adult mask and child mask laid out"),
    headline,
    items: [
      { qty: "1", name: "RescUAid device", note: "One-way valve" },
      { qty: "1", name: "Adult mask", note: "Teens, adults, seniors" },
      { qty: "1", name: "Child mask", note: "12 months+, 22 lb+" },
      { name: "Step-by-step guide", note: "Readable under stress" },
    ],
  };
}

/** 5 · How it works: place, press, pull. */
export function stepsSlide(headline = "Three moves. No training."): Slide {
  return {
    kind: "steps",
    headline,
    steps: [
      { title: "Place", image: lifeImg("stepPlace", "Placing the mask over the mouth and nose") },
      { title: "Press", image: lifeImg("stepPress", "Pressing the handle down") },
      { title: "Pull", image: lifeImg("stepPull", "Pulling the handle back") },
    ],
  };
}

/** 6 · Us vs them: four rows from the live store's comparison table. */
export function compareSlide(headline = "Built for the moment panic sets in"): Slide {
  const pick = ["Can be used alone", "Needs a lot of strength", "Safe for all ages", "Compact and travel-ready"];
  return {
    kind: "compare",
    headline,
    us: { name: "RescUAid", image: lifeImg("v1Hero", "RescUAid standing upright on its mask") },
    them: { name: "Other devices", image: lifeImg("otherDevice", "A generic, bulky plunger-style device") },
    rows: pick.map((label) => {
      const r = comparisonRows.find((x) => x.label === label)!;
      return { label: r.label, us: r.us, them: r.them };
    }),
  };
}

/** 7 · A real review, shown like a screenshot of the review widget. */
export const reviewSlide = (review: Review, headline?: string): Slide => ({ kind: "review", headline, review });

/** 8 · Extra: the Veo demo loop (npm run videos:build writes public/video/demo.*). */
export const DEMO_VIDEO = { src: "/video/demo.mp4", poster: "/video/demo.jpg" };
export const demoVideoSlide = (headline = "Place. Press. Pull."): Slide => ({
  kind: "video",
  ...DEMO_VIDEO,
  alt: "Demonstration: a hand presses the RescUAid handle, then pulls it back, with the mask sealed over a calm adult's mouth and nose",
  eyebrow: "See it in action",
  headline,
});

/** The EMT quote, trimmed for the space under the button. */
export const expertShort: Review = {
  ...expert,
  quote:
    "As an EMT, RescUAid is one of the most practical choking rescue tools I've seen. I keep one at home and recommend having one anywhere people eat.",
};

const facebook = stories.filter((s) => s.source === "Facebook");
const saves = stories.filter((s) => s.source === "rescuaid.com");

export const shared = {
  announcement: "BUY 2 GET 1 FREE • SALE ENDS TONIGHT",
  buy: {
    steps: ["Choose your bundle", "Add extras (optional)"],
    tiers,
    defaultTier: "b2g1",
    addOns,
    cta: "Add to cart",
  },
  underAtc: {
    lines: underAtcLines,
    urgency: "Buy 2 Get 1 Free ends in",
    guarantee: guaranteeCopy,
    review: expertShort,
  },
  accordions,
  lifestyle,
  reviews: {
    headline: "Join 10,000+ families who keep RescUAid within arm's reach",
    sub: "Unedited reviews from verified buyers, with the photos they sent in.",
    rating: LOOX.rating,
    count: LOOX.count,
    items: [loox[0], expert, loox[1], ...facebook, ...loox.slice(2)],
  },
  howItWorks: {
    headline: "Place, press, pull: three moves anyone can do",
    sub: "No training, no strength and no batteries.",
    steps,
  },
  stats: {
    headline: "Help is 8–12 minutes away. RescUAid is within arm's reach.",
    sub: "Without oxygen, brain damage can begin within 4–6 minutes. Having a device nearby lets you act in the first few.",
    items: timeStats,
  },
  comparison: {
    headline: "Built for the moment panic sets in",
    sub: "For when strength fails or no one else is around.",
    us: "RescUAid",
    them: "Other devices",
    rows: comparisonRows,
  },
  guarantee: {
    days: GUARANTEE_DAYS,
    headline: `${GUARANTEE_DAYS} days to make sure it's right for your family`,
    body: guaranteeCopy.body,
    points: [
      `Free shipping on orders over $${FREE_SHIPPING_MIN}`,
      "Ships from our US warehouse in 1–2 business days",
      "US-based support, Monday to Friday",
    ],
    image: lifeImg(
      "v1Caregiver",
      "Daughter and her father at the kitchen table, RescUAid within reach",
    ),
  },
  finalProof: {
    headline: "“The day it arrived was the day I needed it”",
    sub: "Stories RescUAid owners have shared with us.",
    items: [...saves, facebook[0]],
  },
  faqs,
  safety,
} satisfies Omit<
  PdpContent,
  "gallery" | "proofLine" | "title" | "subtitle" | "bullets" | "valueProps"
>;
