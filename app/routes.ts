import { type RouteConfig, index, route } from "@react-router/dev/routes";

// URLs mirror rescuaid.com: the baseline at the product URL, concepts as /pages/<slug>.
export default [
  index("routes/home.tsx"),
  route("products/:handle", "routes/products.$handle.tsx"),
  route("pages/:slug", "routes/pages.$slug.tsx"),
] satisfies RouteConfig;
