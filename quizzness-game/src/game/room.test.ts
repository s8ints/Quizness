import { describe, expect, it } from "vitest";
import { movePlayer, nearDestination, type Point } from "./area";
import { roomArea as room, roomFurniture } from "./room";

describe("room movement", () => {
  const start: Point = { x: 770, y: 760 };
  it("moves at a constant speed, including diagonally", () => {
    const straight = movePlayer(room, start, { x: 1, y: 0 }, 0.05);
    const diagonal = movePlayer(room, start, { x: 1, y: 1 }, 0.05);
    expect(straight.x - start.x).toBeCloseTo(14);
    // Diagonals are no faster than walking straight.
    expect(diagonal.x - start.x).toBeCloseTo(14 / Math.SQRT2);
    // The floor is angled, so depth movement is foreshortened.
    expect(diagonal.y - start.y).toBeCloseTo((14 / Math.SQRT2) * 0.72);
  });
  it("stops at room boundaries", () => {
    let position = { x: 770, y: 900 };
    for (let i = 0; i < 300; i++)
      position = movePlayer(room, position, { x: -1, y: 0 }, 0.05);
    expect(position.x).toBeGreaterThanOrEqual(28);
    position = start;
    for (let i = 0; i < 300; i++)
      position = movePlayer(room, position, { x: 0, y: -1 }, 0.05);
    expect(position.y).toBeGreaterThanOrEqual(505);
  });
  it("does not walk into the bed", () => {
    let position = { x: 1000, y: 680 };
    for (let i = 0; i < 60; i++)
      position = movePlayer(room, position, { x: 1, y: 0 }, 0.05);
    expect(position.x).toBeLessThanOrEqual(1165 - 28);
  });
  it("slides along furniture instead of blocking both axes", () => {
    const result = movePlayer(room, { x: 1137, y: 680 }, { x: 1, y: 1 }, 0.05);
    expect(result.x).toBe(1137);
    expect(result.y).toBeGreaterThan(680);
  });
  it("clamps long frames and leaves idle positions unchanged", () => {
    expect(movePlayer(room, start, { x: 1, y: 0 }, 5).x - start.x).toBeCloseTo(
      14,
    );
    expect(movePlayer(room, start, { x: 0, y: 0 }, 0.05)).toEqual(start);
  });
  it("only offers nearby destinations", () => {
    expect(nearDestination(room, { x: 770, y: 985 })?.id).toBe("campus");
    expect(nearDestination(room, start)).toBeUndefined();
  });
  it("picks the closest object when two are in reach", () => {
    expect(nearDestination(room, { x: 395, y: 575 })?.id).toBe("books");
    expect(nearDestination(room, { x: 372, y: 640 })?.id).toBe("desk");
  });
  it("lets the student stand at every destination", () => {
    for (const d of room.destinations) expect(room.canStand(d)).toBe(true);
    expect(room.canStand(room.spawn)).toBe(true);
  });
  it("never lets the student stand inside furniture", () => {
    for (const r of roomFurniture)
      expect(
        room.canStand({ x: r.x + r.width / 2, y: r.y + r.height / 2 }),
      ).toBe(false);
  });
  it("draws the student larger near the front of the room", () => {
    expect(room.characterScale(1010)).toBeGreaterThan(room.characterScale(505));
  });
});
