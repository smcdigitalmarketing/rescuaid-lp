import type { Config } from "@react-router/dev/config";
import { vercelPreset } from "@vercel/react-router/vite";

export default {
  ssr: true,
  presets: [vercelPreset()],
  // Every page is static: prerender the hub, the baseline and each concept.
  async prerender() {
    return [
      "/",
      "/products/rescuaid-anti-choking-device-for-adults-children",
      "/pages/clinical",
      "/pages/family",
      "/pages/offer",
      "/pages/premium",
      "/pages/pulse",
      "/pages/soft",
      "/pages/field",
      "/pages/pop",
      "/pages/heritage",
      "/pages/retro",
      "/pages/story",
      "/pages/luxe",
      "/gallery",
      "/sop",
    ];
  },
} satisfies Config;
