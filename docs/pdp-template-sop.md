# Product Landing Page SOP

Every product landing page we build uses one seven-section structure, so we can launch pages fast and test one idea at a time. It follows Arsh Sanwarwala's framework in [How To Build a Product Page SO Premium They Beg You To Buy](https://www.youtube.com/watch?v=ngXi-No3s2o). The thirteen RescUAid concept pages at [rescuaid-lp.vercel.app](https://rescuaid-lp.vercel.app/) are built this way.

The video defines a premium page as one people want to buy from, and that comes down to trust. Four things build it:

- **Psychology**: what moves people to act.
- **Messaging**: specific, vivid copy that makes the result feel certain.
- **Strategic design**: every section has one job.
- **Structure**: sections in an order that makes buying feel obvious.

Good design alone does not rescue a page whose benefits are buried.

## 1. The structure

Every page has these seven sections, in this order. A concept can change the copy, imagery, look and offer emphasis, but never the order.

| #   | Section          | Its job                                                  | Rules                                                                                                                                                                                                             |
| --- | ---------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Above the fold   | Sell someone who only looks at the gallery and the title | The seven-image gallery tells the whole story (section 2). Then a social proof line above the title, a title that stacks the product name with its benefit, a subheadline, the price with "You save $X", and 3–4 icon bullets |
| 2   | Buy box          | Make choosing effortless                                 | Numbered steps ("Step 1: Choose your bundle"). Every option visible, no dropdowns. Each bundle card shows a thumbnail, the total, the compare-at price, the dollar saving, the per-kit price and gift thumbnails  |
| 3   | Under the button | Remove the last doubts where friction is highest         | Shipping and returns, one urgency line, the guarantee spelled out (what it is and how to claim it), one short review. No payment badges                                                                           |
| 4   | Details          | Make sure the main selling point gets read               | Accordions get 1–2% engagement, so the first one is open and holds "why you'll love it". Then an auto-scrolling lifestyle strip                                                                                   |
| 5   | Social proof     | Build trust at scale                                     | A wall of reviews shown up front, never in a carousel. Each review shows its source, name, and photo when there is one. The headline is specific and includes a number                                            |
| 6   | Value props      | Explain every reason to buy                              | The headline carries the benefit; the body explains how; the image backs up the claim. Then how it works, the stats band and a comparison table                                                                   |
| 7   | Closing          | Close the remaining doubts                               | Guarantee, then final stories, then the FAQ, then the footer. A sticky add-to-cart bar appears once the shopper scrolls past the main button                                                                      |

In the code, the order lives in `app/components/pdp-template.tsx` and the sections in `app/components/sections/`.

## 2. Gallery: seven images, in this order

