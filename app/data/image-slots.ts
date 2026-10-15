/**
 * Photography generated for the product gallery (`npm run images`). Each slot
 * becomes app/assets/lifestyle/<id>.webp plus <id>.json (prompt, model, cost).
 *
 * The images carry no words: every headline, label and caption on a gallery
 * slide is HTML laid over the photo, so copy stays sharp and editable.
 *
 * Keep this file plain data with no imports so Node can run it directly.
 */

/**
 * `device` and `in-use-closeup` are files in assets/reference/. `@<id>` is an
 * image already in app/assets/lifestyle/, used to keep a scene consistent
 * (a "before" that matches its "after").
 */
export type Reference = "device" | "in-use-closeup" | `@${string}`;

export type ImageSlot = {
  id: string;
  alt: string;
  prompt: string;
  aspect?: "1:1" | "4:5" | "3:4" | "4:3" | "3:2" | "16:9" | "9:16";
  refs?: Reference[];
};

const DEVICE =
  "the RescUAid anti-choking device from the first reference image (a matte red anodized-aluminium handheld cylinder with knurled grip panels, a white square label with a red arrow that always points away from the mask toward the capped handle end, and a clear soft silicone face mask attached to one end)";

const RULES = [
  "Use the reference image only to match the device's exact shape, colour, label and mask. Do not copy its background, angle or composition.",
  "Show exactly one device unless the prompt asks for more.",
  "No leaflets, cards, packaging, pouches or printed paper. No text, captions, logos, badges, seals, certification marks or watermarks anywhere in the image.",
  "Photorealistic commercial photography, natural skin tones, anatomically correct hands.",
].join(" ");

/** For people using the device: the second reference shows the grip, not the cast. */
const IN_USE =
  "The second reference image shows how the device is held against the face; do not copy the people, setting or framing in it. Nobody is choking, coughing or distressed: this is a calm demonstration.";

/** For scenes recreated from an existing image, where the reference is the scene itself. */
const SCENE_RULES =
  "No text, captions, logos, badges or watermarks anywhere in the image. Photorealistic, natural skin tones, anatomically correct hands. Nobody is choking, coughing or in distress.";

/** Headline slides put the words in the top half, so the photo must leave it empty. */
const HEADLINE_SPACE =
  "Compose for a square frame with the product in the lower part of the frame and the top half left as calm, empty background with no objects, so a headline can sit there.";

