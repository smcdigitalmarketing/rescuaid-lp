import { lifeImg } from "~/lib/images";
import { LOOX, loox } from "../base";
import type { ConceptPage } from "../types";
import {
  compareSlide,
  demoVideoSlide,
  insideSlide,
  pairs,
  reviewSlide,
  shared,
  stepsSlide,
} from "./shared";

const tom = loox.find((r) => r.name === "Tom R.")!;

/**
 * Pulse: a new brand direction. Spec-sheet clinical-tech: paper white,
 * black and signal red, a grotesk with mono labels, sharp corners, numbers
 * up front.
 */
export const pulse: ConceptPage = {
  slug: "pulse",
  name: "Pulse: spec-sheet clinical",
  group: "brand",
  path: "/pages/pulse",
  theme: "pulse",
  fonts:
    "family=Space+Grotesk:wght@500;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600",
  cover: lifeImg("heroPulse", "RescUAid device on a graphite surface"),
  hypothesis:
    "A precise, engineered brand reads as medical-grade. Specs and numbers up front build trust with careful researchers.",
  traffic: "Google search, comparison shoppers, caregivers",
  principles: [
    "Numbers as headlines",
    "Spec-sheet bundle columns",
    "Bento value props",
    "Reviews as a verified log",
  ],
  meta: {
    title: "RescUAid 2.0 | Three moves. Two masks. Zero batteries.",
    description:
      "A one-way valve and a sealed mask that help clear a blocked airway when back blows aren't working.",
  },
  layout: {
    valueProps: "bento",
    wordmark: { text: "RESCUAID", mark: "plus" },
    hero: "reverse",
    tiers: "grid",
    reviews: "list",
  },
  content: {
    ...shared,
    announcement: "3 STEPS · 2 MASKS · 0 BATTERIES · BUY 2 GET 1 FREE",
    eyebrow: "RescUAid 2.0 / Choking rescue device",
    proofLine: `${LOOX.rating}/5 · ${LOOX.count} verified reviews`,
    title: {
      product: "RescUAid 2.0",
      benefit: "Three moves. Two masks. Zero batteries.",
    },
    subtitle:
      "A one-way valve and a sealed mask that help clear a blocked airway when back blows aren't working.",
    bullets: [
      { icon: "shield", text: "One-way valve: air goes out, never in" },
      {
        icon: "family",
        text: "2 masks: adult, and child (12 months+, 22 lb+)",
      },
      { icon: "clock", text: "0 batteries, and no expiry until used" },
      { icon: "alone", text: "Designed for self-use" },
    ],
    gallery: [
      {
        kind: "headline",
        image: lifeImg("heroPulse", "RescUAid device on a graphite surface"),
        eyebrow: "Spec 01",
        headline: "Three moves. Two masks. Zero batteries.",
        sub: "The choking rescue device, reduced to what matters",
        proof: `${LOOX.rating}/5 · ${LOOX.count} verified reviews`,
      },
      {
        kind: "inUse",
        image: lifeImg(
          "inUseCaregiver",
          "A woman demonstrating RescUAid on her father",
        ),
        eyebrow: "Mechanism",
        headline: "Press pushes air out. Pull creates suction.",
        points: ["One-way valve", "Sealed mask"],
      },
      {
        kind: "beforeAfter",
        headline: "Response time, before and after",
        before: {
          image: pairs.alone.before,
          label: "Before",
          caption: "Help: 8–12 minutes away",
        },
        after: {
          image: pairs.alone.after,
          label: "After",
          caption: "Help: within arm's reach",
        },
      },
      insideSlide("In the box"),
      stepsSlide("01 Place · 02 Press · 03 Pull"),
      compareSlide("RescUAid vs other devices"),
      reviewSlide(tom, "Verified review"),
      demoVideoSlide(),
    ],
    valueProps: {
      eyebrow: "Specification",
      headline: "Engineered for the worst minute",
      items: [
        {
          eyebrow: "Valve",
          headline: "Air goes out, never into the airway",
          body: "Pressing the handle pushes air out through a one-way valve. Pulling it back creates suction through the sealed mask.",
          image: lifeImg(
            "v1Valve",
            "Close-up of the clear mask and one-way valve",
          ),
        },
        {
          eyebrow: "Masks",
          headline: "Two sizes in every kit",
          body: "A child mask for 12 months and up (22 lb+), and an adult mask for teens, adults and seniors.",
          image: lifeImg(
            "adInside",
            "RescUAid device, adult mask and child mask",
          ),
        },
        {
          eyebrow: "Force",
          headline: "No strength required",
          body: "The suction comes from one pull of the handle, not from abdominal thrusts.",
          image: lifeImg("stepPull", "Pulling the RescUAid handle back"),
        },
        {
          eyebrow: "Shelf life",
          headline: "Zero batteries. No expiry until used.",
          body: "Inspect the masks and replace them every 2–3 years. Nothing to charge.",
          image: lifeImg("v1Hero", "RescUAid standing upright on its mask"),
        },
        {
          eyebrow: "Use",
          headline: "Designed for self-use",
          body: "Place, press and pull on your own when nobody else is home.",
          image: lifeImg(
            "adAlone",
            "Woman in her seventies alone in her kitchen",
          ),
        },
      ],
    },
    reviews: {
      ...shared.reviews,
      headline: `${LOOX.count} reviews. ${LOOX.rating} average.`,
      sub: "Every review below is from a verified buyer.",
      items: [tom, ...shared.reviews.items.filter((r) => r !== tom)],
    },
    guarantee: {
      ...shared.guarantee,
      image: lifeImg("v1Hero", "RescUAid standing upright on its mask"),
    },
  },
};
