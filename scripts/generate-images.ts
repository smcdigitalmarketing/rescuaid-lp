/**
 * Generates gallery photography with Gemini image models from
 * app/data/image-slots.ts. Ported from the rescu-aid repo.
 *
 *   npm run images                       # generate every missing slot
 *   npm run images -- --only hero        # slots whose id starts with "hero" (or an exact id)
 *   npm run images -- --force            # regenerate even if the file exists
 *   npm run images -- --model gemini-3.1-flash-image
 *   npm run images -- --dry-run          # list what would be generated and the estimated cost
 *
 * Needs GEMINI_API_KEY in .env (see .env.example). Output: app/assets/lifestyle/<id>.webp
 * plus <id>.json (prompt, model, cost), so every image can be reproduced.
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import {
  GoogleGenAI,
  Modality,
  type GenerateContentResponse,
} from "@google/genai";
import sharp from "sharp";
import { imageSlots, type ImageSlot } from "../app/data/image-slots.ts";
import { IMAGE_PRICES } from "../app/data/pricing.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "app/assets/lifestyle");
const refDir = join(root, "assets/reference");

/** `device` → assets/reference/device.jpg; `@v2Hero` → app/assets/lifestyle/v2Hero.webp. */
const refPath = (name: string) =>
  name.startsWith("@")
    ? join(outDir, `${name.slice(1)}.webp`)
    : join(refDir, `${name}.jpg`);

const { values: args } = parseArgs({
  options: {
    only: { type: "string" },
    force: { type: "boolean", default: false },
    model: { type: "string", default: "gemini-3-pro-image" },
    "dry-run": { type: "boolean", default: false },
  },
});
const model = args.model!;
const price = IMAGE_PRICES[model];

const slots = (Object.values(imageSlots) as ImageSlot[]).filter(
  (s) => !args.only || s.id === args.only || s.id.startsWith(args.only),
);
const todo = slots.filter(
  (s) => args.force || !existsSync(join(outDir, `${s.id}.webp`)),
);

const estimate = price
  ? ` (≈ $${(todo.length * price.perImage).toFixed(2)} list price)`
  : "";
console.log(
  `${slots.length} slot(s), ${todo.length} to generate with ${model}${estimate}.`,
);
if (args["dry-run"]) {
  for (const s of todo)
    console.log(
      ` · ${s.id} (${s.aspect ?? "1:1"}) refs=${s.refs?.join(",") ?? "-"}`,
    );
  process.exit(0);
}
if (!todo.length) process.exit(0);

const missing = [...new Set(todo.flatMap((s) => s.refs ?? []))].filter(
  (r) => !existsSync(refPath(r)),
);
if (missing.length) {
  console.error(`Missing reference image(s): ${missing.join(", ")}.`);
  process.exit(1);
}

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error(
    "GEMINI_API_KEY is missing. Add it to .env (see .env.example).",
  );
  process.exit(1);
}
const ai = new GoogleGenAI({ apiKey });

const refData = async (name: string) =>
  (await sharp(refPath(name)).jpeg({ quality: 90 }).toBuffer()).toString(
    "base64",
  );

function costOf(res: GenerateContentResponse) {
  const u = res.usageMetadata;
  if (!price || !u) return undefined;
  return (
    ((u.promptTokenCount ?? 0) * price.input +
      (u.candidatesTokenCount ?? 0) * price.output) /
    1e6
  );
}

async function generate(prompt: string, refs: string[], aspect: string) {
  const res = await ai.models.generateContent({
    model,
    contents: [
      {
        role: "user",
        parts: [
          ...(await Promise.all(
            refs.map(async (r) => ({
              inlineData: { mimeType: "image/jpeg", data: await refData(r) },
            })),
          )),
          { text: prompt },
        ],
      },
    ],
    config: {
      responseModalities: [Modality.IMAGE],
      imageConfig: { aspectRatio: aspect, imageSize: "2K" },
    },
  });
  const part = res.candidates?.[0]?.content?.parts?.find(
    (p) => p.inlineData?.data,
  );
  if (!part?.inlineData?.data) {
    const reason =
      res.candidates?.[0]?.finishReason ??
      res.promptFeedback?.blockReason ??
      "no image";
    throw new Error(`no image returned (${reason})`);
  }
  return {
    image: Buffer.from(part.inlineData.data, "base64"),
    cost: costOf(res),
    usage: res.usageMetadata,
  };
}

const fmt = (n?: number) => (n === undefined ? "" : ` ($${n.toFixed(3)})`);
let spent = 0;
let failed = 0;

mkdirSync(outDir, { recursive: true });
for (const slot of todo) {
  process.stdout.write(`→ ${slot.id} … `);
  try {
    const { image, cost, usage } = await generate(
      slot.prompt,
      slot.refs ?? [],
      slot.aspect ?? "1:1",
    );
    await sharp(image)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(join(outDir, `${slot.id}.webp`));
    writeFileSync(
      join(outDir, `${slot.id}.json`),
      JSON.stringify(
        {
          id: slot.id,
          model,
          aspect: slot.aspect ?? "1:1",
          refs: slot.refs,
          prompt: slot.prompt,
          usage: {
            input: usage?.promptTokenCount,
            output: usage?.candidatesTokenCount,
          },
          costUsd: cost,
          generatedAt: new Date().toISOString(),
        },
        null,
        2,
      ) + "\n",
    );
    spent += cost ?? 0;
    console.log(`done${fmt(cost)}`);
  } catch (err) {
    failed++;
    console.log(`failed: ${err instanceof Error ? err.message : String(err)}`);
  }
}

console.log(
  `Spent ≈ $${spent.toFixed(2)}.${failed ? ` ${failed} slot(s) failed.` : " Review every image before shipping."}`,
);
process.exit(failed ? 1 : 0);
