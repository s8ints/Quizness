import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, test } from "vitest";
import { getCourse } from "../data/courses";
import { CourseCard } from "./CourseCard";

test("course card shows its code label, world pill and selection", () => {
  render(
    <MemoryRouter>
      <CourseCard course={getCourse("qz-psy-101")!} base="/preview" selected />
    </MemoryRouter>,
  );
  const link = screen.getByRole("link");
  expect(link).toHaveAttribute("href", "/preview/courses/qz-psy-101");
  expect(screen.getByText("Course · QZ-PSY 101")).toBeInTheDocument();
  expect(screen.getByText("Mindscape Gardens")).toBeInTheDocument();
  expect(screen.getByText("✓ In your courses")).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Introduction to Psychology" }),
  ).toBeInTheDocument();
});
