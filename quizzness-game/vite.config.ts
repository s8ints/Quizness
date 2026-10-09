import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    // Browser tests (Playwright) run separately, including the loose e2e/ copy.
    exclude: ["tests/e2e/**", "e2e/**", "node_modules/**"],
    // Unit tests never talk to the real Supabase project in .env.local.
    env: { VITE_SUPABASE_URL: "", VITE_SUPABASE_PUBLISHABLE_KEY: "" },
  },
});
