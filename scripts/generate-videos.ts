/**
 * Generates the Veo clips in app/data/videos.ts: image-to-video from each
 * clip's generated 9:16 first frame, 8 s at 1080p. Ported from rescu-aid.
 *
 *   npm run videos -- --dry-run         # list clips and the cost
 *   npm run videos -- --only ad --force # redo one clip
 *
 * Output: assets/video/<id>.mp4 + <id>.json (git-ignored; npm run videos:build
 * turns them into the web files in public/video/).
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { GoogleGenAI } from "@google/genai";
import sharp from "sharp";
import { VEO_NEGATIVE, videoClips } from "../app/data/videos.ts";

const MODEL = "veo-3.1-generate-preview";
const PRICE_PER_SECOND = 0.4; // 1080p, ai.google.dev/gemini-api/docs/pricing (checked 2026-09-30)
const SECONDS = 8; // Veo 3.1 at 1080p only produces 8-second clips

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "assets/video");
const { values: args } = parseArgs({
  options: {
    only: { type: "string" },
    force: { type: "boolean", default: false },
    "dry-run": { type: "boolean", default: false },
  },
});

const todo = videoClips.filter(
  (c) => (!args.only || c.id === args.only) && (args.force || !existsSync(join(outDir, `${c.id}.mp4`))),
);
const clipCost = PRICE_PER_SECOND * SECONDS;
console.log(`${todo.length} clip(s) to generate with ${MODEL} at 1080p (≈ $${(todo.length * clipCost).toFixed(2)}).`);
if (args["dry-run"] || !todo.length) {
  for (const c of todo) console.log(` · ${c.id} from ${c.firstFrame}`);
  process.exit(0);
}

const frameFile = (slot: string) => join(root, "app/assets/lifestyle", `${slot}.webp`);
const missing = todo.filter((c) => !existsSync(frameFile(c.firstFrame)));
if (missing.length) {
  console.error(`Missing first frames for ${missing.map((c) => c.id).join(", ")}. Run \`npm run images\` first.`);
  process.exit(1);
}
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("GEMINI_API_KEY is missing. Add it to .env (see .env.example).");
  process.exit(1);
}
const ai = new GoogleGenAI({ apiKey });
mkdirSync(outDir, { recursive: true });

async function generateClip(clip: (typeof videoClips)[number]) {
  const image = {
    imageBytes: (await sharp(frameFile(clip.firstFrame)).png().toBuffer()).toString("base64"),
    mimeType: "image/png",
  };
  let op = await ai.models.generateVideos({
    model: MODEL,
    source: { prompt: clip.prompt, image },
    config: {
      aspectRatio: "9:16",
      durationSeconds: SECONDS,
      resolution: "1080p",
      personGeneration: "allow_adult",
      negativePrompt: VEO_NEGATIVE,
      numberOfVideos: 1,
    },
  });
  const started = Date.now();
  while (!op.done) {
    if (Date.now() - started > 10 * 60_000) throw new Error("timed out after 10 minutes");
    await new Promise((r) => setTimeout(r, 10_000));
    op = await ai.operations.getVideosOperation({ operation: op });
  }
  if (op.error) throw new Error(JSON.stringify(op.error));
  const video = op.response?.generatedVideos?.[0]?.video;
  if (!video) throw new Error(`blocked or empty: ${op.response?.raiMediaFilteredReasons?.join("; ") ?? "no video returned"}`);
  const file = join(outDir, `${clip.id}.mp4`);
  if (video.videoBytes) writeFileSync(file, Buffer.from(video.videoBytes, "base64"));
  else await ai.files.download({ file: video, downloadPath: file });
  return { file, seconds: Math.round((Date.now() - started) / 1000) };
}

let spent = 0;
let failed = 0;
for (const clip of todo) {
  process.stdout.write(`→ ${clip.id} … `);
  try {
    const { file, seconds } = await generateClip(clip);
    writeFileSync(
      file.replace(/\.mp4$/, ".json"),
      JSON.stringify(
        { id: clip.id, model: MODEL, firstFrame: clip.firstFrame, prompt: clip.prompt, negativePrompt: VEO_NEGATIVE, costUsd: clipCost, generatedAt: new Date().toISOString() },
        null,
        2,
      ) + "\n",
    );
    spent += clipCost;
    console.log(`done in ${seconds}s ($${clipCost.toFixed(2)})`);
  } catch (err) {
    failed++;
    console.log(`failed: ${err instanceof Error ? err.message : String(err)}`);
  }
}
console.log(`Spent ≈ $${spent.toFixed(2)}.${failed ? ` ${failed} clip(s) failed.` : " Review every clip before building."}`);
process.exit(failed ? 1 : 0);
