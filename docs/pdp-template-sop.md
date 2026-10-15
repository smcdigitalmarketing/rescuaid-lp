# SOP: building a product landing page

This is how every landing page in this repo is built, and how we build pages for the next brand. It follows the "premium product page" framework from Arsh Sanwarwala's video ([How To Build a Product Page SO Premium They Beg You To Buy](https://www.youtube.com/watch?v=ngXi-No3s2o)).

The video defines "premium" as a page people want to buy from, and that comes down to trust. Four things build it:

- **Psychology**: what moves people to act.
- **Messaging**: specific, vivid copy that makes the result feel certain.
- **Strategic design**: every section has one job.
- **Structure**: sections in an order that makes buying feel obvious.

Good design alone does not rescue a page whose benefits are buried.

## 1. The structure

Every page has these seven sections, in this order. Concepts can change copy, imagery, look and some layout options. They never reorder sections.

| #   | Section              | Its job                                                  | Rules                                                                                                                                                                                                                                                               | Code                                 |
| --- | -------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| 1   | **Above the fold**   | Sell someone who only looks at the gallery and the title | The gallery tells the whole story (see §2). Then a social proof line **above** the title, a title that stacks the product name with its benefit, a subheadline, the price with **"You save $X"**, and 3–4 icon bullets                                              | `components/sections/above-fold.tsx` |
| 2   | **Buy box**          | Make choosing effortless                                 | Numbered steps ("Step 1: Choose your bundle"). Every option visible, no dropdowns. Each bundle card shows a thumbnail, total, compare-at price, **dollar saving**, per-kit price and gift thumbnails. Then one add-to-cart button                                   | `buy-box.tsx`                        |
| 3   | **Under the button** | Remove the last doubts at the point of most friction     | Shipping and returns, an urgency line, **the biggest risk-reducer spelled out** (the guarantee: what it is and how to claim it), one short review. **No payment badges**                                                                                            | `buy-box.tsx` (`UnderAtc`)           |
| 4   | **Details**          | Make sure the main selling point gets read               | Accordions get 1–2% engagement, so **the first one is open** and holds "why you'll love it". Then an auto-scrolling lifestyle strip                                                                                                                                 | `details.tsx`                        |
| 5   | **Social proof**     | Build trust at scale                                     | A wall of reviews shown **up front**, never in a carousel. Each review shows its **source** (Loox, Facebook, verified purchase), name, and photo or avatar when there is one. The headline must be specific and include a number, never "Real people, real results" | `proof.tsx`                          |
| 6   | **Value props**      | Explain every reason to buy                              | The headline carries the benefit, because most people read only the headline. The body explains how, and the image backs up the claim. Several props, none repeated. Then how it works, the stats band and the comparison table                                     | `value-props.tsx`                    |
| 7   | **Closing**          | Close the remaining doubts                               | Guarantee, then final stories, then the FAQ, then the footer. A sticky add-to-cart bar appears once the shopper scrolls past the main button                                                                                                                        | `closing.tsx`, `StickyAtc`           |

The composition lives in `app/components/pdp-template.tsx`.

## 2. Gallery slide order

The gallery is the most-clicked element on a product page. Many shoppers decide there, or leave. Build it as if no one will read anything else:

1. **Product**: a clean shot of what's in the box.
2. **Pain**: the problem or the old way (if it applies).
3. **Value props**: 3–4 slides, one differentiator each, with a few words on the image.
4. **How it works**: 3–4 steps.
5. **Social proof**: 2–3 slides with real reviews, names and photos.
6. **Comparison**: us vs. the alternatives (if it applies).
7. **Guarantee**: one slide just for the guarantee.
8. **Lifestyle**: sprinkle these in; they should not be the whole gallery.

Image specs:

- Square, 1600 px.
- Text must be readable on a 375 px phone.
- 3–6 words per headline and at most 3 short points.

In code, every slide has a `role` matching the list above. Text slides (`overlay`, `proof`, `guarantee`) are HTML laid out in container-query units, so the copy stays editable and sharp. To use them on Shopify, export them to PNG the same way the rescu-aid repo exports its ad creatives (Playwright screenshots).

## 3. Copy rules

- **Stack the benefit into the title.** Product name plus what it does for you: "RescUAid 2.0: Help clear a blocked airway in 3 simple moves, for adults and kids".
- **Be specific and vivid.** Write "Three moves you can do with shaking hands", not "Easy to use". Write "One kit protects your toddler and your grandfather", not "Suitable for all ages".
- **Write one fluent sentence per idea.** Two short fragments make people stop and re-read ("Premium quality. Luxurious feeling.").
- **Say the saving in dollars.** Never make people do the math: "You save $79.98", "$33.33 per kit".
- **Give proof a source.** Show where each review was left. Logos only with a quote from the publication; never bare "As seen on" logos.
- **No payment badges.** Use the space under the button for the guarantee instead.
- **No new claims.** All facts come from `app/content/base.ts`. If a claim isn't there, it needs a source before it goes on a page (see §6).

