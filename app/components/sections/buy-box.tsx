import { useEffect, useMemo, useState, type RefObject } from "react";
import { Check, Clock, Gift as GiftIcon, ShieldCheck } from "lucide-react";
import type { AddOn, PdpContent, Tier } from "~/content/types";
import { money } from "~/data/catalog";
import { useCart } from "~/lib/mock-cart";
import { useCountdown } from "~/lib/use-countdown";
import { Icon } from "~/components/icons";
import { Picture, SourceBadge, Stars } from "~/components/ui";

/*
 * Sections 2 and 3: the buy box and what sits under add to cart. The video's
 * rules: numbered steps, every option visible, show what's in each bundle,
 * say the dollar saving, then answer the biggest fear right under the button.
 */

export type BuyState = ReturnType<typeof useBuyState>;

export function useBuyState(
  buy: PdpContent["buy"],
  page: string,
  productName: string,
) {
  const [tierId, setTierId] = useState(buy.defaultTier);
  const [addOnIds, setAddOnIds] = useState<Set<string>>(new Set());
  const cart = useCart();

  return useMemo(() => {
    const tier = buy.tiers.find((t) => t.id === tierId) ?? buy.tiers[0];
    const addOns = buy.addOns.filter((a) => addOnIds.has(a.id));
    const giftValue = tier.gifts.reduce((s, g) => s + g.value, 0);
    const total = tier.price + addOns.reduce((s, a) => s + a.price, 0);
    const compareAt =
      tier.compareAt + addOns.reduce((s, a) => s + (a.compareAt ?? a.price), 0);
    return {
      tier,
      addOns,
      total,
      compareAt,
      giftValue,
      setTierId,
      toggleAddOn: (id: string) =>
        setAddOnIds((prev) => {
          const next = new Set(prev);
          if (next.has(id)) next.delete(id);
          else next.add(id);
          return next;
        }),
      isAdded: (id: string) => addOnIds.has(id),
      addToCart: () => cart.addBundle(page, tier, addOns, productName),
    };
  }, [buy, tierId, addOnIds, cart, page, productName]);
}

function StepLabel({ n, children }: { n: number; children: string }) {
  return (
    <p className="mb-3 flex items-center gap-2 text-sm font-bold">
      <span className="grid size-6 place-items-center rounded-full bg-ink text-xs text-bg">
        {n}
      </span>
      <span>
        Step {n}: {children}
      </span>
    </p>
  );
}

