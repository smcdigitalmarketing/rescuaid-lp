/**
 * Every image on the pages is a local file:
 *   app/assets/store/<handle>/<nn>.webp   product media ported from rescuaid.com (npm run store:port)
 *   app/assets/store/page/<name>.webp     live PDP section images and Loox review photos
 *   app/assets/lifestyle/<name>.webp      generated photography reused from the rescu-aid repo
 */

export type Img = { src: string; alt: string };

const files = import.meta.glob<string>("../assets/**/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
});

function file(path: string): string {
  const src = files[`../assets/${path}.webp`];
  if (!src) throw new Error(`Missing image: app/assets/${path}.webp`);
  return src;
}

/** A product photo by its 1-based position in the store's media list. */
export const productImg = (handle: string, n: number, alt: string): Img => ({
  src: file(`store/${handle}/${String(n).padStart(2, "0")}`),
  alt,
});

/** An image from the live PDP's page sections or the Loox widget. */
export const pageImg = (name: string, alt: string): Img => ({
  src: file(`store/page/${name}`),
  alt,
});

/** Generated lifestyle and studio photography. */
export const lifeImg = (name: string, alt: string): Img => ({
  src: file(`lifestyle/${name}`),
  alt,
});
