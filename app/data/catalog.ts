/**
 * The rescuaid.com catalogue as ported by `npm run store:port`
 * (catalog.json is generated; don't edit it by hand).
 */
import catalog from "./catalog.json";

export type CatalogProduct = (typeof catalog.products)[number];

export const MAIN_HANDLE = "rescuaid-anti-choking-device-for-adults-children";

export const portedAt = catalog.portedAt;

export function productByHandle(handle: string): CatalogProduct {
  const p = catalog.products.find((x) => x.handle === handle);
  if (!p) throw new Error(`Not in catalog.json: ${handle}`);
  return p;
}

export const mainProduct = productByHandle(MAIN_HANDLE);

export const money = (n: number) =>
  n === 0 ? "FREE" : `$${n.toFixed(2).replace(/\.00$/, "")}`;
