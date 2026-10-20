import { data } from "react-router";
import { Sparkles } from "lucide-react";
import type { Route } from "./+types/video.render.$layer";
import { adCaptions } from "~/data/videos";
import { LOOX } from "~/content/base";
import { pop } from "~/content/pages/pop";
import { fontHref } from "~/lib/seo";
import { lifeImg } from "~/lib/images";

/**
 * One overlay layer of the Pop social ad at 1080 × 1920, for
 * `npm run videos:build` to screenshot: a caption (transparent background)
 * or the end card. Not linked from anywhere and not prerendered.
 */

const LAYERS = [...adCaptions.map((c) => c.id), "end"];

export function loader({ params }: Route.LoaderArgs) {
  if (!LAYERS.includes(params.layer)) throw data("Not found", { status: 404 });
  return { layer: params.layer };
}

export const meta: Route.MetaFunction = () => [
  { title: "Video overlay" },
  { name: "robots", content: "noindex, nofollow" },
  { tagName: "link", rel: "stylesheet", href: fontHref(pop.fonts) },
];

export default function VideoOverlay({ loaderData }: Route.ComponentProps) {
  const caption = adCaptions.find((c) => c.id === loaderData.layer);
  return (
    <div data-theme="pop" data-video-render={loaderData.layer} className="relative h-[1920px] w-[1080px] overflow-hidden font-sans">
      {caption ? (
        // Upper third, clear of TikTok/Reels UI at the bottom and right.
        <div className="absolute inset-x-[90px] top-[300px] flex flex-col items-start gap-6">
          <p className="display -rotate-2 rounded-[28px] bg-highlight px-10 py-6 text-[104px] leading-[1.02] text-highlight-ink shadow-[0_18px_50px_rgba(0,0,0,0.25)]">
            {caption.text}
          </p>
          {"sub" in caption && caption.sub && (
            <p className="display rotate-1 rounded-full bg-accent px-9 py-4 text-[56px] text-accent-ink shadow-[0_12px_40px_rgba(0,0,0,0.25)]">
              {caption.sub}
            </p>
          )}
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-14 bg-[linear-gradient(160deg,#5b2eff_0%,#8a2eff_45%,#ff2e63_100%)] px-[90px] text-center text-white">
          <span className="inline-flex items-center gap-5">
            <span className="grid size-[110px] place-items-center rounded-[28px] bg-white text-brand">
              <Sparkles aria-hidden="true" className="size-16" strokeWidth={2.5} />
            </span>
            <span className="display text-[120px] leading-none">rescuaid</span>
          </span>
          <div className="size-[560px] overflow-hidden rounded-[48px] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
            <img src={lifeImg("heroPop", "").src} alt="" className="h-full w-full object-cover" />
          </div>
          <p className="display -rotate-2 rounded-[24px] bg-highlight px-10 py-5 text-[84px] leading-none text-highlight-ink">
            Buy 2, get 1 free
          </p>
          <p className="flex items-center gap-4 text-[44px] font-semibold">
            <span aria-label="5 out of 5 stars" className="tracking-[0.1em] text-highlight">
              ★★★★★
            </span>
            {LOOX.rating}/5 · {LOOX.count} reviews
          </p>
          <p className="rounded-full bg-white px-14 py-6 text-[56px] font-bold text-ink">rescuaid.com</p>
        </div>
      )}
    </div>
  );
}
