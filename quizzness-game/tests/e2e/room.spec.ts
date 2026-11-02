import { test, expect } from "@playwright/test";

test("reduced motion keeps student frames still while movement remains available",async({page})=>{
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.goto("/preview");
  const room=page.getByRole("group",{name:"Walkable student room",exact:true});
  await expect(room).toHaveAttribute("data-ready","true",{timeout:15000});
  await room.focus();await page.keyboard.down("ArrowLeft");
  await expect(room).toHaveAttribute("data-animation","walk-left");
  await expect.poll(async()=>Number(await room.getAttribute("data-player-x"))).toBeLessThan(740);
  await expect(room).toHaveAttribute("data-frame","0");
  await page.keyboard.up("ArrowLeft");
  await expect(room).toHaveAttribute("data-animation","idle");
});

test("room movement, wall collision, focus, destinations and repeat mounting", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/preview");
  const room = page.getByRole("group", {
    name: "Walkable student room",
    exact: true,
  });
  await expect(room).toHaveAttribute("data-ready", "true", { timeout: 15000 });
  await expect(page.locator("canvas")).toHaveCount(1);
  // Keys work as soon as the room is ready, with no click needed.
  await expect(room).toBeFocused();
  await page.keyboard.down("ArrowRight");
  await expect(room).toHaveAttribute("data-animation", "walk-right");
  await expect
    .poll(async () => Number(await room.getAttribute("data-frame")))
    .toBeGreaterThan(0);
  await page.waitForTimeout(350);
  await page.keyboard.up("ArrowRight");
  await expect(room).toHaveAttribute("data-animation", "idle");
  await expect
    .poll(async () => Number(await room.getAttribute("data-player-x")))
    .toBeGreaterThan(800);
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
    .toBeLessThanOrEqual(1010);
  await page
    .getByRole("button", { name: "Talk to Panthy", exact: true })
    .click();
  await expect(
    page.getByRole("dialog", { name: "Panthy’s welcome" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Back to exploring" }).click();
  await expect(room).toBeFocused();
  await page
    .getByRole("navigation", { name: "Places to go" })
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
  await page.goto("/preview");
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
    .toBeGreaterThan(800);
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
  await page.route("**/sprites/students/fern-idle.png", (route) =>
    route.abort(),
  );
  await page.reload();
  await expect(
    page.getByText("This place couldn’t load.", { exact: false }),
  ).toBeVisible();
  await page
    .getByRole("navigation", { name: "Destinations" })
    .getByRole("link", { name: "Campus door" })
    .click();
  await expect(page).toHaveURL(/\/preview\/campus$/);
});

test("campus map: walk the paths, use landmarks and return to the room", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/preview/campus");
  const map = page.getByRole("group", {
    name: "Walkable campus map",
    exact: true,
  });
  await expect(map).toHaveAttribute("data-ready", "true", { timeout: 15000 });
  await expect(map).toBeFocused();
  const pins = page.getByRole("navigation", { name: "Places to go" });
  await expect(pins.getByRole("link", { name: "Main Hall" })).toBeVisible();
  // Walls: walking sideways off the south steps stops at the water's edge.
  await page.keyboard.down("ArrowRight");
  await page.waitForTimeout(1500);
  await page.keyboard.up("ArrowRight");
  expect(Number(await map.getAttribute("data-player-x"))).toBeLessThan(925);
  await page.keyboard.down("ArrowLeft");
  await page.waitForTimeout(600);
  await page.keyboard.up("ArrowLeft");
  // Walking up the steps reaches the fountain, and E opens Panthy.
  await page.keyboard.down("ArrowUp");
  await expect
    .poll(async () => page.locator(".room-prompt").textContent(), {
      timeout: 8000,
    })
    .toContain("Panther fountain");
  await page.keyboard.up("ArrowUp");
  await page.keyboard.press("KeyE");
  await expect(
    page.getByRole("dialog", { name: "Panthy at the fountain" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Back to exploring" }).click();
  await expect(map).toBeFocused();
  // Later features say so honestly instead of pretending.
  await pins.getByRole("button", { name: "Market cottage" }).click();
  await expect(page.getByRole("dialog", { name: "Market cottage" })).toContainText(
    "later update",
  );
  await page.getByRole("button", { name: "Back to exploring" }).click();
  await pins.getByRole("link", { name: "Back to your room" }).click();
  await expect(page).toHaveURL(/\/preview$/);
  expect(errors).toEqual([]);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/preview/campus");
  await expect(map).toHaveAttribute("data-ready", "true", { timeout: 15000 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test.describe("loading, quality and motion states", () => {
  const stage = (page: import("@playwright/test").Page) =>
    page.getByRole("group", { name: "Walkable student room", exact: true });

  test("shows progress over a placeholder while the art loads", async ({
    page,
  }) => {
    await page.route("**/optimized/student-room-pixel-v2.webp", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      await route.continue();
    });
    await page.goto("/preview");
    const bar = page.getByRole("progressbar", { name: "Loading" });
    await expect(bar).toBeVisible({ timeout: 10000 });
    await expect(stage(page)).toHaveCSS(
      "background-image",
      /student-room-pixel-v2-thumb\.webp/,
    );
    await expect(stage(page)).toHaveAttribute("data-ready", "true", {
      timeout: 20000,
    });
    await expect(bar).toHaveCount(0);
  });

  test("full effects download sway maps; reduced motion skips all effect files", async ({
    page,
  }) => {
    const masks: string[] = [];
    page.on("request", (request) => {
      if (request.url().includes("/brand/masks/")) masks.push(request.url());
    });
    await page.goto("/preview");
    await expect(stage(page)).toHaveAttribute("data-ready", "true", {
      timeout: 20000,
    });
    await expect(stage(page)).toHaveAttribute("data-quality", /full|lowered/);
    expect(masks.some((url) => url.includes("room-sway"))).toBe(true);
    masks.length = 0;
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();
    await expect(stage(page)).toHaveAttribute("data-ready", "true", {
      timeout: 20000,
    });
    await expect(stage(page)).toHaveAttribute("data-quality", "still");
    expect(masks).toEqual([]);
  });

  test("low-memory devices get the lighter version and can still walk", async ({
    page,
  }) => {
    await page.addInitScript(() =>
      Object.defineProperty(navigator, "deviceMemory", { value: 1 }),
    );
    const masks: string[] = [];
    page.on("request", (request) => {
      if (request.url().includes("/brand/masks/")) masks.push(request.url());
    });
    await page.goto("/preview/campus");
    const map = page.getByRole("group", { name: "Walkable campus map" });
    await expect(map).toHaveAttribute("data-ready", "true", { timeout: 20000 });
    await expect(map).toHaveAttribute("data-quality", "lite");
    expect(masks.some((url) => url.includes("sway"))).toBe(false);
    expect(masks.some((url) => url.includes("water"))).toBe(true);
    await page.keyboard.down("ArrowUp");
    await expect
      .poll(async () => Number(await map.getAttribute("data-player-y")))
      .toBeLessThan(780);
    await page.keyboard.up("ArrowUp");
  });

  test("the game stops drawing when scrolled away and resumes on return", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 600 });
    await page.goto("/preview");
    await expect(stage(page)).toHaveAttribute("data-ready", "true", {
      timeout: 20000,
    });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(stage(page)).toHaveAttribute("data-sleeping", "true");
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(stage(page)).toHaveAttribute("data-sleeping", "false");
  });
});

test("connected journey: campus to topic, previews, return doors and quick travel", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const places = () => page.getByRole("navigation", { name: "Places to go" });
  const ready = (name: string) =>
    expect(page.getByRole("group", { name })).toHaveAttribute(
      "data-ready",
      "true",
      { timeout: 30000 },
    );
  await page.goto("/preview/campus");
  await ready("Walkable campus map");
  await places().getByRole("link", { name: "Bridge to Logic District" }).click();
  await expect(page).toHaveURL(/\/preview\/explore\/logic-district$/);
  await ready("Walkable Logic District");

  // Talking to the guide, then an unopened building says so honestly.
  await places().getByRole("button", { name: "District guide" }).click();
  await expect(page.getByRole("dialog", { name: "District guide" })).toContainText(
    "Senior student",
  );
  await page.getByRole("button", { name: "Back to exploring" }).click();
  await places().getByRole("button", { name: "QZ-COMP 102 building" }).click();
  await expect(page.getByRole("dialog")).toContainText("isn't open yet");
  await page.getByRole("button", { name: "Back to exploring" }).click();

  await places().getByRole("link", { name: "QZ-COMP 101 building" }).click();
  await ready("Walkable QZ-COMP 101 lobby");
  await places().getByRole("link", { name: "Variables and values" }).click();
  await ready("Walkable Variables and values");

  // Locked mission shows its details, including exactly what unlocks it.
  await places().getByRole("button", { name: "Locked: Changing values" }).click();
  const locked = page.getByRole("dialog", { name: "Locked mission" });
  await expect(locked).toContainText("Finish");
  await expect(locked).toContainText("Variables, values and data types");
  await expect(locked).toContainText("10–15 minutes");
  await page.getByRole("button", { name: "Back to exploring" }).click();
  // The first mission is honest that it can't be played yet.
  await places().getByRole("button", { name: "Mission: Variables" }).click();
  await expect(
    page.getByRole("button", { name: /Start mission/ }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Back to exploring" }).click();
  await expect(
    page.getByRole("region", { name: "Mission path" }).getByRole("listitem"),
  ).toHaveCount(2);

  // Going back arrives at the door you came through, not the far end.
  await places().getByRole("link", { name: "Back to the lobby" }).click();
  await ready("Walkable QZ-COMP 101 lobby");
  const lobby = page.getByRole("group", { name: "Walkable QZ-COMP 101 lobby" });
  await expect(lobby).toHaveAttribute("data-player-x", "300.0");

  // Quick travel jumps straight home.
  await page
    .getByRole("navigation", { name: "Quick travel" })
    .getByRole("link", { name: "Your room" })
    .click();
  await expect(page).toHaveURL(/\/preview$/);
  await ready("Walkable student room");

  // Unknown places recover helpfully.
  await page.goto("/preview/explore/nowhere");
  await expect(page.getByRole("heading", { name: "Place not found" })).toBeVisible();
  expect(errors).toEqual([]);
});
