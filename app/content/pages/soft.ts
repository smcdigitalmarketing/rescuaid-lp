import { lifeImg } from "~/lib/images";
import { LOOX, loox } from "../base";
import type { ConceptPage } from "../types";
import {
  compareSlide,
  insideSlide,
  pairs,
  reviewSlide,
  shared,
  stepsSlide,
} from "./shared";

const kara = loox.find((r) => r.name === "Kara S.")!;
const karen = loox.find((r) => r.name === "Karen K.")!;

/**
 * Soft: a new brand direction. Friendly DTC in the spirit of Puppy Pad:
 * peach, mint and butter, rounded type, pill buttons, sticky-note reviews.
 */
export const soft: ConceptPage = {
  slug: "soft",
  name: "Soft: friendly family brand",
  group: "brand",
  path: "/pages/soft",
  theme: "soft",
  fonts: "family=Fredoka:wght@500;600&family=Nunito:wght@400;600;700",
  cover: lifeImg("heroSoft", "RescUAid device on a soft peach background"),
  hypothesis:
    "New parents find medical-looking products scary. A soft, friendly brand makes RescUAid feel like baby gear, not hospital kit.",
  traffic: "Meta and TikTok, expecting and new parents, baby-shower gifting",
  principles: [
    "Friendly, rounded brand",
    "Pill bundle picker",
    "Sticky-note reviews",
    "Gift angle",
  ],
  meta: {
    title: "RescUAid 2.0 | Little bites, big peace of mind",
    description:
      "The gentle, simple choking rescue kit for families with little ones.",
  },
  layout: {
    valueProps: "cards",
    wordmark: { text: "rescuaid", mark: "heart" },
    header: "centered",
    tiers: "pills",
    reviews: "notes",
    divider: "wave",
  },
  content: {
    ...shared,
    announcement: "Buy 2, get 1 free · Free shipping over $60",
    eyebrow: "Made for families with little ones",
    proofLine: `Loved by 10,000+ families · ${LOOX.rating}/5`,
    title: {
      product: "RescUAid 2.0",
      benefit: "Little bites, big peace of mind",
    },
    subtitle:
      "The gentle, simple choking rescue kit for families with little ones, from 12 months to grandparents.",
    bullets: [
      { icon: "baby", text: "A child mask sized for kids 12 months+ (22 lb+)" },
      { icon: "family", text: "An adult mask for everyone else at the table" },
      { icon: "fast", text: "Place, press, pull: no training needed" },
      {
        icon: "home",
        text: "Keep one by the high chair, one in the diaper bag",
      },
    ],
    gallery: [
      {
        kind: "headline",
        image: lifeImg(
          "heroSoft",
          "RescUAid device on a soft peach background",
        ),
        eyebrow: "For families with little ones",
        headline: "Little bites, big peace of mind",
        sub: "A child mask and an adult mask in every kit",
        proof: "Loved by 10,000+ families",
      },
      {
        kind: "inUse",
        image: lifeImg(
          "inUseKitchen",
          "A woman demonstrating RescUAid at a kitchen table",
        ),
        eyebrow: "So simple",
        headline: "Anyone at the table can do it",
        points: ["No training", "Works on yourself"],
      },
      {
        kind: "beforeAfter",
        headline: "Snack time, minus the worry",
        before: {
          image: pairs.dinner.before,
          label: "Before",
          caption: "Hovering over every bite",
        },
        after: {
          image: pairs.dinner.after,
          label: "After",
          caption: "Relaxed, with RescUAid nearby",
        },
      },
      insideSlide("What's in the box"),
      stepsSlide("Three gentle steps"),
      compareSlide("Why parents choose RescUAid"),
      reviewSlide(kara, "Less worry at home"),
    ],
    valueProps: {
      eyebrow: "Where it lives",
      headline: "Made for real family life",
      items: [
        {
          headline: "Right by the high chair",
          body: "Keep it on the shelf where little ones eat, so whoever is closest can grab it.",
          image: lifeImg(
            "softNursery",
            "RescUAid on a pastel shelf next to a high chair",
          ),
        },
        {
          headline: "In the diaper bag",
          body: "Compact, with no batteries and no expiry until used, so it can ride along for years.",
          image: lifeImg("v2Diaperbag", "RescUAid packed in a diaper bag"),
        },
        {
          headline: "At Grandma's house",
          body: "One kit covers the toddler and the grandparent: a child mask and an adult mask.",
          image: lifeImg("v2Grandparent", "Grandfather feeding his grandson"),
        },
        {
          headline: "The baby-shower gift parents keep",
          body: "“Bought these for baby shower gifts and they were well liked.” Buy 2, get 1 free: one to give.",
          image: lifeImg("adGift", "RescUAid tied with a red ribbon"),
        },
        {
          headline: "In the car",
          body: "A second kit lives in the console for snacks on the go.",
          image: lifeImg("v2Car", "RescUAid in a car's centre console"),
        },
      ],
    },
    reviews: {
      ...shared.reviews,
      headline: "Notes from parents",
      sub: "Real words from verified buyers.",
      items: [
        kara,
        karen,
        ...shared.reviews.items.filter((r) => r !== kara && r !== karen),
      ],
    },
    guarantee: {
      ...shared.guarantee,
      image: lifeImg(
        "softNursery",
        "RescUAid on a pastel shelf next to a high chair",
      ),
    },
  },
};