## 4. Adding a concept page

1. Copy a file in `app/content/pages/` (for example `family.ts`) and give it a new `slug`, `name`, `path` (`/pages/<slug>`), `hypothesis`, `traffic` and `cover`.
2. Pick a theme. To add a new look, add a `[data-theme="<name>"]` block to `app/app.css`. Colors, fonts, corner radius and headline case are all tokens. Add the theme name to `ThemeName` in `app/content/types.ts`, and the Google Fonts query to the page's `fonts`.
3. Override only what the concept changes: title, bullets, gallery, value props and review order. Everything else comes from `shared.ts`.
4. Register it in `app/content/pages/index.ts` and add its URL to `prerender()` in `react-router.config.ts`.
5. Write down the hypothesis. Each page should test one idea (angle, look, or offer emphasis), not several at once.

## 5. Measuring which page wins

- Each concept is its own URL. On Shopify these become page templates at `rescuaid.com/pages/<slug>`, so every concept lives on the one domain and Shopify Analytics reports sessions and conversion by landing page.
- Point each ad set at one page, with UTMs.
- Tag every order with the page it came from. The mock cart does this as `pdp_variant=<slug>`. On Shopify, that is a cart attribute (`attributes[pdp_variant]`) added by the page's add-to-cart form, so orders can be split by page in Shopify reports.
- Compare conversion rate and average order value per page over the same dates and traffic. Change one page at a time.

## 6. Launch checklist (before any page takes real traffic)

Claims and policy:

- [ ] **Guarantee terms.** The live refund policy says 30 days for unused items, while the store advertises a 90-day risk-free trial. The pages promise "email us within 90 days and we'll refund your order". Russab or the client must confirm the real terms, then update `guaranteeCopy` in `base.ts`.
- [ ] **"10,000+ families".** This is the store's own claim, with no source on file. Confirm it with order data or remove it.
- [ ] **Live gallery badges.** Several store images carry "FDA", "Made in USA", "Doctor recommended", "Paramedic approved" and "97% effective in clinical trials" badges. Images 2, 10 and 12 (the heaviest claims) are left out of every page here. Images 3 and 5–8 still show a small FDA mark. These need substantiation or new artwork.
- [ ] **Free shipping over $60.** The live shipping policy says shipping is calculated at checkout. Match the policy or the copy.

Content cleanup on the live store:

- [ ] **Gift artwork.** The live gift products ("CPR course", "5 Travel Kits") show **LifeAid** branding, not RescUAid. The pages use the handbook and the RescUAid travel case instead, but the real Shopify products need new artwork.
- [ ] **Hall of Saves.** On the live page, Chandra's and Sarah M.'s stories are almost word for word the same. Only Sarah M.'s is used here. Remove the duplicate on the store.
- [ ] **Bundle subtitle.** The live single-kit subtitle says "baby and adult masks", but the device is not for infants under 12 months. The pages say "adult and child masks".

Technical:

- [ ] Bundles on the live store run through the **Kaching Bundles** app. The Shopify build must keep Kaching (or an equivalent discount function) so the tier prices apply at checkout.
- [ ] Reviews come from **Loox** (389 reviews, 4.8 average on 2026-10-15). On Shopify, use the Loox widget or its API for the wall, so counts stay live.

## 7. Spinning up a new brand

1. Copy this repo. In `scripts/port-store.ts`, set `STORE` to the new store's domain and update the `pageImages` map, then run `npm run store:port`.
2. Replace `app/assets/brand/` (logo), and write the brand's facts in `app/content/base.ts`: prices, tiers, gifts, reviews, steps, FAQ, guarantee and safety copy.
3. Set the `:root` and baseline theme tokens in `app/app.css` to the store's current look, so the baseline page isolates structure from design.
4. Write a baseline page and 2–4 concepts, each with one hypothesis.
5. Run the launch checklist above for the new brand.

## 8. Homepage and listicle templates

**Waiting on Russab's specifications.** When they arrive, they get the same treatment: a fixed section order with one job per section, rules per section, a content type in `app/content/types.ts`, and components under `app/components/sections/`.

- **Homepage**: _TBD._
- **Listicle** (pre-sell, "N reasons…"): _TBD._
