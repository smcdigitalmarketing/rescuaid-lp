import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AddOn, Tier } from "~/content/types";
import type { Img } from "~/lib/images";

/**
 * In-browser cart standing in for the Shopify cart drawer. Nothing leaves the
 * browser: checkout opens a preview modal. Each line carries the page slug,
 * the same value the Shopify build would send as attributes[pdp_variant].
 */

export type CartLine = {
  key: string;
  title: string;
  detail?: string;
  image: Img;
  price: number;
  compareAt?: number;
  gift?: boolean;
  page: string;
};

type CartState = {
  lines: CartLine[];
  open: boolean;
  checkoutOpen: boolean;
};

type CartApi = CartState & {
  addBundle: (
    page: string,
    tier: Tier,
    addOns: AddOn[],
    productName: string,
  ) => void;
  remove: (key: string) => void;
  setOpen: (open: boolean) => void;
  setCheckoutOpen: (open: boolean) => void;
  subtotal: number;
  compareTotal: number;
  count: number;
};

const STORAGE_KEY = "rescuaid-lp-cart";
const CartContext = createContext<CartApi | null>(null);

function load(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartLine[]) : [];
  } catch {
    return [];
  }
}

function save(lines: CartLine[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    // Private mode or blocked storage: the cart just won't survive a reload.
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLines(load());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) save(lines);
  }, [lines, loaded]);

  const addBundle = useCallback<CartApi["addBundle"]>(
    (page, tier, addOns, productName) => {
      const stamp = Date.now();
      const next: CartLine[] = [
        {
          key: `${tier.id}-${stamp}`,
          title: `${productName} · ${tier.title}`,
          detail: tier.kits === 1 ? "1 kit" : `${tier.kits} kits`,
          image: tier.image,
          price: tier.price,
          compareAt: tier.compareAt,
          page,
        },
        ...tier.gifts.map((g, i) => ({
          key: `gift-${i}-${stamp}`,
          title: g.title,
          detail: `$${g.value} value`,
          image: g.image,
          price: 0,
          compareAt: g.value,
          gift: true,
          page,
        })),
        ...addOns.map((a) => ({
          key: `${a.id}-${stamp}`,
          title: a.title,
          image: a.image,
          price: a.price,
          compareAt: a.compareAt,
          page,
        })),
      ];
      setLines((prev) => [...prev, ...next]);
      setOpen(true);
    },
    [],
  );

  const remove = useCallback(
    (key: string) => setLines((prev) => prev.filter((l) => l.key !== key)),
    [],
  );

  const api = useMemo<CartApi>(() => {
    const subtotal = lines.reduce((s, l) => s + l.price, 0);
    const compareTotal = lines.reduce(
      (s, l) => s + (l.compareAt ?? l.price),
      0,
    );
    return {
      lines,
      open,
      checkoutOpen,
      addBundle,
      remove,
      setOpen,
      setCheckoutOpen,
      subtotal,
      compareTotal,
      count: lines.filter((l) => !l.gift).length,
    };
  }, [lines, open, checkoutOpen, addBundle, remove]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
