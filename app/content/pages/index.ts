import type { ConceptPage } from "../types";
import { baseline } from "./baseline";
import { clinical } from "./clinical";
import { family } from "./family";
import { offer } from "./offer";
import { premium } from "./premium";
import { pulse } from "./pulse";
import { soft } from "./soft";
import { field } from "./field";
import { pop } from "./pop";
import { heritage } from "./heritage";
import { retro } from "./retro";
import { story } from "./story";
import { luxe } from "./luxe";

/** Every landing page, in the order the review hub lists them. */
export const pages: ConceptPage[] = [
  baseline,
  clinical,
  family,
  offer,
  premium,
  pulse,
  soft,
  field,
  pop,
  heritage,
  retro,
  story,
  luxe,
];

/** Concepts served at /pages/<slug>. The baseline lives at the product URL. */
export const conceptBySlug = (slug: string | undefined) =>
  pages.find((p) => p !== baseline && p.slug === slug);

export { baseline };
