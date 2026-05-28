// Vercel deployment build config — replaces the lovable Cloudflare-specific config.
// Uses @tanstack/react-start/config directly so we can set the Nitro preset to "vercel"
// without the @cloudflare/vite-plugin that the lovable wrapper always injects.
import { defineConfig } from "@tanstack/react-start/config";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    // Nitro "vercel" preset emits .vercel/output/ (Vercel Output API format)
    preset: "vercel",
  },
  vite: {
    plugins: [
      tailwindcss(),
      tsconfigPaths(),
    ],
  },
});