function TierCard({
  tier,
  selected,
  onSelect,
}: {
  tier: Tier;
  selected: boolean;
  onSelect: () => void;
}) {
  const save = tier.compareAt - tier.price;
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`relative w-full rounded-card border-2 bg-surface p-3 text-left transition ${
        selected
          ? "border-brand shadow-[0_0_0_3px_color-mix(in_srgb,var(--brand)_15%,transparent)]"
          : "border-line hover:border-muted"
      }`}
    >
      {tier.badge && (
        <span className="absolute -top-2.5 right-3 rounded-full bg-brand px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-brand-ink">
          {tier.badge}
        </span>
      )}
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className={`grid size-5 shrink-0 place-items-center rounded-full border-2 ${selected ? "border-brand bg-brand" : "border-line"}`}
        >
          {selected && <span className="size-2 rounded-full bg-brand-ink" />}
        </span>
        <div className="size-14 shrink-0 overflow-hidden rounded-[calc(var(--r-card)*0.6)] bg-surface-2">
          <Picture image={tier.image} fit="contain" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-bold leading-tight">{tier.title}</p>
          <p className="text-xs text-muted">{tier.sub}</p>
        </div>
        <div className="text-right">
          <p className="font-bold">{money(tier.price)}</p>
          <s className="text-xs text-muted">{money(tier.compareAt)}</s>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2 pl-8">
        <span className="rounded-full bg-highlight px-2 py-0.5 text-xs font-bold text-highlight-ink">
          You save {money(save)}
        </span>
        {tier.kits > 1 && (
          <span className="text-xs text-muted">
            {money(tier.price / tier.kits)} per kit
          </span>
        )}
      </div>
      {tier.gifts.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2 pl-8">
          {tier.gifts.map((g) => (
            <li
              key={g.title}
              className="flex items-center gap-2 rounded-[calc(var(--r-card)*0.6)] border border-dashed border-success/50 bg-success/5 py-1 pl-1 pr-2"
            >
              <span className="size-7 overflow-hidden rounded bg-surface">
                <Picture image={g.image} fit="contain" />
              </span>
              <span className="text-[11px] leading-tight">
                <strong className="text-success">FREE</strong> {g.title}
                <span className="block text-muted">{money(g.value)} value</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </button>
  );
}

function AddOnRow({
  addOn,
  added,
  onToggle,
}: {
  addOn: AddOn;
  added: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={added}
      onClick={onToggle}
      className={`flex w-full items-center gap-3 rounded-card border bg-surface p-2.5 text-left transition ${added ? "border-ink" : "border-line hover:border-muted"}`}
    >
      <span
        aria-hidden="true"
        className={`grid size-5 shrink-0 place-items-center rounded border-2 ${added ? "border-ink bg-ink text-bg" : "border-line"}`}
      >
        {added && <Check className="size-3.5" />}
      </span>
      <span className="size-11 shrink-0 overflow-hidden rounded bg-surface-2">
        <Picture image={addOn.image} fit="contain" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold">{addOn.title}</span>
        <span className="block text-xs text-muted">{addOn.blurb}</span>
      </span>
      <span className="text-sm font-bold">+{money(addOn.price)}</span>
    </button>
  );
}

export function BuyBox({
  buy,
  state,
  atcRef,
}: {
  buy: PdpContent["buy"];
  state: BuyState;
  atcRef: RefObject<HTMLButtonElement | null>;
}) {
  const save = state.compareAt - state.total;
  return (
    <div id="buy-options" className="scroll-mt-24 space-y-6">
      <div role="radiogroup" aria-label={buy.steps[0]}>
        <StepLabel n={1}>{buy.steps[0]}</StepLabel>
        <div className="space-y-3">
          {buy.tiers.map((t) => (
            <TierCard
              key={t.id}
              tier={t}
              selected={t.id === state.tier.id}
              onSelect={() => state.setTierId(t.id)}
            />
          ))}
        </div>
      </div>
      {buy.addOns.length > 0 && (
        <div>
          <StepLabel n={2}>{buy.steps[1]}</StepLabel>
          <div className="space-y-2">
            {buy.addOns.map((a) => (
              <AddOnRow
                key={a.id}
                addOn={a}
                added={state.isAdded(a.id)}
                onToggle={() => state.toggleAddOn(a.id)}
              />
            ))}
          </div>
        </div>
      )}
      <div>
        <p className="mb-3 flex flex-wrap items-baseline justify-between gap-2 text-sm">
          <span className="font-semibold">
            Total:{" "}
            <span className="text-xl font-bold">{money(state.total)}</span>{" "}
            <s className="text-muted">{money(state.compareAt)}</s>
          </span>
          <span className="font-bold text-success">
            You save {money(save)}
            {state.giftValue > 0 && ` + ${money(state.giftValue)} in gifts`}
          </span>
        </p>
        <button
          ref={atcRef}
          type="button"
          onClick={state.addToCart}
          className="btn-primary w-full py-4 text-base font-bold uppercase tracking-wide shadow-lg transition hover:brightness-110 active:scale-[0.99]"
        >
          {buy.cta}
        </button>
      </div>
    </div>
  );
}

/** Reduce fear, uncertainty and doubt right under the button. No payment badges. */
export function UnderAtc({ data }: { data: PdpContent["underAtc"] }) {
  const left = useCountdown();
  return (
    <div className="space-y-4">
      <ul className="grid gap-2 text-sm">
        {data.lines.map((l) => (
          <li key={l.text} className="flex items-center gap-2">
            <Icon name={l.icon} className="size-4 text-success" />
            {l.text}
          </li>
        ))}
        <li className="flex items-center gap-2 font-semibold text-brand">
          <Clock aria-hidden="true" className="size-4" />
          {data.urgency} <span className="tabular-nums">{left}</span>
        </li>
      </ul>
      <div className="rounded-card border border-line bg-surface-2 p-4">
        <p className="flex items-center gap-2 font-bold">
          <ShieldCheck aria-hidden="true" className="size-5 text-success" />
          {data.guarantee.title}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          {data.guarantee.body}
        </p>
      </div>
      <figure className="flex gap-3 rounded-card border border-line bg-surface p-4">
        {data.review.photo && (
          <div className="size-11 shrink-0 overflow-hidden rounded-full">
            <Picture image={data.review.photo} />
          </div>
        )}
        <div>
          <Stars rating={data.review.rating} className="size-3.5" />
          <blockquote className="mt-1 text-sm leading-relaxed">
            “{data.review.quote}”
          </blockquote>
          <figcaption className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted">
            <strong className="text-ink">{data.review.name}</strong>
            {data.review.meta}
            <SourceBadge source={data.review.source} />
          </figcaption>
        </div>
      </figure>
    </div>
  );
}

/** Appears once the main add-to-cart button has scrolled out of view. */
export function StickyAtc({
  state,
  atcRef,
  label,
}: {
  state: BuyState;
  atcRef: RefObject<HTMLButtonElement | null>;
  label: string;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show only once the shopper has scrolled past the real button, not before reaching it.
    const update = () => {
      const el = atcRef.current;
      setShow(!!el && el.getBoundingClientRect().bottom < 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [atcRef]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 px-4 py-3 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur transition-transform duration-300 ${show ? "translate-y-0" : "translate-y-full"}`}
      aria-hidden={!show}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <div className="hidden size-11 shrink-0 overflow-hidden rounded bg-surface-2 sm:block">
          <Picture image={state.tier.image} fit="contain" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold">{state.tier.title}</p>
          <p className="text-xs">
            <strong>{money(state.total)}</strong>{" "}
            <s className="text-muted">{money(state.compareAt)}</s>
            {state.tier.gifts.length > 0 && (
              <span className="ml-2 inline-flex items-center gap-1 text-success">
                <GiftIcon aria-hidden="true" className="size-3" />
                {state.tier.gifts.length} free gift
                {state.tier.gifts.length > 1 ? "s" : ""}
              </span>
            )}
          </p>
        </div>
        <button
          type="button"
          tabIndex={show ? 0 : -1}
          onClick={state.addToCart}
          className="btn-primary shrink-0 px-5 py-3 text-sm font-bold uppercase tracking-wide"
        >
          {label}
        </button>
      </div>
    </div>
  );
}
