# rescuaid-lp

Landing page proof of concept for **RescUAid 2.0**. It mocks rescuaid.com with the real products, prices, photos and reviews, and holds five landing pages. All five follow the same seven-section product page template (see [docs/pdp-template-sop.md](docs/pdp-template-sop.md)), and each one tests a different idea.

Cart and checkout are mocked. Nothing is charged and nothing is sent to Shopify. Every page is `noindex`.

| URL                                                          | Concept             | Tests                                                   |
| ------------------------------------------------------------ | ------------------- | ------------------------------------------------------- |
| `/`                                                          | Review hub          | Links to every page, with its hypothesis                |
| `/products/rescuaid-anti-choking-device-for-adults-children` | Baseline            | The framework in the live store's look: structure alone |
| `/pages/clinical`                                            | Clinical, trust-led | Authority first: how it works and an EMT's word         |
| `/pages/family`                                              | Warm family story   | People-led copy, bundles anchored to rooms              |
| `/pages/offer`                                               | Offer-first, mobile | Bundle math and gifts first, on a short page            |
| `/pages/premium`                                             | Premium minimal     | Whether a premium editorial look lifts conversion       |

## Getting started

```bash
npm install
npm run dev
```

`npm run typecheck` checks types. `npm run build` prerenders every page.

## Where things live

- `app/content/base.ts`: facts and copy ported from the live product page, including bundle tiers (Kaching), gifts, add-ons, Loox reviews, stories, steps, stats, comparison and FAQ. Pages never add claims that aren't here.
- `app/content/pages/*.ts`: one file per concept. Each sets its theme, fonts, hypothesis and the copy it overrides. `shared.ts` holds the defaults.
- `app/components/pdp-template.tsx`: the seven sections in order. The sections themselves are in `app/components/sections/`.
- `app/components/store/`: the mocked rescuaid.com chrome, made of the announcement bar with its countdown, header, footer, cart drawer and checkout preview.
- `app/lib/mock-cart.tsx`: the in-browser cart. Each line is tagged with the page slug (`pdp_variant`).
- `app/app.css`: theme tokens. Each concept is one `[data-theme]` block.

## Store data

`npm run store:port` re-snapshots the catalogue from `https://www.rescuaid.com/products.json` into `app/data/catalog.json`. It also downloads every product image, the live page's section images and the Loox review photos into `app/assets/store/`. Run it again when the store changes. `--force` re-downloads images that already exist.

`app/assets/lifestyle/` holds generated photography reused from the [rescu-aid](https://github.com/smcdigitalmarketing/rescu-aid) repo.

## Deploy

The site deploys to Vercel with `@vercel/react-router`. Every page is prerendered.

```bash
vercel        # preview
vercel --prod # production
```

## Before any real traffic

Work through the launch checklist in the SOP. It covers the guarantee terms, the unsourced claims in the live gallery images, the LifeAid-branded gift artwork, and the Kaching and Loox setup for the Shopify build.
