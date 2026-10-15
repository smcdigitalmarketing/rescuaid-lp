/**
 * Snapshots the live rescuaid.com catalogue into this repo.
 *
 *   npm run store:port              # fetch products.json, download every image
 *   npm run store:port -- --force   # re-download images that already exist
 *
 * Output:
 *   app/data/catalog.json                     handles, titles, prices, variant ids, image list
 *   app/assets/store/<handle>/<nn>.webp       product images (max 1600px; GIFs stay animated)
 *
 * The pages never call Shopify at runtime. Re-run this when the store changes.
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import sharp from "sharp";

const STORE = "https://www.rescuaid.com";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const imageDir = join(root, "app/assets/store");
const catalogFile = join(root, "app/data/catalog.json");

const { values: args } = parseArgs({
  options: { force: { type: "boolean", default: false } },
});

type ShopifyImage = {
  src: string;
  width: number;
  height: number;
  alt: string | null;
};
type ShopifyProduct = {
  handle: string;
  title: string;
  body_html: string;
  variants: { id: number; price: string; compare_at_price: string | null }[];
  images: ShopifyImage[];
};

async function json<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { accept: "application/json" } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${url}`);
  return (await res.json()) as T;
}

/** Strips tags and collapses whitespace so descriptions are plain text. */
const plain = (html: string) =>
  html
    .replace(/<br\s*\/?>|<\/p>|<\/li>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;|&rsquo;/g, "’")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n")
    .trim();

async function saveImage(src: string, out: string) {
  if (existsSync(out) && !args.force) return "kept";
  const res = await fetch(src);
  if (!res.ok) throw new Error(`${res.status}: ${src}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const animated = src.toLowerCase().split("?")[0].endsWith(".gif");
  await sharp(buf, { animated })
    .resize({
      width: 1600,
      height: 1600,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 82 })
    .toFile(out);
  return "saved";
}

const { products } = await json<{ products: ShopifyProduct[] }>(
  `${STORE}/products.json?limit=250`,
);

const catalog = [];
for (const p of products) {
  const dir = join(imageDir, p.handle);
  mkdirSync(dir, { recursive: true });
  const images = [];
  for (const [i, im] of p.images.entries()) {
    const file = `${String(i + 1).padStart(2, "0")}.webp`;
    const status = await saveImage(im.src, join(dir, file));
    console.log(`${status.padEnd(5)} ${p.handle}/${file}`);
    images.push({ file, width: im.width, height: im.height, alt: im.alt });
  }
  const v = p.variants[0];
  const compareAt = Number(v.compare_at_price ?? 0);
  catalog.push({
    handle: p.handle,
    title: p.title,
    description: plain(p.body_html),
    variantId: v.id,
    price: Number(v.price),
    compareAt: compareAt > 0 ? compareAt : null,
    images,
  });
}

/**
 * Images used by the live PDP's page sections (not product media), plus the
 * photo reviews from the Loox widget. Saved as app/assets/store/page/<name>.webp.
 */
const CDN = "https://www.rescuaid.com/cdn/shop/files";
const pageImages: Record<string, string> = {
  "step-place": `${CDN}/Gemini_Generated_Image_j1g3j5j1g3j5j1g3.jpg`,
  "step-press": `${CDN}/Gemini_Generated_Image_s1xuxis1xuxis1xu.jpg`,
  "step-pull": `${CDN}/Gemini_Generated_Image_20ti1620ti1620ti.jpg`,
  "inside-box": `${CDN}/Gemini_Generated_Image_ra711fra711fra71.jpg`,
  "inside-box-2": `${CDN}/Gemini_Generated_Image_icac7picac7picac_47728061-dda0-4f2d-9d03-30e7e35a411e.jpg`,
  "time-device": `${CDN}/123.webp`,
  rooms: `${CDN}/Gemini_Generated_Image_3ujwrp3ujwrp3ujw_1.png`,
  faq: `${CDN}/Gemini_Generated_Image_9a5icm9a5icm9a5i.jpg`,
  "first-responder":
    "https://cdn.shopify.com/s/files/1/0797/7186/1240/files/12_9926a145-d110-4007-8363-0fe85c861de2.jpg",
  "fb-linda": "https://cdn.shopify.com/s/files/1/0797/7186/1240/files/fb3.png",
  "fb-susan": "https://cdn.shopify.com/s/files/1/0797/7186/1240/files/fb4.jpg",
  "review-nathan": "https://images.loox.io/uploads/2026/1/17/t3xu9UX7-iY.jpg",
  "review-george": "https://images.loox.io/uploads/2026/1/17/RaFFhGu5eI.jpg",
  "review-tom": "https://images.loox.io/uploads/2026/1/17/o2rUfw82ft.jpg",
  "review-monica": "https://images.loox.io/uploads/2026/1/17/QWPUZLpqW2.jpg",
};
mkdirSync(join(imageDir, "page"), { recursive: true });
for (const [name, src] of Object.entries(pageImages)) {
  const status = await saveImage(src, join(imageDir, "page", `${name}.webp`));
  console.log(`${status.padEnd(5)} page/${name}.webp`);
}

mkdirSync(dirname(catalogFile), { recursive: true });
writeFileSync(
  catalogFile,
  JSON.stringify(
    {
      source: STORE,
      portedAt: new Date().toISOString().slice(0, 10),
      products: catalog,
    },
    null,
    2,
  ) + "\n",
);
console.log(`\n${catalog.length} products → app/data/catalog.json`);
