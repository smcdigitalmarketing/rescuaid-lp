import { lifeImg, pageImg } from "~/lib/images";
import { GUARANTEE_DAYS, LOOX, loox } from "../base";
import type { ConceptPage } from "../types";
import { compareSlide, insideSlide, pairs, reviewSlide, shared, stepsSlide, demoVideoSlide } from "./shared";

const carol = loox.find((r) => r.name === "Carol M.")!;
const sarahW = loox.find((r) => r.name === "Sarah W.")!;

/**
 * Offer-first, mobile: retargeting visitors already know the product, so the
 * page leads with the deal and stays short.
 */
export const offer: ConceptPage = {
  slug: "offer",
  name: "Offer-first, mobile",
  path: "/pages/offer",
  theme: "offer",
  fonts: "family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600;700",
  hypothesis:
    "Retargeted visitors already believe in the product. Putting the bundle math and gifts first, on a short page, converts them faster.",
  traffic: "Retargeting, email and SMS",
  principles: [
    "Savings spelled out in dollars and per kit",
    "Gift thumbnails in the bundle cards",
    "Urgency under the button",
    "Short page: fewer value props",
  ],
  cover: lifeImg("v3Bundle", "Three RescUAid devices side by side"),
  meta: {
    title: "Buy 2, Get 1 Free: 3 RescUAid kits for $99.99",
    description:
      "Three complete kits, a free Emergency CPR Guide and free shipping. Offer ends at midnight.",
  },
  layout: { compact: true, valueProps: "cards" },
  content: {
    ...shared,
    announcement: "TODAY ONLY: BUY 2 GET 1 FREE + FREE CPR GUIDE",
    eyebrow: "Limited-time bundle",
    proofLine: `${LOOX.rating}/5 · ${LOOX.count} verified reviews`,
    title: {
      product: "RescUAid 2.0 · Buy 2, Get 1 Free",
      benefit: "3 kits for $99.99: home, car and Grandma's covered",
    },
    subtitle:
      "That's $33.33 a kit, plus a free Emergency CPR Guide. The offer ends at midnight.",
    bullets: [
      {
        icon: "gift",
        text: "Free Emergency CPR Guide ($15 value) with 3 or more kits",
      },
      { icon: "truck", text: "Free shipping, sent within 1–2 business days" },
      { icon: "returns", text: `${GUARANTEE_DAYS}-day risk-free trial` },
      { icon: "family", text: "Adult and child masks in every kit" },
    ],
    buy: { ...shared.buy, cta: "Claim this offer" },
    underAtc: { ...shared.underAtc, urgency: "Offer ends in" },
    gallery: [
      {
        kind: "headline",
        image: lifeImg("heroOffer", "Three RescUAid devices on a bright yellow background"),
        eyebrow: "Buy 2, Get 1 Free",
        headline: "3 kits for $99.99",
        sub: "You save $79.98, plus a free Emergency CPR Guide",
        proof: "4.8/5 · 389 verified reviews",
      },
      {
        kind: "inUse",
        image: lifeImg("inUseSelf", "A woman demonstrating self-use of RescUAid in her kitchen"),
        eyebrow: "One for every room",
        headline: "Within reach, even when you're alone",
        points: ["Self-use", "No training"],
      },
      {
        kind: "beforeAfter",
        headline: "Be ready in every room",
        before: { image: pairs.dinner.before, label: "Before", caption: "Nothing within reach" },
        after: { image: pairs.dinner.after, label: "After", caption: "A kit wherever you eat" },
      },
      insideSlide("In each of your 3 kits"),
      stepsSlide(),
      compareSlide(),
      reviewSlide(carol, "Families buy more than one"),
      demoVideoSlide(),
    ],
    valueProps: {
      headline: "Why families order three",
      items: [
        {
          eyebrow: "Home, car, Grandma's",
          headline: "One within reach wherever you eat",
          body: "In a choking emergency the nearest kit is the one that helps. Three kits cover the kitchen, the car and the grandparents'.",
          image: pageImg("rooms", "Protect every corner"),
        },
        {
          eyebrow: "Every age",
          headline: "Each kit covers kids and adults",
          body: "Every kit has a child mask (12 months and up, 22 lb+) and an adult mask.",
          image: lifeImg("v2Grandparent", "Grandfather feeding his grandson"),
        },
        {
          eyebrow: "No training",
          headline: "Place, press, pull",
          body: "No strength, no batteries and no expiry until it's used.",
          image: lifeImg("stepPress", "Pressing the RescUAid handle"),
        },
      ],
    },
    reviews: {
      ...shared.reviews,
      headline: "“Got 6 of them for my family!”",
      sub: "Verified buyers on why they ordered more than one.",
      items: [
        carol,
        sarahW,
        ...shared.reviews.items.filter((r) => r !== carol && r !== sarahW),
      ],
    },
    guarantee: {
      ...shared.guarantee,
      headline: "Lock in the price today. Decide over 90 days.",
      image: lifeImg("v3Bundle", "Three RescUAid devices"),
    },
  },
};
