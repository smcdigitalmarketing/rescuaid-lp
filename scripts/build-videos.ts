/**
 * Turns the raw Veo clips (assets/video/) into the files the site serves:
 *
 *   public/video/demo.mp4 + demo.jpg     square, silent, small: the gallery loop
 *   public/video/ad-pop.mp4 + ad-pop.jpg 9:16 ad: clip + caption overlays + end card
 *
 * The ad's captions and end card are HTML (app/routes/video.render.$layer.tsx),
 * screenshotted with a transparent background, so the words stay sharp.
 *
 *   npm run dev                                         # in another terminal
 *   npm run videos:build -- --base http://localhost:5173
 *
 * Needs ffmpeg and ffprobe on PATH.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { chromium, type Browser } from "playwright-core";
import sharp from "sharp";
import { AD_END_SECONDS, adCaptions } from "../app/data/videos.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const rawDir = join(root, "assets/video");
const overlayDir = join(rawDir, "overlays");
const outDir = join(root, "public/video");
mkdirSync(overlayDir, { recursive: true });
mkdirSync(outDir, { recursive: true });

const { values: args } = parseArgs({
  options: {
    base: {
      type: "string",
      default: process.env.VIDEO_BASE_URL ?? "http://localhost:5173",
    },
  },
});
const base = args.base!.replace(/\/$/, "");
const CLIP_SECONDS = 8;
const FPS = 24;

const ffmpeg = (a: string[]) =>
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...a], {
    stdio: "inherit",
  });
const hasAudio = (file: string) =>
  execFileSync("ffprobe", [
    "-v",
    "error",
    "-select_streams",
    "a",
    "-show_entries",
    "stream=index",
    "-of",
    "csv=p=0",
    file,
  ])
    .toString()
    .trim().length > 0;

/** A JPEG poster from one frame of a video. */
async function poster(video: string, at: number, out: string) {
  const png = join(overlayDir, "poster.tmp.png");
  ffmpeg(["-ss", String(at), "-i", video, "-frames:v", "1", png]);
  await sharp(png).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
}

// ── 1. Demo: square crop, no sound, small file for the gallery ─────────────
const demoRaw = join(rawDir, "demo.mp4");
if (existsSync(demoRaw)) {
  const out = join(outDir, "demo.mp4");
  ffmpeg([
    "-i",
    demoRaw,
    "-vf",
    `crop=in_w:in_w:0:(in_h-in_w)/2,scale=1080:1080,fps=${FPS}`,
    "-an",
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    "26",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    out,
  ]);
  await poster(out, 0.5, join(outDir, "demo.jpg"));
  console.log("✓ public/video/demo.mp4 + demo.jpg");
} else console.log("– demo: skipped, run `npm run videos` first");

// ── 2. Ad: clip + timed caption overlays + end card ────────────────────────
const adRaw = join(rawDir, "ad.mp4");
if (existsSync(adRaw)) {
  let browser: Browser;
  try {
    browser = await chromium.launch({ channel: "chrome" });
  } catch {
    browser = await chromium.launch();
  }
  const page = await browser.newPage({
    viewport: { width: 1080, height: 1920 },
    deviceScaleFactor: 1,
  });
  const layers = [...adCaptions.map((c) => c.id), "end"];
  for (const layer of layers) {
    await page.goto(`${base}/video/render/${layer}`, {
      waitUntil: "networkidle",
    });
    await page.evaluate(() => document.fonts.ready);
    await page
      .locator(`[data-video-render="${layer}"]`)
      .screenshot({
        path: join(overlayDir, `ad.${layer}.png`),
        omitBackground: true,
      });
  }
  await browser.close();

  const audio = hasAudio(adRaw);
  const inputs = ["-i", adRaw];
  for (const c of adCaptions)
    inputs.push(
      "-loop",
      "1",
      "-t",
      String(CLIP_SECONDS),
      "-i",
      join(overlayDir, `ad.${c.id}.png`),
    );
  inputs.push(
    "-loop",
    "1",
    "-t",
    String(AD_END_SECONDS),
    "-i",
    join(overlayDir, "ad.end.png"),
  );
  inputs.push(
    "-f",
    "lavfi",
    "-t",
    String(AD_END_SECONDS),
    "-i",
    "anullsrc=r=48000:cl=stereo",
  );
  if (!audio)
    inputs.push(
      "-f",
      "lavfi",
      "-t",
      String(CLIP_SECONDS),
      "-i",
      "anullsrc=r=48000:cl=stereo",
    );

  const endIn = adCaptions.length + 1;
  const silenceIn = endIn + 1;
  const filters = [
    `[0:v]scale=1080:1920,setsar=1,fps=${FPS},trim=duration=${CLIP_SECONDS},setpts=PTS-STARTPTS[v0]`,
  ];
  adCaptions.forEach((c, i) => {
    filters.push(
      `[v${i}][${i + 1}:v]overlay=0:0:enable='between(t,${c.from},${c.to})'[v${i + 1}]`,
    );
  });
  filters.push(
    `[${endIn}:v]scale=1080:1920,setsar=1,fps=${FPS},format=yuv420p,fade=t=in:st=0:d=0.3[end]`,
  );
  filters.push(
    audio
      ? `[0:a]aresample=48000,atrim=duration=${CLIP_SECONDS},asetpts=PTS-STARTPTS[a0]`
      : `[${silenceIn + 1}:a]anull[a0]`,
  );
  filters.push(
    `[v${adCaptions.length}][a0][end][${silenceIn}:a]concat=n=2:v=1:a=1[v][a]`,
  );

  const out = join(outDir, "ad-pop.mp4");
  ffmpeg([
    ...inputs,
    "-filter_complex",
    filters.join(";"),
    "-map",
    "[v]",
    "-map",
    "[a]",
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    "22",
    "-pix_fmt",
    "yuv420p",
    "-c:a",
    "aac",
    "-b:a",
    "128k",
    "-movflags",
    "+faststart",
    out,
  ]);
  await poster(out, 6, join(outDir, "ad-pop.jpg"));
  console.log(
    `✓ public/video/ad-pop.mp4 + ad-pop.jpg (${audio ? "Veo room tone" : "silent"})`,
  );
} else console.log("– ad: skipped, run `npm run videos` first");
