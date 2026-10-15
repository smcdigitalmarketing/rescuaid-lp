import { useEffect, useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Time left until local midnight, matching the live store's "sale ends
 * tonight" bar. Renders a placeholder until hydrated so prerendered HTML and
 * the first client render match.
 */
export function useCountdown(): string {
  const [left, setLeft] = useState<string>("--:--:--");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(24, 0, 0, 0);
      const s = Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000));
      setLeft(
        `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`,
      );
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return left;
}
