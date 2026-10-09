import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, test, vi } from "vitest";
import { emptyProfile } from "../types/student";
import { Hub } from "./Hub";

const student = vi.hoisted(() => ({ value: {} as Record<string, unknown> }));
vi.mock("../app/StudentProvider", () => ({ useStudent: () => student.value }));

function renderHub(preview: boolean, courses: string[] = []) {
  student.value = {
    preview,
    update: vi.fn(),
    profile: {
      ...emptyProfile("u"),
      first_name: "Ana",
      major_id: "law",
      selected_courses: courses,
    },
  };
  render(
    <MemoryRouter>
      <Hub />
    </MemoryRouter>,
  );
  return within(screen.getByRole("region", { name: "Your status" }));
}

test("preview status is clearly labelled as sample progress", () => {
  const status = renderHub(true, ["qz-law-101"]);
  expect(status.getByText("Sample progress")).toBeInTheDocument();
  expect(status.getByText("Legal Systems & Method")).toBeInTheDocument();
  expect(status.getByText("Justice Quarter")).toBeInTheDocument();
});

test("a real account with no progress gets an honest empty state", () => {
  const status = renderHub(false);
  expect(status.getByText("No XP yet")).toBeInTheDocument();
  expect(status.queryByText("Sample progress")).not.toBeInTheDocument();
  expect(status.getByRole("link", { name: "Choose a course →" })).toBeInTheDocument();
  expect(status.getByRole("link", { name: "Add goals in your profile →" })).toBeInTheDocument();
});
