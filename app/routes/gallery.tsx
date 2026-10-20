import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Download } from "lucide-react";
import type { Route } from "./+types/gallery";
import { pages } from "~/content/pages";
import { fontHref } from "~/lib/seo";
import { SLIDE_LABELS, SlideView, exportPath } from "~/components/gallery/slides";
import { Lightbox } from "~/components/gallery/lightbox";

export const meta: Route.MetaFunction = () => [
  { title: "RescUAid product gallery images" },
  { name: "robots", content: "noindex, nofollow" },
  {
    tagName: "link",
    rel: "stylesheet",
    href: fontHref("family=Inter:wght@400;500;600;700"),
  },
  // Every concept's own type, so each row renders in its own look.
  ...pages.map((p) => ({
    tagName: "link",
    rel: "stylesheet",
    href: fontHref(p.fonts),
  })),
];

const VIDEOS = [
  { title: "Demo loop", detail: "8 s, square, silent", src: "/video/demo.mp4", poster: "/video/demo.jpg", aspect: "aspect-square", muted: true },
  { title: "Pop social ad", detail: "10.5 s, 9:16, room tone", src: "/video/ad-pop.mp4", poster: "/video/ad-pop.jpg", aspect: "aspect-[9/16] max-h-[560px] object-contain", muted: false },
];

export default function Gallery() {
  /** The slide open in the lightbox: which concept, which image. */
  const [zoom, setZoom] = useState<{ slug: string; index: number } | null>(null);
  return (
    <div className="min-h-dvh bg-[#f6f6f4] font-[Inter,system-ui,sans-serif] text-[#16151a]">
      <main className="mx-auto max-w-7xl px-4 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-black/60 hover:text-black"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          All concepts
        </Link>
        <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
          Product gallery images
        </h1>
        <p className="mt-3 max-w-3xl text-black/60">
          Seven images per concept, in this order: benefit headline, in use,
          before and after, what's inside, how it works, us vs them, and a real
          review. Each downloads as a 1600 × 1600 JPG, ready to upload to
          Shopify. Every gallery ends with the demo video.
        </p>

        <section className="mt-10">
          <h2 className="text-xl font-bold">Videos</h2>
          <p className="mt-1 text-sm text-black/60">
            Generated with Veo 3.1. The demo loops silently in every product gallery; the ad is a 9:16 cut for TikTok
            and Reels in the Pop look.
          </p>
          <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:max-w-3xl">
            {VIDEOS.map((v) => (
              <li key={v.src}>
                <video
                  src={v.src}
                  poster={v.poster}
                  controls
                  muted={v.muted}
                  playsInline
                  preload="metadata"
                  className={`w-full rounded-lg border border-black/10 bg-black ${v.aspect}`}
                />
                <div className="mt-2 flex items-center justify-between gap-2 text-sm">
                  <span>
                    <strong>{v.title}</strong> <span className="text-black/60">· {v.detail}</span>
                  </span>
                  <a href={v.src} download className="inline-flex items-center gap-1 text-xs font-semibold text-[#c62828] hover:underline">
                    <Download aria-hidden="true" className="size-3.5" />
                    MP4
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {pages.map((p) => (
          <section key={p.slug} className="mt-12">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-xl font-bold">{p.name}</h2>
              <Link
                to={p.path}
                className="text-sm font-semibold text-[#c62828] hover:underline"
              >
                Open page
              </Link>
            </div>
            <ol
              data-theme={p.theme}
              className="mt-4 grid grid-cols-2 gap-3 font-sans sm:grid-cols-4 lg:grid-cols-8"
            >
              {p.content.gallery.map((s, i) => (
                <li key={i} className="flex flex-col">
                  <div className="relative aspect-square overflow-hidden rounded-lg border border-black/10 [container-type:inline-size]">
                    <SlideView slide={s} still />
                    <button
                      type="button"
                      onClick={() => setZoom({ slug: p.slug, index: i })}
                      className="absolute inset-0 cursor-zoom-in"
                      aria-label={`Enlarge ${p.name} image ${i + 1}`}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-2 font-[Inter,system-ui,sans-serif] text-xs">
                    <span className="text-black/70">
                      {i + 1}. {SLIDE_LABELS[s.kind]}
                    </span>
                    <a
                      href={s.kind === "video" ? s.src : exportPath(p.slug, i + 1, s.kind)}
                      download
                      className="inline-flex items-center gap-1 font-semibold text-[#c62828] hover:underline"
                      aria-label={`Download ${p.name} ${s.kind === "video" ? "demo video" : `image ${i + 1}`}, ${SLIDE_LABELS[s.kind]}`}
                    >
                      <Download aria-hidden="true" className="size-3.5" />
                      {s.kind === "video" ? "MP4" : "JPG"}
                    </a>
                  </div>
                </li>
              ))}
            </ol>
            {zoom?.slug === p.slug && (
              <Lightbox
                slides={p.content.gallery}
                index={zoom.index}
                theme={p.theme}
                onIndex={(index) => setZoom({ slug: p.slug, index })}
                onClose={() => setZoom(null)}
              />
            )}
          </section>
        ))}
      </main>
    </div>
  );
}
