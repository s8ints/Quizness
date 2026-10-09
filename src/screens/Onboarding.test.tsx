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
  expect(screen.getByLabelText("What are you studying?")).toHaveValue("Other");
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
