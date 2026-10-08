import { chromium } from "@playwright/test";
const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  reducedMotion: "reduce",
});
for (const route of [
  "/",
  "/preview",
  "/preview/courses",
  "/preview/courses/biology",
  "/preview/profile",
  "/preview/settings",
  "/preview/onboarding",
  "/login",
  "/signup",
]) {
  await page.goto("http://127.0.0.1:5173" + route);
  console.log(
    route,
    await page.evaluate(() => ({
      width: document.documentElement.scrollWidth,
      overflow: [...document.querySelectorAll("body *")]
        .filter(
          (el) => el.getBoundingClientRect().right > window.innerWidth + 1,
        )
        .map((el) => ({
          tag: el.tagName,
          class: el.className,
          right: el.getBoundingClientRect().right,
        }))
        .slice(0, 8),
    })),
  );
}
await browser.close();
