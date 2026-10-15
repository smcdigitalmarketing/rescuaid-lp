/**
 * Facts and copy ported from the live rescuaid.com product page on 2026-10-15.
 * Concept pages reuse these and rewrite the headlines for their angle; they
 * never add new claims. Things that must be checked before any of this goes
 * live are listed in docs/pdp-template-sop.md (launch checklist).
 */
import { MAIN_HANDLE, mainProduct } from "~/data/catalog";
import { lifeImg, pageImg, productImg, type Img } from "~/lib/images";
import type {
  AddOn,
  Faq,
  Gift,
  PdpContent,
  Review,
  Stat,
  Step,
  Tier,
} from "./types";

export const PRODUCT_NAME = "RescUAid 2.0";
export const PRICE = mainProduct.price; // $59.99 list price
export const GUARANTEE_DAYS = 90;
export const FREE_SHIPPING_MIN = 60;
export const SUPPORT_EMAIL = "hello@rescuaid.com";

/** Loox widget on the live PDP, 2026-10-15. */
export const LOOX = { rating: 4.8, count: 389 };

// ── Product media (positions in the store's media list) ────────────────────
const p = (n: number, alt: string) => productImg(MAIN_HANDLE, n, alt);
export const media = {
  kitClean: p(
    13,
    "RescUAid kit: red suction device, adult and child masks and travel case",
  ),
  infographic: p(
    1,
    "RescUAid emergency choking response device with icons for home, travel and multiple mask sizes",
  ),
  doctor: p(
    2,
    "Doctor holding the RescUAid device next to the choking rescue kit pouch",
  ),
  howCompress: p(
    3,
    "How it works: compress to expel air, then stretch to create suction",
  ),
  demoGif: p(4, "Demonstration of RescUAid on a training mannequin"),
  threeSteps: p(5, "Three simple steps: place the mask, press down, pull up"),
  vsOthers: p(6, "RescUAid compared with other anti-choking devices"),
  engineered: p(
    7,
    "RescUAid features: easy-grip handle, transparent design, one-way valve, changeable mask",
  ),
  everyRoom: p(
    8,
    "Protect every corner: RescUAid in the car, living room, kitchen, bedroom and bathroom",
  ),
  giftIdeas: p(
    9,
    "RescUAid as a gift: car and house, senior center, baby shower, church safety, new mom",
  ),
  timeline: p(10, "Timeline of a choking emergency"),
  deviceMasks: p(11, "RescUAid device with adult and child masks"),
  claimsDoctor: p(12, "Don't wait for an emergency to wish you had one"),
};

export const steps: Step[] = [
  {
    title: "Place",
    body: "Fit the mask over the mouth and nose for a secure seal.",
    image: pageImg(
      "step-place",
      "Placing the RescUAid mask over a training mannequin's mouth and nose",
    ),
  },
  {
    title: "Press",
    body: "Press the handle down firmly. The one-way valve pushes air out, never into the airway.",
    image: pageImg(
      "step-press",
      "Pressing the RescUAid handle down to seal the mask",
    ),
  },
  {
    title: "Pull",
    body: "Pull the handle back to create suction that helps clear the blockage. Repeat if needed.",
    image: pageImg(
      "step-pull",
      "Pulling the RescUAid handle back to create suction",
    ),
  },
];

export const lifestyle: Img[] = [
  lifeImg(
    "v2Hero",
    "Family dinner in a warm kitchen with RescUAid on the counter",
  ),
  lifeImg(
    "v1Caregiver",
    "Adult daughter and her father at the kitchen table, RescUAid within reach",
  ),
  lifeImg(
    "v2Grandparent",
    "Grandfather feeding his grandson, RescUAid on the table",
  ),
  lifeImg(
    "adAlone",
    "Woman in her seventies making tea, RescUAid on the counter",
  ),
  lifeImg("v2Car", "RescUAid stored in a car's centre console"),
  pageImg("faq", "Mother with the RescUAid travel case at the kitchen island"),
  lifeImg("v2Nightstand", "RescUAid on a bedside table"),
  lifeImg("v2Diaperbag", "RescUAid packed in a diaper bag"),
  lifeImg("adUgc", "A hand holding RescUAid up in a family kitchen"),
];

