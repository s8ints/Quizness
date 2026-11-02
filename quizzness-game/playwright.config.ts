import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/e2e",
  // The test browser renders the game in software, so fewer run at once, with more time.
  workers: 3,
  timeout: 60000,
  expect: { timeout: 15000 },
  use: {
    baseURL: "http://127.0.0.1:5173",
    viewport: { width: 1440, height: 1000 },
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run dev -- --port 5173 --strictPort",
    url: "http://127.0.0.1:5173",
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: "edge", use: { browserName: "chromium", channel: "msedge" } },
  ],
});
