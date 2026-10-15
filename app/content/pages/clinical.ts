import { lifeImg, pageImg } from "~/lib/images";
import { GUARANTEE_DAYS, LOOX, expert, loox, media } from "../base";
import type { ConceptPage } from "../types";
import { shared } from "./shared";

const tom = loox.find((r) => r.name === "Tom R.")!;

/**
 * Clinical, trust-led: for people searching for a choking device who want to
 * know how it works and whether to trust it before they buy.
 */
export const clinical: ConceptPage = {
  slug: "clinical",
  name: "Clinical, trust-led",
  path: "/pages/clinical",
  theme: "clinical",
  fonts:
    "family=Source+Serif+4:opsz,wght@8..60,600;8..60,700&family=Inter:wght@400;500;600;700",
  hypothesis:
    "Cold searchers and caregivers convert better when authority comes first: how it works, the first-aid order, and an EMT's word.",
  traffic: "Google search, caregivers, older buyers",
  principles: [
    "Expert quote in the hero",
    "Explain how it works before asking for the sale",
    "Specific, factual headlines",
    "Comparison table",
  ],
  cover: lifeImg("v1Hero", "RescUAid standing upright on its mask"),
  meta: {
    title: "RescUAid 2.0 | How it works, and why an EMT keeps one at home",
    description:
      "A one-way valve and a sealed mask: the next step when back blows aren't clearing the airway. Adult and child masks included.",
  },
  layout: { valueProps: "cards" },
  content: {
    ...shared,
    eyebrow: "Choking rescue device · Ages 12 months and up",
    proofLine: `${LOOX.rating}/5 from ${LOOX.count} verified reviews`,
    title: {
      product: "RescUAid 2.0",
      benefit: "The next step when back blows aren't clearing the airway",
    },
    subtitle:
      "Gentle suction through a sealed mask, with a one-way valve that never pushes air into the airway.",
    bullets: [
      {
        icon: "shield",
        text: "One-way valve: air goes out, never into the airway",
      },
      {
        icon: "family",
        text: "Adult and child masks (12 months and up, 22 lb+)",
      },
      { icon: "alone", text: "Designed for self-use when you're alone" },
      { icon: "clock", text: "No batteries and no expiry until used" },
    ],
    heroQuote: expert,
    gallery: [
      { role: "product", kind: "photo", image: media.kitClean, fit: "contain" },
      {
        role: "pain",
        kind: "overlay",
        image: lifeImg(
          "v1Caregiver",
          "Daughter and her father at the kitchen table",
        ),
        eyebrow: "The gap first aid leaves",
        headline: "When back blows don't work, every second counts",
        points: [
          "Typical EMS response is 8–12 minutes",
          "Brain damage can begin within 4–6",
        ],
      },
      {
        role: "value",
        kind: "overlay",
        image: lifeImg(
          "v1Valve",
          "Close-up of the clear mask and one-way valve",
        ),
        eyebrow: "How it's built",
        headline: "Air goes out. Never in.",
        points: [
          "Press: air leaves through the one-way valve",
          "Pull: suction through the sealed mask",
        ],
        align: "top",
      },
      { role: "value", kind: "photo", image: media.engineered, fit: "contain" },
      { role: "how", kind: "photo", image: media.howCompress, fit: "contain" },
      { role: "how", kind: "photo", image: media.threeSteps, fit: "contain" },
      { role: "how", kind: "photo", image: media.demoGif },
      { role: "proof", kind: "proof", review: expert },
      { role: "proof", kind: "proof", review: tom },
      { role: "compare", kind: "photo", image: media.vsOthers, fit: "contain" },
      {
        role: "guarantee",
        kind: "guarantee",
        days: GUARANTEE_DAYS,
        headline: "Risk-free for 90 days",
        body: `Email us within ${GUARANTEE_DAYS} days if it isn't right for you and we'll refund your order.`,
      },
      {
        role: "lifestyle",
        kind: "photo",
        image: lifeImg(
          "adAlone",
          "Woman in her seventies in her kitchen with RescUAid on the counter",
        ),
      },
    ],
    valueProps: {
      eyebrow: "How it's designed",
      headline: "Engineered to be simple in the moment it matters",
      items: [
        {
          eyebrow: "One-way valve",
          headline: "Air goes out, never into the airway",
          body: "Pressing the handle pushes air out through the valve. Pulling it back creates suction through the sealed mask to help lift the obstruction.",
          image: lifeImg(
            "v1Valve",
            "Close-up of the clear mask and one-way valve",
          ),
        },
        {
          eyebrow: "Two masks",
          headline: "A sealed fit from age one to adulthood",
          body: "A child mask for children over 12 months who weigh at least 22 lb, and a standard mask for teens, adults and seniors.",
          image: pageImg(
            "inside-box",
            "What's in the box: suction device, adult mask, child mask, manual and practice mask",
          ),
        },
        {
          eyebrow: "Self-use",
          headline: "Usable on yourself when you're alone",
          body: "You can place, press and pull on your own. If you can, call 911 first, even on speaker.",
          image: lifeImg(
            "adAlone",
            "Woman in her seventies alone in her kitchen",
          ),
        },
        {
          eyebrow: "No strength",
          headline: "No strength or training required",
          body: "Abdominal thrusts depend on strength and technique. The suction from RescUAid comes from one pull of the handle.",
          image: lifeImg("stepPull", "Pulling the RescUAid handle back"),
        },
        {
          eyebrow: "First-aid order",
          headline: "A backup to first aid, never a replacement",
          body: "Call 911 and give back blows and abdominal thrusts first. If the airway is still blocked, RescUAid is the next step.",
          image: lifeImg(
            "stepPlace",
            "Placing the RescUAid mask over the mouth and nose",
          ),
        },
        {
          eyebrow: "Shelf life",
          headline: "Ready for years without maintenance",
          body: "No batteries and no expiry date unless it's used. Inspect the masks and replace them every 2–3 years.",
          image: lifeImg("v2Nightstand", "RescUAid on a bedside table"),
        },
      ],
    },
    reviews: {
      ...shared.reviews,
      headline: `${LOOX.rating} out of 5 from ${LOOX.count} verified buyers, including an EMT`,
      items: [expert, tom, ...loox.filter((r) => r !== tom)],
    },
    guarantee: {
      ...shared.guarantee,
      image: pageImg("inside-box", "What's in the box"),
    },
  },
};