// ── Offer (Kaching Bundles tiers on the live PDP) ──────────────────────────
const gift = {
  cprGuide: {
    title: "Emergency CPR Guide",
    value: 15,
    image: productImg("choking-handbook", 1, "Choking first aid guide"),
  },
  firstAidKit: {
    title: "First Aid Kit",
    value: 30,
    image: productImg(
      "rescuaid-essential-first-aid-kit",
      1,
      "RescUAid essential first aid kit",
    ),
  },
  travelKits: {
    title: "5 Travel Kits",
    value: 40,
    image: pageImg("inside-box-2", "RescUAid travel case"),
  },
} satisfies Record<string, Gift>;

export const tiers: Tier[] = [
  {
    id: "single",
    title: "Single Kit",
    sub: "Adult and child masks included",
    kits: 1,
    price: 49.99,
    compareAt: PRICE,
    image: media.kitClean,
    gifts: [],
  },
  {
    id: "b2g1",
    title: "Buy 2, Get 1 Free",
    sub: "Three complete kits: one to keep, one to gift, one on hand",
    kits: 3,
    price: 99.99,
    compareAt: 179.97,
    badge: "Most popular",
    image: lifeImg("v3Bundle", "Three RescUAid devices side by side"),
    gifts: [gift.cprGuide],
  },
  {
    id: "b3g2",
    title: "Buy 3, Get 2 Free",
    sub: "Five complete kits for home, car and family",
    kits: 5,
    price: 139.99,
    compareAt: 299.95,
    badge: "Best value",
    image: lifeImg("v3Bundle", "Three RescUAid devices side by side"),
    gifts: [gift.firstAidKit, gift.travelKits, gift.cprGuide],
  },
];

export const addOns: AddOn[] = [
  {
    id: "practice",
    title: "2× Practice Masks",
    blurb: "Rehearse place, press, pull until it's automatic.",
    price: 9.99,
    image: productImg(
      "yes-add-2x-practice-mask-to-my-order-for-only-9-99",
      1,
      "Two practice masks",
    ),
  },
  {
    id: "masks",
    title: "Spare Mask Set (adult + child)",
    blurb: "Masks should be replaced every 2–3 years.",
    price: 19.99,
    image: productImg(
      "rescuaid-mask-set-1-kids-1-adult",
      1,
      "RescUAid spare mask set",
    ),
  },
];

// ── Reviews ─────────────────────────────────────────────────────────────────
export const expert: Review = {
  name: "Jessica K.",
  meta: "Active EMT · Verified buyer",
  source: "rescuaid.com",
  rating: 5,
  quote:
    "As an EMT, RescUAid is one of the most practical choking rescue tools I've seen. It's compact, simple to use under stress, and includes both adult and child masks. I keep one at home and recommend having one anywhere people eat.",
  photo: pageImg(
    "first-responder",
    "Jessica K., an EMT, standing by an ambulance",
  ),
};

