import type suppliedManifest from "../../public/sprites/students/students.json";
import type { Point } from "./room";
export type StudentManifest = typeof suppliedManifest;
export type StudentAnimation =
  "idle" | "walk-down" | "walk-up" | "walk-left" | "walk-right";
export function studentSprites(id: string, manifest: StudentManifest) {
  return (
    manifest.characters[id as keyof typeof manifest.characters] ??
    manifest.characters.fern
  );
}
export function animationForMovement(
  previous: Point,
  next: Point,
  current?: StudentAnimation,
): StudentAnimation {
  const x = next.x - previous.x,
    y = next.y - previous.y;
  if (Math.hypot(x, y) < 0.001) return "idle";
  const horizontal = x > 0 ? "walk-right" : "walk-left";
  const vertical = y > 0 ? "walk-down" : "walk-up";
  // On a near-diagonal keep the current direction instead of flip-flopping.
  const ratio = Math.abs(x) / Math.max(Math.abs(y), 0.0001);
  if (
    ratio > 0.6 &&
    ratio < 1.7 &&
    (current === horizontal || current === vertical)
  )
    return current;
  return Math.abs(x) > Math.abs(y) ? horizontal : vertical;
}
