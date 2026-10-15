/**
 * End-to-end check of the whole site: every link and every interactive
 * control on every page, at desktop and phone widths.
 *
 *   npm run check -- --base http://localhost:5173
 *   npm run check -- --base https://rescuaid-lp.vercel.app
 *
 * Exits 1 if anything fails, and prints each failure.
 */
import { parseArgs } from "node:util";
import { chromium, type Page } from "playwright-core";

const { values: args } = parseArgs({
  options: {
    base: { type: "string", default: "https://rescuaid-lp.vercel.app" },
  },
});
const base = args.base!.replace(/\/$/, "");

const CONCEPTS = [
  "/products/rescuaid-anti-choking-device-for-adults-children",
  "/pages/clinical",
  "/pages/family",
  "/pages/offer",
  "/pages/premium",
  "/pages/pulse",
  "/pages/soft",
  "/pages/field",
  "/pages/pop",
];
const PAGES = ["/", "/gallery", "/sop", ...CONCEPTS];
const GALLERY_SLIDES = 7;

const problems: string[] = [];
let passed = 0;
const ok = (cond: boolean, msg: string) =>
  cond ? passed++ : problems.push(msg);
const wait = (page: Page, ms: number) => page.waitForTimeout(ms);
const topOf = (page: Page, id: string) =>
  page.evaluate(
    (id) => document.getElementById(id)!.getBoundingClientRect().top,
    id,
  );

const browser = await (async () => {
  try {
    return await chromium.launch({ channel: "chrome" });
  } catch {
    return await chromium.launch();
  }
})();

async function checkLinks(
  page: Page,
  p: string,
  tag: string,
  external: Set<string>,
) {
  const links = await page.evaluate(() =>
    [...document.querySelectorAll("a[href]")].map((a) => ({
      href: a.getAttribute("href")!,
      text: (a as HTMLElement).innerText.trim().slice(0, 30),
      visible:
        !!((a as HTMLElement).offsetWidth || (a as HTMLElement).offsetHeight) &&
        !a.classList.contains("sr-only"),
    })),
  );
  for (const l of links) {
    if (l.href.startsWith("#"))
      ok(
        await page.evaluate(
          (id) => !!document.getElementById(id),
          l.href.slice(1),
        ),
        `${tag} ${p} anchor ${l.href} has a target`,
      );
    else if (l.href.startsWith("/")) {
      const res = await page.request.get(base + l.href);
      const isJpg = l.href.endsWith(".jpg");
      ok(
        res.status() === 200 &&
          (!isJpg ||
            (res.headers()["content-type"] ?? "").includes("image/jpeg")),
        `${tag} ${p} link ${l.href} → ${res.status()}`,
      );
    } else if (/^https?:/.test(l.href)) external.add(l.href);
    else if (!/^(mailto|tel):/.test(l.href))
      problems.push(`${tag} ${p} odd href ${l.href}`);
  }
  return links;
}