/** Photo and text reviews from the live Loox widget (positive, on-topic ones). */
export const loox: Review[] = [
  {
    name: "Nathan S.",
    meta: "Verified buyer",
    source: "Loox",
    date: "Jun 2024",
    rating: 5,
    quote:
      "My initial concern was whether it could work effectively on both kids and the elderly. I tested it out on my elderly father and my 4-year-old.",
    photo: pageImg(
      "review-nathan",
      "Customer photo: RescUAid with its two masks",
    ),
  },
  {
    name: "Monica L.",
    meta: "Verified buyer",
    source: "Loox",
    date: "Jan 2024",
    rating: 5,
    quote:
      "I hesitated to buy this because of the price, but after comparing it to other similar devices, I realized it was a good investment for my family.",
    photo: pageImg(
      "review-monica",
      "Customer photo: RescUAid on a kitchen towel",
    ),
  },
  {
    name: "Carol M.",
    meta: "Verified buyer",
    source: "Loox",
    date: "Apr 2025",
    rating: 5,
    quote: "Got 6 of them for my family! Thank you.",
  },
  {
    name: "George P.",
    meta: "Verified buyer",
    source: "Loox",
    date: "Apr 2024",
    rating: 5,
    quote:
      "I wasn't sure if I needed this device since I've always been careful with my kids' food. But accidents happen, and it's better to be safe than sorry.",
    photo: pageImg(
      "review-george",
      "Customer photo: RescUAid with its instruction leaflet",
    ),
  },
  {
    name: "Sarah W.",
    meta: "Verified buyer",
    source: "Loox",
    date: "Apr 2025",
    rating: 5,
    quote: "I have one of these in every room of my daycare facility.",
  },
  {
    name: "Tom R.",
    meta: "Verified buyer",
    source: "Loox",
    date: "Mar 2024",
    rating: 5,
    quote:
      "I wasn't sure if this would work as advertised, especially since it's non-invasive. But after reading up on the science behind it, I felt confident.",
    photo: pageImg(
      "review-tom",
      "Customer photo: holding RescUAid above its travel case",
    ),
  },
  {
    name: "Nancy R.",
    meta: "Verified buyer",
    source: "Loox",
    date: "Apr 2025",
    rating: 5,
    quote:
      "I add these to my gifts to family and friends. When we have gatherings at our house we let visitors know where it is, God forbid it is needed.",
  },
  {
    name: "Karen K.",
    meta: "Verified buyer",
    source: "Loox",
    date: "Apr 2025",
    rating: 5,
    quote:
      "Bought these for baby shower gifts and they were well liked. They said they came in nice packaging and were made well.",
  },
  {
    name: "Cathy A.",
    meta: "Verified buyer",
    source: "Loox",
    date: "Apr 2025",
    rating: 5,
    quote: "I have them in the house and the car!",
  },
  {
    name: "Kara S.",
    meta: "Verified buyer",
    source: "Loox",
    date: "Apr 2025",
    rating: 5,
    quote:
      "Looks great! I feel less afraid knowing I have this around the house.",
  },
  {
    name: "Georgiana F.",
    meta: "Verified buyer",
    source: "Loox",
    date: "Apr 2025",
    rating: 5,
    quote:
      "Having the device at home gives me peace of mind for any choking emergency.",
  },
];

/** "Hall of Saves" and Facebook stories from the live PDP. */
export const stories: Review[] = [
  {
    name: "Anthoni B.",
    meta: "Verified purchase · RescUAid Bundle",
    source: "rescuaid.com",
    rating: 5,
    quote:
      "We were at a family BBQ when my dad suddenly began choking. Within seconds, RescUAid was used and it worked exactly as intended. He was taken to the hospital afterward and fully checked out — but without RescUAid nearby, the outcome could have been very different.",
  },
  {
    name: "Sarah M.",
    meta: "Verified purchase · RescUAid Bundle",
    source: "rescuaid.com",
    rating: 5,
    quote:
      "The day my RescUAid arrived turned out to be the day I needed it. While taking medication, one became lodged in my throat. I live alone, and in that moment, RescUAid saved my life.",
  },
  {
    name: "Linda Martinez",
    meta: "Customer",
    source: "Facebook",
    rating: 5,
    quote:
      "It saved my grandson's life. He started choking on a small toy, and in a moment of panic, I grabbed the device. It worked instantly, and he was breathing again within seconds.",
    avatar: pageImg("fb-linda", "Linda Martinez"),
  },
  {
    name: "Susan Reynolds",
    meta: "Customer",
    source: "Facebook",
    rating: 5,
    quote:
      "We decided to get it after hearing how vital it is to act fast in choking emergencies. This device is simple, reliable, and has quickly become an essential part of our safety plan.",
    avatar: pageImg("fb-susan", "Susan Reynolds"),
  },
  {
    name: "Mary Thompson",
    meta: "Customer",
    source: "Facebook",
    rating: 5,
    quote:
      "With small kids at home, choking is always a worry, but having this on hand makes me feel ready for anything. It's an absolute must for every household!",
  },
];

// ── Proof, comparison, FAQ ─────────────────────────────────────────────────
export const timeStats: Stat[] = [
  {
    value: "0–4 min",
    label: "With RescUAid within reach, you can respond immediately",
    tone: "good",
  },
  {
    value: "4–6 min",
    label: "Brain damage from oxygen loss can begin",
    tone: "bad",
  },
  { value: "8–12 min", label: "Typical EMS response time", tone: "bad" },
  {
    value: "10+ min",
    label: "High risk of death from oxygen loss",
    tone: "bad",
  },
];

