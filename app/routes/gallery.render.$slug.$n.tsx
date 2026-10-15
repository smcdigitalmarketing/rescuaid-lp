import { data } from "react-router";
import type { Route } from "./+types/gallery.render.$slug.$n";
import { pages } from "~/content/pages";
import { fontHref } from "~/lib/seo";
import { SlideView } from "~/components/gallery/slides";

/**
 * One gallery slide at exactly 1600 × 1600, for `npm run gallery:export` to
 * screenshot. Not linked from anywhere and not prerendered.
 */

const find = (slug?: string, n?: string) => {
  const page = pages.find((p) => p.slug === slug);
  const slide = page?.content.gallery[Number(n) - 1];
  return page && slide ? { page, slide } : null;
};

export function loader({ params }: Route.LoaderArgs) {
  if (!find(params.slug, params.n)) throw data("Not found", { status: 404 });
  return { slug: params.slug, n: params.n };
}

export const meta: Route.MetaFunction = ({ params }) => {
  const hit = find(params.slug, params.n);
  return [
    { title: "Gallery render" },
    { name: "robots", content: "noindex, nofollow" },
    ...(hit
      ? [{ tagName: "link", rel: "stylesheet", href: fontHref(hit.page.fonts) }]
      : []),
  ];
};

export default function GalleryRender({ loaderData }: Route.ComponentProps) {
  const { page, slide } = find(loaderData.slug, loaderData.n)!;
  return (
    <div
      data-theme={page.theme}
      data-gallery-render={slide.kind}
      className="size-[1600px] overflow-hidden bg-bg font-sans text-ink [container-type:inline-size]"
    >
      <SlideView slide={slide} priority />
    </div>
  );
}
