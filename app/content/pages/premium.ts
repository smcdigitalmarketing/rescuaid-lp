import { lifeImg } from "~/lib/images";
import { GUARANTEE_DAYS, LOOX, expert, loox, media } from "../base";
import type { ConceptPage } from "../types";
import { shared } from "./shared";

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
        role: "product",
        kind: "photo",
        image: lifeImg(
          "kitStudio",
          "RescUAid device with adult and child masks on a soft cream backdrop",
        ),
      },
      {
        role: "pain",
        kind: "overlay",
        image: lifeImg(
          "adAlone",
          "Woman in her seventies alone in her kitchen",
        ),
        headline: "For the minute you hope never comes.",
      },
      {
        role: "value",
        kind: "overlay",
        image: lifeImg(
          "v1Valve",
          "Close-up of the clear mask and one-way valve",
        ),
        headline: "Air out. Never in.",
        points: ["A one-way valve and a sealed mask"],
        align: "top",
      },
      {
        role: "value",
        kind: "overlay",
        image: lifeImg(
          "adInside",
          "RescUAid device, adult mask and child mask laid out",
        ),
        headline: "Everything you need. Nothing you don't.",
        points: ["Device", "Adult mask", "Child mask, 12 months and up"],
        align: "top",
      },
      {
        role: "how",
        kind: "overlay",
        image: lifeImg("stepPull", "Pulling the RescUAid handle back"),
        headline: "Place. Press. Pull.",
      },
      { role: "proof", kind: "proof", review: expert },
      { role: "proof", kind: "proof", review: monica },
      { role: "compare", kind: "photo", image: media.vsOthers, fit: "contain" },
      {
        role: "guarantee",
        kind: "guarantee",
        days: GUARANTEE_DAYS,
        headline: "Ninety days to be sure.",
        body: `If it isn't right for your family, email us within ${GUARANTEE_DAYS} days and we'll refund your order.`,
      },
      {
        role: "lifestyle",
        kind: "photo",
        image: lifeImg("v2Nightstand", "RescUAid on a bedside table"),
      },
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
