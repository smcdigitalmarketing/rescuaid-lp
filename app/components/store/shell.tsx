import { useState, type ReactNode } from "react";
import { Link } from "react-router";
import { ArrowLeft, Menu, ShoppingBag, X } from "lucide-react";
import type { ThemeName, Wordmark } from "~/content/types";
import { SUPPORT_EMAIL, GUARANTEE_DAYS } from "~/content/base";
import { CartProvider, useCart } from "~/lib/mock-cart";
import { useCountdown } from "~/lib/use-countdown";
import { BrandMark } from "~/components/ui";
import { STORE_URL } from "~/lib/seo";
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
  wordmark,
  header = "standard",
  children,
}: {
  theme: ThemeName;
  conceptName: string;
  announcement: string;
  countdown?: boolean;
  wordmark?: Wordmark;
  header?: "standard" | "centered";
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
        <Header wordmark={wordmark} variant={header} />
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

/** In-page links, the same on desktop and in the phone menu. */
const NAV = [
  { href: "#top", label: "Home" },
  { href: "#buy", label: "RescUAid" },
  { href: "#how", label: "How it works" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "Contact" },
];

function Header({ wordmark, variant }: { wordmark?: Wordmark; variant: "standard" | "centered" }) {
  const { count, setOpen } = useCart();
  const [menu, setMenu] = useState(false);
  const centered = variant === "centered";

  const menuButton = (
    <button
      type="button"
      onClick={() => setMenu((v) => !v)}
      className="-ml-2 rounded-full p-2 hover:bg-surface-2 md:hidden"
      aria-label={menu ? "Close menu" : "Open menu"}
      aria-expanded={menu}
      aria-controls="mobile-menu"
    >
      {menu ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
    </button>
  );
  const logo = (
    <a href="#top" className="shrink-0" aria-label="RescUAid home">
      <BrandMark wordmark={wordmark} />
    </a>
  );
  const nav = (
    <nav aria-label="Main" className="hidden gap-7 text-sm text-muted md:flex">
      {NAV.map((n) => (
        <a key={n.href} href={n.href} className="hover:text-ink">
          {n.label}
        </a>
      ))}
    </nav>
  );
  const cart = (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="relative justify-self-end rounded-full p-2 hover:bg-surface-2"
      aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
    >
      <ShoppingBag aria-hidden="true" className="size-6" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-brand text-[11px] font-bold text-brand-ink">
          {count}
        </span>
      )}
    </button>
  );

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-surface/95 backdrop-blur">
      {/* Three slots: [menu + logo | nav | cart], or centred: [menu + nav | logo | cart]. */}
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4">
        {centered ? (
          <>
            <div className="flex items-center gap-1">
              {menuButton}
              {nav}
            </div>
            {logo}
          </>
        ) : (
          <>
            <div className="flex items-center gap-1">
              {menuButton}
              {logo}
            </div>
            <div className="justify-self-center">{nav}</div>
          </>
        )}
        {cart}
      </div>
      {menu && (
        <nav id="mobile-menu" aria-label="Main" className="border-t border-line bg-surface px-4 pb-4 md:hidden">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setMenu(false)}
              className="block border-b border-line py-3 text-base font-medium last:border-0"
            >
              {n.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

const POLICIES = [
  { slug: "privacy-policy", label: "Privacy policy" },
  { slug: "shipping-policy", label: "Shipping policy" },
  { slug: "terms-of-service", label: "Terms of service" },
  { slug: "refund-policy", label: "Refund policy" },
];

function Footer() {
  return (
    <footer className="bg-footer px-4 pb-28 pt-14 text-sm text-footer-ink/75">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
        <div>
          <p className="mb-3 font-bold uppercase tracking-wider text-footer-ink">
            Contact us
          </p>
          <p>
            Email:{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="underline hover:text-footer-ink">
              {SUPPORT_EMAIL}
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+13073166168" className="underline hover:text-footer-ink">
              (307) 316-6168
            </a>
          </p>
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
          {/* The live store's own policy pages. */}
          <ul className="space-y-1">
            {POLICIES.map((pol) => (
              <li key={pol.slug}>
                <a
                  href={`${STORE_URL}/policies/${pol.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-footer-ink"
                >
                  {pol.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl border-t border-footer-ink/15 pt-6 text-xs">
        © 2026, RescUAid · Concept preview, not the live store ·{" "}
        <Link to="/" className="underline hover:text-footer-ink">
          All concepts
        </Link>
      </p>
    </footer>
  );
}
