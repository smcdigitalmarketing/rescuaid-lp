export const STORE_URL = "https://www.rescuaid.com";

export const fontHref = (families: string) =>
  `https://fonts.googleapis.com/css2?${families}&display=swap`;

/**
 * Concept pages are internal previews: noindex, canonical to the live product
 * page, and the page's own font stylesheet.
 */
export function pageMeta({
  title,
  description,
  fonts,
  handle,
}: {
  title: string;
  description: string;
  fonts: string;
  handle: string;
}) {
  return [
    { title },
    { name: "description", content: description },
    { name: "robots", content: "noindex, nofollow" },
    {
      tagName: "link",
      rel: "canonical",
      href: `${STORE_URL}/products/${handle}`,
    },
    { tagName: "link", rel: "stylesheet", href: fontHref(fonts) },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
  ];
}
