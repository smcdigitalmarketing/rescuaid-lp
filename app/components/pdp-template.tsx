import { useRef } from "react";
import type { ConceptPage } from "~/content/types";
import { PRODUCT_NAME } from "~/content/base";
import { StoreShell } from "~/components/store/shell";
import {
  BenefitTitle,
  HeroQuote,
  IconBullets,
  MediaGallery,
  PriceSavings,
  ProofLine,
} from "~/components/sections/above-fold";
import {
  BuyBox,
  StickyAtc,
  UnderAtc,
  useBuyState,
} from "~/components/sections/buy-box";
import { Accordions, LifestyleMarquee } from "~/components/sections/details";
import { ReviewsWall } from "~/components/sections/proof";
import {
  Comparison,
  HowItWorks,
  StatsBand,
  ValueProps,
} from "~/components/sections/value-props";
import { Faq, FinalProof, GuaranteeBlock } from "~/components/sections/closing";
import { Divider } from "~/components/sections/divider";

/**
 * The product page template. Every concept renders the video's seven
 * sections in this order; only content, theme and the layout flags differ.
 *
 *   1 Above the fold   gallery → proof line → benefit title → price + saving → bullets
 *   2 Buy box          numbered steps, bundle cards with gifts, add-ons, add to cart
 *   3 Under the button shipping, urgency, guarantee spelled out, mini review
 *   4 Details          accordions (first open) + lifestyle strip
 *   5 Social proof     review wall with sources
 *   6 Value props      benefit headlines, how it works, stats, comparison
 *   7 Closing          guarantee → final proof → FAQ → footer
 */
export function PdpTemplate({ page }: { page: ConceptPage }) {
  return (
    <StoreShell
      theme={page.theme}
      conceptName={page.name}
      announcement={page.content.announcement}
      countdown={page.layout.countdownBar ?? true}
      wordmark={page.layout.wordmark}
      header={page.layout.header}
    >
      <PdpBody page={page} />
    </StoreShell>
  );
}

function PdpBody({ page }: { page: ConceptPage }) {
  const c = page.content;
  const compact = page.layout.compact ?? false;
  const reverse = page.layout.hero === "reverse";
  // Headline hero: the title runs full width above the gallery and the buy column.
  const headlineHero = page.layout.hero === "headline";
  const divider = page.layout.divider;
  const buy = useBuyState(c.buy, page.slug, PRODUCT_NAME);
  const atcRef = useRef<HTMLButtonElement>(null);
  const toBuy = () =>
    document.getElementById("buy-options")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* 1–4: product section */}
      <section id="buy" className="scroll-mt-16 px-4 pb-10 pt-4 md:pt-10">
        {headlineHero && (
          <header className="mx-auto mb-8 max-w-4xl space-y-4 text-center md:mb-12">
            <div className="flex justify-center">
              <ProofLine text={c.proofLine} />
            </div>
            <BenefitTitle eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} byline={c.byline} size="large" />
          </header>
        )}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:gap-12">
          <div className={`min-w-0 md:sticky md:top-24 md:self-start ${reverse ? "md:order-2" : ""}`}>
            <MediaGallery slides={c.gallery} />
          </div>
          <div className="min-w-0 space-y-6">
            <div className="space-y-4">
              {!headlineHero && (
                <>
                  <ProofLine text={c.proofLine} />
                  <BenefitTitle eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} byline={c.byline} />
                </>
              )}
              <PriceSavings
                price={buy.tier.price}
                compareAt={buy.tier.compareAt}
              />
              <IconBullets items={c.bullets} />
              {c.heroQuote && <HeroQuote review={c.heroQuote} />}
            </div>
            <BuyBox buy={c.buy} state={buy} atcRef={atcRef} variant={page.layout.tiers} />
            <UnderAtc data={c.underAtc} />
            <Accordions items={c.accordions} />
          </div>
        </div>
      </section>
      {!compact && <LifestyleMarquee images={c.lifestyle} />}
      <Divider kind={divider} />

      {/* 5: social proof */}
      <ReviewsWall data={c.reviews} compact={compact} variant={page.layout.reviews} />
      <Divider kind={divider} />

      {/* 6: value props */}
      <ValueProps
        data={
          compact
            ? { ...c.valueProps, items: c.valueProps.items.slice(0, 3) }
            : c.valueProps
        }
        style={page.layout.valueProps}
      />
      <HowItWorks data={c.howItWorks} safety={c.safety} />
      <StatsBand data={c.stats} />
      <Comparison data={c.comparison} />

      <Divider kind={divider} />

      {/* 7: closing */}
      <GuaranteeBlock data={c.guarantee} onShop={toBuy} />
      <FinalProof data={c.finalProof} />
      <Faq items={c.faqs} />

      <StickyAtc
        state={buy}
        atcRef={atcRef}
        label={compact ? "Claim offer" : "Add to cart"}
      />
    </>
  );
}
