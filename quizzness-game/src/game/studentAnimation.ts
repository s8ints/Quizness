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
): StudentAnimation {
  const x = next.x - previous.x,
    y = next.y - previous.y;
  if (Math.hypot(x, y) < 0.001) return "idle";
  if (Math.abs(x) > Math.abs(y)) return x > 0 ? "walk-right" : "walk-left";
  return y > 0 ? "walk-down" : "walk-up";
}
