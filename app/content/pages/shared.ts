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
import type { PdpContent, Review } from "../types";

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