export const comparisonRows = [
  { label: "Can be used alone", us: "Yes", them: "Not always" },
  {
    label: "Safe for all ages",
    us: "Adult + child masks",
    them: "Varies by product",
  },
  { label: "Needs a lot of strength", us: "No", them: "Yes" },
  { label: "Simple under stress", us: "3 steps", them: "Varies" },
  { label: "Works if the person can't help", us: "Yes", them: "Not always" },
  { label: "Compact and travel-ready", us: "Yes", them: "Often bulky" },
];

export const faqs: Faq[] = [
  {
    q: "Should I use RescUAid instead of back blows or the Heimlich?",
    a: "No. Call 911 and follow recognized first-aid steps first (Red Cross / AHA back blows and abdominal thrusts). RescUAid is your next step if those aren't working, if you can't perform them, or if you're alone.",
  },
  {
    q: "Can I use RescUAid on myself?",
    a: "Yes. RescUAid is designed for self-use when no one else is around to help.",
  },
  {
    q: "What ages can RescUAid be used on?",
    a: "Each kit has two masks: a child mask for children over 12 months who weigh at least 22 lb (10 kg), and a standard mask for teens, adults and seniors. It is not for infants under 12 months.",
  },
  {
    q: "Can it be used more than once?",
    a: "You can repeat the motion as many times as needed until the obstruction clears. After it has been used in a real emergency, replace it for hygiene reasons: contact us through the website and we'll replace it free of charge. Inspect the masks and consider replacing them every 2–3 years.",
  },
  {
    q: "Does it expire?",
    a: "No batteries and no expiry date unless it's used. Keep it somewhere everyone in the house knows.",
  },
  {
    q: "How many should I have?",
    a: "At least one in every room where people eat, plus the car. In an emergency, the closest one is the one that helps.",
  },
  {
    q: "How long does delivery take?",
    a: "Orders ship from our US warehouse within 1–2 business days, and delivery takes 3–7 business days after that. You'll get a tracking number by email.",
  },
  {
    q: `What if it isn't right for me?`,
    a: `Every order has a ${GUARANTEE_DAYS}-day risk-free trial. Email ${SUPPORT_EMAIL} and we'll make it right.`,
  },
];

export const safety =
  "RescUAid is intended for choking emergencies in people 12 months and older. Call 911 and follow recognized first-aid guidance (such as Red Cross / AHA choking relief steps) first. If the airway is still blocked, use RescUAid as directed and seek emergency medical help immediately.";

export const accordions: PdpContent["accordions"] = [
  {
    title: "Why families keep one within reach",
    body: [
      "Works on adults and children over 12 months: every kit has both masks.",
      "You can use it on yourself when no one else is home.",
      "No strength or training needed: place, press, pull.",
      "No batteries and no expiry date unless it's used.",
      "No prescription needed.",
    ],
  },
  {
    title: "How it works",
    body: steps.map((s, i) => `${i + 1}. ${s.title}: ${s.body}`),
  },
  {
    title: "What's in the box",
    body: [
      "RescUAid suction device with a one-way valve",
      "Adult mask (teens, adults and seniors)",
      "Child mask (12 months and over, 22 lb+)",
      "Step-by-step instructions",
      "Practice masks and the travel case are sold separately.",
    ],
  },
  {
    title: "Shipping and returns",
    body: [
      `Free shipping on orders over $${FREE_SHIPPING_MIN}.`,
      "Ships from our US warehouse in 1–2 business days; delivery in 3–7 business days.",
      `${GUARANTEE_DAYS}-day risk-free trial on every order.`,
    ],
  },
  { title: "Safety information", body: [safety] },
];

export const underAtcLines: PdpContent["underAtc"]["lines"] = [
  {
    icon: "truck",
    text: `Free shipping over $${FREE_SHIPPING_MIN} · ships in 1–2 business days`,
  },
  { icon: "returns", text: `${GUARANTEE_DAYS}-day risk-free trial` },
];

export const guaranteeCopy = {
  title: `Try it for ${GUARANTEE_DAYS} days, risk-free`,
  body: `Keep RescUAid in your kitchen for ${GUARANTEE_DAYS} days. If it isn't right for your family, email ${SUPPORT_EMAIL} within ${GUARANTEE_DAYS} days and we'll refund your order.`,
};
