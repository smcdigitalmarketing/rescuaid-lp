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

const carol = loox.find((r) => r.name === "Carol M.")!;

/**
 * Pop: a new brand direction. Social-native and loud: electric violet, hot
 * pink and lime, a chunky grotesk, a photo-wall of reviews.
 */
export const pop: ConceptPage = {
  slug: "pop",
  name: "Pop: social-native",
  group: "brand",
  path: "/pages/pop",
  theme: "pop",
  fonts:
    "family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Inter:wght@400;500;600;700",
  cover: lifeImg(
    "heroPop",
    "RescUAid device on a bright violet and pink background",
  ),
  hypothesis:
    "Younger parents scrolling TikTok and Reels stop for loud, playful brands. Energy and real photos beat polish.",
  traffic: "TikTok, Reels and Snapchat, parents under 35",
  principles: [
    "Loud, playful brand",
    "Short punchy headlines",
    "Photo-wall reviews",
    "Bento value props",
  ],
  meta: {
    title: "RescUAid 2.0 | Choking happens fast. Be faster.",
    description:
      "Three moves, two masks, zero batteries. The rescue kit that lives by the high chair.",
  },
  layout: {
    valueProps: "bento",
    wordmark: { text: "rescuaid", mark: "spark" },
    hero: "reverse",
    tiers: "grid",
    reviews: "ugc",
  },
  content: {
    ...shared,
    announcement: "BUY 2 GET 1 FREE • TONIGHT ONLY",
    eyebrow: "For parents who think ahead",
    proofLine: `${LOOX.rating}/5 from ${LOOX.count} verified reviews`,
    title: {
      product: "RescUAid 2.0",
      benefit: "Choking happens fast. Be faster.",
    },
    subtitle:
      "Three moves, two masks, zero batteries. The rescue kit that lives by the high chair, not lost in a drawer.",
    bullets: [
      { icon: "fast", text: "Place. Press. Pull. That's it." },
      { icon: "family", text: "Adult and kid masks in every kit" },
      { icon: "gift", text: "Buy 2, get 1 free: one for Grandma" },
      { icon: "truck", text: "Free shipping over $60" },
    ],
    gallery: [
      {
        kind: "headline",
        image: lifeImg(
          "heroPop",
          "RescUAid device on a bright violet and pink background",
        ),
        eyebrow: "RescUAid 2.0",
        headline: "Choking happens fast. Be faster.",
        sub: "Three moves. No training.",
        proof: `${LOOX.rating}/5 · ${LOOX.count} reviews`,
      },
      {
        kind: "inUse",
        image: lifeImg(
          "inUseKitchen",
          "A woman demonstrating RescUAid at a kitchen table",
        ),
        eyebrow: "Real talk",
        headline: "If you can press a button, you can do this",
        points: ["No training", "No strength"],
      },
      {
        kind: "beforeAfter",
        headline: "Same dinner. More calm.",
        before: {
          image: pairs.dinner.before,
          label: "Before",
          caption: "Watching every bite",
        },
        after: {
          image: pairs.dinner.after,
          label: "After",
          caption: "Ready, just in case",
        },
      },
      insideSlide("What you get"),
      stepsSlide("Place. Press. Pull."),
      compareSlide("Not all devices are equal"),
      reviewSlide(carol, "Parents are stocking up"),
    ],
    valueProps: {
      eyebrow: "Small enough for everywhere",
      headline: "One for every place they snack",
      items: [
        {
          eyebrow: "Diaper bag",
          headline: "Packed for every playdate",
          body: "No batteries, no expiry until used. Toss it in and forget it's there until you need it.",
          image: lifeImg("v2Diaperbag", "RescUAid packed in a diaper bag"),
        },
        {
          eyebrow: "Car",
          headline: "Road-trip snacks, covered",
          body: "Keep a second kit in the console.",
          image: lifeImg("v2Car", "RescUAid in a car's centre console"),
        },
        {
          eyebrow: "Self-use",
          headline: "Works on yourself too",
          body: "Home alone? You can place, press and pull on your own.",
          image: lifeImg(
            "inUseSelf",
            "A woman demonstrating self-use of RescUAid",
          ),
        },
        {
          eyebrow: "Gift",
          headline: "The baby-shower gift that actually gets used",
          body: "Buy 2, get 1 free: one for you, one for them, one for Grandma.",
          image: lifeImg("adGift", "RescUAid tied with a red ribbon"),
        },
        {
          eyebrow: "Kitchen",
          headline: "Right where they eat",
          body: "On the counter by the high chair, where whoever is closest can grab it.",
          image: lifeImg(
            "softNursery",
            "RescUAid on a shelf next to a high chair",
          ),
        },
      ],
    },
    reviews: {
      ...shared.reviews,
      headline: "Parents are stocking up",
      sub: "Real photos and words from verified buyers.",
      items: [carol, ...shared.reviews.items.filter((r) => r !== carol)],
    },
    guarantee: {
      ...shared.guarantee,
      image: lifeImg("heroPop", "RescUAid on violet and pink"),
    },
  },
};
