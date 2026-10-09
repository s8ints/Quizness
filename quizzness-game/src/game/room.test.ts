import { describe, expect, it } from "vitest";
import { movePlayer, nearDestination, room, type Point } from "./room";

describe("room movement", () => {
  const start: Point = { x: 320, y: 260 };
  it("moves at a constant speed, including diagonally", () => {
    const straight = movePlayer(start, { x: 1, y: 0 }, 0.05);
    const diagonal = movePlayer(start, { x: 1, y: 1 }, 0.05);
    expect(straight.x - start.x).toBeCloseTo(6);
    expect(Math.hypot(diagonal.x - start.x, diagonal.y - start.y)).toBeCloseTo(
      6,
    );
  });
  it("stops at room boundaries", () => {
    let position = start;
    for (let i = 0; i < 300; i++)
      position = movePlayer(position, { x: -1, y: 0 }, 0.05);
    expect(position.x).toBeGreaterThanOrEqual(room.bounds.x + 8);
  });
  it("does not walk into the bed", () => {
    let position = { x: 470, y: 220 };
    for (let i = 0; i < 30; i++)
      position = movePlayer(position, { x: 1, y: 0 }, 0.05);
    expect(position.x).toBeLessThanOrEqual(492);
  });
  it("slides along furniture instead of blocking both axes", () => {
    const result = movePlayer({ x: 492, y: 220 }, { x: 1, y: 1 }, 0.05);
    expect(result.x).toBe(492);
    expect(result.y).toBeGreaterThan(220);
  });
  it("clamps long frames and leaves idle positions unchanged", () => {
    expect(movePlayer(start, { x: 1, y: 0 }, 5).x - start.x).toBeCloseTo(6);
    expect(movePlayer(start, { x: 0, y: 0 }, 0.05)).toEqual(start);
  });
  it("only offers nearby destinations", () => {
    expect(nearDestination({ x: 320, y: 365 })?.id).toBe("campus");
    expect(nearDestination(start)).toBeUndefined();
  });
});
