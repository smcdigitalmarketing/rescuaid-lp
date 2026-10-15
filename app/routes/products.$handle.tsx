import { data } from "react-router";
import type { Route } from "./+types/products.$handle";
import { MAIN_HANDLE } from "~/data/catalog";
import { baseline } from "~/content/pages";
import { pageMeta } from "~/lib/seo";
import { PdpTemplate } from "~/components/pdp-template";

export function loader({ params }: Route.LoaderArgs) {
  if (params.handle !== MAIN_HANDLE) throw data("Not found", { status: 404 });
  return null;
}

export const meta: Route.MetaFunction = () =>
  pageMeta({ ...baseline.meta, fonts: baseline.fonts, handle: MAIN_HANDLE });

export default function ProductPage() {
  return <PdpTemplate page={baseline} />;
}
