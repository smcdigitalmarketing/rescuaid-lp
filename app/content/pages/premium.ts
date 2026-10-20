import { lifeImg } from "~/lib/images";
import { GUARANTEE_DAYS, LOOX, loox } from "../base";
import type { ConceptPage } from "../types";
import { compareSlide, insideSlide, pairs, reviewSlide, shared, stepsSlide, demoVideoSlide } from "./shared";

const monica = loox.find((r) => r.name === "Monica L.")!;

/**
 * Premium minimal: the same structure with an editorial look and fewer,
 * calmer words. Tests whether a premium feel alone moves conversion.
 */
export const premium: ConceptPage = {
  slug: "premium",
  name: "Premium minimal",
  path: "/pages/premium",
  theme: "premium",
  fonts: "family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700",
  hypothesis:
    "A calm, editorial page makes a $60 safety device feel worth it, and lifts conversion without louder offers.",
  traffic: "Any; strongest for gift buyers and higher-income audiences",
  principles: [
    "Visual hierarchy through white space",
    "Cognitive fluency: one short sentence per idea",
    "Large infographic slides",
    "Proof that answers the price objection",
  ],
  cover: lifeImg("kitStudio", "RescUAid device with its masks on a cream backdrop"),
  meta: {
    title: "RescUAid 2.0 | Be the calm one",
    description:
      "A quiet, simple device for the most frightening minute a family can face. Place, press, pull.",
  },
  layout: { valueProps: "alternating", countdownBar: false },
  content: {
    ...shared,
    announcement: `Free shipping over $60 · ${GUARANTEE_DAYS}-day risk-free trial`,
    eyebrow: "The choking rescue kit",
    proofLine: `${LOOX.rating} / 5 from ${LOOX.count} verified owners`,
    title: {
      product: "RescUAid 2.0",
      benefit: "Be the calm one in the moment someone can't breathe",
    },
    subtitle:
      "A quiet, simple device for the most frightening minute a family can face.",
    bullets: [
      { icon: "fast", text: "Three moves. No training required." },
      { icon: "family", text: "Adult and child masks, in one kit." },
      { icon: "shield", text: "No batteries. No expiry until used." },
    ],
    underAtc: {
      ...shared.underAtc,
      urgency: "Buy 2, Get 1 Free ends tonight:",
    },
    gallery: [
      {
        kind: "headline",
        image: lifeImg("heroPremium", "RescUAid device resting on cream linen"),
        eyebrow: "RescUAid 2.0",
        headline: "Be the calm one",
        sub: "For the minute you hope never comes",
        proof: "4.8 / 5 from 389 owners",
      },
      {
        kind: "inUse",
        image: lifeImg("inUseSelf", "A woman demonstrating self-use of RescUAid in her kitchen"),
        headline: "Designed for the moment you're alone",
      },
      {
        kind: "beforeAfter",
        headline: "Quietly ready",
        before: { image: pairs.alone.before, label: "Before", caption: "Alone, and unsure" },
        after: { image: pairs.alone.after, label: "After", caption: "Calm, and prepared" },
      },
      insideSlide("Everything you need. Nothing you don't."),
      stepsSlide("Place. Press. Pull."),
      compareSlide("Considered, not clunky"),
      reviewSlide(monica, "“A good investment for my family”"),
      demoVideoSlide(),
    ],
    valueProps: {
      headline: "Quietly ready, for years",
      items: [
        {
          headline: "Air out. Never in.",
          body: "Press the handle and air leaves through a one-way valve. Pull, and gentle suction through the sealed mask helps lift the blockage.",
          image: lifeImg(
            "v1Valve",
            "Close-up of the clear mask and one-way valve",
          ),
        },
        {
          headline: "For the smallest and the oldest at your table.",
          body: "A child mask for children over 12 months and a standard mask for teens, adults and seniors.",
          image: lifeImg("v2Grandparent", "Grandfather feeding his grandson"),
        },
        {
          headline: "Ready for the moment you're alone.",
          body: "Designed for self-use, so help doesn't depend on someone else being home.",
          image: lifeImg("adAlone", "Woman in her seventies in her kitchen"),
        },
        {
          headline: "Made to sit quietly in a drawer for years.",
          body: "No batteries, no charging and no expiry date unless it's used.",
          image: lifeImg("v2Nightstand", "RescUAid on a bedside table"),
        },
        {
          headline: "A considered gift for new parents and grandparents.",
          body: "Two kits, and a third free: one to keep and two to give.",
          image: lifeImg("adGift", "RescUAid tied with a red ribbon"),
        },
      ],
    },
    reviews: {
      ...shared.reviews,
      headline: `${LOOX.count} owners. ${LOOX.rating} out of 5.`,
      sub: "Unedited reviews from verified buyers on Loox.",
      items: [monica, ...shared.reviews.items.filter((r) => r !== monica)],
    },
    guarantee: {
      ...shared.guarantee,
      headline: "Ninety days to be sure.",
      image: lifeImg("kitStudio", "RescUAid device with its masks"),
    },
  },
};
