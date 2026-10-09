import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { expect, test } from "vitest";
import { App } from "../app/App";

test("a custom subject stays editable even when it matches a listed subject", async () => {
  render(
    <MemoryRouter initialEntries={["/preview/onboarding"]}>
      <App />
    </MemoryRouter>,
  );
  await userEvent.selectOptions(
    await screen.findByLabelText("What are you studying?"),
    "Other",
  );
  const custom = screen.getByLabelText("Your subject");
  await userEvent.type(custom, "Law");
  expect(screen.getByLabelText("Your subject")).toHaveValue("Law");
  expect(screen.getByLabelText("Your subject")).toHaveFocus();
  expect(screen.getByLabelText("What are you studying?")).toHaveValue("other");
});

test("choosing Other requires typing the subject", async () => {
  render(
    <MemoryRouter initialEntries={["/preview/onboarding"]}>
      <App />
    </MemoryRouter>,
  );
  await userEvent.selectOptions(
    await screen.findByLabelText("What are you studying?"),
    "Other",
  );
  await userEvent.click(screen.getByRole("button", { name: "Continue →" }));
  expect(screen.getAllByText(/choose what you’re studying/i).length).toBeGreaterThan(0);
});

test("a Psychology major sees Mindscape Gardens courses first and may skip the year", async () => {
  render(
    <MemoryRouter initialEntries={["/preview/onboarding"]}>
      <App />
    </MemoryRouter>,
  );
  await userEvent.selectOptions(
    await screen.findByLabelText("What are you studying?"),
    "Psychology",
  );
  await userEvent.selectOptions(
    screen.getByLabelText("Year of study (optional)"),
    "Prefer not to say",
  );
  await userEvent.click(screen.getByRole("button", { name: "Continue →" }));
  expect(
    await screen.findByRole("heading", { name: "Learning happens everywhere." }),
  ).toBeInTheDocument();
  await userEvent.click(screen.getByRole("button", { name: "Continue →" }));
  const groups = screen.getAllByRole("group");
  expect(groups[0]).toHaveAccessibleName(/Mindscape Gardens.*your home world/);
  expect(
    screen.getByText(/Your home world is Mindscape Gardens/),
  ).toBeInTheDocument();
});
