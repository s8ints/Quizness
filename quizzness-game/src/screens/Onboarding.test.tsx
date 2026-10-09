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

test("students pick a university from a dropdown, or type one via Other", async () => {
  render(
    <MemoryRouter initialEntries={["/preview/onboarding"]}>
      <App />
    </MemoryRouter>,
  );
  await userEvent.click(await screen.findByRole("button", { name: "Continue →" }));
  const independent = screen.getByRole("radio", { name: /I’m learning independently/ });
  expect(independent).toBeChecked();
  await userEvent.click(screen.getByRole("radio", { name: /At a university or college/ }));
  const school = screen.getByRole("combobox", { name: "Your university or college" });
  await userEvent.click(screen.getByRole("button", { name: "Continue →" }));
  expect(screen.getAllByText(/Choose your university or college/).length).toBeGreaterThan(0);
  await userEvent.selectOptions(school, "Other (type it)");
  await userEvent.type(screen.getByLabelText("Institution name"), "University of Toronto");
  expect(screen.getByLabelText("Institution name")).toHaveValue("University of Toronto");
  await userEvent.selectOptions(school, "The University of the West Indies, Cave Hill");
  expect(screen.queryByLabelText("Institution name")).toBeNull();
  await userEvent.click(screen.getByRole("button", { name: "Continue →" }));
  expect(
    await screen.findByRole("heading", { name: "What would you like help with?" }),
  ).toBeInTheDocument();
});