export const imageSlots = {
  // ── 1 · Headline backdrops, one per concept ──────────────────────────────
  heroStore: {
    id: "heroStore",
    alt: "RescUAid device on a clean white background",
    prompt: `Clean, bright commercial product photograph: ${DEVICE}, lying at a slight diagonal on a seamless pure-white background with a soft natural shadow and a faint warm-red ambient reflection. High-key studio light. ${HEADLINE_SPACE} ${RULES}`,
    aspect: "1:1",
    refs: ["device"],
  },
  heroClinical: {
    id: "heroClinical",
    alt: "RescUAid device standing upright on a cool grey background",
    prompt: `Premium medical-product studio photograph: ${DEVICE}, standing upright on its attached mask on a seamless light cool-grey background with a subtle gradient to white and a soft reflection beneath. Crisp, clinical, calm and trustworthy. ${HEADLINE_SPACE} ${RULES}`,
    aspect: "1:1",
    refs: ["device"],
  },
  heroFamily: {
    id: "heroFamily",
    alt: "RescUAid device on a warm kitchen counter",
    prompt: `Warm lifestyle product photograph: ${DEVICE}, in sharp focus on a wooden kitchen counter beside a small bowl of fruit. Behind it, a family kitchen at golden hour, softly out of focus, cream and terracotta tones, no people in sharp focus. ${HEADLINE_SPACE} ${RULES}`,
    aspect: "1:1",
    refs: ["device"],
  },
  heroOffer: {
    id: "heroOffer",
    alt: "Three RescUAid devices on a bright yellow background",
    prompt: `Bold, punchy commercial product photograph: exactly three identical units of ${DEVICE}, standing upright side by side on their masks on a seamless saturated sunshine-yellow background, crisp studio light with clean short shadows. ${HEADLINE_SPACE} ${RULES}`,
    aspect: "1:1",
    refs: ["device"],
  },
  heroPremium: {
    id: "heroPremium",
    alt: "RescUAid device resting on cream linen",
    prompt: `Editorial still-life photograph: ${DEVICE}, resting diagonally on softly draped cream linen with one small spare child mask beside it. Gentle window light from the left, muted warm neutrals, quiet and luxurious, lots of breathing room. ${HEADLINE_SPACE} ${RULES}`,
    aspect: "1:1",
    refs: ["device"],
  },

  // ── 2 · Product in use ───────────────────────────────────────────────────
  inUseKitchen: {
    id: "inUseKitchen",
    alt: "A woman demonstrating RescUAid on a calm adult at a kitchen table",
    prompt: `Calm first-aid demonstration at a bright home kitchen table: a woman in her thirties holds ${DEVICE}, its clear mask gently sealed over the mouth and nose of a seated man in his thirties, who is relaxed with his eyes open. Natural daylight, softly blurred kitchen behind, warm and reassuring. Keep the bottom third of the frame simple and uncluttered. ${IN_USE} ${RULES}`,
    aspect: "1:1",
    refs: ["device", "in-use-closeup"],
  },
  inUseCaregiver: {
    id: "inUseCaregiver",
    alt: "A woman demonstrating RescUAid on her father in an armchair",
    prompt: `Calm first-aid practice at home: a woman in her forties demonstrates ${DEVICE} on her father in his seventies, who sits relaxed in an armchair with the clear mask gently sealed over his mouth and nose. Soft window light, tidy living room, reassuring mood. Keep the bottom third of the frame simple and uncluttered. ${IN_USE} ${RULES}`,
    aspect: "1:1",
    refs: ["device", "in-use-closeup"],
  },
  inUseSelf: {
    id: "inUseSelf",
    alt: "A woman demonstrating self-use of RescUAid in her kitchen",
    prompt: `A woman in her sixties standing calmly in her bright kitchen demonstrates self-use: she holds ${DEVICE} with both hands, the clear mask sealed over her own mouth and nose, her eyes calm and steady. Soft morning light, plants on the windowsill. Keep the bottom third of the frame simple and uncluttered. ${IN_USE} ${RULES}`,
    aspect: "1:1",
    refs: ["device", "in-use-closeup"],
  },

  // ── 3 · Before (the "after" is the existing v2Hero / adAlone) ────────────
  beforeDinner: {
    id: "beforeDinner",
    alt: "A mother watching her toddler eat at a family dinner, nothing within reach",
    prompt: `Recreate the scene from the reference image: the same family, the same kitchen, the same golden-hour light and camera angle. Change two things only: remove the red handheld device from the counter entirely (the counter shows just the fruit bowl), and have the mother lean toward the toddler in the high chair, watching closely with an attentive, slightly worried expression while the toddler eats. ${SCENE_RULES}`,
    aspect: "4:3",
    refs: ["@v2Hero"],
  },
  beforeAlone: {
    id: "beforeAlone",
    alt: "A woman alone in her kitchen looking at her phone, uneasy",
    prompt: `Recreate the scene from the reference image: the same woman in her seventies, the same kitchen, the same light and camera angle. Change two things only: remove the red handheld device from the counter entirely, and have her stand holding her phone, looking at it with an uneasy, worried expression, her cup of tea set aside. ${SCENE_RULES}`,
    aspect: "4:5",
    refs: ["@adAlone"],
  },

  // ── 6 · Us vs them ───────────────────────────────────────────────────────
  otherDevice: {
    id: "otherDevice",
    alt: "A generic, bulky plunger-style anti-choking device",
    prompt:
      "Studio product photograph of a generic, unbranded anti-choking suction device: a bulky, oversized clear-plastic plunger with a wide flat handle and a large rubber face mask, looking cumbersome. Seamless muted mid-grey background, flat even light, centred, generous margins. No logos, labels, text, colours or brand marks of any kind; it must not resemble any specific real product. Photorealistic.",
    aspect: "1:1",
  },
} satisfies Record<string, ImageSlot>;

export type SlotId = keyof typeof imageSlots;
