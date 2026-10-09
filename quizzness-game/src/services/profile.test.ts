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
        selected_courses: ["qz-bio-101", "qz-law-101"],
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
describe("major and year validation", () => {
  const base = { ...emptyProfile("u"), first_name: "Alex" };
  it("rejects an unknown major", () =>
    expect(() => validateProfile({ ...base, major_id: "astrology" })).toThrow(
      "available major",
    ));
  it("rejects an unlisted year but allows leaving it blank", () => {
    expect(() =>
      validateProfile({ ...base, year_of_study: "Year 9" }),
    ).toThrow("year of study");
    expect(validateProfile({ ...base, year_of_study: "" }).year_of_study).toBe("");
  });
});
