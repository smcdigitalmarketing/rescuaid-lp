import { MAIN_HANDLE } from "~/data/catalog";
import { lifeImg, pageImg } from "~/lib/images";
import { loox, media } from "../base";
import type { ConceptPage } from "../types";
import { compareSlide, insideSlide, pairs, reviewSlide, shared, stepsSlide, demoVideoSlide } from "./shared";

/**
 * Baseline: the video's structure in the live rescuaid.com look, so the only
 * change from today's store is structure and copy.
 */
export const baseline: ConceptPage = {
  slug: "baseline",
  name: "Baseline",
  path: `/products/${MAIN_HANDLE}`,
  theme: "store",
  fonts:
    "family=Oswald:wght@500;600;700&family=Roboto:wght@400;500;700&family=Poppins:wght@600;700",
  hypothesis:
    "Restructuring the current page to the video's framework lifts conversion on its own, with the brand look unchanged.",
  traffic: "Control for every channel",
  principles: [
    "Proof line above the title",
    "Benefit stacked into the title",
    "Infographic gallery that tells the whole story",
    "Dollar savings on every bundle",
  ],
  cover: media.kitClean,
  meta: {
    title: "RescUAid 2.0 | Anti-Choking Device for Adults & Children",
    description:
      "Help clear a blocked airway in three simple moves. Adult and child masks in every kit, 90-day risk-free trial.",
  },
  layout: { valueProps: "alternating" },
  content: {
    ...shared,
    proofLine: "Rated 4.8/5 by 10,000+ families",
    title: {
      product: "RescUAid 2.0 Anti-Choking Device",
      benefit:
        "Help clear a blocked airway in 3 simple moves, for adults and kids",
    },
    subtitle:
      "Your backup for the moments when back blows aren't working, or when you're the only one there.",
    bullets: [
      {
        icon: "fast",
        text: "Place, press, pull: simple enough to do with shaking hands",
      },
      {
        icon: "family",
        text: "Adult and child masks in every kit (ages 12 months and up)",
      },
      { icon: "alone", text: "Use it on yourself when no one else is home" },
      {
        icon: "shield",
        text: "No batteries and no expiry date until it's used",
      },
    ],
    gallery: [
      {
        kind: "headline",
        image: lifeImg("heroStore", "RescUAid device on a clean white background"),
        eyebrow: "RescUAid 2.0",
        headline: "Help clear a blocked airway in 3 simple moves",
        sub: "For adults and kids, ages 12 months and up",
        proof: "Rated 4.8/5 by 10,000+ families",
      },
      {
        kind: "inUse",
        image: lifeImg("inUseKitchen", "A woman demonstrating RescUAid on a calm adult at a kitchen table"),
        eyebrow: "Designed for real emergencies",
        headline: "Simple enough to use under stress",
        points: ["No training", "No strength", "Works on yourself"],
      },
      {
        kind: "beforeAfter",
        headline: "Peace of mind at every meal",
        before: { image: pairs.dinner.before, label: "Before", caption: "Dinner, hoping nothing goes wrong" },
        after: { image: pairs.dinner.after, label: "After", caption: "RescUAid within arm's reach" },
      },
      insideSlide(),
      stepsSlide(),
      compareSlide(),
      reviewSlide(loox[0], "4.8/5 from 389 verified reviews"),
      demoVideoSlide(),
    ],
    valueProps: {
      eyebrow: "Why RescUAid",
      headline: "Made for the worst minute of your life",
      items: [
        {
          eyebrow: "Simple under stress",
          headline: "Three moves you can do with shaking hands",
          body: "Place the mask over the mouth and nose, press the handle down, then pull it back. The one-way valve pushes air out, never in, and the suction helps lift the blockage free.",
          image: lifeImg(
            "stepPress",
            "Pressing the RescUAid handle with the mask sealed over the mouth and nose",
          ),
        },
        {
          eyebrow: "Every age",
          headline: "One kit protects your toddler and your grandfather",
          body: "Every kit has a child mask for kids over 12 months (22 lb and up) and a standard mask for teens, adults and seniors, so the whole family is covered by the device in your kitchen drawer.",
          image: lifeImg(
            "v2Grandparent",
            "Grandfather feeding his grandson with RescUAid on the table",
          ),
        },
        {
          eyebrow: "When you're alone",
          headline: "Help yourself when no one else is home",
          body: "RescUAid is designed for self-use. If something lodges in your throat and you live alone, you can place, press and pull on your own while 911 is on speaker.",
          image: lifeImg(
            "adAlone",
            "Woman in her seventies alone in her kitchen with RescUAid on the counter",
          ),
        },
        {
          eyebrow: "No strength needed",
          headline: "Works even when the person is bigger than you",
          body: "Abdominal thrusts take strength and practice. RescUAid needs neither: the suction comes from one pull of the handle.",
          image: lifeImg(
            "v1Caregiver",
            "Daughter and her father at the kitchen table",
          ),
        },
        {
          eyebrow: "Always ready",
          headline: "Sits in a drawer for years, ready the second you need it",
          body: "No batteries to charge and no expiry date unless it's used. Inspect the masks every 2–3 years and it's ready.",
          image: lifeImg("v2Nightstand", "RescUAid on a bedside table"),
        },
        {
          eyebrow: "Every room",
          headline: "Keep one within reach of every table you eat at",
          body: "In an emergency, the closest device is the one that helps. Families keep one in the kitchen, the car, the nursery and at the grandparents'.",
          image: pageImg(
            "rooms",
            "Protect every corner: RescUAid in the car, living room, kitchen, bedroom and bathroom",
          ),
        },
      ],
    },
  },
};
