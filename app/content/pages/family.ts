import { lifeImg } from "~/lib/images";
import { LOOX, loox, stories, tiers } from "../base";
import type { ConceptPage } from "../types";
import { compareSlide, insideSlide, pairs, reviewSlide, shared, stepsSlide } from "./shared";

const carol = loox.find((r) => r.name === "Carol M.")!;
const sarahW = loox.find((r) => r.name === "Sarah W.")!;
const linda = stories.find((r) => r.name === "Linda Martinez")!;

/** Room-anchored bundle copy: the offer is framed by where each kit lives. */
const roomSubs: Record<string, string> = {
  single: "Start with the kitchen",
  b2g1: "Kitchen, car and Grandma's house",
  b3g2: "Every room, plus one to give",
};

/**
 * Warm family story: for parents and grandparents coming from Meta and
 * TikTok. Leads with the people, then sells "one for every room".
 */
export const family: ConceptPage = {
  slug: "family",
  name: "Warm family story",
  path: "/pages/family",
  theme: "family",
  fonts:
    "family=Fraunces:opsz,wght@9..144,600;9..144,700&family=DM+Sans:wght@400;500;700",
  hypothesis:
    "Social traffic responds to people, not product specs. Showing where each kit lives lifts the 3- and 5-kit bundles.",
  traffic: "Meta and TikTok, parents and grandparents",
  principles: [
    "Lifestyle imagery that still carries words",
    "Bundles anchored to rooms",
    "Visceral, specific copy",
    "Reviews shown up front",
  ],
  cover: lifeImg("v2Hero", "Family dinner with RescUAid on the counter"),
  meta: {
    title: "RescUAid 2.0 | One for every table your family eats at",
    description:
      "From the high chair to Grandpa's, one simple device that helps you act in the minutes before help arrives.",
  },
  layout: { valueProps: "alternating" },
  content: {
    ...shared,
    announcement: "BUY 2 GET 1 FREE • ONE FOR EVERY ROOM",
    eyebrow: "Every room, every age",
    proofLine: `${LOOX.rating}/5 from ${LOOX.count} reviews · 10,000+ families`,
    title: {
      product: "RescUAid 2.0",
      benefit: "Peace of mind at every table your family eats at",
    },
    subtitle:
      "From the high chair to Grandpa's place: one simple device that helps you act in the minutes before help arrives.",
    bullets: [
      {
        icon: "family",
        text: "Works for the toddler and the grandparent: two masks in every kit",
      },
      { icon: "home", text: "One for the kitchen, the car and Grandma's" },
      { icon: "gift", text: "The baby-shower gift parents actually keep" },
      { icon: "fast", text: "Place, press, pull: no training needed" },
    ],
    buy: {
      ...shared.buy,
      tiers: tiers.map((t) => ({ ...t, sub: roomSubs[t.id] ?? t.sub })),
    },
    gallery: [
      {
        kind: "headline",
        image: lifeImg("heroFamily", "RescUAid device on a warm kitchen counter"),
        eyebrow: "Every room, every age",
        headline: "Peace of mind at every table your family eats at",
        sub: "From the high chair to Grandpa's place",
        proof: "4.8/5 · 10,000+ families",
      },
      {
        kind: "inUse",
        image: lifeImg("inUseKitchen", "A woman demonstrating RescUAid on a calm adult at a kitchen table"),
        eyebrow: "Anyone at the table can do it",
        headline: "Place, press, pull. No training needed.",
        points: ["Adult + child masks", "Works on yourself too"],
      },
      {
        kind: "beforeAfter",
        headline: "Same dinner. Different feeling.",
        before: { image: pairs.dinner.before, label: "Before", caption: "Watching every bite" },
        after: { image: pairs.dinner.after, label: "After", caption: "Ready, with RescUAid on the counter" },
      },
      insideSlide("One kit covers the whole family"),
      stepsSlide(),
      compareSlide("Made for real family life"),
      reviewSlide(loox[0], "Made for kids and grandparents"),
    ],
    valueProps: {
      eyebrow: "Where families keep theirs",
      headline: "Wherever they eat, it should be within reach",
      items: [
        {
          eyebrow: "The kitchen",
          headline: "Right next to the high chair, where it matters most",
          body: "Keep one on the counter or in the drawer closest to the table. Place, press, pull takes no training, so whoever is closest can act.",
          image: lifeImg(
            "v2Hero",
            "Family dinner in a warm kitchen with RescUAid on the counter",
          ),
        },
        {
          eyebrow: "Grandma's house",
          headline: "At the grandparents', where the little ones eat too",
          body: "The same kit covers the toddler and the grandparent: a child mask for kids over 12 months and a standard mask for adults and seniors.",
          image: lifeImg("v2Grandparent", "Grandfather feeding his grandson"),
        },
        {
          eyebrow: "The car",
          headline: "In the console for road-trip snacks",
          body: "It's compact and travel-ready, so a second kit lives in the car instead of the kitchen drawer at home.",
          image: lifeImg("v2Car", "RescUAid in a car's centre console"),
        },
        {
          eyebrow: "The diaper bag",
          headline: "Packed for every playdate and picnic",
          body: "No batteries and no expiry until it's used, so it can ride along in the bag for years.",
          image: lifeImg("v2Diaperbag", "RescUAid packed in a diaper bag"),
        },
        {
          eyebrow: "The gift",
          headline: "The baby-shower gift parents actually keep",
          body: "“Bought these for baby shower gifts and they were well liked.” One kit for them, one for you: that's the Buy 2, Get 1 Free bundle.",
          image: lifeImg(
            "adGift",
            "RescUAid tied with a red ribbon on a kitchen counter",
          ),
        },
      ],
    },
    reviews: {
      ...shared.reviews,
      headline: "“I have one of these in every room of my daycare”",
      sub: "Why families buy more than one, in their own words.",
      items: [
        sarahW,
        carol,
        linda,
        ...shared.reviews.items.filter(
          (r) => r !== sarahW && r !== carol && r !== linda,
        ),
      ],
    },
    guarantee: {
      ...shared.guarantee,
      image: lifeImg("v2Hero", "Family dinner with RescUAid on the counter"),
    },
  },
};
