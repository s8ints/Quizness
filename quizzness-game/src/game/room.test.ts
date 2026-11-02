import { describe, expect, it } from "vitest";
import {
  characterScale,
  movePlayer,
  nearDestination,
  room,
  type Point,
} from "./room";

describe("room movement", () => {
  const start: Point = { x: 770, y: 760 };
  it("moves at a constant speed, including diagonally", () => {
    const straight = movePlayer(start, { x: 1, y: 0 }, 0.05);
    const diagonal = movePlayer(start, { x: 1, y: 1 }, 0.05);
    expect(straight.x - start.x).toBeCloseTo(14);
    // Diagonals are no faster than walking straight.
    expect(diagonal.x - start.x).toBeCloseTo(14 / Math.SQRT2);
    // The floor is angled, so depth movement is foreshortened.
    expect(diagonal.y - start.y).toBeCloseTo((14 / Math.SQRT2) * 0.72);
  });
  it("stops at room boundaries", () => {
    let position = start;
    for (let i = 0; i < 300; i++)
      position = movePlayer(position, { x: -1, y: 0 }, 0.05);
    expect(position.x).toBeGreaterThanOrEqual(room.bounds.x + 8);
  });
  it("does not walk into the bed", () => {
    let position = { x: 1000, y: 680 };
    for (let i = 0; i < 60; i++)
      position = movePlayer(position, { x: 1, y: 0 }, 0.05);
    expect(position.x).toBeLessThanOrEqual(1165 - 28);
  });
  it("slides along furniture instead of blocking both axes", () => {
    const result = movePlayer({ x: 1137, y: 680 }, { x: 1, y: 1 }, 0.05);
    expect(result.x).toBe(1137);
    expect(result.y).toBeGreaterThan(680);
  });
  it("clamps long frames and leaves idle positions unchanged", () => {
    expect(movePlayer(start, { x: 1, y: 0 }, 5).x - start.x).toBeCloseTo(14);
    expect(movePlayer(start, { x: 0, y: 0 }, 0.05)).toEqual(start);
  });
  it("only offers nearby destinations", () => {
    expect(nearDestination({ x: 770, y: 985 })?.id).toBe("campus");
    expect(nearDestination(start)).toBeUndefined();
  });
  it("picks the closest object when two are in reach", () => {
    expect(nearDestination({ x: 395, y: 575 })?.id).toBe("books");
    expect(nearDestination({ x: 372, y: 640 })?.id).toBe("desk");
  });
  it("lets the character stand at every destination", () => {
    for (const d of room.destinations) {
      const moved = movePlayer(d, { x: 1, y: 0 }, 0.05);
      expect(moved.x).toBeGreaterThan(d.x);
    }
  });
  it("draws the character larger near the front of the room", () => {
    expect(characterScale(1010)).toBeGreaterThan(characterScale(505));
  });
});
