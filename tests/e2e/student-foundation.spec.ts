import { test, expect } from "@playwright/test";
test("student room destinations work with keyboard navigation", async ({
  page,
}) => {
  await page.goto("/preview");
  const room = page.getByRole("region", { name: "Your cosy student room" });
  await expect(room).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.locator("h1").evaluate((el) => getComputedStyle(el).fontFamily),
  ).toContain("Pixelify Sans");
  expect(
    await room.evaluate((el) => getComputedStyle(el).backgroundImage),
  ).toContain("student-room-pixel-v2.png");
  await expect(
    room.getByRole("img", { name: /student character/ }),
  ).toBeVisible();
  const bookshelf = room.getByRole("link", { name: /My bookshelf/ });
  await bookshelf.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/preview\/courses$/);
  await page.goto("/preview");
  await page.getByRole("link", { name: "Room settings", exact: true }).click();
  await expect(page).toHaveURL(/\/preview\/settings$/);
});
test("original identity is shared across the student journey", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("img", { name: /Panthy/ })).toBeVisible();
  await expect(page.locator(".campus-hero img")).toHaveAttribute(
    "src",
    "/brand/quizzness-campus.png",
  );
  expect(
    await page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--color-primary")
        .trim()
        .toUpperCase(),
    ),
  ).toBe("#7A4E9D");
  for (const route of [
    "/login",
    "/signup",
    "/preview",
    "/preview/onboarding",
    "/preview/profile",
    "/preview/settings",
    "/preview/courses/qz-bio-101",
    "/preview/campus",
  ]) {
    await page.goto(route);
    await expect(page.getByRole("img", { name: /Panthy/ })).toBeVisible();
  }
  await page.goto("/preview/profile");
  await page.getByRole("button", { name: /Glasses/ }).click();
  await page.getByRole("button", { name: "Save profile →" }).click();
  await page.getByRole("link", { name: "Home base" }).click();
  await expect(
    page
      .getByRole("img", { name: "Glasses, Quizzness student character" })
      .first(),
  ).toBeVisible();
});
test("preview journey, course selection, profile, settings and refresh", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page
    .getByRole("link", { name: "Explore the student preview →" })
    .click();
  await expect(page.getByText(/sample data · edits reset/)).toBeVisible();
  await page
    .getByRole("link", { name: "Continue journey →", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Algebra Foundations" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Continue learning →" }).click();
  await expect(
    page.getByText("Your adventure is being prepared."),
  ).toBeVisible();
  await page.getByRole("button", { name: "Remove from my courses" }).click();
  await expect(
    page.getByRole("button", { name: "Add to my courses" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Your character", exact: true }).click();
  await page.getByLabel("First name", { exact: true }).fill("Sam");
  await page.getByRole("button", { name: "Save profile →" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Preview profile updated",
  );
  await page.getByRole("link", { name: "Home base" }).click();
  await expect(page.getByRole("heading", { name: /Hey, Sam/ })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Algebra Foundations", exact: true }),
  ).toHaveCount(0);
  await page.getByRole("link", { name: "Room settings", exact: true }).click();
  await page.getByLabel("Reduce interface motion").check();
  await expect(page.locator(".app")).toHaveClass(/reduce-motion/);
  await page.reload();
  await page.getByRole("link", { name: "Home base" }).click();
  await expect(
    page.getByRole("heading", { name: /Hey, Explorer/ }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Algebra Foundations", exact: true }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});
test("onboarding accepts a non-computing independent learner", async ({
  page,
}) => {
  await page.goto("/preview/onboarding");
  await page.getByLabel("First name", { exact: true }).fill("Rae");
  await page.getByLabel("What are you studying?").selectOption("Law");
  await page.getByRole("button", { name: "Continue →" }).click();
  await expect(page.getByLabel("I’m learning independently")).toBeChecked();
  await page.getByRole("button", { name: "Continue →" }).click();
  await expect(
    page.getByText(/Your home world is Justice Quarter/),
  ).toBeVisible();
  await page.getByLabel("Prepare for tests").check();
  await page.getByLabel(/QZ-LAW 101/).check();
  await page.getByRole("button", { name: "Continue →" }).click();
  await page.getByRole("button", { name: /Hoodie/ }).click();
  await page.getByRole("button", { name: "Enter my home base →" }).click();
  await expect(page.getByRole("heading", { name: /Hey, Rae/ })).toBeVisible();
  await expect(page.getByText("Justice Quarter", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Legal Systems & Method" }),
  ).toBeVisible();
});
test("mobile routes have no horizontal overflow and private routes guard access", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of [
    "/",
    "/preview",
    "/preview/courses",
    "/preview/courses/qz-bio-101",
    "/preview/campus",
    "/preview/profile",
    "/preview/settings",
    "/preview/onboarding",
    "/login",
    "/signup",
  ]) {
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  // Mid widths: the five-link header must still fit.
  await page.setViewportSize({ width: 820, height: 900 });
  for (const route of ["/preview", "/preview/courses", "/preview/campus"]) {
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/login$/);
  await expect(
    page.getByRole("button", { name: "Log in", exact: true }),
  ).toBeDisabled();
  await page.goto("/preview/courses/missing");
  await expect(
    page.getByRole("heading", { name: "Course not found" }),
  ).toBeVisible();
});
