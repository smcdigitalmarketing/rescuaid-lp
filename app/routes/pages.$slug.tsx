import { data } from "react-router";
import type { Route } from "./+types/pages.$slug";
import { MAIN_HANDLE } from "~/data/catalog";
import { conceptBySlug } from "~/content/pages";
import { pageMeta } from "~/lib/seo";
import { PdpTemplate } from "~/components/pdp-template";

export function loader({ params }: Route.LoaderArgs) {
  if (!conceptBySlug(params.slug)) throw data("Not found", { status: 404 });
  return { slug: params.slug };
}

export const meta: Route.MetaFunction = ({ params }) => {
  const page = conceptBySlug(params.slug);
  return page
    ? pageMeta({ ...page.meta, fonts: page.fonts, handle: MAIN_HANDLE })
    : [{ title: "Not found" }];
};

export default function ConceptLandingPage({
  loaderData,
}: Route.ComponentProps) {
  const page = conceptBySlug(loaderData.slug)!;
  return <PdpTemplate page={page} />;
}
