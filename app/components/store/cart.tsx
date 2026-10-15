import { useEffect, useRef } from "react";
import { Lock, Trash2, Truck, X } from "lucide-react";
import { FREE_SHIPPING_MIN } from "~/content/base";
import { money } from "~/data/catalog";
import { useCart } from "~/lib/mock-cart";
import { Picture } from "~/components/ui";

/** Slide-out cart, styled after the Sense theme's cart drawer. */
export function CartDrawer() {
  const {
    lines,
    open,
    setOpen,
    remove,
    subtotal,
    compareTotal,
    setCheckoutOpen,
  } = useCart();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    panel.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const toFree = Math.max(0, FREE_SHIPPING_MIN - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_MIN) * 100);
  const savings = compareTotal - subtotal;

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={() => setOpen(false)}
      />
      <div
        ref={panel}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-surface text-ink shadow-2xl outline-none transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <p className="display text-xl">Your cart</p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full p-1.5 hover:bg-surface-2"
            aria-label="Close cart"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

        <div className="border-b border-line bg-surface-2 px-5 py-3 text-sm">
          <p className="flex items-center gap-2 font-medium">
            <Truck aria-hidden="true" className="size-4" />
            {toFree > 0
              ? `You're ${money(toFree)} away from free shipping`
              : "You've unlocked free shipping"}
          </p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-success transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
          {lines.length === 0 && (
            <li className="py-16 text-center text-muted">
              Your cart is empty.
            </li>
          )}
          {lines.map((l) => (
            <li key={l.key} className="flex gap-4 py-4">
              <div className="size-16 shrink-0 overflow-hidden rounded-card border border-line bg-surface-2">
                <Picture image={l.image} fit="contain" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-snug">{l.title}</p>
                {l.detail && <p className="text-xs text-muted">{l.detail}</p>}
                <p className="mt-1 text-sm">
                  <span
                    className={
                      l.gift ? "font-bold text-success" : "font-semibold"
                    }
                  >
                    {money(l.price)}
                  </span>
                  {l.compareAt && l.compareAt > l.price && (
                    <s className="ml-2 text-xs text-muted">
                      {money(l.compareAt)}
                    </s>
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={() => remove(l.key)}
                className="self-start rounded p-1 text-muted hover:text-ink"
                aria-label={`Remove ${l.title}`}
              >
                <Trash2 aria-hidden="true" className="size-4" />
              </button>
            </li>
          ))}
        </ul>

        <div className="border-t border-line px-5 py-5">
          {savings > 0 && (
            <p className="mb-1 flex justify-between text-sm font-semibold text-success">
              <span>You save</span>
              <span>{money(savings)}</span>
            </p>
          )}
          <p className="flex justify-between text-lg font-bold">
            <span>Subtotal</span>
            <span>{money(subtotal)}</span>
          </p>
          <button
            type="button"
            disabled={lines.length === 0}
            onClick={() => setCheckoutOpen(true)}
            className="btn-primary mt-4 flex w-full items-center justify-center gap-2 py-4 text-base font-bold uppercase tracking-wide disabled:opacity-40"
          >
            <Lock aria-hidden="true" className="size-4" />
            Check out
          </button>
        </div>
      </div>
    </div>
  );
}

/** Stands in for Shopify checkout: explains what would happen on rescuaid.com. */
export function CheckoutPreview() {
  const { checkoutOpen, setCheckoutOpen, lines, subtotal } = useCart();
  if (!checkoutOpen) return null;
  const page = lines[0]?.page ?? "baseline";
  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center bg-black/50 p-4"
      onClick={() => setCheckoutOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        className="w-full max-w-md rounded-card bg-surface p-6 text-ink shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <p id="checkout-title" className="display text-2xl">
          Checkout preview
        </p>
        <p className="mt-3 text-sm text-muted">
          This is a concept page, so nothing is charged. On rescuaid.com this
          button goes to Shopify checkout with {money(subtotal)} in the cart,
          and the order is tagged{" "}
          <code className="rounded bg-surface-2 px-1 py-0.5 text-xs text-ink">
            pdp_variant={page}
          </code>{" "}
          so Shopify reports can split sales by landing page.
        </p>
        <button
          type="button"
          onClick={() => setCheckoutOpen(false)}
          className="btn-primary mt-6 w-full py-3 font-bold"
        >
          Back to the page
        </button>
      </div>
    </div>
  );
}
