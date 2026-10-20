import { lifeImg } from "~/lib/images";
import { LOOX, expert } from "../base";
import type { ConceptPage } from "../types";
import { compareSlide, insideSlide, pairs, reviewSlide, shared, stepsSlide, demoVideoSlide } from "./shared";

/**
 * Story: a new brand direction. An editorial long-read that teaches first and
 * sells second. Clearly RescUAid's own article: no made-up publication.
 */
export const story: ConceptPage = {
  slug: "story",
  name: "Story: editorial long-read",
  group: "brand",
  path: "/pages/story",
  theme: "story",
  fonts: "family=Playfair+Display:wght@700;800&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&family=Inter:wght@500;600;700",
  cover: lifeImg("heroStory", "RescUAid on a family dining table after dinner"),
  hypothesis:
    "Parents who don't yet see the risk convert when the page teaches first: the 4-minute window, the first-aid order, then the product.",
  traffic: "Cold Meta traffic, parents who haven't heard of anti-choking devices",
  principles: ["Headline-first hero", "Education before the sale", "Numbered first-aid order", "Pull-quote reviews"],
  meta: {
    title: "The 4 minutes that matter most at the dinner table | RescUAid",
    description:
      "What every family should know about choking at the table, and the simple device that helps when back blows aren't working.",
  },
  layout: {
    valueProps: "numbered",
    wordmark: { text: "RescUAid", mark: "plus" },
    hero: "headline",
    reviews: "quotes",
    divider: "rule",
  },
  content: {
    ...shared,
    announcement: "Buy 2, get 1 free · 90-day risk-free trial",
    eyebrow: "Family safety",
    byline: "From the RescUAid team · 4-minute read",
    proofLine: `${LOOX.rating}/5 from ${LOOX.count} verified reviews`,
    title: { product: "RescUAid 2.0", benefit: "Help is 8–12 minutes away. The first four are up to you." },
    subtitle:
      "What every family should know about choking at the table, and the simple device that helps you act when back blows aren't working.",
    bullets: [
      { icon: "timer", text: "Typical EMS response: 8–12 minutes" },
      { icon: "heart", text: "Brain damage can begin within 4–6 minutes" },
      { icon: "fast", text: "RescUAid: place, press, pull" },
      { icon: "family", text: "Adult and child masks in every kit" },
    ],
    gallery: [
      {
        kind: "headline",
        image: lifeImg("heroStory", "RescUAid on a family dining table after dinner"),
        eyebrow: "Family safety",
        headline: "The 4 minutes that matter most",
        sub: "What every family should know about choking at the table",
        proof: `${LOOX.rating}/5 · ${LOOX.count} verified reviews`,
      },
      {
        kind: "inUse",
        image: lifeImg("inUseKitchen", "A woman demonstrating RescUAid at a kitchen table"),
        eyebrow: "The next step",
        headline: "When back blows aren't working",
        points: ["Place", "Press", "Pull"],
      },
      {
        kind: "beforeAfter",
        headline: "The same dinner, better prepared",
        before: { image: pairs.dinner.before, label: "Before", caption: "Hoping nothing happens" },
        after: { image: pairs.dinner.after, label: "After", caption: "Ready if it does" },
      },
      insideSlide("What's in the kit"),
      stepsSlide("Place. Press. Pull."),
      compareSlide("How RescUAid compares"),
      reviewSlide(expert, "An EMT's view"),
      demoVideoSlide(),
    ],
    valueProps: {
      eyebrow: "What to do",
      headline: "The order that matters, in five steps",
      items: [
        {
          eyebrow: "First",
          headline: "Call 911 and start first aid",
          body: "Give back blows and abdominal thrusts as the Red Cross and AHA teach. Many blockages clear here.",
          image: lifeImg("v1Caregiver", "Daughter and her father at the kitchen table"),
        },
        {
          eyebrow: "If that isn't working",
          headline: "Reach for RescUAid",
          body: "Place the mask, press the handle, pull it back. The one-way valve pushes air out, never in; the pull creates suction.",
          image: lifeImg("stepPlace", "Placing the RescUAid mask over the mouth and nose"),
        },
        {
          eyebrow: "Where to keep it",
          headline: "Within reach of every table you eat at",
          body: "Seconds spent searching are seconds lost. Families keep one in the kitchen, the car and at the grandparents'.",
          image: lifeImg("v2Hero", "Family dinner with RescUAid on the counter"),
        },
        {
          eyebrow: "Tell people",
          headline: "Make sure everyone knows where it is",
          body: "“When we have gatherings at our house we let visitors know where it is.” — Nancy R., verified buyer.",
          image: lifeImg("heroStory", "RescUAid on a family dining table"),
        },
        {
          eyebrow: "Every few years",
          headline: "Check the masks",
          body: "No batteries and no expiry until used. Inspect the masks and replace them every 2–3 years.",
          image: lifeImg("v2Nightstand", "RescUAid on a bedside table"),
        },
      ],
    },
    reviews: {
      ...shared.reviews,
      headline: "What families told us",
      sub: "Verified reviews from Loox, rescuaid.com and Facebook.",
    },
    guarantee: { ...shared.guarantee, image: lifeImg("heroStory", "RescUAid on a family dining table") },
  },
};
