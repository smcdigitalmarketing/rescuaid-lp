import { type RouteConfig, index, route } from "@react-router/dev/routes";

// URLs mirror rescuaid.com: the baseline at the product URL, concepts as /pages/<slug>.
export default [
  index("routes/home.tsx"),
  route("products/:handle", "routes/products.$handle.tsx"),
  route("pages/:slug", "routes/pages.$slug.tsx"),
  route("gallery", "routes/gallery.tsx"),
  route("sop", "routes/sop.tsx"),
  route("gallery/render/:slug/:n", "routes/gallery.render.$slug.$n.tsx"),
] satisfies RouteConfig;
