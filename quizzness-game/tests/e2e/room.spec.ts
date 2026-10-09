import { test, expect } from "@playwright/test";

test("room movement, wall collision, focus, destinations and repeat mounting", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/preview/room");
  const room = page.getByRole("group", {
    name: "Walkable student room",
    exact: true,
  });
  await expect(room).toHaveAttribute("data-ready", "true", { timeout: 15000 });
  await expect(page.locator("canvas")).toHaveCount(1);
  await room.focus();
  await page.keyboard.down("ArrowRight");
  await page.waitForTimeout(350);
  await page.keyboard.up("ArrowRight");
  await expect
    .poll(async () => Number(await room.getAttribute("data-player-x")))
    .toBeGreaterThan(340);
  await page.getByRole("button", { name: "Pause walking" }).click();
  await room.focus();
  const stopped = await room.getAttribute("data-player-x");
  await page.keyboard.down("KeyD");
  await page.waitForTimeout(200);
  await page.keyboard.up("KeyD");
  expect(await room.getAttribute("data-player-x")).toBe(stopped);
  await page.getByRole("button", { name: "Resume walking" }).click();
  await room.focus();
  await page.keyboard.down("ArrowDown");
  await page.waitForTimeout(1800);
  await page.keyboard.up("ArrowDown");
  await expect
    .poll(async () => Number(await room.getAttribute("data-player-y")))
    .toBeLessThanOrEqual(376);
  await page
    .getByRole("button", { name: "Talk to Panthy", exact: true })
    .click();
  await expect(
    page.getByRole("dialog", { name: "Panthy’s welcome" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Back to exploring" }).click();
  await expect(room).toBeFocused();
  await page
    .getByRole("navigation", { name: "Room destinations" })
    .getByRole("link", { name: "Wardrobe" })
    .click();
  await expect(page).toHaveURL(/\/preview\/profile$/);
  await page.goBack();
  await expect(room).toHaveAttribute("data-ready", "true");
  await expect(page.locator("canvas")).toHaveCount(1);
  expect(errors).toEqual([]);
});

test("room mobile joystick releases, layout fits, and failed assets keep navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/preview/room");
  const room = page.getByRole("group", {
    name: "Walkable student room",
    exact: true,
  });
  await expect(room).toHaveAttribute("data-ready", "true");
  const stick = page.getByRole("group", { name: "Touch movement joystick" });
  await stick.scrollIntoViewIfNeeded();
  await room.evaluate((element) =>
    (element as HTMLElement).focus({ preventScroll: true }),
  );
  const box = (await stick.boundingBox())!;
  await page.mouse.move(box.x + box.width / 2 + 30, box.y + box.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(400);
  await page.mouse.up();
  await expect
    .poll(async () => Number(await room.getAttribute("data-player-x")))
    .toBeGreaterThan(340);
  await page.waitForTimeout(150);
  const released = await room.getAttribute("data-player-x");
  await page.waitForTimeout(250);
  expect(await room.getAttribute("data-player-x")).toBe(released);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: "docs/previews/room-movement-mobile.png",
    fullPage: true,
  });
  await page.route("**/brand/student-characters.png", (route) => route.abort());
  await page.reload();
  await expect(
    page.getByText("The room couldn’t load.", { exact: false }),
  ).toBeVisible();
  await page
    .getByRole("navigation", { name: "Room destinations" })
    .getByRole("link", { name: "Campus door" })
    .click();
  await expect(page).toHaveURL(/\/preview\/campus$/);
});
