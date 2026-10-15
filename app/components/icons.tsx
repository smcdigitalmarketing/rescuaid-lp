import {
  Baby,
  BadgeCheck,
  Clock,
  Gift,
  HandHeart,
  HeartPulse,
  Home,
  PackageCheck,
  RotateCcw,
  ShieldCheck,
  Stethoscope,
  Timer,
  Truck,
  UserRound,
  UsersRound,
  Zap,
  type LucideIcon,
} from "lucide-react";

/** Icons content files may name. Keeps content plain data. */
export const icons = {
  baby: Baby,
  badge: BadgeCheck,
  clock: Clock,
  gift: Gift,
  hand: HandHeart,
  heart: HeartPulse,
  home: Home,
  package: PackageCheck,
  returns: RotateCcw,
  shield: ShieldCheck,
  doctor: Stethoscope,
  timer: Timer,
  truck: Truck,
  alone: UserRound,
  family: UsersRound,
  fast: Zap,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export function Icon({
  name,
  className = "size-5",
}: {
  name: IconName;
  className?: string;
}) {
  const C = icons[name];
  return <C aria-hidden="true" className={className} />;
}
