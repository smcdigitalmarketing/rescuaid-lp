/**
 * Gemini API paid-tier image prices in USD (ai.google.dev/gemini-api/docs/pricing,
 * as used in the rescu-aid repo, checked 2026-09-30). Plain data, no imports,
 * so Node can load it directly.
 */

/** Per 1M tokens; perImage is the list price for a 1K/2K output image. */
export const IMAGE_PRICES: Record<
  string,
  { input: number; output: number; perImage: number }
> = {
  "gemini-3-pro-image": { input: 2, output: 120, perImage: 0.134 },
  "gemini-3.1-flash-image": { input: 0.5, output: 60, perImage: 0.101 },
  "gemini-3.1-flash-lite-image": { input: 0.25, output: 30, perImage: 0.034 },
};