async function checkConcept(
  page: Page,
  p: string,
  tag: string,
  phone: boolean,
  links: Awaited<ReturnType<typeof checkLinks>>,
) {
  // In-page navigation lands on its section, under the sticky header.
  for (const l of links.filter(
    (l) => l.visible && l.href.startsWith("#") && l.text,
  )) {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page
      .locator(`a[href="${l.href}"]:not(.sr-only):visible`)
      .filter({ hasText: l.text })
      .first()
      .click();
    await wait(page, 2200);
    const top = await topOf(page, l.href.slice(1));
    ok(
      Math.abs(top) < 200,
      `${tag} ${p} "${l.text}" reaches ${l.href} (top=${Math.round(top)})`,
    );
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));

  // Gallery: exactly seven slides, and every control moves it.
  const counter = page.locator("span", { hasText: /^\d+ \/ \d+$/ }).first();
  ok(
    (await counter.innerText()).endsWith(`/ ${GALLERY_SLIDES}`),
    `${tag} ${p} gallery has ${GALLERY_SLIDES} slides (${await counter.innerText()})`,
  );
  if (!phone) {
    await page.getByRole("button", { name: "Next image" }).click();
    await wait(page, 700);
    ok(
      (await counter.innerText()).startsWith("2 /"),
      `${tag} ${p} gallery next`,
    );
    await page.getByRole("button", { name: "Show image 4" }).click();
    await wait(page, 700);
    ok(
      (await counter.innerText()).startsWith("4 /"),
      `${tag} ${p} gallery thumbnail`,
    );
    await page.getByRole("button", { name: "Previous image" }).click();
    await wait(page, 700);
    ok(
      (await counter.innerText()).startsWith("3 /"),
      `${tag} ${p} gallery previous`,
    );
  } else {
    await page
      .locator('[aria-roledescription="carousel"]')
      .evaluate((el) =>
        el.scrollTo({ left: el.clientWidth, behavior: "instant" }),
      );
    await wait(page, 500);
    ok(
      (await counter.innerText()).startsWith("2 /"),
      `${tag} ${p} gallery swipe`,
    );
  }

  // Lightbox: opens on the current slide, moves with the keyboard and its own arrows, closes on Escape.
  const shown = Number((await counter.innerText()).split(" /")[0]);
  await page.getByRole("button", { name: "View larger" }).click();
  const box = page.getByRole("dialog", { name: /^Image \d+ of \d+$/ });
  ok((await box.getAttribute("aria-label")) === `Image ${shown} of ${GALLERY_SLIDES}`, `${tag} ${p} lightbox opens on image ${shown}`);
  await page.keyboard.press("ArrowRight");
  await box.getByRole("button", { name: "Next image" }).click();
  ok((await box.getAttribute("aria-label")) === `Image ${shown + 2} of ${GALLERY_SLIDES}`, `${tag} ${p} lightbox arrow key and button`);
  await page.keyboard.press("Escape");
  await wait(page, 300);
  ok(!(await box.isVisible()) && (await counter.innerText()).startsWith(`${shown + 2} /`), `${tag} ${p} lightbox closes on Escape, gallery follows`);
  await page.getByRole("button", { name: "Enlarge image 1" }).click({ force: true });
  ok(await box.isVisible(), `${tag} ${p} clicking a gallery image opens the lightbox`);
  await box.getByRole("button", { name: "Close image" }).click();
  ok(!(await box.isVisible()), `${tag} ${p} lightbox close button`);

  // Bundles, price and add-ons.
  await page.getByRole("radio", { name: /Single Kit/ }).click();
  ok(
    (await page
      .locator("p")
      .filter({ hasText: /^\$49\.99/ })
      .count()) > 0,
    `${tag} ${p} Single Kit shows $49.99`,
  );
  await page.getByRole("radio", { name: /Buy 2, Get 1 Free/ }).click();
  const addOn = page.getByRole("checkbox", { name: /Spare Mask Set/ });
  await addOn.click();
  ok(
    (await addOn.getAttribute("aria-checked")) === "true",
    `${tag} ${p} add-on toggles on`,
  );

  // Accordions.
  ok(
    await page
      .locator("details")
      .first()
      .evaluate((d) => (d as HTMLDetailsElement).open),
    `${tag} ${p} first accordion open`,
  );
  await page.locator("details summary").nth(1).click();
  ok(
    await page
      .locator("details")
      .nth(1)
      .evaluate((d) => (d as HTMLDetailsElement).open),
    `${tag} ${p} second accordion opens`,
  );

  // Cart drawer and checkout preview.
  const drawer = page.getByRole("dialog", { name: "Your cart" });
  await page.locator("#buy-options button.btn-primary").click();
  await wait(page, 500);
  ok(
    (await drawer.isVisible()) && (await drawer.locator("li").count()) === 3,
    `${tag} ${p} add to cart: bundle, gift, add-on`,
  );
  await drawer.getByRole("button", { name: /Remove Spare Mask Set/ }).click();
  ok((await drawer.locator("li").count()) === 2, `${tag} ${p} remove line`);
  await page.keyboard.press("Escape");
  await wait(page, 400);
  await page.getByRole("button", { name: /Open cart, 1 item/ }).click();
  await wait(page, 400);
  ok(await drawer.isVisible(), `${tag} ${p} cart icon reopens drawer`);
  await drawer.getByRole("button", { name: /Check out/i }).click();
  const modal = page.getByRole("dialog", { name: "Checkout preview" });
  ok(
    (await modal.isVisible()) && /pdp_variant=/.test(await modal.innerText()),
    `${tag} ${p} checkout preview`,
  );
  await modal.getByRole("button", { name: "Back to the page" }).click();
  ok(!(await modal.isVisible()), `${tag} ${p} checkout preview closes`);
  await page.getByRole("button", { name: "Close cart" }).click();
  await wait(page, 400);

  // Sticky add to cart.
  await page.locator("#reviews").scrollIntoViewIfNeeded();
  await wait(page, 600);
  const sticky = page.locator("div.fixed.bottom-0 button.btn-primary");
  ok(
    await sticky.isVisible(),
    `${tag} ${p} sticky bar appears after the buy box`,
  );
  await sticky.click();
  await wait(page, 500);
  ok(await drawer.isVisible(), `${tag} ${p} sticky bar adds to cart`);
  if (!phone) await page.mouse.click(5, 300);
  else await page.getByRole("button", { name: "Close cart" }).click();
  await wait(page, 400);

  // Reviews and the guarantee button.
  const more = page.getByRole("button", { name: /Show all \d+ reviews/ });
  if (await more.count()) {
    const n0 = await page.locator("#reviews figure").count();
    await more.click();
    await wait(page, 300);
    ok(
      (await page.locator("#reviews figure").count()) > n0,
      `${tag} ${p} show all reviews`,
    );
  }
  await page.getByRole("button", { name: "Choose your kit" }).click();
  await wait(page, 2500);
  const buyTop = await topOf(page, "buy-options");
  ok(
    buyTop > 0 && buyTop < 200,
    `${tag} ${p} "Choose your kit" reaches the bundle picker (top=${Math.round(buyTop)})`,
  );

  // Phone menu.
  if (phone) {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.getByRole("button", { name: "Open menu" }).click();
    const menu = page.locator("#mobile-menu");
    ok(
      (await menu.isVisible()) && (await menu.locator("a").count()) === 5,
      `${tag} ${p} phone menu has 5 links`,
    );
    await menu.getByRole("link", { name: "Reviews" }).click();
    await wait(page, 2200);
    ok(
      !(await menu.isVisible()) && Math.abs(await topOf(page, "reviews")) < 200,
      `${tag} ${p} phone menu link scrolls and closes`,
    );
  }

  // Both ways back to the hub.
  await page.evaluate(() =>
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "instant",
    }),
  );
  await wait(page, 400);
  await page
    .locator("footer")
    .getByRole("link", { name: "All concepts" })
    .click();
  await page.waitForURL(base + "/");
  await wait(page, 300);
  ok(
    (await page.title()).includes("concepts"),
    `${tag} ${p} footer link returns to the hub`,
  );
  await page.goBack();
  await page.waitForURL((u) => u.pathname === p);
  await page
    .getByRole("link", { name: /All concepts/ })
    .first()
    .click();
  await page.waitForURL(base + "/");
  ok(true, `${tag} ${p} top strip link returns to the hub`);
}

