import { describe, it, expect } from "vitest";
import { validateProfile } from "./profile";
import { emptyProfile } from "../types/student";
describe("profile validation", () => {
  it("requires a name", () =>
    expect(() => validateProfile(emptyProfile("u"))).toThrow("first name"));
  it("rejects unknown course references", () =>
    expect(() =>
      validateProfile({
        ...emptyProfile("u"),
        first_name: "Alex",
        selected_courses: ["missing"],
      }),
    ).toThrow("available course"));
  it("permits independent learning and multiple disciplines", () =>
    expect(
      validateProfile({
        ...emptyProfile("u"),
        first_name: "Alex",
        selected_courses: ["biology", "mathematics"],
        institution: "",
      }).institution,
    ).toBe(""));
  it("matches the database limit for the study field", () =>
    expect(() =>
      validateProfile({
        ...emptyProfile("u"),
        first_name: "Alex",
        study_field: "x".repeat(121),
      }),
    ).toThrow("shorten"));
  it("rejects learning goals that are not offered", () =>
    expect(() =>
      validateProfile({
        ...emptyProfile("u"),
        first_name: "Alex",
        goals: ["Prepare for tests", "made up"],
      }),
    ).toThrow("learning goals"));
});