Build the gallery as if no one will read anything else on the page. It is the most-clicked element on a product page, and many shoppers decide there or leave. Every concept uses these seven images (Russab's spec):

| # | Image | What it shows | RescUAid example |
|---|---|---|---|
| 1 | Benefit headline | A big benefit headline, not the product shot | "Help clear a blocked airway in 3 simple moves", with the rating |
| 2 | In use | The product being used, with a benefit overlay | A calm demonstration, "Simple enough to use under stress" |
| 3 | Before and after | The same scene without and with the product | A family dinner with nothing within reach → the same dinner with RescUAid on the counter |
| 4 | What's inside | Everything in the package, labelled | Device, adult mask, child mask, guide |
| 5 | How it works | 3–4 visual steps | Place, press, pull |
| 6 | Us vs them | Our product against the alternative, row by row | Four rows from the store's comparison table |
| 7 | Review | A screenshot-style review with a real quote | A Loox review with the customer's photo |

Image rules:

- **Square, 1600 × 1600**, with text readable on a 375 px phone screen.
- **Photos carry no words.** All text is laid over the photo by the page, so copy stays sharp, editable and free of AI typos. Generated photography never shows text, logos or badges.
- **Before and after shows preparation, not an emergency.** Nobody is shown choking, and no medical outcome is claimed.
- **Reviews are real.** Use the customer's exact words, name and photo, with the source shown.

After the seven images, a short silent **demo video** loops as the last gallery item: the product in use, no words burned in. A video never replaces one of the seven images; Shopify galleries take both.

How the images are made, in this repo:

- The photography is generated with Gemini from `app/data/image-slots.ts` (`npm run images`, about $0.16 an image). Every image keeps its prompt in a `.json` file next to it, so it can be regenerated. The product always matches the reference photo in `assets/reference/device.jpg`.
- Each slide is defined per concept in `app/content/pages/<concept>.ts` and drawn by `app/components/gallery/slides.tsx`.
- `npm run gallery:export -- --base <dev server URL>` saves every slide as a 1600 × 1600 JPG in `public/gallery/<concept>/`. The [/gallery](https://rescuaid-lp.vercel.app/gallery) page shows them all, ready to download and upload to Shopify.

## 3. Copy rules

Most shoppers read only the headlines, so each headline has to carry the benefit on its own.

| Rule                                 | Write                                                                            | Not                              |
| ------------------------------------ | -------------------------------------------------------------------------------- | -------------------------------- |
| Stack the benefit into the title     | RescUAid 2.0: Help clear a blocked airway in 3 simple moves, for adults and kids | RescUAid 2.0 Anti-Choking Device |
| Be specific and vivid                | Three moves you can do with shaking hands                                        | Easy to use                      |
| Name the people, not the category    | One kit protects your toddler and your grandfather                               | Suitable for all ages            |
| One fluent sentence per idea         | Sits in a drawer for years, ready the second you need it                         | Durable. Long-lasting.           |
| Say the saving in dollars            | You save $79.98 · $33.33 per kit                                                 | Save 44%                         |
| Give a review headline a real number | 4.8 out of 5 from 389 verified buyers                                            | Real people, real results        |

Two more rules apply everywhere:

- **Proof needs a source.** Show where each review was left (Loox, Facebook, verified purchase). Use press logos only with a quote from the publication, never bare "As seen on" logos.
- **No new claims.** Every fact on a page comes from the live store or the client (`app/content/base.ts`). A claim without a source stays off the page until it has one (see the launch checklist).

## 4. Adding a concept page

A new concept is one content file plus, if it needs a new look, one theme block. The sections and their order stay the same.

1. Write the hypothesis first: one idea per page (an angle, a look or an offer emphasis), never several at once.
2. Pick the traffic it is for (search, Meta and TikTok, retargeting), since that decides the angle.
3. Choose a look: an existing theme, or a new one with its own colours, fonts, corner radius and headline style.
4. Rewrite only what the concept changes: the title, bullets, gallery, value props and which reviews lead. Everything else is shared.
5. Give it its own URL, `/pages/<name>`, and add it to the review page.

A concept can be an **angle on today's brand** (same logo and look) or a **new brand direction** with its own wordmark, palette, type and layouts. Brand directions pick from these layout options, so they look different while the section order stays the same:

| Option | Choices |
|---|---|
| Logo | The store logo, or a wordmark (text plus a small mark: cross, plus, heart, shield, spark, sun or gem) |
| Header | Logo left with nav, or logo centred |
| Hero | Gallery left or right of the product info, or headline-first (the title runs full width above both) |
| Bundle picker | Stacked cards, side-by-side columns, or pills with one detail card |
| Reviews | Masonry cards, compact rows, sticky notes, a photo wall, or large pull quotes |
| Value props | Alternating rows, cards, bento grid, or numbered list |
| Dividers | None, soft wave, hazard stripe, double rule, or centred ornament |

In the code: copy a file in `app/content/pages/` and set its `slug`, `name`, `path`, `hypothesis`, `traffic` and `cover` (and `group: "brand"` for a brand direction). Layout options live in its `layout` block. For a new look, add a `[data-theme="<name>"]` block to `app/app.css`, the name to `ThemeName` in `app/content/types.ts`, and the Google Fonts query to the page's `fonts`. Register the page in `app/content/pages/index.ts` and add its URL to `prerender()` in `react-router.config.ts`. A push to `main` deploys it.

## 5. Measuring which page wins

Each concept is its own page on rescuaid.com, so Shopify reports sessions and conversion by landing page without extra tracking.

- **One page per URL.** On Shopify each concept becomes a page template at `rescuaid.com/pages/<name>`, all on the one domain.
- **One page per ad set.** Point each ad set at a single page, with UTMs.
- **Tag every order.** The add-to-cart form sets a cart attribute, `pdp_variant=<page name>`, so orders split by page in Shopify reports. The concept pages show this in their checkout preview.
- **Compare like with like.** Conversion rate and average order value per page, over the same dates and the same traffic. Change one page at a time.

## 6. Launch checklist

None of the concept pages should take real traffic until these are settled. Each item comes from the live rescuaid.com store as of 15 October 2026.

**Claims and policy**

- [ ] **Guarantee terms.** The refund policy says 30 days for unused items, but the store advertises a 90-day risk-free trial. The pages say "email us within 90 days and we'll refund your order". Confirm the real terms, then match the pages (`guaranteeCopy` in `app/content/base.ts`) and the policy.
- [ ] **"10,000+ families".** This is the store's own claim, with no source on file. Back it with order data or remove it.
- [ ] **Gallery badges.** Store images carry "FDA registered", "Made in USA", "Doctor recommended", "Paramedic approved" and "97% effective in clinical trials". The three images with the heaviest claims (store images 2, 10 and 12) are left off every concept page; several others still show a small FDA mark. Source these or redo the artwork.
- [ ] **Free shipping over $60.** The shipping policy says shipping is calculated at checkout. Match the policy or the copy.

**Store content**

- [ ] **Gift artwork.** The "CPR course" and "5 Travel Kits" gift products are branded LifeAid, not RescUAid. They need new photos.
- [ ] **Duplicate story.** Chandra's and Sarah M.'s "Hall of Saves" stories are almost word for word the same. Remove one.
- [ ] **Bundle wording.** The single-kit subtitle says "baby and adult masks", but the device is not for infants under 12 months. Use "adult and child masks".

**Shopify build**

- [ ] Keep **Kaching Bundles** (or an equivalent discount) so the tier prices apply at checkout.
- [ ] Use the **Loox** widget or API for the reviews wall, so the 389-review count stays live.

## 7. Spinning up a new brand

The same system carries over to the next brand: only the facts and the look change.

1. Copy the repo. In `scripts/port-store.ts`, set `STORE` to the new store and update the `pageImages` map, then run `npm run store:port`. It copies the catalogue, prices and product images.
2. Swap the logo in `app/assets/brand/`, then write the brand's facts once in `app/content/base.ts`: prices, bundle tiers, gifts, reviews, how it works, FAQ, guarantee and safety copy.
3. Set the baseline theme in `app/app.css` to the store's current look, so the baseline page tests structure alone.
4. Write a baseline page and 2–4 concepts, each with one hypothesis.
5. Run the launch checklist for the new brand before any traffic.

## 8. Homepage and listicle templates

These wait on Russab's specs. When they arrive, each gets the same treatment as the product page: a fixed section order, one job per section, and rules per section.

- **Homepage**: to be defined.
- **Listicle** (a pre-sell "N reasons" page): to be defined.
