import { describe, expect, it } from "vitest";
import { movePlayer, nearDestination, type Point } from "./area";
import { campusArea as campus } from "./campus";

// Walks every open square from the spawn point to see what can really be reached.
function reachable() {
  const step = 8;
  const key = (p: Point) => `${p.x},${p.y}`;
  const start = {
    x: Math.round(campus.spawn.x / step) * step,
    y: Math.round(campus.spawn.y / step) * step,
  };
  const seen = new Set([key(start)]);
  const queue = [start];
  while (queue.length) {
    const p = queue.pop()!;
    for (const [dx, dy] of [[step, 0], [-step, 0], [0, step], [0, -step]]) {
      const next = { x: p.x + dx, y: p.y + dy };
      if (!seen.has(key(next)) && campus.canStand(next)) {
        seen.add(key(next));
        queue.push(next);
      }
    }
  }
  return [...seen].map((s) => {
    const [x, y] = s.split(",").map(Number);
    return { x, y };
  });
}
describe("campus map", () => {
  it("lets the student stand at every destination", () => {
    for (const d of campus.destinations)
      expect(campus.canStand(d), d.id).toBe(true);
    expect(campus.canStand(campus.spawn)).toBe(true);
  });
  it("connects every landmark to the south steps by walking", () => {
    const spots = reachable();
    for (const d of campus.destinations) {
      const close = spots.some(
        (p) => nearDestination(campus, p)?.id === d.id,
      );
      expect(close, d.id).toBe(true);
    }
  });
  it("keeps the student off water, gardens and buildings", () => {
    for (const blocked of [
      { x: 836, y: 545, name: "fountain" },
      { x: 500, y: 830, name: "river" },
      { x: 400, y: 590, name: "garden" },
      { x: 836, y: 200, name: "hall roof" },
      { x: 150, y: 330, name: "cottage" },
    ])
      expect(campus.canStand(blocked), blocked.name).toBe(false);
  });
  it("stops at the edge of a path", () => {
    let position = { x: 836, y: 860 };
    for (let i = 0; i < 200; i++)
      position = movePlayer(campus, position, { x: 1, y: 0 }, 0.05);
    expect(position.x).toBeLessThan(925);
  });
  it("shows a pin for every landmark and opens dialogs for later features", () => {
    for (const d of campus.destinations) {
      expect(d.pin, d.id).toBeDefined();
      expect(!!d.path || !!d.dialog, d.id).toBe(true);
    }
    expect(campus.destinations.find((d) => d.id === "market")?.path).toBeUndefined();
    expect(campus.destinations.find((d) => d.id === "plaza")?.path).toBeUndefined();
  });
  it("keeps every sample student on the paths for their whole route", () => {
    for (const route of campus.npcs ?? []) {
      route.points.forEach((point, index) => {
        const next = route.points[index + 1];
        if (!next) return;
        for (let t = 0; t <= 1; t += 0.02) {
          const spot = {
            x: point.x + (next.x - point.x) * t,
            y: point.y + (next.y - point.y) * t,
          };
          expect(
            campus.canStand(spot),
            `${Math.round(spot.x)},${Math.round(spot.y)}`,
          ).toBe(true);
        }
      });
    }
  });
  it("draws the student smaller further up the map", () => {
    expect(campus.characterScale(350)).toBeLessThan(campus.characterScale(900));
  });
});
