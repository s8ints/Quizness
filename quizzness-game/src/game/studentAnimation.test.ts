import { expect, it } from "vitest";
import manifest from "../../public/sprites/students/students.json";
import { animationForMovement, studentSprites } from "./studentAnimation";
it("uses actual movement to select direction and idles when blocked", () => {
  const start = { x: 10, y: 10 };
  expect(animationForMovement(start, { x: 15, y: 10 })).toBe("walk-right");
  expect(animationForMovement(start, { x: 5, y: 10 })).toBe("walk-left");
  expect(animationForMovement(start, { x: 10, y: 5 })).toBe("walk-up");
  expect(animationForMovement(start, { x: 10, y: 15 })).toBe("walk-down");
  expect(animationForMovement(start, start)).toBe("idle");
});
it("keeps the current direction on near-diagonals instead of flip-flopping", () => {
  const start = { x: 10, y: 10 };
  const diagonal = { x: 15, y: 14 };
  expect(animationForMovement(start, diagonal, "walk-down")).toBe("walk-down");
  expect(animationForMovement(start, diagonal, "walk-right")).toBe(
    "walk-right",
  );
  expect(animationForMovement(start, diagonal, "idle")).toBe("walk-right");
  expect(animationForMovement(start, { x: 20, y: 10 }, "walk-down")).toBe(
    "walk-right",
  );
});
it("maps all six avatars to supplied frame metadata", () => {
  for (const id of ["fern", "sun", "sky", "books", "headphones", "glasses"]) {
    expect(studentSprites(id, manifest).animations.idle.frames).toBe(2);
    expect(studentSprites(id, manifest).animations["walk-right"].frames).toBe(
      8,
    );
  }
  expect(studentSprites("unknown", manifest)).toEqual(
    studentSprites("fern", manifest),
  );
});
