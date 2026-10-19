import { lifeImg } from "~/lib/images";
import { loox } from "../base";
import type { ConceptPage } from "../types";
import { compareSlide, insideSlide, pairs, reviewSlide, shared, stepsSlide } from "./shared";

const sarahW = loox.find((r) => r.name === "Sarah W.")!;

/**
 * Retro: a new brand direction. A warm 1970s kitchen: mustard, burnt
 * orange, avocado and brown, a friendly serif, colour-block reviews.
 */
export const retro: ConceptPage = {
  slug: "retro",
  name: "Retro: warm family kitchen",
  group: "brand",
  path: "/pages/retro",
  theme: "retro",
  fonts: "family=Young+Serif&family=Work+Sans:wght@400;500;600;700",
  cover: lifeImg("heroRetro", "RescUAid on a mustard kitchen counter"),
  hypothesis: "Warm, nostalgic branding stands out in a feed of clinical safety ads and feels like family, not fear.",
  traffic: "Meta and Pinterest, millennial parents",
  principles: ["Nostalgic warm palette", "Pill bundle picker", "Colour-block reviews", "Family-dinner angle"],
  meta: {
    title: "RescUAid 2.0 | Family dinners, with a backup plan",
    description: "Big family meals, little ones at the table. RescUAid sits on the counter, just in case.",
  },
  layout: {
    valueProps: "cards",
    wordmark: { text: "rescuaid", mark: "sun" },
    tiers: "pills",
    reviews: "ugc",
    divider: "wave",
  },
  content: {
    ...shared,
    announcement: "Buy 2, get 1 free · One for Grandma's kitchen",
    eyebrow: "The family-dinner backup plan",
    proofLine: "Loved by 10,000+ families · 4.8/5",
    title: { product: "RescUAid 2.0", benefit: "Family dinners, with a backup plan" },
    subtitle:
      "Big family meals, little ones at the table, Grandpa telling stories. RescUAid sits on the counter, just in case.",
    bullets: [
      { icon: "family", text: "Kid and adult masks in every kit" },
      { icon: "fast", text: "Place, press, pull: no training" },
      { icon: "gift", text: "Buy 2, get 1 free: one for Grandma's kitchen" },
      { icon: "shield", text: "No batteries, ready for years" },
    ],
    gallery: [
      {
        kind: "headline",
        image: lifeImg("heroRetro", "RescUAid on a mustard kitchen counter"),
        eyebrow: "The family-dinner backup plan",
        headline: "Pass the potatoes. Keep this close.",
        sub: "Choking rescue for the whole table",
        proof: "Loved by 10,000+ families",
      },
      {
        kind: "inUse",
        image: lifeImg("inUseKitchen", "A woman demonstrating RescUAid at a kitchen table"),
        eyebrow: "Easy as pie",
        headline: "Three moves anyone at the table can do",
        points: ["No training", "Works on yourself"],
      },
      {
        kind: "beforeAfter",
        headline: "Family dinner, upgraded",
        before: { image: pairs.dinner.before, label: "Before", caption: "Fingers crossed" },
        after: { image: pairs.dinner.after, label: "After", caption: "Backup plan on the counter" },
      },
      insideSlide("What's in the box"),
      stepsSlide("Place. Press. Pull."),
      compareSlide("The family-friendly choice"),
      reviewSlide(sarahW, "One in every room"),
    ],
    valueProps: {
      eyebrow: "Where it lives",
      headline: "Wherever the family eats",
      items: [
        {
          headline: "On the counter at family dinner",
          body: "Right where the food is, so whoever is closest can grab it.",
          image: lifeImg("v2Hero", "Family dinner with RescUAid on the counter"),
        },
        {
          headline: "At Grandma's",
          body: "One kit covers the little ones and the grandparents: child and adult masks included.",
          image: lifeImg("v2Grandparent", "Grandfather feeding his grandson"),
        },
        {
          headline: "On road trips",
          body: "Compact and battery-free, it rides in the car's console for years.",
          image: lifeImg("v2Car", "RescUAid in a car's centre console"),
        },
        {
          headline: "Gift one, keep one",
          body: "Buy 2, get 1 free: one for your kitchen, one for theirs, one spare.",
          image: lifeImg("adGift", "RescUAid tied with a red ribbon"),
        },
        {
          headline: "In the diaper bag",
          body: "For playdates, picnics and every snack in between.",
          image: lifeImg("v2Diaperbag", "RescUAid packed in a diaper bag"),
        },
      ],
    },
    reviews: {
      ...shared.reviews,
      headline: "Families keep one in every room",
      sub: "Real words and photos from verified buyers.",
      items: [sarahW, ...shared.reviews.items.filter((r) => r !== sarahW)],
    },
    guarantee: { ...shared.guarantee, image: lifeImg("heroRetro", "RescUAid on a mustard kitchen counter") },
  },
};
