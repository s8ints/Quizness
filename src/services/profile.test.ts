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
});
