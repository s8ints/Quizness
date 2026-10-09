import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

await mkdir("docs/previews", { recursive: true });
const browser = await chromium.launch({ channel: "msedge" });
for (const [name, width, height, route] of [
  ["landing", 1440, 1000, "/"],
  ["hub", 1440, 1000, "/preview"],
  ["mobile-hub", 390, 844, "/preview"],
  ["mobile-profile", 390, 844, "/preview/profile"],
  ["mobile-login", 390, 844, "/login"],
]) {
  const page = await browser.newPage({
    viewport: { width, height },
    reducedMotion: "reduce",
  });
  await page.goto(`http://127.0.0.1:5173${route}`);
  await page.getByRole("heading", { level: 1 }).waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `docs/previews/${name}.png`, fullPage: true });
  await page.close();
}
await browser.close();
