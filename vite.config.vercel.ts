import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Dedicated Vercel build config.
// - disables Cloudflare build integration from lovable's wrapper
// - sets Nitro preset to vercel so output is written to .vercel/output
export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    server: {
      preset: "vercel",
      entry: "server",
    },
  },
});
