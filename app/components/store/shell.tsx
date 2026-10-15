import type { ReactNode } from "react";
import { Link } from "react-router";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import type { ThemeName } from "~/content/types";
import { SUPPORT_EMAIL, GUARANTEE_DAYS } from "~/content/base";
import { CartProvider, useCart } from "~/lib/mock-cart";
import { useCountdown } from "~/lib/use-countdown";
import { Logo } from "~/components/ui";
import { CartDrawer, CheckoutPreview } from "./cart";

/**
 * The rescuaid.com chrome (announcement bar, header, footer) around a page,
 * plus a strip that marks it as a concept preview.
 */
export function StoreShell({
  theme,
  conceptName,
  announcement,
  countdown = true,
  children,
}: {
  theme: ThemeName;
  conceptName: string;
  announcement: string;
  countdown?: boolean;
  children: ReactNode;
}) {
  return (
    <CartProvider>
      <div
        data-theme={theme}
        className="min-h-dvh bg-bg font-sans text-ink antialiased"
      >
        <a
          href="#buy"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-btn focus:bg-surface focus:px-4 focus:py-2"
        >
          Skip to purchase options
        </a>
        <PreviewStrip name={conceptName} />
        <Announcement text={announcement} countdown={countdown} />
        <Header />
        <main id="top">{children}</main>
        <Footer />
        <CartDrawer />
        <CheckoutPreview />
      </div>
    </CartProvider>
  );
}

function PreviewStrip({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-between gap-3 bg-[#111] px-4 py-1.5 font-[Inter,system-ui,sans-serif] text-[11px] text-white/80">
      <Link to="/" className="inline-flex items-center gap-1 hover:text-white">
        <ArrowLeft aria-hidden="true" className="size-3" />
        All concepts
      </Link>
      <span className="truncate">
        Concept preview · <strong className="text-white">{name}</strong>
      </span>
    </div>
  );
}

function Announcement({ text, countdown }: { text: string; countdown: boolean }) {
  const left = useCountdown();
  return (
    <div className="bg-accent px-4 py-2 text-center text-[13px] font-semibold tracking-wide text-accent-ink">
      {text}
      {countdown && (
        <>
          {" "}
          <span aria-hidden="true">•</span>{" "}
          <span className="tabular-nums" aria-label="Time left today">
            {left}
          </span>
        </>
      )}
    </div>
  );
}

function Header() {
  const { count, setOpen } = useCart();
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-surface/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <a href="#top" className="shrink-0" aria-label="RescUAid home">
          <Logo className="h-8 md:h-9" />
        </a>
        <nav
          aria-label="Main"
          className="hidden gap-7 text-sm text-muted md:flex"
        >
          <a href="#top" className="hover:text-ink">
            Home
          </a>
          <a href="#buy" className="hover:text-ink">
            RescUAid
          </a>
          <a href="#how" className="hover:text-ink">
            How it works
          </a>
          <a href="#reviews" className="hover:text-ink">
            Reviews
          </a>
          <a href="#faq" className="hover:text-ink">
            Contact
          </a>
        </nav>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative rounded-full p-2 hover:bg-surface-2"
          aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
        >
          <ShoppingBag aria-hidden="true" className="size-6" />
          {count > 0 && (
            <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-brand text-[11px] font-bold text-brand-ink">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-footer px-4 pb-28 pt-14 text-sm text-footer-ink/75 md:pb-14">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
        <div>
          <p className="mb-3 font-bold uppercase tracking-wider text-footer-ink">
            Contact us
          </p>
          <p>Email: {SUPPORT_EMAIL}</p>
          <p>Phone: (307) 316-6168</p>
          <p className="mt-2">
            2232 Dell Range Blvd
            <br />
            Cheyenne, WY 82009
          </p>
        </div>
        <div>
          <p className="mb-3 font-bold uppercase tracking-wider text-footer-ink">
            Our promise
          </p>
          <ul className="space-y-1">
            <li>✓ Risk-free {GUARANTEE_DAYS}-day trial</li>
            <li>✓ Guaranteed satisfaction</li>
            <li>✓ Premium US customer care</li>
          </ul>
        </div>
        <div>
          <p className="mb-3 font-bold uppercase tracking-wider text-footer-ink">
            Support hours
          </p>
          <p>Monday – Friday</p>
          <p>9:00 AM – 5:00 PM EST</p>
        </div>
        <div>
          <p className="mb-3 font-bold uppercase tracking-wider text-footer-ink">
            Policies
          </p>
          <ul className="space-y-1">
            <li>Privacy policy</li>
            <li>Shipping policy</li>
            <li>Terms of service</li>
            <li>Refund policy</li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl border-t border-footer-ink/15 pt-6 text-xs">
        © 2026, RescUAid · Concept preview, not the live store
      </p>
    </footer>
  );
}
