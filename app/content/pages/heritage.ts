import { lifeImg } from "~/lib/images";
import { loox } from "../base";
import type { ConceptPage } from "../types";
import { compareSlide, insideSlide, pairs, reviewSlide, shared, stepsSlide, demoVideoSlide } from "./shared";

const nancy = loox.find((r) => r.name === "Nancy R.")!;
const georgiana = loox.find((r) => r.name === "Georgiana F.")!;

/**
 * Heritage: a new brand direction. A trusted household essential: bottle
 * green, parchment and gold, a classic serif, pull-quote reviews.
 */
export const heritage: ConceptPage = {
  slug: "heritage",
  name: "Heritage: household essential",
  group: "brand",
  path: "/pages/heritage",
  theme: "heritage",
  fonts: "family=Libre+Caslon+Text:wght@400;700&family=Source+Sans+3:wght@400;600;700",
  cover: lifeImg("heroHeritage", "RescUAid on a wooden pantry shelf"),
  hypothesis:
    "Older buyers and grandparents trust brands that feel established. A classic, household-essential look reads as safe and lasting.",
  traffic: "Facebook, older buyers, grandparents",
  principles: ["Classic serif brand", "Pull-quote reviews", "Ornament dividers", "Every-generation angle"],
  meta: {
    title: "RescUAid 2.0 | A household essential for every generation",
    description: "Kept on the shelf beside the first-aid kit, ready for years. A child mask and an adult mask in every kit.",
  },
  layout: {
    valueProps: "alternating",
    wordmark: { text: "RescUAid", mark: "cross" },
    header: "centered",
    hero: "reverse",
    reviews: "quotes",
    divider: "ornament",
  },
  content: {
    ...shared,
    announcement: "Buy 2, get 1 free · Free shipping over $60 · 90-day risk-free trial",
    eyebrow: "A household essential",
    proofLine: "Rated 4.8/5 by 10,000+ families",
    title: { product: "RescUAid 2.0", benefit: "A household essential for the most frightening minute at the table" },
    subtitle: "Kept on the shelf beside the first-aid kit, ready for years. A child mask and an adult mask in every kit.",
    bullets: [
      { icon: "home", text: "Belongs beside the smoke alarm and the first-aid kit" },
      { icon: "family", text: "Child mask (12 months+) and adult mask included" },
      { icon: "clock", text: "No batteries, no expiry until used" },
      { icon: "fast", text: "Place, press, pull: no training required" },
    ],
    gallery: [
      {
        kind: "headline",
        image: lifeImg("heroHeritage", "RescUAid on a wooden pantry shelf"),
        eyebrow: "A household essential",
        headline: "Every home has a first-aid kit. Few have this.",
        sub: "Choking rescue for every generation at the table",
        proof: "Rated 4.8/5 by 10,000+ families",
      },
      {
        kind: "inUse",
        image: lifeImg("inUseCaregiver", "A woman demonstrating RescUAid on her father"),
        eyebrow: "For every generation",
        headline: "From grandchildren to grandparents",
        points: ["Child mask", "Adult mask"],
      },
      {
        kind: "beforeAfter",
        headline: "Peace of mind, at any age",
        before: { image: pairs.alone.before, label: "Before", caption: "On her own, and unsure" },
        after: { image: pairs.alone.after, label: "After", caption: "Ready, with RescUAid on the counter" },
      },
      insideSlide("In every kit"),
      stepsSlide("Three simple steps"),
      compareSlide("Why households choose RescUAid"),
      reviewSlide(nancy, "“I add these to my gifts to family and friends”"),
      demoVideoSlide(),
    ],
    valueProps: {
      eyebrow: "Made to last",
      headline: "A quiet guardian for the family table",
      items: [
        {
          headline: "On the dresser, ready for years",
          body: "No batteries to charge and no expiry date until it's used. Inspect the masks every 2–3 years and it's ready.",
          image: lifeImg("heritageKitchen", "A grandmother setting the table with RescUAid on the dresser"),
        },
        {
          headline: "For the youngest and the oldest at the table",
          body: "A child mask for children over 12 months (22 lb+) and a standard mask for teens, adults and seniors, in one kit.",
          image: lifeImg("v2Grandparent", "Grandfather feeding his grandson"),
        },
        {
          headline: "No strength or training required",
          body: "Place the mask, press the handle, pull it back. The suction comes from one pull, not from abdominal thrusts.",
          image: lifeImg("stepPress", "Pressing the RescUAid handle"),
        },
        {
          headline: "A gift for the whole family",
          body: "“When we have gatherings at our house we let visitors know where it is.” Buy 2, get 1 free: one for each household.",
          image: lifeImg("adGift", "RescUAid tied with a red ribbon"),
        },
      ],
    },
    reviews: {
      ...shared.reviews,
      headline: "In their own words",
      sub: "Verified buyers on why they keep one at home.",
      items: [nancy, georgiana, ...shared.reviews.items.filter((r) => r !== nancy && r !== georgiana)],
    },
    guarantee: { ...shared.guarantee, image: lifeImg("heritageKitchen", "A grandmother setting the table") },
  },
};
