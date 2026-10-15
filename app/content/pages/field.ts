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

const cathy = loox.find((r) => r.name === "Cathy A.")!;

/**
 * Field: a new brand direction. Rugged emergency gear: dark mode, safety
 * orange and hazard yellow, condensed type, hazard-stripe dividers.
 */
export const field: ConceptPage = {
  slug: "field",
  name: "Field: rugged emergency gear",
  group: "brand",
  path: "/pages/field",
  theme: "field",
  fonts: "family=Barlow+Condensed:wght@600;700&family=Barlow:wght@400;500;600",
  cover: lifeImg(
    "heroField",
    "RescUAid device on dark slate with a first-aid bag",
  ),
  hypothesis:
    "Preparedness buyers (car kits, go-bags, first-aid shelves) respond to rugged gear branding, not family warmth.",
  traffic: "Preparedness and outdoor audiences, car-kit and first-aid buyers",
  principles: [
    "Dark, rugged brand",
    "Numbered value props",
    "Hazard-stripe dividers",
    "Kit-first angle",
  ],
  meta: {
    title: "RescUAid 2.0 | The choking rescue tool your kit is missing",
    description:
      "Compact, battery-free and ready for years. Stash one in the car, the go-bag and the first-aid shelf.",
  },
  layout: {
    valueProps: "numbered",
    wordmark: { text: "RESCUAID", mark: "shield" },
    reviews: "masonry",
    divider: "stripe",
  },
  content: {
    ...shared,
    announcement: "BE READY • BUY 2 GET 1 FREE • SHIPS IN 1–2 DAYS",
    eyebrow: "Emergency gear",
    proofLine: `${LOOX.rating}/5 · ${LOOX.count} verified reviews`,
    title: {
      product: "RescUAid 2.0",
      benefit: "The choking rescue tool your emergency kit is missing",
    },
    subtitle:
      "Compact, battery-free and ready for years. Stash one in the car, the go-bag and on the first-aid shelf.",
    bullets: [
      { icon: "shield", text: "No batteries, no expiry until used" },
      { icon: "package", text: "Compact and travel-ready" },
      { icon: "alone", text: "Usable on yourself" },
      { icon: "family", text: "Adult and child masks" },
    ],
    gallery: [
      {
        kind: "headline",
        image: lifeImg(
          "heroField",
          "RescUAid device on dark slate with a first-aid bag",
        ),
        eyebrow: "Emergency gear",
        headline: "Your kit is missing this",
        sub: "Compact. Battery-free. Ready for years.",
        proof: `${LOOX.rating}/5 · ${LOOX.count} verified reviews`,
      },
      {
        kind: "inUse",
        image: lifeImg(
          "inUseSelf",
          "A woman demonstrating self-use of RescUAid",
        ),
        eyebrow: "Self-rescue",
        headline: "Built for when you're on your own",
        points: ["Self-use", "No strength"],
      },
      {
        kind: "beforeAfter",
        headline: "Prepared beats panicked",
        before: {
          image: pairs.alone.before,
          label: "Before",
          caption: "8–12 minutes from help",
        },
        after: {
          image: pairs.alone.after,
          label: "After",
          caption: "Help within arm's reach",
        },
      },
      insideSlide("Kit contents"),
      stepsSlide("Place. Press. Pull."),
      compareSlide("RescUAid vs the rest"),
      reviewSlide(cathy, "Home and car, covered"),
    ],
    valueProps: {
      eyebrow: "Loadout",
      headline: "Gear that waits until you need it",
      items: [
        {
          eyebrow: "First-aid kit",
          headline: "The missing piece of your first-aid kit",
          body: "Bandages handle cuts. RescUAid is for the one emergency a standard kit can't: a blocked airway when back blows aren't working.",
          image: lifeImg(
            "fieldKit",
            "RescUAid packed in an open first-aid kit in a car boot",
          ),
        },
        {
          eyebrow: "Vehicle",
          headline: "Rides in the console for years",
          body: "No batteries to charge and no expiry until used. Inspect the masks every 2–3 years.",
          image: lifeImg("v2Car", "RescUAid in a car's centre console"),
        },
        {
          eyebrow: "Solo",
          headline: "Usable on yourself",
          body: "Designed for self-use, so help doesn't depend on someone else being there.",
          image: lifeImg(
            "adAlone",
            "Woman in her seventies alone in her kitchen",
          ),
        },
        {
          eyebrow: "Under stress",
          headline: "Three moves, no strength",
          body: "Place, press, pull. The suction comes from one pull of the handle.",
          image: lifeImg("stepPress", "Pressing the RescUAid handle"),
        },
      ],
    },
    reviews: {
      ...shared.reviews,
      headline: "From buyers who keep one in the car",
      sub: "Verified reviews from Loox and rescuaid.com.",
      items: [cathy, ...shared.reviews.items.filter((r) => r !== cathy)],
    },
    guarantee: {
      ...shared.guarantee,
      image: lifeImg("fieldKit", "RescUAid packed in a first-aid kit"),
    },
  },
};