async function audit(viewport: { width: number; height: number }) {
  const ctx = await browser.newContext({ viewport });
  const page = await ctx.newPage();
  page.setDefaultTimeout(15000);
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const external = new Set<string>();
  const tag = `[${viewport.width}]`;
  const phone = viewport.width < 768;

  for (const p of PAGES) {
    console.log(`… ${tag} ${p}`);
    await page.goto(base + p, { waitUntil: "networkidle" });
    const links = await checkLinks(page, p, tag, external);
    if (p === "/gallery") {
      await page.getByRole("button", { name: /^Enlarge .* image 1$/ }).first().click();
      const box = page.getByRole("dialog", { name: /^Image 1 of \d+$/ });
      ok(await box.isVisible(), `${tag} /gallery image opens the lightbox`);
      await page.keyboard.press("Escape");
      ok(!(await box.isVisible()), `${tag} /gallery lightbox closes`);
      const downloads = links.filter((l) => l.href.endsWith(".jpg")).length;
      ok(
        downloads === CONCEPTS.length * GALLERY_SLIDES,
        `${tag} /gallery has ${CONCEPTS.length * GALLERY_SLIDES} downloads (${downloads})`,
      );
    }
    if (!CONCEPTS.includes(p)) continue;
    try {
      await checkConcept(page, p, tag, phone, links);
    } catch (e) {
      problems.push(
        `${tag} ${p} crashed: ${(e as Error).message.split("\n")[0]}`,
      );
    }
    await page.evaluate(() => localStorage.clear());
  }

  // Hub: every card, and the gallery link.
  await page.goto(base + "/", { waitUntil: "networkidle" });
  const cards = page.locator("main ul > li > a");
  ok(
    (await cards.count()) === CONCEPTS.length,
    `${tag} hub has ${CONCEPTS.length} cards`,
  );
  for (let i = 0; i < (await cards.count()); i++) {
    await page.goto(base + "/", { waitUntil: "networkidle" });
    const href = (await cards.nth(i).getAttribute("href"))!;
    await cards.nth(i).click();
    await page.waitForURL(base + href);
    ok(await page.locator("h1").isVisible(), `${tag} hub card → ${href}`);
  }
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.getByRole("link", { name: /View gallery images/ }).click();
  await page.waitForURL(base + "/gallery");
  ok(await page.locator("h1").isVisible(), `${tag} hub → /gallery`);

  // 404.
  await page.goto(base + "/pages/does-not-exist");
  await page.getByRole("link", { name: /Back to all concepts/ }).click();
  await page.waitForURL(base + "/");
  ok(
    errors.length === 0,
    `${tag} no page errors: ${errors.slice(0, 3).join(" | ")}`,
  );

  for (const url of external) {
    let status = 0;
    try {
      status = (await page.request.get(url, { timeout: 15000 })).status();
    } catch {}
    // The SOP lives in the private GitHub repo: signed-out requests get 404 by design.
    const privateRepo = url.startsWith(
      "https://github.com/smcdigitalmarketing/rescuaid-lp/",
    );
    // 429 = the site rate-limits automated requests (YouTube does); the link itself is fine.
    ok(status === 200 || status === 429 || privateRepo, `${tag} external ${url} → ${status}`);
  }
  await ctx.close();
}

await audit({ width: 1280, height: 900 });
await audit({ width: 390, height: 844 });
await browser.close();

console.log(`\nPASS ${passed}  FAIL ${problems.length}`);
for (const p of problems) console.log("FAIL", p);
process.exit(problems.length ? 1 : 0);
