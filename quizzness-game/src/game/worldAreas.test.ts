import { describe, expect, it } from "vitest";
import { nearDestination, type Area, type Point } from "./area";
import { getMissionPreview, missionPreviews } from "../data/missions";
import {
  allAreas,
  exploreAreas,
  getExploreArea,
  quickTravel,
} from "./worldAreas";

// Every spot a student can really walk to from where they arrive.
function walkable(area: Area, start: Point) {
  const step = 8;
  const key = (p: Point) => `${p.x},${p.y}`;
  const first = {
    x: Math.round(start.x / step) * step,
    y: Math.round(start.y / step) * step,
  };
  const seen = new Map([[key(first), first]]);
  const queue = [first];
  while (queue.length) {
    const p = queue.pop()!;
    for (const [dx, dy] of [[step, 0], [-step, 0], [0, step], [0, -step]]) {
      const next = { x: p.x + dx, y: p.y + dy };
      if (!seen.has(key(next)) && area.canStand(next)) {
        seen.set(key(next), next);
        queue.push(next);
      }
    }
  }
  return [...seen.values()];
}
describe.each(allAreas.map((area) => [area.id, area] as const))(
  "%s",
  (_id, area) => {
    it("lets the student reach every destination on foot", () => {
      const spots = walkable(area, area.spawn);
      for (const d of area.destinations)
        expect(
          spots.some((p) => nearDestination(area, p)?.id === d.id),
          d.id,
        ).toBe(true);
    });
    it("gives every destination something to do, and a clickable pin", () => {
      for (const d of area.destinations) {
        expect(!!d.path || !!d.dialog, d.id).toBe(true);
        expect(d.pin, d.id).toBeDefined();
      }
    });
    it("only places arrivals where the student can stand", () => {
      expect(area.canStand(area.spawn)).toBe(true);
      for (const [from, spot] of Object.entries(area.entrances ?? {}))
        expect(area.canStand(spot), from).toBe(true);
    });
  },
);
describe("connected journey", () => {
  const leadsTo = (area: Area) =>
    area.destinations.flatMap((d) => (d.path ? [d.path] : []));
  const find = (id: string) => allAreas.find((area) => area.id === id)!;
  it("links room → campus → district → lobby → topic, and back again", () => {
    expect(leadsTo(find("room"))).toContain("/campus");
    expect(leadsTo(find("campus"))).toContain("/explore/logic-district");
    expect(leadsTo(find("logic-district"))).toContain("/explore/comp-101-lobby");
    expect(leadsTo(find("comp-101-lobby"))).toContain("/explore/variables-topic");
    expect(leadsTo(find("variables-topic"))).toContain("/explore/comp-101-lobby");
    expect(leadsTo(find("comp-101-lobby"))).toContain("/explore/logic-district");
    expect(leadsTo(find("logic-district"))).toContain("/campus");
    expect(leadsTo(find("campus"))).toContain("/room");
  });
  it("arrives at the matching door when coming back", () => {
    expect(find("campus").entrances?.["logic-district"]).toBeDefined();
    expect(find("logic-district").entrances?.["comp-101-lobby"]).toBeDefined();
    expect(find("comp-101-lobby").entrances?.["variables-topic"]).toBeDefined();
    expect(find("room").entrances?.campus).toBeDefined();
  });
  it("quick travel only points at real places", () => {
    for (const place of quickTravel) {
      const match = place.path.match(/^\/explore\/(.+)$/);
      if (match) expect(getExploreArea(match[1]), place.path).toBeDefined();
    }
  });
  it("labels every temporary picture as temporary", () => {
    for (const area of exploreAreas) expect(area.temporaryArt).toBe(true);
  });
});
describe("mission previews", () => {
  it("every board points at a real preview", () => {
    for (const area of allAreas)
      for (const d of area.destinations)
        if (d.dialog?.missionId)
          expect(getMissionPreview(d.dialog.missionId), d.id).toBeDefined();
  });
  it("gives a locked mission an exact prerequisite and location", () => {
    const locked = missionPreviews.filter((m) => m.prerequisite);
    expect(locked.length).toBeGreaterThan(0);
    for (const mission of locked) {
      expect(mission.prerequisite?.mission).toBeTruthy();
      expect(mission.prerequisite?.location).toBeTruthy();
    }
  });
  it("shows objective, time, difficulty, teaser and learning preview", () => {
    for (const m of missionPreviews)
      for (const field of [m.objective, m.minutes, m.difficulty, m.teaser, m.learn])
        expect(field).toBeTruthy();
  });
});
