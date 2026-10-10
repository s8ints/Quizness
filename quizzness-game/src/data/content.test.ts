import { describe, expect, it } from "vitest";
import { courses } from "./courses";
import { homeWorldFor, majors } from "./majors";
import { campus, getWorld } from "./worlds";
describe("content catalogue", () => {
  it("gives every major a home world or the campus", () => {
    for (const major of majors)
      expect(
        major.worldId === campus.id || !!getWorld(major.worldId),
      ).toBe(true);
  });
  it("places every course in an existing world, with unique ids", () => {
    for (const course of courses) expect(getWorld(course.worldId)).toBeTruthy();
    expect(new Set(courses.map((course) => course.id)).size).toBe(courses.length);
  });
  it("maps majors to home worlds", () => {
    expect(homeWorldFor("law")?.name).toBe("Justice Quarter");
    expect(homeWorldFor("accounting")?.name).toBe("Enterprise Quarter");
    expect(homeWorldFor("languages")?.name).toBe("Story Harbour");
  });
  it("starts Other and unknown majors on the campus", () => {
    expect(homeWorldFor("other")).toBeUndefined();
    expect(homeWorldFor("")).toBeUndefined();
  });
});
