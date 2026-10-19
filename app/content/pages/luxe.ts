import { lifeImg } from "~/lib/images";
import { LOOX, loox } from "../base";
import type { ConceptPage } from "../types";
import { compareSlide, insideSlide, pairs, reviewSlide, shared, stepsSlide } from "./shared";

const karen = loox.find((r) => r.name === "Karen K.")!;
const nancy = loox.find((r) => r.name === "Nancy R.")!;

/**
 * Luxe: a new brand direction. Gift-led luxury: black and champagne gold,
 * a high-contrast serif, a headline-first hero.
 */
export const luxe: ConceptPage = {
  slug: "luxe",
  name: "Luxe: the considered gift",
  group: "brand",
  path: "/pages/luxe",
  theme: "luxe",
  fonts: "family=Cormorant+Garamond:wght@500;600&family=Jost:wght@400;500;600",
  cover: lifeImg("heroLuxe", "RescUAid in an open black gift box"),
  hypothesis:
    "Positioned as a premium gift for new parents and grandparents, RescUAid sells more multi-kit bundles at the same price.",
  traffic: "Gift seasons, baby showers, grandparent audiences",
  principles: ["Dark luxury brand", "Headline-first hero", "Gift-led bundles", "Ornament dividers"],
  meta: {
    title: "RescUAid 2.0 | The gift of being ready",
    description: "For new parents, grandparents and the people you'd do anything for: a calm, simple choking rescue kit.",
  },
  layout: {
    valueProps: "alternating",
    wordmark: { text: "RESCUAID", mark: "gem" },
    header: "centered",
    hero: "headline",
    tiers: "grid",
    reviews: "list",
    divider: "ornament",
    countdownBar: false,
  },
  content: {
    ...shared,
    announcement: "Complimentary shipping over $60 · 90-day risk-free trial",
    eyebrow: "The considered gift",
    proofLine: `${LOOX.rating} / 5 from ${LOOX.count} verified owners`,
    title: { product: "RescUAid 2.0", benefit: "The gift of being ready" },
    subtitle:
      "For new parents, grandparents and the people you'd do anything for: a calm, simple choking rescue kit, beautifully given.",
    bullets: [
      { icon: "gift", text: "Buy 2, get 1 free: give two, keep one" },
      { icon: "family", text: "Adult and child masks in every kit" },
      { icon: "shield", text: "No batteries, no expiry until used" },
      { icon: "truck", text: "Free shipping over $60" },
    ],
    underAtc: { ...shared.underAtc, urgency: "Buy 2, Get 1 Free ends tonight:" },
    gallery: [
      {
        kind: "headline",
        image: lifeImg("heroLuxe", "RescUAid in an open black gift box"),
        eyebrow: "The considered gift",
        headline: "Given with love. Kept for years.",
        sub: "For the people you'd do anything for",
        proof: `${LOOX.rating} / 5 from ${LOOX.count} owners`,
      },
      {
        kind: "inUse",
        image: lifeImg("inUseSelf", "A woman demonstrating self-use of RescUAid"),
        eyebrow: "Effortless",
        headline: "Three moves. No training.",
      },
      {
        kind: "beforeAfter",
        headline: "Quiet confidence",
        before: { image: pairs.alone.before, label: "Before", caption: "Alone, and unsure" },
        after: { image: pairs.alone.after, label: "After", caption: "Calm, and prepared" },
      },
      insideSlide("Inside the box"),
      stepsSlide("Place. Press. Pull."),
      compareSlide("Considered design"),
      reviewSlide(karen, "“They came in nice packaging and were made well”"),
    ],
    valueProps: {
      eyebrow: "Why it makes the gift",
      headline: "Thoughtful, in every detail",
      items: [
        {
          headline: "Beautifully given",
          body: "Buy 2, get 1 free: a kit for them, a kit for you, and one more to give.",
          image: lifeImg("luxeGift", "Hands exchanging a black gift box"),
        },
        {
          headline: "Engineered simply",
          body: "A one-way valve and a sealed mask: air goes out, never into the airway.",
          image: lifeImg("v1Valve", "Close-up of the clear mask and one-way valve"),
        },
        {
          headline: "For every generation",
          body: "A child mask for 12 months and up, and an adult mask for everyone else.",
          image: lifeImg("v2Grandparent", "Grandfather feeding his grandson"),
        },
        {
          headline: "Ready for years",
          body: "No batteries, no charging and no expiry until it's used.",
          image: lifeImg("v2Nightstand", "RescUAid on a bedside table"),
        },
      ],
    },
    reviews: {
      ...shared.reviews,
      headline: "A gift people keep",
      sub: "Verified reviews from Loox and rescuaid.com.",
      items: [karen, nancy, ...shared.reviews.items.filter((r) => r !== karen && r !== nancy)],
    },
    guarantee: { ...shared.guarantee, image: lifeImg("luxeGift", "Hands exchanging a black gift box") },
  },
};
