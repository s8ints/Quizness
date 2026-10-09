import { chromium } from "@playwright/test";
const browser = await chromium.launch({ channel: "msedge" });
for (const [name, width, height] of [["room-movement", 1440, 1000], ["room-movement-mobile", 390, 844]]) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto("http://127.0.0.1:5173/preview/room");
  await page.locator('.walkable-stage[data-ready="true"]').waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `docs/previews/${name}.png`, fullPage: true });
  await page.close();
}
await browser.close();
