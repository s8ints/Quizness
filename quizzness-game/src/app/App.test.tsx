import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { App } from "./App";
function open(path: string) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}
describe("student foundation routes", () => {
  it("focuses the page heading after navigation", async () => {
    open("/preview/courses");
    expect(
      await screen.findByRole("heading", { name: "Follow your curiosity." }),
    ).toHaveFocus();
    expect(document.title).toBe("Follow your curiosity. · Quizzness");
  });
  it("labels the preview and includes non-programming courses", async () => {
    open("/preview");
    expect(
      await screen.findByText(/sample data · edits reset/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Algebra Foundations" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Cell Biology" }),
    ).toBeInTheDocument();
    expect(
      within(screen.getByRole("region", { name: "Your status" })).getByText(
        "Pattern Valley",
      ),
    ).toBeInTheDocument();
  });
  it("recovers from an unknown course", async () => {
    open("/preview/courses/missing");
    expect(
      await screen.findByRole("heading", { name: "Course not found" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Back to courses" }),
    ).toHaveAttribute("href", "/preview/courses");
  });
  it("does not pretend an unconfigured login is authentication", async () => {
    open("/login");
    expect(
      await screen.findByText(/accounts are not connected yet/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Log in" })).toBeDisabled();
  });
  it("protects the real dashboard", async () => {
    open("/dashboard");
    expect(
      await screen.findByRole("heading", { name: "Welcome back." }),
    ).toBeInTheDocument();
  });
});
describe("preview settings", () => {
  it("does not claim anything about real sign-in state", async () => {
    open("/preview/settings");
    expect(
      await screen.findByText(/this preview doesn’t use any account/i),
    ).toBeInTheDocument();
  });
});
describe("worlds and campus", () => {
  it("lists the home world first, then every other world", async () => {
    open("/preview/courses");
    const worldHeadings = (await screen.findAllByRole("heading", { level: 2 }))
      .map((heading) => heading.textContent);
    expect(worldHeadings[0]).toContain("Pattern Valley");
    expect(worldHeadings.join(" ")).toContain("Justice Quarter");
    expect(screen.getByText(/Your home world · Mathematics/)).toBeInTheDocument();
  });
  it("shows the shared campus and labels social features as coming later", async () => {
    open("/preview/campus");
    expect(
      await screen.findByRole("heading", { name: "Quizzness Campus" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/market and exploring are\s+coming later/)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Travel to Pattern Valley →" }),
    ).toHaveAttribute("href", "/preview/courses");
  });
});
describe("profile major picker", () => {
  it("uses the shared major picker and shows the home world", async () => {
    open("/preview/profile");
    const major = await screen.findByRole("combobox", {
      name: "What are you studying?",
    });
    expect(major).toHaveValue("mathematics");
    expect(screen.getByText("Home world: Pattern Valley")).toBeInTheDocument();
  });
});
describe("landing", () => {
  it("shows the Quizzness slogan", async () => {
    open("/");
    expect(await screen.findByText("Quizzness Over Pleasure")).toBeInTheDocument();
  });
});
